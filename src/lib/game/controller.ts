import type { Premise, Resolution } from '../../../content/premises/types';
import { ApiClientError } from '../api/client';
import type {
  LeapResponse,
  ResolveRequest,
  ResolveResponse,
  StateResponse,
} from '../api/types';
import { DEFAULT_SETTINGS, type Settings } from '../db/schema';
import type { GameStorage } from '../db/storage';
import type { Catalog, LeapResult, LeapState } from '../engine/types';
import { newUuid } from '../utils/uuid';

/** La partie de l'API dont le contrôleur a besoin (un double suffit en test). */
export interface GameApi {
  leap(): Promise<LeapResponse>;
  resolve(body: ResolveRequest): Promise<ResolveResponse>;
  state(): Promise<StateResponse>;
  exportData(): Promise<unknown>;
  deleteState(): Promise<{ deleted: true }>;
}

export interface GameDeps {
  storage: GameStorage;
  /** Crée le client pour un joueur : l'identifiant n'est connu qu'après `init()`. */
  createApi(playerId: string): GameApi;
  loadCatalog(): Promise<Catalog>;
  now?: () => number;
}

/** Les ennuis que l'interface doit pouvoir expliquer en une phrase. */
export type GameProblem =
  'offline' | 'no_leap_offline' | 'stale_leap' | 'invalid' | 'rate_limited' | 'server';

export class GameError extends Error {
  constructor(
    readonly problem: GameProblem,
    message: string,
  ) {
    super(message);
    this.name = 'GameError';
  }
}

export interface ResolveOutcome {
  resolution: Resolution;
  /** Absent quand la résolution attend la reconnexion. */
  result: LeapResult | null;
  queued: boolean;
}

export interface Session {
  response: LeapResponse;
  leap: LeapState;
  premise: Premise;
  catalog: Catalog;
  /** Vrai quand le saut vient du cache local faute de réseau. */
  fromCache: boolean;
}

/** Tentatives après lesquelles une résolution bloquée est abandonnée (erreur définitive). */
const MAX_PENDING_ATTEMPTS = 10;

/**
 * Orchestre le jeu côté appareil : joueur, saut en cours, hors-ligne, file de résolutions.
 * Aucune dépendance à Svelte ni au navigateur : tout passe par `GameDeps`.
 */
export class GameController {
  private playerId: string | null = null;
  private api: GameApi | null = null;
  private catalog: Catalog | null = null;
  private readonly now: () => number;
  settings: Settings = DEFAULT_SETTINGS;

  constructor(private readonly deps: GameDeps) {
    this.now = deps.now ?? Date.now;
  }

  get storageKind(): GameStorage['kind'] {
    return this.deps.storage.kind;
  }

  /** Charge ou crée le joueur et les réglages, puis renvoie les envois laissés en attente. */
  async init(): Promise<{ playerId: string; firstVisit: boolean }> {
    const { storage } = this.deps;
    let playerId = await storage.getPlayerId();
    const firstVisit = playerId === null;
    if (playerId === null) {
      playerId = newUuid();
      await storage.setPlayerId(playerId);
    }
    this.playerId = playerId;
    this.api = this.deps.createApi(playerId);
    this.settings = (await storage.getSettings()) ?? DEFAULT_SETTINGS;
    await this.flushPending();
    return { playerId, firstVisit };
  }

  async updateSettings(patch: Partial<Settings>): Promise<Settings> {
    this.settings = { ...this.settings, ...patch };
    await this.deps.storage.setSettings(this.settings);
    return this.settings;
  }

  /** Y a-t-il un saut en cours à reprendre sans réseau ? */
  async hasLeapInProgress(): Promise<boolean> {
    return (await this.deps.storage.getProgress()) !== null;
  }

  /**
   * Démarre ou reprend un saut. Le serveur est la référence ; sans réseau, on rejoue le dernier
   * saut reçu tant qu'il n'a pas été résolu (§7.4).
   */
  async startLeap(): Promise<Session> {
    const api = this.requireApi();
    const { storage } = this.deps;
    const catalog = await this.loadCatalog();
    const progress = await storage.getProgress();

    let response: LeapResponse;
    let fromCache = false;
    try {
      response = await api.leap();
      await storage.saveLeap({ response, receivedAt: this.now() });
    } catch (error) {
      const failure = asClientError(error);
      if (!failure.offline) throw toGameError(failure);
      const cached = await storage.getLatestLeap();
      const usable = cached && (await this.isUnresolved(cached.response.leap.id));
      if (!cached || !usable) {
        throw new GameError(
          'no_leap_offline',
          'Connexion requise pour recevoir un nouveau saut.',
        );
      }
      response = cached.response;
      fromCache = true;
    }

    // La progression locale prime quand elle concerne le même saut : on reprend où on s'était arrêté.
    const leap = progress && progress.id === response.leap.id ? progress : response.leap;
    if (leap !== progress) await storage.saveProgress(leap);

    return {
      response,
      leap,
      premise: requirePremise(catalog, leap.premiseId),
      catalog,
      fromCache,
    };
  }

  /** Enregistre l'état du saut après chaque action : fermer l'application ne perd rien. */
  async save(leap: LeapState): Promise<void> {
    await this.deps.storage.saveProgress(leap);
  }

  /**
   * Résout le saut. Sans réseau, la résolution part dans la file et le texte de fin s'affiche
   * quand même : l'issue vient du contenu local, pas du serveur.
   */
  async resolve(session: Session, resolutionId: string): Promise<ResolveOutcome> {
    const api = this.requireApi();
    const { storage } = this.deps;
    const resolution = session.premise.resolutions.find((r) => r.id === resolutionId);
    if (!resolution)
      throw new GameError('invalid', `Résolution inconnue : ${resolutionId}.`);

    const request: ResolveRequest = {
      leapId: session.leap.id,
      resolutionId,
      suspicion: session.leap.suspicion,
      choices: session.leap.choices,
      visitedBeats: session.leap.visitedBeats,
    };

    try {
      const { result } = await api.resolve(request);
      await storage.clearProgress();
      await this.refreshState().catch(() => undefined);
      return { resolution, result, queued: false };
    } catch (error) {
      const failure = asClientError(error);
      if (!failure.offline) throw toGameError(failure);
      await storage.enqueueResolve({ request, queuedAt: this.now(), attempts: 0 });
      await storage.clearProgress();
      return { resolution, result: null, queued: true };
    }
  }

  /** Renvoie les résolutions en attente. S'arrête à la première panne de réseau. */
  async flushPending(): Promise<number> {
    const api = this.api;
    if (!api) return 0;
    const { storage } = this.deps;
    let sent = 0;
    for (const pending of await storage.listPending()) {
      try {
        await api.resolve(pending.request);
        await storage.removePending(pending.request.leapId);
        sent += 1;
      } catch (error) {
        const failure = asClientError(error);
        if (failure.offline) break;
        const attempts = pending.attempts + 1;
        // 409 : le serveur n'attend plus ce saut. Inutile d'insister, de même après trop d'échecs.
        if (failure.status === 409 || attempts >= MAX_PENDING_ATTEMPTS) {
          await storage.removePending(pending.request.leapId);
        } else {
          await storage.updatePending({ ...pending, attempts });
        }
      }
    }
    return sent;
  }

  async pendingCount(): Promise<number> {
    return (await this.deps.storage.listPending()).length;
  }

  /** L'état complet (journal, monde). Sans réseau, la dernière copie locale. */
  async refreshState(): Promise<{ state: StateResponse; stale: boolean } | null> {
    const api = this.requireApi();
    const { storage } = this.deps;
    try {
      const state = await api.state();
      await storage.saveState({ state, savedAt: this.now() });
      return { state, stale: false };
    } catch (error) {
      const failure = asClientError(error);
      if (!failure.offline) throw toGameError(failure);
      const cached = await storage.getState();
      return cached ? { state: cached.state, stale: true } : null;
    }
  }

  /** Export RGPD (§5.7). Nécessite le réseau. */
  async exportData(): Promise<unknown> {
    try {
      return await this.requireApi().exportData();
    } catch (error) {
      throw toGameError(asClientError(error));
    }
  }

  /** Suppression RGPD : serveur d'abord, puis l'appareil. En cas d'échec, rien n'est effacé. */
  async deleteEverything(): Promise<void> {
    try {
      await this.requireApi().deleteState();
    } catch (error) {
      throw toGameError(asClientError(error));
    }
    await this.deps.storage.clearAll();
    this.playerId = null;
    this.api = null;
    this.settings = DEFAULT_SETTINGS;
  }

  private async isUnresolved(leapId: string): Promise<boolean> {
    const pending = await this.deps.storage.listPending();
    return !pending.some((p) => p.request.leapId === leapId);
  }

  private async loadCatalog(): Promise<Catalog> {
    this.catalog ??= await this.deps.loadCatalog();
    return this.catalog;
  }

  private requireApi(): GameApi {
    if (!this.api) throw new Error('init() doit être appelé avant toute autre méthode.');
    return this.api;
  }
}

function requirePremise(catalog: Catalog, premiseId: string): Premise {
  const premise = catalog.premises.find((p) => p.id === premiseId);
  if (!premise) throw new GameError('server', `Prémisse introuvable : ${premiseId}.`);
  return premise;
}

function asClientError(error: unknown): ApiClientError {
  return error instanceof ApiClientError
    ? error
    : new ApiClientError('network', 'network_error', 'Connexion impossible.');
}

function toGameError(error: ApiClientError): GameError {
  if (error.offline) return new GameError('offline', 'Connexion requise.');
  if (error.status === 409) return new GameError('stale_leap', error.message);
  if (error.status === 422) return new GameError('invalid', error.message);
  if (error.status === 429) return new GameError('rate_limited', error.message);
  return new GameError('server', error.message);
}

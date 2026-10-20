import { ApiClient } from '../api/client';
import { openStorage } from '../db/indexeddb';
import type { Settings } from '../db/schema';
import type { Catalog } from '../engine/types';
import {
  BEATS,
  completeBeat,
  currentBeat,
  progressDots,
  type Beat,
  type DotState,
} from '../game/beats';
import {
  GameController,
  GameError,
  type GameProblem,
  type ResolveOutcome,
  type Session,
} from '../game/controller';

const TYPING_MS = { slow: 62, normal: 38, fast: 16, instant: 0 } as const;

// Magasin réactif (runes Svelte 5) au-dessus du contrôleur. Il ne contient aucune règle de jeu :
// il expose l'état à l'interface et recopie chaque action dans le stockage.

export type Phase = 'booting' | 'ready' | 'loading' | 'playing' | 'ended' | 'error';

class GameStore {
  phase = $state<Phase>('booting');
  settings = $state<Settings | null>(null);
  session = $state.raw<Session | null>(null);
  outcome = $state.raw<ResolveOutcome | null>(null);
  /** Le saut qui vient de se terminer, pour l'écran de fin. */
  finished = $state.raw<Session | null>(null);
  hasProgress = $state(false);
  /** L'épilogue se débloque quand tous les fragments sont retrouvés [À VALIDER]. */
  epilogueReady = $state(false);
  problem = $state<GameProblem | null>(null);
  degraded = $state(false);
  firstVisit = $state(false);
  pending = $state(0);
  online = $state(true);

  private controller: GameController | null = null;

  beat = $derived<Beat | null>(this.session ? currentBeat(this.session.leap) : null);
  dots = $derived<DotState[]>(this.session ? progressDots(this.session.leap) : []);
  beatNumber = $derived(this.session ? this.session.leap.visitedBeats.length : 0);
  totalBeats = BEATS.length;

  async boot(): Promise<void> {
    const { storage, degraded } = await openStorage();
    this.degraded = degraded;
    this.controller = new GameController({
      storage,
      createApi: (playerId) => new ApiClient({ playerId }),
      loadCatalog: loadCatalog,
    });
    const { firstVisit } = await this.controller.init();
    this.firstVisit = firstVisit;
    this.settings = this.controller.settings;
    this.pending = await this.controller.pendingCount();
    this.hasProgress = await this.controller.hasLeapInProgress();
    this.phase = 'ready';
    void this.checkEpilogue();
  }

  private async checkEpilogue(): Promise<void> {
    try {
      const [catalog, known] = await Promise.all([
        this.game.loadCatalog(),
        this.game.refreshState(),
      ]);
      const found = known?.state.chronology.metaProgress.fragmentsDiscovered.length ?? 0;
      this.epilogueReady = found >= catalog.fragments.length;
    } catch {
      // Sans état connu, l'épilogue reste verrouillé.
    }
  }

  async start(): Promise<void> {
    await this.run(async (c) => {
      this.outcome = null;
      this.session = await c.startLeap();
      this.phase = 'playing';
    });
  }

  async advance(): Promise<void> {
    await this.update((leap) => completeBeat(leap));
  }

  /** Remplace l'état du saut par `fn(état)` puis le sauve. */
  async update(fn: (leap: Session['leap']) => Session['leap']): Promise<void> {
    if (!this.session || !this.controller) return;
    const leap = fn(this.session.leap);
    // On enregistre d'abord : ce qui est affiché est toujours ce qui a été sauvegardé.
    await this.controller.save(leap);
    if (this.session) this.session = { ...this.session, leap };
  }

  async resolve(resolutionId: string): Promise<void> {
    const session = this.session;
    if (!session) return;
    await this.run(async (c) => {
      this.outcome = await c.resolve(session, resolutionId);
      this.pending = await c.pendingCount();
      // Le déblocage de l'épilogue se vérifie en arrière-plan : il ne retarde pas l'écran de fin.
      void this.checkEpilogue();
      this.finished = session;
      this.session = null;
      this.hasProgress = false;
      this.phase = 'ended';
    }, 'playing');
  }

  /**
   * Quitte le saut en cours pour l'accueil. Rien n'est perdu : chaque action est déjà sauvegardée,
   * et « Reprendre le saut » rouvre le saut là où il s'était arrêté.
   */
  leave(): void {
    if (!this.session) return;
    this.session = null;
    this.problem = null;
    this.hasProgress = true;
    this.phase = 'ready';
  }

  /** Retour à l'accueil après un saut ou une erreur. */
  home(): void {
    this.outcome = null;
    this.finished = null;
    this.problem = null;
    this.phase = this.session ? 'playing' : 'ready';
  }

  get problemMessage(): string {
    switch (this.problem) {
      case 'offline':
        return 'Pas de connexion. Réessaie dans un instant.';
      case 'no_leap_offline':
        return 'Il faut une connexion pour recevoir un nouveau saut.';
      case 'stale_leap':
        return 'Ce saut n’est plus d’actualité. Relance l’application.';
      case 'invalid':
        return 'Cette action n’a pas pu être validée.';
      case 'rate_limited':
        return 'Trop de demandes. Patiente quelques secondes.';
      default:
        return 'Quelque chose s’est mal passé. Réessaie.';
    }
  }

  async syncPending(): Promise<void> {
    if (!this.controller) return;
    await this.controller.flushPending();
    this.pending = await this.controller.pendingCount();
  }

  async saveSettings(patch: Partial<Settings>): Promise<void> {
    if (this.controller) this.settings = await this.controller.updateSettings(patch);
  }

  /** Texte affiché d'un bloc : réglage du joueur ou préférence du système. */
  get instant(): boolean {
    const system =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    return (
      system ||
      (this.settings?.reduceMotion ?? false) ||
      this.settings?.textSpeed === 'instant'
    );
  }

  /** Millisecondes par caractère de la machine à écrire. */
  get typingSpeed(): number {
    return TYPING_MS[this.settings?.textSpeed ?? 'normal'];
  }

  get game(): GameController {
    if (!this.controller) throw new Error('boot() doit précéder toute action.');
    return this.controller;
  }

  private async run(
    action: (c: GameController) => Promise<void>,
    fallback: Phase = 'ready',
  ): Promise<void> {
    if (!this.controller) return;
    this.problem = null;
    this.phase = 'loading';
    try {
      await action(this.controller);
    } catch (error) {
      this.problem = error instanceof GameError ? error.problem : 'server';
      this.phase = fallback === 'playing' && this.session ? 'playing' : 'ready';
    }
  }
}

/** Chargement différé : le contenu narratif reste hors du bundle initial (§7.5). */
async function loadCatalog(): Promise<Catalog> {
  return (await import('../../../content')).catalog;
}

export const game = new GameStore();

import type {
  LeapResponse,
  ResolveRequest,
  ResolveResponse,
  StateResponse,
  Trace,
} from '../../../src/lib/api/types';
import { leapSeed, playerIdHash } from '../../../src/lib/engine/hash';
import { generateLeap, resolveLeap, startLeap } from '../../../src/lib/engine/leap';
import { clampSuspicion } from '../../../src/lib/engine/suspicion';
import type { Catalog, Chronology, LeapState } from '../../../src/lib/engine/types';
import { bindMutations, createChronology } from '../../../src/lib/engine/world';
import { SlidingWindowLimiter } from '../middleware/ratelimit';
import { ApiError, toErrorResponse, type ServiceResponse } from '../utils/errors';
import { makeTraceFragment, traceKey, type TraceStore } from '../utils/traces';

/** Inactivité au-delà de laquelle la chronologie est supprimée [À VALIDER]. */
export const INACTIVITY_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

export type ServiceRequest =
  | { op: 'leap' | 'state' | 'export' | 'delete'; playerId: string }
  | { op: 'resolve'; playerId: string; body: ResolveRequest };

/** Stockage d'une chronologie. Le DO l'implémente avec `ctx.storage` (SQLite). */
export interface ChronologyStorage {
  load(): Promise<Chronology | null>;
  save(chronology: Chronology): Promise<void>;
  /** Efface tout, y compris l'alarme d'expiration. */
  clear(): Promise<void>;
  scheduleExpiry(at: number): Promise<void>;
}

export interface ServiceDeps {
  catalog: Catalog;
  storage: ChronologyStorage;
  traces: TraceStore;
  now(): number;
  uuid(): string;
  random(): number;
  limiter?: SlidingWindowLimiter;
}

function ok(body: unknown, headers?: Record<string, string>): ServiceResponse {
  return { status: 200, body, ...(headers ? { headers } : {}) };
}

/**
 * Logique d'un joueur : tout ce que fait le Durable Object, sans dépendre de la plateforme.
 * Les appels sont sérialisés : le DO ne traite qu'une requête à la fois, même quand une
 * requête attend KV.
 */
export class ChronologyService {
  private chain: Promise<unknown> = Promise.resolve();
  private readonly limiter: SlidingWindowLimiter;

  constructor(private readonly deps: ServiceDeps) {
    this.limiter = deps.limiter ?? new SlidingWindowLimiter();
  }

  handle(request: ServiceRequest): Promise<ServiceResponse> {
    const run = this.chain.then(() => this.dispatch(request));
    this.chain = run.catch(() => undefined);
    return run;
  }

  /** Appelée par l'alarme du DO : supprime les données d'un joueur inactif. */
  async expire(): Promise<void> {
    const chronology = await this.deps.storage.load();
    if (chronology) await this.erase(chronology.playerId);
  }

  private async dispatch(request: ServiceRequest): Promise<ServiceResponse> {
    try {
      const decision = this.limiter.hit(this.deps.now());
      if (!decision.allowed) {
        throw new ApiError(
          429,
          'rate_limited',
          'Trop de requêtes, réessaie dans un instant.',
          {
            headers: { 'Retry-After': String(decision.retryAfterSeconds) },
          },
        );
      }
      switch (request.op) {
        case 'leap':
          return await this.leap(request.playerId);
        case 'resolve':
          return await this.resolve(request.playerId, request.body);
        case 'state':
          return ok({
            chronology: await this.load(request.playerId),
          } satisfies StateResponse);
        case 'export':
          return await this.exportData(request.playerId);
        case 'delete':
          await this.erase(request.playerId);
          return ok({ deleted: true });
      }
    } catch (error) {
      return toErrorResponse(error);
    }
  }

  private async load(playerId: string): Promise<Chronology> {
    return (
      (await this.deps.storage.load()) ?? createChronology(playerId, this.deps.now())
    );
  }

  private async persist(chronology: Chronology): Promise<void> {
    await this.deps.storage.save(chronology);
    await this.deps.storage.scheduleExpiry(this.deps.now() + INACTIVITY_EXPIRY_MS);
  }

  private async leap(playerId: string): Promise<ServiceResponse> {
    const chronology = await this.load(playerId);

    // Un saut est déjà en cours : on le rend tel quel (reprise après coupure, idempotence).
    if (chronology.currentLeap) {
      const trace = chronology.currentLeap.traceId
        ? await this.deps.traces.get(chronology.currentLeap.traceId)
        : null;
      return ok(this.leapResponse(chronology, chronology.currentLeap, trace));
    }

    const seed = await leapSeed(playerId, chronology.history.length);
    const generated = generateLeap(
      {
        leapId: this.deps.uuid(),
        seed,
        now: this.deps.now(),
        history: chronology.history,
        world: chronology.world,
        meta: chronology.metaProgress,
      },
      this.deps.catalog,
    );

    let leap: LeapState = generated.leap;
    let trace: Trace | null = null;
    if (generated.wantsTrace) {
      const picked = await this.deps.traces.pickOther(await playerIdHash(playerId), () =>
        this.deps.random(),
      );
      if (picked) {
        leap = { ...leap, traceId: picked.key };
        trace = picked.trace;
      }
    }

    const started = startLeap(chronology, leap);
    await this.persist(started);
    return ok(this.leapResponse(started, leap, trace));
  }

  private leapResponse(
    chronology: Chronology,
    leap: LeapState,
    trace: Trace | null,
  ): LeapResponse {
    return { leap, world: chronology.world, meta: chronology.metaProgress, trace };
  }

  private async resolve(
    playerId: string,
    body: ResolveRequest,
  ): Promise<ServiceResponse> {
    const chronology = await this.load(playerId);

    // Double résolution : on rend le résultat déjà enregistré (§10.2).
    const existing = chronology.history.find((r) => r.leapId === body.leapId);
    if (existing) {
      return ok({ result: existing, nextLeapAvailable: true } satisfies ResolveResponse);
    }

    const current = chronology.currentLeap;
    if (current === null || current.id !== body.leapId) {
      throw new ApiError(409, 'leap_mismatch', 'Ce saut n’est pas le saut en cours.');
    }

    const premise = this.deps.catalog.premises.find((p) => p.id === current.premiseId);
    const resolution = premise?.resolutions.find((r) => r.id === body.resolutionId);
    if (!premise || !resolution) {
      throw new ApiError(422, 'unknown_resolution', 'Résolution inconnue pour ce saut.', {
        details: [
          { field: 'resolutionId', message: 'Aucune résolution avec cet identifiant.' },
        ],
      });
    }

    const updated: LeapState = {
      ...current,
      suspicion: clampSuspicion(body.suspicion ?? current.suspicion),
      choices: body.choices ?? current.choices,
      visitedBeats: body.visitedBeats ?? current.visitedBeats,
    };
    const now = this.deps.now();
    const resolved = resolveLeap(
      { ...chronology, currentLeap: updated },
      {
        leapId: updated.id,
        outcome: resolution.outcome,
        fractureRepaired: resolution.fractureRepaired,
        mutations: bindMutations(resolution.mutations, {
          leapId: updated.id,
          characterIds: updated.characterIds,
          artifactId: updated.artifactId,
          world: chronology.world,
        }),
        now,
      },
    );
    await this.persist(resolved);

    // Une trace par saut résolu. Best effort : une panne de KV ne doit pas perdre la résolution.
    try {
      await this.deps.traces.put(traceKey(await playerIdHash(playerId), updated.id), {
        fragment: makeTraceFragment(resolution.resultText),
        timestamp: now,
        epoch: premise.epoch,
      });
    } catch {
      // volontairement ignoré
    }

    const result = resolved.history[resolved.history.length - 1];
    if (!result) throw new ApiError(500, 'internal_error', 'Erreur interne.');
    return ok({ result, nextLeapAvailable: true } satisfies ResolveResponse);
  }

  private async exportData(playerId: string): Promise<ServiceResponse> {
    const chronology = await this.load(playerId);
    return ok(
      { exportedAt: this.deps.now(), chronology },
      {
        'Content-Disposition': 'attachment; filename="lhote-export.json"',
      },
    );
  }

  private async erase(playerId: string): Promise<void> {
    await this.deps.traces.deleteByOwner(await playerIdHash(playerId));
    await this.deps.storage.clear();
  }
}

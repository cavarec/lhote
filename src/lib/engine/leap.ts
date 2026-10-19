import type { Character } from '../../../content/characters/types';
import type { Outcome } from '../../../content/premises/types';
import { EngineError } from './errors';
import { createRng } from './rng';
import { inSeason, premisesAt } from './season';
import type {
  Act,
  Catalog,
  Chronology,
  GeneratedLeap,
  GenerateLeapInput,
  LeapResult,
  LeapState,
  MetaProgress,
  WorldMutation,
} from './types';
import {
  applyMutations,
  deliverTransitArtifact,
  findTransitArtifact,
  validateMutations,
} from './world';

/** Probabilité qu'un saut sans objet en transit propose un nouvel objet-trace. */
export const ARTIFACT_NEW_PROBABILITY = 0.5;
/** Probabilité qu'un saut demande une trace d'un autre joueur (§5.8 : 1 sur 5). */
export const TRACE_PROBABILITY = 0.2;
/** Sel pour que le tirage de la trace soit indépendant du reste du générateur. */
export const TRACE_SALT = 0x9e3779b9;
/** Une prémisse jouée dans les N derniers sauts n'est pas retirée. */
export const RECENT_PREMISE_WINDOW = 2;
/** Quand une prémisse de saison est ouverte et pas récente, chance qu'elle soit tirée. */
export const SEASONAL_PROBABILITY = 0.5;

/** Acte selon le numéro du saut (1-based) : 1–5, 6–12, 13–18, puis au-delà. */
export function actForLeap(leapNumber: number): Act {
  if (leapNumber <= 5) return 1;
  if (leapNumber <= 12) return 2;
  if (leapNumber <= 18) return 3;
  return 4;
}

function pickPremiseId(
  rng: ReturnType<typeof createRng>,
  catalog: Catalog,
  history: readonly LeapResult[],
  now: number,
): string {
  // Hors saison, une prémisse de saison n'existe pas ; si tout le catalogue est de saison, on le garde.
  const open = premisesAt(catalog.premises, now);
  const pool = open.length > 0 ? open : catalog.premises;
  const recent = new Set(history.slice(-RECENT_PREMISE_WINDOW).map((r) => r.premiseId));
  const fresh = pool.filter((p) => !recent.has(p.id));
  const seasonal = fresh.filter((p) => p.season && inSeason(p.season, now));
  // Le tirage de la chance n'a lieu que s'il y a une fête : sans elle, les sauts restent ceux d'avant.
  if (seasonal.length > 0 && rng.chance(SEASONAL_PROBABILITY)) {
    return rng.pick(seasonal).id;
  }
  if (fresh.length > 0) return rng.pick(fresh).id;

  // Catalogue trop petit : on prend la prémisse la moins récemment jouée.
  const lastIndex = (id: string): number =>
    history.map((r) => r.premiseId).lastIndexOf(id);
  const oldest = Math.min(...pool.map((p) => lastIndex(p.id)));
  return rng.pick(pool.filter((p) => lastIndex(p.id) === oldest)).id;
}

function pickCharacters(
  rng: ReturnType<typeof createRng>,
  catalog: Catalog,
  history: readonly LeapResult[],
): [Character, Character] {
  const previous = history[history.length - 1];
  const previousArchetypes = new Set(
    (previous?.characterIds ?? [])
      .map((id) => catalog.characters.find((c) => c.id === id)?.archetype)
      .filter((a) => a !== undefined),
  );

  const shuffled = rng.shuffle(catalog.characters);
  let fallback: [Character, Character] | null = null;
  for (let i = 0; i < shuffled.length; i++) {
    for (let j = i + 1; j < shuffled.length; j++) {
      const a = shuffled[i];
      const b = shuffled[j];
      if (!a || !b || a.archetype === b.archetype) continue;
      const pair: [Character, Character] = [a, b];
      const changesArchetype =
        !previousArchetypes.has(a.archetype) || !previousArchetypes.has(b.archetype);
      if (changesArchetype) return pair;
      fallback ??= pair;
    }
  }
  if (fallback) return fallback;
  throw new EngineError(
    'insufficient_characters',
    'Il faut au moins deux personnages d’archétypes distincts.',
  );
}

/**
 * Génère un saut (§5.8). Fonction pure : mêmes entrées, même saut.
 * Ordre des tirages : prémisse, personnages, fracture, objet. La trace a sa propre source.
 */
export function generateLeap(input: GenerateLeapInput, catalog: Catalog): GeneratedLeap {
  if (catalog.premises.length === 0) {
    throw new EngineError('empty_catalog', 'Aucune prémisse dans le catalogue.');
  }
  const rng = createRng(input.seed);

  const premiseId = pickPremiseId(rng, catalog, input.history, input.now);
  const premise = catalog.premises.find((p) => p.id === premiseId);
  if (!premise) {
    throw new EngineError('empty_catalog', `Prémisse introuvable : ${premiseId}.`);
  }

  const characters = pickCharacters(rng, catalog, input.history);

  const fractureId = rng.pick(premise.fractures);
  if (!catalog.fractures.some((f) => f.id === fractureId)) {
    throw new EngineError('unknown_fracture', `Fracture inconnue : ${fractureId}.`);
  }

  const transit = findTransitArtifact(input.world);
  let artifactId: string | null = null;
  if (transit) {
    artifactId = transit.artifactId;
  } else if (rng.chance(ARTIFACT_NEW_PROBABILITY)) {
    const owned = new Set(input.world.artifacts.map((a) => a.artifactId));
    const available = catalog.artifacts.filter((a) => !owned.has(a.id));
    if (available.length > 0) artifactId = rng.pick(available).id;
  }

  const act = actForLeap(input.history.length + 1);
  const discovered = new Set(input.meta.fragmentsDiscovered);
  const fragment = [...catalog.fragments]
    .sort((a, b) => a.act - b.act || a.order - b.order)
    .find((f) => f.act <= act && !discovered.has(f.id));

  const wantsTrace = createRng((input.seed ^ TRACE_SALT) >>> 0).chance(TRACE_PROBABILITY);

  const leap: LeapState = {
    id: input.leapId,
    seed: input.seed,
    premiseId,
    characterIds: characters.map((c) => c.id),
    fractureId,
    artifactId,
    fragmentId: fragment?.id ?? null,
    traceId: null,
    startedAt: input.now,
    suspicion: 0,
    visitedBeats: [],
    choices: {},
  };
  return { leap, wantsTrace };
}

/** Met à jour la méta-progression à la fin d'un saut. `completed` = sauts terminés. */
export function advanceMeta(
  meta: MetaProgress,
  leap: LeapState,
  completed: number,
): MetaProgress {
  const fragments =
    leap.fragmentId && !meta.fragmentsDiscovered.includes(leap.fragmentId)
      ? [...meta.fragmentsDiscovered, leap.fragmentId]
      : meta.fragmentsDiscovered;
  return { fragmentsDiscovered: fragments, act: actForLeap(completed + 1) };
}

/**
 * Démarre un saut généré. Le Durable Object doit appeler cette fonction : elle livre
 * l'objet en transit au saut qui le porte.
 */
export function startLeap(chronology: Chronology, leap: LeapState): Chronology {
  if (chronology.currentLeap !== null) {
    throw new EngineError('leap_in_progress', 'Un saut est déjà en cours.');
  }
  const transit = findTransitArtifact(chronology.world);
  const world =
    transit && leap.artifactId === transit.artifactId
      ? deliverTransitArtifact(chronology.world, leap.id)
      : chronology.world;
  return { ...chronology, currentLeap: leap, world };
}

export interface LeapResolution {
  leapId: string;
  outcome: Outcome;
  fractureRepaired: boolean;
  mutations: readonly WorldMutation[];
  now: number;
}

/** Clôt le saut en cours. Idempotent : rejouer une résolution déjà enregistrée ne change rien. */
export function resolveLeap(
  chronology: Chronology,
  resolution: LeapResolution,
): Chronology {
  if (chronology.history.some((r) => r.leapId === resolution.leapId)) {
    return chronology;
  }
  const current = chronology.currentLeap;
  if (current === null || current.id !== resolution.leapId) {
    throw new EngineError('leap_mismatch', 'Ce saut n’est pas le saut en cours.');
  }
  const check = validateMutations(resolution.mutations);
  if (!check.ok) {
    throw new EngineError('invalid_mutations', check.message);
  }

  const world = applyMutations(chronology.world, resolution.mutations);
  const result: LeapResult = {
    leapId: current.id,
    premiseId: current.premiseId,
    characterIds: current.characterIds,
    outcome: resolution.outcome,
    fractureRepaired: resolution.fractureRepaired,
    worldMutations: [...resolution.mutations],
    resolvedAt: resolution.now,
    finalSuspicion: current.suspicion,
  };
  const history = [...chronology.history, result];
  return {
    ...chronology,
    currentLeap: null,
    history,
    world,
    metaProgress: advanceMeta(chronology.metaProgress, current, history.length),
  };
}

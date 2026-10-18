import { EngineError } from './errors';
import type {
  Artifact,
  Chronology,
  WorldMutation,
  WorldState,
  WorldVariable,
} from './types';

/** Un saut modifie au plus 2 variables de monde, de types distincts (§6.5). */
export const MAX_MUTATIONS_PER_LEAP = 2;

export function createWorld(): WorldState {
  return { doors: [], people: [], truths: [], artifacts: [], scars: [] };
}

export function createChronology(playerId: string, now: number): Chronology {
  return {
    schemaVersion: 1,
    playerId,
    createdAt: now,
    currentLeap: null,
    history: [],
    world: createWorld(),
    metaProgress: { fragmentsDiscovered: [], act: 1 },
  };
}

const VARIABLE_BY_TYPE: Readonly<Record<WorldMutation['type'], WorldVariable>> = {
  addDoor: 'doors',
  addPerson: 'people',
  addTruth: 'truths',
  addArtifact: 'artifacts',
  addScar: 'scars',
};

export function mutationVariable(mutation: WorldMutation): WorldVariable {
  return VARIABLE_BY_TYPE[mutation.type];
}

export type MutationCheck = { ok: true } | { ok: false; message: string };

export function validateMutations(mutations: readonly WorldMutation[]): MutationCheck {
  if (mutations.length > MAX_MUTATIONS_PER_LEAP) {
    return {
      ok: false,
      message: `Au plus ${MAX_MUTATIONS_PER_LEAP} mutations par saut (reçu : ${mutations.length}).`,
    };
  }
  const seen = new Set<WorldVariable>();
  for (const mutation of mutations) {
    const variable = mutationVariable(mutation);
    if (seen.has(variable)) {
      return { ok: false, message: `Deux mutations de même type (${variable}).` };
    }
    seen.add(variable);
  }
  return { ok: true };
}

/** L'objet-trace en attente d'être porté dans un prochain saut, s'il y en a un. */
export function findTransitArtifact(world: WorldState): Artifact | undefined {
  return world.artifacts.find((artifact) => artifact.toLeap === null);
}

/** Marque l'objet en transit comme porté dans le saut donné. Sans objet : monde inchangé. */
export function deliverTransitArtifact(world: WorldState, leapId: string): WorldState {
  const transit = findTransitArtifact(world);
  if (!transit) return world;
  return {
    ...world,
    artifacts: world.artifacts.map((artifact) =>
      artifact.id === transit.id ? { ...artifact, toLeap: leapId } : artifact,
    ),
  };
}

function assertFreshId(
  ids: readonly string[],
  id: string,
  variable: WorldVariable,
): void {
  if (ids.includes(id)) {
    throw new EngineError(
      'duplicate_id',
      `Identifiant déjà présent dans ${variable} : ${id}.`,
    );
  }
}

/** Applique les mutations sans modifier le monde d'origine. */
export function applyMutations(
  world: WorldState,
  mutations: readonly WorldMutation[],
): WorldState {
  const check = validateMutations(mutations);
  if (!check.ok) {
    throw new EngineError('invalid_mutations', check.message);
  }

  let next: WorldState = world;
  for (const mutation of mutations) {
    switch (mutation.type) {
      case 'addDoor':
        assertFreshId(
          next.doors.map((d) => d.id),
          mutation.door.id,
          'doors',
        );
        next = { ...next, doors: [...next.doors, mutation.door] };
        break;
      case 'addPerson':
        assertFreshId(
          next.people.map((p) => p.id),
          mutation.person.id,
          'people',
        );
        next = { ...next, people: [...next.people, mutation.person] };
        break;
      case 'addTruth':
        assertFreshId(
          next.truths.map((t) => t.id),
          mutation.truth.id,
          'truths',
        );
        next = { ...next, truths: [...next.truths, mutation.truth] };
        break;
      case 'addScar':
        assertFreshId(
          next.scars.map((s) => s.id),
          mutation.scar.id,
          'scars',
        );
        next = { ...next, scars: [...next.scars, mutation.scar] };
        break;
      case 'addArtifact':
        assertFreshId(
          next.artifacts.map((a) => a.id),
          mutation.artifact.id,
          'artifacts',
        );
        if (mutation.artifact.toLeap !== null) {
          throw new EngineError(
            'invalid_mutations',
            'Un nouvel objet doit être en transit (toLeap = null).',
          );
        }
        if (findTransitArtifact(next)) {
          throw new EngineError('artifact_in_transit', 'Un objet est déjà en transit.');
        }
        next = { ...next, artifacts: [...next.artifacts, mutation.artifact] };
        break;
    }
  }
  return next;
}

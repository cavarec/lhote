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

/** Valeur de `artifactId` dans le contenu : « l'objet que ce saut propose » (voir bindMutations). */
export const LEAP_ARTIFACT = 'leap';

export interface BindContext {
  leapId: string;
  /** Personnages du saut : un `characterId` « 0 » ou « 1 » désigne leur emplacement. */
  characterIds: readonly string[];
  /** Objet proposé par ce saut, s'il y en a un. */
  artifactId: string | null;
  world: WorldState;
}

/**
 * Rend les mutations du contenu applicables à un saut précis. Le contenu est statique et la même
 * prémisse peut revenir : sans cette étape, ses identifiants entreraient en collision.
 * - les identifiants sont suffixés par le saut (`door-1@<leapId>`) et les champs `leapId` fixés ;
 * - `characterId` « 0 » ou « 1 » devient le personnage de cet emplacement ;
 * - un objet d'`artifactId` « leap » devient l'objet du saut ; il disparaît s'il n'y en a pas,
 *   ou si l'objet était déjà porté depuis un saut précédent (il ne se crée pas deux fois).
 */
export function bindMutations(
  mutations: readonly WorldMutation[],
  context: BindContext,
): WorldMutation[] {
  const { leapId } = context;
  const suffix = (id: string): string => `${id}@${leapId}`;
  const bound: WorldMutation[] = [];

  for (const mutation of mutations) {
    switch (mutation.type) {
      case 'addDoor':
        bound.push({
          type: 'addDoor',
          door: { ...mutation.door, id: suffix(mutation.door.id), openedInLeap: leapId },
        });
        break;
      case 'addPerson': {
        const slot = /^[01]$/.test(mutation.person.characterId)
          ? context.characterIds[Number(mutation.person.characterId)]
          : undefined;
        bound.push({
          type: 'addPerson',
          person: {
            ...mutation.person,
            id: suffix(mutation.person.id),
            characterId: slot ?? mutation.person.characterId,
            leapId,
          },
        });
        break;
      }
      case 'addTruth':
        bound.push({
          type: 'addTruth',
          truth: { ...mutation.truth, id: suffix(mutation.truth.id), leapId },
        });
        break;
      case 'addScar':
        bound.push({
          type: 'addScar',
          scar: { ...mutation.scar, id: suffix(mutation.scar.id), leapId },
        });
        break;
      case 'addArtifact': {
        let artifactId = mutation.artifact.artifactId;
        if (artifactId === LEAP_ARTIFACT) {
          const carried = context.world.artifacts.some(
            (a) => a.artifactId === context.artifactId && a.toLeap === leapId,
          );
          if (context.artifactId === null || carried) break;
          artifactId = context.artifactId;
        }
        bound.push({
          type: 'addArtifact',
          artifact: {
            ...mutation.artifact,
            id: suffix(mutation.artifact.id),
            artifactId,
            fromLeap: leapId,
            toLeap: null,
          },
        });
        break;
      }
    }
  }
  return bound;
}

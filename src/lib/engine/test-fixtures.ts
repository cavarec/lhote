import type { Archetype, Character } from '../../../content/characters/types';
import type { Premise } from '../../../content/premises/types';
import { createWorld } from './world';
import type {
  Artifact,
  Catalog,
  GenerateLeapInput,
  LeapResult,
  MetaProgress,
  WorldState,
} from './types';

export function makePremise(id: string, fractures: [string, string]): Premise {
  return {
    id,
    title: `Prémisse ${id}`,
    epoch: 'Époque test',
    wakeup: 'Vous vous réveillez.',
    orientation: [],
    openingDialogue: { npcId: 'c1', lines: [] },
    investigation: [],
    fractures,
    resolutions: [],
  };
}

export function makeCharacter(id: string, archetype: Archetype): Character {
  return { id, archetype, name: `Perso ${id}`, voice: 'neutre', dialogues: {} };
}

export function makeCatalog(): Catalog {
  const archetypes: Archetype[] = ['confident', 'worried', 'hostile', 'innocent'];
  return {
    premises: [1, 2, 3, 4].map((n) =>
      makePremise(`p${n}`, [`f${2 * n - 1}`, `f${2 * n}`]),
    ),
    characters: [1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
      makeCharacter(`c${n}`, archetypes[(n - 1) % 4] ?? 'confident'),
    ),
    fractures: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      id: `f${n}`,
      title: `Fracture ${n}`,
      interpretations: ['lecture A', 'lecture B'],
    })),
    artifacts: [1, 2, 3].map((n) => ({
      id: `a${n}`,
      name: `Objet ${n}`,
      description: 'x',
    })),
    echoes: [{ id: 'e1', kind: 'phrase', text: 'un écho' }],
    observerMessages: [
      { id: 'o1', type: 'useful', text: 'utile' },
      { id: 'o2', type: 'useless', text: 'inutile' },
      { id: 'o3', type: 'false', text: 'faux' },
      { id: 'o4', type: 'personal', text: 'personnel' },
    ],
    fragments: [
      { id: 'g1', act: 1, order: 1, text: 'un' },
      { id: 'g2', act: 1, order: 2, text: 'deux' },
      { id: 'g3', act: 2, order: 1, text: 'trois' },
      { id: 'g4', act: 2, order: 2, text: 'quatre' },
      { id: 'g5', act: 3, order: 1, text: 'cinq' },
      { id: 'g6', act: 4, order: 1, text: 'six' },
    ],
  };
}

export function makeResult(
  index: number,
  premiseId: string,
  characterIds: string[] = ['c1', 'c2'],
): LeapResult {
  return {
    leapId: `leap-${index}`,
    premiseId,
    characterIds,
    outcome: 'resolved',
    fractureRepaired: true,
    worldMutations: [],
    resolvedAt: 1000 + index,
    finalSuspicion: 0,
  };
}

export function makeArtifact(id: string, toLeap: string | null = null): Artifact {
  return { id, artifactId: 'a1', fromLeap: 'leap-0', toLeap };
}

export function makeMeta(overrides: Partial<MetaProgress> = {}): MetaProgress {
  return { fragmentsDiscovered: [], act: 1, ...overrides };
}

export function makeInput(overrides: Partial<GenerateLeapInput> = {}): GenerateLeapInput {
  const world: WorldState = createWorld();
  return {
    leapId: 'leap-new',
    seed: 1,
    now: 5000,
    history: [],
    world,
    meta: makeMeta(),
    ...overrides,
  };
}

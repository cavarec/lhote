import { describe, expect, it } from 'vitest';
import { EngineError } from './errors';
import { makeArtifact } from './test-fixtures';
import type { Door, Person, Scar, Truth, WorldMutation } from './types';
import {
  applyMutations,
  createChronology,
  createWorld,
  deliverTransitArtifact,
  findTransitArtifact,
  MAX_MUTATIONS_PER_LEAP,
  mutationVariable,
  validateMutations,
} from './world';

const door: Door = { id: 'd1', label: 'Porte', openedInLeap: 'l1', epoch: 'e' };
const person: Person = {
  id: 'p1',
  characterId: 'c1',
  status: 'saved',
  leapId: 'l1',
  epoch: 'e',
};
const truth: Truth = { id: 't1', summary: 'vrai', leapId: 'l1' };
const scar: Scar = { id: 's1', description: 'marque', leapId: 'l1', epoch: 'e' };

const addDoor: WorldMutation = { type: 'addDoor', door };
const addPerson: WorldMutation = { type: 'addPerson', person };
const addTruth: WorldMutation = { type: 'addTruth', truth };
const addScar: WorldMutation = { type: 'addScar', scar };
const addArtifact: WorldMutation = { type: 'addArtifact', artifact: makeArtifact('x1') };

function codeOf(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (error) {
    return error instanceof EngineError ? error.code : 'autre';
  }
  return undefined;
}

describe('createChronology', () => {
  it('crée une chronologie vide', () => {
    const chronology = createChronology('joueur', 123);
    expect(chronology).toMatchObject({
      schemaVersion: 1,
      playerId: 'joueur',
      createdAt: 123,
      currentLeap: null,
      history: [],
      metaProgress: { fragmentsDiscovered: [], act: 1 },
    });
    expect(chronology.world).toEqual(createWorld());
  });
});

describe('validateMutations', () => {
  it('accepte 0, 1 ou 2 mutations de types distincts', () => {
    expect(validateMutations([]).ok).toBe(true);
    expect(validateMutations([addDoor]).ok).toBe(true);
    expect(validateMutations([addDoor, addScar]).ok).toBe(true);
  });

  it('refuse plus de 2 mutations', () => {
    expect(MAX_MUTATIONS_PER_LEAP).toBe(2);
    const result = validateMutations([addDoor, addPerson, addTruth]);
    expect(result.ok).toBe(false);
  });

  it('refuse deux mutations du même type', () => {
    const other: WorldMutation = { type: 'addDoor', door: { ...door, id: 'd2' } };
    const result = validateMutations([addDoor, other]);
    expect(result).toEqual({ ok: false, message: expect.stringContaining('doors') });
  });

  it('associe chaque mutation à sa variable', () => {
    expect(
      [addDoor, addPerson, addTruth, addArtifact, addScar].map(mutationVariable),
    ).toEqual(['doors', 'people', 'truths', 'artifacts', 'scars']);
  });
});

describe('applyMutations', () => {
  it('ajoute chaque type sans modifier le monde d’origine', () => {
    const world = createWorld();
    const result = applyMutations(world, [addDoor, addPerson]);
    expect(result.doors).toEqual([door]);
    expect(result.people).toEqual([person]);
    expect(world).toEqual(createWorld());

    expect(applyMutations(world, [addTruth]).truths).toEqual([truth]);
    expect(applyMutations(world, [addScar]).scars).toEqual([scar]);
    expect(applyMutations(world, [addArtifact]).artifacts).toHaveLength(1);
  });

  it('refuse les ensembles invalides', () => {
    expect(
      codeOf(() => applyMutations(createWorld(), [addDoor, addPerson, addTruth])),
    ).toBe('invalid_mutations');
  });

  it('refuse les identifiants en double pour chaque variable', () => {
    const world = applyMutations(createWorld(), [addDoor, addPerson]);
    const world2 = applyMutations(world, [addTruth, addScar]);
    for (const mutation of [addDoor, addPerson, addTruth, addScar]) {
      expect(codeOf(() => applyMutations(world2, [mutation]))).toBe('duplicate_id');
    }
    const withArtifact = applyMutations(createWorld(), [addArtifact]);
    expect(codeOf(() => applyMutations(withArtifact, [addArtifact]))).toBe(
      'duplicate_id',
    );
  });

  it('refuse un nouvel objet déjà livré', () => {
    const delivered: WorldMutation = {
      type: 'addArtifact',
      artifact: makeArtifact('x2', 'leap-9'),
    };
    expect(codeOf(() => applyMutations(createWorld(), [delivered]))).toBe(
      'invalid_mutations',
    );
  });

  it('refuse un second objet en transit', () => {
    const world = applyMutations(createWorld(), [addArtifact]);
    const second: WorldMutation = { type: 'addArtifact', artifact: makeArtifact('x3') };
    expect(codeOf(() => applyMutations(world, [second]))).toBe('artifact_in_transit');
  });
});

describe('objet en transit', () => {
  it('se trouve et se livre', () => {
    const world = applyMutations(createWorld(), [addArtifact]);
    expect(findTransitArtifact(world)?.id).toBe('x1');

    const delivered = deliverTransitArtifact(world, 'leap-2');
    expect(delivered.artifacts[0]?.toLeap).toBe('leap-2');
    expect(findTransitArtifact(delivered)).toBeUndefined();
    expect(world.artifacts[0]?.toLeap).toBeNull();
  });

  it('ne change rien sans objet en transit', () => {
    const world = createWorld();
    expect(deliverTransitArtifact(world, 'leap-2')).toBe(world);
  });

  it('ne livre que l’objet en transit', () => {
    const delivered = { ...makeArtifact('old', 'leap-1') };
    const world = { ...createWorld(), artifacts: [delivered, makeArtifact('fresh')] };
    const result = deliverTransitArtifact(world, 'leap-3');
    expect(result.artifacts.map((a) => a.toLeap)).toEqual(['leap-1', 'leap-3']);
  });
});

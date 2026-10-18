import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import type { LeapResponse } from '../api/types';
import type { LeapState } from '../engine/types';
import { createWorld } from '../engine/world';
import { IdbStorage, openStorage } from './indexeddb';
import { MemoryStorage } from './memory';
import { DEFAULT_SETTINGS, KEPT_LEAPS, type PendingResolve } from './schema';
import type { GameStorage } from './storage';

function leapState(id: string): LeapState {
  return {
    id,
    seed: 1,
    premiseId: 'premise-01',
    characterIds: ['character-01', 'character-03'],
    fractureId: 'fracture-01',
    artifactId: null,
    fragmentId: null,
    traceId: null,
    startedAt: 1,
    suspicion: 0,
    visitedBeats: [],
    choices: {},
  };
}

function response(id: string): LeapResponse {
  return {
    leap: leapState(id),
    world: createWorld(),
    meta: { fragmentsDiscovered: [], act: 1 },
    trace: null,
  };
}

function pending(leapId: string, queuedAt: number): PendingResolve {
  return { request: { leapId, resolutionId: 'r' }, queuedAt, attempts: 0 };
}

let dbCounter = 0;

const implementations: [string, () => Promise<GameStorage>][] = [
  ['mémoire', () => Promise.resolve(new MemoryStorage())],
  ['IndexedDB', () => IdbStorage.open(`test-${dbCounter++}`)],
];

describe.each(implementations)('stockage : %s', (_name, create) => {
  it('garde l’identifiant du joueur et les réglages', async () => {
    const storage = await create();
    expect(await storage.getPlayerId()).toBeNull();
    expect(await storage.getSettings()).toBeNull();
    await storage.setPlayerId('abc');
    await storage.setSettings({ ...DEFAULT_SETTINGS, textSize: 'large' });
    expect(await storage.getPlayerId()).toBe('abc');
    expect(await storage.getSettings()).toEqual({
      ...DEFAULT_SETTINGS,
      textSize: 'large',
    });
  });

  it('conserve les trois derniers sauts reçus, du plus ancien au plus récent', async () => {
    const storage = await create();
    expect(await storage.getLatestLeap()).toBeNull();
    for (let i = 1; i <= 5; i++) {
      await storage.saveLeap({ response: response(`leap-${i}`), receivedAt: i });
    }
    const kept = await storage.listLeaps();
    expect(KEPT_LEAPS).toBe(3);
    expect(kept.map((l) => l.response.leap.id)).toEqual(['leap-3', 'leap-4', 'leap-5']);
    expect((await storage.getLatestLeap())?.response.leap.id).toBe('leap-5');
  });

  it('remplace un saut reçu deux fois au lieu de le dupliquer', async () => {
    const storage = await create();
    await storage.saveLeap({ response: response('a'), receivedAt: 1 });
    await storage.saveLeap({ response: response('a'), receivedAt: 2 });
    expect(await storage.listLeaps()).toHaveLength(1);
  });

  it('sauve, relit et efface la progression', async () => {
    const storage = await create();
    expect(await storage.getProgress()).toBeNull();
    const progress = { ...leapState('p'), suspicion: 25, visitedBeats: [1, 2] };
    await storage.saveProgress(progress);
    expect(await storage.getProgress()).toEqual(progress);
    await storage.clearProgress();
    expect(await storage.getProgress()).toBeNull();
  });

  it('garde l’état du serveur pour le hors-ligne', async () => {
    const storage = await create();
    expect(await storage.getState()).toBeNull();
    const state = {
      state: { chronology: { playerId: 'p' } as never },
      savedAt: 3,
    };
    await storage.saveState(state);
    expect(await storage.getState()).toEqual(state);
  });

  it('tient la file des résolutions en attente, dans l’ordre d’arrivée', async () => {
    const storage = await create();
    await storage.enqueueResolve(pending('b', 20));
    await storage.enqueueResolve(pending('a', 10));
    expect((await storage.listPending()).map((p) => p.request.leapId)).toEqual([
      'a',
      'b',
    ]);

    await storage.updatePending({ ...pending('a', 10), attempts: 2 });
    expect((await storage.listPending())[0]?.attempts).toBe(2);

    await storage.removePending('a');
    expect((await storage.listPending()).map((p) => p.request.leapId)).toEqual(['b']);
  });

  it('efface toutes les données', async () => {
    const storage = await create();
    await storage.setPlayerId('abc');
    await storage.setSettings(DEFAULT_SETTINGS);
    await storage.saveLeap({ response: response('a'), receivedAt: 1 });
    await storage.saveProgress(leapState('a'));
    await storage.saveState({ state: { chronology: {} as never }, savedAt: 1 });
    await storage.enqueueResolve(pending('a', 1));

    await storage.clearAll();
    expect(await storage.getPlayerId()).toBeNull();
    expect(await storage.getSettings()).toBeNull();
    expect(await storage.listLeaps()).toEqual([]);
    expect(await storage.getProgress()).toBeNull();
    expect(await storage.getState()).toBeNull();
    expect(await storage.listPending()).toEqual([]);
  });
});

describe('openStorage', () => {
  it('ouvre IndexedDB quand il est disponible', async () => {
    const opened = await openStorage(`open-${dbCounter++}`);
    expect(opened.degraded).toBe(false);
    expect(opened.storage.kind).toBe('indexeddb');
  });

  it('se replie sur la mémoire, sans erreur, quand IndexedDB est absent', async () => {
    const original = globalThis.indexedDB;
    // @ts-expect-error simulation d'un navigateur sans IndexedDB (navigation privée)
    delete globalThis.indexedDB;
    try {
      const opened = await openStorage();
      expect(opened).toMatchObject({ degraded: true });
      expect(opened.storage.kind).toBe('memory');
    } finally {
      globalThis.indexedDB = original;
    }
  });

  it('se replie sur la mémoire quand l’ouverture échoue', async () => {
    const original = globalThis.indexedDB;
    globalThis.indexedDB = {
      open: () => {
        throw new Error('SecurityError');
      },
    } as unknown as IDBFactory;
    try {
      expect((await openStorage()).degraded).toBe(true);
    } finally {
      globalThis.indexedDB = original;
    }
  });
});

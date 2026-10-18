import type { Trace } from '../../src/lib/api/types';
import { makeCatalog } from '../../src/lib/engine/test-fixtures';
import type { Catalog, Chronology, WorldMutation } from '../../src/lib/engine/types';
import type { ChronologyStorage, ServiceDeps } from '../src/durable/service';
import type { TraceStore } from '../src/utils/traces';

export function uuid(n: number): string {
  const hex = n.toString(16).padStart(12, '0');
  return `00000000-0000-4000-8000-${hex}`;
}

const door: WorldMutation = {
  type: 'addDoor',
  door: { id: 'door-1', label: 'Une porte', openedInLeap: 'x', epoch: 'e' },
};
const truth: WorldMutation = {
  type: 'addTruth',
  truth: { id: 'truth-1', summary: 'Une vérité', leapId: 'x' },
};
const secondDoor: WorldMutation = {
  type: 'addDoor',
  door: { id: 'door-2', label: 'Autre', openedInLeap: 'x', epoch: 'e' },
};

/** Catalogue du moteur, dont les prémisses reçoivent des résolutions. */
export function makeServiceCatalog(): Catalog {
  const base = makeCatalog();
  return {
    ...base,
    premises: base.premises.map((premise) => ({
      ...premise,
      epoch: 'Rome, 64',
      resolutions: [
        {
          id: 'repair',
          choiceText: 'Réparer',
          outcome: 'resolved' as const,
          fractureRepaired: true,
          resultText: 'La porte cède. Vous repartez <b>sans bruit</b>. Autre phrase.',
          mutations: [door, truth],
        },
        {
          id: 'flee',
          choiceText: 'Fuir',
          outcome: 'failed' as const,
          fractureRepaired: false,
          resultText: 'Vous fuyez',
          mutations: [],
        },
        {
          id: 'broken',
          choiceText: 'Résolution défectueuse',
          outcome: 'resolved' as const,
          fractureRepaired: true,
          resultText: 'x',
          mutations: [door, secondDoor],
        },
      ],
    })),
  };
}

export class MemoryStorage implements ChronologyStorage {
  value: Chronology | null = null;
  expiryAt: number | null = null;
  failLoad = false;

  load(): Promise<Chronology | null> {
    if (this.failLoad) return Promise.reject(new Error('stockage indisponible'));
    return Promise.resolve(this.value);
  }
  save(chronology: Chronology): Promise<void> {
    this.value = structuredClone(chronology);
    return Promise.resolve();
  }
  clear(): Promise<void> {
    this.value = null;
    this.expiryAt = null;
    return Promise.resolve();
  }
  scheduleExpiry(at: number): Promise<void> {
    this.expiryAt = at;
    return Promise.resolve();
  }
}

export class MemoryTraces implements TraceStore {
  readonly data = new Map<string, Trace>();
  failPut = false;
  pickCalls = 0;

  pickOther(ownHash: string): Promise<{ key: string; trace: Trace } | null> {
    this.pickCalls++;
    for (const [key, trace] of this.data) {
      if (!key.startsWith(`trace:${ownHash}:`)) return Promise.resolve({ key, trace });
    }
    return Promise.resolve(null);
  }
  get(key: string): Promise<Trace | null> {
    return Promise.resolve(this.data.get(key) ?? null);
  }
  put(key: string, trace: Trace): Promise<void> {
    if (this.failPut) return Promise.reject(new Error('KV indisponible'));
    this.data.set(key, trace);
    return Promise.resolve();
  }
  deleteByOwner(ownHash: string): Promise<void> {
    for (const key of [...this.data.keys()]) {
      if (key.startsWith(`trace:${ownHash}:`)) this.data.delete(key);
    }
    return Promise.resolve();
  }
}

export function makeDeps(overrides: Partial<ServiceDeps> = {}) {
  const storage = new MemoryStorage();
  const traces = new MemoryTraces();
  let clock = 1_700_000_000_000;
  let counter = 0;
  const deps: ServiceDeps = {
    catalog: makeServiceCatalog(),
    storage,
    traces,
    now: () => clock,
    uuid: () => uuid(0x1000 + counter++),
    random: () => 0,
    ...overrides,
  };
  return {
    deps,
    storage,
    traces,
    advance(ms: number) {
      clock += ms;
    },
  };
}

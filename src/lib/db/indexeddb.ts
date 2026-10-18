import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { MemoryStorage } from './memory';
import {
  DB_NAME,
  DB_VERSION,
  KEPT_LEAPS,
  type PendingResolve,
  type Progress,
  type Settings,
  type StoredLeap,
  type StoredState,
} from './schema';
import type { GameStorage } from './storage';

interface LhoteDb extends DBSchema {
  /** Valeurs isolées : identifiant du joueur, réglages, progression, cache d'état. */
  meta: {
    key: string;
    value: unknown;
  };
  leaps: {
    key: string;
    value: StoredLeap;
    indexes: { 'by-received': number };
  };
  pending: {
    key: string;
    value: PendingResolve;
  };
}

const PLAYER_ID = 'playerId';
const SETTINGS = 'settings';
const PROGRESS = 'progress';
const STATE = 'state';

export class IdbStorage implements GameStorage {
  readonly kind = 'indexeddb' as const;

  private constructor(private readonly db: IDBPDatabase<LhoteDb>) {}

  static async open(name: string = DB_NAME): Promise<IdbStorage> {
    const db = await openDB<LhoteDb>(name, DB_VERSION, {
      upgrade(database) {
        database.createObjectStore('meta');
        const leaps = database.createObjectStore('leaps', {
          keyPath: 'response.leap.id',
        });
        leaps.createIndex('by-received', 'receivedAt');
        database.createObjectStore('pending', { keyPath: 'request.leapId' });
      },
    });
    return new IdbStorage(db);
  }

  // Les valeurs de `meta` sont relues avec un type attendu : un cast par accesseur, justifié
  // car chaque clé n'est écrite que par le setter qui lui correspond.
  private async getMeta<T>(key: string): Promise<T | null> {
    return ((await this.db.get('meta', key)) as T | undefined) ?? null;
  }

  getPlayerId(): Promise<string | null> {
    return this.getMeta<string>(PLAYER_ID);
  }
  async setPlayerId(id: string): Promise<void> {
    await this.db.put('meta', id, PLAYER_ID);
  }

  getSettings(): Promise<Settings | null> {
    return this.getMeta<Settings>(SETTINGS);
  }
  async setSettings(settings: Settings): Promise<void> {
    await this.db.put('meta', settings, SETTINGS);
  }

  async saveLeap(leap: StoredLeap): Promise<void> {
    const tx = this.db.transaction('leaps', 'readwrite');
    await tx.store.put(leap);
    const all = await tx.store.index('by-received').getAll();
    for (const old of all.slice(0, Math.max(0, all.length - KEPT_LEAPS))) {
      await tx.store.delete(old.response.leap.id);
    }
    await tx.done;
  }
  async getLatestLeap(): Promise<StoredLeap | null> {
    const all = await this.listLeaps();
    return all[all.length - 1] ?? null;
  }
  listLeaps(): Promise<StoredLeap[]> {
    return this.db.getAllFromIndex('leaps', 'by-received');
  }

  getProgress(): Promise<Progress | null> {
    return this.getMeta<Progress>(PROGRESS);
  }
  async saveProgress(progress: Progress): Promise<void> {
    await this.db.put('meta', progress, PROGRESS);
  }
  async clearProgress(): Promise<void> {
    await this.db.delete('meta', PROGRESS);
  }

  getState(): Promise<StoredState | null> {
    return this.getMeta<StoredState>(STATE);
  }
  async saveState(state: StoredState): Promise<void> {
    await this.db.put('meta', state, STATE);
  }

  async enqueueResolve(pending: PendingResolve): Promise<void> {
    await this.db.put('pending', pending);
  }
  async listPending(): Promise<PendingResolve[]> {
    const all = await this.db.getAll('pending');
    return all.sort((a, b) => a.queuedAt - b.queuedAt);
  }
  async removePending(leapId: string): Promise<void> {
    await this.db.delete('pending', leapId);
  }
  async updatePending(pending: PendingResolve): Promise<void> {
    await this.db.put('pending', pending);
  }

  async clearAll(): Promise<void> {
    const tx = this.db.transaction(['meta', 'leaps', 'pending'], 'readwrite');
    await Promise.all([
      tx.objectStore('meta').clear(),
      tx.objectStore('leaps').clear(),
      tx.objectStore('pending').clear(),
    ]);
    await tx.done;
  }
}

export interface OpenedStorage {
  storage: GameStorage;
  /** Vrai quand IndexedDB est indisponible : l'interface doit prévenir le joueur (§10.1). */
  degraded: boolean;
}

/** Ouvre IndexedDB ; en cas d'échec, replie sur la mémoire sans jamais bloquer le joueur. */
export async function openStorage(name: string = DB_NAME): Promise<OpenedStorage> {
  try {
    if (typeof indexedDB === 'undefined') throw new Error('IndexedDB absent');
    return { storage: await IdbStorage.open(name), degraded: false };
  } catch {
    return { storage: new MemoryStorage(), degraded: true };
  }
}

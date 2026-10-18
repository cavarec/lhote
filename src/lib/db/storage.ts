import type {
  PendingResolve,
  Progress,
  Settings,
  StoredLeap,
  StoredState,
} from './schema';

/**
 * Tout ce que le jeu garde sur l'appareil. Deux implémentations : IndexedDB, et une version en
 * mémoire pour les navigations où IndexedDB n'existe pas (navigation privée de Firefox).
 */
export interface GameStorage {
  readonly kind: 'indexeddb' | 'memory';

  getPlayerId(): Promise<string | null>;
  setPlayerId(id: string): Promise<void>;

  getSettings(): Promise<Settings | null>;
  setSettings(settings: Settings): Promise<void>;

  /** Garde le saut reçu et ne conserve que les plus récents. */
  saveLeap(leap: StoredLeap): Promise<void>;
  /** Le dernier saut reçu, ou null. */
  getLatestLeap(): Promise<StoredLeap | null>;
  listLeaps(): Promise<StoredLeap[]>;

  getProgress(): Promise<Progress | null>;
  saveProgress(progress: Progress): Promise<void>;
  clearProgress(): Promise<void>;

  getState(): Promise<StoredState | null>;
  saveState(state: StoredState): Promise<void>;

  enqueueResolve(pending: PendingResolve): Promise<void>;
  listPending(): Promise<PendingResolve[]>;
  removePending(leapId: string): Promise<void>;
  updatePending(pending: PendingResolve): Promise<void>;

  /** Efface tout (suppression des données, §5.7). */
  clearAll(): Promise<void>;
}

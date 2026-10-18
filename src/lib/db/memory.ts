import { KEPT_LEAPS } from './schema';
import type {
  PendingResolve,
  Progress,
  Settings,
  StoredLeap,
  StoredState,
} from './schema';
import type { GameStorage } from './storage';

/** Repli sans persistance : le jeu reste jouable, l'état est perdu à la fermeture. */
export class MemoryStorage implements GameStorage {
  readonly kind = 'memory' as const;
  private playerId: string | null = null;
  private settings: Settings | null = null;
  private leaps: StoredLeap[] = [];
  private progress: Progress | null = null;
  private state: StoredState | null = null;
  private pending = new Map<string, PendingResolve>();

  getPlayerId(): Promise<string | null> {
    return Promise.resolve(this.playerId);
  }
  setPlayerId(id: string): Promise<void> {
    this.playerId = id;
    return Promise.resolve();
  }
  getSettings(): Promise<Settings | null> {
    return Promise.resolve(this.settings);
  }
  setSettings(settings: Settings): Promise<void> {
    this.settings = settings;
    return Promise.resolve();
  }
  saveLeap(leap: StoredLeap): Promise<void> {
    this.leaps = [
      ...this.leaps.filter((l) => l.response.leap.id !== leap.response.leap.id),
      leap,
    ]
      .sort((a, b) => a.receivedAt - b.receivedAt)
      .slice(-KEPT_LEAPS);
    return Promise.resolve();
  }
  getLatestLeap(): Promise<StoredLeap | null> {
    return Promise.resolve(this.leaps[this.leaps.length - 1] ?? null);
  }
  listLeaps(): Promise<StoredLeap[]> {
    return Promise.resolve([...this.leaps]);
  }
  getProgress(): Promise<Progress | null> {
    return Promise.resolve(this.progress);
  }
  saveProgress(progress: Progress): Promise<void> {
    this.progress = progress;
    return Promise.resolve();
  }
  clearProgress(): Promise<void> {
    this.progress = null;
    return Promise.resolve();
  }
  getState(): Promise<StoredState | null> {
    return Promise.resolve(this.state);
  }
  saveState(state: StoredState): Promise<void> {
    this.state = state;
    return Promise.resolve();
  }
  enqueueResolve(pending: PendingResolve): Promise<void> {
    this.pending.set(pending.request.leapId, pending);
    return Promise.resolve();
  }
  listPending(): Promise<PendingResolve[]> {
    return Promise.resolve(
      [...this.pending.values()].sort((a, b) => a.queuedAt - b.queuedAt),
    );
  }
  removePending(leapId: string): Promise<void> {
    this.pending.delete(leapId);
    return Promise.resolve();
  }
  updatePending(pending: PendingResolve): Promise<void> {
    this.pending.set(pending.request.leapId, pending);
    return Promise.resolve();
  }
  clearAll(): Promise<void> {
    this.playerId = null;
    this.settings = null;
    this.leaps = [];
    this.progress = null;
    this.state = null;
    this.pending.clear();
    return Promise.resolve();
  }
}

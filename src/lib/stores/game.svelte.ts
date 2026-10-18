import { ApiClient } from '../api/client';
import { openStorage } from '../db/indexeddb';
import type { Settings } from '../db/schema';
import type { Catalog } from '../engine/types';
import {
  BEATS,
  completeBeat,
  currentBeat,
  progressDots,
  type Beat,
  type DotState,
} from '../game/beats';
import {
  GameController,
  GameError,
  type GameProblem,
  type ResolveOutcome,
  type Session,
} from '../game/controller';

// Magasin réactif (runes Svelte 5) au-dessus du contrôleur. Il ne contient aucune règle de jeu :
// il expose l'état à l'interface et recopie chaque action dans le stockage.

export type Phase = 'booting' | 'ready' | 'loading' | 'playing' | 'ended' | 'error';

class GameStore {
  phase = $state<Phase>('booting');
  settings = $state<Settings | null>(null);
  session = $state<Session | null>(null);
  outcome = $state<ResolveOutcome | null>(null);
  problem = $state<GameProblem | null>(null);
  degraded = $state(false);
  firstVisit = $state(false);
  pending = $state(0);
  online = $state(true);

  private controller: GameController | null = null;

  beat = $derived<Beat | null>(this.session ? currentBeat(this.session.leap) : null);
  dots = $derived<DotState[]>(this.session ? progressDots(this.session.leap) : []);
  beatNumber = $derived(this.session ? this.session.leap.visitedBeats.length : 0);
  totalBeats = BEATS.length;

  async boot(): Promise<void> {
    const { storage, degraded } = await openStorage();
    this.degraded = degraded;
    this.controller = new GameController({
      storage,
      createApi: (playerId) => new ApiClient({ playerId }),
      loadCatalog: loadCatalog,
    });
    const { firstVisit } = await this.controller.init();
    this.firstVisit = firstVisit;
    this.settings = this.controller.settings;
    this.pending = await this.controller.pendingCount();
    this.phase = 'ready';
  }

  async start(): Promise<void> {
    await this.run(async (c) => {
      this.outcome = null;
      this.session = await c.startLeap();
      this.phase = 'playing';
    });
  }

  async advance(): Promise<void> {
    await this.update((leap) => completeBeat(leap));
  }

  /** Remplace l'état du saut par `fn(état)` puis le sauve. */
  async update(fn: (leap: Session['leap']) => Session['leap']): Promise<void> {
    if (!this.session || !this.controller) return;
    const leap = fn(this.session.leap);
    this.session = { ...this.session, leap };
    await this.controller.save(leap);
  }

  async resolve(resolutionId: string): Promise<void> {
    const session = this.session;
    if (!session) return;
    await this.run(async (c) => {
      this.outcome = await c.resolve(session, resolutionId);
      this.pending = await c.pendingCount();
      this.session = null;
      this.phase = 'ended';
    }, 'playing');
  }

  async syncPending(): Promise<void> {
    if (!this.controller) return;
    await this.controller.flushPending();
    this.pending = await this.controller.pendingCount();
  }

  async saveSettings(patch: Partial<Settings>): Promise<void> {
    if (this.controller) this.settings = await this.controller.updateSettings(patch);
  }

  get game(): GameController {
    if (!this.controller) throw new Error('boot() doit précéder toute action.');
    return this.controller;
  }

  private async run(
    action: (c: GameController) => Promise<void>,
    fallback: Phase = 'ready',
  ): Promise<void> {
    if (!this.controller) return;
    this.problem = null;
    this.phase = 'loading';
    try {
      await action(this.controller);
    } catch (error) {
      this.problem = error instanceof GameError ? error.problem : 'server';
      this.phase = fallback === 'playing' && this.session ? 'playing' : 'error';
    }
  }
}

/** Chargement différé : le contenu narratif reste hors du bundle initial (§7.5). */
async function loadCatalog(): Promise<Catalog> {
  return (await import('../../../content')).catalog;
}

export const game = new GameStore();

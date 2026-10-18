import { describe, expect, it } from 'vitest';
import { catalog } from '../../../content';
import { premise01 } from '../../../content/premises/premise-01';
import { ApiClientError } from '../api/client';
import type { LeapResponse, ResolveRequest } from '../api/types';
import { MemoryStorage } from '../db/memory';
import type { LeapState } from '../engine/types';
import {
  availableResolutions,
  BeatError,
  chooseDialogue,
  completeBeat,
  currentBeat,
  leanToward,
  progressDots,
  revealClue,
  speakerFor,
  visibleInvestigation,
} from './beats';
import { GameController, GameError, type GameApi } from './controller';

const LEAP_ID = '11111111-1111-4111-8111-111111111111';

function makeLeap(over: Partial<LeapState> = {}): LeapState {
  return {
    id: LEAP_ID,
    seed: 1,
    premiseId: premise01.id,
    characterIds: [catalog.characters[0]!.id, catalog.characters[1]!.id],
    fractureId: premise01.fractures[0],
    artifactId: null,
    fragmentId: null,
    traceId: null,
    startedAt: 0,
    suspicion: 0,
    visitedBeats: [1],
    choices: {},
    ...over,
  };
}

function makeResponse(leap = makeLeap()): LeapResponse {
  return { leap, world: {}, meta: {}, trace: null } as unknown as LeapResponse;
}

describe('beats', () => {
  it('avance de beat en beat et refuse de passer le dialogue sans choix', () => {
    let leap = makeLeap({ visitedBeats: [1] });
    expect(currentBeat(leap)).toBe('orientation');
    leap = completeBeat(leap);
    expect(currentBeat(leap)).toBe('dialogue');
    expect(() => completeBeat(leap)).toThrow(BeatError);
    const { leap: chosen } = chooseDialogue(
      leap,
      premise01,
      premise01.openingDialogue.choices![0]!.id,
    );
    expect(currentBeat(completeBeat(chosen))).toBe('investigation');
  });

  it('refuse d’avancer après le dernier beat et un second choix', () => {
    const last = makeLeap({ visitedBeats: [1, 2, 3, 4, 5] });
    expect(currentBeat(last)).toBe('resolution');
    expect(() => completeBeat(last)).toThrow(BeatError);
    const first = premise01.openingDialogue.choices![0]!;
    const { leap } = chooseDialogue(makeLeap(), premise01, first.id);
    expect(() => chooseDialogue(leap, premise01, first.id)).toThrow(BeatError);
    expect(() => chooseDialogue(makeLeap(), premise01, 'inconnu')).toThrow(BeatError);
  });

  it('applique la suspicion du choix', () => {
    const risky = premise01.openingDialogue.choices!.find((c) => c.kind === 'risky')!;
    const { leap } = chooseDialogue(makeLeap(), premise01, risky.id);
    expect(leap.suspicion).toBeGreaterThan(0);
  });

  it('calcule cinq points de progression', () => {
    expect(progressDots(makeLeap({ visitedBeats: [] }))).toEqual([
      'todo',
      'todo',
      'todo',
      'todo',
      'todo',
    ]);
    expect(progressDots(makeLeap({ visitedBeats: [1, 2, 3] }))).toEqual([
      'done',
      'done',
      'current',
      'todo',
      'todo',
    ]);
  });

  it('retrouve les interlocuteurs par emplacement', () => {
    const leap = makeLeap();
    expect(speakerFor(leap, catalog, '0')?.id).toBe(leap.characterIds[0]);
    expect(speakerFor(leap, catalog, '1')?.id).toBe(leap.characterIds[1]);
    expect(speakerFor(leap, catalog, '7')).toBeNull();
  });

  it('masque les indices d’objet quand le saut n’en a pas', () => {
    const without = visibleInvestigation(premise01, makeLeap());
    const withArtifact = visibleInvestigation(premise01, makeLeap({ artifactId: 'x' }));
    expect(withArtifact.length).toBeGreaterThanOrEqual(without.length);
    expect(without.every(({ item }) => item.revealsArtifact === undefined)).toBe(true);
  });

  it('note les indices vus et l’interprétation retenue', () => {
    const leap = leanToward(revealClue(makeLeap(), 2), 1);
    expect(leap.choices).toMatchObject({ 'clue-2': 'seen', fracture: '1' });
  });

  it('impose l’issue exposée quand la suspicion est au maximum', () => {
    expect(availableResolutions(premise01, makeLeap())).toEqual(premise01.resolutions);
    const forced = availableResolutions(premise01, makeLeap({ suspicion: 100 }));
    expect(forced.length).toBeGreaterThan(0);
    expect(forced.every((r) => r.outcome === 'exposed')).toBe(true);
  });
});

class FakeApi implements GameApi {
  online = true;
  failStatus: number | null = null;
  resolved: ResolveRequest[] = [];
  constructor(private response: LeapResponse) {}
  private gate(): void {
    if (!this.online) throw new ApiClientError('network', 'network_error', 'hors ligne');
    if (this.failStatus) {
      throw new ApiClientError('http', 'err', 'erreur', { status: this.failStatus });
    }
  }
  leap(): Promise<LeapResponse> {
    this.gate();
    return Promise.resolve(this.response);
  }
  resolve(body: ResolveRequest) {
    this.gate();
    this.resolved.push(body);
    return Promise.resolve({
      result: { leapId: body.leapId } as never,
      nextLeapAvailable: true,
    });
  }
  state() {
    this.gate();
    return Promise.resolve({ world: {} } as never);
  }
  exportData() {
    this.gate();
    return Promise.resolve({ ok: true });
  }
  deleteState() {
    this.gate();
    return Promise.resolve({ deleted: true as const });
  }
}

function setup() {
  const storage = new MemoryStorage();
  const api = new FakeApi(makeResponse());
  const controller = new GameController({
    storage,
    createApi: () => api,
    loadCatalog: () => Promise.resolve(catalog),
    now: () => 42,
  });
  return { storage, api, controller };
}

describe('GameController', () => {
  it('crée le joueur une seule fois', async () => {
    const { controller, storage } = setup();
    const first = await controller.init();
    expect(first.firstVisit).toBe(true);
    const second = await controller.init();
    expect(second.firstVisit).toBe(false);
    expect(second.playerId).toBe(first.playerId);
    expect(await storage.getPlayerId()).toBe(first.playerId);
  });

  it('exige init() et enregistre les réglages', async () => {
    const { controller } = setup();
    await expect(controller.startLeap()).rejects.toThrow('init()');
    await controller.init();
    const s = await controller.updateSettings({ textSize: 'large' });
    expect(s.textSize).toBe('large');
  });

  it('démarre un saut, reprend la progression locale et sauve', async () => {
    const { controller, storage } = setup();
    await controller.init();
    await storage.saveProgress(makeLeap({ visitedBeats: [1, 2, 3] }));
    expect(await controller.hasLeapInProgress()).toBe(true);
    const session = await controller.startLeap();
    expect(session.leap.visitedBeats).toEqual([1, 2, 3]);
    expect(session.fromCache).toBe(false);
    await controller.save({ ...session.leap, suspicion: 10 });
    expect((await storage.getProgress())?.suspicion).toBe(10);
  });

  it('rejoue le dernier saut hors ligne, sinon signale l’absence', async () => {
    const { controller, api } = setup();
    await controller.init();
    api.online = false;
    await expect(controller.startLeap()).rejects.toMatchObject({
      problem: 'no_leap_offline',
    });
    api.online = true;
    await controller.startLeap();
    api.online = false;
    const session = await controller.startLeap();
    expect(session.fromCache).toBe(true);
  });

  it('traduit les erreurs HTTP', async () => {
    const { controller, api } = setup();
    await controller.init();
    for (const [status, problem] of [
      [409, 'stale_leap'],
      [422, 'invalid'],
      [429, 'rate_limited'],
      [500, 'server'],
    ] as const) {
      api.failStatus = status;
      await expect(controller.startLeap()).rejects.toMatchObject({ problem });
    }
  });

  it('résout en ligne : efface la progression', async () => {
    const { controller, storage, api } = setup();
    await controller.init();
    const session = await controller.startLeap();
    const out = await controller.resolve(session, premise01.resolutions[0]!.id);
    expect(out.queued).toBe(false);
    expect(out.result).not.toBeNull();
    expect(api.resolved).toHaveLength(1);
    expect(await storage.getProgress()).toBeNull();
    await expect(controller.resolve(session, 'inconnue')).rejects.toBeInstanceOf(
      GameError,
    );
  });

  it('met la résolution en file hors ligne puis la renvoie', async () => {
    const { controller, api } = setup();
    await controller.init();
    const session = await controller.startLeap();
    api.online = false;
    const out = await controller.resolve(session, premise01.resolutions[0]!.id);
    expect(out.queued).toBe(true);
    expect(await controller.pendingCount()).toBe(1);
    expect(await controller.flushPending()).toBe(0);
    api.online = true;
    expect(await controller.flushPending()).toBe(1);
    expect(await controller.pendingCount()).toBe(0);
  });

  it('abandonne une résolution refusée par le serveur', async () => {
    const { controller, api, storage } = setup();
    await controller.init();
    const session = await controller.startLeap();
    api.online = false;
    await controller.resolve(session, premise01.resolutions[0]!.id);
    api.online = true;
    api.failStatus = 409;
    await controller.flushPending();
    expect(await storage.listPending()).toHaveLength(0);
  });

  it('compte les échecs avant d’abandonner', async () => {
    const { controller, api, storage } = setup();
    await controller.init();
    const session = await controller.startLeap();
    api.online = false;
    await controller.resolve(session, premise01.resolutions[0]!.id);
    api.online = true;
    api.failStatus = 500;
    await controller.flushPending();
    expect((await storage.listPending())[0]?.attempts).toBe(1);
  });

  it('rafraîchit l’état avec repli sur la copie locale', async () => {
    const { controller, api } = setup();
    await controller.init();
    api.online = false;
    expect(await controller.refreshState()).toBeNull();
    api.online = true;
    expect((await controller.refreshState())?.stale).toBe(false);
    api.online = false;
    expect((await controller.refreshState())?.stale).toBe(true);
    api.online = true;
    api.failStatus = 500;
    await expect(controller.refreshState()).rejects.toBeInstanceOf(GameError);
  });

  it('exporte et supprime les données', async () => {
    const { controller, api, storage } = setup();
    await controller.init();
    expect(await controller.exportData()).toEqual({ ok: true });
    api.online = false;
    await expect(controller.exportData()).rejects.toMatchObject({ problem: 'offline' });
    await expect(controller.deleteEverything()).rejects.toBeInstanceOf(GameError);
    expect(await storage.getPlayerId()).not.toBeNull();
    api.online = true;
    await controller.deleteEverything();
    expect(await storage.getPlayerId()).toBeNull();
  });
});

import { describe, expect, it } from 'vitest';
import type {
  LeapResponse,
  ResolveResponse,
  StateResponse,
} from '../../src/lib/api/types';
import { playerIdHash } from '../../src/lib/engine/hash';
import { ChronologyService, INACTIVITY_EXPIRY_MS } from '../src/durable/service';
import { SlidingWindowLimiter } from '../src/middleware/ratelimit';
import { makeDeps, uuid } from './helpers';

const PLAYER = uuid(1);

function setup(overrides = {}) {
  const ctx = makeDeps(overrides);
  return { ...ctx, service: new ChronologyService(ctx.deps) };
}

async function startLeap(service: ChronologyService, playerId = PLAYER) {
  const response = await service.handle({ op: 'leap', playerId });
  return { response, body: response.body as LeapResponse };
}

describe('POST leap', () => {
  it('génère, persiste et planifie l’expiration', async () => {
    const { service, storage, deps } = setup();
    const { response, body } = await startLeap(service);
    expect(response.status).toBe(200);
    expect(body.leap.id).toMatch(/^00000000-0000-4000-8000-/);
    expect(body.trace).toBeNull();
    expect(storage.value?.currentLeap?.id).toBe(body.leap.id);
    expect(storage.expiryAt).toBe(deps.now() + INACTIVITY_EXPIRY_MS);
  });

  it('rend le saut en cours au lieu d’en générer un second', async () => {
    const { service } = setup();
    const first = await startLeap(service);
    const second = await startLeap(service);
    expect(second.body.leap.id).toBe(first.body.leap.id);
  });

  it('sérialise les appels concurrents', async () => {
    const { service } = setup();
    const [a, b] = await Promise.all([startLeap(service), startLeap(service)]);
    expect(a.body.leap.id).toBe(b.body.leap.id);
  });

  it('joint une trace d’un autre joueur quand le tirage la demande, et la rend à la reprise', async () => {
    const { traces } = setup();
    traces.data.set('trace:autrejoueur0000:leap-x', {
      fragment: 'Une porte restée ouverte.',
      timestamp: 1,
      epoch: 'Rome, 64',
    });
    let found: { playerId: string; body: LeapResponse } | null = null;
    for (let n = 100; n < 400 && !found; n++) {
      const fresh = setup();
      fresh.traces.data.set('trace:autrejoueur0000:leap-x', {
        fragment: 'Une porte restée ouverte.',
        timestamp: 1,
        epoch: 'Rome, 64',
      });
      const { body } = await startLeap(fresh.service, uuid(n));
      if (body.trace) {
        found = { playerId: uuid(n), body };
        const resumed = await startLeap(fresh.service, uuid(n));
        expect(resumed.body.trace).toEqual(body.trace);
        expect(resumed.body.leap.traceId).toBe('trace:autrejoueur0000:leap-x');
      }
    }
    expect(found).not.toBeNull();
    expect(traces.pickCalls).toBe(0);
  });

  it('ignore la trace quand KV n’en a pas à offrir', async () => {
    let asked = 0;
    for (let n = 100; n < 400; n++) {
      const fresh = setup();
      const { body } = await startLeap(fresh.service, uuid(n));
      asked += fresh.traces.pickCalls;
      expect(body.trace).toBeNull();
    }
    expect(asked).toBeGreaterThan(0);
  });

  it('répond 500 content_error si le catalogue est vide', async () => {
    const { service } = setup({
      catalog: {
        premises: [],
        characters: [],
        fractures: [],
        artifacts: [],
        fragments: [],
      },
    });
    const response = await service.handle({ op: 'leap', playerId: PLAYER });
    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({ error: { code: 'content_error' } });
  });
});

describe('POST resolve', () => {
  async function started() {
    const ctx = setup();
    const { body } = await startLeap(ctx.service);
    return { ...ctx, leapId: body.leap.id };
  }

  it('résout le saut : issue et mutations viennent du contenu', async () => {
    const { service, storage, traces, leapId } = await started();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: {
        leapId,
        resolutionId: 'repair',
        suspicion: 42,
        choices: { a: 'b' },
        visitedBeats: [1, 2],
      },
    });
    expect(response.status).toBe(200);
    const { result, nextLeapAvailable } = response.body as ResolveResponse;
    expect(nextLeapAvailable).toBe(true);
    expect(result).toMatchObject({
      leapId,
      outcome: 'resolved',
      fractureRepaired: true,
      finalSuspicion: 42,
    });
    expect(storage.value?.currentLeap).toBeNull();
    expect(storage.value?.world.doors).toHaveLength(1);
    expect(storage.value?.world.truths).toHaveLength(1);

    const hash = await playerIdHash(PLAYER);
    expect(traces.data.get(`trace:${hash}:${leapId}`)).toEqual({
      fragment: 'La porte cède.',
      timestamp: expect.any(Number),
      epoch: 'Rome, 64',
    });
  });

  it('est idempotent : le résultat enregistré est rendu tel quel', async () => {
    const { service, leapId } = await started();
    const body = { leapId, resolutionId: 'flee' };
    const first = await service.handle({ op: 'resolve', playerId: PLAYER, body });
    const second = await service.handle({ op: 'resolve', playerId: PLAYER, body });
    expect(second.status).toBe(200);
    expect(second.body).toEqual(first.body);
  });

  it('borne la suspicion et garde celle du saut si le client n’en envoie pas', async () => {
    const { service, leapId } = await started();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId, resolutionId: 'flee' },
    });
    expect((response.body as ResolveResponse).result.finalSuspicion).toBe(0);
  });

  it('répond 409 si le saut n’est pas le saut en cours', async () => {
    const { service } = await started();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId: uuid(999), resolutionId: 'flee' },
    });
    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({ error: { code: 'leap_mismatch' } });
  });

  it('répond 409 sans aucun saut en cours', async () => {
    const { service } = setup();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId: uuid(5), resolutionId: 'flee' },
    });
    expect(response.status).toBe(409);
  });

  it('répond 422 pour une résolution inconnue', async () => {
    const { service, leapId } = await started();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId, resolutionId: 'inconnue' },
    });
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({ error: { code: 'unknown_resolution' } });
  });

  it('répond 422 quand les mutations du contenu violent les règles du monde', async () => {
    const { service, leapId, storage } = await started();
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId, resolutionId: 'broken' },
    });
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({ error: { code: 'invalid_mutations' } });
    expect(storage.value?.currentLeap?.id).toBe(leapId);
  });

  it('n’échoue pas si l’écriture de la trace échoue', async () => {
    const { service, traces, leapId } = await started();
    traces.failPut = true;
    const response = await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId, resolutionId: 'flee' },
    });
    expect(response.status).toBe(200);
  });

  it('résout de nombreux sauts de suite, prémisses répétées comprises, sans collision', async () => {
    const { service } = setup();
    for (let i = 0; i < 12; i++) {
      const { body } = await startLeap(service);
      const response = await service.handle({
        op: 'resolve',
        playerId: PLAYER,
        body: { leapId: body.leap.id, resolutionId: 'repair' },
      });
      expect(response.status).toBe(200);
    }
    const state = await service.handle({ op: 'state', playerId: PLAYER });
    const { chronology } = state.body as StateResponse;
    expect(chronology.history).toHaveLength(12);
    expect(chronology.world.doors).toHaveLength(12);
  });

  it('enchaîne un second saut après la résolution', async () => {
    const { service, leapId } = await started();
    await service.handle({
      op: 'resolve',
      playerId: PLAYER,
      body: { leapId, resolutionId: 'flee' },
    });
    const next = await startLeap(service);
    expect(next.body.leap.id).not.toBe(leapId);
  });
});

describe('état, export, suppression', () => {
  it('GET state rend une chronologie vierge sans rien écrire', async () => {
    const { service, storage } = setup();
    const response = await service.handle({ op: 'state', playerId: PLAYER });
    const { chronology } = response.body as StateResponse;
    expect(chronology.playerId).toBe(PLAYER);
    expect(chronology.history).toEqual([]);
    expect(storage.value).toBeNull();
  });

  it('GET export joint l’en-tête de téléchargement', async () => {
    const { service } = setup();
    await startLeap(service);
    const response = await service.handle({ op: 'export', playerId: PLAYER });
    expect(response.headers?.['Content-Disposition']).toContain('lhote-export.json');
    expect(response.body).toMatchObject({ chronology: { playerId: PLAYER } });
  });

  it('DELETE state efface la chronologie et les traces du joueur seulement', async () => {
    const { service, storage, traces } = setup();
    const hash = await playerIdHash(PLAYER);
    traces.data.set(`trace:${hash}:l1`, { fragment: 'a', timestamp: 1, epoch: 'e' });
    traces.data.set('trace:autre:l2', { fragment: 'b', timestamp: 1, epoch: 'e' });
    await startLeap(service);

    const response = await service.handle({ op: 'delete', playerId: PLAYER });
    expect(response).toMatchObject({ status: 200, body: { deleted: true } });
    expect(storage.value).toBeNull();
    expect([...traces.data.keys()]).toEqual(['trace:autre:l2']);
  });

  it('expire() supprime les données du joueur inactif, et ne fait rien sans données', async () => {
    const { service, storage, traces } = setup();
    await service.expire();
    await startLeap(service);
    const hash = await playerIdHash(PLAYER);
    traces.data.set(`trace:${hash}:l1`, { fragment: 'a', timestamp: 1, epoch: 'e' });
    await service.expire();
    expect(storage.value).toBeNull();
    expect(traces.data.size).toBe(0);
  });
});

describe('robustesse', () => {
  it('applique la limite de 60 requêtes par minute avec Retry-After', async () => {
    const { service, advance } = setup();
    for (let i = 0; i < 60; i++) {
      expect((await service.handle({ op: 'state', playerId: PLAYER })).status).toBe(200);
    }
    const blocked = await service.handle({ op: 'state', playerId: PLAYER });
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers?.['Retry-After'])).toBeGreaterThan(0);

    advance(61_000);
    expect((await service.handle({ op: 'state', playerId: PLAYER })).status).toBe(200);
  });

  it('accepte un limiteur injecté', async () => {
    const { service } = setup({ limiter: new SlidingWindowLimiter(1, 1000) });
    expect((await service.handle({ op: 'state', playerId: PLAYER })).status).toBe(200);
    expect((await service.handle({ op: 'state', playerId: PLAYER })).status).toBe(429);
  });

  it('masque les erreurs inattendues et reste utilisable ensuite', async () => {
    const { service, storage } = setup();
    storage.failLoad = true;
    const failed = await service.handle({ op: 'state', playerId: PLAYER });
    expect(failed.status).toBe(500);
    expect(JSON.stringify(failed.body)).not.toContain('stockage indisponible');

    storage.failLoad = false;
    expect((await service.handle({ op: 'state', playerId: PLAYER })).status).toBe(200);
  });
});

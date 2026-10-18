import { describe, expect, it } from 'vitest';
import { DEV_ORIGINS } from '../src/middleware/cors';
import type { ChronologyRpc } from '../src/routes/routes';
import { handleRequest, type RouterDeps } from '../src/router';
import type { ServiceRequest } from '../src/durable/service';
import { uuid } from './helpers';

const PLAYER = uuid(7);

function makeDeps(
  handle?: ChronologyRpc['handle'],
): RouterDeps & { calls: ServiceRequest[] } {
  const calls: ServiceRequest[] = [];
  return {
    calls,
    version: '1.2.3',
    allowedOrigins: DEV_ORIGINS,
    getChronology: () => ({
      handle:
        handle ??
        ((request) => {
          calls.push(request);
          return Promise.resolve({ status: 200, body: { op: request.op } });
        }),
    }),
  };
}

function call(
  deps: RouterDeps,
  path: string,
  init: RequestInit & { player?: string | null } = {},
) {
  const { player = PLAYER, headers, ...rest } = init;
  const merged = new Headers(headers);
  if (player !== null) merged.set('X-Player-Id', player);
  return handleRequest(
    new Request(`https://lhote.test${path}`, { ...rest, headers: merged }),
    deps,
  );
}

describe('routeur', () => {
  it('sert /api/health sans identifiant de joueur', async () => {
    const response = await call(makeDeps(), '/api/health', { player: null });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, version: '1.2.3' });
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('refuse une méthode inadaptée sur /api/health', async () => {
    const response = await call(makeDeps(), '/api/health', { method: 'POST' });
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toContain('GET');
  });

  it('répond 404 JSON sur une route inconnue', async () => {
    const response = await call(makeDeps(), '/api/nope');
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({ error: { code: 'not_found' } });
  });

  it('répond 405 avec Allow', async () => {
    const response = await call(makeDeps(), '/api/state', { method: 'POST' });
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('GET, DELETE, OPTIONS');
  });

  it('répond 400 sans X-Player-Id et 401 avec un identifiant invalide', async () => {
    const deps = makeDeps();
    expect((await call(deps, '/api/state', { player: null })).status).toBe(400);
    expect((await call(deps, '/api/state', { player: 'pas-un-uuid' })).status).toBe(401);
    expect(deps.calls).toHaveLength(0);
  });

  it('route chaque opération vers le Durable Object', async () => {
    const deps = makeDeps();
    await call(deps, '/api/leap', { method: 'POST' });
    await call(deps, '/api/state');
    await call(deps, '/api/state', { method: 'DELETE' });
    await call(deps, '/api/export');
    expect(deps.calls.map((c) => c.op)).toEqual(['leap', 'state', 'delete', 'export']);
    expect(deps.calls.every((c) => c.playerId === PLAYER)).toBe(true);
  });

  it('normalise l’identifiant de joueur en minuscules', async () => {
    const deps = makeDeps();
    await call(deps, '/api/state', { player: PLAYER.toUpperCase() });
    expect(deps.calls[0]?.playerId).toBe(PLAYER);
  });

  it('relaie le statut et les en-têtes du service', async () => {
    const deps = makeDeps(() =>
      Promise.resolve({
        status: 429,
        body: { error: {} },
        headers: { 'Retry-After': '9' },
      }),
    );
    const response = await call(deps, '/api/state');
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('9');
  });
});

describe('POST /api/resolve', () => {
  const valid = { leapId: uuid(9), resolutionId: 'repair' };

  it('transmet un corps valide', async () => {
    const deps = makeDeps();
    await call(deps, '/api/resolve', { method: 'POST', body: JSON.stringify(valid) });
    expect(deps.calls[0]).toEqual({ op: 'resolve', playerId: PLAYER, body: valid });
  });

  it('répond 422 avec le détail des champs fautifs', async () => {
    const response = await call(makeDeps(), '/api/resolve', {
      method: 'POST',
      body: JSON.stringify({ leapId: 'x' }),
    });
    expect(response.status).toBe(422);
    const body = (await response.json()) as { error: { details: { field: string }[] } };
    expect(body.error.details.map((d) => d.field)).toEqual(['leapId', 'resolutionId']);
  });

  it('répond 400 pour du JSON illisible et 413 pour un corps trop gros', async () => {
    const deps = makeDeps();
    expect(
      (await call(deps, '/api/resolve', { method: 'POST', body: '{pas du json' })).status,
    ).toBe(400);
    expect(
      (await call(deps, '/api/resolve', { method: 'POST', body: 'a'.repeat(9000) }))
        .status,
    ).toBe(413);
    expect(deps.calls).toHaveLength(0);
  });
});

describe('disponibilité', () => {
  it('répond 503 avec Retry-After si le Durable Object lève une exception', async () => {
    const deps = makeDeps(() => Promise.reject(new Error('DO injoignable')));
    const response = await call(deps, '/api/state');
    expect(response.status).toBe(503);
    expect(response.headers.get('Retry-After')).toBe('1');
    expect(JSON.stringify(await response.json())).not.toContain('injoignable');
  });

  it('répond 503 si le stub est introuvable', async () => {
    const deps: RouterDeps = {
      version: 'x',
      allowedOrigins: [],
      getChronology: () => {
        throw new Error('binding absent');
      },
    };
    expect((await call(deps, '/api/state')).status).toBe(503);
  });
});

describe('CORS', () => {
  it('répond au préflight sans corps', async () => {
    const response = await call(makeDeps(), '/api/leap', {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:5173' },
    });
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(
      'http://localhost:5173',
    );
    expect(response.headers.get('Access-Control-Allow-Headers')).toContain('X-Player-Id');
  });

  it('ajoute les en-têtes CORS aux réponses, y compris aux erreurs', async () => {
    const response = await call(makeDeps(), '/api/state', {
      player: null,
      headers: { Origin: 'http://localhost:8788' },
    });
    expect(response.status).toBe(400);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(
      'http://localhost:8788',
    );
  });

  it('n’émet aucun en-tête CORS pour une origine inconnue ou en production', async () => {
    const stranger = await call(makeDeps(), '/api/health', {
      headers: { Origin: 'https://evil.example' },
    });
    expect(stranger.headers.get('Access-Control-Allow-Origin')).toBeNull();

    const prod = { ...makeDeps(), allowedOrigins: [] };
    const response = await call(prod, '/api/health', {
      headers: { Origin: 'http://localhost:5173' },
    });
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});

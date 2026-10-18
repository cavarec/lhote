import { describe, expect, it, vi } from 'vitest';
import {
  ApiClient,
  ApiClientError,
  BREAKER_COOLDOWN_MS,
  BREAKER_THRESHOLD,
  RETRY_DELAYS_MS,
  TIMEOUT_MS,
} from './client';

const PLAYER = '00000000-0000-4000-8000-000000000001';

function json(
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function setup(responses: (() => Response | Promise<Response>)[]) {
  const queue = [...responses];
  const fetchFn = vi.fn(() => {
    const next = queue.shift();
    if (!next) throw new Error('plus de réponse prévue');
    return Promise.resolve(next());
  });
  const delays: number[] = [];
  let clock = 0;
  const client = new ApiClient({
    playerId: PLAYER,
    fetchFn: fetchFn as unknown as typeof fetch,
    sleepFn: (ms) => {
      delays.push(ms);
      clock += ms;
      return Promise.resolve();
    },
    now: () => clock,
  });
  return {
    client,
    fetchFn,
    delays,
    advance: (ms: number) => {
      clock += ms;
    },
  };
}

const networkError = () => {
  throw new TypeError('Failed to fetch');
};

describe('requêtes', () => {
  it('envoie l’identifiant du joueur et lit la réponse', async () => {
    const { client, fetchFn } = setup([() => json(200, { ok: true, version: '1' })]);
    expect(await client.health()).toEqual({ ok: true, version: '1' });
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/health');
    expect(init.method).toBe('GET');
    expect((init.headers as Record<string, string>)['X-Player-Id']).toBe(PLAYER);
  });

  it('envoie le corps JSON de resolve', async () => {
    const { client, fetchFn } = setup([
      () => json(200, { result: {}, nextLeapAvailable: true }),
    ]);
    await client.resolve({ leapId: 'l', resolutionId: 'r' });
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/resolve');
    expect(init.body).toBe(JSON.stringify({ leapId: 'l', resolutionId: 'r' }));
    expect((init.headers as Record<string, string>)['Content-Type']).toBe(
      'application/json',
    );
  });

  it.each([
    ['leap', '/api/leap', 'POST'],
    ['state', '/api/state', 'GET'],
    ['exportData', '/api/export', 'GET'],
    ['deleteState', '/api/state', 'DELETE'],
  ] as const)('%s appelle %s en %s', async (method, path, verb) => {
    const { client, fetchFn } = setup([() => json(200, {})]);
    await client[method]();
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect([url, init.method]).toEqual([path, verb]);
  });

  it('préfixe les URL avec baseUrl', async () => {
    const fetchFn = vi.fn(() => Promise.resolve(json(200, {})));
    const client = new ApiClient({
      playerId: PLAYER,
      baseUrl: 'http://localhost:8787',
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    await client.state();
    expect((fetchFn.mock.calls[0] as unknown as [string])[0]).toBe(
      'http://localhost:8787/api/state',
    );
  });
});

describe('erreurs et nouvelles tentatives', () => {
  it('relit le code et le message du serveur, sans réessayer une erreur de requête', async () => {
    const { client, fetchFn, delays } = setup([
      () => json(409, { error: { code: 'leap_mismatch', message: 'Pas le bon saut.' } }),
    ]);
    const error = await client.leap().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiClientError);
    expect(error).toMatchObject({
      kind: 'http',
      status: 409,
      code: 'leap_mismatch',
      message: 'Pas le bon saut.',
      offline: false,
      retryable: false,
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(delays).toEqual([]);
  });

  it('garde les détails de validation', async () => {
    const { client } = setup([
      () =>
        json(422, {
          error: { code: 'invalid_request', message: 'x', details: [{ field: 'a' }] },
        }),
    ]);
    const error = (await client
      .resolve({ leapId: 'l', resolutionId: 'r' })
      .catch((e: unknown) => e)) as ApiClientError;
    expect(error.details).toEqual([{ field: 'a' }]);
  });

  it('réessaie après 1 s, 3 s, 9 s sur une coupure réseau, puis réussit', async () => {
    const { client, fetchFn, delays } = setup([
      networkError,
      networkError,
      networkError,
      () => json(200, { ok: true, version: '1' }),
    ]);
    await expect(client.health()).resolves.toMatchObject({ ok: true });
    expect(fetchFn).toHaveBeenCalledTimes(4);
    expect(delays).toEqual([...RETRY_DELAYS_MS]);
  });

  it('abandonne après trois nouvelles tentatives et signale un problème de réseau', async () => {
    const { client, fetchFn } = setup([
      networkError,
      networkError,
      networkError,
      networkError,
    ]);
    const error = (await client.leap().catch((e: unknown) => e)) as ApiClientError;
    expect(fetchFn).toHaveBeenCalledTimes(4);
    expect(error).toMatchObject({
      kind: 'network',
      code: 'network_error',
      offline: true,
    });
  });

  it('réessaie sur 503 en respectant Retry-After', async () => {
    const { client, delays } = setup([
      () =>
        json(
          503,
          { error: { code: 'unavailable', message: 'x' } },
          { 'Retry-After': '2' },
        ),
      () => json(200, { ok: true }),
    ]);
    await client.leap();
    expect(delays).toEqual([2000]);
  });

  it('plafonne Retry-After à 30 s', async () => {
    const { client, delays } = setup([
      () =>
        json(
          503,
          { error: { code: 'unavailable', message: 'x' } },
          { 'Retry-After': '999' },
        ),
      () => json(200, {}),
    ]);
    await client.leap();
    expect(delays).toEqual([30_000]);
  });

  it('ne réessaie pas un 429 mais expose Retry-After', async () => {
    const { client, fetchFn } = setup([
      () =>
        json(
          429,
          { error: { code: 'rate_limited', message: 'x' } },
          { 'Retry-After': '12' },
        ),
    ]);
    const error = (await client.state().catch((e: unknown) => e)) as ApiClientError;
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(error).toMatchObject({ status: 429, retryAfter: 12, retryable: false });
  });

  it('tolère une erreur sans corps JSON', async () => {
    const { client } = setup([() => new Response('boom', { status: 500 })]);
    const error = (await client.leap().catch((e: unknown) => e)) as ApiClientError;
    expect(error).toMatchObject({ status: 500, code: 'http_error' });
  });
});

describe('délai maximal', () => {
  it('interrompt une requête qui ne répond pas, avec le code timeout', async () => {
    const fired: (() => void)[] = [];
    const fetchFn = vi.fn((_url: string, init: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => {
          reject(new DOMException('aborted', 'AbortError'));
        });
      });
    });
    const client = new ApiClient({
      playerId: PLAYER,
      fetchFn: fetchFn as unknown as typeof fetch,
      sleepFn: () => Promise.resolve(),
      retryDelaysMs: [],
      timers: {
        set(callback, ms) {
          expect(ms).toBe(TIMEOUT_MS);
          fired.push(callback);
          return () => undefined;
        },
      },
    });
    const pending = client.leap().catch((e: unknown) => e);
    await Promise.resolve();
    fired[0]?.();
    expect(await pending).toMatchObject({
      kind: 'network',
      code: 'timeout',
      offline: true,
    });
  });
});

describe('disjoncteur', () => {
  async function failOnce(client: ApiClient) {
    return client.leap().catch((e: unknown) => e);
  }

  it('s’ouvre après 5 échecs consécutifs et refuse sans appeler le réseau', async () => {
    const failing = Array.from({ length: BREAKER_THRESHOLD * 4 }, () => networkError);
    const { client, fetchFn } = setup(failing);
    for (let i = 0; i < BREAKER_THRESHOLD; i++) await failOnce(client);
    expect(client.circuitOpen).toBe(true);

    const calls = fetchFn.mock.calls.length;
    const error = (await failOnce(client)) as ApiClientError;
    expect(error).toMatchObject({ kind: 'circuit_open', offline: true });
    expect(fetchFn.mock.calls.length).toBe(calls);
  });

  it('se referme après 30 s', async () => {
    const failing = Array.from({ length: BREAKER_THRESHOLD * 4 }, () => networkError);
    const { client, advance } = setup([...failing, () => json(200, { ok: true })]);
    for (let i = 0; i < BREAKER_THRESHOLD; i++) await failOnce(client);
    advance(BREAKER_COOLDOWN_MS + 1);
    expect(client.circuitOpen).toBe(false);
  });

  it('repart de zéro après un succès, et ignore les erreurs de requête', async () => {
    const queue = [
      ...Array.from({ length: 4 * 4 }, () => networkError),
      () => json(200, { ok: true }),
      () => json(409, { error: { code: 'x', message: 'x' } }),
      ...Array.from({ length: 4 * 4 }, () => networkError),
    ];
    const { client } = setup(queue);
    for (let i = 0; i < 4; i++) await failOnce(client);
    await client.leap();
    await failOnce(client); // 409 : ne compte pas
    for (let i = 0; i < 4; i++) await failOnce(client);
    expect(client.circuitOpen).toBe(false);
  });
});

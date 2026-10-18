import { describe, expect, it } from 'vitest';
import { EngineError, type EngineErrorCode } from '../../src/lib/engine/errors';
import { requirePlayerId } from '../src/middleware/auth';
import { corsHeaders } from '../src/middleware/cors';
import { SlidingWindowLimiter } from '../src/middleware/ratelimit';
import {
  ApiError,
  errorBody,
  fromEngineError,
  toErrorResponse,
} from '../src/utils/errors';
import {
  KvTraceStore,
  makeTraceFragment,
  parseTrace,
  TRACE_TTL_SECONDS,
  traceKey,
} from '../src/utils/traces';
import { uuid } from './helpers';

describe('SlidingWindowLimiter', () => {
  it('bloque au-delà de la limite et libère quand la fenêtre glisse', () => {
    const limiter = new SlidingWindowLimiter(2, 1000);
    expect(limiter.hit(0)).toEqual({ allowed: true });
    expect(limiter.hit(400)).toEqual({ allowed: true });
    expect(limiter.hit(500)).toEqual({ allowed: false, retryAfterSeconds: 1 });
    expect(limiter.hit(1001)).toEqual({ allowed: true });
    expect(limiter.hit(1002)).toEqual({ allowed: false, retryAfterSeconds: 1 });
  });

  it('annonce un Retry-After cohérent avec la plus ancienne requête', () => {
    const limiter = new SlidingWindowLimiter(1, 60_000);
    limiter.hit(0);
    expect(limiter.hit(10_000)).toEqual({ allowed: false, retryAfterSeconds: 50 });
  });
});

describe('requirePlayerId', () => {
  const withHeader = (value?: string) =>
    new Request(
      'https://x.test/',
      value === undefined ? {} : { headers: { 'X-Player-Id': value } },
    );

  it('distingue absent (400), vide (400) et invalide (401)', () => {
    expect(() => requirePlayerId(withHeader())).toThrowError(
      expect.objectContaining({ status: 400 }),
    );
    expect(() => requirePlayerId(withHeader(''))).toThrowError(
      expect.objectContaining({ status: 400 }),
    );
    expect(() => requirePlayerId(withHeader('abc'))).toThrowError(
      expect.objectContaining({ status: 401 }),
    );
    expect(requirePlayerId(withHeader(uuid(2)))).toBe(uuid(2));
  });
});

describe('corsHeaders', () => {
  it('ne répond qu’aux origines autorisées', () => {
    const request = (origin?: string) =>
      new Request('https://x.test/', origin ? { headers: { Origin: origin } } : {});
    expect(corsHeaders(request(), ['http://a'])).toEqual({});
    expect(corsHeaders(request('http://b'), ['http://a'])).toEqual({});
    expect(corsHeaders(request('http://a'), ['http://a'])).toMatchObject({
      'Access-Control-Allow-Origin': 'http://a',
      Vary: 'Origin',
    });
  });
});

describe('erreurs', () => {
  it('formate le corps avec ou sans détails', () => {
    expect(errorBody(new ApiError(400, 'c', 'm'))).toEqual({
      error: { code: 'c', message: 'm' },
    });
    expect(errorBody(new ApiError(422, 'c', 'm', { details: [1] }))).toEqual({
      error: { code: 'c', message: 'm', details: [1] },
    });
  });

  it.each<[EngineErrorCode, number, string]>([
    ['leap_mismatch', 409, 'leap_mismatch'],
    ['leap_in_progress', 409, 'leap_in_progress'],
    ['duplicate_id', 409, 'duplicate_id'],
    ['artifact_in_transit', 409, 'artifact_in_transit'],
    ['invalid_mutations', 422, 'invalid_mutations'],
    ['empty_catalog', 500, 'content_error'],
    ['insufficient_characters', 500, 'content_error'],
    ['unknown_fracture', 500, 'content_error'],
  ])('traduit %s en HTTP %i', (code, status, apiCode) => {
    const error = fromEngineError(new EngineError(code, 'détail interne'));
    expect(error.status).toBe(status);
    expect(error.code).toBe(apiCode);
    if (status === 500) expect(error.message).not.toContain('détail interne');
  });

  it('masque toute exception inconnue', () => {
    const response = toErrorResponse(new Error('secret'));
    expect(response.status).toBe(500);
    expect(JSON.stringify(response.body)).not.toContain('secret');
    expect(toErrorResponse(new EngineError('leap_mismatch', 'm')).status).toBe(409);
    expect(toErrorResponse(new ApiError(418, 'teapot', 'm')).status).toBe(418);
  });
});

describe('traces', () => {
  it('fabrique une clé et un fragment discrets', () => {
    expect(traceKey('abcd', 'leap-1')).toBe('trace:abcd:leap-1');
    expect(makeTraceFragment('Première phrase. Seconde phrase.')).toBe(
      'Première phrase.',
    );
    expect(makeTraceFragment('Sans ponctuation <i>finale</i>')).toBe(
      'Sans ponctuation finale',
    );
    expect(makeTraceFragment('x'.repeat(900))).toHaveLength(200);
  });

  it('relit une trace avec méfiance', () => {
    expect(parseTrace({ fragment: '<b>ok</b>', timestamp: 5, epoch: 'Rome' })).toEqual({
      fragment: 'ok',
      timestamp: 5,
      epoch: 'Rome',
    });
    expect(parseTrace(null)).toBeNull();
    expect(parseTrace('x')).toBeNull();
    expect(parseTrace({ fragment: 1, timestamp: 5, epoch: 'e' })).toBeNull();
    expect(parseTrace({ fragment: 'a', timestamp: 'x', epoch: 'e' })).toBeNull();
    expect(parseTrace({ fragment: 'a', timestamp: Number.NaN, epoch: 'e' })).toBeNull();
  });
});

/** KV minimal en mémoire, avec pagination pour exercer les curseurs. */
class FakeKv {
  readonly data = new Map<string, string>();
  puts: { key: string; ttl: number | undefined }[] = [];
  constructor(private readonly pageSize = 1000) {}

  list({ prefix = '', cursor }: { prefix?: string; limit?: number; cursor?: string }) {
    // Curseur = dernier nom renvoyé, comme KV : il reste valable quand on supprime des clés.
    const names = [...this.data.keys()]
      .filter((k) => k.startsWith(prefix) && (cursor === undefined || k > cursor))
      .sort();
    const page = names.slice(0, this.pageSize);
    const done = names.length <= this.pageSize;
    return Promise.resolve({
      keys: page.map((name) => ({ name })),
      list_complete: done,
      cursor: done ? undefined : page[page.length - 1],
    });
  }
  get(key: string) {
    const value = this.data.get(key);
    return Promise.resolve(value === undefined ? null : (JSON.parse(value) as unknown));
  }
  put(key: string, value: string, options?: { expirationTtl?: number }) {
    this.data.set(key, value);
    this.puts.push({ key, ttl: options?.expirationTtl });
    return Promise.resolve();
  }
  delete(key: string) {
    this.data.delete(key);
    return Promise.resolve();
  }
}

describe('KvTraceStore', () => {
  const trace = { fragment: 'Une porte.', timestamp: 1, epoch: 'Rome' };
  const store = (kv: FakeKv) => new KvTraceStore(kv as unknown as KVNamespace);

  it('écrit avec un TTL de 90 jours', async () => {
    const kv = new FakeKv();
    await store(kv).put('trace:a:l1', trace);
    expect(kv.puts).toEqual([{ key: 'trace:a:l1', ttl: TRACE_TTL_SECONDS }]);
    expect(TRACE_TTL_SECONDS).toBe(7_776_000);
  });

  it('pioche une trace d’un autre joueur, jamais la sienne', async () => {
    const kv = new FakeKv();
    const traces = store(kv);
    await traces.put('trace:moi:l1', trace);
    expect(await traces.pickOther('moi', () => 0)).toBeNull();

    await traces.put('trace:autre:l2', trace);
    await traces.put('trace:autre:l3', trace);
    expect((await traces.pickOther('moi', () => 0.99))?.key).toBe('trace:autre:l3');
    expect((await traces.pickOther('moi', () => 0))?.key).toBe('trace:autre:l2');
  });

  it('renvoie null si la valeur tirée est illisible ou absente', async () => {
    const kv = new FakeKv();
    kv.data.set('trace:autre:l1', JSON.stringify({ nimporte: 'quoi' }));
    expect(await store(kv).pickOther('moi', () => 0)).toBeNull();
    expect(await store(kv).get('trace:absente')).toBeNull();
  });

  it('supprime toutes les traces d’un joueur, sur plusieurs pages', async () => {
    const kv = new FakeKv(2);
    const traces = store(kv);
    for (const id of ['1', '2', '3', '4', '5'])
      await traces.put(`trace:moi:${id}`, trace);
    await traces.put('trace:autre:9', trace);
    await traces.deleteByOwner('moi');
    expect([...kv.data.keys()]).toEqual(['trace:autre:9']);
  });
});

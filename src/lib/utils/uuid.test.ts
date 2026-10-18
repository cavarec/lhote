import { afterEach, describe, expect, it, vi } from 'vitest';
import { newUuid } from './uuid';

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('newUuid', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('produit un UUID v4 distinct à chaque appel', () => {
    const a = newUuid();
    expect(a).toMatch(V4);
    expect(newUuid()).not.toBe(a);
  });

  it('retombe sur getRandomValues quand randomUUID n’existe pas', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: (bytes: Uint8Array) => bytes.map((_, i) => i * 17),
    });
    expect(newUuid()).toMatch(V4);
  });
});

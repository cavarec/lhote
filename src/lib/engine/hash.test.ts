import { describe, expect, it } from 'vitest';
import { leapSeed, playerIdHash, sha256Hex } from './hash';

describe('sha256Hex', () => {
  it('retrouve les vecteurs de test officiels', async () => {
    expect(await sha256Hex('')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
    expect(await sha256Hex('abc')).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
  });

  it('gère l’UTF-8', async () => {
    const hash = await sha256Hex('L’Hôte');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).not.toBe(await sha256Hex('L’Hote'));
  });
});

describe('playerIdHash', () => {
  it('renvoie 16 caractères hexadécimaux, préfixe du SHA-256 complet', async () => {
    const id = '3f2b8c1e-5d4a-4b6f-9a7e-1c2d3e4f5a6b';
    const short = await playerIdHash(id);
    expect(short).toMatch(/^[0-9a-f]{16}$/);
    expect((await sha256Hex(id)).startsWith(short)).toBe(true);
  });
});

describe('leapSeed', () => {
  const player = '3f2b8c1e-5d4a-4b6f-9a7e-1c2d3e4f5a6b';

  it('est déterministe et tient sur 32 bits non signés', async () => {
    const first = await leapSeed(player, 0);
    expect(await leapSeed(player, 0)).toBe(first);
    expect(Number.isInteger(first)).toBe(true);
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThanOrEqual(0xffffffff);
  });

  it('vaut les 4 premiers octets du SHA-256 de « playerId:index »', async () => {
    const hex = await sha256Hex(`${player}:7`);
    expect(await leapSeed(player, 7)).toBe(parseInt(hex.slice(0, 8), 16));
  });

  it('change avec l’index et avec le joueur', async () => {
    const base = await leapSeed(player, 0);
    expect(await leapSeed(player, 1)).not.toBe(base);
    expect(await leapSeed('autre-joueur', 0)).not.toBe(base);
  });
});

import { describe, expect, it } from 'vitest';
import { createRng, mulberry32 } from './rng';

describe('mulberry32', () => {
  it('est déterministe pour une même seed', () => {
    const a = mulberry32(123);
    const b = mulberry32(123);
    for (let i = 0; i < 50; i++) {
      expect(a()).toBe(b());
    }
  });

  it('diffère selon la seed', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('reste figé : valeurs de référence pour la seed 42', () => {
    // Verrou de non-régression : si ces valeurs changent, toutes les parties rejouées changent.
    const next = mulberry32(42);
    expect([next(), next(), next()]).toEqual([
      0.6011037519201636, 0.44829055899754167, 0.8524657934904099,
    ]);
  });

  it('produit des valeurs dans [0, 1) avec une moyenne proche de 0,5', () => {
    const next = mulberry32(7);
    let sum = 0;
    const count = 10_000;
    for (let i = 0; i < count; i++) {
      const value = next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      sum += value;
    }
    expect(Math.abs(sum / count - 0.5)).toBeLessThan(0.02);
  });

  it('traite la seed comme un entier non signé 32 bits', () => {
    expect(mulberry32(-1)()).toBe(mulberry32(4294967295)());
  });
});

describe('createRng', () => {
  it('int reste dans [0, max) et couvre toutes les valeurs', () => {
    const rng = createRng(5);
    const seen = new Set<number>();
    for (let i = 0; i < 500; i++) {
      const value = rng.int(6);
      expect(Number.isInteger(value)).toBe(true);
      seen.add(value);
    }
    expect([...seen].sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it.each([0, -3, 1.5, Number.NaN])('int refuse la borne %s', (bound) => {
    expect(() => createRng(1).int(bound)).toThrow(RangeError);
  });

  it('pick tire dans la liste et refuse une liste vide', () => {
    const rng = createRng(9);
    const items = ['a', 'b', 'c'] as const;
    for (let i = 0; i < 50; i++) {
      expect(items).toContain(rng.pick(items));
    }
    expect(() => rng.pick([])).toThrow(RangeError);
  });

  it('pick fonctionne aussi avec une valeur undefined légitime', () => {
    expect(createRng(1).pick([undefined])).toBeUndefined();
  });

  it('chance(0) est toujours faux, chance(1) toujours vrai', () => {
    const rng = createRng(3);
    for (let i = 0; i < 200; i++) {
      expect(rng.chance(0)).toBe(false);
      expect(rng.chance(1)).toBe(true);
    }
  });

  it('chance(0.2) donne environ 20 % de vrai', () => {
    const rng = createRng(11);
    let hits = 0;
    const count = 10_000;
    for (let i = 0; i < count; i++) {
      if (rng.chance(0.2)) hits++;
    }
    expect(Math.abs(hits / count - 0.2)).toBeLessThan(0.02);
  });

  it('shuffle est une permutation déterministe qui ne modifie pas l’original', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    const first = createRng(21).shuffle(original);
    const second = createRng(21).shuffle(original);
    expect(first).toEqual(second);
    expect([...first].sort((a, b) => a - b)).toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(first).not.toEqual(original);
  });

  it('shuffle gère les listes vides et à un élément', () => {
    expect(createRng(1).shuffle([])).toEqual([]);
    expect(createRng(1).shuffle(['x'])).toEqual(['x']);
  });
});

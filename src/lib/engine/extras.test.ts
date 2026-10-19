import { describe, expect, it } from 'vitest';
import { echoes } from '../../../content/echoes';
import { observerMessages } from '../../../content/observers';
import { ECHO_PROBABILITY, pickEcho, pickObserverMessage } from './extras';

describe('écho personnel', () => {
  it('est déterministe et arrive environ une fois sur quatre', () => {
    let hits = 0;
    const N = 4000;
    for (let seed = 1; seed <= N; seed++) {
      const a = pickEcho(seed, echoes);
      expect(pickEcho(seed, echoes)).toEqual(a);
      if (a) hits++;
    }
    expect(hits / N).toBeGreaterThan(ECHO_PROBABILITY - 0.04);
    expect(hits / N).toBeLessThan(ECHO_PROBABILITY + 0.04);
  });

  it('n’existe pas sans catalogue d’échos', () => {
    expect(pickEcho(1, [])).toBeNull();
  });
});

describe('message de l’Observateur', () => {
  it('suit les poids : 40 % utile, 30 % inutile, 20 % faux, 10 % personnel', () => {
    const count: Record<string, number> = {
      useful: 0,
      useless: 0,
      false: 0,
      personal: 0,
    };
    const N = 8000;
    for (let seed = 1; seed <= N; seed++) {
      const m = pickObserverMessage(seed, observerMessages);
      expect(m).not.toBeNull();
      count[m!.type]!++;
    }
    expect(count['useful']! / N).toBeCloseTo(0.4, 1);
    expect(count['useless']! / N).toBeCloseTo(0.3, 1);
    expect(count['false']! / N).toBeCloseTo(0.2, 1);
    expect(count['personal']! / N).toBeCloseTo(0.1, 1);
  });

  it('est stable pour un même saut et absent sans messages', () => {
    expect(pickObserverMessage(7, observerMessages)).toEqual(
      pickObserverMessage(7, observerMessages),
    );
    expect(pickObserverMessage(7, [])).toBeNull();
  });

  it('a quatre utiles, quatre inutiles, deux faux et deux personnels', () => {
    const by = (t: string) => observerMessages.filter((m) => m.type === t).length;
    expect([by('useful'), by('useless'), by('false'), by('personal')]).toEqual([
      4, 4, 2, 2,
    ]);
  });
});

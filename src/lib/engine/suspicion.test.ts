import { describe, expect, it } from 'vitest';
import {
  applySuspicion,
  clampSuspicion,
  isExposed,
  SUSPICION_DELTA,
  suspicionBand,
} from './suspicion';

describe('suspicion', () => {
  it('borne les valeurs entre 0 et 100 et refuse NaN', () => {
    expect(clampSuspicion(-5)).toBe(0);
    expect(clampSuspicion(42)).toBe(42);
    expect(clampSuspicion(250)).toBe(100);
    expect(() => clampSuspicion(Number.NaN)).toThrow(RangeError);
  });

  it('applique le delta de chaque nature de choix, plafonné à 100', () => {
    expect(applySuspicion(10, 'neutral')).toBe(10);
    expect(applySuspicion(10, 'informative')).toBe(10 + SUSPICION_DELTA.informative);
    expect(applySuspicion(10, 'risky')).toBe(10 + SUSPICION_DELTA.risky);
    expect(applySuspicion(90, 'risky')).toBe(100);
  });

  it('détecte l’exposition à 100', () => {
    expect(isExposed(99)).toBe(false);
    expect(isExposed(100)).toBe(true);
  });

  it('découpe en paliers', () => {
    expect(suspicionBand(0)).toBe('calm');
    expect(suspicionBand(33)).toBe('calm');
    expect(suspicionBand(34)).toBe('wary');
    expect(suspicionBand(66)).toBe('wary');
    expect(suspicionBand(67)).toBe('alarmed');
    expect(suspicionBand(100)).toBe('alarmed');
  });
});

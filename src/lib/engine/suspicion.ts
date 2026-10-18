import type { ChoiceKind } from './types';

// Jauge de suspicion d'un saut (0 à 100). Le prompt (§5.2) en fixe le champ mais pas la
// mécanique : les valeurs ci-dessous sont des propositions [À VALIDER].

export const SUSPICION_MIN = 0;
export const SUSPICION_MAX = 100;

/** Variation de suspicion par nature de choix. */
export const SUSPICION_DELTA: Readonly<Record<ChoiceKind, number>> = {
  neutral: 0,
  informative: 10,
  risky: 25,
};

export function clampSuspicion(value: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError('Suspicion invalide (NaN).');
  }
  return Math.min(SUSPICION_MAX, Math.max(SUSPICION_MIN, value));
}

export function applySuspicion(current: number, kind: ChoiceKind): number {
  return clampSuspicion(current + SUSPICION_DELTA[kind]);
}

/** Vrai quand l'hôte a compris que quelque chose cloche : fin de saut « exposed ». */
export function isExposed(suspicion: number): boolean {
  return suspicion >= SUSPICION_MAX;
}

export type SuspicionBand = 'calm' | 'wary' | 'alarmed';

/** Palier affichable (jamais le chiffre : l'interface reste sans jauge, §6.3). */
export function suspicionBand(suspicion: number): SuspicionBand {
  if (suspicion < 34) return 'calm';
  if (suspicion < 67) return 'wary';
  return 'alarmed';
}

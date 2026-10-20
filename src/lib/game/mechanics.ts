import type { Mechanic, Premise } from '../../../content/premises/types';
import { clampSuspicion } from '../engine/suspicion';
import type { LeapState } from '../engine/types';
import { BeatError, clueGroups, groupsSeenCount } from './beats';

// Mini-mécanique propre à chaque histoire (voir `Mechanic`). Fonctions pures, comme beats.ts : l'état
// du saut reste dans `leap.choices` (clés « mech-… »), donc la reprise après fermeture est automatique.

export const STRIKE_SUSPICION = 20;
export const SILENCE_SUSPICION = -15;
export const OBJECT_SUSPICION = 10;

export function mechanicOf(premise: Premise): Mechanic | null {
  return premise.mechanic ?? null;
}

/** Les coups de cloche déjà dépensés : une réponse au dialogue, un geste d'enquête. */
export function ticksSpent(premise: Premise, leap: LeapState): number {
  const dialogue = leap.choices['dialogue'] === undefined ? 0 : 1;
  const round = leap.choices['dialogue2'] === undefined ? 0 : 1;
  return dialogue + round + groupsSeenCount(clueGroups(premise, leap));
}

/** Combien il en reste. `null` si l'histoire n'a pas de compte à rebours. */
export function ticksLeft(premise: Premise, leap: LeapState): number | null {
  const mechanic = mechanicOf(premise);
  if (mechanic?.kind !== 'countdown') return null;
  return Math.max(0, mechanic.ticks - ticksSpent(premise, leap));
}

export function strikeTaken(leap: LeapState): boolean {
  return leap.choices['mech-strike'] !== undefined;
}

/**
 * À appeler après chaque réponse et chaque geste d'enquête : agir une fois de trop, quand le compte
 * à rebours est épuisé, coûte de la méfiance. Une seule fois par saut.
 */
export function settleCountdown(leap: LeapState, premise: Premise): LeapState {
  const mechanic = mechanicOf(premise);
  if (mechanic?.kind !== 'countdown' || strikeTaken(leap)) return leap;
  if (ticksSpent(premise, leap) <= mechanic.ticks) return leap;
  return {
    ...leap,
    suspicion: clampSuspicion(leap.suspicion + STRIKE_SUSPICION),
    choices: { ...leap.choices, 'mech-strike': '1' },
  };
}

export function mechanicUsed(leap: LeapState): boolean {
  return leap.choices['mech-use'] !== undefined;
}

/** Vrai pour le silence et l'objet, tant qu'on ne s'en est pas servi. */
export function mechanicUsable(premise: Premise, leap: LeapState): boolean {
  const mechanic = mechanicOf(premise);
  return (
    (mechanic?.kind === 'silence' || mechanic?.kind === 'object') && !mechanicUsed(leap)
  );
}

/** Te taire et écouter (apaise), ou utiliser l'objet (apprend une vérité, mais se remarque). */
export function useMechanic(leap: LeapState, premise: Premise): LeapState {
  const mechanic = mechanicOf(premise);
  if (mechanic?.kind !== 'silence' && mechanic?.kind !== 'object') {
    throw new BeatError('Cette histoire n’a rien à utiliser.');
  }
  if (mechanicUsed(leap)) throw new BeatError('C’est déjà fait.');
  if (mechanic.kind === 'silence') {
    return {
      ...leap,
      suspicion: clampSuspicion(leap.suspicion + SILENCE_SUSPICION),
      choices: { ...leap.choices, 'mech-use': '1' },
    };
  }
  return {
    ...leap,
    suspicion: clampSuspicion(leap.suspicion + OBJECT_SUSPICION),
    choices: { ...leap.choices, 'mech-use': '1', 'mech-truth': mechanic.revealsTruth },
  };
}

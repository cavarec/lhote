import { OBSERVER_WEIGHTS, type ObserverMessage } from '../../../content/observers/types';
import type { Echo } from '../../../content/echoes/types';
import { createRng } from './rng';

/** Sels : chaque tirage a sa propre source, pour ne pas déplacer les tirages existants. */
export const ECHO_SALT = 0x85ebca6b;
export const OBSERVER_SALT = 0x5bd1e995;
/** Un saut sur quatre contient un écho personnel (§2.5). */
export const ECHO_PROBABILITY = 0.25;

/** L'écho d'un saut, ou `null`. Déterministe : même graine, même écho. */
export function pickEcho(seed: number, echoes: readonly Echo[]): Echo | null {
  if (echoes.length === 0) return null;
  const rng = createRng((seed ^ ECHO_SALT) >>> 0);
  return rng.chance(ECHO_PROBABILITY) ? rng.pick(echoes) : null;
}

/**
 * Le message de l'Observateur qui suit un saut : un type tiré selon ses poids, puis un message de ce
 * type. Déterministe : le même saut donne toujours le même message.
 */
export function pickObserverMessage(
  seed: number,
  messages: readonly ObserverMessage[],
): ObserverMessage | null {
  const available = messages.filter((m) => OBSERVER_WEIGHTS[m.type] > 0);
  if (available.length === 0) return null;
  const rng = createRng((seed ^ OBSERVER_SALT) >>> 0);
  const types = [...new Set(available.map((m) => m.type))];
  const total = types.reduce((sum, t) => sum + OBSERVER_WEIGHTS[t], 0);
  let roll = rng.next() * total;
  const type = types.find((t) => (roll -= OBSERVER_WEIGHTS[t]) < 0) ?? types[0]!;
  return rng.pick(available.filter((m) => m.type === type));
}

/** La dernière image d'un saut : le corps se défait, un autre souffle commence déjà. */
export const LEAP_OUTS: readonly string[] = [
  'Le bleu monte derrière tes paupières. Un autre souffle, un autre froid, une autre nuit t’attendent déjà.',
  'Tes mains sont déjà moins les siennes. Quelque part, quelqu’un vient de manquer à sa place.',
  'Le monde se défait par les bords, sans bruit. Tu entends une porte s’ouvrir, très loin, pour toi.',
  'Tu quittes ce corps comme on quitte un manteau chaud. Un autre est déjà posé sur le dossier d’une chaise.',
  'Le goût de pierre mouillée revient. Il revient toujours juste avant. Tu sais ce que ça veut dire.',
];

export function pickLeapOut(seed: number): string {
  return LEAP_OUTS[Math.abs(Math.floor(seed)) % LEAP_OUTS.length] ?? LEAP_OUTS[0]!;
}

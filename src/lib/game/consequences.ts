import type { HandOutcome } from '../../../content/premises/types';
import type { ChoiceKind } from '../engine/types';
import type { ClueGroup } from './beats';

// Une ligne après chaque geste, pour que le joueur voie ce que son choix a changé. Le chiffre de la
// suspicion reste caché (§6.3) : on dit seulement dans quel sens les autres basculent.

const LESS = 'Ils se méfient moins de toi.';
const SOME = 'Ils se méfient un peu plus de toi.';
const MUCH = 'Ils se méfient beaucoup plus de toi.';

export function choiceConsequence(kind: ChoiceKind): string {
  if (kind === 'neutral') return 'Rien ne change : ils ne se méfient pas plus de toi.';
  return kind === 'informative' ? SOME : MUCH;
}

export function handConsequence(outcome: HandOutcome): string {
  if (outcome === 'saves') return LESS;
  if (outcome === 'betrays') return MUCH;
  return `${SOME} Mais tu as appris quelque chose.`;
}

/** Un geste d'enquête coûte du temps ; il rapporte une vérité ou seulement un détail. */
export function clueConsequence(
  group: Pick<ClueGroup, 'indices'>,
  truthIndices: ReadonlySet<number>,
): string {
  const solid = group.indices.some((i) => truthIndices.has(i));
  return solid
    ? 'Tu tiens quelque chose de solide.'
    : 'Ce n’est qu’un détail. Le temps file.';
}

export function silenceConsequence(): string {
  return LESS;
}

export function objectConsequence(): string {
  return `${SOME} Mais tu en sais plus.`;
}

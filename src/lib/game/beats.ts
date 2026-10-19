import type { Character } from '../../../content/characters/types';
import type {
  Choice,
  DialogueLine,
  InvestigationItem,
  Premise,
  HandMove,
  Resolution,
  Twist,
} from '../../../content/premises/types';
import { applySuspicion, clampSuspicion, isExposed } from '../engine/suspicion';
import type { Catalog, LeapState } from '../engine/types';

// Déroulé d'un saut (§6.4) en fonctions pures : chaque action reçoit l'état du saut et en renvoie
// un nouveau. Le contrôleur sauve ensuite ce nouvel état, ce qui rend la reprise automatique.

export const BEATS = [
  'wakeup',
  'orientation',
  'dialogue',
  'investigation',
  'fracture',
  'resolution',
] as const;

export type Beat = (typeof BEATS)[number];

export class BeatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BeatError';
  }
}

/** Le beat en cours : les beats déjà franchis sont dans `visitedBeats` (numéros de 1 à 6). */
export function currentBeat(leap: LeapState): Beat {
  return BEATS[Math.min(leap.visitedBeats.length, BEATS.length - 1)] ?? 'resolution';
}

export function isLastBeat(leap: LeapState): boolean {
  return leap.visitedBeats.length >= BEATS.length - 1;
}

/** Franchit le beat en cours. Le dernier beat ne se franchit pas : on le clôt en résolvant. */
export function completeBeat(leap: LeapState): LeapState {
  if (isLastBeat(leap)) throw new BeatError('Le dernier beat se clôt par la résolution.');
  // Le dialogue à choix doit être tranché avant d'avancer.
  if (currentBeat(leap) === 'dialogue' && leap.choices['dialogue'] === undefined) {
    throw new BeatError('Un choix est attendu avant de poursuivre.');
  }
  return { ...leap, visitedBeats: [...leap.visitedBeats, leap.visitedBeats.length + 1] };
}

export type DotState = 'done' | 'current' | 'todo';

/** Cinq points de progression (§7.1) : les beats 2 à 6. Le réveil n'en a pas. */
export function progressDots(leap: LeapState): DotState[] {
  const index = leap.visitedBeats.length;
  return Array.from({ length: 5 }, (_, i) => {
    const beat = i + 1;
    if (beat < index) return 'done';
    return beat === index ? 'current' : 'todo';
  });
}

/** Le personnage de l'emplacement « 0 » ou « 1 » (`Dialogue.npcId`). */
export function speakerFor(
  leap: LeapState,
  catalog: Catalog,
  npcId: string,
): Character | null {
  if (npcId !== '0' && npcId !== '1') return null;
  const id = leap.characterIds[Number(npcId)];
  return catalog.characters.find((c) => c.id === id) ?? null;
}

export function characterLines(character: Character, key: string): DialogueLine[] {
  return character.dialogues[key] ?? [];
}

export interface DialogueOutcome {
  leap: LeapState;
  choice: Choice;
}

/** Applique un choix du dialogue d'ouverture : suspicion et trace du choix. Un seul par saut. */
export function chooseDialogue(
  leap: LeapState,
  premise: Premise,
  choiceId: string,
): DialogueOutcome {
  if (leap.choices['dialogue'] !== undefined) {
    throw new BeatError('Le choix a déjà été fait.');
  }
  const choice = premise.openingDialogue.choices?.find((c) => c.id === choiceId);
  if (!choice) throw new BeatError(`Choix inconnu : ${choiceId}.`);
  return {
    choice,
    leap: {
      ...leap,
      suspicion: applySuspicion(leap.suspicion, choice.kind),
      choices: { ...leap.choices, dialogue: choice.id },
    },
  };
}

/** Applique un choix de la seconde passe du dialogue. Un seul par saut, après le premier. */
export function chooseSecondRound(
  leap: LeapState,
  premise: Premise,
  choiceId: string,
): DialogueOutcome {
  const round = premise.openingDialogue.secondRound;
  if (!round) throw new BeatError('Ce dialogue n’a pas de seconde passe.');
  if (leap.choices['dialogue'] === undefined) {
    throw new BeatError('Le premier choix doit précéder le second.');
  }
  if (leap.choices['dialogue2'] !== undefined) {
    throw new BeatError('Le choix a déjà été fait.');
  }
  const choice = round.choices.find((c) => c.id === choiceId);
  if (!choice) throw new BeatError(`Choix inconnu : ${choiceId}.`);
  return {
    choice,
    leap: {
      ...leap,
      suspicion: applySuspicion(leap.suspicion, choice.kind),
      choices: { ...leap.choices, dialogue2: choice.id },
    },
  };
}

/** Éléments d'enquête affichés : ceux qui révèlent un objet disparaissent si le saut n'en a pas. */
export function visibleInvestigation(
  premise: Premise,
  leap: LeapState,
): { index: number; item: InvestigationItem }[] {
  return premise.investigation
    .map((item, index) => ({ index, item }))
    .filter(({ item }) => item.revealsArtifact === undefined || leap.artifactId !== null);
}

export type ClueKind = InvestigationItem['kind'];

export interface ClueGroup {
  kind: ClueKind;
  label: string;
  indices: number[];
  texts: string[];
  seen: boolean;
}

const CLUE_ORDER: { kind: ClueKind; label: string }[] = [
  { kind: 'material', label: 'Regarder autour de soi' },
  { kind: 'bodily', label: 'Écouter ce corps' },
  { kind: 'social', label: 'Observer les autres' },
];

/**
 * Les indices regroupés par nature : un seul bouton par nature, même si la prémisse en compte
 * plusieurs. Évite les libellés en double à l'écran.
 */
export function clueGroups(premise: Premise, leap: LeapState): ClueGroup[] {
  const visible = visibleInvestigation(premise, leap);
  return CLUE_ORDER.flatMap(({ kind, label }) => {
    const items = visible.filter(({ item }) => item.kind === kind);
    if (items.length === 0) return [];
    const indices = items.map(({ index }) => index);
    return [
      {
        kind,
        label,
        indices,
        texts: items.map(({ item }) => item.text),
        seen: indices.every((i) => leap.choices[`clue-${i}`] === 'seen'),
      },
    ];
  });
}

/** Combien de natures d'indice le joueur peut examiner : le temps manque pour tout voir. */
export const INVESTIGATION_BUDGET = 2;

export function groupsSeenCount(groups: ClueGroup[]): number {
  return groups.filter((g) => g.seen).length;
}

/** Gestes restants. Jamais négatif ; une prémisse à moins de natures laisse tout examiner. */
export function investigationLeft(groups: ClueGroup[]): number {
  const budget = Math.min(INVESTIGATION_BUDGET, groups.length);
  return Math.max(0, budget - groupsSeenCount(groups));
}

/** Les vérités apprises : celles que portent les indices déjà vus. */
export function knownTruths(premise: Premise, leap: LeapState): Set<string> {
  const truths = new Set<string>();
  premise.investigation.forEach((item, index) => {
    if (item.revealsTruth !== undefined && leap.choices[`clue-${index}`] === 'seen') {
      truths.add(item.revealsTruth);
    }
  });
  const fromHand = leap.choices['hand-truth'];
  if (fromHand !== undefined) truths.add(fromHand);
  return truths;
}

/** Variation de suspicion d'un geste de la main : elle sauve, trahit ou révèle. */
export const HAND_SUSPICION: Record<HandMove['outcome'], number> = {
  saves: -15,
  betrays: 25,
  reveals: 10,
};

export type HandBeat = 'dialogue' | 'investigation';

/** La main a-t-elle déjà agi à ce beat ? Une seule fois par beat. */
export function handUsed(leap: LeapState, beat: HandBeat): boolean {
  return leap.choices[`hand-${beat}`] !== undefined;
}

/** Le geste que la prémisse prévoit à ce beat, ou `null`. */
export function handMove(premise: Premise, beat: HandBeat): HandMove | null {
  return premise.handLetGo?.[beat] ?? null;
}

/**
 * Laisser le corps agir. Au dialogue, il tient lieu de choix (avant la première réponse). À l'enquête,
 * il ne coûte aucun geste. Le résultat vient de la prémisse, jamais du hasard.
 */
export function letHandAct(leap: LeapState, premise: Premise, beat: HandBeat): LeapState {
  const move = handMove(premise, beat);
  if (!move) throw new BeatError('Cette histoire ne prévoit pas ce geste.');
  if (handUsed(leap, beat)) throw new BeatError('La main a déjà agi à ce moment.');
  if (beat === 'dialogue' && leap.choices['dialogue'] !== undefined) {
    throw new BeatError('Le dialogue est déjà engagé.');
  }
  const choices: Record<string, string> = {
    ...leap.choices,
    hand: '1',
    [`hand-${beat}`]: move.outcome,
  };
  if (beat === 'dialogue') choices['dialogue'] = 'hand';
  if (move.revealsTruth !== undefined) choices['hand-truth'] = move.revealsTruth;
  return {
    ...leap,
    suspicion: clampSuspicion(leap.suspicion + HAND_SUSPICION[move.outcome]),
    choices,
  };
}

export function revealClues(
  leap: LeapState,
  indices: number[],
  premise?: Premise,
): LeapState {
  const fresh = indices.some((i) => leap.choices[`clue-${i}`] !== 'seen');
  if (premise && fresh) {
    const groups = clueGroups(premise, leap);
    if (investigationLeft(groups) === 0) {
      throw new BeatError('Le temps manque pour examiner autre chose.');
    }
  }
  return {
    ...leap,
    choices: {
      ...leap.choices,
      ...Object.fromEntries(indices.map((i) => [`clue-${i}`, 'seen'])),
    },
  };
}

export function revealClue(leap: LeapState, index: number): LeapState {
  return { ...leap, choices: { ...leap.choices, [`clue-${index}`]: 'seen' } };
}

/**
 * Le coup de théâtre de ce saut : le premier dont toutes les vérités exigées sont connues.
 * `null` si la prémisse n'en a pas.
 */
export function activeTwist(premise: Premise, leap: LeapState): Twist | null {
  const known = knownTruths(premise, leap);
  return (
    premise.twists?.find((t) => (t.requires ?? []).every((id) => known.has(id))) ?? null
  );
}

/** Le coup de théâtre est en cours (« pending ») : le joueur l'a déclenché et doit le jouer. */
export function twistPending(leap: LeapState): boolean {
  return leap.choices['twist'] === 'pending';
}

export function startTwist(leap: LeapState): LeapState {
  return { ...leap, choices: { ...leap.choices, twist: 'pending' } };
}

/** Quelle lecture de la fracture le joueur retient (0 ou 1). */
export function leanToward(leap: LeapState, interpretation: 0 | 1): LeapState {
  return { ...leap, choices: { ...leap.choices, fracture: String(interpretation) } };
}

export function exposed(leap: LeapState): boolean {
  return isExposed(leap.suspicion);
}

/**
 * Les résolutions proposées. Un joueur dont la suspicion a atteint 100 n'a plus le choix :
 * l'issue « exposée » s'impose, sans message de défaite (§2.3).
 */
export function availableResolutions(premise: Premise, leap: LeapState): Resolution[] {
  const open = premise.resolutions.filter((r) => !isLocked(premise, leap, r));
  if (!exposed(leap)) return open;
  const forced = premise.resolutions.filter((r) => r.outcome === 'exposed');
  return forced.length > 0 ? forced : open;
}

/** Une issue est verrouillée tant que le joueur n'a appris aucune des vérités qu'elle exige. */
export function isLocked(premise: Premise, leap: LeapState, r: Resolution): boolean {
  if (r.requiresAny === undefined || r.requiresAny.length === 0) return false;
  const known = knownTruths(premise, leap);
  return !r.requiresAny.some((t) => known.has(t));
}

/** Les issues que l'enquête n'a pas ouvertes : montrées grisées, pour que le choix se voie. */
export function lockedResolutions(premise: Premise, leap: LeapState): Resolution[] {
  if (exposed(leap)) return [];
  return premise.resolutions.filter((r) => isLocked(premise, leap, r));
}

import type { ChoiceKind, WorldMutation } from '../../src/lib/engine/types';

// Types de contenu d'une prémisse (§6.1). Le texte joueur obéit aux règles du §6.3.

export type ClueKind = 'material' | 'bodily' | 'social';
export type Outcome = 'resolved' | 'died' | 'exposed' | 'failed';

export interface OrientationItem {
  kind: ClueKind;
  text: string;
}

export interface DialogueLine {
  speaker: 'npc' | 'player' | 'narration';
  text: string;
}

/**
 * Option d'un dialogue à choix (§6.3). `kind` fixe l'effet sur la suspicion :
 * neutre (sûre), informative (montre un indice), risquée (révèle la fracture).
 */
export interface Choice {
  id: string;
  kind: ChoiceKind;
  text: string;
  /** Réaction du PNJ, jouée après le choix. Aucun choix ne mène à un game over explicite. */
  reply: DialogueLine[];
}

export interface Dialogue {
  npcId: string;
  lines: DialogueLine[];
  /** 3 ou 4 options si le dialogue est à choix ; absent pour un simple échange. */
  choices?: Choice[];
}

export interface InvestigationItem {
  kind: ClueKind;
  text: string;
  revealsArtifact?: string;
  revealsTruth?: string;
}

export interface Resolution {
  id: string;
  choiceText: string;
  outcome: Outcome;
  fractureRepaired: boolean;
  resultText: string;
  mutations: WorldMutation[];
  /**
   * Vérités dont l'une au moins doit avoir été apprise pendant l'enquête pour que cette issue
   * soit praticable. Absent : toujours praticable. L'enquête étant limitée, ce que le joueur a
   * choisi d'examiner décide de ce qu'il peut tenter.
   */
  requiresAny?: string[];
}

export interface Premise {
  id: string;
  title: string;
  epoch: string;
  wakeup: string;
  orientation: OrientationItem[];
  openingDialogue: Dialogue;
  investigation: InvestigationItem[];
  /** Ids des deux fractures possibles (la seed en choisit une). */
  fractures: [string, string];
  resolutions: Resolution[];
}

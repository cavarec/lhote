import type { WorldMutation } from '../../src/lib/engine/types';

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

export interface Dialogue {
  npcId: string;
  lines: DialogueLine[];
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

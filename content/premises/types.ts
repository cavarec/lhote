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

/** Seconde passe du dialogue : la situation se tend et le joueur choisit de nouveau. */
export interface SecondRound {
  lines: DialogueLine[];
  /** 3 ou 4 options, comme la première passe. Leur effet sur la suspicion s'ajoute. */
  choices: Choice[];
}

/**
 * « Laisser ta main faire » : le corps hérité agit seul (§2.5, la mémoire en gruyère). Ce qui en
 * résulte est fixé par la prémisse, jamais tiré au hasard : l'hôte sait se battre, mentir ou parler
 * (« saves »), réagit comme lui et pas comme toi (« betrays »), ou fait un geste que seul le vrai
 * personnage ferait (« reveals »).
 */
export type HandOutcome = 'saves' | 'betrays' | 'reveals';

export interface HandMove {
  outcome: HandOutcome;
  /** 2 à 4 lignes, jouées après le geste. */
  lines: DialogueLine[];
  /** Pour un geste d'enquête : la vérité que le corps connaît déjà (sans coûter un geste). */
  revealsTruth?: string;
}

export interface Season {
  from: string;
  to: string;
  /** Nom de la fête, affiché sur l'accueil pendant la saison. */
  label: string;
}

export interface Dialogue {
  npcId: string;
  lines: DialogueLine[];
  /** 3 ou 4 options si le dialogue est à choix ; absent pour un simple échange. */
  choices?: Choice[];
  /** Absent : le dialogue s'arrête après la première réplique du personnage. */
  secondRound?: SecondRound;
}

/**
 * Coup de théâtre joué entre l'enquête et la fracture. Le premier de la liste dont toutes les
 * vérités exigées (`requires`) ont été apprises est joué ; un coup de théâtre sans `requires`
 * sert de repli et doit venir en dernier. Ce que le joueur a cherché change donc ce qui arrive.
 */
export interface Twist {
  requires?: string[];
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
  /** Disponible au dialogue (beat 3) et à l'enquête (beat 4). Absent : l'option n'apparaît pas. */
  handLetGo?: { dialogue: HandMove; investigation: HandMove };
  /**
   * Prémisse de saison : elle ne peut sortir que dans la fenêtre donnée (jours « MM-JJ », en UTC ;
   * `from` après `to` enjambe le nouvel an). Hors saison, elle n'est jamais tirée.
   */
  season?: Season;
  /** Coups de théâtre, du plus précis au repli. Absent : on passe directement à la fracture. */
  twists?: Twist[];
  resolutions: Resolution[];
}

import type { ArtifactDef } from '../../../content/artifacts/types';
import type { Character } from '../../../content/characters/types';
import type { Fracture } from '../../../content/fractures/types';
import type { Fragment } from '../../../content/fragments/types';
import type { Outcome, Premise } from '../../../content/premises/types';
import type { Echo } from '../../../content/echoes/types';
import type { ObserverMessage } from '../../../content/observers/types';

// Modèle de données (§5.2). Ajouts de l'étape 2 par rapport au prompt, tous motivés
// par le générateur (§5.8) :
//   - LeapState.seed            : la seed du saut (rejouabilité, tests) ;
//   - LeapResult.premiseId      : sans lui, impossible d'éviter les prémisses récentes ;
//   - LeapResult.characterIds   : idem pour les archétypes du saut précédent.

export type Act = 1 | 2 | 3 | 4;

export interface Chronology {
  schemaVersion: 1;
  playerId: string;
  createdAt: number;
  currentLeap: LeapState | null;
  history: LeapResult[];
  world: WorldState;
  metaProgress: MetaProgress;
}

export interface WorldState {
  doors: Door[];
  people: Person[];
  truths: Truth[];
  artifacts: Artifact[];
  scars: Scar[];
}

export interface Door {
  id: string;
  label: string;
  openedInLeap: string;
  epoch: string;
}

export interface Person {
  id: string;
  characterId: string;
  status: 'saved' | 'lost' | 'changed';
  leapId: string;
  epoch: string;
}

export interface Truth {
  id: string;
  summary: string;
  leapId: string;
}

/** Instance d'objet-trace. `toLeap === null` : l'objet attend d'être porté dans un saut. */
export interface Artifact {
  id: string;
  artifactId: string;
  fromLeap: string;
  toLeap: string | null;
}

export interface Scar {
  id: string;
  description: string;
  leapId: string;
  epoch: string;
}

export interface LeapState {
  id: string;
  seed: number;
  premiseId: string;
  characterIds: string[];
  fractureId: string;
  artifactId: string | null;
  fragmentId: string | null;
  traceId: string | null;
  startedAt: number;
  suspicion: number;
  visitedBeats: number[];
  choices: Record<string, string>;
}

export interface LeapResult {
  leapId: string;
  premiseId: string;
  characterIds: string[];
  outcome: Outcome;
  fractureRepaired: boolean;
  worldMutations: WorldMutation[];
  resolvedAt: number;
  finalSuspicion: number;
}

export type WorldMutation =
  | { type: 'addDoor'; door: Door }
  | { type: 'addPerson'; person: Person }
  | { type: 'addTruth'; truth: Truth }
  | { type: 'addArtifact'; artifact: Artifact }
  | { type: 'addScar'; scar: Scar };

export interface MetaProgress {
  fragmentsDiscovered: string[];
  act: Act;
}

/** Les 5 variables de monde (§6.5), nommées comme les champs de WorldState. */
export type WorldVariable = keyof WorldState;

/** Nature d'une option de dialogue (§6.3) : sûre, risquée ou informative. */
export type ChoiceKind = 'neutral' | 'risky' | 'informative';

/** Tout le contenu, injecté dans le moteur (le moteur ne l'importe jamais en dur). */
export interface Catalog {
  premises: readonly Premise[];
  echoes: readonly Echo[];
  observerMessages: readonly ObserverMessage[];
  characters: readonly Character[];
  fractures: readonly Fracture[];
  artifacts: readonly ArtifactDef[];
  fragments: readonly Fragment[];
}

export interface GenerateLeapInput {
  /** Id du nouveau saut (UUID fourni par l'appelant : le moteur reste pur). */
  leapId: string;
  /** Voir hash.ts : leapSeed(playerId, history.length). */
  seed: number;
  /** Horodatage fourni par l'appelant. */
  now: number;
  history: readonly LeapResult[];
  world: WorldState;
  meta: MetaProgress;
}

export interface GeneratedLeap {
  leap: LeapState;
  /** Si vrai, le Worker pioche une trace dans KV puis renseigne `leap.traceId`. */
  wantsTrace: boolean;
}

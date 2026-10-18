import type {
  Chronology,
  LeapResult,
  LeapState,
  MetaProgress,
  WorldState,
} from '../engine/types';

// Contrat HTTP entre le front et le Worker (§5.5). Partagé : un seul endroit à tenir à jour.

/** Trace discrète laissée par un autre joueur (§5.4). */
export interface Trace {
  fragment: string;
  timestamp: number;
  epoch: string;
}

export interface LeapResponse {
  leap: LeapState;
  world: WorldState;
  meta: MetaProgress;
  trace: Trace | null;
}

/**
 * Le client désigne la résolution choisie par son `id` ; le serveur en déduit l'issue et
 * les mutations depuis le contenu. Le client ne peut donc pas fabriquer de mutations.
 */
export interface ResolveRequest {
  leapId: string;
  resolutionId: string;
  suspicion?: number;
  choices?: Record<string, string>;
  visitedBeats?: number[];
}

export interface ResolveResponse {
  result: LeapResult;
  nextLeapAvailable: boolean;
}

export interface StateResponse {
  chronology: Chronology;
}

export interface HealthResponse {
  ok: true;
  version: string;
}

export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}

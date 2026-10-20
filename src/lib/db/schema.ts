import type { LeapResponse, ResolveRequest, StateResponse } from '../api/types';
import type { LeapState } from '../engine/types';

export const DB_NAME = 'lhote';
export const DB_VERSION = 1;

/** Nombre de sauts reçus conservés pour le hors-ligne (§7.4 : contenu de 3 sauts). */
export const KEPT_LEAPS = 3;

export type TextSize = 'normal' | 'large' | 'xlarge';

/** Vitesse de la machine à écrire : « instant » affiche chaque bloc d'un coup. */
export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';

export interface Settings {
  textSize: TextSize;
  textSpeed: TextSpeed;
  /** Vibration de 30 ms à la bascule de scène (si l'appareil la propose). */
  vibration: boolean;
  /** Force l'absence d'animation, en plus de la préférence du système. */
  reduceMotion: boolean;
  /** Nom de la voix choisie pour « Écouter » ; vide : la meilleure voix française disponible. */
  voice: string;
}

export const DEFAULT_SETTINGS: Settings = {
  textSize: 'normal',
  textSpeed: 'normal',
  vibration: true,
  reduceMotion: false,
  voice: '',
};

/** Un saut reçu du serveur, gardé pour le jouer hors-ligne. */
export interface StoredLeap {
  response: LeapResponse;
  receivedAt: number;
}

/** Résolution qui n'a pas pu partir : renvoyée à la reconnexion. L'API est idempotente. */
export interface PendingResolve {
  request: ResolveRequest;
  queuedAt: number;
  attempts: number;
}

export interface StoredState {
  state: StateResponse;
  savedAt: number;
}

/** Progression locale du saut en cours, sauvée à chaque étape (§7.1 : état sauvé automatiquement). */
export type Progress = LeapState;

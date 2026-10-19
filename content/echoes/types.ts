// Écho personnel : une phrase glissée dans l'orientation d'un saut sur quatre. Jamais signalé, jamais
// compté, jamais expliqué. Ce sont les vraies pièces du puzzle ; les fragments explicites sont des leurres.
export type EchoKind = 'object' | 'name' | 'sensation' | 'phrase';

export interface Echo {
  id: string;
  kind: EchoKind;
  text: string;
}

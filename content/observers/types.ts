// Message de l'Observateur : un seul entre deux sauts, jamais pendant un saut (§2.5).
// Il ne dit jamais qui est le joueur : il dit ce qu'il croit savoir, et il se trompe parfois.
export type ObserverType = 'useful' | 'useless' | 'false' | 'personal';

export interface ObserverMessage {
  id: string;
  type: ObserverType;
  text: string;
}

/** Part de chaque type dans le tirage : 40 % utile, 30 % inutile, 20 % faux, 10 % personnel. */
export const OBSERVER_WEIGHTS: Record<ObserverType, number> = {
  useful: 40,
  useless: 30,
  false: 20,
  personal: 10,
};

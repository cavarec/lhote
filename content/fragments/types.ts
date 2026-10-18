// Fragment de méta-histoire : un par saut au plus, jamais résolu complètement (§6.6).

export interface Fragment {
  id: string;
  /** Acte à partir duquel le fragment peut apparaître (1 à 4). */
  act: 1 | 2 | 3 | 4;
  /** Rang dans l'acte : les fragments sortent par (act, order) croissants. */
  order: number;
  text: string;
}

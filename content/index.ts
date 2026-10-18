import type { Catalog } from '../src/lib/engine/types';

// Catalogue de contenu injecté dans le moteur. Vide jusqu'à l'étape 4 : tant qu'il l'est,
// `POST /api/leap` répond 500 `content_error`.
export const catalog: Catalog = {
  premises: [],
  characters: [],
  fractures: [],
  artifacts: [],
  fragments: [],
};

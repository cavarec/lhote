import type { Catalog } from '../src/lib/engine/types';
import { fractures } from './fractures';
import { premise01 } from './premises/premise-01';
import { premise02 } from './premises/premise-02';
import { premise03 } from './premises/premise-03';

// Catalogue de contenu injecté dans le moteur. Incomplet jusqu'à 4d : tant qu'il manque des
// personnages (au moins deux d'archétypes distincts), `POST /api/leap` répond 500 `content_error`.
export const catalog: Catalog = {
  premises: [premise01, premise02, premise03],
  characters: [],
  fractures,
  artifacts: [],
  fragments: [],
};

import type { Catalog } from '../src/lib/engine/types';
import { artifacts } from './artifacts';
import { characters } from './characters/archetypes';
import { fractures } from './fractures';
import { fragments } from './fragments';
import { premise01 } from './premises/premise-01';
import { premise02 } from './premises/premise-02';
import { premise03 } from './premises/premise-03';

// Catalogue de contenu injecté dans le moteur : 3 prémisses, 8 personnages, 6 fractures,
// 6 objets-traces et 10 fragments.
export const catalog: Catalog = {
  premises: [premise01, premise02, premise03],
  characters,
  fractures,
  artifacts,
  fragments,
};

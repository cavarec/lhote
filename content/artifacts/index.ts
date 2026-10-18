import type { ArtifactDef } from './types';

// Six objets-traces. Un objet traverse les sauts : il est trouvé dans l'un, porté dans le suivant.
// Les descriptions ne nomment aucune époque, pour tenir dans n'importe quelle prémisse.
export const artifacts: readonly ArtifactDef[] = [
  {
    id: 'artifact-01',
    name: 'Une clé sans serrure',
    description:
      'Elle est tiède, comme si quelqu’un venait de la lâcher. Aucune porte ne lui correspond.',
  },
  {
    id: 'artifact-02',
    name: 'Un bouton de manteau',
    description:
      'Cousu à la hâte, il tient par un fil noir. Le tissu qu’il retenait a disparu.',
  },
  {
    id: 'artifact-03',
    name: 'Un fil rouge noué',
    description:
      'Trois nœuds, serrés par trois mains différentes. Le dernier est encore humide.',
  },
  {
    id: 'artifact-04',
    name: 'Une carte pliée',
    description:
      'Des routes tracées au crayon, sans nom de ville. Une croix marque l’endroit où tu te trouves.',
  },
  {
    id: 'artifact-05',
    name: 'Une dent de lait',
    description:
      'Elle est enveloppée dans un papier. Quelqu’un y a écrit un mot, puis l’a effacé.',
  },
  {
    id: 'artifact-06',
    name: 'Une cuillère tordue',
    description:
      'Elle a servi à autre chose qu’à manger. Le manche garde la forme d’un pouce.',
  },
];

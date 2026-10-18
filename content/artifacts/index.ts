import type { ArtifactDef } from './types';

// Six objets-traces. Un objet traverse les sauts : il est trouvé dans l'un, porté dans le suivant.
// Les descriptions ne nomment aucune époque, pour tenir dans n'importe quelle prémisse.
export const artifacts: readonly ArtifactDef[] = [
  {
    id: 'artifact-01',
    name: 'Une clé d’or',
    description:
      'Elle est plus lourde qu’elle ne devrait, et tiède, comme si quelqu’un venait de la lâcher. Aucune porte ne lui correspond.',
  },
  {
    id: 'artifact-02',
    name: 'Un peigne d’ivoire',
    description:
      'Deux dents manquent. Il garde l’odeur de l’eau, et un long cheveu y est resté pris.',
  },
  {
    id: 'artifact-03',
    name: 'Un fil rouge noué',
    description:
      'Trois nœuds, serrés par trois mains différentes. Le dernier est encore humide.',
  },
  {
    id: 'artifact-04',
    name: 'Un carnet de contes',
    description:
      'Des histoires courtes, d’une écriture penchée. Chacune ressemble à un moment de ta vie, et aucune ne s’achève.',
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

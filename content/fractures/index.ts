import type { Fracture } from './types';

// Fractures : deux par prémisse (01-02 : premise-01, 03-04 : premise-02, 05-06 : premise-03).
// Les deux fractures d'une prémisse tournent autour du même lieu ou objet, pour que les
// résolutions de la prémisse restent justes quelle que soit la fracture tirée.
export const fractures: readonly Fracture[] = [
  {
    id: 'fracture-01',
    title: 'La réserve est presque vide',
    interpretations: [
      'Le gardien a pris pour lui ce qui devait nourrir les lampes du village.',
      'Le gardien a caché la pénurie pour éviter la peur, et il paie ce silence seul.',
    ],
  },
  {
    id: 'fracture-02',
    title: 'Le cahier ne tient pas',
    interpretations: [
      'Le gardien a servi ses proches avant les autres et il a truqué les chiffres.',
      'Quelqu’un a réécrit le cahier pour faire accuser le gardien.',
    ],
  },
  {
    id: 'fracture-03',
    title: 'Un navire est parti sans être inscrit',
    interpretations: [
      'Le veilleur a laissé partir ce navire contre un service ou de l’argent.',
      'Quelqu’un a profité du sommeil du veilleur pour faire sortir ce navire.',
    ],
  },
  {
    id: 'fracture-04',
    title: 'Le fanal s’est éteint pendant une heure',
    interpretations: [
      'Le veilleur s’est endormi, et la nuit a failli coûter un navire.',
      'Quelqu’un a éteint le fanal pour cacher ce qui se passait dans le port.',
    ],
  },
  {
    id: 'fracture-05',
    title: 'Le compartiment sept ne s’ouvre plus',
    interpretations: [
      'Quelqu’un s’y cache et ne veut pas qu’on le trouve.',
      'Quelqu’un s’y est enfermé parce qu’il a besoin d’aide et ne peut plus la demander.',
    ],
  },
  {
    id: 'fracture-06',
    title: 'La place sept a été vendue deux fois',
    interpretations: [
      'Le chef de train a vendu la place deux fois et il couvre sa faute.',
      'Quelqu’un a fait poinçonner un faux billet pour s’imposer dans ce compartiment.',
    ],
  },
];

import type { Fracture } from './types';

// Fractures types. Les deux premières appartiennent à la prémisse 1 ; 4d complète à quatre.
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
];

import type { Fragment } from './types';

// Fragments de méta-histoire (§6.6) : un par saut au plus, par acte et par rang croissants.
// Règle critique : ne jamais tout résoudre. Chaque fragment ouvre une question de plus qu'il
// n'en ferme. Le mystère est le sujet du jeu.
//   Acte 1 (sauts 1 à 5)   : il saute, il ne sait pas pourquoi.
//   Acte 2 (sauts 6 à 12)  : les sauts suivent un fil.
//   Acte 3 (sauts 13 à 18) : le fil mène à lui.
//   Acte 4 (sauts 19 et +) : il peut arrêter ou continuer.
export const fragments: readonly Fragment[] = [
  {
    id: 'fragment-01',
    act: 1,
    order: 1,
    text: 'Quelque part, derrière tes paupières, une voix compte. Elle s’arrête toujours avant de dire ton nom.',
  },
  {
    id: 'fragment-02',
    act: 1,
    order: 2,
    text: 'Tu as déjà ouvert les yeux ainsi. Pas dans ce corps. Pas dans cette vie. Mais ainsi.',
  },
  {
    id: 'fragment-03',
    act: 1,
    order: 3,
    text: 'Un goût de pierre mouillée revient à chaque réveil. Tu n’en as jamais mangé.',
  },
  {
    id: 'fragment-04',
    act: 2,
    order: 1,
    text: 'Une même main a écrit sur trois murs, dans trois vies. Elle appuie plus fort que les autres.',
  },
  {
    id: 'fragment-05',
    act: 2,
    order: 2,
    text: 'On t’a attendu derrière chaque porte que tu as ouverte. Personne ne t’a dit que tu viendrais.',
  },
  {
    id: 'fragment-06',
    act: 2,
    order: 3,
    text: 'Quand tu répares une chose, une autre se défait ailleurs. Tu le sens, sans jamais le voir.',
  },
  {
    id: 'fragment-07',
    act: 3,
    order: 1,
    text: 'Le fil que tu suis n’est pas posé devant toi. Il sort de toi, et il se déroule derrière.',
  },
  {
    id: 'fragment-08',
    act: 3,
    order: 2,
    text: 'Quelqu’un a déjà fait tout ce chemin. Ses pas sont plus profonds que les tiens.',
  },
  {
    id: 'fragment-09',
    act: 3,
    order: 3,
    text: 'Dans une vie que tu n’as pas encore vécue, quelqu’un prononce ton nom sans hésiter.',
  },
  {
    id: 'fragment-10',
    act: 4,
    order: 1,
    text: 'Tu peux arrêter. La porte est là, et elle n’a jamais été fermée. Tu peux aussi continuer.',
  },
];

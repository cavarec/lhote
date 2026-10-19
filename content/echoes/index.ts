import type { Echo } from './types';

// Huit échos. Ils ne citent aucun lieu, aucune époque, aucun nom propre : ils vont dans n'importe quel
// saut. Chacun fait reconnaître quelque chose au joueur sans lui dire quoi.
export const echoes: readonly Echo[] = [
  {
    id: 'echo-01',
    kind: 'object',
    text: 'Sur le rebord, un galet blanc, percé d’un trou. Tu sais comment on le tient, sans savoir pourquoi.',
  },
  {
    id: 'echo-02',
    kind: 'object',
    text: 'Un fil rouge traîne par terre, noué trois fois. Tes doigts connaissent ce nœud.',
  },
  {
    id: 'echo-03',
    kind: 'name',
    text: 'Quelqu’un appelle un nom, au loin. Il te dit quelque chose. Il s’éteint avant que tu l’attrapes.',
  },
  {
    id: 'echo-04',
    kind: 'name',
    text: 'Un nom est gravé sur une poutre, effacé à moitié. Tu l’as déjà lu. Tu ne sais pas où.',
  },
  {
    id: 'echo-05',
    kind: 'sensation',
    text: 'Une odeur de pomme brûlée passe. Elle te serre la gorge, et elle est beaucoup trop précise.',
  },
  {
    id: 'echo-06',
    kind: 'sensation',
    text: 'La lumière tombe d’une façon que tu connais : en biais, jaune, sur une table que tu ne vois pas.',
  },
  {
    id: 'echo-07',
    kind: 'phrase',
    text: 'Quelqu’un dit : « Tu reviendras par la même porte. » Personne ne sait qui l’a dit.',
  },
  {
    id: 'echo-08',
    kind: 'phrase',
    text: 'Une voix d’enfant chante deux mesures d’une berceuse. Tu en connais la troisième.',
  },
];

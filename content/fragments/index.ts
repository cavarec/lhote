import type { Fragment } from './types';

// Fragments de méta-histoire (§6.6) : un par saut au plus, par acte et par rang croissants.
// Chaque fragment répond à une question que le joueur se pose sur lui-même, puis en ouvre une autre.
// Le mystère reste le sujet du jeu, mais chaque saut rapporte une vraie réponse.
//
// Le fil : tu avais un nom. Une nuit de grande marée, tu as promis à quelqu'un sans visage de tenir
// la place d'un absent. En échange, il a gardé ton nom. Depuis, tu entres dans les corps que laisse
// un absent, et chaque nuit réparée te rend un peu de ce que tu as promis de porter.
//   Acte 1 (sauts 1 à 5)   : qui tu étais, et comment tu entres dans ces corps.
//   Acte 2 (sauts 6 à 12)  : ce que tu as promis, et ce que ça te coûte.
//   Acte 3 (sauts 13 à 18) : celui à qui tu as promis, et ceux qui sont venus avant toi.
//   Acte 4 (sauts 19 et +) : tu peux arrêter ou continuer.
export const fragments: readonly Fragment[] = [
  {
    id: 'fragment-01',
    act: 1,
    order: 1,
    text: 'Tu avais un nom, avant. Chaque matin, ta bouche en refait le premier son, très doux, puis le corps te le reprend. Qui te l’a pris ?',
  },
  {
    id: 'fragment-02',
    act: 1,
    order: 2,
    text: 'Tu n’entres pas dans ces corps au hasard. À chaque fois, quelqu’un manquait : un absent, une place vide. Qui manque dans ta vie à toi ?',
  },
  {
    id: 'fragment-03',
    act: 1,
    order: 3,
    text: 'Tu sais laver, veiller, conduire, parce que ces gestes sont à toi, d’avant. Tu étais de ceux qui accompagnent les autres. Jusqu’où ?',
  },
  {
    id: 'fragment-04',
    act: 2,
    order: 1,
    text: 'Il y a eu une nuit de grande marée. Quelqu’un sans visage t’a demandé de tenir une place, et tu as dit oui. Pourquoi as-tu dit oui ?',
  },
  {
    id: 'fragment-05',
    act: 2,
    order: 2,
    text: 'En échange de ta promesse, on a gardé ton nom. Il est quelque part, dans l’une de ces nuits. Dans laquelle ?',
  },
  {
    id: 'fragment-06',
    act: 2,
    order: 3,
    text: 'Quand tu répares une nuit, une autre se défait ailleurs : la place que tu tiens doit rester tenue. Qui la tient quand tu pars ?',
  },
  {
    id: 'fragment-07',
    act: 3,
    order: 1,
    text: 'Celui qui t’a demandé ça, tu l’as déjà croisé. Il avait chaque fois une bonne raison de te sourire. Lequel était-il ?',
  },
  {
    id: 'fragment-08',
    act: 3,
    order: 2,
    text: 'Quelqu’un a déjà fait ce chemin. Ses pas sont plus profonds que les tiens, et ils s’arrêtent à une porte. Pourquoi s’est-il arrêté ?',
  },
  {
    id: 'fragment-09',
    act: 3,
    order: 3,
    text: 'Dans une nuit que tu n’as pas encore vécue, quelqu’un dit ton nom sans hésiter. C’est ta propre voix, plus tard. Qu’as-tu fini par comprendre ?',
  },
  {
    id: 'fragment-10',
    act: 4,
    order: 1,
    text: 'Tu peux arrêter : redis ton nom entier, à voix haute, et la porte s’ouvre. Mais il te manque encore des lettres, et ceux dont tu tiens la place l’ignorent. Tu peux aussi continuer.',
  },
];

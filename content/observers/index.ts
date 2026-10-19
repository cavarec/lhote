import type { ObserverMessage } from './types';

// Douze messages : quatre utiles, quatre inutiles, deux faux, deux personnels. Le joueur ne sait jamais
// de quel type est celui qu'il lit. Ils tutoient, ne citent aucun lieu et ne disent pas qui est le joueur.
export const observerMessages: readonly ObserverMessage[] = [
  {
    id: 'observer-01',
    type: 'useful',
    text: 'Regarde ce que le corps fait sans toi. Ses mains savent parfois ce que ta tête ignore.',
  },
  {
    id: 'observer-02',
    type: 'useful',
    text: 'Quelqu’un, dans la pièce, sait déjà. Écoute qui se tait, plus que ceux qui parlent.',
  },
  {
    id: 'observer-03',
    type: 'useful',
    text: 'Tu ne pourras pas tout examiner. Choisis ce que tu laisses dans l’ombre.',
  },
  {
    id: 'observer-04',
    type: 'useful',
    text: 'Ne dis pas tout de suite ce que tu vois. Laisse la personne en face parler la première.',
  },
  {
    id: 'observer-05',
    type: 'useless',
    text: 'J’ai marché longtemps ce soir, au bord d’une eau que je ne reconnaissais pas. Elle m’a reconnu, elle.',
  },
  {
    id: 'observer-06',
    type: 'useless',
    text: 'Il paraît que les cloches sonnent plus fort quand personne ne les écoute.',
  },
  {
    id: 'observer-07',
    type: 'useless',
    text: 'Je me demande si tu aimes le pain tiède. Moi, j’ai oublié ce que c’est.',
  },
  {
    id: 'observer-08',
    type: 'useless',
    text: 'Quelqu’un compte-t-il tes pas, de l’autre côté ? Je me le demande souvent.',
  },
  {
    id: 'observer-09',
    type: 'false',
    text: 'Cette fois, tout est simple. Fais ce qu’on te demande, et rien ne changera.',
  },
  {
    id: 'observer-10',
    type: 'false',
    text: 'Ne touche à rien. Ce que tu trouveras n’a aucune importance, je te le promets.',
  },
  {
    id: 'observer-11',
    type: 'personal',
    text: 'Je crois que tu es déjà venu ici. Je ne sais plus quand.',
  },
  {
    id: 'observer-12',
    type: 'personal',
    text: 'On m’a dit que tu sautes pour quelqu’un. Je ne sais pas si on m’a dit vrai.',
  },
];

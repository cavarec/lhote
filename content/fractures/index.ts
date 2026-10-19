import type { Fracture } from './types';

// Fractures : deux par prémisse (01-02 : premise-01, 03-04 : premise-02, 05-06 : premise-03, 07-08 : premise-04, 09-10 : premise-05).
// Les deux fractures d'une prémisse tournent autour du même objet (le corps, la chasse, le récit),
// pour que les résolutions restent justes quelle que soit la fracture tirée. Chaque fracture a deux
// lectures, « empêcher » ou « laisser faire », et le jeu ne dit jamais laquelle est juste.
export const fractures: readonly Fracture[] = [
  {
    id: 'fracture-01',
    title: 'Ce n’est pas l’enfant que la mer devait rendre',
    interpretations: [
      'L’enfant vit encore quelque part. Il faut le dire à la mère et reprendre les recherches.',
      'L’enfant est mort lui aussi. Il faut laisser la mère pleurer ce corps, puisque la mer ne rendra pas l’autre.',
    ],
  },
  {
    id: 'fracture-02',
    title: 'Quelqu’un a reconnu le corps',
    interpretations: [
      'Quelqu’un au village sait depuis des années à qui appartient ce corps, et il s’est tu. Il faut le faire parler.',
      'Quelqu’un veut qu’on croie à l’enfant noyé, pour que cesse la recherche. Il faut laisser la vérité venir seule.',
    ],
  },
  {
    id: 'fracture-03',
    title: 'La chasse est vide',
    interpretations: [
      'Le recteur a vidé la chasse lui-même, parce qu’il ne croit plus à ce qu’elle contenait. Il faut l’avouer à tous.',
      'Quelqu’un a vidé la chasse dans la nuit, pour que la procession tourne mal. Il faut laisser la foi faire son œuvre.',
    ],
  },
  {
    id: 'fracture-04',
    title: 'Une lettre dormait dans la chasse',
    interpretations: [
      'Un fidèle y a laissé un aveu écrit, et le recteur n’ose pas le rendre. Il faut le lire devant tous.',
      'Le recteur a écrit cette lettre lui-même, pour se forcer à dire la vérité. Il faut la garder, et se taire encore.',
    ],
  },
  {
    id: 'fracture-05',
    title: 'Le conteur lit dans un carnet qui n’est pas le sien',
    interpretations: [
      'Le garde a donné sa vie au conteur, mot après mot, il y a longtemps. Il faut le laisser dire la suite.',
      'Quelqu’un a écrit la vie du garde pour le piéger devant tous. Il faut arrêter l’histoire avant sa fin.',
    ],
  },
  {
    id: 'fracture-06',
    title: 'L’histoire s’arrête avant sa fin',
    interpretations: [
      'Le conteur connaît la fin et attend que le garde la dise lui-même. Il faut la dire.',
      'Le conteur ne connaît pas la fin et attend que le garde la lui donne. Il faut lui laisser croire qu’elle n’existe pas.',
    ],
  },
  {
    id: 'fracture-07',
    title: 'Un couvert de trop est dressé au bout de la table',
    interpretations: [
      'Un mort venu trop tôt réclame sa place. Il faut le servir et dire son nom.',
      'Un vivant joue aux morts pour entrer dans la maison. Il faut fermer la porte et le démasquer.',
    ],
  },
  {
    id: 'fracture-08',
    title: 'La lanterne de navet brûle avant l’heure',
    interpretations: [
      'Quelqu’un attend au carrefour qu’on vienne le chercher. Il faut y aller avec de la lumière.',
      'Quelqu’un laisse ce feu pour attirer la maison hors de ses murs. Il faut laisser la lanterne s’éteindre.',
    ],
  },
  {
    id: 'fracture-09',
    title: 'Le grand bœuf a parlé avant minuit',
    interpretations: [
      'La bête a donné un nom trop tôt, et la mort est déjà en route. Il faut le dire à la maison, pour qu’elle se prépare.',
      'La bête n’a rien dit : quelqu’un lui a prêté sa voix pour semer la peur. Il faut se taire.',
    ],
  },
  {
    id: 'fracture-10',
    title: 'La cloche de minuit n’a pas sonné',
    interpretations: [
      'Les morts retiennent la cloche, et la nuit ne finira pas. Il faut la sonner soi-même.',
      'Le sonneur se tait parce qu’il a peur de ce qu’elle annonce. Il faut le laisser se taire.',
    ],
  },
];

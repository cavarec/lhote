import type { Fracture } from './types';

// Fractures : deux par prémisse (01-02 : premise-01, 03-04 : premise-02, 05-06 : premise-03, 07-08 : premise-04, 09-10 : premise-05).
// Les deux fractures d'une prémisse tournent autour du même objet (le corps, la chasse, le récit),
// pour que les résolutions restent justes quelle que soit la fracture tirée. Chaque fracture a deux
// lectures, « empêcher » ou « laisser faire », et le jeu ne dit jamais laquelle est juste.
export const fractures: readonly Fracture[] = [
  {
    id: 'fracture-01',
    title: 'Le corps n’est pas celui du petit',
    interpretations: [
      'Le petit vit encore : dis-le à la mère et reprends les recherches.',
      'Le petit est mort aussi : laisse la mère pleurer, la mer ne le rendra pas.',
    ],
  },
  {
    id: 'fracture-02',
    title: 'Les hommes veulent l’enterrer sous le nom du petit',
    interpretations: [
      'Quelqu’un sait depuis vingt ans à qui est ce corps et s’est tu : fais-le parler.',
      'Quelqu’un veut qu’on croie au petit noyé pour que cessent les recherches : laisse la vérité venir seule.',
    ],
  },
  {
    id: 'fracture-03',
    title: 'La chasse ne contient plus de relique',
    interpretations: [
      'Le saint n’est plus là depuis la crue. Il faut le dire à tous.',
      'Le saint est parti pour une autre raison. Il faut laisser la foule croire.',
    ],
  },
  {
    id: 'fracture-04',
    title: 'Un aveu dort dans la chasse',
    interpretations: [
      'Cet aveu est celui du recteur. Il faut le lire devant tous.',
      'Cet aveu est trop lourd pour la foule. Il faut le garder caché.',
    ],
  },
  {
    id: 'fracture-05',
    title: 'Le conteur lit dans un carnet écrit de ta main',
    interpretations: [
      'Tu lui as confié ton histoire toi-même : laisse-le la dire.',
      'Quelqu’un a pris ton histoire pour te piéger devant tous : fais-la taire avant la fin.',
    ],
  },
  {
    id: 'fracture-06',
    title: 'L’histoire s’arrête juste avant la fin',
    interpretations: [
      'Le conteur attend que tu dises la fin : dis-la.',
      'Le conteur ne connaît pas la fin : ne la lui donne pas.',
    ],
  },
  {
    id: 'fracture-07',
    title: 'Un treizième couvert est dressé, et son bol est vide',
    interpretations: [
      'L’enfant sans nom est venu avant l’heure. Il faut le servir et dire son nom.',
      'Quelqu’un de la maison a dressé ce couvert pour faire parler les morts. Il faut tout débarrasser et se taire.',
    ],
  },
  {
    id: 'fracture-08',
    title: 'La lanterne de navet brûle avant minuit',
    interpretations: [
      'L’enfant attend au carrefour qu’on vienne le chercher. Il faut y aller avec de la lumière.',
      'Quelqu’un a allumé ce feu pour faire sortir la maison de ses murs. Il faut le laisser s’éteindre.',
    ],
  },
  {
    id: 'fracture-09',
    title: 'Le grand bœuf a parlé avant minuit',
    interpretations: [
      'La bête a donné un nom trop tôt, la mort est déjà en route. Il faut l’écouter jusqu’au bout.',
      'Quelqu’un a prêté sa voix à la bête pour faire peur. Il faut rester près d’elle et lui répondre.',
    ],
  },
  {
    id: 'fracture-10',
    title: 'La cloche de minuit n’a pas sonné',
    interpretations: [
      'Les morts retiennent la cloche. Rien ne finira avant qu’on réponde aux bêtes.',
      'Le sonneur se tait, il a peur de ce que la bête annonce. Il faut l’affronter à sa place.',
    ],
  },
  {
    id: 'fracture-11',
    title: 'Le drap du bassin n’a été apporté par personne',
    interpretations: [
      'Les lavandières lavent le linceul d’un mort du bourg et il leur faut tes bras pour l’essorer. Aide-les, à contre-main.',
      'Ce drap est un appât pour t’attirer dans leur nuit. N’y touche pas comme elles.',
    ],
  },
  {
    id: 'fracture-12',
    title: 'Les battoirs frappent sans mains',
    interpretations: [
      'Les lavandières attendent une réponse et ne partiront pas sans elle. Réponds-leur, à voix basse.',
      'Ce bruit prévient la maison du bas qu’un deuil approche. Fais-le cesser avant qu’on l’entende.',
    ],
  },
  {
    id: 'fracture-13',
    title: 'Les cloches d’Ys sonnent à la grande marée',
    interpretations: [
      'La ville demande qu’on lui ouvre sa porte avant l’aube. Il faut répondre au troisième coup.',
      'La porte est restée entrouverte, et les cloches appellent qui veut. Il faut la refermer avec du sel.',
    ],
  },
  {
    id: 'fracture-14',
    title: 'Personne n’est descendu refermer la porte',
    interpretations: [
      'Quelqu’un a oublié son devoir. Il faut le reprendre à sa place.',
      'La porte ne veut plus se fermer. Il faut la laisser dormir ouverte, et partir.',
    ],
  },
];

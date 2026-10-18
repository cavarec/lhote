import type { Premise } from './types';

// Prémisse 2 : le veilleur du fanal. Une ville portuaire en reconstruction, une nuit qui a mal
// tourné. Conventions : voir content/README.md. Le PNJ qui parle occupe l'emplacement « 1 ».

const EPOCH = 'une ville portuaire en reconstruction';

export const premise02: Premise = {
  id: 'premise-02',
  title: 'Le fanal',
  epoch: EPOCH,

  // Beat 1 : le son et le sel d'abord.
  wakeup: [
    'Quelque chose bat. Pas ton cœur : plus lent, plus large. Un coup, puis le vide, puis un autre coup.',
    'Tu sens le sel avant tout le reste. Il colle à tes lèvres, à tes cils, au dos de ta langue.',
    'Ton corps est assis, la tête contre un mur froid. Le mur vibre à chaque coup. Une odeur de métal chaud, de graisse, de poisson ancien.',
    'Tu serres les doigts. Ils sont raides, pris dans quelque chose de sec. Du sel, encore, et un fil de laine.',
    'Une cloche sonne au loin, deux fois. Dessous, l’eau frotte contre une coque, ou contre la pierre.',
    'Tu ne sais pas depuis quand tu dors ici. Tu ne sais pas depuis quand tu es ce corps.',
    'Quelqu’un siffle trois notes, en bas, et attend que tu répondes.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation.
  orientation: [
    {
      kind: 'material',
      text: 'Une pièce ronde, vitrée sur tout le tour. Au centre, une grande lampe éteinte, plus haute que toi. Son verre est taillé en anneaux.',
    },
    {
      kind: 'material',
      text: 'Dehors, le port. Des grues à moitié montées, des échafaudages sur les façades, des cales vides. Un seul navire est amarré.',
    },
    {
      kind: 'bodily',
      text: 'Tu portes des gants troués. Sous la laine, les paumes sont dures, avec une cloque ouverte au pouce.',
    },
    {
      kind: 'bodily',
      text: 'Ton dos est raide d’avoir dormi assis. Tes yeux brûlent. Tu as veillé toute la nuit, ou tu devais le faire.',
    },
    {
      kind: 'social',
      text: 'Sur le pupitre, un registre ouvert. Chaque ligne porte un nom de navire, une heure, et ton paraphe. La dernière ligne est vide.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 1 » monte l'escalier.
  openingDialogue: {
    npcId: '1',
    lines: [
      {
        speaker: 'narration',
        text: 'L’escalier résonne. Quelqu’un monte vite et s’arrête sur le seuil, à bout de souffle.',
      },
      {
        speaker: 'npc',
        text: 'Le chef du quai veut le registre de la nuit. Tout de suite.',
      },
      {
        speaker: 'npc',
        text: 'Il dit que la nuit a mal tourné. Il veut savoir ce que tu as vu. Tu étais de veille.',
      },
      {
        speaker: 'narration',
        text: 'La personne attend. Elle regarde le registre, puis ton visage.',
      },
    ],
    choices: [
      {
        id: 'questionner',
        kind: 'informative',
        text: '« Que veut-il savoir, au juste ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Ce qui est sorti du port. Ce qui s’est éteint. Qui était là. Tout ce que le registre doit dire.',
          },
          {
            speaker: 'narration',
            text: 'Elle énumère comme on récite une leçon apprise en chemin.',
          },
        ],
      },
      {
        id: 'gagner-du-temps',
        kind: 'neutral',
        text: '« Donne-moi un moment. Je descends. »',
        reply: [
          { speaker: 'npc', text: 'Dépêche-toi. Il n’est pas d’humeur.' },
          {
            speaker: 'narration',
            text: 'Ses pas redescendent, deux marches à la fois. Le sifflement reprend, plus bas.',
          },
        ],
      },
      {
        id: 'avouer-le-trou',
        kind: 'risky',
        text: '« Je ne me souviens pas de la nuit. »',
        reply: [
          { speaker: 'npc', text: 'Tu ne te souviens pas ?' },
          {
            speaker: 'narration',
            text: 'Elle recule d’un pas. Dans ses yeux, quelque chose se referme, et ce n’est pas de la pitié.',
          },
        ],
      },
    ],
  },

  // Beat 4 : enquête.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le tiroir du pupitre, un linge roulé. Il est lourd. Tu le déroules sur tes genoux.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tu touches la grande lampe. Le verre est froid, mais la base est encore tiède. Elle a brûlé longtemps, puis elle s’est éteinte.',
      revealsTruth: 'fanal-eteint',
    },
    {
      kind: 'material',
      text: 'Au sol, des traces de bottes pleines de boue. Elles montent l’escalier et ne redescendent pas du même côté.',
    },
    {
      kind: 'social',
      text: 'Dans le registre, l’avant-dernière ligne a été grattée. L’encre en dessous est celle d’une autre main.',
      revealsTruth: 'ligne-grattee',
    },
    {
      kind: 'social',
      text: 'Sur le quai, un homme t’observe depuis un moment. Quand tu le regardes, il fait semblant de réparer un filet.',
    },
    {
      kind: 'bodily',
      text: 'Ton bras gauche porte la marque d’une corde, assez serrée pour laisser un sillon rouge.',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche garde un goût amer sous le sel. Tu as bu quelque chose que tu ne te rappelles pas.',
    },
  ],

  // Beat 5 : la fracture.
  fractures: ['fracture-03', 'fracture-04'],

  // Beat 6 : résolution.
  resolutions: [
    {
      id: 'tout-dire-au-chef',
      choiceText: 'Tout dire au chef du quai, même ce que tu ignores.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu poses le registre devant le chef et tu dis ce que tu sais. Puis ce que tu ne sais pas.',
        'Il se tait longtemps. Il appelle deux hommes, et ils vont fouiller le quai.',
        'Le fanal brillera encore ce soir. Il y aura quelqu’un d’autre pour le garder avec toi.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'nuit-racontee',
            summary: 'La nuit du port est écrite, avec ses trous.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celle-qui-est-montee',
            characterId: '1',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'gratter-la-ligne',
      choiceText: 'Gratter la ligne du registre et écrire une nuit tranquille.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu grattes l’encre, puis tu écris : rien à signaler.',
        'Ta main est sûre. Cela t’inquiète plus que le reste.',
        'Le chef lit, hoche la tête et ne pose aucune question. C’est ce qui sonne faux.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'nuit-effacee',
            description: 'Une nuit effacée du registre.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'rallumer-et-te-taire',
      choiceText: 'Rallumer le fanal et ne rien dire à personne.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu frottes l’allumette. La flamme prend, puis la grande lampe, anneau après anneau.',
        'La lumière balaie le port. Un instant, elle éclaire un visage au bout de la jetée.',
        'La personne qui t’a réveillé le voit aussi. Elle ne dira rien non plus.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'jetee-eclairee',
            label: 'La jetée, éclairée une nuit',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'suivre-lhomme-au-filet',
      choiceText: 'Descendre sur le quai et suivre l’homme au filet.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu descends. L’homme au filet s’éloigne sans courir, comme quelqu’un qui connaît ton pas.',
        'Il te conduit jusqu’à un hangar. La porte est ouverte. À l’intérieur, une odeur de sel et d’huile.',
        'Tu entres. Derrière toi, quelqu’un tire le verrou.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'hangar-du-quai',
            label: 'Un hangar du quai, ouvert de l’extérieur',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-du-hangar',
            artifactId: 'leap',
            fromLeap: '',
            toLeap: null,
          },
        },
      ],
    },
    {
      id: 'avouer-ton-trou',
      choiceText: 'Dire au chef que tu ne te souviens de rien, pas même de toi.',
      outcome: 'exposed',
      fractureRepaired: false,
      resultText: [
        'Tu dis que tu ne te souviens de rien. Pas même de ton nom.',
        'Le chef te regarde comme on regarde un outil cassé.',
        'On te retire les clés du fanal. Quelqu’un d’autre montera ce soir.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'plonger',
      choiceText: 'Descendre à l’eau chercher ce qui est tombé du quai.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu plonges. L’eau est plus froide que le sel ne le laissait croire.',
        'Sous la surface, une forme claire, et une chaîne qui s’enroule à ta cheville.',
        'La dernière lumière que tu vois est celle du jour, vue d’en dessous.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'corps-sous-le-quai',
            description: 'Un corps pris par la chaîne, sous le quai.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

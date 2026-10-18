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
    'Une odeur de pain brûlé monte de l’escalier, très faible, et se perd. Quelqu’un a oublié un four, ou allumé un feu qu’il n’aurait pas dû.',
    'Tu cherches ton nom. À la place, tu trouves un chiffre, trois fois répété, comme une consigne. Tu ne sais pas ce qu’il compte.',
    'Tes genoux craquent quand tu les plies. Ce corps a passé des centaines de nuits ainsi, le dos au mur, à guetter quelque chose.',
    'Le sifflement reprend, plus près. Trois notes, toujours les mêmes. Elles ont le ton d’un appel que l’on a déjà lancé plusieurs fois.',
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
    {
      kind: 'material',
      text: 'Près de la lampe, une boîte d’allumettes à moitié vide et un bidon de pétrole. Le bouchon du bidon est posé à côté, à l’envers.',
    },
    {
      kind: 'bodily',
      text: 'Tes oreilles bourdonnent, comme après une cloche trop proche. Tu as entendu quelque chose de fort, cette nuit. Tu ne sais plus quoi.',
    },
    {
      kind: 'social',
      text: 'Au mur, un tableau des tours de veille. Ton nom y figure souvent, d’une écriture différente à chaque ligne. Hier soir, la case est barrée.',
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
        speaker: 'narration',
        text: 'Elle est jeune, mouillée jusqu’aux genoux. Elle tient son bonnet à deux mains, comme on tient une excuse.',
      },
      {
        speaker: 'npc',
        text: 'Il dit que la nuit a mal tourné. Il veut savoir ce que tu as vu. Tu étais de veille.',
      },
      {
        speaker: 'npc',
        text: 'J’ai sifflé trois fois en bas. Tu n’as pas répondu. J’ai cru que tu étais tombé. Ou pire.',
      },
      {
        speaker: 'narration',
        text: 'Elle jette un coup d’œil vers la grande lampe, puis vers toi, très vite, comme si elle avait vu ce qu’elle ne devait pas voir.',
      },
      {
        speaker: 'npc',
        text: 'Il est en bas, sur le quai. Il n’a pas crié. C’est ça qui m’inquiète. Il ne crie jamais quand c’est grave.',
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
          {
            speaker: 'npc',
            text: 'Il a dit aussi de ne pas te laisser seul. Mais je n’ai pas compris pourquoi.',
          },
          {
            speaker: 'narration',
            text: 'Elle se mord la lèvre. Elle en a dit un peu trop, et elle le sait.',
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
          {
            speaker: 'narration',
            text: 'Tu restes seul avec la lampe. Elle te renvoie ton reflet en dix morceaux, tous un peu différents.',
          },
          {
            speaker: 'narration',
            text: 'Le temps que tu as gagné est court. Tu le sens fondre, comme la cire d’une bougie sous ta paume.',
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
          {
            speaker: 'npc',
            text: 'Ne dis pas ça en bas. Ne le dis à personne. Promets-le-moi.',
          },
          {
            speaker: 'narration',
            text: 'Sa voix tremble. Elle a peur pour toi, ou peur de toi. À cette heure, la différence est mince.',
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
    {
      kind: 'material',
      text: 'Sur le rebord de la vitre, trois mégots écrasés, de trois marques différentes. Tu ne fumes pas. Ce corps ne fume pas non plus.',
    },
    {
      kind: 'social',
      text: 'Dans la poche du tablier, un papier plié en quatre. Un nom de navire, une heure, et un mot : « Tais-toi. » Ce n’est pas ton écriture.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains cherchent un geste d’elles-mêmes. Elles se posent sur la molette de la lampe et la font tourner d’un cran. Elles savaient.',
    },
  ],

  // Beat 5 : la fracture.
  fractures: ['fracture-03', 'fracture-04'],

  // Beat 6 : résolution.
  resolutions: [
    {
      id: 'tout-dire-au-chef',
      requiresAny: ['fanal-eteint', 'ligne-grattee'],
      choiceText: 'Tout dire au chef du quai, même ce que tu ignores.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu poses le registre devant le chef et tu dis ce que tu sais. Puis ce que tu ne sais pas.',
        'Il se tait longtemps. Il appelle deux hommes, et ils vont fouiller le quai.',
        'Le fanal brillera encore ce soir. Il y aura quelqu’un d’autre pour le garder avec toi.',
        'Dans l’escalier, la jeune voix te tend ton bonnet oublié. Elle sourit un peu. Elle ne siffle plus.',
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
      requiresAny: ['ligne-grattee'],
      choiceText: 'Gratter la ligne du registre et écrire une nuit tranquille.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu grattes l’encre, puis tu écris : rien à signaler.',
        'Ta main est sûre. Cela t’inquiète plus que le reste.',
        'Le chef lit, hoche la tête et ne pose aucune question. C’est ce qui sonne faux.',
        'Le soir, sur le registre, la page est propre. Tu la regardes longtemps. Elle a l’air de quelqu’un qui retient son souffle.',
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
      requiresAny: ['fanal-eteint'],
      choiceText: 'Rallumer le fanal et ne rien dire à personne.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu frottes l’allumette. La flamme prend, puis la grande lampe, anneau après anneau.',
        'La lumière balaie le port. Un instant, elle éclaire un visage au bout de la jetée.',
        'La personne qui t’a réveillé le voit aussi. Elle ne dira rien non plus.',
        'Le visage lève la main, au ralenti, comme pour saluer. Puis la lumière passe, et la jetée est vide.',
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
        'Dans le noir, tu entends respirer. Ils sont plusieurs. L’un d’eux, très bas, prononce ton nom.',
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
        'Tu descends l’escalier pour la dernière fois. La jeune voix te regarde passer et ne siffle pas.',
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
        'Là-haut, le fanal reste éteint. Personne ne montera pour l’allumer avant l’aube.',
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

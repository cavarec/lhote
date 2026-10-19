import type { Premise } from './types';

// Prémisse 3 : une veillée dans une forêt, juste après la guerre. Un conteur raconte une histoire
// qui ressemble trop à celle de l'hôte. Inspirée de : la fontaine qui fait venir l'orage, les
// histoires qu'on n'écrit pas. Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 ») : une voisine ou un voisin de veillée. Le conteur,
//   lui, est un élément de décor : il ne ment jamais et ne dit jamais tout.
// - Miroir : pas de reflet (l'eau de la fontaine ne rend rien).
// - Corps hérité : la surdité d'une oreille. L'hôte lit sur les lèvres et ne capte que des
//   morceaux. La condition est la clé : ses lèvres savent la suite avant le conteur.

const EPOCH = 'une forêt, juste après la guerre';

export const premise03: Premise = {
  id: 'premise-03',
  title: 'Une histoire qui te ressemble',
  epoch: EPOCH,

  // Beat 1 : la fumée, la mousse, une voix qu'on n'entend qu'en morceaux. Aucune information.
  wakeup: [
    'Une odeur de bois vert qui brûle, de terre mouillée, de champignons écrasés. Dessous, plus âcre, un relent de fumée froide.',
    'Ton dos est chaud. Ton visage est froid. Le feu est devant toi, ou à côté, ou dans un souvenir. Tu ne sais pas lequel.',
    'Une voix parle, quelque part. Elle monte et descend, très lente. Tu l’attrapes par morceaux : un mot entier, puis un trou.',
    'D’un côté, rien qu’un sifflement. Une cloche cassée, au fond de ta tête, qui sonne toujours la même note.',
    'De l’autre côté, la forêt respire. Des branches, un hibou, quelque chose de grand qui bouge et se tait.',
    'Tes lèvres sont sèches. Elles remuent un peu, au rythme de la voix. Tu les arrêtes. Elles recommencent.',
    'Tu as l’impression d’avoir entendu cette histoire. Pas ce soir. Avant. Dans une autre vie, dans un autre corps.',
    'Un craquement. Une braise éclate et lance une étincelle. Tu la sens passer sur ta joue.',
    'La voix s’arrête. Dans le silence, quelqu’un respire trop fort. Tu sens des regards se poser sur toi, un à un.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, la surdité, l'absence de reflet.
  orientation: [
    {
      kind: 'material',
      text: 'Une clairière, un feu large, un cercle de visages éclairés par en dessous. Autour, des troncs énormes qui dépassent la lumière et montent dans la nuit.',
    },
    {
      kind: 'material',
      text: 'À dix pas, une fontaine de pierre bordée de mousse. Une écuelle de fer attend sur la margelle, près d’une dalle noircie par les gestes. L’eau est noire, très ancienne.',
    },
    {
      kind: 'material',
      text: 'Au-delà du feu, entre les troncs, une lueur basse et verte. Personne ne la regarde. Tout le monde sait comment ne pas la regarder.',
    },
    {
      kind: 'material',
      text: 'Sur une souche, la sacoche de cuir du conteur, ouverte. Dedans, le dos d’un carnet à la couverture usée. Il le garde à portée de main.',
    },
    {
      kind: 'bodily',
      text: 'Ton oreille gauche ne sert à rien. Tu tournes la tête pour prendre la voix dans la droite, et tu lis les lèvres de celui qui parle.',
    },
    {
      kind: 'bodily',
      text: 'Tu te lèves pour boire à la fontaine. Tu te penches. L’eau ne te rend rien : ni visage, ni lune, ni même la flamme du feu. Tu recules.',
    },
    {
      kind: 'bodily',
      text: 'Tes épaules sont larges, ton dos raide, tes mains durcies par la hache. Un corps qui coupe du bois depuis l’enfance, et qui a vu pire.',
    },
    {
      kind: 'social',
      text: 'Au ceinturon, un sifflet de garde et un petit registre de tournées. Les gens autour de toi te saluent d’un signe, comme on salue celui qui veille.',
    },
    {
      kind: 'social',
      text: 'Tous les visages sont tournés vers le conteur. Quelques-uns glissent vers toi, un instant, puis retournent au feu.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » s'assied à côté. Le choix risqué avoue trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un se glisse à côté de toi sur la souche. Son épaule touche la tienne. Il reste de la sciure dans ses cheveux.',
      },
      {
        speaker: 'npc',
        text: 'Tu l’as entendue, celle-là ? Il dit que c’est l’histoire d’un homme qui se réveille dans la peau d’un autre.',
      },
      {
        speaker: 'narration',
        text: 'Tu lis ses lèvres plus que tu n’entends. Les mots arrivent un peu après le mouvement, comme un tonnerre après l’éclair.',
      },
      {
        speaker: 'npc',
        text: 'Ça n’a pas de sens, bien sûr. Mais il raconte bien. Il t’a regardé trois fois depuis le début.',
      },
      {
        speaker: 'npc',
        text: 'Les gens ont remarqué. Ils se demandent où il veut en venir. Moi aussi.',
      },
      {
        speaker: 'narration',
        text: 'Le conteur a repris. Sa voix est tranquille. Il ne regarde personne, et pourtant il te regarde.',
      },
      {
        speaker: 'npc',
        text: 'Après la guerre, ils racontent des choses qui ressemblent à ce qu’on a vu. C’est peut-être ça.',
      },
    ],
    choices: [
      {
        id: 'ecouter',
        kind: 'neutral',
        text: '« Chut. Je veux entendre la suite. »',
        reply: [
          { speaker: 'npc', text: 'D’accord. Écoute bien. Tu en auras besoin.' },
          {
            speaker: 'narration',
            text: 'Tu tournes ton oreille droite vers le feu. La voix du conteur entre, claire, lente, sans trou.',
          },
          {
            speaker: 'narration',
            text: 'Il parle d’un homme qui ne sait pas son nom. Il parle d’une forêt, d’une fontaine, d’une dette.',
          },
        ],
      },
      {
        id: 'demander-l-histoire',
        kind: 'informative',
        text: '« Qu’a-t-il raconté jusqu’ici ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Un homme se réveille près d’une fontaine, dans une forêt. Il porte l’uniforme d’un autre. Il ne sait plus qui il est.',
          },
          {
            speaker: 'npc',
            text: 'Une femme l’attend, sous une aubépine, et elle ne le laisse pas repartir. Il lui doit quelque chose, ou le contraire. On ne sait pas encore.',
          },
          {
            speaker: 'narration',
            text: 'La personne baisse la voix. Sa main effleure ton coude, comme pour te réveiller.',
          },
        ],
      },
      {
        id: 'dire-que-cest-la-tienne',
        kind: 'risky',
        text: '« Cette histoire, c’est la mienne. »',
        reply: [
          { speaker: 'npc', text: 'Quoi ? Tu veux dire que tu lui as raconté ?' },
          {
            speaker: 'narration',
            text: 'La personne se redresse. Autour de toi, des têtes se tournent. Une femme se signe.',
          },
          {
            speaker: 'npc',
            text: 'Tais-toi. Ne dis plus rien. Pas devant eux. Laisse-le finir.',
          },
        ],
      },
      {
        id: 'regarder-le-conteur',
        kind: 'neutral',
        text: 'Regarder le conteur sans rien dire.',
        reply: [
          {
            speaker: 'narration',
            text: 'Il est assis au bord du feu, le visage dans l’ombre de son chapeau. Ses mains ne bougent pas. Il n’a besoin de rien.',
          },
          {
            speaker: 'narration',
            text: 'Quand tes yeux croisent les siens, il sourit à peine. Il ne dit rien. Il continue, comme si tu avais répondu.',
          },
          {
            speaker: 'npc',
            text: 'Tu vois ? Il fait ça avec tout le monde. Ça ne veut rien dire.',
          },
        ],
      },
    ],

    // Seconde passe : le conteur approche de la fin, et il le dit à voix haute.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Le conteur lève la main. Le feu baisse, comme à un signe. Dans la clairière, on cesse de respirer.',
        },
        {
          speaker: 'npc',
          text: 'Il arrive à la fin. Tu vois ? Les gens se rapprochent. Il ne finit jamais avant la dernière braise.',
        },
        {
          speaker: 'narration',
          text: 'Tu lis sur ses lèvres, plus que tu n’entends : « Elle a une femme sous l’aubépine, et c’est toi qui dois lui parler. »',
        },
        {
          speaker: 'npc',
          text: 'Il a dit ton nom, là. Ou presque. Tu l’as vu, toi aussi ? Dis-moi que tu l’as vu.',
        },
        {
          speaker: 'narration',
          text: 'Sous les arbres, une lueur verte, très basse, s’approche du cercle. Personne ne la regarde. Tu es le seul à qui elle plaît.',
        },
      ],
      choices: [
        {
          id: 'laisser-venir',
          kind: 'neutral',
          text: '« Laisse-le finir. Je saurai bien ce que je dois faire. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Je ne sais pas si tu le sauras. Mais je reste.',
            },
            {
              speaker: 'narration',
              text: 'La personne se rapproche. Son épaule contre la tienne est la seule chose chaude de la nuit.',
            },
          ],
        },
        {
          id: 'demander-laubepine',
          kind: 'informative',
          text: '« Quelle femme ? Sous quelle aubépine ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Celle de la lisière, là-bas. Les anciens disent qu’une femme y dort depuis la guerre, et qu’elle attend qu’on lui raconte la fin.',
            },
            {
              speaker: 'npc',
              text: 'Personne n’y va. Le conteur dit qu’il y va, lui, chaque soir. Je crois qu’il y est déjà allé ce soir.',
            },
            {
              speaker: 'narration',
              text: 'La personne montre l’ombre d’un arbre tordu, au-delà du feu.',
            },
          ],
        },
        {
          id: 'se-lever',
          kind: 'risky',
          text: 'Te lever et marcher vers le conteur.',
          reply: [
            {
              speaker: 'npc',
              text: 'Qu’est-ce que tu fais ? Rassieds-toi ! Tout le monde te regarde !',
            },
            {
              speaker: 'narration',
              text: 'C’est vrai. Cent visages se tournent vers toi, éclairés de bas en haut. Aucun n’est surpris.',
            },
          ],
        },
        {
          id: 'surveiller-la-lueur',
          kind: 'informative',
          text: '« Tu vois cette lumière verte, près des arbres ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Quelle lumière ? Je ne vois que le feu.',
            },
            {
              speaker: 'narration',
              text: 'La personne a répondu trop vite. Elle regarde dans la direction que tu montres, puis elle détourne les yeux, pâle.',
            },
            {
              speaker: 'npc',
              text: 'Ne la regarde pas. Ne la suis pas. Ça, au moins, ça se sait.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Ce qu'on entend à moitié, et ce que les lèvres savent déjà.
  investigation: [
    {
      kind: 'material',
      text: 'Au pied de la souche, enveloppé dans un mouchoir, un petit objet qui ne devrait pas être là. Il est lourd et froid. Ta main ne tremble pas.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tes lèvres bougent avant celles du conteur. Elles disent les mots avant lui. Tu connais cette histoire par cœur, ou ton corps la connaît.',
      revealsTruth: 'levres-qui-savent',
    },
    {
      kind: 'material',
      text: 'Le carnet du conteur est sorti de la sacoche. Ses pages sont couvertes d’une écriture fine, penchée, qui ressemble à celle de ton registre, trait pour trait.',
    },
    {
      kind: 'material',
      text: 'La dalle noire de la margelle est mouillée. On dit que verser l’écuelle dessus fait venir l’orage. Quelqu’un l’a fait cette nuit, ou veut le faire.',
    },
    {
      kind: 'material',
      text: 'À côté du feu, un cercle de pierres plates. Sur l’une d’elles, une écuelle d’eau, intacte. Personne n’a bu. Personne n’a osé.',
    },
    {
      kind: 'social',
      text: 'Un enfant, couché contre sa mère, te regarde sans cligner. Il dit tout bas : « C’est ton histoire. Il l’a dit tout à l’heure, quand tu dormais. »',
      revealsTruth: 'carnet-a-ton-nom',
    },
    {
      kind: 'social',
      text: 'Un vieux, de l’autre côté du feu, crache dans les braises. Il murmure à son voisin des mots que tu ne perçois pas, et qui te concernent.',
    },
    {
      kind: 'social',
      text: 'La femme assise près de la fontaine se lève, remplit l’écuelle et la pose devant le conteur. Il boit sans cesser de parler.',
    },
    {
      kind: 'bodily',
      text: 'Ta main gauche serre quelque chose que tu ne sens pas. Tu l’ouvres. Une feuille de chêne, pliée en quatre, avec un mot dessus. Un seul.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat plus vite à chaque phrase. Ton corps connaît le moment où le conteur va se taire, et il redoute ce silence.',
    },
    {
      kind: 'social',
      text: 'Une femme, derrière toi, souffle à sa voisine : « Il a déjà raconté ça avant la guerre. Avec un autre visage, mais la même fin. »',
    },
    {
      kind: 'bodily',
      text: 'Ton oreille sourde bourdonne, d’un bruit d’abeille très précis. Il suit le rythme du conteur, une demi-phrase avant lui.',
    },
    {
      kind: 'material',
      text: 'Dans la cendre, au bord du feu, un bouton de manteau militaire et un bout de ruban noirci. Quelqu’un a brûlé un vêtement ici, il n’y a pas longtemps.',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['levres-qui-savent', 'carnet-a-ton-nom'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le conteur s’arrête au milieu d’une phrase. Pour la première fois de la nuit, il te regarde en face et il ne sourit pas.',
        },
        {
          speaker: 'narration',
          text: 'Il ouvre le carnet. Il le tourne vers toi. Tu lis ton nom, en haut de la page, d’une écriture qui est la tienne.',
        },
        {
          speaker: 'npc',
          text: 'Je n’ai jamais su finir celle-ci. Il me faut quelqu’un qui connaît la suite. Tu la connais depuis le début.',
        },
        {
          speaker: 'narration',
          text: 'Les braises claquent. La lueur verte est tout près maintenant, au bord du cercle. Toute la clairière attend que tu parles.',
        },
        {
          speaker: 'narration',
          text: 'Tu sens la fin de l’histoire dans ta bouche, comme un goût. Si tu la dis, tu ne pourras pas la reprendre.',
        },
      ],
    },
    {
      requires: ['levres-qui-savent'],
      lines: [
        {
          speaker: 'narration',
          text: 'Tes lèvres bougent encore. Elles disent la suite avant le conteur, toujours juste, jamais en retard.',
        },
        {
          speaker: 'narration',
          text: 'Alors il s’arrête, et le silence est si net que tu entends, avec l’oreille qui n’entend pas, une braise qui crépite.',
        },
        {
          speaker: 'narration',
          text: 'Il dit : « Continue. » Pas à voix haute. Tu l’as lu sur ses lèvres, et tu sais que personne d’autre ne l’a lu.',
        },
      ],
    },
    {
      requires: ['carnet-a-ton-nom'],
      lines: [
        {
          speaker: 'narration',
          text: 'L’enfant, contre sa mère, a rouvert les yeux. Il te fait signe de la main, tout petit. Il montre la sacoche du conteur.',
        },
        {
          speaker: 'narration',
          text: 'Le carnet en dépasse, sa tranche de cuir tournée vers toi. Dessus, en lettres pâles, tu lis ton nom.',
        },
        {
          speaker: 'narration',
          text: 'Le conteur n’a pas bougé. Mais sa main droite s’est refermée sur la sacoche, comme on tient un chien qui veut mordre.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Le feu s’abaisse d’un coup, comme si quelqu’un avait soufflé dessus. Dans l’ombre, les visages se tournent vers toi.',
        },
        {
          speaker: 'narration',
          text: 'Tu n’as pas assez regardé pour savoir pourquoi. Mais le conteur s’est arrêté, et il attend, et c’est ta réponse qu’il attend.',
        },
        {
          speaker: 'narration',
          text: 'Quelque part, au-delà des arbres, une femme chante sans paroles. Tu es le seul à l’entendre.',
        },
      ],
    },
  ],

  // « Laisser ta main faire » : ce que le corps hérité fait seul, fixé par la prémisse.
  handLetGo: {
    dialogue: {
      outcome: 'reveals',
      lines: [
        {
          speaker: 'narration',
          text: 'Tes lèvres bougent sans toi. Elles disent la phrase qui vient, une demi-seconde avant le conteur, et le conteur la dit après.',
        },
        {
          speaker: 'narration',
          text: 'La personne a vu. Elle s’est tournée, la bouche entrouverte. « Tu connais la suite ? Comment ? »',
        },
        {
          speaker: 'narration',
          text: 'Tu n’as pas de réponse. Le feu en a une, et il craque pour toi.',
        },
      ],
    },
    investigation: {
      outcome: 'betrays',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main part toute seule vers la sacoche du conteur. Elle cherche le carnet à tâtons, avec l’aisance d’un geste qu’elle a déjà fait.',
        },
        {
          speaker: 'narration',
          text: 'Le conteur ne bouge pas, mais sa voix se casse sur une syllabe. Autour du feu, des têtes se tournent.',
        },
        {
          speaker: 'narration',
          text: 'Ce n’est pas toi qui as osé. C’est le corps du garde, et il t’a fait passer pour lui.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-05', 'fracture-06'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'dire-la-fin-avec-lui',
      requiresAny: ['levres-qui-savent', 'carnet-a-ton-nom'],
      choiceText: 'Dire la fin de l’histoire à voix haute, en même temps que le conteur.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu te lèves. Tes lèvres disent les mots avant que ta tête les cherche. Le conteur les dit avec toi, à la même seconde.',
        'La clairière se fige. L’histoire se termine : l’homme se réveille, et il choisit de rester dans le corps qui n’est pas le sien.',
        'Personne n’applaudit. Un vieux jette une branche dans le feu. Le conteur ferme son carnet.',
        'Il te regarde et dit : « Maintenant, elle est à toi. » Tu ne sais pas ce que cela veut dire. Tu sais que c’est vrai.',
        'Au loin, sous l’aubépine, la lueur verte s’éteint. Quelqu’un, très bas, dit merci avec ta voix.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'l-histoire-a-sa-fin',
            summary:
              'Une histoire qui ressemblait à une vie a trouvé sa fin dans une forêt.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celui-qui-ecoutait',
            characterId: '0',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'interrompre-le-conteur',
      requiresAny: ['carnet-a-ton-nom'],
      choiceText: 'Interrompre le conteur et jeter de l’eau sur le feu.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends l’écuelle et tu la renverses sur les braises. Une vapeur blanche monte, puis le noir.',
        'Des cris. Des corps qui se heurtent. Une voix d’enfant qui répète ton nom, et ce n’est pas le bon.',
        'Quand quelqu’un rallume, le conteur n’est plus là. Sa souche est vide. Sur la mousse, un carnet ouvert, sans page écrite.',
        'Dans la nuit, l’histoire reprend, quelque part, sans toi. Tu entends la voix s’éloigner, et elle dit ton nom à chaque pas.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'histoire-sans-fin',
            description:
              'Une histoire interrompue, et que personne ne peut plus achever.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'prendre-le-carnet',
      requiresAny: ['levres-qui-savent'],
      choiceText: 'Prendre le carnet de contes dans la sacoche du conteur.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu glisses la main dans la sacoche. Le cuir est tiède. Tu ouvres le carnet à la lueur du feu.',
        'La première page est de ta main. La deuxième aussi. Toutes les pages sont de ta main, et tu ne te souviens d’aucune.',
        'Le conteur ne dit rien. Il achève sa phrase. Quand il se tait, il te regarde comme on regarde quelqu’un qu’on a attendu.',
        'À la dernière page, une ligne n’est pas encore écrite. Elle commence par ton nom, et le crayon est dans ta main.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'carnet-de-ta-main',
            summary: 'Un carnet de contes est écrit de la main de celui qui le lit.',
            leapId: '',
          },
        },
      ],
    },
    {
      id: 'quitter-la-clairiere',
      choiceText: 'Quitter la clairière et marcher vers l’intérieur de la forêt.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu te lèves sans bruit. Personne ne te retient. Le feu rapetisse dans ton dos.',
        'Les troncs se resserrent. Le sentier se divise, puis se divise encore. Tu choisis à chaque fois la même main.',
        'Plus loin, la voix du conteur te suit. Elle ne dit plus l’histoire. Elle dit où tu en es.',
        'Au matin, tu retrouves le feu. Il est éteint depuis longtemps, et personne ne se souvient que tu étais parti.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'sentier-de-la-fontaine',
            label: 'Un sentier qui s’enfonce dans la forêt, quitté pendant une veillée',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-du-sentier',
            artifactId: 'leap',
            fromLeap: '',
            toLeap: null,
          },
        },
      ],
    },
    {
      id: 'avouer-ton-trou',
      choiceText: 'Dire à voix haute que tu ne sais pas qui tu es.',
      outcome: 'exposed',
      fractureRepaired: false,
      resultText: [
        'Tu dis que tu ne sais pas qui tu es. Que ce corps n’est pas le tien.',
        'Le silence est total. Même le feu semble se retenir. Puis quelqu’un rit, tout bas, et ce rire se propage.',
        'On te prend le sifflet. On te reconduit au village, entre deux hommes, en parlant de la guerre.',
        'Derrière toi, dans la clairière, le conteur reprend où il s’était arrêté. Il ajoute une phrase. Elle parle d’un homme qu’on emmène.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'suivre-la-lueur',
      choiceText: 'Suivre dans les arbres la petite lumière qui t’appelle.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu l’as vue depuis longtemps, au bord de ton regard : une lueur verte, basse, qui bouge.',
        'Tu la suis. Elle t’attend à chaque tournant, jamais plus près, jamais plus loin. Le sol devient mou.',
        'Quand tu comprends que l’eau monte à tes genoux, tu ne vois plus le feu. Tu ne l’entends plus non plus.',
        'La lueur s’arrête devant toi, tout près. Elle a un visage, et ce n’est pas celui d’une inconnue.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'garde-perdu-dans-le-marais',
            description:
              'Un garde de la forêt disparu dans le marais, une nuit de veillée.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

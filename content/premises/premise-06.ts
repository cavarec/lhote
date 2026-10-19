import type { Premise } from './types';

// Prémisse 6 : le lavoir de minuit. Une nuit de lessive au bord d'une lande de Basse-Bretagne.
// L'hôte est celui qui est resté battre le linge trop tard : les lavandières de la nuit l'ont trouvé.
// Inspirée de : la légende bretonne des Kannerezed-noz, qui demandent à un passant de les aider à tordre
// un drap. Qui tord dans leur sens a les bras brisés ; qui tord à contre-sens les délivre.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : ton reflet dans l'eau noire du lavoir tient un drap que tu n'as pas dans les mains.
// - Corps hérité : tes mains restent sèches dans l'eau, et ton poignet tourne toujours du même côté.

const EPOCH =
  'un lavoir de lande en Basse-Bretagne, une nuit de grande lessive, au temps des battoirs';

export const premise06: Premise = {
  id: 'premise-06',
  title: 'Le lavoir de minuit',
  epoch: EPOCH,

  // Beat 1 : l'eau, le froid, le bruit. Aucune information.
  wakeup: [
    'Le noir sent le savon de cendre, la pierre mouillée et la fougère écrasée. Une odeur de fer passe dessous, comme celle d’une vieille lame.',
    'Tu écoutes. De l’eau, tout près, qui coule dans un bassin et tombe d’une pierre à l’autre, sans hâte, sans arrêt.',
    'Sous le bruit de l’eau, un autre : des coups sourds, réguliers, d’un bois plat sur du linge mouillé. Ils s’arrêtent, puis reprennent.',
    'Tu es agenouillé. Tu le sais aux genoux, enfoncés dans une planche trempée, et au dos plié depuis longtemps.',
    'Tes bras sont dans l’eau jusqu’aux coudes. Elle est glacée. Et pourtant, quand tu les regardes, tes mains sont sèches.',
    'Tu cherches ton nom. Tu trouves un mot à la place : le bruit d’un drap qu’on tord, long, grinçant, comme une porte.',
    'Dans ta manche, un sachet de toile rêche, noué d’une ficelle, avec un grain de sel dedans. Tes doigts le serrent sans toi.',
    'Plus loin, sur la lande, un oiseau de nuit pousse un cri. Il se tait aussitôt, comme s’il avait vu quelque chose.',
    'Les coups de battoir se rapprochent. Un, puis deux, puis trois : ils prennent ton rythme, sans te demander ton avis.',
    'Une voix chante en breton, très bas, une complainte sans fin. Tu ne comprends pas les mots, mais ton corps, lui, connaît l’air.',
    'Il n’y a pas de lune. Pourtant, tout est visible, d’un gris d’étain, comme si la nuit tenait sa propre lumière.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, le miroir et le corps hérité.
  orientation: [
    {
      kind: 'material',
      text: 'Un lavoir de pierre, long, couvert d’un toit bas. Des dalles inclinées, un bassin d’eau noire, et sur le bord une rangée de battoirs rangés comme des armes.',
    },
    {
      kind: 'material',
      text: 'Sur la corde, entre deux poteaux, des draps blancs pendent sans bouger. Aucun ne goutte. L’air est pourtant humide, et la lande, dehors, luit de rosée.',
    },
    {
      kind: 'material',
      text: 'À tes pieds, un panier d’osier, à moitié plein de linge tordu. Dessus, un savon gris, usé en forme de cœur, et une cuillère de bois noircie.',
    },
    {
      kind: 'bodily',
      text: 'Tu plonges les mains dans le bassin. L’eau est si froide qu’elle devrait mordre. Tes doigts en ressortent secs, et nets, comme sortis d’un four.',
    },
    {
      kind: 'bodily',
      text: 'Tu te penches sur l’eau noire. Ton reflet te regarde, fatigué, et il tient entre ses mains un drap tordu que tu n’as pas, toi, entre les tiens.',
    },
    {
      kind: 'bodily',
      text: 'Ton poignet droit tourne tout seul, vers l’extérieur, d’un petit geste d’habitude. Ce corps a tordu du linge toute sa vie, toujours dans le même sens.',
    },
    {
      kind: 'social',
      text: 'Une vieille, accroupie à l’autre bout, savonne un drap qui n’en finit pas. Elle ne lève pas la tête. Elle dit : « Tu es resté bien tard, toi. »',
    },
    {
      kind: 'social',
      text: 'Une plus jeune frotte à côté, le dos raide. Elle te regarde de biais, puis regarde ta manche, là où le sel pèse. Elle cesse de chanter.',
    },
    {
      kind: 'social',
      text: 'Sur la route de la lande, des gens rentrent de la veillée. Ils pressent le pas en passant devant le lavoir. Aucun ne tourne la tête.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 1 » entre. Le choix risqué dit le secret trop tôt.
  openingDialogue: {
    npcId: '1',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un descend le sentier en courant à moitié, un panier de linge sur la hanche. Il s’arrête net à l’entrée du lavoir, hors d’haleine.',
      },
      {
        speaker: 'npc',
        text: 'Tu es encore là ? On t’a cherché toute la soirée. Ta mère a posé ton couvert, et l’a repris.',
      },
      {
        speaker: 'narration',
        text: 'La personne ne regarde pas les lavandières au fond. Elle regarde l’eau, puis tes mains sèches, puis l’eau de nouveau.',
      },
      {
        speaker: 'npc',
        text: 'Il est minuit passé. On ne lave pas à minuit. Tu le sais, tout le monde le sait. Ce n’est pas ton linge, là.',
      },
      {
        speaker: 'npc',
        text: 'Elles t’ont demandé quelque chose ? Avant que j’arrive. Dis-moi qu’elles ne t’ont rien demandé.',
      },
      {
        speaker: 'narration',
        text: 'Un drap claque derrière toi, sans vent. Les battoirs ont cessé. Le silence est tel qu’on entend couler l’eau d’une pierre à l’autre.',
      },
      {
        speaker: 'npc',
        text: 'Réponds-moi à voix basse. Elles écoutent tout. Elles n’ont rien d’autre à faire.',
      },
    ],
    choices: [
      {
        id: 'rassurer',
        kind: 'neutral',
        text: '« Rien. Je finissais mon linge. Je rentre avec toi. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Alors laisse-le. Ne le tords pas. Pose-le dans le panier et marche.',
          },
          {
            speaker: 'narration',
            text: 'La personne te tend la main, sans te regarder. Sa paume est mouillée de sueur. Elle regarde la lande.',
          },
        ],
      },
      {
        id: 'questionner',
        kind: 'informative',
        text: '« Qu’est-ce qu’elles pourraient me demander ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'De les aider. À tordre un drap, à deux, chacun un bout. Ce n’est pas grand-chose. C’est comme ça que ça commence.',
          },
          {
            speaker: 'npc',
            text: 'Il y a un sens où ça se passe bien. Il y en a un autre. Ma grand-mère disait lequel. Je ne m’en souviens plus.',
          },
          {
            speaker: 'narration',
            text: 'La personne se mord la lèvre. Elle en a trop dit, et elle le sait.',
          },
        ],
      },
      {
        id: 'avouer-que-tu-sais',
        kind: 'risky',
        text: '« Elles m’ont déjà demandé. Je leur ai dit oui. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu as dit oui ? Et tu es encore là, avec tes deux bras ? Ce n’est pas possible.',
          },
          {
            speaker: 'narration',
            text: 'La voix est devenue très basse. Elle a quitté l’inquiétude pour la peur nette, celle de quelqu’un qui recule d’un pas.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis à personne. Pas au village, pas au recteur. Pas avant d’avoir compris pourquoi tu tiens debout.',
          },
        ],
      },
      {
        id: 'regarder-les-draps',
        kind: 'neutral',
        text: 'Ne rien dire et toucher un des draps, sur la corde.',
        reply: [
          {
            speaker: 'narration',
            text: 'Le tissu est lourd, glacé, d’une blancheur qui fait mal aux yeux. Au coin, une initiale est brodée, au fil rouge, à peine visible.',
          },
          {
            speaker: 'npc',
            text: 'Lâche-le. Ne regarde pas la lettre. On n’y reconnaît jamais personne, et puis on y reconnaît quelqu’un.',
          },
          {
            speaker: 'narration',
            text: 'Tu as eu le temps de la lire. Elle ressemble à la première lettre d’un nom que tu connais, sans savoir lequel.',
          },
        ],
      },
    ],

    // Seconde passe : les lavandières se lèvent, la demande vient.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'La vieille a posé son drap. Elle se lève sans bruit, le linge tendu entre les deux mains, et elle marche vers toi, pieds nus sur la dalle.',
        },
        {
          speaker: 'npc',
          text: 'Elle vient. Elle vient pour toi, pas pour moi. Je n’ai rien dit. Je n’ai rien fait.',
        },
        {
          speaker: 'narration',
          text: 'La plus jeune, derrière, a repris son chant. Elle chante plus fort, comme pour couvrir un autre bruit, celui d’un os qui ne plie pas.',
        },
        {
          speaker: 'narration',
          text: 'Les battoirs se lèvent d’eux-mêmes sur le bord du bassin, un à un, et se tournent vers toi, d’un mouvement très lent.',
        },
        {
          speaker: 'npc',
          text: 'Elle va te tendre un bout du drap. Que fais-je, moi ? Je pars, ou je reste à côté de toi ?',
        },
      ],
      choices: [
        {
          id: 'rester-ensemble',
          kind: 'neutral',
          text: '« Reste. À deux, il y aura deux paires de bras. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Deux paires, c’est deux fois plus à perdre. Je reste quand même. Mais je ne tords rien.',
            },
            {
              speaker: 'narration',
              text: 'La personne se colle à ton épaule. Elle tremble, mais ses pieds ne bougent pas, plantés dans la dalle.',
            },
          ],
        },
        {
          id: 'demander-le-sens',
          kind: 'informative',
          text: '« Dans quel sens faut-il tordre ? Cherche, souviens-toi. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Ma grand-mère disait : celui qui tord comme elles ne reprend jamais ses bras. Il faut tordre contre elles.',
            },
            {
              speaker: 'npc',
              text: 'Mais contre qui ? Contre leurs mains, ou contre le fil ? Je ne sais plus. Il y en a un, et on le sent au poignet.',
            },
            {
              speaker: 'narration',
              text: 'Elle ajoute plus bas : « Ton poignet sait, peut-être. Il tourne toujours du même côté, depuis toujours. »',
            },
          ],
        },
        {
          id: 'refuser-net',
          kind: 'risky',
          text: '« Non. Je ne tords rien pour elles. Laisse-moi passer. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Ne leur dis pas non. On ne dit pas non à celles-là. Elles attendent, c’est tout ce qu’elles savent faire.',
            },
            {
              speaker: 'narration',
              text: 'La vieille s’arrête. Elle te regarde enfin. Ses yeux sont de l’eau, sans fond. Elle sourit d’un air presque tendre.',
            },
          ],
        },
        {
          id: 'regarder-le-visage',
          kind: 'informative',
          text: '« Regarde son visage. À qui ressemble-t-elle ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'À personne. À une vieille. À toutes les vieilles qui ont lavé trop tard dans ce lavoir.',
            },
            {
              speaker: 'narration',
              text: 'La personne a répondu trop vite. Elle regarde mieux, puis elle recule, la main sur la bouche, et ne dit plus rien.',
            },
            {
              speaker: 'npc',
              text: 'C’est le drap, que je connais. Pas elle. Ce drap-là, on l’a cousu chez nous.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le poignet sait ; le drap a un nom.
  investigation: [
    {
      kind: 'material',
      text: 'Au fond du panier, sous le linge, une petite chose lourde et froide, enveloppée dans un lange. Ta main ne tremble pas en la touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tu tords un coin de drap, pour voir. Ton poignet part vers l’extérieur, sans hésiter. Une douleur ancienne se réveille dans l’os, au même endroit, à chaque tour.',
      revealsTruth: 'sens-du-poignet',
    },
    {
      kind: 'material',
      text: 'Sur la dalle, des traces rondes, côte à côte, comme si quelqu’un avait tordu là un très long drap, tour après tour, pendant des années.',
    },
    {
      kind: 'material',
      text: 'Le savon gris, de près, porte un petit nom gravé dans la pâte. Trop usé pour être lu, mais assez pour sentir les lettres au pouce.',
    },
    {
      kind: 'social',
      text: 'Un vieux, qui traverse la lande avec un sac de sel sur l’épaule, s’arrête loin du lavoir. Il murmure, assez fort pour que tu l’entendes : « C’est le drap de la maison du bas. »',
      revealsTruth: 'drap-de-la-maison-du-bas',
    },
    {
      kind: 'social',
      text: 'La plus jeune lavandière te regarde longtemps, puis détourne la tête. Elle chante deux notes d’un air que tu reconnais : une berceuse.',
    },
    {
      kind: 'social',
      text: 'Une femme, de l’autre côté du mur, murmure à son enfant : « Ne regarde pas. Elles prennent le premier qui regarde. »',
    },
    {
      kind: 'social',
      text: 'Un enfant a posé ses sabots dans l’herbe, à l’entrée, rangés comme pour dormir. Une main les a repris avant que tu approches.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Dans cette eau glacée, il devrait cogner. Ce corps vit au ralenti, comme un galet au fond du bassin.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve, dans ta paume, une brûlure en forme de croix. Une braise de la veillée l’a faite, un soir de grande lessive.',
    },
    {
      kind: 'material',
      text: 'Près du bassin, un battoir est tombé à l’eau, et il flotte à la surface sans rien dessous. Le courant ne l’emporte pas. Il tourne sur lui-même.',
    },
    {
      kind: 'material',
      text: 'Sur la corde, un drap est plus court que les autres, comme si on en avait coupé un coin. Dessous, par terre, un ciseau d’argent est resté ouvert.',
    },
    {
      kind: 'social',
      text: 'La vieille chante en breton, tout bas. Un mot revient, que tu connais : « nom ». Elle te sourit chaque fois qu’elle le dit.',
    },
    {
      kind: 'bodily',
      text: 'Tes dents claquent sans que tu aies froid. Une peur très ancienne, qui n’est pas la tienne, remonte de tes bras jusqu’à ta gorge.',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['sens-du-poignet', 'drap-de-la-maison-du-bas'],
      lines: [
        {
          speaker: 'narration',
          text: 'La vieille te tend un bout du drap. Il est lourd, il a une odeur de cire et de terre fraîche. Tu sais maintenant à qui il appartient.',
        },
        {
          speaker: 'narration',
          text: 'C’est le linceul de la maison du bas. Quelqu’un y est mort ce soir, et personne n’est encore venu le dire à voix haute.',
        },
        {
          speaker: 'npc',
          text: 'Tords avec moi. Dans le sens du fil, et vite. Tu es du village. Tu connais le chemin.',
        },
        {
          speaker: 'narration',
          text: 'Ton poignet tourne vers l’extérieur, déjà, avec l’impatience d’une vieille habitude. Si tu le laisses faire, il te cassera les deux bras.',
        },
        {
          speaker: 'narration',
          text: 'Tu serres la ficelle du sachet de sel. Il faut tordre contre elle, contre le fil, et contre ton propre corps.',
        },
      ],
    },
    {
      requires: ['sens-du-poignet'],
      lines: [
        {
          speaker: 'narration',
          text: 'Ton poignet se tend vers le drap avant que la vieille ne l’offre. Il connaît ce geste, il a tordu cent fois ce linge-là, dans ce sens-là.',
        },
        {
          speaker: 'narration',
          text: 'La vieille tend le drap. Il est lourd de quelqu’un. Tu ne sais pas qui. Tu sais une chose : il faut tordre à contre-main.',
        },
        {
          speaker: 'narration',
          text: 'Les battoirs se mettent à frapper, tous ensemble. Le rythme monte, comme si l’eau elle-même attendait.',
        },
      ],
    },
    {
      requires: ['drap-de-la-maison-du-bas'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le vieux au sac de sel est revenu jusqu’au muret, sans entrer. Il te jette un nom par-dessus la pierre, très vite, comme un caillou.',
        },
        {
          speaker: 'npc',
          text: 'C’est elle, au bas du chemin. Elle est partie ce soir. Elles lavent son drap avant l’aube. Sinon elle ne dort pas.',
        },
        {
          speaker: 'narration',
          text: 'Il s’éloigne en courant à moitié. Dans la maison du bas, une lampe vient de s’allumer, puis de s’éteindre.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Le bassin se met à bouillonner, sans feu. Les draps de la corde se gonflent, comme si quelqu’un respirait dedans.',
        },
        {
          speaker: 'narration',
          text: 'Tu n’as pas assez regardé pour savoir pourquoi. Mais la vieille est à un pas de toi, le drap tendu, et ses doigts sont d’eau.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, le coq chante une fois, trop tôt, et se tait. Il va être l’heure de décider, et tu n’es pas prêt.',
        },
      ],
    },
  ],

  // « Laisser ta main faire » : ce que le corps hérité fait seul, fixé par la prémisse.
  handLetGo: {
    dialogue: {
      outcome: 'saves',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main plonge dans ta manche et en sort le sachet de sel. Elle le serre, puis le tend à la personne, sans que tu aies rien décidé.',
        },
        {
          speaker: 'npc',
          text: '« Du sel ? Pour moi ? » Elle le prend. Elle le pose sur sa langue, et quelque chose, dans son visage, se desserre.',
        },
        {
          speaker: 'narration',
          text: 'Le corps savait. Il a protégé la personne, avant toi, avant que tu comprennes qu’elle avait peur.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'sens-du-poignet',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main saisit un coin de drap et le tord, sans toi. Elle tourne vers l’extérieur, d’un coup sec, avec l’aisance de mille lessives.',
        },
        {
          speaker: 'narration',
          text: 'Une douleur te traverse l’os, très nette, du même côté qu’hier. Ce corps a déjà tordu ce linge-là, dans ce sens-là.',
        },
        {
          speaker: 'narration',
          text: 'Tu en as la certitude, sans souvenir : c’est le sens des lavandières. Pour les battre, il faudra tourner l’autre main.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-11', 'fracture-12'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'tordre-a-contre-main',
      requiresAny: ['sens-du-poignet', 'drap-de-la-maison-du-bas'],
      choiceText:
        'Prendre le bout du drap et le tordre à contre-main, contre le sens de ton poignet et celui des lavandières.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu prends le bout du drap. Ton poignet veut partir vers l’extérieur. Tu le forces, à rebours, d’un tour lent et douloureux.',
        'Le drap grince. Les mains d’eau de la vieille se tendent, puis se défont. Elle te regarde, et pour la première fois, ses yeux ont une couleur.',
        'Elle dit un seul mot, en breton, que tu comprends : « Merci. » Elle se dissout dans le bassin, avec le linge, avec les battoirs.',
        'Quand le coq chante, tes bras sont entiers. Tes mains sont mouillées, enfin, comme celles de tout le monde. Elles fument dans l’air.',
        'Au matin, quelqu’un a laissé un grain de sel sur le bord du lavoir. Le drap de la maison du bas sèche, blanc, sur la corde.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'les-lavandieres-ont-ete-delivrees',
            summary:
              'Quelqu’un a tordu le drap à contre-main, et les lavandières de la nuit ont fini leur lessive.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celui-qui-a-tordu-a-rebours',
            characterId: '1',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'tordre-dans-leur-sens',
      choiceText:
        'Prendre le bout du drap et le tordre comme elles, vite, pour en finir avant l’aube.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends le drap, et ton poignet part d’un coup, sûr de lui, dans le sens de toutes les lessives. Tout va si vite.',
        'Quelque chose craque dans ton bras. Puis dans l’autre. Tu n’as pas mal, pas encore : tu entends le bruit.',
        'Les lavandières reprennent leurs battoirs. La vieille te regarde, désolée, comme on regarde un linge qu’on n’a pas pu sauver.',
        'Au matin, on te retrouve au bord du lavoir, les bras de travers. Tu dis que tu ne te souviens de rien. Personne ne s’étonne.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'bras-brises-au-lavoir',
            description:
              'Quelqu’un qui a tordu le linge de la nuit dans le mauvais sens, et n’a plus de bras.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'nommer-le-drap',
      requiresAny: ['drap-de-la-maison-du-bas'],
      choiceText:
        'Dire à voix haute le nom de la maison du bas, et à qui appartient le drap.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu dis le nom, de toute ta voix, au-dessus du bassin. Les lavandières se figent, les mains dans l’eau.',
        'Sur le chemin de la lande, un volet claque. Quelqu’un a entendu. Quelqu’un a compris, et quelqu’un se met à pleurer.',
        'Le drap tombe, d’un coup, sur la dalle, comme un oiseau qu’on a touché. Il ne bouge plus. La vieille s’éloigne sans te regarder.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'maison-qui-a-su-trop-tot',
            label:
              'Une maison où l’on a appris un deuil avant l’aube, par une voix inconnue',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'briser-les-battoirs',
      choiceText:
        'Saisir un battoir et le briser sur la pierre, pour faire taire le lavoir.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu saisis un battoir. Il est léger, trop léger, comme un os de bête. Tu le brises d’un coup sur le rebord de pierre.',
        'Un cri monte du bassin, long, sans bouche. Les autres battoirs se mettent à frapper tous ensemble, plus fort, plus vite.',
        'Quand tu sors du lavoir, le bruit te suit sur la lande, jusqu’au bourg. Il passera la nuit à ta porte.',
        'Dans ta poche, tu trouves un petit morceau de bois mouillé. Il est tiède, et il bat à petits coups, comme un cœur.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'battoir-qui-suit',
            label:
              'Un coup de battoir qui suit quelqu’un jusque chez lui, toutes les nuits',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-du-lavoir',
            artifactId: 'leap',
            fromLeap: '',
            toLeap: null,
          },
        },
      ],
    },
    {
      id: 'avouer-ton-trou',
      choiceText: 'Dire que tu ne sais pas qui tu es.',
      outcome: 'exposed',
      fractureRepaired: false,
      resultText: [
        'Tu dis que tu ne sais pas qui tu es. Que ce corps ne se mouille pas, et que tu ne te souviens pas de l’avoir habité.',
        'Personne ne rit. Les battoirs se taisent. Quelqu’un recule jusqu’au bord de la lande, puis plus loin, vers les lumières du bourg.',
        'La vieille pose son drap et te regarde enfin. Elle dit : « Alors tu n’es pas d’ici. Tu n’es pas à nous non plus. »',
        'On te retire le sachet de sel. Un autre viendra laver, un soir, quelqu’un qui sait ce qu’il fait et ce qu’il risque.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'entrer-dans-leau',
      choiceText: 'Entrer dans le bassin, et suivre l’eau noire jusqu’au fond.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu descends les marches du bassin. L’eau monte aux genoux, puis à la taille. Elle n’est pas froide. Elle n’est rien du tout.',
        'Tu marches. Le fond ne se rapproche pas. Au-dessus de toi, les lavandières chantent leur complainte, de plus en plus loin.',
        'Quand tu comprends que ce lavoir n’a pas de fond, tu ne vois plus le ciel. Tu n’entends plus les battoirs, ni ton cœur.',
        'Sur la dalle, tes sabots restent côte à côte, rangés comme pour dormir. Quelqu’un les a posés bien droits.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'lavandier-pris-par-leau',
            description:
              'Quelqu’un qui a suivi l’eau noire du lavoir, et qu’on n’a pas revu.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

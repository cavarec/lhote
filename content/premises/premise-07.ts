import type { Premise } from './types';

// Prémisse 7 : les cloches d'Ys. Une grève à marée basse, un soir de grande marée d'équinoxe.
// Inspirée de : la légende bretonne de la ville engloutie d'Ys et de la porte que Dahut laissa ouverte.
//
// Colonne vertébrale :
// - Qui demande quoi : une personne de la maison d'à côté vient te chercher sur la grève. La charrette part à la
//   nuit, et elle veut que tu remontes sans répondre aux cloches qui sonnent sous la dalle.
// - Ce qui est en jeu : au troisième coup, la porte d'Ys demande qu'on lui réponde. La mer revient d'un coup,
//   et celui ou celle qui répond est pris. Quelqu'un de Penhir y est déjà passé, l'an dernier.
// - Le piège : ce corps est celui de Nolig, qui devait refermer la porte avec son sel à chaque grande marée.
//   L'an dernier, Nolig a eu peur et n'est pas descendu. La porte est restée entrouverte.
// - Ce que tu peux faire : refermer la porte avec le sel que tu portes (la bonne issue), ou répondre aux
//   cloches, jeter le sel, courir sonner la chapelle, avouer que tu ne sais pas qui tu es, ou descendre.
// - Qui es-tu ici : le nom (Nolig), gravé sur l'anneau et dit par un ramasseur, et le devoir, que dit le vieux.
//
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : ton reflet dans la flaque garde la bouche pleine d’eau de mer.
// - Corps hérité : le goût du sel sur la langue, et des pas qui ne laissent pas de trace.

const EPOCH =
  'une grève de la baie, un soir de grande marée, au temps du goémon et des charrettes';

export const premise07: Premise = {
  id: 'premise-07',
  title: 'Les cloches d’Ys',
  epoch: EPOCH,

  // Beat 1 : le sable, le vent, la mer qui s'est retirée trop loin. Aucune information.
  wakeup: [
    'Le noir sent le sel, la vase tiède et le goémon qui sèche. Dessous, une odeur de bronze mouillé, comme celle d’une vieille cloche.',
    'Tu écoutes. La mer, très loin, murmure et ne revient pas. Le sable boit l’eau. Des coquilles craquent sous un pas.',
    'Tu es debout, les pieds nus, dans une flaque tiède. Tu le sais aux orteils enfoncés dans la vase, et au vent qui te lève les cheveux.',
    'Tes lèvres ont un goût de sel, épais, tenace, comme si tu avais bu la mer. Tu n’as pas soif. Tu n’as jamais soif.',
    'Tu cherches ton nom. Tu trouves un son à la place, un son de bronze, grave, qui roule sous le sable et fait trembler tes genoux.',
    'À la ceinture, un sac de toile rêche, noué d’une ficelle, avec un grain de sel dedans. Tes doigts le serrent sans toi.',
    'Une charrette grince, loin derrière, sur la route de la dune. Elle s’est arrêtée. Quelqu’un attend là-haut et ne descend pas.',
    'Au ras de l’eau, un oiseau de mer marche d’un pas raide, la tête tournée vers le large. Il ne cherche rien. Il écoute.',
    'Le vent change. Il porte un bruit venu de sous le sable : un seul coup de cloche, long, qui fait vibrer les coquilles.',
    'Un deuxième coup suit, plus près. Tu comptes sans le vouloir, et ta bouche attend le troisième.',
    'Il n’y a pas de lune. Pourtant la grève luit, d’un gris de coquillage, et chaque flaque garde un morceau de ciel.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, le miroir et le corps hérité.
  orientation: [
    {
      kind: 'material',
      text: 'Une grève immense, plate, striée par la marée. Des rochers noirs, couverts de goémon, émergent çà et là. Au loin, la mer n’est plus qu’une ligne d’argent.',
    },
    {
      kind: 'material',
      text: 'À tes pieds, un panier de goémon noir, une fourche à trois dents et un râteau de bois. Le goémon est frais : tu travaillais encore, il y a un instant.',
    },
    {
      kind: 'material',
      text: 'À dix pas, une dalle carrée, usée, que la marée a dégagée. Elle porte un anneau de bronze vert. Le sable autour est lisse comme un seuil.',
    },
    {
      kind: 'bodily',
      text: 'Tu regardes derrière toi. Le sable est lisse. Tes pas ne laissent aucune trace, alors que ceux des autres, plus loin, s’enfoncent dans la vase.',
    },
    {
      kind: 'bodily',
      text: 'Tu te penches sur la flaque. Ton reflet te regarde, la bouche entrouverte et pleine d’eau de mer, qui coule de ses lèvres sans jamais s’arrêter.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains sont gercées, rouges, durcies par le froid. Ce corps tire le goémon depuis l’enfance, et la grève le connaît.',
    },
    {
      kind: 'social',
      text: 'Des ramasseurs rentrent avec leurs paniers, courbés, en silence. Quand ils passent près de toi, ils changent de côté et ne te regardent pas.',
    },
    {
      kind: 'social',
      text: 'Personne ne dit ton nom. Ils murmurent « bonsoir » et rien d’autre, comme on évite de nommer quelqu’un devant la mer.',
    },
    {
      kind: 'social',
      text: 'Sur la route de la dune, une charrette attend, les roues dans l’ombre. Le charretier ne descend pas. Il a posé un chapelet sur son genou.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » entre. Le choix risqué dit le secret trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un descend de la dune, en sabots, la tête rentrée dans les épaules. Les sabots collent à la vase, puis claquent à chaque pas.',
      },
      {
        speaker: 'npc',
        text: 'Je t’ai cherché sur toute la grève. Le charretier part à la nuit. Remonte avec moi, tout de suite.',
      },
      {
        speaker: 'narration',
        text: 'La personne ne regarde pas la mer. Elle regarde la dalle, l’anneau vert, puis tes pieds, qui ne laissent pas de traces.',
      },
      {
        speaker: 'npc',
        text: 'Tu as entendu ? Une cloche, sous le sable. Dis-moi que tu n’as rien entendu.',
      },
      {
        speaker: 'npc',
        text: 'On ne les compte pas. À trois coups, elles demandent qu’on leur réponde. Mon père le disait.',
      },
      {
        speaker: 'narration',
        text: 'Un deuxième coup de bronze monte du sable, tout proche. Les coquilles tremblent. L’oiseau de mer a levé la tête, sans bruit.',
      },
      {
        speaker: 'npc',
        text: 'Ne bouge pas. Ne réponds pas. Ou alors réponds-moi, à moi, et pas à elles.',
      },
    ],
    choices: [
      {
        id: 'rassurer',
        kind: 'neutral',
        text: '« Je n’ai rien entendu. Je finis mon panier et je monte. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Alors finis vite. La mer revient d’un coup, ici, quand on ne la regarde plus.',
          },
          {
            speaker: 'narration',
            text: 'La personne se baisse, ramasse une poignée de goémon sans y croire, et la laisse retomber. Elle surveille le large.',
          },
        ],
      },
      {
        id: 'questionner',
        kind: 'informative',
        text: '« Qu’est-ce qu’elles demandent, à trois ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Qu’on ouvre la porte, sous l’anneau, ou qu’on la ferme. Ça dépend de qui répond.',
          },
          {
            speaker: 'npc',
            text: 'Quelqu’un de Penhir a répondu, l’an dernier. On a retrouvé ses sabots sur le sable, côte à côte. Lui, jamais.',
          },
          {
            speaker: 'narration',
            text: 'La personne a pâli. Elle en a trop dit, et elle le sait.',
          },
        ],
      },
      {
        id: 'avouer-que-tu-sais',
        kind: 'risky',
        text: '« J’ai déjà entendu les trois coups. Je sais ce qu’elles demandent. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Les trois ? Et tu es encore là, debout, la bouche pleine de sel ? Ce n’est pas possible.',
          },
          {
            speaker: 'narration',
            text: 'La voix s’est creusée. Elle a quitté l’inquiétude pour une peur nette, celle de quelqu’un qui sent le sol se dérober.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis à personne, pas à la charrette, pas au recteur. Pas avant d’avoir compris pourquoi tu tiens debout.',
          },
        ],
      },
      {
        id: 'toucher-lanneau',
        kind: 'neutral',
        text: 'Ne rien dire et poser la main sur l’anneau de bronze.',
        reply: [
          {
            speaker: 'narration',
            text: 'Le métal est tiède, et il vibre. Sous ta paume, la dalle bat, très lente, comme un grand cœur couché sous le sable.',
          },
          {
            speaker: 'npc',
            text: 'Arrête. Ne tire pas dessus. Ce n’est pas une poignée, c’est une bouche.',
          },
          {
            speaker: 'narration',
            text: 'Ton pouce a trouvé, dans le bronze, une petite encoche. Elle semble creusée pour lui, et pour rien d’autre.',
          },
        ],
      },
    ],

    // Seconde passe : la mer revient, le troisième coup approche.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'La ligne d’argent, au large, vient de bouger. Elle s’est avancée d’un seul coup, de la longueur d’un champ.',
        },
        {
          speaker: 'npc',
          text: 'Elle revient. Elle va nous prendre les pieds. Il reste un coup, un seul, et la mer arrive.',
        },
        {
          speaker: 'narration',
          text: 'Sous la dalle, on entend maintenant plusieurs cloches à la fois, graves et claires, comme une ville entière qui s’éveille.',
        },
        {
          speaker: 'narration',
          text: 'Les flaques se remplissent, l’une après l’autre, d’une eau plus noire. Elle monte vers tes chevilles, sans vague, sans vent.',
        },
        {
          speaker: 'npc',
          text: 'La charrette n’attend plus longtemps. Je monte, ou je reste là, avec toi ?',
        },
      ],
      choices: [
        {
          id: 'rester-ensemble',
          kind: 'neutral',
          text: '« Reste. À deux, on tiendra jusqu’au troisième coup. »',
          reply: [
            {
              speaker: 'npc',
              text: 'À deux, on s’empêchera de répondre. Je reste. Mais ne me lâche pas la manche.',
            },
            {
              speaker: 'narration',
              text: 'La personne s’agrippe à ton coude. L’eau lui monte aux sabots, et elle ne baisse pas les yeux.',
            },
          ],
        },
        {
          id: 'demander-la-cle',
          kind: 'informative',
          text: '« Pour fermer cette porte, que faut-il ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Du sel, dit-on, posé sur la serrure par celui ou celle qui garde. Moi, je ne sais pas qui garde.',
            },
            {
              speaker: 'narration',
              text: 'Le regard de la personne va vers ton sac de toile, puis revient. Elle n’ose pas finir sa pensée.',
            },
            {
              speaker: 'npc',
              text: 'Ne parle pas de sel devant la charrette. Là-haut, on dit que ça porte malheur de le nommer.',
            },
          ],
        },
        {
          id: 'fuir-vers-la-dune',
          kind: 'risky',
          text: '« Courons vers la dune, tout de suite, avant la mer. »',
          reply: [
            {
              speaker: 'npc',
              text: 'La dune est loin. La mer est derrière. Si on court, elle nous prend. Si on marche, elle nous attend.',
            },
            {
              speaker: 'narration',
              text: 'Tu fais un pas. Le sable, sous ton pied, ne bouge pas. Il garde ta place, comme une porte entrouverte.',
            },
          ],
        },
        {
          id: 'qui-es-tu',
          kind: 'informative',
          text: '« Dis-moi qui je suis. Comment m’appelles-tu ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Tu te moques de moi, à cette heure ? Chez nous, on t’appelle Grain-de-sel, à cause du sac que tu portes.',
            },
            {
              speaker: 'npc',
              text: 'Je suis de la maison d’à côté. Je t’ai vu descendre ici, chaque grande marée, jusqu’à l’an dernier.',
            },
            {
              speaker: 'narration',
              text: 'La personne ne dit pas ton vrai nom. On dirait que ça porterait malheur, ici, avec les cloches si proches.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le sel est la clé ; la dalle est une porte ; ce corps s'appelle Nolig.
  // Chaque nature d'indice s'affiche d'un bloc : aucun indice ne dépend d'un autre.
  investigation: [
    {
      kind: 'material',
      text: 'Dans la vase, contre la dalle, quelque chose de lourd et de froid, enveloppé dans une toile de lin. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Sur l’anneau, entre les écailles vertes, un nom gravé à la pointe d’un clou : Nolig. Dessous, des traits, un par grande marée. Le dernier est inachevé.',
      revealsTruth: 'ton-nom-est-nolig',
    },
    {
      kind: 'material',
      text: 'Autour de la dalle, le sable est piétiné en rond sur l’épaisseur d’un pas. Quelqu’un a tourné là, longtemps, sans oser poser la main.',
    },
    {
      kind: 'material',
      text: 'Un râteau est planté droit dans le sable, avec un ruban de laine rouge au manche. Les ramasseurs le nouent pour marquer l’endroit qu’on ne franchit pas.',
    },
    {
      kind: 'material',
      text: 'Au fond d’une flaque, une pièce très ancienne : un visage de femme, couronné de coquillages, la bouche close. On dit que c’est Dahut, qui laissa sa porte ouverte.',
    },
    {
      kind: 'bodily',
      text: 'Tu poses la langue contre ton palais. Le sel y est dur comme un cristal. Il ne vient pas de la mer : il vient de toi, comme une clé que ce corps garde sous la langue.',
      revealsTruth: 'le-sel-est-la-cle',
    },
    {
      kind: 'bodily',
      text: 'Ta paume droite porte une marque ronde, brûlée en creux, de la taille de l’anneau. Ce corps a posé la main sur le bronze, grande marée après grande marée.',
    },
    {
      kind: 'bodily',
      text: 'Quand tu regardes la dalle, tes jambes veulent reculer. Ce corps a eu peur ici, une fois, plus fort que le devoir qui l’appelait.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Sur cette grève ouverte au vent, il devrait cogner. Ce corps vit au ralenti, comme un coquillage.',
    },
    {
      kind: 'social',
      text: 'Le vieux assis sur la pierre se retourne enfin et te dit : « La porte n’a pas été refermée, l’an dernier. Quelqu’un devait descendre, et n’est pas descendu. »',
      revealsTruth: 'la-porte-est-ouverte',
    },
    {
      kind: 'social',
      text: 'Un ramasseur qui remonte te salue en passant : « Bonsoir, Nolig. Tu descends, cette année ? » Il n’attend pas la réponse et file vers la dune.',
      revealsTruth: 'ton-nom-est-nolig',
    },
    {
      kind: 'social',
      text: 'Une vieille, près des paniers, murmure à sa voisine : « Le cadet de Penhir a répondu aux cloches, l’an dernier. On n’a trouvé que ses sabots. »',
    },
    {
      kind: 'social',
      text: 'Un enfant, en haut de la dune, porte un petit sachet de sel au cou, comme le tien. On le rappelle d’une voix sèche.',
    },
    {
      kind: 'social',
      text: 'Un pêcheur, assis dans sa barque échouée, chante en breton : « Ys la belle, Ys la noire, qui répond n’en revient pas. »',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['le-sel-est-la-cle', 'la-porte-est-ouverte'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le troisième coup de cloche sonne, tout près. La dalle se soulève d’un doigt, et une lumière dorée glisse sous le sable.',
        },
        {
          speaker: 'narration',
          text: 'Tu comprends d’un coup. La porte est restée entrouverte depuis l’an dernier, parce que ce corps n’est pas descendu la fermer.',
        },
        {
          speaker: 'npc',
          text: 'Que fais-tu ? Ne touche pas à l’anneau. Dis-moi que tu ne vas pas répondre.',
        },
        {
          speaker: 'narration',
          text: 'La mer est à vingt pas. Dans ta bouche, le sel est lourd comme une pièce, comme une promesse.',
        },
        {
          speaker: 'narration',
          text: 'Si tu poses ce sel dans l’encoche, la porte se ferme. Si tu l’abandonnes, quelqu’un d’autre en paiera le prix.',
        },
      ],
    },
    {
      requires: ['le-sel-est-la-cle'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le troisième coup sonne. Le sel sur ta langue se met à chanter, d’une note aiguë qui répond aux cloches sous la dalle.',
        },
        {
          speaker: 'narration',
          text: 'L’anneau de bronze se tourne seul d’un quart de tour, vers ta bouche, comme une serrure vers sa clé.',
        },
        {
          speaker: 'narration',
          text: 'La mer, à vingt pas, retient son souffle. Tu ne sais pas ce que la porte veut, mais ton sel, lui, le sait.',
        },
      ],
    },
    {
      requires: ['la-porte-est-ouverte'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le troisième coup sonne. Le vieux est descendu de sa pierre et marche vers toi sur le sable, sans enfoncer le pied.',
        },
        {
          speaker: 'npc',
          text: 'Le sel se pose dans l’encoche de l’anneau, à main nue. Ensuite on ne se retourne pas. C’est tout ce que je sais.',
        },
        {
          speaker: 'narration',
          text: 'Il repart sans attendre ta réponse. Au loin, la mer reprend sa montée, d’un pas régulier, comme si elle comptait.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Le troisième coup sonne. La dalle se soulève d’un doigt, et une lumière dorée glisse sous le sable.',
        },
        {
          speaker: 'narration',
          text: 'Sur l’anneau, à hauteur de pouce, une petite encoche t’attend. Ton sac de sel est chaud contre ta poitrine.',
        },
        {
          speaker: 'narration',
          text: 'Les flaques se rejoignent, la grève n’est plus qu’une nappe noire. Il faut décider, avant que la mer arrive.',
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
          text: 'Ta main se lève, sans toi, vers ta bouche. Elle touche tes lèvres, puis la dalle, puis de nouveau tes lèvres, comme on compte.',
        },
        {
          speaker: 'narration',
          text: 'La personne a suivi le geste. Elle étouffe un cri. « Le signe du sel. Je ne te l’ai pas vu faire depuis l’an dernier. »',
        },
        {
          speaker: 'npc',
          text: 'Dis-moi que tu sais ce que tu fais. Dis-le, même si tu mens.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'le-sel-est-la-cle',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main s’ouvre, tire sur ton sac de toile et prend le grain de sel entre deux doigts. Elle le porte à ta bouche, sans hésiter.',
        },
        {
          speaker: 'narration',
          text: 'Le sel fond, puis durcit sur ta langue, comme un petit os. Tu reconnais ce goût, il est vieux comme la porte.',
        },
        {
          speaker: 'narration',
          text: 'Tu en as la certitude, nette, sans souvenir : le sel que tu portes n’est pas pour la mer. Il est pour la dalle.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-13', 'fracture-14'],

  // Qui était ce corps : la réponse que donne l'écran de fin, quelle que soit l'issue.
  // L'Observateur parle après le premier contact : il dit ce qui doit être réparé, pas comment.
  briefing: [
    'Je te vois, tu sais. Pas de panique, respire. Enfin, c’est une façon de parler : ce corps a l’air de se passer de buée.',
    'Voilà ce que j’ai. Cette grève cache une porte, celle d’Ys, et elle n’est pas fermée comme elle devrait l’être. Les cloches appellent. Quelqu’un a manqué à son devoir.',
    'Je crois que c’est à toi de réparer ça avant que la mer revienne. Mais je ne sais pas comment. Là-dessus, je ne te mentirai pas.',
    'Et ce sel que tu portes au cou… Je ne jurerais de rien. Mais à ta place, je ne le lâcherais pas.',
  ],

  host: {
    name: 'Nolig',
    role: 'qui referme la porte d’Ys à chaque grande marée',
    story:
      'Nolig ramassait le goémon sur la grève et gardait un devoir transmis de bouche à oreille : poser un grain de sel sur la serrure d’Ys. L’an dernier, Nolig a eu peur et n’est pas descendu. Depuis, la porte est restée entrouverte.',
    truth: 'ton-nom-est-nolig',
  },

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'refermer-la-porte',
      requiresAny: ['le-sel-est-la-cle', 'la-porte-est-ouverte'],
      choiceText:
        'Poser ton sel dans l’encoche de l’anneau et refermer la porte d’Ys, avant que la mer ne revienne.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu t’agenouilles devant la dalle. Tes doigts savent le geste : tu l’as fait vingt fois. Tu poses le grain dans l’encoche et tu dis : « Dors. »',
        'L’anneau tourne d’un quart de tour. La dalle s’abaisse avec le bruit d’une grande porte qu’on ferme à la main, sans colère.',
        'Les cloches se taisent, une à une. La mer arrive, calme, sur un sable plat. Tes pas laissent enfin des traces, comme ceux de tout le monde.',
        'Tu es Nolig, celui ou celle qui referme la porte. Ce soir, la porte est refermée, et ce corps a retrouvé son devoir.',
        'Sur la dalle, un petit tas de sel brille. Dessous, très bas, quelqu’un frappe un coup, un seul, comme on vérifie une serrure.',
      ].join('\n'),
      aftermath:
        'Les grandes marées passèrent sans que les cloches reviennent. Au printemps suivant, les ramasseurs descendirent sur la grève sans plus regarder derrière eux, et Nolig reprit le panier.',
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'la-porte-dys-est-refermee',
            summary:
              'Nolig est descendu refermer la porte d’Ys avec son sel, et les cloches se sont tues.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'le-ramasseur-de-la-grande-maree',
            characterId: '0',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'repondre-au-troisieme-coup',
      choiceText:
        'Répondre au troisième coup de cloche, à voix haute, et dire ce que la ville demande.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Au troisième coup, tu réponds. Tu ne sais pas ce que tu dis. Ta bouche s’ouvre, et ce sont des mots que tu ne connais pas.',
        'La dalle se soulève. Une lueur dorée sort de la fente, avec une odeur de miel et de vin chaud, très ancienne.',
        'Derrière toi, la personne crie : « Nolig ! » Puis elle se tait. La mer est là, tiède comme un souffle.',
        'Au matin, on retrouve ton panier sur le sable, plein d’un goémon blanc que personne n’a jamais vu pousser ici.',
        'Dans la dalle, la porte est restée ouverte. Quelqu’un, en bas, a dit un mot de plus que toi.',
      ].join('\n'),
      aftermath:
        'La porte resta entrouverte tout l’hiver. À chaque grande marée, quelqu’un du bourg disait avoir entendu son nom monter du sable, et personne ne descendait plus seul.',
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'porte-dys-ouverte-au-matin',
            label: 'Une grève où une porte de bronze reste entrouverte, à marée basse',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'jeter-le-sel',
      requiresAny: ['le-sel-est-la-cle'],
      choiceText:
        'Jeter ton sel à la mer, le plus loin possible, pour que personne ne puisse ouvrir.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu arraches le sac de ta ceinture et tu le jettes de toutes tes forces. Il tourne dans l’air, très haut, et tombe dans la mer.',
        'Un grand silence suit. Puis, sous la dalle, les cloches reprennent, d’un seul coup, comme si on leur avait retiré une main de la gorge.',
        'Tu as jeté la seule clé. Plus personne ne pourra refermer la porte : elle restera entrouverte à chaque grande marée.',
        'Tu cours vers la dune, et tes pas laissent des traces, que la mer efface aussitôt. Le charretier t’attend et ne dit rien.',
      ].join('\n'),
      aftermath:
        'Le sel ne revint jamais. Les années suivantes, les cloches sonnèrent à chaque grande marée, et les vieux apprirent aux enfants à ne pas compter les coups.',
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'sel-jete-a-la-mer',
            description:
              'Un sac de sel jeté à la mer, un soir de grande marée, et une porte qui ne pourra plus se fermer.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'sonner-la-cloche-de-la-chapelle',
      choiceText:
        'Courir à la chapelle de la dune et sonner la cloche pour couvrir celles d’Ys.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu cours. Le sable colle, retient, mais tu ne ralentis pas. La chapelle est blanche, au bout de la dune, sans lumière.',
        'Tu tires la corde, de toutes tes forces. La petite cloche sonne, grêle, ridicule, et les cloches d’Ys, dessous, la couvrent.',
        'Sur la grève, la personne est restée seule devant la dalle. Au troisième coup, elle crie : « Qui est là ? » Personne ne lui répond.',
        'Quand tu redescends, il ne reste que ses sabots, rangés côte à côte, et un petit morceau de bronze vert dans ta poche, tiède.',
      ].join('\n'),
      aftermath:
        'Les sabots restèrent sur la grève jusqu’à l’hiver, sans qu’on ose les ramasser. Depuis, la cloche de la chapelle sonne parfois toute seule, un coup de plus que les autres.',
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'chapelle-qui-couvre-les-cloches',
            label:
              'Une chapelle de dune dont la cloche répond, certains soirs, à une autre',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-de-la-grande-maree',
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
        'Tu dis que tu ne sais pas qui tu es. Que ce corps n’a pas de traces, et que tu ne te souviens pas de l’avoir habité.',
        'Personne ne rit. Les cloches se taisent. Quelqu’un recule jusqu’au pied de la dune, puis plus loin, vers les lumières du bourg.',
        'Le vieux, sur sa pierre, hoche la tête, comme on le fait pour une chose que l’on savait depuis longtemps.',
        'On te retire le sac de sel. Un autre ramassera le goémon, quelqu’un qui sait ce qu’il porte, et ce que la mer lui demande.',
        'Mais la porte, elle, ne sait pas qu’on a changé de gardien. Elle attend encore Nolig.',
      ].join('\n'),
      aftermath:
        'Un autre prit le panier à la grande marée suivante et ne sut pas poser le sel. La porte resta entrouverte, et Nolig, resté au bourg, regardait la mer chaque soir.',
      mutations: [],
    },
    {
      id: 'descendre-par-la-dalle',
      choiceText:
        'Tirer l’anneau de bronze, soulever la dalle et descendre dans la ville.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu tires l’anneau. La dalle se soulève sans effort, et un escalier de pierre claire descend dans la lumière, tiède, dorée.',
        'Tu descends. Les marches sont sèches. Au bas, une rue, des toits, des fenêtres allumées, et des cloches qui sonnent à petits coups.',
        'Des gens t’attendent, sans visage précis. Ils disent « Nolig », comme on appelle quelqu’un qu’on attend depuis un an.',
        'En haut, la dalle retombe. La mer passe dessus, tranquille. Sur le sable, il ne reste qu’un anneau vert et un grain de sel.',
      ].join('\n'),
      aftermath:
        'On chercha Nolig trois jours sur la grève, puis on cessa. À chaque grande marée, quelqu’un jurait avoir vu une lumière dorée sous le sable, et personne ne s’en approchait.',
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'ramasseur-descendu-a-ys',
            description:
              'Quelqu’un qui a descendu l’escalier d’Ys, un soir de grande marée.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

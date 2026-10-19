import type { Premise } from './types';

// Prémisse 7 : les cloches d'Ys. Une grève à marée basse, un soir d'équinoxe, devant la baie.
// L'hôte est un ramasseur de goémon resté sur le sable : on dit que, certains soirs, la ville d'Ys remonte
// sous les vagues et que ses cloches sonnent. Celui qui les entend sonner trois fois doit répondre.
// Inspirée de : la légende bretonne de la ville engloutie d'Ys et de sa princesse Dahut.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : ton reflet dans la flaque garde la bouche pleine d’eau de mer.
// - Corps hérité : tu as le goût du sel sur la langue en permanence, et tes pas ne laissent pas de trace.

const EPOCH =
  'une grève de la baie, un soir de grande marée, au temps du goémon et des charrettes';

export const premise07: Premise = {
  id: 'premise-07',
  title: 'Les cloches d’Ys',
  epoch: EPOCH,

  // Beat 1 : le sable, le vent, la mer qui s'est retirée trop loin. Aucune information.
  wakeup: [
    'Le noir sent le sel, la vase tiède et le goémon qui sèche. Dessous, une odeur de bronze mouillé, comme celle d’une vieille cloche.',
    'Tu écoutes. La mer, très loin, qui murmure et ne revient pas. Du sable qui boit l’eau. Des coquilles qui craquent sous un pas.',
    'Tu es debout, les pieds nus, dans une flaque tiède. Tu le sais aux orteils, enfoncés dans la vase, et au vent qui te lève les cheveux.',
    'Tes lèvres ont un goût de sel, épais, tenace, comme si tu avais bu la mer. Tu n’as pas soif. Tu n’as jamais soif.',
    'Tu cherches ton nom. Tu trouves un mot à la place : un son de bronze, grave, qui roule sous le sable et fait trembler tes genoux.',
    'À la ceinture, un sac de toile rêche, noué d’une ficelle, avec un grain de sel dedans. Tes doigts le serrent sans toi.',
    'Une charrette grince, loin derrière, sur la route de la dune. Elle s’est arrêtée. Quelqu’un attend là-haut, et ne descend pas.',
    'Au ras de l’eau, un oiseau de mer marche d’un pas raide, la tête tournée vers le large. Il ne cherche rien. Il écoute.',
    'Le vent change. Il porte un autre bruit, très loin, sous la mer : un seul coup de cloche, long, qui fait vibrer le sable.',
    'Un deuxième coup suit. Plus près, ou plus fort. Tu comptes sans le vouloir, et ta bouche s’ouvre sur un troisième que tu attends.',
    'Il n’y a pas de lune. Pourtant, la grève luit, d’un gris de coquillage, et chaque flaque garde un petit morceau de ciel.',
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
      text: 'À tes pieds, un panier de goémon, une fourche à trois dents, un râteau de bois. Le panier est lourd, mouillé, et il n’a pas l’odeur d’algues, mais de pierre.',
    },
    {
      kind: 'material',
      text: 'Sur le sable, à dix pas, une dalle carrée, usée, que la marée a dégagée. Elle porte un anneau de bronze vert, et le sable autour est lisse comme un seuil.',
    },
    {
      kind: 'bodily',
      text: 'Tu regardes derrière toi. Le sable est lisse. Tes pas ne laissent aucune trace, alors que ceux des autres, plus loin, s’enfoncent dans la vase.',
    },
    {
      kind: 'bodily',
      text: 'Tu te penches sur la flaque. Ton reflet te regarde, la bouche entrouverte et pleine d’eau, qui coule de ses lèvres sans jamais s’arrêter.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains sont gercées, rouges, durcies d’avoir tiré le goémon trop longtemps. Ce corps a ramassé cette grève toute sa vie, et elle le sait.',
    },
    {
      kind: 'social',
      text: 'Des ramasseurs rentrent avec leurs paniers, courbés, en silence. Quand ils passent près de toi, ils changent de côté, sans te saluer, sans te regarder.',
    },
    {
      kind: 'social',
      text: 'Un vieux, assis sur une pierre, tourne le dos à la mer. Il dit à son chien : « Ce soir, elle remonte. Compte avec moi, mon beau, et ne réponds pas. »',
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
        text: 'Quelqu’un descend de la dune, en sabots, la tête rentrée dans les épaules. Les sabots s’enfoncent, collent, puis claquent à chaque pas.',
      },
      {
        speaker: 'npc',
        text: 'Je t’ai cherché sur toute la grève. Le charretier part à la nuit, il ne t’attend plus. Remonte avec moi.',
      },
      {
        speaker: 'narration',
        text: 'La personne ne regarde pas la mer. Elle regarde la dalle au sol, l’anneau vert, puis tes pieds, et ils ne laissent pas de traces.',
      },
      {
        speaker: 'npc',
        text: 'Tu as entendu ? Dis-moi que tu n’as rien entendu. Une cloche, une seule, dans le sable.',
      },
      {
        speaker: 'npc',
        text: 'On ne les compte pas. Mon père disait : jamais à voix haute. À trois, elles demandent quelque chose.',
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
            text: 'Alors finis vite. La mer va revenir d’un coup. Elle fait ça, ici, quand on ne la regarde plus.',
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
            text: 'Qu’on ouvre. La porte, là, sous l’anneau. Dahut la gardait, dans le temps. Elle a laissé la clé à quelqu’un.',
          },
          {
            speaker: 'npc',
            text: 'À qui, on ne sait pas. Le vieux de la pierre dit que c’est à quelqu’un du bord. Quelqu’un comme toi.',
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
        text: '« J’ai déjà entendu les trois. Je sais ce qu’elles demandent. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Les trois ? Et tu es là, debout, avec ta bouche, et tes yeux ? Ce n’est pas possible.',
          },
          {
            speaker: 'narration',
            text: 'La voix s’est creusée. Elle a quitté l’inquiétude pour une peur nette, celle de quelqu’un qui sent le sol se dérober.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis à personne. Pas à la charrette, pas au recteur. Pas avant d’avoir compris pourquoi tu es seul.',
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
            text: 'Le métal est tiède, et il vibre. Sous ta paume, la dalle bat, très lent, comme un grand cœur couché sous le sable.',
          },
          {
            speaker: 'npc',
            text: 'Arrête. Ne tire pas dessus. Ce n’est pas une poignée, c’est une bouche.',
          },
          {
            speaker: 'narration',
            text: 'Tu as senti, dans le bronze, une petite encoche. Elle a la forme d’un doigt, le tien, comme si l’anneau t’attendait.',
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
          text: 'Elle revient. Elle va nous prendre les pieds. Il reste un coup. Un seul, et on saura.',
        },
        {
          speaker: 'narration',
          text: 'Sous la dalle, on entend maintenant plusieurs cloches à la fois, graves et claires, comme une ville entière qui s’éveille.',
        },
        {
          speaker: 'narration',
          text: 'Les flaques se remplissent, l’une après l’autre, d’une eau plus noire. Elles montent vers tes chevilles, sans vague, sans vent.',
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
          text: '« La clé de la porte. Où Dahut l’a-t-elle laissée ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Le vieux dit : au cou de celui qui sale encore la mer. Il fait un signe vers ton sachet, sans le nommer.',
            },
            {
              speaker: 'npc',
              text: 'Mais ce n’est pas une clé, c’est ce qu’il y a dedans. Ne le dis pas devant la charrette. Elle écoute aussi.',
            },
            {
              speaker: 'narration',
              text: 'Elle ajoute plus bas : « Et ne l’ouvre pas avant le troisième coup. Pas avant. »',
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
          id: 'regarder-leau',
          kind: 'informative',
          text: '« Regarde l’eau des flaques. Qu’y a-t-il dedans ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Du ciel. Des nuages. Rien d’autre.',
            },
            {
              speaker: 'narration',
              text: 'La personne a répondu trop vite. Elle se penche, puis recule, la main sur la bouche, et ne dit plus rien.',
            },
            {
              speaker: 'npc',
              text: 'Il y a des toits dedans, des tours. Une ville, à l’envers, qui a ses fenêtres allumées.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le sel est la clé ; la dalle est une porte.
  investigation: [
    {
      kind: 'material',
      text: 'Dans la vase, à côté de la dalle, quelque chose de lourd et de froid, enveloppé dans une toile de lin. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tu poses la langue contre ton palais. Le sel y est dur comme une pierre, un cristal, une clé. Tu comprends qu’il ne vient pas de la mer, mais de toi.',
      revealsTruth: 'le-sel-est-la-cle',
    },
    {
      kind: 'material',
      text: 'Autour de la dalle, des petits trous dans le sable, en cercle. Des pieds nus ont dansé là, en ronde, pendant des années.',
    },
    {
      kind: 'material',
      text: 'Sur l’anneau, entre les écailles vertes, des lettres presque effacées. Tu en reconnais une : celle que tu tenais en rêve, la première.',
    },
    {
      kind: 'social',
      text: 'Le vieux assis sur la pierre se retourne enfin. Il te regarde, puis il dit très bas : « Elle n’a pas fermé la porte. On l’a oubliée ouverte. »',
      revealsTruth: 'la-porte-est-ouverte',
    },
    {
      kind: 'social',
      text: 'Le charretier, sur la dune, a levé son fouet sans frapper. Il regarde la mer, puis toi, puis le chapelet sur son genou.',
    },
    {
      kind: 'social',
      text: 'Une femme, qui remonte avec son panier, murmure à son fils : « Ne le regarde pas. C’est celui qu’elles appellent, ce soir. »',
    },
    {
      kind: 'social',
      text: 'Un enfant, en haut de la dune, agite la main dans ta direction. Il a un petit sachet de sel au cou. On le rappelle d’une voix sèche.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Sur cette grève ouverte, il devrait cogner. Ce corps vit au ralenti, comme un coquillage.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve, dans ta paume, une brûlure ancienne en forme de croix. Le bronze d’un anneau l’a laissée, il y a bien longtemps.',
    },
    {
      kind: 'material',
      text: 'Un peu plus loin, un râteau est planté droit dans le sable, comme une borne. Au bout du manche, quelqu’un a noué un ruban de laine rouge.',
    },
    {
      kind: 'material',
      text: 'Dans une flaque, une pièce de monnaie très ancienne brille au fond. Elle porte un visage de femme, la bouche close, et une couronne de coquillages.',
    },
    {
      kind: 'social',
      text: 'Un pêcheur, assis dans sa barque échouée, chante en breton une complainte. Le refrain revient sans cesse : « Ys, Ys, la porte est à moi. »',
    },
    {
      kind: 'bodily',
      text: 'Tes dents claquent sans que tu aies froid. Une peur très ancienne, qui n’est pas la tienne, remonte de tes jambes jusqu’à ta gorge.',
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
          text: 'Tu le comprends d’un seul coup. Dahut a laissé sa porte ouverte, et la clé, c’est ce sel que tu portes depuis toujours.',
        },
        {
          speaker: 'npc',
          text: 'Si tu refermes la porte avec ton sel, la ville dort. Si tu la laisses, elle remonte, et nous avec elle.',
        },
        {
          speaker: 'narration',
          text: 'La mer est à vingt pas. Tu sens dans ta bouche le goût dur du sel, lourd comme une pièce, comme un serment.',
        },
        {
          speaker: 'narration',
          text: 'Si tu l’avales, tu es la clé. Si tu le jettes, la porte reste ouverte, et quelqu’un d’autre en paiera le prix.',
        },
      ],
    },
    {
      requires: ['le-sel-est-la-cle'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le sel sur ta langue se met à chanter, d’une note aiguë qui répond aux cloches sous la dalle. Tu sens qu’il va t’échapper.',
        },
        {
          speaker: 'narration',
          text: 'Alors la dalle tremble. L’anneau de bronze se tourne seul, d’un quart de tour, vers ta bouche, comme une serrure vers sa clé.',
        },
        {
          speaker: 'narration',
          text: 'La mer, à vingt pas, retient son souffle. Tu n’as pas assez regardé pour savoir ce qu’elle fera si tu ouvres.',
        },
      ],
    },
    {
      requires: ['la-porte-est-ouverte'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le vieux est descendu de sa pierre. Il marche vers toi sur le sable, sans enfoncer le pied, avec un sac de toile dans la main.',
        },
        {
          speaker: 'npc',
          text: 'Prends. C’est du sel de l’an dernier. Il ne vaut plus rien pour la mer, mais il vaut quelque chose pour la porte.',
        },
        {
          speaker: 'narration',
          text: 'Il repart sans attendre ta réponse. Au loin, la mer a recommencé à monter, d’un pas régulier, en comptant.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Les flaques se rejoignent, et la grève n’est plus qu’une seule nappe noire, où les étoiles descendent une à une.',
        },
        {
          speaker: 'narration',
          text: 'Tu n’as pas assez regardé pour savoir pourquoi. Mais, sous tes pieds, la dalle s’est mise à battre au rythme de ton cœur.',
        },
        {
          speaker: 'narration',
          text: 'Au loin, la cloche sonne un coup, bas, qui monte de la mer. Il va être l’heure de répondre, et tu n’es pas prêt.',
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
          text: 'La personne a suivi le geste. Elle étouffe un cri. « Tu fais le signe. Celui du sel et de la porte. »',
        },
        {
          speaker: 'npc',
          text: 'Mon père le faisait, avant de mourir. Dis-moi que tu sais ce que tu fais. Dis-le, même si tu mens.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'le-sel-est-la-cle',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main s’ouvre, tire sur ton sachet de toile, et prend le grain de sel entre deux doigts. Elle le porte à ta bouche, sans hésiter.',
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

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'refermer-la-porte',
      requiresAny: ['le-sel-est-la-cle', 'la-porte-est-ouverte'],
      choiceText:
        'Poser ton sel sur la serrure de bronze et refermer la porte d’Ys, avant que la mer ne revienne.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu t’agenouilles devant la dalle. Tu poses ton grain de sel dans l’encoche en forme de doigt, et tu dis tout bas : « Dors. »',
        'L’anneau tourne d’un quart de tour. La dalle s’abaisse, avec le bruit d’une grande porte qu’on ferme à la main, sans colère.',
        'Les cloches se taisent, une à une. La mer arrive, calme, sur un sable plat, et la grève redevient une grève.',
        'Quand tu te retournes, tes pas laissent des traces. Elles s’enfoncent dans la vase, comme celles de tout le monde.',
        'Le lendemain, le charretier t’attend, un pain à la main. Sur la dalle, un petit tas de sel brille, au soleil, et la mer l’a laissé.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'la-porte-dys-est-refermee',
            summary:
              'Celui qui ramassait le goémon a refermé la porte d’Ys avec son sel, et les cloches se sont tues.',
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
        'Derrière toi, la personne crie ton nom, puis se tait. La mer est là, et elle est tiède comme un souffle.',
        'Au matin, on retrouve ton panier sur le sable, plein d’un goémon blanc que personne n’a jamais vu pousser ici.',
      ].join('\n'),
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
        'Tu arraches le sachet de ton cou et tu le jettes de toutes tes forces. Il tourne dans l’air, très haut, et tombe dans la mer.',
        'Un grand silence suit. Puis, sous la dalle, les cloches reprennent, d’un seul coup, comme si on leur avait retiré une main de la gorge.',
        'La mer se précipite sur la grève. Tu cours vers la dune, et tes pas, enfin, laissent des traces, qu’elle efface aussitôt.',
        'Sur la route, le charretier t’a attendu. Il ne dit rien. Il te tend une couverture, puis il regarde longtemps l’eau monter.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'sel-jete-a-la-mer',
            description:
              'Un sachet de sel jeté à la mer, un soir de grande marée, et une porte qui n’a jamais été fermée.',
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
        'Quand tu redescends, la grève est noire d’eau, et la personne a disparu. Il ne reste que ses sabots, rangés côte à côte.',
        'Dans ta poche, tu trouves un petit morceau de bronze vert. Il est tiède, et il ne sonne pas.',
      ].join('\n'),
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
        'On te retire le sachet de sel. Un autre ramassera le goémon, quelqu’un qui sait ce qu’il porte, et ce que la mer lui demande.',
      ].join('\n'),
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
        'Des gens t’attendent, sans visage précis, avec des sourires de gens qui ont attendu longtemps. Ils disent ton nom, sans l’accent d’ici.',
        'En haut, la dalle retombe. La mer passe dessus, tranquille. Sur le sable, il ne reste qu’un anneau vert et un grain de sel.',
      ].join('\n'),
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

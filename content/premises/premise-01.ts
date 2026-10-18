import type { Premise } from './types';

// Prémisse 1 : le premier saut, qui sert de tutoriel. Un hiver sans électricité, un village
// coupé du monde, et un gardien qui distribue l'huile des lampes.
//
// Conventions de ce fichier (voir content/README.md) :
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le générateur tire les deux ;
// - dans une mutation, `characterId` « 0 » ou « 1 » est lui aussi un emplacement ;
// - une trace d'objet utilise `artifactId: 'leap'` ; l'élément d'enquête qui `revealsArtifact` ne
//   s'affiche que si le saut propose un objet.

export const premise01: Premise = {
  id: 'premise-01',
  title: 'La réserve d’huile',
  epoch: 'un hiver sans électricité',

  // Beat 1 : réveil sensoriel, zéro information. C'est l'échantillon validé de VOIX.md.
  wakeup: [
    'Le noir n’est pas tout à fait noir. Une lueur rouge traverse tes paupières et bat au rythme de ton cœur.',
    'Tu ne bouges pas. Tu écoutes. Une goutte tombe quelque part, loin, puis une autre. Entre les deux, le silence s’étire.',
    'L’air a un goût de cendre froide et de résine. Sous ton dos, quelque chose de dur et de plat craque quand tu respires.',
    'Il fait froid. C’est un froid qui monte du sol et entre par les coudes. Quelque part, un chien aboie une fois, puis se tait.',
    'Tu ouvres la bouche. Ta langue est sèche. Tu cherches un mot et tu n’en trouves aucun. Pas même ton nom.',
    'Ta main droite glisse sur une étoffe rêche. Elle est large, calleuse. Tu ne la reconnais pas.',
    'Au-dessus de toi, une planche grince. Des pas. Quelqu’un s’arrête et ne dit rien.',
    'Une odeur de lait tourné flotte quelque part. Elle ne vient pas de la pièce. Elle vient de ce corps, de ses vêtements, de sa peau.',
    'Tu essaies de te rappeler une chose. Une seule. Le visage d’un parent, un trajet, un jour de la semaine. Rien ne répond.',
    'Tu avales. Ta gorge fait un bruit sec. Tu sais, sans savoir comment, que tu as déjà avalé ainsi bien des matins.',
    'La planche, au-dessus, grince encore. Quelqu’un descend un escalier de bois, marche après marche, avec la lenteur de ceux qui portent un poids.',
  ].join('\n\n'),

  // Beat 2 : orientation. Trois natures d'indice au moins, avant tout contact.
  orientation: [
    {
      kind: 'material',
      text: 'Une lampe à huile éteinte, sur la table. Le verre est noir de suie. À côté, un trousseau de clés : une seule brille.',
    },
    {
      kind: 'material',
      text: 'Par la fenêtre, de la neige jusqu’aux toits. Aucune fumée ne monte des cheminées, sauf une. Aucun fil ne traverse le ciel.',
    },
    {
      kind: 'bodily',
      text: 'Le bout de ton auriculaire gauche manque. La plaie est ancienne, lisse, sans douleur. Tes mains sont gercées jusqu’au poignet.',
    },
    {
      kind: 'bodily',
      text: 'Tu as faim, mais c’est une faim habituée. Ce corps mange peu depuis longtemps.',
    },
    {
      kind: 'social',
      text: 'Une feuille est clouée au mur. Des noms, des traits à l’encre. En haut, une ligne soulignée : « Gardien de la réserve ».',
    },
    {
      kind: 'material',
      text: 'Sur le rebord de la fenêtre, une rangée de pots de verre vides. Chacun porte une étiquette de papier, un nom, une date effacée.',
    },
    {
      kind: 'bodily',
      text: 'Ton souffle fait de la buée. Tu comptes tes respirations sans le vouloir : douze, puis douze encore. Ce corps compte tout.',
    },
    {
      kind: 'social',
      text: 'Un manteau de laine pend à un clou. Sur la manche, un morceau d’étoffe rouge recousu à la main. Quelqu’un a pris soin de ce vêtement.',
    },
  ],

  // Beat 3 : premier contact. Le PNJ de l'emplacement « 0 » entre. Le choix risqué révèle trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'On frappe deux fois. La porte s’ouvre avant que tu répondes. Le froid entre avec quelqu’un.',
      },
      { speaker: 'npc', text: 'Tu es levé. Bien. Ils sont déjà tous devant la réserve.' },
      {
        speaker: 'narration',
        text: 'Elle secoue la neige de ses bottes sur le seuil. Ses gestes sont vifs, mais ses yeux sont cernés de gris.',
      },
      {
        speaker: 'npc',
        text: 'C’est jour de partage. Les familles attendent depuis l’aube. Les Morel sont venus à pied de la ferme du haut.',
      },
      {
        speaker: 'npc',
        text: 'J’ai dit à tout le monde que tu serais à l’heure. Tu l’es toujours. Alors, tu as la clé ?',
      },
      {
        speaker: 'narration',
        text: 'Elle tend la main, sans y penser, comme on le fait avec quelqu’un en qui on a confiance. Puis elle la laisse retomber.',
      },
      {
        speaker: 'narration',
        text: 'Dehors, une voix d’homme appelle un nom, et ce nom est peut-être le tien. Personne ne répond.',
      },
    ],
    choices: [
      {
        id: 'attendre',
        kind: 'neutral',
        text: '« J’arrive. Laisse-moi un instant. »',
        reply: [
          { speaker: 'npc', text: 'D’accord. Ne tarde pas. Les enfants ont froid.' },
          {
            speaker: 'narration',
            text: 'La porte reste entrouverte derrière elle. Tu entends des voix, dehors, qui patientent.',
          },
          {
            speaker: 'npc',
            text: 'Et prends le manteau rouge. On te reconnaît à ce manteau.',
          },
          {
            speaker: 'narration',
            text: 'Elle sort. Un courant d’air froid passe sur ta nuque et fait vaciller la lampe éteinte, comme si elle respirait.',
          },
        ],
      },
      {
        id: 'demander',
        kind: 'informative',
        text: '« Rappelle-moi comment se passe le partage. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu ouvres la réserve. Tu mesures une part par famille. Tu notes sur la feuille. Comme chaque semaine.',
          },
          {
            speaker: 'narration',
            text: 'Elle te dévisage une seconde de trop. Puis elle hausse les épaules.',
          },
          {
            speaker: 'npc',
            text: 'Tu as la tête ailleurs, ce matin. Dors un peu, cette nuit. Si tu peux.',
          },
          {
            speaker: 'narration',
            text: 'Elle dit cela avec douceur. Pourtant, ses doigts se sont crispés sur le montant de la porte.',
          },
        ],
      },
      {
        id: 'avouer-la-clé',
        kind: 'risky',
        text: '« Je ne sais pas où est la clé. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu ne sais pas… Tu ne la quittes jamais, d’habitude.',
          },
          {
            speaker: 'narration',
            text: 'Sa voix a changé. Elle compte tes mots, un par un, comme on compte des pièces.',
          },
          {
            speaker: 'npc',
            text: 'Regarde dans tes poches. Regarde sous le lit. Tu dois bien l’avoir quelque part.',
          },
          {
            speaker: 'narration',
            text: 'Elle sourit, mais ce n’est pas un vrai sourire. Elle guette ta réponse comme on guette un pas sur la glace.',
          },
        ],
      },
      {
        id: 'prendre-le-trousseau',
        kind: 'neutral',
        text: 'Ne rien dire et prendre le trousseau.',
        reply: [
          {
            speaker: 'narration',
            text: 'Le métal est glacé. Tes doigts se referment seuls sur la clé qui brille.',
          },
          { speaker: 'npc', text: 'Voilà. Je t’attends dehors.' },
          {
            speaker: 'narration',
            text: 'Elle hésite sur le seuil, comme si elle voulait ajouter un mot. Elle ne l’ajoute pas. La porte se referme.',
          },
          {
            speaker: 'narration',
            text: 'Le trousseau pèse dans ta paume. Six clés. Une seule est lisse, usée par des années de pouces.',
          },
        ],
      },
    ],
  },

  // Beat 4 : enquête. Des indices croisés : chacun éclaire les autres.
  investigation: [
    {
      kind: 'material',
      text: 'Sous le lit, un coffre. Un chiffon plié couvre quelque chose. Tu le soulèves, et ta main ne tremble pas.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tu soulèves le couvercle de la réserve. Tes bras connaissent le geste. Ils savent aussi que le bidon est trop léger.',
      revealsTruth: 'reserve-presque-vide',
    },
    {
      kind: 'material',
      text: 'La serrure de la réserve porte des rayures neuves. Quelqu’un a essayé de l’ouvrir de force, cette nuit ou la précédente.',
    },
    {
      kind: 'social',
      text: 'Dans le cahier, la dernière ligne est de ta main. Les chiffres ne sont pas ceux de la semaine passée.',
      revealsTruth: 'cahier-modifie',
    },
    {
      kind: 'social',
      text: 'Un enfant te tire par la manche. Il dit que sa mère n’a rien reçu depuis deux semaines. Il ne pleure pas.',
    },
    {
      kind: 'bodily',
      text: 'Une femme tousse, tout près. Elle te regarde comme on regarde quelqu’un qui doit quelque chose.',
    },
    {
      kind: 'material',
      text: 'Dans le fond de la réserve, des bidons alignés. Quatre portent une croix à la craie. Les croix sont fraîches, et ce n’est pas ta main qui les a tracées.',
    },
    {
      kind: 'social',
      text: 'Un vieil homme reste à l’écart, les mains dans les manches. Quand tu croises son regard, il hoche la tête une fois, comme pour dire qu’il sait.',
    },
    {
      kind: 'bodily',
      text: 'Tes jambes tremblent au moment de franchir le seuil de la réserve. Ce corps a peur de cette porte, et il ne te dit pas pourquoi.',
    },
  ],

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-01', 'fracture-02'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'ouvrir-devant-tous',
      requiresAny: ['reserve-presque-vide', 'cahier-modifie'],
      choiceText: 'Ouvrir la réserve devant tout le village.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu ouvres la réserve devant tous. Le bidon sonne creux, et personne ne parle.',
        'Puis une femme pose sa propre lampe sur la table. D’autres la suivent.',
        'Il restera peu d’huile cet hiver. Mais ce soir, plus personne ne compte dans le noir.',
        'Le vieil homme s’approche et te serre le bras sans un mot. Sa main tremble, et la tienne aussi.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'reserve-ouverte',
            label: 'La réserve, ouverte à tous',
            openedInLeap: '',
            epoch: 'un hiver sans électricité',
          },
        },
        {
          type: 'addTruth',
          truth: {
            id: 'village-sait',
            summary: 'Le village connaît l’état réel de la réserve.',
            leapId: '',
          },
        },
      ],
    },
    {
      id: 'corriger-le-cahier',
      requiresAny: ['cahier-modifie'],
      choiceText: 'Corriger les chiffres et distribuer comme avant.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu corriges le cahier. Tu distribues une mesure par famille.',
        'Personne ne conteste. L’enfant te regarde longtemps, puis il s’en va.',
        'La réserve tiendra trois jours de moins que prévu. Tu es seul à le savoir.',
        'Le soir, tu allumes ta lampe. Sa flamme est trop haute pour l’huile qui reste. Tu la baisses, puis tu la souffles.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'mensonge-maintenu',
            description: 'Un mensonge maintenu pour garder le calme.',
            leapId: '',
            epoch: 'un hiver sans électricité',
          },
        },
      ],
    },
    {
      id: 'donner-ta-part',
      requiresAny: ['reserve-presque-vide'],
      choiceText: 'Donner ta propre part et te taire.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu vides ta ration dans la jarre de l’enfant. Tu ne dis pas pourquoi.',
        'La personne qui t’a réveillé comprend, ou croit comprendre. Elle ne te regarde plus pareil.',
        'La réserve ne s’est pas remplie. Mais quelqu’un a mangé ce soir.',
        'Cette nuit, ton ventre gronde sous le manteau rouge. Tu écoutes ce bruit comme on écoute une promesse.',
      ].join('\n'),
      mutations: [
        {
          type: 'addPerson',
          person: {
            id: 'celui-qui-a-frappé',
            characterId: '0',
            status: 'changed',
            leapId: '',
            epoch: 'un hiver sans électricité',
          },
        },
      ],
    },
    {
      id: 'partir-avant-laube',
      choiceText: 'Prendre le trousseau et quitter le village avant l’aube.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends le trousseau. Tu glisses dans ta poche ce que tu peux emporter.',
        'La neige efface tes pas derrière toi, un à un.',
        'Au matin, les familles attendront devant une porte close. Toi, tu seras déjà loin.',
        'Derrière une crête, tu te retournes. Une seule cheminée fume au village. Tu ne sais pas si tu l’as laissée allumée.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'route-du-nord',
            label: 'La route du nord, restée ouverte',
            openedInLeap: '',
            epoch: 'un hiver sans électricité',
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-emporté',
            artifactId: 'leap',
            fromLeap: '',
            toLeap: null,
          },
        },
      ],
    },
    {
      id: 'dire-la-verite',
      choiceText: 'Dire que tu ne sais pas qui tu es.',
      outcome: 'exposed',
      fractureRepaired: false,
      resultText: [
        'Tu dis que tu ne sais pas qui tu es. Le silence dure.',
        'Quelqu’un rit, et ce rire n’est pas amical.',
        'On te prend le trousseau. Dans ton dos, la porte se ferme sur ce corps qui n’est pas le tien.',
        'Quelqu’un te met une couverture sur les épaules. Ce geste est le plus doux de la journée, et le plus dur à supporter.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'marcher-dans-la-neige',
      choiceText: 'Sortir seul dans la neige chercher de l’huile ailleurs.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu marches jusqu’à ce que les arbres se ressemblent tous.',
        'Le froid entre dans tes os, sans bruit. Tes jambes cessent de t’appartenir.',
        'La dernière chose que tu entends est un chien, très loin, qui aboie une fois.',
        'Puis la neige, qui tombe sur tes paupières, une à une, comme des doigts qui les ferment.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'corps-dans-la-neige',
            description: 'Un corps retrouvé dans la neige, sans explication.',
            leapId: '',
            epoch: 'un hiver sans électricité',
          },
        },
      ],
    },
  ],
};

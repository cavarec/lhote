import type { Premise } from './types';

// Prémisse 2 : un jour de pardon, dans une ville de pierre. Un prêtre doute au moment de porter
// la chasse en procession. Inspirée de : la foi qui guérit et la vérité qui blesse.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : un autre te regarde (« tu as une drôle de tête aujourd'hui »).
// - Corps hérité : la fièvre. Elle retire « reste calme » et ajoute « appuie-toi ». Elle explique
//   aussi pourquoi l'hôte ne se souvient pas de la nuit.

const EPOCH = 'un jour de pardon, au tournant du siècle';

export const premise02: Premise = {
  id: 'premise-02',
  title: 'Le jour du pardon',
  epoch: EPOCH,

  // Beat 1 : l'encens, la cire, la chaleur de la fièvre. Aucune information.
  wakeup: [
    'Il fait chaud et il fait froid. La chaleur est dans ta tête, le froid dans tes os. Les deux ne se parlent pas.',
    'Tu sens de l’encens, de la cire chaude, de la pierre mouillée. Une odeur de lin amidonné, aussi, très près de ton visage.',
    'Dehors, une foule respire. Des milliers de pieds sur des pavés, des toux, des enfants qu’on fait taire. Un chant monte et retombe.',
    'Au-dessus, des cloches. Elles ne sonnent pas ensemble. L’une a de l’avance, l’autre du retard. Elles se rattrapent, puis se perdent.',
    'Une bombarde aiguë reprend le même air, encore et encore. Un air qui n’a pas de fin, rien que des reprises.',
    'Ta langue colle à ton palais. Tu as soif d’une soif de plusieurs jours, qui ne se dit pas, qui se supporte.',
    'Tu cherches ce que tu as fait cette nuit. Tu ne trouves rien. Rien qu’un blanc propre, lavé, comme un linge.',
    'Tes genoux te font mal. Pas d’une douleur de marche : d’une douleur d’avoir tenu longtemps la même position.',
    'Tu serres quelque chose de froid dans le poing. Du métal, avec des dents. Tu ne sais pas depuis quand.',
    'On frappe deux fois à une porte de bois épais. Une voix dit un mot que tu reconnais. Elle ne dit pas ton nom. Elle dit ton titre.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, la fièvre, l'absence de miroir.
  orientation: [
    {
      kind: 'material',
      text: 'Une sacristie voûtée, aux murs nus. Sur la table, une chasse d’argent ternie, grande comme un pain, fermée. Autour, des cierges, un encensoir, une chape pliée.',
    },
    {
      kind: 'material',
      text: 'Par la fenêtre, une place pleine : bannières brodées, coiffes blanches, pèlerins à genoux. Au loin, deux flèches de pierre taillées dans un ciel pâle.',
    },
    {
      kind: 'material',
      text: 'Dans ton poing, une clé de fer à tête ronde. Elle est tiède. Au cou, une chaîne la retient, et elle a laissé sa marque dans la paume.',
    },
    {
      kind: 'bodily',
      text: 'Ta chemise colle à ton dos. Tes dents claquent par instants. Une fièvre de plusieurs jours, qui s’est installée et ne bouge plus.',
    },
    {
      kind: 'bodily',
      text: 'Tu touches ton visage. Une barbe de deux jours, des joues brûlantes. Tu cherches un miroir. Il n’y en a pas : on n’en met pas dans une sacristie.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains sont longues, soignées, tachées de cire. Ce sont des mains qui bénissent. Elles ont tremblé cette nuit, et la cire a coulé dessus.',
    },
    {
      kind: 'social',
      text: 'Sur la porte, une feuille épinglée : l’ordre de la procession, les noms des porteurs. En bas, une ligne soulignée : « La chasse : le recteur. »',
    },
    {
      kind: 'social',
      text: 'Le murmure de la foule monte par la fenêtre. Quand tu t’y montres, il se tait. Mille visages se lèvent vers toi, puis se baissent.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 1 » entre. Le choix risqué avoue le doute.
  openingDialogue: {
    npcId: '1',
    lines: [
      {
        speaker: 'narration',
        text: 'La porte s’ouvre à demi. Une silhouette entre, tient la porte avec le dos, comme pour empêcher quelqu’un de la suivre.',
      },
      {
        speaker: 'npc',
        text: 'Tu as une drôle de tête, aujourd’hui, recteur. Tu as dormi ?',
      },
      {
        speaker: 'narration',
        text: 'La personne te regarde longtemps. Elle cherche sur ton visage quelque chose qu’elle n’y trouve pas.',
      },
      {
        speaker: 'npc',
        text: 'Ils sont tous sur la place. Les porteurs attendent. Tout le monde attend la chasse.',
      },
      {
        speaker: 'npc',
        text: 'Il y a une femme du haut, avec son petit qui ne marche plus. Elle a fait la route à genoux. Elle dit que tu sais pourquoi.',
      },
      {
        speaker: 'narration',
        text: 'La personne regarde la chasse, sur la table. Son regard glisse dessus et s’en détourne, vite.',
      },
      {
        speaker: 'npc',
        text: 'J’ai vu de la lumière sous cette porte, cette nuit. Très tard. Je n’ai pas frappé.',
      },
      {
        speaker: 'narration',
        text: 'Dehors, les cloches se rejoignent un instant, puis s’éloignent. Tu entends ton cœur dans tes tempes.',
      },
    ],
    choices: [
      {
        id: 'prendre-la-chape',
        kind: 'neutral',
        text: '« Je suis prêt. Donne-moi la chape. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Bien. Tiens-toi à mon bras en descendant. Tu chancelles.',
          },
          {
            speaker: 'narration',
            text: 'La chape est lourde, brodée de fils d’or qui accrochent. Elle sent le camphre et le temps.',
          },
          {
            speaker: 'narration',
            text: 'Tu la passes sur tes épaules. Elle te redresse. Pas ton esprit : ton dos.',
          },
        ],
      },
      {
        id: 'demander-la-nuit',
        kind: 'informative',
        text: '« Qu’as-tu vu cette nuit, au juste ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Une lueur de cierge sous la porte. Des pas, de long en large, jusqu’à l’aube. Puis plus rien.',
          },
          {
            speaker: 'npc',
            text: 'À un moment, j’ai cru t’entendre parler. Pas à moi. À quelqu’un d’autre.',
          },
          {
            speaker: 'narration',
            text: 'La personne se mord l’intérieur de la joue. Elle ne te quitte pas des yeux.',
          },
        ],
      },
      {
        id: 'avouer-le-doute',
        kind: 'risky',
        text: '« Je ne crois plus à ce qu’elle contient. »',
        reply: [
          { speaker: 'npc', text: 'Tu… Tu ne peux pas dire ça. Pas aujourd’hui.' },
          {
            speaker: 'narration',
            text: 'La personne recule d’un pas, la main sur le chambranle. Dans ses yeux, de la peur, et autre chose qui ressemble à du soulagement.',
          },
          {
            speaker: 'npc',
            text: 'Redis-le-moi quand ils seront partis. Pas avant. Pas devant eux.',
          },
        ],
      },
      {
        id: 'prier-un-instant',
        kind: 'neutral',
        text: '« Laisse-moi un instant. Je dois prier. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Un instant. Pas plus. La femme du haut ne tiendra pas.',
          },
          {
            speaker: 'narration',
            text: 'La porte se referme. Tu restes devant la table. Tes lèvres bougent. Tu ne sais pas quelles paroles elles prononcent.',
          },
          {
            speaker: 'narration',
            text: 'Un mot revient, toujours le même. Ce n’est pas une prière. C’est un nom que tu ne connais pas.',
          },
        ],
      },
    ],
  },

  // Beat 4 : enquête. La chasse a été ouverte cette nuit ; quelqu'un l'a vu.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le tiroir de la table, sous les nappes d’autel, un petit paquet noué d’une ficelle. Il est lourd et froid. Ta main ne tremble pas en le défaisant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Ta clé entre dans la serrure de la chasse sans résistance. Elle a l’habitude de ce geste. Le cuivre est usé là où tes doigts reposent : tu l’as ouverte cette nuit.',
      revealsTruth: 'tu-as-ouvert-la-chasse',
    },
    {
      kind: 'material',
      text: 'Sur le bord de la chasse, des éclats de cire rouge brisée. Le sceau a été rompu, puis recollé avec de la salive et du pouce.',
    },
    {
      kind: 'material',
      text: 'Trois cierges, consumés jusqu’au bout, au pied de l’autel. Quelqu’un a veillé ici, longtemps, et n’a pas voulu qu’on le voie.',
    },
    {
      kind: 'social',
      text: 'Le sacristain, ou celui qui en tient lieu, évite ton regard. Quand tu approches de la chasse, il retient son souffle.',
      revealsTruth: 'sacristain-a-vu',
    },
    {
      kind: 'social',
      text: 'Une vieille, sur le seuil, te tend un cierge sans rien dire. Elle te regarde comme on regarde quelqu’un qui va tomber.',
    },
    {
      kind: 'social',
      text: 'Par la fenêtre, tu vois la femme du haut. Elle porte un enfant sur le dos, trop grand pour être porté. Elle ne pleure pas. Elle attend.',
    },
    {
      kind: 'bodily',
      text: 'Tu poses la main sur la pierre froide du mur. La fièvre recule un instant. Tu comprends qu’elle revient dès que tu t’en détaches.',
    },
    {
      kind: 'bodily',
      text: 'Tes genoux portent l’empreinte du dallage : deux marques rouges, profondes. Tu as prié ici toute la nuit, à genoux, sans arrêt.',
    },
    {
      kind: 'bodily',
      text: 'Un goût de cire et de larmes sèches reste sur tes lèvres. Tu as pleuré cette nuit, longtemps, sans te l’avouer.',
    },
  ],

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-03', 'fracture-04'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'porter-la-chasse-ouverte',
      requiresAny: ['tu-as-ouvert-la-chasse', 'sacristain-a-vu'],
      choiceText: 'Porter la chasse ouverte en tête de la procession.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu sors sur la place, la chasse ouverte dans les mains. Un murmure traverse la foule, puis un silence.',
        'Certains se détournent. D’autres s’approchent. La femme du haut pose sa main dans la chasse et dit : « C’est chaud. »',
        'Personne ne sait ce qu’il voit. Personne ne demande. La procession se met en marche, et ce n’est plus la même.',
        'Le soir, ta fièvre tombe. Quelqu’un a laissé un cierge allumé devant ta porte.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'la-chasse-a-ete-ouverte',
            summary: 'La foule a vu l’intérieur de la chasse, et personne ne l’a dit.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celui-qui-portait-la-clef',
            characterId: '1',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'refermer-et-mener',
      requiresAny: ['tu-as-ouvert-la-chasse'],
      choiceText: 'Refermer la chasse, la sceller de nouveau et mener la procession.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu refermes la chasse. La cire rouge coule, se fige, prend ton empreinte. Tu ne trembles plus.',
        'Tu marches en tête, la chape sur le dos. La foule chante. Elle chante juste, comme si de rien n’était.',
        'La femme du haut te touche la manche au passage. Son petit ne marche pas, mais il sourit.',
        'Le soir, tu ne dors pas. Tu sais ce que contient la chasse. Tu es le seul à le savoir.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'chasse-scellee-sur-un-secret',
            description: 'Une chasse scellée de nouveau sur ce qu’elle cachait.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'parler-au-sacristain',
      requiresAny: ['sacristain-a-vu'],
      choiceText: 'Prendre le sacristain à part et lui parler avant la procession.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu fermes la porte. Tu poses la main sur l’épaule du sacristain. Il ne bouge pas.',
        'Il dit : « J’ai vu, recteur. Je n’ai rien vu. » Il répète la phrase, comme une prière à l’envers.',
        'La procession part sans l’un ni l’autre. On entend la foule s’éloigner, puis les cloches se taire une à une.',
      ].join('\n'),
      mutations: [
        {
          type: 'addPerson',
          person: {
            id: 'le-sacristain-qui-sait',
            characterId: '1',
            status: 'changed',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'jeter-la-clef',
      choiceText: 'Descendre à la rivière et jeter la clé de la chasse dans l’eau.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu descends par la ruelle. La rivière est basse, verte, indifférente aux fêtes.',
        'Tu arraches la chaîne. La clé disparaît sans bruit. Tes mains ne tremblent plus, et c’est ce qui t’inquiète.',
        'Là-haut, les cloches sonnent une dernière fois. La procession part sans chasse, et personne n’ose dire pourquoi.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'clef-dans-la-riviere',
            label: 'Une chasse que plus personne ne peut ouvrir',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-de-la-riviere',
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
        'Le silence qui suit est plus lourd que la chape. Quelqu’un se signe. Quelqu’un pleure.',
        'On t’emmène dans une chambre, en parlant bas. On te donne de l’eau, des draps, une chaise. On te retire la clé.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'monter-au-clocher',
      choiceText: 'Monter au clocher regarder la ville et la foule avant de décider.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu montes l’escalier de pierre, marche après marche. La fièvre te serre les tempes.',
        'Là-haut, la ville est un damier de toits et de bannières. La foule est un fleuve lent, qui attend.',
        'Tu t’appuies à la balustrade. Elle est plus basse que tu ne croyais. Le ciel est très proche.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'recteur-tombe-du-clocher',
            description: 'Un prêtre tombé du clocher, un jour de pardon.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

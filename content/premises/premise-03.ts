import type { Premise } from './types';

// Prémisse 3 : le chef de train. Une nuit d'été, un train arrêté au milieu des champs, un
// compartiment qui ne s'ouvre plus. Conventions : voir content/README.md. Le PNJ qui parle
// occupe l'emplacement « 0 ».

const EPOCH = 'un train arrêté en pleine nuit d’été';

export const premise03: Premise = {
  id: 'premise-03',
  title: 'Le compartiment sept',
  epoch: EPOCH,

  // Beat 1 : la chaleur, les grillons, un nom qui n'est peut-être pas le tien.
  wakeup: [
    'Il fait chaud. Une chaleur épaisse, qui sent la poussière et le fer.',
    'Quelque chose te serre la nuque. Du cuir, peut-être. Tu tournes la tête et ça grince.',
    'Dehors, des grillons. Des milliers, tous au même endroit, comme une seule machine qui ne s’arrête pas.',
    'Ton corps est debout, appuyé contre une paroi qui tremble encore un peu. Puis plus rien. Un silence de moteur coupé.',
    'Tu respires par la bouche. Dans ta gorge, un goût de charbon et de menthe.',
    'Ta main plate tient un objet froid et rond contre ton ventre. Une montre. L’aiguille ne bouge pas.',
    'Une porte claque dans le couloir. Des voix, étouffées. Puis un nom. Tu ne sais pas si c’est le tien.',
    'Une odeur de tabac froid traîne dans le couloir, mêlée à celle d’un parfum de fleur ancienne. Quelqu’un est passé ici il y a peu.',
    'Tu essaies de dire ton nom à voix basse. Ta bouche forme une syllabe, puis une autre. Aucune ne te revient.',
    'Le cuir de la ceinture frotte un point sensible, sur ta hanche. Ce corps porte cet uniforme depuis des années, et il en garde la forme.',
    'Quelque part dans le train, un enfant pleure sans bruit, par à-coups. Une voix de femme lui répond, trop calme pour être sincère.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation.
  orientation: [
    {
      kind: 'material',
      text: 'Un couloir étroit, éclairé par une seule lampe jaune qui oscille. De chaque côté, des portes de bois verni, numérotées. Les cuivres sont ternis.',
    },
    {
      kind: 'material',
      text: 'Par la vitre baissée, des champs sans fin sous la lune. Pas une lumière. Pas un village. Le train est arrêté en pleine plaine.',
    },
    {
      kind: 'bodily',
      text: 'Tu portes un uniforme trop serré aux épaules. Sous le col, la peau est irritée à force de frotter.',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche est sèche. Tu as soif, mais tu sais que l’eau du wagon est comptée.',
    },
    {
      kind: 'social',
      text: 'À ta ceinture, un carnet de billets et un poinçon. Sur la couverture du carnet, une inscription : « Chef de train ».',
    },
    {
      kind: 'material',
      text: 'Au bout du couloir, la porte du wagon suivant est entrouverte. Un rideau de velours la sépare d’un second couloir, plus sombre, plus silencieux.',
    },
    {
      kind: 'bodily',
      text: 'Ta nuque est moite et ta chemise colle au dos. Ce corps a couru, ou a eu peur, il y a peu de temps. Ton pouls ne redescend pas.',
    },
    {
      kind: 'social',
      text: 'Des têtes dépassent des portes, à demi tournées vers toi. Personne ne parle. Tous attendent que le chef décide quelque chose.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » sort du compartiment sept.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Une porte s’ouvre à ta gauche. Une silhouette sort du compartiment sept et referme derrière elle, trop vite.',
      },
      {
        speaker: 'npc',
        text: 'Chef ! Tu es là, enfin. Il y a un problème avec le sept.',
      },
      {
        speaker: 'narration',
        text: 'Elle est jeune, en robe d’été froissée. Sa main cherche un appui sur la paroi, puis le trouve sur ton bras.',
      },
      {
        speaker: 'npc',
        text: 'Deux personnes disent que la place est à elles. Chacune montre un billet. Les deux billets sont poinçonnés.',
      },
      {
        speaker: 'npc',
        text: 'Elles se sont disputées, puis plus rien. Une des deux est entrée, et on n’entend plus personne. Et maintenant, la porte ne s’ouvre plus.',
      },
      {
        speaker: 'narration',
        text: 'Dans le compartiment voisin, quelqu’un chuchote qu’il faut prévenir le chef. Elle baisse la voix pour que personne n’entende.',
      },
      {
        speaker: 'npc',
        text: 'Ça fait une heure que le train est arrêté. Personne ne sait pourquoi. Tu le sais, toi ?',
      },
      { speaker: 'narration', text: 'Elle te regarde. Tu es celui qui porte les clés.' },
    ],
    choices: [
      {
        id: 'voir-les-billets',
        kind: 'informative',
        text: '« Montre-moi les billets. »',
        reply: [
          { speaker: 'npc', text: 'Je n’en ai qu’un. L’autre est resté dans le sept.' },
          {
            speaker: 'narration',
            text: 'Elle te tend un billet plié, tiède de sa main. Le poinçon est net.',
          },
          {
            speaker: 'npc',
            text: 'C’est celui de la dame en gris. Elle jure qu’elle a payé le sept dès le départ.',
          },
          {
            speaker: 'narration',
            text: 'Tu lis le billet. Une date, une gare de départ, un chiffre à l’encre. Le chiffre a été retouché.',
          },
        ],
      },
      {
        id: 'rester-calme',
        kind: 'neutral',
        text: '« Reste ici. Je vais voir. »',
        reply: [
          { speaker: 'npc', text: 'Fais vite. Les gens commencent à s’agiter.' },
          {
            speaker: 'narration',
            text: 'Elle recule contre la vitre. Derrière elle, les champs ne bougent pas.',
          },
          {
            speaker: 'npc',
            text: 'Dis-leur que ce n’est rien. Dis-leur que le train repart dans un instant.',
          },
          {
            speaker: 'narration',
            text: 'Tu ne sais pas si c’est vrai. Elle non plus. Le silence s’installe entre elle et toi.',
          },
        ],
      },
      {
        id: 'nier-le-sept',
        kind: 'risky',
        text: '« Quel sept ? Je ne connais pas de sept. »',
        reply: [
          { speaker: 'npc', text: 'Tu plaisantes ? C’est ton wagon.' },
          {
            speaker: 'narration',
            text: 'Elle sourit pour te rassurer. Son sourire ne tient pas.',
          },
          {
            speaker: 'npc',
            text: 'Le sept, chef. Le sept. Là, derrière moi. Tu m’as dit hier de ne laisser entrer personne.',
          },
          {
            speaker: 'narration',
            text: 'Elle te regarde, et tu vois qu’elle hésite entre rire et pleurer. Elle a peur de ce que tu viens de dire.',
          },
        ],
      },
      {
        id: 'frapper',
        kind: 'neutral',
        text: 'Prendre le poinçon et frapper à la porte.',
        reply: [
          {
            speaker: 'narration',
            text: 'Tu frappes deux fois, à plat. Rien ne répond. Quelqu’un, de l’autre côté, retient son souffle.',
          },
          { speaker: 'npc', text: 'Tu l’as entendu, toi aussi ?' },
          {
            speaker: 'narration',
            text: 'Tu poses l’oreille contre le bois. Il est tiède. Derrière, un froissement de tissu, puis plus rien.',
          },
          {
            speaker: 'npc',
            text: 'Ils sont deux là-dedans. Je les ai vus entrer. Un seul est ressorti.',
          },
        ],
      },
    ],
  },

  // Beat 4 : enquête.
  investigation: [
    {
      kind: 'material',
      text: 'Dans la poche de l’uniforme, un petit objet enveloppé dans un mouchoir. Il pèse plus qu’il ne devrait.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tes doigts reconnaissent le poinçon. Ils savent la pression qu’il faut sur le carton. Ils savent aussi que ce billet a été poinçonné deux fois.',
      revealsTruth: 'double-poincon',
    },
    {
      kind: 'material',
      text: 'Sous la porte du sept, un filet de lumière qui bouge. Quelqu’un tient une bougie, ou une lampe, contre le sol.',
    },
    {
      kind: 'social',
      text: 'Une passagère t’attrape par la manche. Elle dit que le sept est réservé depuis le départ. Elle ne dit pas par qui.',
    },
    {
      kind: 'social',
      text: 'Dans ton carnet, la page du sept est déchirée. Il reste une marge, et le haut d’un chiffre.',
      revealsTruth: 'page-arrachee',
    },
    {
      kind: 'bodily',
      text: 'Une goutte de sueur glisse dans ton dos. Tu n’as pas peur de la porte. Tu as peur de ce que tu feras derrière.',
    },
    {
      kind: 'material',
      text: 'Dans le couloir, une valise ouverte, abandonnée. Un châle gris plié dessus. Une étiquette porte un numéro de place : un sept, barré puis réécrit.',
    },
    {
      kind: 'social',
      text: 'Le contrôleur du wagon voisin te fixe depuis un moment. Quand tu avances vers lui, il détourne les yeux et ouvre son carnet, comme pour s’occuper.',
    },
    {
      kind: 'bodily',
      text: 'Ta main droite cherche la poche haute de l’uniforme. Elle en sort une clé minuscule, que tu n’as jamais vue, mais que ta paume reconnaît.',
    },
  ],

  // Beat 5 : la fracture.
  fractures: ['fracture-05', 'fracture-06'],

  // Beat 6 : résolution.
  resolutions: [
    {
      id: 'ouvrir-le-sept',
      requiresAny: ['double-poincon', 'page-arrachee'],
      choiceText: 'Forcer la porte du compartiment sept devant tous.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu forces la serrure. La porte cède avec un bruit de bois sec.',
        'Personne ne crie. Les passagers regardent ce que tu regardes, et chacun comprend à son rythme.',
        'Le train repartira dans une heure. Cette fois, personne ne mentira sur la place sept.',
        'La jeune femme en robe d’été s’assoit sur une marche du couloir. Elle laisse enfin tomber ses épaules.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'sept-ouvert',
            summary: 'Ce qui se trouvait dans le compartiment sept est su de tous.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celle-du-couloir',
            characterId: '0',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'redemarrer',
      choiceText: 'Faire redémarrer le train sans ouvrir la porte.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu donnes le signal. Le train frissonne et repart.',
        'Le sept reste fermé jusqu’au terminus. Les gens s’endorment, ou font semblant.',
        'Au matin, la porte est ouverte, la place vide. Tu ne sais pas quand c’est arrivé.',
        'Sur la banquette, un châle gris est resté plié. Tu le prends. Il est encore tiède.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'porte-restee-fermee',
            description: 'Une porte restée fermée pendant un voyage entier.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'ecrire-un-billet',
      requiresAny: ['page-arrachee'],
      choiceText: 'Écrire un nouveau billet et le glisser sous la porte.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu écris un billet pour ce voyage et tu le glisses sous la porte.',
        'Le papier disparaît, tiré de l’autre côté.',
        'Une voix très basse dit merci. Tu n’es pas sûr d’avoir bien fait.',
        'Le train repart. À chaque station, tu passes devant le sept. À chaque fois, quelqu’un frappe deux coups, de l’intérieur.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'billet-sous-la-porte',
            label: 'Un compartiment qui s’ouvre de l’intérieur',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'descendre-sur-la-voie',
      choiceText: 'Descendre sur la voie et marcher vers les champs.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu ouvres la portière et tu sautes. Le gravier est chaud sous tes bottes.',
        'Les grillons se taisent, un à un, à mesure que tu avances.',
        'Derrière toi, le train attend. Devant toi, rien que la nuit et une lumière trop loin pour être un village.',
        'Tu entends ton nom, très faible, porté par le vent. Cette fois, tu es presque sûr que c’est le tien.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'voie-vers-la-plaine',
            label: 'La voie, quittée à pied vers la plaine',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-de-la-voie',
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
        'Tu dis que tu ne sais pas qui tu es. Que ce corps n’est pas le tien.',
        'Les passagers se taisent. Quelqu’un recule, quelqu’un rit, quelqu’un se signe.',
        'On te prend le poinçon. On te fera descendre à la prochaine halte, si le train repart un jour.',
        'La jeune femme en robe d’été baisse les yeux. Elle t’avait cru. Maintenant, elle ne sait plus ce qu’elle croit.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'monter-sur-le-toit',
      choiceText: 'Monter sur le toit pour voir d’où vient la lumière.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu grimpes par l’échelle. Le métal garde la chaleur du jour.',
        'D’en haut, la plaine est un lac noir. La lumière que tu cherches s’approche. Elle va vite.',
        'Tu comprends trop tard que ce n’est pas un village.',
        'Les grillons se taisent d’un coup. Dans le train, plus bas, quelqu’un frappe deux coups contre une porte.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'chef-disparu-sur-le-toit',
            description: 'Un chef de train disparu sur le toit, une nuit d’été.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

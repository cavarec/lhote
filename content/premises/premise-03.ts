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
        speaker: 'npc',
        text: 'Deux personnes disent que la place est à elles. Et maintenant, la porte ne s’ouvre plus.',
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
  ],

  // Beat 5 : la fracture.
  fractures: ['fracture-05', 'fracture-06'],

  // Beat 6 : résolution.
  resolutions: [
    {
      id: 'ouvrir-le-sept',
      choiceText: 'Forcer la porte du compartiment sept devant tous.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu forces la serrure. La porte cède avec un bruit de bois sec.',
        'Personne ne crie. Les passagers regardent ce que tu regardes, et chacun comprend à son rythme.',
        'Le train repartira dans une heure. Cette fois, personne ne mentira sur la place sept.',
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
      choiceText: 'Écrire un nouveau billet et le glisser sous la porte.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu écris un billet pour ce voyage et tu le glisses sous la porte.',
        'Le papier disparaît, tiré de l’autre côté.',
        'Une voix très basse dit merci. Tu n’es pas sûr d’avoir bien fait.',
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

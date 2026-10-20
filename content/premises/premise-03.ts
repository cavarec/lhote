import type { Premise } from './types';

// Prémisse 3 : une veillée dans une forêt, juste après la guerre. Un conteur raconte une histoire
// qui ressemble trop à celle de l'hôte. Inspirée de : la fontaine qui fait venir l'orage, les
// histoires qu'on n'écrit pas. Conventions : voir content/README.md.
//
// Colonne vertébrale :
// - Qui demande quoi : le conteur ne sait pas finir l'histoire du garde de la forêt (ton corps) ; la
//   femme qui attend sous l'aubépine, la lueur verte, ne s'éteindra que si la fin est dite.
// - En jeu : pendant la guerre, le garde a caché cette femme et promis de revenir avant l'aube. Il
//   n'est pas revenu à temps. Il a confié l'histoire au conteur mot après mot, puis il a cessé de pouvoir la dire.
// - Le piège : dire la fin à voix haute devant le village, c'est avouer ; se taire laisse la lueur attendre.
// - Ce que tu peux faire : dire la fin avec le conteur (tes lèvres la savent), l'interrompre, lire le
//   carnet, fuir dans la forêt, avouer ton trou, suivre la lueur.
// - Qui était ce corps : Maï, que le village appelle Demi-Oreille, garde de la forêt depuis la guerre.
//   Le nom est dans le registre de tournées (matériel) ; le PNJ donne le surnom et un souvenir.
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
    'Tu cherches ton nom. Tu trouves à la place le début d’une phrase que tu ne sais pas finir : « Je reviens avant l’aube. »',
    'Tu connais cette voix. Ta gorge se serre avant chaque pause, comme si ton corps savait où elle va s’arrêter.',
    'À ta ceinture pend un sifflet de bois, et un petit livre qui bat contre ta hanche. Tes doigts le serrent sans toi.',
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
      text: 'Au-delà du feu, entre les troncs, une lueur basse et verte brille près d’une aubépine tordue. Personne ne la regarde. Tout le monde sait comment ne pas la regarder.',
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
      text: 'Tes épaules sont larges, ton dos raide, tes mains durcies par la hache. Un corps qui travaille le bois depuis l’enfance, et qui a vu la guerre.',
    },
    {
      kind: 'social',
      text: 'Au ceinturon, un sifflet de garde et un petit registre de tournées. Les gens te saluent d’un signe, sans dire ton nom, comme on salue celui ou celle qui veille.',
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
        text: 'Tu l’as entendue, celle-là ? Il raconte l’histoire d’un garde qui se réveille près d’une fontaine, dans l’uniforme d’un autre. Il ne sait plus qui il est.',
      },
      {
        speaker: 'narration',
        text: 'Tu lis ses lèvres plus que tu n’entends. Les mots arrivent un peu après le mouvement, comme un tonnerre après l’éclair.',
      },
      {
        speaker: 'npc',
        text: 'Un garde de la forêt, comme toi. Il t’a regardé trois fois depuis le début.',
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
        text: 'Après la guerre, on raconte ce qu’on n’ose pas dire. C’est peut-être ça. Ou alors, il sait quelque chose.',
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
            text: 'Il parle d’une aubépine, d’une femme cachée dessous, d’une promesse : « Je reviens avant l’aube. »',
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
            text: 'Pendant la guerre, un garde a caché une femme sous une aubépine. Il lui a promis de revenir avant l’aube.',
          },
          {
            speaker: 'npc',
            text: 'Ensuite, il se réveille près d’une fontaine, dans l’uniforme d’un autre. On ne sait pas encore s’il est revenu.',
          },
          {
            speaker: 'narration',
            text: 'La personne baisse la voix. Sa main effleure ton coude, comme pour te réveiller.',
          },
        ],
      },
      {
        id: 'qui-es-tu',
        kind: 'informative',
        text: '« Dis-moi qui je suis pour toi. Je ne sais plus. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Drôle de question. Tu es le garde, celui ou celle qui fait la ronde depuis la guerre. Ici, on t’appelle Demi-Oreille.',
          },
          {
            speaker: 'npc',
            text: 'Un hiver, tu as marché toute une nuit pour me ramener du marais. Tu n’as jamais voulu qu’on te remercie.',
          },
          {
            speaker: 'narration',
            text: 'La personne sourit, mais ses yeux cherchent les tiens. « Ton vrai nom, à force, plus personne ne le dit. »',
          },
        ],
      },
      {
        id: 'dire-que-cest-la-tienne',
        kind: 'risky',
        text: '« Cette histoire, c’est la mienne. »',
        reply: [
          { speaker: 'npc', text: 'Quoi ? Tu veux dire que tu la lui as racontée ?' },
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
          text: 'Tu lis sur ses lèvres : « Et le garde se tourna vers l’aubépine. C’est à lui, maintenant, de dire ce qui s’est passé. »',
        },
        {
          speaker: 'npc',
          text: 'Le garde, c’est toi. Tout le monde le pense. Dis-moi ce que tu comptes faire.',
        },
        {
          speaker: 'narration',
          text: 'Sous les arbres, la lueur verte s’approche du cercle. Personne ne la regarde, mais chacun se serre un peu plus près du feu.',
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
              text: 'Celle de la lisière, là-bas. Les anciens disent qu’une femme y attend depuis la guerre, et qu’elle veut qu’on lui raconte la fin.',
            },
            {
              speaker: 'npc',
              text: 'Personne n’y va. Sauf toi : chaque soir, ta ronde s’arrête à vingt pas de la lisière. Tu n’as jamais dit pourquoi.',
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

  // Beat 4 : enquête. Chaque nature est lue d'un bloc : les indices d'une même nature se suivent.
  investigation: [
    {
      kind: 'material',
      text: 'Au pied de la souche, enveloppé dans un mouchoir, un petit objet qui ne devrait pas être là. Il est lourd et froid. Ta main ne tremble pas.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Tu ouvres le registre de tournées. Sur la première page, ton nom : « Maï, garde de la forêt. » Les rondes de guerre s’arrêtent au milieu d’une ligne, devant le mot « aubépine ».',
      revealsTruth: 'nom-du-garde',
    },
    {
      kind: 'material',
      text: 'Le carnet du conteur dépasse de la sacoche. Il est couvert d’une écriture fine et penchée, la même que celle de ton registre, trait pour trait.',
    },
    {
      kind: 'material',
      text: 'La dalle noire de la margelle est mouillée. On dit que verser l’écuelle dessus fait venir l’orage, et que l’orage fait taire les conteurs.',
    },
    {
      kind: 'bodily',
      text: 'Tes lèvres bougent avant celles du conteur. Elles disent les mots avant lui. Tu connais cette histoire par cœur, ou ton corps la connaît.',
      revealsTruth: 'levres-qui-savent',
    },
    {
      kind: 'bodily',
      text: 'Ton oreille sourde bourdonne, d’un bruit très précis. Ce corps l’a perdue la nuit de l’aubépine, quand le ciel a craqué. Le bruit n’a jamais cessé.',
    },
    {
      kind: 'bodily',
      text: 'Ta main gauche serre une feuille de chêne pliée en quatre, que tu ne sentais pas. Un seul mot dessus, d’une main qui n’est pas la tienne : « Reviens. »',
    },
    {
      kind: 'bodily',
      text: 'Tes bottes sont boueuses jusqu’aux chevilles, de la boue de la lisière. Ce corps va là chaque soir, s’arrête au vingtième pas, et rentre sans avoir regardé.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat plus vite à chaque phrase. Ton corps connaît le moment où le conteur va se taire, et il redoute ce silence.',
    },
    {
      kind: 'social',
      text: 'Un enfant, couché contre sa mère, te regarde sans cligner. Il dit tout bas : « C’est ton histoire. Il l’a dite tout à l’heure, quand tu dormais. »',
      revealsTruth: 'carnet-a-ton-nom',
    },
    {
      kind: 'social',
      text: 'Un vieux, de l’autre côté du feu, crache dans les braises. Tu lis sur ses lèvres : « Pendant la guerre, le garde cachait des gens. Une nuit, il n’est pas revenu à temps. »',
    },
    {
      kind: 'social',
      text: 'Une femme remplit l’écuelle à la fontaine et la pose sur une pierre plate, face à l’aubépine. Elle dit sans te regarder : « Pour l’absente. »',
    },
    {
      kind: 'social',
      text: 'Une autre souffle à sa voisine : « Il ne raconte jamais deux fois la même chose. Ce soir, c’est la même que l’an dernier, avec la même coupure. »',
    },
    {
      kind: 'social',
      text: 'Pendant une pause, le conteur te dit, sans bouger les lèvres : « On me l’a donnée en morceaux. Le dernier n’est pas à moi. »',
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
          text: 'Il ouvre le carnet et le tourne vers toi. Tu reconnais ton écriture. Tu lis : « Dicté au conteur par le garde, un soir de brume. »',
        },
        {
          speaker: 'npc',
          text: 'Tu m’as donné cette histoire mot après mot, puis tu as cessé de parler au milieu d’une phrase. Je n’ai jamais su la finir. Toi, tu la connais.',
        },
        {
          speaker: 'narration',
          text: 'Les braises claquent. La lueur verte est tout près, au bord du cercle. Toute la clairière attend que tu parles.',
        },
        {
          speaker: 'narration',
          text: 'Tu sens la fin de l’histoire dans ta bouche, comme un goût. Si tu la dis devant tous, tu ne pourras pas la reprendre.',
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
          text: 'Le carnet en dépasse, sa tranche de cuir tournée vers toi. Dessus, en lettres pâles, tu lis : « Le garde. »',
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
          text: 'Le conteur s’est arrêté en pleine phrase. Il tient le dernier mot en l’air, et c’est ta réponse qu’il attend.',
        },
        {
          speaker: 'narration',
          text: 'Au-delà des arbres, une femme chante sans paroles. Tu es le seul à l’entendre, et la lueur verte t’attend.',
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
          text: 'Tu n’as pas de réponse. Mais ce corps, lui, connaît cette histoire depuis longtemps.',
        },
      ],
    },
    investigation: {
      outcome: 'betrays',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main part toute seule vers la sacoche du conteur. Elle cherche le carnet à tâtons, avec l’aisance d’un geste déjà fait.',
        },
        {
          speaker: 'narration',
          text: 'Le conteur ne bouge pas, mais sa voix se casse sur une syllabe. Autour du feu, des têtes se tournent.',
        },
        {
          speaker: 'narration',
          text: 'Ce n’est pas toi qui as osé. C’est le garde, et il t’a fait passer pour lui devant tous.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-05', 'fracture-06'],

  // Qui était ce corps : l'écran de fin donne la réponse, quelle que soit l'issue.
  // L'Observateur parle après le premier contact : ce qui doit être réparé, sans dire comment.
  mechanic: {
    kind: 'object',
    label: 'La feuille de chêne',
    button: 'Déplier la feuille de chêne',
    line: 'Tu déplies la feuille. Un seul mot, d’une main qui n’est pas la tienne : « Reviens. » Au dos, le titre du carnet du conteur, à ton nom.',
    revealsTruth: 'carnet-a-ton-nom',
  },
  briefing: [
    'Je te vois, tu as l’air d’avoir dormi dans un fossé. Bon. Écoute, j’ai peu de temps, ce corps a une histoire qui ne se finit pas.',
    'Il faut que cette histoire trouve sa fin, ou que quelqu’un l’arrête avant. Ce qui doit être réparé, c’est elle. Je ne sais pas laquelle des deux fins est la bonne.',
    'Je ne sais pas non plus comment. J’aimerais bien. Et puis, entre nous, ce corps n’entend que d’une oreille. Tu as l’air d’y être habitué.',
  ],

  host: {
    name: 'Maï',
    role: 'garde de la forêt depuis la guerre, que tout le village appelle Demi-Oreille',
    story:
      'Pendant la guerre, Maï a caché une femme sous l’aubépine et promis de revenir avant l’aube. Maï n’a pas pu revenir à temps, ni jamais depuis. Maï a donné cette histoire au conteur, mot après mot, parce que Maï ne pouvait plus la dire.',
    truth: 'nom-du-garde',
  },

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'dire-la-fin-avec-lui',
      requiresAny: ['levres-qui-savent', 'carnet-a-ton-nom', 'nom-du-garde'],
      choiceText:
        'Te lever et dire la fin de l’histoire à voix haute, en même temps que le conteur.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu te lèves. Tes lèvres disent les mots avant que ta tête les cherche. Le conteur les dit avec toi, à la même seconde.',
        'La fin est simple et terrible : le garde est revenu à l’aube, mais trop tard. L’aubépine était vide, et il garde la forêt depuis, pour que personne n’oublie.',
        'Personne n’applaudit. Un vieux jette une branche dans le feu. Pour la première fois de la nuit, quelqu’un dit ton nom : Maï.',
        'Le conteur ferme le carnet. Il dit : « Maintenant, elle est à toi. » Tu ne sais pas ce que cela veut dire. Tu sais que c’est vrai.',
        'Sous l’aubépine, la lueur verte s’éteint. Ton oreille gauche s’ouvre une seconde, et très loin, quelqu’un prononce un autre nom que le tien.',
      ].join('\n'),
      aftermath:
        'Le conteur raconta cette fin dans toutes les veillées de l’hiver. Au printemps, quelqu’un replanta l’aubépine, et personne ne vit plus de lueur dans la forêt.',
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
      choiceText:
        'Renverser l’écuelle sur la dalle de la fontaine, pour que l’orage fasse taire le conteur.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu sais que cette histoire est la tienne, et tu ne veux pas qu’elle se finisse devant tous. Tu renverses l’écuelle sur la dalle.',
        'Le ciel crève. L’orage éteint le feu d’un coup. Des cris, des corps qui se heurtent, une voix d’enfant qui répète « le garde ».',
        'Quand quelqu’un rallume, le conteur n’est plus là. Sur sa souche, un carnet ouvert, dont toutes les pages sont blanches.',
        'Sous l’aubépine, la lueur verte brille encore. Elle n’a plus d’histoire à attendre, et tu entends qu’elle a compris.',
      ].join('\n'),
      aftermath:
        'Le conteur ne revint pas à la clairière. Pendant des hivers, on dit l’histoire du garde à moitié, et les enfants en inventèrent chacun la fin.',
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
      choiceText:
        'Prendre le carnet dans la sacoche du conteur et le lire, pour savoir ce que ton corps sait.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu glisses la main dans la sacoche. Le cuir est tiède. Tu ouvres le carnet à la lueur du feu.',
        'La première page est de ta main. La deuxième aussi. Toutes les pages sont de ta main, et tu ne te souviens d’aucune.',
        'Le conteur achève sa phrase sans protester. Quand il se tait, il te regarde comme on regarde quelqu’un qu’on a attendu.',
        'À la dernière page, une ligne n’est pas écrite. Elle commence par « Je reviens avant l’aube », et le crayon est déjà dans ta main.',
      ].join('\n'),
      aftermath:
        'Maï resta au village, et l’on prit l’habitude de lui laisser le carnet sur la table. Elle ou lui écrivait chaque soir une page, jamais la dernière.',
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
      choiceText:
        'Quitter la clairière et marcher dans la forêt, loin du feu et de la lueur.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu te lèves sans bruit. Personne ne te retient. Le feu rapetisse dans ton dos.',
        'Les troncs se resserrent. Le sentier se divise, puis se divise encore. Tu t’arrêtes à vingt pas de la lisière, comme ce corps le fait chaque nuit.',
        'Plus loin, la voix du conteur te suit. Elle ne dit plus l’histoire. Elle dit où tu en es, pas après pas.',
        'Au matin, tu retrouves le feu. Il est éteint depuis longtemps, et personne ne se souvient que tu étais parti.',
      ].join('\n'),
      aftermath:
        'Le conteur finit la veillée sans fin ni garde. À la neige, on retrouva la sacoche vide au pied de la fontaine, et personne ne sut dire à qui elle était.',
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
        'On pense que la guerre t’a repris. On te prend le sifflet. On te reconduit au village, entre deux voisins, en parlant d’autre chose.',
        'Derrière toi, dans la clairière, le conteur reprend où il s’était arrêté. Il ajoute une phrase. Elle parle d’un garde qu’on emmène.',
      ].join('\n'),
      aftermath:
        'On garda Maï près du feu cet hiver-là, sans plus lui confier la forêt. Au printemps, un autre garde fit la ronde, et le conteur partit sans rien promettre.',
      mutations: [],
    },
    {
      id: 'suivre-la-lueur',
      choiceText: 'Suivre dans les arbres la petite lumière qui t’appelle.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu l’as vue depuis le début de la veillée, au bord de ton regard : une lueur verte, basse, qui bouge.',
        'Tu la suis. Elle t’attend à chaque tournant, jamais plus près, jamais plus loin. Le sol devient mou.',
        'Quand tu comprends que l’eau monte à tes genoux, tu ne vois plus le feu. Tu ne l’entends plus non plus.',
        'La lueur s’arrête devant toi, tout près. Elle a un visage. C’est celui que ce corps n’a jamais osé revoir.',
      ].join('\n'),
      aftermath:
        'On chercha Maï trois jours dans le marais, puis on cessa. Depuis, certains soirs de veillée, une lueur verte traverse la lisière et semble attendre quelqu’un.',
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

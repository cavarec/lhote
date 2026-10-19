import type { Premise } from './types';

// Prémisse 1 : un village de pêcheurs, la mer a rendu un corps. L'hôte lave les morts.
// Colonne vertébrale :
// - QUI DEMANDE QUOI : une voisine ou un voisin (emplacement « 0 ») te demande de laver le corps rendu par la mer
//   avant midi, et de confirmer à la mère que c'est son petit, disparu depuis trois nuits.
// - EN JEU : le corps est celui de Jakez, noyé il y a vingt hivers. Les hommes du village ont juré de taire cette
//   nuit-là, et toi aussi, qui portes leur nœud. Ils veulent enterrer le corps vite, sous le nom du petit.
// - LE PIÈGE : dire la vérité rompt la promesse du village ; la taire fait pleurer une tombe au mauvais nom.
// - CE QUE TU PEUX FAIRE : laisser voir la mère, laver et se taire, dire le nom, chercher l'enfant au large,
//   avouer ton trou, ou descendre voir d'où vient le corps.
// Qui es-tu : Gwenn, qui lave les noyés depuis qu'on a perdu Jakez, de ton sang, il y a vingt hivers.
// Inspirée de : les enfants que la mer garde, et le corps que l'on reconnaît trop vite.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le générateur tire les deux ;
//   le texte ne dit donc ni « il » ni « elle » du personnage qui parle.
// - Hôte : Gwenn (voir `host`). Le nom vient d'un indice (louche gravée, voisine qui appelle, lèvres qui répondent).
// - Miroir : reflet dans l'eau (découverte ancienne, presque douce).
// - Corps hérité : des mains qui tremblent, sauf au contact des morts. La condition est une clé.

const EPOCH = 'un village de pêcheurs, à la fin du siècle dernier';

export const premise01: Premise = {
  id: 'premise-01',
  title: 'Ce que rend la mer',
  epoch: EPOCH,

  // Beat 1 : le sel, la cire, le vinaigre. Aucune information.
  wakeup: [
    'Le noir sent le sel et la laine mouillée. Une odeur plus fine passe dessous : du vinaigre, de la lavande, de la cire froide.',
    'Tu écoutes. La mer respire au loin, un souffle long, puis le retrait des galets. Elle recommence. Elle a toute la journée.',
    'Une goutte tombe sur de la pierre, à intervalles réguliers. Quelque part, quelqu’un renifle sans bruit et refuse de pleurer.',
    'Tu es debout. Tu le sais à la raideur des genoux, au poids des épaules. Sous tes pieds, la terre battue est glacée.',
    'Tes mains tremblent. Ce n’est pas le froid. C’est un tremblement ancien, installé là bien avant toi, comme un locataire.',
    'Tu cherches ton nom. Il est là, au bord de ta bouche, et tu ne le dis pas. Tu trouves un mot à la place : une cloche, très loin, qui ne sonne pas.',
    'Au cou, quelque chose de rêche : une cordelette, un nœud, un petit poids de coquille. Tes doigts le serrent sans toi.',
    'Derrière une cloison, une voix chante trois notes, toujours les mêmes. Elle les a chantées des centaines de fois.',
    'Dans la nuit finissante, un essieu a grincé sur le chemin de la grève. Il avançait au pas, sans s’approcher. Il s’est tu avant l’aube.',
    'On frappe trois coups à plat sur du bois. Une pause. Trois autres. Le rythme est celui d’un usage, pas d’une urgence.',
    'La porte s’ouvre sur la mer. Le vent entre, passe sur ta nuque et sort. Tu sais une chose : on t’attend.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, le miroir et le corps hérité.
  orientation: [
    {
      kind: 'material',
      text: 'Une pièce basse, au sol de terre battue. Sur une table longue, un drap blanc couvre une forme petite. Un seul pied dépasse, gris, sans chaussure.',
    },
    {
      kind: 'material',
      text: 'Aux poutres pendent des filets en réparation et des bouées de liège. Par la porte ouverte, une grève grise, la mer basse, des barques tirées au sec.',
    },
    {
      kind: 'material',
      text: 'Sur l’étagère, un bol de vinaigre, des bandes de lin pliées et un peigne d’os auquel il manque deux dents. À côté, un étui de bois vide, creusé pour en loger deux.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains tremblent. Tu les serres l’une dans l’autre et le tremblement continue. Tu poses une paume sur la table : il s’arrête.',
    },
    {
      kind: 'bodily',
      text: 'Un baquet d’eau claire, sur le banc. Tu te penches. Un visage creusé par les saisons te regarde d’en bas. Il n’a pas l’air surpris. C’est toi qui l’es.',
    },
    {
      kind: 'bodily',
      text: 'Tu as froid aux hanches, à force d’être debout. Ce corps veille des morts depuis des années, et il en a pris la patience.',
    },
    {
      kind: 'material',
      text: 'Au mur, un tablier de toile cirée. Une initiale y est cousue au fil bleu, usée par les lessives. Dessous pend un chapelet de coquilles.',
    },
    {
      kind: 'social',
      text: 'Près de la porte, la mère du petit serre contre elle un bonnet d’enfant. Les femmes l’entourent et se taisent quand tu passes.',
    },
    {
      kind: 'social',
      text: 'Une vieille, au seuil, dit à personne : « Trois nuits qu’il grince, cet essieu. Et pas de charrette. » Les autres font semblant de ne pas entendre.',
    },
    {
      kind: 'social',
      text: 'Dehors, des voix d’hommes parlent bas. Quand tu bouges, elles s’arrêtent. Puis elles reprennent, plus bas encore.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » entre. Le choix risqué contredit trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un entre en baissant la tête sous la poutre. Le froid de la grève reste collé à ses vêtements.',
      },
      {
        speaker: 'npc',
        text: 'Les hommes ont monté le corps à l’aube. La mer l’a rendu sous les roches noires. Ils n’ont pas voulu le laisser sur le sable.',
      },
      {
        speaker: 'npc',
        text: 'La mère du petit est dehors depuis trois nuits, depuis qu’il a disparu. Elle dit que c’est lui. Elle l’a dit avant de le voir.',
      },
      {
        speaker: 'narration',
        text: 'La personne regarde le drap, puis ailleurs. Ses mains ne savent plus où se poser.',
      },
      {
        speaker: 'npc',
        text: 'La famille vient à midi pour la toilette. Je leur ai dit que tu aurais fini. Dis-moi que tu auras fini.',
      },
      {
        speaker: 'npc',
        text: 'Moi, je ne dis rien. Ce n’est pas à moi de dire. C’est toi qui laves, c’est toi qui regardes.',
      },
      {
        speaker: 'narration',
        text: 'Dans ton dos, le drap bouge un peu, soulevé par un courant d’air. Rien d’autre.',
      },
    ],
    choices: [
      {
        id: 'preparer',
        kind: 'neutral',
        text: '« Je commence. Dis-leur d’attendre. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Je leur dirai que tu y es. Prends ton temps. Pas trop.',
          },
          {
            speaker: 'narration',
            text: 'La personne sort guetter la famille. Le seuil garde l’empreinte humide de ses pas, et la mer les efface de loin.',
          },
          {
            speaker: 'narration',
            text: 'Tu restes avec la forme sous le drap. Elle est plus petite que tout ce que tu as vu aujourd’hui.',
          },
        ],
      },
      {
        id: 'questionner',
        kind: 'informative',
        text: '« Où l’a-t-on trouvé ? Dans quel état ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Sous les roches noires, là où la marée dépose ce qu’elle ne veut plus. Il était pris dans les algues.',
          },
          {
            speaker: 'npc',
            text: 'Il tenait quelque chose dans le poing. Les hommes l’ont pris. Ils ne disent pas quoi.',
          },
          {
            speaker: 'narration',
            text: 'La personne frotte ses manches. Elle en a trop dit, et elle le sait. Elle sort guetter la famille.',
          },
        ],
      },
      {
        id: 'contredire',
        kind: 'risky',
        text: '« Ce n’est pas le petit. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu ne l’as pas encore regardé. Comment tu peux dire ça ?',
          },
          {
            speaker: 'narration',
            text: 'La voix a changé. Elle est devenue très calme, comme celle de quelqu’un qui marche sur une planche.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis pas à la mère. Ne le dis à personne. Pas avant d’avoir regardé.',
          },
          {
            speaker: 'narration',
            text: 'La personne sort guetter la famille, sans refermer la porte.',
          },
        ],
      },
      {
        id: 'qui-es-tu',
        kind: 'informative',
        text: '« Dis-moi une chose : qui suis-je, pour le village ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu me demandes ça, ce matin ? Tu es la main qu’on appelle quand la mer rend quelqu’un. Tu laves les noyés.',
          },
          {
            speaker: 'npc',
            text: 'Tu le fais depuis qu’on a perdu quelqu’un de chez toi, il y a vingt hivers. Tu n’en parles jamais, et personne ne te le demande.',
          },
          {
            speaker: 'narration',
            text: 'La personne te regarde, inquiète. Elle se demande pourquoi tu poses la question, et elle sort guetter la famille.',
          },
        ],
      },
    ],

    // Seconde passe : le temps presse, la famille approche.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Des pas pressés sur les galets. La personne revient vers la porte, essoufflée, comme après une course.',
        },
        {
          speaker: 'npc',
          text: 'Ils sont en avance. La mère marche déjà vers la maison, et elle ne marche pas seule.',
        },
        {
          speaker: 'npc',
          text: 'Les hommes veulent l’enterrer ce soir, sans attendre. Ils disent que la mer reprend ce qu’on lui laisse.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, un essieu grince. Il se rapproche, au pas, par à-coups. Aucune charrette n’est en vue.',
        },
        {
          speaker: 'npc',
          text: 'Alors ? Qu’est-ce que je leur dis, à la porte ?',
        },
      ],
      choices: [
        {
          id: 'gagner-du-temps',
          kind: 'neutral',
          text: '« Dis-leur que la toilette n’est pas finie. Une heure. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Une heure. Je ne sais pas si la mère l’entendra comme ça.',
            },
            {
              speaker: 'narration',
              text: 'La personne ressort. Tu entends sa voix, basse, puis celle de la mère, qui ne baisse pas.',
            },
          ],
        },
        {
          id: 'ecouter-lessieu',
          kind: 'informative',
          text: '« Cet essieu. Qui l’a entendu avant moi ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Tout le village. Trois nuits. Il passe toujours par le chemin des roches, jamais plus loin.',
            },
            {
              speaker: 'npc',
              text: 'La vieille dit que c’est l’Ankou qui vient chercher son compte. Moi, je dis que le bois travaille.',
            },
            {
              speaker: 'narration',
              text: 'La personne n’a pas l’air de le croire elle-même. Elle retourne à la porte.',
            },
          ],
        },
        {
          id: 'refuser-de-laisser-entrer',
          kind: 'risky',
          text: '« Personne n’entre avant que j’aie fini. Même la mère. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Même la mère ? Tu sais ce que tu demandes ? Ils vont enfoncer la porte.',
            },
            {
              speaker: 'narration',
              text: 'Le regard de la personne glisse sur toi, sur tes mains, sur le drap. Elle cherche ce qui ne va pas, et elle commence à le trouver.',
            },
          ],
        },
        {
          id: 'demander-le-nom',
          kind: 'informative',
          text: '« Qui, dans ce village, a perdu quelqu’un à la mer il y a longtemps ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Longtemps comment ? Ici, tout le monde a perdu quelqu’un.',
            },
            {
              speaker: 'npc',
              text: 'Si tu veux un nom, demande à la vieille. Mais ne le demande pas devant les hommes.',
            },
            {
              speaker: 'narration',
              text: 'Elle se tait, puis ajoute à voix très basse : « Et ne le demande pas devant la mère. »',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le corps est dans l'eau depuis des années ; quelqu'un le sait ; et tu portes un nom.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le coffre à linge, sous les draps pliés, un objet enveloppé dans un chiffon. Il est lourd et froid. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tes mains se posent sur le corps. Elles savent. Cette chair est devenue légère comme du bois. Elle est dans l’eau depuis des années, pas depuis trois jours.',
      revealsTruth: 'noye-depuis-longtemps',
    },
    {
      kind: 'material',
      text: 'La chemise de lin porte une marque brodée au col, au fil rouge : une ancre et deux lettres, J et K. Un point que plus personne ne fait au village.',
    },
    {
      kind: 'material',
      text: 'Le poing est fermé sur de l’algue et du sable. Quelqu’un l’a ouvert avant toi, puis refermé. Dans la paume, il reste l’empreinte d’un petit objet.',
    },
    {
      kind: 'social',
      text: 'Une vieille s’approche de la porte, regarde le pied qui dépasse, et prononce un nom : Jakez. Ce n’est pas celui du petit. Puis elle recule et se signe.',
      revealsTruth: 'vieux-nom',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. Il ne regarde pas le drap. Il serre un bout de cordelette noué : le même nœud que celui de ton cou.',
    },
    {
      kind: 'social',
      text: 'Une femme, près de la fenêtre, murmure : « Ce matin, la cloche d’en dessous a sonné. Celle de la baie. Elle n’avait pas sonné depuis longtemps. »',
    },
    {
      kind: 'social',
      text: 'Un enfant glisse la tête dans l’encadrement et dit à voix basse : « Ce n’est pas le petit, hein ? » Une main l’attire en arrière.',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche a un goût de sel et de fer. Tu as dû passer la nuit à jeûner. Ce corps tient debout par entêtement.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve une cicatrice ancienne au creux de l’autre paume. Une corde y a glissé, il y a longtemps, quand ce corps a voulu retenir une barque qui partait.',
    },
    {
      kind: 'material',
      text: 'Dans les cheveux du mort, un peigne d’os est resté pris. Il est taillé dans le même os que celui de ton étagère, et il lui manque les mêmes deux dents.',
    },
    {
      kind: 'social',
      text: 'Deux hommes parlent bas devant la porte : « Si la mère voit la chemise, tout se sait. Il faut l’enterrer ce soir, sous le nom du petit. »',
    },
    {
      kind: 'material',
      text: 'Sous la table, une flaque s’étend. L’eau ne coule pas vers la porte, comme elle le devrait. Elle remonte, pouce à pouce, vers la mer.',
    },
    {
      kind: 'material',
      text: 'Par terre, près de la porte, des traces de bottes lourdes. Elles viennent de la grève, passent près de la table et repartent sans le drap.',
    },
    {
      kind: 'material',
      text: 'Sur le manche de la louche à toilette, quelqu’un a gravé un nom au couteau : GWENN. Les lettres sont creusées par vingt ans de mains, et la dernière main est la tienne.',
      revealsTruth: 'nom-du-corps',
    },
    {
      kind: 'social',
      text: 'On frappe au volet. Une voisine appelle : « Gwenn ! La mère demande si tu as fini. » Tous les yeux se tournent vers toi, et tu réponds.',
      revealsTruth: 'nom-du-corps',
    },
    {
      kind: 'bodily',
      text: 'Tes lèvres bougent sans bruit sur un mot de cinq lettres. Il commence par un G très doux. Ce corps répond à son nom, même quand tu l’ignores.',
      revealsTruth: 'nom-du-corps',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['noye-depuis-longtemps', 'vieux-nom'],
      lines: [
        {
          speaker: 'narration',
          text: 'L’essieu s’arrête devant ta porte. Pas de pas, pas de voix. Juste le bois qui se tait, comme une main qu’on lève pour frapper.',
        },
        {
          speaker: 'narration',
          text: 'La vieille est là, à ton coude. Elle n’a pas bougé et pourtant elle est là. Elle prononce le nom une deuxième fois : Jakez.',
        },
        {
          speaker: 'npc',
          text: 'Il est parti il y a vingt hivers, une nuit sans lune. Les hommes sont rentrés sans lui. Ils ont juré de ne pas dire pourquoi.',
        },
        {
          speaker: 'narration',
          text: 'Sur la table, le poing fermé du mort s’est ouvert tout seul. Dans la paume, il y a un morceau de peigne d’os. Il complète le tien.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, la mère appelle. Ce n’est plus un nom qu’elle crie. C’est ta porte qu’elle frappe, du plat de la main.',
        },
      ],
    },
    {
      requires: ['noye-depuis-longtemps'],
      lines: [
        {
          speaker: 'narration',
          text: 'Tu retires les mains du corps. Elles ne tremblent pas. Elles savent ce qu’elles ont senti : des années, pas des nuits.',
        },
        {
          speaker: 'narration',
          text: 'Alors la cloche de la baie sonne. Trois coups, sous l’eau, très loin et très nets. Tout le village l’entend, tu le sais au silence.',
        },
        {
          speaker: 'narration',
          text: 'La mère frappe à la porte. « Ouvre. Je sais que c’est lui. » Sa voix n’a plus d’espoir. Elle a de l’entêtement, ce qui est pire.',
        },
      ],
    },
    {
      requires: ['vieux-nom'],
      lines: [
        {
          speaker: 'narration',
          text: 'La vieille est revenue sur le seuil, la main sur la bouche. Elle regarde le nom qu’elle a dit comme on regarde un chien qu’on a lâché.',
        },
        {
          speaker: 'npc',
          text: 'Ne le redis pas ici. Le sable a des oreilles. Il y a des hommes qui ont juré que ce nom resterait en dessous.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, une pelle racle un caillou. On a commencé à creuser sans attendre ta réponse.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Tu n’as rien trouvé de sûr quand la porte s’ouvre. La mère entre sans attendre, suivie du froid de la grève et de deux hommes.',
        },
        {
          speaker: 'narration',
          text: 'Elle s’arrête devant la table. Ses yeux passent sur le drap, puis sur toi. Elle dit, très bas : « Toi, tu sais déjà. »',
        },
        {
          speaker: 'narration',
          text: 'Tout le monde, dans la pièce, te regarde comme on regarde quelqu’un qui doit parler. Personne ne dit ce qu’il attend de toi.',
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
          text: 'Tu ne décides rien. Tes mains saisissent le coin du drap et le lissent, d’un geste long, appris par cœur.',
        },
        {
          speaker: 'narration',
          text: 'La personne les regarde. Quelque chose se défait dans ses épaules. Elle dit : « Tu fais comme avant. Ça me rassure. »',
        },
        {
          speaker: 'narration',
          text: 'Elle sort guetter la famille, plus calme. Tu n’as rien dit, et tout le monde a cru que tu savais.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'noye-depuis-longtemps',
      lines: [
        {
          speaker: 'narration',
          text: 'Tes mains s’ouvrent sur le poing du mort, doigt après doigt, sans te demander. Elles connaissent la patience des corps.',
        },
        {
          speaker: 'narration',
          text: 'La chair cède comme du bois gorgé d’eau. Elle n’est pas là depuis trois nuits. Elle est là depuis des années.',
        },
        {
          speaker: 'narration',
          text: 'Ta tête n’a rien décidé. Tes mains savaient déjà.',
        },
      ],
    },
  },

  // Qui était ce corps : la réponse de l'écran de fin, quelle que soit l'issue.
  host: {
    name: 'Gwenn',
    role: 'celui ou celle qui lave les noyés du village',
    story:
      'Gwenn lave les noyés depuis la nuit, il y a vingt hivers, où Jakez, de même sang, n’est pas rentré de la mer. Gwenn a juré aux hommes de se taire sur cette nuit, et a gardé le nœud de leur promesse au cou. Ce matin, la mer a rendu Jakez.',
    truth: 'nom-du-corps',
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-01', 'fracture-02'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'laisser-la-mere-voir',
      requiresAny: ['noye-depuis-longtemps', 'vieux-nom'],
      choiceText: 'Faire entrer la mère avant la toilette et la laisser regarder.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu ouvres la porte. La mère entre sans bruit et reste longtemps devant la table.',
        'Elle touche la chemise brodée du bout du doigt. Elle dit : « Ce n’est pas mon petit. » Elle ne pleure pas. Elle respire enfin.',
        'Tu dis alors, tout haut, le nom que tu tais depuis vingt hivers : « Jakez. Il était de mon sang. » Les hommes baissent les yeux.',
        'Elle part vers la grève et regarde la mer avec d’autres yeux. Sous la table, la flaque se retire vers la porte, goutte à goutte.',
        'Sur le seuil, un homme serre sa cordelette. Il a entendu ton nom et celui de Jakez, et il n’a pas décidé ce qu’il en fera.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'le-corps-nest-pas-le-petit',
            summary: 'Le corps rendu par la mer n’était pas celui de l’enfant disparu.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'celle-qui-attendait',
            characterId: '0',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'laver-et-taire',
      requiresAny: ['noye-depuis-longtemps'],
      choiceText: 'Laver le corps, l’habiller, et ne rien dire de ce que tu sais.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu laves le corps. Tes mains ne tremblent plus. Elles trouvent dans les cheveux un peigne d’os, jumeau du tien.',
        'À midi, la famille entre. La mère se jette sur le drap et dit le nom du petit, très fort. Personne ne la corrige.',
        'On enterre le soir même, sous ce nom qui n’est pas le bon. Tu tiens ta langue, comme tu l’as promis aux hommes il y a vingt hivers.',
        'Cette nuit-là, l’essieu grince jusqu’à l’aube. Cette fois, il va jusqu’à la tombe, et il s’y arrête.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'tombe-au-mauvais-nom',
            description: 'Une tombe creusée sous un nom qui n’est pas celui du mort.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'dire-le-vieux-nom',
      requiresAny: ['vieux-nom'],
      choiceText: 'Dire à voix haute le nom que la vieille a prononcé : Jakez.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu dis « Jakez ». Le silence tombe sur la pièce comme un filet mouillé.',
        'La vieille ferme les yeux. L’homme du seuil s’en va, d’un pas qui n’a plus rien de calme.',
        'La mère demande : « Qui est-ce ? » Personne ne répond. Un homme regarde ton cou, où pend le même nœud que le sien.',
        'Les portes se ferment, l’une après l’autre. En disant ce nom, tu as rompu la promesse du village, et tu le sais.',
        'Seule la cloche de la baie répond. Elle sonne trois fois, sous l’eau, et plus personne ne fait semblant de ne pas l’entendre.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'maison-fermee-au-village',
            label: 'Une maison dont plus personne ne prononce le nom',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'chercher-au-large',
      choiceText: 'Prendre une barque et chercher le petit au large.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu pousses la plus petite barque à l’eau. Tes mains tiennent les rames comme si elles avaient toujours su.',
        'La côte devient une ligne grise. Tu appelles le nom du petit. Une mouette répond, puis plus rien.',
        'Au retour, la nuit tombe. La mère est sur la grève, immobile, et ne dit pas si elle espère encore.',
        'Dans le fond de la barque, un éclat de bois peint, mouillé, que tu n’y avais pas mis. On y lit la moitié d’un nom de barque.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'barque-tiree-au-large',
            label: 'Une barque partie au large, au jour du corps',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-de-la-barque',
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
        'Tu dis que tu ne sais pas qui tu es. Que ces mains ne sont pas à toi.',
        'Personne ne rit. Les hommes se signent. Quelqu’un recule jusqu’à la porte, puis dehors.',
        'On te retire le tablier. Une autre lavera le corps, et ce sera quelqu’un qui sait ce qu’elle fait.',
        'Sur le seuil, en partant, tu entends l’essieu. Il grince derrière toi, au pas, et il te suit jusqu’à la dernière maison.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'descendre-a-la-greve',
      choiceText: 'Descendre aux roches noires voir d’où vient le corps.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu descends à la marée basse. Les roches sont noires, luisantes, couvertes d’algues glissantes.',
        'Tu trouves la crevasse où le corps a dormi. Tu t’y penches. Au fond, quelque chose de blanc : un éclat de bois peint, jumeau de celui du poing.',
        'La mer revient avant que tu l’aies compris. Elle n’a pas de hâte. Elle a toute la journée.',
        'Sous l’eau qui monte, tu entends une cloche. Elle sonne pour toi, et tu comprends enfin que c’était le sens du bruit.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'laveuse-prise-par-la-maree',
            description:
              'Quelqu’un qui lavait les morts, pris par la marée aux roches noires.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

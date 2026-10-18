import type { Premise } from './types';

// Prémisse 1 : un village de pêcheurs, la mer a rendu un corps. L'hôte lave les morts.
// Inspirée de : les enfants que la mer garde, et le corps que l'on reconnaît trop vite.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le générateur tire les deux ;
//   le texte ne dit donc ni « il » ni « elle » du personnage qui parle.
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
    'Tu cherches ton nom. Tu trouves un mot à la place : une cloche, très loin, qui ne sonne pas.',
    'Au cou, quelque chose de rêche : une cordelette, un nœud, un petit poids de coquille. Tes doigts le serrent sans toi.',
    'Derrière une cloison, une voix chante trois notes, toujours les mêmes. Elle les a chantées des centaines de fois.',
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
      text: 'Sur l’étagère, un bol de vinaigre, des bandes de lin pliées et un peigne d’os aux dents cassées. Tout est rangé comme pour une cérémonie.',
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
      kind: 'social',
      text: 'Au mur, un tablier de toile cirée et un chapelet de coquilles. Sur le seuil, des sabots d’adulte et une paire de sabots d’enfant.',
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
        text: 'Les hommes l’ont monté à l’aube. Ils n’ont pas voulu le laisser sur le sable.',
      },
      {
        speaker: 'npc',
        text: 'La famille vient à midi. Je leur ai dit que tu aurais fini. Dis-moi que tu auras fini.',
      },
      {
        speaker: 'narration',
        text: 'La personne regarde le drap, puis ailleurs. Ses mains ne savent plus où se poser.',
      },
      {
        speaker: 'npc',
        text: 'La mère est dehors depuis trois nuits. Elle dit que c’est le petit. Elle l’a dit avant de le voir.',
      },
      {
        speaker: 'npc',
        text: 'Moi, je ne dis rien. Ce n’est pas à moi de dire. C’est à toi de regarder.',
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
            text: 'La personne sort. Le seuil garde l’empreinte humide de ses pas, et la mer les efface de loin.',
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
            text: 'La personne frotte ses manches. Elle en a trop dit, et elle le sait.',
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
        ],
      },
      {
        id: 'lever-le-drap',
        kind: 'neutral',
        text: 'Ne rien dire et lever le drap.',
        reply: [
          {
            speaker: 'narration',
            text: 'Le lin glisse sous tes doigts. Il est humide et lourd, comme s’il avait gardé la mer.',
          },
          { speaker: 'npc', text: 'Je sors. Je ne peux pas rester pour ça.' },
          {
            speaker: 'narration',
            text: 'La porte claque. Tu ne vois pas encore le visage. Tu vois l’étoffe, et la façon dont elle a vieilli.',
          },
        ],
      },
    ],
  },

  // Beat 4 : enquête. Le corps est dans l'eau depuis des années ; quelqu'un le sait.
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
      text: 'La chemise de lin porte une marque brodée au col, au fil rouge : une ancre et deux lettres. Un point que plus personne ne fait au village.',
    },
    {
      kind: 'material',
      text: 'Au creux de la main fermée, des algues, du sable et un petit éclat de bois peint. Quelqu’un a ouvert ce poing avant toi, puis l’a refermé.',
    },
    {
      kind: 'social',
      text: 'Une vieille s’approche de la porte, regarde le pied qui dépasse, et prononce un nom. Pas celui du petit. Puis elle recule et se signe.',
      revealsTruth: 'vieux-nom',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. Il ne regarde pas le drap. Quand tu le regardes, il passe la langue sur ses lèvres.',
    },
    {
      kind: 'social',
      text: 'Un enfant glisse la tête dans l’encadrement et dit à voix basse : « Ce n’est pas lui, hein ? » Une main l’attire en arrière.',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche a un goût de sel et de fer. Tu as dû passer la nuit à jeûner. Ce corps tient debout par entêtement.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve une cicatrice ancienne au creux de l’autre paume. Une corde y a glissé, il y a longtemps, et ce corps s’en souvient.',
    },
    {
      kind: 'material',
      text: 'Par terre, près de la porte, des traces de bottes lourdes. Elles viennent de la grève, passent près de la table et repartent sans le drap.',
    },
  ],

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
        'Elle touche la chemise brodée du bout du doigt. Elle dit : « Ce n’est pas lui. » Elle ne pleure pas. Elle respire enfin.',
        'Les hommes sur le seuil ne bougent pas. Dehors, quelqu’un retire son bonnet.',
        'Elle dit : « Merci de m’avoir laissée voir. » Elle part vers la grève, et elle regarde la mer avec d’autres yeux.',
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
        'Tu laves le corps. Tes mains ne tremblent plus. Elles font ce qu’elles ont toujours fait.',
        'À midi, la famille entre. La mère se jette sur le drap et dit le nom du petit, très fort.',
        'Personne ne la corrige. On enterre demain, sous ce nom qui n’est pas le bon.',
        'Tu vois la vieille, au fond, qui hoche la tête. Elle ne te regarde pas.',
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
      choiceText: 'Dire à voix haute le nom que la vieille a prononcé.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu dis le nom. Le silence tombe sur la pièce comme un filet mouillé.',
        'La vieille ferme les yeux. L’homme du seuil s’en va, d’un pas qui n’a plus rien de calme.',
        'La mère demande : « Qui est-ce ? » Personne ne répond. Les portes se ferment, l’une après l’autre.',
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
      choiceText: 'Prendre une barque et chercher l’enfant au large.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu pousses la plus petite barque à l’eau. Tes mains tiennent les rames comme si elles avaient toujours su.',
        'La côte devient une ligne grise. Tu appelles un nom. Une mouette répond, puis plus rien.',
        'Au retour, la nuit tombe. La mère est sur la grève, immobile, et ne dit pas si elle espère encore.',
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
        'Tu trouves la crevasse où le corps a dormi. Tu t’y penches. Au fond, quelque chose de blanc.',
        'La mer revient avant que tu l’aies compris. Elle n’a pas de hâte. Elle a toute la journée.',
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

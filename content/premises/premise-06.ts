import type { Premise } from './types';

// Prémisse 6 : le lavoir de minuit. Une nuit de lessive au bord d'une lande de Basse-Bretagne.
// Inspirée de : la légende bretonne des Kannerezed-noz, qui demandent à un passant de les aider à tordre
// un drap. Qui tord dans leur sens a les bras brisés ; qui tord à contre-sens les délivre.
//
// COLONNE VERTÉBRALE
// - Qui demande quoi : les lavandières de la nuit demandent à qui passe de tordre l'autre bout d'un drap.
// - Ce qui est en jeu : le drap est le linceul d'un mort de la maison du bas. Tant qu'il n'est pas
//   essoré, ce mort ne dort pas. L'aube approche.
// - Le piège : ton corps tord toujours du même côté, et c'est le sens des lavandières. Y céder, c'est
//   perdre les bras.
// - Ce que le joueur peut faire : tordre à contre-main, nommer le mort, briser les battoirs,
//   avouer qu'il ne sait pas qui il est, ou entrer dans l'eau.
// - Qui tu es : Mael, qui lavait le linge du bourg et celui des morts. Le nom est gravé sur le savon.
//
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : ton reflet dans l'eau noire du lavoir tient un drap que tu n'as pas dans les mains.
// - Corps hérité : tes mains restent sèches dans l'eau, et ton poignet tourne toujours du même côté.
// - Les indices sont regroupés par nature et s'affichent tous ensemble : aucun ne dépend d'un autre.

const EPOCH =
  'un lavoir de lande en Basse-Bretagne, une nuit de grande lessive, au temps des battoirs';

export const premise06: Premise = {
  id: 'premise-06',
  title: 'Le lavoir de minuit',
  epoch: EPOCH,

  host: {
    name: 'Mael',
    role: 'la personne qui lavait le linge du bourg, jusqu’à celui des morts',
    story:
      'Tout le bourg l’appelait Main-sèche, parce que Mael sortait de l’eau sans mouiller ses manches. Tordre du même côté, toute une vie, avait usé les poignets. Cette nuit-là, au lavoir, Mael finissait un drap que personne n’avait apporté.',
    truth: 'nom-sur-le-savon',
  },

  // L'Observateur : ce qui doit être réparé, sans le comment.
  mechanic: {
    kind: 'silence',
    label: 'Le silence du lavoir',
    button: 'Ne toucher à rien, écouter l’eau',
    line: 'Tu poses tes mains sur tes genoux. L’eau n’a plus personne à qui parler. Les lavandières baissent leurs battoirs.',
  },
  briefing: [
    'Je te vois, tu sais. Ne cherche pas où : je suis là, sur le bord du lavoir, avec les pieds au sec.',
    'Voilà ce que j’ai : un drap, des lavandières, et quelqu’un de la maison du bas qui ne dort pas. Il faut finir ce drap avant l’aube, et bien le finir.',
    'Pour le comment, je ne sais pas. Je crois qu’il y a un sens qui te perd et un sens qui les délivre. Lequel, je ne sais plus.',
    'Regarde tes mains, en tout cas. Ce corps a l’habitude de ce linge, et il en sait plus que toi.',
  ],

  // Beat 1 : l'eau, le froid, le bruit. Aucune information.
  wakeup: [
    'Le noir sent le savon de cendre, la pierre mouillée et la fougère écrasée. Une odeur de fer passe dessous, comme celle d’une vieille lame.',
    'Tu écoutes. De l’eau, tout près, qui coule dans un bassin et tombe d’une pierre à l’autre, sans hâte, sans arrêt.',
    'Sous le bruit de l’eau, un autre : des coups sourds, réguliers, d’un bois plat sur du linge mouillé. Ils s’arrêtent, puis reprennent.',
    'Tu es à genoux. Tu le sais aux rotules enfoncées dans une planche trempée, et au dos plié depuis longtemps.',
    'Tes bras sont dans l’eau jusqu’aux coudes. Elle est glacée. Et pourtant, quand tu les regardes, tes mains sont sèches.',
    'Tu cherches ton nom. Il y avait un mot, là, au bord de ta bouche. Tu trouves à la place le bruit d’un drap qu’on tord, long, grinçant, comme une porte.',
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
      text: 'Sur la corde, entre deux poteaux, des draps blancs pendent, secs malgré l’humidité. Dans le bassin, un autre drap, très long, est resté à tremper.',
    },
    {
      kind: 'material',
      text: 'À tes pieds, un panier d’osier à moitié plein de linge tordu. Dessus, un savon gris usé en forme de cœur, et une cuillère de bois noircie.',
    },
    {
      kind: 'bodily',
      text: 'Tu plonges les mains dans le bassin. L’eau est si froide qu’elle devrait mordre. Tes doigts en ressortent secs, comme sortis d’un four.',
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
      kind: 'bodily',
      text: 'Tu cherches ton nom. Tes lèvres en forment le premier son, puis tout s’efface. Ce corps en a un, tu le sais, et il ne te le donne pas.',
    },
    {
      kind: 'social',
      text: 'Au fond du lavoir, une vieille, accroupie, savonne un drap qui n’en finit pas. Elle ne lève pas la tête. Elle dit : « Tu es encore là, à cette heure. »',
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
        text: 'Quelqu’un descend le sentier en courant à moitié, un panier de linge sur la hanche. La personne s’arrête net à l’entrée du lavoir, hors d’haleine.',
      },
      {
        speaker: 'npc',
        text: 'Te voilà. On t’a cherché toute la soirée. Ta soupe est froide, et ta porte est restée ouverte.',
      },
      {
        speaker: 'narration',
        text: 'La personne ne regarde pas les lavandières, au fond. Elle regarde l’eau noire, puis tes mains sèches, puis l’eau de nouveau.',
      },
      {
        speaker: 'npc',
        text: 'Il est minuit passé. On ne lave pas à minuit. Et personne n’a apporté ce linge-là, je le sais, j’ai fait la tournée.',
      },
      {
        speaker: 'npc',
        text: 'Elles t’ont demandé quelque chose ? Avant que j’arrive. Dis-moi qu’elles ne t’ont rien demandé.',
      },
      {
        speaker: 'narration',
        text: 'Un drap claque derrière toi, sans vent. Les battoirs ont cessé. Le silence est tel qu’on entend l’eau couler d’une pierre à l’autre.',
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
            text: 'Alors laisse-le sur la dalle et marche. Ne le tords pas. Ne le touche plus.',
          },
          {
            speaker: 'narration',
            text: 'La personne te tend la main, sans te regarder. Sa paume est mouillée de sueur. Ses yeux restent sur la lande.',
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
            text: 'De les aider à tordre un drap, chacun un bout. Ce n’est pas grand-chose. C’est comme ça que ça commence.',
          },
          {
            speaker: 'npc',
            text: 'Il y a un sens où ça se passe bien. Il y en a un autre, où l’on y laisse les bras. Ma grand-mère disait lequel. Je l’ai oublié.',
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
        text: '« Elles m’ont déjà demandé. J’ai répondu que je verrais. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu leur as répondu ? À elles ? Et tu as encore tes deux bras ? Ce n’est pas possible.',
          },
          {
            speaker: 'narration',
            text: 'La voix est devenue très basse. L’inquiétude a laissé la place à la peur nette, celle de quelqu’un qui recule d’un pas.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis à personne. Pas au bourg, pas au recteur. Pas avant d’avoir compris pourquoi elles t’ont laissé la parole.',
          },
        ],
      },
      {
        id: 'qui-es-tu',
        kind: 'informative',
        text: '« Dis-moi comment tu m’appelles. J’ai la tête vide, ce soir. »',
        reply: [
          {
            speaker: 'npc',
            text: 'La tête vide ? Là, devant elles ? Écoute-moi : au bourg, les gamins t’appellent Main-sèche.',
          },
          {
            speaker: 'npc',
            text: 'Parce que tu sors de l’eau sans mouiller tes manches. Tu es celui ou celle qu’on prévient, quand un mort attend son linge.',
          },
          {
            speaker: 'narration',
            text: 'La personne jette un regard vers le fond du lavoir, puis se penche vers toi : « Ton vrai nom, je ne le dis pas ici. Elles écoutent. »',
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
          text: 'Elle vient pour toi, pas pour moi. Je n’ai rien dit. Je n’ai rien fait.',
        },
        {
          speaker: 'narration',
          text: 'La plus jeune, derrière, reprend son chant. Elle chante plus fort, comme pour couvrir le grincement du drap qu’on tord, là-bas.',
        },
        {
          speaker: 'narration',
          text: 'Les battoirs se lèvent d’eux-mêmes sur le bord du bassin, un à un, et se tournent vers toi d’un mouvement très lent.',
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
          text: '« Reste. À deux, on tiendra jusqu’à l’aube. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Je reste. Mais je ne touche à rien. Ni au drap, ni aux battoirs.',
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
              text: 'Ma grand-mère disait : celui qui tord comme elles ne reprend jamais ses bras. Il faut tordre contre leurs mains.',
            },
            {
              speaker: 'npc',
              text: 'Leur sens, c’est celui que fait tout le monde. Ton poignet tourne toujours de ce côté-là. Il faudra le forcer.',
            },
          ],
        },
        {
          id: 'refuser-net',
          kind: 'risky',
          text: '« Non. Je ne tords rien pour elles. Je pars. »',
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
              text: 'À personne. À toutes les vieilles qui ont lavé trop tard dans ce lavoir.',
            },
            {
              speaker: 'narration',
              text: 'La personne a répondu trop vite. Elle regarde mieux, puis elle recule, la main sur la bouche.',
            },
            {
              speaker: 'npc',
              text: 'C’est le drap que je connais, pas elle. Ce drap-là, on l’a cousu au bourg.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Les indices d'une même nature s'affichent ensemble ; chacun se lit seul.
  // Matière : le nom sur le savon. Corps : le sens du poignet. Autres : le drap de la maison du bas.
  investigation: [
    {
      kind: 'material',
      text: 'Au fond du panier, sous le linge, un petit objet lourd et froid, enveloppé dans un lange. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Le long drap du bassin traîne jusqu’au fond de la dalle. Il est tordu à moitié, en spirale serrée, et il tient seul, sans que personne le touche.',
    },
    {
      kind: 'material',
      text: 'Au dos du savon gris, quatre lettres sont gravées à la pointe d’un clou : MAEL. Le savon n’a servi qu’à ce nom, pendant des années.',
      revealsTruth: 'nom-sur-le-savon',
    },
    {
      kind: 'material',
      text: 'Sur la dalle, des empreintes de mains mouillées, deux pas plus loin que toi. Les lavandières se tenaient là, de l’autre côté du drap.',
    },
    {
      kind: 'material',
      text: 'Un battoir est tombé à l’eau et il flotte à la surface, sans rien dessous. Le courant ne l’emporte pas. Il tourne sur lui-même.',
    },
    {
      kind: 'bodily',
      text: 'Tu tords un coin de drap, pour voir. Ton poignet part vers l’extérieur, sans hésiter. Une douleur ancienne se réveille dans l’os, à chaque tour.',
      revealsTruth: 'sens-du-poignet',
    },
    {
      kind: 'bodily',
      text: 'Tes avant-bras sont marqués de petites brûlures rondes, des cendres de lessive. Ce corps a lavé toute sa vie, et pas que du linge ordinaire.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Dans cette eau glacée, il devrait cogner. Ce corps vit au ralenti, comme un galet au fond du bassin.',
    },
    {
      kind: 'bodily',
      text: 'Tes lèvres répètent, sans voix, le refrain de la complainte. Ce corps connaît le chant des lavandières. Il l’a déjà entendu, bien des nuits.',
    },
    {
      kind: 'bodily',
      text: 'Tes dents claquent sans que tu aies froid. Une peur très ancienne, qui n’est pas la tienne, monte de tes bras jusqu’à ta gorge.',
    },
    {
      kind: 'social',
      text: 'Un vieux, qui traverse la lande avec un sac de sel sur l’épaule, s’arrête loin du lavoir. Il dit, assez fort : « C’est le drap de la maison du bas. »',
      revealsTruth: 'drap-de-la-maison-du-bas',
    },
    {
      kind: 'social',
      text: 'Une voisine, de l’autre côté du muret, te glisse : « C’est toi qui laves nos morts, quand personne n’ose. Ne reste pas ici cette nuit. »',
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
      text: 'La vieille chante en breton, tout bas. Un mot revient, que tu connais : « nom ». Elle te sourit chaque fois qu’elle le dit.',
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
          text: 'Tords avec moi. Dans le sens du fil, et vite. Tu es du bourg. Tu connais le geste.',
        },
        {
          speaker: 'narration',
          text: 'Ton poignet tourne vers l’extérieur, déjà, avec l’impatience d’une vieille habitude. Si tu le laisses faire, il te cassera les deux bras.',
        },
        {
          speaker: 'narration',
          text: 'Tu serres la ficelle du sachet de sel. Il faut tordre contre elles, contre le fil, et contre ton propre corps.',
        },
      ],
    },
    {
      requires: ['sens-du-poignet'],
      lines: [
        {
          speaker: 'narration',
          text: 'Ton poignet se tend vers le drap avant que la vieille ne l’offre. Il connaît ce geste. Il l’a fait cent fois, dans ce sens-là.',
        },
        {
          speaker: 'narration',
          text: 'La vieille tend le drap. Il est lourd de quelqu’un. Tu ne sais pas qui. Tu sais une chose : si tu tords comme ton poignet, tu perds les bras.',
        },
        {
          speaker: 'narration',
          text: 'Les battoirs se mettent à frapper, tous ensemble. Le rythme monte, comme si l’eau elle-même attendait ta réponse.',
        },
      ],
    },
    {
      requires: ['drap-de-la-maison-du-bas'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le vieux au sac de sel est revenu jusqu’au muret, sans entrer. Il te jette par-dessus la pierre ce qu’il sait, très vite, comme un caillou.',
        },
        {
          speaker: 'npc',
          text: 'Elle est partie ce soir, au bas du chemin. Les lavandières lavent son drap avant l’aube. Tant qu’il n’est pas essoré, elle ne dort pas.',
        },
        {
          speaker: 'narration',
          text: 'Il s’éloigne en courant à moitié. Dans la maison du bas, une lampe s’allume, puis s’éteint.',
        },
      ],
    },
    {
      requires: ['nom-sur-le-savon'],
      lines: [
        {
          speaker: 'narration',
          text: 'La vieille lève les yeux vers toi, et pour la première fois elle prononce ton nom, celui du savon : « Mael. »',
        },
        {
          speaker: 'npc',
          text: 'Mael, tu as lavé pour tout le bourg, trente ans. Les vivants, les morts. Tu connais le drap. Prends l’autre bout.',
        },
        {
          speaker: 'narration',
          text: 'Elle dit ton nom avec tendresse, sans haine. C’est ce qui te fait peur : elle te connaît, et elle attend depuis longtemps.',
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
          speaker: 'npc',
          text: 'Prends ce bout. Tords, et vite : le coq chantera bientôt. Tant que le drap n’est pas essoré, celui qu’il enveloppe ne dort pas.',
        },
        {
          speaker: 'narration',
          text: 'La vieille est à un pas de toi, le drap tendu. Ses doigts sont d’eau. Dehors, le coq chante une fois, trop tôt, et se tait.',
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
          text: '« Du sel ? Pour moi ? » La personne le prend. Elle le pose sur sa langue, et quelque chose, dans son visage, se desserre.',
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
          text: 'Ta main saisit un coin du drap et le tord, sans toi. Elle tourne vers l’extérieur, d’un coup sec, avec l’aisance de mille lessives.',
        },
        {
          speaker: 'narration',
          text: 'Une douleur te traverse l’os, très nette. Ce corps a déjà tordu ce linge-là, dans ce sens-là, bien des fois.',
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
      requiresAny: ['sens-du-poignet', 'drap-de-la-maison-du-bas', 'nom-sur-le-savon'],
      choiceText:
        'Prendre le bout du drap et le tordre à contre-main, contre ton poignet et contre les mains des lavandières.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu prends le bout du drap. Ton poignet veut partir vers l’extérieur, comme depuis toujours. Tu le forces, à rebours, d’un tour lent et douloureux.',
        'Le drap grince. Les mains d’eau de la vieille se tendent, puis se défont. Elle te regarde, et pour la première fois, ses yeux ont une couleur.',
        'Elle dit un mot, en breton, que tu comprends : « Merci, Mael. » Puis elle se dissout dans le bassin, avec le linge et les battoirs.',
        'Quand le coq chante, tes bras sont entiers. Tes mains sont mouillées, enfin, comme celles de tout le monde. Au bas du chemin, une lampe s’éteint pour de bon.',
        'Sur la corde, un petit drap goutte, à ta taille. Personne ne l’y a pendu.',
      ].join('\n'),
      aftermath:
        'Le drap de la maison du bas sécha au soleil, et le mort fut enterré à l’heure, sans que personne sache qui avait tordu. Au bourg, on raconta des années que Main-sèche avait fini son dernier drap.',
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
        'Prendre le bout du drap et le tordre comme elles, d’un geste vif, pour en finir avant l’aube.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends le drap, et ton poignet part d’un coup, sûr de lui, dans le sens de toutes les lessives. Tout va si vite.',
        'Quelque chose craque dans ton bras. Puis dans l’autre. Tu n’as pas mal, pas encore : tu entends le bruit.',
        'Les lavandières reprennent leurs battoirs. La vieille te regarde, désolée, comme on regarde un linge qu’on n’a pas pu sauver.',
        'Au matin, on te retrouve au bord du lavoir, les bras de travers. Le drap est essoré, mais plus personne ne te confiera de linge.',
      ].join('\n'),
      aftermath:
        'La maison du bas enterra son mort à l’aube, avec un drap essoré de travers. Mael ne lava plus jamais rien, et le bourg confia ses morts à un lavoir bien plus loin.',
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
        'Dire à voix haute, au-dessus du bassin, à qui appartient le drap : à la maison du bas.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu cries le nom de la maison du bas, de toute ta voix, au-dessus du bassin. Les lavandières se figent, les mains dans l’eau.',
        'Sur le chemin de la lande, un volet claque. Quelqu’un a entendu, et quelqu’un se met à pleurer.',
        'Le drap tombe d’un coup sur la dalle, comme un oiseau touché. La vieille s’éloigne sans te regarder. Il n’est pas essoré.',
        'Dans la maison du bas, on a appris la mort par une voix inconnue, avant l’aube. On te cherchera longtemps pour savoir qui tu étais.',
      ].join('\n'),
      aftermath:
        'Le deuil de la maison du bas fut pleuré avant l’heure, et personne ne sut dire qui avait crié. Au printemps, on parlait encore d’une voix venue de la lande, sans visage.',
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
      aftermath:
        'Le battoir suivit quelqu’un jusqu’au bourg tout l’hiver, et les chiens se couchèrent devant les portes. Au printemps, le coup devint plus lent, comme s’il attendait.',
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
        'La vieille pose son drap et te regarde enfin. Elle dit : « Alors tu n’es pas Mael. Tu tiens sa place, et tu n’es pas à nous non plus. »',
        'On te retire le sachet de sel. Un autre viendra laver, un soir, quelqu’un qui sait ce qu’il risque. Et toi, tu portes encore la place de Mael.',
      ].join('\n'),
      aftermath:
        'Le bourg appela Mael quelques semaines, au bord du lavoir, puis cessa. Un autre vint laver au bout d’un mois, et tordit à contre-main, par prudence.',
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
        'Sur la dalle, tes sabots restent côte à côte, rangés comme pour dormir. Au matin, le bourg cherchera qui lavera ses morts.',
      ].join('\n'),
      aftermath:
        'On ne retrouva que les sabots, et le bourg dut laver ses morts lui-même pendant tout l’hiver. Au dégel, l’eau du bassin sentait de nouveau le savon de cendre.',
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

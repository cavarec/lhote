import type { Premise } from './types';

// Prémisse 2 : un jour de pardon, dans une ville de pierre. Le recteur doit porter la chasse en procession.
// Inspirée de : la foi qui guérit et la vérité qui blesse.
//
// Colonne vertébrale :
// - Qui demande quoi : une proche du recteur (l'emplacement « 1 ») veut savoir ce qui s'est passé cette nuit
//   dans la sacristie. Une mère du haut attend un miracle pour son petit. Un envoyé de l'évêché veut voir la chasse.
// - En jeu : la foi de la ville, et l'enfant qui ne marche plus.
// - Le piège : la chasse n'a plus de relique. La crue a emporté l'os du saint il y a douze ans. Loeiz l'a remplacé
//   par un galet de rivière et s'est tu. Cette nuit, pris de fièvre, Loeiz a rouvert la chasse et y a glissé un aveu écrit.
// - Ce que le joueur peut faire : tout dire en portant la chasse ouverte, la refermer, parler au sacristain,
//   jeter la clé, avouer qu'il ne sait pas qui il est, ou monter au clocher.
//
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : pas de miroir dans une sacristie. Le nom du corps est brodé sous le col de la chape.
// - Corps hérité : la fièvre. Elle retire « reste calme » et ajoute « appuie-toi ». Elle explique
//   aussi pourquoi l'hôte ne se souvient pas de la nuit.
// - Qui était ce corps : Loeiz, recteur depuis vingt ans (voir `host`).

const EPOCH = 'un jour de pardon, au tournant du siècle';

export const premise02: Premise = {
  id: 'premise-02',
  title: 'Le jour du pardon',
  epoch: EPOCH,

  // Beat 1 : l'encens, la cire, la chaleur de la fièvre. Aucune information.
  wakeup: [
    'Il fait chaud et il fait froid. La chaleur est dans ta tête, le froid dans tes os. Les deux ne se parlent pas.',
    'Tu sens de l’encens, de la cire chaude, de la pierre mouillée. Une odeur de lin amidonné, aussi, très près de ton visage.',
    'Une autre odeur monte du dallage, très faible : de la rivière, de la vase. Dans une église, c’est étrange.',
    'Dehors, une foule respire. Des milliers de pieds sur des pavés, des toux, des enfants qu’on fait taire. Un chant monte et retombe.',
    'Au-dessus, des cloches. Elles ne sonnent pas ensemble. L’une a de l’avance, l’autre du retard. Elles se rattrapent, puis se perdent.',
    'Une bombarde aiguë reprend le même air, encore et encore. Un air qui n’a pas de fin, rien que des reprises.',
    'Ta langue colle à ton palais. Tu as soif d’une soif de plusieurs jours, qui ne se dit pas, qui se supporte.',
    'Tu cherches ce que tu as fait cette nuit. Tu ne trouves rien. Rien qu’un blanc propre, lavé, comme un linge.',
    'Tes genoux te font mal. Pas d’une douleur de marche : d’une douleur d’avoir tenu longtemps la même position.',
    'Tu serres quelque chose de froid dans le poing. Du métal, avec des dents. Tu ne sais pas depuis quand.',
    'Tu cherches ton nom. Tu ne trouves qu’un titre, que la foule répète au loin : recteur. Ce mot ne dit pas qui tu es.',
    'On frappe deux fois à une porte de bois épais. Une voix redit ton titre. Elle attend derrière le bois, sans entrer.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, la fièvre, l'absence de miroir.
  orientation: [
    {
      kind: 'material',
      text: 'Une sacristie voûtée, aux murs nus. Sur la table, une chasse d’argent ternie, grande comme un pain, fermée d’un sceau de cire rouge. Autour, des cierges, un encensoir, une chape pliée.',
    },
    {
      kind: 'material',
      text: 'Par la fenêtre, une place pleine : bannières brodées, coiffes blanches, pèlerins à genoux. Entre deux flèches de pierre, un roi de pierre à cheval, tourné vers l’ouest.',
    },
    {
      kind: 'material',
      text: 'Dans l’angle, une statue de bois couverte d’un drap. Le drap dessine un crâne, des épaules maigres et un long manche. C’est l’Ankou, celui qui vient chercher les vivants. Un jour par an, on le cache.',
    },
    {
      kind: 'material',
      text: 'Dans ton poing, une clé de fer à tête ronde. Elle est tiède. Une chaîne la retient à ton cou, et elle a laissé sa marque dans ta paume.',
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

  // Beat 3 : premier contact. L'emplacement « 1 » entre : une proche du recteur, qui a vu de la lumière cette nuit.
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
        text: 'Il y a une mère du haut, avec son petit qui ne marche plus. Elle a fait la route à genoux. Elle dit que la chasse guérit, et que tu le sais mieux que personne.',
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
      {
        speaker: 'npc',
        text: 'Alors dis-moi ce que nous faisons. Je suis avec toi, quoi que tu décides.',
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
        id: 'qui-es-tu',
        kind: 'informative',
        text: '« Dis-moi une chose : depuis quand suis-je recteur ici ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Quelle question. Vingt ans. Tu as baptisé la moitié de ceux qui sont sur la place, et enterré l’autre moitié.',
          },
          {
            speaker: 'npc',
            text: 'Les gosses t’appellent le recteur qui ne dort jamais. Et toi, tu ne dis jamais ton prénom, pas même à moi.',
          },
          {
            speaker: 'narration',
            text: 'La personne te regarde, inquiète. « Tu me fais peur, ce matin. On dirait que tu demandes à un autre. »',
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
            text: 'À un moment, j’ai cru t’entendre parler. Pas à moi. À quelqu’un qui n’était pas là.',
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
    ],

    // Seconde passe : l'envoyé de l'évêché monte l'escalier.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Une cloche sonne, grave, trois fois. Ce n’est pas la tienne. Elle vient de la place, et elle dit que la patience a des limites.',
        },
        {
          speaker: 'npc',
          text: 'Le chantre vient de me le dire : l’évêché a envoyé quelqu’un ce matin. Il veut voir la chasse ouverte avant la procession.',
        },
        {
          speaker: 'npc',
          text: 'S’il l’ouvre devant tout le monde, qu’est-ce qu’il y trouve ? Dis-le-moi, que je sache quoi faire de mes mains.',
        },
        {
          speaker: 'narration',
          text: 'Dans l’angle, le drap de la grande statue bouge sans vent. Le long manche qui dépasse a changé de côté.',
        },
        {
          speaker: 'npc',
          text: 'Il monte l’escalier. Que fais-je ?',
        },
      ],
      choices: [
        {
          id: 'recevoir-lenvoye',
          kind: 'neutral',
          text: '« Fais-le monter. Je le recevrai. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Comme tu voudras. Mais garde la clé hors de sa vue.',
            },
            {
              speaker: 'narration',
              text: 'La personne ouvre la porte et guette. Tu entends des pas dans l’escalier, deux paires, une lente et une pressée.',
            },
          ],
        },
        {
          id: 'demander-ce-quil-sait',
          kind: 'informative',
          text: '« Que savent-ils, sur la place, de cette nuit ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Ils savent que la lumière a brûlé jusqu’au matin. Ils savent que la cloche d’en dessous a sonné : celle qu’on dit enterrée sous la rivière.',
            },
            {
              speaker: 'npc',
              text: 'Ils ne savent pas ce que tu as fait. Mais ils attendent que tu le dises, et ils sont nombreux à attendre.',
            },
            {
              speaker: 'narration',
              text: 'La personne baisse la voix : « Moi aussi, j’attends. Je n’ose pas le demander. »',
            },
          ],
        },
        {
          id: 'renvoyer-lenvoye',
          kind: 'risky',
          text: '« Renvoie-le. La chasse n’est pas à lui. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Le renvoyer ? Un envoyé de l’évêque ? Tu perds la tête, recteur.',
            },
            {
              speaker: 'narration',
              text: 'Le mot est tombé trop près de la vérité. La personne te regarde comme on regarde un puits dont on a oublié le fond.',
            },
          ],
        },
        {
          id: 'prier-un-peu-plus',
          kind: 'neutral',
          text: 'Poser la main sur la chasse et ne pas répondre.',
          reply: [
            {
              speaker: 'narration',
              text: 'L’argent est tiède sous ta paume, comme une peau. Tu retires la main trop vite.',
            },
            {
              speaker: 'npc',
              text: 'Elle est chaude. Moi aussi, je l’ai sentie, tout à l’heure. Qu’y a-t-il dedans ?',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Un indice de chaque nature mène à une vérité : la chasse a été ouverte cette nuit,
  // le sacristain l'a vu, et le nom du corps est brodé sous le col de la chape. Le joueur n'en examine que deux.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le tiroir de la table, sous les nappes d’autel, un petit paquet noué d’une ficelle. Il est lourd et froid. Ta main ne tremble pas en le défaisant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Tu soulèves le couvercle de la chasse d’un doigt. Au fond, pas d’os de saint : un galet gris de rivière, lisse, et un papier plié en quatre.',
    },
    {
      kind: 'material',
      text: 'Sous le col de la chape, un nom brodé au fil rouge, déjà usé : « Loeiz ». C’est le nom que ce corps a porté vingt ans.',
      revealsTruth: 'nom-dans-la-chape',
    },
    {
      kind: 'material',
      text: 'Sur le bord de la chasse, des éclats de cire rouge. Le sceau a été rompu, puis recollé avec de la salive et du pouce, cette nuit.',
    },
    {
      kind: 'material',
      text: 'Trois cierges, consumés jusqu’au bout, au pied de l’autel. Quelqu’un a veillé ici toute la nuit, et n’a pas voulu qu’on le voie.',
    },
    {
      kind: 'bodily',
      text: 'Ta clé entre dans la serrure de la chasse sans résistance. Elle a l’habitude de ce geste. Le métal est usé là où tes doigts reposent : tu l’as ouverte cette nuit.',
      revealsTruth: 'tu-as-ouvert-la-chasse',
    },
    {
      kind: 'bodily',
      text: 'Tes genoux portent l’empreinte du dallage : deux marques rouges, profondes. Tu as prié ici toute la nuit, à genoux, sans arrêt.',
    },
    {
      kind: 'bodily',
      text: 'Du bout des doigts, de l’encre noire, encore fraîche sous l’ongle. Ces mains bénissent plus qu’elles n’écrivent. Cette nuit, elles ont écrit longtemps.',
    },
    {
      kind: 'bodily',
      text: 'Un goût de cire et de larmes sèches reste sur tes lèvres. Tu as pleuré cette nuit, longtemps, sans te l’avouer.',
    },
    {
      kind: 'bodily',
      text: 'Tu poses la main sur la pierre froide du mur. La fièvre recule un instant. Elle revient dès que tu t’en détaches.',
    },
    {
      kind: 'social',
      text: 'Le sacristain évite ton regard. Il dit tout bas, sans qu’on l’interroge : « Cette nuit, je t’ai vu à genoux devant la chasse. Tu parlais à la rivière. »',
      revealsTruth: 'sacristain-a-vu',
    },
    {
      kind: 'social',
      text: 'Le porteur de bannière dit à voix basse : « On a entendu la cloche d’en dessous, cette nuit, celle qui sonne sous la rivière. L’as-tu entendue, toi aussi ? »',
    },
    {
      kind: 'social',
      text: 'Une vieille, sur le seuil, te tend un cierge. « C’est toi qui as enterré mon petit, il y a douze ans, après la crue. Tu n’as plus bien dormi depuis. »',
    },
    {
      kind: 'social',
      text: 'Par la fenêtre, tu vois la mère du haut. Elle porte son petit sur le dos, trop grand pour être porté. Elle ne pleure pas. Elle attend.',
    },
    {
      kind: 'social',
      text: 'Le chantre murmure à son voisin : « Le sceau n’avait pas bougé depuis la crue, douze ans. Quelqu’un l’a touché. » Le voisin hausse les épaules.',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['tu-as-ouvert-la-chasse', 'sacristain-a-vu'],
      lines: [
        {
          speaker: 'narration',
          text: 'La porte du fond s’ouvre. Le sacristain entre, et derrière lui l’envoyé de l’évêché, une main déjà posée sur la chasse.',
        },
        {
          speaker: 'npc',
          text: 'Je n’ai rien dit, recteur. Je n’ai rien vu. Mais il a des yeux, lui, et il a déjà touché le sceau.',
        },
        {
          speaker: 'narration',
          text: 'L’envoyé sourit, très poli. Il dit : « Le sceau est neuf. Qui l’a refait ? » Le sacristain regarde le sol. Toi aussi.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, les cloches se mettent à sonner ensemble, de plus en plus fort. Sous le tumulte, tu entends celle d’en dessous qui répond.',
        },
        {
          speaker: 'narration',
          text: 'Tu as le temps de souffler une fois. Ensuite, il faudra choisir qui, de toi ou de lui, ouvrira la chasse.',
        },
      ],
    },
    {
      requires: ['tu-as-ouvert-la-chasse'],
      lines: [
        {
          speaker: 'narration',
          text: 'Tes doigts retrouvent d’eux-mêmes la bonne dent de la clé. Ce corps a rouvert la chasse cette nuit, et il s’en souvient mieux que toi.',
        },
        {
          speaker: 'narration',
          text: 'Un souvenir te revient, à peine : de l’encre, une plume, et la peur d’être lu. Puis l’odeur de rivière monte de la chasse et emplit la pièce.',
        },
        {
          speaker: 'narration',
          text: 'Dans l’escalier, des pas pressés. La voix de l’envoyé demande où est le recteur. Elle est très près de la porte.',
        },
      ],
    },
    {
      requires: ['sacristain-a-vu'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le sacristain t’a rejoint sans bruit. Il te glisse, au creux de la main, un petit morceau de cire rouge brisée.',
        },
        {
          speaker: 'npc',
          text: 'Je l’ai ramassé sous l’autel, cette nuit. Je l’ai gardé dans ma manche. Je ne peux plus le garder.',
        },
        {
          speaker: 'narration',
          text: 'Il s’éloigne vers la porte, la tête basse. L’envoyé est déjà là, qui t’attend, les mains dans le dos.',
        },
      ],
    },
    {
      requires: ['nom-dans-la-chape'],
      lines: [
        {
          speaker: 'narration',
          text: 'Par la fenêtre, une voix de femme monte de la place, claire, sans peur. Elle crie ton nom : « Loeiz ! »',
        },
        {
          speaker: 'narration',
          text: 'C’est la mère du haut. Elle ne crie pas pour toi, mais pour la chasse. Elle appelle celui qui sait, et elle sait ton nom.',
        },
        {
          speaker: 'narration',
          text: 'Derrière toi, la porte s’ouvre. L’envoyé de l’évêché est là. Il demande, très poli, que le recteur Loeiz lui montre la chasse.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'La porte s’ouvre sans que personne ait frappé. L’envoyé de l’évêché est là, les mains dans le dos, et il regarde la chasse.',
        },
        {
          speaker: 'narration',
          text: 'Une odeur de vase monte sous la porte, puis le bruit de l’eau. Dans l’angle, le drap de la statue tombe, et personne ne l’a touché.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, la foule se tait d’un coup. Elle a vu l’envoyé monter. Elle attend que le recteur sorte lui expliquer.',
        },
      ],
    },
  ],

  // « Laisser ta main faire » : ce que le corps hérité fait seul, fixé par la prémisse.
  handLetGo: {
    dialogue: {
      outcome: 'betrays',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main se lève et trace le signe, large, trop appuyé, devant le visage de la personne. Ta bouche récite la bénédiction d’une seule traite.',
        },
        {
          speaker: 'narration',
          text: 'La personne recule d’un pas. « Tu ne m’as jamais bénie comme ça. Tu parles comme un livre. »',
        },
        {
          speaker: 'narration',
          text: 'Le corps a fait ce que le recteur fait pour les autres. Il n’a rien fait de ce qu’il fait pour elle.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'tu-as-ouvert-la-chasse',
      lines: [
        {
          speaker: 'narration',
          text: 'Ta main glisse dans l’échancrure de la chemise et ressort avec la clé. Elle la présente à la serrure avant que tu y aies pensé.',
        },
        {
          speaker: 'narration',
          text: 'Le métal est usé là où tes doigts reposent. La clé tourne sans résistance. Ce geste, tu l’as déjà fait, et plus d’une fois.',
        },
        {
          speaker: 'narration',
          text: 'Tu retires la main. Elle tremble, et elle a l’air d’en savoir plus que toi.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-03', 'fracture-04'],

  // Qui était ce corps : l'écran de fin le dit, quelle que soit l'issue.
  host: {
    name: 'Loeiz',
    role: 'recteur de la paroisse et gardien de la chasse aux guérisons',
    story:
      'Loeiz tenait la paroisse depuis vingt ans. Quand la crue a emporté l’os du saint, Loeiz l’a remplacé par un galet de rivière et a gardé le silence douze ans. Cette nuit-là, Loeiz a écrit l’aveu et l’a glissé dans la chasse.',
    truth: 'nom-dans-la-chape',
  },

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'porter-la-chasse-ouverte',
      requiresAny: ['tu-as-ouvert-la-chasse', 'sacristain-a-vu', 'nom-dans-la-chape'],
      choiceText: 'Porter la chasse ouverte en tête de la procession et dire la vérité.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu sors sur la place, la chasse ouverte dans les mains. Tu dis ton nom, Loeiz, puis ce qu’elle contient : un galet de rivière, et douze ans de silence.',
        'Un murmure traverse la foule, puis un silence. La mère du haut s’approche. Elle pose la main sur le galet et dit : « C’est chaud. »',
        'Tu déplies le papier, ton aveu, et tu le lis jusqu’au bout. Personne ne bouge. L’envoyé de l’évêché baisse la tête le premier.',
        'Le soir, ta fièvre tombe. Quelqu’un a laissé un cierge allumé devant ta porte.',
        'Dans la nuit, sous la rivière, la grande cloche sonne comme on dit merci. Puis, plus bas, une seconde cloche répond, que personne n’a jamais entendue.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'la-chasse-a-ete-ouverte',
            summary:
              'La foule a vu l’intérieur de la chasse, et le recteur a dit la vérité.',
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
        'La mère du haut te touche la manche au passage. Son petit ne marche pas, mais il sourit.',
        'Le soir, tu ne dors pas. Tu sais ce que contient la chasse. Tu es le seul à le savoir, avec la rivière.',
        'Vers minuit, un grincement monte du fond de l’église. Quelqu’un soulève le drap de la statue, juste assez pour voir.',
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
        'Quand tu rouvres la porte, le sacristain n’est plus là. Sur le dallage, des pas mouillés vont de l’autel à la rivière.',
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
        'Sur l’eau, la clé flotte un instant, puis une main pâle sort de la vase et la prend. Tu ne restes pas pour la voir se refermer.',
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
        'À travers la porte, tu entends l’envoyé ouvrir la chasse. Il y a un long silence, puis il lit à voix haute un papier plié, jusqu’au bout.',
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
        'Derrière toi, une voix très douce dit ton nom. Tu te retournes. Il y a un manche long, posé contre le mur, et personne pour le tenir.',
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

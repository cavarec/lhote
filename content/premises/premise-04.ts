import type { Premise } from './types';

// Prémisse 4 (saison) : Kalan Goañv, la nuit où les morts rentrent à la ferme. Elle sort autour de la
// Toussaint. L'hôte est le maître de la maison : il veille, la porte entrouverte, la table dressée.
// Inspirée de : la coutume bretonne de laisser le feu, le lait, les crêpes et la table aux morts, et
// de la lanterne de navet qu'on poste au carrefour.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : le reflet dans la vitre noire arrive un battement trop tard.
// - Corps hérité : les doigts comptent les couverts sans toi. Ils en comptent un de trop.

const EPOCH = 'une ferme de Basse-Bretagne, la veille de la Toussaint, au siècle dernier';

export const premise04: Premise = {
  id: 'premise-04',
  title: 'La table des absents',
  epoch: EPOCH,
  season: { from: '10-20', to: '11-10', label: 'Kalan Goañv, la nuit des morts' },

  // Beat 1 : la braise, le lait, la cire. Aucune information.
  wakeup: [
    'Le noir sent la tourbe qui couve, le lait tiède et la crêpe froide. Une odeur de navet creusé passe dessous, âcre et sucrée.',
    'Tu écoutes. Le vent tourne autour de la maison comme quelqu’un qui cherche la porte. Il la trouve, la pousse, la laisse entrouverte.',
    'Un chien gémit, très bas, dans la cour. Il ne se plaint pas. Il prévient, à sa manière, de ce qui approche.',
    'Tu es assis. Tu le sais au bois dur sous toi, à la raideur du dos. Devant toi, le feu rougeoie dans l’âtre, entretenu, jamais tout à fait éteint.',
    'Tes doigts remuent sur ton genou. Ils tapent, un à un, comme on compte des gens. Tu les arrêtes. Ils recommencent.',
    'Tu cherches ton nom. Tu trouves une odeur à la place : de la cire, et une peur ancienne que tu ne reconnais pas comme tienne.',
    'Au cou, une médaille de plomb usée, si fine que les visages en sont effacés. Tes doigts la serrent sans toi.',
    'Quelque part au-dessus, un plancher craque, puis un autre. Des gens se couchent en parlant bas. Personne ne parle de ce qui vient.',
    'Dehors, tout au bout du chemin, un point jaune vacille. Une lueur de lanterne, basse, posée au sol. Elle n’avance pas. Elle attend.',
    'Un essieu grince sur la route. Il va au pas, loin, sans cheval. Il s’arrête avant la barrière et ne repart pas.',
    'On frappe à la porte, trois coups plats, puis une pause. Ce n’est pas pour entrer. C’est pour dire qu’on sait que tu es là.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, le miroir et le corps hérité.
  orientation: [
    {
      kind: 'material',
      text: 'Une grande salle basse, aux poutres noires. Au centre, une longue table couverte d’une nappe blanche. Les bancs sont tirés, les assiettes posées, les cuillers en place.',
    },
    {
      kind: 'material',
      text: 'Sur la nappe, des crêpes en pile, un pichet de lait, du cidre dans des bols. Rien n’est pour les vivants. Aujourd’hui, on sert ceux qui viennent.',
    },
    {
      kind: 'material',
      text: 'Au bout de la table, une place de plus. Une assiette de terre, un bol, une cuiller. Le bol est tiède. Sur le fond, la lie d’un lait déjà bu.',
    },
    {
      kind: 'bodily',
      text: 'Tes doigts tapent sur le bois. Un, deux, trois… jusqu’à douze, puis ils hésitent, reviennent et en trouvent un treizième. Tu poses la main à plat. Ils se taisent.',
    },
    {
      kind: 'bodily',
      text: 'La vitre noire de la fenêtre te renvoie un visage fatigué. Il bouge un battement après toi, comme s’il hésitait à te suivre. Il n’a pas l’air d’avoir peur.',
    },
    {
      kind: 'bodily',
      text: 'Tu as mal aux reins d’avoir veillé. Ce corps passe cette nuit-là depuis des années, et il en connaît la patience comme une corvée.',
    },
    {
      kind: 'social',
      text: 'Au mur, un tablier de toile, une faucille et un chapelet d’os de seiche. Sur le banc, des sabots d’adulte rangés, et une paire d’enfant qui n’a jamais servi.',
    },
    {
      kind: 'social',
      text: 'Une vieille, dans l’ombre de la cheminée, marmonne : « Il est venu trop tôt. On n’a jamais vu ça. Il avait faim, celui-là. » Les autres font mine de ne pas entendre.',
    },
    {
      kind: 'social',
      text: 'Par la porte entrouverte, des voix d’hommes, dehors, très basses. Quand tu bouges, elles s’arrêtent. Puis elles reprennent, plus bas encore.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 1 » entre. Le choix risqué accuse trop tôt.
  openingDialogue: {
    npcId: '1',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un entre en poussant la porte du coude, un bol froid dans chaque main. Le vent de la cour reste collé à ses vêtements.',
      },
      {
        speaker: 'npc',
        text: 'Je n’ai pas dormi. Je suis passé à l’étable, au puits, à la barrière. Tout est en ordre. Sauf ça.',
      },
      {
        speaker: 'narration',
        text: 'La personne pose le menton vers le bout de la table, sans oser la regarder. Elle compte à voix basse, et s’arrête à douze.',
      },
      {
        speaker: 'npc',
        text: 'Il y avait douze places à minuit. J’ai tout vérifié. À présent, il y en a treize. Et le bol est vide.',
      },
      {
        speaker: 'npc',
        text: 'Les morts viennent à la Kalan, c’est normal. Mais ils viennent après minuit. Pas avant. Pas à ce bout de table.',
      },
      {
        speaker: 'narration',
        text: 'Elle fixe ton visage, longtemps. Elle cherche quelque chose que tu devrais dire, et que tu ne connais pas.',
      },
      {
        speaker: 'npc',
        text: 'C’est toi qui as fermé la maison ce soir. C’est toi qui as dressé. Dis-moi que tu as compté juste.',
      },
    ],
    choices: [
      {
        id: 'tenir-la-veillee',
        kind: 'neutral',
        text: '« Je veille. Va dormir, je m’occupe de tout. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Dormir ? Ici ? Cette nuit ? Tu me prends pour qui ?',
          },
          {
            speaker: 'narration',
            text: 'La personne s’assied pourtant, au bord du banc, sans quitter la porte des yeux. Elle reste à portée de ta main.',
          },
        ],
      },
      {
        id: 'demander-le-bol',
        kind: 'informative',
        text: '« Le bol. Qui l’a rempli ? Qui l’a vidé ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Moi, je ne l’ai pas rempli. Le lait était dans le pichet à minuit, plein. Puis j’ai tourné la tête.',
          },
          {
            speaker: 'npc',
            text: 'Quand j’ai regardé, le bol était là, tiède, avec une cuiller dedans. Aucune porte n’avait bougé.',
          },
          {
            speaker: 'narration',
            text: 'La personne se frotte les bras. Elle en a trop dit, et elle sait que tu l’as entendu.',
          },
        ],
      },
      {
        id: 'accuser',
        kind: 'risky',
        text: '« Quelqu’un de la maison a fait ça. Un vivant. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Un vivant ? Dans la maison ? Tu accuses qui ? Tu as dit ça sans réfléchir.',
          },
          {
            speaker: 'narration',
            text: 'La voix est devenue très égale, comme celle de quelqu’un qui marche sur la glace. Elle ne te lâche plus du regard.',
          },
          {
            speaker: 'npc',
            text: 'Ne le répète pas aux autres. Pas cette nuit. Pas avant d’avoir compris.',
          },
        ],
      },
      {
        id: 'regarder-le-treizieme',
        kind: 'neutral',
        text: 'Ne rien dire et aller voir la treizième place.',
        reply: [
          {
            speaker: 'narration',
            text: 'Les dalles sont froides sous tes pieds. Tu avances comme on approche d’un chien inconnu, les mains ouvertes.',
          },
          {
            speaker: 'npc',
            text: 'Je reste là. Je n’ai pas envie de voir ça de plus près.',
          },
          {
            speaker: 'narration',
            text: 'L’assiette est de la même terre que les autres, ébréchée au même endroit. Quelqu’un l’a prise dans le bahut de la maison.',
          },
        ],
      },
    ],

    // Seconde passe : la nuit avance, les voisins viennent voir, et le chien se tait.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Dans la cour, le chien cesse de gémir tout d’un coup. Ce silence est pire. Le vent aussi a cessé, comme si on retenait son souffle.',
        },
        {
          speaker: 'npc',
          text: 'Entends-tu ? Plus rien. Il fait ça quand ils arrivent. Il y a quelqu’un sur le chemin.',
        },
        {
          speaker: 'npc',
          text: 'Les voisins ont vu la lanterne de navet, au carrefour. Ils disent qu’elle ne devait pas brûler avant minuit.',
        },
        {
          speaker: 'narration',
          text: 'Par la vitre, tu vois les hommes, là-bas, qui se serrent. Quelqu’un pointe vers la ferme. Deux se signent.',
        },
        {
          speaker: 'npc',
          text: 'Ils vont venir ici, avec leurs questions. Je leur dis quoi ?',
        },
      ],
      choices: [
        {
          id: 'les-faire-attendre',
          kind: 'neutral',
          text: '« Dis-leur que la maison est fermée jusqu’à l’aube. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Fermée ? Avec la porte entrouverte ? Ils ne me croiront jamais.',
            },
            {
              speaker: 'narration',
              text: 'La personne sort quand même. Tu l’entends parler dans la cour, d’une voix un peu trop forte, pour que tu l’entendes.',
            },
          ],
        },
        {
          id: 'demander-la-lanterne',
          kind: 'informative',
          text: '« Cette lanterne au carrefour. Qui la garde ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Personne ne la garde. On la pose le soir, on la laisse. C’est pour guider ceux qui s’égarent.',
            },
            {
              speaker: 'npc',
              text: 'Mais celle de ce soir, nul ne l’a posée. On l’a trouvée allumée, avec un navet que personne n’a creusé.',
            },
            {
              speaker: 'narration',
              text: 'Elle jette un coup d’œil vers l’assiette de terre, puis détourne le regard. Elle sait quelque chose, et elle voudrait l’oublier.',
            },
          ],
        },
        {
          id: 'refermer-la-porte',
          kind: 'risky',
          text: 'Pousser la porte et tirer le verrou.',
          reply: [
            {
              speaker: 'npc',
              text: 'Non ! Pas ça ! On ne ferme pas la porte à la Kalan ! Ils reviendront quand même, et ils seront en colère !',
            },
            {
              speaker: 'narration',
              text: 'Le verrou grince, puis lâche, comme poussé de l’intérieur. La porte se rouvre d’elle-même sur la nuit. Rien n’a bougé dehors.',
            },
          ],
        },
        {
          id: 'demander-le-nom',
          kind: 'informative',
          text: '« Qui est mort, dans cette maison, sans avoir eu de place à table ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Sans place ? Il y en a toujours un, dans une maison. Personne n’en parle.',
            },
            {
              speaker: 'npc',
              text: 'Demande à la vieille, près du feu. Mais ne demande pas devant les autres. Et ne dis pas que c’est moi qui te l’ai dit.',
            },
            {
              speaker: 'narration',
              text: 'Elle baisse la voix encore : « C’est un nom qu’on a gardé sous la langue depuis longtemps. »',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le couvert a été dressé de ta main ; quelqu'un connaît le nom.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le bahut, sous les nappes pliées, un objet enveloppé d’un linge. Il est lourd et froid. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Tes doigts se posent sur le bol. Ils connaissent le grain de la terre cuite. Ils l’ont tenu cette nuit, ils l’ont rempli, ils l’ont posé là : le couvert est de ta main.',
      revealsTruth: 'couvert-de-ta-main',
    },
    {
      kind: 'material',
      text: 'Sous le bol, des lettres grattées à la pointe d’un clou. Un nom, très petit, dont chaque trait a été creusé avec soin. Quelqu’un a voulu qu’il dure.',
    },
    {
      kind: 'material',
      text: 'Sur la nappe, près de l’assiette, une miette de crêpe et trois gouttes de lait. Elles forment un petit chemin qui part du bol et s’arrête au bord de la table.',
    },
    {
      kind: 'social',
      text: 'La vieille se lève, s’approche du bol, le regarde longtemps. Elle prononce un nom. Pas celui d’un grand. Celui d’un enfant. Puis elle se signe.',
      revealsTruth: 'nom-sur-lecuelle',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. Il ne regarde ni la table, ni toi. Quand tu le fixes, il serre sa casquette à la tordre.',
    },
    {
      kind: 'social',
      text: 'Une femme, près de la fenêtre, murmure : « Cet enfant-là, on n’a pas le droit d’en parler. Il n’a pas eu d’eau sur la tête. »',
    },
    {
      kind: 'social',
      text: 'Un petit, derrière la porte, glisse la tête et dit tout bas : « Il est venu me voir, hier soir. Il voulait jouer. » Une main l’attire en arrière.',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche a un goût de lait et de cire. Tu as dû boire, cette nuit, sans te le rappeler. Une fatigue douce, qui n’est pas celle du veilleur.',
    },
    {
      kind: 'bodily',
      text: 'Dans ta poche, une petite cuiller de bois, usée, mordillée. Elle n’est à personne dans cette salle. Elle est dans ta main depuis longtemps.',
    },
    {
      kind: 'material',
      text: 'Par terre, près de la table, deux petites traces de pieds nus, humides. Elles viennent de la porte, font le tour de la table, et s’arrêtent au treizième couvert.',
    },
    {
      kind: 'material',
      text: 'Au mur, derrière la porte, un crochet qui a longtemps tenu un petit manteau. Un tour de clou rouillé, plus clair que le plâtre autour.',
    },
    {
      kind: 'social',
      text: 'Un voisin dit à mi-voix : « Il y a trois nuits, la lanterne s’est allumée toute seule. Cette fois, elle a bougé. Elle est venue jusqu’à la barrière. »',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat plus fort quand tu regardes la place vide. Ce corps connaît ce qu’il y manque, et il ne veut pas que tu le saches.',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['couvert-de-ta-main', 'nom-sur-lecuelle'],
      lines: [
        {
          speaker: 'narration',
          text: 'La lanterne a quitté le carrefour. Tu la vois par la vitre, qui remonte le chemin, et jamais personne ne la porte.',
        },
        {
          speaker: 'narration',
          text: 'La vieille est à ton coude. Elle a quitté son coin sans bruit. Elle dit le nom une deuxième fois, tout bas, comme on ouvre un tiroir.',
        },
        {
          speaker: 'npc',
          text: 'Tu l’as dressé pour lui, chaque année, en secret. Tu croyais que personne ne voyait. Cette année, il a eu faim avant l’heure.',
        },
        {
          speaker: 'narration',
          text: 'Dans la salle, le feu baisse d’un coup. Sur la treizième chaise, rien ne s’assied. Mais le banc plie, comme sous un poids d’enfant.',
        },
        {
          speaker: 'narration',
          text: 'On frappe trois fois à la porte entrouverte. Tu comprends que celui qui attend dehors ne frappe pas pour entrer. Il frappe pour que tu viennes.',
        },
      ],
    },
    {
      requires: ['couvert-de-ta-main'],
      lines: [
        {
          speaker: 'narration',
          text: 'Tes mains ne tremblent pas. Elles savent ce qu’elles ont fait : tu as dressé ce couvert, et tu l’as oublié aussitôt.',
        },
        {
          speaker: 'narration',
          text: 'Alors le chien, dehors, se remet à gémir. Une seule note, longue, tournée vers le carrefour. Toute la maison l’entend, tu le sais au silence.',
        },
        {
          speaker: 'narration',
          text: 'La lanterne, au loin, s’est mise en marche. Elle vient vers la ferme, d’un pas de petit enfant, un peu penché.',
        },
      ],
    },
    {
      requires: ['nom-sur-lecuelle'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le nom est dit, et tout le monde l’a entendu. Les voisins reculent d’un pas, comme si le mot pesait.',
        },
        {
          speaker: 'npc',
          text: 'Ne le dis plus ici. Il y a longtemps qu’on l’enterre, ce nom-là. Chaque fois qu’on le dit, il se relève un peu.',
        },
        {
          speaker: 'narration',
          text: 'Dans la cour, une pelle racle un caillou. Quelqu’un a commencé à creuser près du mur du jardin, sans attendre ton avis.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'Tu n’as pas fini de regarder quand la porte s’ouvre en grand. Les voisins entrent sans attendre, avec le froid, et trois lanternes.',
        },
        {
          speaker: 'narration',
          text: 'Ils s’arrêtent devant la table. Ils comptent, eux aussi. Ils arrivent à treize, et se taisent. Puis tous les yeux se tournent vers toi.',
        },
        {
          speaker: 'narration',
          text: 'Tu ne sais pas encore pourquoi. Mais tu as l’impression que cette nuit, tout le monde a pris de l’avance sur toi.',
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
          text: 'Tes doigts prennent le pichet, versent le lait dans le bol du bout de table, le reposent à la place exacte. Tu n’y as pas pensé.',
        },
        {
          speaker: 'narration',
          text: 'La personne a cessé de trembler. « C’est comme ça qu’on fait, oui. Tu sais ce que tu fais, après tout. »',
        },
        {
          speaker: 'narration',
          text: 'Ta main a rassuré la maison à ta place. Elle connaissait ce geste mieux que ta tête.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'couvert-de-ta-main',
      lines: [
        {
          speaker: 'narration',
          text: 'Tes doigts reprennent leur compte sur la nappe : un, deux, trois, jusqu’à douze, puis un treizième, qu’ils posent sur le bol.',
        },
        {
          speaker: 'narration',
          text: 'Ils le tiennent par le bord, comme on tient une chose qu’on a déjà tenue. La terre est tiède.',
        },
        {
          speaker: 'narration',
          text: 'Tu comprends que ce couvert n’est pas arrivé tout seul. Ta main l’a dressé, et elle ne te l’a pas dit.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-07', 'fracture-08'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'servir-le-bol-et-dire-le-nom',
      requiresAny: ['couvert-de-ta-main', 'nom-sur-lecuelle'],
      choiceText:
        'Remplir le bol du bout de la table et dire à voix haute le nom gravé dessous.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu verses le lait. Il fume un peu, comme s’il tombait dans une main. Puis tu dis le nom, une seule fois, assez fort pour la salle.',
        'Personne ne bouge. La vieille ferme les yeux. Un homme retire sa casquette, et il pleure sans bruit, ce qu’il n’avait jamais fait.',
        'Dans le bol, le lait baisse, à petites gorgées, comme boit un enfant. Le banc se détend. Une chaleur passe dans la pièce, puis part.',
        'Dehors, la lanterne se pose au sol, et s’éteint. Le chien aboie une fois, content. La nuit continue, et elle est enfin la bonne.',
        'À l’aube, la treizième assiette est vide et propre. Quelqu’un a rangé la cuiller de bois dans ta poche, sans que tu l’aies sentie.',
      ].join('\n'),
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'un-nom-dit-a-la-table',
            summary:
              'Un enfant sans nom a eu sa place à la table des morts, et son nom a été dit.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'lenfant-sans-nom',
            characterId: '1',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'retirer-le-couvert',
      requiresAny: ['couvert-de-ta-main'],
      choiceText: 'Débarrasser le treizième couvert, tout ranger, et fermer le sujet.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends l’assiette, le bol, la cuiller. Tu les ranges dans le bahut, à leur place. Le banc est propre, la nappe est lisse.',
        'Personne ne dit un mot. La famille se lève, rassurée, et monte se coucher. La personne qui veillait avec toi te regarde, puis détourne les yeux.',
        'Vers le matin, on frappe à la porte, trois coups. Tu ne réponds pas. Ceux qui dorment ne répondent pas non plus.',
        'À l’aube, la nappe est tachée de lait, juste devant la place que tu as débarrassée, et elle sent le froid.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'couvert-retire-la-nuit-des-morts',
            description:
              'Une table dont on a retiré la place d’un enfant, la nuit où il venait.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'demander-le-nom-devant-tous',
      requiresAny: ['nom-sur-lecuelle'],
      choiceText: 'Demander à la vieille de dire le nom devant tout le monde.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu la regardes. Elle hésite, puis se lève et dit le nom, très net, devant les voisins serrés dans la porte.',
        'Le silence tombe sur la salle comme un filet mouillé. Un homme sort, d’un pas qui n’a plus rien de calme. Une femme crie.',
        'On se renvoie le blâme : qui a fait taire ? Qui a su ? Les portes se ferment, une à une, dans la cour.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'ferme-aux-volets-clos',
            label: 'Une ferme dont les voisins ne passent plus la barrière',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'suivre-la-lanterne',
      choiceText: 'Prendre une lanterne et marcher jusqu’au carrefour, voir qui attend.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu sors dans la cour. Le froid te prend aux chevilles. Tu suis le chemin, une lanterne à la main, jusqu’au bout.',
        'Au carrefour, le navet creusé brûle sur la pierre. Autour, la terre est piétinée de petits pas. Personne n’y est.',
        'Tu appelles un nom. Un oiseau de nuit répond, puis plus rien. Au retour, la porte de la ferme est fermée, et on ne t’ouvre pas.',
        'Dans ta poche, tu trouves un petit objet que tu n’y avais pas mis. Il est tiède, comme tenu par une main.',
      ].join('\n'),
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'carrefour-du-navet',
            label: 'Un carrefour où une lanterne brûle pour quelqu’un qui n’arrive pas',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-du-carrefour',
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
        'Tu dis que tu ne sais pas qui tu es. Que ces mains ne sont pas à toi, et que tu ne sais pas pour qui tu as dressé.',
        'Personne ne rit. Les voisins se signent. Quelqu’un recule jusqu’à la porte, puis dehors, vers la lumière des lanternes.',
        'On te retire la clef de la maison. Un autre veillera, et ce sera quelqu’un qui sait ce qu’il fait.',
        'Sur le seuil, en partant, tu entends l’essieu. Il grince derrière toi, au pas, et il te suit jusqu’à la dernière ferme.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'sortir-dans-la-cour',
      choiceText:
        'Sortir seul dans la cour, au premier coup de minuit, voir ce qui passe.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu sors. La cour est blanche de givre, la lune basse. Le chien ne bouge pas, couché, les yeux ouverts.',
        'Un essieu grince, tout près. Un char passe derrière le mur, très lent, tiré par personne. Une odeur de terre fraîche entre dans ta bouche.',
        'Tu vois une silhouette longue, sous un chapeau large, qui tient un manche. Elle se retourne. Elle n’a pas de visage, rien qu’une attention.',
        'Elle te désigne le char. Tu comprends qu’il y a de la place. Tu montes, et le grincement continue, sans toi, vers la mer.',
      ].join('\n'),
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'maitre-de-ferme-pris-par-le-cortege',
            description:
              'Quelqu’un qui veillait les morts, parti sur le char la nuit de la Kalan.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

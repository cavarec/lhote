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

// COLONNE VERTÉBRALE
// - Qui demande quoi : la personne qui veille avec toi demande pourquoi un treizième couvert est dressé,
//   et son bol vidé, avant minuit.
// - Ce qui est en jeu : un enfant mort sans baptême, enterré au mur du jardin et dont on ne dit plus le
//   nom, est venu avant l'heure. Ignoré, il reviendra en colère ; nommé devant tous, il fait honte à la ferme.
// - Le piège : c'est toi, Alix, qui tiens la ferme, qui dresses ce couvert en secret chaque année et qui as
//   gravé le nom sous le bol. Le corps le sait, pas toi, et la maison ne doit pas le savoir.
// - Ce que tu peux faire : servir le bol et dire le nom (juste), tout débarrasser, le faire dire par la
//   vieille, aller au carrefour, avouer ton trou, ou sortir seul au premier coup de minuit.
// Qui es-tu : Alix, qui tient la ferme (livre de comptes, mains, choix « qui-es-tu »). L'enfant s'appelle Loïk.

const EPOCH = 'une ferme de Basse-Bretagne, la veille de la Toussaint, au siècle dernier';

export const premise04: Premise = {
  id: 'premise-04',
  title: 'La table des absents',
  epoch: EPOCH,
  season: { from: '10-20', to: '11-10', label: 'Kalan Goañv, la nuit des morts' },

  // Qui était ce corps : la réponse que l'écran de fin donne, quelle que soit l'issue.
  host: {
    name: 'Alix',
    role: 'celui ou celle qui tenait la ferme, la clef et les comptes',
    story:
      'Alix avait perdu un enfant, Loïk, avant qu’on ait pu le baptiser. La maison avait décidé de ne plus prononcer son nom. Chaque nuit de Kalan, Alix dressait pour lui un treizième couvert en secret, et avait gravé son nom sous le bol pour qu’il dure.',
    truth: 'nom-du-corps',
  },

  // L'Observateur, après le premier contact : ce qui doit être réparé, sans dire comment.
  mechanic: {
    kind: 'object',
    label: 'La cuiller de bois',
    button: 'Sortir la cuiller de bois',
    line: 'Tu sors la cuiller de ta poche. La vieille se lève et dit le nom gravé sous le bol, comme on dit une prière.',
    revealsTruth: 'nom-sur-lecuelle',
  },
  briefing: [
    'Je te vois, tu peux respirer. Tu es dans une ferme, la nuit des morts. Il y a un couvert de trop sur cette table.',
    'Voilà ce qui cloche, d’après ce que je sais : quelqu’un est venu avant l’heure, et on l’a oublié. Il faut que la maison le sache.',
    'Ou alors il faut que personne ne le sache. Là, j’avoue, je n’en suis pas sûr. Je ne sais pas non plus comment t’y prendre.',
    'Une chose me frappe : ces mains savent compter les couverts mieux que toi. Fais-leur un peu confiance.',
  ],

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
      text: 'La vitre noire te renvoie un visage fatigué. Il bouge un battement après toi, comme s’il hésitait à te suivre. Tu lui cherches un nom. Rien ne vient.',
    },
    {
      kind: 'bodily',
      text: 'Tu as mal aux reins d’avoir veillé. Ce corps passe cette nuit-là depuis des années, et il en connaît la patience comme une corvée.',
    },
    {
      kind: 'social',
      text: 'Au mur, un tablier de toile, une faucille et un trousseau de clefs. Sur le banc, des sabots d’adulte rangés, et une paire d’enfant qui n’a jamais servi.',
    },
    {
      kind: 'social',
      text: 'Une vieille, dans l’ombre de la cheminée, marmonne : « Il est venu trop tôt. On n’a jamais vu ça. Il avait faim. » Les autres font mine de ne pas entendre.',
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
        text: 'La personne montre le bout de la table du menton, sans oser le regarder. Elle compte à voix basse, et s’arrête à douze.',
      },
      {
        speaker: 'npc',
        text: 'Il y avait douze places, une par mort que nous connaissons. À présent, il y en a treize. Et le bol de la dernière est vide.',
      },
      {
        speaker: 'npc',
        text: 'Les morts viennent à la Kalan, c’est normal. Mais ils viennent après minuit. Pas avant, et pas à une place que personne n’a donnée.',
      },
      {
        speaker: 'narration',
        text: 'La personne fixe ton visage, longtemps. Elle attend de toi quelque chose que tu devrais savoir, et que tu ne sais pas.',
      },
      {
        speaker: 'npc',
        text: 'C’est toi qui as dressé la table ce soir. Dis-moi que tu as compté juste. Dis-moi que ce couvert n’est pas de ta main.',
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
            text: 'Dormir ? Cette nuit ? Avec ce couvert de trop sur la table ? Non. Je reste avec toi.',
          },
          {
            speaker: 'narration',
            text: 'La personne s’assied au bord du banc, sans quitter la porte des yeux. Elle reste à portée de ta main.',
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
            text: 'Moi, je ne l’ai pas rempli. Le lait était dans le pichet, plein. Puis j’ai tourné la tête.',
          },
          {
            speaker: 'npc',
            text: 'Quand j’ai regardé, il y avait un bol de plus, tiède, avec une cuiller dedans. Aucune porte n’avait bougé.',
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
            text: 'Un vivant ? Dans la maison ? Tu accuses qui ? Tu parles sans réfléchir.',
          },
          {
            speaker: 'narration',
            text: 'La voix est devenue très égale, comme celle de quelqu’un qui marche sur la glace. La personne ne te lâche plus du regard.',
          },
          {
            speaker: 'npc',
            text: 'Ne le répète pas aux autres. Pas cette nuit. Pas avant d’avoir compris.',
          },
        ],
      },
      {
        id: 'qui-es-tu',
        kind: 'informative',
        text: '« Regarde-moi. Dis-moi qui je suis, ce soir. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu me demandes ça ? Toi qui tiens cette ferme, qui as les clefs et les comptes ? Les enfants t’appellent « la clef ».',
          },
          {
            speaker: 'npc',
            text: 'Chaque Kalan, tu dresses seul, avant tout le monde. Je ne t’ai jamais demandé pourquoi. Ce soir, je voudrais bien le savoir.',
          },
          {
            speaker: 'narration',
            text: 'La personne te regarde comme on regarde quelqu’un qu’on croyait connaître. Elle n’a pas dit ton nom. Elle a l’air de l’éviter.',
          },
        ],
      },
    ],

    // Seconde passe : la nuit avance, les voisins viennent voir, et le chien se tait.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Dans la cour, le chien cesse de gémir d’un coup. Ce silence est pire. Le vent aussi a cessé, comme si on retenait son souffle.',
        },
        {
          speaker: 'npc',
          text: 'Entends-tu ? Plus rien. Il fait ça quand quelqu’un arrive. Il y a quelqu’un sur le chemin.',
        },
        {
          speaker: 'npc',
          text: 'Les voisins ont vu la lanterne de navet, au carrefour. Ils disent que personne ne devait l’allumer avant minuit.',
        },
        {
          speaker: 'narration',
          text: 'Par la vitre, tu vois les hommes, là-bas, qui se serrent. Quelqu’un pointe vers la ferme. Deux se signent.',
        },
        {
          speaker: 'npc',
          text: 'Ils vont venir ici, avec leurs questions. Que leur dit-on ?',
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
              text: 'Fermée ? À la Kalan, la porte reste entrouverte. Ils ne nous croiront jamais.',
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
              text: 'Personne ne la garde. On la pose le soir, on la laisse. C’est pour guider ceux qui s’égarent sur le chemin.',
            },
            {
              speaker: 'npc',
              text: 'Mais celle de ce soir, nul ne l’a posée. On l’a trouvée allumée, dans un navet que personne n’a creusé.',
            },
            {
              speaker: 'narration',
              text: 'La personne jette un coup d’œil vers le bout de la table, puis détourne le regard. Elle sait quelque chose, et voudrait l’oublier.',
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
              text: 'Non ! Pas ça ! On ne ferme pas la porte à la Kalan. Ils reviendraient quand même, et en colère !',
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
              text: 'Sans place ? Il y en a toujours un, dans une maison. Un enfant, le plus souvent. Personne n’en parle.',
            },
            {
              speaker: 'npc',
              text: 'Demande à la vieille, près du feu. Mais pas devant les autres. Et ne dis pas que c’est moi qui te l’ai dit.',
            },
            {
              speaker: 'narration',
              text: 'La personne baisse la voix encore : « C’est un nom qu’on garde sous la langue depuis longtemps. »',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Le couvert est de ta main ; un enfant sans nom ; qui tu es. Chaque nature se lit d'une traite.
  investigation: [
    {
      kind: 'material',
      text: 'Dans le bahut, sous les nappes pliées, un objet enveloppé d’un linge. Il est lourd et froid. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Sous le bol, des lettres grattées à la pointe d’un clou : LOÏK. Chaque trait a été creusé avec soin. Quelqu’un a voulu que ce nom dure.',
    },
    {
      kind: 'material',
      text: 'Sur le bahut, le livre de comptes de la ferme, ouvert. Chaque page est signée « Alix », d’une écriture qui appuie : celle du nom gravé sous le bol.',
      revealsTruth: 'nom-du-corps',
    },
    {
      kind: 'material',
      text: 'Par terre, deux petites traces de pieds nus, humides. Elles viennent de la porte, font le tour de la table et s’arrêtent au treizième couvert.',
    },
    {
      kind: 'material',
      text: 'Au mur, derrière la porte, un crochet qui a longtemps tenu un petit manteau. Le tour du clou est plus clair que le plâtre : le manteau n’est plus là depuis des années.',
    },
    {
      kind: 'bodily',
      text: 'Tes doigts se posent sur le bol. Ils connaissent le grain de la terre cuite. Ils l’ont rempli, ils l’ont posé là : le couvert est de ta main.',
      revealsTruth: 'couvert-de-ta-main',
    },
    {
      kind: 'bodily',
      text: 'Ta bouche a un goût de lait et de cire. Tu as bu, cette nuit, sans te le rappeler. Une fatigue douce, qui n’est pas celle d’un veilleur.',
    },
    {
      kind: 'bodily',
      text: 'Dans ta poche, une petite cuiller de bois, usée, mordillée par des dents de lait. Elle n’est à personne dans cette salle. Elle est dans ta main depuis des années.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce porte une corne, à l’endroit où l’on serre une plume ou une clef. Ce corps tient les comptes et le trousseau de cette ferme.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat plus fort quand tu regardes la place vide. Ce corps sait ce qu’il y manque, et il ne veut pas que tu le saches.',
    },
    {
      kind: 'social',
      text: 'La vieille se lève, s’approche du bol, le regarde longtemps. Elle dit un nom : « Loïk. » Puis, plus bas, pour toi seul : « Tu l’as gardé trois ans, ce nom-là. » Elle se signe.',
      revealsTruth: 'nom-sur-lecuelle',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. Il serre sa casquette à la tordre. Il murmure : « C’est moi qui l’ai porté au mur du jardin. Sans prêtre. »',
    },
    {
      kind: 'social',
      text: 'Une femme, près de la fenêtre, souffle : « Cet enfant-là, on n’a pas le droit d’en parler. Il n’a pas eu d’eau sur la tête. »',
    },
    {
      kind: 'social',
      text: 'Un petit, derrière la porte, glisse la tête et dit tout bas : « Il est venu me voir, hier soir. Il voulait jouer. » Une main l’attire en arrière.',
    },
    {
      kind: 'social',
      text: 'Un voisin dit à mi-voix : « Il y a trois nuits, la lanterne s’est allumée toute seule. Cette nuit, elle a bougé. Elle est venue jusqu’à la barrière. »',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
  twists: [
    {
      requires: ['couvert-de-ta-main', 'nom-sur-lecuelle'],
      lines: [
        {
          speaker: 'narration',
          text: 'La lanterne a quitté le carrefour. Tu la vois par la vitre qui remonte le chemin, et personne ne la porte.',
        },
        {
          speaker: 'narration',
          text: 'La vieille est à ton coude. Elle a quitté son coin sans bruit. Elle dit le nom une deuxième fois, tout bas, comme on ouvre un tiroir.',
        },
        {
          speaker: 'npc',
          text: 'Tu l’as dressé pour lui chaque année, en secret. Tu croyais que personne ne voyait. Cette année, il a eu faim avant l’heure.',
        },
        {
          speaker: 'narration',
          text: 'Dans la salle, le feu baisse d’un coup. Sur le treizième banc, rien ne s’assied. Mais le bois plie, comme sous un poids d’enfant.',
        },
        {
          speaker: 'narration',
          text: 'On frappe trois fois à la porte entrouverte. Celui qui attend dehors ne frappe pas pour entrer. Il frappe pour que tu viennes.',
        },
      ],
    },
    {
      requires: ['couvert-de-ta-main'],
      lines: [
        {
          speaker: 'narration',
          text: 'Tes mains ne tremblent pas. Elles savent ce qu’elles ont fait : elles ont dressé ce couvert, et tu ne sais pas pour qui.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, le chien se remet à gémir. Une seule note, longue, tournée vers le carrefour. Toute la maison l’entend, tu le sais au silence.',
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
          text: 'La porte s’ouvre en grand. Les voisins entrent avec le froid et trois lanternes. Ils viennent voir le couvert dont toute la cour parle.',
        },
        {
          speaker: 'narration',
          text: 'Ils s’arrêtent devant la table. Ils comptent, eux aussi. Ils arrivent à treize, et se taisent. Puis tous les yeux se tournent vers toi.',
        },
        {
          speaker: 'narration',
          text: 'Personne ne dit qui a dressé. Mais tout le monde sait qui tient les clefs de la maison, et qui dresse la table.',
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
      requiresAny: ['couvert-de-ta-main', 'nom-sur-lecuelle', 'nom-du-corps'],
      choiceText:
        'Remplir le bol du bout de la table et dire à voix haute le nom gravé dessous : Loïk.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu verses le lait. Il fume un peu, comme s’il tombait dans une main. Puis tu dis « Loïk », une seule fois, assez fort pour toute la salle.',
        'Personne ne bouge. La vieille ferme les yeux. L’homme à la casquette la retire et pleure sans bruit, ce qu’il n’avait jamais fait.',
        'Dans le bol, le lait baisse, à petites gorgées, comme boit un enfant. Le banc se détend. Dehors, la lanterne se pose et s’éteint.',
        'À l’aube, tu comprends à qui sont ces mains : à celui ou celle qui tenait la ferme, et avait promis un couvert à son enfant.',
        'Sur la nappe, un chemin de gouttes de lait va de la table à la porte, et plus loin. Quelqu’un d’autre a faim, ailleurs.',
      ].join('\n'),
      aftermath:
        'Chaque Kalan, on dressa treize couverts, et la maison dit le nom de Loïk à voix haute. Alix finit sa vie à tenir la ferme, sans plus rien cacher.',
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
      choiceText: 'Débarrasser le treizième couvert, tout ranger, et ne plus en parler.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu prends l’assiette, le bol, la cuiller. Tu les ranges dans le bahut, à leur place. La nappe est lisse, le banc est propre.',
        'Personne ne dit un mot. La famille se lève, rassurée, et monte se coucher. La personne qui veillait avec toi te regarde, puis détourne les yeux.',
        'Vers le matin, on frappe à la porte, trois coups. Tu ne réponds pas. Rien ne répond non plus, de l’autre côté.',
        'À l’aube, la nappe est tachée de lait, devant la place que tu as débarrassée. Le linge est froid, comme si l’on s’y était assis.',
      ].join('\n'),
      aftermath:
        'La ferme dormit tranquille jusqu’à l’hiver. Puis le lait tourna dans les pots, chaque nuit de Kalan, et personne ne sut dire pourquoi.',
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
        'Tu la regardes. Elle hésite, puis elle se lève et dit « Loïk », très net, devant les voisins serrés dans la porte.',
        'Le silence tombe sur la salle comme un filet mouillé. Un homme sort, d’un pas qui n’a plus rien de calme. Une femme crie.',
        'On se renvoie le blâme : qui a gardé ce nom ? Qui a dressé ? Tous se tournent vers toi, qui tiens les clefs. Les portes se ferment dans la cour.',
      ].join('\n'),
      aftermath:
        'Le nom de Loïk fit le tour de la paroisse avant la Chandeleur. Les voisins ne revinrent qu’au printemps, et la honte resta sur la ferme bien plus longtemps.',
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
        'Tu appelles. Un oiseau de nuit répond, puis plus rien. Pendant ce temps, la table est restée sans veilleur, et le bol est vide.',
        'Au retour, la porte de la ferme est fermée, et on ne t’ouvre pas. Dans ta poche, un petit objet tiède que tu n’y avais pas mis.',
      ].join('\n'),
      aftermath:
        'La lanterne du carrefour brûla jusqu’à l’aube, puis on la retrouva éteinte, au pied de la pierre. L’année suivante, un navet creusé attendit au même endroit.',
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
        'Tu dis que tu ne sais pas qui tu es. Que ces mains ne sont pas à toi, et que tu ne sais pas pour qui elles ont dressé.',
        'Personne ne rit. Les voisins se signent. Quelqu’un recule jusqu’à la porte, puis dehors, vers la lumière des lanternes.',
        'On te retire le trousseau de la maison. Un autre veillera, quelqu’un qui sait ce qu’il fait, et qui dressera pour l’enfant, ou non.',
        'Sur le seuil, en partant, tu entends l’essieu. Il grince derrière toi, au pas, et il te suit jusqu’à la dernière ferme.',
      ].join('\n'),
      aftermath:
        'Un autre prit les clefs et ne dressa plus rien. À chaque Kalan, quelqu’un frappa trois coups à la porte, et la ferme finit par s’y habituer.',
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
        'Une silhouette longue, sous un chapeau large, tient un manche. Elle se retourne. Elle n’a pas de visage, rien qu’une attention.',
        'Elle te désigne le char. Il y a de la place, juste pour un. Tu montes, et le grincement continue, sans toi, vers la mer.',
      ].join('\n'),
      aftermath:
        'On trouva la cour vide au matin, et le chien couché devant la porte. Alix ne revint pas, et la table resta dressée pour douze, puis pour treize.',
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

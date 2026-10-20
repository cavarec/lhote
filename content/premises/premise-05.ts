import type { Premise } from './types';

// Prémisse 5 (saison) : Nedeleg, la nuit de Noël dans une étable. Elle sort de décembre à l'Épiphanie.
// Inspirée de : la croyance bretonne que les bêtes parlent à minuit la nuit de Noël, et que celui qui
// les entend ne passe pas l'année.
//
// COLONNE VERTÉBRALE
// - Qui demande quoi : quelqu'un de la maison vient avant la messe et demande au veilleur des bêtes
//   s'il a entendu le grand bœuf parler. Le veilleur, c'est toi, dans le corps de Soaz.
// - Ce qui est en jeu : à minuit le bœuf dit un nom. L'an dernier, il a dit celui de Soaz ; Soaz s'est tu,
//   et c'est le voisin du haut qui est mort au printemps. La maison arrive dans un quart d'heure.
// - Le piège : celui qui entend ne passe pas l'année. Se taire, c'est laisser un autre payer ;
//   parler, c'est condamner devant tous ; fuir, c'est suivre les morts.
// - Ce que tu peux faire : écouter le bœuf jusqu'au bout et porter le nom toi-même (la seule issue juste),
//   te taire encore, tout dire à la maison, sonner la cloche, avouer ton trou, suivre les pas.
//
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - L'orientation est lue en entier ; à l'enquête, le joueur choisit deux natures sur trois et lit tous
//   les indices de ces natures : aucun indice ne dépend d'un autre.
// - Miroir : ton reflet dans l'auge gelée garde les yeux fermés.
// - Corps hérité : ton souffle ne fait pas de buée, alors que tout le monde fume dans le froid.

const EPOCH = 'une étable des monts d’Arrée, la nuit de Noël, au temps des veillées';

export const premise05: Premise = {
  id: 'premise-05',
  title: 'La nuit où les bêtes parlent',
  epoch: EPOCH,
  season: { from: '12-01', to: '01-06', label: 'Nedeleg, la nuit de Noël' },

  host: {
    name: 'Soaz',
    role: 'celui ou celle qui veille les bêtes de la maison',
    story:
      'Soaz veille les bêtes de la maison depuis des Noëls. L’an dernier, le grand bœuf a dit son nom à minuit. Soaz s’est tu, et c’est le voisin du haut qui est mort au printemps, à sa place.',
    truth: 'nom-du-veilleur',
  },

  // L'Observateur parle après le premier contact : il dit ce qui doit être réparé, pas comment.
  mechanic: {
    kind: 'countdown',
    label: 'Minuit approche',
    ticks: 3,
    strike: 'Minuit approche, et tu traînes encore. Les bêtes se tournent vers toi.',
  },
  briefing: [
    'Je te vois, tu sais. Mauvaise nuit pour avoir froid aux orteils : on est le soir de Noël, et tu veilles des bêtes qui s’apprêtent à parler.',
    'Voilà ce que je sais. Il y a un nom qui court dans cette étable, et quelqu’un en paiera le prix. À toi de réparer ça avant que la maison arrive.',
    'Comment ? Là, je sèche. Je me suis déjà trompé de bœuf une fois, alors ne me demande pas de trancher.',
    'Une chose encore : ce corps te connaît mieux que moi. Écoute-le, mais regarde bien qui il protège.',
  ],

  // Beat 1 : la paille, la neige, les bêtes. Aucune information.
  wakeup: [
    'Le noir sent la paille, la bouse chaude et le givre. Une odeur de lait tourné passe dessous, avec celle de la graisse de lampe.',
    'Tu écoutes. Des souffles, tout près : lents, profonds, serrés les uns contre les autres. Des sabots changent d’appui, avec patience.',
    'Une goutte tombe d’une poutre, à intervalles réguliers, sur de la glace. Elle fait un petit bruit de verre, puis se tait.',
    'Tu es debout. Tu le sais aux genoux raides, au froid qui a pris les orteils. Sous tes pieds, une paille fraîche, craquante de gel.',
    'Ta bouche est entrouverte, et rien n’en sort. Tu respires, tu le sens, et l’air que tu rends ne fume pas, comme il le devrait.',
    'Tu cherches ton nom, celui qu’on te donne ici. Tu trouves un mot à la place : une cloche, dans le lointain, qui retient son premier coup.',
    'Au cou, un sac de toile rêche, noué d’une ficelle, avec un grain de sel dedans. Tes doigts le serrent sans toi.',
    'Là-bas, un chant monte du village. Des voix de femmes, dans l’église, répètent le même cantique, un peu faux, un peu trop fort.',
    'Dans la nuit, un chien aboie une seule fois. Sa voix se casse. Aucun autre chien ne lui répond, ce qui n’arrive jamais.',
    'Une grosse tête se tourne vers toi, dans l’ombre. Elle a les yeux humides et sages. Elle te regarde comme on regarde quelqu’un qu’on attend.',
    'La porte de l’étable est entrouverte sur la neige. Le vent entre, passe sur ta nuque et sort. Tu sais une chose : minuit approche.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Elle est lue en entier. Elle pose les faits : le bœuf, l'an dernier, le mort du printemps.
  orientation: [
    {
      kind: 'material',
      text: 'Une longue étable aux murs de pierre. Une rangée de bêtes serrées : deux bœufs, trois vaches, un âne, des brebis au fond. Au-dessus, une lampe à huile qui fume.',
    },
    {
      kind: 'material',
      text: 'Dans un coin, une petite crèche de bois : de la mousse, un enfant de cire, un bœuf de terre cuite. Sur l’auge, une plaque de glace fine, craquelée au centre.',
    },
    {
      kind: 'material',
      text: 'Sur une poutre, une paire de petits sabots séchés, avec un ruban noir. Ce sont ceux du voisin du haut, mort au printemps. Personne n’a osé les descendre.',
    },
    {
      kind: 'bodily',
      text: 'Tu souffles dans tes mains pour les réchauffer. Rien n’en sort, ni buée, ni chaleur. Les bêtes, elles, fument comme des chaudrons dans le froid.',
    },
    {
      kind: 'bodily',
      text: 'Tu te penches sur l’auge gelée. Un visage fatigué te regarde, la peau tendue par le froid. Il a les paupières closes, et il ne les ouvre pas quand tu clignes.',
    },
    {
      kind: 'bodily',
      text: 'Tu as les jambes lourdes d’avoir attendu debout. Ce corps veille les bêtes depuis des Noëls, et il y a pris une patience de pierre.',
    },
    {
      kind: 'social',
      text: 'Un vieux berger, assis sur une botte de paille, dit à personne : « L’an dernier, le bœuf a parlé. On ne devait pas l’entendre. » Les autres font semblant de dormir.',
    },
    {
      kind: 'social',
      text: 'Dehors, des gens vont à la messe, en sabots, sur la neige dure. Quand ils passent devant l’étable, ils baissent la voix, puis ils pressent le pas.',
    },
    {
      kind: 'social',
      text: 'Près de la porte, un enfant te regarde de loin, sans cligner. Une main le tire en arrière. Il se laisse emmener, la tête tournée vers toi.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » entre. Le choix risqué dit le secret trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un se glisse par la porte, un bonnet enfoncé jusqu’aux yeux. Du givre brille sur ses épaules. Cette personne s’arrête devant les bœufs.',
      },
      {
        speaker: 'npc',
        text: 'Je suis venu avant la messe. Je ne voulais pas te laisser seul ce soir. Pas cette année. Pas après le printemps.',
      },
      {
        speaker: 'narration',
        text: 'La personne regarde les bêtes, l’une après l’autre, comme on compte des fautes. Elle évite l’auge, et ton visage dedans.',
      },
      {
        speaker: 'npc',
        text: 'Le grand bœuf a ouvert la bouche, tout à l’heure, avant minuit. Je l’ai vu par la porte. J’ai cru entendre un mot, ou un nom.',
      },
      {
        speaker: 'npc',
        text: 'On dit qu’il ne faut pas les écouter. Que celui qui entend ne passe pas l’année.',
      },
      {
        speaker: 'narration',
        text: 'Elle se tait. Les bêtes aussi. Un souffle long, un autre, et le silence plus épais d’un coup, comme si l’étable écoutait.',
      },
      {
        speaker: 'npc',
        text: 'C’est toi qui veilles ici. C’est toi qui restes. Dis-moi que tu n’as rien entendu, avant moi.',
      },
    ],
    choices: [
      {
        id: 'rassurer',
        kind: 'neutral',
        text: '« Je n’ai rien entendu. Va à la messe, je garde. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu dis ça d’une voix si calme. Moi, je n’ai pas ton sang-froid. Je reste un peu.',
          },
          {
            speaker: 'narration',
            text: 'La personne s’assied sur le tabouret de traite, les mains entre les genoux. Elle regarde la porte, pas toi.',
          },
        ],
      },
      {
        id: 'questionner',
        kind: 'informative',
        text: '« Quel nom ? Et que s’est-il passé, au printemps ? »',
        reply: [
          {
            speaker: 'npc',
            text: 'Je n’ai pas compris le nom. Un mot long, grave. Mais l’an dernier, le bœuf en a dit un aussi. Et le voisin du haut est mort au printemps.',
          },
          {
            speaker: 'npc',
            text: 'Il n’avait rien fait. Ça, au village, tout le monde le sait. Personne ne le dit.',
          },
          {
            speaker: 'narration',
            text: 'La personne a pâli. Elle en a trop dit, et elle le sait.',
          },
        ],
      },
      {
        id: 'avouer-que-tu-sais',
        kind: 'risky',
        text: '« Je l’ai déjà entendu parler. Je sais ce qu’il dit. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu l’as entendu ? Et tu es là, debout, comme ça ? Ce n’est pas possible.',
          },
          {
            speaker: 'narration',
            text: 'La voix a changé. Elle est devenue très calme, comme celle de quelqu’un qui marche sur de la glace fine.',
          },
          {
            speaker: 'npc',
            text: 'Ne le dis à personne. Pas à la maison. Pas avant minuit. Pas avant d’avoir compris.',
          },
        ],
      },
      {
        id: 'toucher-le-boeuf',
        kind: 'neutral',
        text: 'Ne rien dire et poser la main sur le front du grand bœuf.',
        reply: [
          {
            speaker: 'narration',
            text: 'Le poil est dur et chaud sous ta paume. La bête ne bouge pas. Elle appuie son front contre ta main, de tout son poids.',
          },
          {
            speaker: 'npc',
            text: 'Arrête. Ne la touche pas. Elle va te dire quelque chose.',
          },
          {
            speaker: 'narration',
            text: 'Dans l’œil du bœuf, très grand, tu vois la lampe, la porte et ton visage. Il a les yeux fermés, comme dans l’auge.',
          },
        ],
      },
    ],

    // Seconde passe : la cloche se tait, la maison approche, les bêtes s'agenouillent.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Au loin, la cloche de l’église sonne un premier coup. Un seul. Elle ne sonne pas les autres. Quelqu’un la retient.',
        },
        {
          speaker: 'npc',
          text: 'Elle devrait sonner minuit, là. Elle attend. Tu entends ? Même la cloche a peur cette nuit.',
        },
        {
          speaker: 'npc',
          text: 'La maison est sur le chemin, avec les enfants. Ils passent devant l’étable dans un quart d’heure. Tous, jusqu’au plus petit.',
        },
        {
          speaker: 'narration',
          text: 'Les bêtes se sont mises à genoux, les unes après les autres, avec un bruit de bois. Tu n’as jamais vu ça. Elles t’ont tourné la tête.',
        },
        {
          speaker: 'npc',
          text: 'Elles vont parler. Je sors, ou je reste avec toi ? Dis-le vite.',
        },
      ],
      choices: [
        {
          id: 'rester-ensemble',
          kind: 'neutral',
          text: '« Reste. À deux, on tiendra jusqu’au matin. »',
          reply: [
            {
              speaker: 'npc',
              text: 'À deux, on entendra deux fois. Ce n’est pas ce que je voulais. Mais je reste.',
            },
            {
              speaker: 'narration',
              text: 'La personne se serre contre toi. Sa chaleur est la seule chose vivante dans l’étable, avec celle des bêtes.',
            },
          ],
        },
        {
          id: 'qui-es-tu',
          kind: 'informative',
          text: '« Dis-moi qui je suis, pour toi. J’ai le trou, ce soir. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Tu as le trou ? Toi ? Ce soir, ça ne m’étonne pas. Tu veilles les bêtes de la maison depuis des Noëls. Pour tout le monde, tu es le veilleur.',
            },
            {
              speaker: 'npc',
              text: 'Ton nom, tu n’aimes plus l’entendre. Pas depuis le printemps. Je ne le dirai pas cette nuit, tu me comprends.',
            },
            {
              speaker: 'narration',
              text: 'La personne détourne les yeux. Elle sait quelque chose sur ce nom, et elle a décidé de ne pas te le rendre ici.',
            },
          ],
        },
        {
          id: 'faire-sortir',
          kind: 'risky',
          text: '« Sors. Emmène les bêtes dehors, dans la neige. »',
          reply: [
            {
              speaker: 'npc',
              text: 'Dehors, les bêtes ? À minuit ? Tu veux qu’elles parlent à tout le village ?',
            },
            {
              speaker: 'narration',
              text: 'La porte se referme d’elle-même sur la neige. Les bœufs ne bougent pas. Ils savent que tu ne peux pas, et ils attendent.',
            },
          ],
        },
        {
          id: 'demander-le-nom-donne',
          kind: 'informative',
          text: '« Qui a su, l’an dernier, ce que le bœuf avait dit ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Le vieux berger. Il l’a su, il l’a dit à la veillée, après, à voix basse. Il est là, sur la botte, et il fait semblant de dormir.',
            },
            {
              speaker: 'npc',
              text: 'Va lui parler, si tu veux. Mais pas devant les autres.',
            },
            {
              speaker: 'narration',
              text: 'Elle ajoute plus bas : « Et ne lui demande pas qui, cette année. Il le sait déjà. »',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Trois natures, deux au choix. Chaque nature se lit en entier, dans cet ordre.
  investigation: [
    // --- matériel : quatre éléments ---
    {
      kind: 'material',
      text: 'Sous la crèche, enveloppé dans un linge, un petit objet qui ne devrait pas être là. Il est lourd et froid. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'material',
      text: 'Sur le poteau de la stalle, une liste de noms gravés au clou, un par Noël. Le dernier est gratté, mais tu le lis encore : Soaz. Ta main connaît ce tracé.',
      revealsTruth: 'nom-du-veilleur',
    },
    {
      kind: 'material',
      text: 'Autour de l’auge, des traces de sabots en rond, très serrées. Les bêtes ont tourné pour se rassembler. Au centre, la glace est fendue en étoile.',
    },
    {
      kind: 'material',
      text: 'Dans la crèche, le bœuf de terre cuite a la corne recollée à la cire. Quelqu’un l’a cassée l’an dernier, la nuit de Noël, d’une main qui tremblait.',
    },
    // --- corps : cinq éléments ---
    {
      kind: 'bodily',
      text: 'Ton oreille droite bourdonne, d’un bourdonnement très précis. Tu connais cette voix de bœuf, grave, sans paroles encore. Tu l’as déjà entendue, ici, à minuit, et ce corps s’en souvient.',
      revealsTruth: 'oreille-qui-sait',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Dans le froid, il devrait cogner. Ce corps vit au ralenti, comme une bête qui se cache.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve, dans ta paume, une brûlure ancienne en forme de croix. Une chandelle de Noël l’a faite, il y a un an, et ce corps s’en souvient.',
    },
    {
      kind: 'bodily',
      text: 'Ta gorge se serre sur un mot qu’elle retient depuis longtemps. Ce corps a gardé un secret pendant un an, et il le garde encore.',
    },
    {
      kind: 'bodily',
      text: 'Tes mains savent nouer un licol, panser une patte, calmer une vache qui bute. Ce corps connaît chaque bête de cette étable par son nom.',
    },
    // --- social : cinq éléments ---
    {
      kind: 'social',
      text: 'Le vieux berger se redresse, regarde l’auge, puis toi. Il murmure : « Le nom que le bœuf a donné l’an dernier, c’était celui du veilleur. Le tien. Et c’est le voisin du haut qui a payé. » Puis il se signe.',
      revealsTruth: 'nom-donne-par-le-boeuf',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. C’est le frère du voisin du haut. Il ne regarde pas les bêtes, mais toi, et il porte la main à son cou, sur un sachet de sel.',
    },
    {
      kind: 'social',
      text: 'Une femme, près de la porte, murmure à sa voisine : « Il aurait dû partir au printemps, celui-là. C’est un autre qui a payé. » Elle ne dit pas lequel.',
    },
    {
      kind: 'social',
      text: 'Un enfant glisse la tête dans l’entrebâillement et dit à voix basse : « C’est toi, hein, le veilleur, qui devais mourir ? » Une main l’attire en arrière.',
    },
    {
      kind: 'social',
      text: 'Le sacristan passe la tête et dit : « La cloche n’est pas prête. On l’attend pour minuit. Quelqu’un a bloqué le battant, mais je ne sais pas qui. »',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris. Du plus précis au repli.
  twists: [
    {
      requires: ['oreille-qui-sait', 'nom-donne-par-le-boeuf'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le grand bœuf ouvre la bouche. Il n’est pas encore minuit, et pourtant sa voix sort, grave, sans souffle, comme d’un puits.',
        },
        {
          speaker: 'narration',
          text: 'Il dit un nom. Tu le reconnais avant la fin. Tu l’as entendu l’an dernier, au même endroit, de la même gorge. C’est le tien.',
        },
        {
          speaker: 'narration',
          text: '« Tu devais partir. L’an dernier, un autre a pris ta place. Cette fois, personne ne s’est proposé. »',
        },
        {
          speaker: 'narration',
          text: 'Dehors, la neige crisse. Les gens de la maison arrivent sur le chemin, avec leurs lanternes. Dans deux minutes, ils seront devant la porte.',
        },
        {
          speaker: 'narration',
          text: 'Tu sens le nom dans ta bouche comme un goût de fer. Si tu le dis, la maison saura. Si tu te tais, quelqu’un d’autre le portera.',
        },
      ],
    },
    {
      requires: ['oreille-qui-sait'],
      lines: [
        {
          speaker: 'narration',
          text: 'Ton oreille bourdonne plus fort. Elle devance les bêtes, une demi-phrase avant elles, toujours juste, jamais en retard.',
        },
        {
          speaker: 'narration',
          text: 'Alors la cloche sonne, trois coups, très loin et très nets. Tout le village l’entend, tu le sais au silence qui suit.',
        },
        {
          speaker: 'narration',
          text: 'Les bêtes lèvent la tête, ensemble. Le grand bœuf prend une inspiration longue. Il va parler, et tu sais déjà ce qu’il dira : un nom.',
        },
      ],
    },
    {
      requires: ['nom-donne-par-le-boeuf'],
      lines: [
        {
          speaker: 'narration',
          text: 'Le vieux berger est revenu près de toi, sans bruit. Il te glisse au creux de la main un morceau de ficelle noué de sept nœuds.',
        },
        {
          speaker: 'narration',
          text: '« Elle vient de l’an dernier. J’ai gardé le dernier nœud dans ma poche. Je ne peux plus le garder. Prends-le. »',
        },
        {
          speaker: 'narration',
          text: 'Il s’éloigne vers la porte, la tête basse. Dehors, les premières lanternes de la maison approchent, une à une, sur la neige dure.',
        },
      ],
    },
    {
      requires: ['nom-du-veilleur'],
      lines: [
        {
          speaker: 'narration',
          text: 'Une voix d’enfant crie ton nom sur le chemin : « Soaz ! Soaz ! » La maison arrive, avec ses lanternes, et elle t’appelle.',
        },
        {
          speaker: 'narration',
          text: 'C’est ton nom, le nom du veilleur, celui que le bœuf a dit l’an dernier. Entendu de si loin, il sonne comme une accusation.',
        },
        {
          speaker: 'narration',
          text: 'Les bêtes tournent la tête vers la porte, ensemble. Quelqu’un va devoir répondre, et personne d’autre que toi ne le peut.',
        },
      ],
    },
    {
      lines: [
        {
          speaker: 'narration',
          text: 'La lampe vacille, puis s’éteint. Dans le noir, tu entends les bêtes respirer ensemble, d’un souffle trop égal pour être celui de bêtes.',
        },
        {
          speaker: 'narration',
          text: 'Le grand bœuf, à genoux, tourne vers toi son œil immense. Il va dire un nom, cette nuit encore, comme il l’a dit l’an dernier.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, la cloche se met à sonner, trop vite, comme si quelqu’un courait. Il va être minuit, et la maison est presque là.',
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
          text: 'Ta main s’avance et se pose sur le front du grand bœuf, sans trembler, sans hésiter, comme on salue un vieil ami.',
        },
        {
          speaker: 'narration',
          text: 'La personne étouffe un cri. « Tu le touches ? Depuis l’an dernier, tu n’osais plus. Qui es-tu, ce soir ? »',
        },
        {
          speaker: 'narration',
          text: 'Le corps n’avait pas peur. Tu aurais dû en avoir, pour deux.',
        },
      ],
    },
    investigation: {
      outcome: 'reveals',
      revealsTruth: 'oreille-qui-sait',
      lines: [
        {
          speaker: 'narration',
          text: 'Ton oreille se tourne vers la bête avant qu’elle ouvre la bouche. Elle devine l’inspiration, la longueur du souffle, la place où viendra le mot.',
        },
        {
          speaker: 'narration',
          text: 'Ce n’est pas la première fois. Ce corps a déjà attendu ici, debout, ce que la bête allait dire.',
        },
        {
          speaker: 'narration',
          text: 'Tu en as la certitude, nette, sans souvenir : tu as déjà entendu cette voix.',
        },
      ],
    },
  },

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-09', 'fracture-10'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'ecouter-les-betes',
      requiresAny: ['oreille-qui-sait', 'nom-donne-par-le-boeuf'],
      choiceText:
        'Rester à genoux dans l’étable à minuit, écouter les bêtes jusqu’au bout et porter le nom qu’elles donnent.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu t’agenouilles dans la paille. À minuit, le grand bœuf parle. Tu ne bouges pas. Tu écoutes jusqu’au dernier mot.',
        'Il dit ton nom, Soaz, puis il se tait. Tu réponds : « Je l’ai entendu. L’an dernier, je me suis tu. Cette fois, c’est à moi de le porter. »',
        'Ton souffle sort enfin, en un petit nuage blanc, qui monte vers la lampe. Tu comprends qui tu étais ici : celui ou celle qui veille, et qui s’est tu une fois.',
        'Quand la maison arrive, la porte est ouverte, la paille propre. Le plus petit des enfants pose la main sur le bœuf, sans peur.',
        'Au matin, la corne recollée du bœuf de terre tient sans cire. Mais le grand bœuf ne baisse pas les yeux : il regarde déjà quelqu’un d’autre.',
      ].join('\n'),
      aftermath:
        'Soaz veilla les bêtes encore bien des Noëls, sans jamais se taire. Le voisin du haut fut le dernier que le bœuf nomma sans réponse, et la maison le pleura une fois pour toutes.',
      mutations: [
        {
          type: 'addTruth',
          truth: {
            id: 'la-bete-a-donne-un-nom',
            summary:
              'Celui qui veillait a écouté les bêtes jusqu’au bout et porté le nom qu’elles donnaient.',
            leapId: '',
          },
        },
        {
          type: 'addPerson',
          person: {
            id: 'le-veilleur-de-noel',
            characterId: '0',
            status: 'saved',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'taire-le-nom',
      choiceText:
        'Fermer la porte, te taire comme l’an dernier et laisser la maison aller à la messe.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu fermes la porte de l’étable sur ce que tu sais. La maison passe devant, en chantant, et personne ne te regarde.',
        'À minuit, les bêtes parlent. Tu les entends à travers le mur, mais tu ne réponds pas. Tu écoutes, c’est tout, comme l’an dernier.',
        'Le matin, quand on revient, les enfants chantent encore. Le vieux berger, lui, ne dit plus rien. Il a compris que tu t’étais tu de nouveau.',
        'Au printemps, on enterrera quelqu’un de la maison. Personne ne dira que tu savais. Ce n’est pas la peine : tout le monde le saura.',
      ].join('\n'),
      aftermath:
        'Au printemps, on enterra quelqu’un de la maison, et personne n’osa regarder Soaz. L’hiver suivant, le grand bœuf parla de nouveau, et Soaz se tut encore.',
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'maison-qui-na-pas-su',
            description:
              'Une maison à qui l’on a tu le nom donné par les bêtes, la nuit de Noël.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'dire-le-nom-a-la-maison',
      requiresAny: ['nom-donne-par-le-boeuf'],
      choiceText:
        'Dire à voix haute, devant la maison, que le nom de l’an dernier était le tien et que le voisin du haut a payé.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu sors sur le seuil. Les gens de la maison s’arrêtent dans la neige, leurs lanternes levées. Tu dis : « Le nom de l’an dernier, c’était le mien. »',
        'Le silence tombe sur le chemin comme un drap mouillé. Une femme laisse tomber sa lanterne. Le frère du voisin du haut se met à pleurer, sans bruit.',
        'Ils se tournent vers toi, puis ils se détournent, et reprennent la route sans un mot. Personne ne veut plus passer l’hiver près du veilleur.',
      ].join('\n'),
      aftermath:
        'La maison passa l’hiver sans se parler, et Soaz fut renvoyé de l’étable avant la fin de janvier. On dit que le frère du voisin du haut garda les bêtes seul, la nuit, sans rien entendre.',
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'maison-qui-attend-la-mort',
            label: 'Une maison où chacun regarde un seul visage, tout l’hiver',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
      ],
    },
    {
      id: 'sonner-la-cloche',
      choiceText: 'Courir jusqu’à l’église et sonner toi-même la cloche de minuit.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu cours dans la neige. Le chemin est long, et la nuit n’attend pas. Tu entres dans le clocher, haletant, sans souffle visible.',
        'Tu tires la corde. La cloche sonne, un peu trop tôt, un peu trop fort. Dans le village, on ouvre des volets.',
        'Quand tu redescends, la messe s’est arrêtée. Tous te regardent. Le recteur, sur les marches, ne dit que ceci : « Qu’as-tu fait ? »',
        'Dans ta poche, tu trouves un grelot que tu n’y avais pas mis. Il est tiède, et il ne sonne pas.',
      ].join('\n'),
      aftermath:
        'Le recteur punit le sonneur absent, et le village garda cette cloche trop tôt pendant des années. À chaque Noël, quelqu’un monta vérifier qu’on ne la tirait pas.',
      mutations: [
        {
          type: 'addDoor',
          door: {
            id: 'cloche-sonnee-trop-tot',
            label: 'Une cloche sonnée avant l’heure, la nuit de Noël',
            openedInLeap: '',
            epoch: EPOCH,
          },
        },
        {
          type: 'addArtifact',
          artifact: {
            id: 'objet-de-la-cloche',
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
        'Tu dis que tu ne sais pas qui tu es. Que ce corps ne fait pas de buée, et que tu ne te souviens pas de l’avoir habité.',
        'Personne ne rit. Les bêtes se taisent. La personne recule jusqu’à la porte, puis dit tout bas : « Tu es le veilleur. Tu es Soaz. Et tu n’es plus toi. »',
        'On te retire le sac de sel. Un autre veillera, quelqu’un qui sait ce qu’il fait, et qui n’a pas peur de ce qu’il entend.',
        'Derrière toi, quand tu pars, le grand bœuf ouvre la bouche. Tu ne te retournes pas. Tu sais que c’est ton nom qu’il dit.',
      ].join('\n'),
      aftermath:
        'Un autre veilleur prit l’étable avant l’aube, un homme qui ne dit jamais son nom aux bêtes. Soaz resta dans la maison, mais personne ne le fit plus asseoir près du feu.',
      mutations: [],
    },
    {
      id: 'suivre-les-pas-dans-la-neige',
      choiceText: 'Suivre dans la neige les traces de pas qui sortent de l’étable.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu sors. La neige est dure, bleue sous la lune. Des pas, petits, partent de l’étable et filent droit vers la lande.',
        'Tu les suis. Ils ne s’enfoncent pas. Ils ne changent jamais d’allure. Ce sont des pas de pieds nus, ceux du voisin du haut, qui cherche qui a pris son tour.',
        'Quand tu comprends que le vent s’est tu, tu ne vois plus l’église. Tu n’entends plus la cloche, ni les bêtes, ni ton cœur.',
        'Dans la neige, tes pas s’arrêtent. Les autres continuent, seuls, vers le sud, et la lueur s’éteint derrière eux.',
      ].join('\n'),
      aftermath:
        'On retrouva les traces de Soaz au jour levé, et elles ne menaient nulle part. Le grand bœuf refusa de manger trois jours, puis cessa de lever la tête quand on passait.',
      mutations: [
        {
          type: 'addScar',
          scar: {
            id: 'veilleur-pris-par-la-neige',
            description:
              'Quelqu’un qui gardait les bêtes, pris par la neige la nuit de Noël.',
            leapId: '',
            epoch: EPOCH,
          },
        },
      ],
    },
  ],
};

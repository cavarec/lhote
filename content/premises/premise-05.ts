import type { Premise } from './types';

// Prémisse 5 (saison) : Nedeleg, la nuit de Noël dans une étable. Elle sort de décembre à l'Épiphanie.
// L'hôte est le veilleur : celui qui garde les bêtes pendant que la maison est à la messe de minuit.
// Inspirée de : la croyance bretonne que les bêtes parlent à minuit la nuit de Noël, et que celui qui
// les entend ne passe pas l'année.
// Conventions : voir content/README.md.
// - `npcId` est un emplacement (« 0 » ou « 1 »), pas un personnage : le texte ne dit donc ni « il »
//   ni « elle » du personnage qui parle.
// - Miroir : ton reflet dans l'auge gelée garde les yeux fermés.
// - Corps hérité : ton souffle ne fait pas de buée, alors que tout le monde fume dans le froid.

const EPOCH = 'une étable des monts d’Arrée, la nuit de Noël, au temps des veillées';

export const premise05: Premise = {
  id: 'premise-05',
  title: 'La nuit où les bêtes parlent',
  epoch: EPOCH,
  season: { from: '12-01', to: '01-06', label: 'Nedeleg, la nuit de Noël' },

  // Beat 1 : la paille, la neige, les bêtes. Aucune information.
  wakeup: [
    'Le noir sent la paille, la bouse chaude et le givre. Une odeur de lait tourné passe dessous, avec celle de la graisse de lampe.',
    'Tu écoutes. Des souffles, tout près : lents, profonds, serrés les uns contre les autres. Des sabots changent d’appui, avec patience.',
    'Une goutte tombe d’une poutre, à intervalles réguliers, sur de la glace. Elle fait un petit bruit de verre, puis se tait.',
    'Tu es debout. Tu le sais aux genoux raides, au froid qui a pris les orteils. Sous tes pieds, une paille fraîche, craquante de gel.',
    'Ta bouche est entrouverte, et rien n’en sort. Tu respires, tu le sens, et l’air que tu rends ne fume pas, comme il le devrait.',
    'Tu cherches ton nom. Tu trouves un mot à la place : une cloche, dans le lointain, qui retient son premier coup.',
    'Au cou, un sac de toile rêche, noué d’une ficelle, avec un grain de sel dedans. Tes doigts le serrent sans toi.',
    'Là-bas, un chant monte du village. Des voix de femmes, dans l’église, répètent le même cantique, un peu faux, un peu trop fort.',
    'Dans la nuit, un chien aboie une seule fois. Sa voix se casse. Aucun autre chien ne lui répond, ce qui n’arrive jamais.',
    'Une grosse tête se tourne vers toi, dans l’ombre. Elle a les yeux humides et sages. Elle te regarde comme on regarde quelqu’un qu’on attend.',
    'La porte de l’étable est entrouverte sur la neige. Le vent entre, passe sur ta nuque et sort. Tu sais une chose : minuit approche.',
    'Tu ouvres les yeux.',
  ].join('\n\n'),

  // Beat 2 : orientation. Les trois natures d'indice, le miroir et le corps hérité.
  orientation: [
    {
      kind: 'material',
      text: 'Une longue étable aux murs de pierre. Une rangée de bêtes serrées : deux bœufs, trois vaches, un âne, des brebis dans le fond. Au-dessus, une lampe à huile qui fume.',
    },
    {
      kind: 'material',
      text: 'Dans un coin, une petite crèche de bois, bricolée : de la mousse, un enfant de cire, un bœuf de terre cuite. Le bœuf a perdu une corne, et on l’a recollée à la cire.',
    },
    {
      kind: 'material',
      text: 'Sur l’auge, une plaque de glace fine, craquelée au centre. Un seau est renversé à côté. Près de la porte, un tabouret de traite, et une lanterne éteinte.',
    },
    {
      kind: 'bodily',
      text: 'Tu souffles dans tes mains pour les réchauffer. Rien n’en sort, ni buée, ni chaleur. Les bêtes, elles, fument comme des chaudrons dans le froid.',
    },
    {
      kind: 'bodily',
      text: 'Tu te penches sur l’auge gelée. Un visage fatigué te regarde, la peau tendue par le froid. Il a les paupières closes, et il ne les ouvre pas quand tu cligne.',
    },
    {
      kind: 'bodily',
      text: 'Tu as les jambes lourdes d’avoir attendu debout. Ce corps veille les bêtes depuis des Noëls, et il y a pris une patience de pierre.',
    },
    {
      kind: 'social',
      text: 'Au mur, un chapelet de grelots, un fouet, un manteau de laine épaisse. Sur la poutre, de petits sabots d’enfant, séchés, avec un ruban noir autour.',
    },
    {
      kind: 'social',
      text: 'Un vieux berger, assis sur une botte de paille, dit à personne : « L’an dernier, il a parlé. On ne devait pas l’entendre. » Les autres font semblant de dormir.',
    },
    {
      kind: 'social',
      text: 'Dehors, des voix de gens qui vont à la messe, en sabots, sur la neige dure. Quand tu t’approches de la porte, elles baissent, puis elles passent plus vite.',
    },
  ],

  // Beat 3 : premier contact. L'emplacement « 0 » entre. Le choix risqué dit le secret trop tôt.
  openingDialogue: {
    npcId: '0',
    lines: [
      {
        speaker: 'narration',
        text: 'Quelqu’un se glisse par la porte, un bonnet enfoncé jusqu’aux yeux. Du givre brille sur ses épaules. Il s’arrête devant les bœufs.',
      },
      {
        speaker: 'npc',
        text: 'Je suis venu avant la messe. Je ne voulais pas te laisser seul. Pas cette année. Pas après ce qui s’est passé.',
      },
      {
        speaker: 'narration',
        text: 'La personne regarde les bêtes, l’une après l’autre, comme on compte des fautes. Elle évite l’auge, et ton visage dedans.',
      },
      {
        speaker: 'npc',
        text: 'Le grand bœuf a ouvert la bouche, tout à l’heure. Avant minuit. Moi, j’ai entendu quelque chose, un mot, ou un nom.',
      },
      {
        speaker: 'npc',
        text: 'On dit qu’il ne faut pas les écouter. Qu’il ne faut pas être là, quand elles disent ce qu’elles savent.',
      },
      {
        speaker: 'narration',
        text: 'Elle se tait. Les bêtes aussi. Un souffle long, un autre, et le silence plus épais d’un coup, comme si l’étable écoutait.',
      },
      {
        speaker: 'npc',
        text: 'C’est toi, le veilleur. C’est toi qui restes. Dis-moi que tu n’as rien entendu, avant moi.',
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
            text: 'Tu mens bien. Moi, je n’ai pas ton sang-froid. Je reste un peu.',
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
        text: '« Quel mot ? Quel nom ? Dis-le-moi. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Si je le dis, il est à nous deux. Il y en a un qui l’a dit avant moi, l’an dernier. Il est mort au printemps.',
          },
          {
            speaker: 'npc',
            text: 'Pas toi. Un autre. Quelqu’un qui n’avait rien fait. Ça, au village, tout le monde le sait. Personne ne le dit.',
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
        text: '« Je l’ai déjà entendu. Je sais ce qu’il dit. »',
        reply: [
          {
            speaker: 'npc',
            text: 'Tu l’as entendu ? Avant ? Et tu es là, debout, comme ça ? Ce n’est pas possible.',
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
            text: 'Dans l’œil du bœuf, très grand, tu vois la lampe, la porte et toi. Mais tu y vois aussi quelqu’un d’autre, derrière toi.',
          },
        ],
      },
    ],

    // Seconde passe : la maison s'éloigne pour la messe, le compte à rebours commence.
    secondRound: {
      lines: [
        {
          speaker: 'narration',
          text: 'Au loin, la cloche de l’église sonne un premier coup. Un seul. Elle n’a pas sonné les autres. Quelqu’un la retient.',
        },
        {
          speaker: 'npc',
          text: 'Elle devrait sonner minuit, là. Elle attend. Tu entends ? Même les cloches ont peur cette nuit.',
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
          text: 'Elles vont parler. Je sors, ou je reste ? Dis-le vite.',
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
              text: 'À deux, on entendra deux fois. Ce n’est pas ça que je voulais. Mais je reste.',
            },
            {
              speaker: 'narration',
              text: 'La personne se serre contre toi. Sa chaleur est la seule chose vivante dans l’étable, avec celle des bêtes.',
            },
          ],
        },
        {
          id: 'demander-le-nom-donne',
          kind: 'informative',
          text: '« L’an dernier, quel nom le bœuf a-t-il dit ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Je ne l’ai pas entendu. Mais le vieux berger l’a su. Il l’a dit à la veillée, après, à voix basse.',
            },
            {
              speaker: 'npc',
              text: 'Va lui parler, si tu veux. Il est là, sur la botte, et il fait semblant de dormir. Mais ne lui demande pas devant les autres.',
            },
            {
              speaker: 'narration',
              text: 'Elle ajoute plus bas : « Et ne lui demande pas qui, cette année. Il le sait déjà. »',
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
              text: 'Dehors, les bêtes ? À minuit ? Tu veux qu’elles parlent à tout le monde ?',
            },
            {
              speaker: 'narration',
              text: 'La porte se referme d’elle-même sur la neige. Les bœufs ne bougent pas. Ils savent que tu ne peux pas, et ils attendent.',
            },
          ],
        },
        {
          id: 'regarder-les-yeux',
          kind: 'informative',
          text: '« Regarde les yeux des bêtes. Qui voit-on dedans ? »',
          reply: [
            {
              speaker: 'npc',
              text: 'Je vois la lampe. Et le seau renversé. Rien d’autre.',
            },
            {
              speaker: 'narration',
              text: 'La personne a répondu trop vite. Elle se penche, regarde l’œil du grand bœuf, puis recule, la main sur la bouche.',
            },
            {
              speaker: 'npc',
              text: 'Ne regarde pas dedans. Ne cherche pas qui. Ça, au moins, ça se sait.',
            },
          ],
        },
      ],
    },
  },

  // Beat 4 : enquête. Tu as déjà entendu ; quelqu'un sait le nom de l'an dernier.
  investigation: [
    {
      kind: 'material',
      text: 'Sous la crèche, enveloppé dans un linge, un petit objet qui ne devrait pas être là. Il est lourd et froid. Ta main ne tremble pas en le touchant.',
      revealsArtifact: 'leap',
    },
    {
      kind: 'bodily',
      text: 'Ton oreille droite bourdonne, d’un bourdonnement très précis. Tu connais cette voix de bœuf, grave, sans paroles encore. Tu l’as déjà entendue, et ce corps s’en souvient.',
      revealsTruth: 'oreille-qui-sait',
    },
    {
      kind: 'material',
      text: 'Au bas du mur, sous la paille, un nom gravé à la pointe d’un clou, puis un autre, puis un autre. Une liste d’années, une par ligne. La dernière est grattée.',
    },
    {
      kind: 'material',
      text: 'Autour de l’auge, des traces de sabots en rond, très serrées, comme si les bêtes avaient tourné pour te parler. Au centre, la glace est fendue en étoile.',
    },
    {
      kind: 'social',
      text: 'Le vieux berger se redresse, regarde l’auge, puis toi. Il prononce un nom, un seul. Ce n’est pas le tien. Puis il ferme les yeux, et il se signe.',
      revealsTruth: 'nom-donne-par-le-boeuf',
    },
    {
      kind: 'social',
      text: 'Un homme au visage fermé reste sur le seuil. Il ne regarde pas les bêtes. Quand tu le regardes, il porte la main à son cou, sur un sachet de sel.',
    },
    {
      kind: 'social',
      text: 'Une femme, près de la porte, murmure à sa voisine : « Il aurait dû partir au printemps, celui-là. C’est un autre qui a payé. »',
    },
    {
      kind: 'social',
      text: 'Un enfant glisse la tête dans l’entrebâillement et dit à voix basse : « C’est toi, hein, qui devais mourir ? » Une main l’attire en arrière.',
    },
    {
      kind: 'bodily',
      text: 'Ton cœur bat à coups espacés, trop espacés. Dans le froid, il devrait cogner. Ce corps vit au ralenti, comme une bête qui hiberne ou qui se cache.',
    },
    {
      kind: 'bodily',
      text: 'Ton pouce trouve, dans ta paume, une brûlure ancienne en forme de croix. Une chandelle de Noël l’a faite, il y a un an, et ce corps s’en souvient.',
    },
    {
      kind: 'material',
      text: 'Près de la porte, un seau renversé et, à côté, un foulard d’enfant, noué en rond. Quelqu’un l’a laissé là pour que la bête le sente.',
    },
    {
      kind: 'material',
      text: 'La lanterne éteinte est encore tiède. Quelqu’un l’a portée ici il y a peu, puis l’a soufflée. Une odeur de suif et de neige fraîche en émane.',
    },
    {
      kind: 'social',
      text: 'Le sacristain passe la tête et dit : « La cloche n’est pas prête. On l’attend pour minuit. Quelqu’un a bloqué le battant, mais je ne sais pas qui. »',
    },
    {
      kind: 'bodily',
      text: 'Tes dents claquent sans que tu aies froid. Une peur très ancienne, qui n’est pas la tienne, remonte de tes jambes jusqu’à ta gorge.',
    },
  ],

  // Entre l'enquête et la fracture : un coup de théâtre, selon ce que tu as appris.
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
          speaker: 'npc',
          text: 'Tu devais partir. L’an dernier. C’est un autre qui a pris ta place. Cette fois, personne ne s’est proposé.',
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
          text: 'Les bêtes lèvent la tête, ensemble. Le grand bœuf prend une inspiration longue. Il va parler, et tu sais déjà ce qu’il dira.',
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
          speaker: 'npc',
          text: 'Elle vient de l’an dernier. J’ai gardé le dernier nœud dans ma poche. Je ne peux plus le garder. Prends-le.',
        },
        {
          speaker: 'narration',
          text: 'Il s’éloigne vers la porte, la tête basse. Dehors, les premières lanternes de la maison approchent, une à une, sur la neige dure.',
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
          text: 'Tu n’as pas assez regardé pour savoir pourquoi. Mais quelque chose, dans l’étable, vient de s’approcher de ton oreille.',
        },
        {
          speaker: 'narration',
          text: 'Dehors, la cloche se met à sonner, trop vite, comme si quelqu’un courait. Il va être minuit, et tu n’es pas prêt.',
        },
      ],
    },
  ],

  // Beat 5 : la fracture. Deux lectures possibles ; la seed du saut en retient une.
  fractures: ['fracture-09', 'fracture-10'],

  // Beat 6 : résolution. Chaque issue est une histoire, aucune n'est un game over annoncé.
  resolutions: [
    {
      id: 'ecouter-les-betes',
      requiresAny: ['oreille-qui-sait', 'nom-donne-par-le-boeuf'],
      choiceText:
        'Rester à genoux dans l’étable à minuit, écouter les bêtes jusqu’au bout et leur répondre.',
      outcome: 'resolved',
      fractureRepaired: true,
      resultText: [
        'Tu t’agenouilles dans la paille. À minuit, le grand bœuf parle. Tu ne bouges pas. Tu écoutes jusqu’au dernier mot.',
        'Il dit ton nom, puis un autre, puis un troisième. Tu réponds : « Je l’ai entendu. C’est à moi de le porter. » Il se tait.',
        'Ton souffle sort enfin, en un petit nuage blanc, qui monte vers la lampe. Les bêtes se relèvent, une à une, avec leur bruit de bois.',
        'Quand la maison arrive, la porte est ouverte, la paille propre. Les enfants entrent, et le plus petit pose la main sur le bœuf.',
        'Le soir, quelqu’un a laissé un grain de sel au pied de la crèche, et la corne recollée du bœuf de terre tient sans cire.',
      ].join('\n'),
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
      requiresAny: ['nom-donne-par-le-boeuf'],
      choiceText:
        'Garder le nom pour toi et laisser la maison aller à la messe, sans rien dire.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu fermes la porte de l’étable sur ce que tu sais. La maison passe devant, en chantant, et personne ne te regarde.',
        'À minuit, les bêtes parlent. Tu les entends à travers le mur, mais tu ne vas pas leur répondre. Tu écoutes, c’est tout.',
        'Le matin, quand on revient, les enfants chantent encore. Le vieux berger, lui, ne dit plus rien. Il a compris que tu savais.',
        'Au printemps, on enterrera quelqu’un de la maison. Personne ne dira que tu savais. Ce n’est pas la peine : tout le monde le saura.',
      ].join('\n'),
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
      requiresAny: ['oreille-qui-sait'],
      choiceText: 'Dire à voix haute, devant la maison, le nom que les bêtes ont donné.',
      outcome: 'failed',
      fractureRepaired: false,
      resultText: [
        'Tu sors sur le seuil. Les gens de la maison s’arrêtent dans la neige, leurs lanternes levées. Tu dis le nom.',
        'Le silence tombe sur le chemin comme un drap mouillé. Une femme laisse tomber sa lanterne. Une autre se met à pleurer, sans bruit.',
        'Ils se tournent vers celui que tu as nommé, qui ne dit rien. Puis ils se détournent de toi, et reprennent la route sans un mot.',
      ].join('\n'),
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
        'Personne ne rit. Les bêtes se taisent. Quelqu’un recule jusqu’à la porte, puis dehors, vers la neige et la lumière de la messe.',
        'On te retire le sac de sel. Un autre veillera, quelqu’un qui sait ce qu’il fait, et qui n’a pas peur de ce qu’il entend.',
        'Derrière toi, quand tu pars, le grand bœuf ouvre la bouche. Tu ne te retournes pas. Tu sais que c’est ton nom qu’il dit.',
      ].join('\n'),
      mutations: [],
    },
    {
      id: 'suivre-les-pas-dans-la-neige',
      choiceText: 'Suivre dans la neige les traces de pas qui sortent de l’étable.',
      outcome: 'died',
      fractureRepaired: false,
      resultText: [
        'Tu sors. La neige est dure, bleue sous la lune. Des pas, petits, partent de l’étable et filent droit vers la lande.',
        'Tu les suis. Ils ne s’enfoncent pas. Ils ne changent jamais d’allure. Au loin, une lueur basse t’attend, jamais plus près.',
        'Quand tu comprends que le vent s’est tu, tu ne vois plus l’église. Tu n’entends plus la cloche, ni les bêtes, ni ton cœur.',
        'Dans la neige, tes pas s’arrêtent. Les autres continuent, seuls, vers le sud, et la lueur s’éteint derrière eux.',
      ].join('\n'),
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

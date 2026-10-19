import type { Character } from './types';

// Douze personnages réutilisables, trois par archétype. Ils n'appartiennent à aucune prémisse :
// le générateur en tire deux pour chaque saut. Leurs répliques ne citent donc ni lieu ni époque.
//
// Clés de `dialogues` (voir content/README.md) :
// - greeting : première prise de parole, quand le personnage rejoint l'hôte ;
// - doubt    : quand l'hôte se conduit de façon étrange ;
// - farewell : dernière réplique, quelle que soit l'issue.
// `voice` est une consigne d'écriture interne, jamais montrée au joueur.

export const characters: readonly Character[] = [
  {
    id: 'character-01',
    archetype: 'confident',
    name: 'Maël',
    voice:
      'Phrases brèves et assurées. Donne des ordres sans lever la voix. Ne doute pas.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Je savais que tu serais là. Tu l’es toujours.' },
        {
          speaker: 'npc',
          text: 'Écoute-moi. On règle ça avant que ça devienne un problème.',
        },
      ],
      doubt: [
        {
          speaker: 'npc',
          text: 'Tu me regardes comme si tu me voyais pour la première fois.',
        },
        { speaker: 'npc', text: 'Ça ne change rien. Je m’occupe du reste.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'C’est fait. Ne le répète à personne.' },
        { speaker: 'narration', text: 'Il s’éloigne sans se retourner, sûr de lui.' },
      ],
    },
  },
  {
    id: 'character-02',
    archetype: 'confident',
    name: 'Odile',
    voice:
      'Chaleureuse. Tutoie tout le monde. Parle comme si l’issue était déjà décidée.',
    dialogues: {
      greeting: [
        {
          speaker: 'npc',
          text: 'Te voilà, toi ! Viens, assieds-toi, tout va bien se passer.',
        },
        { speaker: 'npc', text: 'J’ai déjà tout prévu. Tu n’as qu’à me suivre.' },
      ],
      doubt: [
        { speaker: 'npc', text: 'Tu es drôle, aujourd’hui. Fatigué ?' },
        { speaker: 'npc', text: 'Dors un peu. Les choses se tassent toutes seules.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'Tu vois, je te l’avais dit.' },
        {
          speaker: 'narration',
          text: 'Elle te serre l’épaule, longtemps, comme on scelle un accord.',
        },
      ],
    },
  },
  {
    id: 'character-03',
    archetype: 'worried',
    name: 'Lucien',
    voice: 'Hésite. Laisse ses phrases en suspens. Regarde les portes plus que les gens.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Ah, c’est toi. Je me demandais si… enfin.' },
        {
          speaker: 'npc',
          text: 'Tu as un moment ? Je n’ose pas en parler devant les autres.',
        },
      ],
      doubt: [
        {
          speaker: 'npc',
          text: 'Tu n’es pas comme d’habitude. Il s’est passé quelque chose ?',
        },
        {
          speaker: 'narration',
          text: 'Il jette un coup d’œil vers la porte, puis vers toi.',
        },
      ],
      farewell: [
        { speaker: 'npc', text: 'Merci. Je crois que ça ira. Je crois.' },
        {
          speaker: 'narration',
          text: 'Il part en regardant derrière lui, une fois, deux fois.',
        },
      ],
    },
  },
  {
    id: 'character-04',
    archetype: 'worried',
    name: 'Jeanne',
    voice:
      'Parle vite. Répète les mots importants. Serre toujours quelque chose entre ses mains.',
    dialogues: {
      greeting: [
        {
          speaker: 'npc',
          text: 'Il faut faire quelque chose. Quelque chose, tout de suite.',
        },
        {
          speaker: 'narration',
          text: 'Elle tord un coin de son vêtement entre ses doigts.',
        },
      ],
      doubt: [
        { speaker: 'npc', text: 'Pourquoi tu dis ça ? Pourquoi tu dis ça comme ça ?' },
        { speaker: 'npc', text: 'Tu me fais peur, quand tu es calme.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'C’est fini ? C’est bien fini ?' },
        {
          speaker: 'narration',
          text: 'Ses mains s’ouvrent enfin. Elle ne sait pas quoi en faire.',
        },
      ],
    },
  },
  {
    id: 'character-05',
    archetype: 'hostile',
    name: 'Corentin',
    voice:
      'Sec. Répond par des questions. Soupçonne chaque réponse. Ne baisse jamais les yeux.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Tu en as mis du temps. Où étais-tu ?' },
        { speaker: 'npc', text: 'Ne réponds pas. De toute façon, je ne te crois pas.' },
      ],
      doubt: [
        { speaker: 'npc', text: 'Qu’est-ce que tu me caches ?' },
        { speaker: 'narration', text: 'Il s’approche d’un pas. Tu sens son souffle.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'Ça ne change rien entre nous.' },
        {
          speaker: 'narration',
          text: 'Il s’en va sans te saluer. Sa main ne tremble pas.',
        },
      ],
    },
  },
  {
    id: 'character-06',
    archetype: 'hostile',
    name: 'Mireille',
    voice: 'Ironique. Mots tranchants. Sourit sans chaleur. Se moque avant d’attaquer.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Tiens, le héros du jour. Quelle surprise.' },
        { speaker: 'npc', text: 'Ne te dérange pas pour moi. Je suis juste venue voir.' },
      ],
      doubt: [
        { speaker: 'npc', text: 'Oh, tu ne sais plus ? Comme c’est pratique.' },
        { speaker: 'narration', text: 'Son sourire reste en place. Ses yeux, non.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'Bravo. J’applaudirais, mais je n’ai pas envie.' },
        {
          speaker: 'narration',
          text: 'Elle te laisse sa dernière phrase comme on laisse un clou.',
        },
      ],
    },
  },
  {
    id: 'character-07',
    archetype: 'innocent',
    name: 'Pia',
    voice: 'Une enfant. Questions simples. Dit ce qu’elle voit, sans arrière-pensée.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Tu es là ! Je t’attendais. Je ne dis rien à personne.' },
        {
          speaker: 'npc',
          text: 'Tu as les mêmes yeux qu’hier. Mais tu ne regardes pas pareil.',
        },
      ],
      doubt: [
        { speaker: 'npc', text: 'Pourquoi tu as l’air d’avoir oublié mon nom ?' },
        { speaker: 'npc', text: 'Ce n’est pas grave. Moi, je m’en souviens.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'Tu reviendras ? Même si tu es quelqu’un d’autre ?' },
        { speaker: 'narration', text: 'Elle te donne la main sans attendre de réponse.' },
      ],
    },
  },
  {
    id: 'character-08',
    archetype: 'innocent',
    name: 'Anselme',
    voice:
      'Un vieil homme. Doux, perdu dans le temps. Dit des vérités sans savoir qu’il les dit.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Ah, te voilà enfin. On t’a cherché partout, tu sais.' },
        {
          speaker: 'npc',
          text: 'Ou peut-être pas toi. Mais quelqu’un qui te ressemblait.',
        },
      ],
      doubt: [
        {
          speaker: 'npc',
          text: 'Tu n’as pas la même démarche. Pas grave. Les gens changent.',
        },
        { speaker: 'npc', text: 'Moi aussi, parfois, je ne suis plus dans mon corps.' },
      ],
      farewell: [
        {
          speaker: 'npc',
          text: 'Tu me raconteras, la prochaine fois. Il y a toujours une prochaine fois.',
        },
        {
          speaker: 'narration',
          text: 'Il sourit à quelqu’un derrière toi, que tu ne vois pas.',
        },
      ],
    },
  },
  // Quatre personnages de métier breton : un passeur, une gardienne de veillée, un sonneur, un enfant
  // qui écoute. Leur voix suggère le pays sans le nommer.
  {
    id: 'character-09',
    archetype: 'confident',
    name: 'Erwan',
    voice:
      'Pose chaque phrase comme une pierre sur l’eau. Parle de traversées, de marées, de ce qu’on laisse derrière soi.',
    dialogues: {
      greeting: [
        { speaker: 'npc', text: 'Monte. Je te mène où tu dois aller. C’est mon métier.' },
        {
          speaker: 'npc',
          text: 'Je ne demande jamais pourquoi. L’eau ne le demande pas non plus.',
        },
      ],
      doubt: [
        { speaker: 'npc', text: 'Tu rames comme quelqu’un qui découvre la rive.' },
        {
          speaker: 'narration',
          text: 'Il te regarde un long moment, puis hausse une épaule. Il en a vu d’autres.',
        },
      ],
      farewell: [
        {
          speaker: 'npc',
          text: 'Voilà. L’autre bord, c’est toujours le même, et jamais pareil.',
        },
        {
          speaker: 'narration',
          text: 'Il repousse sa barque d’un coup de perche, sans un regard en arrière.',
        },
      ],
    },
  },
  {
    id: 'character-10',
    archetype: 'worried',
    name: 'Soazig',
    voice:
      'Murmure. Garde une lumière ou une braise entre les mains. S’arrête au milieu des phrases pour écouter la nuit.',
    dialogues: {
      greeting: [
        {
          speaker: 'npc',
          text: 'Je garde cette flamme depuis hier. Elle ne veut pas rester.',
        },
        {
          speaker: 'npc',
          text: 'Chut. Écoute. Tu entends ? Non. Moi non plus. C’est ça, le pire.',
        },
      ],
      doubt: [
        { speaker: 'npc', text: 'Tu n’as pas fait le signe. Tu fais toujours le signe.' },
        {
          speaker: 'narration',
          text: 'Elle ramène la lumière contre elle, comme pour la cacher à ton regard.',
        },
      ],
      farewell: [
        { speaker: 'npc', text: 'Elle brûle encore. Je crois que c’est bon signe.' },
        {
          speaker: 'narration',
          text: 'Elle s’éloigne à petits pas, la flamme penchée devant elle.',
        },
      ],
    },
  },
  {
    id: 'character-11',
    archetype: 'hostile',
    name: 'Goulven',
    voice:
      'Bourru. Parle par sentences, comme un proverbe renversé. Méprise les hésitations et ceux qui en ont.',
    dialogues: {
      greeting: [
        {
          speaker: 'npc',
          text: 'Tu tires la corde ou tu te tais. Il n’y a pas de troisième manière.',
        },
        { speaker: 'npc', text: 'Ceux qui doutent, on les enterre les derniers.' },
      ],
      doubt: [
        {
          speaker: 'npc',
          text: 'Tu as la voix de quelqu’un d’autre. Je l’entends, moi.',
        },
        { speaker: 'narration', text: 'Il crache de côté, sans te quitter des yeux.' },
      ],
      farewell: [
        { speaker: 'npc', text: 'Fait ou pas fait. Le reste, c’est de la fumée.' },
        {
          speaker: 'narration',
          text: 'Il tourne le dos. Ses épaules disent que la conversation est close.',
        },
      ],
    },
  },
  {
    id: 'character-12',
    archetype: 'innocent',
    name: 'Maï',
    voice:
      'Dit tout ce qu’elle voit. Pose des questions trop justes. Ne comprend pas pourquoi les grands se taisent.',
    dialogues: {
      greeting: [
        {
          speaker: 'npc',
          text: 'Tu as les mains froides. Moi aussi, quand j’écoute des histoires.',
        },
        {
          speaker: 'npc',
          text: 'Tu me racontes la fin ? Personne ne veut me dire la fin.',
        },
      ],
      doubt: [
        { speaker: 'npc', text: 'Tu n’es pas comme hier. Tu sens différent.' },
        {
          speaker: 'narration',
          text: 'Elle te regarde sans méfiance, avec rien que de la curiosité.',
        },
      ],
      farewell: [
        {
          speaker: 'npc',
          text: 'Je savais que tu reviendrais. Enfin, quelqu’un comme toi.',
        },
        {
          speaker: 'narration',
          text: 'Elle te fait un petit signe de la main, comme à un voisin qui part.',
        },
      ],
    },
  },
];

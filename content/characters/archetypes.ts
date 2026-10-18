import type { Character } from './types';

// Huit personnages réutilisables, deux par archétype. Ils n'appartiennent à aucune prémisse :
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
];

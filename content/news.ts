// Nouveautés racontées aux joueurs, de la plus récente à la plus ancienne. Tutoiement, phrases courtes.
// Le journal technique des versions reste dans CHANGELOG.md.
export interface NewsItem {
  date: string;
  title: string;
  text: string;
}

export const news: readonly NewsItem[] = [
  {
    date: '2026-10-19',
    title: 'Deux histoires de plus',
    text: '« Le lavoir de minuit » : des lavandières te demandent d’aider à tordre un drap. « Les cloches d’Ys » : la mer se retire, et une porte de bronze t’attend. Elles se jouent toute l’année.',
  },
  {
    date: '2026-10-19',
    title: 'Laisser ta main faire',
    text: 'Au dialogue comme à l’enquête, tu peux laisser le corps agir seul. Il sait des choses que tu ignores. Mais il ne choisit pas toujours pour ton bien.',
  },
  {
    date: '2026-10-19',
    title: 'L’Observateur et les échos',
    text: 'À la fin d’un saut, quelqu’un te parle parfois, sans dire qui il est. Ce qu’il dit peut être utile, inutile, faux, ou trop proche de toi. Certains lieux te rappellent aussi un souvenir qui n’est pas le tien.',
  },
  {
    date: '2026-10-19',
    title: 'Lire plus confortablement',
    text: 'Tu peux régler la vitesse d’écriture du texte, jusqu’à tout afficher d’un coup. Un bouton « Tout afficher » est là quand tu veux passer.',
  },
  {
    date: '2026-10-19',
    title: 'Kalan Goañv et Nedeleg',
    text: 'Deux histoires de saison. « La table des absents » se joue autour de la nuit des morts, du 20 octobre au 10 novembre. « La nuit où les bêtes parlent » se joue de décembre à l’Épiphanie. Hors saison, elles dorment.',
  },
  {
    date: '2026-10-19',
    title: 'Des récits plus longs',
    text: 'Chaque histoire a maintenant une seconde passe de dialogue et un coup de théâtre. Ce que tu as cherché pendant l’enquête change ce qui t’arrive. Chaque fin laisse aussi une inquiétude derrière elle.',
  },
  {
    date: '2026-10-19',
    title: 'Des images d’ornement celtique',
    text: 'Les illustrations sont redessinées au trait ocre : spirales, triskèles et volutes. Chaque histoire a ses images.',
  },
  {
    date: '2026-10-19',
    title: 'Des légendes bretonnes',
    text: 'Le char qui grince, la cloche sous l’eau, la lueur dans le marais. Les histoires gardent l’écho de ces légendes sans les raconter. La page Sources dit d’où elles viennent.',
  },
];

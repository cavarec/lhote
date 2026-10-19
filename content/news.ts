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

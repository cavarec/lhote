// Nouveautés racontées aux joueurs, de la plus récente à la plus ancienne. Tutoiement, phrases courtes.
// Le journal technique des versions reste dans CHANGELOG.md.
export interface NewsItem {
  date: string;
  title: string;
  text: string;
}

export const news: readonly NewsItem[] = [
  {
    date: '2026-10-20',
    title: 'Un carnet pour tout suivre',
    text: 'Après chaque geste, on te dit si les autres se méfient plus ou moins de toi. Un carnet garde les indices du saut. Chaque histoire a sa propre épreuve : le temps qui file, le silence, un objet. Le Journal liste les corps que tu as habités et les fins que tu as trouvées.',
  },
  {
    date: '2026-10-19',
    title: 'Chaque saut est un épisode',
    text: 'Un « Précédemment » au réveil. Quelqu’un te dit ce qu’il faut réparer. Des chances de réussir qui bougent avec ce que tu apprends. À la fin, on te dit ce qui est arrivé ensuite.',
  },
  {
    date: '2026-10-19',
    title: 'Qui es-tu ?',
    text: 'Les histoires sont réécrites pour mieux se suivre. À chaque saut, tu peux chercher qui était le corps que tu habites. La fin te le dit. Tes souvenirs, eux, répondent un peu plus à chaque fois.',
  },
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

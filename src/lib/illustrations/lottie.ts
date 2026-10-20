import type { Mood, SceneKind } from './scenes';

// Animations Lottie facultatives. Tout fichier déposé dans src/assets/lottie/ est repéré au build ;
// sans fichier, Vignette garde les gravures SVG de scenes.ts.

const found = import.meta.glob('../../assets/lottie/*.json', {
  query: '?url&no-inline',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** Nom de fichier sans dossier ni extension → adresse servie. */
export const AVAILABLE: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(found).map(([path, url]) => [
    path.slice(path.lastIndexOf('/') + 1).replace(/\.json$/, ''),
    url,
  ]),
);

/** Les noms cherchés, du plus précis au plus général. */
export function lottieNames(premiseId: string, kind?: SceneKind, mood?: Mood): string[] {
  if (mood) return [`mood-${mood}`];
  if (!premiseId) return [];
  return kind ? [`${premiseId}-${kind}`, premiseId] : [premiseId];
}

/** L'adresse de l'animation à jouer, ou `null` : on retombe alors sur le SVG. */
export function lottieUrl(
  premiseId: string,
  kind?: SceneKind,
  mood?: Mood,
  available: Readonly<Record<string, string>> = AVAILABLE,
): string | null {
  for (const name of lottieNames(premiseId, kind, mood)) {
    const url = available[name];
    if (url) return url;
  }
  return null;
}

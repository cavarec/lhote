import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Le jeu tutoie partout : histoires, accueil, réglages, installation. Un « vous » dans l'interface
// ou dans les métadonnées de l'application casse la voix du jeu.
const FILES = [
  'index.html',
  'vite.config.ts',
  ...readdirSync('src/routes')
    .filter((f) => f.endsWith('.svelte'))
    .map((f) => join('src/routes', f)),
  ...readdirSync('src/lib/components')
    .filter((f) => f.endsWith('.svelte'))
    .map((f) => join('src/lib/components', f)),
  'content/news.ts',
  'src/lib/stores/game.svelte.ts',
  'worker/src/durable/service.ts',
];

describe('interface', () => {
  it.each(FILES)('%s tutoie', (file) => {
    const text = readFileSync(file, 'utf8');
    expect(text).not.toMatch(
      /\b(vous|votre|vos|voulez|souhaitez|pouvez|réessayez|patientez)\b/i,
    );
  });
});

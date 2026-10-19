import { describe, expect, it } from 'vitest';
import { buildFeed, parseChangelog } from '../../scripts/gen-feed.mjs';

const SAMPLE = `# Changelog

## [Non publié]

## [0.2.0] - 2026-10-19

### Ajouté

- Une <nouvelle> histoire & sa chute.

## [0.1.0] - 2026-10-01

- Première version.
`;

describe('flux des nouveautés', () => {
  it('lit les versions datées et ignore « Non publié »', () => {
    const entries = parseChangelog(SAMPLE);
    expect(entries.map((e) => e.version)).toEqual(['0.2.0', '0.1.0']);
    expect(entries[0]?.body).toContain('• Une <nouvelle> histoire');
  });

  it('produit un Atom valide dont le texte est échappé', () => {
    const xml = buildFeed(parseChangelog(SAMPLE));
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(xml).toContain('Une &lt;nouvelle&gt; histoire &amp; sa chute.');
    expect(xml).not.toContain('<nouvelle>');
    expect(xml).toContain('<updated>2026-10-19T12:00:00Z</updated>');
  });
});

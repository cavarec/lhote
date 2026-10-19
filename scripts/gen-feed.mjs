// Génère le flux Atom des nouveautés (dist/nouveautes.xml) à partir du CHANGELOG.
// Rien d'autre que le texte déjà public : pas de compteur, pas de traceur, pas d'adresse.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = 'https://lhote.atao.dev/';
const out = process.argv[2] ?? 'dist/nouveautes.xml';

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function parseChangelog(text) {
  const entries = [];
  const re = /^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})\s*$/gm;
  const marks = [...text.matchAll(re)];
  marks.forEach((m, i) => {
    const start = m.index + m[0].length;
    const end = marks[i + 1]?.index ?? text.length;
    const body = text
      .slice(start, end)
      .replace(/^### .*$/gm, '')
      .replace(/^- /gm, '• ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    entries.push({ version: m[1], date: m[2], body });
  });
  return entries.slice(0, 20);
}

export function buildFeed(entries) {
  const updated = entries[0] ? `${entries[0].date}T12:00:00Z` : '1970-01-01T00:00:00Z';
  const items = entries
    .map(
      (e) => `  <entry>
    <title>L’Hôte ${esc(e.version)}</title>
    <id>tag:lhote.atao.dev,${e.date}:${esc(e.version)}</id>
    <updated>${e.date}T12:00:00Z</updated>
    <link href="${SITE}"/>
    <content type="text">${esc(e.body)}</content>
  </entry>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="fr">
  <title>L’Hôte : nouveautés</title>
  <subtitle>Nouvelles histoires, saisons et améliorations du jeu.</subtitle>
  <id>tag:lhote.atao.dev,2026:nouveautes</id>
  <link href="${SITE}"/>
  <link rel="self" type="application/atom+xml" href="${SITE}nouveautes.xml"/>
  <updated>${updated}</updated>
${items}
</feed>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const entries = parseChangelog(readFileSync('CHANGELOG.md', 'utf8'));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buildFeed(entries));
  process.stdout.write(`${out} : ${entries.length} entrées\n`);
}

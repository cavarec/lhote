import type { Catalog } from '../../src/lib/engine/types';
import { validateMutations } from '../../src/lib/engine/world';
import type { Dialogue, Premise } from '../../content/premises/types';

// Règles d'écriture du §6.7, écrites comme des fonctions pures : `rules.test.ts` les applique
// au contenu réel et les teste elles-mêmes sur des exemples bons et mauvais.

export const MAX_SENTENCE_WORDS = 25;
export const MIN_RESULT_LINES = 2;
export const MAX_RESULT_LINES = 5;

/**
 * Mots en -ment qui ne sont pas des adverbes (noms communs). Un vrai adverbe nécessaire se
 * justifie en l'ajoutant ici, avec un commentaire. La liste est documentée dans content/README.md.
 */
export const MENT_EXCEPTIONS: ReadonlySet<string> = new Set([
  'comment',
  'forment',
  'fument',
  'bourdonnement',
  'entrebâillement',
  // Formes verbales (3e personne du pluriel) qui finissent en -ment.
  'ferment',
  'referment',
  'dorment',
  'endorment',
  'moment',
  'instant',
  'vêtement',
  'vêtements',
  'bâtiment',
  'bâtiments',
  'mouvement',
  'mouvements',
  'document',
  'documents',
  'instrument',
  'instruments',
  'ciment',
  'serment',
  'tremblement',
  'frottement',
  'craquement',
  'gémissement',
  'battement',
  'battements',
  'tourment',
  'sentiment',
  'sentiments',
  'ornement',
  'tempérament',
  'testament',
  'monument',
  'élément',
  'éléments',
  'segment',
  'fragment',
  'fragments',
  'parlement',
  'compartiment',
  'logement',
  'logements',
  'campement',
  'arrangement',
  'engagement',
  'enseignement',
  'emplacement',
  'ameublement',
  'revêtement',
  'effondrement',
  'ralentissement',
  'chuchotement',
  'grincement',
  'claquement',
  'bruissement',
  'ronflement',
  'sifflement',
  'halètement',
  'froissement',
  'pansement',
  'médicament',
  'médicaments',
  'aliment',
  'aliments',
  'fondement',
  'châtiment',
  'jugement',
  'avertissement',
  'événement',
  'événements',
  'commencement',
  'rassemblement',
  'dénuement',
  'gouvernement',
  'appartement',
  'abonnement',
  // Ajouts du lot de scénarios bretons : noms communs.
  'encadrement',
  'entêtement',
  'soulagement',
  'enterrement',
  'sacrement',
  'grondement',
  'hurlement',
  'clapotement',
  'raisonnement',
]);

/** Références interdites dans le texte joueur (§2.4) et jargon de jeu vidéo. */
export const FORBIDDEN_REFERENCES: readonly RegExp[] = [
  /code quantum/i,
  /quantum leap/i,
  /rogue legacy/i,
  /dark souls/i,
  /\bgame over\b/i,
  /\blevel up\b/i,
  /\bcheckpoint\b/i,
  /\bpoints? de vie\b/i,
];

export interface Violation {
  where: string;
  rule: string;
  message: string;
}

export interface PlayerText {
  where: string;
  text: string;
}

function dialogueTexts(where: string, dialogue: Dialogue): PlayerText[] {
  const texts: PlayerText[] = dialogue.lines.map((line, i) => ({
    where: `${where}.lines[${i}]`,
    text: line.text,
  }));
  dialogue.choices?.forEach((choice, i) => {
    texts.push({ where: `${where}.choices[${i}].text`, text: choice.text });
    choice.reply.forEach((line, j) => {
      texts.push({ where: `${where}.choices[${i}].reply[${j}]`, text: line.text });
    });
  });
  const round = dialogue.secondRound;
  round?.lines.forEach((line, i) =>
    texts.push({ where: `${where}.secondRound.lines[${i}]`, text: line.text }),
  );
  round?.choices.forEach((choice, i) => {
    texts.push({ where: `${where}.secondRound.choices[${i}].text`, text: choice.text });
    choice.reply.forEach((line, j) => {
      texts.push({
        where: `${where}.secondRound.choices[${i}].reply[${j}]`,
        text: line.text,
      });
    });
  });
  return texts;
}

/** Tout le texte que le joueur peut lire. Les champs techniques (id, voice) en sont exclus. */
export function collectPlayerTexts(catalog: Catalog): PlayerText[] {
  const texts: PlayerText[] = [];
  for (const premise of catalog.premises) {
    const at = `premise ${premise.id}`;
    texts.push(
      { where: `${at}.title`, text: premise.title },
      { where: `${at}.epoch`, text: premise.epoch },
      { where: `${at}.wakeup`, text: premise.wakeup },
    );
    premise.orientation.forEach((item, i) =>
      texts.push({ where: `${at}.orientation[${i}]`, text: item.text }),
    );
    premise.investigation.forEach((item, i) =>
      texts.push({ where: `${at}.investigation[${i}]`, text: item.text }),
    );
    texts.push(...dialogueTexts(`${at}.openingDialogue`, premise.openingDialogue));
    for (const beat of ['dialogue', 'investigation'] as const) {
      premise.handLetGo?.[beat].lines.forEach((line, j) =>
        texts.push({ where: `${at}.handLetGo.${beat}.lines[${j}]`, text: line.text }),
      );
    }
    premise.twists?.forEach((twist, i) =>
      twist.lines.forEach((line, j) =>
        texts.push({ where: `${at}.twists[${i}].lines[${j}]`, text: line.text }),
      ),
    );
    premise.briefing?.forEach((text, i) =>
      texts.push({ where: `${at}.briefing[${i}]`, text }),
    );
    premise.resolutions.forEach((r) => {
      if (r.aftermath) {
        texts.push({ where: `${at}.resolution ${r.id}.aftermath`, text: r.aftermath });
      }
    });
    if (premise.host) {
      texts.push(
        { where: `${at}.host.role`, text: premise.host.role },
        { where: `${at}.host.story`, text: premise.host.story },
      );
    }
    premise.resolutions.forEach((r) => {
      texts.push(
        { where: `${at}.resolution ${r.id}.choiceText`, text: r.choiceText },
        { where: `${at}.resolution ${r.id}.resultText`, text: r.resultText },
      );
    });
  }
  for (const character of catalog.characters) {
    texts.push({ where: `character ${character.id}.name`, text: character.name });
    for (const [key, lines] of Object.entries(character.dialogues)) {
      lines.forEach((line, i) =>
        texts.push({
          where: `character ${character.id}.dialogues.${key}[${i}]`,
          text: line.text,
        }),
      );
    }
  }
  for (const fracture of catalog.fractures) {
    texts.push({ where: `fracture ${fracture.id}.title`, text: fracture.title });
    fracture.interpretations.forEach((text, i) =>
      texts.push({ where: `fracture ${fracture.id}.interpretations[${i}]`, text }),
    );
  }
  for (const artifact of catalog.artifacts) {
    texts.push(
      { where: `artifact ${artifact.id}.name`, text: artifact.name },
      { where: `artifact ${artifact.id}.description`, text: artifact.description },
    );
  }
  for (const fragment of catalog.fragments) {
    texts.push({ where: `fragment ${fragment.id}.text`, text: fragment.text });
  }
  for (const echo of catalog.echoes) {
    texts.push({ where: `echo ${echo.id}.text`, text: echo.text });
  }
  for (const message of catalog.observerMessages) {
    texts.push({ where: `observer ${message.id}.text`, text: message.text });
  }
  return texts;
}

export function countWords(sentence: string): number {
  return sentence.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

/** Découpe en phrases : fin de phrase (. ! ? …) suivie d'un espace, ou saut de ligne. */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…»])\s+|\n+/u)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function checkText({ where, text }: PlayerText): Violation[] {
  const violations: Violation[] = [];
  const add = (rule: string, message: string) =>
    violations.push({ where, rule, message });

  for (const sentence of splitSentences(text)) {
    const words = countWords(sentence);
    if (words > MAX_SENTENCE_WORDS) {
      add(
        'phrase-longue',
        `${words} mots (maximum ${MAX_SENTENCE_WORDS}) : « ${sentence} »`,
      );
    }
  }
  if (/(?<![\p{L}])vous(?![\p{L}])/iu.test(text)) {
    add('vouvoiement', 'Le texte utilise « vous » ; le jeu tutoie.');
  }
  for (const match of text.matchAll(/(?<![\p{L}])\p{L}+ment(?![\p{L}])/giu)) {
    const word = match[0].toLowerCase();
    if (!MENT_EXCEPTIONS.has(word)) {
      add('adverbe-ment', `Adverbe en -ment : « ${match[0]} ».`);
    }
  }
  if (/(?<![\p{L}\p{N}])\d{4}(?![\p{L}\p{N}])/u.test(text)) {
    add('annee', 'Année à 4 chiffres interdite (§2.4).');
  }
  for (const pattern of FORBIDDEN_REFERENCES) {
    if (pattern.test(text))
      add('reference-interdite', `Référence interdite : ${pattern}.`);
  }
  return violations;
}

export function resultTextLines(text: string): number {
  return text.split('\n').filter((line) => line.trim().length > 0).length;
}

export function checkDialogueChoices(where: string, dialogue: Dialogue): Violation[] {
  const choices = dialogue.choices;
  if (choices === undefined) return [];
  const violations: Violation[] = [];
  const add = (message: string) => violations.push({ where, rule: 'choix', message });
  if (choices.length < 3 || choices.length > 4) {
    add(`${choices.length} options (3 ou 4 attendues).`);
  }
  for (const kind of ['neutral', 'risky', 'informative'] as const) {
    if (!choices.some((c) => c.kind === kind)) add(`Option « ${kind} » manquante.`);
  }
  return violations;
}

export function checkPremise(premise: Premise): Violation[] {
  const at = `premise ${premise.id}`;
  const violations: Violation[] = [];

  // Au moins un indice de chaque nature avant le premier dialogue (l'orientation précède le contact).
  for (const kind of ['material', 'bodily', 'social'] as const) {
    if (!premise.orientation.some((item) => item.kind === kind)) {
      violations.push({
        where: `${at}.orientation`,
        rule: 'indices',
        message: `Indice « ${kind} » manquant avant le premier dialogue.`,
      });
    }
  }

  violations.push(
    ...checkDialogueChoices(`${at}.openingDialogue`, premise.openingDialogue),
  );
  const round = premise.openingDialogue.secondRound;
  if (round) {
    violations.push(
      ...checkDialogueChoices(`${at}.openingDialogue.secondRound`, {
        npcId: premise.openingDialogue.npcId,
        lines: round.lines,
        choices: round.choices,
      }),
    );
  }
  // Qui es-tu ? Un choix du dialogue pose la question, une vérité d'enquête donne le nom,
  // et l'écran de fin donne la réponse (premise.host).
  const askIds = [
    ...(premise.openingDialogue.choices ?? []),
    ...(premise.openingDialogue.secondRound?.choices ?? []),
  ].map((c) => c.id);
  if (!askIds.includes('qui-es-tu')) {
    violations.push({
      where: `${at}.openingDialogue`,
      rule: 'identite',
      message: 'Aucun choix « qui-es-tu » : le joueur doit pouvoir demander qui il est.',
    });
  }
  if (!premise.host) {
    violations.push({ where: `${at}.host`, rule: 'identite', message: 'host manquant.' });
  } else {
    const known = premise.investigation.some(
      (c) => c.revealsTruth === premise.host?.truth,
    );
    if (!known) {
      violations.push({
        where: `${at}.host.truth`,
        rule: 'identite',
        message: `Aucun indice d'enquête ne révèle la vérité « ${premise.host.truth} ».`,
      });
    }
    if (premise.host.story.length < 40 || premise.host.name.length < 2) {
      violations.push({
        where: `${at}.host`,
        rule: 'identite',
        message: 'Identité trop courte.',
      });
    }
  }
  // L'Observateur dit ce qui doit être réparé ; chaque issue a sa carte de fin.
  const briefingLines = premise.briefing?.length ?? 0;
  if (briefingLines < 2 || briefingLines > 4) {
    violations.push({
      where: `${at}.briefing`,
      rule: 'episode',
      message: `${briefingLines} réplique(s) d'Observateur (2 à 4 attendues).`,
    });
  }
  for (const r of premise.resolutions) {
    if (!r.aftermath || r.aftermath.length < 30) {
      violations.push({
        where: `${at}.resolution ${r.id}`,
        rule: 'episode',
        message: 'aftermath manquant ou trop court.',
      });
    }
  }
  // Le geste de la main révèle une vérité qui existe vraiment dans l'enquête.
  const truths = new Set(
    premise.investigation.flatMap((c) => (c.revealsTruth ? [c.revealsTruth] : [])),
  );
  for (const beat of ['dialogue', 'investigation'] as const) {
    const move = premise.handLetGo?.[beat];
    if (move?.revealsTruth !== undefined && !truths.has(move.revealsTruth)) {
      violations.push({
        where: `${at}.handLetGo.${beat}`,
        rule: 'main',
        message: `Vérité inconnue : ${move.revealsTruth}.`,
      });
    }
  }
  // Un coup de théâtre sans condition sert de repli : il doit être le dernier.
  premise.twists?.forEach((twist, i, all) => {
    if (twist.requires === undefined && i !== all.length - 1) {
      violations.push({
        where: `${at}.twists[${i}]`,
        rule: 'twists',
        message: 'Un coup de théâtre sans condition doit venir en dernier.',
      });
    }
  });

  for (const resolution of premise.resolutions) {
    const where = `${at}.resolution ${resolution.id}`;
    const check = validateMutations(resolution.mutations);
    if (!check.ok) violations.push({ where, rule: 'mutations', message: check.message });
    const lines = resultTextLines(resolution.resultText);
    if (lines < MIN_RESULT_LINES || lines > MAX_RESULT_LINES) {
      violations.push({
        where: `${where}.resultText`,
        rule: 'resultat-lignes',
        message: `${lines} ligne(s) (entre ${MIN_RESULT_LINES} et ${MAX_RESULT_LINES} attendues).`,
      });
    }
  }
  return violations;
}

export function checkCatalog(catalog: Catalog): Violation[] {
  return [
    ...collectPlayerTexts(catalog).flatMap(checkText),
    ...catalog.premises.flatMap(checkPremise),
  ];
}

export function formatViolations(violations: readonly Violation[]): string {
  return violations.map((v) => `[${v.rule}] ${v.where} : ${v.message}`).join('\n');
}

// Écoute du texte : synthèse vocale du navigateur (Web Speech), sans service externe ni envoi de
// texte. Elle marche hors connexion quand l'appareil a une voix française installée.

export function speechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Les voix françaises de l'appareil (fr-FR, fr-CH, fr-CA…). La liste peut se remplir après coup. */
export function frenchVoices(): SpeechSynthesisVoice[] {
  if (!speechAvailable()) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith('fr'));
}

/**
 * La voix choisie par le joueur ; à défaut, une voix « neuronale » Ariane si l'appareil la propose
 * (Edge l'appelle « Microsoft Ariane Online (Natural) »), puis une voix fr-FR locale.
 */
export function pickVoice(
  voices: readonly SpeechSynthesisVoice[],
  preferred = '',
): SpeechSynthesisVoice | undefined {
  return (
    voices.find((v) => preferred !== '' && v.name === preferred) ??
    voices.find((v) => /ariane/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase() === 'fr-fr' && v.localService) ??
    voices[0]
  );
}

/**
 * Les paragraphes lisibles de la page : récits et répliques, pas les boutons ni les lignes
 * d'interface. Chaque paragraphe animé garde son texte complet dans un `.sr-only`.
 */
export function speakableParagraphs(root: ParentNode = document): string[] {
  const out: string[] = [];
  for (const el of root.querySelectorAll('main p, main h2')) {
    if (el.closest('details, button, .ui')) continue;
    const full = [...el.querySelectorAll('.sr-only')].map((s) => s.textContent ?? '');
    const text = (full.length > 0 ? full.join(' ') : (el.textContent ?? ''))
      .replace(/\s+/g, ' ')
      .trim();
    if (text) out.push(text);
  }
  return out;
}

export function stopSpeaking(): void {
  if (speechAvailable()) window.speechSynthesis.cancel();
}

/** Lit les paragraphes l'un après l'autre. `onend` est appelé une fois, à la fin ou à l'arrêt. */
export function speakAll(paragraphs: string[], onend: () => void, preferred = ''): void {
  stopSpeaking();
  if (paragraphs.length === 0) return onend();
  const voice = pickVoice(frenchVoices(), preferred);
  let finished = false;
  const finish = (): void => {
    if (finished) return;
    finished = true;
    onend();
  };
  paragraphs.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = 0.95;
    if (voice) u.voice = voice;
    if (i === paragraphs.length - 1) u.onend = finish;
    u.onerror = finish;
    window.speechSynthesis.speak(u);
  });
}

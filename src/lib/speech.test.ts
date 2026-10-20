import { describe, expect, it } from 'vitest';
import { pickVoice } from './speech';

const voice = (name: string, lang: string, localService = true): SpeechSynthesisVoice =>
  ({ name, lang, localService }) as SpeechSynthesisVoice;

describe('choix de la voix', () => {
  const thomas = voice('Thomas', 'fr-FR');
  const ariane = voice(
    'Microsoft Ariane Online (Natural) - French (Switzerland)',
    'fr-CH',
    false,
  );
  const denise = voice('Microsoft Denise Online (Natural)', 'fr-FR', false);

  it('prend la voix choisie par le joueur', () => {
    expect(pickVoice([thomas, ariane, denise], denise.name)).toBe(denise);
  });

  it('préfère Ariane quand rien n’est choisi', () => {
    expect(pickVoice([thomas, ariane, denise])).toBe(ariane);
  });

  it('retombe sur une voix fr-FR locale, puis sur la première', () => {
    expect(pickVoice([denise, thomas])).toBe(thomas);
    expect(pickVoice([denise])).toBe(denise);
    expect(pickVoice([])).toBeUndefined();
  });

  it('ignore un choix qui n’existe plus', () => {
    expect(pickVoice([thomas], 'Disparue')).toBe(thomas);
  });
});

import { describe, expect, it, vi } from 'vitest';
import { SHARE_URL, shareGame } from './share';

describe('shareGame', () => {
  it('utilise la feuille de partage du système', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    expect(await shareGame({ share })).toBe('shared');
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: SHARE_URL }));
  });

  it('la fermeture de la feuille n’est pas une erreur et ne copie rien', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('x', 'AbortError'));
    const writeText = vi.fn();
    expect(await shareGame({ share, clipboard: { writeText } })).toBe('cancelled');
    expect(writeText).not.toHaveBeenCalled();
  });

  it('copie le lien quand le partage système échoue ou n’existe pas', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const share = vi.fn().mockRejectedValue(new Error('non'));
    expect(await shareGame({ share, clipboard: { writeText } })).toBe('copied');
    expect(await shareGame({ clipboard: { writeText } })).toBe('copied');
    expect(writeText).toHaveBeenCalledWith(SHARE_URL);
  });

  it('signale l’échec quand rien n’est possible', async () => {
    expect(await shareGame({})).toBe('failed');
    const writeText = vi.fn().mockRejectedValue(new Error('refusé'));
    expect(await shareGame({ clipboard: { writeText } })).toBe('failed');
  });
});

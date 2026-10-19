/** Adresse partagée : la page d'accueil, jamais une adresse propre à un joueur. */
export const SHARE_URL = 'https://lhote.atao.dev/';
export const SHARE_TITLE = 'L’Hôte';
export const SHARE_TEXT =
  'Un jeu d’histoires aux légendes celtiques : tu ouvres les yeux dans le corps d’un inconnu.';

export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

interface ShareEnv {
  share?:
    ((data: { title: string; text: string; url: string }) => Promise<void>) | undefined;
  clipboard?: { writeText: (text: string) => Promise<void> } | undefined;
}

/**
 * Partage le jeu : la feuille de partage du système si elle existe, sinon copie du lien.
 * Rien n'est envoyé ailleurs : c'est le joueur qui choisit où va le lien.
 */
export async function shareGame(env: ShareEnv): Promise<ShareResult> {
  const data = { title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL };
  if (env.share) {
    try {
      await env.share(data);
      return 'shared';
    } catch (error) {
      // Fermer la feuille de partage n'est pas une erreur.
      if (error instanceof DOMException && error.name === 'AbortError')
        return 'cancelled';
    }
  }
  if (env.clipboard) {
    try {
      await env.clipboard.writeText(SHARE_URL);
      return 'copied';
    } catch {
      return 'failed';
    }
  }
  return 'failed';
}

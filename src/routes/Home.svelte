<script lang="ts">
  import { catalog } from '../../content';
  import { currentSeason } from '../lib/engine/season';
  import { game } from '../lib/stores/game.svelte';
  import { shareGame, type ShareResult } from '../lib/utils/share';

  let {
    onstart,
    onjournal,
    onprivacy,
    onsources,
    onepilogue,
    epilogueReady,
  }: {
    onstart: () => void;
    onjournal: () => void;
    onprivacy: () => void;
    onsources: () => void;
    onepilogue: () => void;
    epilogueReady: boolean;
  } = $props();

  const resuming = $derived(game.hasProgress);
  const season = currentSeason(catalog.premises, Date.now());

  let shared = $state<ShareResult | null>(null);
  const sharedMessage = $derived(
    shared === 'copied'
      ? 'Le lien est copié.'
      : shared === 'failed'
        ? 'Impossible de partager d’ici. Le lien est lhote.atao.dev.'
        : '',
  );

  async function share(): Promise<void> {
    shared = await shareGame({
      share:
        typeof navigator.share === 'function'
          ? navigator.share.bind(navigator)
          : undefined,
      clipboard: navigator.clipboard,
    });
  }
</script>

<main class="page fade-in">
  <h1 class="narration home-title">L'Hôte</h1>
  <p class="narration muted">
    {game.firstVisit
      ? 'Quelqu’un dort dans un corps qui n’est pas le sien.'
      : 'Le monde vous attend.'}
  </p>

  {#if season}
    <p class="narration muted season">
      Ces jours-ci, c’est {season.label}. Une histoire de saison peut t’attendre.
    </p>
  {/if}

  {#if game.degraded}
    <p class="ui notice" role="status">
      Le stockage de ce navigateur est indisponible. La partie ne sera pas conservée à la
      fermeture.
    </p>
  {/if}
  {#if !game.online}
    <p class="ui notice" role="status">
      Hors connexion. {game.hasProgress
        ? 'Votre saut en cours reste jouable.'
        : 'Le dernier saut reçu reste jouable ; un nouveau saut demande une connexion.'}
      Connexion requise pour résoudre.
    </p>
  {/if}
  {#if game.pending > 0}
    <p class="ui notice" role="status">
      {game.pending} fin{game.pending > 1 ? 's' : ''} de saut en attente de connexion.
    </p>
  {/if}
  {#if game.problem}
    <p class="ui notice" role="alert">{game.problemMessage}</p>
  {/if}

  <div class="choices">
    <button
      class="button button--primary"
      onclick={onstart}
      disabled={game.phase === 'loading'}
    >
      {game.phase === 'loading'
        ? 'Un instant…'
        : resuming
          ? 'Reprendre le saut'
          : 'Sauter'}
    </button>
    <button class="button" onclick={onjournal}>Journal</button>
    {#if epilogueReady}<button class="button" onclick={onepilogue}>Épilogue</button>{/if}
    <button class="button button--quiet" onclick={onprivacy}
      >Confidentialité et réglages</button
    >
    <button class="button button--quiet" onclick={onsources}>Sources</button>
  </div>

  <div class="quiet-links ui muted">
    <button class="link" onclick={share}>Partager</button>
    <span aria-hidden="true">·</span>
    <a class="link" href="/nouveautes.xml" rel="alternate" type="application/atom+xml"
      >S’abonner aux nouveautés</a
    >
  </div>
  <p class="ui muted" role="status" aria-live="polite">{sharedMessage}</p>
</main>

<style>
  .home-title {
    font-size: 2.5rem;
    margin: var(--space-5) 0 var(--space-2);
  }
  .season {
    margin-top: var(--space-2);
  }
  .quiet-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }
  .link {
    min-height: 48px;
    padding: 0 var(--space-2);
    display: inline-flex;
    align-items: center;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .notice {
    margin-top: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-left: 2px solid var(--blood);
    background: var(--veil);
  }
</style>

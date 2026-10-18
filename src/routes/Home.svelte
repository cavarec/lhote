<script lang="ts">
  import { game } from '../lib/stores/game.svelte';

  let {
    onstart,
    onjournal,
    onprivacy,
    onepilogue,
    epilogueReady,
  }: {
    onstart: () => void;
    onjournal: () => void;
    onprivacy: () => void;
    onepilogue: () => void;
    epilogueReady: boolean;
  } = $props();

  const resuming = $derived(game.hasProgress);
</script>

<main class="page fade-in">
  <h1 class="narration home-title">L'Hôte</h1>
  <p class="narration muted">
    {game.firstVisit
      ? 'Quelqu’un dort dans un corps qui n’est pas le sien.'
      : 'Le monde vous attend.'}
  </p>

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
  </div>
</main>

<style>
  .home-title {
    font-size: 2.5rem;
    margin: var(--space-5) 0 var(--space-2);
  }
  .notice {
    margin-top: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-left: 2px solid var(--blood);
    background: var(--veil);
  }
</style>

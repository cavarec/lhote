<script lang="ts">
  import Logo from '../lib/components/Logo.svelte';
  import { catalog } from '../../content';
  import { currentSeason } from '../lib/engine/season';
  import { game } from '../lib/stores/game.svelte';
  import { shareGame, type ShareResult } from '../lib/utils/share';

  let {
    onstart,
    onjournal,
    onprivacy,
    onsources,
    onnews,
    onepilogue,
    epilogueReady,
  }: {
    onstart: () => void;
    onjournal: () => void;
    onprivacy: () => void;
    onsources: () => void;
    onnews: () => void;
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
  <Logo size={132} />
  <h1 class="narration home-title">L'Hôte</h1>
  <p class="narration muted">Le monde t’attend.</p>
  <div class="narration muted intro">
    <p>
      À chaque nouvelle lecture, tu es l’hôte d’un nouveau corps.<br />
      Tu ne sais pas qui il était.<br />
      Il ne sait pas que tu es là.
    </p>
    <p>
      Chaque choix influence sa vie.<br />
      Chaque souvenir révèle une vérité.<br />
      Chaque histoire te transforme.
    </p>
  </div>

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
        ? 'Ton saut en cours reste jouable.'
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
          : 'Entrer dans une nouvelle vie'}
    </button>
    <button class="button" onclick={onjournal}>Journal</button>
    {#if epilogueReady}<button class="button" onclick={onepilogue}>Épilogue</button>{/if}
  </div>

  <div class="quiet-links muted">
    <button class="link" onclick={onnews}>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"
        />
        <circle cx="12" cy="12" r="2" />
      </svg>
      Nouveautés
    </button>
    <button class="link" onclick={share}>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
      </svg>
      Partager
    </button>
  </div>
  <p class="muted shared" role="status" aria-live="polite">{sharedMessage}</p>

  <footer class="fine-print">
    <button class="fine" onclick={onprivacy}>Confidentialité et réglages</button>
    <span aria-hidden="true">·</span>
    <button class="fine" onclick={onsources}>Sources</button>
  </footer>
</main>

<style>
  .home-title {
    font-size: 2.5rem;
    margin: var(--space-3) 0 var(--space-2);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .intro {
    margin-top: var(--space-2);
  }
  .intro p + p {
    margin-top: var(--space-3);
  }
  .season {
    margin-top: var(--space-2);
  }

  .quiet-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-4);
    font-size: 1.125rem;
  }
  .link {
    min-height: 48px;
    padding: 0 var(--space-2);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .link svg,
  .link svg * {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .link:hover {
    color: var(--ink);
  }
  .shared {
    margin: 0;
    min-height: 1.5em;
    text-align: center;
    font-family: var(--font-narration);
  }

  /* Confidentialité et sources : tout en bas, discrets. */
  .fine-print {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-5);
    padding-bottom: var(--space-3);
    color: var(--mist);
    font-family: var(--font-narration);
    font-size: 0.9rem;
  }
  .fine {
    min-height: 48px;
    padding: 0 var(--space-2);
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--mist) 45%, transparent);
    text-underline-offset: 3px;
  }
  .fine:hover {
    color: var(--ink);
  }
  .notice {
    margin-top: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-left: 2px solid var(--blood);
    background: var(--veil);
    font-family: var(--font-narration);
  }
</style>

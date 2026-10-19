<script lang="ts">
  import Vignette from '../lib/components/Vignette.svelte';
  import Scene from '../lib/components/Scene.svelte';
  import { installPrompt } from '../lib/pwa/install.svelte';
  import { pickObserverMessage } from '../lib/engine/extras';
  import { game } from '../lib/stores/game.svelte';

  const outcome = $derived(game.outcome!);
  const done = $derived(game.finished!);
  const instant = $derived(game.instant);
  const fragment = $derived(
    done.catalog.fragments.find((f) => f.id === done.leap.fragmentId) ?? null,
  );
  const observer = $derived(
    pickObserverMessage(done.leap.seed, done.catalog.observerMessages),
  );
  const lines = $derived(
    outcome.resolution.resultText
      .split(/\n+/)
      .filter(Boolean)
      .map((text) => ({ speaker: 'narration' as const, text })),
  );
</script>

<main class="page">
  <Vignette mood={outcome.resolution.outcome} />
  <Scene {lines} {instant}>
    {#if fragment}
      <aside class="fragment fade-in" aria-label="Fragment retrouvé">
        <p class="ui muted">Un souvenir qui n’est pas le tien</p>
        <p class="narration"><em>{fragment.text}</em></p>
      </aside>
    {/if}
    {#if observer}
      <aside class="observer fade-in" aria-label="Un message te parvient">
        <p class="ui muted">Quelqu’un te parle, de l’autre côté</p>
        <p class="narration"><em>{observer.text}</em></p>
      </aside>
    {/if}
    {#if outcome.queued}
      <p class="ui notice" role="status">
        Hors connexion : cette fin sera enregistrée dès que le réseau reviendra.
      </p>
    {/if}
    {#if installPrompt.available}
      <div class="install ui">
        <p>Retrouve L'Hôte sur ton écran d'accueil, même sans réseau.</p>
        <button class="button" onclick={() => installPrompt.install()}>Installer</button>
        <button class="button button--quiet" onclick={() => installPrompt.dismiss()}>
          Plus tard
        </button>
      </div>
    {/if}
    <button class="button button--primary next" onclick={() => game.home()}>
      Revenir
    </button>
  </Scene>
</main>

<style>
  .fragment {
    margin-top: var(--space-4);
    padding: var(--space-3);
    border-top: 1px solid var(--mist);
  }
  .notice {
    margin-top: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-left: 2px solid var(--blood);
    background: var(--veil);
  }
  .install {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }
  .next {
    margin-top: var(--space-4);
  }
</style>

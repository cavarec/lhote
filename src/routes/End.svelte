<script lang="ts">
  import Listen from '../lib/components/Listen.svelte';
  import Vignette from '../lib/components/Vignette.svelte';
  import Scene from '../lib/components/Scene.svelte';
  import { installPrompt } from '../lib/pwa/install.svelte';
  import { pickLeapOut, pickObserverMessage } from '../lib/engine/extras';
  import { game } from '../lib/stores/game.svelte';

  const outcome = $derived(game.outcome!);
  const done = $derived(game.finished!);
  const instant = $derived(game.instant);
  const fragment = $derived(
    done.catalog.fragments.find((f) => f.id === done.leap.fragmentId) ?? null,
  );
  const host = $derived(
    done.catalog.premises.find((p) => p.id === done.leap.premiseId)?.host ?? null,
  );
  const observer = $derived(
    pickObserverMessage(done.leap.seed, done.catalog.observerMessages),
  );
  const leapOut = $derived(pickLeapOut(done.leap.seed));
  const lines = $derived(
    outcome.resolution.resultText
      .split(/\n+/)
      .filter(Boolean)
      .map((text) => ({ speaker: 'narration' as const, text })),
  );
</script>

<main class="page">
  <div class="listen-row"><Listen /></div>
  <Vignette mood={outcome.resolution.outcome} />
  <Scene {lines} {instant}>
    {#if outcome.resolution.aftermath}
      <aside class="aftermath fade-in" aria-label="Ce qui est arrivé ensuite">
        <p class="ui muted">Ce qui est arrivé ensuite</p>
        <p class="narration">{outcome.resolution.aftermath}</p>
      </aside>
    {/if}
    {#if host}
      <aside class="host fade-in" aria-label="Qui était ce corps">
        <p class="ui muted">Qui était ce corps</p>
        <p class="narration">
          <strong>{host.name}</strong>, {host.role}. {host.story}
        </p>
      </aside>
    {/if}
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
    <p class="narration leap-out fade-in"><em>{leapOut}</em></p>
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
    <button
      class="button button--primary next"
      onclick={() => {
        game.home();
        void game.start();
      }}
    >
      Sauter encore
    </button>
    <button class="button button--quiet" onclick={() => game.home()}>Revenir</button>
  </Scene>
</main>

<style>
  .listen-row {
    display: flex;
    justify-content: flex-start;
  }
  .aftermath {
    margin-top: var(--space-4);
    padding: var(--space-3);
    border-top: 1px solid var(--ochre);
  }
  .leap-out {
    margin-top: var(--space-4);
    text-align: center;
  }
  .host {
    margin-top: var(--space-4);
    padding: var(--space-3);
    border-top: 1px solid var(--ochre);
  }
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

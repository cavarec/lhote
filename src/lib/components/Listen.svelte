<script lang="ts">
  import { onDestroy } from 'svelte';
  import { game } from '../stores/game.svelte';
  import {
    speakableParagraphs,
    speakAll,
    speechAvailable,
    stopSpeaking,
  } from '../speech';

  // « Écouter » lit à voix haute ce qui est affiché. À chaque appui, on reprend après ce qui a
  // déjà été lu ; s'il n'y a rien de nouveau, on relit tout.
  let playing = $state(false);
  let spoken = 0;
  const available = speechAvailable();

  function toggle(): void {
    if (playing) {
      stopSpeaking();
      playing = false;
      return;
    }
    const all = speakableParagraphs();
    const fresh = all.slice(spoken);
    const todo = fresh.length > 0 ? fresh : all;
    spoken = all.length;
    playing = true;
    speakAll(todo, () => (playing = false), game.settings?.voice ?? '');
  }

  // Un nouveau moment du saut : on se tait et on repart de zéro.
  $effect(() => {
    void game.beat;
    void game.phase;
    stopSpeaking();
    playing = false;
    spoken = 0;
  });

  onDestroy(stopSpeaking);
</script>

{#if available}
  <button
    class="button button--quiet"
    aria-pressed={playing}
    aria-label={playing
      ? 'Arrêter la lecture à voix haute'
      : 'Écouter le texte à voix haute'}
    onclick={toggle}
  >
    {playing ? 'Arrêter' : 'Écouter'}
  </button>
{/if}

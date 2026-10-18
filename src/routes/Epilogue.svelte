<script lang="ts">
  import { onMount } from 'svelte';
  import type { Fragment } from '../../content/fragments/types';
  import { game } from '../lib/stores/game.svelte';

  let { onback }: { onback: () => void } = $props();
  let fragments = $state<Fragment[]>([]);

  // L'épilogue rassemble les fragments dans l'ordre où ils se lisent, pas dans celui où ils sont venus.
  onMount(async () => {
    const catalog = await game.game.loadCatalog();
    const found = (await game.game.refreshState())?.state.chronology.metaProgress
      .fragmentsDiscovered;
    fragments = catalog.fragments
      .filter((f) => found?.includes(f.id))
      .sort((a, b) => a.act - b.act || a.order - b.order);
  });
</script>

<main class="page fade-in">
  <h1 class="narration">Épilogue</h1>
  <div class="narration">
    {#each fragments as f (f.id)}<p><em>{f.text}</em></p>{/each}
  </div>
  <button class="button next" onclick={onback}>Retour</button>
</main>

<style>
  .next {
    margin-top: var(--space-5);
  }
</style>

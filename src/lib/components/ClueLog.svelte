<script lang="ts">
  import type { CollectedClue } from '../game/beats';

  // Le carnet d'indices : tout ce que le saut t'a montré, à relire sans quitter la scène.
  let { clues }: { clues: CollectedClue[] } = $props();

  const LABEL = {
    material: 'Autour de toi',
    bodily: 'Dans ce corps',
    social: 'Chez les autres',
  };
  const KINDS = ['material', 'bodily', 'social'] as const;
</script>

<details class="cluelog">
  <summary class="ui muted">Carnet d’indices ({clues.length})</summary>
  {#each KINDS as kind (kind)}
    {@const items = clues.filter((c) => c.kind === kind)}
    {#if items.length > 0}
      <h3 class="ui muted">{LABEL[kind]}</h3>
      <ul class="narration">
        {#each items as c, i (i)}<li>{c.text}</li>{/each}
      </ul>
    {/if}
  {/each}
</details>

<style>
  .cluelog {
    margin-top: var(--space-4);
    border-top: 1px solid var(--mist);
    padding-top: var(--space-3);
  }
  summary {
    cursor: pointer;
  }
  h3 {
    margin: var(--space-3) 0 var(--space-1);
    font-size: 0.9em;
    font-weight: 400;
  }
  ul {
    margin: 0;
    padding-left: var(--space-3);
  }
  li + li {
    margin-top: var(--space-2);
  }
</style>

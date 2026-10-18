<script lang="ts">
  import type { DotState } from '../game/beats';

  let { dots, label }: { dots: DotState[]; label: string } = $props();
</script>

<ol class="progress" aria-label={label}>
  {#each dots as state, i (i)}
    <li class="progress__dot" data-state={state}>
      <span class="sr-only">{i + 1}{state === 'current' ? ' (en cours)' : ''}</span>
    </li>
  {/each}
</ol>

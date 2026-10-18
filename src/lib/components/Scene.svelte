<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DialogueLine } from '../../../content/premises/types';
  import Typewriter from './Typewriter.svelte';

  // Un texte de narration : paragraphes ou répliques, joués l'un après l'autre.
  interface Props {
    lines: DialogueLine[];
    npcName?: string | null;
    instant?: boolean;
    children?: Snippet;
    ondone?: () => void;
  }
  let { lines, npcName = null, instant = false, children, ondone }: Props = $props();

  let revealed = $state(1);
  let skipped = $state(false);
  const quick = $derived(instant || skipped);
  const finished = $derived(revealed >= lines.length);

  function next(): void {
    revealed = Math.min(revealed + 1, lines.length);
  }

  /** Un clic ou une touche affiche toute la scène d'un coup. */
  function skipAll(): void {
    skipped = true;
    revealed = lines.length;
  }

  $effect(() => {
    if (finished) ondone?.();
  });
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && skipAll()} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="narration fade-in" onclick={skipAll}>
  {#each lines.slice(0, revealed) as line, i (i)}
    <p class:npc={line.speaker === 'npc'}>
      {#if line.speaker === 'npc' && npcName}<span class="sr-only"
          >{npcName} :
        </span>{/if}
      {#if line.speaker === 'player'}<em
          ><Typewriter
            text={line.text}
            instant={quick}
            ondone={i === revealed - 1 ? next : undefined}
          /></em
        >{:else}<Typewriter
          text={line.text}
          instant={quick}
          ondone={i === revealed - 1 ? next : undefined}
        />{/if}
    </p>
  {/each}
</div>
{#if finished}{@render children?.()}{/if}

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
  const finished = $derived(revealed >= lines.length);

  function next(): void {
    revealed += 1;
  }

  $effect(() => {
    if (finished) ondone?.();
  });
</script>

<div class="narration fade-in">
  {#each lines.slice(0, revealed) as line, i (i)}
    <p class:npc={line.speaker === 'npc'}>
      {#if line.speaker === 'npc' && npcName}<span class="sr-only"
          >{npcName} :
        </span>{/if}
      {#if line.speaker === 'player'}<em
          ><Typewriter
            text={line.text}
            {instant}
            ondone={i === revealed - 1 ? next : undefined}
          /></em
        >{:else}<Typewriter
          text={line.text}
          {instant}
          ondone={i === revealed - 1 ? next : undefined}
        />{/if}
    </p>
  {/each}
</div>
{#if finished}{@render children?.()}{/if}

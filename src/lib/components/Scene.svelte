<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DialogueLine } from '../../../content/premises/types';
  import { game } from '../stores/game.svelte';
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
  const speed = $derived(game.typingSpeed);

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

  // Le texte s'écrit sous le bas de l'écran : on fait remonter la page au fil de l'écriture.
  // Si le joueur a remonté la page pour relire, on ne le ramène pas de force.
  let box = $state<HTMLDivElement>();
  let end = $state<HTMLSpanElement>();
  const FOLLOW_MARGIN = 28;

  function follow(): void {
    if (!end) return;
    const over =
      end.getBoundingClientRect().bottom - (window.innerHeight - FOLLOW_MARGIN);
    if (over > 0 && over < window.innerHeight * 0.6) {
      window.scrollBy({ top: over, behavior: 'auto' });
    }
  }

  $effect(() => {
    if (!box || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(follow);
    observer.observe(box);
    return () => observer.disconnect();
  });

  // Les choix qui apparaissent à la fin du texte doivent eux aussi être visibles.
  $effect(() => {
    if (!finished) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(follow));
    return () => cancelAnimationFrame(frame);
  });
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && skipAll()} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="narration fade-in" onclick={skipAll} bind:this={box}>
  {#each lines.slice(0, revealed) as line, i (i)}
    <p class:npc={line.speaker === 'npc'}>
      {#if line.speaker === 'npc' && npcName}<span class="sr-only"
          >{npcName} :
        </span>{/if}
      {#if line.speaker === 'player'}<em
          ><Typewriter
            text={line.text}
            instant={quick}
            {speed}
            ondone={i === revealed - 1 ? next : undefined}
          /></em
        >{:else}<Typewriter
          text={line.text}
          instant={quick}
          {speed}
          ondone={i === revealed - 1 ? next : undefined}
        />{/if}
    </p>
  {/each}
</div>
{#if !finished && !quick}
  <button class="button button--quiet skip ui" onclick={skipAll}>Tout afficher</button>
{/if}
{#if finished}{@render children?.()}{/if}
<span class="scene-end" bind:this={end} aria-hidden="true"></span>

<style>
  .skip {
    margin-top: var(--space-2);
  }
  .scene-end {
    display: block;
    height: 0;
  }
</style>

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

  // Le texte d'un paragraphe est mis en page avant d'être écrit : rien ne bouge pendant la lecture.
  // La page ne défile qu'une fois par nouveau paragraphe, doucement, pour le poser au tiers haut de
  // l'écran. Si le joueur a remonté la page pour relire, on ne le ramène pas de force.
  let box = $state<HTMLDivElement>();
  let end = $state<HTMLSpanElement>();
  const FOLLOW_MARGIN = 28;
  const TOP_SHARE = 0.3;

  function calm(): boolean {
    return (
      document.documentElement.dataset.reduceMotion === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function follow(): void {
    if (!end) return;
    const over =
      end.getBoundingClientRect().bottom - (window.innerHeight - FOLLOW_MARGIN);
    if (over > 0 && over < window.innerHeight * 0.6) {
      window.scrollBy({ top: over, behavior: calm() ? 'auto' : 'smooth' });
    }
  }

  function settleLastParagraph(): void {
    const last = box?.querySelector('p:last-of-type');
    if (!last) return;
    const rect = last.getBoundingClientRect();
    const fold = window.innerHeight - FOLLOW_MARGIN;
    // Déjà entièrement visible, ou très loin sous l'écran (le joueur relit plus haut) : on ne touche à rien.
    if (rect.bottom <= fold || rect.top > window.innerHeight * 1.3) return;
    const target = rect.top - window.innerHeight * TOP_SHARE;
    window.scrollBy({ top: Math.max(0, target), behavior: calm() ? 'auto' : 'smooth' });
  }

  $effect(() => {
    if (revealed < 2) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(settleLastParagraph));
    return () => cancelAnimationFrame(frame);
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

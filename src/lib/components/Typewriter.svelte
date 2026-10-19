<script lang="ts">
  import { onDestroy } from 'svelte';

  // Machine à écrire (§7.2) : 30 à 50 ms par caractère, interrompable d'un clic ou d'une touche.
  // Le texte complet est toujours présent pour les lecteurs d'écran ; l'animation est décorative.
  interface Props {
    text: string;
    instant?: boolean | undefined;
    speed?: number | undefined;
    ondone?: (() => void) | undefined;
  }
  let { text, instant = false, speed = 38, ondone }: Props = $props();

  let shown = $state(0);
  let timer: ReturnType<typeof setInterval> | null = null;
  const done = $derived(shown >= text.length);

  function stop(): void {
    if (timer) clearInterval(timer);
    timer = null;
  }

  $effect(() => {
    stop();
    if (instant || text.length === 0) {
      shown = text.length;
    } else {
      shown = 0;
      timer = setInterval(() => {
        shown += 1;
        if (shown >= text.length) stop();
      }, speed);
    }
    return stop;
  });

  $effect(() => {
    if (done) ondone?.();
  });

  onDestroy(stop);

  export function skip(): void {
    stop();
    shown = text.length;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class="typewriter" onclick={skip} onkeydown={skip}>
  <span class="sr-only">{text}</span>
  <!-- Le reste du texte est déjà mis en page, mais invisible : les lignes ne bougent pas pendant l'écriture. -->
  <span aria-hidden="true"
    >{text.slice(0, shown)}<span class="rest">{text.slice(shown)}</span></span
  >
</span>

<style>
  .rest {
    visibility: hidden;
  }
</style>

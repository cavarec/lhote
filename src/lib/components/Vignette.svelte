<script lang="ts">
  import { lottieUrl } from '../illustrations/lottie';
  import {
    moodSvg,
    sceneSvg,
    SCENE_LABELS,
    type Mood,
    type SceneKind,
  } from '../illustrations/scenes';

  // Une illustration d'ambiance : décorative (aria-hidden), légendée pour les lecteurs d'écran.
  interface Props {
    premiseId?: string;
    kind?: SceneKind | undefined;
    mood?: Mood | undefined;
  }
  let { premiseId = '', kind, mood }: Props = $props();

  const body = $derived(
    mood ? moodSvg(mood) : kind ? (sceneSvg(premiseId, kind) ?? '') : '',
  );
  const label = $derived(kind ? SCENE_LABELS[kind] : '');

  // Une animation Lottie déposée dans src/assets/lottie/ remplace la gravure SVG ; si elle ne se
  // charge pas, la gravure reste.
  const url = $derived(lottieUrl(premiseId, kind, mood));
  let host = $state<HTMLDivElement>();
  let playing = $state(false);

  function calm(): boolean {
    return (
      document.documentElement.dataset['reduceMotion'] === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  $effect(() => {
    if (!url || !host) return;
    const container = host;
    let animation: { destroy: () => void } | null = null;
    let cancelled = false;
    void (async () => {
      try {
        const [{ default: lottie }, response] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          fetch(url),
        ]);
        const animationData: unknown = await response.json();
        if (cancelled) return;
        const still = calm();
        const loaded = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: !still,
          autoplay: !still,
          animationData,
          rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
        });
        // Sans mouvement, on garde une image fixe : la première.
        if (still) loaded.goToAndStop(0, true);
        animation = loaded;
        playing = true;
      } catch {
        playing = false;
      }
    })();
    return () => {
      cancelled = true;
      animation?.destroy();
      playing = false;
    };
  });
</script>

{#if url}
  <figure class="vignette fade-in">
    <div
      class="lottie"
      class:hidden={!playing}
      role="img"
      aria-label={label || 'Illustration'}
      bind:this={host}
    ></div>
    {#if !playing && body}
      <svg
        viewBox="0 0 400 220"
        role="img"
        aria-label={label}
        preserveAspectRatio="xMidYMid slice"
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html body}
      </svg>
    {/if}
  </figure>
{:else if body}
  <figure class="vignette fade-in">
    <svg
      viewBox="0 0 400 220"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <!-- Contenu statique du dépôt (scenes.ts), jamais saisi par le joueur ; testé sans script ni lien. -->
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html body}
    </svg>
  </figure>
{/if}

<style>
  .vignette {
    margin: 0 0 var(--space-3);
    color: var(--ink);
  }
  .hidden {
    height: 0;
    overflow: hidden;
  }
  .lottie,
  svg {
    display: block;
    width: 100%;
    max-height: 32vh;
    aspect-ratio: 400 / 220;
    -webkit-mask-image: radial-gradient(
      ellipse 72% 78% at 50% 50%,
      #000 55%,
      transparent 100%
    );
    mask-image: radial-gradient(ellipse 72% 78% at 50% 50%, #000 55%, transparent 100%);
  }
  svg :global(.glow) {
    filter: blur(9px);
  }
  svg :global(.flick) {
    animation: flick 2.6s ease-in-out infinite;
  }
  svg :global(.pulse) {
    animation: pulse 3.4s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  svg :global(.fall) {
    animation: fall 5s linear infinite;
  }
  svg :global(.drift) {
    animation: drift 9s ease-in-out infinite alternate;
  }
  svg :global(.sweep) {
    animation: sweep 7s ease-in-out infinite alternate;
  }
  /* Mouvements des gravures : vagues qui roulent, cloches qui balancent, braises qui montent,
     souffle des silhouettes, spirales qui tournent, cercles qui s'élargissent. */
  svg :global(.wave) {
    animation: wave 5.5s ease-in-out infinite alternate;
  }
  svg :global(.sway) {
    animation: sway 3.8s ease-in-out infinite alternate;
  }
  svg :global(.rise) {
    animation: rise 4s linear infinite;
  }
  svg :global(.breathe) {
    animation: breathe 4.4s ease-in-out infinite alternate;
  }
  svg :global(.twirl) {
    animation: twirl 70s linear infinite;
  }
  svg :global(.twirl-back) {
    animation-direction: reverse;
  }
  svg :global(.ripple) {
    animation: ripple 4.6s ease-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  @keyframes wave {
    from {
      transform: translate(-12px, 0);
    }
    to {
      transform: translate(12px, 2.5px);
    }
  }
  @keyframes sway {
    from {
      transform: rotate(-5deg);
    }
    to {
      transform: rotate(5deg);
    }
  }
  @keyframes rise {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    to {
      transform: translateY(-52px);
      opacity: 0;
    }
  }
  @keyframes breathe {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(1.03);
    }
  }
  @keyframes twirl {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes ripple {
    from {
      transform: scale(0.7);
      opacity: 0.9;
    }
    to {
      transform: scale(1.3);
      opacity: 0;
    }
  }
  @keyframes flick {
    0%,
    100% {
      opacity: 1;
    }
    35% {
      opacity: 0.55;
    }
    60% {
      opacity: 0.9;
    }
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 0.55;
      transform: scale(0.96);
    }
    50% {
      opacity: 1;
      transform: scale(1.04);
    }
  }
  @keyframes fall {
    from {
      transform: translateY(-14px);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    to {
      transform: translateY(36px);
      opacity: 0;
    }
  }
  @keyframes drift {
    from {
      transform: translateX(-8px);
    }
    to {
      transform: translateX(8px);
    }
  }
  @keyframes sweep {
    from {
      transform: translateX(-24px);
    }
    to {
      transform: translateX(24px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    svg :global(*) {
      animation: none !important;
    }
  }
</style>

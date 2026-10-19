<script lang="ts">
  // Le logo : un œil, et dans sa pupille un parasite enroulé, comme un hôte qui en loge un autre.
  // Un fil glisse du parasite vers le dehors, par la paupière. Décoratif : le titre porte le sens.
  interface Props {
    size?: number;
  }
  let { size = 120 }: Props = $props();
</script>

<svg
  class="logo"
  viewBox="0 0 120 72"
  width={size}
  height={size * 0.6}
  aria-hidden="true"
  focusable="false"
>
  <g class="eye">
    <path
      d="M4 36C20 12 42 6 60 6s40 6 56 30C100 60 78 66 60 66S20 60 4 36z"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linejoin="round"
    />
    <circle cx="60" cy="36" r="24" fill="var(--blood)" />
    <circle
      cx="60"
      cy="36"
      r="24"
      fill="none"
      stroke="var(--ochre)"
      stroke-width="1.2"
      opacity=".6"
    />
    <circle cx="60" cy="36" r="14.5" fill="currentColor" />
    <path
      class="thread"
      d="M62.1 28.9C63 20 70 13 80 9s20-2 28 5"
      fill="none"
      stroke="var(--ochre)"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-dasharray="3 3"
    />
    <g transform="translate(60 36) scale(1.5) translate(-60 -36)"
      ><g class="parasite">
        <path
          d="M61.0 36.7 L60.9 37.0 L60.6 37.4 L60.3 37.6 L59.8 37.8 L59.3 37.8 L58.7 37.7 L58.2 37.4 L57.8 37.0 L57.4 36.4 L57.3 35.6 L57.3 34.9 L57.6 34.1 L58.1 33.4 L58.8 32.9 L59.6 32.5 L60.6 32.4 L61.6 32.5 L62.6 32.9 L63.4 33.6 L64.1 34.6 L64.4 35.7 L64.5 36.9 L64.3 38.1 L63.7 39.3 L62.8 40.3 L61.6 41.0 L60.2 41.4 L58.8 41.4 L57.3 41.0 L56.0 40.3 L54.9 39.1 L54.1 37.7 L53.7 36.1 L53.7 34.4 L54.3 32.7 L55.2 31.2 L56.6 30.0 L58.3 29.1 L60.1 28.8 L62.1 28.9"
          fill="none"
          stroke="var(--ochre)"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="62.1" cy="28.9" r="2.4" fill="var(--parchment)" />
      </g></g
    >
  </g>
</svg>

<style>
  .logo {
    display: block;
    margin: var(--space-4) 0 0;
    color: var(--ink);
    overflow: visible;
  }
  .parasite {
    transform-origin: 60px 36px;
    animation: coil 7s ease-in-out infinite;
  }
  .thread {
    animation: creep 3s linear infinite;
  }
  /* Le parasite sursaute deux fois par cycle, et l'œil cligne au même instant. */
  .eye {
    transform-origin: 60px 36px;
    animation: blink 7s ease-in-out infinite;
  }
  @keyframes coil {
    0%,
    37%,
    84%,
    100% {
      transform: rotate(-6deg) scale(1);
    }
    42%,
    79% {
      transform: rotate(12deg) scale(1.08);
    }
  }
  @keyframes blink {
    0%,
    36%,
    44%,
    78%,
    86%,
    100% {
      transform: scaleY(1);
    }
    40%,
    82% {
      transform: scaleY(0.06);
    }
  }
  @keyframes creep {
    to {
      stroke-dashoffset: -12;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .eye,
    .parasite,
    .thread {
      animation: none;
    }
  }
</style>

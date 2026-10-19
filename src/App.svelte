<script lang="ts">
  import { onMount } from 'svelte';
  import Home from './routes/Home.svelte';
  import { game } from './lib/stores/game.svelte';

  type View = 'home' | 'journal' | 'privacy' | 'sources' | 'news' | 'epilogue';
  let view = $state<View>('home');

  const Leap = () => import('./routes/Leap.svelte');
  const End = () => import('./routes/End.svelte');
  const Journal = () => import('./routes/Journal.svelte');
  const Privacy = () => import('./routes/Privacy.svelte');
  const Sources = () => import('./routes/Sources.svelte');
  const News = () => import('./routes/News.svelte');
  const Epilogue = () => import('./routes/Epilogue.svelte');

  onMount(() => {
    void game.boot();
    game.online = navigator.onLine;
    const online = () => {
      game.online = true;
      void game.syncPending();
    };
    const offline = () => (game.online = false);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  });

  // Réglages de lecture appliqués au document.
  $effect(() => {
    const root = document.documentElement;
    root.dataset['textSize'] = game.settings?.textSize ?? 'normal';
    root.dataset['reduceMotion'] = String(game.settings?.reduceMotion ?? false);
  });

  // L'écran de fin doit s'afficher même si le réseau tombe pendant le saut : on le charge dès
  // que le saut commence.
  $effect(() => {
    if (game.phase === 'playing') void End();
  });

  const back = () => (view = 'home');
</script>

{#if game.phase === 'booting'}
  <main class="page"><p class="ui muted" role="status">Chargement…</p></main>
{:else if game.phase === 'playing' || (game.phase === 'loading' && game.session)}
  {#await Leap() then m}<m.default />{/await}
{:else if game.phase === 'ended'}
  {#await End() then m}<m.default />{/await}
{:else if view === 'journal'}
  {#await Journal() then m}<m.default onback={back} />{/await}
{:else if view === 'privacy'}
  {#await Privacy() then m}<m.default onback={back} />{/await}
{:else if view === 'sources'}
  {#await Sources() then m}<m.default onback={back} />{/await}
{:else if view === 'news'}
  {#await News() then m}<m.default onback={back} />{/await}
{:else if view === 'epilogue'}
  {#await Epilogue() then m}<m.default onback={back} />{/await}
{:else}
  <Home
    onstart={() => game.start()}
    onjournal={() => (view = 'journal')}
    onprivacy={() => (view = 'privacy')}
    onsources={() => (view = 'sources')}
    onnews={() => (view = 'news')}
    onepilogue={() => (view = 'epilogue')}
    epilogueReady={game.epilogueReady}
  />
{/if}

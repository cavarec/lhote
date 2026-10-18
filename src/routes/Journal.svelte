<script lang="ts">
  import { onMount } from 'svelte';
  import type { StateResponse } from '../lib/api/types';
  import type { Catalog } from '../lib/engine/types';
  import { game } from '../lib/stores/game.svelte';

  let { onback }: { onback: () => void } = $props();

  let snapshot = $state<StateResponse | null>(null);
  let stale = $state(false);
  let failed = $state(false);
  let loading = $state(true);
  let catalog = $state<Catalog | null>(null);

  onMount(async () => {
    try {
      catalog = await game.game.loadCatalog();
      const result = await game.game.refreshState();
      if (result) {
        snapshot = result.state;
        stale = result.stale;
      }
    } catch {
      failed = true;
    }
    loading = false;
  });

  const nameOf = (id: string): string =>
    catalog?.characters.find((c) => c.id === id)?.name ?? id;
  const world = $derived(snapshot?.chronology.world ?? null);
  const history = $derived(snapshot?.chronology.history ?? []);
  const sections = $derived(
    world
      ? [
          { title: 'Portes', items: world.doors.map((d) => `${d.label} (${d.epoch})`) },
          {
            title: 'Personnes',
            items: world.people.map(
              (p) =>
                `${nameOf(p.characterId)} : ${p.status === 'saved' ? 'sauvé·e' : p.status === 'lost' ? 'perdu·e' : 'changé·e'} (${p.epoch})`,
            ),
          },
          { title: 'Vérités', items: world.truths.map((t) => t.summary) },
          {
            title: 'Objets',
            items: world.artifacts.map(
              (a) =>
                catalog?.artifacts.find((d) => d.id === a.artifactId)?.name ??
                a.artifactId,
            ),
          },
          {
            title: 'Cicatrices',
            items: world.scars.map((s) => `${s.description} (${s.epoch})`),
          },
        ]
      : [],
  );
</script>

<main class="page fade-in">
  <h1 class="narration">Journal</h1>
  {#if loading}
    <p class="ui muted" role="status">Chargement…</p>
  {:else if failed}
    <p class="ui" role="alert">Le journal est indisponible pour le moment.</p>
  {:else if !world}
    <p class="ui muted">Rien à lire encore : le journal se remplit au fil des sauts.</p>
  {:else}
    {#if stale}<p class="ui muted" role="status">
        Dernière version connue (hors connexion).
      </p>{/if}
    <p class="ui muted">
      {history.length} saut{history.length > 1 ? 's' : ''} accompli{history.length > 1
        ? 's'
        : ''}.
    </p>
    {#each sections as section (section.title)}
      <section class="narration">
        <h2>{section.title}</h2>
        {#if section.items.length === 0}
          <p class="muted">Aucune trace.</p>
        {:else}
          <ul>
            {#each section.items as item, i (i)}<li>{item}</li>{/each}
          </ul>
        {/if}
      </section>
    {/each}
  {/if}
  <button class="button next" onclick={onback}>Retour</button>
</main>

<style>
  section {
    margin-top: var(--space-4);
  }
  h2 {
    font-size: 1.25em;
    font-weight: 400;
  }
  ul {
    padding-left: var(--space-3);
  }
  .next {
    margin-top: var(--space-5);
  }
</style>

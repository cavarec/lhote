<script lang="ts">
  import { news } from '../../content/news';

  let { onback }: { onback: () => void } = $props();

  const dateFr = (iso: string): string =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
</script>

<main class="page fade-in">
  <h1 class="narration">Nouveautés</h1>
  <div class="narration">
    {#each news as item (item.title)}
      <h2>{item.title}</h2>
      <p class="ui muted">{dateFr(item.date)}</p>
      <p>{item.text}</p>
    {/each}
  </div>
  <p class="ui muted">
    Tu utilises un lecteur de flux ? <a href="/nouveautes.xml">Le flux des nouveautés</a>.
  </p>
  <button class="button next" onclick={onback}>Retour</button>
</main>

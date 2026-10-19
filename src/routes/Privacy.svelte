<script lang="ts">
  import { game } from '../lib/stores/game.svelte';
  import type { TextSize, TextSpeed } from '../lib/db/schema';

  let { onback }: { onback: () => void } = $props();

  let message = $state('');
  let confirming = $state(false);

  const sizes: { value: TextSize; label: string }[] = [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Grand' },
    { value: 'xlarge', label: 'Très grand' },
  ];

  const speeds: { value: TextSpeed; label: string }[] = [
    { value: 'slow', label: 'Lente' },
    { value: 'normal', label: 'Normale' },
    { value: 'fast', label: 'Rapide' },
    { value: 'instant', label: 'Tout d’un coup' },
  ];

  async function download(): Promise<void> {
    try {
      const data = await game.game.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'lhote-mes-donnees.json';
      a.click();
      URL.revokeObjectURL(a.href);
      message = 'Tes données ont été téléchargées.';
    } catch {
      message = 'Export impossible sans connexion.';
    }
  }

  async function erase(): Promise<void> {
    try {
      await game.game.deleteEverything();
      // La copie d'état gardée par le service worker appartient au joueur effacé.
      if ('caches' in globalThis) await caches.delete('lhote-state');
      location.reload();
    } catch {
      message = 'Suppression impossible sans connexion : rien n’a été effacé.';
      confirming = false;
    }
  }
</script>

<main class="page fade-in">
  <h1 class="narration">Confidentialité et réglages</h1>

  <section class="ui">
    <h2>Lecture</h2>
    <div class="row" role="group" aria-label="Taille du texte">
      {#each sizes as s (s.value)}
        <button
          class="button"
          aria-pressed={game.settings?.textSize === s.value}
          onclick={() => game.saveSettings({ textSize: s.value })}>{s.label}</button
        >
      {/each}
    </div>
    <div class="row" role="group" aria-label="Vitesse d’écriture du texte">
      {#each speeds as s (s.value)}
        <button
          class="button"
          aria-pressed={game.settings?.textSpeed === s.value}
          onclick={() => game.saveSettings({ textSpeed: s.value })}>{s.label}</button
        >
      {/each}
    </div>
    <label class="check">
      <input
        type="checkbox"
        checked={game.settings?.reduceMotion}
        onchange={(e) => game.saveSettings({ reduceMotion: e.currentTarget.checked })}
      />
      Réduire les animations
    </label>
    <label class="check">
      <input
        type="checkbox"
        checked={game.settings?.vibration}
        onchange={(e) => game.saveSettings({ vibration: e.currentTarget.checked })}
      />
      Vibrations
    </label>
  </section>

  <section class="ui">
    <h2>Tes données</h2>
    <p>
      L'Hôte ne demande ni compte ni adresse. Un identifiant aléatoire, stocké sur cet
      appareil, relie ta partie à ses sauvegardes. Le serveur garde ton monde et ton
      historique pendant un an sans activité, puis les efface. Aucune mesure d'audience,
      aucun traceur.
    </p>
    <p>
      Un fragment de tes sauts, une seule phrase sans identifiant, peut être lu par un
      autre joueur comme une trace discrète. Il disparaît après 90 jours.
    </p>
    <button class="button" onclick={download}>Télécharger mes données</button>
    {#if confirming}
      <p role="alert">
        Tout sera effacé, ici et sur le serveur. Cette action est définitive.
      </p>
      <div class="row">
        <button class="button button--primary" onclick={erase}>Oui, tout effacer</button>
        <button class="button" onclick={() => (confirming = false)}>Annuler</button>
      </div>
    {:else}
      <button class="button" onclick={() => (confirming = true)}
        >Supprimer mes données</button
      >
    {/if}
    {#if message}<p role="status">{message}</p>{/if}
  </section>

  <button class="button next" onclick={onback}>Retour</button>
</main>

<style>
  section {
    margin-top: var(--space-4);
    display: grid;
    gap: var(--space-2);
  }
  h2 {
    font-size: 1.125em;
    font-weight: 600;
  }
  .row {
    display: grid;
    gap: var(--space-2);
  }
  .check {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--touch-min);
  }
  .check input {
    width: 1.5rem;
    height: 1.5rem;
  }
  [aria-pressed='true'] {
    background: var(--ink);
    color: var(--parchment);
  }
  .next {
    margin-top: var(--space-5);
  }
</style>

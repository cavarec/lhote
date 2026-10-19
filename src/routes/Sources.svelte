<script lang="ts">
  let { onback }: { onback: () => void } = $props();
</script>

<main class="page fade-in">
  <h1 class="narration">Sources</h1>
  <div class="narration">
    <p>
      Les histoires de L’Hôte s’inspirent de contes, de légendes et de croyances
      recueillis en Bretagne. Elles ne les racontent pas : elles en gardent un écho.
    </p>
    <p>
      Les collecteurs dont le travail a nourri ces pages : François-Marie Luzel, Anatole
      Le Braz et Paul Sébillot.
    </p>
    <p>
      Rien ici ne se veut leçon d’histoire ni guide de légendes. Les lieux et les époques
      sont des ambiances. Si une image te dit quelque chose, tant mieux. Sinon, tu ne
      perds rien.
    </p>
  </div>
  <button class="button next" onclick={onback}>Retour</button>
</main>

<script lang="ts">
  import type { DialogueLine } from '../../content/premises/types';
  import Progress from '../lib/components/Progress.svelte';
  import Scene from '../lib/components/Scene.svelte';
  import Vignette from '../lib/components/Vignette.svelte';
  import { pickEcho } from '../lib/engine/extras';
  import type { SceneKind } from '../lib/illustrations/scenes';
  import {
    activeTwist,
    availableResolutions,
    chooseDialogue,
    chooseSecondRound,
    startTwist,
    twistPending,
    clueGroups,
    handMove,
    handUsed,
    letHandAct,
    investigationLeft,
    lockedResolutions,
    leanToward,
    revealClues,
    speakerFor,
  } from '../lib/game/beats';
  import { game } from '../lib/stores/game.svelte';

  const session = $derived(game.session!);
  const leap = $derived(session.leap);
  const premise = $derived(session.premise);
  const catalog = $derived(session.catalog);
  const instant = $derived(game.instant);
  const fracture = $derived(catalog.fractures.find((f) => f.id === leap.fractureId));

  const paragraphs = (text: string): DialogueLine[] =>
    text
      .split(/\n+/)
      .filter(Boolean)
      .map((t) => ({ speaker: 'narration', text: t }));

  const speaker = $derived(speakerFor(leap, catalog, premise.openingDialogue.npcId));
  const handDialogue = $derived(handMove(premise, 'dialogue'));
  const handInvestigation = $derived(handMove(premise, 'investigation'));
  const chosen = $derived(
    leap.choices['dialogue'] === 'hand' && handDialogue
      ? { text: 'Tu laisses ta main faire.', reply: handDialogue.lines }
      : (premise.openingDialogue.choices?.find(
          (c) => c.id === leap.choices['dialogue'],
        ) ?? null),
  );
  // Un écho personnel se glisse dans l'orientation d'un saut sur quatre, sans rien le signaler.
  const echo = $derived(pickEcho(leap.seed, catalog.echoes));
  const orientation = $derived([
    ...premise.orientation.map((o) => ({ speaker: 'narration' as const, text: o.text })),
    ...(echo ? [{ speaker: 'narration' as const, text: echo.text }] : []),
  ]);
  const round = $derived(premise.openingDialogue.secondRound ?? null);
  const chosen2 = $derived(
    round?.choices.find((c) => c.id === leap.choices['dialogue2']) ?? null,
  );
  const twist = $derived(activeTwist(premise, leap));
  const twistOn = $derived(twistPending(leap));
  const groups = $derived(clueGroups(premise, leap));
  const resolutions = $derived(availableResolutions(premise, leap));
  const locked = $derived(lockedResolutions(premise, leap));
  const left = $derived(investigationLeft(groups));

  const sceneKind = $derived<SceneKind | undefined>(
    game.beat === 'wakeup' ||
      game.beat === 'orientation' ||
      game.beat === 'dialogue' ||
      game.beat === 'investigation' ||
      game.beat === 'fracture'
      ? game.beat
      : undefined,
  );

  function choose2(id: string): void {
    void game.update((l) => chooseSecondRound(l, premise, id).leap);
  }

  function afterInvestigation(): void {
    if (twist && !twistOn) void game.update((l) => startTwist(l));
    else game.advance();
  }

  function choose(id: string): void {
    void game.update((l) => chooseDialogue(l, premise, id).leap);
  }
</script>

<main class="page">
  {#if game.beat !== 'wakeup'}
    <Progress dots={game.dots} label="Progression du saut" />
  {/if}

  <h1 class="ui muted scene-title">{premise.title}</h1>

  {#key game.beat}
    <Vignette premiseId={premise.id} kind={sceneKind} />
    {#if game.beat === 'wakeup'}
      <Scene lines={paragraphs(premise.wakeup)} {instant}>
        <button class="button button--primary next" onclick={() => game.advance()}>
          Ouvrir les yeux
        </button>
      </Scene>
    {:else if game.beat === 'orientation'}
      <Scene lines={orientation} {instant}>
        <button class="button button--primary next" onclick={() => game.advance()}>
          Continuer
        </button>
      </Scene>
    {:else if game.beat === 'dialogue'}
      <Scene
        lines={premise.openingDialogue.lines}
        npcName={speaker?.name ?? null}
        {instant}
      >
        {#if !chosen}
          <ul class="choices">
            {#each premise.openingDialogue.choices ?? [] as c (c.id)}
              <li>
                <button class="choice" onclick={() => choose(c.id)}>{c.text}</button>
              </li>
            {/each}
            {#if handDialogue}
              <li>
                <button
                  class="choice choice--hand"
                  onclick={() => game.update((l) => letHandAct(l, premise, 'dialogue'))}
                >
                  Laisser ta main faire.
                </button>
              </li>
            {/if}
          </ul>
        {:else}
          <Scene
            lines={[{ speaker: 'player', text: chosen.text }, ...chosen.reply]}
            npcName={speaker?.name ?? null}
            {instant}
          >
            {#if !round}
              <button class="button button--primary next" onclick={() => game.advance()}>
                Continuer
              </button>
            {:else}
              <Scene lines={round.lines} npcName={speaker?.name ?? null} {instant}>
                {#if !chosen2}
                  <ul class="choices">
                    {#each round.choices as c (c.id)}
                      <li>
                        <button class="choice" onclick={() => choose2(c.id)}>
                          {c.text}
                        </button>
                      </li>
                    {/each}
                  </ul>
                {:else}
                  <Scene
                    lines={[{ speaker: 'player', text: chosen2.text }, ...chosen2.reply]}
                    npcName={speaker?.name ?? null}
                    {instant}
                  >
                    <button
                      class="button button--primary next"
                      onclick={() => game.advance()}
                    >
                      Continuer
                    </button>
                  </Scene>
                {/if}
              </Scene>
            {/if}
          </Scene>
        {/if}
      </Scene>
    {:else if game.beat === 'investigation' && twistOn && twist}
      <Scene lines={twist.lines} npcName={speaker?.name ?? null} {instant}>
        <button class="button button--primary next" onclick={() => game.advance()}>
          Faire face
        </button>
      </Scene>
    {:else if game.beat === 'investigation'}
      <div class="narration fade-in">
        <p>
          Tu ne peux pas tout examiner. Ce que tu laisses de côté, tu ne le sauras pas.
        </p>
        <p class="ui muted" aria-live="polite">
          {left > 0
            ? `Il te reste ${left} ${left > 1 ? 'gestes' : 'geste'}.`
            : 'Le temps te manque. Tu sais ce que tu sais.'}
        </p>
      </div>
      <ul class="choices">
        {#each groups as group (group.kind)}
          <li>
            {#if group.seen}
              {#each group.texts as text, i (i)}
                <p class="narration npc">{text}</p>
              {/each}
            {:else}
              <button
                class="choice"
                disabled={left === 0}
                onclick={() => game.update((l) => revealClues(l, group.indices, premise))}
              >
                {group.label}
              </button>
            {/if}
          </li>
        {/each}
      </ul>
      {#if handInvestigation}
        {#if handUsed(leap, 'investigation')}
          {#each handInvestigation.lines as line, i (i)}
            <p class="narration npc-hand">{line.text}</p>
          {/each}
        {:else}
          <button
            class="button button--quiet hand"
            onclick={() => game.update((l) => letHandAct(l, premise, 'investigation'))}
          >
            Laisser ta main faire.
          </button>
        {/if}
      {/if}
      <button class="button button--primary next" onclick={afterInvestigation}>
        Continuer
      </button>
    {:else if game.beat === 'fracture' && fracture}
      <div class="narration fade-in">
        <h2>{fracture.title}</h2>
        <p class="muted">Deux lectures sont possibles. Tu penches pour…</p>
      </div>
      <ul class="choices">
        {#each fracture.interpretations as text, i (i)}
          <li>
            <button
              class="choice"
              aria-pressed={leap.choices['fracture'] === String(i)}
              onclick={() => game.update((l) => leanToward(l, i as 0 | 1))}
            >
              {text}
            </button>
          </li>
        {/each}
      </ul>
      <button
        class="button button--primary next"
        disabled={leap.choices['fracture'] === undefined}
        onclick={() => game.advance()}
      >
        Décider
      </button>
    {:else}
      <div class="narration fade-in">
        <p>Il faut agir, maintenant.</p>
      </div>
      <ul class="choices">
        {#each resolutions as r (r.id)}
          <li>
            <button
              class="choice"
              disabled={game.phase === 'loading'}
              onclick={() => game.resolve(r.id)}
            >
              {r.choiceText}
            </button>
          </li>
        {/each}
        {#each locked as r (r.id)}
          <li>
            <button
              class="choice choice--locked"
              disabled
              aria-describedby="locked-{r.id}"
            >
              {r.choiceText}
            </button>
            <p class="ui muted" id="locked-{r.id}">
              Tu n’en sais pas assez pour tenter cela.
            </p>
          </li>
        {/each}
      </ul>
      {#if game.problem}<p class="ui notice" role="alert">{game.problemMessage}</p>{/if}
    {/if}
  {/key}
</main>

<style>
  .scene-title {
    margin: var(--space-3) 0;
    text-align: center;
    font-weight: 400;
  }
  .next {
    margin-top: var(--space-4);
  }
  .choice--hand {
    font-style: italic;
    border-style: dashed;
  }
  .hand {
    margin-top: var(--space-3);
  }
  .npc-hand {
    border-left: 2px solid var(--mist);
    padding-left: var(--space-3);
    font-style: italic;
  }
  .choice--locked {
    opacity: 0.45;
  }
  .notice {
    margin-top: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-left: 2px solid var(--blood);
    background: var(--veil);
  }
</style>

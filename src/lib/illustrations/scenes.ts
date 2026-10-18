// Illustrations du jeu : des lavis d'encre en SVG, dessinés à la main, sans image à charger.
// Elles s'affichent hors connexion et se teintent selon le thème (encre = currentColor, sang = --blood).
// Classes d'animation (voir Vignette.svelte) : glow (halo flouté), flick (vacillement),
// fall (chute lente), sweep (balayage), pulse (battement), drift (dérive).

export type SceneKind =
  'wakeup' | 'orientation' | 'dialogue' | 'investigation' | 'fracture';
export type Mood = 'resolved' | 'failed' | 'exposed' | 'died';

const ink = (o: number) => `fill="currentColor" fill-opacity="${o}"`;
const line = (o: number, w = 1.4) =>
  `fill="none" stroke="currentColor" stroke-opacity="${o}" stroke-width="${w}" stroke-linecap="round"`;
const warm = (o: number) => `fill="var(--blood)" fill-opacity="${o}"`;

function snow(n: number, seed: number): string {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: n }, () => {
    const x = Math.round(rnd() * 400);
    const y = Math.round(rnd() * 200);
    const d = (2 + rnd() * 5).toFixed(1);
    return `<circle class="fall" style="animation-delay:-${(rnd() * 6).toFixed(1)}s;animation-duration:${d}s" cx="${x}" cy="${y}" r="${(0.7 + rnd() * 1.1).toFixed(1)}" ${ink(0.55)}/>`;
  }).join('');
}

const village = (): string =>
  `<path d="M0 150 L50 128 L100 150 L100 220 L0 220Z" ${ink(0.5)}/>` +
  `<path d="M90 160 L150 124 L210 160 L210 220 L90 220Z" ${ink(0.62)}/>` +
  `<path d="M200 150 L262 118 L330 150 L330 220 L200 220Z" ${ink(0.5)}/>` +
  `<path d="M320 156 L370 130 L400 148 L400 220 L320 220Z" ${ink(0.62)}/>` +
  `<rect x="236" y="96" width="9" height="26" ${ink(0.62)}/>` +
  `<path class="drift" d="M240 92 C236 78 248 70 240 56 C236 46 246 38 242 28" ${line(0.35, 3)}/>`;

const SCENES: Record<string, Record<SceneKind, string>> = {
  // ─── La réserve d'huile : un village sous la neige, une lampe sans huile.
  'premise-01': {
    wakeup:
      `<ellipse class="glow pulse" cx="200" cy="112" rx="120" ry="52" ${warm(0.55)}/>` +
      `<path d="M70 112 C120 70 280 70 330 112" ${line(0.5, 2)}/>` +
      `<path d="M70 112 C120 148 280 148 330 112" ${line(0.35, 2)}/>` +
      `<path d="M120 100 L112 90 M160 90 L156 78 M200 86 L200 72 M240 90 L244 78 M280 100 L288 90" ${line(0.3)}/>` +
      `<circle class="fall" style="animation-duration:5s" cx="326" cy="40" r="2.4" ${ink(0.5)}/>`,
    orientation:
      `<rect x="40" y="18" width="320" height="150" rx="3" ${line(0.6, 2)}/>` +
      `<path d="M200 18 V168 M40 93 H360" ${line(0.5, 2)}/>` +
      `<g>${snow(26, 7)}</g>${village()}` +
      `<rect x="30" y="168" width="340" height="10" ${ink(0.7)}/>` +
      `<rect x="88" y="152" width="22" height="16" ${ink(0.75)}/><rect x="94" y="140" width="10" height="12" ${line(0.7, 1.6)}/>` +
      `<path d="M220 168 l4 -12 M232 168 l-2 -12 M244 168 l6 -10" ${line(0.7, 2)}/>` +
      `<circle cx="262" cy="160" r="3.5" ${warm(0.7)}/>`,
    dialogue:
      `<rect x="0" y="0" width="400" height="220" ${ink(0.05)}/>` +
      `<g>${snow(20, 3)}</g>` +
      `<path d="M120 20 H280 V220 H120Z" ${ink(0.78)}/>` +
      `<path class="glow flick" d="M206 24 H276 V220 H206Z" ${warm(0.5)}/>` +
      `<path d="M206 24 H276 V220 H206Z" ${line(0.35)}/>` +
      `<path d="M184 220 V128 C184 106 214 106 214 128 V220Z" ${ink(0.92)}/>` +
      `<circle cx="199" cy="96" r="14" ${ink(0.92)}/>` +
      `<path d="M60 220 L120 190 L160 220Z" ${ink(0.6)}/>`,
    investigation:
      `<rect x="30" y="170" width="340" height="12" ${ink(0.75)}/>` +
      [60, 130, 200, 270]
        .map(
          (x, i) =>
            `<rect x="${x}" y="${96 + (i % 2) * 6}" width="48" height="${74 - (i % 2) * 6}" rx="4" ${ink(0.62)}/>` +
            `<rect x="${x + 14}" y="${86 + (i % 2) * 6}" width="20" height="12" ${ink(0.75)}/>` +
            `<path d="M${x + 12} ${126 + (i % 2) * 6} l24 14 M${x + 36} ${126 + (i % 2) * 6} l-24 14" ${line(0.85, 3)} style="stroke:var(--blood)"/>`,
        )
        .join('') +
      `<path d="M330 170 V110 L352 100 V170Z" ${ink(0.4)}/>`,
    fracture:
      `<ellipse class="glow" cx="200" cy="110" rx="90" ry="60" ${ink(0.1)}/>` +
      `<path d="M150 170 V80 C150 66 160 60 172 60 H228 C240 60 250 66 250 80 V170Z" ${ink(0.8)}/>` +
      `<rect x="182" y="46" width="36" height="16" rx="3" ${ink(0.9)}/>` +
      `<path d="M158 150 H242" ${line(0.35)}/>` +
      `<ellipse class="pulse" cx="200" cy="162" rx="30" ry="4" ${warm(0.65)}/>` +
      `<path d="M100 170 H300" ${line(0.4, 2)}/>` +
      `<circle class="fall" style="animation-duration:3.2s" cx="200" cy="120" r="2.4" ${warm(0.8)}/>`,
  },

  // ─── Le fanal : un port en reconstruction, une grande lampe éteinte.
  'premise-02': {
    wakeup:
      `<circle class="pulse" cx="200" cy="110" r="22" ${line(0.6, 2)}/>` +
      `<circle class="pulse" style="animation-delay:-.8s" cx="200" cy="110" r="52" ${line(0.4, 1.6)}/>` +
      `<circle class="pulse" style="animation-delay:-1.6s" cx="200" cy="110" r="88" ${line(0.25, 1.4)}/>` +
      `<circle class="pulse" style="animation-delay:-2.4s" cx="200" cy="110" r="130" ${line(0.15, 1.2)}/>` +
      `<path d="M0 190 C60 180 90 200 150 190 S260 180 320 192 S380 184 400 190 V220 H0Z" ${ink(0.5)}/>`,
    orientation:
      `<path d="M0 150 H400 V220 H0Z" ${ink(0.4)}/>` +
      `<path d="M0 150 C80 144 120 154 200 148 S320 144 400 150" ${line(0.4)}/>` +
      `<path d="M30 150 V70 L60 56 V150 M70 150 V90 H110 V150" ${line(0.7, 2)}/>` +
      `<path d="M30 70 H120 M120 70 L150 58 M150 58 V82" ${line(0.7, 2)}/>` +
      `<path d="M300 150 L330 120 H380 L398 150Z" ${ink(0.78)}/><path d="M340 120 V86 M340 90 L372 120" ${line(0.7, 2)}/>` +
      `<g><path d="M150 12 L250 12 L240 44 L160 44Z" ${ink(0.78)}/><rect x="178" y="44" width="44" height="88" rx="4" ${ink(0.12)} stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>` +
      `${[56, 72, 88, 104, 120].map((y) => `<path d="M178 ${y} H222" ${line(0.55)}/>`).join('')}</g>` +
      `<rect x="160" y="132" width="80" height="10" ${ink(0.85)}/>`,
    dialogue:
      `<path d="M120 220 V20 M280 220 V20" ${line(0.35, 2)}/>` +
      Array.from(
        { length: 9 },
        (_, i) =>
          `<path d="M${120 + i * 4} ${210 - i * 22} H${280 - i * 4}" ${line(0.35 + i * 0.04, 3)}/>`,
      ).join('') +
      `<path d="M0 220 V0 H120 V220Z" ${ink(0.75)}/><path d="M280 220 V0 H400 V220Z" ${ink(0.75)}/>` +
      `<path class="glow flick" d="M150 4 H250 V40 H150Z" ${warm(0.4)}/>` +
      `<path d="M190 200 V150 C190 134 214 134 214 150 V200Z" ${ink(0.95)}/><circle cx="202" cy="124" r="11" ${ink(0.95)}/>` +
      `<path d="M193 134 C200 128 210 128 214 134 L224 120 C214 112 190 112 186 128Z" ${ink(0.95)}/>`,
    investigation:
      `<rect x="40" y="150" width="320" height="14" ${ink(0.75)}/>` +
      `<path d="M110 148 L200 132 L290 148 L290 100 L200 84 L110 100Z" ${ink(0.12)} stroke="currentColor" stroke-opacity=".7" stroke-width="2"/>` +
      `<path d="M200 84 V132" ${line(0.6, 2)}/>` +
      Array.from(
        { length: 4 },
        (_, i) =>
          `<path d="M${124 + i * 0} ${108 + i * 8} H186 M214 ${108 + i * 8} H276" ${line(0.4)}/>`,
      ).join('') +
      `<path d="M214 118 H276" ${line(0.95, 4)} style="stroke:var(--bg, var(--parchment))"/><path d="M216 118 H274" ${line(0.7, 1.4)} style="stroke:var(--blood)"/>` +
      `<rect x="310" y="132" width="22" height="16" rx="2" ${ink(0.8)}/><path d="M316 132 l3 -8 M324 132 l4 -6" ${line(0.7, 2)}/>`,
    fracture:
      `<ellipse class="glow sweep" cx="200" cy="80" rx="150" ry="34" ${ink(0.14)}/>` +
      `<path d="M0 136 H400 V220 H0Z" ${ink(0.55)}/>` +
      `<path d="M0 136 C60 128 90 142 150 134 S260 128 320 138 S380 130 400 136" ${line(0.5)}/>` +
      `<path d="M276 134 C300 112 340 112 370 134Z" ${ink(0.9)}/><path d="M322 112 V62 M322 66 L354 106" ${line(0.8, 2)}/>` +
      `<path d="M60 136 V96 H88 V136" ${line(0.7, 2)}/><circle class="flick" cx="74" cy="88" r="5" ${warm(0.8)}/>` +
      `<path d="M0 174 C70 166 120 180 200 172 S330 166 400 174" ${line(0.3)}/>`,
  },

  // ─── Le compartiment sept : un train arrêté dans la plaine, une nuit d'été.
  'premise-03': {
    wakeup:
      `<path class="drift" d="M0 120 C60 100 100 140 160 118 S300 100 400 124" ${line(0.2, 14)} style="filter:blur(10px)"/>` +
      `<circle class="glow pulse" cx="200" cy="100" r="46" ${warm(0.38)}/>` +
      `<circle cx="200" cy="100" r="42" ${line(0.7, 2.4)}/><circle cx="200" cy="100" r="5" ${ink(0.8)}/>` +
      `<path d="M200 100 V70" ${line(0.9, 2.4)}/>` +
      `<path d="M30 190 H370" ${line(0.4, 2)}/>` +
      Array.from(
        { length: 14 },
        (_, i) =>
          `<circle class="flick" style="animation-delay:-${(i * 0.37).toFixed(2)}s" cx="${24 + i * 26}" cy="${200 + (i % 3) * 4}" r="1.6" ${ink(0.5)}/>`,
      ).join(''),
    orientation:
      `<path d="M0 220 L130 160 V50 L0 0Z" ${ink(0.72)}/><path d="M400 220 L270 160 V50 L400 0Z" ${ink(0.72)}/>` +
      `<path d="M130 50 H270 V160 H130Z" ${ink(0.28)}/>` +
      `<path d="M0 220 L130 160 H270 L400 220Z" ${ink(0.5)}/>` +
      `<path d="M150 60 H250 V150 H150Z" ${line(0.35)}/>` +
      `<path d="M130 76 L96 96 V146 L130 150Z" ${line(0.4)}/><path d="M270 76 L304 96 V146 L270 150Z" ${line(0.4)}/>` +
      `<g class="flick"><path d="M200 0 V28" ${line(0.7, 1.6)}/><path d="M188 28 H212 L208 42 H192Z" ${warm(0.85)}/></g>` +
      `<ellipse class="glow" cx="200" cy="52" rx="110" ry="60" ${warm(0.2)}/>`,
    dialogue:
      `<path d="M0 220 V0 H110 V220Z" ${ink(0.72)}/><path d="M290 220 V0 H400 V220Z" ${ink(0.72)}/>` +
      `<path d="M110 40 H290 V220 H110Z" ${ink(0.35)}/>` +
      `<path d="M138 60 H252 V220 H138Z" ${ink(0.78)} />` +
      `<text x="195" y="96" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="var(--blood)" fill-opacity=".9">7</text>` +
      `<circle cx="226" cy="150" r="3" ${ink(0.95)} style="fill:var(--parchment)"/>` +
      `<path class="glow flick" d="M138 214 H252 V220 H138Z" ${warm(0.9)}/>` +
      `<path d="M300 220 V150 C300 130 332 130 332 150 V220Z" ${ink(0.95)}/><circle cx="316" cy="116" r="13" ${ink(0.95)}/>`,
    investigation:
      `<g transform="rotate(-6 200 110)"><rect x="110" y="64" width="180" height="92" rx="4" ${ink(0.1)} stroke="currentColor" stroke-opacity=".75" stroke-width="2"/>` +
      `<path d="M126 88 H214 M126 104 H190 M126 120 H206" ${line(0.45, 1.6)}/>` +
      `<circle cx="248" cy="90" r="9" ${line(0.9, 2.4)} style="stroke:var(--blood)"/><circle cx="266" cy="108" r="9" ${line(0.9, 2.4)} style="stroke:var(--blood)"/>` +
      `<path d="M244 118 H290" ${line(0.35, 1.4)}/></g>` +
      `<path d="M40 190 H360" ${line(0.4, 2)}/><circle class="flick" cx="330" cy="40" r="3" ${warm(0.8)}/>`,
    fracture:
      `<rect x="0" y="0" width="400" height="220" ${ink(0.05)}/>` +
      `<path d="M0 150 H400 V220 H0Z" ${ink(0.62)}/><path d="M0 150 C80 142 150 154 220 148 S340 144 400 150" ${line(0.4)}/>` +
      `<circle class="glow sweep" cx="300" cy="140" r="26" ${warm(0.65)}/><circle class="sweep" cx="300" cy="140" r="5" ${warm(0.95)}/>` +
      `<g><rect x="40" y="96" width="170" height="46" rx="3" ${ink(0.82)}/>${[56, 90, 124, 158].map((x) => `<rect x="${x}" y="106" width="22" height="14" ${ink(0.2)}/>`).join('')}<path d="M70 142 v8 M180 142 v8" ${line(0.8, 3)}/></g>` +
      `<path class="glow flick" d="M122 124 H144 V142 H122Z" ${warm(0.85)}/>` +
      Array.from(
        { length: 10 },
        (_, i) =>
          `<circle class="flick" style="animation-delay:-${(i * 0.5).toFixed(1)}s" cx="${230 + i * 17}" cy="${178 + (i % 3) * 6}" r="1.5" ${ink(0.5)}/>`,
      ).join(''),
  },
};

const MOODS: Record<Mood, string> = {
  resolved:
    `<ellipse class="glow pulse" cx="200" cy="120" rx="120" ry="60" ${warm(0.45)}/>` +
    `<path d="M60 160 H340" ${line(0.45, 2)}/><path d="M170 160 V120 C170 98 230 98 230 120 V160Z" ${ink(0.9)}/>` +
    `<circle cx="200" cy="86" r="12" ${ink(0.9)}/>`,
  failed:
    `<path d="M0 150 H400 V220 H0Z" ${ink(0.55)}/><path d="M120 150 V70 H280 V150" ${line(0.7, 2.4)}/>` +
    `<path d="M120 150 H280" ${line(0.5, 2.4)}/><rect x="120" y="70" width="160" height="80" ${ink(0.5)}/>` +
    `<circle cx="258" cy="112" r="4" ${warm(0.9)}/>`,
  exposed:
    `<path d="M0 0 H400 V220 H0Z" ${ink(0.1)}/><ellipse class="glow sweep" cx="200" cy="110" rx="46" ry="140" ${ink(0.2)}/>` +
    `<path d="M170 200 V130 C170 108 230 108 230 130 V200Z" ${ink(0.95)}/><circle cx="200" cy="92" r="14" ${ink(0.95)}/>` +
    Array.from(
      { length: 6 },
      (_, i) =>
        `<circle cx="${40 + i * 64}" cy="${30 + (i % 2) * 14}" r="6" ${ink(0.6)}/>`,
    ).join(''),
  died:
    `<path d="M0 140 C80 126 160 150 240 134 S360 130 400 138 V220 H0Z" ${ink(0.62)}/>` +
    `<path d="M150 140 C170 128 200 128 230 140" ${line(0.7, 2.4)}/>` +
    `<g>${snow(18, 11)}</g><circle class="pulse" cx="316" cy="48" r="10" ${ink(0.18)}/>`,
};

export function sceneSvg(premiseId: string, kind: SceneKind): string | null {
  return SCENES[premiseId]?.[kind] ?? null;
}

export function moodSvg(mood: Mood): string {
  return MOODS[mood];
}

export const SCENE_LABELS: Record<SceneKind, string> = {
  wakeup: 'Une lueur derrière les paupières.',
  orientation: 'Le lieu où tu te réveilles.',
  dialogue: 'Quelqu’un se tient dans l’encadrement.',
  investigation: 'Un détail qui n’est pas à sa place.',
  fracture: 'Ce qui ne tient pas.',
};

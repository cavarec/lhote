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

const rocks = (): string =>
  `<path d="M0 150 L40 118 L90 140 L140 108 L200 138 L260 112 L320 140 L400 116 V220 H0Z" ${ink(0.78)}/>`;

const trunk = (x: number, w: number, o = 0.78): string =>
  `<rect x="${x}" y="0" width="${w}" height="220" ${ink(o)}/>`;

const faces = (n: number, cx: number, cy: number, r: number): string =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r * 0.45).toFixed(1)}" r="5" ${ink(0.85)}/>`;
  }).join('');

const SCENES: Record<string, Record<SceneKind, string>> = {
  // ─── Ce que rend la mer : un village de pêcheurs, un corps sous un drap.
  'premise-01': {
    wakeup:
      `<path class="drift" d="M0 80 C60 64 120 96 200 80 S340 64 400 80" ${line(0.3, 2)}/>` +
      `<path class="drift" style="animation-delay:-3s" d="M0 112 C70 96 130 128 210 112 S340 96 400 112" ${line(0.4, 2)}/>` +
      `<path class="drift" style="animation-delay:-6s" d="M0 144 C60 128 140 160 220 144 S350 128 400 144" ${line(0.5, 2)}/>` +
      `<ellipse class="glow pulse" cx="200" cy="112" rx="70" ry="30" ${ink(0.12)}/>` +
      `<circle class="fall" style="animation-duration:3s" cx="300" cy="40" r="3" ${ink(0.7)}/>`,
    orientation:
      `<rect x="0" y="0" width="400" height="220" ${ink(0.06)}/>` +
      `<path d="M0 40 H400" ${line(0.7, 3)}/>` +
      `<path d="M30 40 V110 M60 40 V96 M90 40 V120 M30 70 H90 M30 96 H90" ${line(0.4, 1.4)}/>` +
      `<g><rect x="270" y="50" width="100" height="100" ${ink(0.1)}/><path d="M270 120 H370" ${line(0.5)}/><path d="M290 120 l14 -8 l14 8 M330 120 l14 -8 l14 8" ${ink(0.7)}/></g>` +
      `<rect x="70" y="150" width="190" height="10" ${ink(0.85)}/><path d="M80 160 V210 M250 160 V210" ${line(0.8, 4)}/>` +
      `<path d="M120 150 C124 126 170 126 176 150Z" ${ink(0.3)} stroke="currentColor" stroke-opacity=".7"/>` +
      `<path d="M176 150 h18" ${line(0.7, 3)}/>`,
    dialogue:
      `<rect x="0" y="0" width="400" height="220" ${ink(0.06)}/>` +
      `<path d="M120 20 H300 V220 H120Z" ${ink(0.8)}/>` +
      `<path class="glow" d="M148 40 H280 V220 H148Z" ${ink(0.18)}/>` +
      `<path d="M148 40 H280 V220 H148Z" ${line(0.3)}/>` +
      `<path d="M0 156 L148 148 V220 H0Z" ${ink(0.4)}/>` +
      `<path d="M200 220 V130 C200 110 236 110 236 130 V220Z" ${ink(0.95)}/><circle cx="222" cy="100" r="14" ${ink(0.95)}/>` +
      `<path d="M120 20 H300" ${line(0.9, 6)}/>`,
    investigation:
      `<path d="M120 170 C110 120 150 86 200 86 C250 86 290 120 280 170Z" ${ink(0.78)}/>` +
      `<path d="M158 112 C176 100 224 100 242 112" ${line(0.2, 2)} style="stroke:var(--parchment)"/>` +
      `<path d="M158 170 q-10 20 -4 40 M190 172 q-4 26 4 44 M226 172 q8 20 0 40" ${line(0.7, 2.4)}/>` +
      `<path d="M200 110 l14 10 M200 110 l-14 10" ${line(0.9, 2.4)} style="stroke:var(--blood)"/>` +
      `<circle cx="320" cy="150" r="4" ${warm(0.8)}/>`,
    fracture:
      rocks() +
      `<path d="M0 170 C60 160 120 176 200 166 S340 160 400 170 V220 H0Z" ${ink(0.3)}/>` +
      `<path class="pulse" d="M0 176 C60 168 120 182 200 174 S340 168 400 176" ${line(0.6, 2)}/>` +
      `<ellipse cx="200" cy="146" rx="22" ry="7" ${ink(0.98)}/><path d="M184 144 c8 -8 24 -8 32 0" fill="none" stroke="var(--parchment)" stroke-opacity=".8" stroke-width="2"/>` +
      `<circle class="flick" cx="200" cy="140" r="3.4" ${warm(0.9)}/>`,
  },

  // ─── Le jour du pardon : une sacristie, une chasse d'argent, une foule sur la place.
  'premise-02': {
    wakeup:
      Array.from({ length: 11 }, (_, i) => {
        const x = 40 + i * 32;
        return `<rect x="${x}" y="150" width="4" height="26" ${ink(0.5)}/><ellipse class="flick" style="animation-delay:-${(i * 0.4).toFixed(1)}s" cx="${x + 2}" cy="${144 - (i % 3) * 4}" rx="4" ry="9" ${warm(0.8)}/>`;
      }).join('') +
      `<circle class="pulse" cx="200" cy="70" r="34" ${line(0.55, 2)}/><circle class="pulse" style="animation-delay:-1.4s" cx="200" cy="70" r="64" ${line(0.3, 1.6)}/>` +
      `<ellipse class="glow" cx="200" cy="150" rx="170" ry="30" ${warm(0.2)}/>`,
    orientation:
      `<path d="M0 220 V90 C0 20 80 0 200 0 S400 20 400 90 V220Z" ${ink(0.72)}/>` +
      `<path d="M150 50 V140 H250 V50 C250 22 150 22 150 50Z" ${ink(0.12)} stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>` +
      `<path d="M170 140 V80 l12 -18 l12 18 V140 M206 140 V76 l12 -22 l12 22 V140" ${ink(0.78)}/>` +
      Array.from(
        { length: 9 },
        (_, i) =>
          `<circle cx="${156 + i * 11}" cy="${126 + (i % 3) * 4}" r="3" ${ink(0.5)}/>`,
      ).join('') +
      `<rect x="70" y="160" width="260" height="10" ${ink(0.9)}/>` +
      `<g class="flick"><rect x="140" y="132" width="120" height="28" rx="3" ${ink(0.2)} stroke="currentColor" stroke-opacity=".9" stroke-width="2"/><path d="M140 132 L200 112 L260 132" ${line(0.9, 2)}/></g>` +
      `<circle cx="200" cy="146" r="3" ${warm(0.9)}/>`,
    dialogue:
      `<rect x="0" y="0" width="400" height="220" ${ink(0.06)}/>` +
      `<path d="M120 20 H280 V220 H120Z" ${ink(0.82)}/>` +
      `<path class="glow flick" d="M176 28 H270 V220 H176Z" ${ink(0.3)}/>` +
      `<path d="M120 20 L176 28 V220 H120Z" ${ink(0.95)}/>` +
      `<path d="M210 220 V138 C210 118 250 118 250 138 V220Z" ${ink(0.95)}/><circle cx="230" cy="108" r="14" ${ink(0.95)}/>` +
      `<path d="M0 220 V120 L40 100 L80 120 V220Z" ${ink(0.5)}/>` +
      `<circle class="pulse" cx="330" cy="60" r="12" ${line(0.4, 2)}/>`,
    investigation:
      `<rect x="60" y="150" width="280" height="10" ${ink(0.88)}/>` +
      `<g><rect x="132" y="108" width="136" height="42" rx="3" ${ink(0.22)} stroke="currentColor" stroke-opacity=".9" stroke-width="2"/><path d="M132 108 L200 84 L268 108" ${line(0.9, 2)}/>` +
      `<rect x="192" y="124" width="16" height="14" rx="2" ${ink(0.9)}/><circle class="flick" cx="200" cy="130" r="2.4" ${warm(1)}/></g>` +
      `<path d="M168 148 l-6 -10 l-12 8 M232 148 l8 -8 l10 10" ${line(0.9, 3)} style="stroke:var(--blood)"/>` +
      [92, 108, 124]
        .map((x) => `<rect x="${x - 60}" y="132" width="6" height="18" ${ink(0.6)}/>`)
        .join('') +
      `<path d="M300 150 v-34 M296 120 q4 -12 8 0" ${line(0.7, 2)}/>`,
    fracture:
      `<ellipse class="glow pulse" cx="200" cy="96" rx="90" ry="60" ${warm(0.3)}/>` +
      `<rect x="130" y="120" width="140" height="42" rx="3" ${ink(0.85)}/>` +
      `<path d="M130 120 L90 90 L230 76 L270 120Z" ${ink(0.5)}/>` +
      `<rect x="168" y="124" width="64" height="34" ${ink(0.06)}/>` +
      `<rect class="sweep" x="188" y="132" width="26" height="18" ${warm(0.7)}/>` +
      `<path d="M60 170 H340" ${line(0.5, 2)}/>`,
  },

  // ─── Une histoire qui te ressemble : une clairière, un feu, une fontaine noire.
  'premise-03': {
    wakeup:
      `<ellipse class="glow pulse" cx="200" cy="150" rx="140" ry="50" ${warm(0.5)}/>` +
      `<path d="M170 176 C176 130 196 112 200 90 C206 116 228 132 232 176Z" ${warm(0.75)} class="flick"/>` +
      Array.from(
        { length: 12 },
        (_, i) =>
          `<circle class="fall" style="animation-delay:-${(i * 0.7).toFixed(1)}s;animation-duration:${3 + (i % 4)}s" cx="${160 + i * 7}" cy="${70 + (i % 5) * 8}" r="1.5" ${warm(0.9)}/>`,
      ).join('') +
      trunk(10, 34, 0.7) +
      trunk(356, 34, 0.7),
    orientation:
      trunk(20, 40) +
      trunk(92, 24, 0.6) +
      trunk(300, 30, 0.6) +
      trunk(350, 44) +
      `<ellipse class="glow flick" cx="200" cy="164" rx="80" ry="26" ${warm(0.45)}/>` +
      `<path d="M184 180 C188 150 198 142 200 126 C204 148 214 154 218 180Z" ${warm(0.85)}/>` +
      faces(9, 200, 164, 90) +
      `<path d="M70 190 H130" ${line(0.4, 3)}/><ellipse cx="100" cy="186" rx="26" ry="8" ${ink(0.9)}/><ellipse cx="100" cy="184" rx="18" ry="4" ${ink(0.08)}/>`,
    dialogue:
      trunk(0, 30, 0.7) +
      trunk(370, 30, 0.7) +
      `<ellipse class="glow flick" cx="200" cy="170" rx="120" ry="36" ${warm(0.4)}/>` +
      `<path d="M104 220 V150 C104 124 160 124 160 150 V220Z" ${ink(0.95)}/><circle cx="132" cy="112" r="16" ${ink(0.95)}/>` +
      `<path d="M176 220 V152 C176 128 230 128 230 152 V220Z" ${ink(0.95)}/><circle cx="203" cy="116" r="16" ${ink(0.95)}/>` +
      `<path d="M148 112 q8 4 14 0" ${line(0.9, 2)} style="stroke:var(--parchment)"/>` +
      `<path d="M300 220 V160 C300 140 340 140 340 160 V220Z" ${ink(0.55)}/><path d="M290 110 H350 L344 130 H296Z" ${ink(0.55)}/>`,
    investigation:
      `<rect x="40" y="160" width="320" height="14" ${ink(0.8)}/>` +
      `<g transform="rotate(-4 200 120)"><path d="M120 150 L200 134 L280 150 V92 L200 76 L120 92Z" ${ink(0.1)} stroke="currentColor" stroke-opacity=".8" stroke-width="2"/><path d="M200 76 V134" ${line(0.6, 2)}/>` +
      `${[102, 114, 126].map((y) => `<path d="M132 ${y} H190 M210 ${y} H268" ${line(0.4)}/>`).join('')}</g>` +
      `<path d="M300 154 C316 130 340 140 336 156 C326 160 308 160 300 154Z" ${warm(0.8)}/>` +
      `<ellipse class="glow flick" cx="200" cy="60" rx="140" ry="40" ${warm(0.18)}/>`,
    fracture:
      trunk(0, 40, 0.7) +
      trunk(360, 40, 0.7) +
      trunk(120, 18, 0.45) +
      trunk(270, 18, 0.45) +
      `<ellipse cx="200" cy="150" rx="80" ry="24" ${ink(0.9)}/><ellipse cx="200" cy="146" rx="62" ry="16" ${ink(0.95)}/>` +
      `<path d="M140 146 H260" ${line(0.2)} style="stroke:var(--parchment)"/>` +
      `<circle class="flick" cx="330" cy="130" r="5" ${warm(0.95)}/><circle class="glow flick" cx="330" cy="130" r="14" ${warm(0.55)}/>`,
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
  wakeup: 'Les yeux encore fermés.',
  orientation: 'Le lieu où tu te réveilles.',
  dialogue: 'Quelqu’un se tient dans l’encadrement.',
  investigation: 'Un détail qui n’est pas à sa place.',
  fracture: 'Ce qui ne tient pas.',
};

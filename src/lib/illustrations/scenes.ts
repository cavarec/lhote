// Illustrations du jeu : des gravures en SVG, dessinées par le code, sans image à charger.
// Elles s'affichent hors connexion. Le trait ocre et les spirales viennent de l'art celtique
// d'ornement (courbes, triskèles, volutes) ; les silhouettes restent à l'encre. Rien ne copie une
// œuvre : tous les motifs sont construits ici, à partir de spirales.
//
// Classes d'animation (voir Vignette.svelte) : glow (halo flouté), flick (vacillement),
// fall (chute lente), sweep (balayage), pulse (battement), drift (dérive).

export type SceneKind =
  'wakeup' | 'orientation' | 'dialogue' | 'investigation' | 'fracture';
export type Mood = 'resolved' | 'failed' | 'exposed' | 'died';

// ─── Pinceaux ────────────────────────────────────────────────────────────────
const ink = (o: number) => `fill="currentColor" fill-opacity="${o}"`;
const oc = (o = 1, w = 2) =>
  `fill="none" stroke="var(--ochre)" stroke-opacity="${o}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const of = (o: number) => `fill="var(--ochre)" fill-opacity="${o}"`;
const warm = (o: number) => `fill="var(--blood)" fill-opacity="${o}"`;
const sea = (o: number) => `fill="var(--sea)" fill-opacity="${o}"`;
const redline = (w = 2.4) =>
  `fill="none" stroke="var(--blood)" stroke-width="${w}" stroke-linecap="round"`;

const f = (n: number): string => n.toFixed(1);

// ─── Géométrie celtique ──────────────────────────────────────────────────────
/** Une spirale d'Archimède de r0 à r1, `turns` tours, partant de l'angle a0 (radians). */
function spiral(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  turns: number,
  brush: string,
  a0 = 0,
  dir: 1 | -1 = 1,
): string {
  const steps = Math.max(8, Math.ceil(turns * 20));
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const a = a0 + dir * t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    return `${f(cx + Math.cos(a) * r)} ${f(cy + Math.sin(a) * r)}`;
  });
  return `<path d="M${pts.join(' L')}" ${brush}/>`;
}

/** Trois spirales à 120° : le triskèle. */
function triskele(cx: number, cy: number, r: number, brush: string): string {
  return [0, 1, 2]
    .map((k) => {
      const a = (k * 2 * Math.PI) / 3 - Math.PI / 2;
      return spiral(
        cx + Math.cos(a) * r * 0.46,
        cy + Math.sin(a) * r * 0.46,
        r * 0.04,
        r * 0.46,
        1.25,
        brush,
        a + Math.PI,
        1,
      );
    })
    .join('');
}

/** Une volute : un trait qui court puis s'enroule. */
function tendril(x: number, y: number, len: number, up: boolean, brush: string): string {
  const s = up ? -1 : 1;
  const ex = x + len;
  const ey = y + s * len * 0.12;
  return (
    `<path d="M${f(x)} ${f(y)} C${f(x + len * 0.35)} ${f(y - s * len * 0.28)} ${f(x + len * 0.7)} ${f(y + s * len * 0.28)} ${f(ex)} ${f(ey)}" ${brush}/>` +
    spiral(
      ex,
      ey + s * len * 0.1,
      len * 0.02,
      len * 0.1,
      1.5,
      brush,
      -Math.PI / 2,
      up ? -1 : 1,
    )
  );
}

/** Une rangée de vagues à crête enroulée. */
function waves(
  y: number,
  x0: number,
  x1: number,
  unit: number,
  amp: number,
  brush: string,
  cls = '',
): string {
  const n = Math.floor((x1 - x0) / unit);
  let d = `M${f(x0)} ${f(y)}`;
  let curls = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + i * unit;
    d += ` C${f(x + unit * 0.25)} ${f(y - amp)} ${f(x + unit * 0.5)} ${f(y - amp)} ${f(x + unit * 0.55)} ${f(y - amp * 0.4)}`;
    d += ` S${f(x + unit * 0.9)} ${f(y)} ${f(x + unit)} ${f(y)}`;
    curls += spiral(
      x + unit * 0.5,
      y - amp * 0.7,
      0.6,
      amp * 0.42,
      1.3,
      brush,
      Math.PI * 0.2,
      -1,
    );
  }
  return `<g class="${cls}"><path d="${d}" ${brush}/>${curls}</g>`;
}

/** Une roue à rayons et moyeu en spirale (le char qui grince). */
function wheel(cx: number, cy: number, r: number, brush: string): string {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return `M${f(cx + Math.cos(a) * r * 0.2)} ${f(cy + Math.sin(a) * r * 0.2)} L${f(cx + Math.cos(a) * r * 0.92)} ${f(cy + Math.sin(a) * r * 0.92)}`;
  }).join(' ');
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r}" ${brush}/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.88)}" ${brush}/>` +
    `<path d="${spokes}" ${brush}/>` +
    spiral(cx, cy, 0.5, r * 0.2, 1.6, brush)
  );
}

/** Une cloche : l'anse, le flanc, la lèvre et le battant. */
function bell(cx: number, cy: number, s: number, brush: string, fill: string): string {
  return (
    `<path d="M${f(cx - s)} ${f(cy + s * 0.7)} C${f(cx - s)} ${f(cy - s * 0.1)} ${f(cx - s * 0.5)} ${f(cy - s * 0.85)} ${f(cx)} ${f(cy - s * 0.85)} S${f(cx + s)} ${f(cy - s * 0.1)} ${f(cx + s)} ${f(cy + s * 0.7)} Q${f(cx)} ${f(cy + s * 0.95)} ${f(cx - s)} ${f(cy + s * 0.7)}Z" ${fill} stroke="var(--ochre)" stroke-width="2" stroke-linejoin="round"/>` +
    `<circle cx="${cx}" cy="${f(cy - s * 1.05)}" r="${f(s * 0.14)}" ${brush}/>` +
    `<circle cx="${cx}" cy="${f(cy + s * 0.95)}" r="${f(s * 0.14)}" ${of(0.9)}/>` +
    spiral(cx, cy + s * 0.05, 1, s * 0.34, 1.5, brush)
  );
}

/** Un cierge et sa flamme. */
function candle(x: number, y: number, h: number, delay = 0): string {
  return (
    `<rect x="${f(x - 2.5)}" y="${f(y - h)}" width="5" height="${h}" ${of(0.55)}/>` +
    `<path class="flick" style="animation-delay:-${delay.toFixed(1)}s" d="M${f(x)} ${f(y - h - 12)} C${f(x + 5)} ${f(y - h - 5)} ${f(x + 3)} ${f(y - h)} ${f(x)} ${f(y - h)} C${f(x - 3)} ${f(y - h)} ${f(x - 5)} ${f(y - h - 5)} ${f(x)} ${f(y - h - 12)}Z" ${warm(0.85)}/>`
  );
}

/** Un fût d'arbre aux nœuds en spirale. */
function trunk(x: number, w: number, o = 0.7, knots = 4): string {
  let out = `<rect x="${x}" y="0" width="${w}" height="220" ${ink(o)}/>`;
  for (let i = 0; i < knots; i++) {
    out += spiral(
      x + w / 2 + (i % 2 ? w * 0.12 : -w * 0.12),
      30 + i * 52,
      0.8,
      w * 0.28,
      1.5,
      `fill="none" stroke="var(--parchment)" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"`,
      i,
      i % 2 ? 1 : -1,
    );
  }
  return out;
}

/** Une silhouette de personne (buste), tournée vers la droite ou la gauche. */
function person(x: number, base: number, h: number, o = 0.95): string {
  const w = h * 0.34;
  return (
    `<path d="M${f(x - w)} ${base} V${f(base - h * 0.55)} C${f(x - w)} ${f(base - h * 0.85)} ${f(x + w)} ${f(base - h * 0.85)} ${f(x + w)} ${f(base - h * 0.55)} V${base}Z" ${ink(o)}/>` +
    `<circle cx="${x}" cy="${f(base - h * 0.95)}" r="${f(h * 0.14)}" ${ink(o)}/>`
  );
}

/** Le filet d'ornement, en haut et en bas de chaque image. */
function frame(): string {
  const b = oc(0.55, 1.4);
  return (
    `<path d="M52 10 H348 M52 210 H348" ${b}/>` +
    spiral(46, 10, 0.6, 6, 1.5, b, 0, 1) +
    spiral(354, 10, 0.6, 6, 1.5, b, Math.PI, -1) +
    spiral(46, 210, 0.6, 6, 1.5, b, 0, -1) +
    spiral(354, 210, 0.6, 6, 1.5, b, Math.PI, 1)
  );
}

function embers(n: number, x: number, y: number, spread: number, brush: string): string {
  return Array.from({ length: n }, (_, i) => {
    const px = x + ((i * 37) % spread) - spread / 2;
    const py = y - ((i * 23) % 40);
    return `<circle class="fall" style="animation-delay:-${((i * 0.7) % 5).toFixed(1)}s;animation-duration:${3 + (i % 4)}s" cx="${f(px)}" cy="${f(py)}" r="${f(1 + (i % 3) * 0.4)}" ${brush}/>`;
  }).join('');
}

const SCENES: Record<string, Record<SceneKind, string>> = {
  // ─── Ce que rend la mer : un village de pêcheurs, un corps sous un drap.
  'premise-01': {
    wakeup:
      frame() +
      `<ellipse class="glow pulse" cx="200" cy="112" rx="110" ry="34" ${of(0.22)}/>` +
      `<path d="M104 112 C150 70 250 70 296 112 C250 146 150 146 104 112Z" ${of(0.08)} stroke="var(--ochre)" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<path d="M120 112 C160 128 240 128 280 112" ${oc(0.7, 1.8)}/>` +
      `<path d="M138 90 l-10 -14 M170 80 l-5 -17 M200 77 v-18 M230 80 l5 -17 M262 90 l10 -14" ${oc(0.7, 1.8)}/>` +
      spiral(200, 112, 1, 20, 2, oc(0.9, 1.8)) +
      waves(170, 40, 360, 44, 10, oc(0.8, 1.8), 'drift') +
      waves(192, 20, 380, 52, 8, oc(0.5, 1.6), 'drift') +
      `<circle class="fall" style="animation-duration:3s" cx="312" cy="44" r="3.2" ${warm(0.85)}/>`,
    orientation:
      frame() +
      `<path d="M56 200 V70 C56 16 132 12 150 70 V200Z" ${of(0.06)} stroke="var(--ochre)" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M30 36 H370" ${oc(0.8, 3)}/>` +
      `<path d="M70 38 L88 98 L106 38 L124 98 L142 38 M70 98 H142 M70 68 H142 M79 68 L88 98 M97 68 L106 98 M115 68 L124 98" ${oc(0.55, 1.4)}/>` +
      `<path d="M240 200 V84 H370 V200Z" ${ink(0.1)} stroke="var(--ochre)" stroke-width="2"/>` +
      `<path d="M240 140 H370" ${oc(0.7, 1.6)}/>` +
      `<path d="M262 140 C264 120 296 120 298 140 L262 140Z M318 140 C320 124 346 124 348 140Z" ${ink(0.7)}/>` +
      `<path d="M306 120 V96 M306 100 L324 120" ${oc(0.7, 1.6)}/>` +
      waves(152, 240, 370, 26, 4, oc(0.5, 1.2)) +
      `<rect x="100" y="150" width="130" height="9" ${ink(0.85)}/><path d="M112 159 V200 M218 159 V200" ${ink(0.85)} stroke="currentColor" stroke-width="5"/>` +
      `<path d="M118 150 C124 118 176 118 186 150Z" ${of(0.2)} stroke="var(--ochre)" stroke-width="2"/>` +
      `<path d="M186 150 L204 152" ${oc(0.9, 3)}/>` +
      spiral(150, 138, 1, 9, 1.5, oc(0.8, 1.4)),
    dialogue:
      frame() +
      `<path d="M104 200 V70 C104 22 296 22 296 70 V200Z" ${ink(0.88)}/>` +
      `<path class="glow" d="M130 200 V80 C130 48 270 48 270 80 V200Z" ${of(0.45)}/>` +
      `<path d="M130 200 V80 C130 48 270 48 270 80 V200Z" ${oc(0.9, 2)}/>` +
      `<path d="M130 150 H270" ${oc(0.5, 1.4)}/>` +
      waves(160, 130, 270, 26, 5, oc(0.6, 1.4), 'drift') +
      wheel(252, 128, 20, oc(0.65, 1.4)) +
      person(196, 200, 112) +
      `<path d="M104 60 H296" ${oc(0.9, 5)}/>` +
      triskele(60, 120, 36, oc(0.7, 1.6)) +
      triskele(340, 120, 36, oc(0.7, 1.6)),
    investigation:
      frame() +
      `<rect x="60" y="176" width="280" height="8" ${ink(0.8)}/>` +
      `<path d="M104 120 C104 100 296 100 296 120 V146 C296 156 104 156 104 146Z" ${of(0.18)} stroke="var(--ochre)" stroke-width="2.4" stroke-linejoin="round"/>` +
      Array.from({ length: 13 }, (_, i) => {
        const x = 114 + i * 14;
        return i === 5 || i === 9
          ? ''
          : `<path d="M${x} 156 V${176 - (i % 3)}" ${oc(0.95, 3)}/>`;
      }).join('') +
      spiral(138, 128, 1, 10, 1.6, oc(0.9, 1.6)) +
      spiral(262, 128, 1, 10, 1.6, oc(0.9, 1.6), 0, -1) +
      `<path d="M168 128 H232" ${oc(0.7, 1.6)}/>` +
      `<path d="M300 140 C340 120 330 90 350 70 C340 100 358 120 340 150" ${oc(0.7, 1.8)}/>` +
      `<path d="M96 160 q-14 8 -8 22 M106 164 q-10 14 2 26" ${oc(0.8, 1.8)}/>` +
      `<g transform="translate(200 60)"><path d="M0 -14 V14 M-10 6 Q0 18 10 6 M-6 -8 H6" ${redline(2.2)}/></g>`,
    fracture:
      frame() +
      `<path d="M0 118 L46 92 L96 114 L150 84 L206 112 L262 88 L322 116 L400 90 V220 H0Z" ${ink(0.82)}/>` +
      `<path d="M0 150 C80 140 160 158 240 148 S360 144 400 150 V220 H0Z" ${sea(0.22)}/>` +
      waves(150, 10, 390, 40, 8, oc(0.85, 1.8)) +
      `<circle class="pulse" cx="200" cy="184" r="22" ${oc(0.4, 1.4)}/><circle class="pulse" style="animation-delay:-1.5s" cx="200" cy="184" r="40" ${oc(0.25, 1.2)}/>` +
      bell(200, 188, 16, oc(0.9, 1.6), of(0.25)) +
      `<ellipse cx="200" cy="112" rx="18" ry="6" ${ink(0.98)}/><path d="M186 110 c8 -8 20 -8 28 0" fill="none" stroke="var(--parchment)" stroke-opacity=".8" stroke-width="2"/>` +
      `<circle class="flick" cx="200" cy="106" r="3" ${warm(0.95)}/>`,
  },

  // ─── Le jour du pardon : une sacristie, une chasse d'argent, une foule sur la place.
  'premise-02': {
    wakeup:
      frame() +
      `<circle class="pulse" cx="200" cy="78" r="46" ${oc(0.5, 1.8)}/><circle class="pulse" style="animation-delay:-1.2s" cx="200" cy="78" r="70" ${oc(0.3, 1.5)}/><circle class="pulse" style="animation-delay:-2.4s" cx="200" cy="78" r="96" ${oc(0.18, 1.3)}/>` +
      bell(200, 82, 30, oc(0.95, 2), of(0.22)) +
      `<path d="M200 20 V40" ${oc(0.9, 2)}/>` +
      Array.from({ length: 9 }, (_, i) =>
        candle(60 + i * 35, 196, 22 + (i % 3) * 6, i * 0.4),
      ).join('') +
      `<ellipse class="glow" cx="200" cy="170" rx="170" ry="26" ${warm(0.2)}/>`,
    orientation:
      frame() +
      `<path d="M30 200 V90 C30 20 100 18 200 18 S370 20 370 90 V200Z" ${ink(0.78)}/>` +
      `<path d="M120 138 V70 C120 26 280 26 280 70 V138Z" ${of(0.12)} stroke="var(--ochre)" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<path d="M148 138 V74 l12 -26 l12 26 V138 M208 138 V70 l12 -30 l12 30 V138" ${ink(0.88)}/>` +
      `<path d="M172 100 h36 M172 112 h36" ${oc(0.5, 1.2)}/>` +
      `<path d="M186 82 C186 74 194 72 198 80 L206 82 L210 96 L190 96Z" ${ink(0.9)}/>` +
      `<path d="M182 98 q4 8 8 0 M204 98 q4 8 8 0" ${ink(0.9)}/>` +
      Array.from(
        { length: 11 },
        (_, i) =>
          `<circle cx="${130 + i * 14}" cy="${128 + (i % 3) * 4}" r="3" ${ink(0.55)}/>`,
      ).join('') +
      `<rect x="70" y="170" width="260" height="9" ${ink(0.9)}/>` +
      `<g class="flick"><path d="M126 170 V146 H274 V170" ${of(0.18)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/><path d="M126 146 L200 120 L274 146" ${of(0.12)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/></g>` +
      triskele(200, 158, 22, oc(0.95, 1.6)) +
      `<path d="M52 200 V120 C52 100 84 100 84 120 V200Z" ${of(0.3)} stroke="var(--ochre)" stroke-width="1.6"/><circle cx="68" cy="108" r="8" ${of(0.3)} stroke="var(--ochre)" stroke-width="1.4"/><path d="M92 200 V90" ${oc(0.9, 2)}/><path d="M92 90 q16 -12 34 -4" ${oc(0.9, 2.4)}/>`,
    dialogue:
      frame() +
      `<path d="M120 200 V50 C120 22 280 22 280 50 V200Z" ${ink(0.9)}/>` +
      `<path class="glow flick" d="M176 56 H274 V200 H176Z" ${of(0.5)}/>` +
      `<path d="M176 56 H274 V200 H176Z" ${oc(0.85, 2)}/>` +
      `<path d="M120 200 V50 C120 40 160 36 176 56 V200Z" ${ink(0.98)}/>` +
      person(230, 200, 108) +
      `<path d="M30 200 V116 L66 94 L102 116 V200Z" ${of(0.2)} stroke="var(--ochre)" stroke-width="2"/>` +
      `<path d="M52 150 H80 M66 134 V166" ${oc(0.8, 1.6)}/>` +
      bell(336, 80, 18, oc(0.8, 1.6), of(0.16)) +
      `<circle class="pulse" cx="336" cy="80" r="30" ${oc(0.3, 1.2)}/>` +
      triskele(330, 160, 30, oc(0.6, 1.4)),
    investigation:
      frame() +
      `<rect x="50" y="170" width="300" height="9" ${ink(0.88)}/>` +
      `<path d="M126 170 V122 H274 V170" ${of(0.2)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/>` +
      `<path d="M126 122 L200 94 L274 122" ${of(0.12)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/>` +
      triskele(200, 150, 34, oc(0.95, 1.8)) +
      `<rect x="190" y="124" width="20" height="12" rx="2" ${ink(0.9)}/>` +
      `<path d="M170 122 l-8 -12 l-14 10 M236 122 l8 -10 l12 12" ${redline(3)}/>` +
      candle(76, 170, 24, 0.3) +
      candle(96, 170, 14, 1.1) +
      candle(116, 170, 30, 1.9) +
      `<g transform="translate(300 156)"><circle r="9" ${oc(0.95, 2.4)}/><path d="M9 0 H46 M34 0 V10 M44 0 V8" ${oc(0.95, 2.4)}/></g>` +
      spiral(300, 156, 1, 5, 1.3, oc(0.9, 1.4)),
    fracture:
      frame() +
      `<ellipse class="glow pulse" cx="200" cy="102" rx="100" ry="64" ${warm(0.35)}/>` +
      `<path d="M0 0" ${oc(0)}/>` +
      Array.from({ length: 9 }, (_, i) => {
        const a = -Math.PI + (i / 8) * Math.PI;
        return `<path d="M${f(200 + Math.cos(a) * 52)} ${f(110 + Math.sin(a) * 38)} L${f(200 + Math.cos(a) * 92)} ${f(110 + Math.sin(a) * 66)}" ${oc(0.45, 1.6)}/>`;
      }).join('') +
      `<path d="M120 170 V128 H280 V170Z" ${ink(0.9)}/>` +
      `<path d="M120 128 L84 100 L220 82 L280 128Z" ${of(0.2)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/>` +
      `<rect class="sweep" x="178" y="104" width="44" height="26" ${of(0.95)} stroke="var(--parchment)" stroke-width="1.2" transform="rotate(-4 200 117)"/>` +
      `<path d="M186 112 H214 M186 118 H206" ${oc(0.5, 1.2)} style="stroke:var(--ink)"/>` +
      triskele(200, 152, 26, oc(0.95, 1.6)) +
      `<path d="M50 176 H350" ${oc(0.6, 2)}/>`,
  },

  // ─── Une histoire qui te ressemble : une clairière, un feu, une fontaine noire.
  'premise-03': {
    wakeup:
      frame() +
      `<ellipse class="glow pulse" cx="200" cy="150" rx="150" ry="46" ${warm(0.4)}/>` +
      `<g class="flick"><path d="M200 182 C160 170 160 130 184 112 C184 132 196 134 200 122 C196 106 206 88 214 72 C224 98 246 116 240 146 C236 166 222 178 200 182Z" ${warm(0.8)}/>` +
      spiral(200, 150, 1, 16, 1.7, oc(0.9, 1.8), 0, 1) +
      `</g>` +
      `<path d="M148 190 L252 176 M152 176 L248 190" ${ink(0.85)} stroke="currentColor" stroke-width="5" stroke-linecap="round"/>` +
      embers(12, 200, 90, 90, warm(0.9)) +
      trunk(12, 34, 0.7, 4) +
      trunk(354, 34, 0.7, 4) +
      tendril(60, 40, 70, true, oc(0.6, 1.6)) +
      tendril(340, 60, -70, false, oc(0.6, 1.6)),
    orientation:
      frame() +
      trunk(20, 40, 0.72, 4) +
      trunk(92, 24, 0.5, 3) +
      trunk(300, 28, 0.5, 3) +
      trunk(350, 44, 0.72, 4) +
      `<ellipse class="glow flick" cx="200" cy="164" rx="86" ry="26" ${warm(0.4)}/>` +
      `<path d="M188 182 C174 172 176 150 190 142 C190 154 198 154 200 146 C198 134 204 126 208 118 C214 134 226 142 222 160 C220 172 212 180 188 182Z" ${warm(0.85)}/>` +
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return `<circle cx="${f(200 + Math.cos(a) * 96)}" cy="${f(168 + Math.sin(a) * 36)}" r="5" ${ink(0.88)}/><path d="M${f(200 + Math.cos(a) * 96 - 6)} ${f(176 + Math.sin(a) * 36)} h12" ${ink(0.88)} stroke="currentColor" stroke-width="6" stroke-linecap="round"/>`;
      }).join('') +
      `<ellipse cx="96" cy="184" rx="30" ry="9" ${ink(0.88)}/><ellipse cx="96" cy="181" rx="22" ry="5" ${ink(0.2)}/>` +
      `<path d="M120 126 l-16 6 q4 10 16 8Z" ${of(0.5)} stroke="var(--ochre)" stroke-width="1.6"/>` +
      `<circle class="flick" cx="352" cy="108" r="4" ${sea(0.95)}/><circle class="glow flick" cx="352" cy="108" r="14" ${sea(0.55)}/>`,
    dialogue:
      frame() +
      trunk(0, 32, 0.7, 3) +
      trunk(368, 32, 0.7, 3) +
      `<ellipse class="glow flick" cx="200" cy="170" rx="120" ry="34" ${warm(0.38)}/>` +
      person(122, 200, 112) +
      person(204, 200, 108) +
      spiral(
        144,
        118,
        0.8,
        7,
        1.6,
        `fill="none" stroke="var(--parchment)" stroke-width="1.6" stroke-linecap="round"`,
        0,
        1,
      ) +
      `<path d="M214 100 q10 4 18 0" ${oc(0.9, 1.8)}/>` +
      `<path d="M296 200 V150 C296 130 340 130 340 150 V200Z" ${ink(0.5)}/><path d="M286 110 H350 L344 128 H292Z" ${ink(0.5)}/><circle cx="318" cy="122" r="12" ${ink(0.5)}/>` +
      tendril(40, 60, 60, true, oc(0.5, 1.4)) +
      triskele(322, 64, 26, oc(0.55, 1.4)),
    investigation:
      frame() +
      `<rect x="44" y="172" width="312" height="10" ${ink(0.82)}/>` +
      `<g transform="rotate(-3 200 120)"><path d="M104 152 L200 136 L296 152 V86 L200 70 L104 86Z" ${of(0.1)} stroke="var(--ochre)" stroke-width="2.6" stroke-linejoin="round"/><path d="M200 70 V136" ${oc(0.8, 2)}/>` +
      `${[96, 108, 120].map((y) => `<path d="M118 ${y} H186 M214 ${y} H282" ${oc(0.45, 1.3)}/>`).join('')}` +
      spiral(130, 130, 1, 8, 1.5, oc(0.85, 1.4)) +
      spiral(270, 130, 1, 8, 1.5, oc(0.85, 1.4), 0, -1) +
      `</g>` +
      `<path d="M316 156 C330 126 358 134 354 158 C340 164 322 164 316 156Z M316 156 L296 168" ${warm(0.75)} stroke="var(--blood)" stroke-width="1.2"/>` +
      `<ellipse class="glow flick" cx="200" cy="50" rx="150" ry="34" ${warm(0.2)}/>` +
      tendril(36, 54, 56, true, oc(0.5, 1.4)),
    fracture:
      frame() +
      trunk(0, 40, 0.72, 4) +
      trunk(360, 40, 0.72, 4) +
      trunk(112, 16, 0.4, 3) +
      trunk(278, 16, 0.4, 3) +
      `<ellipse cx="200" cy="154" rx="86" ry="26" ${of(0.2)} stroke="var(--ochre)" stroke-width="2.4"/>` +
      `<ellipse cx="200" cy="150" rx="68" ry="17" ${ink(0.96)}/>` +
      `<ellipse class="pulse" cx="200" cy="150" rx="46" ry="10" ${oc(0.35, 1.2)}/><ellipse class="pulse" style="animation-delay:-1.6s" cx="200" cy="150" rx="26" ry="5" ${oc(0.3, 1.2)}/>` +
      `<g transform="rotate(-18 292 126)"><path d="M274 122 H312 C312 138 274 138 274 122Z" ${ink(0.88)} stroke="var(--ochre)" stroke-width="1.8"/></g>` +
      `<path d="M96 70 C118 90 130 90 150 70 M110 64 c4 -8 12 -8 12 0 M130 66 c4 -8 12 -8 12 0" ${oc(0.8, 1.6)}/>` +
      `<circle class="flick" cx="338" cy="112" r="4.5" ${sea(0.98)}/><circle class="glow flick" cx="338" cy="112" r="15" ${sea(0.6)}/>` +
      triskele(60, 176, 22, oc(0.55, 1.2)),
  },
};

const MOODS: Record<Mood, string> = {
  resolved:
    frame() +
    `<ellipse class="glow pulse" cx="200" cy="108" rx="110" ry="60" ${of(0.32)}/>` +
    triskele(200, 108, 90, oc(0.95, 2.4)) +
    `<circle cx="200" cy="108" r="64" ${oc(0.5, 1.4)}/>` +
    `<circle class="flick" cx="200" cy="108" r="4" ${warm(0.9)}/>`,
  failed:
    frame() +
    `<path d="M110 200 V76 C110 28 290 28 290 76 V200Z" ${ink(0.84)}/>` +
    `<path d="M110 200 V76 C110 28 290 28 290 76 V200Z" ${oc(0.8, 2)}/>` +
    spiral(200, 112, 1, 18, 2, oc(0.8, 1.8)) +
    `<circle cx="252" cy="136" r="4.5" ${warm(0.95)}/>` +
    tendril(70, 150, 40, true, oc(0.55, 1.4)) +
    tendril(330, 150, -40, true, oc(0.55, 1.4)),
  exposed:
    frame() +
    `<ellipse class="glow sweep" cx="200" cy="110" rx="48" ry="110" ${of(0.22)}/>` +
    person(200, 202, 130) +
    Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      const x = 200 + Math.cos(a) * 130;
      const y = 106 + Math.sin(a) * 70;
      return i === 2
        ? ''
        : `<ellipse cx="${f(x)}" cy="${f(y)}" rx="12" ry="6" ${oc(0.8, 1.6)}/><circle cx="${f(x)}" cy="${f(y)}" r="3" ${ink(0.85)}/>`;
    }).join(''),
  died:
    frame() +
    `<path d="M0 150 C80 134 160 160 240 142 S360 136 400 146 V220 H0Z" ${ink(0.6)}/>` +
    `<path d="M70 120 C150 46 270 46 340 120 C270 76 160 76 70 120Z" ${oc(0.8, 2)} fill="var(--ochre)" fill-opacity=".14"/>` +
    `<path d="M338 120 L352 146" ${oc(0.8, 2.4)}/>` +
    embers(14, 200, 60, 300, of(0.7)) +
    `<circle class="pulse" cx="316" cy="44" r="10" ${oc(0.35, 1.4)}/>`,
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

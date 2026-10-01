/**
 * story-art.js — the Story Sequencing pictures, redrawn 2026-10-01 (operator: "clear, child-friendly and attractive
 * illustrations"). Warm flat-vector storybook style: full-colour two-tone shapes, soft shadows, rounded dark outlines,
 * friendly children with a calm smile (the SAME face in every panel — the story is never about feelings).
 *
 * Every story is drawn in the 160 x 120 view (story-panel.js's viewBox) as two layers:
 *   stage()      everything that stays — returned ONCE per story, byte-identical in every panel
 *   prop(rank)   everything that changes; each counted irreversible part carries data-irr="<var>" (the bank's
 *                irr vector is the independent truth the gate counts against)
 *   bbox(rank)   the prop's box [x0,y0,x1,y1] in view units (story-panel's zoom window)
 * Colours come ONLY from PAL (the gate's palette rule); no <text>, no letters, no numerals.
 */
'use strict';

/* ---------------------------------------------------------------- palette (one place; the gate reads it) */
const PAL = {
  ink: '#2E3B4E', line: '#3A4A5C', white: '#FFFFFF',
  sky: '#CFEAF7', skyDeep: '#A9D8F0', cloud: '#FFFFFF', sun: '#FFD25E', sunDeep: '#F6B93B',
  wall: '#FFF4E2', wallDeep: '#F7E3C4', floor: '#E9C9A0', floorDeep: '#D8B184',
  table: '#E6A86A', tableDeep: '#C9874D', tableTop: '#F2C08A',
  grass: '#9BD27A', grassDeep: '#6FB65A', sand: '#F6DFA7', sandDeep: '#E8C77E', sea: '#7CC6E8', seaDeep: '#4FA8D6',
  snow: '#FFFFFF', snowShade: '#DCEAF4', path: '#D9D2C7', pathDeep: '#BFB6A8',
  red: '#E8504A', redDeep: '#C23B36', orange: '#F7943E', orangeDeep: '#D9742A', yellow: '#FFD44F', yellowDeep: '#E9B92C',
  green: '#6CC072', greenDeep: '#4A9E52', blue: '#5AA9E6', blueDeep: '#3B86C4', purple: '#A67CD6', purpleDeep: '#8559B8',
  pink: '#F7A8C4', pinkDeep: '#E27BA2', brown: '#9C6B45', brownDeep: '#7A5032', cream: '#FFF8EC', grey: '#C9CED6', greyDeep: '#9AA3AF',
  skin1: '#F8D5B8', skin2: '#E3A97E', skin3: '#B87A52', skin4: '#7E5236', cheek: '#F4A3A0',
  hair1: '#4A3426', hair2: '#E8B24A', hair3: '#1F1B1A', hair4: '#B5532F',
  shadow: '#000000',
};
const SW = 1.6;   // the outline, in view units (~2 px on a 200 px card)
const f2 = (n) => (Math.round(n * 100) / 100).toString();
const att = (o) => Object.entries(o).filter(([, v]) => v !== undefined && v !== null).map(([k, v]) => `${k}="${v}"`).join(' ');
const C = (name) => { if (!PAL[name]) throw new Error(`story-art: unknown colour "${name}"`); return PAL[name]; };

/* ---------------------------------------------------------------- primitives (view units) */
const shape = (tag, o, fill, opts = {}) => `<${tag} ${att({ ...o, fill: fill === 'none' ? 'none' : C(fill), stroke: opts.st === false ? undefined : C(opts.st || 'line'), 'stroke-width': opts.st === false ? undefined : f2(opts.sw || SW), 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: opts.op, transform: opts.tf, 'data-irr': opts.irr })}/>`;
const rect = (x, y, w, h, fill, opts = {}) => shape('rect', { x: f2(x), y: f2(y), width: f2(w), height: f2(h), rx: f2(opts.r || 0) }, fill, opts);
const circ = (cx, cy, r, fill, opts = {}) => shape('circle', { cx: f2(cx), cy: f2(cy), r: f2(r) }, fill, opts);
const ell = (cx, cy, rx, ry, fill, opts = {}) => shape('ellipse', { cx: f2(cx), cy: f2(cy), rx: f2(rx), ry: f2(ry) }, fill, opts);
const path = (d, fill, opts = {}) => shape('path', { d }, fill, opts);
const shadow = (cx, cy, rx, ry = rx * 0.22) => `<ellipse ${att({ cx: f2(cx), cy: f2(cy), rx: f2(rx), ry: f2(ry), fill: C('shadow'), opacity: '0.12' })}/>`;
const g = (inner, o = {}) => `<g ${att(o)}>${inner}</g>`;

/* ---------------------------------------------------------------- shared scenery */
/** A kitchen: warm wall, a window with sky, a wooden table top across the bottom. */
function kitchen() {
  return rect(0, 0, 160, 120, 'wall', { st: false }) +
    rect(0, 0, 160, 10, 'wallDeep', { st: false }) +
    rect(14, 14, 40, 32, 'sky', { r: 3 }) + rect(14, 14, 40, 32, 'none', { r: 3, sw: 2 }) +
    path('M34 14 V46 M14 30 H54', 'none', { sw: 1.4 }) +
    ell(26, 22, 6, 2.6, 'cloud', { st: false }) +
    rect(0, 88, 160, 32, 'tableTop', { st: false }) + rect(0, 88, 160, 4, 'table', { st: false }) +
    path('M0 88 H160', 'none', { sw: 1.4 }) + rect(0, 104, 160, 16, 'table', { st: false }) + path('M0 104 H160', 'none', { sw: 1, op: '0.5' });
}
/** A plate on the table (part of the stage). */
function plate(cx = 80, cy = 96, rx = 40) {
  return ell(cx, cy + 2, rx, rx * 0.2, 'greyDeep', { st: false, op: '0.35' }) + ell(cx, cy, rx, rx * 0.2, 'white') + ell(cx, cy - 0.5, rx * 0.72, rx * 0.13, 'cream', { st: false });
}
/** A desk scene: soft wall, a pin board, a light wooden desk. */
function desk() {
  return rect(0, 0, 160, 120, 'cream', { st: false }) + rect(0, 0, 160, 8, 'wallDeep', { st: false }) +
    rect(112, 10, 36, 26, 'tableTop', { r: 2 }) + circ(118, 15, 1.6, 'red', { st: false }) + circ(142, 15, 1.6, 'blue', { st: false }) +
    rect(117, 18, 10, 12, 'yellow', { sw: 1 }) + rect(131, 18, 12, 9, 'pink', { sw: 1 }) +
    rect(0, 92, 160, 28, 'tableTop', { st: false }) + path('M0 92 H160', 'none', { sw: 1.4 }) + rect(0, 108, 160, 12, 'table', { st: false });
}
/** Outdoors: sky with a sun and cloud, grass. */
function garden() {
  return rect(0, 0, 160, 120, 'sky', { st: false }) + circ(140, 18, 9, 'sun', { st: false }) + circ(140, 18, 6.5, 'yellow', { st: false }) +
    ell(30, 18, 12, 5, 'cloud', { st: false }) + ell(40, 15, 8, 5, 'cloud', { st: false }) +
    rect(0, 84, 160, 36, 'grass', { st: false }) + path('M0 84 Q40 80 80 84 T160 84', 'none', { st: 'grassDeep', sw: 1.4 }) +
    path('M12 100 l2 -5 l2 5 M128 108 l2 -5 l2 5 M60 112 l2 -5 l2 5', 'none', { st: 'grassDeep', sw: 1.2 });
}

/* ---------------------------------------------------------------- a child (the recurring cast) */
const CAST = {
  mia: { skin: 'skin1', hair: 'hair4', shirt: 'yellow', shirtDeep: 'yellowDeep', style: 'bunches' },
  leo: { skin: 'skin3', hair: 'hair3', shirt: 'blue', shirtDeep: 'blueDeep', style: 'short' },
  ana: { skin: 'skin2', hair: 'hair1', shirt: 'pink', shirtDeep: 'pinkDeep', style: 'bob' },
  sam: { skin: 'skin4', hair: 'hair3', shirt: 'green', shirtDeep: 'greenDeep', style: 'curly' },
};
/** A friendly face (dot eyes, cheeks, a small smile) — identical whatever the panel. */
function face(cx, cy, r, who) {
  const c = CAST[who];
  const hair = {
    bunches: circ(cx - r * 1.02, cy - r * 0.2, r * 0.42, c.hair) + circ(cx + r * 1.02, cy - r * 0.2, r * 0.42, c.hair) + path(`M${f2(cx - r)} ${f2(cy - r * 0.1)} Q${f2(cx)} ${f2(cy - r * 1.55)} ${f2(cx + r)} ${f2(cy - r * 0.1)} Q${f2(cx)} ${f2(cy - r * 0.62)} ${f2(cx - r)} ${f2(cy - r * 0.1)}Z`, c.hair),
    short: path(`M${f2(cx - r * 0.98)} ${f2(cy - r * 0.05)} Q${f2(cx - r)} ${f2(cy - r * 1.25)} ${f2(cx)} ${f2(cy - r * 1.12)} Q${f2(cx + r)} ${f2(cy - r * 1.25)} ${f2(cx + r * 0.98)} ${f2(cy - r * 0.05)} Q${f2(cx + r * 0.4)} ${f2(cy - r * 0.62)} ${f2(cx - r * 0.98)} ${f2(cy - r * 0.05)}Z`, c.hair),
    bob: path(`M${f2(cx - r * 1.12)} ${f2(cy + r * 0.55)} Q${f2(cx - r * 1.25)} ${f2(cy - r * 1.3)} ${f2(cx)} ${f2(cy - r * 1.15)} Q${f2(cx + r * 1.25)} ${f2(cy - r * 1.3)} ${f2(cx + r * 1.12)} ${f2(cy + r * 0.55)} L${f2(cx + r * 0.85)} ${f2(cy + r * 0.55)} Q${f2(cx + r * 0.7)} ${f2(cy - r * 0.55)} ${f2(cx)} ${f2(cy - r * 0.5)} Q${f2(cx - r * 0.7)} ${f2(cy - r * 0.55)} ${f2(cx - r * 0.85)} ${f2(cy + r * 0.55)}Z`, c.hair),
    curly: [-0.8, -0.4, 0, 0.4, 0.8].map((k) => circ(cx + k * r, cy - r * 0.78 - (1 - Math.abs(k)) * r * 0.25, r * 0.36, c.hair)).join(''),
  }[c.style];
  // bunches + bob sit BEHIND the head (the bunches peek out at the sides); the bunches' fringe cap goes on top
  const behind = c.style === 'bob' ? hair : c.style === 'bunches' ? circ(cx - r * 1.05, cy + r * 0.1, r * 0.45, c.hair) + circ(cx + r * 1.05, cy + r * 0.1, r * 0.45, c.hair) : '';
  const front = c.style === 'bob' ? '' : c.style === 'bunches' ? path(`M${f2(cx - r * 0.97)} ${f2(cy - r * 0.05)} Q${f2(cx - r)} ${f2(cy - r * 1.22)} ${f2(cx)} ${f2(cy - r * 1.1)} Q${f2(cx + r)} ${f2(cy - r * 1.22)} ${f2(cx + r * 0.97)} ${f2(cy - r * 0.05)} Q${f2(cx + r * 0.3)} ${f2(cy - r * 0.7)} ${f2(cx - r * 0.97)} ${f2(cy - r * 0.05)}Z`, c.hair) : hair;
  return behind + circ(cx, cy, r, c.skin) + front +
    circ(cx - r * 0.36, cy + r * 0.05, r * 0.11, 'ink', { st: false }) + circ(cx + r * 0.36, cy + r * 0.05, r * 0.11, 'ink', { st: false }) +
    circ(cx - r * 0.33, cy + r * 0.01, r * 0.035, 'white', { st: false }) + circ(cx + r * 0.39, cy + r * 0.01, r * 0.035, 'white', { st: false }) +
    ell(cx - r * 0.58, cy + r * 0.38, r * 0.17, r * 0.11, 'cheek', { st: false, op: '0.8' }) + ell(cx + r * 0.58, cy + r * 0.38, r * 0.17, r * 0.11, 'cheek', { st: false, op: '0.8' }) +
    path(`M${f2(cx - r * 0.22)} ${f2(cy + r * 0.38)} Q${f2(cx)} ${f2(cy + r * 0.58)} ${f2(cx + r * 0.22)} ${f2(cy + r * 0.38)}`, 'none', { st: 'ink', sw: 1.2 });
}
/**
 * A child seen from the waist up behind a table (who, centre x, table-top y, head radius).
 * arms: { l, r } each 'down' | 'up' | 'out' | [x,y] (a hand position, view units).
 */
function childAtTable(who, cx, tableY, r, arms = {}) {
  const c = CAST[who];
  const headY = tableY - r * 3.1;
  const bodyTop = headY + r * 0.95;
  const torso = path(`M${f2(cx - r * 1.15)} ${f2(tableY)} Q${f2(cx - r * 1.25)} ${f2(bodyTop + r * 0.2)} ${f2(cx - r * 0.55)} ${f2(bodyTop)} L${f2(cx + r * 0.55)} ${f2(bodyTop)} Q${f2(cx + r * 1.25)} ${f2(bodyTop + r * 0.2)} ${f2(cx + r * 1.15)} ${f2(tableY)}Z`, c.shirt);
  const hand = (side, at) => {
    const sx = cx + side * r * 0.95, sy = bodyTop + r * 0.45;
    let hx, hy;
    if (Array.isArray(at)) [hx, hy] = at;
    else if (at === 'up') { hx = sx + side * r * 0.5; hy = sy - r * 1.6; }
    else if (at === 'out') { hx = sx + side * r * 1.6; hy = sy + r * 0.4; }
    else { hx = sx + side * r * 0.35; hy = tableY - r * 0.1; }
    return path(`M${f2(sx)} ${f2(sy)} Q${f2((sx + hx) / 2 + side * r * 0.4)} ${f2((sy + hy) / 2 + r * 0.3)} ${f2(hx)} ${f2(hy)}`, 'none', { st: c.shirtDeep, sw: r * 0.62 }) +
      path(`M${f2(sx)} ${f2(sy)} Q${f2((sx + hx) / 2 + side * r * 0.4)} ${f2((sy + hy) / 2 + r * 0.3)} ${f2(hx)} ${f2(hy)}`, 'none', { st: c.shirt, sw: r * 0.42 }) +
      circ(hx, hy, r * 0.3, c.skin);
  };
  return torso + path(`M${f2(cx - r * 0.3)} ${f2(bodyTop)} Q${f2(cx)} ${f2(bodyTop + r * 0.35)} ${f2(cx + r * 0.3)} ${f2(bodyTop)}`, 'none', { st: c.shirtDeep, sw: 1.2 }) +
    hand(-1, arms.l || 'down') + hand(1, arms.r || 'down') + face(cx, headY, r, who);
}

/* ---------------------------------------------------------------- the stories */
const STORIES = {};

/** apple — a red apple eaten bite by bite (irr bite 0 / 1 / 3 / 6). */
STORIES.apple = (() => {
  const AX = 80, AY = 66, R = 22;
  // the bite bowls on the apple's rim (angle in degrees, clockwise from the right)
  const BITES = [0, 40, -40, 180, 140, -140];
  const apple = (bites) => {
    if (bites >= 6) {
      // the core: a thin middle with the top and bottom of the apple left
      return path(`M${AX - 9} ${AY - 18} Q${AX} ${AY - 23} ${AX + 9} ${AY - 18} Q${AX + 4} ${AY - 9} ${AX + 4} ${AY} Q${AX + 4} ${AY + 9} ${AX + 10} ${AY + 18} Q${AX} ${AY + 23} ${AX - 10} ${AY + 18} Q${AX - 4} ${AY + 9} ${AX - 4} ${AY} Q${AX - 4} ${AY - 9} ${AX - 9} ${AY - 18}Z`, 'cream') +
        path(`M${AX - 9} ${AY - 18} Q${AX} ${AY - 23} ${AX + 9} ${AY - 18} Q${AX} ${AY - 15} ${AX - 9} ${AY - 18}Z`, 'red', { st: false }) +
        path(`M${AX - 10} ${AY + 18} Q${AX} ${AY + 23} ${AX + 10} ${AY + 18} Q${AX} ${AY + 15} ${AX - 10} ${AY + 18}Z`, 'red', { st: false }) +
        ell(AX - 1.5, AY - 2, 1.4, 2.4, 'brownDeep', { st: false }) + ell(AX + 1.5, AY + 3, 1.4, 2.4, 'brownDeep', { st: false }) +
        BITES.map((a) => `<g data-irr="bite"></g>`).join('');
    }
    const id = `sa-apple-${bites}`;
    const holes = BITES.slice(0, bites).map((a) => { const t = a * Math.PI / 180; return `<circle cx="${f2(AX + Math.cos(t) * (R + 2))}" cy="${f2(AY + Math.sin(t) * (R + 2))}" r="9" fill="black"/>`; }).join('');
    const body = path(`M${AX} ${AY - R + 4} C${AX - 8} ${AY - R - 2} ${AX - R - 4} ${AY - R + 2} ${AX - R} ${AY} C${AX - R} ${AY + R * 0.9} ${AX - 8} ${AY + R + 2} ${AX} ${AY + R - 2} C${AX + 8} ${AY + R + 2} ${AX + R} ${AY + R * 0.9} ${AX + R} ${AY} C${AX + R + 4} ${AY - R + 2} ${AX + 8} ${AY - R - 2} ${AX} ${AY - R + 4}Z`, 'red', { sw: 1.8 });
    const shine = ell(AX - 10, AY - 8, 4, 6.5, 'white', { st: false, op: '0.55', tf: `rotate(25 ${AX - 10} ${AY - 8})` });
    const shade = path(`M${AX + 6} ${AY + R - 4} C${AX + 16} ${AY + R - 6} ${AX + R - 2} ${AY + 8} ${AX + R - 2} ${AY}`, 'none', { st: 'redDeep', sw: 3, op: '0.6' });
    const flesh = BITES.slice(0, bites).map((a) => { const t = a * Math.PI / 180; return circ(AX + Math.cos(t) * (R + 2), AY + Math.sin(t) * (R + 2), 10.5, 'cream', { st: 'line', sw: 1.4, irr: 'bite' }); }).join('');
    return `<defs><mask id="${id}"><rect x="0" y="0" width="160" height="120" fill="white"/>${holes}</mask></defs>` +
      g(body + shade + shine, { mask: `url(#${id})` }) + g(flesh, { 'clip-path': `url(#${id}-c)` }) +
      `<defs><clipPath id="${id}-c"><path d="M${AX} ${AY - R + 4} C${AX - 8} ${AY - R - 2} ${AX - R - 4} ${AY - R + 2} ${AX - R} ${AY} C${AX - R} ${AY + R * 0.9} ${AX - 8} ${AY + R + 2} ${AX} ${AY + R - 2} C${AX + 8} ${AY + R + 2} ${AX + R} ${AY + R * 0.9} ${AX + R} ${AY} C${AX + R + 4} ${AY - R + 2} ${AX + 8} ${AY - R - 2} ${AX} ${AY - R + 4}Z"/></clipPath></defs>`;
  };
  const stem = path(`M${AX} ${AY - R + 4} Q${AX + 1} ${AY - R - 4} ${AX + 4} ${AY - R - 8}`, 'none', { st: 'brownDeep', sw: 2.4 }) +
    path(`M${AX + 3} ${AY - R - 5} Q${AX + 14} ${AY - R - 12} ${AX + 18} ${AY - R - 4} Q${AX + 10} ${AY - R} ${AX + 3} ${AY - R - 5}Z`, 'green');
  return {
    stage: () => kitchen() + plate(80, 92, 40),
    prop: (rank) => {
      const n = [0, 1, 3, 6][rank - 1];
      return shadow(AX, 90, 22) + apple(n) + stem;
    },
    bbox: () => [52, 30, 108, 92],
  };
})();

/** banana — peeled strip by strip and eaten (irr peelStrip 0 / 1 / 3 / 4). */
STORIES.banana = (() => {
  const BX = 80, BASE = 90;
  const fruit = (top) => path(`M${BX - 6} ${BASE - 2} Q${BX - 9} ${top + 14} ${BX - 3} ${top} Q${BX + 3} ${top - 2} ${BX + 6} ${top + 8} Q${BX + 9} ${top + 26} ${BX + 6} ${BASE - 2}Z`, 'cream');
  const skinWhole = path(`M${BX - 9} ${BASE - 2} Q${BX - 14} ${BASE - 40} ${BX - 2} ${BASE - 60} Q${BX + 4} ${BASE - 64} ${BX + 8} ${BASE - 56} Q${BX + 14} ${BASE - 36} ${BX + 9} ${BASE - 2}Z`, 'yellow', { sw: 1.8 }) +
    path(`M${BX + 4} ${BASE - 52} Q${BX + 10} ${BASE - 32} ${BX + 6} ${BASE - 6}`, 'none', { st: 'yellowDeep', sw: 2.4 }) +
    rect(BX - 3, BASE - 66, 5, 8, 'brownDeep', { r: 1.5, sw: 1.2 });
  // a hanging peel strip: from the cut top edge, curling down outward (side -1 left, +1 right, 0 front)
  const strip = (side, k) => {
    const x0 = BX + side * 6, y0 = BASE - 30;
    const x1 = BX + side * 20, y1 = BASE - 6;
    return path(`M${x0 - 3} ${y0} Q${x1 - side * 2} ${y0 - 4} ${x1 + side * 3} ${y1} L${x1 - side * 4} ${y1 + 2} Q${x1 - side * 8} ${y0 + 4} ${x0 + 3} ${y0}Z`, 'yellow', { irr: 'peelStrip', sw: 1.6 }) +
      path(`M${x1 + side * 3} ${y1} L${x1 - side * 4} ${y1 + 2}`, 'none', { st: 'brownDeep', sw: 1.6 });
  };
  const lower = path(`M${BX - 9} ${BASE - 2} Q${BX - 12} ${BASE - 20} ${BX - 8} ${BASE - 30} L${BX + 8} ${BASE - 30} Q${BX + 12} ${BASE - 20} ${BX + 9} ${BASE - 2}Z`, 'yellow', { sw: 1.8 });
  return {
    ranks: 4,
    stage: () => kitchen() + plate(80, 94, 42),
    prop: (rank) => {
      if (rank === 1) return shadow(BX, 92, 16) + skinWhole;
      if (rank === 2) return shadow(BX, 92, 18) + fruit(BASE - 58) + lower + strip(1, 0) + rect(BX - 3, BASE - 66, 5, 8, 'brownDeep', { r: 1.5, sw: 1.2 }) + path(`M${BX - 8} ${BASE - 30} Q${BX - 10} ${BASE - 50} ${BX - 3} ${BASE - 62} L${BX} ${BASE - 58} Q${BX - 5} ${BASE - 46} ${BX - 3} ${BASE - 30}Z`, 'yellow', { sw: 1.4 });
      if (rank === 3) return shadow(BX, 92, 26) + fruit(BASE - 56) + lower + strip(1, 0) + strip(-1, 1) + strip(0.45, 2);
      // eaten: the empty peel lying flat on the plate, four strips spread like a star
      const P = (dx, dy) => path(`M80 88 Q${80 + dx * 0.45} ${88 + dy - 9} ${80 + dx} ${88 + dy} Q${80 + dx * 0.55} ${88 + dy + 7} 80 93Z`, 'yellow', { irr: 'peelStrip', sw: 1.8 }) + circ(80 + dx, 88 + dy, 2, 'brownDeep', { st: false });
      return shadow(80, 95, 36) + P(-36, -6) + P(36, -6) + P(-24, 6) + P(24, 6) + rect(76.5, 80, 7, 10, 'brownDeep', { r: 2, sw: 1.2 });
    },
    bbox: () => [44, 20, 116, 98],
  };
})();

/**
 * sandwich — two slices, jam on one, the sandwich cut in half on the diagonal (the top half moved a little up and right),
 * one bite out of that half, then only its L-shaped crust and crumbs (the bank's sentences: "cut in half", "only a crust
 * and crumbs are left"; irr spread 0/1/1/1/1, bite 0/0/0/1/3, crumb 0/0/1/2/5).
 */
STORIES.sandwich = (() => {
  // a slice of bread seen from the front: a soft square with a domed top, brown crust, cream inside
  const slicePath = (x, y, s = 26) => `M${x} ${y + s} L${x} ${y + s * 0.3} Q${x - 1} ${y} ${x + s * 0.3} ${y} Q${x + s * 0.5} ${y - s * 0.22} ${x + s * 0.7} ${y} Q${x + s + 1} ${y} ${x + s} ${y + s * 0.3} L${x + s} ${y + s}Z`;
  const slice = (x, y, s = 26) => path(slicePath(x, y, s), 'orange', { st: 'brownDeep', sw: 1.8 }) + path(slicePath(x + 2.4, y + 2.4, s - 4.8), 'cream', { st: false });
  const jamOn = (x, y, s = 26) => path(slicePath(x + 5, y + 5, s - 10), 'red', { st: 'redDeep', sw: 1.2, irr: 'spread' }) + ell(x + s * 0.38, y + s * 0.42, 2.4, 1.6, 'white', { st: false, op: '0.6' });
  const jar = rect(124, 60, 20, 26, 'red', { r: 4 }) + rect(122, 54, 24, 8, 'white', { r: 2.5 }) + rect(128, 67, 12, 11, 'cream', { r: 2, sw: 1 }) + circ(134, 72.5, 2.6, 'red', { st: false });
  // counted: the jam on the knife carries the spread once nothing else shows it (the last panel: only the crust is left)
  const knife = (jammy, counted = false) => g(rect(0, 0, 30, 4.4, 'grey', { r: 2.2, sw: 1.2 }) + rect(27, -1.3, 13, 7, 'blue', { r: 3 }) + (jammy ? rect(2, -0.6, 15, 5.6, 'red', { r: 2.6, st: 'redDeep', sw: 0.8, ...(counted ? { irr: 'spread' } : {}) }) : ''), { transform: 'translate(46 92) rotate(-6)' });
  const CR = [[50, 90], [112, 91], [60, 95], [102, 96], [44, 96], [118, 95], [70, 97]];
  const crumbs = (n) => CR.slice(0, n).map(([x, y]) => circ(x, y, 3.6, 'orange', { st: 'brownDeep', sw: 1, irr: 'crumb' })).join('');
  // the made sandwich seen from above (the slice's own shape, jam peeking out along its edge), cut on the diagonal from
  // the top-left to the bottom-right: the lower-left half stays, the upper-right half lies a little up and right; each
  // cut edge shows the red jam between the slices
  const X0 = 40, Y0 = 46, S = 40;
  const A = [X0 - 4, Y0 - 12], B = [X0 + S + 4, Y0 + S + 4];
  const ext = (k) => [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  const [A2, B2] = [ext(-0.3), ext(1.3)];
  const LOW = [A2, B2, [X0 - 30, Y0 + S + 30]], HIGH = [A2, B2, [X0 + S + 30, Y0 - 40]];
  const UP = [11, -10];
  const pts = (P) => P.map(([x, y]) => f2(x) + ',' + f2(y)).join(' ');
  const made = () => path(slicePath(X0 + 2, Y0 + 2, S), 'red', { st: 'redDeep', sw: 1.2 }) + slice(X0, Y0, S);
  const cutLine = (dx, dy, counted) => path(`M${f2(A[0] + dx)} ${f2(A[1] + dy)} L${f2(B[0] + dx)} ${f2(B[1] + dy)}`, 'none', { st: 'red', sw: 4.2, ...(counted ? { irr: 'spread' } : {}) }) +
    path(`M${f2(A[0] + dx * 2.2)} ${f2(A[1] + dy * 2.2)} L${f2(B[0] + dx * 2.2)} ${f2(B[1] + dy * 2.2)}`, 'none', { st: 'redDeep', sw: 1 });
  const half = (P, tag, dx, dy, counted) => `<defs><clipPath id="sa-sand-${tag}"><polygon points="${pts(P)}"/></clipPath></defs>` +
    g(made() + `<defs><clipPath id="sa-sand-${tag}b"><path d="${slicePath(X0, Y0, S)}"/></clipPath></defs>` + g(cutLine(dx, dy, counted), { 'clip-path': `url(#sa-sand-${tag}b)` }), { 'clip-path': `url(#sa-sand-${tag})` });
  const lowHalf = () => half(LOW, 'l', -1.6, 1.6, true);
  const highHalf = () => g(half(HIGH, 'h', 1.6, -1.6, false), { transform: `translate(${UP[0]} ${UP[1]})` });
  const bitten = (svg, holes, tag) => `<defs><mask id="sa-sand-${tag}"><rect width="160" height="120" fill="white"/>${holes.map(([x, y, r]) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="black"/>`).join('')}</mask></defs>` +
    g(svg, { mask: `url(#sa-sand-${tag})` }) + holes.map(() => '<g data-irr="bite"></g>').join('');
  // the bitten edge: the bite exposes the cream wall behind the bread, so its edge is drawn in crust brown (as the apple's)
  const biteEdge = () => g(`<defs><clipPath id="sa-sand-be"><path d="${slicePath(X0, Y0, S)}"/></clipPath></defs>` +
    g(circ(X0 + S, Y0 - 2, 15, 'none', { st: 'brownDeep', sw: 2.2 }) + circ(X0 + S, Y0 - 2, 17.4, 'none', { st: 'orange', sw: 3 }), { 'clip-path': 'url(#sa-sand-be)' }), { transform: `translate(${UP[0]} ${UP[1]})` });
  // the end: only the crust of the upper-right half is left (its domed top and its right side), three bites out of it
  const crust = () => bitten(g(`<defs><clipPath id="sa-sand-c"><polygon points="${pts(HIGH)}"/></clipPath></defs>` +
    g(path(slicePath(X0, Y0, S), 'none', { st: 'brownDeep', sw: 9 }) + path(slicePath(X0, Y0, S), 'none', { st: 'orange', sw: 6.2 }), { 'clip-path': 'url(#sa-sand-c)' }), { transform: `translate(${UP[0]} ${UP[1]})` }),
  [[X0 + S * 0.62 + UP[0], Y0 - 4 + UP[1], 4.4], [X0 + S + UP[0], Y0 + 12 + UP[1], 4.4], [X0 + S + UP[0], Y0 + 26 + UP[1], 4.4]], 'crust');
  return {
    ranks: 5,
    stage: () => kitchen() + rect(30, 86, 104, 12, 'tableDeep', { r: 4, sw: 1.4 }) + rect(32, 84, 100, 5, 'brown', { r: 2.5, sw: 1.2 }),
    prop: (rank) => {
      if (rank === 1) return shadow(78, 86, 36, 4) + slice(42, 56, 32) + slice(84, 56, 32) + jar + knife(false);
      if (rank === 2) return shadow(78, 86, 36, 4) + slice(42, 56, 32) + slice(84, 56, 32) + jamOn(84, 56, 32) + jar + knife(true);
      if (rank === 3) return shadow(64, 86, 30, 4) + lowHalf() + highHalf() + crumbs(1) + jar + knife(true);
      if (rank === 4) return shadow(64, 86, 30, 4) + lowHalf() + bitten(highHalf(), [[X0 + S + UP[0], Y0 - 2 + UP[1], 15]], 'b1') + biteEdge() + crumbs(2) + jar + knife(true);
      return shadow(72, 86, 18, 3) + crust() + crumbs(5) + jar + knife(true, true);
    },
    bbox: () => [26, 22, 146, 100],
  };
})();

/**
 * cake — a round cake on a cake stand, three candles lying beside it, seen a little from above: whole, then one slice
 * (a quarter) gone, then half gone, then only crumbs (irr crumb 0 / 2 / 4 / 7; the bank's sentences: "one slice is cut
 * out", "half of the cake is gone", "only crumbs are left"; its word bank names the candles and the stand).
 */
STORIES.cake = (() => {
  const CX = 80, CY = 66, RX = 38, RY = 22, H = 14;
  const CR = [[52, 86], [108, 84], [60, 90], [100, 90], [70, 92], [90, 92], [80, 88]];
  const crumbs = (n) => CR.slice(0, n).map(([x, y]) => circ(x, y, 3.8, 'pinkDeep', { st: 'brownDeep', sw: 1, irr: 'crumb' })).join('');
  // the remaining cake = the part of the round cake outside the eaten sector (from angle 0 = right, counter-clockwise)
  const cake = (eaten) => {
    if (eaten >= 1) return '';
    const side = path(`M${CX - RX} ${CY} L${CX - RX} ${CY + H} A${RX} ${RY} 0 0 0 ${CX + RX} ${CY + H} L${CX + RX} ${CY}Z`, 'pink', { sw: 2 }) +
      path(`M${CX - RX} ${CY + 6} A${RX} ${RY} 0 0 0 ${CX + RX} ${CY + 6}`, 'none', { st: 'cream', sw: 3.4 });
    const top = ell(CX, CY, RX, RY, 'cream', { sw: 2 }) + ell(CX, CY, RX - 6, RY - 4, 'none', { st: 'pink', sw: 2.4 });
    const cherries = [0, 60, 120, 180, 240, 300].map((a) => { const t = (a + 30) * Math.PI / 180; return circ(CX + Math.cos(t) * (RX - 13), CY - Math.sin(t) * (RY - 8), 3.2, 'red', { sw: 1.1 }); }).join('');
    const whole = side + top + cherries;
    if (eaten === 0) return whole;
    // cut out the eaten sector (front-right first), and draw the two cut faces of the cake
    const a1 = -90, a2 = -90 + eaten * 360;   // from the front (angle -90) going counter-clockwise
    const pt = (a, k = 2) => [CX + Math.cos(a * Math.PI / 180) * RX * k, CY - Math.sin(a * Math.PI / 180) * RY * k];
    const steps = 16;
    const poly = [[CX, CY], ...Array.from({ length: steps + 1 }, (_, i) => pt(a1 + (a2 - a1) * i / steps))];
    const id = `sa-cake-${Math.round(eaten * 100)}`;
    const edge = (a) => { const [x, y] = [CX + Math.cos(a * Math.PI / 180) * RX, CY - Math.sin(a * Math.PI / 180) * RY]; return [x, y]; };
    const [x1, y1] = edge(a1), [x2, y2] = edge(a2);
    // the cut walls: a pink quad hanging DOWN from each cut edge (only the one facing the viewer shows over the plate)
    const cutFace = (x, y, fill) => path(`M${CX} ${CY} L${f2(x)} ${f2(y)} L${f2(x)} ${f2(y + H)} L${CX} ${CY + H}Z`, fill, { sw: 1.6 }) +
      path(`M${CX} ${CY + 6} L${f2(x)} ${f2(y + 6)}`, 'none', { st: 'cream', sw: 2.6 });
    return `<defs><mask id="${id}"><rect width="160" height="120" fill="white"/><polygon points="${poly.map(([x, y]) => f2(x) + ',' + f2(y)).join(' ')}" fill="black"/></mask></defs>` +
      // draw the cut walls BEHIND the remaining cake (only the parts the cake does not cover show)
      cutFace(x1, y1, 'pinkDeep') + cutFace(x2, y2, 'pink') + g(whole, { mask: `url(#${id})` });
  };
  return {
    ranks: 4,
    stage: () => kitchen() + rect(CX - 6, 86, 12, 14, 'white', { sw: 1.6 }) + ell(CX, 101, 19, 4.6, 'white', { sw: 1.6 }) +
      ell(CX, 80, 52, 15, 'white') + ell(CX, 80, 40, 10, 'cream', { st: false }) +
      [93, 100, 107].map((y, i) => g(rect(0, 0, 24, 5, ['blue', 'yellow', 'pink'][i], { r: 1.6, sw: 1.1 }) + path('M6 0 L4 5 M12 0 L10 5 M18 0 L16 5', 'none', { st: 'white', sw: 1.2 }) + path('M24 2.5 H28', 'none', { st: 'ink', sw: 1.2 }), { transform: `translate(${10 + i * 3} ${y})` })).join(''),
    prop: (rank) => [cake(0), cake(0.25), cake(0.5), cake(1)][rank - 1] + crumbs([0, 2, 4, 7][rank - 1]),
    bbox: () => [8, 34, 136, 108],
  };
})();


/* ---------------------------------------------------------------- craft + play stories */

/** drawing — a blank sheet, a house drawn, a sun and a tree added, everything coloured in (irr line 0/3/5/5, fill 0/0/0/4). */
STORIES.drawing = (() => {
  const SX = 40, SY = 30, SWD = 80, SH = 56;
  const crayon = (x, y, col, deep) => g(rect(0, 0, 26, 6, col, { r: 1.5, st: deep, sw: 1 }) + path('M26 0 L33 3 L26 6Z', col, { st: deep, sw: 1 }) + rect(4, 0, 4, 6, deep, { st: false, op: '0.5' }), { transform: `translate(${x} ${y})` });
  const L = (d, irr = 'line', col = 'ink') => path(d, 'none', { st: col, sw: 1.8, irr });
  const house = (fill) => (fill ? path(`M52 66 L52 50 L66 40 L80 50 L80 66Z`, 'yellow', { st: false, irr: 'fill' }) + path(`M50 51 L66 39 L82 51Z`, 'red', { st: false, irr: 'fill' }) : '') +
    L('M52 66 L52 50 L80 50 L80 66 Z') + L('M50 51 L66 39 L82 51') + L('M62 66 L62 57 L70 57 L70 66');
  const sun = (fill) => (fill ? circ(104, 42, 6, 'yellow', { st: false, irr: 'fill' }) : '') + circ(104, 42, 6, 'none', { st: 'ink', sw: 1.8, irr: 'line' }) +
    g([0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const t = a * Math.PI / 180; return `<path d="M${f2(104 + Math.cos(t) * 9)} ${f2(42 + Math.sin(t) * 9)} L${f2(104 + Math.cos(t) * 12)} ${f2(42 + Math.sin(t) * 12)}" fill="none" stroke="${PAL.ink}" stroke-width="1.4" stroke-linecap="round"/>`; }).join(''));
  const tree = (fill) => (fill ? circ(100, 60, 6.5, 'green', { st: false, irr: 'fill' }) : '') + circ(100, 60, 6.5, 'none', { st: 'ink', sw: 1.8, irr: 'line' }) + path('M100 66.5 L100 75', 'none', { st: 'ink', sw: 1.8 });   // the trunk belongs to the tree's one line (bank: 5 lines)
  return {
    ranks: 4,
    stage: () => desk() + shadow(80, 88, 42, 3) + rect(SX, SY, SWD, SH, 'white', { r: 2, sw: 1.6 }),
    prop: (rank) => [
      crayon(56, 94, 'red', 'redDeep') + crayon(90, 96, 'blue', 'blueDeep'),
      house(false) + crayon(84, 72, 'red', 'redDeep') + crayon(90, 96, 'blue', 'blueDeep'),
      house(false) + sun(false) + tree(false) + crayon(56, 94, 'red', 'redDeep') + crayon(108, 72, 'blue', 'blueDeep'),
      house(true) + sun(true) + tree(true) + crayon(56, 94, 'red', 'redDeep') + crayon(90, 96, 'blue', 'blueDeep'),
    ][rank - 1],
    bbox: () => [36, 26, 144, 104],
  };
})();

/** fence — a white fence painted plank by plank, a child with a brush moving along (irr painted 0/2/4/6). */
STORIES.fence = (() => {
  const XS = [30, 46, 62, 78, 94, 110];
  const plank = (x, painted) => path(`M${x} 96 L${x} 52 L${x + 6} 44 L${x + 12} 52 L${x + 12} 96Z`, painted ? 'orange' : 'white', { sw: 1.6, irr: painted ? 'painted' : undefined }) +
    (painted ? path(`M${x + 3} 92 L${x + 3} 54`, 'none', { st: 'orangeDeep', sw: 1.4, op: '0.7' }) : '');
  const pot = rect(8, 92, 16, 14, 'blue', { r: 3 }) + ell(16, 92, 8, 2.6, 'orange', { sw: 1.2 });
  // the painter: a child standing on the grass, the brush in the raised hand at the next plank
  const painter = (x) => {
    const c = CAST.leo, r = 7.5, hy = 62;
    return shadow(x, 108, 10, 2) + rect(x - 5, 92, 4, 15, 'blueDeep', { r: 1.5, sw: 1.1 }) + rect(x + 1, 92, 4, 15, 'blueDeep', { r: 1.5, sw: 1.1 }) +
      path(`M${x - 8} 94 Q${x - 9} 74 ${x} 72 Q${x + 9} 74 ${x + 8} 94Z`, c.shirt) +
      path(`M${x - 6} 76 Q${x - 14} 70 ${x - 16} 62`, 'none', { st: c.shirtDeep, sw: 4.6 }) + circ(x - 16, 61, 2.4, c.skin) +
      rect(x - 18, 46, 3.4, 15, 'brown', { r: 1, sw: 1 }) + rect(x - 19.2, 41, 5.8, 6, 'orange', { r: 1.4, sw: 1 }) +
      face(x, hy, r, 'leo');
  };
  return {
    ranks: 4,
    stage: () => garden() + path('M24 66 H134 M24 84 H134', 'none', { st: 'brownDeep', sw: 3 }),
    prop: (rank) => {
      const n = [0, 2, 4, 6][rank - 1];
      // the brush is at the next plank to paint; when all are done the painter steps to the end of the fence
      const x = [46, 78, 110, 140][rank - 1];
      return XS.map((x, i) => plank(x, i < n)).join('') + pot + painter(x);
    },
    bbox: () => [6, 36, 152, 112],
  };
})();

/** snowman — a small snowball, a big one, two stacked, then the dressed snowman; tracks show where the balls rolled (irr track 0/1/2/3). */
STORIES.snowman = (() => {
  const ball = (cx, cy, r) => circ(cx, cy, r, 'snow', { st: 'line', sw: 1.6 }) + path(`M${cx - r * 0.5} ${cy + r * 0.55} Q${cx + r * 0.2} ${cy + r * 0.85} ${cx + r * 0.7} ${cy + r * 0.3}`, 'none', { st: 'snowShade', sw: r * 0.35 });
  const track = (x, y, w) => rect(x, y, w, 6.5, 'snowShade', { r: 3.25, st: 'skyDeep', sw: 1, irr: 'track' });
  return {
    ranks: 4,
    stage: () => rect(0, 0, 160, 120, 'skyDeep', { st: false }) + ell(40, 22, 16, 6, 'cloud', { st: false }) + ell(120, 16, 12, 5, 'cloud', { st: false }) +
      [[20, 30], [60, 12], [96, 34], [142, 40], [12, 60], [130, 64], [70, 50], [108, 8]].map(([x, y]) => circ(x, y, 1.6, 'white', { st: false })).join('') +
      path('M0 82 Q40 74 80 80 T160 78 V120 H0Z', 'snow', { st: 'snowShade', sw: 1.4 }),
    prop: (rank) => {
      if (rank === 1) return shadow(70, 98, 10) + ball(70, 90, 8);
      if (rank === 2) return track(40, 104, 26) + shadow(84, 100, 16) + ball(84, 86, 15);
      if (rank === 3) return track(40, 104, 26) + track(98, 108, 28) + shadow(84, 100, 16) + ball(84, 86, 15) + ball(84, 62, 10);
      return track(40, 104, 26) + track(98, 108, 28) + track(36, 94, 22) + shadow(84, 100, 16) + ball(84, 86, 15) + ball(84, 62, 10) +
        circ(80.5, 59, 1.4, 'ink', { st: false }) + circ(87.5, 59, 1.4, 'ink', { st: false }) + path('M84 63 L93 65 L84 66Z', 'orange', { sw: 1 }) +
        rect(77, 44, 14, 9, 'ink', { r: 1 }) + rect(74, 52, 20, 3, 'ink', { r: 1 }) + path('M76 70 Q84 75 92 70 L92 74 Q84 79 76 74Z', 'red', { sw: 1.2 }) +
        path('M70 80 L58 72 M98 80 L110 72', 'none', { st: 'brownDeep', sw: 2 }) + circ(84, 80, 1.6, 'ink', { st: false }) + circ(84, 87, 1.6, 'ink', { st: false });
    },
    bbox: () => [30, 36, 122, 114],
  };
})();

/** letter — a blank card, a flower drawn, words written, then in an envelope with a stamp (irr cardMark / stamp / address). */
STORIES.letter = (() => {
  const card = rect(44, 34, 56, 46, 'white', { r: 2, sw: 1.6 });
  // a counted mark is >= 5 px on the smallest card: the flower is one mark (stem + bloom), the writing is scribbled tall
  const flower = `<g data-irr="cardMark">` + path('M58 56 L58 70', 'none', { st: 'green', sw: 2 }) +
    [0, 72, 144, 216, 288].map((a) => { const t = a * Math.PI / 180; return circ(58 + Math.cos(t) * 4, 50 + Math.sin(t) * 4, 3.2, 'pink', { st: 'pinkDeep', sw: 1 }); }).join('') + circ(58, 50, 2.6, 'yellow', { sw: 1 }) + '</g>';
  const words = [42, 52, 62].map((y) => path(`M68 ${y} q2 -7 4 0 t4 0 t4 0 m5 0 q2 -7 4 0 t4 0`, 'none', { st: 'blueDeep', sw: 1.6, irr: 'cardMark' })).join('');
  const pencil = (x, y) => g(rect(0, 0, 30, 5, 'yellow', { r: 1.5, st: 'yellowDeep', sw: 1 }) + path('M30 0 L37 2.5 L30 5Z', 'cream', { st: 'brownDeep', sw: 1 }) + rect(0, 0, 4, 5, 'pink', { r: 1.5, sw: 1 }), { transform: `translate(${x} ${y})` });
  const envelope = rect(40, 38, 72, 50, 'cream', { r: 2, sw: 1.8 }) + path('M40 39 L76 56 L112 39', 'none', { st: 'line', sw: 1.6 }) +
    rect(96, 42, 12, 12, 'red', { sw: 1.2, irr: 'stamp' }) + rect(98.5, 44.5, 7, 7, 'yellow', { st: false }) +
    [62, 69.5, 77, 84.5].map((y, i) => path(`M52 ${y} q2 -6 4 0 t4 0 t4 0 m4 0 q2 -6 4 0 t4 0${i === 0 ? ' m4 0 q2 -6 4 0 t4 0' : ''}`, 'none', { st: 'blueDeep', sw: 1.5, irr: 'address' })).join('');
  return {
    ranks: 4,
    stage: () => desk(),
    prop: (rank) => [
      shadow(72, 82, 30, 3) + card + pencil(60, 92),
      shadow(72, 82, 30, 3) + card + flower + pencil(60, 92),
      shadow(72, 82, 30, 3) + card + flower + words + pencil(60, 92),
      shadow(76, 86, 38, 3) + envelope + pencil(60, 92),   // the card is inside the envelope: its marks are hidden (bank: occluded 4)
    ][rank - 1],
    bbox: () => [36, 30, 116, 100],
  };
})();

/** paper-chain — a sheet of paper, cut into strips, the first loops glued, then a long chain (irr cutStrip 0/5/5/5, glue 0/0/2/5). */
STORIES.paperChain = null;
STORIES['paper-chain'] = (() => {
  const COLS = ['red', 'yellow', 'blue', 'green', 'pink'];
  const DEEP = { red: 'redDeep', yellow: 'yellowDeep', blue: 'blueDeep', green: 'greenDeep', pink: 'pinkDeep' };
  const scissors = g(circ(0, 0, 4, 'none', { st: 'red', sw: 2.2 }) + circ(0, 9, 4, 'none', { st: 'red', sw: 2.2 }) + path('M3 2 L22 8 M3 7 L22 1', 'none', { st: 'greyDeep', sw: 2.2 }), { transform: 'translate(108 92)' });
  // the glue stick (the word banks name the glue) lies beside the scissors in every picture
  const glue = g(rect(0, 0, 9, 18, 'purple', { r: 2, sw: 1.2 }) + rect(0, -5, 9, 6, 'white', { r: 1.5, sw: 1.1 }) + rect(1.5, 6, 6, 5, 'white', { st: false, op: '0.5' }), { transform: 'translate(136 76) rotate(18)' });
  const sheet = g(COLS.map((c, i) => rect(48 + i * 12, 36, 12, 44, c, { st: false })).join('') + rect(48, 36, 60, 44, 'none', { sw: 1.6 }) +
    [1, 2, 3, 4].map((i) => path(`M${48 + i * 12} 36 V80`, 'none', { st: 'line', sw: 0.8, op: '0.6' })).join(''));
  const strip = (i, x, y, rot) => g(rect(0, 0, 10, 44, COLS[i], { r: 1.5, st: DEEP[COLS[i]], sw: 1.2, irr: 'cutStrip' }), { transform: `translate(${x} ${y}) rotate(${rot})` });
  const loop = (cx, cy, i, glued) => ell(cx, cy, 9, 7, 'none', { st: COLS[i % 5], sw: 4 }) + ell(cx, cy, 9, 7, 'none', { st: DEEP[COLS[i % 5]], sw: 0.8 }) + (glued ? `<g data-irr="glue"></g>` : '');
  const strips = (k) => [[44, 40, -8], [58, 40, -3], [72, 40, 2], [86, 40, 6], [100, 40, 10]].slice(0, k).map(([x, y, r], i) => strip(i, x, y, r)).join('');
  return {
    ranks: 4,
    stage: () => desk(),
    prop: (rank) => {
      if (rank === 1) return shadow(78, 84, 34, 3) + sheet + scissors + glue;
      if (rank === 2) return shadow(78, 86, 40, 3) + strips(5) + scissors + glue;
      if (rank === 3) return shadow(78, 86, 40, 3) + loop(46, 74, 0, true) + loop(60, 74, 1, true) + g(strips(3), { transform: 'translate(46 26) scale(0.62)' }) + '<g data-irr="cutStrip"></g>'.repeat(2) + scissors + glue;
      return shadow(80, 86, 54, 3) + [0, 1, 2, 3, 4].map((i) => loop(36 + i * 16, 64 + (i % 2 ? 4 : 0), i, true)).join('') + '<g data-irr="cutStrip"></g>'.repeat(5) + scissors + glue;
    },
    bbox: () => [24, 30, 150, 104],
  };
})();
delete STORIES.paperChain;

/** beach-walk — a child stands by the towel, walks along the sand leaving footprints, finds a shell, walks back (irr footprint 0/3/6/12). */
STORIES['beach-walk'] = (() => {
  const towel = rect(14, 96, 30, 10, 'red', { r: 2, sw: 1.4 }) + path('M20 96 V106 M26 96 V106 M32 96 V106 M38 96 V106', 'none', { st: 'white', sw: 2 });
  const shell = (x, y) => path(`M${x - 8} ${y} Q${x} ${y - 14} ${x + 8} ${y}Z`, 'pink', { sw: 1.4 }) + path(`M${x} ${y} L${x - 5} ${y - 8} M${x} ${y} L${x} ${y - 10} M${x} ${y} L${x + 5} ${y - 8}`, 'none', { st: 'pinkDeep', sw: 1 });
  // a footprint is >= 5 px on the smallest card (100 px wide): 8.4 units at the beach window
  const step = (x, y) => `<g data-irr="footprint">` + ell(x, y + 1.6, 3.1, 4.3, 'sandDeep', { st: 'brownDeep', sw: 0.9 }) +
    [-3, -1, 1, 3].map((dx, k) => circ(x + dx, y - 4.4 + (k === 0 || k === 3 ? 0.8 : 0), 1.05, 'sandDeep', { st: 'brownDeep', sw: 0.7 })).join('') + '</g>';
  const prints = (n) => Array.from({ length: n }, (_, i) => { const k = i < 6 ? i : 11 - i; const x = 52 + k * 13 + (i < 6 ? 0 : 6); const y = 99 - (k % 2) * 3 + (i < 6 ? 0 : 11); return step(x, y); }).join('');
  // the child, standing (full body), facing the viewer
  const kid = (x) => {
    const c = CAST.mia;
    return shadow(x, 104, 8, 1.8) + rect(x - 4, 90, 3, 13, 'skin1', { r: 1.5, sw: 1 }) + rect(x + 1, 90, 3, 13, 'skin1', { r: 1.5, sw: 1 }) +
      path(`M${x - 8} 92 Q${x - 9} 74 ${x} 72 Q${x + 9} 74 ${x + 8} 92Z`, c.shirt) +
      path(`M${x - 7} 76 Q${x - 11} 82 ${x - 10} 88`, 'none', { st: c.shirtDeep, sw: 4 }) + path(`M${x + 7} 76 Q${x + 11} 82 ${x + 10} 88`, 'none', { st: c.shirtDeep, sw: 4 }) +
      face(x, 62, 7.5, 'mia');
  };
  return {
    ranks: 4,
    stage: () => rect(0, 0, 160, 120, 'sky', { st: false }) + circ(130, 20, 9, 'sun', { st: false }) + ell(44, 18, 14, 5, 'cloud', { st: false }) +
      rect(0, 62, 160, 22, 'sea', { st: false }) + path('M0 64 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0', 'none', { st: 'white', sw: 2 }) +
      rect(0, 80, 160, 40, 'sand', { st: false }) + path('M0 80 Q40 76 80 80 T160 80', 'none', { st: 'sandDeep', sw: 1.6 }) + towel,
    prop: (rank) => {
      if (rank === 1) return kid(30) + shell(132, 104);
      if (rank === 2) return prints(3) + kid(96) + shell(132, 104);
      if (rank === 3) return prints(6) + kid(130) + shell(142, 104);
      return prints(12) + kid(30) + shell(18, 112);
    },
    bbox: () => [10, 52, 156, 116],
  };
})();

/** collage-fish — coloured paper, torn into pieces, pieces glued on a fish outline, the fish finished (irr torn 0/6/6/6, glued 0/0/3/6). */
STORIES['collage-fish'] = (() => {
  const fishOutline = path('M44 66 Q60 44 88 50 Q100 54 106 66 Q100 78 88 82 Q60 88 44 66Z', 'white', { sw: 1.8 }) + path('M104 66 L122 52 L120 80Z', 'white', { sw: 1.8 }) + circ(56, 62, 2.6, 'ink', { st: false });
  const COL = ['orange', 'yellow', 'blue', 'orange', 'yellow', 'blue'];
  const piece = (x, y, i, irr) => path(`M${x} ${y} l7 -2 l2 6 l-6 3 l-5 -2Z`, COL[i], { st: COL[i] + 'Deep', sw: 1, irr });
  const LOOSE = [[34, 98], [48, 102], [62, 98], [100, 100], [112, 96], [124, 102]];
  const ON = [[62, 58], [74, 56], [86, 60], [66, 70], [80, 70], [92, 70]];
  const glue = rect(132, 80, 8, 18, 'purple', { r: 2 }) + rect(132, 76, 8, 6, 'white', { r: 1.5, sw: 1.2 });
  const sheets = rect(36, 92, 30, 20, 'orange', { r: 1.5 }) + rect(58, 96, 30, 18, 'blue', { r: 1.5 }) + rect(94, 92, 30, 20, 'yellow', { r: 1.5 });
  return {
    ranks: 4,
    stage: () => desk() + shadow(84, 88, 44, 3) + rect(36, 38, 96, 54, 'white', { r: 2, sw: 1.4 }),
    prop: (rank) => {
      if (rank === 1) return fishOutline + sheets + glue;
      if (rank === 2) return fishOutline + LOOSE.map(([x, y], i) => piece(x, y, i, 'torn')).join('') + glue;
      if (rank === 3) return fishOutline + ON.slice(0, 3).map(([x, y], i) => piece(x, y, i, 'glued')).join('') + LOOSE.slice(3).map(([x, y], i) => piece(x, y, i + 3, 'torn')).join('') + '<g data-irr="torn"></g>'.repeat(3) + glue;
      return fishOutline + ON.map(([x, y], i) => piece(x, y, i, 'glued')).join('') + '<g data-irr="torn"></g>'.repeat(6) + glue;
    },
    bbox: () => [30, 34, 144, 114],
  };
})();

/** hopscotch — chalk squares drawn on the pavement one by one until the hopscotch is finished (irr square 0/2/4/5/7). */
STORIES.hopscotch = (() => {
  // the hopscotch path, bottom to top: single, single, double, single, double (7 squares)
  const SQ = [[72, 96], [72, 82], [65, 68], [79, 68], [72, 54], [65, 40], [79, 40]];
  const sq = (x, y) => rect(x - 7, y - 7, 14, 14, 'none', { st: 'white', sw: 3.6, irr: 'square' });
  const chalk = (x, y) => g(rect(0, 0, 14, 5, 'pink', { r: 2.5, st: 'pinkDeep', sw: 1.2 }), { transform: `translate(${x} ${y}) rotate(-25)` });
  return {
    ranks: 5,
    stage: () => rect(0, 0, 160, 120, 'greyDeep', { st: false }) + [[20, 20], [130, 30], [40, 90], [120, 100], [100, 14], [20, 60], [140, 76]].map(([x, y]) => circ(x, y, 1.6, 'grey', { st: false })).join('') +
      path('M0 30 H160 M0 70 H160 M0 110 H160', 'none', { st: 'grey', sw: 0.8, op: '0.6' }) + rect(0, 0, 18, 120, 'grass', { st: false }) + rect(142, 0, 18, 120, 'grass', { st: false }),
    prop: (rank) => {
      const n = [0, 2, 4, 5, 7][rank - 1];
      const last = n ? SQ[n - 1] : [72, 104];
      return SQ.slice(0, n).map(([x, y]) => sq(x, y)).join('') + chalk(last[0] + 10, last[1] + 4) + circ(last[0] + 9, last[1] + 9, 1.2, 'white', { st: false });
    },
    bbox: () => [54, 30, 98, 110],
  };
})();

module.exports = { PAL, STORIES, CAST, childAtTable, face, kitchen, desk, garden, plate };

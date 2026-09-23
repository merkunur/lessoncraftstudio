'use strict';
/**
 * data/b6/story-sequencing.js — the K-379 `story-sequencing` bank (nt5-F).
 * Design: docs/worksheet-gen/b6-designs/K-379-story-sequencing.md §2 (the story
 * bank) + §5 (data + gates); every ruling and why in _work/K-379-critic.md.
 *
 * TWO layers:
 *   STORY_SEQUENCING  one block per locale (the FIRST export: lib/b6-common.js
 *                     bank() reads Object.keys(module)[0]). The EN block is
 *                     hand-authored here and is A SOURCE TO AUDIT; every other
 *                     locale is GENERATED into data/b6/locales/story-sequencing.
 *                     <loc>.json by tools/apply-b6-locale.js. An absent block
 *                     REFUSES (bank() throws; the spec never falls back to en).
 *   COMMON            locale-free: the 14 drawn stories (geometry in the panel
 *                     viewBox 0 0 160 120, drawn by primitives/story-panel.js),
 *                     the irreversible-variable list, the excluded tags and the
 *                     scramble tables. Never per locale.
 *
 * THE RULE THAT LOCKS THE TYPE: a panel's rank is legal only because every
 * consecutive pair strictly INCREASES at least one irreversible variable and
 * decreases none; each variable is DRAWN as a count of `data-irr="<var>"` parts
 * (qa/verify-b6-story-panel.js counts them in the render). Nothing a child can
 * undo with their hands (stacking, placing, moving, opening, pouring) ever
 * carries direction.
 *
 * Op vocabulary (primitives/story-panel.js renders it; qa/verify-b6-story-
 * sequencing.js validates it): {k: rect|circle|ellipse|path|line|poly|g|walker,
 * fill / st = a TOKEN NAME (never a hex), sw = stroke width in PAGE PX (the
 * primitive converts to units, so strokes stay constant at every panel width),
 * irr = the counted variable, plus the geometry}. Set ops: fills from
 * SET_FILLS, strokes `grid` 1.5 only, no coral / codeYellow. Prop ops: fills
 * from PROP_FILLS.
 *
 * DEVIATIONS from the §2 bank text (each measured / ruled, recorded in
 * docs/worksheet-gen/b6-designs/_work/K-379-build.md):
 *   - cake: `cutFace` dropped from irr — P4 ("only crumbs") draws no cake, so a
 *     counted cutFace would DECREASE 1 -> 0 and break the strict chain; crumbs
 *     0,2,4,7 already carries every step. The cut faces stay drawn (decor).
 *   - beach-walk towel and sand dots: the §2 text puts a CORAL towel and INK
 *     dots in the SET, which validator rule 7 forbids (set fills are the pale
 *     set, set strokes grid only). Drawn white with grid stripes / grid dots.
 *   - road kerb line: grid, not ink (rule 7); the road carries white lane dashes.
 *   - geometry re-placed where the §2 coordinates collided (snowman head + hat
 *     ran above the clip; desk pinboard overlapped the sheet; fence pot vs the
 *     last plank; snowman third track 4 units tall < the 8-unit carrier floor).
 */

/* ------------------------------------------------------------------ op helpers */
const R = (x, y, w, h, o = {}) => ({ k: 'rect', x, y, w, h, ...o });
const C = (cx, cy, r, o = {}) => ({ k: 'circle', cx, cy, r, ...o });
const E = (cx, cy, rx, ry, o = {}) => ({ k: 'ellipse', cx, cy, rx, ry, ...o });
const P = (d, o = {}) => ({ k: 'path', d, ...o });
const L = (x1, y1, x2, y2, o = {}) => ({ k: 'line', x1, y1, x2, y2, ...o });
const Poly = (pts, o = {}) => ({ k: 'poly', pts, ...o });
const G = (children, o = {}) => ({ k: 'g', children, ...o });
const OUT = { st: 'teal', sw: 3 };          // the prop outline (px; the primitive drops it to 2.5 below 110 px)
const DET = { st: 'teal', sw: 1.5 };        // prop detail
const INK = { st: 'ink', sw: 2, cap: 'round' };
const SETLINE = { st: 'grid', sw: 1.5 };
const r1 = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ the stages (SET layer) */
const SNOWFLAKES = [[14, 14], [40, 30], [66, 8], [24, 56], [92, 20], [128, 10], [150, 38], [8, 80], [146, 70], [72, 44], [122, 84], [52, 76]];
const PAVE_SPECKS = [[8, 12], [30, 6], [52, 18], [118, 8], [146, 22], [12, 52], [34, 88], [150, 58], [126, 44], [20, 112], [104, 116], [142, 96], [46, 64], [114, 72]];
const SETS = {
  table: () => [R(0, 96, 160, 24, { fill: 'creamDeep' }), L(0, 96, 160, 96, SETLINE)],
  plate: () => [E(80, 98, 46, 8, { fill: 'white', ...SETLINE })],
  desk: () => [
    R(0, 98, 160, 22, { fill: 'creamDeep' }), L(0, 98, 160, 98, SETLINE),
  ],
  garden: () => [
    R(0, 96, 160, 24, { fill: 'tealSoft' }), L(0, 96, 160, 96, SETLINE),
    P('M9,112 Q8,106 6,102 M12,112 L12,101 M15,112 Q16,106 18,103', { fill: 'none', ...SETLINE }),
    P('M141,114 Q140,108 138,104 M144,114 L144,103 M147,114 Q148,108 150,105', { fill: 'none', ...SETLINE }),
  ],
  // fix round 2 (en / de / fr panels: "white outline circles on white, nothing says snow"): a pale sky with
  // falling snowflakes over the white snow ground, so a lone snowball reads as snow at 108 px
  snow: () => [
    R(0, 0, 160, 92, { fill: 'tealSoft' }),
    ...SNOWFLAKES.map(([x, y]) => C(x, y, 2.6, { fill: 'white', ...SETLINE })),
    R(0, 92, 160, 28, { fill: 'white' }), L(0, 92, 160, 92, SETLINE),
  ],
  sand: () => [
    // fix round 2 (es panel): the SEA behind the sand, so the scene reads as a beach
    R(0, 72, 160, 18, { fill: 'tealSoft' }),
    P('M0,76 Q10,72 20,76 Q30,80 40,76 Q50,72 60,76 Q70,80 80,76 Q90,72 100,76 Q110,80 120,76 Q130,72 140,76 Q150,80 160,76', { fill: 'none', ...SETLINE }),
    R(0, 90, 160, 30, { fill: 'creamDeep' }), L(0, 90, 160, 90, SETLINE),
    ...[[52, 114], [70, 94], [96, 116], [118, 95], [134, 115], [150, 100]].map(([x, y]) => C(x, y, 1, { fill: 'grid' })),
    // one calm cloud in the beach sky (set: never changes)
    P('M84,30 Q82,21 92,20 Q96,12 105,17 Q116,16 116,30 Z', { fill: 'white', ...SETLINE }),
  ],
  road: () => [
    R(0, 100, 160, 20, { fill: 'grid' }),
    ...[6, 40, 74, 108, 142].map((x) => R(x, 109, 16, 2.5, { fill: 'white' })),
  ],
  // fix round 2 (en / fr panels: the slab grid read as graph paper; de read the court as a brick tower): plain
  // grey ASPHALT with a few pale grit specks, so the WHITE chalk lines and the white chalk stick that drew them
  // are the only lines on it
  pavement: () => [
    R(0, 0, 160, 120, { fill: 'grid' }),
    ...PAVE_SPECKS.map(([x, y]) => C(x, y, 1.4, { fill: 'creamDeep' })),
  ],
};

/**
 * BACKDROP(kind, win): the stage beyond the 160 x 120 art when a zoomed card window reaches outside it
 * (story-panel.js viewWindow). The pavement (a top view) continues its asphalt and the snow its pale sky;
 * every other stage is plain white wall / sky above its ground band (a drawn window or cloud collided with
 * props once zoomed).
 */
function backdrop(kind, win) {
  if (!win || win.y0 >= 0) return [];
  if (kind === 'pavement') return [R(win.x0, win.y0, win.w, -win.y0, { fill: 'grid' })];
  if (kind === 'snow') return [R(win.x0, win.y0, win.w, -win.y0, { fill: 'tealSoft' })];
  return [];
}
/** The CSS card background around a panel that grows with its row: the stage's sky (a TOKEN name; default white). */
const SKY = { pavement: 'grid', snow: 'tealSoft' };

/* ------------------------------------------------------------------ geometry helpers */
/** Point-in-polygon (even-odd). */
function inPoly(q, x, y) {
  let c = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    const [xi, yi] = q[i], [xj, yj] = q[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const insideCircle = (a, R0) => (x, y) => Math.hypot(x - a[0], y - a[1]) < R0 - 0.2;
const insidePoly = (q) => (x, y) => inPoly(q, x, y);
/** The runs of circle (p, r) inside the food (inside()) and outside every other bite. */
function arcInside(inside, p, r, others, n = 64) {
  const segs = [];
  let cur = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * 2 * Math.PI;
    const x = p[0] + r * Math.cos(t), y = p[1] + r * Math.sin(t);
    const ok = inside(x, y) && others.every(([ox, oy, orr]) => Math.hypot(x - ox, y - oy) > orr + 0.2);
    if (ok) cur.push([r1(x), r1(y)]);
    else { if (cur.length > 1) segs.push(cur); cur = []; }
  }
  if (cur.length > 1) segs.push(cur);
  if (segs.length > 1) {                          // a run that wraps across t = 0
    const first = segs[0], last = segs[segs.length - 1];
    const f0 = first[0], lN = last[last.length - 1];
    if (Math.hypot(f0[0] - lN[0], f0[1] - lN[1]) < 2 * Math.PI * r / n + 0.5) { segs[0] = last.concat(first); segs.pop(); }
  }
  return segs;
}
/**
 * Bites taken out of a food whose shape is inside(): circles [[x, y, r], ...]. One
 * counted group per bite = a white disc (the missing part) + the new edge drawn
 * where the disc cuts the food (never where another bite already removed it, so
 * a later disc never erases an earlier bite's edge).
 */
function biteSet(inside, circles, maskOp, irr = 'bite') {
  return circles.map((c, i) => {
    const others = circles.filter((_, j) => j !== i);
    const edges = arcInside(inside, [c[0], c[1]], c[2], others).map((q) => Poly(q, { open: true, fill: 'none', ...OUT, cap: 'round' }));
    // the disc is MASKED to the food (+ its outline), so it never erases the stage or a neighbour
    return G([G([C(c[0], c[1], c[2], { fill: 'white' })], { mask: maskOp }), ...edges], { irr });
  });
}
/** Bites on a round fruit (centre a, radius R0): each [angleDeg, r, dist from the centre]. */
function bites(a, R0, list, irr = 'bite') {
  const circles = list.map(([ang, r, dist = R0]) => {
    const t = ang * Math.PI / 180;
    return [r1(a[0] + dist * Math.cos(t)), r1(a[1] + dist * Math.sin(t)), r];
  });
  return biteSet(insideCircle(a, R0), circles, C(a[0], a[1], R0, { sw: 3 }), irr);
}
/** A wavy writing line (no letters): x0..x0+len, amplitude a (bbox height 2a). */
function wavy(x0, y, len, a = 4, o = INK) {
  const n = Math.max(2, Math.round(len / 7));
  let d = `M${x0},${y}`;
  for (let i = 0; i < n; i++) {
    const xa = x0 + (i + 0.5) * len / n, xb = x0 + (i + 1) * len / n;
    d += ` Q${r1(xa)},${r1(y + (i % 2 ? a * 2 : -a * 2))} ${r1(xb)},${y}`;
  }
  return P(d, { fill: 'none', ...o });
}
const pts = (s) => s.trim().split(/\s+/).map((q) => q.split(',').map(Number));

/* ------------------------------------------------------------------ the 14 stories */
const APPLE_C = [80, 64], APPLE_R = 26;
function appleBody() {
  return [
    C(APPLE_C[0], APPLE_C[1], APPLE_R, { fill: 'coral', ...OUT }),
    P('M80,39 Q80,33 83,28', { fill: 'none', st: 'ink', sw: 3, cap: 'round' }),
    E(91, 33, 8, 4, { fill: 'tealSoft', ...DET, rot: -25 }),
  ];
}
function apple() {
  const body = appleBody();
  return {
    id: 'apple', setKind: 'table', objects: ['apple'], tags: ['food'], climate: null, excludeLocales: [],
    set: [...SETS.table(), ...SETS.plate()],
    panels: [
      { rank: 1, irr: { bite: 0 }, prop: body },
      { rank: 2, irr: { bite: 1 }, prop: [...body, ...bites(APPLE_C, APPLE_R, [[0, 12]])] },
      { rank: 3, irr: { bite: 3 }, prop: [...body, ...bites(APPLE_C, APPLE_R, [[-35, 11], [28, 11], [180, 12]])] },
      {
        rank: 4, irr: { bite: 6 },
        prop: [
          ...body.slice(0, 1),
          E(80, 64, 7, 17, { fill: 'white' }),
          ...body.slice(1),
          ...bites(APPLE_C, APPLE_R, [[-40, 12, 21], [0, 12, 19], [40, 12, 21], [140, 12, 21], [180, 12, 19], [220, 12, 21]]),
          E(77.5, 62, 1.8, 3, { fill: 'ink' }), E(82.5, 66, 1.8, 3, { fill: 'ink' }),
        ],
      },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function banana() {
  const stem = R(78, 26, 6, 7, { fill: 'ink', rx: 1.5 });
  const plateFoot = [];
  // upright banana: the whole fruit (a gentle crescent) standing on the plate
  const whole = P('M74,92 C66,72 68,50 78,33 L85,33 C79,52 79,72 88,92 Q81,95 74,92 Z', { fill: 'codeYellow', ...OUT });
  // the white flesh column (exposed part), the peel cup below it
  const fleshTop = (y0) => P(`M74.5,${y0} C72,${y0 - 14} 74,${y0 - 26} 79,33 Q81.5,30 84,33 C82,${y0 - 24} 83,${y0 - 12} 86,${y0} Z`, { fill: 'white', ...OUT });
  const cup = (yTop) => P(`M73,${yTop} C70,80 71,88 74,92 Q81,95 88,92 C87,86 86,78 87,${yTop} Q80,${yTop + 5} 73,${yTop} Z`, { fill: 'codeYellow', ...OUT });
  const strip = (d) => P(d, { fill: 'codeYellow', ...OUT, irr: 'peelStrip' });
  return {
    id: 'banana', setKind: 'table', objects: ['banana'], tags: ['food'], climate: null, excludeLocales: [],
    set: [...SETS.table(), ...SETS.plate()],
    panels: [
      { rank: 1, irr: { peelStrip: 0 }, prop: [whole, stem] },
      {
        rank: 2, irr: { peelStrip: 1 },
        prop: [
          fleshTop(62), cup(60), stem,
          // one strip folded down the right side, from the cup rim
          strip('M86,60 Q98,58 104,66 Q107,76 102,84 Q97,80 96,72 Q93,64 86,64 Z'),
        ],
      },
      {
        rank: 3, irr: { peelStrip: 3 },
        prop: [
          P('M71,88 C67,68 70,48 78,34 Q81.5,30 85,34 C85,50 86,70 90,88 Z', { fill: 'white', ...OUT }),
          P('M71,85 Q80,91 90,85 Q90,90 89,92 Q81,95 73,92 Q71,89 71,85 Z', { fill: 'codeYellow', ...OUT }),
          strip('M73,86 Q62,82 56,88 Q52,94 54,98 Q60,96 64,92 Q69,89 74,91 Z'),
          strip('M87,86 Q98,82 104,88 Q108,94 106,98 Q100,96 96,92 Q91,89 86,91 Z'),
          strip('M77,91 Q73,99 67,104 Q71,108 77,105 Q82,99 83,92 Z'),
          stem,
        ],
      },
      {
        rank: 4, irr: { peelStrip: 4 },
        prop: [
          // the empty peel lying open on the plate: four strips around a small hub
          strip('M78,96 Q62,87 42,92 Q38,98 46,101 Q62,102 78,100 Z'),
          strip('M82,96 Q98,87 118,92 Q122,98 114,101 Q98,102 82,100 Z'),
          strip('M77,95 Q70,86 60,82 Q55,84 58,88 Q66,94 76,98 Z'),
          strip('M83,95 Q90,86 100,82 Q105,84 102,88 Q94,94 84,98 Z'),
          E(80, 96.5, 5, 3.5, { fill: 'codeYellow', ...OUT }),
          R(78, 88, 5, 6, { fill: 'ink', rx: 1.5 }),
        ],
      },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function sandwich() {
  // P1-P2: two slices side by side (x22..62 and x74..114, y44..84), crust 5 (coralSoft: a prop fill)
  const slice = (x, spread) => G([
    R(x, 44, 40, 40, { fill: 'coralSoft', ...OUT, rx: 6 }),
    R(x + 5, 49, 30, 30, { fill: spread ? 'coral' : 'white', rx: 4 }),
  ]);
  const knife = (jammy) => G([R(70, 89, 28, 8, { fill: 'white', ...DET, rx: 3 }), R(98, 89, 14, 8, { fill: 'ink', rx: 2 }), ...(jammy ? [R(70, 89, 10, 8, { fill: 'coral', rx: 3, irr: 'spread' })] : [])]);
  const jar = G([R(96, 12, 20, 28, { fill: 'tealSoft', ...OUT, rx: 4 }), R(94, 6, 24, 8, { fill: 'coral', ...OUT, rx: 2 })]);
  // P3+: ONE closed sandwich (x28..72, y42..86) cut on the diagonal; the top-right half moved 6 up / 6 right (an 8.5-unit gap)
  const LQ = pts('28,42 28,86 72,86');
  const RQ = pts('34,36 78,36 78,80');
  const leftHalf = () => [
    Poly(LQ, { fill: 'coralSoft', ...OUT, join: 'round' }),
    Poly(pts('33,54 33,81 60,81'), { fill: 'white' }),
    Poly(pts('28,42 72,86 63,86 28,51'), { fill: 'coral' }),   // the jam along the cut (decor: the knife tip carries spread)
  ];
  const cutFill = G([
    Poly(pts('34,36 78,80 78,72 42,36'), { fill: 'codeYellow' }),            // cheese along the cut
    P('M45,38 Q50,40 51,45 Q56,47 58,52 Q63,54 65,59 Q70,61 72,66', { fill: 'none', st: 'teal', sw: 2 }),
  ]);
  const rightHalf = () => [
    Poly(RQ, { fill: 'coralSoft', ...OUT, join: 'round' }),
    Poly(pts('46,41 73,41 73,68'), { fill: 'white' }),
  ];
  const insideR = insidePoly(RQ);
  const crumbs = (n) => [[36, 93], [24, 90], [48, 90], [60, 93], [120, 92]].slice(0, n).map(([x, y]) => R(x - 4, y - 4, 8, 8, { fill: 'ink', rx: 3, irr: 'crumb' }));
  const B1 = [78, 36, 17];   // the first bite: the corner of the moved half
  const CRUST = pts('32,34 80,34 80,84 70,84 70,44 32,44');   // the crust left at the end (10 units thick)
  return {
    id: 'sandwich', setKind: 'table', objects: ['bread', 'knife', 'jar'], tags: ['food'], climate: null, excludeLocales: [],
    set: [...SETS.table(), R(14, 84, 132, 16, { fill: 'creamDeep', ...SETLINE, rx: 4 }), R(86, 40, 40, 5, { fill: 'creamDeep', ...SETLINE })],
    panels: [
      { rank: 1, irr: { spread: 0, bite: 0, crumb: 0 }, prop: [slice(22, false), slice(74, false), knife(false), jar] },
      { rank: 2, irr: { spread: 1, bite: 0, crumb: 0 }, prop: [slice(22, true), slice(74, false), knife(true), jar] },
      { rank: 3, irr: { spread: 1, bite: 0, crumb: 1 }, prop: [...leftHalf(), ...rightHalf(), cutFill, knife(true), jar, ...crumbs(1)] },
      { rank: 4, irr: { spread: 1, bite: 1, crumb: 2 }, prop: [...leftHalf(), ...rightHalf(), cutFill, ...biteSet(insideR, [B1], Poly(RQ, { sw: 3 })), knife(true), jar, ...crumbs(2)] },
      // the end: only ONE crust is left (the moved half's L-shaped edge, three bites out of its inside) + crumbs
      { rank: 5, irr: { spread: 1, bite: 3, crumb: 5 }, prop: [Poly(CRUST, { fill: 'coralSoft', ...OUT, join: 'round' }), ...biteSet(insidePoly(CRUST), [[47, 45, 6.5], [61, 45, 6.5], [71, 62, 6.5]], Poly(CRUST, { sw: 3 })), knife(true), jar, ...crumbs(5)] },
    ],
    sub4: [1, 2, 3, 5], sub3: [1, 3, 5], n5: [1, 2, 3, 4, 5],
  };
}

/** A round cake seen from three-quarters: the sectors still on the stand. */
function cakeSectors(sectors) {
  const cx = 80, cy = 50, rx = 40, ry = 12, h = 26;
  const pt = (deg, dy = 0) => [r1(cx + rx * Math.cos(deg * Math.PI / 180)), r1(cy + ry * Math.sin(deg * Math.PI / 180) + dy)];
  const arc = (a0, a1, dy = 0, steps = 24) => Array.from({ length: steps + 1 }, (_, i) => pt(a0 + (a1 - a0) * i / steps, dy));
  const ops = [];
  const cutFace = (deg) => {
    const p = pt(deg);
    return Poly([[cx, cy], p, [p[0], p[1] + h], [cx, cy + h]], { fill: 'white', ...OUT, join: 'round' });
  };
  const layer = (deg) => {
    const p = pt(deg);
    return Poly([[cx, cy + 9], [p[0], p[1] + 9], [p[0], p[1] + 16], [cx, cy + 16]], { fill: 'coral' });
  };
  const full = sectors.length === 1 && sectors[0][1] - sectors[0][0] >= 360;
  for (const [a0, a1] of sectors) {
    if (!full && a1 - a0 === 180 && false) {
      // a straight cut through the middle: ONE face across the diameter
      const p0 = pt(a0), p1 = pt(a1);
      ops.push(Poly([p0, p1, [p1[0], p1[1] + h], [p0[0], p0[1] + h]], { fill: 'white', ...OUT, join: 'round' }));
      ops.push(Poly([[p0[0], p0[1] + 9], [p1[0], p1[1] + 9], [p1[0], p1[1] + 16], [p0[0], p0[1] + 16]], { fill: 'coral' }));
    } else if (!full) for (const d of [a0, a1]) { ops.push(cutFace(d)); ops.push(layer(d)); }
    // front side band (screen-lower half of the ellipse: angles 0..180, and 360..540 for a sector that wraps)
    for (const [lo, hi] of [[0, 180], [360, 540]]) {
    const f0 = Math.max(a0, lo), f1 = Math.min(a1, hi);
    if (f1 > f0) {
      const top = arc(f0, f1), bot = arc(f1, f0, h);
      ops.push(Poly([...top, ...bot], { fill: 'white', ...OUT, join: 'round' }));
      // the icing drips along the front rim
      const n = Math.max(1, Math.round((f1 - f0) / 30));
      for (let i = 0; i < n; i++) {
        const m = pt(f0 + (f1 - f0) * (i + 0.5) / n);
        ops.push(E(m[0], m[1] + 3, 4.5, 4, { fill: 'coralSoft' }));
      }
    }
    }
    const topPts = full ? arc(0, 360, 0, 48) : [[cx, cy], ...arc(a0, a1)];
    ops.push(Poly(topPts, { fill: 'coralSoft', ...OUT, join: 'round' }));
  }
  return ops;
}
function cake() {
  // three used candles lying on the table (a wick each; never lit, never stuck in: both are undoable)
  // lying on the table at the left front of the stand (inside the zoomed window, never at its edge)
  const candles = [98, 104.5, 111].map((y) => G([R(30, y, 26, 6, { fill: 'white', st: 'teal', sw: 2.5, rx: 2 }), ...[35, 42, 49].map((x) => L(x, y + 6, x + 4, y, { st: 'coral', sw: 2 })), L(56, y + 3, 61, y + 3, { st: 'ink', sw: 2, cap: 'round' })]));
  const crumbs = (list) => list.map(([x, y]) => R(x - 4, y - 4, 8, 8, { fill: 'ink', rx: 3, irr: 'crumb' }));
  const C7 = [[102, 91], [114, 89], [56, 91], [70, 93], [86, 94], [64, 87], [96, 87]];
  return {
    id: 'cake', setKind: 'table', objects: ['cake', 'candles'], tags: ['food'], climate: null, excludeLocales: [],
    set: [...SETS.table(), R(74, 92, 12, 14, { fill: 'white', ...SETLINE }), E(80, 106, 16, 3, { fill: 'white', ...SETLINE }), E(80, 90, 50, 6, { fill: 'white', ...SETLINE })],
    panels: [
      { rank: 1, irr: { crumb: 0 }, prop: cakeSectors([[0, 360]]) },
      { rank: 2, irr: { crumb: 2 }, prop: [...cakeSectors([[75, 375]]), ...candles, ...crumbs(C7.slice(0, 2))] },
      { rank: 3, irr: { crumb: 4 }, prop: [...cakeSectors([[110, 290]]), ...candles, ...crumbs(C7.slice(0, 4))] },
      { rank: 4, irr: { crumb: 7 }, prop: [...candles, ...crumbs(C7)] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function drawing() {
  const sheet = R(18, 26, 96, 68, { fill: 'white', ...OUT, rx: 3 });
  // fix round 2 (nl panel: "a flat orange bar"): a crayon a child names: a thicker body, a white paper
  // wrapper with two stripes, a sharpened cone tip and a flat butt end
  const crayon = G([
    R(40, 102, 40, 11, { fill: 'coral', ...OUT, rx: 2 }),
    R(48, 102, 22, 11, { fill: 'white', ...DET }),
    L(53, 102, 53, 113, DET), L(65, 102, 65, 113, DET),
    Poly(pts('80,102.5 93,107.5 80,112.5'), { fill: 'coral', ...OUT, join: 'round' }),
  ]);
  const house = [
    R(32, 60, 30, 24, { fill: 'none', ...INK, irr: 'line' }),
    Poly(pts('28,60 47,44 66,60'), { fill: 'none', ...INK, join: 'round', irr: 'line' }),
    R(43, 72, 8, 12, { fill: 'none', ...INK, irr: 'line' }),
  ];
  const rays = [0, 60, 120, 180, 240, 300].map((a) => {
    const t = a * Math.PI / 180;
    return L(r1(96 + 11 * Math.cos(t)), r1(42 + 11 * Math.sin(t)), r1(96 + 15 * Math.cos(t)), r1(42 + 15 * Math.sin(t)), INK);
  });
  const sun = G([C(96, 42, 8, { fill: 'none', ...INK }), ...rays], { irr: 'line' });
  const tree = G([C(92, 66, 9, { fill: 'none', ...INK }), R(90, 75, 4, 9, { fill: 'none', ...INK })], { irr: 'line' });
  const fills = [
    R(32, 60, 30, 24, { fill: 'coral', irr: 'fill' }),
    Poly(pts('28,60 47,44 66,60'), { fill: 'teal', irr: 'fill' }),
    C(96, 42, 8, { fill: 'codeYellow', irr: 'fill' }),
    C(92, 66, 9, { fill: 'teal', irr: 'fill' }),
  ];
  return {
    id: 'drawing', setKind: 'desk', objects: ['sheet', 'crayon'], tags: ['craft'], climate: null, excludeLocales: [],
    set: SETS.desk(),
    panels: [
      { rank: 1, irr: { line: 0, fill: 0 }, prop: [sheet, crayon] },
      { rank: 2, irr: { line: 3, fill: 0 }, prop: [sheet, ...house, crayon] },
      { rank: 3, irr: { line: 5, fill: 0 }, prop: [sheet, ...house, sun, tree, crayon] },
      { rank: 4, irr: { line: 5, fill: 4 }, prop: [sheet, ...fills, ...house, sun, tree, crayon] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 2, 4], n5: null,
  };
}

function fence() {
  const X = [12, 31, 50, 69, 88, 107];
  const plank = (x, painted) => P(`M${x},98 V26 L${x + 7},14 L${x + 14},26 V98 Z`, { fill: painted ? 'coral' : 'white', ...OUT, join: 'round', ...(painted ? { irr: 'painted' } : {}) });
  // fix round 2 (en / de / fr panels: "nobody paints; the brush is a bristle-less stick never used"): a paint
  // BUCKET (a wire handle), a real brush (ink handle, white ferrule, a bristle head with bristle lines), and in
  // panels 2 and 3 a HAND (a sleeved arm reaching down from the top edge) holding that brush on the plank it is
  // painting — the brush is dry and lies across the bucket at the start, wet and back on the bucket at the end.
  const bucket = G([
    P('M58,100 L60,117 L78,117 L80,100 Z', { fill: 'white', ...OUT, join: 'round' }),
    E(69, 100, 11, 3.5, { fill: 'coral', ...OUT }),
    P('M59,101 Q69,86 79,101', { fill: 'none', ...DET }),
  ]);
  /** A brush, bristles at (x, y), handle pointing up-right at `ang` degrees; wet = coral bristles. */
  const brush = (x, y, ang, wet) => G([
    R(x + 14, y - 3, 28, 6, { fill: 'ink', rx: 3 }),                             // handle
    R(x + 7, y - 5.5, 8, 11, { fill: 'white', ...DET, rx: 1 }),                  // ferrule
    P(`M${x + 7},${y - 6.5} L${x},${y - 6.5} Q${x - 3},${y} ${x},${y + 6.5} L${x + 7},${y + 6.5} Z`, { fill: wet ? 'coral' : 'white', ...DET, join: 'round' }),   // bristles
    ...[-3.5, 0, 3.5].map((dy) => L(x + 0.5, y + dy, x + 6.5, y + dy, { st: 'teal', sw: 1.5 })),
  ], { tf: `rotate(${ang} ${x} ${y})` });
  /** The painter's hand: a sleeve from the card's top edge to a mitten round the brush handle. */
  const hand = (hx, hy) => G([
    Poly([[hx + 1, hy - 8], [hx + 11, hy - 1], [hx + 30, 0], [hx + 16, 0]], { fill: 'tealSoft', ...OUT, join: 'round' }),
    L(r1(hx + 4), r1(hy - 11), r1(hx + 14), r1(hy - 4), DET),                    // the cuff
    E(hx, hy, 9, 7.5, { fill: 'white', ...OUT }),
    E(r1(hx - 5), r1(hy - 6), 4, 3, { fill: 'white', ...DET }),                  // the thumb over the handle
  ]);
  const panel = (n) => [...X.map((x, i) => plank(x, i < n)), bucket];
  // painting: bristles on the right edge of the last painted plank (x = its right side), the handle up-right
  const painting = (n) => { const bx = X[n - 1] + 14, by = 60; return [brush(bx, by, -40, true), hand(r1(bx + 22), r1(by - 18))]; };
  return {
    id: 'fence', setKind: 'garden', objects: ['planks', 'pot', 'brush'], tags: ['craft'], climate: null, excludeLocales: [],
    set: [...SETS.garden(), R(6, 40, 118, 6, { fill: 'white', ...SETLINE }), R(6, 78, 118, 6, { fill: 'white', ...SETLINE })],
    panels: [
      { rank: 1, irr: { painted: 0 }, prop: [...panel(0), brush(64, 99, -30, false)] },
      { rank: 2, irr: { painted: 2 }, prop: [...panel(2), ...painting(2)] },
      { rank: 3, irr: { painted: 4 }, prop: [...panel(4), ...painting(4)] },
      { rank: 4, irr: { painted: 6 }, prop: [...panel(6), brush(64, 99, -30, true)] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 2, 4], n5: null,
  };
}

function snowman() {
  const track = (x, y, w) => R(x, y, w, 8, { fill: 'grid', rx: 4, irr: 'track' });
  const T1 = track(40, 95, 52), T2 = track(36, 106, 46), T3 = track(92, 106, 40);
  // fix round 2: every ball is SNOW — white with a pale shadow on its lower side (masked to the ball), under
  // the sky's falling snowflakes; the first snowball is bigger (a lone 16-unit circle read as a ring)
  const ball = (cx, cy, r) => [
    C(cx, cy, r, { fill: 'white' }),
    G([E(r1(cx + r * 0.3), r1(cy + r * 0.45), r1(r * 0.85), r1(r * 0.55), { fill: 'tealSoft' })], { mask: C(cx, cy, r, { sw: 3 }) }),
    C(cx, cy, r, { fill: 'none', ...OUT }),
  ];
  const big = G(ball(106, 76, 18));
  const mid = G(ball(106, 50, 13));
  const head = [
    L(94, 48, 80, 38, { st: 'ink', sw: 3, cap: 'round' }), L(84, 41, 80, 34, { st: 'ink', sw: 2, cap: 'round' }),
    L(118, 48, 132, 38, { st: 'ink', sw: 3, cap: 'round' }), L(128, 41, 132, 34, { st: 'ink', sw: 2, cap: 'round' }),
    C(106, 45, 1.8, { fill: 'ink' }), C(106, 51, 1.8, { fill: 'ink' }), C(106, 57, 1.8, { fill: 'ink' }),
    ...ball(106, 30, 9.5),
    R(96, 19, 20, 3.5, { fill: 'ink', rx: 1 }), R(99, 7, 14, 13, { fill: 'ink', rx: 1.5 }),
    Poly(pts('113,29 125,31.5 113,34'), { fill: 'coral', ...DET, join: 'round' }),
  ];
  return {
    id: 'snowman', setKind: 'snow', objects: ['snowballs', 'tracks'], tags: ['play', 'snow'], climate: 'snow', excludeLocales: ['es', 'pt'],
    set: SETS.snow(),
    panels: [
      { rank: 1, irr: { track: 0 }, prop: [G(ball(52, 81, 11))] },
      { rank: 2, irr: { track: 1 }, prop: [T1, big] },
      { rank: 3, irr: { track: 2 }, prop: [T1, T2, big, mid] },
      { rank: 4, irr: { track: 3 }, prop: [T1, T2, T3, big, mid, ...head] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function letter() {
  const card = R(34, 34, 72, 52, { fill: 'white', ...OUT, rx: 3 });
  const pencil = G([R(56, 104, 30, 6, { fill: 'codeYellow', ...DET, rx: 1 }), Poly(pts('86,104 94,107 86,110'), { fill: 'white', ...DET }), R(52, 104, 5, 6, { fill: 'coral', rx: 1 })]);
  const flower = G([
    L(52, 64, 52, 80, { st: 'teal', sw: 2 }),
    ...[0, 72, 144, 216, 288].map((a) => { const t = (a - 90) * Math.PI / 180; return C(r1(52 + 7 * Math.cos(t)), r1(56 + 7 * Math.sin(t)), 4.5, { fill: 'coral', ...DET }); }),
    C(52, 56, 3.5, { fill: 'codeYellow', ...DET }),
  ], { irr: 'cardMark' });
  const writing = [wavy(68, 50, 30), wavy(68, 62, 30), wavy(68, 74, 30)].map((o) => ({ ...o, irr: 'cardMark' }));
  const envelope = [
    R(28, 32, 84, 56, { fill: 'white', ...OUT, rx: 3 }),
    Poly(pts('28,34 70,54 112,34'), { fill: 'none', ...OUT, open: true, join: 'round' }),
    G([R(93, 58, 15, 15, { fill: 'coral', ...DET, rx: 1 }), R(96, 61, 9, 9, { fill: 'none', st: 'white', sw: 1.5 })], { irr: 'stamp' }),
    ...[[38, 66], [63, 66], [38, 78], [63, 78]].map(([x, y]) => ({ ...wavy(x, y, 22), irr: 'address' })),
  ];
  return {
    id: 'letter', setKind: 'desk', objects: ['card', 'envelope', 'stamp'], tags: ['craft'], climate: null, excludeLocales: [],
    set: SETS.desk(),
    panels: [
      { rank: 1, irr: { cardMark: 0, stamp: 0, address: 0 }, prop: [card, pencil] },
      { rank: 2, irr: { cardMark: 1, stamp: 0, address: 0 }, prop: [card, flower, pencil] },
      { rank: 3, irr: { cardMark: 4, stamp: 0, address: 0 }, prop: [card, flower, ...writing, pencil] },
      { rank: 4, irr: { cardMark: 4, stamp: 1, address: 4 }, occluded: { cardMark: 4 }, prop: [...envelope, pencil] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function present() {
  const dots = (x, y, w, h) => {
    const o = [];
    for (let yy = y + 6; yy < y + h - 3; yy += 10) for (let xx = x + 6 + ((yy - y) % 20 ? 5 : 0); xx < x + w - 3; xx += 10) o.push(C(xx, yy, 2.6, { fill: 'coral' }));
    return o;
  };
  const tapeRoll = G([C(140, 88, 8, { fill: 'white', ...OUT }), C(140, 88, 3.5, { fill: 'tealSoft', ...DET })]);
  const box = [R(22, 62, 42, 34, { fill: 'white', ...OUT, rx: 2 }), R(19, 56, 48, 9, { fill: 'white', ...OUT, rx: 2 })];
  const sheet = [R(76, 56, 46, 36, { fill: 'white', ...OUT, rx: 2 }), ...dots(76, 56, 46, 36)];
  const wrapped = [R(22, 56, 42, 40, { fill: 'white', ...OUT, rx: 2 }), ...dots(22, 56, 42, 40),
    R(28, 52, 8, 12, { fill: 'tealSoft', ...DET, irr: 'tape' }), R(50, 88, 8, 12, { fill: 'tealSoft', ...DET, irr: 'tape' })];
  const piece = (ptsS, tape) => G([Poly(pts(ptsS), { fill: 'white', ...OUT, join: 'round' }), ...dotsIn(ptsS), ...(tape ? [R(tape[0], tape[1], 8, 8, { fill: 'tealSoft', ...DET, irr: 'tape' })] : [])], { irr: 'torn' });
  function dotsIn(s) { const q = pts(s); const cx = q.reduce((a, p) => a + p[0], 0) / q.length, cy = q.reduce((a, p) => a + p[1], 0) / q.length; return [C(r1(cx - 3), r1(cy), 2.6, { fill: 'coral' }), C(r1(cx + 4), r1(cy - 3), 2.6, { fill: 'coral' })]; }
  const openBox = [R(22, 62, 42, 34, { fill: 'white', ...OUT, rx: 2 }), R(8, 48, 9, 48, { fill: 'white', ...OUT, rx: 2 })];   // the lid off, leaning on the table
  const ball = G([C(72, 86, 10, { fill: 'coral', ...OUT }), P('M63,83 Q72,90 81,83', { fill: 'none', st: 'white', sw: 2.5 })]);
  return {
    id: 'present', setKind: 'table', objects: ['box', 'paper', 'tape'], tags: ['craft'], climate: null, excludeLocales: [],
    set: SETS.table(),
    panels: [
      { rank: 1, irr: { tape: 0, torn: 0 }, prop: [...box, ...sheet, tapeRoll] },
      { rank: 2, irr: { tape: 2, torn: 0 }, prop: [...wrapped, tapeRoll] },
      {
        rank: 3, irr: { tape: 2, torn: 4 },
        prop: [
          ...openBox, ball,
          piece('88,56 104,53 108,66 96,71 89,67', [93, 56]),
          piece('112,55 128,59 124,72 110,69', null),
          piece('90,78 106,76 110,90 94,92', [96, 79]),
          piece('114,78 128,77 128,91 115,93', null),
          tapeRoll,
        ],
      },
    ],
    sub4: null, sub3: [1, 2, 3], n5: null,
  };
}

function paperChain() {
  const scissors = G([
    C(64, 106, 4.5, { fill: 'white', st: 'ink', sw: 2 }), C(64, 114, 4.5, { fill: 'white', st: 'ink', sw: 2 }),
    L(68, 107, 88, 113, { st: 'ink', sw: 2.5, cap: 'round' }), L(68, 113, 88, 106, { st: 'ink', sw: 2.5, cap: 'round' }),
  ]);
  const strip = (y, rot) => R(46, y, 60, 8, { fill: 'coralSoft', ...OUT, rx: 2, irr: 'cutStrip', ...(rot ? { rot, rcx: 76, rcy: y + 4 } : {}) });
  const link = (cx, cy, glue) => G([
    E(cx, cy, 13, 9, { fill: 'none', st: 'teal', sw: 5.5 }),
    E(cx, cy, 13, 9, { fill: 'none', st: 'coralSoft', sw: 2.5 }),
  ], { irr: 'cutStrip' });
  const glueDot = (cx, cy) => R(cx - 4, cy - 14, 8, 8, { fill: 'coral', ...DET, rx: 2, irr: 'glue' });
  const chain = (n, arc) => {
    const out = [], glues = [];
    for (let i = 0; i < n; i++) {
      const cx = 38 + i * 21, cy = arc ? 50 + Math.round(10 * Math.sin(Math.PI * i / (n - 1))) : 44;
      out.push(link(cx, cy)); glues.push(glueDot(cx, cy));
    }
    return [...out, ...glues];
  };
  return {
    id: 'paper-chain', setKind: 'desk', objects: ['sheet', 'scissors', 'strips', 'links'], tags: ['craft'], climate: null, excludeLocales: [],
    set: SETS.desk(),
    panels: [
      { rank: 1, irr: { cutStrip: 0, glue: 0 }, prop: [R(34, 36, 70, 52, { fill: 'coralSoft', ...OUT, rx: 2 }), scissors] },
      { rank: 2, irr: { cutStrip: 5, glue: 0 }, prop: [strip(34, -8), strip(47, -4), strip(60, 0), strip(73, 4), strip(86, 8), scissors] },
      { rank: 3, irr: { cutStrip: 5, glue: 2 }, prop: [...chain(2, false), strip(62, 0), strip(75, 0), strip(88, 0), scissors] },
      { rank: 4, irr: { cutStrip: 5, glue: 5 }, prop: [...chain(5, true), scissors] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 2, 4], n5: null,
  };
}

function flatTyre() {
  const wheel = (cx, flat, patch) => {
    const o = [];
    // the wheel: a white disc + teal spokes inside an INK rubber tyre (stroke 4)
    o.push(C(cx, 84, 15, { fill: 'white' }));
    for (const t of [0, 45, 90, 135].map((d) => d * Math.PI / 180)) o.push(L(r1(cx - 13 * Math.cos(t)), r1(84 - 13 * Math.sin(t)), r1(cx + 13 * Math.cos(t)), r1(84 + 13 * Math.sin(t)), { st: 'teal', sw: 1.5 }));
    o.push(C(cx, 84, 2.5, { fill: 'teal' }));
    if (flat) {
      // flat: the tyre keeps its round top and SAGS at the bottom into a wide flat bulge on the road
      o.push(P(`M${cx - 16},86 A16,16 0 0 1 ${cx + 16},86`, { fill: 'none', st: 'ink', sw: 4 }));
      o.push(P(`M${cx - 16},85 Q${cx - 17},92 ${cx - 21},100 L${cx + 21},100 Q${cx + 17},92 ${cx + 16},85 Q${cx},96 ${cx - 16},85 Z`, { fill: 'ink', irr: 'puncture' }));
    } else o.push(C(cx, 84, 16, { fill: 'none', st: 'ink', sw: 4 }));
    if (patch) o.push(R(cx - 6, 94, 12, 8, { fill: 'coral', ...DET, rx: 2, irr: 'patch' }));
    return o;
  };
  const bike = (x, { flat, patch, motion }) => {
    const back = x + 10, front = x + 52;
    return [
      ...(motion ? [L(x - 20, 70, x - 6, 70, { st: 'ink', sw: 2.5, cap: 'round' }), L(x - 16, 80, x - 4, 80, { st: 'ink', sw: 2.5, cap: 'round' })] : []),
      ...wheel(back, false, false), ...wheel(front, flat, patch),
      Poly([[back, 84], [x + 26, 84], [x + 44, 62], [x + 22, 62], [back, 84]], { fill: 'none', ...OUT, join: 'round' }),
      L(x + 26, 84, x + 20, 58, { st: 'teal', sw: 3 }), L(x + 44, 62, front, 84, { st: 'teal', sw: 3 }), L(x + 44, 62, x + 42, 54, { st: 'teal', sw: 3 }),
      R(x + 14, 54, 14, 5, { fill: 'ink', rx: 2 }), L(x + 38, 53, x + 48, 53, { st: 'ink', sw: 3.5, cap: 'round' }),
    ];
  };
  const nail = (x, y, lying) => lying
    ? G([R(x, y, 16, 3, { fill: 'ink' }), R(x - 3, y - 2.5, 3, 8, { fill: 'ink', rx: 1 })])
    : G([R(x - 1.5, y - 10, 3, 10, { fill: 'ink' }), R(x - 4, y - 12, 8, 3, { fill: 'ink', rx: 1 })]);
  return {
    id: 'flat-tyre', setKind: 'road', objects: ['bicycle', 'nail', 'patch', 'pump'], tags: ['repair'], climate: null, excludeLocales: [],
    set: SETS.road(),
    panels: [
      { rank: 1, irr: { puncture: 0, patch: 0 }, prop: [...bike(20, { motion: true }), nail(128, 100, false)] },
      { rank: 2, irr: { puncture: 1, patch: 0 }, prop: [...bike(64, { flat: true }), nail(122, 100, false)] },
      {
        rank: 3, irr: { puncture: 1, patch: 1 }, occluded: { puncture: 1 },
        prop: [...bike(64, { patch: true }), nail(14, 103, true), G([R(0, 0, 6, 34, { fill: 'teal', rx: 2 }), R(-3, -3, 12, 4, { fill: 'ink', rx: 1 })], { tf: 'translate(142 64) rotate(12)' })],
      },
    ],
    sub4: null, sub3: [1, 2, 3], n5: null,
  };
}

function beachWalk() {
  // fix round 2 (es panel: solid black ovals read as pebbles, the towel and the shell as nothing): a SCALLOP shell
  // (fan, scalloped rim, ribs, a hinge), a bigger striped towel with a fringe, and every footprint a FOOT (sole +
  // three toes pointing the way the child walks)
  const shell = (x, y) => G([
    P(`M${x - 11},${y} Q${x - 12},${y - 6} ${x - 8},${y - 10} Q${x - 6},${y - 13} ${x - 3},${y - 12} Q${x},${y - 15} ${x + 3},${y - 12} Q${x + 6},${y - 13} ${x + 8},${y - 10} Q${x + 12},${y - 6} ${x + 11},${y} Z`, { fill: 'coralSoft', ...OUT, join: 'round' }),
    L(x, y, x, y - 12, { st: 'teal', sw: 1.5 }), L(x, y, x - 6, y - 10, { st: 'teal', sw: 1.5 }), L(x, y, x + 6, y - 10, { st: 'teal', sw: 1.5 }),
    L(x, y, x - 10, y - 4, { st: 'teal', sw: 1.5 }), L(x, y, x + 10, y - 4, { st: 'teal', sw: 1.5 }),
    R(x - 4, y - 1, 8, 4, { fill: 'coralSoft', ...DET, rx: 1 }),
  ]);
  const W = (pose, x) => ({ k: 'walker', pose, x, y: 102, h: 54 });
  // a foot: sole + heel pad as one ink bean, three toes ahead of it (dir +1 = walking right, -1 = left)
  const foot = (x, y, dir) => G([
    E(x, y, 5, 3.4, { fill: 'ink' }), E(r1(x - dir * 5), y, 2.8, 2.6, { fill: 'ink' }),
    ...[-2.6, 0, 2.6].map((dy) => C(r1(x + dir * 7.2), r1(y + dy * 1.15), 1.5, { fill: 'ink' })),
  ], { irr: 'footprint' });
  const OUTTRAIL = [[64, 95], [76, 101], [88, 95], [100, 101], [112, 95], [124, 101]];
  const BACK = [[124, 110], [112, 115], [100, 110], [88, 115], [76, 110], [64, 115]];
  const prints = (list, dir) => list.map(([x, y]) => foot(x, y, dir));
  const towel = [
    R(8, 98, 42, 14, { fill: 'white', ...SETLINE, rx: 1 }),
    ...[14, 26, 38].map((x) => R(x, 98, 6, 14, { fill: 'tealSoft' })),
    ...[100, 104, 108].flatMap((y) => [L(4, y, 8, y, SETLINE), L(50, y, 54, y, SETLINE)]),
  ];
  return {
    id: 'beach-walk', setKind: 'sand', objects: ['walker', 'shell', 'footprints'], tags: ['outing'], climate: null, excludeLocales: [],
    set: [...SETS.sand(), ...towel],
    panels: [
      { rank: 1, irr: { footprint: 0 }, prop: [W('standing', 30), shell(140, 110)] },
      { rank: 2, irr: { footprint: 3 }, prop: [...prints(OUTTRAIL.slice(0, 3), 1), W('walking', 102), shell(140, 110)] },
      { rank: 3, irr: { footprint: 6 }, prop: [...prints(OUTTRAIL, 1), W('standing', 136), shell(146, 112)] },
      { rank: 4, irr: { footprint: 12 }, prop: [...prints(OUTTRAIL, 1), ...prints(BACK, -1), W('standing', 24), shell(40, 110)] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 3, 4], n5: null,
  };
}

function collageFish() {
  const base = [
    R(40, 22, 80, 58, { fill: 'white', ...OUT, rx: 3 }),
    E(72, 51, 22, 14, { fill: 'none', st: 'teal', sw: 2 }),
    Poly(pts('93,51 108,40 108,62'), { fill: 'none', st: 'teal', sw: 2, join: 'round' }),
  ];
  const glueStick = G([R(126, 74, 12, 28, { fill: 'white', ...OUT, rx: 2 }), R(126, 64, 12, 11, { fill: 'coral', ...OUT, rx: 2 })]);
  const SHAPES = ['0,0 11,-2 13,7 4,10 -1,6', '0,0 12,1 10,10 1,9', '0,1 9,-2 13,6 6,11 0,8', '0,0 12,0 12,9 3,11', '1,0 12,2 11,11 0,9', '0,2 10,0 13,9 2,10'];
  const COL = ['coral', 'teal', 'coral', 'teal', 'coral', 'teal'];
  const piece = (i, x, y, glued) => {
    const q = pts(SHAPES[i]).map(([a, b]) => [r1(a * 1.3 + x), r1(b * 1.3 + y)]);
    const out = [Poly(q, { fill: COL[i], ...DET, join: 'round', irr: 'torn' })];
    // the glue sheen: a short white diagonal highlight (8 x 8 units) on the glued piece
    if (glued) out.push(L(x + 4, y + 12, x + 12, y + 4, { st: 'white', sw: 2, cap: 'round', irr: 'glued' }));
    return out;
  };
  const LOOSE = [[26, 88], [44, 93], [62, 88], [80, 93], [98, 88], [110, 102]];
  const IN = [[52, 39], [52, 52], [67, 37], [67, 52], [81, 44], [95, 45]];
  const sheets = [R(32, 85, 38, 26, { fill: 'coral', ...OUT, rx: 2 }), R(76, 87, 38, 26, { fill: 'teal', ...OUT, rx: 2 })];
  return {
    id: 'collage-fish', setKind: 'desk', objects: ['sheets', 'glue stick', 'pieces', 'fish outline'], tags: ['craft'], climate: null, excludeLocales: [],
    set: SETS.desk(),
    panels: [
      { rank: 1, irr: { torn: 0, glued: 0 }, prop: [...base, ...sheets, glueStick] },
      { rank: 2, irr: { torn: 6, glued: 0 }, prop: [...base, ...LOOSE.flatMap(([x, y], i) => piece(i, x, y, false)), glueStick] },
      { rank: 3, irr: { torn: 6, glued: 3 }, prop: [...base, ...[0, 1, 2].flatMap((i) => piece(i, IN[i][0], IN[i][1], true)), ...[3, 4, 5].flatMap((i) => piece(i, LOOSE[i][0], LOOSE[i][1], false)), glueStick] },
      { rank: 4, irr: { torn: 6, glued: 6 }, prop: [...base, ...[0, 1, 2, 3, 4, 5].flatMap((i) => piece(i, IN[i][0], IN[i][1], true)), glueStick] },
    ],
    sub4: [1, 2, 3, 4], sub3: [1, 2, 4], n5: null,
  };
}

function hopscotch() {
  const S = 17;
  // top-left corners: 1, 1, 2, 1, 2 from the bottom
  const cells = [[71.5, 96], [71.5, 79], [63, 62], [80, 62], [71.5, 45], [63, 28], [80, 28]];
  // fix round 2 (en / de / fr / nl panels): the court is drawn in WHITE chalk lines on grey asphalt and the
  // stick that draws them is WHITE too (a round-ended chalk stick with a worn tip and a little dust), so the
  // stick and the lines read as one thing; the coral outlined squares under a dome read as a brick tower with a
  // head (de), so the dome is gone and the court ends on its last pair of squares.
  const sq = ([x, y]) => R(x, y, S, S, { fill: 'none', st: 'white', sw: 3.5, irr: 'square' });
  // the chalk stick lies at the lower right, tilted, and gets SHORTER as the court grows
  const chalk = (len) => G([
    R(146 - len, 103, len, 10, { fill: 'white', ...OUT, rx: 5 }),
    E(146 - len + 4, 108, 2.2, 3.2, { fill: 'tealSoft' }),               // the worn, used end
    ...[[146 - len - 6, 112], [146 - len - 10, 106]].map(([x, y]) => C(x, y, 1.6, { fill: 'white' })),   // chalk dust
  ], { tf: 'rotate(-14 130 108)' });
  const court = (n) => cells.slice(0, n).map(sq);
  return {
    id: 'hopscotch', setKind: 'pavement', objects: ['chalk', 'squares'], tags: ['play'], climate: null, excludeLocales: [],
    set: SETS.pavement(), anchor: 'center',
    panels: [
      { rank: 1, irr: { square: 0 }, prop: [chalk(36)] },
      { rank: 2, irr: { square: 2 }, prop: [...court(2), chalk(31)] },
      { rank: 3, irr: { square: 4 }, prop: [...court(4), chalk(27)] },
      { rank: 4, irr: { square: 5 }, prop: [...court(5), chalk(23)] },
      { rank: 5, irr: { square: 7 }, prop: [...court(7), chalk(19)] },
    ],
    sub4: [1, 2, 3, 5], sub3: [1, 3, 5], n5: [1, 2, 3, 4, 5],
  };
}

const ALL_POOLS = ['base', 'first-next-last-cut', 'what-happens-next', 'beginning-middle-end', 'sequencing-sentences', 'retell-with-starters'];
const SENTENCE_POOL = ['apple', 'banana', 'sandwich', 'cake', 'fence', 'letter', 'paper-chain', 'beach-walk'];

function withPools(s) {
  const pools = [];
  if (s.sub4) pools.push('base');
  pools.push('first-next-last-cut', 'beginning-middle-end');
  if (s.sub4 && s.sub4.join('') === '1234') pools.push('what-happens-next');
  if (SENTENCE_POOL.includes(s.id)) pools.push('sequencing-sentences', 'retell-with-starters');
  for (const p of s.panels) if (!p.occluded) p.occluded = {};
  return { ...s, pools: ALL_POOLS.filter((m) => pools.includes(m)) };
}

const COMMON = {
  stories: [apple(), banana(), sandwich(), cake(), drawing(), fence(), snowman(), letter(), paperChain(), beachWalk(), collageFish(), hopscotch()].map(withPools),
  /** Stories drawn, read at the base card size, and DROPPED (lead review 2026-09-23). Nobody re-proposes them. */
  DROPPED: [
    { id: 'present', reason: 'panel 3 (torn paper, open box, ball, tape) read as an unreadable jumble at 144 px; the wrapping step (tape strips) is a small change on a busy page. A non-reader could not point at what changed.' },
    { id: 'flat-tyre', reason: 'a child could not see what happened: the puncture, the flat and the repair were three small changes at the wheel; the story needs a pump attached and a squashed tyre drawn larger than a 144 px card allows, and a repair is a procedure.' },
  ],
  IRREVERSIBLE: ['bite', 'peelStrip', 'spread', 'cut', 'crumb', 'cutFace', 'line', 'fill', 'painted', 'track', 'cardMark', 'stamp', 'address',
    'tape', 'torn', 'cutStrip', 'glue', 'puncture', 'patch', 'footprint', 'glued', 'square'],
  EXCLUDED_TAGS: ['growth', 'hatch', 'melt', 'weather', 'cooking-heat', 'hygiene', 'road-safety', 'procedure', 'holiday', 'face', 'emotion', 'tale'],
  FORBIDDEN_KINDS: ['eye', 'mouth', 'brow', 'face', 'text', 'numeral', 'letter'],
  SET_FILLS: ['white', 'cream', 'creamDeep', 'tealSoft', 'grid', 'none'],
  // `grid` joins the §2 prop fills because §2 itself draws the snowman's TRACKS as grid bands (bare ground)
  PROP_FILLS: ['white', 'codeYellow', 'coral', 'coralSoft', 'teal', 'tealSoft', 'ink', 'grid', 'none'],
  PROP_STROKES: ['teal', 'ink', 'white', 'coral', 'codeYellow', 'coralSoft'],
  SCRAMBLE4: { 1342: 0.146, 1423: 0.104, 2314: 0.104, 2431: 0.073, 3124: 0.146, 3241: 0.104, 3421: 0.073, 4132: 0.104, 4213: 0.073, 4312: 0.073 },
  SCRAMBLE3: ['132', '213', '231', '312'],
  /**
   * F1 CUT STRIPS (fix round 2, nl panel: both shipped strips were a one-step ROTATION of the answer order, so
   * "move the first card to the end" solved them unread). A strip is never the identity and never a rotation
   * (231 / 312). What is left at n = 3 is the three transpositions 132 / 213 / 321; drawn uniformly they form a
   * Latin square: every picture lands in every strip position with p = 1/3 and any fixed recipe ("read it
   * backwards", "swap the first two") solves exactly one strip in three — the floor at n = 3. The reverse 321 is
   * the base law's forbidden row; it is admitted HERE ONLY because dropping it leaves 132 / 213, where "swap the
   * first two" solves one strip in two and the first picture is never the rightmost card (measured in the gate).
   */
  STRIP3: ['132', '213', '321'],
  /**
   * F2 TRAY (fix round 2, en / nl panels): the "other story" foil is that story's LAST panel shown at 108 px;
   * the cake's last panel is crumbs + candles on a stand, which nobody can name at that size ("crumbs on a
   * plate beside a small striped object"). Hand-read from the renders; the gate enforces it.
   */
  TRAY_ILLEGIBLE: ['cake'],
  MODES: ALL_POOLS,
  SENTENCE_POOL,
  /**
   * PARTS — what each story DRAWS (hand-read claim table, fix round 1): the only things a word bank may name.
   * Every locale's stories.<id>.helpIds (parallel to helpWords) must come from here (validator rule 11).
   */
  PARTS: {
    apple: ['apple', 'bite', 'core', 'stem', 'leaf', 'plate', 'seed'],
    banana: ['banana', 'peel', 'strip', 'plate', 'stem', 'flesh'],
    sandwich: ['bread', 'slice', 'jam', 'knife', 'sandwich', 'half', 'crust', 'crumb', 'board', 'jar', 'cheese', 'bite'],
    cake: ['cake', 'slice', 'half', 'crumb', 'candle', 'stand', 'plate', 'icing', 'layer'],
    drawing: ['sheet', 'crayon', 'house', 'sun', 'tree', 'roof', 'door', 'picture'],
    fence: ['fence', 'plank', 'paint', 'brush', 'pot', 'bucket', 'hand', 'grass', 'garden'],
    snowman: ['snow', 'snowball', 'snowman', 'track', 'hat', 'carrot', 'nose', 'arm', 'button'],
    letter: ['card', 'flower', 'pencil', 'writing', 'envelope', 'stamp', 'letter'],
    'paper-chain': ['paper', 'sheet', 'scissors', 'strip', 'glue', 'ring', 'chain'],
    'beach-walk': ['sand', 'towel', 'shell', 'footprint', 'child', 'walk', 'beach', 'cloud'],
    'collage-fish': ['fish', 'sheet', 'paper', 'piece', 'glue', 'glue stick'],
    hopscotch: ['chalk', 'square', 'pavement', 'hopscotch'],
  },
};

/* ------------------------------------------------------------------ the EN block (a SOURCE TO AUDIT) */
const STORY_SEQUENCING = {
  en: {
    words3: ['First', 'Next', 'Last'],
    openers4: ['First,', 'Next,', 'Then,', 'Last,'],
    starters4: ['First,', 'Next,', 'Then,', 'Finally,'],
    bme: ['Beginning', 'Middle', 'End'],
    stories: {
      apple: {
        sentences: ['First, the apple is whole.', 'Next, the apple has one bite.', 'Then, the apple has three bites.', 'Last, only the core is left.'],
        stateWords: ['whole', 'one bite', 'three bites', 'core'],
        helpWords: ['apple', 'bite', 'core', 'stem', 'leaf', 'plate'],
        helpIds: ['apple', 'bite', 'core', 'stem', 'leaf', 'plate'],
      },
      banana: {
        sentences: ['First, the banana is not peeled.', 'Next, one strip of peel hangs down.', 'Then, three strips hang down.', 'Last, only the empty peel is left.'],
        stateWords: ['not peeled', 'one strip', 'three strips', 'empty peel'],
        helpWords: ['banana', 'peel', 'strip', 'plate'],
        helpIds: ['banana', 'peel', 'strip', 'plate'],
      },
      sandwich: {
        sentences: ['First, there are two slices of bread.', 'Next, one slice has jam on it.', 'Then, the sandwich is cut in half.', 'Last, only a crust and crumbs are left.'],
        stateWords: ['two slices', 'jam', 'cut in half', 'crumbs'],
        helpWords: ['bread', 'jam', 'knife', 'sandwich', 'half', 'crust'],
        helpIds: ['bread', 'jam', 'knife', 'sandwich', 'half', 'crust'],
      },
      cake: {
        sentences: ['First, the cake is whole.', 'Next, one slice is cut out.', 'Then, half of the cake is gone.', 'Last, only crumbs are left.'],
        stateWords: ['whole', 'one slice', 'half', 'crumbs'],
        helpWords: ['cake', 'slice', 'candles', 'crumbs', 'stand'],
        helpIds: ['cake', 'slice', 'candle', 'crumb', 'stand'],
      },
      fence: {
        sentences: ['First, the fence is all white.', 'Next, two planks are painted.', 'Then, four planks are painted.', 'Last, the whole fence is painted.'],
        stateWords: ['all white', 'two planks', 'four planks', 'whole fence'],
        helpWords: ['fence', 'plank', 'paint', 'brush', 'bucket'],
        helpIds: ['fence', 'plank', 'paint', 'brush', 'bucket'],
      },
      letter: {
        sentences: ['First, the card is blank.', 'Next, a flower is drawn on the card.', 'Then, three lines of writing are added.', 'Last, the card is in an envelope with a stamp.'],
        stateWords: ['blank', 'flower', 'writing', 'stamp'],
        helpWords: ['card', 'flower', 'pencil', 'envelope', 'stamp'],
        helpIds: ['card', 'flower', 'pencil', 'envelope', 'stamp'],
      },
      'paper-chain': {
        sentences: ['First, there is one sheet of paper.', 'Next, the sheet is cut into five strips.', 'Then, two strips are glued into rings.', 'Last, all five rings make a chain.'],
        stateWords: ['one sheet', 'five strips', 'two strips', 'chain'],
        helpWords: ['paper', 'scissors', 'strips', 'glue', 'rings', 'chain'],
        helpIds: ['paper', 'scissors', 'strip', 'glue', 'ring', 'chain'],
      },
      'beach-walk': {
        sentences: ['First, there are no footprints in the sand.', 'Next, a child walks and leaves three footprints.', 'Then, the child finds a shell.', 'Last, the child is back with the shell on the towel.'],
        stateWords: ['no footprints', 'three footprints', 'finds a shell', 'back'],
        helpWords: ['sand', 'towel', 'shell', 'footprints', 'walk'],
        helpIds: ['sand', 'towel', 'shell', 'footprint', 'walk'],
      },
    },
    excludeStories: [],
    strings: {
      base: { title: 'Story Sequencing: Number the Pictures', instruction: 'Look at what changes in each story, then write the numbers in the boxes to put the pictures in order.' },
      'first-next-last-cut': { title: 'Story Sequencing Cut and Paste: First, Next, Last', instruction: 'Cut out the pictures on each strip and glue them on the line with the same mark, in the empty frames above First, Next and Last.' },
      'what-happens-next': { title: 'Story Sequencing: What Happens Next?', instruction: "Look at each story's three pictures, then circle the picture below them that belongs in the ? frame." },
      'beginning-middle-end': { title: 'Beginning, Middle and End of a Story', instruction: 'Look at the beginning and the end of each story and draw what happens in the middle frame.' },
      'sequencing-sentences': { title: 'Story Sequencing Sentences: Match the Pictures', instruction: "Number each story's sentences in order in the boxes, then draw a line from every sentence to its picture." },
      'retell-with-starters': { title: 'Retell the Story with Starters', instruction: 'Write what happens in each picture on its lines, starting with the word printed on the first line.' },
    },
  },
};

COMMON.backdrop = backdrop;
COMMON.SKY = SKY;
module.exports = { STORY_SEQUENCING, COMMON, SETS, backdrop, SKY };

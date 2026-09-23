/**
 * plant-figure.js — the G1-376 `plants` apparatus (nt10-E, b5). Pure SVG on
 * primitives/_tokens.js; Node-testable. Design (the contract):
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §2 "NEW primitives/plant-figure.js";
 * every ruling in _work/G1-376-critic.md; build record _work/G1-376-build.md.
 *
 * ONE drawing language for all four drawings: outline teal 3 PX at every size
 * (user units = 3/scale — the body-figure rule), round caps + joins; detail
 * lines (veins, root hairs, pod seam, hilum, window rim) 1.5 px; root laterals
 * 2.5 px. Fills: leaves + sepals + pod skin tealSoft, petals white, flower
 * centre creamDeep with 5 grid dots, SEEDS teal (the only solid dark fill, so a
 * seed is findable in mono), stem white, soil creamDeep, pebbles grid, pot
 * creamDeep. Coral appears ONLY in `tags` (never in the plant). No text in any
 * drawing except the tag numerals. No hex outside the tokens.
 *
 *   plantFigure({ stage='full'|'flowering', ground='box'|'none', h=600, tags=[], ring=null, id })
 *     -> { svg, width, height, scale, anchors, tagSlots, rings }
 *     viewBox 0 0 320 600, midline x 160, SOIL LINE y 440; scale = h/600.
 *     tags [{ part, n, pick:0|1 }]  a coral numbered tag at TAG_SLOTS[part][pick]
 *       on a teal 1.5 px thread that ends on a teal ring r 8 px round the
 *       anchor ANCHORS[part][pick]. Returned `anchors[part]` / `tagSlots[part]`
 *       are PX relative to the svg's top-left (= viewBox units x scale).
 *     ring { cx, cy, r } (units) a teal dashed circle (the F5 inset's "look here").
 *     MIN_H 180 (throws below: the F5 inset is the smallest caller).
 *   plantStage({ stage, w=116, potted=false, id })        viewBox 0 0 200 240, h = w x 1.2
 *     stage seed | sprout | seedling | young | flowering | fruiting; root stamps
 *     data-lcs-figure="plant-<stage>" (+ data-lcs-potted).
 *   flowerSection({ h=418, tags=[] })                     viewBox 0 0 400 440
 *     the cut-away cup flower; tags [{ part, n }] over FLOWER_ANCHORS.
 *   plantPartIcon({ part, size=32 })                      viewBox 0 0 64 64
 *
 * Deviations from the design table (each measured; recorded in _work/G1-376-build.md):
 *   sepals  the table's "L 16 W 9 from (160,86) at 120 / 60 degrees" lies wholly
 *           under petals 2 and 3 (their bodies reach y 106) and never shows; the
 *           two sepals are drawn in the petal GAPS at 108 / 252 degrees (radius
 *           12 -> 50 from the centre, W 11) so they peek out between the petals
 *           (sepals alternate with petals — the botany and the reading agree).
 *   glints  mirrored to the upper-right corner (the root-B thread crossed the left pair).
 *   root-B  tag slot (21,476) not (24,476): the disc cleared the soil box wall by 0.5 units.
 *   window  the pod's cut-away is the capsule inset 5 as a ROTATED rounded rect
 *           over the axis y 262..332 (not a horizontal clip), so its rim follows
 *           the pod instead of cutting it with two flat edges.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;

const VB_W = 320, VB_H = 600, MID = 160, SOIL_Y = 440, MIN_H = 180, MAX_H = 760;
const TAG_R = 15, TAG_HALO = 19, TAG_PX = 18, RING_R = 8, THREAD_PX = 1.5, RING_PX = 2.5, TAG_MIN_GAP = 32;
const PARTS = ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'];

/* ---------------------------------------------------------------- geometry (viewBox units) */
const BOX = { x: 40, y: 440, w: 240, h: 152, rx: 14 };
// glints MIRRORED to the upper-RIGHT corner (design: (52,462)-(70,452), (52,476)-(60,471)): measured, the
// root-B thread runs at y 476 straight through the second left glint, and a white dash under a thread reads as a
// broken line; on the right no thread passes above y 494.
const GLINTS = [[[268, 462], [250, 452]], [[268, 476], [260, 471]]];
const PEBBLES = [[70, 520], [236, 468], [250, 560], [96, 578], [212, 584], [128, 454]];
const PEBBLE = { rx: 5, ry: 3.5 };
const STEM_D = 'M 155 440 Q 152 270 156.5 100 L 163.5 100 Q 160 270 165 440 Z';
const LEAVES = {
  N5: { base: [152, 162], c1: [118, 118], tip: [76, 132], c2: [110, 176] },
  N4: { base: [164, 174], c1: [200, 128], tip: [244, 140], c2: [208, 188] },
  N2: { base: [164, 316], c1: [206, 266], tip: [252, 282], c2: [214, 330] },
  N1: { base: [152, 408], c1: [116, 362], tip: [70, 372], c2: [104, 420] },
};
const FLOWER = { cx: 160, cy: 64, discR: 14, petalRx: 15, petalRy: 24, petalDist: 28, petals: 5, dotR: 2, dotRing: 7 };
const SEPALS = [{ deg: 108 }, { deg: 252 }];
const SEPAL = { r0: 12, r1: 50, w: 11 };
const POD_STALK = 'M 156 232 Q 128 226 112 244';
const POD = { a: [110, 250], b: [98, 344], w: 30 };
const POD_WINDOW = { y0: 262, y1: 332, inset: 5, rx: 8 };
const POD_SEEDS = [[107.6, 268.8], [105.2, 287.6], [102.8, 306.4], [100.4, 325.2]];
const SEED_R = 7;
const TAPROOT = 'M 160 440 C 162 480 156 520 160 580';
const LATERALS = [
  { p0: [159, 462], c: [130, 470], p1: [104, 500] },
  { p0: [158, 500], c: [128, 516], p1: [112, 556] },
  { p0: [161, 470], c: [192, 478], p1: [218, 506] },
  { p0: [159, 530], c: [186, 542], p1: [204, 574] },
];
const HAIR_T = [0.5, 0.8], HAIR_LEN = 6;

/** Candidate anchors (units) per part and the tag slot each one pulls its thread to. */
const ANCHORS = {
  flower: [{ x: 190, y: 54, slot: { x: 272, y: 40 }, where: 'petal 1' }, { x: 130, y: 54, slot: { x: 48, y: 40 }, where: 'petal 4' }],
  leaf: [{ x: 205, y: 156, slot: { x: 296, y: 156 }, where: 'blade N4' }, { x: 111, y: 390, slot: { x: 24, y: 392 }, where: 'blade N1' }],
  stem: [{ x: 159, y: 220, slot: { x: 296, y: 220 }, where: 'stem' }, { x: 157, y: 200, slot: { x: 24, y: 200 }, where: 'stem' }],
  root: [{ x: 205, y: 494, slot: { x: 296, y: 500 }, where: 'right lateral' }, { x: 130, y: 476, slot: { x: 21, y: 476 }, where: 'left lateral' }],   // slot x 21 not 24: at 24 the disc (r 15) touched the box wall (x 38.5..41.5)
  // landing review 2026-09-23 (en/de/es/pt/fr/it): the old ring on the solid pod TIP (99,348) sat wholly inside the pod
  // below the seed row and read as a fifth seed. The fruit ring now STRADDLES the pod's upper-left WALL (3 units inside
  // the skin, above the window) — part of it outside the pod, so it marks the pod, never a bead in it.
  fruit: [{ x: 98.1, y: 248.5, slot: { x: 24, y: 248 }, where: 'pod wall (upper left)' }],
  seed: [{ x: 105.2, y: 287.6, slot: { x: 24, y: 296 }, where: 'seed 2' }],
};
const TAG_SLOTS = Object.fromEntries(Object.entries(ANCHORS).map(([p, list]) => [p, list.map((a) => a.slot)]));

/* ---------------------------------------------------------------- small helpers */
const f1 = (n) => +(+n).toFixed(2);
const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
const q = (p0, c, p1, t) => [(1 - t) * (1 - t) * p0[0] + 2 * t * (1 - t) * c[0] + t * t * p1[0], (1 - t) * (1 - t) * p0[1] + 2 * t * (1 - t) * c[1] + t * t * p1[1]];
const qd = (p0, c, p1, t) => [2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]), 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const rad = (deg) => deg * Math.PI / 180;
/** A direction `deg` degrees CLOCKWISE from straight up (y grows downward). */
const dirCw = (deg) => [Math.sin(rad(deg)), -Math.cos(rad(deg))];

function pathEl(d, fill, stroke, sw, extra) {
  return el('path', { d, fill: fill || 'none', stroke: stroke || undefined, 'stroke-width': stroke ? f1(sw) : undefined, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...(extra || {}) });
}
function leafD(L) { return `M ${pt(L.base)} Q ${pt(L.c1)} ${pt(L.tip)} Q ${pt(L.c2)} ${pt(L.base)} Z`; }
/** A leaf-shaped blade from `from` along unit `dir`, length L, max width W (two quads, controls at mid +- W). */
function bladeD(from, dir, L, W) {
  const n = [-dir[1], dir[0]];
  const tip = [from[0] + dir[0] * L, from[1] + dir[1] * L];
  const mid = [from[0] + dir[0] * L * 0.45, from[1] + dir[1] * L * 0.45];
  const c1 = [mid[0] + n[0] * W, mid[1] + n[1] * W], c2 = [mid[0] - n[0] * W, mid[1] - n[1] * W];
  return { d: `M ${pt(from)} Q ${pt(c1)} ${pt(tip)} Q ${pt(c2)} ${pt(from)} Z`, tip };
}
/** A capsule (stadium) path around axis a->b with half-width r. */
function capsuleD(a, b, r) {
  const u = norm([b[0] - a[0], b[1] - a[1]]), n = [-u[1], u[0]];
  const A1 = [a[0] + n[0] * r, a[1] + n[1] * r], B1 = [b[0] + n[0] * r, b[1] + n[1] * r];
  const B2 = [b[0] - n[0] * r, b[1] - n[1] * r], A2 = [a[0] - n[0] * r, a[1] - n[1] * r];
  return `M ${pt(A1)} L ${pt(B1)} A ${r} ${r} 0 0 0 ${pt(B2)} L ${pt(A2)} A ${r} ${r} 0 0 0 ${pt(A1)} Z`;
}
/** A rounded rect of width w centred on the axis a->b between the axis points at y0 and y1, as a rotated <rect>. */
function axisWindow(a, b, y0, y1, w, rx, attrs) {
  const atY = (y) => { const t = (y - a[1]) / (b[1] - a[1]); return [a[0] + (b[0] - a[0]) * t, y]; };
  const p0 = atY(y0), p1 = atY(y1);
  const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
  const c = lerp(p0, p1, 0.5);
  const ang = Math.atan2(p1[0] - p0[0], p1[1] - p0[1]) * -180 / Math.PI;   // rotation from vertical, SVG clockwise-positive
  return el('rect', { x: f1(c[0] - w / 2), y: f1(c[1] - len / 2), width: f1(w), height: f1(len), rx, ry: rx, transform: `rotate(${f1(ang)} ${f1(c[0])} ${f1(c[1])})`, ...attrs });
}
/** Leaf veins: the midrib base->tip + one side vein each side (from the midrib at 0.38 / 0.62 toward the edge, leaning to the tip). */
function leafVeins(L, sw) {
  const out = [pathEl(`M ${pt(L.base)} L ${pt(L.tip)}`, null, T.teal, sw)];
  [[0.36, L.c1], [0.6, L.c2]].forEach(([f, c]) => {
    const m = lerp(L.base, L.tip, f);
    const edge = q(L.base, c, L.tip, Math.min(0.95, f + 0.16));
    const end = lerp(edge, lerp(L.base, L.tip, f + 0.16), 0.32);
    out.push(pathEl(`M ${pt(m)} L ${pt(end)}`, null, T.teal, sw));
  });
  return out.join('');
}

/* ---------------------------------------------------------------- the full plant */
function drawFlower(sw3, sw15, cx, cy, s) {
  // s = the flower's size factor (1 on the tall plant)
  const out = [];
  for (const sp of SEPALS) {
    const dir = dirCw(sp.deg);
    const from = [cx + dir[0] * SEPAL.r0 * s, cy + dir[1] * SEPAL.r0 * s];
    const b = bladeD(from, dir, (SEPAL.r1 - SEPAL.r0) * s, SEPAL.w * s);
    out.push(pathEl(b.d, T.tealSoft, T.teal, sw3, { 'data-lcs-sepal': sp.deg }));
  }
  for (let k = 0; k < FLOWER.petals; k++) {
    const deg = 72 * k, dir = dirCw(deg);
    const pcx = cx + dir[0] * FLOWER.petalDist * s, pcy = cy + dir[1] * FLOWER.petalDist * s;
    out.push(el('ellipse', { cx: f1(pcx), cy: f1(pcy), rx: f1(FLOWER.petalRx * s), ry: f1(FLOWER.petalRy * s), transform: `rotate(${deg} ${f1(pcx)} ${f1(pcy)})`, fill: T.white, stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-petal': k + 1 }));
  }
  out.push(el('circle', { cx, cy, r: f1(FLOWER.discR * s), fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3) }));
  for (let k = 0; k < 5; k++) {
    const d = dirCw(36 + 72 * k);
    out.push(el('circle', { cx: f1(cx + d[0] * FLOWER.dotRing * s), cy: f1(cy + d[1] * FLOWER.dotRing * s), r: f1(Math.max(FLOWER.dotR * s, 1.2)), fill: T.grid }));
  }
  return out.join('');
}

function plantFigure({ stage = 'full', ground = 'box', h = 600, tags = [], ring = null, id } = {}) {
  if (!(stage === 'full' || stage === 'flowering')) throw new Error(`plant-figure: stage "${stage}" is not full | flowering`);
  if (!(ground === 'box' || ground === 'none')) throw new Error(`plant-figure: ground "${ground}" is not box | none`);
  if (!(h >= MIN_H)) throw new Error(`plant-figure: h ${h} < MIN_H ${MIN_H} (the seed disc falls under 2 px)`);
  if (h > MAX_H) throw new Error(`plant-figure: h ${h} > MAX_H ${MAX_H}`);
  const scale = h / VB_H;
  const width = VB_W * scale;
  const u = (px) => px / scale;                   // px -> units
  const sw3 = u(tokens.stroke.primitive), sw25 = u(2.5), sw15 = u(tokens.stroke.grid);
  const parts = [];

  // tags: validate first (the composer's mistakes throw here, not in the render)
  const seen = new Set(), nums = new Set();
  const placed = [];
  for (const t of tags) {
    if (!PARTS.includes(t.part)) throw new Error(`plant-figure: unknown tag part "${t.part}"`);
    if (seen.has(t.part)) throw new Error(`plant-figure: part "${t.part}" tagged twice`);
    if (nums.has(t.n)) throw new Error(`plant-figure: tag number ${t.n} used twice`);
    if (stage === 'flowering' && (t.part === 'fruit' || t.part === 'seed')) throw new Error(`plant-figure: the flowering stage has no ${t.part} to tag`);
    const list = ANCHORS[t.part];
    const pick = t.pick == null ? 0 : t.pick;
    if (!list[pick]) throw new Error(`plant-figure: part "${t.part}" has no anchor ${pick}`);
    seen.add(t.part); nums.add(t.n);
    placed.push({ part: t.part, n: t.n, pick, a: list[pick], s: list[pick].slot });
  }
  for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
    const d = Math.hypot(placed[i].s.x - placed[j].s.x, placed[i].s.y - placed[j].s.y) * scale;
    if (d < TAG_MIN_GAP) throw new Error(`plant-figure: tags ${placed[i].part} and ${placed[j].part} are ${d.toFixed(1)} px apart (< ${TAG_MIN_GAP})`);
  }

  // 1 ground fill
  if (ground === 'box') parts.push(el('rect', { x: BOX.x, y: BOX.y, width: BOX.w, height: BOX.h, rx: BOX.rx, ry: BOX.rx, fill: T.creamDeep, 'data-lcs-soil': 'fill' }));
  // 2 roots (below the soil line only)
  const roots = [pathEl(TAPROOT, null, T.teal, sw3, { 'data-lcs-root': 'tap' })];
  LATERALS.forEach((Lt, i) => {
    roots.push(pathEl(`M ${pt(Lt.p0)} Q ${pt(Lt.c)} ${pt(Lt.p1)}`, null, T.teal, sw25, { 'data-lcs-root': 'lateral-' + (i + 1) }));
    HAIR_T.forEach((t, k) => {
      const p = q(Lt.p0, Lt.c, Lt.p1, t), d = norm(qd(Lt.p0, Lt.c, Lt.p1, t));
      let n = [-d[1], d[0]]; if (n[1] < 0) n = [-n[0], -n[1]];   // hairs hang down-and-out
      const e = [p[0] + (n[0] * 0.8 + d[0] * 0.6) * HAIR_LEN, p[1] + (n[1] * 0.8 + d[1] * 0.6) * HAIR_LEN];
      roots.push(pathEl(`M ${pt(p)} L ${pt(e)}`, null, T.teal, sw15, { 'data-lcs-root': 'hair' }));
    });
  });
  parts.push(`<g data-lcs-part="root">${roots.join('')}</g>`);
  // 3 ground stroke + glints + pebbles (over the roots so they read as inside the glass)
  if (ground === 'box') {
    parts.push(el('rect', { x: BOX.x, y: BOX.y, width: BOX.w, height: BOX.h, rx: BOX.rx, ry: BOX.rx, fill: 'none', stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-soil': 'box' }));
    for (const [a, b] of GLINTS) parts.push(pathEl(`M ${pt(a)} L ${pt(b)}`, null, T.white, sw3, { 'data-lcs-glint': '1' }));
    for (const [x, y] of PEBBLES) parts.push(el('ellipse', { cx: x, cy: y, rx: PEBBLE.rx, ry: PEBBLE.ry, fill: 'none', stroke: T.grid, 'stroke-width': f1(sw15), 'data-lcs-pebble': '1' }));
  }
  // 4 stem
  parts.push(`<g data-lcs-part="stem">${pathEl(STEM_D, T.white, T.teal, sw3)}</g>`);
  // 5 leaves
  parts.push(`<g data-lcs-part="leaf">` + Object.entries(LEAVES).map(([k, L]) =>
    `<g data-lcs-leaf="${k}">${pathEl(leafD(L), T.tealSoft, T.teal, sw3)}${leafVeins(L, sw15)}</g>`).join('') + `</g>`);
  // 6-9 pod stalk, pod, window, seeds
  if (stage === 'full') {
    parts.push(`<g data-lcs-part="fruit">` +
      pathEl(POD_STALK, null, T.teal, sw3, { 'data-lcs-pod': 'stalk' }) +
      pathEl(capsuleD(POD.a, POD.b, POD.w / 2), T.tealSoft, T.teal, sw3, { 'data-lcs-pod': 'skin' }) +
      (() => { const uu = norm([POD.b[0] - POD.a[0], POD.b[1] - POD.a[1]]), n = [-uu[1], uu[0]], o = POD.w / 2 - 4;
        return pathEl(`M ${pt([POD.a[0] - n[0] * o, POD.a[1] - n[1] * o])} L ${pt([POD.b[0] - n[0] * o, POD.b[1] - n[1] * o])}`, null, T.teal, sw15, { 'data-lcs-pod': 'seam' }); })() +
      axisWindow(POD.a, POD.b, POD_WINDOW.y0, POD_WINDOW.y1, POD.w - 2 * POD_WINDOW.inset, POD_WINDOW.rx, { fill: T.white, stroke: T.teal, 'stroke-width': f1(sw15), 'data-lcs-pod': 'window' }) +
      `</g>`);
    parts.push(`<g data-lcs-part="seed">` + POD_SEEDS.map(([x, y], i) => el('circle', { cx: x, cy: y, r: SEED_R, fill: T.teal, 'data-lcs-seed': i + 1 })).join('') + `</g>`);
  }
  // 10 flower
  parts.push(`<g data-lcs-part="flower">${drawFlower(sw3, sw15, FLOWER.cx, FLOWER.cy, 1)}</g>`);
  // optional dashed ring (F5 inset)
  if (ring) parts.push(el('circle', { cx: ring.cx, cy: ring.cy, r: ring.r, fill: 'none', stroke: T.teal, 'stroke-width': f1(u(2)), 'stroke-dasharray': `${f1(u(6))} ${f1(u(5))}`, 'data-lcs-look-ring': '1' }));

  // 11 tags: threads first (under every tag), then the end rings, then the tag discs
  const anchors = {}, tagSlots = {}, rings = {};
  const threads = [], ends = [], discs = [];
  for (const t of placed) {
    const A = [t.a.x, t.a.y], S = [t.s.x, t.s.y];
    const dir = norm([A[0] - S[0], A[1] - S[1]]);
    const start = [S[0] + dir[0] * u(TAG_R), S[1] + dir[1] * u(TAG_R)];
    const end = [A[0] - dir[0] * u(RING_R), A[1] - dir[1] * u(RING_R)];
    threads.push(el('line', { x1: f1(start[0]), y1: f1(start[1]), x2: f1(end[0]), y2: f1(end[1]), stroke: T.teal, 'stroke-width': f1(u(THREAD_PX)), 'stroke-linecap': 'round', 'data-lcs-thread': t.part }));
    ends.push(el('circle', { cx: f1(A[0]), cy: f1(A[1]), r: f1(u(RING_R)), fill: 'none', stroke: T.white, 'stroke-width': f1(u(5)) }) +
      el('circle', { cx: f1(A[0]), cy: f1(A[1]), r: f1(u(RING_R)), fill: 'none', stroke: T.teal, 'stroke-width': f1(u(RING_PX)), 'data-lcs-ring': t.part }));
    discs.push(`<g data-lcs-tag data-lcs-part="${esc(t.part)}" data-lcs-n="${t.n}" data-lcs-pick="${t.pick}">` +
      el('circle', { cx: S[0], cy: S[1], r: f1(u(TAG_HALO - 2)), fill: T.white, stroke: T.white, 'stroke-width': f1(u(4)) }) +
      el('circle', { cx: S[0], cy: S[1], r: f1(u(TAG_R)), fill: T.coral, 'data-lcs-tag-disc': t.part }) +
      el('text', { x: S[0], y: f1(S[1] + u(1)), 'font-family': `${F.display}, cursive`, 'font-size': f1(u(TAG_PX)), 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(t.n)) +
      `</g>`);
    anchors[t.part] = { x: f1(A[0] * scale), y: f1(A[1] * scale) };
    tagSlots[t.part] = { x: f1(S[0] * scale), y: f1(S[1] * scale) };
    rings[t.part] = { r: RING_R };
  }
  if (placed.length) parts.push(`<g data-lcs-threads>${threads.join('')}${ends.join('')}</g><g data-lcs-tags>${discs.join('')}</g>`);

  const svg = svgRoot({ width: f1(width), height: f1(h), viewBox: `0 0 ${VB_W} ${VB_H}`, label: 'a plant with its roots in the soil' }, parts,
    { 'data-lcs-plant': '', 'data-lcs-stage': stage, 'data-lcs-ground': ground, 'data-lcs-plant-h': h, 'data-lcs-scale': f1(scale).toString(), 'data-lcs-soil-y': f1(SOIL_Y * scale), id: id || undefined, style: 'display:block;overflow:visible' });
  return { svg, width: f1(width), height: h, scale, anchors, tagSlots, rings };
}

/* ---------------------------------------------------------------- growth stages (F1 / F2) */
const ST = { vbW: 200, vbH: 240, groundY: 150 };
function plantStage({ stage, w = 116, potted = false, id } = {}) {
  const STAGES = ['seed', 'sprout', 'seedling', 'young', 'flowering', 'fruiting'];
  if (!STAGES.includes(stage)) throw new Error(`plant-figure: plantStage stage "${stage}" is not one of ${STAGES.join(' ')}`);
  if (potted && (stage === 'seed' || stage === 'sprout')) throw new Error('plant-figure: a potted stage shows a plant above the soil (seedling or later)');
  if (!(w >= 60)) throw new Error(`plant-figure: plantStage w ${w} < 60`);
  const h = w * 1.2, scale = w / ST.vbW, u = (px) => px / scale;
  const sw3 = u(3), sw25 = u(2.5), sw15 = u(1.5);
  const tube = (d, wu) => pathEl(d, null, T.teal, wu + 2 * sw3, { 'data-lcs-tube': 'out' }) + pathEl(d, null, T.white, wu, { 'data-lcs-tube': 'in' });
  const out = [];
  // ground
  if (potted) {
    out.push(pathEl('M 48 156 L 152 156 L 138 232 L 62 232 Z', T.creamDeep, T.teal, sw3, { 'data-lcs-pot': 'body' }));
    out.push(el('rect', { x: 42, y: 140, width: 116, height: 16, rx: 4, ry: 4, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-pot': 'rim' }));
    out.push(el('ellipse', { cx: 100, cy: 150, rx: 50, ry: 6, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw15), 'data-lcs-pot': 'soil' }));
  } else {
    out.push(pathEl('M 8 150 L 192 150 L 192 218 Q 192 232 178 232 L 22 232 Q 8 232 8 218 Z', T.creamDeep, null, 0, { 'data-lcs-soil': 'fill' }));
  }
  const rootsAll = [];
  const taproot = (y1) => pathEl(`M 100 150 C 101 ${f1(150 + (y1 - 150) * 0.35)} 98 ${f1(150 + (y1 - 150) * 0.7)} 100 ${y1}`, null, T.teal, sw3, { 'data-lcs-root': 'tap' });
  const lateral = (y, side, len) => pathEl(`M 100 ${y} Q ${100 + side * len * 0.55} ${y + 4} ${100 + side * len} ${y + len * 0.55}`, null, T.teal, sw25, { 'data-lcs-root': 'lateral' });
  const seedOval = (cx, cy, split) => {
    const s = [el('ellipse', { cx, cy, rx: 26, ry: 17, transform: `rotate(-12 ${cx} ${cy})`, fill: T.teal, 'data-lcs-seed-coat': '1' }),
      pathEl(`M ${cx - 12} ${cy + 4} Q ${cx - 6} ${cy + 9} ${cx + 2} ${cy + 7}`, null, T.white, sw15, { 'data-lcs-hilum': '1' })];
    if (split) s.push(pathEl(`M ${cx + 8} ${cy - 17} L ${cx + 3} ${cy - 6} L ${cx - 1} ${cy - 16}`, T.white, T.white, sw15, { 'data-lcs-split': '1' }));
    return s.join('');
  };
  const leafAt = (x, y, side, L, W, rise) => { const d = norm([side, -rise]); return pathEl(bladeD([x + side * 2, y], d, L, W / 2).d, T.tealSoft, T.teal, sw3, { 'data-lcs-stage-leaf': '1' }); };
  const cotyledons = (y, s) => [
    el('ellipse', { cx: f1(100 - 20 * s), cy: y, rx: f1(20 * s), ry: f1(11 * s), transform: `rotate(-25 ${f1(100 - 20 * s)} ${y})`, fill: T.tealSoft, stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-cotyledon': '1' }),
    el('ellipse', { cx: f1(100 + 20 * s), cy: y, rx: f1(20 * s), ry: f1(11 * s), transform: `rotate(25 ${f1(100 + 20 * s)} ${y})`, fill: T.tealSoft, stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-cotyledon': '1' })].join('');
  const young = () => {
    const o = [];
    if (!potted) { rootsAll.push(taproot(214)); [[166, 1, 26], [176, -1, 28], [192, 1, 22]].forEach(([y, s, l]) => { rootsAll.push(lateral(y, s, l)); rootsAll.push(lateral(y + 8, -s, l * 0.8)); }); }
    o.push(tube('M 100 150 L 100 40', 6));
    o.push(cotyledons(130, 0.55));
    o.push(leafAt(100, 96, -1, 44, 20, 0.35));
    o.push(leafAt(100, 66, 1, 32, 15, 0.45));
    return o.join('');
  };
  const smallFlower = (cx, cy) => {
    const o = [];
    for (const deg of [108, 252]) { const d = dirCw(deg); o.push(pathEl(bladeD([cx + d[0] * 5, cy + d[1] * 5], d, 16, 5).d, T.tealSoft, T.teal, sw3, { 'data-lcs-sepal': deg })); }
    for (let k = 0; k < 5; k++) { const d = dirCw(72 * k), pcx = cx + d[0] * 11, pcy = cy + d[1] * 11; o.push(el('ellipse', { cx: f1(pcx), cy: f1(pcy), rx: 7, ry: 10, transform: `rotate(${72 * k} ${f1(pcx)} ${f1(pcy)})`, fill: T.white, stroke: T.teal, 'stroke-width': f1(sw3), 'data-lcs-petal': k + 1 })); }
    o.push(el('circle', { cx, cy, r: 6, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3) }));
    return o.join('');
  };
  let above = '';
  if (stage === 'seed') {
    above = seedOval(100, 190, false);
  } else if (stage === 'sprout') {
    above = pathEl('M 92 206 Q 90 218 86 230', null, T.teal, 6, { 'data-lcs-radicle': '1' }) + pathEl('M 89 218 L 86 230', null, T.teal, 3, { 'data-lcs-radicle': 'tip' }) +
      seedOval(100, 196, true) +
      tube('M 104 184 Q 106 168 106 152 Q 106 138 96 140', 5);
  } else if (stage === 'seedling') {
    if (!potted) { rootsAll.push(taproot(214)); rootsAll.push(lateral(170, 1, 22)); rootsAll.push(lateral(182, -1, 24)); }
    above = tube('M 100 150 L 100 94', 6) + cotyledons(88, 1);
  } else if (stage === 'young') {
    above = young();
  } else if (stage === 'flowering') {
    above = young() + smallFlower(100, 30);
  } else if (stage === 'fruiting') {
    const pod = { a: [128, 82], b: [146, 138], w: 28 };
    above = young() +
      pathEl('M 97 40 L 103 40 M 100 35 L 100 44 M 96 36 L 104 44', null, T.grid, sw15, { 'data-lcs-receptacle': '1' }) +
      pathEl('M 100 72 Q 118 70 127 78', null, T.teal, sw3, { 'data-lcs-pod': 'stalk' }) +
      pathEl(capsuleD(pod.a, pod.b, pod.w / 2), T.tealSoft, T.teal, sw3, { 'data-lcs-pod': 'skin' }) +
      axisWindow(pod.a, pod.b, 90, 128, pod.w - 8, 6, { fill: T.white, stroke: T.teal, 'stroke-width': f1(sw15), 'data-lcs-pod': 'window' }) +
      [96, 109, 122].map((y, i) => { const t = (y - pod.a[1]) / (pod.b[1] - pod.a[1]); return el('circle', { cx: f1(pod.a[0] + (pod.b[0] - pod.a[0]) * t), cy: y, r: 6, fill: T.teal, 'data-lcs-seed': i + 1 }); }).join('');
  }
  out.push(`<g data-lcs-part="root">${rootsAll.join('')}</g>`);
  if (!potted) {
    out.push(pathEl('M 8 150 L 192 150', null, T.teal, sw3, { 'data-lcs-soil': 'line' }));
    out.push(pathEl('M 8 150 L 8 218 Q 8 232 22 232 L 178 232 Q 192 232 192 218 L 192 150', null, T.teal, sw3, { 'data-lcs-soil': 'box' }));
    for (const [x, y] of [[30, 170], [170, 176], [44, 222], [160, 220]]) out.push(el('ellipse', { cx: x, cy: y, rx: 5, ry: 3.5, fill: 'none', stroke: T.grid, 'stroke-width': f1(sw15), 'data-lcs-pebble': '1' }));
  }
  out.push(`<g data-lcs-above>${above}</g>`);
  const svg = svgRoot({ width: f1(w), height: f1(h), viewBox: `0 0 ${ST.vbW} ${ST.vbH}`, label: 'a plant: ' + stage }, out,
    { 'data-lcs-figure': 'plant-' + stage, 'data-lcs-potted': potted ? '1' : undefined, id: id || undefined, style: 'display:block' });
  return { svg, width: f1(w), height: f1(h), scale };
}

/* ---------------------------------------------------------------- the cut-away flower (F5) */
const FLOWER_ANCHORS = {
  petal: { x: 130, y: 220, slot: { x: 40, y: 220 } },
  sepal: { x: 150, y: 344, slot: { x: 40, y: 360 } },
  stamen: { x: 250, y: 202, slot: { x: 360, y: 202 } },
  pistil: { x: 200, y: 236, slot: { x: 360, y: 262 } },
  stalk: { x: 200, y: 400, slot: { x: 360, y: 400 } },
  ovary: { x: 200, y: 298, slot: { x: 360, y: 320 } },
};
function flowerSection({ h = 418, tags = [], vbTop = 0 } = {}) {
  if (!(h >= 240)) throw new Error(`plant-figure: flowerSection h ${h} < 240`);
  // vbTop (faces, additive; default 0 = the original drawing byte-identical): crop the empty sky above
  // the petal tips (min y 120) so a top-anchored stage does not open with a ~110 px blank band.
  if (!(vbTop >= 0 && vbTop <= 110)) throw new Error(`plant-figure: flowerSection vbTop ${vbTop} outside 0..110 (the petal tips start at y 120)`);
  const VW = 400, VH = 440 - vbTop, scale = h / VH, width = VW * scale, u = (px) => px / scale;
  const sw3 = u(3), sw15 = u(1.5);
  const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${f1(400 - +x)} ${y}`);
  const SEPAL_L = 'M 186 322 Q 150 330 128 360 Q 164 350 192 330 Z';
  const PETAL_L = 'M 180 320 Q 96 250 104 150 Q 150 170 186 300 Z';
  const PETAL_C = 'M 186 316 Q 170 190 200 120 Q 230 190 214 316 Z';
  const o = [];
  o.push(`<g data-lcs-part="stalk">${pathEl(capsuleD([200, 440], [200, 330], 6), T.white, T.teal, sw3)}</g>`);
  o.push(`<g data-lcs-part="petal">${pathEl(PETAL_L, T.white, T.teal, sw3)}${pathEl(mirror(PETAL_L), T.white, T.teal, sw3)}${pathEl(PETAL_C, T.white, T.teal, sw3)}</g>`);
  o.push(`<g data-lcs-part="sepal">${pathEl(SEPAL_L, T.tealSoft, T.teal, sw3)}${pathEl(mirror(SEPAL_L), T.tealSoft, T.teal, sw3)}</g>`);
  o.push(`<g data-lcs-part="receptacle">${el('ellipse', { cx: 200, cy: 322, rx: 26, ry: 12, fill: T.tealSoft, stroke: T.teal, 'stroke-width': f1(sw3) })}</g>`);
  const fil = [[[188, 300], [152, 206]], [[192, 300], [170, 196]], [[212, 300], [248, 206]], [[208, 300], [230, 196]]];
  o.push(`<g data-lcs-part="stamen">` + fil.map(([a, b]) => pathEl(`M ${pt(a)} L ${pt(b)}`, null, T.teal, u(2))).join('') +
    fil.map(([, b]) => { const ang = Math.atan2(b[0] - 200, 300 - b[1]) * 180 / Math.PI; return el('ellipse', { cx: b[0], cy: b[1], rx: 8, ry: 12, transform: `rotate(${f1(ang)} ${b[0]} ${b[1]})`, fill: T.teal }); }).join('') + `</g>`);
  o.push(`<g data-lcs-part="pistil">` +
    el('rect', { x: 196, y: 190, width: 8, height: 90, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3) }) +
    el('ellipse', { cx: 200, cy: 184, rx: 14, ry: 8, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3) }) +
    `<g data-lcs-part="ovary">${el('ellipse', { cx: 200, cy: 298, rx: 18, ry: 20, fill: T.creamDeep, stroke: T.teal, 'stroke-width': f1(sw3) })}</g>` + `</g>`);
  // tags
  const threads = [], ends = [], discs = [], anchors = {};
  for (const t of tags) {
    const a = FLOWER_ANCHORS[t.part];
    if (!a) throw new Error(`plant-figure: flowerSection has no anchor "${t.part}"`);
    const A = [a.x, a.y], S = [a.slot.x, a.slot.y], dir = norm([A[0] - S[0], A[1] - S[1]]);
    const st = [S[0] + dir[0] * u(TAG_R), S[1] + dir[1] * u(TAG_R)], en = [A[0] - dir[0] * u(RING_R), A[1] - dir[1] * u(RING_R)];
    threads.push(el('line', { x1: f1(st[0]), y1: f1(st[1]), x2: f1(en[0]), y2: f1(en[1]), stroke: T.teal, 'stroke-width': f1(u(THREAD_PX)), 'stroke-linecap': 'round', 'data-lcs-thread': t.part }));
    ends.push(el('circle', { cx: A[0], cy: A[1], r: f1(u(RING_R)), fill: 'none', stroke: T.white, 'stroke-width': f1(u(5)) }) + el('circle', { cx: A[0], cy: A[1], r: f1(u(RING_R)), fill: 'none', stroke: T.teal, 'stroke-width': f1(u(RING_PX)), 'data-lcs-ring': t.part }));
    discs.push(`<g data-lcs-tag data-lcs-part="${esc(t.part)}" data-lcs-n="${t.n}">` + el('circle', { cx: S[0], cy: S[1], r: f1(u(TAG_HALO - 2)), fill: T.white, stroke: T.white, 'stroke-width': f1(u(4)) }) +
      el('circle', { cx: S[0], cy: S[1], r: f1(u(TAG_R)), fill: T.coral }) +
      el('text', { x: S[0], y: f1(S[1] + u(1)), 'font-family': `${F.display}, cursive`, 'font-size': f1(u(TAG_PX)), 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(t.n)) + `</g>`);
    anchors[t.part] = { x: f1(A[0] * scale), y: f1((A[1] - vbTop) * scale) };
  }
  if (tags.length) o.push(`<g data-lcs-threads>${threads.join('')}${ends.join('')}</g><g data-lcs-tags>${discs.join('')}</g>`);
  const svg = svgRoot({ width: f1(width), height: f1(h), viewBox: `0 ${vbTop} ${VW} ${VH}`, label: 'a flower cut open' }, o, { 'data-lcs-figure': 'flower', 'data-lcs-scale': f1(scale), style: 'display:block' });
  return { svg, width: f1(width), height: h, scale, anchors };
}

/* ---------------------------------------------------------------- part icons (F3 chips) */
function plantPartIcon({ part, size = 32 } = {}) {
  if (!PARTS.includes(part)) throw new Error(`plant-figure: plantPartIcon part "${part}" unknown`);
  const scale = size / 64, u = (px) => px / scale;
  const sw3 = u(Math.min(3, Math.max(1.5, size / 16))), sw15 = u(1.2);
  let g = '';
  if (part === 'root') {
    g = pathEl('M 6 14 L 58 14', null, T.teal, sw3) + pathEl('M 32 14 C 33 30 30 44 32 60', null, T.teal, sw3) +
      [[30, -1, 22], [36, 1, 20], [26, 1, 18], [42, -1, 16]].map(([y, s, l]) => pathEl(`M 32 ${y} Q ${32 + s * l * 0.6} ${y + 2} ${32 + s * l} ${y + l * 0.6}`, null, T.teal, sw15 * 1.6)).join('');
  } else if (part === 'stem') {
    g = pathEl(capsuleD([32, 8], [32, 58], 4), T.white, T.teal, sw3) + pathEl('M 36 26 Q 46 22 50 16', null, T.grid, sw3) + pathEl('M 28 40 Q 18 36 14 30', null, T.grid, sw3);
  } else if (part === 'leaf') {
    const L = { base: [6, 50], c1: [24, 14], tip: [58, 14], c2: [52, 48] };
    g = pathEl(leafD(L), T.tealSoft, T.teal, sw3) + pathEl('M 6 50 L 58 14', null, T.teal, sw15);
  } else if (part === 'flower') {
    g = drawFlower(sw3, sw15, 32, 33, 0.55);
  } else if (part === 'fruit') {
    // the OPENED pod of the big plant (window + seeds), not a closed capsule: the build review read the
    // closed capsule as a pill at 32 px (faces F3 chips, 2026-09-23)
    g = pathEl(capsuleD([18, 14], [46, 50], 11), T.tealSoft, T.teal, sw3) + pathEl('M 24 9 Q 20 3 13 3', null, T.teal, sw3) +
      axisWindow([18, 14], [46, 50], 19, 45, 11, 4, { fill: T.white, stroke: T.teal, 'stroke-width': f1(sw15) }) +
      [[25.3, 23.4], [35.4, 36.4]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 4.6, fill: T.teal })).join('');
  } else if (part === 'seed') {
    g = [[20, 26, -18], [42, 24, 20], [31, 44, 0]].map(([x, y, r]) => el('ellipse', { cx: x, cy: y, rx: 9, ry: 6, transform: `rotate(${r} ${x} ${y})`, fill: T.teal })).join('');
  }
  return { svg: svgRoot({ width: size, height: size, viewBox: '0 0 64 64', label: part }, g, { 'data-lcs-part-icon': part, style: 'display:block;flex:0 0 auto' }), width: size, height: size };
}

module.exports = {
  plantFigure, plantStage, flowerSection, plantPartIcon,
  ANCHORS, TAG_SLOTS, FLOWER_ANCHORS, MIN_H, MAX_H, PARTS,
  VB_W, VB_H, SOIL_Y, TAG_R, TAG_HALO, RING_R, TAG_MIN_GAP,
  _geometry: { BOX, PEBBLES, PEBBLE, STEM_D, LEAVES, FLOWER, SEPALS, SEPAL, POD, POD_WINDOW, POD_SEEDS, SEED_R, TAPROOT, LATERALS, POD_STALK },
};

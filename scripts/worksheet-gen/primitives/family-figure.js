/**
 * family-figure.js — a head-and-shoulders BUST for the K-370 `family` pages
 * (nt10-E; design docs/worksheet-gen/b5-designs/K-370-family.md §2). Pure SVG
 * on the tokens, Node-testable; the gate is qa/verify-b5-family-figure.js (it
 * parses the EMITTED markup and the Chromium render, never `meta`).
 *
 *   familyFigure({ age:'baby'|'child'|'adult'|'elder', sex:'f'|'m', look,
 *                  tint?, px, id, x?, y? })
 *     -> { svg, width, height, meta:{ age, sex, look, tint, hairBottom, jawY, earTopY } }
 *
 * THE CAST (redrawn 2026-10-14, operator: "the elderly people are … scary — draw
 * cute, child friendly people", then "redraw the whole family"): one rounded,
 * picture-book style for every age — a big round head on a small soft body,
 * dot eyes with a white catch-light, a small open smile, a button nose and
 * blush dots. Grandparents have soft silver hair, rosy cheeks, thin round
 * glasses with the eyes visible inside, and a grandpa's moustache curls UP
 * like a smile and never covers the mouth. No wrinkle lines, no goggles.
 * The look ids, their order and their count are unchanged, so a seeded page
 * draws the same family as before — only the drawing changed.
 *
 * viewBox 0 0 100 120 (the bust's bottom edge = the mat's bottom); width =
 * px * 100 / 120; THROWS below MIN_PX 72. Outline teal 3 px AT EVERY SIZE;
 * face / neck / ears white; garment = the look's tint; detail lines teal
 * 1.5 px. No skin tone, no earrings, no make-up, no props; every tint appears
 * in BOTH sexes' looks (gated), so colour never carries sex. Age reads from
 * the head : body proportion (child and baby heads much bigger than their
 * shoulders) plus hair TONE (ink for child / adult, grid = silver for elder).
 *
 * SEX = HAIR REACH, a measured rule (stamped, and re-measured by the gate):
 *   hairBottom = the lowest y of any [data-lcs-hair] shape
 *   jawY = chin - 6        earTopY = head cy - 4
 *   every f look: hairBottom >= jawY + 8
 *   every m look: hairBottom <= earTopY   (a beard / moustache is a separate
 *                 [data-lcs-beard] shape on the face, never on f)
 * The baby (at most one per page) draws ONE curl and no sex.
 * Hair paths use only M L Q C Z (the gate samples those).
 */
'use strict';
const tokens = require('./_tokens.js');
const { esc } = require('./_svg.js');

const T = tokens.color;
const VB_W = 100, VB_H = 120;
const MIN_PX = 72;
const DETAIL = 1.5;

/* ---------------------------------------------------------------- geometry per age */
const AGE_GEOM = {
  adult: { head: { cx: 50, cy: 46, rx: 25, ry: 25 }, neck: { x: 44, y: 66, w: 12, h: 24 },
    shoulders: 'M 10 120 C 10 100 20 90 36 87 L 64 87 C 80 90 90 100 90 120 Z', collar: 'M 42 87 Q 50 95 58 87',
    eyes: [[41, 47], [59, 47]], eyeR: 3.4, mouth: 'M 43.5 61 Q 50 69.5 56.5 61 Z', nose: 'M 48 51.5 Q 50 53.5 52 51.5',
    cheeks: [[33.5, 58], [66.5, 58]], cheekR: 4.2, ears: [[25, 48], [75, 48]], earR: [3.6, 5.4] },
  child: { head: { cx: 50, cy: 52, rx: 28, ry: 27 }, neck: { x: 45, y: 74, w: 10, h: 20 },
    shoulders: 'M 22 120 C 22 104 30 96 40 94 L 60 94 C 70 96 78 104 78 120 Z', collar: 'M 43 94 Q 50 101 57 94',
    eyes: [[40, 53], [60, 53]], eyeR: 3.8, mouth: 'M 42.5 63.5 Q 50 73 57.5 63.5 Z', nose: null,
    cheeks: [[32, 62], [68, 62]], cheekR: 4.6, ears: [[22, 54], [78, 54]], earR: [4, 6] },
  baby: { head: { cx: 50, cy: 62, rx: 30, ry: 29 }, neck: null,
    shoulders: 'M 26 120 C 26 106 34 100 42 99 L 58 99 C 66 100 74 106 74 120 Z', collar: 'M 42 100 Q 50 107 58 100',
    eyes: [[40, 63], [60, 63]], eyeR: 3.8, mouth: 'M 43.5 73 Q 50 81 56.5 73 Z', nose: null,
    cheeks: [[31, 72], [69, 72]], cheekR: 4.6, ears: [[20, 64], [80, 64]], earR: [4, 6] },
};
AGE_GEOM.elder = AGE_GEOM.adult;
const chinOf = (age) => { const h = AGE_GEOM[age].head; return h.cy + h.ry; };
const jawYOf = (age) => chinOf(age) - 6;
const earTopYOf = (age) => AGE_GEOM[age].head.cy - 4;

/* ---------------------------------------------------------------- hair helpers */
/** a ring of curls (circles) along an ellipse arc — for curly looks */
function curls({ cx, cy, rx, ry, from, to, n, r }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (from + (to - from) * i / (n - 1)) * Math.PI / 180;
    out.push({ c: [+(cx + rx * Math.cos(a)).toFixed(2), +(cy + ry * Math.sin(a)).toFixed(2), r] });
  }
  return out;
}
const mirrorD = (d) => d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (m, x, y) => `${+(100 - +x).toFixed(2)} ${y}`);

/* adult / elder: head x 25..75, y 21..71; jawY 65 (f hair >= 73), earTopY 42 (m hair <= 42) */
const A_CAP_M = 'M 25 42 C 22 18 37 13 50 13 C 63 13 78 18 75 42 C 72 33 66 29 59 30 C 53 26 45 27 39 31 C 33 33 28 37 25 42 Z';
const A_BANGS_SIDE = 'M 25 41 C 24 20 37 14 51 14 C 65 14 77 21 75 41 C 69 31 59 27 49 31 C 42 27 31 30 25 41 Z';
const A_BANGS_STRAIGHT = 'M 26 38 C 26 20 38 14 50 14 C 62 14 74 20 74 38 Q 62 33 50 35 Q 38 33 26 38 Z';
const A_SWEPT = 'M 26 37 C 25 20 38 14 50 14 C 62 14 75 20 74 37 C 68 29 59 26 50 26 C 41 26 32 29 26 37 Z';
const A_LONG_BACK = 'M 22 46 C 19 14 37 10 50 10 C 63 10 81 14 78 46 C 80 62 82 76 78 84 Q 70 88 64 82 L 36 82 Q 30 88 22 84 C 18 76 20 62 22 46 Z';
const A_BOB_BACK = 'M 22 46 C 19 14 37 10 50 10 C 63 10 81 14 78 46 L 79 72 C 79 80 72 82 66 79 L 34 79 C 28 82 21 80 21 72 Z';
const A_SIDE_LOCK = 'M 27 34 C 18 46 18 68 24 80 Q 30 78 31 72 C 29 58 30 46 32 38 Z';
const A_PLAIT = 'M 71 53 C 81 61 83 82 79 98 Q 76 103 72 99 C 75 86 75 72 70 64 Z';
const LOOKS_ADULT_F = {
  'long-straight': { tint: 'tealSoft', ears: false, back: [{ d: A_LONG_BACK }], front: [{ d: A_BANGS_SIDE }] },
  ponytail: { tint: 'coralSoft', ears: true, back: [{ d: 'M 70 28 C 92 26 96 54 86 82 C 82 74 78 60 72 48 Z' }], front: [{ d: A_SWEPT }] },
  bun: { tint: 'creamDeep', ears: false, back: [{ c: [50, 12, 10] }, { d: A_SIDE_LOCK }, { d: mirrorD(A_SIDE_LOCK) }], front: [{ d: A_SWEPT }] },
  braid: { tint: 'white', ears: false, back: [{ d: 'M 23 46 C 20 15 37 11 50 11 C 63 11 80 15 77 46 L 75 66 L 25 60 Z' }], front: [{ d: A_BANGS_SIDE }], drape: [{ d: A_PLAIT }], plaitLines: ['M 72 67 Q 76 70 79 68', 'M 73 76 Q 77 79 81 77', 'M 73 85 Q 77 88 81 86', 'M 73 93 Q 76 95 79 94'], tie: [75.8, 101.5] },
  'curly-long': { tint: 'tealSoft', ears: false, back: [...curls({ cx: 50, cy: 46, rx: 27, ry: 28, from: 180, to: 360, n: 9, r: 7.5 }), ...curls({ cx: 50, cy: 50, rx: 28, ry: 28, from: 150, to: 110, n: 4, r: 7 }), ...curls({ cx: 50, cy: 50, rx: 28, ry: 28, from: 30, to: 70, n: 4, r: 7 })], front: curls({ cx: 50, cy: 40, rx: 18, ry: 19, from: 200, to: 340, n: 6, r: 6 }) },
  'bob-fringe': { tint: 'coralSoft', ears: false, back: [{ d: A_BOB_BACK }], front: [{ d: A_BANGS_STRAIGHT }] },
};
const LOOKS_ADULT_M = {
  short: { tint: 'tealSoft', ears: true, back: [], front: [{ d: A_CAP_M }] },
  'side-part': { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 25 42 C 21 18 38 12 53 13 C 66 13 78 20 75 42 C 72 34 67 30 61 29 C 52 28 44 29 37 33 C 31 36 27 39 25 42 Z' }], detail: ['M 43 15 Q 41 21 43 27'] },
  'curly-short': { tint: 'creamDeep', ears: true, back: [], front: curls({ cx: 50, cy: 37, rx: 21, ry: 18, from: 190, to: 350, n: 7, r: 6.5 }) },
  crew: { tint: 'white', ears: true, back: [], front: [{ d: 'M 27 38 C 26 24 37 18 50 18 C 63 18 74 24 73 38 C 68 32 60 30 50 30 C 40 30 32 32 27 38 Z' }] },
  'short-beard': { tint: 'tealSoft', ears: true, back: [], front: [{ d: A_CAP_M }], beard: 'M 26 52 C 26 70 36 77 50 77 C 64 77 74 70 74 52 C 71 62 66 68 59 69 Q 50 73 41 69 C 34 68 29 62 26 52 Z' },
  'short-moustache': { tint: 'coralSoft', ears: true, back: [], front: [{ d: A_CAP_M }], beard: 'M 37 58.5 C 40 53.5 46.5 54.5 50 56.8 C 53.5 54.5 60 53.5 63 58.5 C 58.5 57.8 54.5 59.4 50 59.8 C 45.5 59.4 41.5 57.8 37 58.5 Z' },
};
/* elder m extra: a bald crown with fluffy silver tufts over the ears */
const LOOKS_ELDER_M_EXTRA = {
  'bald-crown': { tint: 'creamDeep', ears: true, back: [], front: [{ c: [25, 35, 6.5] }, { c: [30, 29, 5.5] }, { c: [75, 35, 6.5] }, { c: [70, 29, 5.5] }] },
};
/* child: head x 22..78, y 25..79; jawY 73 (f hair >= 81), earTopY 48 (m hair <= 48) */
const C_CAP_M = 'M 22 48 C 19 21 36 16 50 16 C 64 16 81 21 78 48 C 74 37 66 32 57 33 C 49 29 38 31 31 37 C 27 40 24 44 22 48 Z';
const C_BANGS = 'M 23 46 C 21 22 36 17 50 17 C 64 17 79 22 77 46 C 71 36 61 33 50 37 C 39 33 29 36 23 46 Z';
const C_SWEPT = 'M 24 42 C 22 22 36 17 50 17 C 64 17 78 22 76 42 C 70 33 60 30 50 30 C 40 30 30 33 24 42 Z';
const C_TAIL = 'M 26 36 C 8 36 4 66 13 88 C 18 78 21 62 26 50 Z';
const LOOKS_CHILD_F = {
  pigtails: { tint: 'coralSoft', ears: false, back: [{ d: C_TAIL }, { d: mirrorD(C_TAIL) }], front: [{ d: C_BANGS }], ties: [[23, 40], [77, 40]] },
  'long-straight': { tint: 'tealSoft', ears: false, back: [{ d: 'M 20 52 C 17 18 36 13 50 13 C 64 13 83 18 80 52 L 81 86 Q 74 92 68 86 L 32 86 Q 26 92 19 86 Z' }], front: [{ d: C_BANGS }], band: 'M 24 33 C 30 19 70 19 76 33' },
  ponytail: { tint: 'creamDeep', ears: true, back: [{ d: 'M 70 28 C 96 28 98 62 88 90 C 84 80 80 64 73 50 Z' }], front: [{ d: C_SWEPT }], bow: [74, 29] },
  braids: { tint: 'white', ears: false, back: [{ d: 'M 21 52 C 19 20 36 15 50 15 C 64 15 81 20 79 52 L 78 66 L 22 66 Z' }], front: [{ d: C_BANGS }], drape: [{ d: 'M 24 60 C 13 68 11 84 15 96 Q 19 101 22 96 C 20 86 22 72 29 64 Z' }, { d: mirrorD('M 24 60 C 13 68 11 84 15 96 Q 19 101 22 96 C 20 86 22 72 29 64 Z') }], ties: [[18, 95], [82, 95]] },
  'bob-fringe': { tint: 'coralSoft', ears: false, back: [{ d: 'M 19 50 C 17 16 36 13 50 13 C 64 13 83 16 81 50 L 82 80 C 82 88 74 88 68 85 L 32 85 C 26 88 18 88 18 80 Z' }], front: [{ d: 'M 23 44 C 23 23 36 18 50 18 C 64 18 77 23 77 44 Q 64 39 50 41 Q 36 39 23 44 Z' }], clip: [66, 27] },
  bun: { tint: 'tealSoft', ears: false, back: [{ c: [27, 20, 10] }, { c: [73, 20, 10] }, { d: 'M 24 40 C 15 58 16 76 23 86 Q 29 82 29 74 C 27 62 28 50 30 44 Z' }, { d: mirrorD('M 24 40 C 15 58 16 76 23 86 Q 29 82 29 74 C 27 62 28 50 30 44 Z') }], front: [{ d: C_SWEPT }], ties: [[33, 27], [67, 27]] },
};
const LOOKS_CHILD_M = {
  short: { tint: 'tealSoft', ears: true, back: [], front: [{ d: C_CAP_M }] },
  'spiky-fringe': { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 22 47 C 19 22 36 16 50 16 C 64 16 81 22 78 47 L 73 39 L 68 44 L 63 36 L 57 42 L 51 35 L 45 42 L 39 36 L 33 43 L 28 38 Z' }] },
  'curly-short': { tint: 'creamDeep', ears: true, back: [], front: curls({ cx: 50, cy: 41, rx: 24, ry: 20, from: 190, to: 350, n: 8, r: 7 }) },
  'side-part': { tint: 'white', ears: true, back: [], front: [{ d: 'M 22 48 C 18 21 38 15 54 16 C 68 16 81 23 78 48 C 75 38 69 33 61 32 C 51 31 42 33 35 38 C 29 41 25 44 24 47 Z' }], detail: ['M 41 18 Q 39 25 41 31'] },
  crew: { tint: 'tealSoft', ears: true, back: [], front: [{ d: 'M 24 42 C 23 27 35 21 50 21 C 65 21 77 27 76 42 C 70 35 61 32 50 32 C 39 32 30 35 24 42 Z' }] },
  swoop: { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 22 48 C 19 22 38 14 57 17 C 72 19 81 29 78 48 C 74 38 67 34 59 34 C 50 39 37 43 24 47 Z' }] },
};
const LOOKS_BABY = { baby: { tint: 'white', ears: true, back: [], front: [], curl: 'M 50 33 C 56 27 54 22 49 23 C 45 24 46 29 50 29' } };

/** ELDER MALE CUE (landing review 2026-09-23: a curly-haired grandpa read as mum): every elder m figure
 *  carries a beard, a moustache or the bald crown. A look with none gets the smiling moustache added. */
const ELDER_M_MOUSTACHE = 'M 37 58.5 C 40 53.5 46.5 54.5 50 56.8 C 53.5 54.5 60 53.5 63 58.5 C 58.5 57.8 54.5 59.4 50 59.8 C 45.5 59.4 41.5 57.8 37 58.5 Z';
function elderMaleCue(look, L) { return L.beard ? (/beard/.test(look) ? 'beard' : 'moustache') : look === 'bald-crown' ? 'bald' : 'moustache'; }
/** glasses on EVERY elder look (review 2026-10-14: white hair + glasses = a grandparent at a glance, never a parent) */
const ELDER_GLASSES = { has: () => true };

/* ADULT / ELDER SCALE (2026-10-14): the head + hair + face above were drawn on a 25-unit head; one uniform
 * map (about the head centre, k = ADULT_K, moved down to cy 50) makes the head bigger and the neck short.
 * A uniform scale keeps every measured rule (hair reach, beard on the face), so the gate stays the judge. */
const ADULT_K = 1.1, ADULT_CY0 = 46, ADULT_CY1 = 50;
const ax = (x) => +(50 + (x - 50) * ADULT_K).toFixed(2), ay = (y) => +(ADULT_CY1 + (y - ADULT_CY0) * ADULT_K).toFixed(2);
const aD = (d) => d.replace(/(-?d*.?d+)s+(-?d*.?d+)/g, (m, x, y) => `${ax(+x)} ${ay(+y)}`);
const aS = (sh) => (sh.c ? { c: [ax(sh.c[0]), ay(sh.c[1]), +(sh.c[2] * ADULT_K).toFixed(2)] } : sh.e ? { e: [ax(sh.e[0]), ay(sh.e[1]), sh.e[2] * ADULT_K, sh.e[3] * ADULT_K] } : { d: aD(sh.d) });
function scaleLook(L) {
  const o = { ...L, back: L.back.map(aS), front: L.front.map(aS) };
  if (L.drape) o.drape = L.drape.map(aS);
  if (L.detail) o.detail = L.detail.map(aD);
  if (L.plaitLines) o.plaitLines = L.plaitLines.map(aD);
  if (L.beard) o.beard = aD(L.beard);
  if (L.tie) o.tie = [ax(L.tie[0]), ay(L.tie[1])];
  if (L.ties) o.ties = L.ties.map(([x, y]) => [ax(x), ay(y)]);
  return o;
}
const scaleLooks = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, scaleLook(v)]));
{ const g = AGE_GEOM.adult;
  g.head = { cx: 50, cy: ADULT_CY1, rx: +(g.head.rx * ADULT_K).toFixed(2), ry: +(g.head.ry * ADULT_K).toFixed(2) };
  g.eyes = g.eyes.map(([x, y]) => [ax(x), ay(y)]); g.eyeR = +(g.eyeR * ADULT_K).toFixed(2);
  g.cheeks = g.cheeks.map(([x, y]) => [ax(x), ay(y)]); g.cheekR = +(g.cheekR * ADULT_K).toFixed(2);
  g.ears = g.ears.map(([x, y]) => [ax(x), ay(y)]);
  g.mouth = aD(g.mouth); g.nose = aD(g.nose);
  g.neck = { x: 44, y: 72, w: 12, h: 18 };
}
for (const k of Object.keys(LOOKS_ADULT_F)) LOOKS_ADULT_F[k] = scaleLook(LOOKS_ADULT_F[k]);
for (const k of Object.keys(LOOKS_ADULT_M)) LOOKS_ADULT_M[k] = scaleLook(LOOKS_ADULT_M[k]);
for (const k of Object.keys(LOOKS_ELDER_M_EXTRA)) LOOKS_ELDER_M_EXTRA[k] = scaleLook(LOOKS_ELDER_M_EXTRA[k]);
const ELDER_M_MOUSTACHE_S = aD(ELDER_M_MOUSTACHE);

const LOOKS = {
  adult: { f: LOOKS_ADULT_F, m: LOOKS_ADULT_M },
  elder: { f: LOOKS_ADULT_F, m: { ...LOOKS_ADULT_M, ...LOOKS_ELDER_M_EXTRA } },
  child: { f: LOOKS_CHILD_F, m: LOOKS_CHILD_M },
  baby: { f: LOOKS_BABY, m: LOOKS_BABY },
};
const lookIds = (age, sex) => Object.keys(LOOKS[age][sex]);

/* ---------------------------------------------------------------- measure (meta only; the gate re-parses) */
function shapeBottom(s) {
  if (s.c) return s.c[1] + s.c[2];
  if (s.e) return s.e[1] + s.e[3];
  let max = -Infinity;
  const nums = s.d.match(/-?\d*\.?\d+/g).map(Number);
  // conservative: control points bound the curve (a quadratic / cubic lies inside its hull)
  for (let i = 1; i < nums.length; i += 2) max = Math.max(max, nums[i]);
  return max;
}

/* ---------------------------------------------------------------- emit */
function shapeSvg(s, fill, sw, attr) {
  const common = `fill="${fill}" stroke="${T.teal}" stroke-width="${sw}" stroke-linejoin="round"${attr}`;
  if (s.c) return `<circle cx="${s.c[0]}" cy="${s.c[1]}" r="${s.c[2]}" ${common}/>`;
  if (s.e) return `<ellipse cx="${s.e[0]}" cy="${s.e[1]}" rx="${s.e[2]}" ry="${s.e[3]}" ${common}/>`;
  return `<path d="${s.d}" ${common}/>`;
}

function familyFigure({ age, sex, look, tint, px, id, x, y } = {}) {
  if (!AGE_GEOM[age]) throw new Error(`familyFigure: unknown age ${age}`);
  if (sex !== 'f' && sex !== 'm') throw new Error(`familyFigure: sex ${sex} (f | m)`);
  if (!(px >= MIN_PX)) throw new Error(`familyFigure: px ${px} < MIN_PX ${MIN_PX}`);
  if (!id || !/^[A-Za-z0-9_-]+$/.test(String(id))) throw new Error(`familyFigure: id "${id}" (the clip id must be unique on the page)`);
  const L = LOOKS[age][sex][look];
  if (!L) throw new Error(`familyFigure: no look "${look}" for ${age} ${sex}`);
  const g = AGE_GEOM[age];
  const scale = px / VB_H;
  const sw = +(3 / scale).toFixed(3);
  const sd = +(DETAIL / scale).toFixed(3);
  // elder hair is WHITE with the teal outline (the first redraw's beige read as a blond mum / dad — review 2026-10-14)
  const hair = age === 'elder' ? T.white : T.ink;
  const garment = T[tint || L.tint];
  if (!garment) throw new Error(`familyFigure: tint ${tint} is not a token`);
  const W = +(px * VB_W / VB_H).toFixed(2);
  const parts = [];
  const hairAttr = ' data-lcs-hair=""';
  // 1 back hair
  for (const s of L.back) parts.push(shapeSvg(s, hair, sw, hairAttr));
  // 2 garment + collar
  parts.push(`<path d="${g.shoulders}" fill="${garment}" stroke="${T.teal}" stroke-width="${sw}" stroke-linejoin="round" data-lcs-garment=""/>`);
  parts.push(`<path d="${g.collar}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  // 3 neck
  if (g.neck) parts.push(`<rect x="${g.neck.x}" y="${g.neck.y}" width="${g.neck.w}" height="${g.neck.h}" rx="${(g.neck.w / 2).toFixed(1)}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}"/>`);
  // 4 ears (hidden by long hair: those looks declare ears:false)
  if (L.ears) for (const [ex, ey] of g.ears) parts.push(`<ellipse cx="${ex}" cy="${ey}" rx="${g.earR[0]}" ry="${g.earR[1]}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}" data-lcs-ear=""/>`);
  // 5 head
  parts.push(`<ellipse cx="${g.head.cx}" cy="${g.head.cy}" rx="${g.head.rx}" ry="${g.head.ry}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}" data-lcs-head=""/>`);
  // 6 blush (soft coral dots; under the hair so long hair may cover them)
  for (const [cx, cy] of g.cheeks) parts.push(`<circle cx="${cx}" cy="${cy}" r="${g.cheekR}" fill="${T.coral}" fill-opacity="0.32" data-lcs-cheek=""/>`);
  // 7 front hair
  for (const s of L.front) parts.push(shapeSvg(s, hair, sw, hairAttr));
  if (L.detail) for (const d of L.detail) parts.push(`<path d="${d}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  // 8 face: eyes with a catch-light, nose, open smile
  if (L.curl) parts.push(`<path d="${L.curl}" fill="none" stroke="${T.teal}" stroke-width="${+(2.2 / scale).toFixed(3)}" stroke-linecap="round" data-lcs-curl=""/>`);
  for (const [ex, ey] of g.eyes) {
    parts.push(`<circle cx="${ex}" cy="${ey}" r="${g.eyeR}" fill="${T.teal}" data-lcs-eye=""/>`);
    parts.push(`<circle cx="${(ex + g.eyeR * 0.35).toFixed(2)}" cy="${(ey - g.eyeR * 0.35).toFixed(2)}" r="${(g.eyeR * 0.34).toFixed(2)}" fill="${T.white}"/>`);
  }
  if (g.nose) parts.push(`<path d="${g.nose}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  parts.push(`<path d="${g.mouth}" fill="${T.coral}" stroke="${T.teal}" stroke-width="${sd}" stroke-linejoin="round" data-lcs-mouth=""/>`);
  // 9 beard / moustache (m only; a separate shape that never covers the mouth)
  const cue = age === 'elder' && sex === 'm' ? elderMaleCue(look, L) : null;
  const beardD = L.beard || (cue === 'moustache' ? ELDER_M_MOUSTACHE_S : null);
  if (beardD) {
    if (sex !== 'm') throw new Error(`familyFigure: a beard on an f look (${look})`);
    parts.push(`<path d="${beardD}" fill="${hair}" stroke="${T.teal}" stroke-width="${sd}" stroke-linejoin="round" data-lcs-beard=""/>`);
  }
  // 10 elder glasses: thin round lenses, the eyes visible inside
  if (age === 'elder' && ELDER_GLASSES.has(sex + ':' + look)) {
    const gw = +(1.6 / scale).toFixed(3);
    const [[lx, ly], [rx, ry]] = g.eyes;
    parts.push(`<g data-lcs-glasses="" fill="none" stroke="${T.teal}" stroke-width="${gw}"><circle cx="${lx}" cy="${ly}" r="7.6"/><circle cx="${rx}" cy="${ry}" r="7.6"/><path d="M ${lx + 7.6} ${ly} Q 50 ${ly - 3} ${rx - 7.6} ${ry}"/></g>`);
  }
  // 11 drape (a plait / braids over the shoulder, in front of the garment) + hair ties
  if (L.drape) for (const s of L.drape) parts.push(shapeSvg(s, hair, sw, hairAttr));
  if (L.plaitLines) for (const d of L.plaitLines) parts.push(`<path d="${d}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  if (L.band) parts.push(`<path d="${L.band}" fill="none" stroke="${T.coral}" stroke-width="${+(2.6 / scale).toFixed(3)}" stroke-linecap="round" data-lcs-band=""/>`);
  if (L.bow) { const [bx, by] = L.bow; parts.push(`<g data-lcs-bow="" fill="${T.coral}" stroke="${T.teal}" stroke-width="${sd}" stroke-linejoin="round"><path d="M ${bx} ${by} L ${bx - 9} ${by - 6} L ${bx - 9} ${by + 6} Z"/><path d="M ${bx} ${by} L ${bx + 9} ${by - 6} L ${bx + 9} ${by + 6} Z"/><circle cx="${bx}" cy="${by}" r="2.6"/></g>`); }
  if (L.clip) { const [cx, cy] = L.clip; parts.push(`<rect x="${cx - 6}" y="${cy - 2.6}" width="12" height="5.2" rx="2.6" fill="${T.coral}" stroke="${T.teal}" stroke-width="${sd}" transform="rotate(-20 ${cx} ${cy})" data-lcs-clip-mark=""/>`); }
  for (const [tx, ty] of [...(L.ties || []), ...(L.tie ? [L.tie] : [])]) parts.push(`<circle cx="${tx}" cy="${ty}" r="3.6" fill="${T.coral}" stroke="${T.teal}" stroke-width="${sd}" data-lcs-tie=""/>`);

  const hairShapes = [...L.back, ...L.front, ...(L.drape || [])];
  const hairBottom = hairShapes.length ? Math.max(...hairShapes.map(shapeBottom)) : null;
  const clip = 'ff-' + id;
  const pos = (x != null ? ` x="${x}"` : '') + (y != null ? ` y="${y}"` : '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"${pos} width="${W}" height="${px}" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="" ` +
    `data-lcs-figure="" data-lcs-age="${age}" data-lcs-sex="${sex}" data-lcs-look="${esc(look)}" data-lcs-tint="${esc(tint || L.tint)}" data-lcs-px="${px}"${cue ? ` data-lcs-male-cue="${cue}"` : ''}>` +
    `<defs><clipPath id="${clip}"><rect x="0" y="0" width="${VB_W}" height="${VB_H}"/></clipPath></defs>` +
    `<g clip-path="url(#${clip})">${parts.join('')}</g></svg>`;
  return { svg, width: W, height: px, meta: { age, sex, look, maleCue: cue, tint: tint || L.tint, hairBottom, jawY: jawYOf(age), earTopY: earTopYOf(age), scale } };
}

module.exports = { familyFigure, LOOKS, AGE_GEOM, MIN_PX, VB_W, VB_H, lookIds, jawYOf, earTopYOf, chinOf, ELDER_GLASSES };

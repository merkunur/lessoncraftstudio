/**
 * family-figure.js — a head-and-shoulders BUST for the K-370 `family` pages
 * (nt10-E; design docs/worksheet-gen/b5-designs/K-370-family.md §2 "NEW
 * primitives/family-figure.js", design A's geometry). Pure SVG on the tokens,
 * Node-testable; the gate is qa/verify-b5-family-figure.js (it parses the
 * EMITTED markup and the Chromium render, never `meta`).
 *
 *   familyFigure({ age:'baby'|'child'|'adult'|'elder', sex:'f'|'m', look,
 *                  tint?, px, id, x?, y? })
 *     -> { svg, width, height, meta:{ age, sex, look, tint, hairBottom, jawY, earTopY } }
 *
 * viewBox 0 0 100 120 (the bust's bottom edge = the mat's bottom); width =
 * px * 100 / 120; THROWS below MIN_PX 72 (the adult eye disc r 3 falls under
 * 1.8 px). Outline teal 3 px AT EVERY SIZE (user units = 3 / scale, the
 * body-figure rule), round joins; face / neck / ears white; garment = the
 * look's tint; detail lines teal 1.5 px. No skin tone, no earrings, no make-up,
 * no props; every tint appears in BOTH sexes' looks (gated), so colour never
 * carries sex. Every figure is the SAME size on a page: age reads from the
 * head : shoulder proportion (adult 38/84 = 0.45, child 52/60 = 0.87, baby
 * 60/52 = 1.15) plus hair TONE (ink for child / adult, grid for elder — the
 * strongest mono contrast on the page), never from size.
 *
 * SEX = HAIR REACH, a measured rule (stamped, and re-measured by the gate):
 *   hairBottom = the lowest y of any [data-lcs-hair] shape
 *   jawY       = chin - 6          earTopY = head cy - 4
 *   every f look: hairBottom >= jawY + 8
 *   every m look: hairBottom <= earTopY   (a beard / moustache is a separate
 *                 [data-lcs-beard] shape touching the chin, never on f)
 * The baby (d3 only, at most one per page) draws ONE curl and no sex.
 *
 * LOOKS: >= 6 per (age, sex) — adult/elder f long-straight · ponytail · bun ·
 * braid · curly-long · bob-fringe; adult/elder m short · side-part ·
 * curly-short · crew · short-beard · short-moustache (+ elder-only
 * bald-crown); child f pigtails · long-straight · ponytail · braids ·
 * bob-fringe · bun; child m short · spiky-fringe · curly-short · side-part ·
 * crew · swoop; baby `baby`. Elders: grey hair + cheek arcs always, glasses on
 * 3 looks per sex.
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
  adult: { head: { cx: 50, cy: 44, rx: 19, ry: 23 }, neck: { x: 43, y: 64, w: 14, h: 24 },
    shoulders: 'M 8 120 Q 10 92 32 86 L 68 86 Q 90 92 92 120 Z', collar: 'M 41 86 Q 50 95 59 86',
    eyes: [[43, 44], [57, 44]], eyeR: 3, mouth: 'M 44 55 Q 50 60 56 55', nose: 'M 50 46 Q 52.5 50 49.5 51.5', ears: [[31, 46], [69, 46]], earR: [3.6, 5.6] },
  child: { head: { cx: 50, cy: 50, rx: 26, ry: 28 }, neck: { x: 45, y: 74, w: 10, h: 18 },
    shoulders: 'M 20 120 Q 22 96 38 90 L 62 90 Q 78 96 80 120 Z', collar: 'M 42 90 Q 50 98 58 90',
    eyes: [[41, 52], [59, 52]], eyeR: 3.6, mouth: 'M 43 64 Q 50 70 57 64', nose: null, ears: [[24, 53], [76, 53]], earR: [4, 6] },
  baby: { head: { cx: 50, cy: 60, rx: 30, ry: 30 }, neck: null,
    shoulders: 'M 24 120 Q 26 100 42 96 L 58 96 Q 74 100 76 120 Z', collar: 'M 40 97 Q 50 106 60 97',
    eyes: [[41, 62], [59, 62]], eyeR: 3.6, mouth: 'M 44 74 Q 50 79 56 74', nose: null, ears: [[20, 62], [80, 62]], earR: [4, 6] },
};
AGE_GEOM.elder = AGE_GEOM.adult;
const chinOf = (age) => { const h = AGE_GEOM[age].head; return h.cy + h.ry; };
const jawYOf = (age) => chinOf(age) - 6;
const earTopYOf = (age) => AGE_GEOM[age].head.cy - 4;

/* ---------------------------------------------------------------- hair shapes */
/** a ring of curls (circles) along an ellipse arc — for curly looks */
function curls({ cx, cy, rx, ry, from, to, n, r }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (from + (to - from) * i / (n - 1)) * Math.PI / 180;
    out.push({ c: [+(cx + rx * Math.cos(a)).toFixed(2), +(cy + ry * Math.sin(a)).toFixed(2), r] });
  }
  return out;
}
/** a braid: overlapping ellipses from (x0,y0) to (x1,y1) */
function braid(x0, y0, x1, y1, n, rx, ry) {
  const out = [];
  for (let i = 0; i < n; i++) { const t = i / (n - 1); out.push({ e: [+(x0 + (x1 - x0) * t).toFixed(2), +(y0 + (y1 - y0) * t).toFixed(2), rx, ry] }); }
  return out;
}
const mirrorD = (d) => d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (m, x, y) => `${+(100 - +x).toFixed(2)} ${y}`);

/* adult / elder (head x 31..69, y 21..67; jawY 61, earTopY 40) */
const A_CAP_M = 'M 31 39 C 29 22 39 16 50 16 C 61 16 71 22 69 39 C 66 31 60 27 52 27 C 44 30 36 30 33 38 Z';
const A_FRINGE_PART = 'M 31 38 C 30 22 40 15 50 15 C 60 15 70 22 69 38 C 65 30 58 26 50 30 C 42 26 35 30 31 38 Z';
const A_SWEPT = 'M 32 34 C 31 20 40 15 50 15 C 60 15 69 20 68 34 C 63 27 57 24 50 24 C 43 24 37 27 32 34 Z';
const LOOKS_ADULT_F = {
  'long-straight': { tint: 'tealSoft', ears: false, back: [{ d: 'M 28 42 C 26 16 38 12 50 12 C 62 12 74 16 72 42 L 75 82 Q 50 90 25 82 Z' }], front: [{ d: A_FRINGE_PART }] },
  ponytail: { tint: 'coralSoft', ears: true, back: [{ d: 'M 63 24 C 84 22 90 48 84 80 C 79 70 74 54 67 40 Z' }], front: [{ d: A_SWEPT }], detail: ['M 66 27 L 71 34'] },
  bun: { tint: 'creamDeep', ears: false, back: [{ c: [50, 13, 9] }, { d: 'M 32 34 Q 26 54 31 72 Q 34 60 36 44 Z' }, { d: mirrorD('M 32 34 Q 26 54 31 72 Q 34 60 36 44 Z') }], front: [{ d: A_SWEPT }] },
  braid: { tint: 'white', ears: false, back: [{ d: 'M 29 42 C 27 17 38 13 50 13 C 62 13 73 17 71 42 L 70 58 L 30 52 Z' }], front: [{ d: A_FRINGE_PART }], drape: braid(69, 58, 72, 97, 6, 5.5, 5) },
  'curly-long': { tint: 'tealSoft', ears: false, back: [...curls({ cx: 50, cy: 44, rx: 25, ry: 28, from: 180, to: 360, n: 9, r: 7.5 }), ...curls({ cx: 50, cy: 44, rx: 26, ry: 32, from: 150, to: 110, n: 4, r: 7 }), ...curls({ cx: 50, cy: 44, rx: 26, ry: 32, from: 30, to: 70, n: 4, r: 7 })], front: curls({ cx: 50, cy: 38, rx: 16, ry: 18, from: 200, to: 340, n: 6, r: 6 }) },
  'bob-fringe': { tint: 'coralSoft', ears: false, back: [{ d: 'M 28 40 C 27 15 40 12 50 12 C 60 12 73 15 72 40 L 74 74 Q 50 79 26 74 Z' }], front: [{ d: 'M 31 36 C 31 20 40 16 50 16 C 60 16 69 20 69 36 Z' }] },
};
const LOOKS_ADULT_M = {
  short: { tint: 'tealSoft', ears: true, back: [], front: [{ d: A_CAP_M }] },
  'side-part': { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 31 39 C 28 21 40 15 52 16 C 63 16 71 23 69 39 C 67 31 63 27 58 26 C 50 25 44 27 38 31 C 35 33 33 36 33 38 Z' }], detail: ['M 44 18 Q 42 23 44 27'] },
  'curly-short': { tint: 'creamDeep', ears: true, back: [], front: curls({ cx: 50, cy: 38, rx: 18, ry: 19, from: 195, to: 345, n: 7, r: 6 }) },
  crew: { tint: 'white', ears: true, back: [], front: [{ d: 'M 32 36 C 31 24 38 19 50 19 C 62 19 69 24 68 36 C 64 30 58 28 50 28 C 42 28 36 30 32 36 Z' }] },
  'short-beard': { tint: 'tealSoft', ears: true, back: [], front: [{ d: A_CAP_M }], beard: 'M 31 44 Q 31 72 50 74 Q 69 72 69 44 Q 66 57 60 59 Q 50 56 40 59 Q 34 57 31 44 Z' },
  'short-moustache': { tint: 'coralSoft', ears: true, back: [], front: [{ d: A_CAP_M }], beard: 'M 41 53 Q 50 47.5 59 53 Q 50 55.5 41 53 Z' },
};
/** a band of hair hugging the head outline between two angles (a fringe of hair round a bald crown) */
function crescent(a1, a2) {
  const pts = [], n = 8;
  for (let i = 0; i <= n; i++) { const a = (a1 + (a2 - a1) * i / n) * Math.PI / 180; pts.push([50 + 22.5 * Math.cos(a), 44 + 26 * Math.sin(a)]); }
  for (let i = n; i >= 0; i--) { const a = (a1 + (a2 - a1) * i / n) * Math.PI / 180; pts.push([50 + 18.5 * Math.cos(a), 44 + 22 * Math.sin(a)]); }
  return 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + ' Z';
}
const BALD_L = crescent(194, 236);
const LOOKS_ELDER_M_EXTRA = {
  'bald-crown': { tint: 'creamDeep', ears: true, back: [], front: [{ d: BALD_L }, { d: mirrorD(BALD_L) }] },
};
/* child (head x 24..76, y 22..78; jawY 72, earTopY 46) */
const C_CAP_M = 'M 24 45 C 21 21 36 16 50 16 C 64 16 79 21 76 45 C 72 35 64 30 54 30 C 44 33 32 34 27 44 Z';
const C_FRINGE = 'M 24 44 C 22 22 36 17 50 17 C 64 17 78 22 76 44 C 70 35 60 32 50 36 C 40 32 30 35 24 44 Z';
const C_SWEPT = 'M 25 40 C 23 22 36 17 50 17 C 64 17 77 22 75 40 C 69 32 60 29 50 29 C 40 29 31 32 25 40 Z';
const LOOKS_CHILD_F = {
  pigtails: { tint: 'coralSoft', ears: false, back: [{ d: 'M 27 34 C 10 34 6 66 14 86 C 19 74 22 58 28 48 Z' }, { d: mirrorD('M 27 34 C 10 34 6 66 14 86 C 19 74 22 58 28 48 Z') }], front: [{ d: C_FRINGE }], detail: ['M 22 38 L 28 44', 'M 78 38 L 72 44'] },
  'long-straight': { tint: 'tealSoft', ears: false, back: [{ d: 'M 22 50 C 20 18 36 14 50 14 C 64 14 80 18 78 50 L 80 86 Q 50 94 20 86 Z' }], front: [{ d: C_FRINGE }] },
  ponytail: { tint: 'creamDeep', ears: true, back: [{ d: 'M 68 26 C 92 26 96 58 88 88 C 83 76 79 60 72 46 Z' }], front: [{ d: C_SWEPT }], detail: ['M 71 29 L 76 36'] },
  braids: { tint: 'white', ears: false, back: [{ d: 'M 23 50 C 21 20 36 15 50 15 C 64 15 79 20 77 50 L 76 64 L 24 64 Z' }], front: [{ d: C_FRINGE }], drape: [...braid(22, 64, 24, 94, 5, 5.5, 5), ...braid(78, 64, 76, 94, 5, 5.5, 5)] },
  'bob-fringe': { tint: 'coralSoft', ears: false, back: [{ d: 'M 21 48 C 20 17 36 14 50 14 C 64 14 80 17 79 48 L 80 82 Q 50 88 20 82 Z' }], front: [{ d: 'M 24 42 C 24 22 36 18 50 18 C 64 18 76 22 76 42 Z' }] },
  bun: { tint: 'tealSoft', ears: false, back: [{ c: [50, 14, 11] }, { d: 'M 25 40 Q 18 64 24 84 Q 28 70 29 52 Z' }, { d: mirrorD('M 25 40 Q 18 64 24 84 Q 28 70 29 52 Z') }], front: [{ d: C_SWEPT }] },
};
const LOOKS_CHILD_M = {
  short: { tint: 'tealSoft', ears: true, back: [], front: [{ d: C_CAP_M }] },
  'spiky-fringe': { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 24 44 C 21 22 36 16 50 16 C 64 16 79 22 76 44 L 71 36 L 66 41 L 61 34 L 55 40 L 50 33 L 44 40 L 39 34 L 33 41 L 29 36 Z' }] },
  'curly-short': { tint: 'creamDeep', ears: true, back: [], front: curls({ cx: 50, cy: 42, rx: 23, ry: 22, from: 190, to: 350, n: 8, r: 7 }) },
  'side-part': { tint: 'white', ears: true, back: [], front: [{ d: 'M 24 45 C 20 21 37 15 53 16 C 67 16 79 23 76 45 C 73 35 67 30 60 29 C 50 28 42 30 35 35 C 30 38 27 41 26 44 Z' }], detail: ['M 42 18 Q 40 24 42 29'] },
  crew: { tint: 'tealSoft', ears: true, back: [], front: [{ d: 'M 25 40 C 24 25 35 20 50 20 C 65 20 76 25 75 40 C 70 33 61 30 50 30 C 39 30 30 33 25 40 Z' }] },
  swoop: { tint: 'coralSoft', ears: true, back: [], front: [{ d: 'M 24 45 C 21 22 38 14 56 17 C 70 19 79 28 76 45 C 72 36 66 32 58 31 C 50 36 38 40 26 44 Z' }] },
};
const LOOKS_BABY = { baby: { tint: 'white', ears: true, back: [], front: [], curl: 'M 50 30 q 6 -6 2 -10 q -5 -2 -6 4' } };

/** ELDER MALE CUE (landing review 2026-09-23: a curly-haired grandpa read as mum): every elder m figure
 *  carries a beard, a moustache or the bald crown. A look with none gets the short moustache added. */
const ELDER_M_MOUSTACHE = 'M 41 53 Q 50 47.5 59 53 Q 50 55.5 41 53 Z';
function elderMaleCue(look, L) { return L.beard ? (/beard/.test(look) ? 'beard' : 'moustache') : look === 'bald-crown' ? 'bald' : 'moustache'; }
/** glasses on 3 elder looks per sex */
const ELDER_GLASSES = new Set(['f:long-straight', 'f:bun', 'f:bob-fringe', 'm:short', 'm:crew', 'm:bald-crown']);

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
  const hair = age === 'elder' ? T.grid : T.ink;
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
  if (g.neck) parts.push(`<rect x="${g.neck.x}" y="${g.neck.y}" width="${g.neck.w}" height="${g.neck.h}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}"/>`);
  // 4 ears (hidden by long hair: those looks declare ears:false)
  if (L.ears) for (const [ex, ey] of g.ears) parts.push(`<ellipse cx="${ex}" cy="${ey}" rx="${g.earR[0]}" ry="${g.earR[1]}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}" data-lcs-ear=""/>`);
  // 5 head
  parts.push(`<ellipse cx="${g.head.cx}" cy="${g.head.cy}" rx="${g.head.rx}" ry="${g.head.ry}" fill="${T.white}" stroke="${T.teal}" stroke-width="${sw}" data-lcs-head=""/>`);
  // 6 front hair
  for (const s of L.front) parts.push(shapeSvg(s, hair, sw, hairAttr));
  if (L.detail) for (const d of L.detail) parts.push(`<path d="${d}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  // 7 beard / moustache (m only; a separate shape, not hair reach)
  const cue = age === 'elder' && sex === 'm' ? elderMaleCue(look, L) : null;
  const beardD = L.beard || (cue === 'moustache' ? ELDER_M_MOUSTACHE : null);
  if (beardD) {
    if (sex !== 'm') throw new Error(`familyFigure: a beard on an f look (${look})`);
    parts.push(`<path d="${beardD}" fill="${hair}" stroke="${T.teal}" stroke-width="${sd * 1.4}" stroke-linejoin="round" data-lcs-beard=""/>`);
  }
  // 8 face
  if (L.curl) parts.push(`<path d="${L.curl}" fill="none" stroke="${T.teal}" stroke-width="${+(2 / scale).toFixed(3)}" stroke-linecap="round" data-lcs-curl=""/>`);
  for (const [ex, ey] of g.eyes) parts.push(`<circle cx="${ex}" cy="${ey}" r="${g.eyeR}" fill="${T.teal}" data-lcs-eye=""/>`);
  if (g.nose) parts.push(`<path d="${g.nose}" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round"/>`);
  parts.push(`<path d="${g.mouth}" fill="none" stroke="${T.teal}" stroke-width="${sd * 1.3}" stroke-linecap="round" data-lcs-mouth=""/>`);
  if (age === 'baby') for (const [cx, cy] of [[33, 72], [67, 72]]) parts.push(`<circle cx="${cx}" cy="${cy}" r="3" fill="${T.coralSoft}"/>`);
  if (age === 'elder') {
    parts.push(`<path d="M 34 50 Q 36 56 40 58" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round" data-lcs-cheek=""/>`);
    parts.push(`<path d="M 66 50 Q 64 56 60 58" fill="none" stroke="${T.teal}" stroke-width="${sd}" stroke-linecap="round" data-lcs-cheek=""/>`);
    if (ELDER_GLASSES.has(sex + ':' + look)) {
      const gw = +(2 / scale).toFixed(3);
      parts.push(`<g data-lcs-glasses="" fill="none" stroke="${T.teal}" stroke-width="${gw}"><circle cx="43" cy="44" r="6.5"/><circle cx="57" cy="44" r="6.5"/><path d="M 49.5 44 L 50.5 44"/></g>`);
    }
  }
  // 9 drape (a braid over the shoulder, in front of the garment)
  if (L.drape) for (const s of L.drape) parts.push(shapeSvg(s, hair, sw, hairAttr));

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

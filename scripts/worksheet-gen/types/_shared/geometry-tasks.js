/**
 * Factory for the geometry family (class 10), driven by the shapes library
 * theme + lib/shape-data.js facts:
 *  - 'count-sides':    polygon cards → write sides (K-075)
 *  - 'sort-sides':     shapes strip → numeral-labeled bins (K-076/G2-241)
 *  - 'solid-counts':   solids → write faces|edges|vertices (G2-242/245/246)
 *  - 'solid-real':     solids ↔ real-world objects, lines (G2-243)
 *  - 'symmetry-yn':    icon split by a dashed line → ✓/✗ chips (G2-247)
 *  - 'pick-symmetric': circle the mirror-symmetric picture (G2-248)
 *  - 'perimeter':      unit-grid rectangle → perimeter (G3-337)
 *  - 'same-area':      circle the shape with the SAME area/perimeter (G3-338/339)
 *  - 'classify-quads': is it a rectangle? two bins (G3-340)
 *  - 'angles':         circle every RIGHT angle (G3-341)
 *  - 'symmetry-count': write how many mirror lines (G3-342)
 *
 * Level Set 2026-10-08 (Geometry, PDF + interactive + answer key): cfg/level knobs move levels 1 and 3; a NEW page also
 * builds its screen version and answer key (lib/geometry-screen.js). Fixes on EVERY level (the published pages are
 * republished): the right angles carried the right-angle mark, so "circle every right angle" was "find the little
 * square"; the quadrilateral bins square / rectangle / other gave a square two right bins (a square IS a rectangle) —
 * the page now asks "is it a rectangle?", squares included; the solid ↔ object pairs matched a cut-off cone to a
 * strawberry and a cylinder to a bucket (a cut-off cone too); mirror-symmetry pictures came from a silhouette score the
 * eye disagrees with — they now come only from the by-eye list data/symmetry-review.js; the cylinder's "2 edges" is a
 * convention some curricula count as 0, so the edges face leaves the cylinder out.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { themeEntry, fileUri, labelSafeNouns } = require('../../image-cache/resolve.js');
const { SHAPES_2D, SHAPES_3D, SOLID_REAL_OBJECTS } = require('../../lib/shape-data.js');
const SYM_REVIEW = require('../../data/symmetry-review.js');
const { answerBox } = require('../../templates/components.js');
const { svgRoot, el, roundedRect, line } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

// mirror-line counts for the shapes-theme art (hand-curated; circle skipped — "endless")
const SYMMETRY_COUNT = { square: 4, rectangle: 2, triangle: 3, diamond: 4, oval: 2, pentagon: 5, hexagon: 6, heart: 1, star: 5, trapezoid: 1 };
/* ⚠ diamond is 4 because the shipped artwork IS a square rotated 45 degrees (measured 90.0 / 90.06 / 89.94 / 90.0
   degrees, sides within 0.21%). ⭐ The durable fix is to redraw `image library/shapes/diamond.png` as a genuinely
   non-square rhombus; when that art lands, revert this to 2. (The quadrilateral page no longer uses the library
   art — it draws its own shapes, see quadPoints.) */

function shapeImg(k, px, extra) {
  return `<img class="ws-icon" src="${fileUri('shapes', k)}" alt="" style="width:${px}px;height:${px}px"${extra || ''}>`;
}

// an angle: two rays from a vertex. NO right-angle mark — a mark on exactly the right angles gave the answer away.
function angleSvg(deg, size) {
  const t = tokens;
  const c = 14, len = size - 22;
  const a = (-deg) * Math.PI / 180;
  const x2 = c + len * Math.cos(a), y2 = (size - 14) + len * Math.sin(a);
  const parts = [
    line({ x1: c, y1: size - 14, x2: c + len, y2: size - 14, strokeColor: t.color.ink, strokeWidth: 3.5 }),
    line({ x1: c, y1: size - 14, x2, y2, strokeColor: t.color.ink, strokeWidth: 3.5 }),
  ];
  return svgRoot({ width: size, height: size, label: `angle ${deg} degrees` }, parts.join(''), { 'data-lcs-angle': deg });
}

function unitRect(r, c, cell) {
  const t = tokens;
  const parts = [];
  for (let rr = 0; rr < r; rr++) for (let cc = 0; cc < c; cc++) {
    parts.push(roundedRect({
      x: cc * cell + 1, y: rr * cell + 1, w: cell - 2, h: cell - 2, r: 2,
      fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 1.5, data: { 'data-lcs-sq': 1 },
    }));
  }
  return svgRoot({ width: c * cell + 2, height: r * cell + 2, label: `${r} by ${c} rectangle` },
    parts.join(''), { 'data-lcs-rect-r': r, 'data-lcs-rect-c': c });
}

// a plain rectangle with its side LENGTHS written on two adjacent sides (level 3 perimeter: no squares to count)
function labelledRect(r, c) {
  const t = tokens;
  const scale = Math.min(150 / c, 90 / r, 22);
  const w = c * scale, h = r * scale, pad = 34;
  const parts = [
    roundedRect({ x: pad, y: 8, w, h, r: 3, fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 3 }),
    el('text', { x: pad + w / 2, y: 8 + h + 26, 'text-anchor': 'middle', 'font-family': "'Baloo 2'", 'font-weight': 700, 'font-size': 22, fill: t.color.ink, 'data-lcs-len': c }, String(c)),
    el('text', { x: pad - 10, y: 8 + h / 2 + 8, 'text-anchor': 'end', 'font-family': "'Baloo 2'", 'font-weight': 700, 'font-size': 22, fill: t.color.ink, 'data-lcs-len': r }, String(r)),
  ];
  return svgRoot({ width: pad + w + 8, height: h + 44, label: `rectangle ${r} by ${c}` }, parts.join(''), { 'data-lcs-rect-r': r, 'data-lcs-rect-c': c, 'data-lcs-labelled': 1 });
}

/**
 * Quadrilaterals drawn by the page itself (the classify page). kind: square, rect, rhombus, parallelogram, trapezoid,
 * kite, irregular; rot: degrees. Returns the 4 corners (centred in a 120×120 box) — the page stamps them and the
 * verifier recomputes "rectangle = four right angles" from them, never from the kind.
 */
function quadPoints(kind, rng, rot) {
  let P;
  if (kind === 'square') { const s = rng.int(56, 72); P = [[0, 0], [s, 0], [s, s], [0, s]]; }
  else if (kind === 'rect') { const h = rng.int(40, 52), w = Math.round(h * (1.5 + rng.next() * 0.7)); P = [[0, 0], [w, 0], [w, h], [0, h]]; }
  else if (kind === 'rhombus') { const s = 64, a = (55 + rng.int(0, 15)) * Math.PI / 180; P = [[0, 0], [s, 0], [s + s * Math.cos(a), s * Math.sin(a)], [s * Math.cos(a), s * Math.sin(a)]]; }
  else if (kind === 'parallelogram') { const w = rng.int(62, 78), h = rng.int(40, 52), k = rng.int(20, 30); P = [[k, 0], [w + k, 0], [w, h], [0, h]]; }
  else if (kind === 'trapezoid') { const b = rng.int(80, 96), tp = rng.int(40, 56), h = rng.int(44, 56), off = (b - tp) / 2 + rng.int(-8, 8); P = [[off, 0], [off + tp, 0], [b, h], [0, h]]; }
  else if (kind === 'kite') { const w = rng.int(56, 70), h1 = rng.int(22, 30), h2 = rng.int(50, 62); P = [[w / 2, 0], [w, h1], [w / 2, h1 + h2], [0, h1]]; }
  else { P = [[0, rng.int(18, 28)], [rng.int(58, 68), 0], [rng.int(88, 100), rng.int(46, 56)], [rng.int(18, 30), rng.int(66, 76)]]; }
  const cx = P.reduce((s, p) => s + p[0], 0) / 4, cy = P.reduce((s, p) => s + p[1], 0) / 4;
  const a = (rot || 0) * Math.PI / 180;
  const R = P.map(([x, y]) => [x - cx, y - cy]).map(([x, y]) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]);
  // fitted to the 120×120 box after turning (a long rectangle turned 30° would poke out of it)
  const xs = R.map((p) => p[0]), ys = R.map((p) => p[1]);
  const k = Math.min(1.35, 104 / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)));
  const mx = (Math.max(...xs) + Math.min(...xs)) / 2, my = (Math.max(...ys) + Math.min(...ys)) / 2;
  return R.map(([x, y]) => [Math.round(((x - mx) * k + 60) * 10) / 10, Math.round(((y - my) * k + 60) * 10) / 10]);
}
/** the corner angles in degrees */
function cornerAngles(P) {
  return P.map((q, i) => { const p = P[(i + 3) % 4], r = P[(i + 1) % 4]; const a = [p[0] - q[0], p[1] - q[1]], b = [r[0] - q[0], r[1] - q[1]];
    return Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180 / Math.PI; });
}
/** four right angles (to within half a degree) */
function isRectangle(P) {
  for (let i = 0; i < 4; i++) {
    const p = P[(i + 3) % 4], q = P[i], r = P[(i + 1) % 4];
    const v1 = [p[0] - q[0], p[1] - q[1]], v2 = [r[0] - q[0], r[1] - q[1]];
    const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
    if (Math.abs(cos) > Math.cos((90 - 0.5) * Math.PI / 180)) return false;
  }
  return true;
}
// the site palette only (qa/lints.js whitelists primitives/_tokens.js)
const QUAD_FILL = [tokens.color.tealSoft, tokens.color.coralSoft, tokens.color.creamDeep];
function quadSvg(P, px, fill) {
  return svgRoot({ width: px, height: px, label: 'four-sided shape' },
    el('polygon', { points: P.map((p) => p.join(',')).join(' '), fill, stroke: tokens.color.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'data-lcs-quad': 1 }),
    { viewBox: '0 0 120 120', 'data-lcs-pts': P.map((p) => p.join(',')).join(' ') });
}

/**
 * A polygon the page draws itself (count / sort the sides): n corners around a circle, unevenly spaced and turned, so a
 * child counts real sides instead of recognising one familiar picture. Every corner is a VISIBLE corner (interior angle
 * at most 145 degrees — 150 for 7 and 8 sides, whose regular corners are 129 and 135 — and every side at least 26 units
 * long (a 159-degree corner read as no corner at all: an octagon counted as 7, 2026-10-08); the verifier counts the corners.
 */
function polyPoints(n, rng) {
  for (let g = 0; g < 2000; g++) {
    const step = 2 * Math.PI / n, a0 = rng.next() * step;
    const P = Array.from({ length: n }, (_, i) => {
      const a = a0 + i * step + (rng.next() - 0.5) * step * (n >= 7 ? 0.3 : 0.5), r = 44 + rng.next() * 10;
      return [Math.round((60 + r * Math.cos(a)) * 10) / 10, Math.round((60 + r * Math.sin(a)) * 10) / 10];
    });
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      const pp = P[(i + n - 1) % n], q = P[i], r = P[(i + 1) % n];
      const v1 = [pp[0] - q[0], pp[1] - q[1]], v2 = [r[0] - q[0], r[1] - q[1]];
      const ang = Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2))) * 180 / Math.PI;
      if (ang > (n >= 7 ? 150 : 145) || Math.hypot(...v2) < 26) ok = false;
    }
    if (ok) return P;
  }
  throw new Error('geometry: no clear ' + n + '-sided polygon');
}
function polySvg(P, px, fill) {
  return svgRoot({ width: px, height: px, label: P.length + '-sided shape' },
    el('polygon', { points: P.map((q) => q.join(',')).join(' '), fill, stroke: tokens.color.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }),
    { viewBox: '0 0 120 120', 'data-lcs-pts': P.map((q) => q.join(',')).join(' ') });
}
const POLY_FILL = [tokens.color.tealSoft, tokens.color.coralSoft, tokens.color.creamDeep];

/**
 * The solids the counting pages draw themselves (2026-10-08): the library pictures are OPAQUE — a child counting the
 * edges of the cube picture finds 9, its faces 3. School books draw a solid see-through with its HIDDEN edges dashed,
 * so every face, edge and corner can be counted on the page. Cube, box, square pyramid and cylinder; the sphere keeps
 * its picture (nothing to hide).
 */
const DRAWN_SOLIDS = ['cube', 'rectangular_box', 'pyramid', 'cylinder'];
function solidSvg(kind, px) {
  const C = tokens.color, P = (pts) => pts.map((q) => q.join(',')).join(' ');
  const face = (pts, fill) => el('polygon', { points: P(pts), fill, 'fill-opacity': 0.6, stroke: 'none' });
  const seg = (a, b, hid) => el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: C.teal, 'stroke-width': hid ? 2 : 3,
    'stroke-linecap': 'round', ...(hid ? { 'stroke-dasharray': '5 5', 'data-lcs-hidden': '1' } : {}) });
  let parts = [];
  if (kind === 'cube' || kind === 'rectangular_box') {
    const [w, h, d] = kind === 'cube' ? [60, 60, 26] : [42, 78, 22];
    const x0 = (120 - w - d) / 2, yb = (120 + h + d) / 2 - d;   // front face bottom-left
    const A = [x0, yb + d / 2], B = [x0 + w, yb + d / 2], Cc = [x0 + w, yb + d / 2 - h], D = [x0, yb + d / 2 - h];
    const o = (q) => [q[0] + d, q[1] - d];
    const [A2, B2, C2, D2] = [A, B, Cc, D].map(o);
    parts = [face([A, B, Cc, D], C.tealSoft), face([D, Cc, C2, D2], C.creamDeep), face([B, B2, C2, Cc], C.coralSoft),
      seg(A2, A, 1), seg(A2, B2, 1), seg(A2, D2, 1),
      seg(A, B), seg(B, Cc), seg(Cc, D), seg(D, A), seg(D, D2), seg(Cc, C2), seg(B, B2), seg(D2, C2), seg(C2, B2)];
  } else if (kind === 'pyramid') {
    const A = [16, 98], B = [80, 98], Cc = [104, 76], D = [40, 76], T = [60, 12];
    parts = [face([T, A, B], C.tealSoft), face([T, B, Cc], C.coralSoft),
      seg(D, A, 1), seg(D, Cc, 1), seg(T, D, 1), seg(A, B), seg(B, Cc), seg(T, A), seg(T, B), seg(T, Cc)];
  } else if (kind === 'cylinder') {
    parts = [el('path', { d: 'M 24 26 L 24 96 A 36 11 0 0 0 96 96 L 96 26 Z', fill: C.tealSoft, 'fill-opacity': 0.6 }),
      el('ellipse', { cx: 60, cy: 26, rx: 36, ry: 11, fill: C.creamDeep, stroke: C.teal, 'stroke-width': 3 }),
      el('path', { d: 'M 24 96 A 36 11 0 0 1 96 96', fill: 'none', stroke: C.teal, 'stroke-width': 2, 'stroke-dasharray': '5 5', 'data-lcs-hidden': '1' }),
      el('path', { d: 'M 24 96 A 36 11 0 0 0 96 96', fill: 'none', stroke: C.teal, 'stroke-width': 3 }),
      seg([24, 26], [24, 96]), seg([96, 26], [96, 96])];
  } else throw new Error('solidSvg: ' + kind);
  return svgRoot({ width: px, height: px, viewBox: '0 0 120 120', label: kind.replace('_', ' ') }, parts.join(''), { 'data-lcs-solid': kind });
}

/** yes / no chips: ✓ and ✗ — but in Swedish and Finnish schools a tick (bock / rasti) marks a WRONG answer, so there
 * the chips are the words (2026-10-08 native review) */
const YES_NO_WORDS = { sv: ['ja', 'nej'], fi: ['kyllä', 'ei'] };
function yesNoChips(sym, loc) {
  const w = YES_NO_WORDS[loc];
  const chip = (val, ok, txt) => `<span class="ws-chip" style="${w ? 'min-width:52px;width:auto;padding:0 10px;font-size:20px' : 'width:52px;font-size:24px'};height:52px" data-lcs-val="${val}"${ok ? ' data-lcs-correct="1"' : ''}>${txt}</span>`;
  return chip('yes', sym, w ? w[0] : '✓') + chip('no', !sym, w ? w[1] : '✗');
}

/** the reviewed mirror-symmetry pictures of a theme (only those the library still has, label-safe) */
function reviewedPools(theme) {
  const R = SYM_REVIEW[theme];
  if (!R) return { sym: [], asym: [] };
  const have = new Map(labelSafeNouns(theme).map((n) => [n.noun, n]));
  return { sym: R.sym.filter((n) => have.has(n)).map((n) => have.get(n)), asym: R.asym.filter((n) => have.has(n)).map((n) => have.get(n)) };
}

function makeGeometryType(cfg) {
  const { id, slug, mode, facet, gradeBand, i18n } = cfg;
  const screenLib = () => require('../../lib/geometry-screen.js');
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G23',
    assetClass: 'geometry',
    exerciseType: 'geometry',
    themeAxis: { applicable: ['symmetry-yn', 'pick-symmetric'].includes(mode), minNouns: 6 },
    difficulty: cfg.difficulty || { 1: { rows: 4 }, 2: { rows: 4 }, 3: { rows: 5 } },
    i18n,
    geometryMode: mode,
    // Level Set 2026-10-08: the screen version + answer key of every NEW page
    interactive: require('../../lib/geometry-screen.js').interactiveFor(mode, facet),
    /** Level Set copies: what a page asks (build-waves compares copies by these) */
    levelSetWords(m) { return (m.asks || []).map(String); },

    // synchronous (the mirror pictures come from the reviewed list now, not from awaited silhouette masks)
    build({ theme, difficulty, locale }, ctx) {
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
        const built = this.build({ theme, difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
        return screenLib().screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2), theme, mode, facet });
      }
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const have = Object.keys(themeEntry('shapes').nouns);
      const cards = [];
      const items = [];   // what each card / item asks, structured (the screen version + answer key)
      const out = (bodyHtml, extraMeta) => ({ bodyHtml, meta: published ? (extraMeta || {}) : { ...(extraMeta || {}), asks: items.map((x) => x.ask) }, _cards: { mode, facet, items, theme } });

      if (mode === 'count-sides') {
        const polyAll = Object.keys(SHAPES_2D).filter((k) => have.includes(k) && SHAPES_2D[k].sides > 0);
        let polys;
        if (difficulty === 1) polys = rng.sample(polyAll.filter((k) => SHAPES_2D[k].sides <= 4), 4);   // L1: 3 and 4 sides, 4 cards
        else if (difficulty === 3) {
          // L3: the 5- to 8-sided shapes, plus two others
          const big = rng.shuffle(polyAll.filter((k) => SHAPES_2D[k].sides >= 5));
          polys = rng.shuffle([...big, ...rng.sample(polyAll.filter((k) => SHAPES_2D[k].sides <= 4), 6 - big.length)]);
          // a NEW page: its library slots (every other card) hold 5- to 8-sided shapes only — level 3 must not ask a triangle
          if (!published) { const b = rng.shuffle(big.slice()); polys = [0, 1, 2, 3, 4, 5].map((i) => b[Math.floor(i / 2) % b.length]); }
        } else polys = rng.sample(polyAll, Math.min(6, d.rows + 2));
        // a NEW page draws about half its shapes itself (uneven, turned polygons with the level's numbers of sides)
        const sideSet = difficulty === 1 ? [3, 4] : difficulty === 3 ? [5, 6, 7, 8] : [3, 4, 5, 6, 7, 8];
        polys.slice(0, 6).forEach((k, i) => {
          if (!published && i % 2 === 1) {
            const n = rng.pick(sideSet), P = polyPoints(n, rng), fill = POLY_FILL[i % 3];
            cards.push('<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-shape="poly" data-lcs-sides="' + n + '">' +
              polySvg(P, 112, fill) + answerBox({ w: 64, h: 50, answer: n }) + '</div>');
            items.push({ ask: 'p' + n + ':' + Math.round(P[0][0]), shape: 'poly', P, fill, ans: n });
            return;
          }
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-shape="${k}" data-lcs-sides="${SHAPES_2D[k].sides}">` +
            shapeImg(k, 110) + answerBox({ w: 64, h: 50, answer: SHAPES_2D[k].sides }) + `</div>`);
          items.push({ ask: k, shape: k, ans: SHAPES_2D[k].sides });
        });
        return out(cardGrid({ cards, cols: cards.length === 4 ? 2 : 3, rows: 2 }));
      }

      // Levels for the modes below ignored the level before 2026-09-27 (Level
      // Set programme). Level 2 of each is unchanged (published level;
      // snapshot-proven); only the art that exists is used, and every level
      // keeps the type's instruction true.
      if (mode === 'sort-sides') {
        // L1: triangles vs four-sided shapes (2 bins, 5 shapes); L3: 3-6 sides (4 bins, 8 shapes)
        const sideGroups = difficulty === 1 ? [3, 4] : difficulty === 3 ? [3, 4, 5, 6] : [3, 4, rng.pick([5, 6])];
        const pool = Object.keys(SHAPES_2D).filter((k) => have.includes(k) && sideGroups.includes(SHAPES_2D[k].sides));
        let picked = rng.shuffle(pool).slice(0, difficulty === 1 ? 5 : difficulty === 3 ? 8 : 7);
        // a NEW page spreads its answers evenly over the bins (most library shapes have four sides, so "always 4" won
        // 54% — guessability 2026-10-08), and draws about half its shapes itself (uneven, turned polygons)
        let want = null;
        if (!published) {
          want = [];
          while (want.length < picked.length) want.push(...rng.shuffle(sideGroups.slice()));
          want = rng.shuffle(want.slice(0, picked.length));
          const left = rng.shuffle(pool.slice());
          picked = want.map((n, i) => {
            if (i % 2 === 1) return 'poly';
            const j = left.findIndex((k) => SHAPES_2D[k].sides === n);
            return j < 0 ? 'poly' : left.splice(j, 1)[0];
          });
        }
        const drawn = picked.map((k, i) => (k === 'poly' ? { n: want[i], i } : null));
        drawn.forEach((x) => { if (x) { x.P = polyPoints(x.n, rng); x.fill = POLY_FILL[x.i % 3]; } });
        const strip = picked.map((k, i) => drawn[i]
          ? '<span class="ws-pattern-slot" style="width:88px;height:88px" data-lcs-item="poly" data-lcs-sides="' + drawn[i].n + '">' + polySvg(drawn[i].P, 72, drawn[i].fill) + '</span>'
          :
          `<span class="ws-pattern-slot" style="width:88px;height:88px" data-lcs-item="${k}" data-lcs-sides="${SHAPES_2D[k].sides}">${shapeImg(k, 64)}</span>`).join('');
        const bins = sideGroups.map((s) =>
          `<div class="ws-bin" data-lcs-bin="${s}">` +
          `<span class="ws-bin-label" style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">${s}</span></div>`).join('');
        picked.forEach((k, i) => items.push(drawn[i]
          ? { ask: 'p' + drawn[i].n + ':' + Math.round(drawn[i].P[0][0]), shape: 'poly', P: drawn[i].P, fill: drawn[i].fill, ans: drawn[i].n, bins: sideGroups }
          : { ask: k, shape: k, ans: SHAPES_2D[k].sides, bins: sideGroups }));
        return out(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0">` +
          `<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">${strip}</div>` +
          `<div style="display:flex;justify-content:space-evenly;gap:24px">${bins}</div></div>`);
      }

      if (mode === 'solid-counts') {
        // 5-solid pool (cube, rectangular_box, pyramid, sphere, cylinder). 'cone' is EXCLUDED: its shapes-theme art is
        // a frustum (flat top). L1: no pyramid (the hardest count); L3: no sphere (the 0 give-away).
        // Edges: no CYLINDER — its "2 edges" is a convention some curricula count as 0 (an edge is a straight segment),
        // so the page had no single right answer across the 11 school systems.
        const skip = difficulty === 1 ? 'pyramid' : difficulty === 3 ? 'sphere' : null;
        let picked = rng.shuffle(Object.keys(SHAPES_3D).filter((k) => have.includes(k) && k !== 'cone' && k !== skip && !(facet === 'edges' && k === 'cylinder')));
        // a NEW page asks at most ONE solid whose answer is 0 (a sphere's / cylinder's corners): 0 is always the smallest
        // number on the screen, so two of them made "tap the smallest" a winning rule (guessability 2026-10-08)
        if (!published) { let zeros = 0; picked = picked.filter((k) => (SHAPES_3D[k][facet] === 0 ? ++zeros <= 1 : true)); }
        picked = picked.slice(0, 4);
        picked.forEach((k) => {
          cards.push(`<div class="ws-card-stage" style="gap:30px" data-lcs-shape="${k}" data-lcs-count="${SHAPES_3D[k][facet]}">` +
            (DRAWN_SOLIDS.includes(k) ? solidSvg(k, 150) : shapeImg(k, 120)) + answerBox({ w: 64, h: 52, answer: SHAPES_3D[k][facet] }) + `</div>`);
          items.push({ ask: k, shape: k, ans: SHAPES_3D[k][facet] });
        });
        // three solids stack as three wide rows: in three columns the answer box beside a solid was squeezed to a
        // sliver (live page 2026-10-08 — nothing overflowed, the box just shrank)
        return out(cardGrid({ cards, cols: cards.length === 3 ? 1 : 2, rows: cards.length === 3 ? 3 : 2 }), { facet });
      }

      if (mode === 'solid-real') {
        const entries = Object.entries(SOLID_REAL_OBJECTS).filter(([k]) => have.includes(k));
        // L1: three pairs, the plainest object of each solid; L2: four pairs (the published page: the first object);
        // L3: four pairs with the less obvious objects (a globe, a stack of blocks, a drum or a candle, a book)
        const picked = rng.shuffle(entries).slice(0, difficulty === 1 ? 3 : 4);
        const objOf = (objs) => (published ? objs[0] : difficulty === 3 ? rng.pick(objs.slice(1)) : rng.pick(objs));
        const pairs = picked.map(([solid, objs]) => ({ solid, obj: objOf(objs) }));
        let order;
        do { order = rng.shuffle(pairs.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);   // same row height at every level
        const left = pairs.map(({ solid }) =>
          `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-lcs-left="${solid}">` +
          shapeImg(solid, Math.min(110, itemH - 30)) +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) => {
          const { solid, obj } = pairs[idx];
          return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-lcs-right="${solid}" data-lcs-obj="${obj.theme}/${obj.noun}">` +
            `<img class="ws-icon" src="${fileUri(obj.theme, obj.noun)}" alt="" style="width:${Math.min(100, itemH - 34)}px;height:${Math.min(100, itemH - 34)}px">` +
            `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
        }).join('');
        pairs.forEach((p) => items.push({ ask: p.solid + '=' + p.obj.noun, solid: p.solid, obj: p.obj }));
        return out(`<div class="ws-match" style="padding:6px 60px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`);
      }

      if (mode === 'symmetry-yn' || mode === 'pick-symmetric') {
        // pictures from the by-eye reviewed list only (data/symmetry-review.js) — the silhouette score disagreed with
        // the eye, so a page had two or three pictures that are "the same on both sides"
        const { sym: symAll, asym: asymAll } = reviewedPools(theme);
        const sym = rng.shuffle(symAll), asym = rng.shuffle(asymAll);
        const nYn = mode === 'symmetry-yn' && difficulty === 3 ? 3 : 2;   // L3: six cards
        // pick-symmetric: one symmetric picture per row, so the theme needs enough of them for a full page
        const minSym = mode === 'symmetry-yn' ? 2 : Math.min(d.rows, 4);
        if (sym.length < minSym || asym.length < (mode === 'symmetry-yn' ? 2 * nYn - Math.min(nYn, sym.length) : 2)) {
          throw new Error(`geometry: theme ${theme} has too few reviewed mirror pictures for ${mode} (sym=${sym.length}, asym=${asym.length})`);
        }
        // a new theme for the circle-the-picture page needs a lopsided picture per row (no repeats on the page); the
        // published themes (cfg.pubThemes) keep the pictures they have
        if (mode === 'pick-symmetric' && !(cfg.pubThemes || []).includes(theme) && asym.length < d.rows) {
          throw new Error(`geometry: theme ${theme} has too few reviewed lopsided pictures for ${mode} (asym=${asym.length})`);
        }
        if (mode === 'symmetry-yn') {
          const nSym = Math.min(nYn, sym.length);
          const picks = rng.shuffle([...sym.slice(0, nSym).map((n) => ({ n, s: true })), ...asym.slice(0, 2 * nYn - nSym).map((n) => ({ n, s: false }))]);
          picks.forEach(({ n, s }) => {
            cards.push(
              `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-sym="${s ? 1 : 0}" data-lcs-noun="${theme}|${n.noun}">` +
              `<span style="position:relative;display:inline-block">` +
              `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:120px;height:120px">` +
              `<span style="position:absolute;left:50%;top:-6px;bottom:-6px;width:0;border-left:3px dashed #F2784B"></span></span>` +
              `<div class="ws-choices">` +
              yesNoChips(s, (locale || 'en').slice(0, 2)) +
              `</div></div>`);
            items.push({ ask: n.noun, noun: n.noun, sym: s });
          });
          return out(cardGrid({ cards, cols: 2, rows: Math.ceil(cards.length / 2) }));
        }
        // pick-symmetric rows: 1 symmetric + 2 asymmetric (L1: + 1 asymmetric)
        // the lopsided pictures are drawn without repeating one on the page while the theme has enough
        let bag = rng.shuffle(asym.slice());
        const drawAsym = (k) => { const outA = []; while (outA.length < k) { if (!bag.length) bag = rng.shuffle(asym.slice()); const n = bag.pop(); if (!outA.includes(n)) outA.push(n); } return outA; };
        for (let i = 0; i < Math.min(d.rows, sym.length); i++) {
          const opts = rng.shuffle([{ n: sym[i], ok: true }, ...(published ? rng.sample(asym, 2) : drawAsym(difficulty === 1 ? 1 : 2)).map((n) => ({ n, ok: false }))]);
          const chips = opts.map((o) =>
            `<span class="ws-pattern-chip" style="width:96px;height:96px"${o.ok ? ' data-lcs-correct="1"' : ''} data-lcs-noun="${theme}|${o.n.noun}">` +
            `<img class="ws-icon" src="${fileUri(theme, o.n.noun)}" alt="" style="width:70px;height:70px"></span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:center;gap:26px">${chips}</div>`);
          items.push({ ask: sym[i].noun, opts: opts.map((o) => ({ noun: o.n.noun, ok: o.ok })) });
        }
        return out(cardGrid({ cards, cols: 1, rows: cards.length }));
      }

      if (mode === 'perimeter') {
        const used = new Set();
        for (let i = 0; i < 4; i++) {
          let r, c, g = 0;
          // L1: small rectangles (sides up to 4); L3: bigger, side LENGTHS written on a plain rectangle (no squares)
          do {
            if (difficulty === 1) { r = rng.int(1, 3); c = rng.int(2, 4); }
            else if (difficulty === 3) { r = rng.int(3, 9); c = rng.int(4, 12); }
            else { r = rng.int(2, 5); c = rng.int(3, 8); }
            g++;
          } while ((used.has(r + 'x' + c) || r === c && difficulty === 3) && g < 30);
          used.add(r + 'x' + c);
          const cell = Math.min(30, Math.floor(230 / c), Math.floor(130 / r));
          const fig = difficulty === 3 ? labelledRect(r, c) : unitRect(r, c, cell);
          cards.push(`<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:6px 16px">` +
            fig + answerBox({ w: 72, h: 52, answer: 2 * (r + c) }) + `</div>`);
          items.push({ ask: r + 'x' + c, r, c, ans: 2 * (r + c), svg: difficulty === 3 ? labelledRect(r, c) : unitRect(r, c, Math.min(34, Math.floor(400 / c), Math.floor(200 / r))) });
        }
        return out(cardGrid({ cards, cols: 2, rows: 2 }));
      }

      if (mode === 'same-area' || mode === 'same-perimeter') {
        const isArea = mode === 'same-area';
        const meas = (r, c) => (isArea ? r * c : 2 * (r + c));
        for (let i = 0; i < 2; i++) {
          // target r×c; correct = different rect with same area (or perimeter)
          let r1, c1, r2, c2, g = 0;
          do {
            r1 = difficulty === 1 ? rng.int(2, 3) : rng.int(2, 4); c1 = difficulty === 1 ? rng.int(3, 4) : rng.int(3, 6);
            // a NEW page never asks the same target rectangle twice
            if (!published && items.some((x) => x.ask === `${r1}x${c1}`)) { g++; continue; }
            const candidates = [];
            for (let rr = 1; rr <= 8; rr++) for (let cc = rr; cc <= 12; cc++) {
              if (rr === r1 && cc === c1) continue;
              if (rr === c1 && cc === r1) continue;
              if (meas(rr, cc) === meas(r1, c1)) candidates.push([rr, cc]);
            }
            // a NEW page: the right rectangle is a thin strip (one row) only some of the time — "pick the thinnest"
            // won 78% (pooled guessability 2026-10-08); thicker candidates first when there are any
            if (candidates.length) {
              const thick = candidates.filter(([rr]) => rr >= 2);
              [r2, c2] = !published && thick.length && rng.next() < 0.7 ? rng.pick(thick) : rng.pick(candidates);
              break;
            }
            g++;
          } while (g < 40);
          if (r2 === undefined) { [r1, c1, r2, c2] = [2, 6, 3, 4]; }
          // distractor: differs on the measured quantity. Level 3: two of them, each NEAR the target (the other
          // measure the same, or one square more or less), so the measure must really be counted
          const wrong = [];
          if (difficulty === 3) {
            const near = [];
            for (let rr = 1; rr <= 6; rr++) for (let cc = rr; cc <= 9; cc++) {
              const v = meas(rr, cc), o = isArea ? 2 * (rr + cc) : rr * cc, to = isArea ? 2 * (r1 + c1) : r1 * c1;
              if (v === meas(r1, c1) || (rr === r1 && cc === c1)) continue;
              if (o === to || Math.abs(v - meas(r1, c1)) <= 2) near.push([rr, cc]);
            }
            for (const p of rng.shuffle(near)) { if (wrong.length < 2 && !wrong.some((w) => meas(...w) === meas(...p))) wrong.push(p); }
          }
          while (wrong.length < (difficulty === 3 ? 2 : 1)) {
            let r3, c3;
            // a NEW page sometimes offers a thin strip as a WRONG answer too
            const strip = !published && rng.next() < 0.5;
            do { r3 = strip ? 1 : rng.int(2, 5); c3 = strip ? rng.int(4, 12) : rng.int(2, 8); }
            while (meas(r3, c3) === meas(r1, c1) || wrong.some((w) => meas(...w) === meas(r3, c3)) ||
              // the row must fit the page: target + every option, in squares of the level's size
              (!published && (c1 + c2 + c3 + wrong.reduce((t, w) => t + w[1], 0)) * (difficulty === 3 ? 12 : 18) + 16 * (wrong.length + 2) > 470));
            wrong.push([r3, c3]);
          }
          // level 3 offers three rectangles: smaller squares so the row fits the page
          const cell = difficulty === 3 ? 12 : 18;
          const opt = (r, c, ok) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:12px;padding:8px"${ok ? ' data-lcs-correct="1"' : ''}>` +
            unitRect(r, c, cell) + `</span>`;
          const optList = rng.shuffle([{ r: r2, c: c2, ok: true }, ...wrong.map(([r, c]) => ({ r, c, ok: false }))]);
          cards.push(`<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:6px 14px" data-lcs-measure="${isArea ? 'area' : 'perimeter'}">` +
            `<span data-lcs-target>${unitRect(r1, c1, cell)}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#F2784B">=?</span>` +
            `<span class="ws-pattern-choices">${optList.map((o) => opt(o.r, o.c, o.ok)).join('')}</span></div>`);
          items.push({ ask: `${r1}x${c1}`, target: [r1, c1], opts: optList.map((o) => ({ r: o.r, c: o.c, ok: o.ok })), isArea });
        }
        return out(cardGrid({ cards, cols: 1, rows: 2 }));
      }

      if (mode === 'classify-quads') {
        // Is it a rectangle? Squares count — a square IS a rectangle (3.G.A.1). The shapes are drawn by the page
        // (the library has one picture per kind); level 1 clear upright shapes, level 3 turned shapes and the near
        // misses (a rhombus, a parallelogram close to a rectangle, a kite).
        const KINDS = difficulty === 1 ? ['square', 'rect', 'trapezoid', 'parallelogram', 'irregular'] : ['square', 'rect', 'rhombus', 'parallelogram', 'trapezoid', 'kite', 'irregular'];
        const n = difficulty === 1 ? 5 : difficulty === 3 ? 8 : 7;
        // about half rectangles (squares included), never all of one kind
        const rectKinds = ['square', 'rect'], otherKinds = KINDS.filter((k) => !rectKinds.includes(k));
        const nRect = difficulty === 1 ? 2 : rng.int(3, 4);
        const kinds = rng.shuffle([...Array.from({ length: nRect }, (_, i) => rectKinds[i % 2 === 0 ? rng.int(0, 1) : 1 - (i % 2)]), ...rng.shuffle(otherKinds).slice(0, n - nRect)]);
        const shapes = kinds.map((k, i) => {
          const rot = difficulty === 1 ? 0 : difficulty === 3 ? rng.pick([0, 20, 30, 45, 60]) : (k === 'square' && rng.next() < 0.5 ? 45 : 0);
          // a shape that is NOT a rectangle must not look like one: every corner well away from a square corner
          const gap = difficulty === 1 ? 12 : 8;
          let P, g = 0;
          do { P = quadPoints(k, rng, rot); g++; }
          while (!['square', 'rect'].includes(k) && cornerAngles(P).some((a) => Math.abs(a - 90) < gap) && g < 60);
          return { k, P, rect: isRectangle(P), fill: QUAD_FILL[i % QUAD_FILL.length] };
        });
        const words = require('../../data/geometry-words.js')[(locale || 'en').slice(0, 2)] || require('../../data/geometry-words.js').en;
        const strip = shapes.map((s, i) =>
          `<span class="ws-pattern-slot" style="width:112px;height:112px" data-lcs-item="${i}" data-lcs-class="${s.rect ? 'rect' : 'not'}">${quadSvg(s.P, 104, s.fill)}</span>`).join('');
        const bins = [['rect', words.rectangle], ['not', words.notRectangle]].map(([cls, w]) =>
          `<div class="ws-bin" data-lcs-bin="${cls}"><span class="ws-bin-label" style="font-family:'Nunito';font-weight:800;font-size:17px;color:#146B5E;padding:4px 10px;width:auto;white-space:nowrap">${w}</span></div>`).join('');
        shapes.forEach((s) => items.push({ ask: `${s.k}${Math.round(s.P[0][0])}`, P: s.P, rect: s.rect, fill: s.fill }));
        return out(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0">` +
          `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">${strip}</div>` +
          `<div style="display:flex;justify-content:space-evenly;gap:20px">${bins}</div></div>`);
      }

      if (mode === 'angles') {
        for (let i = 0; i < 2; i++) {
          // L1: clearly sharp (25-50°) and clearly wide (125-155°) beside the right angles; L3: near misses
          // (70-80°, 100-110°) — the eye must check the square corner, not the general look
          const acute = () => (difficulty === 1 ? rng.int(25, 50) : difficulty === 3 ? rng.int(70, 80) : rng.int(30, 65));
          const obtuse = () => (difficulty === 1 ? rng.int(125, 155) : difficulty === 3 ? rng.int(100, 110) : rng.int(110, 150));
          const degs = rng.shuffle([90, acute(), obtuse(), rng.next() < 0.5 ? 90 : (difficulty === 2 ? rng.int(35, 60) : acute())]);
          const chips = degs.map((deg) =>
            `<span class="ws-pattern-slot" style="width:120px;height:120px"${deg === 90 ? ' data-lcs-target="1"' : ''}>` +
            angleSvg(deg, 100) + `</span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-evenly">${chips}</div>`);
          items.push({ ask: degs.join('-'), degs });
        }
        return out(cardGrid({ cards, cols: 1, rows: 2 }));
      }

      if (mode === 'symmetry-count') {
        // L1: shapes with one or two mirror lines; L3: three to six
        const pool = Object.keys(SYMMETRY_COUNT).filter((k) => have.includes(k) &&
          (difficulty === 1 ? SYMMETRY_COUNT[k] <= 2 : difficulty === 3 ? SYMMETRY_COUNT[k] >= 3 : true));
        rng.sample(pool, Math.min(difficulty === 1 ? 4 : 6, pool.length)).forEach((k) => {
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-shape="${k}" data-lcs-symn="${SYMMETRY_COUNT[k]}">` +
            shapeImg(k, 104) + answerBox({ w: 60, h: 48, answer: SYMMETRY_COUNT[k] }) + `</div>`);
          items.push({ ask: k, shape: k, ans: SYMMETRY_COUNT[k] });
        });
        return out(cardGrid({ cards, cols: cards.length === 4 ? 2 : 3, rows: 2 }));
      }

      throw new Error('geometry-tasks: unknown mode ' + mode);
    },

    async verify(page) {
      const m = mode, f = facet;
      /* ⚠⚠ SY and the reviewed lists are PASSED IN, never re-declared. */
      return page.evaluate(({ mode, facet, SY, REV, OBJ }) => {
        const fails = [];
        const SIDES = { circle: 0, oval: 0, triangle: 3, square: 4, rectangle: 4, diamond: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6, heptagon: 7, octogon: 8 };
        const SOLIDS = {
          cube: { faces: 6, edges: 12, vertices: 8 }, rectangular_box: { faces: 6, edges: 12, vertices: 8 },
          sphere: { faces: 0, edges: 0, vertices: 0 }, cone: { faces: 1, edges: 1, vertices: 1 },
          cylinder: { faces: 2, edges: 2, vertices: 0 }, pyramid: { faces: 5, edges: 8, vertices: 5 },
        };
        if (mode === 'count-sides') {
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            // a drawn polygon: its sides are its corners, counted from the drawing itself
            const sides = k === 'poly' ? c.querySelector('[data-lcs-pts]').dataset.lcsPts.split(' ').length : SIDES[k];
            if (sides !== +c.dataset.lcsSides) fails.push(`${k}: sides fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== sides) fails.push(`${k}: answer mismatch`);
          });
        } else if (mode === 'sort-sides') {
          const bins = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
          document.querySelectorAll('[data-lcs-item]').forEach((it) => {
            const k = it.dataset.lcsItem;
            const sides = k === 'poly' ? it.querySelector('[data-lcs-pts]').dataset.lcsPts.split(' ').length : SIDES[k];
            if (sides !== +it.dataset.lcsSides) fails.push(`${k}: sides fact wrong`);
            if (!bins.includes(String(sides))) fails.push(`${k}: no bin for ${sides} sides`);
          });
        } else if (mode === 'solid-counts') {
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            if (k === 'cone') fails.push('cone: its picture is a cut-off cone');
            if (facet === 'edges' && k === 'cylinder') fails.push('cylinder edges: a convention curricula disagree on');
            const HID = { cube: 3, rectangular_box: 3, pyramid: 3, cylinder: 1 };
            if (HID[k] !== undefined) {
              const svg = c.querySelector(`[data-lcs-solid="${k}"]`);
              if (!svg) fails.push(`${k}: an opaque picture (hidden faces/edges cannot be counted) — draw it see-through`);
              else if (svg.querySelectorAll('[data-lcs-hidden]').length !== HID[k]) fails.push(`${k}: hidden edges not dashed`);
            }
            if (SOLIDS[k][facet] !== +c.dataset.lcsCount) fails.push(`${k}: ${facet} fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== SOLIDS[k][facet]) fails.push(`${k}: answer mismatch`);
            // the answer box keeps its full width (a flex row can shrink it to a sliver without any overflow)
            const box = c.querySelector('[data-lcs-answer]'), bw = box.getBoundingClientRect().width;
            if (bw < 56) fails.push(`${k}: answer box squeezed to ${Math.round(bw)}px`);
          });
        } else if (mode === 'solid-real') {
          const left = [...document.querySelectorAll('[data-lcs-left]')].map((e) => e.dataset.lcsLeft);
          const right = [...document.querySelectorAll('[data-lcs-right]')];
          if ([...left].sort().join() !== right.map((e) => e.dataset.lcsRight).sort().join()) fails.push('right not a permutation');
          left.forEach((v, i) => { if (right[i].dataset.lcsRight === v) fails.push(`row ${i + 1}: straight-across`); });
          right.forEach((e) => {
            const allowed = (OBJ[e.dataset.lcsRight] || []).map((o) => o.theme + '/' + o.noun);
            if (!allowed.includes(e.dataset.lcsObj)) fails.push(`${e.dataset.lcsObj} is not a reviewed object for ${e.dataset.lcsRight}`);
          });
          if (left.includes('cone')) fails.push('cone: its picture is a cut-off cone');
        } else if (mode === 'symmetry-yn' || mode === 'pick-symmetric') {
          // every picture must be on the reviewed list with the verdict the page gives it
          // a picture's verdict belongs to its THEME (a bat is symmetric in animals, drawn sideways in forest creatures)
          const verdict = (tn) => { const [t, n] = tn.split('|'); const R = REV[t]; return !R ? null : R.sym.includes(n) ? true : R.asym.includes(n) ? false : null; };
          if (mode === 'symmetry-yn') {
            const cards = [...document.querySelectorAll('[data-lcs-sym]')];
            if (cards.length < 2) fails.push(`blank/degraded: ${cards.length} cards (need ≥2)`);
            const yes = cards.filter((c) => c.dataset.lcsSym === '1').length;
            if (yes < 1 || yes >= cards.length) fails.push(`needs both a symmetric and an asymmetric example (yes=${yes}/${cards.length})`);
            cards.forEach((c, i) => {
              const s = c.dataset.lcsSym === '1';
              if (verdict(c.dataset.lcsNoun) !== s) fails.push(`card ${i + 1}: ${c.dataset.lcsNoun} is not reviewed as ${s ? 'symmetric' : 'lopsided'}`);
              const correct = [...c.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
              if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct`);
              else if ((correct[0].dataset.lcsVal === 'yes') !== s) fails.push(`card ${i + 1}: chip != symmetry`);
              // a tick marks a WRONG answer in Swedish and Finnish schools: there the chips are words
              if (/^(sv|fi)/.test(document.documentElement.lang) && [...c.querySelectorAll('.ws-chip')].some((x) => /[✓✗]/.test(x.textContent))) fails.push(`card ${i + 1}: a tick/cross chip in ${document.documentElement.lang}`);
            });
          } else {
            const cards = [...document.querySelectorAll('[data-lcs-card]')];
            if (cards.length < 1) fails.push('blank: 0 cards rendered');
            cards.forEach((c, i) => {
              const chips = [...c.querySelectorAll('[data-lcs-noun]')];
              if (chips.filter((x) => x.dataset.lcsCorrect).length !== 1) fails.push(`row ${i + 1}: correct count`);
              chips.forEach((x) => { if (verdict(x.dataset.lcsNoun) !== !!x.dataset.lcsCorrect) fails.push(`row ${i + 1}: ${x.dataset.lcsNoun} not reviewed as ${x.dataset.lcsCorrect ? 'symmetric' : 'lopsided'}`); });
            });
          }
        } else if (mode === 'perimeter') {
          document.querySelectorAll('[data-lcs-card]').forEach((c, i) => {
            const svg = c.querySelector('[data-lcs-rect-r]');
            const r = +svg.dataset.lcsRectR, cc = +svg.dataset.lcsRectC;
            if (svg.dataset.lcsLabelled) {
              const lens = [...svg.querySelectorAll('[data-lcs-len]')].map((t) => +t.textContent).sort((a, b) => a - b);
              if (lens.join() !== [r, cc].sort((a, b) => a - b).join()) fails.push(`card ${i + 1}: side labels wrong`);
            } else if (svg.querySelectorAll('[data-lcs-sq]').length !== r * cc) fails.push(`card ${i + 1}: grid wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== 2 * (r + cc)) fails.push(`card ${i + 1}: perimeter mismatch`);
          });
        } else if (mode === 'same-area' || mode === 'same-perimeter') {
          document.querySelectorAll('[data-lcs-measure]').forEach((c, i) => {
            const meas = c.dataset.lcsMeasure;
            const tgt = c.querySelector('[data-lcs-target] [data-lcs-rect-r]');
            const tv = meas === 'area' ? (+tgt.dataset.lcsRectR * +tgt.dataset.lcsRectC) : 2 * (+tgt.dataset.lcsRectR + +tgt.dataset.lcsRectC);
            const chips = [...c.querySelectorAll('.ws-pattern-chip')];
            if (chips.filter((x) => x.dataset.lcsCorrect).length !== 1) fails.push(`card ${i + 1}: not one right rectangle`);
            chips.forEach((chip) => {
              const g = chip.querySelector('[data-lcs-rect-r]');
              const v = meas === 'area' ? (+g.dataset.lcsRectR * +g.dataset.lcsRectC) : 2 * (+g.dataset.lcsRectR + +g.dataset.lcsRectC);
              if (!!chip.dataset.lcsCorrect !== (v === tv)) fails.push(`card ${i + 1}: ${meas} mark wrong (${v} vs ${tv})`);
            });
          });
        } else if (mode === 'classify-quads') {
          // rectangle = four right angles, recomputed from the DRAWN corners; squares are rectangles
          const right = (P) => {
            for (let i = 0; i < 4; i++) {
              const p = P[(i + 3) % 4], q = P[i], r = P[(i + 1) % 4];
              const a = [p[0] - q[0], p[1] - q[1]], b = [r[0] - q[0], r[1] - q[1]];
              if (Math.abs((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) > 0.0088) return false;
            }
            return true;
          };
          const its = [...document.querySelectorAll('[data-lcs-item]')];
          its.forEach((it, i) => {
            const P = it.querySelector('[data-lcs-pts]').dataset.lcsPts.split(' ').map((s) => s.split(',').map(Number));
            if ((it.dataset.lcsClass === 'rect') !== right(P)) fails.push(`shape ${i + 1}: marked ${it.dataset.lcsClass}, drawn ${right(P) ? 'a rectangle' : 'not a rectangle'}`);
          });
          const nR = its.filter((x) => x.dataset.lcsClass === 'rect').length;
          if (nR < 1 || nR === its.length) fails.push('needs rectangles and non-rectangles');
          if (document.querySelectorAll('[data-lcs-bin]').length !== 2) fails.push('need 2 bins');
        } else if (mode === 'angles') {
          document.querySelectorAll('[data-lcs-card]').forEach((c, i) => {
            if (c.querySelector('[data-lcs-angle] path')) fails.push(`card ${i + 1}: an angle carries a mark (a right-angle square gives the answer away)`);
            c.querySelectorAll('[data-lcs-angle]').forEach((svg) => {
              const deg = +svg.dataset.lcsAngle;
              const marked = !!svg.closest('.ws-pattern-slot').dataset.lcsTarget;
              if ((deg === 90) !== marked) fails.push(`card ${i + 1}: ${deg}° mark wrong`);
            });
          });
        } else if (mode === 'symmetry-count') {
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            if (SY[k] !== +c.dataset.lcsSymn) fails.push(`${k}: symmetry fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== SY[k]) fails.push(`${k}: answer mismatch`);
          });
        }
        return fails;
      }, { mode: m, facet: f, SY: SYMMETRY_COUNT, OBJ: SOLID_REAL_OBJECTS,
        REV: SYM_REVIEW });
    },
  };
}

module.exports = { makeGeometryType, quadPoints, isRectangle, SYMMETRY_COUNT, reviewedPools, unitRectSvg: unitRect, quadSvg, angleSvgPublic: angleSvg, polySvg, solidSvg, DRAWN_SOLIDS };

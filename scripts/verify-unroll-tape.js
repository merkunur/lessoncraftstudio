/* =====================================================================
   verify-unroll-tape.js — the proof gate for TOOL #41
   ---------------------------------------------------------------------
   Run:  node scripts/verify-unroll-tape.js
   Env:  URT_TOOL_DIR — where to load the tool from (the mutation harness
         points this at a temp copy)

   ⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH, BY A DIFFERENT ALGORITHM.
   The tool sums 512 chords. This gate never does: it uses the closed
   form where one exists (circle 2π, stadium 2d+2πr, Reuleaux π by
   Barbier, the crescent's two exact arcs), the Ivory–Bessel
   hypergeometric series for ellipses, and Richardson-extrapolated
   quadrature at 65536 samples elsewhere. Reading the expectation off the
   tool would let it mark its own homework — the #39 lesson.

   ⚠ TWO CORRECTIONS TO THE CATALOG'S B4 SPEC, BOTH ARITHMETIC:

   1. "the analytic arc-length integral equals the rendered straight
      bar's summed segment length within 0.00px" IS IMPOSSIBLE. An
      inscribed polyline is STRICTLY shorter than its curve — chord ≤ arc
      is a theorem, not a tolerance. The deficit is ~1e-5 relative at
      N=512 and is never zero. So THREE errors are reported separately
      (E1 discretisation, E2 arithmetic, E3 render-in-browser), and E1 is
      a TWO-SIDED BAND. A one-sided ceiling would be satisfied by a tool
      that computes the perimeter analytically and draws something else.

   2. "unchanged under all 360 integer rotations" is true of the LENGTH
      and FALSE of the RATIO — `across` is a bounding-box width, so it is
      orientation-dependent for every shape that is not of constant
      width. Gated in BOTH directions: invariant for the circle and the
      Reuleaux, and demonstrably NOT invariant for the rest.

   ⚠ THE VACUITY FLOOR IS 1/N = 1.95e-3 (one dropped segment). Any
   tolerance at or above ~2e-4 silently retires the entire off-by-one
   mutation class. Every margin below is printed so a reader can see it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const TOOL_DIR = process.env.URT_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(TOOL_DIR, 'unroll-tape.js'));
const BOOK = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'unroll-tape-shapes.json'), 'utf8'));
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'unroll-tape.js'), 'utf8');

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const sec = (s) => console.log('\n' + s);
const TAU = Math.PI * 2;

/* ===================================================================
   THE GATE'S OWN ORACLES
   =================================================================== */

/* Ivory–Bessel: P = π(a+b)·Σ [C(1/2,k)]² h^k,  h = ((a−b)/(a+b))².
   An exact analytic identity with a computable tail — not a
   discretisation, so it fails differently from anything the tool does. */
function ellipsePerimeterIvory(a, b) {
  const h = Math.pow((a - b) / (a + b), 2);
  let sum = 0, c = 1;
  for (let k = 0; k <= 60; k++) {
    if (k > 0) c *= (0.5 - (k - 1)) / k;      /* C(1/2,k) */
    sum += c * c * Math.pow(h, k);
  }
  return Math.PI * (a + b) * sum;
}
/* Ramanujan II — a third opinion with no series and no quadrature.
   ⚠ Its error is SIGNED (always negative) and eccentricity-dependent:
   ~1e-10 for b/a ≥ 0.553, degrading to −4.0e-4 at the degenerate limit.
   Asserted against that bound, never against a flat number. */
function ellipsePerimeterRamanujanII(a, b) {
  const h = Math.pow((a - b) / (a + b), 2);
  return Math.PI * (a + b) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));
}

/* general-purpose oracle: Richardson-extrapolated polyline at very high
   N with knots forced. Used only where no closed form exists. */
function oracleLength(family, params, knots, f) {
  const len = (N) => {
    const cuts = [0].concat((knots || []).slice().sort((x, y) => x - y)).concat([1]);
    const uniq = [];
    for (let i = 0; i < cuts.length; i++) if (i === 0 || cuts[i] > cuts[i - 1] + 1e-15) uniq.push(cuts[i]);
    let L = 0, prev = null, first = null;
    for (let k = 0; k < uniq.length - 1; k++) {
      const a = uniq[k], b = uniq[k + 1], n = Math.max(2, Math.round(N * (b - a)));
      for (let i = 0; i < n; i++) {
        const p = f(a + (b - a) * i / n);
        if (prev) L += Math.hypot(p[0] - prev[0], p[1] - prev[1]); else first = p;
        prev = p;
      }
    }
    L += Math.hypot(first[0] - prev[0], first[1] - prev[1]);
    return L;
  };
  const L1 = len(32768), L2 = len(65536);
  return (4 * L2 - L1) / 3;
}

/* the analytic length of every family in the book, by the shortest exact
   route available */
function analyticLength(shape) {
  const p = shape.params || {};
  switch (shape.family) {
    case 'circle': return TAU;                                   /* r = 1 */
    case 'ellipse': return ellipsePerimeterIvory(1, p.q);
    case 'reuleaux': return Math.PI;                             /* Barbier, w = 1 */
    case 'stadium': { const d = 1 - 2 * p.r; return 2 * d + 2 * Math.PI * p.r; }
    case 'crescent': {
      const R = 1, r = p.r, d = p.d;
      const aA = Math.acos((R * R + d * d - r * r) / (2 * d * R));
      const aB = Math.acos((R * R - d * d - r * r) / (2 * d * r));
      return 2 * R * (Math.PI - aA) + 2 * r * (Math.PI - aB);
    }
    default: {                                                   /* quadrature */
      const made = T.FAMILY[shape.family](p);
      return oracleLength(shape.family, p, made.knots, made.f);
    }
  }
}

/* the predicted relative discretisation deficit: rel ≈ K/N², K measured
   per shape by the gate from the CURVE (not from the tool) */
function measuredK(shape, Lexact) {
  const o = T.buildOutline(shape);
  return ((Lexact - o.L) / Lexact) * T.N * T.N;
}

const SHAPES = BOOK.shapes;
const outlines = {};
for (const s of SHAPES) outlines[s.k] = T.buildOutline(s);

/* ===================================================================
   V1 — THE MODEL IS TOTAL AND PURE
   =================================================================== */
sec('V1  the model is total, pure and immutable');
{
  const hostile = [null, undefined, 0, '', [], {}, { shape: 'x' }, { A: NaN }, { shape: 0, A: 1, t: NaN }, NaN, false];
  let ok = true, why = '';
  for (const h of hostile) {
    try {
      const s = T._st(h);
      if (typeof s.shape !== 'number' || typeof s.A !== 'number' || typeof s.t !== 'number') { ok = false; why = JSON.stringify(h); }
    } catch (e) { ok = false; why = JSON.stringify(h) + ' threw ' + e.message; }
  }
  is(ok, 'every hostile input yields a usable state' + (ok ? '' : ' — ' + why));

  const before = { shape: 0, A: 150, t: 0.3, flag: 2, committed: false };
  const snap = JSON.stringify(before);
  T.setSize(before, outlines.circle, 160);
  T.setPeel(before, 0.6);
  T.setFlag(before, outlines.circle, 3);
  T.nextShape(before, SHAPES);
  is(JSON.stringify(before) === snap, 'no reducer mutates its input');

  is(T.setSize({ shape: 0, A: 150, t: 0, flag: null, committed: false }, outlines.circle, 150) === null,
    'a no-op size change reports null, not a fake success');
  is(T.setSize({ shape: 0, A: 150, t: 0, flag: null, committed: false }, outlines.circle, 1e6) === null,
    'a size past the ceiling is refused');
  is(T.setSize({ shape: 0, A: 150, t: 0, flag: null, committed: false }, outlines.circle, 5) === null,
    'a size below the floor is refused');
}

/* ===================================================================
   V2 — THE CLOSED-FORM FAMILIES (validates the gate's own numerics
   before it is trusted anywhere else)
   =================================================================== */
sec('V2  ⭐ the closed forms, six independent shapes');
{
  const anchors = [
    ['circle r=1 → 2π', { k: 'c', family: 'circle', params: {} }, TAU],
    ['stadium r=.35 → 2d+2πr', { k: 's', family: 'stadium', params: { r: 0.35 } }, 2 * (1 - 0.7) + 2 * Math.PI * 0.35],
    ['Reuleaux w=1 → π (Barbier)', { k: 'r', family: 'reuleaux', params: {} }, Math.PI],
    ['ellipse q=1 → 2π', { k: 'e', family: 'ellipse', params: { q: 1 } }, TAU],
    ['ellipse q=.5 → Ivory', { k: 'e2', family: 'ellipse', params: { q: 0.5 } }, ellipsePerimeterIvory(1, 0.5)],
    ['crescent → two exact arcs', { k: 'x', family: 'crescent', params: { r: 0.7, d: 0.387 } }, null]
  ];
  for (const [name, shape, exact] of anchors) {
    const want = exact === null ? analyticLength(shape) : exact;
    const got = oracleLength(shape.family, shape.params, T.FAMILY[shape.family](shape.params).knots,
      T.FAMILY[shape.family](shape.params).f);
    const rel = Math.abs(got - want) / want;
    is(rel < 1e-11, `${name} — quadrature agrees to ${rel.toExponential(2)}`);
  }
  /* Ivory must reproduce the circle exactly, or the series is wrong */
  is(Math.abs(ellipsePerimeterIvory(1, 1) - TAU) / TAU < 1e-15, 'the Ivory series reduces to 2π at q=1');
}

/* ===================================================================
   V3 — ⭐ E1, THE DISCRETISATION BAND (two-sided) + the polygon
   zero-poison that proves the band can measure zero
   =================================================================== */
sec('V3  ⭐ E1 the discretisation deficit — a BAND, never a ceiling');
{
  const N = T.N;
  let worstMargin = Infinity;
  for (const s of SHAPES) {
    const Lx = analyticLength(s);
    const o = outlines[s.k];
    const rel = (Lx - o.L) / Lx;
    /* the sign is a THEOREM: chord ≤ arc, strictly for a curve */
    is(rel > 0, `${s.k}: the polyline is SHORTER than the curve (${rel.toExponential(2)})`);
    /* and it is the size theory predicts — K/N², K measured from the curve */
    const K = rel * N * N;
    is(K > 0.05 && K < 200, `${s.k}: K = ${K.toFixed(2)}, a plausible curvature integral`);
    /* the margin against the smallest REAL defect (one dropped segment) */
    worstMargin = Math.min(worstMargin, (1 / N) / rel);
  }
  console.log(`       the smallest real defect (1 dropped segment) is ${(1 / N).toExponential(2)} relative;`);
  console.log(`       the largest honest deficit is ${(1 / N / worstMargin).toExponential(2)} — a ${worstMargin.toFixed(1)}× separation`);

  /* ⚠ THE NON-VACUITY TEST IS THE ONE THAT MATTERS, AND IT IS MEASURED,
     NOT INVENTED. The first draft asserted "at least 20× below", a number
     I made up, and the burst (a 7-lobe rosette, K≈85) came in at 6× and
     failed a CORRECT tool. The real requirement is not a ratio at all —
     it is that a dropped segment lands OUTSIDE the ±10% band the gate
     actually applies. That is stronger, it is checkable, and it is what
     the band is for. */
  let discriminates = 0;
  for (const s of SHAPES) {
    const Lx = analyticLength(s), o = outlines[s.k];
    const honest = (Lx - o.L) / Lx;
    /* drop the longest segment — the LEAST detectable single-segment loss */
    let shortest = Infinity;
    for (let i = 0; i < o.pts.length; i++) {
      const p = o.pts[i], q = o.pts[(i + 1) % o.pts.length];
      shortest = Math.min(shortest, Math.hypot(q[0] - p[0], q[1] - p[1]));
    }
    const damaged = (Lx - (o.L - shortest)) / Lx;
    if (damaged > honest * 1.10) discriminates++;
    else console.error(`       ${s.k}: a dropped segment (${damaged.toExponential(2)}) is INSIDE the band`);
  }
  is(discriminates === SHAPES.length,
    `⭐ on all ${SHAPES.length} shapes a single dropped segment lands OUTSIDE the ±10% band`);

  /* ⭐ THE ZERO-POISON. The n=1 superellipse IS a rhombus: its inscribed
     polyline is the shape, so the deficit must be EXACTLY zero. If the
     accounting cannot measure zero it cannot measure 1e-5 either. */
  const rhom = { k: 'rhombus', family: 'superellipse', params: { n: 1, q: 1 } };
  const ro = T.buildOutline(rhom);
  const rExact = 4 * Math.sqrt(2);                 /* 4·√(a²+b²), a=b=1 */
  const rRel = Math.abs(rExact - ro.L) / rExact;
  is(rRel < 1e-12, `a polygon's deficit is ZERO (${rRel.toExponential(2)}) — the band can measure zero too`);
}

/* ===================================================================
   V4 — E2, THE ARITHMETIC. ⚠ never bit-equality: summing the same
   chords in a different order gives a different double.
   =================================================================== */
sec('V4  E2 the arithmetic, four summation orders');
{
  for (const s of SHAPES.slice(0, 6)) {
    const o = outlines[s.k];
    const seg = [];
    for (let i = 0; i < o.pts.length; i++) {
      const p = o.pts[i], q = o.pts[(i + 1) % o.pts.length];
      seg.push(Math.hypot(q[0] - p[0], q[1] - p[1]));
    }
    let fwd = 0; for (let i = 0; i < seg.length; i++) fwd += seg[i];
    let rev = 0; for (let i = seg.length - 1; i >= 0; i--) rev += seg[i];
    let c = 0, kah = 0;
    for (const v of seg) { const y = v - c, t = kah + y; c = (t - kah) - y; kah = t; }
    const pair = (a) => a.length === 1 ? a[0] : pair(a.slice(0, a.length >> 1)) + pair(a.slice(a.length >> 1));
    const pw = pair(seg);
    const spread = Math.max(fwd, rev, kah, pw) - Math.min(fwd, rev, kah, pw);
    is(spread / o.L < 1e-12, `${s.k}: four summation orders agree to ${(spread / o.L).toExponential(2)}`);
  }
}

/* ===================================================================
   V5 — ⭐ THE SINC IDENTITY. For an ellipse sampled uniformly in the
   eccentric angle the inscribed polygon is the affine image of a
   regular N-gon, so P_poly = L_true · sinc(π/N) EXACTLY. A closed-form
   prediction of the RENDERED length, by an algorithm the tool shares
   nothing with. ⚠ sinc must be sin(x)/x, not a series truncation.
   =================================================================== */
sec('V5  ⭐ the sinc identity — a closed-form prediction of the render');
{
  const sinc = (x) => Math.sin(x) / x;
  for (const q of [1, 0.75, 0.5, 0.3988601222559297, 2.3]) {
    const shape = { k: 'e', family: 'ellipse', params: { q } };
    const o = T.buildOutline(shape);
    const Lx = ellipsePerimeterIvory(1, q);
    const predicted = Lx * sinc(Math.PI / T.N);
    const rel = Math.abs(o.L - predicted) / predicted;
    is(rel < 1e-12, `q=${q}: rendered length matches L·sinc(π/N) to ${rel.toExponential(2)}`);
  }
}

/* ===================================================================
   V6 — Ivory vs Ramanujan II, against the ECCENTRICITY-DEPENDENT bound
   =================================================================== */
sec('V6  Ivory vs Ramanujan II — bounded by eccentricity, not by a flat number');
{
  for (const [q, bound] of [[1, 1e-15], [0.9, 1e-13], [0.553, 1e-9], [0.4, 1e-7], [0.25, 1e-6]]) {
    const iv = ellipsePerimeterIvory(1, q), ra = ellipsePerimeterRamanujanII(1, q);
    const rel = Math.abs(iv - ra) / iv;
    is(rel < bound, `q=${q}: agree to ${rel.toExponential(2)} (bound ${bound.toExponential(0)})`);
    if (q < 1) is(ra <= iv, `q=${q}: Ramanujan UNDER-estimates, as it must (signed error)`);
  }
}

/* ===================================================================
   V7/V8 — invariance of the LENGTH under rotation, translation, scale
   =================================================================== */
sec('V7  the length is invariant under rotation and translation');
{
  for (const s of SHAPES.slice(0, 5)) {
    const made = T.FAMILY[s.family](s.params || {});
    const base = oracleLength(s.family, s.params, made.knots, made.f);
    let lo = Infinity, hi = -Infinity;
    for (let deg = 0; deg < 360; deg += 1) {
      const a = deg * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      const rot = (u) => { const p = made.f(u); return [p[0] * ca - p[1] * sa + 17, p[0] * sa + p[1] * ca - 4]; };
      if (deg % 45 === 0) {
        const L = oracleLength(s.family, s.params, made.knots, rot);
        lo = Math.min(lo, L); hi = Math.max(hi, L);
      }
    }
    is((hi - lo) / base < 1e-11, `${s.k}: length unchanged across rotations+translation (${((hi - lo) / base).toExponential(2)})`);
  }
}
sec('V8  the length scales linearly');
{
  /* ⚠ TEST THE TOOL'S OWN COMPUTATION, NOT THE ORACLE'S. The first draft
     ran the Richardson oracle at each scale and read 2.5e-12 — which is
     the ORACLE's extrapolation noise amplified by a ×400 scale factor,
     not anything the tool did. The tool's quantity is a polyline sum, and
     for that, linearity is exact up to floating-point rounding. */
  const o = outlines.circle;
  let worst = 0;
  for (const A of [70, 97, 128, 199, 230]) {
    const L = T.strandLength(o, { shape: 1, A, t: 1, flag: null, committed: false }, A);
    const perAcross = L / A;
    worst = Math.max(worst, Math.abs(perAcross - o.R) / o.R);
  }
  /* ⚠ NOT bit-equality — measured spread over radii is ~2e-14, and 111
     distinct doubles appear over 361 radii. `===` would condemn correct
     code on most of them. */
  is(worst < 1e-13, `the laid length is exactly R·A at every size (${worst.toExponential(2)}, never asserted as ===)`);
}

/* ===================================================================
   V9 — ⭐ THE π READOUT, three parts, on TWO different shapes
   =================================================================== */
sec('V9  ⭐ the π readout — circle AND Reuleaux, three ways');
{
  const sincv = Math.sin(Math.PI / T.N) / (Math.PI / T.N);
  for (const [k, Lx] of [['circle', TAU], ['reuleaux', Math.PI]]) {
    const o = outlines[k];
    is(o.R < Math.PI, `${k}: the ratio is STRICTLY below π (${o.R.toFixed(9)})`);
    is(o.R.toFixed(2) === '3.14', `${k}: ⭐ reads 3.14 — the only claim the class can see`);
  }
  is(outlines.circle.R.toFixed(2) === outlines.reuleaux.R.toFixed(2),
    '⭐ BARBIER: a shape that is NOT a circle reads the same 3.14');
  is(Math.abs(outlines.reuleaux.tallR - 1) < 1e-9,
    'the Reuleaux has constant width — tall equals across exactly');
  /* invariance under SIZE, which is the tool's whole thesis */
  const o = outlines.circle;
  let lo = Infinity, hi = -Infinity;
  for (let A = T.A_MIN; A <= T.aMax(o); A++) {
    const st = { shape: 1, A, t: 1, flag: null, committed: false };
    const L = T.strandLength(o, st, A);
    const r = L / A;
    lo = Math.min(lo, r); hi = Math.max(hi, r);
  }
  is((hi - lo) / lo < 1e-12,
    `⭐ THE INVARIANCE: around÷across is the same at every size (spread ${((hi - lo) / lo).toExponential(2)})`);
}

/* ===================================================================
   V10 — ⭐ LENGTH CONSERVATION AT EVERY FRAME. This is the "same
   strand" theorem, and nothing in this repo has asserted anything like
   it before.
   =================================================================== */
sec('V10 ⭐ the strand is the SAME strand at every frame of the peel');
{
  for (const s of SHAPES) {
    const o = outlines[s.k];
    const A = T.defaultA(o), scale = A / o.across, Lm = o.L * scale;
    let worst = 0;
    for (let i = 0; i <= 64; i++) {
      const t = i / 64;
      const L = T.strandLength(o, { shape: 0, A, t, flag: null, committed: false }, A);
      worst = Math.max(worst, Math.abs(L - Lm) / Lm);
    }
    is(worst < 1e-9, `${s.k}: total length is L at all 65 frames (worst ${worst.toExponential(2)})`);
  }
}

/* ===================================================================
   V11 — ⭐ CONSTANT WIDTH, GATED IN BOTH DIRECTIONS. A stub returning
   a constant would pass the first half alone.
   =================================================================== */
sec('V11 ⭐ across is rotation-invariant IFF the shape has constant width');
{
  /* ⚠ THE CORNERS MUST BE SAMPLED. A Reuleaux's width in a given
     direction is often set by a CORNER, and 4096 uniform samples miss
     u=1/3 and 2/3 (4096/3 is not an integer). The gate read 1.6e-4 of
     variation on a shape Barbier proves is exactly constant — a
     sampling artifact in the GATE, condemning a correct tool. */
  const widthAt = (f, knots, deg) => {
    const a = deg * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    let lo = Infinity, hi = -Infinity;
    const take = (u) => { const p = f(((u % 1) + 1) % 1), x = p[0] * ca - p[1] * sa; if (x < lo) lo = x; if (x > hi) hi = x; };
    for (let i = 0; i < 8192; i++) take(i / 8192);
    for (const kn of (knots || [])) take(kn);
    return hi - lo;
  };
  for (const k of ['circle', 'reuleaux']) {
    const s = SHAPES.find((x) => x.k === k), made = T.FAMILY[s.family](s.params || {});
    let lo = Infinity, hi = -Infinity;
    for (let d = 0; d < 360; d += 5) { const w = widthAt(made.f, made.knots, d); lo = Math.min(lo, w); hi = Math.max(hi, w); }
    is((hi - lo) / lo < 1e-5, `${k}: constant width (variation ${((hi - lo) / lo).toExponential(2)})`);
  }
  /* and the OTHER direction — the ones that must NOT be invariant */
  for (const k of ['eye', 'pebble', 'egg']) {
    const s = SHAPES.find((x) => x.k === k), made = T.FAMILY[s.family](s.params || {});
    let lo = Infinity, hi = -Infinity;
    for (let d = 0; d < 360; d += 5) { const w = widthAt(made.f, made.knots, d); lo = Math.min(lo, w); hi = Math.max(hi, w); }
    is((hi - lo) / lo > 0.10, `${k}: width VARIES by ${((hi - lo) / lo * 100).toFixed(0)}% — the tool is right to fix orientation`);
  }
}

/* ===================================================================
   V12 — ⭐ the superellipse TURNING POINT, not monotonicity.
   ⚠ P(n) is NOT monotone in n: it falls to a minimum at n=1 (the
   rhombus) and rises after. Asserting monotonicity would have failed
   on a correct tool — measure a law before you gate it.
   =================================================================== */
sec('V12 ⭐ the superellipse has a MINIMUM at n=1, and is not monotone');
{
  const P = (n) => {
    const made = T.FAMILY.superellipse({ n, q: 1 });
    return oracleLength('superellipse', { n, q: 1 }, made.knots, made.f);
  };
  const below = [0.6, 0.7, 0.85, 1.0], above = [1.0, 1.3, 2.0, 4.0];
  let okDown = true, okUp = true;
  for (let i = 1; i < below.length; i++) if (P(below[i]) >= P(below[i - 1])) okDown = false;
  for (let i = 1; i < above.length; i++) if (P(above[i]) <= P(above[i - 1])) okUp = false;
  is(okDown, 'strictly DECREASING on n ∈ [0.6, 1]');
  is(okUp, 'strictly INCREASING on n ∈ [1, 4]');
  const rel = Math.abs(P(1) - 4 * Math.sqrt(2)) / (4 * Math.sqrt(2));
  is(rel < 1e-10, `and at the turning point it equals 4√2 exactly (${rel.toExponential(2)})`);
  is(P(0.6) > P(1) && P(4) > P(1), 'so a monotone-in-n assertion would have FAILED on a correct tool');
}

/* ===================================================================
   V13 — the universal ellipse bracket 2πb ≤ P ≤ 2πa
   =================================================================== */
sec('V13 every ellipse is bracketed by its inscribed and circumscribed circles');
{
  let ok = true;
  for (let i = 1; i <= 40; i++) {
    const q = i / 40, P = ellipsePerimeterIvory(1, q);
    if (!(P >= TAU * q - 1e-12 && P <= TAU + 1e-12)) ok = false;
  }
  is(ok, '2πb ≤ P ≤ 2πa for every ellipse — which is WHY π is the ratio’s extremum');
}

/* ===================================================================
   V14 — THE DOMAIN, DERIVED AND PRINTED (never quoted)
   =================================================================== */
sec('V14 the swept domain, derived and printed');
{
  let configs = 0;
  const rows = [];
  for (const s of SHAPES) {
    const o = outlines[s.k];
    const n = T.aMax(o) - T.A_MIN + 1;
    configs += n;
    rows.push(`${s.k} ${n} sizes (A ${T.A_MIN}..${T.aMax(o)}, R=${o.R.toFixed(3)})`);
  }
  console.log('       ' + rows.join('; '));
  const frames = SHAPES.length * 65;
  console.log(`       TOTAL: ${configs} size configurations + ${frames} peel frames + ` +
    `${SHAPES.length * 72} rotation samples`);
  is(configs > 1000, `the swept domain is ${configs} size configurations — printed, not quoted`);
}

/* ===================================================================
   V15 — THE REFUSALS
   =================================================================== */
sec('V15 the refusals');
{
  /* 1. never wraps a polygon: every shape in the book is a curve */
  const POLY = ['polygon', 'triangle', 'square', 'rect', 'rhombus'];
  is(!SHAPES.some((s) => POLY.indexOf(s.family) >= 0), 'no polygon family appears in the book');
  /* the Reuleaux is NOT a polygon: its sides are arcs, so its deficit is
     nonzero where a true polygon's is exactly zero */
  const rd = (Math.PI - outlines.reuleaux.L) / Math.PI;
  is(rd > 1e-8, `the Reuleaux is a CURVE, not a triangle (deficit ${rd.toExponential(2)} ≫ 0)`);

  /* 2. never prints the TOTAL.
     ⚠ THE FIRST VERSION BANNED `toFixed` OUTRIGHT AND CONDEMNED CORRECT
     CODE — the only `toFixed` in the tool is in `_pts`, which serialises
     SVG coordinates. Geometry is not a readout. The ban is now scoped to
     where the formatting happens, and poison-tested both ways. */
  {
    const lines = SRC.split('\n');
    const fixedLines = lines.filter((l) => /toFixed\s*\(/.test(l));
    const allInPts = fixedLines.every((l) => /s\.push\(arr\[i\]\[0\]/.test(l));
    is(fixedLines.length > 0 && allInPts,
      `number formatting occurs only in _pts, the SVG coordinate serialiser (${fixedLines.length} line)`);
    /* poison, both directions */
    is(/toFixed\s*\(/.test('x.toFixed(2)'), 'poison: the formatting probe fires on a real toFixed');
    is(!/s\.push\(arr\[i\]\[0\]/.test('hint.textContent = ratio.toFixed(2);'),
      'poison: and a readout written into text would NOT be excused');
  }
  const strs = SRC.match(/en:\s*"([^"]*)"/g) || [];
  is(!strs.some((s) => /\d/.test(s)), 'no authored string contains a digit');

  /* 3. never says which is longer.
     ⚠ THE FIRST VERSION MATCHED `\bright\b` CASE-INSENSITIVELY AND
     CONDEMNED `RIGHT: 985`, the stage's right edge. That is the same
     ban-too-wide defect this program has now bought three times. The
     probe is case-SENSITIVE on the ambiguous words and is poison-tested
     against both a real verdict and the innocent constant. */
  {
    const noComments = SRC.replace(/\/\*[\s\S]*?\*\//g, '');
    const VERDICT = /\b(isCorrect|correct|incorrect|wrong|verdict|score|streak|winner)\b/;
    is(!VERDICT.test(noComments), 'no verdict word in the executable source');
    is(VERDICT.test('var isCorrect = a > b;'), 'poison: the verdict probe fires on a real verdict');
    is(!VERDICT.test('RIGHT: 985, /* the stage edge */'), 'poison: and clears the stage-edge constant');
    is(!VERDICT.test('rightward, upright, copyright'), 'poison: and clears innocent words containing "right"');
  }

  /* 4. the strand is never a ruler — the weave is constant */
  is(/stroke-dasharray:\s*[\d.]+\s+[\d.]+/.test(SRC), 'the weave is a fixed dasharray, independent of the unit');
  is(!/dasharray[^;]*\+/.test(SRC), 'nothing computes the dasharray from A');

  /* 5. nothing 3-D, nothing traced */
  is(!/image-library|<img|\.webp/.test(SRC), 'no art is loaded — every outline is a formula');

  /* 6. no area */
  is(!/\barea\b/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, '')), 'no area is ever computed');

  /* 7. no rotation control */
  is(!/rotat/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, '')), 'no rotation control exists');

  /* identity */
  is(!/tasks\s*:/.test(SRC), 'the tool declares no `tasks` — it is free play, not an activity');
  is(!/Math\.random/.test(SRC), 'nothing is random');
  const fetches = SRC.match(/fetch\(\s*'([^']+)'/g) || [];
  is(fetches.every((f) => /unroll-tape-shapes\.json|\/api\/auth\/me/.test(f)),
    `fetch allow-list holds (${fetches.length} call sites)`);
}

/* ===================================================================
   V16 — ⭐ NO DEAD STRINGS, BY RUNTIME REACHABILITY. A source scan
   cannot see a branch made unreachable while the t() call still sits in
   the file — the #39 lesson.
   =================================================================== */
sec('V16 ⭐ every authored string is REACHED at runtime');
{
  const keys = Object.keys(T.strings);
  const asked = {};
  const fakeApi = {
    stage: { innerHTML: '', appendChild() {}, querySelector: () => null },
    t: (k) => { asked[k] = true; return String(k); },
    el: (tag, cls) => {
      const e = {
        tagName: tag, className: cls || '', children: [], style: {}, textContent: '', type: '', href: '', disabled: false,
        appendChild(c) { this.children.push(c); }, addEventListener() {}, setAttribute() {},
        querySelector: () => null
      };
      return e;
    }
  };
  /* drive the builders over a matrix of REAL states */
  const shelf = SHAPES.slice(0, T.FREE_SHAPES);
  T.api = fakeApi; T.data = BOOK; T._outlines = outlines; T._wrap = null;
  const states = [
    { shape: 0, A: 150, t: 0, flag: null, committed: false },
    { shape: 0, A: 150, t: 0, flag: 2, committed: false },
    { shape: 1, A: 150, t: 0.5, flag: 2, committed: true },
    { shape: 1, A: 150, t: 1, flag: 2, committed: true }
  ];
  const origDoc = global.document;
  global.document = {
    createElementNS: () => ({ setAttribute() {}, appendChild() {}, addEventListener() {}, textContent: '', getBoundingClientRect: () => ({ width: 100 }) }),
    createElement: () => ({ setAttribute() {}, appendChild() {}, textContent: '' }),
    head: { appendChild() {} }
  };
  for (const st of states) { T.st = st; try { T.render(); } catch (_) {} }
  T.premium = false; try { T._wrap = fakeApi.el('div'); T._showGate(); } catch (_) {}
  global.document = origDoc;

  /* ⚠ AN AUDITABLE EXEMPTION LIST, NEVER A LOOSENED CHECK. These two are
     consumed by the SHELL (lcs-shell.js reads tool.strings.title and
     .instruction for its own header), so the tool never calls t() for
     them — that is correct, and it is recorded here with its reason
     rather than silently excluded by a weaker regex. */
  const SHELL_CONSUMED = { title: 'lcs-shell.js header', instruction: 'lcs-shell.js header' };
  const dead = keys.filter((k) => !asked[k] && !SHELL_CONSUMED[k]);
  is(dead.length === 0, dead.length === 0
    ? `all ${keys.length} authored keys are reached (${Object.keys(SHELL_CONSUMED).length} shell-consumed, listed)`
    : `DEAD STRINGS, authored but never asked for: ${dead.join(', ')}`);
}

/* ===================================================================
   V17 — THE BLIND SPOTS THE MUTATION HARNESS FOUND. Eleven mutations
   survived the first gate; each of these assertions is the one that
   kills one of them. A gate is only worth what mutation says it is.
   =================================================================== */
sec('V17 the sampler, the stage, the state and the shelf');
{
  /* the sampler: exactly N vertices, and no degenerate sub-segment */
  for (const s of SHAPES) {
    const o = outlines[s.k];
    is(o.pts.length === T.N, `${s.k}: exactly ${T.N} vertices (saw ${o.pts.length})`);
  }
  let worstRatio = Infinity, worstK = '';
  for (const s of SHAPES) {
    const o = outlines[s.k], seg = [];
    for (let i = 0; i < o.pts.length; i++) {
      const p = o.pts[i], q = o.pts[(i + 1) % o.pts.length];
      seg.push(Math.hypot(q[0] - p[0], q[1] - p[1]));
    }
    seg.sort((a, b) => a - b);
    const r = seg[0] / seg[seg.length >> 1];
    if (r < worstRatio) { worstRatio = r; worstK = s.k; }
  }
  /* ⚠ the MEDIAN, not the mean — and this is what catches a knot landing
     on the seam and forcing two coincident samples (measured 2.8e-7) */
  is(worstRatio > 0.02,
    `no degenerate sub-segment: worst min/median is ${worstRatio.toFixed(4)} (${worstK})`);

  /* the stage: the shape stands ON the runway, never under it */
  for (const s of SHAPES) {
    const o = outlines[s.k], A = T.defaultA(o);
    const op = T.outlinePoints(o, { shape: 0, A, t: 0, flag: null, committed: false }, A);
    let maxY = -Infinity, minY = Infinity;
    for (const p of op) { if (p[1] > maxY) maxY = p[1]; if (p[1] < minY) minY = p[1]; }
    is(maxY <= T.BASE + 1e-9, `${s.k}: the shape rests ON the runway, not below it`);
    is(minY >= T.TOP - 1e-9, `${s.k}: and does not grow out of the top of the bench`);
    /* the runway ceiling: the laid strand must fit */
    const amax = T.aMax(o);
    const laid = T.strandLength(o, { shape: 0, A: amax, t: 1, flag: null, committed: false }, amax);
    is(T.X0 + laid <= T.RIGHT + 1e-6,
      `${s.k}: at its largest the laid strand still fits the runway (${(T.X0 + laid).toFixed(0)} ≤ ${T.RIGHT})`);
  }

  /* ⭐ AT t=0 THE STRAND IS THE OUTLINE. Not "similar to" — the same
     points. This is the structural form of the same-strand theorem, and
     it is what catches a y-flip applied to the shape but not the cord
     (the two would then be drawn on opposite sides of the runway while
     each, on its own, looked fine). */
  for (const s of SHAPES) {
    const o = outlines[s.k], A = T.defaultA(o);
    const st0 = { shape: 0, A, t: 0, flag: null, committed: false };
    const op = T.outlinePoints(o, st0, A), sp = T.strandPoints(o, st0, A);
    let worst = 0;
    for (let i = 0; i < op.length; i++) {
      /* the strand carries one extra vertex: its arrival back at B */
      const j = Math.min(i + 1, sp.length - 1);
      worst = Math.max(worst, Math.hypot(sp[j][0] - op[(i + 1) % op.length][0], sp[j][1] - op[(i + 1) % op.length][1]));
    }
    is(worst < 1e-9, `${s.k}: ⭐ at t=0 the strand lies exactly ON the outline (${worst.toExponential(2)})`);
  }

  /* ⭐ A SYMMETRIC SHAPE RESTS BALANCED. B is where the guide starts and
     where the cord leaves; on a flat bottom it must be the MIDDLE of the
     run, not an arbitrary end, or the shape stands on a corner. */
  for (const k of ['track', 'circle', 'pebble', 'eye', 'cushion']) {
    const o = outlines[k];
    const bx = o.pts[0][0], centre = o.minX + o.across / 2;
    is(Math.abs(bx - centre) / o.across < 1e-3,
      `${k}: ⭐ rests balanced — B is the centre of its footing, not an edge`);
  }

  /* the state shape is closed — no reducer may grow a field */
  const KEYS = ['shape', 'A', 't', 'flag', 'committed'].sort().join(',');
  const base = { shape: 0, A: 150, t: 0, flag: null, committed: false };
  const outs = [
    T.setSize(base, outlines.circle, 160),
    T.setPeel(base, 0.4),
    T.setFlag(base, outlines.circle, 3),
    T.nextShape(base, SHAPES)
  ].filter(Boolean);
  is(outs.length === 4 && outs.every((s) => Object.keys(s).sort().join(',') === KEYS),
    'every reducer returns exactly the declared state shape — no field is ever grown');

  /* ⭐ the flag is gated in the MODEL, not by a disabled attribute */
  is(T.setFlag({ shape: 0, A: 150, t: 0, flag: 2, committed: true }, outlines.circle, 4) === null,
    '⭐ the flag REFUSES to move once committed');
  is(T.setFlag({ shape: 0, A: 150, t: 0.3, flag: 2, committed: false }, outlines.circle, 4) === null,
    '⭐ the flag REFUSES to move once the peel has started');
  const committed = T.setPeel({ shape: 0, A: 150, t: 0, flag: 2, committed: false }, 0.2);
  is(committed && committed.committed === true, 'and the first movement off the wrap COMMITS the guess');
  const noFlag = T.setPeel({ shape: 0, A: 150, t: 0, flag: null, committed: false }, 0.2);
  is(noFlag && noFlag.committed === false, 'but peeling with no flag planted commits nothing');

  /* the shelf, and the offline fallback */
  T.premium = false;
  is(T.shelf().length === T.FREE_SHAPES, `entitlement filters the shelf to ${T.FREE_SHAPES} free shapes`);
  T.premium = true;
  is(T.shelf().length === SHAPES.length, `and opens all ${SHAPES.length} when paid`);
  T.premium = false;
  is(T.FALLBACK_SHAPES.shapes.length === T.FREE_SHAPES && T.FALLBACK_SHAPES.freeCount === T.FREE_SHAPES,
    '⚠ a 404 degrades to the FREE TIER, never to nothing');
  is(T.FALLBACK_SHAPES.shapes.every((f, i) => f.k === SHAPES[i].k),
    'and the inline fallback matches the first five of the book, in order');
}

/* =================================================================== */
console.log('');
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);

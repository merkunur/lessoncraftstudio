/* =====================================================================
   gen-unroll-tape-shapes.js — the shape book for TOOL #41
   ---------------------------------------------------------------------
   Run:  node scripts/gen-unroll-tape-shapes.js            (preview)
         node scripts/gen-unroll-tape-shapes.js --write     (emit JSON)

   Emits `mini tools/unroll-tape-shapes.json`: twelve shapes, each a
   FAMILY plus its PARAMETERS. Nothing else.

   ⭐ THE ANSWER IS DERIVED, NEVER STORED. The book does NOT carry R, the
   perimeter, the across or the tall — the tool derives them from the
   parametrisation at runtime and the gate derives them independently.
   Storing them would let the two drift apart silently, and would let a
   broken tool read the right number off a file.

   ⭐ AND THE LADDER WAS MEASURED BEFORE IT WAS DESIGNED. The first draft
   assigned R targets to families before anyone knew what those families
   could reach: four solvers ran into their bounds and returned a
   boundary value that looked like a solution. The reachable range of
   every family is now mapped first (see RANGE below, all measured), and
   the ladder is assigned only to values that exist.

   No art, no image library, no locale strings. A shape is a formula.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const TAU = Math.PI * 2;

/* ---------------------------------------------------------------- geometry
   Perimeter by Richardson-extrapolated polyline sum. L(N) = L_true − K/N²,
   so L_true ≈ (4·L(2N) − L(N))/3. Knots (corners, cusps) are forced onto
   the sample grid — without that the order collapses from O(1/N²) to
   O(1/N) and the crescent is wrong in the third decimal. */
function samplePts(f, N, knots) {
  const cuts = [0].concat((knots || []).slice().sort((a, b) => a - b)).concat([1]);
  const uniq = [];
  for (let i = 0; i < cuts.length; i++) if (i === 0 || cuts[i] > cuts[i - 1] + 1e-15) uniq.push(cuts[i]);
  const pts = [];
  for (let k = 0; k < uniq.length - 1; k++) {
    const a = uniq[k], b = uniq[k + 1];
    const n = Math.max(2, Math.round(N * (b - a)));
    for (let i = 0; i < n; i++) pts.push(f(a + (b - a) * i / n));
  }
  return pts;
}
function polyLen(pts) {
  let L = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    L += Math.hypot(q[0] - p[0], q[1] - p[1]);
  }
  return L;
}
/* ⚠ THE SAMPLED BBOX IS NOT THE BBOX. A true extreme almost never lands on
   an integer sample: the Reuleaux's lowest point sits at u = 1/6, which is
   not a sample at any N divisible by 3, so its measured height came out
   4.6e-9 short of 1 and the constant-width check fired on a CORRECT shape.
   Every extreme is therefore refined by ternary search on the bracketing
   interval. This matters past the gate — B (the lowest point) is where the
   strand's guide starts, so the tool needs it exactly too. */
function refineExtreme(f, coord, sign, uMid, du) {
  let lo = uMid - du, hi = uMid + du;
  const val = (u) => sign * f(((u % 1) + 1) % 1)[coord];
  for (let i = 0; i < 120; i++) {
    const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
    if (val(a) < val(b)) lo = a; else hi = b;
  }
  const u = (lo + hi) / 2;
  return { u: ((u % 1) + 1) % 1, v: f(((u % 1) + 1) % 1)[coord] };
}
function extremes(f, knots) {
  const N = 4096, pts = [], us = [];
  for (let i = 0; i < N; i++) { us.push(i / N); pts.push(f(i / N)); }
  const out = {};
  for (const [name, coord, sign] of [['x0', 0, -1], ['x1', 0, 1], ['y0', 1, -1], ['y1', 1, 1]]) {
    let bi = 0, bv = -Infinity;
    for (let i = 0; i < N; i++) { const v = sign * pts[i][coord]; if (v > bv) { bv = v; bi = i; } }
    const r = refineExtreme(f, coord, sign, us[bi], 1.5 / N);
    /* a corner beats its neighbourhood: keep the sampled value if refining
       made it worse (ternary search assumes unimodal, cusps are not) */
    out[name] = (sign * r.v >= bv) ? r : { u: us[bi], v: pts[bi][coord] };
  }
  return out;
}
function measure(f, knots) {
  const L = (4 * polyLen(samplePts(f, 16384, knots)) - polyLen(samplePts(f, 8192, knots))) / 3;
  const e = extremes(f, knots);
  const across = e.x1.v - e.x0.v, tall = e.y1.v - e.y0.v;
  return { L, across, tall, R: L / across, tallR: tall / across, uBottom: e.y0.u };
}

/* ---------------------------------------------------------------- families
   Every family is a closed parametric curve on u ∈ [0,1). The polar form
   is used wherever a trigonometric one would have singular speed at the
   corners (superellipse for n>2), so |γ′| stays bounded everywhere. */
const FAMILY = {
  circle: () => ({ f: (u) => [Math.cos(TAU * u), Math.sin(TAU * u)], knots: [] }),

  ellipse: (p) => ({ f: (u) => [Math.cos(TAU * u), p.q * Math.sin(TAU * u)], knots: [] }),

  superellipse: (p) => ({
    f: (u) => {
      const th = TAU * u, c = Math.abs(Math.cos(th)), s = Math.abs(Math.sin(th));
      const r = Math.pow(Math.pow(c, p.n) + Math.pow(s / p.q, p.n), -1 / p.n);
      return [r * Math.cos(th), r * Math.sin(th)];
    }, knots: []
  }),

  /* horizontal stadium, width normalised to 1: two straight runs d, two
     semicircles r. L = 2d + 2πr exactly — a closed-form gate anchor. */
  stadium: (p) => {
    const r = p.r, d = 1 - 2 * r, Ls = 2 * d + 2 * Math.PI * r;
    return {
      f: (u) => {
        let s = u * Ls;
        if (s < d) return [d / 2 - s, -r];
        s -= d;
        if (s < Math.PI * r) { const t = -Math.PI / 2 - s / r; return [-d / 2 + r * Math.cos(t), r * Math.sin(t)]; }
        s -= Math.PI * r;
        if (s < d) return [-d / 2 + s, r];
        s -= d;
        const t2 = Math.PI / 2 - s / r; return [d / 2 + r * Math.cos(t2), r * Math.sin(t2)];
      },
      knots: [d / Ls, (d + Math.PI * r) / Ls, (2 * d + Math.PI * r) / Ls]
    };
  },

  /* Reuleaux triangle of width 1 — three 60° arcs. L = π exactly
     (Barbier), and its width is 1 in EVERY direction, so across = tall = 1
     and around/across = π on a shape that is visibly not a circle. */
  reuleaux: () => {
    const C = [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]];
    return {
      f: (u) => {
        let seg = Math.floor(u * 3), t = u * 3 - seg;
        if (seg > 2) { seg = 2; t = 1; }
        const c = C[(seg + 2) % 3], p0 = C[seg], p1 = C[(seg + 1) % 3];
        const a0 = Math.atan2(p0[1] - c[1], p0[0] - c[0]);
        let a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
        while (a1 < a0) a1 += TAU;
        if (a1 - a0 > Math.PI) a1 -= TAU;
        const a = a0 + (a1 - a0) * t;
        return [c[0] + Math.cos(a), c[1] + Math.sin(a)];
      },
      knots: [1 / 3, 2 / 3]
    };
  },

  /* ovoid — a circle pulled at one end */
  egg: (p) => ({
    f: (u) => { const t = TAU * u; return [Math.sin(t) * (1 + p.k * Math.cos(t)) * 0.8, Math.cos(t)]; },
    knots: []
  }),

  /* circular lune: outer radius 1 at the origin, inner radius r centred
     at (0,d). Both arcs are exact — another closed-form anchor. */
  crescent: (p) => {
    const R = 1, r = p.r, d = p.d;
    const aA = Math.acos((R * R + d * d - r * r) / (2 * d * R));
    const aB = Math.acos((R * R - d * d - r * r) / (2 * d * r));
    const Lo = 2 * R * (Math.PI - aA), Li = 2 * r * (Math.PI - aB), Lt = Lo + Li;
    return {
      f: (u) => {
        let s = u * Lt;
        if (s <= Lo) { const t = (Math.PI / 2 + aA) + s / R; return [R * Math.cos(t), R * Math.sin(t)]; }
        s -= Lo;
        const t2 = (Math.PI / 2 - aB) - s / r;
        return [r * Math.cos(t2), d + r * Math.sin(t2)];
      },
      knots: [Lo / Lt]
    };
  },

  /* r = 1 + amp·cos(kθ) — a k-lobed rosette. Looks as round as a circle
     and carries far more cord; that is its whole job. */
  rosette: (p) => ({
    f: (u) => { const th = TAU * u, r = 1 + p.amp * Math.cos(p.k * th); return [r * Math.cos(th), r * Math.sin(th)]; },
    knots: []
  }),

  /* the same rosette rotated a quarter turn: k=2 with the lobes STACKED,
     so the waist is horizontal and the shape is tall and non-convex. */
  peanut: (p) => ({
    f: (u) => { const th = TAU * u, r = 1 + p.w * Math.cos(2 * th); return [r * Math.sin(th), r * Math.cos(th)]; },
    knots: []
  })
};

function build(family, params) {
  const made = FAMILY[family](params || {});
  return { f: made.f, knots: made.knots };
}
function measureShape(family, params) {
  const b = build(family, params);
  return measure(b.f, b.knots);
}

/* ------------------------------------------------- the measured envelopes
   Each range below was MEASURED by sweeping the family, not assumed. They
   are recorded so a future reader can see why the ladder sits where it
   does, and so the poison test can prove a target outside a range fails. */
const RANGE = {
  'ellipse wide  q .05→1': [2.010, 3.142],
  'ellipse tall  q 1→4': [3.142, 8.578],
  'stadium       r .02→.5': [2.046, 3.142],
  'superellipse  n=4': [2.150, 3.509],
  'superellipse  n=8': [2.217, 3.739],
  'egg           k .02→.99': [3.001, 3.545],
  'crescent      2-param': [3.157, 5.319],
  'rosette k=5   amp→.9': [3.149, 5.735],
  'rosette k=7   amp→.9': [3.157, 7.385],
  'peanut (tall) w .05→.99': [4.634, 7.138]
};

/* Solve one free parameter to hit a target R.
   ⚠ DIRECTION IS MEASURED, NOT ASSUMED. R rises with q on an ellipse but
   FALLS with k on the egg and with d on the crescent — a bisection that
   assumes "increasing" walks to its bound and returns the boundary value,
   which looks exactly like a solution. That is how the first draft of this
   ladder shipped four shapes at their bounds. Bracket first; if the target
   is outside the bracket, HALT and say so rather than returning an end. */
function solveFor(family, key, lo, hi, target, fixed) {
  const at = (v) => { const p = Object.assign({}, fixed || {}); p[key] = v; return measureShape(family, p).R; };
  const rLo = at(lo), rHi = at(hi);
  const min = Math.min(rLo, rHi), max = Math.max(rLo, rHi);
  if (target < min || target > max) {
    throw new Error(`${family}.${key}: R=${target} is outside the reachable bracket ` +
      `[${min.toFixed(4)}, ${max.toFixed(4)}] on ${key} ∈ [${lo}, ${hi}] — ` +
      `re-target or widen, do NOT accept a boundary value`);
  }
  const rising = rHi > rLo;
  let a = lo, b = hi, mid;
  for (let i = 0; i < 160; i++) {
    mid = (a + b) / 2;
    const r = at(mid);
    if ((r < target) === rising) a = mid; else b = mid;
  }
  return mid;
}

/* ---------------------------------------------------------------- the book
   R ladder, every value inside a measured envelope. FREE five span the
   whole ladder; the two designed coincidences each STRADDLE the paywall,
   so a purchase hands the class a partner to a shape they already know. */
const BOOK = [
  { k: 'pebble', family: 'ellipse', solve: ['q', 0.05, 0.999, 2.30], tier: 'free' },
  { k: 'track', family: 'stadium', solve: ['r', 0.02, 0.4999, 2.62], tier: 'paid' },
  { k: 'pillow', family: 'superellipse', solve: ['q', 0.2, 0.999, 2.90], fixed: { n: 4 }, tier: 'paid' },
  { k: 'circle', family: 'circle', tier: 'free' },
  { k: 'reuleaux', family: 'reuleaux', tier: 'paid' },                 /* ⭐ = circle */
  { k: 'egg', family: 'egg', solve: ['k', 0.02, 0.99, 3.42], tier: 'free' },
  { k: 'cushion', family: 'superellipse', params: { n: 8, q: 1 }, tier: 'paid' },
  { k: 'crescent', family: 'crescent', solve: ['d', 0.20, 0.85, 4.20], fixed: { r: 0.70 }, tier: 'free' },
  { k: 'eye', family: 'ellipse', params: { q: 2.3 }, tier: 'free' },
  { k: 'flower', family: 'rosette', solve: ['amp', 0.02, 0.9, null], fixed: { k: 5 }, tier: 'paid' }, /* ⭐ = eye */
  { k: 'peanut', family: 'peanut', solve: ['w', 0.10, 0.99, 6.15], tier: 'paid' },
  { k: 'burst', family: 'rosette', solve: ['amp', 0.02, 0.9, 6.90], fixed: { k: 7 }, tier: 'paid' }
];

/* ------------------------------------------------------------ poison first
   Nothing is written until the machinery has proved it can be wrong.
   (`gen-unit-handle-objects.js` established this; #40's aspect filter was
   caught by exactly this kind of both-directions assertion.) */
function poison() {
  const checks = [];
  const near = (a, b, tol) => Math.abs(a - b) <= tol;

  /* the machinery reproduces closed forms it did not compute */
  const c = measureShape('circle', {});
  checks.push(['circle around/across is π', near(c.R, Math.PI, 1e-9)]);
  const st = measureShape('stadium', { r: 0.35 });
  checks.push(['stadium matches 2 + r(2π−4)', near(st.R, 2 + 0.35 * (2 * Math.PI - 4), 1e-9)]);
  const re = measureShape('reuleaux', {});
  checks.push(['Reuleaux is π too (Barbier)', near(re.R, Math.PI, 1e-8)]);
  checks.push(['Reuleaux has constant width', near(re.tallR, 1, 1e-9)]);

  /* the FLOOR is real: no closed curve comes out under 2 */
  let minSeen = Infinity;
  for (let i = 1; i <= 40; i++) minSeen = Math.min(minSeen, measureShape('ellipse', { q: i / 40 }).R);
  checks.push(['nothing in the ellipse family reaches 2.0', minSeen > 2.0]);
  checks.push(['…and it gets close (the floor is a floor, not a guess)', minSeen < 2.05]);

  /* ⭐ BOTH DIRECTIONS. A range that never rejects is not a range. */
  const inRange = measureShape('egg', { k: 0.5 }).R;
  checks.push(['an egg lands inside the measured egg envelope', inRange > 3.0 && inRange < 3.55]);
  checks.push(['a peanut does NOT land in the egg envelope', measureShape('peanut', { w: 0.7 }).R > 3.55]);

  /* knots are load-bearing: dropping them must visibly degrade the crescent */
  const b = build('crescent', { r: 0.70, d: 0.42 });
  const withKnots = polyLen(samplePts(b.f, 2048, b.knots));
  const without = polyLen(samplePts(b.f, 2048, []));
  checks.push(['forcing the crescent corner changes the length', Math.abs(withKnots - without) > 1e-6]);

  /* a degenerate configuration must be refused, not silently plausible */
  const degen = measureShape('ellipse', { q: 0 });
  checks.push(['a flat ellipse is detectable (R→2, tall→0)', degen.tallR < 1e-9]);

  let bad = 0;
  for (const [name, ok] of checks) { if (!ok) { console.error('  POISON FAIL: ' + name); bad++; } }
  console.log('poison: ' + (checks.length - bad) + '/' + checks.length + ' checks behave');
  if (bad) process.exit(1);
}

/* ------------------------------------------------------------------- main */
poison();

const solved = [];
for (const row of BOOK) {
  let params = row.params || Object.assign({}, row.fixed || {});
  if (row.solve) {
    const [key, lo, hi, target] = row.solve;
    let t = target;
    if (t === null) {                       /* the flower is tuned to the eye */
      const eye = solved.find((s) => s.k === 'eye');
      if (!eye) throw new Error('flower must be solved after eye');
      t = eye.m.R;
    }
    params[key] = solveFor(row.family, key, lo, hi, t, row.fixed);
  }
  solved.push({ k: row.k, family: row.family, params, tier: row.tier, m: measureShape(row.family, params) });
}

solved.sort((a, b) => a.m.R - b.m.R);

console.log('\nkey        family        tier   R         tall     parameters');
for (const s of solved) {
  console.log('  ' + s.k.padEnd(9) + s.family.padEnd(14) + s.tier.padEnd(7) +
    s.m.R.toFixed(5).padStart(8) + '  ' + s.m.tallR.toFixed(4).padStart(7) + '   ' +
    JSON.stringify(s.params, (k, v) => (typeof v === 'number' ? +v.toFixed(6) : v)));
}

console.log('\n--- the ladder ---');
let tight = 0;
for (let i = 1; i < solved.length; i++) {
  const gap = solved[i].m.R - solved[i - 1].m.R;
  const pair = gap < 1e-6;
  if (!pair && gap < 0.20) tight++;
  console.log('  ' + solved[i - 1].k.padEnd(9) + ' → ' + solved[i].k.padEnd(9) + '  ' +
    gap.toFixed(4).padStart(8) + (pair ? '   ⭐ DESIGNED COINCIDENCE' : (gap < 0.20 ? '   ⚠ tight' : '')));
}
console.log('  tight gaps (excluding the designed pairs): ' + tight);

console.log('\n--- the two designed coincidences ---');
const by = {}; solved.forEach((s) => { by[s.k] = s; });
console.log('  circle   R=' + by.circle.m.R.toFixed(10) + '  tall=' + by.circle.m.tallR.toFixed(4));
console.log('  reuleaux R=' + by.reuleaux.m.R.toFixed(10) + '  tall=' + by.reuleaux.m.tallR.toFixed(4) +
  '   |ΔR| = ' + Math.abs(by.circle.m.R - by.reuleaux.m.R).toExponential(2));
console.log('  eye      R=' + by.eye.m.R.toFixed(10) + '  tall=' + by.eye.m.tallR.toFixed(4));
console.log('  flower   R=' + by.flower.m.R.toFixed(10) + '  tall=' + by.flower.m.tallR.toFixed(4) +
  '   |ΔR| = ' + Math.abs(by.eye.m.R - by.flower.m.R).toExponential(2));

console.log('\n--- the counter-intuitive pairs (a child cannot read R off the silhouette) ---');
console.log('  crescent tall=' + by.crescent.m.tallR.toFixed(2) + ' R=' + by.crescent.m.R.toFixed(2) +
  '   vs   egg tall=' + by.egg.m.tallR.toFixed(2) + ' R=' + by.egg.m.R.toFixed(2) +
  '   → the SHORTER one carries MORE cord');
console.log('  flower   tall=' + by.flower.m.tallR.toFixed(2) + ' R=' + by.flower.m.R.toFixed(2) +
  '   vs   circle tall=' + by.circle.m.tallR.toFixed(2) + ' R=' + by.circle.m.R.toFixed(2) +
  '   → same box, ' + ((by.flower.m.R / by.circle.m.R - 1) * 100).toFixed(0) + '% more cord');

/* ------------------------------------------------------------------ write */
const order = ['pebble', 'circle', 'egg', 'crescent', 'eye',      /* the free five, ladder-spanning */
  'track', 'pillow', 'reuleaux', 'cushion', 'flower', 'peanut', 'burst'];
const out = {
  version: 1,
  freeCount: 5,
  /* ⭐ family + parameters ONLY. R, perimeter, across and tall are DERIVED
     by the tool and INDEPENDENTLY by the gate — never read from here. */
  shapes: order.map((k) => {
    const s = solved.find((x) => x.k === k);
    if (!s) throw new Error('missing ' + k);
    return { k: s.k, family: s.family, params: s.params };
  })
};
if (out.shapes.length !== 12) throw new Error('the book must hold 12');
if (out.shapes.slice(0, 5).some((s) => solved.find((x) => x.k === s.k).tier !== 'free'))
  throw new Error('the first five must be the free tier');

if (process.argv.indexOf('--write') >= 0) {
  const dest = path.join(__dirname, '..', 'mini tools', 'unroll-tape-shapes.json');
  fs.writeFileSync(dest, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log('\nwrote ' + dest + '  (' + out.shapes.length + ' shapes, freeCount ' + out.freeCount + ')');
  console.log('\n--- paste into unroll-tape.js FALLBACK_SHAPES (the free five) ---');
  console.log(JSON.stringify({ version: 1, freeCount: 5, shapes: out.shapes.slice(0, 5) }));
} else {
  console.log('\n(preview only — pass --write to emit the JSON)');
}

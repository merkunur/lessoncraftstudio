/* =====================================================================
   verify-build-plan.js — TOOL #44, exhaustive, Node only
   ---------------------------------------------------------------------
   Run:  node scripts/verify-build-plan.js

   ⚠ NO BROWSER WORK IN HERE. mutate-build-plan.js runs this file once
   per mutation under a 30s cap, and a gate that hangs is scored as
   SURVIVED — an unbounded loop once let a mutation through on #38.

   ⭐⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool means the gate marks its own homework — that is how 19
   of 51 mutations survived on number-sieve. So:
     · the projections are recomputed here from the raw height array,
       never by calling the tool's front()/side();
     · the ambiguity census is built by ENUMERATING all 1,953,125
       buildings and grouping them, which is a completely different
       algorithm from the tool's nine-comparison test;
     · the paint order is checked against the view direction DERIVED
       from the projection, not against the tool's sort key.

   The model is finite and small — a full sweep costs about a second —
   so "exhaustive where the model is finite" is met literally.
   ===================================================================== */

'use strict';
const path = require('path');
const DIR = process.env.BPL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(DIR, 'build-plan.js'));

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

const N = 3, HMAX = 4, TOTAL = Math.pow(HMAX + 1, N * N);

/* ⚠⚠ CAPTURED AT LOAD, BEFORE ANY ASSERTION CAN TOUCH IT.
   This is the #43 defect, and I reintroduced it verbatim: the
   entitlement block below flips `premium` and `FREE_SETTINGS` to probe
   both tiers, and its restore line read the value back from
   `FALLBACK_SETS.freeCount` — a DIFFERENT LITERAL. A mutation setting
   `FREE_SETTINGS: 0` was therefore repaired by the gate's own cleanup
   and survived. Restore from what was declared, never from a sibling
   constant that happens to agree. */
const DECLARED_FREE = T.FREE_SETTINGS;

/* ---------- the oracle: independent of the tool --------------------- */
const oFront = (h) => {          /* max down each column of the array */
  const o = [];
  for (let c = 0; c < N; c++) { let m = 0; for (let r = 0; r < N; r++) m = Math.max(m, h[r * N + c]); o.push(m); }
  return o;
};
const oSide = (h) => {           /* max along each row */
  const o = [];
  for (let r = 0; r < N; r++) { let m = 0; for (let c = 0; c < N; c++) m = Math.max(m, h[r * N + c]); o.push(m); }
  return o;
};
const oRot = (h) => {            /* written index-first, not loop-first */
  const o = new Array(9);
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) o[c * N + (N - 1 - r)] = h[r * N + c];
  return o;
};
const eq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const kOf = (h) => oFront(h).join('') + '|' + oSide(h).join('');

console.log('\n[V1] the model is total');
for (const junk of [null, undefined, 0, 1, '', 'x', [], {}, { h: null }, { h: 'x' }, { h: [1, 2] },
  { h: [NaN, Infinity, -Infinity, -7, 99, 1.5, 1, 1, 1] }, { nope: 1 }, [1, 2, 3]]) {
  const s = T._st(junk);
  const okShape = s && Object.prototype.toString.call(s.h) === '[object Array]' && s.h.length === 9;
  const okRange = okShape && s.h.every((v) => Number.isInteger(v) && v >= 0 && v <= HMAX);
  if (!okShape || !okRange) is(false, `_st is total for ${JSON.stringify(junk)} — got ${JSON.stringify(s)}`);
}
is(true, `_st survived every junk input with nine integers in 0..${HMAX}`);
is(T._st({ h: [1, 2] }).h.length === 9, 'a short array is filled, not handed through to .length (#39)');
/* ⭐ AN ARRAY-LIKE IS NOT AN ARRAY, and only an assertion that can tell
   them apart makes the guard load-bearing. A mutation replacing the
   Array check with a truthy `st.h` test SURVIVED the first run, because
   every junk input above coerces to the same nine zeros either way. An
   object with numeric keys does NOT: read it and you get 4s, reject it
   and you get the default. */
{
  const arrayLike = { h: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, length: 9 } };
  is(T._st(arrayLike).h.every((v) => v === 1),
    'an ARRAY-LIKE object is rejected and the default is used, not read as if it were an array');
}
is(T._st({ h: 'x' }).h.every((v) => v === 1), 'a string h is rejected, not indexed character by character');

console.log('\n[V2] refusals are refusals, not silent clamps');
const base = { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] };
is(T.setHeight(base, 0, 0, 1) === null, 'setHeight refuses a no-op');
is(T.setHeight(base, 0, 0, HMAX + 1) === null, 'setHeight refuses above the ceiling (a refusal, not a clamp)');
is(T.setHeight(base, 0, 0, -1) === null, 'setHeight refuses below the floor');
is(T.setHeight(base, 0, 0, 1.5) === null, 'setHeight refuses a non-integer');
is(T.setHeight(base, 0, 0, NaN) === null, 'setHeight refuses NaN');
is(T.setHeight(base, 3, 0, 2) === null, 'setHeight refuses an off-grid row');
is(T.setHeight(base, 0, -1, 2) === null, 'setHeight refuses a negative column');
/* ⭐ NaN COORDINATES, NOT JUST A NaN VALUE. A NaN value is caught for
   free by `v !== Math.round(v)`, so testing only that left the isFinite
   guard unasserted — a mutation dropping it SURVIVED. A NaN row slips
   past every `<` and `>=` comparison (they are all false for NaN),
   writes to s.h[NaN], and returns a state that reports success while
   nothing changed. */
is(T.setHeight(base, NaN, 0, 2) === null, 'setHeight refuses a NaN ROW — every comparison against NaN is false, so it would otherwise slip through');
is(T.setHeight(base, 0, NaN, 2) === null, 'setHeight refuses a NaN COLUMN');
is(T.setHeight(base, Infinity, 0, 2) === null, 'setHeight refuses an infinite row');
is(T.bump(base, NaN, 0, 1) === null, 'bump refuses a NaN row');
is(T.setHeight(base, 0, 0, 4) !== null, 'setHeight accepts a real change');
/* ⭐ bump is a COMPOSITION of setHeight, so there is ONE clamp rule */
is(T.bump({ h: [HMAX, 0, 0, 0, 0, 0, 0, 0, 0] }, 0, 0, 1) === null,
  'bump saturates at the ceiling and then REFUSES — it never wraps (#39)');
is(T.bump({ h: [0, 0, 0, 0, 0, 0, 0, 0, 0] }, 0, 0, -1) === null, 'bump refuses below the floor, never wraps');
is(T.bump(base, 0, 0, NaN) === null, 'bump refuses NaN');
{
  let wrapped = 0;
  for (let v = 0; v <= HMAX; v++) {
    const st = { h: [v, 0, 0, 0, 0, 0, 0, 0, 0] };
    const up = T.bump(st, 0, 0, 1), dn = T.bump(st, 0, 0, -1);
    if (up && up.h[0] < v) wrapped++;
    if (dn && dn.h[0] > v) wrapped++;
  }
  is(wrapped === 0, `no tap wraps at either end across all ${HMAX + 1} heights: ${wrapped} wraps`);
}

console.log('\n[V3] the whole space — 1,953,125 buildings');
const t0 = Date.now();
const fib = new Map(), rep = new Map();
let rotBad = 0, carryBad = 0, fixed = 0, cubesBad = 0, orderBad = 0, seen = 0;
{
  const h = new Array(9).fill(0);
  const rec = (i) => {
    if (i === 9) {
      seen++;
      const st = { h: h.slice() };
      /* the tool's projections must equal the oracle's */
      if (!eq(T.front(st), oFront(h))) carryBad++;
      if (!eq(T.side(st), oSide(h))) carryBad++;
      /* rot^4 = identity, and rot matches the oracle's rotation */
      const r1 = T.rot(st);
      if (!eq(r1.h, oRot(h))) rotBad++;
      if (!eq(T.rot(T.rot(T.rot(r1))).h, h)) rotBad++;
      if (eq(r1.h, h)) fixed++;
      /* the census, grouped by the ORACLE's key */
      const k = kOf(h);
      fib.set(k, (fib.get(k) || 0) + 1);
      if (!rep.has(k)) rep.set(k, h.slice());
      return;
    }
    for (let v = 0; v <= HMAX; v++) { h[i] = v; rec(i + 1); }
  };
  rec(0);
}
is(seen === TOTAL, `enumerated every building: ${seen.toLocaleString()} === 5^9`);
is(carryBad === 0, `the tool's front()/side() match an independent oracle everywhere: ${carryBad} faults`);
is(rotBad === 0, `rot matches the oracle AND rot^4 = identity everywhere: ${rotBad} faults`);
/* ⚠ THE LAW THAT WAS FALSE. "A turn always changes what you see" is
   wrong; 125 buildings are turn-invariant. Measured before it was
   gated, so the number is asserted rather than the slogan (#39). */
is(fixed === 125, `EXACTLY 125 buildings are turn-invariant (measured, not assumed): got ${fixed}`);
is(fixed / TOTAL < 0.0001, `…which is ${(100 * fixed / TOTAL).toFixed(4)}% — rare, but the turn stays ENABLED there, because a turn that visibly does nothing IS the invariance idea`);

console.log('\n[V4] the turn carries the front to the side');
{
  let bad = 0, plainSame = 0;
  const h = new Array(9).fill(0);
  const rec = (i) => {
    if (i === 9) {
      const st = { h: h.slice() };
      const f1 = oFront(oRot(h)), s0 = oSide(h);
      if (!eq(f1, s0.slice().reverse())) bad++;
      if (eq(f1, s0)) plainSame++;
      return;
    }
    for (let v = 0; v <= HMAX; v++) { h[i] = v; rec(i + 1); }
  };
  rec(0);
  is(bad === 0, `front(rot(h)) === REVERSE(side(h)) universally: ${bad} exceptions`);
  is(plainSame === 687625, `…and it equals side(h) unreversed exactly where the profile is a palindrome: ${plainSame.toLocaleString()}`);
}

console.log('\n[V5] the ambiguity, and the cheap test that the tool ships');
is(fib.size === 5501, `distinct (front,side) pairs: ${fib.size} (expected 5,501)`);
{
  let amb = 0, det = 0;
  for (const n of fib.values()) { if (n > 1) amb++; else det++; }
  is(amb === 4792, `AMBIGUOUS pairs: ${amb} (expected 4,792)`);
  is(det === 709, `DETERMINED pairs: ${det} (expected 709)`);
  let sum = 0; for (const n of fib.values()) sum += n;
  is(sum === TOTAL, `the fibres PARTITION the space: ${sum.toLocaleString()} === ${TOTAL.toLocaleString()}`);
  let shared = 0; for (const n of fib.values()) if (n > 1) shared += n;
  is(shared === 1952416,
    `${shared.toLocaleString()} buildings (${(100 * shared / TOTAL).toFixed(2)}%) share their two directions with another — showing BOTH views does not collapse the point`);
}
/* ⭐⭐ the nine-comparison test against the exhaustive census */
{
  let disagree = 0, firstBad = null;
  for (const [k, count] of fib) {
    const st = { h: rep.get(k) };
    const cheap = T.isAmbiguous(st);
    if (cheap !== (count > 1)) { disagree++; if (!firstBad) firstBad = [k, count, cheap]; }
  }
  is(disagree === 0,
    `⭐ the tool's NINE-COMPARISON ambiguity test agrees with the exhaustive census on all ${fib.size} pairs`
    + (firstBad ? ` — first disagreement ${JSON.stringify(firstBad)}` : ''));
}
/* and the payoff must be honest on every pair, at several picks */
{
  let dishonest = 0, nulled = 0, sameBack = 0, nonNull = 0;
  for (const [k, count] of fib) {
    const st = { h: rep.get(k) };
    for (const pick of [0, 0.37, 0.5, 0.99]) {
      const o = T.another(st, pick);
      if (count === 1) { if (o !== null) nonNull++; continue; }
      if (!o) { nulled++; continue; }
      if (kOf(o.h) !== k) dishonest++;
      if (o.h.join() === st.h.join()) sameBack++;
    }
  }
  is(nonNull === 0, `another() returns null on ALL ${709} determined pairs — the chip goes dead exactly there`);
  is(nulled === 0, 'another() never returns null on an ambiguous pair');
  is(dishonest === 0, '⭐ every replacement really does share both directions — 0 dishonest');
  is(sameBack === 0, '…and it is never the building you already had');
}
/* ⭐ AND IT MUST BE ASKED FROM THE TALLEST MEMBER TOO. another() short-
   circuits to h* whenever you are not already sitting on it, so every
   call above took that branch and the pick-a-lowering path was NEVER
   EXECUTED — a mutation letting it hand back the same building
   survived. Start from h* and the other branch runs. */
{
  let same = 0, dishonest = 0, nulled = 0, tried = 0;
  for (const [k, count] of fib) {
    if (count === 1) continue;
    const h = rep.get(k);
    const top = T.tallest(oFront(h), oSide(h));
    for (const pick of [0, 0.25, 0.6, 0.95]) {
      tried++;
      const o = T.another(top, pick);
      if (!o) { nulled++; continue; }
      if (o.h.join() === top.h.join()) same++;
      if (kOf(o.h) !== k) dishonest++;
    }
  }
  is(tried > 10000, `NON-VACUITY: the lowering branch was exercised ${tried.toLocaleString()} times`);
  is(nulled === 0, 'from the tallest member, another() still finds one');
  is(same === 0, '⭐ …and never returns the tallest member back to you');
  is(dishonest === 0, '…and it still shares both directions');
}

console.log('\n[V5b] the repertoire is filtered by entitlement');
{
  /* ⚠ this was unasserted, and a mutation removing the filter entirely
     survived the first run — the paid repertoire would have leaked to
     every free visitor with no gate going red. */
  const was = T.premium, book = T._book;
  /* offline, the fallback IS the free tier — that is the rule (#38:
     degrade to the FREE TIER, not to nothing), so free === paid here
     and asserting `paid > free` against the FALLBACK was my error, not
     the tool's. Depth lives in the shipped repertoire, so load it. */
  T._book = T.FALLBACK_SETS;
  T.premium = false;
  const offlineFree = T._sets().length;
  T.premium = true;
  const offlinePaid = T._sets().length;
  is(offlineFree === T.FREE_SETTINGS, `offline, a free visitor is served exactly ${T.FREE_SETTINGS} settings, got ${offlineFree}`);
  is(offlinePaid === T.FALLBACK_SETS.sets.length,
    `offline, a subscriber is served the whole fallback (${T.FALLBACK_SETS.sets.length}) — the fallback IS the free tier, so these two are equal BY DESIGN`);

  const shipped = JSON.parse(require('fs').readFileSync(path.join(DIR, 'build-plan-sets.json'), 'utf8'));
  T._book = shipped;
  T.FREE_SETTINGS = shipped.freeCount;
  T.premium = false;
  const free = T._sets().length;
  T.premium = true;
  const paid = T._sets().length;
  T.premium = was; T._book = book; T.FREE_SETTINGS = DECLARED_FREE;
  is(free === shipped.freeCount, `the shipped book serves a free visitor exactly ${shipped.freeCount}, got ${free}`);
  is(paid === shipped.sets.length, `…and a subscriber all ${shipped.sets.length}, got ${paid}`);
  is(paid > free, `⭐ the paid tier really is deeper: ${paid} against ${free}`);
  {
    let shapeBad = 0;
    for (const s of shipped.sets) if (!s.h || s.h.length !== 9 || !s.h.every((v) => Number.isInteger(v) && v >= 0 && v <= HMAX)) shapeBad++;
    is(shapeBad === 0, `every one of the ${shipped.sets.length} shipped buildings is nine integers in 0..${HMAX}`);
    const seenK = new Set(shipped.sets.map((s) => s.h.join(',')));
    is(seenK.size === shipped.sets.length, `no shipped building is a duplicate of another: ${seenK.size}/${shipped.sets.length}`);
  }
}
/* the picker must be total: junk `pick` must not throw or return junk */
{
  /* ⚠ THE FIRST VERSION OF THIS CHECK ONLY VALIDATED A TRUTHY RESULT,
     so `undefined` sailed through it and a mutation deleting the pick
     normalisation SURVIVED. Without that guard, a NaN pick makes
     Math.floor(NaN * len) = NaN and pool[NaN] is undefined — the chip
     would silently do nothing. This state is AMBIGUOUS, so a real
     building is owed for every junk pick. */
  let bad = 0, undef = 0;
  const st = { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] };
  is(T.isAmbiguous(st), 'NON-VACUITY: the probe state is ambiguous, so another() owes a building for every pick');
  for (const p of [undefined, null, NaN, -1, 0, 0.5, 1, 2, 1e9, -Infinity, Infinity, 'x', {}, [], true]) {
    const o = T.another(st, p);
    if (!o || !o.h || o.h.length !== 9) { undef++; continue; }
    if (kOf(o.h) !== kOf(st.h)) bad++;
    if (o.h.join() === st.h.join()) bad++;
  }
  is(undef === 0, `⭐ another() returns a real building for EVERY junk pick — never undefined: ${undef} faults`);
  is(bad === 0, `…and every one of them shares both directions and differs from the current: ${bad} faults`);
}

console.log('\n[V6] the cubes, and the derived paint order');
{
  const h = new Array(9).fill(0);
  const rec = (i) => {
    if (i === 9) {
      const st = { h: h.slice() };
      const list = T.cubes(st);
      let want = 0; for (let j = 0; j < 9; j++) want += h[j];
      if (list.length !== want) cubesBad++;
      /* per-column count must equal that column's numeral — this is
         "plan and building are one state", asserted rather than said */
      const per = new Array(9).fill(0);
      for (const q of list) per[q.y * N + q.x]++;
      for (let j = 0; j < 9; j++) if (per[j] !== h[j]) cubesBad++;
      /* ⚠⚠ THE FIRST VERSION OF THIS CHECK WAS TOO WEAK AND THREE PAINT
         MUTATIONS SURVIVED IT. It only looked along the exact view ray:
         "if the cube at P+(1,1,1) exists it must come later". But along
         that ray z strictly increases, so ANY z-ascending order — the
         shipped primitive's z/y/x loop, or no sort at all — satisfies
         it. A check that only tests the ray is not testing the order.

         The real requirement is the ORDERING itself: paint far-to-near,
         and "near" along (1,1,1) is measured by x+y+z. So assert the
         sequence is non-decreasing in a depth the GATE computes from
         the returned coordinates — never from the tool's own `d` field,
         which would be marking its own homework. */
      let prev = -1;
      for (const q of list) {
        const depth = q.x + q.y + q.z;      /* computed here, not read */
        if (depth < prev) orderBad++;
        prev = depth;
      }
      return;
    }
    for (let v = 0; v <= HMAX; v++) { h[i] = v; rec(i + 1); }
  };
  rec(0);
}
is(cubesBad === 0, `cubes() draws exactly the plan, column by column, in every building: ${cubesBad} faults`);
is(orderBad === 0, `⭐ the paint sequence is far-to-near by x+y+z in every one of the ${TOTAL.toLocaleString()} buildings: ${orderBad} faults`);
/* ⭐ AND THE ORDER IS GROUNDED EMPIRICALLY, not only structurally: on a
   sample, every pair of cubes whose drawn hexagons actually OVERLAP is
   checked, so "far-to-near by x+y+z" is shown to be the right rule and
   not merely the rule the tool follows. */
{
  const U = 40;
  const hexOverlap = (a, b) => {           /* two unit cubes' silhouettes */
    const pa = T.isoPt(a.x + 0.5, a.y + 0.5, a.z + 0.5, U, 0, 0);
    const pb = T.isoPt(b.x + 0.5, b.y + 0.5, b.z + 0.5, U, 0, 0);
    return Math.abs(pa.x - pb.x) < 0.866 * U - 1e-9 && Math.abs(pa.y - pb.y) < U - 1e-9;
  };
  let pairs = 0, wrong = 0, rayPairs = 0;
  const SAMPLE = [
    [1, 2, 3, 1, 2, 3, 1, 2, 3], [4, 4, 4, 4, 4, 4, 4, 4, 4], [0, 3, 0, 3, 3, 3, 0, 3, 0],
    [4, 0, 0, 0, 4, 0, 0, 0, 4], [1, 0, 4, 0, 2, 0, 3, 0, 1], [4, 3, 2, 1, 0, 1, 2, 3, 4],
    [2, 2, 2, 2, 0, 2, 2, 2, 2], [0, 0, 0, 0, 1, 0, 0, 0, 0], [3, 1, 4, 1, 5 - 1, 1, 4, 1, 3]
  ];
  for (const h of SAMPLE) {
    const list = T.cubes({ h: h });
    const has = new Set(list.map((q) => q.x + ',' + q.y + ',' + q.z));
    for (const q of list) if (has.has((q.x + 1) + ',' + (q.y + 1) + ',' + (q.z + 1))) rayPairs++;
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const A = list[i], B = list[j];              /* B is painted later */
      if (!hexOverlap(A, B)) continue;
      pairs++;
      /* the later one must not be FARTHER than the earlier one */
      if ((B.x + B.y + B.z) < (A.x + A.y + A.z)) wrong++;
    }
  }
  /* ⚠ THE FLOOR IS DERIVED, NOT INVENTED. My first version asserted
     "> 200" and failed a CORRECT tool at 45 — the #41 defect exactly
     (an invented margin is not a measurement). The honest floor is the
     count of pairs that lie on the view ray, which is computed here
     independently: every one of those MUST be in the overlap set,
     because two cubes on the ray project to the same point. */
  is(rayPairs > 0, `NON-VACUITY: the sample contains ${rayPairs} cube pairs on the view ray`);
  is(pairs >= rayPairs, `⭐ ${pairs} overlapping pairs compared, at least the ${rayPairs} on-ray ones — a DERIVED floor, not a preferred number`);
  is(wrong === 0, `…and none of them is painted over by something farther away: ${wrong}`);
}
is(T.cubes({ h: [HMAX, HMAX, HMAX, HMAX, HMAX, HMAX, HMAX, HMAX, HMAX] }).length === 36, 'the fullest building is 36 cubes');
is(T.cubes({ h: [0, 0, 0, 0, 0, 0, 0, 0, 0] }).length === 0, 'the empty building draws nothing');

console.log('\n[V7] the projection is a projection');
{
  const p0 = T.isoPt(0, 0, 0, 10, 0, 0), p1 = T.isoPt(1, 1, 1, 10, 0, 0);
  is(Math.abs(p0.x - p1.x) < 1e-9 && Math.abs(p0.y - p1.y) < 1e-9,
    '(0,0,0) and (1,1,1) land on the SAME screen point — the view direction really is (1,1,1)');
  const a = T.isoPt(0, 0, 0, 10, 0, 0), b = T.isoPt(1, 0, 0, 10, 0, 0), c = T.isoPt(0, 0, 1, 10, 0, 0);
  is(b.x > a.x && b.y > a.y, 'a step across goes down-RIGHT, so the side face is the lower-right one');
  is(c.y < a.y && Math.abs(c.x - a.x) < 1e-9, 'a step up goes straight up the screen');
  const d = T.isoPt(0, 1, 0, 10, 0, 0);
  is(d.x < a.x && d.y > a.y, 'a step back goes down-LEFT, so the FRONT face is the lower-left one — which is why the front profile is drawn at lower-left');
}

console.log('\n[V8] the repertoire degrades to the FREE TIER, not to nothing');
{
  const fb = T.FALLBACK_SETS;
  is(!!fb && fb.sets && fb.sets.length > 0, 'a fallback repertoire exists offline');
  /* ⚠ capture the DECLARED free count BEFORE any assertion touches it —
     resetting it from the fallback's own literal is how a check ends up
     masking its own mutation (#43) */
  is(fb.sets.length >= DECLARED_FREE,
    `the fallback carries at least the free tier: ${fb.sets.length} >= ${DECLARED_FREE}`);
  is(fb.freeCount === DECLARED_FREE, `the fallback's freeCount agrees with FREE_SETTINGS (${DECLARED_FREE})`);
  let shapeBad = 0;
  for (const s of fb.sets) {
    if (!s.h || s.h.length !== 9) shapeBad++;
    else if (!s.h.every((v) => Number.isInteger(v) && v >= 0 && v <= HMAX)) shapeBad++;
  }
  is(shapeBad === 0, `every fallback building is nine integers in 0..${HMAX}: ${shapeBad} faults`);
  /* ⭐ THE FREE FIVE MUST REACH EVERY CLAIM IN THE HEADER */
  const free = fb.sets.slice(0, DECLARED_FREE);
  const anySym = free.some((s) => eq(oRot(s.h), s.h));
  const anyDet = free.some((s) => fib.get(kOf(s.h)) === 1);
  const anyAmb = free.some((s) => fib.get(kOf(s.h)) > 1);
  const anyDiff = free.some((s) => !eq(oFront(s.h), oSide(s.h)));
  const bigAmb = free.some((s) => fib.get(kOf(s.h)) > 1000);
  is(anySym, 'a FREE setting is turn-invariant — the "nothing moved" moment costs nothing');
  is(anyDet, 'a FREE setting is DETERMINED — the payoff chip going dead is reachable without paying');
  is(anyAmb, 'a FREE setting is ambiguous');
  is(bigAmb, 'a FREE setting has a very large fibre, so the ambiguity cannot be missed');
  is(anyDiff, 'a FREE setting has front != side — the disagreement is free');
}

console.log('\n[V9] the refuse-list, in the source');
{
  const fs = require('fs');
  const src = fs.readFileSync(path.join(DIR, 'build-plan.js'), 'utf8');
  const strings = JSON.stringify(T.strings);
  /* ⚠ scoped to the AUTHORED STRINGS, not the whole file — the header
     legitimately discusses volume, area and solids in order to fence
     them off, and a ban that reads its own rationale is the
     ban-too-wide trap (#38's Zufallsbeutel). */
  /* ⚠⚠ THIS BAN WAS TOO WIDE ON ITS FIRST RUN AND FAILED CORRECT COPY.
     It matched `how many cubes` and so condemned the instruction "that
     is how many cubes TALL it is" — which is a HEIGHT, and the exact
     phrase the Bauplan routine uses. The forbidden thing is a TOTAL:
     altogether / in all / how many does it use. A ban that rejects the
     tool's own correct sentence teaches you to reword around it instead
     of reporting it — #38's Zufallsbeutel in a new dress, third time on
     this program. Narrowed to the total sense, and poisoned BOTH ways
     below. */
  const TOTAL_BAN = /\bvolume\b|\baltogether\b|\bin all\b|how many .{0,12}\b(in total|altogether)\b|total number/i;
  is(!TOTAL_BAN.test(strings),
    'refuse #2: no authored string asks for a TOTAL — that is G3-346\'s question and 5.MD.C');
  is(!/\barea\b|\bsquare units\b/i.test(strings), 'refuse #3: no authored string mentions area (3.MD.C.5/6 is taken)');
  is(!/\bsphere\b|\bcylinder\b|\bcone\b|\bpyramid\b|\bprism\b|\bnet\b|\bunfold/i.test(strings),
    'refuse #1: no authored string names a solid or a net (K.G.A.3 is taken in 11 locales)');
  is(!/\bscore\b|\bstreak\b|\btimer\b|\bcorrect\b|\bwell done\b/i.test(strings), 'refuse #4: no verdict vocabulary');
  is(!/tasks\s*:/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')),
    'refuse #4: the tool declares NO `tasks`, so the shell renders no activity chrome and no CCSS claim is possible');
  is(!/correct|isRight|score|streak/.test(src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"[^"]*"/g, '')),
    'no verdict field survives in the code either');
  /* poison the bans in BOTH directions, or they are half a test (#38).
     ⭐ The must-PASS cases are the ones that matter here: each is real
     copy this tool needs, and the first version of the ban rejected the
     first of them. */
  is(TOTAL_BAN.test('the volume of the box'), 'POISON fires: "volume"');
  is(TOTAL_BAN.test('how many cubes altogether'), 'POISON fires: "altogether"');
  is(TOTAL_BAN.test('how many cubes in all'), 'POISON fires: "in all"');
  is(TOTAL_BAN.test('write the total number of cubes'), 'POISON fires: "total number"');
  is(!TOTAL_BAN.test('that is how many cubes tall it is'),
    '⭐ POISON passes: "how many cubes TALL" is a HEIGHT — the tool\'s own subject, and what the first ban wrongly condemned');
  is(!TOTAL_BAN.test('three cubes tall, and the one behind it is four'), 'POISON passes: describing column heights');
  is(!TOTAL_BAN.test('write a number in each square'), 'POISON passes: ordinary blueprint prose');
  is(/\bcone\b/i.test('a cone and a cylinder'), 'POISON: the solid-ban fires');
  is(!/\bsphere\b|\bcylinder\b|\bcone\b|\bpyramid\b/i.test('turn it a quarter and watch the front'), 'POISON: it passes the turn copy');
}

console.log('\n[V10] every authored key is DECLARED in every locale it claims');
{
  const keys = Object.keys(T.strings);
  is(keys.length >= 15, `${keys.length} authored keys`);
  let bad = 0;
  for (const k of keys) {
    const v = T.strings[k];
    if (!v || typeof v !== 'object' || typeof v.en !== 'string' || !v.en.trim()) { bad++; console.error('   missing en: ' + k); }
  }
  is(bad === 0, `every key has a non-empty English source: ${bad} gaps`);
  /* the apparatus carries NO WORDS — the only text on the stage is a
     numeral, so no authored string may be drawn into the SVG */
  const fs = require('fs');
  const src = fs.readFileSync(path.join(DIR, 'build-plan.js'), 'utf8');
  is(/textContent = String\(s\.h\[i\]\)/.test(src),
    'the only text drawn on the stage is a numeral from the model (§23.2: no words on the apparatus)');
}

console.log('');
console.log(`  (${Date.now() - t0} ms for the exhaustive passes)`);
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);

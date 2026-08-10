/* =====================================================================
   verify-counting-cups.js — TOOL #48's model, against its OWN oracle.
   Run:  node scripts/verify-counting-cups.js
         COUNTING_CUPS_TOOL_DIR=<dir> node scripts/verify-counting-cups.js

   ⚠⚠ THIS GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool means it marks its own homework — that is how 19 of 51
   mutations survived once. Conservation is recomputed here from the
   raw fields; the digit rule is restated here from the standard, not
   imported; and the shelf capacity is derived here from the geometry.

   ⚠ THE ONE THING IT DOES READ FROM THE TOOL IS `GEO`, deliberately: a
   gate that carries its own copy of the CONSTANT it is checking is
   testing a copy (#44). The difference is that GEO holds measurements
   of the apparatus, while the LAWS below are re-derived.

   ⚠ NON-VACUITY FIRST, ALWAYS. Every law asserts its sample is
   non-empty before it asserts anything about the sample's contents.
   #40's production gate compared two EMPTY NodeLists and would have
   passed on a tool with no tapes at all.

   ⚠ BOUNDED LOOPS ONLY. A gate that HANGS is a gate that SURVIVED — an
   unbounded while(canDraw) once met a mutation that stopped the record
   filling and the harness scored it TIMED OUT, which it counts as
   survived.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.COUNTING_CUPS_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(DIR, 'counting-cups.js'));
const G = T.GEO;

let PASS = 0, FAIL = 0;
const fails = [];
function ok(c, m) { if (c) PASS++; else { FAIL++; if (fails.length < 40) fails.push(m); } }
function head(s) { console.log('\n— ' + s); }

/* ---------- the gate's own oracle, re-derived, never imported ------- */
const CUP = 10;                       /* a cup holds ten: the standard */
const SLOTS = G.CUP_SLOTS;            /* measured off the apparatus     */
const CEIL = 100 + SLOTS * 10 + 9;    /* one stack + nine cups + nine   */

function oracleTotal(st) {            /* L1, computed the long way      */
  let n = 0;
  for (let i = 0; i < st.mat.length; i++) n += 1;
  n += st.open;
  for (let c = 0; c < st.closed; c++) n += CUP;
  for (let s = 0; s < st.stack; s++) n += CUP * CUP;
  return n;
}
function oracleSettled(st) {
  /* a digit can only change by closing a cup, which needs ten loose    */
  return (st.mat.length + st.open) < CUP;
}
function oracleDigits(st) {
  return { h: st.stack, t: st.closed, o: oracleSettled(st) ? st.mat.length + st.open : null };
}

/* deterministic play-through driver, BOUNDED */
function play(st, cap) {
  let presses = 0;
  for (let g = 0; g < (cap || 900); g++) {
    if (T.settled(st)) return { st, presses, stranded: false };
    let best = null, bc = -1;
    for (let i = 0; i < 9; i++) {
      const a = T._padAim(i, st);
      if (a.empty) continue;
      const u = T.underMouth(st, a.x, a.y);
      if (u.take.length > bc) { bc = u.take.length; best = a; }
    }
    if (bc <= 0) return { st, presses, stranded: true };
    st = T.scoop(st, best.x, best.y).st;
    presses++;
  }
  return { st, presses, stranded: true };
}

const BANDS = Object.keys(T.BANDS);
const SEEDS = [];
for (let s = 1; s <= 40; s++) SEEDS.push(s * 7919);

/* ===================================================================
   L1 — CONSERVATION. mat + open + 10*closed + 100*stack === n at EVERY
   reachable state, against the gate's own long-way-round count.
   =================================================================== */
head('L1 conservation');
{
  let states = 0;
  for (const b of BANDS) for (const seed of SEEDS) {
    let st = T.newState(b, seed);
    ok(st.mat.length > 0, 'L1 non-vacuity: fresh state has chips');
    for (let g = 0; g < 900; g++) {
      states++;
      ok(oracleTotal(st) === st.n, `L1 ${b}/${seed}: ${oracleTotal(st)} != ${st.n}`);
      ok(T.total(st) === oracleTotal(st), `L1 tool disagrees with oracle at ${b}/${seed}`);
      if (T.settled(st)) break;
      let best = null, bc = -1;
      for (let i = 0; i < 9; i++) {
        const a = T._padAim(i, st); if (a.empty) continue;
        const u = T.underMouth(st, a.x, a.y);
        if (u.take.length > bc) { bc = u.take.length; best = a; }
      }
      if (bc <= 0) break;
      st = T.scoop(st, best.x, best.y).st;
    }
  }
  ok(states > 1000, `L1 non-vacuity: only ${states} states visited`);
  console.log(`  visited ${states} reachable states`);
}

/* ===================================================================
   L2 — THE CUP. No cup ever holds more than ten; at most one holds
   fewer and it is the open one; the shelf never exceeds its slots.
   =================================================================== */
head('L2 the cup and the shelf');
{
  let checked = 0;
  for (const b of BANDS) for (const seed of SEEDS) {
    let st = T.newState(b, seed);
    for (let g = 0; g < 900; g++) {
      checked++;
      ok(st.open >= 0 && st.open < CUP, `L2 open=${st.open} outside 0..9`);
      ok(st.closed >= 0 && st.closed <= SLOTS, `L2 closed=${st.closed} exceeds ${SLOTS} slots`);
      ok(st.stack === 0 || st.stack === 1, `L2 stack=${st.stack}`);
      if (T.settled(st)) break;
      let best = null, bc = -1;
      for (let i = 0; i < 9; i++) {
        const a = T._padAim(i, st); if (a.empty) continue;
        const u = T.underMouth(st, a.x, a.y);
        if (u.take.length > bc) { bc = u.take.length; best = a; }
      }
      if (bc <= 0) break;
      st = T.scoop(st, best.x, best.y).st;
    }
  }
  ok(checked > 1000, `L2 non-vacuity: only ${checked} checks`);

  /* the eleventh is INEXPRESSIBLE: underMouth never offers more room
     than the cup has, at any aim, in any state */
  let probes = 0;
  for (const b of BANDS) {
    const st0 = T.newState(b, 4242);
    for (let openv = 0; openv < CUP; openv++) {
      const st = Object.assign({}, st0, { open: openv });
      for (let i = 0; i < 9; i++) {
        const a = T._padAim(i, st); if (a.empty) continue;
        const u = T.underMouth(st, a.x, a.y);
        probes++;
        ok(u.take.length <= CUP - openv,
          `L2 mouth offered ${u.take.length} into a cup with ${CUP - openv} places`);
      }
    }
  }
  ok(probes > 100, `L2 non-vacuity: only ${probes} mouth probes`);
  console.log(`  ${checked} states, ${probes} mouth probes`);
}

/* ===================================================================
   L3 — THE DIGITS. The readout equals the gate's own restatement of
   the place-value rule, and when it settles it equals n EXACTLY.
   ⭐ And ALL THREE settle together — never one before another.
   =================================================================== */
head('L3 the digits');
{
  let settles = 0, mid = 0;
  for (const b of BANDS) for (const seed of SEEDS) {
    let st = T.newState(b, seed);
    const n0 = st.n;
    for (let g = 0; g < 900; g++) {
      const d = T.digits(st), o = oracleDigits(st);
      ok(d.h === o.h && d.t === o.t && d.o === o.o,
        `L3 ${b}/${seed}: tool ${JSON.stringify(d)} vs oracle ${JSON.stringify(o)}`);
      ok(d.settled === oracleSettled(st), `L3 settled disagrees at ${b}/${seed}`);
      if (!d.settled) { mid++; ok(d.o === null, 'L3 an unsettled ones digit must be unknown'); }
      if (d.settled) {
        settles++;
        ok(d.h * 100 + d.t * 10 + d.o === n0,
          `L3 MISREAD ${b}/${seed}: reads ${d.h}${d.t}${d.o} for n=${n0}`);
        break;
      }
      let best = null, bc = -1;
      for (let i = 0; i < 9; i++) {
        const a = T._padAim(i, st); if (a.empty) continue;
        const u = T.underMouth(st, a.x, a.y);
        if (u.take.length > bc) { bc = u.take.length; best = a; }
      }
      if (bc <= 0) break;
      st = T.scoop(st, best.x, best.y).st;
    }
  }
  ok(settles === BANDS.length * SEEDS.length,
    `L3 only ${settles} of ${BANDS.length * SEEDS.length} collections reached a settled reading`);
  ok(mid > 500, `L3 non-vacuity: only ${mid} unsettled states seen`);
  console.log(`  ${settles} collections settled and read back exactly; ${mid} unsettled states`);
}

/* ===================================================================
   L4 — REFUSALS return null, never a clamp; and the ceiling is the one
   the SHELF forces, re-derived here from the geometry.
   =================================================================== */
head('L4 refusals and the ceiling');
{
  ok(CEIL === 199, `L4 the shelf's derived ceiling is ${CEIL}, expected 199`);

  const empty = { n: 0, mat: [], open: 0, closed: 0, stack: 0, band: 'heap', seed: 1 };
  ok(T.removeOne(empty) === null, 'L4 removeOne at zero must refuse');
  ok(T.tipAll(empty) === null, 'L4 tipAll with nothing trayed must refuse');
  ok(T.tipCup(empty) === null, 'L4 tipCup with no closed cup must refuse');
  ok(T.breakStack(empty) === null, 'L4 breakStack with no stack must refuse');
  ok(T.canAdd(empty) === true, 'L4 addOne must be offered at zero');

  const full = { n: CEIL, mat: [], open: 9, closed: SLOTS, stack: 1, band: 'heap', seed: 1 };
  ok(oracleTotal(full) === CEIL, 'L4 the full state really is the ceiling');
  ok(T.addOne(full) === null, `L4 addOne at ${CEIL} must refuse`);
  ok(T.canAdd(full) === false, 'L4 the chip must be disabled at the ceiling');
  ok(T.removeOne(full) !== null, 'L4 removeOne at the ceiling must still work');

  /* no aim anywhere on bare ground yields a scoop */
  const bare = { n: 0, mat: [], open: 0, closed: 0, stack: 0, band: 'heap', seed: 1 };
  let refused = 0;
  for (let i = 0; i < 9; i++) {
    const a = T._padAim(i, bare);
    if (T.scoop(bare, a.x, a.y) === null) refused++;
  }
  ok(refused === 9, `L4 only ${refused} of 9 empty regions refused a scoop`);

  ok(T.canRemove(empty) === false, 'L4 the take-one chip must be disabled at zero');
  ok(T.canTipAll(empty) === false, 'L4 the tip-back chip must be disabled with nothing trayed');
  ok(T.canRemove(full) === true, 'L4 the take-one chip must be live at the ceiling');
  ok(T.canTipAll(full) === true, 'L4 the tip-back chip must be live with a full shelf');

  /* ⚠ removeOne must never produce a negative count, even from an
     inconsistent state — the early `n <= 0` guard is what stops it, and
     without a state that exercises it the guard reads as redundant. */
  const bogus = { n: 0, mat: [{ x: 500, y: 500 }], open: 0, closed: 0, stack: 0, band: 'heap', seed: 1 };
  const rb = T.removeOne(bogus);
  ok(rb === null || rb.st.n >= 0, 'L4 removeOne produced a negative count');

  /* ⚠ _st must be TOTAL. #39 shipped `st || newState()`, which passes
     0 and NaN straight through to .length. */
  for (const junk of [null, undefined, 0, NaN, '', 'x', [], 42, true, { mat: 'no' },
    { open: 99 }, { n: -5 }, { closed: 50 }, { closed: -3 }, { stack: 9 },
    { open: -4 }, { band: 'nonsense' }, { n: 1e9 }]) {
    let threw = false, r = null;
    try { r = T._st(junk); } catch (e) { threw = true; }
    ok(!threw, `L4 _st threw on ${JSON.stringify(junk)}`);
    ok(r && Array.isArray(r.mat), `L4 _st(${JSON.stringify(junk)}) gave no mat array`);
    ok(r && r.open >= 0 && r.open < CUP, `L4 _st(${JSON.stringify(junk)}) open out of range`);
    ok(r && r.closed >= 0 && r.closed <= SLOTS, `L4 _st(${JSON.stringify(junk)}) closed out of range`);
    ok(r && T.BANDS[r.band], `L4 _st(${JSON.stringify(junk)}) gave no valid band`);
  }
}

/* ===================================================================
   L5 — NO NUMERAL LEAK. While the mat can still yield a ten, `n` is
   not in the readout — and the readout is not derivable from what the
   tool exposes as digits.
   ⭐ The DOM half of this law is asserted by local-test, in a browser,
   because that is the only place the DOM exists.
   =================================================================== */
head('L5 no numeral leak (model half)');
{
  let unsettled = 0;
  for (const b of BANDS) for (const seed of SEEDS.slice(0, 20)) {
    let st = T.newState(b, seed);
    for (let g = 0; g < 900; g++) {
      if (T.settled(st)) break;
      unsettled++;
      const d = T.digits(st);
      ok(d.o === null, 'L5 the ones digit leaked before the mat was spent');
      ok(d.h * 100 + d.t * 10 !== st.n || st.n === 0,
        `L5 the closed containers alone spell n=${st.n}`);
      let best = null, bc = -1;
      for (let i = 0; i < 9; i++) {
        const a = T._padAim(i, st); if (a.empty) continue;
        const u = T.underMouth(st, a.x, a.y);
        if (u.take.length > bc) { bc = u.take.length; best = a; }
      }
      if (bc <= 0) break;
      st = T.scoop(st, best.x, best.y).st;
    }
  }
  ok(unsettled > 300, `L5 non-vacuity: only ${unsettled} unsettled states`);

  /* the density band must be COARSE — four buckets over 0..199, so no
     sequence of readings can binary-search a total out of it */
  const seen = new Set();
  for (let n = 0; n <= 199; n++) {
    seen.add(T.density({ n, mat: new Array(n).fill({ x: 0, y: 0 }), open: 0, closed: 0, stack: 0, band: 'spill', seed: 1 }));
  }
  ok(seen.size === 4, `L5 the density band has ${seen.size} buckets, expected 4`);
  console.log(`  ${unsettled} unsettled states, ${seen.size} density buckets`);
}

/* ===================================================================
   L6 — THE SCATTER. The two requirements that are SATISFIABLE and
   load-bearing, and nothing invented.
   ⚠ The spec I was handed also demanded Clark-Evans R = 0.78. It is
   ARITHMETICALLY IMPOSSIBLE alongside the non-overlap floor: at this
   density 1.02d exceeds the Poisson MEAN nearest-neighbour, and a
   minimum cannot exceed a mean. R is MEASURED and printed below; it is
   not asserted against a number anybody liked.
   =================================================================== */
head('L6 the scatter');
{
  for (const b of BANDS) {
    let worstNN = Infinity, worstVoid = 0, rSum = 0, runs = 0;
    for (const seed of SEEDS.slice(0, 12)) {
      const st = T.newState(b, seed);
      const d = T.chipDiameter(b);
      const p = Math.sqrt((G.MAT_W * G.MAT_H) / st.n);
      ok(st.mat.length === st.n, `L6 ${b}: scatter dropped a chip (${st.mat.length} of ${st.n})`);
      let sum = 0;
      for (let i = 0; i < st.mat.length; i++) {
        let near = Infinity;
        for (let j = 0; j < st.mat.length; j++) {
          if (i === j) continue;
          const dx = st.mat[i].x - st.mat[j].x, dy = st.mat[i].y - st.mat[j].y;
          const dd = dx * dx + dy * dy;
          if (dd < near) near = dd;
        }
        near = Math.sqrt(near);
        sum += near;
        if (near < worstNN) worstNN = near;
      }
      rSum += (sum / st.mat.length) / (0.5 * p); runs++;
      /* ⚠⚠ THE VOID IS MEASURED ONLY WHERE A CHIP IS ALLOWED TO BE.
         The first version sampled the whole mat and reported a 3.46p
         "bald patch" at (980,896) — the bottom-right corner, in the
         OPEN CUP'S SHADOW. Points beside the cup are far from any chip
         precisely because the cup excludes everything near them, and
         the margin strip within half a diameter of the edge can never
         hold a chip centre at all. Neither is bald: the apparatus is
         standing there.
         ⭐ THIS IS FIXING WHAT IS MEASURED, WHICH IS ALLOWED. Moving
         VOID_MAX from 3.4 to 3.5 to make the same reading pass would
         not be — and a threshold tuned to its own data has stopped
         meaning anything.
         ⚠ I got here by checking WHERE the void was before "fixing" it.
         My first hypothesis (that it sat INSIDE the cup) was wrong, and
         only the coordinates said so. */
      const cr = T._cupRect(b);
      const inset = d / 2;
      let sampled = 0;
      for (let gx = 0; gx <= 48; gx++) for (let gy = 0; gy <= 36; gy++) {
        const x = G.MAT_X + gx / 48 * G.MAT_W, y = G.MAT_Y + gy / 36 * G.MAT_H;
        if (x < G.MAT_X + inset || x > G.MAT_X + G.MAT_W - inset) continue;
        if (y < G.MAT_Y + inset || y > G.MAT_Y + G.MAT_H - inset) continue;
        if (x > cr.x - inset && x < cr.x + cr.w + inset &&
            y > cr.y - inset && y < cr.y + cr.h + inset) continue;
        sampled++;
        let near = Infinity;
        for (let k = 0; k < st.mat.length; k++) {
          const dx = st.mat[k].x - x, dy = st.mat[k].y - y;
          const dd = dx * dx + dy * dy; if (dd < near) near = dd;
        }
        near = Math.sqrt(near) / p;
        if (near > worstVoid) worstVoid = near;
      }
      ok(sampled > 400, `L6 ${b} non-vacuity: only ${sampled} legal points sampled`);
    }
    const d = T.chipDiameter(b);
    ok(runs === 12, `L6 ${b} non-vacuity: only ${runs} scatters measured`);
    /* ⚠⚠ THE GATE'S OWN FLOOR, RE-DERIVED — NOT G.NN_FLOOR.
       Reading the separation requirement off the tool let the mutation
       `NN_FLOOR: 1.02 -> 0.55` SURVIVE: lower the tool's floor and the
       gate obligingly lowered its expectation. That is the gate marking
       its own homework, which this file's own header warns about, in
       the one place I had let it happen.
       The re-derivation is a geometric fact and needs no constant from
       anywhere: TWO DISCS OF DIAMETER d OVERLAP IF THEIR CENTRES ARE
       CLOSER THAN d. Visible ground between every pair is the whole
       requirement, so d is the floor. */
    ok(worstNN >= d - 0.01,
      `L6 ${b}: chips fused — min gap ${worstNN.toFixed(1)} < one diameter ${d.toFixed(1)}`);
    /* ⭐ TWO ASSERTIONS, AND THEY ARE DIFFERENT KINDS OF THING.
       The first is a FACT THIS GATE OWNS and no constant can weaken.
       The second holds the tool to the floor it DECLARES — which would
       be homework-marking on its own, so `NN_FLOOR >= 1` is asserted
       separately and the tool cannot lower its own bar underneath it.
       Both are needed: dropping NN_FLOOR to 0.55 fires the third
       assertion, while breaking the relaxation pass (which lifts the
       worst gap from 1.002d to 1.020d — both non-overlapping, so the
       geometric fact alone is blind to it) fires the second. */
    ok(worstNN >= G.NN_FLOOR * d - 0.01,
      `L6 ${b}: the tool broke its own declared floor — ${worstNN.toFixed(2)} < ${(G.NN_FLOOR * d).toFixed(2)}`);
    ok(G.NN_FLOOR >= 1,
      `L6 ${b}: the tool's NN_FLOOR (${G.NN_FLOOR}) would permit overlapping chips`);
    ok(worstVoid <= G.VOID_MAX,
      `L6 ${b}: bald patch — empty disc ${worstVoid.toFixed(2)}p > ${G.VOID_MAX}p`);
    console.log(`  ${b}: minGap ${worstNN.toFixed(1)}u (floor ${(G.NN_FLOOR * d).toFixed(1)}), ` +
      `maxVoid ${worstVoid.toFixed(2)}p (limit ${G.VOID_MAX}), R measured ${(rSum / runs).toFixed(2)}`);
  }

  /* the open cup's footprint is never occupied */
  for (const b of BANDS) {
    const st = T.newState(b, 31337);
    const cr = T._cupRect(b);
    let inside = 0;
    for (const c of st.mat) {
      if (c.x > cr.x && c.x < cr.x + cr.w && c.y > cr.y && c.y < cr.y + cr.h) inside++;
    }
    ok(inside === 0, `L6 ${b}: ${inside} chips render underneath the open cup`);
  }
}

/* ===================================================================
   L7 — REVERSIBILITY. Undoing is real, not a repaint.
   =================================================================== */
head('L7 reversibility');
{
  let round = 0;
  for (const b of BANDS) for (const seed of SEEDS.slice(0, 12)) {
    const st0 = T.newState(b, seed);
    const a = T.addOne(st0);
    ok(a !== null, 'L7 addOne must be available on a fresh spill');
    const back = T.removeOne(a.st);
    ok(back !== null, 'L7 removeOne must undo an addOne');
    ok(back.st.n === st0.n, `L7 removeOne(addOne) changed n: ${back.st.n} != ${st0.n}`);
    ok(oracleTotal(back.st) === back.st.n, 'L7 the round trip broke conservation');
    round++;

    /* tipAll after any amount of work restores the original n */
    const played = play(st0, 900);
    const all = T.tipAll(played.st);
    if (all) {
      ok(all.st.n === st0.n, `L7 tipAll changed n: ${all.st.n} != ${st0.n}`);
      ok(all.st.mat.length === st0.n, 'L7 tipAll did not return every chip to the mat');
      ok(oracleTotal(all.st) === all.st.n, 'L7 tipAll broke conservation');
      ok(all.st.closed === 0 && all.st.stack === 0 && all.st.open === 0,
        'L7 tipAll left something in a container');
    }
  }
  ok(round === BANDS.length * 12, `L7 non-vacuity: only ${round} round trips`);

  /* the borrow: from a settled decade, one fewer opens a cup */
  const dec = { n: 40, mat: [], open: 0, closed: 4, stack: 0, band: 'heap', seed: 1 };
  ok(oracleTotal(dec) === 40, 'L7 the decade fixture is really forty');
  ok(T.settled(dec) === true, 'L7 a spent mat must read as settled');
  const bor = T.removeOne(dec);
  ok(bor !== null, 'L7 the borrow must be available');
  ok(bor.opened === true, 'L7 the borrow must open a closed cup');
  ok(bor.st.closed === 3 && bor.st.open === 9, `L7 the borrow gave ${bor.st.closed}/${bor.st.open}`);
  ok(oracleTotal(bor.st) === 39, 'L7 the borrow broke conservation');

  /* and across the hundred */
  const hun = { n: 100, mat: [], open: 0, closed: 0, stack: 1, band: 'spill', seed: 1 };
  const b2 = T.removeOne(hun);
  ok(b2 !== null && b2.broke === true, 'L7 removing one from a bare hundred must break the stack');
  ok(oracleTotal(b2.st) === 99, `L7 breaking the hundred gave ${oracleTotal(b2.st)}, expected 99`);
}

/* ===================================================================
   L8 — THE PRESS BUDGET. A whole-class routine is about five minutes,
   and "identical presses stop being decisions" is exactly why two
   hundred objects was refused. So the budget is a LAW, not a hope.
   ⭐ And the preview must actually REFUSE something: at a mouth of one
   cupful nothing is ever left behind and the whole demonstrated-not-
   enforced argument silently never fires.
   =================================================================== */
head('L8 the press budget and the refusal');
{
  for (const b of BANDS) {
    let lo = 1e9, hi = 0, refusedIn = 0, runs = 0;
    for (const seed of SEEDS) {
      let st = T.newState(b, seed);
      let sawRefusal = false, presses = 0;
      for (let g = 0; g < 900; g++) {
        if (T.settled(st)) break;
        let best = null, bc = -1, bl = 0;
        for (let i = 0; i < 9; i++) {
          const a = T._padAim(i, st); if (a.empty) continue;
          const u = T.underMouth(st, a.x, a.y);
          if (u.take.length > bc) { bc = u.take.length; bl = u.left; best = a; }
        }
        if (bc <= 0) break;
        if (bl > 0) sawRefusal = true;
        st = T.scoop(st, best.x, best.y).st;
        presses++;
      }
      ok(T.settled(st), `L8 ${b}/${seed} never settled`);
      if (presses < lo) lo = presses;
      if (presses > hi) hi = presses;
      if (sawRefusal) refusedIn++;
      runs++;
    }
    ok(runs === SEEDS.length, `L8 ${b} non-vacuity: only ${runs} runs`);
    ok(hi <= 30, `L8 ${b}: ${hi} presses is past the point where they stop being decisions`);
    /* the sparse end of the smallest band legitimately has less than a
       cupful under the mouth, so its refusal rate is not 100% */
    const need = b === 'handful' ? 0.6 : 1.0;
    ok(refusedIn / runs >= need,
      `L8 ${b}: the preview refused something in only ${refusedIn}/${runs} sessions`);
    console.log(`  ${b}: ${lo}-${hi} presses, preview refused in ${refusedIn}/${runs} sessions`);
  }
}

/* ===================================================================
   L9 — STRINGS. Every authored key is a real string in English, and
   nothing on the apparatus is an operator glyph or a digit.
   =================================================================== */
head('L9 strings');
{
  /* the four arithmetic operators and U+2212 MINUS SIGN. NOT dashes. */
  const OPERATOR = /[+×÷=−]/;
  const keys = Object.keys(T.strings);
  ok(keys.length >= 30, `L9 non-vacuity: only ${keys.length} strings`);
  let checked = 0;
  for (const k of keys) {
    const v = T.strings[k];
    ok(v && typeof v.en === 'string' && v.en.length > 0, `L9 ${k} has no English`);
    if (!v || typeof v.en !== 'string') continue;
    checked++;
    /* ⚠⚠ BAN-TOO-WIDE, CAUGHT BY THE GATE'S FIRST RUN, AND IT WAS MY
       BAN CONDEMNING MY OWN CORRECT PROSE — the fourth time this
       programme has walked into it. The first version banned the
       EM-DASH as an "operator glyph". An em-dash is ordinary English
       punctuation and it is exactly what every sibling tool's
       requirement-stating labels use ("Print the sheet — this one
       needs a Teacher plan"). It condemned five correct strings.
       The ban is now the four ARITHMETIC operators plus U+2212 MINUS
       SIGN, and nothing else. Dashes and hyphens are punctuation. */
    ok(!OPERATOR.test(v.en), `L9 ${k} carries an operator glyph: "${v.en}"`);
  }
  ok(checked === keys.length, 'L9 every string was checked');

  /* ⚠ POISON IT IN BOTH DIRECTIONS, or a ban is only tested in the one
     case that happens to hold. */
  const MUST_FIRE = ['3 + 4', 'ten × ten', '9 ÷ 3', 'n = 10', 'take − one'];
  const MUST_PASS = [
    'Take one away — there is nothing left to take.',
    'A cup holds ten.',
    'Ring ten at a time – then count what is left.',
    'well-filled, half-empty, top-heavy'
  ];
  for (const s of MUST_FIRE) ok(OPERATOR.test(s), `L9 poison: the ban missed "${s}"`);
  for (const s of MUST_PASS) ok(!OPERATOR.test(s), `L9 poison: the ban condemned "${s}"`);

  /* ⚠ NO BAND LABEL MAY CONTAIN A NUMBER — a number in the settings
     drawer is a numeral leak straight onto the projector. */
  for (const k of ['bandHandful', 'bandHeap', 'bandSpill', 'setBand']) {
    ok(!/\d/.test(T.strings[k].en), `L9 ${k} leaks a number: "${T.strings[k].en}"`);
  }
  /* the instruction may say "ten" as a word; it may not print a digit */
  ok(!/\d/.test(T.strings.instruction.en), 'L9 the instruction prints a digit');
  console.log(`  ${keys.length} strings, no operator glyphs, no digits in any band label`);
}

/* ===================================================================
   L10 — GEOMETRY. The shelf really holds what the ceiling claims, and
   the readout has exactly enough slots.
   =================================================================== */
head('L10 geometry');
{
  const u = G.SHELF_U;
  const cupW = (G.CUP_IW + 2 * G.CUP_WALL) * u;
  const used = G.SHELF_MARGIN * 2 + cupW * 1.06 + G.SHELF_DIV
    + SLOTS * cupW + (SLOTS - 1) * G.SHELF_GAP;
  ok(used <= G.VB_W, `L10 the shelf needs ${used.toFixed(0)} of ${G.VB_W} units`);
  ok(used > G.VB_W * 0.9, `L10 the shelf wastes ${(G.VB_W - used).toFixed(0)} units`);
  ok(G.SLOT_CX.length === 3, 'L10 the readout must have exactly three slots');
  ok(CEIL < 1000, 'L10 three slots must be enough for the ceiling');
  ok(String(CEIL).length === 3, 'L10 the ceiling must use all three slots');
  /* the bands live under the ceiling and never touch their endpoints */
  for (const b of BANDS) {
    const spec = T.BANDS[b];
    ok(spec.hi <= CEIL, `L10 band ${b} tops at ${spec.hi}, past the ceiling`);
    ok(spec.nmax >= spec.hi, `L10 band ${b} sizes its chips for ${spec.nmax} but draws up to ${spec.hi}`);
    /* ⚠ 400 SEEDS, NOT 40. A band endpoint is drawn with probability
       about 1/span, so forty samples routinely miss it — the mutation
       that let the endpoints back in SURVIVED at forty. A rare event
       needs a sample big enough to see it, or the assertion is decor. */
    let lo = 1e9, hi = 0, drawn = 0;
    for (let s = 1; s <= 400; s++) {
      const n = T.newState(b, s * 2654435761 % 4294967296).n;
      if (n < lo) lo = n; if (n > hi) hi = n; drawn++;
    }
    ok(drawn === 400, `L10 band ${b} non-vacuity: only ${drawn} draws`);
    ok(lo > spec.lo, `L10 band ${b} drew its own endpoint ${lo}`);
    ok(hi < spec.hi, `L10 band ${b} drew its own endpoint ${hi}`);
  }
  console.log(`  shelf uses ${used.toFixed(0)}/${G.VB_W}u; ceiling ${CEIL} fits three slots exactly`);
}

/* ---------------------------------------------------------------- */
console.log('\n' + '='.repeat(64));
console.log(`verify-counting-cups: ${PASS} passed, ${FAIL} failed`);
if (FAIL) { console.log('\nfirst failures:'); fails.forEach(f => console.log('  ✗ ' + f)); }
console.log('='.repeat(64));
process.exit(FAIL ? 1 : 0);

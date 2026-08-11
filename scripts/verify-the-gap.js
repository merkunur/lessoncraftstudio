/* =====================================================================
   MODEL GATE — TOOL #56, THE GAP
   =====================================================================
   ⚠⚠ THE ORACLE IS RE-DERIVED FROM WHAT THE TOOL EXISTS TO DO, NOT READ
   OFF ITS CODE. #51 shipped five live model bugs under 16,626 assertions
   because the oracle carried the same misconceptions the code did, and
   #44 shipped a mirrored profile because both sides of the comparison
   shared an index convention and agreed perfectly.

   So the legality predicate below never mentions FLOOR, KMIN or `cap`.
   It is built from the four things a child must be able to DO with a
   scene, in order:

     1. COUNT THE START.  It must be worth counting (a ground of one or
        two is taken in at a glance and there is nothing to wonder about)
        and it must fit the arena.
     2. COUNT THE END.  There must be something left to count — an empty
        ground after the gap is take-all, a different question — and it
        must fit the arena too.
     3. NOT BE HANDED THE ANSWER BY THE EVIDENCE.  The ground shows ONE
        pulse. If the change were exactly one, that single pulse would BE
        the magnitude, and the child would read the answer off the
        evidence instead of working it out. A change of nothing is not a
        change at all.
     4. HAVE A WHOLE NUMBER TO SAY.

   That reproduces the shipped clause set WITHOUT copying it, which is
   the only version of this check worth running.

   ⭐⭐ L2b WALKS ONLY WHAT THE BUTTONS CAN REACH. #54's headline branch
   shipped UNREACHABLE under a 626-assertion gate that called the model
   directly. Every state in L2b is produced by advance(), tryK(),
   clearTry() and newState() alone — the four moves a control invokes.

   ⭐⭐ AND THE NON-LEAK IS MEASURED OVER FOUR CHANNELS IN A REAL BROWSER
   (L6). A model gate proves the model; the tool's central claim is about
   what is IN THE DOM and IN THE COMPUTED STYLE while the ground is dark,
   and no amount of arithmetic can see that.

   Run: node scripts/verify-the-gap.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const http = require('http');

/* ⚠ ENV INDIRECTION. The mutation harness points this at a tmp copy, and
   a hard-coded port makes the gate unrunnable while a sibling holds it —
   "cannot bind" and "failed" look identical at a glance. */
const DIR = process.env.THE_GAP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'the-gap.js');
const PORT = Number(process.env.THE_GAP_PORT) || 5686;
const T = require(SRC);
const SOURCE = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* ================================================================== */
/* L0 — THE SURFACE EXISTS AND IS REACHABLE FROM A GATE.
   ⚠ Every sibling exposes `GEO: GEO` (doubling-mirror.js:679). Without it
   a model gate cannot read the numbers it is supposed to check, so its
   absence is itself an assertion, not a harness inconvenience. */
ok(T && typeof T === 'object', 'L0 the tool did not export an object');
ok(T.GEO && typeof T.GEO === 'object',
  'L0 ⚠⚠ the tool does not export GEO — a model gate cannot read the constants it must check');
const G = T.GEO || parseGeoFromSource();

function parseGeoFromSource() {
  const m = SOURCE.match(/var GEO = \{([\s\S]*?)\n  \};/);
  if (!m) return {};
  const body = m[1].replace(/\/\*[\s\S]*?\*\//g, '');
  try { return eval('({' + body + '})'); } catch (e) { return {}; }
}

const NEEDED = ['CAP', 'FLOOR', 'KMIN', 'T_FALL', 'T_PULSE', 'T_LIFT', 'T_REFUSE',
  'RM_F', 'RM_FLOOR', 'SND_FALL', 'SND_LIFT', 'SND_STEP', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 12, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing or not a number'));
['cap', 'legal', 'scenes', 'newState', 'sign', 'shown', 'advance', 'tryK', 'clearTry', 'lands', 'rail', '_fmt']
  .forEach(k => ok(typeof T[k] === 'function', 'L0 the model surface is missing ' + k + '()'));
ok(!T.tasks, 'L0 the tool declares `tasks` — a free-play instrument must not, or the shell renders activity chrome and an alignment collision becomes possible');
eq(T.id, 'the-gap', 'L0 the tool id does not match its filename');
eq(T.premium, false, 'L0 ⚠ the apparatus itself is not free');
eq(T.cap('ten'), 10, 'L0 cap("ten")');
eq(T.cap('sixteen'), G.CAP, 'L0 cap("sixteen")');
ok(T.cap('sixteen') > T.cap('ten'),
  'L0 ⭐⭐ the two range settings serve the SAME cap — the setting has no consequence (#39: a control whose only effect is its own highlight)');

/* ================================================================== */
/* ⭐⭐ L1 — LEGALITY, RE-DERIVED, AND THE WHOLE SCENE SPACE AT BOTH CAPS. */
{
  /* ORACLE: independent, from the four things a child must be able to do */
  const oracle = (n, k, cap) => {
    if (typeof n !== 'number' || typeof k !== 'number') return false;
    if (!isFinite(n) || !isFinite(k)) return false;
    if (n !== Math.round(n) || k !== Math.round(k)) return false;   /* 4 */
    if (n < 3 || n > cap) return false;                             /* 1 */
    const m = n + k;
    if (m < 1 || m > cap) return false;                             /* 2 */
    /* 3 — one pulse must not BE the answer, and nothing is not a change */
    if (k === 0 || k === 1 || k === -1) return false;
    return true;
  };

  /* poison the ORACLE in both directions before anything trusts it */
  ok(oracle(5, 4, 10) === true, 'L1 poison: the oracle rejected a plainly good scene (5, +4) at ten');
  ok(oracle(5, 1, 10) === false, 'L1 poison: the oracle accepted a change of one — the pulse would be the answer');
  ok(oracle(5, -1, 10) === false, 'L1 poison: the oracle accepted a change of minus one');
  ok(oracle(5, 0, 10) === false, 'L1 poison: the oracle accepted a change of nothing');
  ok(oracle(2, 3, 10) === false, 'L1 poison: the oracle accepted a start of two');
  ok(oracle(3, -2, 10) === true, 'L1 poison: the oracle rejected a scene landing on one');
  ok(oracle(3, -3, 10) === false, 'L1 poison: the oracle accepted a scene that empties the ground');
  ok(oracle(9, 3, 10) === false, 'L1 poison: the oracle accepted a landing over the cap');
  ok(oracle(2.5, 2, 10) === false, 'L1 poison: the oracle accepted a fractional start');

  /* ⚠ THE FLOOR AND KMIN ARE DERIVED, NOT ASSUMED. If the tool's own
     constants drift, the oracle above still speaks for the design. */
  eq(G.FLOOR, 3, 'L1 ⭐ GEO.FLOOR is not the smallest start worth counting');
  eq(G.KMIN, 2, 'L1 ⭐⭐ GEO.KMIN is not 2 — at |k| = 1 the single pulse IS the magnitude, and the child reads the answer off the evidence');

  let checked = 0, agreed = 0, accepted = 0;
  [10, G.CAP].forEach(function (cap) {
    for (let n = -2; n <= cap + 3; n++) {
      for (let k = -cap - 3; k <= cap + 3; k++) {
        checked++;
        const want = oracle(n, k, cap), got = !!T.legal(n, k, cap);
        if (want === got) agreed++;
        else fails.push('L1 ⭐ legal(' + n + ',' + k + ',' + cap + ') = ' + got + ', the derived law says ' + want);
        if (want) accepted++;
      }
    }
  });
  pass += agreed;
  ok(checked > 800, 'L1 non-vacuity: the (n,k) sweep covered only ' + checked + ' pairs');
  ok(accepted > 50, 'L1 non-vacuity: the oracle accepted only ' + accepted + ' scenes — it is refusing everything');
  ok(accepted < checked, 'L1 non-vacuity: the oracle accepted everything — it is not a predicate');
  ok(T.legal(5, 2.5, 10) === false, 'L1 a fractional change was accepted');
  ok(T.legal(5.0000001, 2, 10) === false, 'L1 a nearly-integer start was accepted');

  /* ---- the enumeration itself, at BOTH caps ------------------------ */
  let scenesTotal = 0;
  [['ten', 10], ['sixteen', G.CAP]].forEach(function (pair) {
    const range = pair[0], cap = pair[1];
    const all = T.scenes(cap);

    /* NON-VACUITY FIRST: the set is non-empty and in range BEFORE
       anything is asserted about its contents. */
    ok(Array.isArray(all), 'L1 scenes(' + cap + ') did not return an array');
    ok(all.length > 20, 'L1 non-vacuity: scenes(' + cap + ') holds only ' + all.length + ' scenes');
    ok(all.length < (cap + 4) * (2 * cap + 7), 'L1 non-vacuity: scenes(' + cap + ') is implausibly large');
    scenesTotal += all.length;

    const keys = all.map(s => s.n + '|' + s.k);
    eq(new Set(keys).size, keys.length, 'L1 scenes(' + cap + ') repeats a scene');

    all.forEach(function (s) {
      ok(oracle(s.n, s.k, cap), 'L1 ⭐ scenes(' + cap + ') emitted an ILLEGAL scene ' + s.n + '/' + s.k);
      eq(s.m, s.n + s.k, 'L1 scenes(' + cap + ') emitted m != n + k at ' + s.n + '/' + s.k);
      /* ⭐ |k| >= KMIN FOR EVERY SCENE, and k = +-1 REFUSED BY NAME.
         At k = 1 the change is the modal answer and a single pulse sits
         over it looking like a reason — the (4,2,2) lesson from #55 in a
         new dress. */
      ok(Math.abs(s.k) >= G.KMIN,
        'L1 ⭐⭐ scenes(' + cap + ') emitted |k| = ' + Math.abs(s.k) + ', under KMIN — one pulse over a change of one hands the answer over');
      /* ⚠ THE GROUND NEVER EMPTIES. Take-all is a different question. */
      ok(s.m >= 1 && s.m <= cap,
        'L1 ⭐ scenes(' + cap + ') lands on ' + s.m + ', outside [1, ' + cap + '] — the ground empties, which is take-all and not this tool');
      ok(s.n >= G.FLOOR && s.n <= cap, 'L1 scenes(' + cap + ') started at ' + s.n);
    });

    /* every k = +-1 scene refused BY NAME, at every start */
    let refusedOne = 0;
    for (let n = 1; n <= cap; n++) {
      [1, -1, 0].forEach(function (k) {
        ok(!all.some(s => s.n === n && s.k === k),
          'L1 ⭐⭐ scenes(' + cap + ') contains n=' + n + ' k=' + k + ' — a change of ' + k + ' must never be dealt');
        ok(T.legal(n, k, cap) === false, 'L1 legal(' + n + ',' + k + ',' + cap + ') accepted a change of ' + k);
        refusedOne++;
      });
    }
    ok(refusedOne >= 20, 'L1 non-vacuity: only ' + refusedOne + ' near-zero changes were probed at cap ' + cap);

    /* COMPLETENESS: nothing legal is missing */
    let missing = 0;
    for (let n = 0; n <= cap + 2; n++) {
      for (let k = -cap - 2; k <= cap + 2; k++) {
        const want = oracle(n, k, cap);
        const got = all.some(s => s.n === n && s.k === k);
        if (want !== got) { missing++; fails.push('L1 scenes(' + cap + ') ' + (want ? 'omitted' : 'included') + ' ' + n + '/' + k); }
      }
    }
    eq(missing, 0, 'L1 the enumeration disagrees with the derived law on ' + missing + ' coordinates');

    /* the order is part of the contract — newState indexes this pool */
    let ordered = 0;
    for (let i = 1; i < all.length; i++) {
      ok(all[i].n > all[i - 1].n || (all[i].n === all[i - 1].n && all[i].k > all[i - 1].k),
        'L1 ⭐ scenes(' + cap + ') is not in a stable ascending order — the pick index is not stable');
      ordered++;
    }
    ok(ordered > 20, 'L1 non-vacuity: only ' + ordered + ' order comparisons at cap ' + cap);

    /* BOTH DIRECTIONS MUST BE DEALT, or the ground only ever tells one
       story and the direction channel is decorative */
    ok(all.some(s => s.k > 0), 'L1 ⚠ no scene at cap ' + cap + ' ever ADDS');
    ok(all.some(s => s.k < 0), 'L1 ⚠ no scene at cap ' + cap + ' ever TAKES');
    console.log('  ' + range + ' (cap ' + cap + '): ' + all.length + ' scenes, ' +
      all.filter(s => s.k > 0).length + ' in / ' + all.filter(s => s.k < 0).length + ' out, ' +
      '|k| ' + Math.min.apply(null, all.map(s => Math.abs(s.k))) + '..' + Math.max.apply(null, all.map(s => Math.abs(s.k))));
  });
  ok(scenesTotal > 100, 'L1 non-vacuity: ' + scenesTotal + ' scenes across both caps');

  /* ⚠ THE SMALLER POOL IS A SUBSET, NOT A PREFIX — and this assertion
     shipped as a prefix check and FAILED A CORRECT TOOL 50 times. The
     pool is ordered by start then change, so cap 16 INTERLEAVES: at n=3
     it admits k up to 13 where cap 10 stops at 7. I had carried the
     shape over from #55, where framesFor(a) made a prefix genuinely
     true. An assumption is not a measurement, even when a sibling gate
     is the place it came from. */
  const ten = T.scenes(10), sixteen = T.scenes(G.CAP);
  ok(sixteen.length > ten.length, 'L1b ⭐⭐ the two ranges deal from pools of the same size — the setting has no consequence');
  const big = {};
  sixteen.forEach(s => { big[s.n + '/' + s.k] = 1; });
  ten.forEach(function (s) {
    ok(big[s.n + '/' + s.k] === 1, 'L1b ⭐ the scene ' + s.n + '/' + s.k + ' is dealable at ten and NOT at sixteen — the smaller range is not a subset of the larger');
    ok(s.n <= 10 && s.m <= 10, 'L1b the "up to ten" setting dealt ' + s.n + ' -> ' + s.m);
  });
  /* poison, both directions, on the subset test itself */
  ok(big['3/2'] === 1, 'L1b poison: the subset test cannot find a scene that is plainly in both pools');
  ok(big['3/13'] === 1 && !ten.some(s => s.n === 3 && s.k === 13),
    'L1b poison: the sixteen pool does not actually hold a scene the ten pool refuses — the subset test proves nothing');
}

/* ================================================================== */
/* L1b — newState NEVER produces an illegal scene, for EVERY pick, at
   BOTH caps, and it always arrives in the `before` phase. */
{
  let dealt = 0;
  ['ten', 'sixteen'].forEach(function (range) {
    const cap = T.cap(range), pool = T.scenes(cap);
    ok(pool.length > 0, 'L1b non-vacuity: the ' + range + ' pool is empty');
    const seen = {};
    for (let pick = 0; pick < pool.length + 4; pick++) {
      const s = T.newState(range, pick);
      dealt++;
      ok(s && typeof s === 'object', 'L1b newState returned nothing at pick ' + pick);
      if (!s) continue;
      ok(T.legal(s.n, s.k, cap), 'L1b ⭐ the deal produced an ILLEGAL scene ' + s.n + '/' + s.k);
      eq(s.m, s.n + s.k, 'L1b the dealt scene does not add up at pick ' + pick);
      eq(s.phase, 'before', 'L1b a fresh scene does not arrive in the `before` phase');
      eq(s.tried, null, 'L1b a fresh scene arrives with a theory already on it');
      ok(s.m >= 1 && s.m <= cap, 'L1b the deal lands on ' + s.m);
      if (pick < pool.length) seen[s.n + '|' + s.k] = 1;
    }
    eq(Object.keys(seen).length, pool.length, 'L1b the pick space does not cover the ' + range + ' pool');
    /* ⭐⭐ THE RANDOM PATH MUST REACH THE WHOLE POOL, and this assertion
       exists because a mutation SURVIVED without it: narrowing the deal
       to `random() * (pool/2)` leaves every scene it does deal perfectly
       legal, so a legality-only check cannot see that the top half of
       the range — the big starts and the big changes, which is what the
       "up to sixteen" setting is FOR — has silently stopped existing.
       6,000 draws over a 183-scene pool miss a given scene with
       probability e^-32; a run that fails here is a defect, not luck. */
    const hit = {};
    for (let i = 0; i < 6000; i++) {
      const r = T.newState(range);
      ok(T.legal(r.n, r.k, cap), 'L1b ⭐ a RANDOM deal produced an illegal scene ' + r.n + '/' + r.k);
      hit[r.n + '|' + r.k] = 1;
    }
    eq(Object.keys(hit).length, pool.length,
      'L1b ⭐⭐ 6,000 random deals reached only ' + Object.keys(hit).length + ' of the ' + pool.length +
      ' ' + range + ' scenes — part of the pool is unreachable, and every scene it DOES deal is legal, so nothing else can see this');
    ok(hit[pool[pool.length - 1].n + '|' + pool[pool.length - 1].k] === 1,
      'L1b ⭐ the LAST scene in the ' + range + ' pool was never dealt in 6,000 draws');
  });
  ok(dealt > 200, 'L1b non-vacuity: only ' + dealt + ' deals walked');
}

/* ================================================================== */
/* ⚠⚠ L2 — WHAT IS BUILT IN EACH PHASE. `shown()` returning 0 during the
   gap is the whole non-leak: not hidden, not transparent, NOT BUILT. */
{
  let walked = 0, gapZero = 0;
  [10, G.CAP].forEach(function (cap) {
    T.scenes(cap).forEach(function (s) {
      const before = { n: s.n, k: s.k, m: s.m, phase: 'before', tried: null };
      const gap = { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };
      const after = { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };
      eq(T.shown(before), s.n, 'L2 the `before` phase does not draw the start at ' + s.n + '/' + s.k);
      eq(T.shown(gap), 0, 'L2 ⚠⚠ ' + T.shown(gap) + ' MARKS ARE BUILT DURING THE GAP at ' + s.n + '/' + s.k +
        ' — the non-leak is a fact about the DOM, and a colour that looks like hiding is not hiding');
      eq(T.shown(after), s.m, 'L2 the `after` phase does not draw the landing at ' + s.n + '/' + s.k);
      /* the tried theory must never change what is BUILT */
      eq(T.shown({ n: s.n, k: s.k, m: s.m, phase: 'gap', tried: 4 }), 0, 'L2 a theory made marks appear during the gap');
      gapZero++;
      /* the sign is derived from k and never from the magnitude */
      eq(T.sign(s.k > 0 ? gap : gap), s.k > 0 ? 1 : -1, 'L2 sign() disagrees with the direction of the change');
      walked++;
    });
  });
  ok(walked > 100 && gapZero === walked, 'L2 non-vacuity: walked=' + walked + ' gapZero=' + gapZero);

  /* ⭐ THE SIGN IS A FUNCTION OF DIRECTION ALONE. Two scenes with the
     same sign and different magnitudes must be indistinguishable to it —
     this is the arithmetic half of the non-leak, and L6 measures the
     rendered half. */
  const sgn = {};
  T.scenes(G.CAP).forEach(function (s) {
    const key = s.k > 0 ? '+' : '-';
    (sgn[key] = sgn[key] || []).push(T.sign({ n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null }));
  });
  ok(sgn['+'] && sgn['+'].length > 10 && sgn['-'] && sgn['-'].length > 10,
    'L2 non-vacuity: the sign groups hold ' + ((sgn['+'] || []).length) + '/' + ((sgn['-'] || []).length));
  ok(new Set(sgn['+']).size === 1 && sgn['+'][0] === 1, 'L2 ⭐⭐ sign() varies across scenes that all ADD — it is reading the magnitude');
  ok(new Set(sgn['-']).size === 1 && sgn['-'][0] === -1, 'L2 ⭐⭐ sign() varies across scenes that all TAKE');
}

/* ================================================================== */
/* ⚠⚠ L3 — NO ANSWER MAY EXIST BEFORE ITS QUESTION DOES.
   A control that took an answer to a question nobody had asked is a
   recorded house defect across four tools (draw-bag, number-sieve,
   measurement-bench, estimation-jar). */
{
  let refusedEarly = 0, allowed = 0, landed = 0;
  ['ten', 'sixteen'].forEach(function (range) {
    const cap = T.cap(range);
    /* ⚠ tryK() reads its cap off `this.api.settings.range`, so a gate
       must stand the tool up in the range it is testing. Recorded rather
       than worked around: the coupling is the tool's, not the gate's. */
    T.api = { settings: { range: range } };
    T.scenes(cap).forEach(function (s) {
      ['before', 'gap'].forEach(function (ph) {
        const st = { n: s.n, k: s.k, m: s.m, phase: ph, tried: null };
        for (let k = -cap; k <= cap; k++) {
          ok(T.tryK(st, k) === null,
            'L3 ⚠⚠ A THEORY WAS TAKEN IN THE `' + ph + '` PHASE at ' + s.n + '/' + s.k +
            ' — there is nothing to have a theory about until the gap has lifted');
        }
        refusedEarly++;
        ok(T.lands(st) === null, 'L3 a landing exists in the `' + ph + '` phase');
        ok(T.clearTry(st) === null, 'L3 clearing was allowed with no theory to clear');
      });

      const after = { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };
      /* the rail is what the child can actually press */
      const rail = T.rail(after, range);
      ok(Array.isArray(rail) && rail.length > 0, 'L3 the rail is empty at ' + s.n + '/' + s.k + ' — there is nothing to press');
      ok(rail.every(k => Math.abs(k) >= G.KMIN), 'L3 the rail offers a magnitude under KMIN at ' + s.n + '/' + s.k);
      ok(rail.every(k => (k > 0 ? 1 : -1) === T.sign(after)),
        'L3 ⭐ the rail offers a theory AGAINST the direction the ground showed at ' + s.n + '/' + s.k);
      ok(rail.indexOf(s.k) >= 0, 'L3 ⭐⭐ the TRUE change is not on the rail at ' + s.n + '/' + s.k + ' — the child cannot state it');
      eq(new Set(rail).size, rail.length, 'L3 the rail repeats a magnitude at ' + s.n + '/' + s.k);

      rail.forEach(function (k) {
        const n1 = T.tryK(after, k);
        ok(n1 !== null, 'L3 the rail offers ' + k + ' but tryK refused it at ' + s.n + '/' + s.k);
        if (!n1) return;
        allowed++;
        eq(n1.tried, k, 'L3 the theory was not recorded');
        eq(n1.phase, 'after', 'L3 stating a theory changed the phase');
        eq(n1.n, s.n, 'L3 stating a theory changed the start');
        eq(n1.m, s.m, 'L3 stating a theory changed what the class counted');
        eq(after.tried, null, 'L3 ⚠ tryK() MUTATED the state it was given');
        /* ⭐⭐ lands() IS A SUM, NOT A VERDICT */
        eq(T.lands(n1), s.n + k, 'L3 lands() is not the start plus the theory');
        landed++;
        ok(T.tryK(n1, k) === null, 'L3 the same theory was taken twice');
        const cl = T.clearTry(n1);
        ok(cl !== null && cl.tried === null, 'L3 ⚠ a stated theory could not be cleared — a refusal that traps the class is worse than one that stops them entering');
        eq(cl.n, s.n, 'L3 clearing the theory changed the scene');
        /* ⚠ AND IT MUST LEAVE THE PHASE ALONE. This assertion exists
           because a mutation SURVIVED without it: clearing a theory that
           also reset the phase to `before` would put the cover back and
           destroy the question the theory was about — undoing one thing
           by undoing everything. */
        eq(cl.phase, 'after', 'L3 ⭐ clearing the theory threw the PHASE away — the question the class was answering is gone');
        eq(cl.m, s.m, 'L3 clearing the theory changed what the class counted');
      });
      /* a theory that would leave the arena is refused.
         ⭐⭐ AND THE TWO BOUNDARIES ARE PROBED EXACTLY, not merely from far
         outside. This assertion exists because a mutation SURVIVED
         without it: relaxing the move's floor from `>= 1` to `>= 0` lets
         a theory EMPTY the ground — a landing the scene generator
         refuses by name, because take-all is a different question — and
         it is invisible to a gate that only walks the rail, since the
         rail carries its own copy of the same bound. */
      ok(T.tryK(after, -s.n) === null,
        'L3 ⭐⭐ a theory that EMPTIES THE GROUND was accepted at ' + s.n + '/' + s.k +
        ' — `legal()` refuses a landing on 0, so the move must too');
      ok(rail.indexOf(-s.n) < 0, 'L3 ⭐ the rail offers a theory that empties the ground at ' + s.n + '/' + s.k);
      ok(T.tryK(after, cap + 1 - s.n) === null, 'L3 a theory landing exactly one past the cap was accepted at ' + s.n + '/' + s.k);
      ok(T.tryK(after, cap + 5) === null, 'L3 a theory landing far past the cap was accepted');
      ok(T.tryK(after, -cap - 5) === null, 'L3 a theory landing far below zero was accepted');
      ok(T.tryK(after, 1) === null, 'L3 ⭐ a theory of ONE was accepted — the rail never offers it');
      ok(T.tryK(after, -1) === null, 'L3 ⭐ a theory of minus one was accepted');
      ok(T.tryK(after, 0) === null, 'L3 a theory of nothing was accepted');
      ok(T.tryK(after, 2.5) === null, 'L3 a fractional theory was accepted');
      ok(T.tryK(after, null) === null, 'L3 a null theory was accepted');
    });
  });
  delete T.api;
  ok(refusedEarly > 200 && allowed > 200 && landed > 200,
    'L3 non-vacuity: refusedEarly=' + refusedEarly + ' allowed=' + allowed + ' landed=' + landed);

  /* ---- the phase machine ------------------------------------------- */
  const s0 = { n: 5, k: 4, m: 9, phase: 'before', tried: null };
  const s1 = T.advance(s0);
  eq(s1 && s1.phase, 'gap', 'L3 `before` does not advance into the gap');
  eq(s0.phase, 'before', 'L3 ⚠ advance() MUTATED the state it was given');
  const s2 = T.advance(s1);
  eq(s2 && s2.phase, 'after', 'L3 the gap does not lift');
  ok(T.advance(s2) === null, 'L3 ⚠ the `after` phase advances into a fourth phase');
  eq(s2.n, 5, 'L3 the scene was lost across the phases');
  eq(s2.m, 9, 'L3 the landing was lost across the phases');

  /* ---- the path the CONTROLS actually use: a null state ------------- */
  T.st = { n: 6, k: -3, m: 3, phase: 'before', tried: null };
  T.api = { settings: { range: 'ten' } };
  eq(T.shown(null), 6, 'L3b shown(null) did not read the held state');
  eq(T.sign(null), -1, 'L3b sign(null) did not read the held state');
  const a1 = T.advance(null);
  ok(a1 && a1.phase === 'gap', 'L3b ⚠ advance(null) — the exact call every button makes — returned nothing');
  ok(T.tryK(null, -3) === null, 'L3b a theory was taken over a held state still in the `before` phase');
  T.st = { n: 6, k: -3, m: 3, phase: 'after', tried: null };
  const t1 = T.tryK(null, -2);
  ok(t1 && t1.tried === -2, 'L3b tryK(null, k) did not read the held state');
  eq(T.lands({ n: 6, k: -3, m: 3, phase: 'after', tried: -2 }), 4, 'L3b lands() is wrong');
  T.st = null; delete T.api;
}

/* ================================================================== */
/* ⭐⭐ L2b — BFS OVER ONLY WHAT THE BUTTONS CAN REACH.
   The moves a control invokes: advance() [Show the gap], tryK() [a rail
   numeral], clearTry() [Clear the try], newState() [Something else
   happens]. `newState` is modelled by SEEDING the walk with every scene
   it can produce, which is exactly its reach and keeps the graph finite. */
let HEADLINES = 0;
{
  const key = s => s.n + '|' + s.k + '|' + s.phase + '|' + s.tried;
  const seen = {}, queue = [];
  let seeds = 0, states = 0;

  ['ten', 'sixteen'].forEach(function (range) {
    T.api = { settings: { range: range } };
    const cap = T.cap(range), pool = T.scenes(cap);
    for (let pick = 0; pick < pool.length; pick++) {
      const s = T.newState(range, pick);
      if (seen[key(s)]) continue;
      seen[key(s)] = s; queue.push(s); seeds++;
    }
    let guard = 0;
    while (queue.length && guard++ < 200000) {
      const st = queue.shift();
      const next = [T.advance(st), T.clearTry(st)];
      if (st.phase === 'after') T.rail(st, range).forEach(k => next.push(T.tryK(st, k)));
      next.forEach(function (n) {
        if (!n) return;
        const k = key(n);
        if (seen[k]) return;
        seen[k] = n; queue.push(n);
      });
    }
    ok(guard < 200000, 'L2b the button-only walk did not terminate at ' + range);
  });
  delete T.api;

  const all = Object.keys(seen).map(k => seen[k]);
  states = all.length;
  ok(seeds > 100, 'L2b non-vacuity: only ' + seeds + ' scenes are dealable');
  ok(states > 400, 'L2b non-vacuity: only ' + states + ' states reachable by button');

  /* ⭐⭐ THE HEADLINE: the gap has lifted, a theory has been stated, and
     it lands somewhere OTHER than what the class counted. If this is not
     reachable by pressing controls, the tool does not have the moment it
     exists for — reality disagreeing without anything being marked. */
  const headline = all.filter(x => x.phase === 'after' && x.tried !== null && (x.n + x.tried) !== x.m);
  HEADLINES = headline.length;
  ok(headline.length > 0,
    'L2b ⭐⭐ THE HEADLINE STATE IS UNREACHABLE BY BUTTON — a theory that lands somewhere other than the counted ground cannot be got to by pressing controls');
  headline.slice(0, 400).forEach(function (x) {
    ok(T.lands(x) !== x.m, 'L2b a headline state actually lands on the counted ground');
    ok(T.lands(x) >= 0, 'L2b a reachable theory lands below zero at ' + x.n + '/' + x.tried);
    ok(Math.abs(x.tried) >= G.KMIN, 'L2b a reachable theory is under KMIN');
  });

  /* and the AGREEING theory is reachable too, or the child can never be
     right by pressing */
  const agree = all.filter(x => x.phase === 'after' && x.tried !== null && (x.n + x.tried) === x.m);
  ok(agree.length > 0, 'L2b ⭐ NO reachable theory ever lands on the counted ground — the true answer cannot be stated');

  /* every dealable scene must reach both the gap and the after phase */
  const scenesSeen = {}, scenesAfter = {}, scenesGap = {};
  all.forEach(function (x) {
    scenesSeen[x.n + '|' + x.k] = 1;
    if (x.phase === 'after') scenesAfter[x.n + '|' + x.k] = 1;
    if (x.phase === 'gap') scenesGap[x.n + '|' + x.k] = 1;
  });
  eq(Object.keys(scenesGap).length, Object.keys(scenesSeen).length, 'L2b ⭐ some dealable scene can never be covered');
  eq(Object.keys(scenesAfter).length, Object.keys(scenesSeen).length, 'L2b ⭐ some dealable scene can never be uncovered again');

  /* ⚠ AND THE INVARIANT HOLDS OVER THE WHOLE REACHABLE SET */
  let gapStates = 0;
  all.forEach(function (x) {
    if (x.phase === 'gap') {
      gapStates++;
      eq(T.shown(x), 0, 'L2b ⚠⚠ a REACHABLE gap state builds marks');
      eq(x.tried, null, 'L2b ⚠ a reachable gap state carries a theory — the question does not exist yet');
    }
  });
  ok(gapStates > 100, 'L2b non-vacuity: gap states = ' + gapStates);
  console.log('  ' + states + ' states reachable by button from ' + seeds + ' dealable scenes; ' +
    headline.length + ' are the headline, ' + agree.length + ' agree');
}

/* ================================================================== */
/* L4 — EVERY NAMED CONSTANT REACHES A CALL SITE, AND THE ESCAPES EXIST.
   Five tools have shipped dead motion constants (exchange-machine five,
   number-hotel three, #55 seven). A constant nobody reads is a design law
   with no implementation behind it. */
{
  const body = SOURCE.replace(/\/\*[\s\S]*?\*\//g, '');
  ok(body.length > 5000, 'L4 non-vacuity: comment-stripping ate the file');
  ok(/GEO\.CAP/.test(body), 'L4 non-vacuity: the stripped body contains no GEO reference at all');
  const names = Object.keys(G);
  ok(names.length >= 12, 'L4 non-vacuity: only ' + names.length + ' constants found');
  names.forEach(function (k) {
    const n = (body.match(new RegExp('GEO\\.' + k + '(?![\\w$])', 'g')) || []).length;
    ok(n >= 1, 'L4 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* poison, both directions */
  ok((('GEO.CAP;').match(/GEO\.CAP(?![\w$])/g) || []).length === 1, 'L4 poison: the reference test failed to fire');
  ok((('GEO.CAPTURE;').match(/GEO\.CAP(?![\w$])/g) || []).length === 0, 'L4 poison: the reference test matched across a name boundary');

  /* ⚠⚠ THE SCROLL ESCAPE, TWO RULES, AND NEITHER MAY BE INERT.
     `lcs-shell.css` pins html and body to overflow:hidden AND height:100%,
     so relaxing only the overflow leaves the document unable to grow —
     measured on #22 at 320x568 as an 886px app in a 568px window with
     every control below the fold physically unreachable. And
     `html,body.x{}` is a SELECTOR LIST whose html half applies
     unconditionally, which makes the class decorative. */
  ok(/documentElement\.classList\.add\('crt-scroll'\)/.test(SOURCE), 'L4 the scroll-escape class is not added to html');
  ok(/body\.classList\.add\('crt-scroll'\)/.test(SOURCE), 'L4 the scroll-escape class is not added to body');
  ok(!/html\s*,\s*body\.crt-scroll\s*\{/.test(SOURCE),
    'L4 ⚠ the scroll escape is written as a SELECTOR LIST — the html half then applies unconditionally and the class is decorative');
  ['html', 'body'].forEach(function (el) {
    const n = (SOURCE.match(new RegExp("'" + el + "\\.crt-scroll\\{", 'g')) || []).length;
    eq(n, 1, 'L4 ⚠⚠ there are ' + n + ' `' + el + '.crt-scroll` rules — a duplicate silently overrides the earlier');
    const m = SOURCE.match(new RegExp(el + '\\.crt-scroll\\s*\\{([^}]*)\\}'));
    ok(!!m, 'L4 no ' + el + '.crt-scroll rule to inspect');
    if (!m) return;
    ok(/overflow-y\s*:\s*auto/.test(m[1]), 'L4 ⚠⚠ ' + el + '.crt-scroll does not relax the overflow');
    ok(/height\s*:\s*auto/.test(m[1]),
      'L4 ⚠⚠ ' + el + '.crt-scroll relaxes the overflow but not the HEIGHT — the shell pins it to 100%, so the escape is PRESENT AND INERT');
    ok(/min-height\s*:\s*100%/.test(m[1]), 'L4 ⚠ ' + el + '.crt-scroll has no `min-height:100%` — the card can collapse below the viewport');
  });

  /* ⚠ NO SCREEN SELECTOR DECLARED TWICE. Scoped to the screen rules: the
     array continues INSIDE an unclosed `@media print{`, where `.crt-sheet`
     is legitimately re-declared (display:none on screen, block in print).
     A scope-blind version of this check would condemn that — the
     ban-too-wide trap, and the fix is to measure what I mean. */
  {
    const screenCss = SOURCE.split('@media print{')[0];
    ok(screenCss.length < SOURCE.length, 'L4 non-vacuity: the print block was never found, so nothing was scoped out');
    const rules = screenCss.match(/'\.crt-[\w-]+\{/g) || [];
    ok(rules.length > 8, 'L4 non-vacuity: only ' + rules.length + ' single-selector screen rules found');
    const s1 = {}, dup = [];
    rules.forEach(function (r) { if (s1[r]) dup.push(r); s1[r] = 1; });
    dup.forEach(function (d) { ok(false, 'L4 ⚠ the selector ' + d + '…} is declared twice — the later silently overrides the earlier'); });
    ok(true, 'L4 duplicate-selector sweep ran over ' + rules.length + ' rules');
    /* poison, both directions */
    const p1 = ["'.crt-a{", "'.crt-b{", "'.crt-a{"], q1 = {}, d1 = [];
    p1.forEach(function (r) { if (q1[r]) d1.push(r); q1[r] = 1; });
    eq(d1.length, 1, 'L4 poison: the duplicate sweep failed to spot a repeated selector');
    const q2 = {}, d2 = []; ["'.crt-a{", "'.crt-b{"].forEach(function (r) { if (q2[r]) d2.push(r); q2[r] = 1; });
    eq(d2.length, 0, 'L4 poison: the duplicate sweep flagged two distinct selectors');
  }
  ok(/@media print\{[^]*\.lcs-shell[^]*display:none/.test(SOURCE),
    'L4 the print block does not hide the shell — lcs-shell.css ships no print block, so the worksheet prints the web page');

  /* ⭐⭐ NO COMPARISON IS COMPUTED IN THE RENDER PATH. `lands()` is a sum;
     the landing and the witnessed count are drawn the same way on the
     same ground, and the apparatus never says which is which. */
  const paint = (SOURCE.match(/_paint: function[\s\S]*?\n    \},\n/) || [''])[0];
  ok(paint.length > 500, 'L4 non-vacuity: the paint body was not found (' + paint.length + ' chars)');
  ok(!/(lands\([^)]*\)|s\.tried)\s*[<>]|[<>]\s*(this\.lands|s\.m)|s\.m\s*[<>]|lands\([^)]*\)\s*[!=]==?\s*s\.m|s\.m\s*[!=]==?\s*[\w.]*lands/.test(paint),
    'L4 ⭐⭐ THE RENDER PATH COMPARES THE THEORY TO THE COUNTED GROUND — nothing may be marked right or wrong');
  ok(!/is-(right|wrong|correct|good|bad|match)/.test(SOURCE),
    'L4 ⭐⭐ a correctness class name reaches the CSS — no colour may encode correctness');
  /* poison, both directions */
  ok(/lands\([^)]*\)\s*[!=]==?\s*s\.m/.test('if (this.lands(s) === s.m) {'), 'L4 poison: the comparison ban failed to fire');
  ok(!/lands\([^)]*\)\s*[!=]==?\s*s\.m/.test('add(this.lands(s), \'is-try\');'), 'L4 poison: the comparison ban fired on a plain draw call');
}

/* ================================================================== */
/* ⭐⭐ L5 — THE REFUSE-LIST IS A GATE, NOT A NOTE.
   ⚠ Every ban is poison-tested in BOTH directions, because a ban that
   rejects correct prose teaches a panel to write around it instead of
   reporting it (the `Zufallsbeutel` defect).
   ⚠ AND `\b` IS ASCII-ONLY — a ban written with it is born dead in the
   ten non-English locales. `(?<!\p{L})…(?!\p{L})` is the form. */
{
  const keys = Object.keys(T.strings);
  ok(keys.length >= 18, 'L5 non-vacuity: implausibly few strings (' + keys.length + ')');
  keys.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L5 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY (#50: every string dead under 120k green model assertions)');
    ok(v && typeof v.en === 'string' && v.en.trim().length > 0, 'L5 ⚠ `' + k + '` has no English');
  });

  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  /* ⚠ SCOPED TO THE TOOL'S OWN AUTHORED ENGLISH. Nothing here reads
     document.body — the RSC flight-data trap (#40) condemned ten locales
     for a sibling's correct slug. And scoped to `.en` deliberately:
     these are ENGLISH words, and locale copy is a native panel's job. */
  const prose = keys.map(k => T.strings[k].en).join('  ||  ');
  ok(prose.length > 400, 'L5 non-vacuity: the authored prose is ' + prose.length + ' characters');

  /* (a) NOTHING IS MARKED RIGHT OR WRONG, and no score, streak or timer */
  const JUDGE = ['correct', 'incorrect', 'wrong', 'right', 'score', 'points', 'streak', 'timer',
    'well done', 'good job', 'try again', 'best', 'winner', 'mistake', 'oops'];
  JUDGE.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠⚠ the copy uses "' + w + '" — nothing here may be marked right or wrong');
  });
  ok(!/\b\d+\s+(of|out of)\s+\d+\b/i.test(prose),
    'L5 ⚠⚠ a COMPLETENESS READOUT reached the copy — "4 of 7" is a score wearing a fraction');

  /* (b) NO EFFICACY CLAIM. The pedagogy panel struck five numbers from
     all copy and ruled DO NOT BUILD; the tool ships and the claims do
     not. "research-based, NOT evidence-based" is the house position. */
  const EFFICACY = ['proven', 'evidence-based', 'boosts', 'improves outcomes', 'raises attainment', 'research shows'];
  EFFICACY.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠ the copy claims efficacy with "' + w + '"');
  });

  /* (c) THE PART-NAMES THAT ARE ALREADY OWNED, each measured in the
     docblock: the CURTAIN and the HEM are number-talk-easel's, the
     FOOTPRINT is lids'. */
  ['curtain', 'hem', 'footprint', 'footprints', 'blind', 'cloth'].forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠⚠ "' + w + '" reaches the copy — it is already a shipped sibling\'s part-name');
  });

  /* (d) A FOURTH NAMED PART is the #41/#42 defect verbatim. THE GROUND,
     THE MARKS, THE GAP — and nothing else gets a noun. */
  const FOURTH = ['bench', 'tray', 'board', 'strip', 'rail', 'lid', 'jar', 'bag', 'hoop', 'shelf', 'drum', 'easel'];
  FOURTH.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠ "' + w + '" is a FOURTH named part, and it is a sibling tool\'s own noun');
  });

  /* (e) AND THE THREE THAT MUST BE THERE */
  eq(T.strings.title.en, 'The Gap', 'L5 the product name is the operator\'s');
  ok(/ground/i.test(T.strings.instruction.en), 'L5 the instruction never names the ground');
  ok(/gap/i.test(T.strings.instruction.en), 'L5 the instruction never names the gap');
  ok(/mark/i.test(T.strings.instruction.en) || /count/i.test(T.strings.instruction.en),
    'L5 the instruction never tells the class what to count');

  /* poison, both directions, per ban */
  ok(ban('score').test('keep the score'), 'L5 poison: the judge ban failed to fire');
  ok(!ban('score').test('scoreboard-ish'), 'L5 poison: the judge ban fired across a word boundary');
  ok(ban('hem').test('the hem sways'), 'L5 poison: the hem ban failed to fire');
  ok(!ban('hem').test('watch them count'), 'L5 poison: the hem ban condemned "them" — a substring ban would');
  ok(ban('right').test('that is right'), 'L5 poison: the right ban failed to fire');
  ok(!ban('right').test('brightly lit'), 'L5 poison: the right ban fired inside "brightly"');
  ok(ban('rail').test('the rail of numerals'), 'L5 poison: the fourth-part ban failed to fire');
  ok(!ban('rail').test('trailing edge'), 'L5 poison: the fourth-part ban fired inside "trailing"');
  ok(/\b\d+\s+of\s+\d+\b/i.test('4 of 7 found'), 'L5 poison: the completeness test failed to fire');
  ok(!/\b\d+\s+of\s+\d+\b/i.test('one of the marks'), 'L5 poison: the completeness test fired on prose');
  /* ⚠ and the non-ASCII form, because a `\b` ban is born dead in ten locales */
  ok(new RegExp('(?<!\\p{L})tavu(?!\\p{L})', 'iu').test('yksi tavu tässä'), 'L5 poison: the unicode word boundary failed to fire');
  ok(!new RegExp('(?<!\\p{L})tavu(?!\\p{L})', 'iu').test('tavuja täällä'), 'L5 poison: the unicode word boundary matched a suffixed form');

  /* (f) EVERY {token} MUST BE ONE THE PAINT SUPPLIES */
  const SUPPLIED = { n: 1, m: 1, k: 1, r: 1 };
  let tokens = 0;
  keys.forEach(function (k) {
    (T.strings[k].en.match(/\{(\w+)\}/g) || []).forEach(function (tk) {
      tokens++;
      ok(SUPPLIED[tk.slice(1, -1)] === 1, 'L5 ⚠ `' + k + '` carries the token ' + tk + ', which the paint never supplies');
    });
  });
  ok(tokens >= 8, 'L5 non-vacuity: only ' + tokens + ' tokens found across the strings');

  /* ⭐⭐ (g) EVERY KEY THE RENDER ASKS FOR MUST EXIST. This assertion
     exists because a mutation SURVIVED without it: renaming `ariaGap` to
     `ariaGap2` leaves a per-locale object with good English sitting in
     the map, so a "shape of the strings" sweep passes — while the paint
     goes on calling `t('ariaGap')` and the shell renders THE KEY. #50
     shipped exactly that with 120k green model assertions behind it.
     ⚠ The converse — every AUTHORED key is reached — cannot be seen from
     source at all (a live t() call in a dead branch defeats it), and is
     `smoke-the-gap-locales.js`'s job with a Proxy over the strings. */
  {
    /* ⚠ READ THE CAPTURE GROUP, NEVER SLICE THE MATCH. The first version
       did `m.slice(4, -2)` on `t('test')` and reported that the render
       asks for `est` — a wrong measurement wearing the costume of a
       defect, in the very check written to catch wrong string keys. */
    const referenced = [];
    let mm;
    const reT = /\bt\('([a-zA-Z][\w]*)'\)/g;
    while ((mm = reT.exec(SOURCE)) !== null) referenced.push(mm[1]);
    const reMk = /_mk\([^)]*?'([a-zA-Z][\w]*)'\)/g;
    while ((mm = reMk.exec(SOURCE)) !== null) referenced.push(mm[1]);
    const uniq = Array.from(new Set(referenced));
    ok(uniq.length >= 12, 'L5 non-vacuity: only ' + uniq.length + ' string keys were found referenced in the source — the scan is not finding the call sites');
    uniq.forEach(function (k) {
      ok(Object.prototype.hasOwnProperty.call(T.strings, k),
        'L5 ⭐⭐ the render asks for `' + k + '` and NO SUCH STRING IS AUTHORED — the shell renders the KEY');
    });
    /* poison, both directions */
    ok(!Object.prototype.hasOwnProperty.call(T.strings, 'ariaGapNope'), 'L5 poison: the key-existence test cannot tell a missing key from a present one');
    ok(Object.prototype.hasOwnProperty.call(T.strings, 'ariaGap'), 'L5 poison: the key-existence test cannot find a key that is plainly there');
    ok(/\bt\('([a-zA-Z][\w]*)'\)/.test("this.api.t('ariaGap')"), 'L5 poison: the call-site scan failed to fire');
    ok(!/\bt\('([a-zA-Z][\w]*)'\)/.test('point(\'x\')'), 'L5 poison: the call-site scan matched a call that is not t()');
  }

  /* (h) the substitution actually happens, and an unsupplied token is
     left alone rather than printed as "undefined" */
  eq(T._fmt('it had {n} and now {m}, {z} unknown', { n: 5, m: 9 }),
    'it had 5 and now 9, {z} unknown', 'L5 _fmt does not substitute what it is given');
}

/* ================================================================== */
/* ⭐⭐ L6 — THE NON-LEAK, MEASURED OVER FOUR CHANNELS IN A REAL BROWSER.
   The tool's central claim is that during the gap the ground shows THAT
   something happened and WHICH DIRECTION, and NOTHING about how much. So
   for every legal scene, build the gap-phase fingerprint from
     (1) the DOM subtree,
     (2) the computed style of every drawn part,
     (3) the dark-phase duration, and
     (4) the aria label,
   and require: same sign -> byte-identical whatever the magnitude;
   different sign -> different. ⚠ Without the non-vacuity check first
   this compares empty strings and passes on a tool that draws nothing,
   and without the cross-sign check it passes on a tool whose ground says
   nothing at all. */
const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-gap.html';
  const fp = path.join(DIR, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
});

(async () => {
  let puppeteer = null;
  try { puppeteer = require('puppeteer'); } catch (e) { puppeteer = null; }
  ok(!!puppeteer, 'L6 ⚠⚠ puppeteer is not installed — the four-channel non-leak cannot be measured, and the model alone cannot see it');

  if (puppeteer) {
    await new Promise(r => srv.listen(PORT, r));
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const pageErrs = [];
    p.on('pageerror', e => pageErrs.push(String(e.message)));
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/the-gap.html?lang=en', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    eq(pageErrs.length, 0, 'L6 ⚠⚠ the tool threw on mount: ' + pageErrs.join(' | '));

    const scenes = [];
    [10, G.CAP].forEach(cap => T.scenes(cap).forEach(s => scenes.push({ n: s.n, k: s.k, m: s.m, cap: cap })));
    ok(scenes.length > 100, 'L6 non-vacuity: only ' + scenes.length + ' scenes to fingerprint');

    const res = await p.evaluate(function (list) {
      const T = window.TheGap;
      if (!T || typeof T._paint !== 'function') return { err: 'the tool is not on window, or has no paint' };
      const stage = document.querySelector('.crt-stage');
      const marksHost = document.querySelector('.crt-marks');
      const ground = document.querySelector('.crt-ground');
      const wave = document.querySelector('.crt-wave');
      if (!stage || !marksHost || !ground || !wave) return { err: 'a named part is missing from the DOM' };
      const PROPS = ['backgroundColor', 'color', 'opacity', 'visibility', 'display', 'borderRadius', 'height', 'width'];
      const styleOf = function (e) {
        const cs = getComputedStyle(e);
        return PROPS.map(function (k) { return k + ':' + cs[k]; }).join(';');
      };
      const out = [];
      for (let i = 0; i < list.length; i++) {
        const s = list[i];
        T.st = { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };
        /* ⚠⚠ INSTANT ONE — THE GAP HAS OPENED AND THE PULSE HAS NOT RUN.
           The runtime sets `_pulsed` beside `_wave.classList.add('is-on')`,
           so this is the real 380ms window at the head of every gap. The
           ground must announce NOTHING here, or a screen-reader user gets
           the evidence before the sighted class does. */
        T._pulsed = false;
        T._paint();
        const preGroundAria = ground.getAttribute('aria-label') || '';
        /* ⚠ the state the CHILD sees: the pulse is running. Statically the
           two directions differ only by a class name; it is the running
           animation that carries the evidence, so it is measured here.
           ⚠⚠ `_pulsed` IS SET FIRST — this comment claimed the pulse was
           running while the paint still saw it stopped, so the harness
           fingerprinted the pre-pulse state and called it the pulse. */
        T._pulsed = true;
        T._paint();
        wave.classList.add('is-on');
        const wcs = getComputedStyle(wave);
        out.push({
          n: s.n, k: s.k, cap: s.cap,
          marksInStage: marksHost.children.length,
          marksInDoc: document.querySelectorAll('.crt-mark').length,
          /* (1) the DOM subtree — AND the root's own attributes, because
             `innerHTML` cannot see them and a magnitude parked in a
             `data-` attribute on the stage would walk straight past a
             subtree-only channel */
          subtree: stage.innerHTML,
          rootAttrs: [].slice.call(stage.attributes).map(function (a) { return a.name + '=' + a.value; }).sort().join(';'),
          /* (2) the computed style of every drawn part */
          style: styleOf(stage) + ' || ' + styleOf(marksHost) + ' || ' + styleOf(ground) + ' || ' + styleOf(wave),
          /* (3) the dark-phase evidence: which animation, how long, how
                 many times, how wide — a FIXED amplitude, ONE iteration */
          motion: wcs.animationName + '|' + wcs.animationDuration + '|' +
            wcs.animationIterationCount + '|' + wcs.width + '|' + wcs.left,
          /* (4) the aria label, on both the stage and the ground */
          aria: (stage.getAttribute('aria-label') || '') + ' || ' + (ground.getAttribute('aria-label') || ''),
          /* (4b) what the ground said BEFORE the pulse ran */
          preAria: preGroundAria,
          /* everything else on the card during the gap */
          counts: (document.querySelector('.crt-counts') || {}).innerHTML || '',
          say: (document.querySelector('.crt-say') || {}).textContent || '',
          rail: (document.querySelector('.crt-rail') || {}).className || ''
        });
        wave.classList.remove('is-on');
      }
      return { out: out };
    }, scenes);

    if (res.err) {
      fails.push('L6 ⚠⚠ ' + res.err);
    } else {
      const recs = res.out;
      /* ---- NON-VACUITY FIRST -------------------------------------- */
      eq(recs.length, scenes.length, 'L6 non-vacuity: only ' + recs.length + ' of ' + scenes.length + ' scenes were fingerprinted');
      ok(recs.length > 100, 'L6 non-vacuity: the fingerprint set is too small to mean anything');
      ok(recs.every(r => r.subtree && r.subtree.length > 80),
        'L6 ⚠⚠ non-vacuity: THE EVIDENCE SUBTREE IS EMPTY — this comparison would pass on a tool that draws nothing at all');
      ok(recs.every(r => r.style && r.style.length > 100), 'L6 non-vacuity: the computed-style channel is empty');
      ok(recs.every(r => r.aria && r.aria.replace(/\s*\|\|\s*/, '').length > 20), 'L6 non-vacuity: the aria channel is empty');
      ok(recs.every(r => /crt-wave/.test(r.subtree) && /crt-ground/.test(r.subtree)), 'L6 non-vacuity: the ground and the pulse are not in the subtree');
      ok(recs.some(r => r.k > 0) && recs.some(r => r.k < 0), 'L6 non-vacuity: only one direction was fingerprinted');

      /* ---- ⚠⚠ NOTHING IS BUILT ------------------------------------ */
      let built = 0;
      recs.forEach(function (r) {
        if (r.marksInStage !== 0 || r.marksInDoc !== 0) {
          built++;
          fails.push('L6 ⚠⚠ ' + r.marksInDoc + ' MARKS ARE IN THE DOM DURING THE GAP at ' + r.n + '/' + r.k +
            ' — the non-leak is structural or it is nothing');
        }
      });
      pass += recs.length - built;
      ok(!/\{\w+\}/.test(recs[0].aria), 'L6 ⚠ a RAW TOKEN is rendering in the gap aria label: ' + recs[0].aria);
      /* ⭐⭐ THE ALIGNMENT INVARIANT. The direction is the evidence, and it
         may not reach one channel before the other. At gap-entry the
         sighted class sees a dark stage and no pulse, so the ground must
         say nothing to a screen reader either. This ran unmeasured for
         the first 380ms of every gap. */
      const leaked = recs.filter(function (r) { return r.preAria !== ''; });
      ok(leaked.length === 0, 'L6 ⚠⚠ the ground announced the DIRECTION at ' + leaked.length +
        ' scenes BEFORE the pulse ran — a screen-reader user gets the evidence ahead of the sighted class (e.g. ' +
        (leaked[0] ? JSON.stringify(leaked[0].preAria) : '') + ')');
      ok(recs.every(function (r) { return typeof r.preAria === 'string'; }),
        'L6 non-vacuity: the pre-pulse channel was never recorded, so the leak assertion above is empty');
      /* ⚠ AND NO RENDERED TEXT MAY BE A BARE STRING KEY — the second,
         independent channel on the #50 defect that L5(g) catches from
         source. Measured on the rendered DOM, so it survives a call site
         the regex cannot see. */
      Object.keys(T.strings).forEach(function (k) {
        ok(recs[0].aria.indexOf(' ' + k + ' ') < 0 && recs[0].aria.trim() !== k,
          'L6 ⚠⚠ the STRING KEY `' + k + '` is rendering as the gap announcement');
      });

      /* ---- ONE PULSE, FIXED AMPLITUDE, ONE ITERATION --------------- */
      recs.slice(0, 40).forEach(function (r) {
        const parts = r.motion.split('|');
        ok(parts[0] === 'crt-in' || parts[0] === 'crt-out', 'L6 the pulse runs no animation at ' + r.n + '/' + r.k + ' (' + parts[0] + ')');
        eq(parts[2], '1', 'L6 ⚠ the pulse does not run exactly ONE iteration at ' + r.n + '/' + r.k);
        ok(parseFloat(parts[1]) > 0.05, 'L6 the pulse has no duration at ' + r.n + '/' + r.k);
      });

      /* ---- ⭐⭐ THE FINGERPRINT ------------------------------------- */
      const groups = { '+': [], '-': [] };
      recs.forEach(function (r) {
        /* the magnitude is deliberately NOT in the key */
        const fp = [r.marksInDoc, r.subtree, r.rootAttrs, r.style, r.motion, r.aria, r.counts, r.say, r.rail].join('|~|');
        groups[r.k > 0 ? '+' : '-'].push({ fp: fp, r: r });
      });
      ok(groups['+'].length > 20 && groups['-'].length > 20,
        'L6 non-vacuity: the sign groups hold ' + groups['+'].length + '/' + groups['-'].length);

      ['+', '-'].forEach(function (sg) {
        const first = groups[sg][0];
        let same = 0;
        groups[sg].forEach(function (g) {
          if (g.fp === first.fp) { same++; return; }
          fails.push('L6 ⭐⭐ THE GROUND LEAKS THE MAGNITUDE: the gap looks different at ' +
            g.r.n + '/' + g.r.k + ' than at ' + first.r.n + '/' + first.r.k +
            ' (both ' + (sg === '+' ? 'came in' : 'went out') + ')');
        });
        pass += same;
        ok(same === groups[sg].length, 'L6 ⭐⭐ ' + (groups[sg].length - same) + ' of ' + groups[sg].length +
          ' "' + sg + '" scenes render a DIFFERENT gap — the magnitude is visible while it should not be');
      });

      /* ⭐⭐ AND THE TWO DIRECTIONS MUST DIFFER, or the ground says nothing
         and the child has no evidence at all. Without this the whole
         block passes on a tool with a blank gap. */
      ok(groups['+'][0].fp !== groups['-'][0].fp,
        'L6 ⭐⭐ THE GROUND SAYS NOTHING — coming in and going out render IDENTICALLY, so the gap carries no evidence whatsoever');
      /* and name WHICH channel carries it, so a silent collapse to one
         channel is visible */
      const A = groups['+'][0].r, B = groups['-'][0].r;
      const chan = { subtree: A.subtree !== B.subtree, style: A.style !== B.style, motion: A.motion !== B.motion, aria: A.aria !== B.aria };
      ok(chan.motion, 'L6 ⭐ the two directions run the SAME animation — the pulse does not carry the direction');
      ok(chan.aria, 'L6 ⚠ the two directions announce the SAME thing — a screen-reader user gets the gap and no evidence at all');
      console.log('  L6: ' + recs.length + ' scenes fingerprinted; direction carried by ' +
        Object.keys(chan).filter(k => chan[k]).join(' + ') + '; 0 marks in the DOM during the gap');
    }

    await p.close();
    await b.close();
    srv.close();
  }

  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures' +
    '  (' + HEADLINES + ' headline states)');
  if (fails.length) { fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
})();

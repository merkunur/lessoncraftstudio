/* =====================================================================
   MODEL GATE — TOOL #53, THE PAIR GATE
   =====================================================================
   ⚠⚠ THE ORACLE IS DERIVED FROM THE STATED RULE, NOT FROM THE CODE.
   #51 shipped five live model bugs under 16,626 assertions because the
   gate's oracle encoded the same misconception the tool did.
   ⚠⚠ AND EVERY STORED VALUE IS CHECKED AGAINST THE LAW THAT PRODUCED IT.
   #52 held four contradictory states under 908 assertions because the
   gate asked the law and never the store.

   THE RULE, in words: an archway admits exactly k abreast. A rank of k
   goes through; fewer than k NEVER does, and that refusal is the tool.
   What is left standing is total mod k. Two parades that each leave
   somebody standing put those leftovers on one plate — and the plate is
   a rank only when the two leftovers together make k.

   Run: node scripts/verify-pair-gate.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.PAIR_GATE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'pair-gate.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* the oracle, from the rule above */
const oStanding = (total, k) => total % k;
const oFullRanks = (total, k) => Math.floor(total / k);

/* L0 — constants, before anything uses them */
const NEEDED = ['CAP', 'MIN_N', 'MAX_N',
  'T_RANK', 'T_BAR', 'T_REFUSE', 'T_SILL', 'RM_F', 'RM_FLOOR',
  'SND_CALL', 'SND_THROUGH', 'SND_BAR', 'SND_SILL', 'SND_REFUSE', 'SND_DEBOUNCE'];
ok(NEEDED.length >= 13, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));

/* ================================================================== */
/* ⭐ L1 — THE WHOLE SPACE. Every width x every total, enumerated. */
{
  let seen = 0, refusedEarly = 0, cleared = 0, leftSome = 0;
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    for (let total = 1; total <= G.CAP; total++) {
      const base = T.newState(String(k), total);
      seen++;
      eq(base.k, k, 'L1 width did not take at k=' + k);
      eq(base.total, total, 'L1 total did not take at ' + total);
      eq(base.ranks, 0, 'L1 a new parade has already sent ranks');
      eq(base.pred, null, 'L1 a new parade ships with a prediction already made');

      /* ⭐⭐ THE BAR IS DOWN UNTIL THE CLASS COMMITS. This is the
         gate-CONDITION, and without it the tool is a cutscene. */
      ok(!T.barUp(base), 'L1 the bar is up before anybody predicted, at k=' + k + ' n=' + total);
      ok(T.sendRank(base) === null, 'L1 ⚠⚠ a rank went through with the bar DOWN at k=' + k + ' n=' + total);
      refusedEarly++;

      [true, false].forEach(function (guess) {
        let st = T.predict(base, guess);
        ok(st !== null, 'L1 predict(' + guess + ') refused');
        if (!st) return;
        ok(T.barUp(st), 'L1 the bar did not lift after a prediction');
        eq(st.pred, guess, 'L1 the prediction did not store');
        ok(T.predict(st, !guess) === null, 'L1 the class predicted twice');

        /* march it to a standstill */
        let n = 0;
        while (T.sendRank(st)) { st = T.sendRank(st); n++; ok(n <= G.CAP, 'L1 runaway march'); }
        eq(n, oFullRanks(total, k), 'L1 ranks sent at k=' + k + ' n=' + total);
        eq(T.through(st), n * k, 'L1 through disagrees with ranks x k');
        eq(T.waiting(st), total - n * k, 'L1 waiting disagrees');
        eq(T.standing(st), oStanding(total, k), 'L1 ⭐ standing at k=' + k + ' n=' + total);
        ok(T.done(st), 'L1 not done after marching to a standstill');
        /* ⚠ THE ARCHWAY REFUSES A PART-RANK, for ever, without ever
           calling the child wrong. */
        ok(T.sendRank(st) === null, 'L1 ⚠⚠ a part-rank went through at k=' + k + ' n=' + total);
        ok(T.sendRank(st) === null, 'L1 the refusal is not stable');
        /* the store agrees with the law */
        eq(T.through(st) + T.waiting(st), total, 'L1 through + waiting != total');
        eq(T.waiting(st), T.standing(st), 'L1 at a standstill, waiting IS what is standing');
        if (T.standing(st) === 0) cleared++; else leftSome++;

        /* ⚠ the width cannot change mid-parade: reflowing marchers who
           already went through as pairs into ranks of three is a lie
           about what happened. */
        if (n > 0) {
          const other = k === G.MIN_N ? G.MIN_N + 1 : G.MIN_N;
          ok(T.setWidth(st, other) === null, 'L1 ⚠ the width changed mid-parade at k=' + k);
        }
      });
    }
  }
  eq(seen, (G.MAX_N - G.MIN_N + 1) * G.CAP, 'L1 non-vacuity: parades walked');
  ok(refusedEarly > 0, 'L1 non-vacuity: no bar-down refusal exercised');
  ok(cleared > 0, 'L1 non-vacuity: no parade ever cleared');
  ok(leftSome > 0, 'L1 non-vacuity: no parade ever left somebody standing');
  console.log('  walked ' + seen + ' parades; ' + cleared + ' cleared, ' + leftSome + ' left somebody standing');
}

/* ================================================================== */
/* ⭐⭐ L2 — THE SILL IS HONEST. It is a rank ONLY when the two leftovers
   together make k — and at k=2 that is ALWAYS, which is exactly why
   odd + odd = even is special to two rather than merely typical. */
{
  let pairs = 0, full = 0, short_ = 0, byWidth = {};
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    byWidth[k] = { full: 0, short: 0 };
    for (let a = 1; a <= G.CAP; a++) {
      for (let b = 1; b <= G.CAP; b++) {
        if (a % k === 0 || b % k === 0) continue;      /* both must leave one */
        let st = T.newState(String(k), a);
        st = T.predict(st, false);
        while (T.sendRank(st)) st = T.sendRank(st);
        const sec = T.bringSecond(st, b);
        ok(sec !== null, 'L2 the second parade was refused at k=' + k + ' a=' + a + ' b=' + b);
        if (!sec) continue;
        eq(T.secondStanding(sec), oStanding(b, k), 'L2 second standing at k=' + k + ' b=' + b);
        const sill = T.toSill(sec);
        ok(sill !== null, 'L2 the sill refused two leftovers');
        if (!sill) continue;
        eq(sill.onSill, oStanding(a, k) + oStanding(b, k), 'L2 the sill holds the wrong number');
        /* the law, re-derived */
        const shouldFill = (oStanding(a, k) + oStanding(b, k)) % k === 0;
        eq(T.sillFull(sill), shouldFill, 'L2 ⭐ sillFull at k=' + k + ' a=' + a + ' b=' + b);
        if (shouldFill) { full++; byWidth[k].full++; } else { short_++; byWidth[k].short++; }
        ok(T.toSill(sill) === null, 'L2 the sill was loaded twice');
        pairs++;
      }
    }
  }
  ok(pairs >= 400, 'L2 non-vacuity: only ' + pairs + ' leftover pairs walked');
  ok(full > 0 && short_ > 0, 'L2 non-vacuity: full=' + full + ' short=' + short_);
  /* ⭐⭐ THE THEOREM, AS A COUNT: at two abreast every pair of leftovers
     fills, and at every wider archway some do not. That asymmetry is the
     tool's entire claim and it is asserted, not narrated. */
  eq(byWidth[2].short, 0, 'L2 ⭐⭐ at two abreast a pair of leftovers FAILED to fill — odd + odd = even is broken');
  ok(byWidth[2].full > 0, 'L2 non-vacuity: no two-abreast pair was tested');
  for (let k = 3; k <= G.MAX_N; k++) {
    ok(byWidth[k].short > 0,
      'L2 ⭐ at ' + k + ' abreast every pair filled — then two-abreast is not special and the tool has no thesis');
  }
  console.log('  sill: ' + pairs + ' leftover pairs; k=2 fills ' + byWidth[2].full + '/' + byWidth[2].full +
    ', wider archways leave ' + short_ + ' short');
}

/* L3 — the second parade is refused when it would not leave anybody */
{
  let refused = 0;
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    let st = T.predict(T.newState(String(k), k * 2 + 1), false);
    while (T.sendRank(st)) st = T.sendRank(st);
    ok(T.bringSecond(st, k * 3) === null, 'L3 ⚠ a second parade that leaves nobody was accepted at k=' + k);
    refused++;
    /* and a first parade that cleared cannot bring a second at all */
    let clean = T.predict(T.newState(String(k), k * 3), false);
    while (T.sendRank(clean)) clean = T.sendRank(clean);
    eq(T.standing(clean), 0, 'L3 setup: the clean parade left somebody');
    ok(T.bringSecond(clean, k + 1) === null, 'L3 ⚠ a second parade arrived with nobody standing at k=' + k);
    ok(T.toSill(clean) === null, 'L3 the sill loaded with nobody standing');
  }
  eq(refused, G.MAX_N - G.MIN_N + 1, 'L3 non-vacuity: widths exercised');
}

/* L4 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const declared = Object.keys(G);
  ok(declared.length >= 13, 'L4 non-vacuity: implausibly few constants');
  declared.forEach(function (k) {
    ok((body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length >= 1,
      'L4 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* ⚠ the sill beat must NOT pass through _dur(): a wait is not movement */
  ok(!/_dur\(\s*GEO\.T_SILL/.test(body), 'L4 ⚠⚠ T_SILL goes through _dur() — a wait is not movement');
}

/* L5 — strings are per-locale objects, and no part is named after
   another tool's part or after the answer */
{
  /* ⚠⚠ `gate` is the platform's PAYWALL key across 51 tools, and `pair`
     LITERALLY MEANS EVEN in French/Spanish/Portuguese/Italian — the
     product name would be the ANSWER. Neither may name a PART. `loner`
     measured free in all eleven and is forbidden anyway, because naming
     the left-behind one delivers the verdict the drawing removes. */
  const OWNED = ['loner', 'counter', 'leftover', 'runway', 'ghost', 'valley', 'stone', 'boulder'];
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  const all = Object.keys(T.strings);
  ok(all.length >= 30, 'L5 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L5 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0, 'L5 ⚠ `' + k + '` has no English');
  });
  all.filter(k => k !== 'title').forEach(function (k) {
    OWNED.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en), 'L5 ⚠ `' + k + '` uses "' + w + '", another tool\'s part or a banned label');
    });
  });
  ok(ban('loner').test('the loner waits'), 'L5 poison: the ban failed to fire');
  ok(!ban('counter').test('encounter'), 'L5 poison: the ban fired inside another word');
  eq(T.strings.title.en, 'The Pair Gate', 'L5 the product name is the operator\'s');
  /* ⭐ the honest-sill string must exist and must name the width */
  ok(!!T.strings.saidSillShort, 'L5 ⭐ there is no string for a sill that does NOT fill');
  ok(/\{k\}/.test(T.strings.saidSillShort.en), 'L5 the short-sill string does not name the archway width');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 25).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }

/* =====================================================================
   MODEL GATE — TOOL #53, THE PAIR GATE (rebuilt 2026-08-11)
   =====================================================================
   ⚠⚠ THE ORACLE IS DERIVED FROM THE STATED RULE, NOT FROM THE CODE.
   #51 shipped five live model bugs under 16,626 assertions because the
   gate's oracle encoded the same misconception the tool did.
   ⚠⚠ AND EVERY STORED VALUE IS CHECKED AGAINST THE LAW THAT PRODUCED IT.

   THE RULE, in words: the class CHOOSES a parade of 1..CAP and COMMITS
   a numeral 0..k-1 before the bar lifts. An archway admits exactly k
   abreast; a rank of k goes through; fewer than k NEVER does. What is
   left standing is total mod k. A second parade is CHOSEN — ANY size,
   multiples of k included (refusing them was the old rig that made the
   theorem unfalsifiable). If BOTH parades leave somebody, the sill may
   be committed and loaded; the plate is a rank only when the two
   leftovers together fill it exactly, and only a full plate passes.

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
  'T_RANK', 'T_BAR', 'T_REFUSE', 'T_SILL', 'T_THUD', 'T_RECOLOR', 'T_STEP2',
  'RM_F', 'RM_FLOOR',
  'SND_CALL', 'SND_THROUGH', 'SND_BAR', 'SND_SILL', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 16, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));
/* ⚠ the debounce is MILLISECONDS and must not wear a frequency name */
ok(G.SND_DEBOUNCE === undefined, 'L0 SND_DEBOUNCE is back under a frequency name — #58 named this file for it');
/* curriculum arithmetic, not taste: CCSS 2.OA.C.3 caps the parity
   repertoire at 20 in the standard's own text; an archway of one has
   no pairing content, and five is the widest a K-2 hand subitises */
eq(G.CAP, 20, 'L0 CAP is not the curriculum cap');
eq(G.MIN_N, 2, 'L0 MIN_N — an archway of one has no pairing content');
eq(G.MAX_N, 5, 'L0 MAX_N moved');
/* the tool ships free-tier and upgrades; never the reverse */
eq(T.premium, false, 'L0 ⚠⚠ the tool ships premium:true');

/* ================================================================== */
/* ⭐ L1 — THE WHOLE SPACE. Every width x every total x EVERY committable
   numeral, enumerated. The choose phase is a real state and is walked. */
{
  let seen = 0, refusedEarly = 0, cleared = 0, leftSome = 0, preds = 0;
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    /* the unassembled state: nothing moves, nothing commits */
    const empty = T.newState(String(k), 0);
    eq(empty.total, 0, 'L1 a fresh mount is not empty at k=' + k);
    ok(!T.done(empty), 'L1 ⚠ an empty road claims to be done at k=' + k);
    ok(T.predict(empty, 0) === null, 'L1 ⚠ a prediction committed with no parade at k=' + k);
    ok(T.sendRank(empty) === null, 'L1 ⚠ a rank went through an empty road at k=' + k);
    ok(T.setSecond(empty, 5) === null, 'L1 a second parade arrived before a first at k=' + k);

    for (let total = 1; total <= G.CAP; total++) {
      seen++;
      const chosen = T.setTotal(empty, total);
      ok(chosen !== null, 'L1 the strip refused a legal parade of ' + total);
      if (!chosen) continue;
      eq(chosen.k, k, 'L1 width did not take at k=' + k);
      eq(chosen.total, total, 'L1 total did not take at ' + total);
      eq(chosen.ranks, 0, 'L1 a new parade has already sent ranks');
      eq(chosen.pred, null, 'L1 a new parade ships with a prediction already made');

      /* ⭐ re-choosing is allowed until the class commits */
      const rechosen = T.setTotal(chosen, Math.max(1, total - 1));
      ok(rechosen !== null && rechosen.pred === null, 'L1 re-choosing before the commit was refused at ' + total);

      /* ⭐⭐ THE BAR IS DOWN UNTIL THE CLASS COMMITS. This is the
         gate-CONDITION, and without it the tool is a cutscene. */
      ok(!T.barUp(chosen), 'L1 the bar is up before anybody predicted, at k=' + k + ' n=' + total);
      ok(T.sendRank(chosen) === null, 'L1 ⚠⚠ a rank went through with the bar DOWN at k=' + k + ' n=' + total);
      refusedEarly++;

      /* ⚠ THE OLD BINARY SHAPE IS DEAD — a boolean must be refused */
      ok(T.predict(chosen, true) === null, 'L1 ⚠⚠ predict accepted a BOOLEAN at k=' + k);
      ok(T.predict(chosen, false) === null, 'L1 ⚠⚠ predict accepted a BOOLEAN at k=' + k);
      ok(T.predict(chosen, k) === null, 'L1 ⚠ predict accepted k — an impossible standing count');
      ok(T.predict(chosen, -1) === null, 'L1 predict accepted a negative');
      ok(T.predict(chosen, 0.5) === null, 'L1 predict accepted a fraction');

      for (let guess = 0; guess < k; guess++) {
        preds++;
        let st = T.predict(chosen, guess);
        ok(st !== null, 'L1 predict(' + guess + ') refused at k=' + k + ' n=' + total);
        if (!st) continue;
        ok(T.barUp(st), 'L1 the bar did not lift after a prediction');
        eq(st.pred, guess, 'L1 the prediction did not store the numeral');
        ok(T.predict(st, (guess + 1) % k) === null, 'L1 the class predicted twice');
        /* ⭐ a committed parade can never be resized — structurally */
        ok(T.setTotal(st, 5) === null, 'L1 ⚠⚠ a committed parade was RESIZED at k=' + k + ' n=' + total);

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
        eq(T.yardCount(st), n * k, 'L1 yardCount disagrees before any sill');
        if (T.standing(st) === 0) cleared++; else leftSome++;
      }
    }
  }
  eq(seen, (G.MAX_N - G.MIN_N + 1) * G.CAP, 'L1 non-vacuity: parades walked');
  ok(refusedEarly > 0, 'L1 non-vacuity: no bar-down refusal exercised');
  ok(cleared > 0, 'L1 non-vacuity: no parade ever cleared');
  ok(leftSome > 0, 'L1 non-vacuity: no parade ever left somebody standing');
  ok(preds >= 2 * (G.MAX_N - G.MIN_N + 1) * G.CAP, 'L1 non-vacuity: too few commitments walked');
  console.log('  walked ' + seen + ' parades x every numeral (' + preds + ' commitments); '
    + cleared + ' cleared, ' + leftSome + ' left somebody standing');
}

/* ================================================================== */
/* ⭐⭐ L2 — THE THEOREM IS HONEST. The second parade may be ANY size —
   the old tool nudged multiples of k away, which made odd+odd=even
   unfalsifiable. Now: a fizzling second parade (b mod k = 0) leaves
   nothing to combine and the sill refuses; both-leftover pairs load
   the plate, and the plate is a rank ONLY when they fill it exactly.
   At k=2 that is ALWAYS — which is exactly why two is special. */
{
  let pairs = 0, full = 0, short_ = 0, fizzles = 0, evensAccepted = 0;
  const byWidth = {};
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    byWidth[k] = { full: 0, short: 0 };
    for (let a = 1; a <= G.CAP; a++) {
      if (a % k === 0) continue;                       /* the first must leave one */
      for (let b = 1; b <= G.CAP; b++) {
        let st = T.setTotal(T.newState(String(k), 0), a);
        st = T.predict(st, a % k);
        while (T.sendRank(st)) st = T.sendRank(st);

        /* ⭐⭐ ANY second parade is choosable — evens included */
        let sec = T.setSecond(st, b);
        ok(sec !== null, 'L2 ⚠⚠ the second parade was refused at k=' + k + ' a=' + a + ' b=' + b
          + (b % k === 0 ? ' — the RIG is back (multiples of k dimmed away)' : ''));
        if (!sec) continue;
        if (b % k === 0) evensAccepted++;
        /* re-choosable until its own commit; locked after */
        ok(T.setSecond(sec, Math.max(1, b - 1)) !== null, 'L2 re-choosing the second parade was refused');
        sec = T.predict2(sec, b % k === 0 ? 0 : b % k);
        ok(sec !== null, 'L2 predict2 refused at k=' + k + ' b=' + b);
        if (!sec) continue;
        ok(T.setSecond(sec, 3) === null, 'L2 ⚠ a committed second parade was re-chosen');
        while (T.sendRank2(sec)) sec = T.sendRank2(sec);
        eq(T.standing2(sec), oStanding(b, k), 'L2 second standing at k=' + k + ' b=' + b);
        ok(T.done2(sec), 'L2 the second parade never reached a standstill');
        ok(T.sendRank2(sec) === null, 'L2 a part-rank of the second parade went through');

        if (b % k === 0) {
          /* ⭐ THE FIZZLE — nothing to combine, and the tool says so */
          fizzles++;
          ok(T.predictSill(sec, 0) === null, 'L2 ⚠⚠ the sill took a commit after a fizzle at k=' + k + ' b=' + b);
          ok(T.toSill(sec) === null, 'L2 ⚠⚠ the sill loaded after a fizzle at k=' + k + ' b=' + b);
          continue;
        }

        const ab = oStanding(a, k) + oStanding(b, k);
        /* the sill commit accepts exactly the two honest claims */
        ok(T.predictSill(sec, 1e9) === null, 'L2 the sill commit accepted a nonsense numeral');
        if (ab !== 0) ok(T.predictSill(sec, ab) !== null, 'L2 the sill commit refused the stay-claim');
        let sillSt = T.predictSill(sec, 0);
        ok(sillSt !== null, 'L2 the sill commit refused the pass-claim at k=' + k + ' a=' + a + ' b=' + b);
        if (!sillSt) continue;
        ok(T.toSill(sec) === null, 'L2 ⚠⚠ the sill loaded WITHOUT its commit — the commit grammar is broken');
        const sill = T.toSill(sillSt);
        ok(sill !== null, 'L2 the sill refused two leftovers');
        if (!sill) continue;
        eq(sill.onSill, ab, 'L2 the sill holds the wrong number');
        /* the law, re-derived */
        const shouldFill = ab % k === 0;
        eq(T.sillFull(sill), shouldFill, 'L2 ⭐ sillFull at k=' + k + ' a=' + a + ' b=' + b);
        ok(T.toSill(sill) === null, 'L2 the sill was loaded twice');
        if (shouldFill) {
          full++; byWidth[k].full++;
          const gone = T.sillThrough(sill);
          ok(gone !== null, 'L2 a FULL plate was refused passage');
          if (gone) {
            ok(gone.sillGone && gone.onSill === 0, 'L2 the plate passed but the state disagrees');
            eq(T.yardCount(gone), a + b, 'L2 ⭐ after the sill passes, everybody is through');
            ok(T.sillThrough(gone) === null, 'L2 the plate passed twice');
            ok(T.toSill(gone) === null, 'L2 the sill reloaded after passing');
          }
        } else {
          short_++; byWidth[k].short++;
          ok(T.sillThrough(sill) === null, 'L2 ⚠⚠ a SHORT plate went through at k=' + k + ' a=' + a + ' b=' + b);
        }
        pairs++;
      }
    }
  }
  ok(pairs >= 400, 'L2 non-vacuity: only ' + pairs + ' leftover pairs walked');
  ok(fizzles > 0, 'L2 non-vacuity: the fizzle case was never walked');
  ok(evensAccepted > 0, 'L2 ⚠⚠ no even second parade was ever accepted — the theorem is rigged again');
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
  console.log('  sill: ' + pairs + ' leftover pairs (' + fizzles + ' honest fizzles, '
    + evensAccepted + ' even second parades accepted); k=2 fills ' + byWidth[2].full
    + '/' + byWidth[2].full + ', wider archways leave ' + short_ + ' short');
}

/* ================================================================== */
/* L3 — THE REFUSAL LATTICE. Every move, in every phase it must refuse. */
{
  for (let k = G.MIN_N; k <= G.MAX_N; k++) {
    /* a cleared first parade arms nothing downstream */
    let clean = T.predict(T.setTotal(T.newState(String(k), 0), k * 3), 0);
    while (T.sendRank(clean)) clean = T.sendRank(clean);
    eq(T.standing(clean), 0, 'L3 setup: the clean parade left somebody');
    ok(T.setSecond(clean, k + 1) === null, 'L3 ⚠ a second parade arrived with nobody standing at k=' + k);
    ok(T.toSill(clean) === null, 'L3 the sill loaded with nobody standing');
    ok(T.predictSill(clean, 0) === null, 'L3 the sill commit took with nobody standing');

    /* mid-march, the second parade may not arrive */
    let mid = T.predict(T.setTotal(T.newState(String(k), 0), k * 2 + 1), 1);
    ok(T.setSecond(mid, 5) === null, 'L3 ⚠ a second parade arrived MID-MARCH at k=' + k);
    ok(T.predict2(mid, 0) === null, 'L3 predict2 took with no second parade');
    ok(T.sendRank2(mid) === null, 'L3 a second rank marched with no second parade');

    /* out-of-range parade sizes are refused, never clamped */
    ok(T.setTotal(T.newState(String(k), 0), 0) === null, 'L3 a parade of zero was accepted');
    ok(T.setTotal(T.newState(String(k), 0), G.CAP + 1) === null, 'L3 a parade above CAP was accepted');
    ok(T.setTotal(T.newState(String(k), 0), 2.5) === null, 'L3 a fractional parade was accepted');
  }
}

/* L4 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const declared = Object.keys(G);
  ok(declared.length >= 16, 'L4 non-vacuity: implausibly few constants');
  declared.forEach(function (k) {
    ok((body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length >= 1,
      'L4 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* ⚠ the sill beat must NOT pass through _dur(): a wait is not movement */
  ok(!/_dur\(\s*GEO\.T_SILL/.test(body), 'L4 ⚠⚠ T_SILL goes through _dur() — a wait is not movement');
}

/* ================================================================== */
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
  ok(all.length >= 40, 'L5 non-vacuity: implausibly few strings (' + all.length + ')');
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
  /* the retired keys must be GONE, not fossilised */
  ok(T.strings.predNo === undefined, 'L5 ⚠ predNo is back — the binary prediction is retired');
  ok(T.strings.saidPredNo === undefined, 'L5 ⚠ saidPredNo is back — the binary prediction is retired');
  /* the redesign's own keys exist */
  ['sizeAsk', 'sizeChip', 'predAsk', 'predChip', 'saidParade', 'saidPredN', 'saidPred2',
    'saidPredSill', 'saidSecondClear', 'saidMarchOn', 'saidSecondHere', 'saidChooseFirst',
    'printAsk'].forEach(function (k) {
    ok(!!T.strings[k], 'L5 ⚠ the redesign key `' + k + '` is missing');
  });
  /* ⭐ the honest-sill string must exist and must name the width */
  ok(!!T.strings.saidSillShort, 'L5 ⭐ there is no string for a sill that does NOT fill');
  /* ⚠⚠ AND THE SHORT-SILL STRING MUST NOT CLAIM WIDER ARCHWAYS NEVER
     FILL — refuted in 237 reachable states by a native panel. */
  ok(!/only ever/i.test(T.strings.saidSillShort.en),
    'L5 ⚠⚠ the short-sill string claims wider archways NEVER fill — refuted in 237 reachable states');
  ok(/sometimes/i.test(T.strings.saidSillShort.en),
    'L5 the short-sill string does not say that wider archways fill SOMETIMES');
  ok(/\{k\}/.test(T.strings.saidSillShort.en), 'L5 the short-sill string does not name the archway width');
  /* ⚠⚠ the dead API stays dead */
  ok(T.setWidth === undefined, 'L5 setWidth is back — it had zero call sites and announced an invariant it never enforced');
  ok(T.bringSecond === undefined, 'L5 ⚠⚠ bringSecond is back — it refused multiples of k, which RIGGED the theorem');
  ok(T.secondStanding === undefined, 'L5 secondStanding is back — standing2 is the living name');
  /* a free-play manipulative: a tasks array would summon activity chrome */
  ok(T.tasks === undefined && T.nextTask === undefined, 'L5 ⚠ a tasks/nextTask surface appeared — the shell would render activity chrome');

  /* ⭐ TOKEN CONTRACTS — every placeholder a consumer supplies must be
     present, or the render ships a half-sentence. The consumer set is
     read off the handlers, not invented here. */
  const TOKENS = {
    sizeChip: ['{n}'], predChip: ['{s}'],
    saidParade: ['{n}'], saidPredN: ['{s}'], saidPred2: ['{s}'],
    saidRank: ['{n}', '{w}'], saidClear: ['{n}', '{r}', '{k}'],
    saidStand: ['{s}', '{n}', '{k}'], saidSecond: ['{n}', '{s}'],
    saidSecondClear: ['{n}'], saidSill: ['{a}', '{b}'],
    saidSillShort: ['{a}', '{b}', '{c}', '{k}'],
    ariaWaiting: ['{n}'], ariaThrough: ['{n}', '{r}'], ariaStand: ['{n}', '{e}']
  };
  Object.keys(TOKENS).forEach(function (k) {
    TOKENS[k].forEach(function (tok) {
      ok(T.strings[k] && T.strings[k].en.indexOf(tok) >= 0,
        'L5 ⚠ `' + k + '` lost its ' + tok + ' token — the paint supplies it and the sentence needs it');
    });
  });

  /* ⭐ THE REFUSE-LIST: no judging, no scoring, no clocks, no efficacy
     claims — anywhere, in any string. Poisoned both directions. */
  const REFUSE = ['correct', 'wrong', 'score', 'points', 'timer', 'clock', 'countdown', 'proven', 'streak'];
  all.forEach(function (k) {
    REFUSE.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en), 'L5 ⚠⚠ `' + k + '` carries the refuse-list word "' + w + '"');
    });
  });
  ok(ban('correct').test('That is correct.'), 'L5 poison: the refuse-list ban failed to fire');
  ok(!ban('point').test('pointing at the seat'), 'L5 poison: the refuse-list ban fired inside another word');
}

/* ================================================================== */
/* L6 — THE EMISSION, NOT THE PROSE. Source-level laws that the render
   depends on; each is a mutation target in mutate-pair-gate.js. */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  /* the FULL scroll escape — the two-line short form was a measured bug
     (a control row at y=558 in a 568px window, unreachable) */
  ok(/html\.pgt-scroll\{overflow-y:auto;height:auto;min-height:100%;?\}/.test(src),
    'L6 ⚠⚠ the html half of the scroll escape lost its height declarations');
  ok(/body\.pgt-scroll\{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;?\}/.test(src),
    'L6 ⚠⚠ the body half of the scroll escape is not the full form');
  /* no vh inside a manipulative — the iframe grows to content */
  ok(!/[0-9.]vh\b/.test(src), 'L6 ⚠⚠ a vh unit entered the manipulative');
  /* the print block is ONE emitted fragment — the deploy gate greps
     for the literal, and a split would fail the build */
  ok(/['"`]@media print\s*\{/.test(src), 'L6 ⚠⚠ the emitted @media print{ literal is gone or split');
  /* the sheet is a SIBLING of the wrap — a hidden parent measures 0mm */
  ok(/api\.stage\.appendChild\(this\._sheet\)/.test(src), 'L6 ⚠⚠ the print sheet is not a sibling of the wrap');
  /* Ctrl+P must not hand the paid sheet to a non-subscriber */
  ok(/beforeprint[\s\S]{0,160}?premium/.test(src), 'L6 ⚠⚠ the beforeprint path lost its entitlement check');
  ok(/_print:[\s\S]{0,120}?premium[\s\S]{0,60}?_gate/.test(src), 'L6 ⚠⚠ the print chip lost its entitlement gate');
  /* the entitlement fetch degrades to the FREE tier, never to nothing */
  ok(/\['catch'\]\(function \(\) \{\}\)/.test(src), 'L6 the entitlement fetch lost its catch path');
  /* the liveness gate derives the tool prefix from this literal */
  ok(src.indexOf("api.el('div', 'pgt-wrap')") >= 0, 'L6 ⚠⚠ the pgt-wrap literal changed — the liveness gate goes blind');
  /* the scroll classes are ADDED, not just declared */
  ok(src.indexOf("document.documentElement.classList.add('pgt-scroll')") >= 0,
    'L6 ⚠ the html scroll class is never added');
  ok(src.indexOf("document.body.classList.add('pgt-scroll')") >= 0,
    'L6 ⚠ the body scroll class is never added');
  /* ⭐ persistent-node law: the fly engine moves REAL nodes; a clone
     teleports the original out of existence */
  ok(!/cloneNode/.test(src), 'L6 ⚠⚠ the fly engine clones — the persistent-node law is broken');
  /* ⭐ one interpolator: exactly one rAF chain (the seed call and the
     loop re-arm). A second animator makes cause-and-effect between two
     objects instead of one object changing. */
  eq((src.match(/requestAnimationFrame/g) || []).length, 2,
    'L6 ⚠ the one-interpolator law: unexpected rAF call sites');
  /* a lifted boom stays solid — the .25 fade deleted the truth that it
     comes back down */
  const upRule = src.match(/\.pgt-bar\.is-up\{[^}]*\}/);
  ok(!!upRule && upRule[0].indexOf('opacity') < 0, 'L6 ⚠ the lifted boom fades again — a boom that fades has stopped being a boom');
  /* the empty seat is the even-dash data-URI (drawn in the seatURI
     builder), not a CSS border dash. ⚠ Measure the emission where it
     lives: the dash law is inside seatURI, the seat rule consumes it. */
  ok(/function seatURI[\s\S]{0,400}?stroke-dasharray/.test(src),
    'L6 the seat builder lost its even-dash drawing');
  ok(/function seatURI[\s\S]{0,400}?stroke-linecap/.test(src),
    'L6 the seat builder lost its round dash caps');
  ok(/\.pgt-seat\{[^}]*seatURI\(/.test(src) || /\.pgt-seat\{[^}]*background:' \+ seatURI/.test(src) ||
     src.indexOf(".pgt-seat{width:var(--pgt-m);height:var(--pgt-m);flex:none;'\n      + 'background:") >= 0 ||
     /pgt-seat\{[\s\S]{0,200}?seatURI/.test(src),
    'L6 the seat rule does not consume the seatURI drawing');
  ok(!/\.pgt-seat\{[^}]*border:2px dashed/.test(src),
    'L6 the empty seat regressed to the uneven CSS border dash');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 25).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }

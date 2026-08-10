/* =====================================================================
   MODEL GATE — TOOL #55, THE MISSING QUESTION
   =====================================================================
   ⚠⚠ THE ORACLE IS RE-DERIVED FROM THE STATED LAW, NOT READ OFF THE
   CODE. #51 shipped five live model bugs under 16,626 assertions because
   the oracle carried the same misconceptions the code did, and #44
   shipped a mirrored profile because both sides of the comparison used
   the same index convention and agreed perfectly.

   So the ambiguity predicate here is NOT a restatement of the tool's five
   clauses. It is derived from what the tool exists to do:

     A frame worth showing is one where the DIFFERENT QUESTIONS the class
     can ask have DIFFERENT ANSWERS.

   The four answers available from a frame (a, b, c) with a = b + c are
   the total a, the part that stayed b, the part that left c, and the
   difference |b - c|. Require those to be pairwise distinct and non-
   vacuous, and the algebra falls out on its own:

     b > 0, c > 0                     no question may be vacuous
     b != c                           "how many stayed" != "how many left"
     b > c:  b - c != c   =>  b != 2c
     c > b:  c - b != b   =>  c != 2b

   a is automatically distinct from all three, since a = b + c > max(b,c)
   for positive parts. That reproduces the shipped clause set WITHOUT
   copying it, which is the only version of this check worth running.

   ⭐⭐ L2b WALKS ONLY WHAT THE BUTTONS CAN REACH. #54's headline branch
   shipped UNREACHABLE under a 626-assertion gate that called the model
   directly. Every state in L2b is produced by shut(), showTally() and
   deal() alone — the four moves a control invokes and nothing else.

   Run: node scripts/verify-missing-question.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'missing-question.js');
const T = require(SRC);
const SOURCE = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* ================================================================== */
/* L0 — THE CONSTANTS EXIST AND ARE REACHABLE FROM A GATE.
   ⚠ Every sibling exposes `GEO: GEO` (doubling-mirror.js:679). Without
   it a model gate cannot read the numbers it is supposed to check, so
   its absence is itself an assertion, not a harness inconvenience. */
ok(T && typeof T === 'object', 'L0 the tool did not export an object');
ok(T.GEO && typeof T.GEO === 'object',
  'L0 ⚠⚠ the tool does not export GEO — a model gate cannot read the constants it must check (every sibling ships `GEO: GEO`)');
const G = T.GEO || parseGeoFromSource();

function parseGeoFromSource() {
  /* fallback so the remaining ~700 assertions still run and report */
  const m = SOURCE.match(/var GEO = \{([\s\S]*?)\n  \};/);
  if (!m) return {};
  const body = m[1].replace(/\/\*[\s\S]*?\*\//g, '');
  try { return eval('({' + body + '})'); } catch (e) { return {}; }
}

const NEEDED = ['CAP', 'FLOOR', 'T_REFUSE', 'RM_F', 'RM_FLOOR',
  'SND_DEAL', 'SND_SHUT', 'SND_OPEN', 'SND_TALLY', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 10, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing or not a number'));
ok(typeof T.legal === 'function' && typeof T.framesFor === 'function' &&
  typeof T.consistent === 'function' && typeof T.showTally === 'function' &&
  typeof T.shut === 'function' && typeof T.newState === 'function' && typeof T.deal === 'function',
  'L0 the model surface is incomplete');
ok(!T.tasks, 'L0 the tool declares `tasks` — free-play instruments must not, or the shell renders activity chrome and an alignment collision becomes possible');
eq(T.id, 'missing-question', 'L0 the tool id does not match its filename');
eq(T.premium, false, 'L0 ⚠ the apparatus itself is not free');

/* ================================================================== */
/* ⭐⭐ L1 — THE AMBIGUITY PREDICATE, RE-DERIVED.
   The oracle below never mentions "2b" or "2c". It builds the set of
   answers the frame can give and demands they be distinct. */
{
  /* ORACLE: independent, from the law in words */
  const oracle = (b, c) => {
    if (typeof b !== 'number' || typeof c !== 'number') return false;
    if (!isFinite(b) || !isFinite(c)) return false;
    if (b !== Math.round(b) || c !== Math.round(c)) return false;
    if (b <= 0 || c <= 0) return false;             /* no vacuous question */
    const a = b + c;
    const answers = [a, b, c, Math.abs(b - c)];
    for (let i = 0; i < answers.length; i++) {
      for (let j = i + 1; j < answers.length; j++) {
        if (answers[i] === answers[j]) return false; /* two questions, one answer */
      }
    }
    return true;
  };

  /* poison the ORACLE in both directions before it is trusted */
  ok(oracle(1, 3) === true, 'L1 poison: the oracle rejected a frame that is plainly ambiguous (1,3)');
  ok(oracle(2, 2) === false, 'L1 poison: the oracle accepted (2,2), where every answer is 2');
  ok(oracle(2, 4) === false, 'L1 poison: the oracle accepted (2,4), where the difference equals a part');
  ok(oracle(0, 5) === false, 'L1 poison: the oracle accepted a vacuous part');

  let checked = 0, agreed = 0, accepted = 0;
  for (let b = -3; b <= 22; b++) {
    for (let c = -3; c <= 22; c++) {
      checked++;
      const want = oracle(b, c), got = !!T.legal(b, c);
      if (want === got) agreed++;
      else fails.push('L1 ⭐ legal(' + b + ',' + c + ') = ' + got + ', the derived law says ' + want);
      if (want) accepted++;
    }
  }
  pass += agreed;
  ok(checked === 26 * 26, 'L1 non-vacuity: the (b,c) sweep did not cover the grid it claims');
  ok(accepted > 100, 'L1 non-vacuity: the oracle accepted only ' + accepted + ' frames — it is refusing everything');
  ok(accepted < checked, 'L1 non-vacuity: the oracle accepted everything — it is not a predicate');

  /* non-integers and non-numbers must be refused, not coerced */
  ok(T.legal(1.5, 2.5) === false, 'L1 a fractional frame was accepted');
  ok(T.legal(2, 3.0000001) === false, 'L1 a nearly-integer frame was accepted');

  /* ⭐⭐ THE FRAME A NAIVE GENERATOR EMITS MOST OFTEN, REFUSED BY NAME.
     (4,2,2) gives "how many stayed", "how many left" and the difference
     all the answer 2 — a tool that looks like it works and teaches
     nothing. */
  ok(T.legal(2, 2) === false,
    'L1 ⭐⭐ (4,2,2) IS LEGAL — the frame a naive generator emits most often, where every question has the answer 2');
  ok(T.framesFor(4).every(f => !(f.b === 2 && f.c === 2)),
    'L1 ⭐⭐ (4,2,2) appears in framesFor(4)');
  const allFrames = [];
  for (let a = G.FLOOR; a <= G.CAP; a++) allFrames.push.apply(allFrames, T.framesFor(a));
  ok(allFrames.length > 0, 'L1 non-vacuity: no frames at all between FLOOR and CAP');
  ok(allFrames.every(f => !(f.b === 2 && f.c === 2)), 'L1 ⭐⭐ (4,2,2) is reachable somewhere in the deal pool');

  /* ⭐ a=3 ADMITS ZERO FRAMES, SO THE FLOOR CANNOT BE 3. */
  eq(T.framesFor(3).length, 0, 'L1 ⭐ a=3 admits a frame — (1,2) and (2,1) are both a part and its double');
  ok(G.FLOOR >= 4, 'L1 ⭐ GEO.FLOOR is ' + G.FLOOR + ', but a=3 admits ZERO frames — the deal can be asked for one');
  /* and derive the floor rather than trusting the constant: the smallest
     a with at least one legal frame */
  let smallest = null;
  for (let a = 1; a <= G.CAP && smallest === null; a++) if (T.framesFor(a).length > 0) smallest = a;
  eq(G.FLOOR, smallest, 'L1 ⭐ GEO.FLOOR does not equal the smallest total that admits any frame');

  /* the count claimed in the docblock, recomputed from the ORACLE */
  let legalCount = 0, total = 0;
  for (let a = 3; a <= 16; a++) for (let b = 1; b < a; b++) { total++; if (oracle(b, a - b)) legalCount++; }
  eq(total, 119, 'L1 the (a=3..16) pair space is not 119');
  eq(legalCount, 102, 'L1 the derived legal count over a=3..16 is not 102');
  let toolCount = 0;
  for (let a = 3; a <= 16; a++) toolCount += T.framesFor(a).length;
  eq(toolCount, legalCount, 'L1 framesFor disagrees with the derived law on the total count');

  /* framesFor: every entry legal, sums right, ordered, and complete */
  let walked = 0;
  for (let a = 0; a <= G.CAP + 4; a++) {
    const fr = T.framesFor(a);
    walked++;
    fr.forEach(f => {
      ok(f.a === a, 'L1 framesFor(' + a + ') returned a frame with a=' + f.a);
      ok(f.b + f.c === a, 'L1 framesFor(' + a + ') returned parts that do not sum to a');
      ok(oracle(f.b, f.c), 'L1 framesFor(' + a + ') returned an AMBIGUOUS-FAILING frame ' + f.b + '/' + f.c);
    });
    for (let b = 1; b < a; b++) {
      const want = oracle(b, a - b);
      const got = fr.some(f => f.b === b);
      eq(got, want, 'L1 framesFor(' + a + ') ' + (want ? 'omitted' : 'included') + ' b=' + b);
    }
  }
  ok(walked === G.CAP + 5, 'L1 non-vacuity: framesFor sweep');
  eq(T.framesFor(6).length, 2, 'L1 a=6 does not admit exactly two frames');

  /* ⭐ THE ORDER IS PART OF THE CONTRACT, and this assertion exists
     because a mutation SURVIVED without it. `newState(range, pick)`
     indexes the pool, so reversing the labels inside framesFor produces
     the identical SET (the predicate is symmetric in b and c) while
     silently remapping every pick. A set-only check cannot see that. */
  let ordered = 0;
  for (let a = G.FLOOR; a <= G.CAP; a++) {
    const bs = T.framesFor(a).map(f => f.b);
    for (let i = 1; i < bs.length; i++) {
      ok(bs[i] > bs[i - 1], 'L1 ⭐ framesFor(' + a + ') is not in ascending b — the pick index is not stable');
      ordered++;
    }
  }
  ok(ordered > 50, 'L1 non-vacuity: only ' + ordered + ' order comparisons');
  /* poison, both directions */
  ok([1, 2, 3].every((v, i, A) => i === 0 || v > A[i - 1]), 'L1 poison: the order test failed on an ascending list');
  ok(![1, 3, 2].every((v, i, A) => i === 0 || v > A[i - 1]), 'L1 poison: the order test passed a shuffled list');
  console.log('  ' + legalCount + ' legal of ' + total + ' over a=3..16; ' +
    allFrames.length + ' frames in the deal pool up to ' + G.CAP);
}

/* ================================================================== */
/* L1b — newState / deal NEVER produce an illegal or under-floor frame,
   for EVERY pick, at BOTH caps. */
{
  let dealt = 0, caps = 0;
  ['ten', 'sixteen'].forEach(function (range) {
    const cap = T.cap(range);
    caps++;
    ok(cap === (range === 'sixteen' ? G.CAP : 10), 'L1b cap(' + range + ') = ' + cap);
    let pool = 0;
    for (let a = G.FLOOR; a <= cap; a++) pool += T.framesFor(a).length;
    ok(pool > 0, 'L1b non-vacuity: the ' + range + ' pool is empty');
    for (let pick = 0; pick < pool + 3; pick++) {
      const s = T.newState(range, pick);
      dealt++;
      ok(s && typeof s === 'object', 'L1b newState returned nothing at pick ' + pick);
      if (!s) continue;
      eq(s.b + s.c, s.a, 'L1b the dealt parts do not sum to the total at pick ' + pick);
      ok(T.legal(s.b, s.c), 'L1b ⭐ the deal produced an ILLEGAL frame ' + s.a + ':' + s.b + '/' + s.c);
      ok(s.a >= G.FLOOR, 'L1b the deal produced a=' + s.a + ', under the floor');
      ok(s.a <= cap, 'L1b the deal produced a=' + s.a + ', over the ' + range + ' cap');
      eq(s.ledge, false, 'L1b a fresh frame arrives with a shutter already down');
      eq(s.air, false, 'L1b a fresh frame arrives with a shutter already down');
      eq(s.tally, false, 'L1b a fresh frame arrives with the tally showing');
    }
    /* every frame in the pool must be dealable — pick is the whole space */
    const seen = {};
    for (let pick = 0; pick < pool; pick++) { const s = T.newState(range, pick); seen[s.a + ':' + s.b] = 1; }
    eq(Object.keys(seen).length, pool, 'L1b the pick space does not cover the ' + range + ' pool');
    /* and deal() is newState (the control's own entry point) */
    for (let pick = 0; pick < 7; pick++) {
      const d = T.deal(null, range, pick), n = T.newState(range, pick);
      eq(d.a + ':' + d.b + '/' + d.c, n.a + ':' + n.b + '/' + n.c, 'L1b deal() and newState() disagree at pick ' + pick);
    }
  });
  eq(caps, 2, 'L1b non-vacuity: both caps walked');
  ok(dealt > 60, 'L1b non-vacuity: only ' + dealt + ' deals walked');

  /* ⭐⭐ THE SETTING MUST HAVE A CONSEQUENCE. #39 shipped a numeral strip
     whose only effect in 1067 lines was its own highlight, and the
     shared liveness gate scored it 84/84 because the DOM changed. A
     choice between two ranges that deal from the same pool is that
     defect in a settings drawer. */
  const poolOf = r => { let n = 0; for (let a = G.FLOOR; a <= T.cap(r); a++) n += T.framesFor(a).length; return n; };
  ok(T.cap('sixteen') > T.cap('ten'), 'L1b ⭐⭐ the two range settings serve the SAME cap — the setting has no consequence');
  ok(poolOf('sixteen') > poolOf('ten'),
    'L1b ⭐⭐ the two range settings deal from pools of the same size — the setting has no consequence');
  /* and the smaller pool must be a strict PREFIX of the larger, or the
     "up to ten" promise is not what it says */
  for (let pick = 0; pick < poolOf('ten'); pick++) {
    const s = T.newState('ten', pick), b = T.newState('sixteen', pick);
    eq(s.a + ':' + s.b, b.a + ':' + b.b, 'L1b the ten pool is not a prefix of the sixteen pool at pick ' + pick);
    ok(s.a <= 10, 'L1b the "up to ten" setting dealt a=' + s.a);
  }
  ok(T.framesFor(G.CAP).length > 0, 'L1b the cap itself admits no frame');
}

/* ================================================================== */
/* ⭐⭐ L2 — THE ENUMERATION. Derived from what is VISIBLE, never from the
   frame the tool happens to be holding. */
{
  let none = 0, one = 0, many = 0;
  for (let a = G.FLOOR; a <= G.CAP; a++) {
    T.framesFor(a).forEach(function (f) {
      const base = { a: f.a, b: f.b, c: f.c, ledge: false, air: false, tally: false };

      /* 0 shutters — nothing is hidden, so nothing is enumerated */
      const z = T.consistent(base);
      ok(Array.isArray(z), 'L2 consistent did not return an array');
      eq(z.length, 0, 'L2 ⚠ something was enumerated with NOTHING hidden at ' + a + ':' + f.b + '/' + f.c);
      none++;

      /* 1 shutter — exactly one pair, and it is the true one */
      [['ledge', 'air'], ['air', 'ledge']].forEach(function (pair) {
        const st = Object.assign({}, base); st[pair[0]] = true;
        const r = T.consistent(st);
        eq(r.length, 1, 'L2 ⭐ one shutter did not fix exactly one pair at ' + a + ':' + f.b + '/' + f.c);
        if (r.length === 1) {
          eq(r[0].b, f.b, 'L2 the enumerated b is wrong with the ' + pair[0] + ' shut');
          eq(r[0].c, f.c, 'L2 the enumerated c is wrong with the ' + pair[0] + ' shut');
          eq(r[0].b + r[0].c, a, 'L2 the single pair does not sum to a');
        }
        one++;
      });

      /* 2 shutters — EVERY decomposition into two non-zero parts, a-1 of
         them, and it must NOT be filtered by the ambiguity predicate:
         the class is decomposing, not being dealt a frame. K.OA.A.3. */
      const both = Object.assign({}, base, { ledge: true, air: true });
      const r2 = T.consistent(both);
      eq(r2.length, a - 1, 'L2 ⭐⭐ both shutters did not enumerate a-1 pairs at a=' + a);
      ok(r2.every(p => p.b > 0 && p.c > 0), 'L2 ⚠ a zero part was enumerated at a=' + a);
      ok(r2.every(p => p.b + p.c === a), 'L2 ⚠ a pair that does not sum to a was enumerated at a=' + a);
      const keys = r2.map(p => p.b + '/' + p.c);
      eq(new Set(keys).size, keys.length, 'L2 a duplicate pair was enumerated at a=' + a);
      ok(r2.some(p => p.b === f.b && p.c === f.c), 'L2 the TRUE pair is missing from the enumeration at a=' + a);
      many++;

      /* ⭐ AND IT MUST NOT LEAK. Two frames with the same total, both
         shut, must enumerate IDENTICALLY — otherwise the tally is a
         function of the hidden frame rather than of what can be seen. */
      const other = T.framesFor(a).find(g => g.b !== f.b);
      if (other) {
        const alt = T.consistent({ a: a, b: other.b, c: other.c, ledge: true, air: true, tally: false });
        eq(alt.map(p => p.b + '/' + p.c).join(','), keys.join(','),
          'L2 ⭐⭐ THE TALLY LEAKS: two different frames with the same total enumerate differently at a=' + a);
      }
    });
  }
  ok(none > 20 && one > 40 && many > 20, 'L2 non-vacuity: none=' + none + ' one=' + one + ' many=' + many);

  /* ⭐⭐ IT MUST BE A FUNCTION OF WHAT IS VISIBLE, NOT OF WHAT IT HOLDS.
     This assertion exists because a mutation SURVIVED without it: while
     a = b + c the two readings AGREE, so reading the hidden part
     directly is invisible to every consistent state. Feed it a state
     where they disagree and only the honest one still answers from the
     visible side. */
  let blind = 0;
  for (let a = G.FLOOR; a <= G.CAP; a++) {
    T.framesFor(a).forEach(function (f) {
      /* the LEDGE is shut: only `a` and `c` can be seen, so a corrupted
         `b` must make no difference whatsoever */
      const honest = T.consistent({ a: a, b: f.b, c: f.c, ledge: true, air: false, tally: false });
      const lied = T.consistent({ a: a, b: f.b + 100, c: f.c, ledge: true, air: false, tally: false });
      eq(JSON.stringify(lied), JSON.stringify(honest),
        'L2 ⭐⭐ THE TALLY READS THE HIDDEN PART: shutting the ledge should leave `b` unreadable, but changing it changed the answer');
      /* the AIR is shut: only `a` and `b` can be seen */
      const honest2 = T.consistent({ a: a, b: f.b, c: f.c, ledge: false, air: true, tally: false });
      const lied2 = T.consistent({ a: a, b: f.b, c: f.c + 100, ledge: false, air: true, tally: false });
      eq(JSON.stringify(lied2), JSON.stringify(honest2),
        'L2 ⭐⭐ THE TALLY READS THE HIDDEN PART: shutting the air should leave `c` unreadable');
      /* and with BOTH shut only `a` survives */
      const bothA = T.consistent({ a: a, b: f.b, c: f.c, ledge: true, air: true, tally: false });
      const bothB = T.consistent({ a: a, b: f.b + 50, c: f.c - 30, ledge: true, air: true, tally: false });
      eq(JSON.stringify(bothB), JSON.stringify(bothA),
        'L2 ⭐⭐ with both shutters down the enumeration still depends on the hidden frame');
      blind++;
    });
  }
  ok(blind > 50, 'L2 non-vacuity: blindness checks = ' + blind);
  console.log('  ' + many + ' frames enumerated in all three shutter states, ' +
    blind + ' proved blind to the hidden part');
}

/* ================================================================== */
/* ⚠⚠ L3 — NO ANSWER MAY EXIST BEFORE ITS QUESTION DOES, and opening the
   last shutter must take the tally with it. */
{
  let refusedOpen = 0, allowed = 0, cleared = 0;
  for (let a = G.FLOOR; a <= G.CAP; a++) {
    T.framesFor(a).forEach(function (f) {
      const base = { a: f.a, b: f.b, c: f.c, ledge: false, air: false, tally: false };

      /* ⚠ nothing hidden -> showTally(on) MUST refuse */
      ok(T.showTally(base, true) === null,
        'L3 ⚠⚠ THE TALLY OPENED WITH NOTHING HIDDEN at ' + a + ':' + f.b + '/' + f.c + ' — the tool asked its own question');
      refusedOpen++;
      /* and turning OFF something already off is a no-op refusal */
      ok(T.showTally(base, false) === null, 'L3 the tally was "hidden" when it was already hidden');

      ['ledge', 'air'].forEach(function (w) {
        const shutOne = T.shut(base, w);
        ok(shutOne !== null, 'L3 shut(' + w + ') refused from a fresh frame');
        eq(shutOne[w], true, 'L3 shut(' + w + ') did not close it');
        eq(shutOne.a, base.a, 'L3 shutting changed the total');
        eq(shutOne.b, base.b, 'L3 shutting changed the frame');
        eq(shutOne.c, base.c, 'L3 shutting changed the frame');
        eq(base[w], false, 'L3 ⚠ shut() MUTATED the state it was given');

        const on = T.showTally(shutOne, true);
        ok(on !== null && on.tally === true, 'L3 the tally refused with one shutter down');
        allowed++;
        ok(T.showTally(on, true) === null, 'L3 the tally was opened twice');

        /* ⚠ opening the LAST shutter clears the tally */
        const opened = T.shut(on, w);
        ok(opened !== null, 'L3 the shutter would not open again');
        eq(opened.ledge, false, 'L3 the ledge did not open');
        eq(opened.air, false, 'L3 the air did not open');
        eq(opened.tally, false,
          'L3 ⚠ OPENING THE LAST SHUTTER LEFT THE TALLY UP — it now describes a frame nobody is hiding');
        cleared++;

        /* with the OTHER shutter still down, the tally survives */
        const two = T.shut(on, w === 'ledge' ? 'air' : 'ledge');
        eq(two.tally, true, 'L3 closing a SECOND shutter put the tally away');
        const backToOne = T.shut(two, w);
        eq(backToOne.tally, true, 'L3 opening one of two shutters put the tally away — something is still hidden');
        ok(T.consistent(backToOne).length === 1, 'L3 one shutter left did not fix one pair');
      });

      /* an unknown region is a refusal, not a silent no-op */
      ok(T.shut(base, 'sky') === null, 'L3 shut() accepted a region that does not exist');
      ok(T.shut(base, '') === null, 'L3 shut() accepted an empty region');
      ok(T.shut(base, undefined) === null, 'L3 shut() accepted undefined');
    });
  }
  ok(refusedOpen > 20 && allowed > 40 && cleared > 40,
    'L3 non-vacuity: refusedOpen=' + refusedOpen + ' allowed=' + allowed + ' cleared=' + cleared);

  /* ⚠ PUTTING THE TALLY AWAY MUST NEVER BE REFUSED WHILE IT IS UP.
     This assertion exists because a mutation SURVIVED without it:
     widening the guard to fire on hiding as well as showing is
     invisible while the invariant holds, and it makes a visible control
     un-undoable the moment it does not. A refusal that traps the class
     in a state is worse than one that stops them entering it. */
  let putAway = 0;
  [[false, false], [true, false], [false, true], [true, true]].forEach(function (sh) {
    const st = { a: 9, b: 4, c: 5, ledge: sh[0], air: sh[1], tally: true };
    const off = T.showTally(st, false);
    ok(off !== null, 'L3 ⚠ the tally could NOT be put away from ledge=' + sh[0] + ' air=' + sh[1]);
    if (off) eq(off.tally, false, 'L3 the tally stayed up after being put away');
    putAway++;
  });
  eq(putAway, 4, 'L3 non-vacuity: put-away states walked');
}

/* ================================================================== */
/* ⚠ L3b — THE PATH THE CONTROLS ACTUALLY USE.
   Every act in the tool calls its move with a NULL state — `this.shut(
   null, which)`, `this.showTally(null, on)` — and reads `this.st`. A
   gate that always passes an explicit state never touches that line, so
   the `_st` fallback can rot untested. This assertion exists because a
   mutation SURVIVED without it. */
{
  const frame = { a: 9, b: 4, c: 5, ledge: false, air: false, tally: false };
  T.st = { a: frame.a, b: frame.b, c: frame.c, ledge: false, air: false, tally: false };

  const one = T.shut(null, 'ledge');
  ok(one !== null, 'L3b ⚠ shut(null, ...) — the exact call every button makes — returned nothing');
  eq(one && one.ledge, true, 'L3b shut(null, "ledge") did not close the ledge');
  eq(one && one.a, 9, 'L3b shut(null, ...) lost the held frame');
  ok(T.showTally(null, true) === null, 'L3b the tally opened over the held frame with nothing hidden');
  eq(T.hidden(null), 0, 'L3b hidden(null) did not read the held state');
  eq(T.consistent(null).length, 0, 'L3b consistent(null) enumerated over a frame with nothing hidden');

  T.st = one;
  eq(T.hidden(null), 1, 'L3b hidden(null) did not follow the held state');
  const on = T.showTally(null, true);
  ok(on !== null && on.tally === true, 'L3b the tally refused over a held state with a shutter down');
  eq(T.consistent(null).length, 1, 'L3b consistent(null) did not fix one pair');
  T.st = null;                                   /* leave nothing behind */
}

/* ================================================================== */
/* ⭐⭐ L2b — BFS OVER ONLY WHAT THE BUTTONS CAN REACH.
   The four moves a control invokes: shut('ledge'), shut('air'),
   showTally(on), showTally(off), deal(). `deal` is modelled by SEEDING
   the walk with every frame it can produce, which is exactly its reach
   and keeps the graph finite.
   #54's entire headline branch shipped unreachable under 626 assertions
   because the gate called the model directly. */
{
  const key = s => s.a + '|' + s.b + '|' + s.c + '|' + (s.ledge ? 1 : 0) + '|' + (s.air ? 1 : 0) + '|' + (s.tally ? 1 : 0);
  const seen = {}, queue = [];
  let seeds = 0;
  ['ten', 'sixteen'].forEach(function (range) {
    let pool = 0;
    for (let a = G.FLOOR; a <= T.cap(range); a++) pool += T.framesFor(a).length;
    for (let pick = 0; pick < pool; pick++) {
      const s = T.newState(range, pick);       /* == what `deal` produces */
      if (seen[key(s)]) continue;
      seen[key(s)] = s; queue.push(s); seeds++;
    }
  });
  ok(seeds > 30, 'L2b non-vacuity: only ' + seeds + ' frames are dealable');

  let guard = 0;
  while (queue.length && guard++ < 40000) {
    const st = queue.shift();
    [T.shut(st, 'ledge'), T.shut(st, 'air'), T.showTally(st, true), T.showTally(st, false)]
      .forEach(function (n) {
        if (!n) return;
        const k = key(n);
        if (seen[k]) return;
        seen[k] = n; queue.push(n);
      });
  }
  ok(guard < 40000, 'L2b the button-only walk did not terminate');
  const states = Object.keys(seen).map(k => seen[k]);
  ok(states.length > 200, 'L2b non-vacuity: only ' + states.length + ' states reachable by button');

  /* ⭐⭐ THE HEADLINE. Both shutters down, the tally showing, and the
     tally listing a-1 pairs. If this is not reachable by button the tool
     does not have the thing it is named for. */
  const headline = states.filter(x => x.ledge && x.air && x.tally);
  ok(headline.length > 0,
    'L2b ⭐⭐ THE HEADLINE STATE IS UNREACHABLE BY BUTTON — both shutters down with the tally showing cannot be got to by pressing controls');
  let hl = 0;
  headline.forEach(function (x) {
    const rows = T.consistent(x);
    eq(rows.length, x.a - 1, 'L2b the reachable headline enumerates ' + rows.length + ', not a-1, at a=' + x.a);
    ok(rows.length >= 3, 'L2b the headline offers fewer than three pairs at a=' + x.a + ' — there is nothing to decompose');
    hl++;
  });
  ok(hl === headline.length && hl > 30, 'L2b non-vacuity: headline states checked = ' + hl);

  /* every frame in the pool must be able to REACH the headline */
  const framesSeen = {}, framesHeadlined = {};
  states.forEach(x => { framesSeen[x.a + ':' + x.b] = 1; });
  headline.forEach(x => { framesHeadlined[x.a + ':' + x.b] = 1; });
  eq(Object.keys(framesHeadlined).length, Object.keys(framesSeen).length,
    'L2b ⭐ some dealable frame can never reach both-shut-with-tally');

  /* single-shutter states are reachable too — the free floor */
  const oneShut = states.filter(x => (x.ledge ? 1 : 0) + (x.air ? 1 : 0) === 1 && x.tally);
  ok(oneShut.length > 0, 'L2b a single shutter with the tally showing is unreachable — the free floor does not exist');

  /* ⚠⚠ AND THE INVARIANT HOLDS OVER THE WHOLE REACHABLE SET: the tally
     is never up over nothing. This also proves that a "nothing is
     hidden" tally line can never be displayed. */
  let live = 0, empty = 0;
  states.forEach(function (x) {
    const n = (x.ledge ? 1 : 0) + (x.air ? 1 : 0);
    if (x.tally) {
      live++;
      ok(n > 0, 'L2b ⚠⚠ a reachable state shows the tally with NOTHING hidden');
      const rows = T.consistent(x);
      if (rows.length === 0) empty++;
    }
  });
  ok(live > 50, 'L2b non-vacuity: tally-up states = ' + live);
  eq(empty, 0, 'L2b a reachable tally state enumerates NOTHING');
  console.log('  ' + states.length + ' states reachable by button from ' + seeds +
    ' dealable frames; ' + headline.length + ' are the headline');
}

/* ================================================================== */
/* L4 — EVERY NAMED CONSTANT REACHES A CALL SITE.
   Five tools have shipped dead motion constants (exchange-machine five,
   number-hotel three). A constant nobody reads is a design law with no
   implementation behind it. */
{
  const body = SOURCE.replace(/\/\*[\s\S]*?\*\//g, '');
  ok(body.length > 5000, 'L4 non-vacuity: comment-stripping ate the file');
  ok(/GEO\.CAP/.test(body), 'L4 non-vacuity: the stripped body contains no GEO reference at all');
  const names = Object.keys(G);
  ok(names.length >= 8, 'L4 non-vacuity: only ' + names.length + ' constants found');
  names.forEach(function (k) {
    const n = (body.match(new RegExp('GEO\\.' + k + '(?![\\w$])', 'g')) || []).length;
    ok(n >= 1, 'L4 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* poison, both directions */
  ok((('GEO.CAP;').match(/GEO\.CAP(?![\w$])/g) || []).length === 1, 'L4 poison: the reference test failed to fire');
  ok((('GEO.CAPTURE;').match(/GEO\.CAP(?![\w$])/g) || []).length === 0, 'L4 poison: the reference test matched across a name boundary');

  /* ⚠ a CSS custom property written and never read is the same defect */
  const css = (SOURCE.match(/injectCSS:[\s\S]*$/) || [''])[0];
  const written = SOURCE.match(/setProperty\('(--[\w-]+)'/g) || [];
  ok(true, 'L4 custom-property sweep ran');
  written.forEach(function (w) {
    const prop = w.replace(/setProperty\('/, '').replace(/'$/, '');
    ok(new RegExp('var\\(\\s*' + prop + '\\b').test(css),
      'L4 ⚠ the custom property ' + prop + ' is written by the paint and read by NO rule');
  });

  /* ⚠⚠ THE SCROLL ESCAPE MUST EXIST AS TWO RULES, NOT AS A CLASS.
     lcs-shell.css:54 sets `html, body { overflow: hidden }`, so a tool
     taller than a phone viewport is physically unreachable standalone
     (#22). The class alone does nothing. And `html,body.x{}` is a
     SELECTOR LIST whose html half applies unconditionally, which is why
     it must be two separate rules. */
  const addsScroll = /classList\.add\('mqu-scroll'\)/.test(SOURCE);
  ok(addsScroll, 'L4 the scroll-escape class is not added');
  if (addsScroll) {
    ok(/html\.mqu-scroll\s*\{[^}]*overflow-y\s*:\s*auto/.test(SOURCE),
      'L4 ⚠⚠ `html.mqu-scroll` has NO RULE — the shell pins html to overflow:hidden and the escape does not exist');
    ok(/body\.mqu-scroll\s*\{[^}]*overflow-y\s*:\s*auto/.test(SOURCE),
      'L4 ⚠⚠ `body.mqu-scroll` has NO RULE — the escape does not exist');
    ok(!/html\s*,\s*body\.mqu-scroll\s*\{/.test(SOURCE),
      'L4 ⚠ the scroll escape is written as a SELECTOR LIST — the html half then applies unconditionally and the class is decorative');
    /* ⚠⚠ `overflow-y:auto` ALONE IS INERT — the shell pins html and body
       to `height:100%`, so relaxing only the overflow leaves the height
       pinned and the document never grows. MEASURED at 320x568: the card
       was 1150px in a 568px window with scrollHeight stuck at 568 and
       every control unreachable. This is the recorded "a rule can be
       PRESENT and INERT" class. */
    ['html', 'body'].forEach(function (el) {
      const m = SOURCE.match(new RegExp(el + '\\.mqu-scroll\\s*\\{([^}]*)\\}'));
      ok(!!m, 'L4 no ' + el + '.mqu-scroll rule to inspect');
      if (!m) return;
      ok(/height\s*:\s*auto/.test(m[1]),
        'L4 ⚠⚠ ' + el + '.mqu-scroll relaxes the overflow but not the HEIGHT — the shell pins it to 100%, so the escape is PRESENT AND INERT');
      ok(/min-height\s*:\s*100%/.test(m[1]),
        'L4 ⚠ ' + el + '.mqu-scroll has no `min-height:100%` — the card can then collapse below the viewport');
    });
    /* ⚠ AND EXACTLY ONE DEFINITION OF EACH. A duplicated rule later in
       the same array silently OVERRIDES the first — this tool briefly
       shipped a second pair whose `min-height:0` undid the first, with
       every gate green. */
    ['html', 'body'].forEach(function (el) {
      const n = (SOURCE.match(new RegExp("'" + el + "\\.mqu-scroll\\{", 'g')) || []).length;
      eq(n, 1, 'L4 ⚠⚠ there are ' + n + ' `' + el + '.mqu-scroll` rules — the later one silently overrides the earlier');
    });
  }
  /* ⚠ NO CSS SELECTOR MAY BE DEFINED TWICE IN THIS ARRAY, for the same
     reason. Poison-tested both directions below. */
  {
    /* ⚠ SCOPED TO THE SCREEN RULES. The array continues INSIDE an
       unclosed `@media print{`, and a selector re-declared there is a
       different cascade — `.mqu-sheet` is `display:none` on screen and
       `display:block` in print, which is the whole design. My first
       version was scope-blind and condemned it: the ban-too-wide trap,
       and the fix is to measure what I mean rather than to add an
       exemption for a correct rule. */
    const screenCss = SOURCE.split('@media print{')[0];
    ok(screenCss.length < SOURCE.length, 'L4 non-vacuity: the print block was never found, so nothing was scoped out');
    const rules = screenCss.match(/'\.mqu-[\w-]+\{/g) || [];
    ok(rules.length > 8, 'L4 non-vacuity: only ' + rules.length + ' single-selector screen rules found');
    const seen = {}, dup = [];
    rules.forEach(function (r) { if (seen[r]) dup.push(r); seen[r] = 1; });
    /* `.mqu-wrap` is deliberately declared twice — once for layout and
       once for the `--mqu-d` token — which is a documented, auditable
       exemption and NOT a loosened pattern. */
    const EXEMPT = ["'.mqu-wrap{"];
    dup.filter(d => EXEMPT.indexOf(d) < 0).forEach(function (d) {
      ok(false, 'L4 ⚠ the selector ' + d + "…} is declared twice — the later one silently overrides the earlier");
    });
    ok(true, 'L4 duplicate-selector sweep ran over ' + rules.length + ' rules');
    /* poison, both directions */
    const probe = ["'.mqu-a{", "'.mqu-b{", "'.mqu-a{"];
    const s2 = {}, d2 = []; probe.forEach(function (r) { if (s2[r]) d2.push(r); s2[r] = 1; });
    eq(d2.length, 1, 'L4 poison: the duplicate sweep failed to spot a repeated selector');
    const s3 = {}, d3 = []; ["'.mqu-a{", "'.mqu-b{"].forEach(function (r) { if (s3[r]) d3.push(r); s3[r] = 1; });
    eq(d3.length, 0, 'L4 poison: the duplicate sweep flagged two distinct selectors');
  }
  /* the print sheet must reset the shell — lcs-shell.css ships no print block */
  ok(/@media print\{[^]*\.lcs-shell[^]*display:none/.test(SOURCE),
    'L4 the print block does not hide the shell — the worksheet prints the web page');
}

/* ================================================================== */
/* ⭐⭐ L5 — THE REFUSE-LIST IS A GATE, NOT A NOTE.
   ⚠ Every ban is poison-tested in BOTH directions, because a ban that
   rejects correct prose teaches a panel to write around it (the
   `Zufallsbeutel` defect). */
{
  const keys = Object.keys(T.strings);
  ok(keys.length >= 20, 'L5 non-vacuity: implausibly few strings (' + keys.length + ')');
  keys.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L5 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.trim().length > 0, 'L5 ⚠ `' + k + '` has no English');
  });

  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  /* ⚠ SCOPED TO THE TOOL'S OWN AUTHORED PROSE. Nothing here reads
     document.body — the RSC flight-data trap (#40) condemned ten locales
     for a sibling's correct slug.
     ⚠⚠ AND SCOPED TO `.en`, DELIBERATELY. DO NOT "IMPROVE" THIS BY
     SWEEPING THE TEN LOCALES: these are ENGLISH words, and the obvious
     widening was MEASURED against the shipped native copy — the
     fourth-named-part ban on `bag` fires on FIVE correct Danish strings,
     because `bag` is the Danish for BEHIND and this is a tool about
     hiding things behind shutters ("Hvad kan der gemme sig bag?"). That
     is the `Zufallsbeutel` defect exactly: a fence that rejects correct
     native prose teaches a panel to write around it instead of
     reporting it. Locale copy is a native panel's job, not a regex's. */
  const prose = keys.map(k => T.strings[k].en).join('  ||  ');

  /* (a) NO JUDGING, NO SCORE, NO COMPLETENESS READOUT. "4 of 7 found" is
     a score wearing a fraction, and ranking a question is the one thing
     this routine exists to prevent. */
  const JUDGE = ['correct', 'incorrect', 'wrong', 'score', 'points', 'streak', 'timer',
    'well done', 'try again', 'best', 'winner', 'mistake'];
  JUDGE.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠⚠ the copy uses "' + w + '" — the refuse-list forbids judging, scoring and comparing');
  });
  ok(!/\b\d+\s+(of|out of)\s+\d+\b/i.test(prose),
    'L5 ⚠⚠ a COMPLETENESS READOUT reached the copy — "4 of 7 found" is a score wearing a fraction');
  ok(!/\b(found|remaining|left to find)\b.*\b(all|every)\b/i.test(prose), 'L5 a completeness framing reached the copy');

  /* (b) NO EFFICACY CLAIM. One controlled trial exists in this age band
     and Zhang 2024 discarded it as an outlier. */
  const EFFICACY = ['proven', 'evidence-based', 'boosts', 'improves outcomes', 'raises attainment'];
  EFFICACY.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠ the copy claims efficacy with "' + w + '" — research-based, not evidence-based');
  });

  /* (c) THE LOCALE MINES, each named in the docblock. ⚠ `pose` is banned
     as a WORD, not as a substring: "purpose" and "suppose" are correct
     English and a substring ban would condemn them. */
  ['pose', 'freeze', 'wire'].forEach(function (w) {
    ok(!ban(w).test(prose),
      'L5 ⚠ "' + w + '" reaches the copy — it collides with a sibling tool\'s house noun in at least three locales');
  });

  /* poison, both directions, per ban */
  ok(ban('score').test('keep the score'), 'L5 poison: the judge ban failed to fire');
  ok(!ban('score').test('scoreboard-ish'), 'L5 poison: the judge ban fired across a word boundary');
  ok(ban('pose').test('pose a question'), 'L5 poison: the `pose` ban failed to fire');
  ok(!ban('pose').test('on purpose'), 'L5 poison: the `pose` ban condemned "purpose" — a substring ban would');
  ok(!ban('pose').test('suppose so'), 'L5 poison: the `pose` ban condemned "suppose"');
  ok(/\b\d+\s+of\s+\d+\b/i.test('4 of 7 found'), 'L5 poison: the completeness test failed to fire');
  ok(!/\b\d+\s+of\s+\d+\b/i.test('one of the pairs'), 'L5 poison: the completeness test fired on prose');

  /* (d) THE THREE NAMED PARTS, and the product name is the operator's */
  eq(T.strings.title.en, 'The Missing Question', 'L5 the product name is the operator\'s');
  ok(/ledge/i.test(T.strings.instruction.en), 'L5 the instruction never names the ledge');
  ok(/shutter/i.test(T.strings.instruction.en), 'L5 the instruction never names the shutter');
  /* ⚠ a FOURTH named part is the #41/#42 defect verbatim */
  const FOURTH = ['bench', 'tray', 'board', 'strip', 'rail', 'lid', 'jar', 'bag'];
  FOURTH.forEach(function (w) {
    ok(!ban(w).test(prose), 'L5 ⚠ "' + w + '" is a FOURTH named part, and it is a sibling tool\'s own noun');
  });

  /* (e) THE TALLY ENUMERATES, IT NEVER COMPARES. Its own lines must not
     address a child's answer. */
  ok(!/your|you got|you found/i.test(T.strings.tallyMany.en + ' ' + T.strings.tallyOne.en),
    'L5 ⚠⚠ the tally addresses the child\'s answer — it enumerates, it never compares');

  /* (f) EVERY {token} IN A STRING MUST BE ONE THE PAINT SUPPLIES.
     A raw {b} rendering is the #54 dead/raw-token class. */
  const SUPPLIED = { a: 1, b: 1, c: 1 };
  let tokens = 0;
  keys.forEach(function (k) {
    (T.strings[k].en.match(/\{(\w+)\}/g) || []).forEach(function (tk) {
      tokens++;
      const name = tk.slice(1, -1);
      ok(SUPPLIED[name] === 1, 'L5 ⚠ `' + k + '` carries the token ' + tk + ', which the paint never supplies');
    });
  });
  ok(tokens > 5, 'L5 non-vacuity: only ' + tokens + ' tokens found across the aria strings');

  /* (g) the _fmt substitution actually happens */
  const fmt = T._fmt('there were {a} in all, {b} stayed and {z} is unknown', { a: 9, b: 4 });
  eq(fmt, 'there were 9 in all, 4 stayed and {z} is unknown', 'L5 _fmt does not substitute what it is given');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }

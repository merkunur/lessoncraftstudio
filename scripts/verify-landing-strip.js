/* =====================================================================
   MODEL GATE — TOOL #51, THE LANDING STRIP
   =====================================================================
   ⚠⚠ THIS GATE IMPLEMENTS ITS OWN GROUND TRUTH. Every expectation is
   re-derived from arithmetic written here, never by asking the tool what
   it thinks — a gate that reads its expectation off the artefact marks
   its own homework, which once let 19 of 51 mutations survive.
   ⚠ NON-VACUITY IS ASSERTED FIRST, and every enumeration states how many
   states it visited against a count computed independently. A loop over
   an empty set passes every assertion inside it.

   ⭐ L7 IS THE LOAD-BEARING ONE. `verify-estimation-jar.js` P14 bans an
   accuracy gradient BY NAME, gate-enforced in eleven locales. This gate
   proves the model CANNOT EXPRESS ONE: it enumerates every reachable
   state and asserts the trace is a pure count per post, that no field
   anywhere holds a distance, a rank or an order, and that two different
   errors at the same post are INDISTINGUISHABLE in the state.

   Run: node scripts/verify-landing-strip.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.LANDING_STRIP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'landing-strip.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* ---- the ORACLE, written from the apparatus as described ----------
   three posts: one at each end and one in the middle, at EVERY depth. */
const oPost = (lo, hi, i) => lo + (hi - lo) * (i / 2);
/* ⚠ THE MIDDLE IS TRIED FIRST, because the stated rule is that a tie
   goes to the middle. The first version of this oracle iterated 0,1,2
   and so encoded the SAME defect the tool had — which is why it passed
   16,626 assertions over a model whose 25 went to the low post. A gate
   whose oracle shares the code’s misconception proves nothing.
   Derived from the rule, verified against the two quarter points below. */
const oNearest = (lo, hi, v) => {
  let best = 1, bd = Infinity;
  for (const i of [1, 0, 2]) {
    const d = Math.abs(v - oPost(lo, hi, i));
    if (d < bd - 1e-9) { bd = d; best = i; }
  }
  return best;
};

/* L0 — the constants exist before anything uses them */
const NEEDED = ['POSTS', 'DEPTH_MAX', 'SPAN_TOP', 'DECADE', 'STEP_TOP', 'NUDGE_BIG',
  'NUDGE_SMALL', 'TRACE_MAX', 'T_ARRIVE', 'T_COMMIT', 'T_BEAT', 'T_REVEAL', 'T_RERULE',
  'T_REFUSE', 'RM_F', 'RM_FLOOR', 'SND_POST', 'SND_PLACE', 'SND_REVEAL', 'SND_RERULE',
  'SND_REFUSE', 'SND_DEBOUNCE'];
ok(NEEDED.length >= 20, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));
eq(G.POSTS, 3, 'L0 there are three posts');

/* ================================================================== */
/* L1+L2 — THE POSTS ARE THE SAME QUESTION AT EVERY DEPTH.
   The tool's whole claim: re-rule into a ten and the three posts come
   back at the new ends and the new middle. Enumerated over every
   decade, not sampled. */
{
  let depths = 0, values = 0;
  const spans = [[0, 100], [0, 20]];
  for (let d = 0; d < 10; d++) spans.push([d * 10, d * 10 + 10]);
  spans.forEach(function (sp) {
    const st = { lo: sp[0], hi: sp[1], top: 100, n: null, phase: 'empty', post: null, guess: null, depth: 0, trace: [0, 0, 0] };
    depths++;
    for (let i = 0; i < G.POSTS; i++) {
      eq(T.postValue(st, i), oPost(sp[0], sp[1], i), 'L1 post ' + i + ' on ' + sp[0] + '-' + sp[1]);
    }
    eq(T.postValue(st, 0), sp[0], 'L1 ⭐ the low post IS the low end on ' + sp[0] + '-' + sp[1]);
    eq(T.postValue(st, 2), sp[1], 'L1 ⭐ the high post IS the high end on ' + sp[0] + '-' + sp[1]);
    eq(T.postValue(st, 1), (sp[0] + sp[1]) / 2, 'L1 ⭐ the middle post IS the middle');
    /* every value's nearest post, against the oracle */
    for (let v = sp[0]; v <= sp[1]; v += (sp[1] - sp[0]) / 20) {
      eq(T.nearestPost(st, v), oNearest(sp[0], sp[1], v), 'L2 nearest post for ' + v + ' on ' + sp[0] + '-' + sp[1]);
      const f = T.frac(st, v);
      ok(f >= -1e-9 && f <= 1 + 1e-9, 'L2 frac out of range for ' + v);
      ok(Math.abs(f - (v - sp[0]) / (sp[1] - sp[0])) < 1e-9, 'L2 frac wrong for ' + v);
      values++;
    }
  });
  eq(depths, 12, 'L1 non-vacuity: strips checked');
  ok(values >= 240, 'L2 non-vacuity: only ' + values + ' values checked');
  /* ⭐ the catalog's own question, named explicitly */
  const st = T.arrive(T.newState('100'), 71);
  eq(T.nearestPost(st, 71), 1, 'L2 ⭐ 71 is nearest the MIDDLE post, not the top one');
  /* ⭐ THE TWO QUARTER POINTS, named because they are exactly tied and
     the deal favours them. A tie goes to the MIDDLE, both sides. */
  eq(T.nearestPost(st, 25), 1, 'L2 ⭐ 25 is a tie and must go to the MIDDLE post');
  eq(T.nearestPost(st, 75), 1, 'L2 ⭐ 75 is a tie and must go to the MIDDLE post');
}

/* ================================================================== */
/* L3-L6 — every move, in every phase, over the whole space */
{
  let states = 0, refusedWrongPhase = 0, nudged = 0, refusedRange = 0, reruled = 0;
  const TOP = 100;
  for (let n = 1; n < TOP; n++) {
    const empty = T.newState('100');
    states++;

    /* L3 phase gating: nothing may run out of turn, and a refusal is
       ALWAYS null and NEVER a clamp */
    ok(T.choosePost(empty, 0) === null, 'L3 a post was chosen before a number arrived (n=' + n + ')');
    ok(T.nudge(empty, 1) === null, 'L3 the plaque moved before a post was chosen');
    ok(T.commit(empty) === null, 'L3 committed with nothing to commit');
    ok(T.rerule(empty) === null, 'L3 re-ruled before the truth was shown');
    ok(T.back(empty) === null, 'L3 went back from the top depth');
    refusedWrongPhase += 5;

    const arr = T.arrive(empty, n);
    ok(arr !== null, 'L3 arrive(' + n + ') refused');
    eq(arr.phase, 'post', 'L3 arrive puts it in the post phase');
    ok(T.nudge(arr, 1) === null, 'L3 the plaque moved in the post phase');
    ok(T.commit(arr) === null, 'L3 committed in the post phase');
    ok(T.arrive(empty, TOP + 1) === null, 'L3 a number outside the strip arrived');
    ok(T.arrive(empty, -1) === null, 'L3 a negative number arrived');

    for (let p = 0; p < G.POSTS; p++) {
      const ch = T.choosePost(arr, p);
      ok(ch !== null, 'L4 post ' + p + ' refused');
      eq(ch.phase, 'place', 'L4 choosing a post opens the place phase');
      eq(ch.guess, T.postValue(arr, p), 'L4 the plaque starts AT the chosen post');
      eq(ch.trace[p], 1, 'L4 the trace counted the post');
      eq(ch.trace.reduce((a, b) => a + b, 0), 1, 'L4 the trace counted ONLY that post');
      ok(T.choosePost(ch, p) === null, 'L4 a post was chosen twice');

      /* L5 nudge: exact, or an honest refusal */
      [[-G.NUDGE_BIG, 1], [-G.NUDGE_SMALL, 1], [G.NUDGE_SMALL, 1], [G.NUDGE_BIG, 1]].forEach(function (u) {
        const want = ch.guess + u[0] * T.step(ch);
        const got = T.nudge(ch, u[0]);
        if (want < ch.lo || want > ch.hi) {
          ok(got === null, 'L5 ⚠ nudge ' + u[0] + ' from ' + ch.guess + ' must REFUSE, not clamp');
          refusedRange++;
        } else {
          ok(got !== null, 'L5 nudge ' + u[0] + ' from ' + ch.guess + ' refused a legal move');
          if (got) { eq(got.guess, want, 'L5 nudge ' + u[0] + ' landed wrong'); nudged++; }
        }
      });

      /* L5b aim rounds and never leaves the strip */
      [0, 0.013, 0.5, 0.7777, 1].forEach(function (f) {
        const a = T.aim(ch, f);
        ok(a !== null, 'L5b aim(' + f + ') refused');
        if (!a) return;
        ok(a.guess >= a.lo && a.guess <= a.hi, 'L5b aim(' + f + ') left the strip');
        const stp = T.step(ch);
        ok(Math.abs(a.guess / stp - Math.round(a.guess / stp)) < 1e-9, 'L5b aim(' + f + ') is off the step');
      });
      ok(T.aim(ch, -0.01) === null, 'L5b aim before the strip was accepted');
      ok(T.aim(ch, 1.01) === null, 'L5b aim past the strip was accepted');

      const done = T.commit(ch);
      ok(done !== null, 'L6 commit refused');
      eq(done.phase, 'shown', 'L6 commit shows the truth');
      eq(done.n, n, 'L6 commit changed the number');
      eq(done.guess, ch.guess, 'L6 commit moved the guess');

      /* L6 the re-rule lands on the ten the number lives in, and the
         three posts come back */
      const rr = T.rerule(done);
      ok(rr !== null, 'L6 the re-rule refused at n=' + n);
      if (rr) {
        eq(rr.lo, Math.floor(n / G.DECADE) * G.DECADE, 'L6 ⭐ the re-rule opened the wrong ten for ' + n);
        eq(rr.hi - rr.lo, G.DECADE, 'L6 the re-ruled strip is not one ten wide');
        ok(n >= rr.lo && n <= rr.hi, 'L6 ⭐ the number is not inside its own ten');
        eq(rr.depth, 1, 'L6 depth');
        for (let i = 0; i < G.POSTS; i++) {
          eq(T.postValue(rr, i), oPost(rr.lo, rr.hi, i), 'L6 ⭐ post ' + i + ' did not come back inside the ten');
        }
        ok(T.rerule(rr) === null, 'L6 ⚠ a ten was re-ruled again — that is Grade 3, and the cap must hold');
        const bk = T.back(rr);
        ok(bk !== null, 'L6 could not go back out');
        if (bk) { eq(bk.lo, 0, 'L6 back lo'); eq(bk.hi, TOP, 'L6 back hi'); eq(bk.depth, 0, 'L6 back depth'); }
        reruled++;
      }
    }
  }
  eq(states, TOP - 1, 'L3 non-vacuity: numbers walked');
  ok(refusedWrongPhase > 0, 'L3 non-vacuity: no out-of-turn refusal was ever exercised');
  ok(nudged > 0, 'L5 non-vacuity: no legal nudge was ever exercised');
  ok(refusedRange > 0, 'L5 non-vacuity: no range refusal was ever exercised');
  eq(reruled, (TOP - 1) * G.POSTS, 'L6 non-vacuity: re-rules exercised');
  console.log('  walked ' + states + ' numbers x ' + G.POSTS + ' posts; ' +
    nudged + ' nudges, ' + refusedRange + ' range refusals, ' + reruled + ' re-rules');
}

/* ================================================================== */
/* ⭐⭐ L7 — THE MODEL CANNOT EXPRESS AN ACCURACY GRADIENT.
   `verify-estimation-jar.js` P14 bans it by name in eleven locales.
   This proves it structurally rather than promising it in a comment. */
{
  const FIELDS = ['lo', 'hi', 'top', 'n', 'phase', 'post', 'guess', 'depth', 'trace'];
  const s0 = T.newState('100');
  const keys = Object.keys(s0).sort();
  eq(keys.join(','), FIELDS.slice().sort().join(','),
    'L7 ⚠ the state grew a field — every new field is a place an accuracy gradient could live');

  /* two guesses at the SAME post with very different errors must be
     INDISTINGUISHABLE once the trace is read */
  let compared = 0;
  for (let n = 1; n < 100; n++) {
    const arr = T.arrive(T.newState('100'), n);
    const p = T.nearestPost(arr, n);
    const near = T.commit(T.choosePost(arr, p));                 /* left on the post */
    let far = T.choosePost(arr, p);
    for (let k = 0; k < 4 && T.nudge(far, G.NUDGE_BIG); k++) far = T.nudge(far, G.NUDGE_BIG);
    far = T.commit(far);
    eq(near.trace.join(','), far.trace.join(','),
      'L7 ⚠⚠ the trace TELLS THE TWO GUESSES APART at n=' + n + ' — that is an accuracy gradient');
    compared++;
  }
  ok(compared >= 90, 'L7 non-vacuity: only ' + compared + ' comparisons');

  /* the trace is a pure count and is capped — a long enough series IS
     a trend even when every entry is innocent */
  let st = T.arrive(T.newState('100'), 50);
  for (let i = 0; i < G.TRACE_MAX * 3; i++) {
    st = T.commit(T.choosePost(st, i % G.POSTS));
    st = T.arrive(st, 50);
    const tot = st.trace.reduce((a, b) => a + b, 0);
    ok(tot <= G.TRACE_MAX, 'L7 ⚠ the trace exceeded TRACE_MAX (' + tot + ')');
    st.trace.forEach(v => ok(Number.isInteger(v) && v >= 0, 'L7 a trace entry is not a plain count'));
  }
  eq(st.trace.length, G.POSTS, 'L7 the trace has one entry per post and nothing else');
}

/* ================================================================== */
/* ⭐ L7b — THE TRACE CAP MUST PRESERVE THE SHAPE, not empty a column.
   Subtracting the overflow from tr[0] first made 26 EVEN choices read
   [3, 9, 8]: a 3x understatement, always on the same column, and that
   column is the low-number end. The shape is the only thing this trace
   is for, so a cap that destroys it destroys the feature. */
{
  let st = T.arrive(T.newState("100"), 50);
  for (let i = 0; i < 26; i++) { st = T.commit(T.choosePost(st, i % G.POSTS)); st = T.arrive(st, 50); }
  const tr = st.trace, tot = tr[0] + tr[1] + tr[2];
  ok(tot <= G.TRACE_MAX, "L7b the cap did not hold (" + tot + ")");
  const lo = Math.min.apply(null, tr), hi = Math.max.apply(null, tr);
  ok(hi - lo <= 2, "L7b ⚠⚠ 26 EVEN choices produced " + JSON.stringify(tr) +
    " — the cap is eating one column and the trace no longer shows the shape");
  /* and a genuinely lopsided run must still READ as lopsided */
  let sk = T.arrive(T.newState("100"), 50);
  for (let i = 0; i < 30; i++) { sk = T.commit(T.choosePost(sk, i % 5 === 0 ? 0 : 2)); sk = T.arrive(sk, 50); }
  ok(sk.trace[2] > sk.trace[0], "L7b a lopsided run did not read as lopsided: " + JSON.stringify(sk.trace));
}

/* ⭐ L7c — COMING BACK OUT MUST NOT RESURRECT A COMMITTED STATE.
   back() guarded only on depth, so commit -> rerule -> back returned
   phase "shown" with post and guess BOTH null: the truth wedge drawn
   while nobody had committed to anything, in two presses. The docblock
   claimed that state was unreachable and it was not. */
{
  let bad = 0, checked = 0;
  for (let n = 1; n < 100; n++) {
    const done = T.commit(T.choosePost(T.arrive(T.newState("100"), n), 1));
    const out = T.back(T.rerule(done));
    checked++;
    if (out && out.phase === "shown" && (out.post === null || out.guess === null)) bad++;
  }
  ok(checked >= 90, "L7c non-vacuity: only " + checked + " round trips");
  eq(bad, 0, "L7c ⚠⚠ commit->rerule->back resurrected a shown state with nothing committed");
  /* every reachable state: shown implies BOTH a post and a guess */
  const seen = [];
  let st = T.arrive(T.newState("100"), 47);
  [st, T.choosePost(st, 0), T.commit(T.choosePost(st, 0)),
   T.rerule(T.commit(T.choosePost(st, 0))),
   T.back(T.rerule(T.commit(T.choosePost(st, 0))))].forEach(function (x) { if (x) seen.push(x); });
  ok(seen.length === 5, "L7c non-vacuity: only " + seen.length + " states walked");
  seen.forEach(function (x, i) {
    if (x.phase === "shown") ok(x.post !== null && x.guess !== null,
      "L7c ⚠ state " + i + " is shown but nothing was committed");
  });
}

/* ================================================================== */
/* L8 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const declared = Object.keys(G);
  ok(declared.length >= 20, 'L8 non-vacuity: implausibly few constants');
  declared.forEach(function (k) {
    const uses = (body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length;
    ok(uses >= 1, 'L8 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* ⚠ THE BEAT MUST NOT PASS THROUGH _dur(): reduced motion is about
     movement, and a wait is not movement. */
  ok(!/_dur\(\s*GEO\.T_BEAT/.test(body), 'L8 ⚠⚠ T_BEAT goes through _dur() — a wait is not movement');
  /* ⚠ THE REVEAL MUST BE ONE DURATION, never a function of the error */
  const rev = body.match(/_dur\(GEO\.T_REVEAL\)/g) || [];
  ok(rev.length >= 1, 'L8 T_REVEAL is not used as a duration');
  ok(!/T_REVEAL\s*[*+\-]/.test(body), 'L8 ⚠⚠ T_REVEAL is scaled — the verdict would leak into the time channel');
}

/* L9 — strings are per-locale objects, and no part is named after
   another tool's part */
{
  const OWNED = ['runway', 'ghost', 'trail', 'rail', 'peg', 'tape', 'column', 'gear', 'cog', 'dial', 'drum'];
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  const all = Object.keys(T.strings);
  ok(all.length >= 25, 'L9 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L9 ⚠ string `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0, 'L9 ⚠ string `' + k + '` has no English');
  });
  all.filter(k => k !== 'title').forEach(function (k) {
    OWNED.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en), 'L9 ⚠ `' + k + '` uses "' + w + '", another tool\'s part');
    });
  });
  /* poison, both directions */
  ok(ban('runway').test('put a flag on the runway'), 'L9 poison: the ban failed to fire');
  ok(!ban('ghost').test('ghostly'), 'L9 poison: the ban fired inside another word');
  ok(!ban('rail').test('trailing'), 'L9 poison: the ban fired inside "trailing"');
  eq(T.strings.title.en, 'The Landing Strip', 'L9 the product name is the operator\'s');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }

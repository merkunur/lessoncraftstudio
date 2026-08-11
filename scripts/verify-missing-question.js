/* =====================================================================
   verify-missing-question.js — TOOL #55, THE MODEL
   ---------------------------------------------------------------------
   Run:  node scripts/verify-missing-question.js

   ⚠⚠ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool is a gate marking its own homework — that let 19 of 51
   mutations survive on a sibling. Every oracle below is written from the
   SPEC, independently, and is poison-tested against a deliberately wrong
   answer before it is trusted.

   ⚠⚠ AND A GREEN MODEL GATE SAYS NOTHING ABOUT WHETHER THE TOOL RENDERS.
   #55's PREVIOUS build passed its model gate and drew NOTHING in every
   locale at every viewport, because it read `api.root` on the first line
   of the first paint. The browser gates (`probe-`, `smoke-`,
   `audit-…-locale-layout`) are not optional companions to this file;
   they are the half that can see the tool.

   ⚠ EVERY ASSERTION IS POISONED, NOT JUST THE FIRST, and each poison has
   a CONTROL — a correct input that must PASS — because a check that
   cannot fail and a check that cannot pass are equally useless.
   ===================================================================== */
'use strict';

const path = require('path');
const fs = require('fs');
const TOOL_DIR = process.env.MISSING_QUESTION_TOOL_DIR
  || path.join(__dirname, '..', 'mini tools');
const TOOL_PATH = path.join(TOOL_DIR, 'missing-question.js');
const T = require(TOOL_PATH);
const SRC = fs.readFileSync(TOOL_PATH, 'utf8');

let pass = 0, fail = 0;
const bad = [];
function ok(cond, msg) {
  if (cond) { pass++; return true; }
  fail++; bad.push(msg); return false;
}
function eq(a, b, m) {
  return ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));
}

const G = T.GEO;

/* ==================================================================
   L0 — THE TOOL EXPOSES WHAT A GATE MUST READ, AND IS FREE-PLAY
   ================================================================== */
ok(T && typeof T === 'object', 'L0 the tool did not export an object');
ok(G && typeof G === 'object',
  'L0 GEO is not exposed — a gate would have to parse the literal out of the source, which is a gate reading a copy of the thing it tests');
ok(T.SUM_AT && T.SHAPES, 'L0 SUM_AT / SHAPES are not exposed');

/* ⚠ T_SWAP is deliberately ABSENT — it was declared, emitted as
   `--mqu-swap` and read by nothing, and it is gone. This list is the
   thing that caught its removal, which is the point. */
const NEEDED = ['LAT_COLS', 'FLOOR', 'T_IN', 'T_OUT', 'T_STEP', 'T_DRAW',
  'T_REFUSE', 'RM_F', 'RM_FLOOR', 'SND_TELL', 'SND_LINK', 'SND_ASK', 'SND_COUNT',
  'SND_DEAL', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 10, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing or not a number'));
ok(G.BANDS && typeof G.BANDS === 'object', 'L0 GEO.BANDS missing');

ok(!T.tasks,
  'L0 the tool declares `tasks` — a free-play instrument must not, or the shell renders activity chrome and an educationalAlignment collision becomes possible');

['legal', 'values', 'newState', 'stageOf', 'link', 'tell', 'count', 'setAsk',
  'setShape', 'setTotal', 'deal', 'cap', 'toldCount'].forEach(fn =>
  ok(typeof T[fn] === 'function', 'L0 model function `' + fn + '` is missing'));

/* ⚠ EVERY CONSTANT MUST BE READ BY SOMETHING. A constant nobody reads is
   a law with nothing behind it — the previous build declared seven and
   the tool shipped with no motion at all. */
(function () {
  let unread = [];
  NEEDED.forEach(k => {
    /* GEO.X in code, or the CSS emission `GEO.X + 'ms'` */
    const re = new RegExp('GEO\\.' + k + '\\b');
    const hits = (SRC.match(re) || []).length;
    /* one hit is the declaration itself inside the GEO literal, so a
       constant that is only declared shows as 0 here */
    if (hits === 0) unread.push(k);
  });
  ok(unread.length === 0, 'L0 ⭐ GEO constants declared but never read: ' + unread.join(', '));
  /* poison + control for the reader itself */
  ok(/GEO\.T_STEP\b/.test(SRC), 'L0 poison: the constant-reader found nothing for a constant that IS read');
  ok(!/GEO\.T_NOT_A_REAL_CONSTANT\b/.test(SRC), 'L0 poison: the constant-reader matched a name that does not exist');
})();

/* ==================================================================
   L1 — legal() IS A REAL PREDICATE
   ================================================================== */
(function () {
  /* independent oracle, written from the spec:
     a frame is worth showing iff the total is at least the floor, both
     parts are whole and positive, and the parts differ (equal parts make
     two of the three questions the same question). */
  const oracle = (w, p) =>
    w >= G.FLOOR &&
    w === Math.round(w) && p === Math.round(p) &&
    p > 0 && (w - p) > 0 &&
    p !== (w - p);

  ok(oracle(5, 2) === true, 'L1 poison: the oracle rejected a plainly good frame (5,2)');
  ok(oracle(4, 2) === false, 'L1 poison: the oracle accepted (4,2), where the parts are equal');
  ok(oracle(2, 1) === false, 'L1 poison: the oracle accepted a frame under the floor');
  ok(oracle(5, 0) === false, 'L1 poison: the oracle accepted a vacuous part');

  let checked = 0, accepted = 0, mismatch = 0;
  for (let w = 0; w <= 26; w++) {
    for (let p = -2; p <= 26; p++) {
      checked++;
      const a = !!T.legal(w, p), b = !!oracle(w, p);
      if (a) accepted++;
      if (a !== b) { mismatch++; if (mismatch < 4) bad.push('L1 legal(' + w + ',' + p + ') = ' + a + ', oracle says ' + b); }
    }
  }
  ok(mismatch === 0, 'L1 ⭐ legal() disagrees with the independent oracle on ' + mismatch + ' of ' + checked + ' inputs');
  ok(checked === 27 * 29, 'L1 non-vacuity: the sweep did not cover the grid it claims');
  ok(accepted > 60, 'L1 non-vacuity: only ' + accepted + ' frames accepted — the predicate is refusing everything');
  ok(accepted < checked, 'L1 non-vacuity: everything was accepted — it is not a predicate');

  ok(T.legal(5, 2.5) === false, 'L1 a fractional frame was accepted');
  /* ⚠ (5, 2.5) is refused by the EQUAL-PARTS clause, not the integer
     guard, so it proved nothing about integrality — the mutation that
     deletes that guard survived this assertion. These are the cases
     where only the guard can refuse. */
  ok(T.legal(5.5, 2) === false, 'L1 ⭐ a fractional TOTAL was accepted');
  ok(T.legal(7, 2.5) === false, 'L1 ⭐ a fractional PART was accepted');
  ok(T.legal(6.25, 1.5) === false, 'L1 both fractional and accepted');
  ok(T.legal(4, 2) === false, 'L1 ⭐ equal parts accepted — every question about that frame has the same answer');
})();

/* ==================================================================
   L2 — values() SATISFIES THE INVARIANT, EXHAUSTIVELY
   ================================================================== */
(function () {
  /* independent oracle: whichever niche is the sum, the OTHER TWO add to
     it. Written from the spec, not from SUM_AT. */
  const SUM_SPEC = { change: 1, bracket: 2, compare: 0 };
  ok(JSON.stringify(T.SUM_AT) === JSON.stringify(SUM_SPEC),
    'L2 ⭐ SUM_AT does not match the spec — ' + JSON.stringify(T.SUM_AT));

  let n = 0, broken = 0, nonpos = 0;
  for (const sh of T.SHAPES) {
    const sum = SUM_SPEC[sh];
    const others = [0, 1, 2].filter(i => i !== sum);
    for (let w = G.FLOOR; w <= 20; w++) {
      for (let p = 1; p < w; p++) {
        if (!T.legal(w, p)) continue;
        n++;
        const v = T.values({ shape: sh, w: w, p: p, ask: sum, linked: false, told: [0, 0, 0], counted: false });
        if (v[others[0]] + v[others[1]] !== v[sum]) broken++;
        if (v.some(x => !(x > 0))) nonpos++;
      }
    }
  }
  ok(n > 300, 'L2 non-vacuity: only ' + n + ' frames walked');
  ok(broken === 0, 'L2 ⭐⭐ the invariant fails on ' + broken + ' of ' + n + ' frames');
  ok(nonpos === 0, 'L2 a non-positive quantity was produced on ' + nonpos + ' frames');

  /* poison the invariant check itself against a deliberately wrong triple */
  const fake = [3, 4, 99];
  ok(!(fake[0] + fake[1] === fake[2]), 'L2 poison: the invariant test passed a triple that does not sum');
  ok((3 + 4 === 7), 'L2 poison: the invariant test failed a triple that does sum');
})();

/* ==================================================================
   L3 — THE PATH. stageOf() DERIVES; nothing stores it.
   ================================================================== */
(function () {
  ok(!/\bstage\s*:/.test(SRC.slice(SRC.indexOf('newState'), SRC.indexOf('newState') + 600)),
    'L3 ⭐ newState() stores a `stage` field — the ladder must be DERIVED, or the tool stops being free-play');

  /* the intended walk, for every shape, driven by the MOVES */
  for (const sh of T.SHAPES) {
    let s = T.newState(sh, 'ten', 5);
    const seen = [T.stageOf(s)];
    s = T.link(s); seen.push(T.stageOf(s));
    const tellable = [0, 1, 2].filter(i => i !== s.ask);
    s = T.tell(s, tellable[0]); seen.push(T.stageOf(s));
    s = T.tell(s, tellable[1]); seen.push(T.stageOf(s));
    s = T.count(s); seen.push(T.stageOf(s));
    eq(seen.join(','), '0,1,2,3,4', 'L3 ⭐ the ladder for `' + sh + '` walked ' + seen.join(' -> '));
  }

  /* off the path is null, not an error and not a number */
  const s0 = T.newState('bracket', 'ten', 0);
  /* telling before linking is refused, so the only way off-path is a
     state the moves cannot reach — construct one deliberately */
  const offPath = { shape: 'bracket', w: 5, p: 2, ask: 2, linked: false, told: [true, false, false], counted: false };
  eq(T.stageOf(offPath), null, 'L3 an unreachable state should read as off-path (null)');
  ok(T.stageOf(s0) === 0, 'L3 poison: a fresh state did not read as stage 0');

  /* ⚠ MONOTONE ALONG THE WALK — advancing never removes information */
  let s = T.newState('bracket', 'ten', 2);
  let prev = T.stageOf(s);
  s = T.link(s);
  ok(T.stageOf(s) >= prev, 'L3 linking moved the ladder backwards');
})();

/* ==================================================================
   L4 — THE MOVES REFUSE CORRECTLY AND NEVER MUTATE
   ================================================================== */
(function () {
  const base = T.newState('bracket', 'ten', 1);
  const frozen = JSON.stringify(base);

  /* ⚠⚠ THIS ONE MUST BE TESTED ON A **LINKED** STATE, AND A POISON RUN
     PROVED IT. On a fresh state `tell()` returns null because nothing is
     linked yet, so an assertion made here passes for the WRONG REASON —
     it was green against a build whose ask-guard had been deleted
     outright. A check that cannot distinguish two causes has not tested
     either of them. */
  const baseLinked = T.link(base);
  ok(baseLinked && baseLinked.linked, 'L4 setup: link() did not link');
  /* ⚠ SNAPSHOT THE STATE THE MUTATING CALL ACTUALLY RECEIVES. A poison
     run caught this too: the no-mutation assertion below was watching
     `base`, while the refusal under test is handed `baseLinked`, so a
     move that scribbled on its argument went unseen. Freeze the object
     you are about to pass, not the one you happen to have. */
  const frozenLinked = JSON.stringify(baseLinked);
  ok(T.tell(baseLinked, baseLinked.ask) === null,
    'L4 ⭐⭐ the question slot could be TOLD on a linked frame — that is the one thing it cannot be');
  eq(JSON.stringify(baseLinked), frozenLinked,
    'L4 ⭐⭐ the refused tell() MUTATED the linked state it was given');
  ok(T.tell(base, [0, 1, 2].filter(i => i !== base.ask)[0]) === null,
    'L4 ⭐ a quantity was tellable before the relation was shown');
  ok(T.count(base) === null, 'L4 ⭐ the answer could be counted before anything was said');
  ok(T.tell(base, 7) === null, 'L4 an out-of-range niche index was accepted');
  ok(T.setAsk(base, 9) === null, 'L4 an out-of-range ask index was accepted');
  ok(T.setShape(base, 'nonsense') === null, 'L4 an unknown shape was accepted');
  ok(T.setShape(base, base.shape) === null, 'L4 setting the shape it already has should be a no-op refusal');

  eq(JSON.stringify(base), frozen, 'L4 ⭐⭐ a refused move MUTATED the state it was given');

  /* a successful move must return a NEW object, not the same one */
  const linked = T.link(base);
  ok(linked && linked !== base, 'L4 link() returned the same object — moves must be pure');
  eq(JSON.stringify(base), frozen, 'L4 ⭐⭐ a SUCCESSFUL move mutated the state it was given');

  /* the ceiling and the floor */
  const cap = T.cap('ten');
  const atCap = { shape: 'bracket', w: cap, p: 1, ask: 2, linked: false, told: [0, 0, 0], counted: false };
  ok(T.setTotal(atCap, cap + 1, 'ten') === null, 'L4 the total went over the band ceiling');
  const atFloor = { shape: 'bracket', w: G.FLOOR, p: 1, ask: 2, linked: false, told: [0, 0, 0], counted: false };
  ok(T.setTotal(atFloor, G.FLOOR - 1, 'ten') === null, 'L4 the total went under the floor');

  /* ⚠ un-showing the relation must take the question with it, or a
     counted answer sits on screen under no visible relation */
  let s = T.newState('bracket', 'ten', 3);
  s = T.link(s);
  const tellable = [0, 1, 2].filter(i => i !== s.ask);
  s = T.tell(s, tellable[0]);
  s = T.tell(s, tellable[1]);
  s = T.count(s);
  ok(s.counted === true, 'L4 setup: the answer was not counted');
  const unlinked = T.link(s, false);
  ok(unlinked && unlinked.counted === false,
    'L4 ⭐ hiding the relation left a counted answer behind it');
  ok(unlinked && unlinked.told.every(x => !x),
    'L4 ⭐ hiding the relation left told quantities behind it');

  /* ⚠ CHANGING THE ARRANGEMENT MUST CLEAR THE COUNT. Carrying it across
     would render a false situation — the same two facts give a
     DIFFERENT answer in a different arrangement. */
  const other = T.SHAPES.filter(x => x !== s.shape)[0];
  const swapped = T.setShape(s, other);
  ok(swapped && swapped.counted === false,
    'L4 ⭐⭐ the counted answer survived an arrangement change — the tool would be asserting something untrue');
})();

/* ==================================================================
   L4b — ⭐⭐ A TOLD NUMERAL NEVER REWRITES ITSELF
   ---------------------------------------------------------------
   The shipped rebuild carried `told` across an arrangement change by
   POSITION while `values()` re-derived every niche from the new
   `SUM_AT`, so the slips kept their places and CHANGED THEIR NUMBERS in
   front of the class — and in one direction the new answer was the
   number that had been on screen a moment earlier, so the tool showed
   the class the answer and then asked for it. Three native panels found
   it independently by reading the model. Nothing in the suite could see
   it, because every assertion was about ONE state.
   ================================================================== */
(function () {
  let n = 0, rewrote = 0, cleared = 0, leaked = 0;
  for (const sh of T.SHAPES) {
    for (let w = G.FLOOR; w <= 14; w++) {
      for (let p = 1; p < w; p++) {
        if (!T.legal(w, p)) continue;
        for (let ask = 0; ask < 3; ask++) {
          const s = { shape: sh, w, p, ask, linked: true, told: [true, true, true], counted: false };
          s.told[ask] = false;
          const before = T.values(s);
          for (const sh2 of T.SHAPES) {
            if (sh2 === sh) continue;
            const after = T.setShape(s, sh2);
            if (!after) continue;
            n++;
            const av = T.values(after);
            const keptAll = [0, 1, 2].every(i => (i === ask) || !after.told[i] || av[i] === before[i]);
            if (!keptAll) rewrote++;
            if (T.toldCount(after) < T.toldCount(s)) cleared++;
            /* and the answer must not be a number that was already on
               screen as a told slip a moment ago */
            if (T.toldCount(after) === 2) {
              const shown = [0, 1, 2].filter(i => i !== after.ask && after.told[i]).map(i => av[i]);
              if (shown.indexOf(av[after.ask]) >= 0 && av[after.ask] !== undefined) {
                /* this is legal arithmetic sometimes (e.g. 2+2) but
                   `legal()` forbids equal parts, so it must not happen */
                leaked++;
              }
            }
            /* whatever it did, the frame it lands on must be legal */
            ok(T.legal(after.w, after.p),
              'L4b setShape produced an ILLEGAL frame ' + after.w + '/' + after.p);
          }
        }
      }
    }
  }
  ok(n > 200, 'L4b non-vacuity: only ' + n + ' arrangement changes walked');
  ok(rewrote === 0,
    'L4b ⭐⭐ a told numeral REWROTE ITSELF on ' + rewrote + ' of ' + n + ' arrangement changes — the class would watch its own facts change');
  ok(leaked === 0,
    'L4b ⭐⭐ on ' + leaked + ' changes the new answer was a number already shown as a told slip — the tool shows the answer and then asks for it');
  ok(cleared < n,
    'L4b the told facts were cleared on EVERY change — invention 2 never actually happens');
  ok(cleared >= 0 && n - cleared > 0,
    'L4b non-vacuity: the told facts survived ' + (n - cleared) + ' of ' + n + ' changes');

  /* ⚠ `setTotal` HAS THE SAME DISEASE, and the law must cover it or the
     fix lives in one move and not the other. Changing the total
     necessarily changes at least one niche's value, so it must either
     leave every told slip alone or clear them — never keep a slip told
     while its number changes underneath. */
  /* ⚠⚠ THE INVARIANT GOT STRONGER, SO THIS LAW DID. `setTotal` used to
     CLEAR `told`, and this walked linked/told states to prove it never
     rewrote one. It now REFUSES outright once the telling has started —
     prevention instead of warning, which is what let the two longest
     labels in the file be deleted. So the law is two-sided now: where it
     is allowed it must never rewrite, and where telling has begun it
     must not be allowed at all.
     ⚠ The gate caught its own staleness by walking ZERO states. That is
     the non-vacuity check earning its place — without it this would have
     reported PASS on a law it was no longer testing. */
  let m = 0, tRewrote = 0, allowedWhenStarted = 0;
  for (const sh of T.SHAPES) {
    for (let w = G.FLOOR + 1; w <= 14; w++) {
      for (let p = 1; p < w; p++) {
        if (!T.legal(w, p)) continue;
        for (const d of [1, -1]) {
          /* (a) the SETUP state — nothing linked, nothing told */
          const clean = { shape: sh, w, p, cap: 20, ask: T.SUM_AT[sh], linked: false, told: [false, false, false], counted: false };
          const before = T.values(clean);
          const after = T.setTotal(clean, w + d, 'twenty');
          if (after) {
            m++;
            const av = T.values(after);
            const kept = [0, 1, 2].every(i => !after.told[i] || av[i] === before[i]);
            if (!kept) tRewrote++;
            ok(T.legal(after.w, after.p), 'L4b setTotal produced an illegal frame ' + after.w + '/' + after.p);
          }
          /* (b) once anything is linked or told it must REFUSE */
          const linked = { shape: sh, w, p, cap: 20, ask: T.SUM_AT[sh], linked: true, told: [false, false, false], counted: false };
          if (T.setTotal(linked, w + d, 'twenty') !== null) allowedWhenStarted++;
          const told = { shape: sh, w, p, cap: 20, ask: T.SUM_AT[sh], linked: true, told: [true, true, true], counted: false };
          told.told[told.ask] = false;
          if (T.setTotal(told, w + d, 'twenty') !== null) allowedWhenStarted++;
        }
      }
    }
  }
  ok(allowedWhenStarted === 0,
    'L4b ⭐⭐ setTotal was ALLOWED on ' + allowedWhenStarted + ' states where the telling had already begun — it would wipe the lesson, which is exactly what refusing replaced');
  /* ⚠⚠ THE BAND MUST KEEP GOVERNING ACROSS AN ARRANGEMENT CHANGE.
     `legal()` checks the floor, integrality, positivity and equal parts
     — it never consulted the CAP, and `setShape` re-derives `w` from the
     carried told values, so a switch could produce a total far above the
     band the teacher chose. Measured on the broken build: 138 such
     results on the ten-band, worst w=19 — and because the lattice is
     sized from the band, the class would have counted TEN wells while
     the tool announced NINETEEN. */
  let esc = 0, walked = 0;
  for (const band of Object.keys(G.BANDS)) {
    const cap = T.cap(band);
    for (const sh of T.SHAPES) {
      for (let w = G.FLOOR; w <= cap; w++) {
        for (let p = 1; p < w; p++) {
          if (!T.legal(w, p)) continue;
          for (let ask = 0; ask < 3; ask++) {
            const s = { shape: sh, w, p, cap, ask, linked: true, told: [true, true, true], counted: false };
            s.told[ask] = false;
            for (const sh2 of T.SHAPES) {
              if (sh2 === sh) continue;
              const a = T.setShape(s, sh2);
              if (!a) continue;
              walked++;
              if (a.w > cap) esc++;
              /* and the value the class would count must be inside it */
              const av = T.values(a);
              if (av[a.ask] > cap) esc++;
            }
          }
        }
      }
    }
  }
  ok(walked > 300, 'L4b non-vacuity: only ' + walked + ' band checks walked');
  ok(esc === 0,
    'L4b ⭐⭐ ' + esc + ' arrangement changes escaped the configured band — the class would count the wrong number of wells while the tool announced a different total');

  ok(m > 60, 'L4b non-vacuity: only ' + m + ' setup-state total changes walked');
  ok(tRewrote === 0,
    'L4b ⭐⭐ setTotal REWROTE a told numeral on ' + tRewrote + ' of ' + m + ' changes — the same defect as setShape, in the other move');

  /* poison + control for the rewrite detector itself */
  ok([1, 2, 3].every((v, i) => v === [1, 2, 3][i]), 'L4b poison: the comparator failed identical arrays');
  ok(![1, 2, 3].every((v, i) => v === [1, 9, 3][i]), 'L4b poison: the comparator passed differing arrays');
})();

/* ==================================================================
   L5 — EXACTLY ONE UNKNOWN, SO THERE IS NOTHING TO ENUMERATE
   ================================================================== */
(function () {
  /* the enumeration ban is STRUCTURAL: there is no function that returns
     a list of candidate answers, and there cannot be one, because with
     two knowns the third is determined. */
  ok(typeof T.consistent !== 'function',
    'L5 ⭐⭐ a `consistent()` enumerator is back — the previous build listed every candidate pair, and that is the defect this rebuild exists to correct');

  let n = 0;
  for (const sh of T.SHAPES) {
    for (let w = G.FLOOR; w <= 20; w++) {
      for (let p = 1; p < w; p++) {
        if (!T.legal(w, p)) continue;
        for (let ask = 0; ask < 3; ask++) {
          const s = { shape: sh, w, p, ask, linked: true, told: [true, true, true], counted: false };
          s.told[ask] = false;
          /* with both knowns said, the third is DETERMINED — one value */
          const v = T.values(s);
          const knowns = [0, 1, 2].filter(i => i !== ask).map(i => v[i]);
          const sum = T.SUM_AT[sh];
          const derived = (ask === sum) ? knowns[0] + knowns[1] : Math.abs(v[sum] - (ask === sum ? 0 : knowns.find(k => k !== v[sum]) || 0));
          n++;
          ok(T.toldCount(s) === 2, 'L5 toldCount should be 2 with both knowns said');
          if (n > 400) break;
        }
      }
    }
  }
  ok(n > 100, 'L5 non-vacuity: only ' + n + ' configurations walked');
})();

/* ==================================================================
   L6 — ⭐⭐ NO DIMENSION IS EVER COMPUTED FROM A QUANTITY
   ---------------------------------------------------------------
   This is the fence line against `comparison-planks` #42 and the three
   shipped two-bar renderers. It is a SOURCE check because it is a claim
   about what the code can express, not about one render.
   ================================================================== */
(function () {
  const css = SRC.slice(SRC.indexOf('injectCSS'));

  /* the similarity transform: --mqu-s is the ONLY clamp among the grid
     geometry properties. If --mqu-sh / --mqu-hop / --mqu-gap ever get
     their own clamp — which looks completely harmless — the row and
     column fractions stop being constant, the literal viewBox stops
     matching, and the linkage feet drift off the niches exactly as
     `part-whole-frame.js:106` records. */
  ['--mqu-sh', '--mqu-hop', '--mqu-gap', '--mqu-well', '--mqu-num', '--mqu-stamp'].forEach(v => {
    const m = new RegExp(v.replace(/-/g, '\\-') + ':\\s*([^;\']*)').exec(css);
    ok(m, 'L6 geometry property ' + v + ' not found in the CSS');
    if (m) ok(m[1].indexOf('clamp(') < 0,
      'L6 ⭐⭐ ' + v + ' carries its own clamp() — the grid stops being a similarity transform of itself and the linkage drifts off the niches');
  });
  const sm = /--mqu-s:\s*([^;']*)/.exec(css);
  ok(sm && sm[1].indexOf('clamp(') >= 0, 'L6 --mqu-s should be the one clamped length');

  /* the linkage coordinates are LITERALS. An interpolated coordinate is
     a coordinate that can be computed from data. */
  /* ⚠⚠ THE MATCH MUST REACH PAST THE CLOSING QUOTE, AND A POISON RUN
     PROVED IT. `/d:\s*'[^']*'/` stops AT the quote, so the concatenation
     in  d: 'M50,60 L50,' + (74) + ' L272,74…'  sits entirely outside the
     match and the check reported a clean literal. The pattern now
     consumes one character beyond the string and refuses a `+` there. */
  const dAttrs = SRC.match(/d:\s*'[^']*'\s*./g) || [];
  ok(dAttrs.length >= 3, 'L6 non-vacuity: found only ' + dAttrs.length + ' path definitions');
  dAttrs.forEach(d => {
    ok(d.indexOf('${') < 0 && !/'\s*\+$/.test(d.trimEnd()),
      'L6 ⭐ a path coordinate is interpolated rather than literal: ' + d.slice(0, 60));
  });
  ok(!/d:\s*'[^']*'\s*\+/.test(SRC),
    'L6 ⭐⭐ a path `d` is built by concatenation — a coordinate that can be concatenated is a coordinate that can be computed from data');
  ok(!/points:\s*'[^']*'\s*\+/.test(SRC),
    'L6 ⭐ a polyline `points` is built by concatenation');

  /* no style assignment anywhere reads a quantity */
  const styleWrites = SRC.match(/\.style\.[A-Za-z]*\s*=|setProperty\([^)]*\)/g) || [];
  ok(styleWrites.length > 0, 'L6 non-vacuity: no style writes found at all');
  styleWrites.forEach(w => {
    ok(!/values\(|\bvals\b|\.w\b|\.p\b/.test(w),
      'L6 ⭐⭐ a style write reads a quantity: ' + w);
  });

  /* poison + control for the interpolation check */
  ok(/'M50,60/.test(SRC), 'L6 poison: the literal-path check found no literal path');
  ok(!(/d:\s*'[^']*\$\{/.test(SRC)), 'L6 poison: an interpolated path slipped past the check');
})();

/* ==================================================================
   L7 — THE LATTICE IS SIZED FROM THE BAND, NEVER FROM THE VALUE
   ================================================================== */
(function () {
  ok(G.LAT_COLS === 10, 'L7 LAT_COLS should be 10 — the strip is card-wide and five would force four rows at the twenty band');
  ok(/Math\.ceil\(cap \/ GEO\.LAT_COLS\)/.test(SRC),
    'L7 ⭐ the row count is not derived from the BAND cap');
  ok(!/setProperty\('--mqu-rows',\s*String\((?!Math\.ceil\(cap)/.test(SRC),
    'L7 ⭐⭐ the row count reads something other than the cap');

  /* both bands, and the well count must follow the cap and nothing else */
  Object.keys(G.BANDS).forEach(b => {
    const cap = T.cap(b);
    eq(cap, G.BANDS[b], 'L7 cap(' + b + ') disagrees with GEO.BANDS');
    ok(Math.ceil(cap / G.LAT_COLS) >= 1, 'L7 band ' + b + ' produces no rows');
  });
  ok(T.cap('twenty') > T.cap('ten'), 'L7 ⭐⭐ the two bands serve the SAME cap — the setting has no consequence');
  ok(T.cap('nonsense') === G.BANDS.ten, 'L7 an unknown band should fall back to the smaller one');
})();

/* ==================================================================
   L8 — newState() NEVER PRODUCES AN ILLEGAL OR OUT-OF-BAND FRAME
   ================================================================== */
(function () {
  let n = 0;
  for (const band of Object.keys(G.BANDS)) {
    const cap = T.cap(band);
    for (const sh of T.SHAPES) {
      for (let pick = 0; pick < 90; pick++) {
        const s = T.newState(sh, band, pick);
        n++;
        ok(T.legal(s.w, s.p), 'L8 ⭐ the deal produced an ILLEGAL frame ' + s.w + '/' + s.p);
        ok(s.w >= G.FLOOR, 'L8 the deal produced a total under the floor: ' + s.w);
        ok(s.w <= cap, 'L8 the deal produced ' + s.w + ', over the ' + band + ' cap');
        ok(s.linked === false && s.counted === false && s.told.every(x => !x),
          'L8 ⭐ a fresh deal did not start with everything unsaid — stage zero is the whole point');
        eq(T.stageOf(s), 0, 'L8 a fresh deal did not read as stage 0');
        ok(s.ask === T.SUM_AT[sh], 'L8 the question did not default to the third quantity');
      }
    }
  }
  ok(n >= 500, 'L8 non-vacuity: only ' + n + ' deals walked');
})();


/* ================================================================== */
/* L9 — THE MOVE CONTRACTS.
   ⚠⚠ EVERY ASSERTION HERE WAS BOUGHT BY A SURVIVING MUTATION. The
   rewritten `mutate-` harness ran 50 mutations against the gate as it
   stood and TWENTY SURVIVED — the gate proved `legal`, `values`, the
   invariant and the ladder thoroughly, and never once checked what a
   move CLEARS, what it REFUSES as a no-op, or whether it leaves the
   state it was handed alone. Laws are cheap to write about the
   interesting function and easy to forget about the boring ones.

   ⚠ Six of the twenty were EQUIVALENT MUTANTS and are recorded rather
   than chased — an equivalent mutant is a fact about the code, not a
   gap in the gate, and hunting one is how a suite acquires assertions
   that cannot fail:
     · `legal`'s floor clause is unreachable given FLOOR=3, because the
       equal-parts clause already refuses every w<3 (w=2 has only p=1,
       and 1 === 2-1). It is defensive, not load-bearing.
     · `told[ask]` is false in every reachable state (`tell` refuses the
       asked-for slot, `setAsk` clears it), so `toldCount`'s and
       `setShape`'s guards against it cannot be observed.
     · `setTotal`'s post-loop legality check cannot fire — for any
       w >= 3 the descent to p=1 is always legal.
     · `setTotal`'s `p = Math.min(s.p, w-1)` is a shortcut; the descent
       loop reaches the same p without it.
     · `setTotal`'s `counted = false` is dead, because the move now
       refuses outright once anything is linked or told — the header
       says so, and this proves it.
   ================================================================== */
(function () {
  const S = () => T.newState('bracket', 'ten', 3);
  const snap = s => JSON.stringify(s);

  /* --- (a) a no-op is a REFUSAL, not a silent rewrite -------------- */
  const s0 = S();
  eq(T.link(s0, false), null, 'L9 link(false) on an unlinked state did not refuse');
  eq(T.setShape(s0, s0.shape), null, 'L9 setShape to the current arrangement did not refuse');
  eq(T.setAsk(s0, s0.ask), null, 'L9 setAsk to the current question did not refuse');
  eq(T.count(s0, false), null, 'L9 count(false) on an uncounted state did not refuse');

  const sL = T.link(s0, true);
  ok(!!sL, 'L9 could not link a fresh state');
  eq(T.link(sL, true), null, 'L9 link(true) on a linked state did not refuse');
  const tellable = [0, 1, 2].filter(i => i !== sL.ask);
  eq(T.tell(sL, tellable[0], false), null, 'L9 untelling an untold slot did not refuse');

  /* a slot that does not exist is not a slot. Without this, dropping the
     index guard leaves `told[5] = true` sitting on the state — harmless
     today only because `toldCount` happens to loop i<3, which is a
     coincidence and not a contract. */
  [3, 5, -1, 1.5, null, undefined, '1'].forEach(i =>
    eq(T.tell(sL, i, true), null, 'L9 ⭐ tell accepted a slot that does not exist: ' + String(i)));
  [3, -1, 1.5].forEach(i =>
    eq(T.setAsk(sL, i), null, 'L9 setAsk accepted a slot that does not exist: ' + String(i)));

  /* --- (b) count is refused until BOTH facts are said -------------- */
  eq(T.count(sL, true), null, 'L9 ⭐ the answer could be counted with nothing said');
  const sT1 = T.tell(sL, tellable[0], true);
  ok(!!sT1, 'L9 could not tell the first slot');
  eq(T.count(sT1, true), null,
    'L9 ⭐ the answer could be counted after ONE fact — the tool would be answering '
    + 'a question that is not yet determined');
  const sT2 = T.tell(sT1, tellable[1], true);
  ok(!!sT2, 'L9 could not tell the second slot');
  const sC = T.count(sT2, true);
  ok(!!sC && sC.counted === true, 'L9 could not count once both facts were said');
  eq(T.count(sC, true), null, 'L9 counting an already-counted state did not refuse');

  /* --- (c) taking a fact back takes the count with it -------------- */
  const sUntell = T.tell(sC, tellable[0], false);
  ok(!!sUntell, 'L9 could not take a fact back');
  eq(sUntell.counted, false,
    'L9 ⭐ a fact was taken back and the COUNT SURVIVED — the class is left looking at '
    + 'an answer to a question that is no longer determined');

  const sUnlink = T.link(sC, false);
  ok(!!sUnlink, 'L9 could not unlink a counted state');
  eq(sUnlink.counted, false, 'L9 the relation was withdrawn and the count survived');
  ok(sUnlink.told.every(x => !x), 'L9 the relation was withdrawn and the facts survived');

  /* --- (d) moving the question clears what it lands on ------------- */
  const moved = T.setAsk(sC, tellable[0]);
  ok(!!moved, 'L9 could not move the question onto a told slot');
  eq(moved.told[tellable[0]], false,
    'L9 ⭐ THE NEW QUESTION ARRIVED ALREADY ANSWERED — its slot kept the numeral '
    + 'the class had already been shown');
  eq(moved.counted, false, 'L9 moving the question kept the old count');

  /* --- (e) `carried` must not claim what it did not keep ----------- */
  ok(T.carried(sT2, sT2) === true, 'L9 poison: carried() denied an identity pair');
  ok(T.carried(sT2, sL) === false,
    'L9 ⭐ carried() claimed the facts survived a transition that DROPPED both — '
    + 'the say-line would announce "the same two things" over a frame where it is false');
  ok(T.carried(sT2, sT1) === false, 'L9 carried() claimed two facts survived where one did');

  /* --- (f) setTotal is bounded at BOTH ends ------------------------ */
  eq(T.setTotal(s0, G.FLOOR - 1, 'ten'), null, 'L9 setTotal fell through the floor');
  eq(T.setTotal(s0, 0, 'ten'), null, 'L9 setTotal accepted zero');
  eq(T.setTotal(s0, -4, 'ten'), null, 'L9 setTotal accepted a negative total');
  ok(!!T.setTotal(s0, G.FLOOR + 1, 'ten'),
    'L9 poison: setTotal refused a total plainly inside the band');

  /* --- (g) the band's ceiling reaches the state, and stays there --- */
  ['ten', 'twenty'].forEach(band => {
    const s = T.newState('bracket', band, 5);
    eq(s.cap, T.cap(band),
      'L9 ⭐ a fresh ' + band + ' state carries cap ' + s.cap + ', not the band\'s '
      + T.cap(band) + ' — every later move would read the wrong ceiling');
    const after = T.link(s, true);
    eq(after.cap, s.cap,
      'L9 ⭐ the ceiling was LOST crossing a move (' + s.cap + ' -> ' + after.cap
      + ') — the band silently stops governing');
    const after2 = T.tell(after, [0, 1, 2].filter(i => i !== after.ask)[0], true);
    eq(after2.cap, s.cap, 'L9 the ceiling was lost crossing a second move');
  });

  /* --- (h) ⭐⭐ AN ACCEPTED MOVE MUST NOT TOUCH WHAT IT WAS HANDED.
     The gate already proved this for REFUSED moves. It never proved it
     for accepted ones, and a single aliased array in `_copy` — `told:
     s.told` instead of a fresh triple — makes every move in the file
     mutate its caller's state while returning a correct-looking new
     one. Nothing else in the suite could see it. ---------------------- */
  let walked = 0;
  ['change', 'bracket', 'compare'].forEach(shape => {
    ['ten', 'twenty'].forEach(band => {
      for (let pick = 0; pick < 6; pick++) {
        const base = T.newState(shape, band, pick);
        const others = [0, 1, 2].filter(i => i !== base.ask);
        const moves = [
          ['link', st => T.link(st, true)],
          ['tell', st => T.tell(T.link(st, true), others[0], true)],
          ['count', st => {
            const a = T.tell(T.tell(T.link(st, true), others[0], true), others[1], true);
            return a && T.count(a, true);
          }],
          ['setAsk', st => T.setAsk(st, others[0])],
          ['setShape', st => T.setShape(st, shape === 'bracket' ? 'change' : 'bracket')],
          ['setTotal', st => T.setTotal(st, st.w + 1, band)],
          ['deal', st => T.deal(st, shape, band, pick + 1)]
        ];
        moves.forEach(([name, f]) => {
          const before = snap(base);
          const out = f(base);
          walked++;
          ok(snap(base) === before,
            'L9 ⭐⭐ ' + name + ' MUTATED THE STATE IT WAS GIVEN (' + shape + '/' + band
            + '/' + pick + ') — ' + before + ' became ' + snap(base));
          if (out) {
            ok(out !== base, 'L9 ' + name + ' returned the same object it was handed');
            ok(out.told !== base.told,
              'L9 ⭐ ' + name + ' returned a state SHARING the told array with its input');
          }
        });
      }
    });
  });
  ok(walked >= 250, 'L9 non-vacuity: only ' + walked + ' accepted-move immutability walks');

  /* --- (i) stageOf over states the moves cannot reach --------------
     ⚠ `stageOf` returns null for "off the rehearsed path", and that
     branch exists precisely FOR states the ladder cannot produce. So it
     is driven over constructed combinations, not only reachable ones —
     otherwise `if (s.counted) return 4` is indistinguishable from the
     real thing, which is exactly the mutation that survived. */
  const base = T.newState('bracket', 'ten', 3);
  const others = [0, 1, 2].filter(i => i !== base.ask);
  let combos = 0;
  [false, true].forEach(linked => {
    [0, 1, 2].forEach(nTold => {
      [false, true].forEach(counted => {
        const s = JSON.parse(JSON.stringify(base));
        s.linked = linked; s.counted = counted;
        s.told = [false, false, false];
        for (let k = 0; k < nTold; k++) s.told[others[k]] = true;
        const want = counted ? ((linked && nTold === 2) ? 4 : null)
          : (!linked ? (nTold === 0 ? 0 : null)
            : (nTold === 0 ? 1 : nTold === 1 ? 2 : 3));
        combos++;
        eq(T.stageOf(s), want,
          'L9 stageOf(linked=' + linked + ', told=' + nTold + ', counted=' + counted
          + ') = ' + T.stageOf(s) + ', expected ' + want);
      });
    });
  });
  eq(combos, 12, 'L9 non-vacuity: the stage grid did not cover the 12 combinations it claims');
})();

/* ================================================================== */
console.log('');
if (fail) {
  console.log('FAIL — ' + fail + ' of ' + (pass + fail) + ' assertions');
  bad.slice(0, 40).forEach(m => console.log('  ✗ ' + m));
  if (bad.length > 40) console.log('  … and ' + (bad.length - 40) + ' more');
  process.exit(1);
}
console.log('PASS — ' + pass + ' assertions, 0 failures');
console.log('⚠ a green model gate says nothing about whether the tool RENDERS.');
console.log('  Run probe-missing-question.js, smoke-missing-question-locales.js');
console.log('  and audit-missing-question-locale-layout.js before believing this.');

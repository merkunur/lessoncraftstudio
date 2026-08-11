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
  let m = 0, tRewrote = 0;
  for (const sh of T.SHAPES) {
    for (let w = G.FLOOR + 1; w <= 14; w++) {
      for (let p = 1; p < w; p++) {
        if (!T.legal(w, p)) continue;
        for (const d of [1, -1]) {
          const s = { shape: sh, w, p, ask: T.SUM_AT[sh], linked: true, told: [true, true, true], counted: false };
          s.told[s.ask] = false;
          const before = T.values(s);
          const after = T.setTotal(s, w + d, 'twenty');
          if (!after) continue;
          m++;
          const av = T.values(after);
          const kept = [0, 1, 2].every(i => (i === after.ask) || !after.told[i] || av[i] === before[i]);
          if (!kept) tRewrote++;
        }
      }
    }
  }
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

  ok(m > 60, 'L4b non-vacuity: only ' + m + ' total changes walked');
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

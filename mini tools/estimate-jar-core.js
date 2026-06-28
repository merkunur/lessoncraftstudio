/* =====================================================================
   CORE — Estimate Jar  (estimate-jar-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "predict a magnitude → verify it by counting a
   STABLE SET one-to-one → witness guess-vs-truth" cognition (the spec's
   `engine-estimate-jar.js`). First skin: "The Wondering Jar" — CCSS K.CC.B.5
   (count to answer "how many?" up to 20 in a line/array/circle, ≤10 scattered).
   Head of the predict-then-check / experiment-measure family.

   THE PEDAGOGY (binding): CCSS-K has NO estimation standard → the GRADED spine
   is the verified one-to-one COUNT; the ESTIMATE is honored-NEVER-graded (a
   wish can't be wrong, never scored). `validate` gates on counted===actual
   INDEPENDENT of the guess.

   TWO LOCKED ANTI-CHEATS:
     • CLUMP-THEN-SPREAD — the guess locks against an uncountable clumped jar
       (`renderableState` at 'estimate' exposes NO items / NO count; `getActual`
       THROWS pre-'compare') → eye-count-then-slide-to-the-actual is impossible.
     • COUNT-A-STABLE-SET, NOT A CONVEYOR — `countItem` is the SOLE count-
       advancer; `counted` is a Set keyed by item-id, re-tag is inert (no +1,
       no number word). Reaching counted===actual REQUIRES N DISTINCT items →
       a same-item-N-times / watch-the-movie solver FAILS the gate. NO auto-
       spawn / auto-position / auto-recite path exists.

   NO ACCURACY GRADIENT: `compareDir` returns the SIGN only (same/fewer/more);
   no distance metric, no stored gap, no "close/far". Pure functions, no DOM.
   Mirrors count-twin / bead-string / compound-order cores.
   ===================================================================== */
(function (global) {
  'use strict';

  var MAXN = 20, SCATTER_CAP = 10;

  function actualOf(round) { return round.items.length; }                 // DERIVED — never a stored scalar
  function isScatter(round) { return round.arrangement === 'scatter'; }
  function isOnRamp(round) { return round.assessment === false; }

  /* fresh per-round state the ACTIVITY owns; the SOLVERS make their own */
  function newState(round) { return { stage: 'estimate', guess: null, counted: {}, _trace: [] }; }

  /* the wish — accepts ANY v∈[0,20]; honored, NEVER graded. Advances to count. */
  function lockGuess(round, state, v) {
    v = Math.max(0, Math.min(MAXN, Math.round(Number(v) || 0)));
    state.guess = v; state.stage = 'count';
    return { guess: v };
  }

  /* the SOLE count-advancer — tag a DISTINCT item once. Re-tag / wrong-stage =
     inert (no +1, no number word). Reaching all-distinct flips to 'compare'. */
  function countItem(round, state, id) {
    if (state.stage !== 'count') return { changed: false, count: countOf(state) };
    if (state.counted[id]) return { changed: false, count: countOf(state) };   // re-tag inert (the conveyor guard)
    state.counted[id] = true; state._trace.push(id);
    var c = countOf(state);
    if (c >= actualOf(round)) state.stage = 'compare';
    return { changed: true, count: c, spoke: c };                              // number word speaks ONLY here
  }
  function countOf(state) { return Object.keys(state.counted).length; }
  function isCounted(state, id) { return !!state.counted[id]; }

  /* validity DERIVED — counted===actual, INDEPENDENT of the guess */
  function validate(round, state) { return countOf(state) === actualOf(round); }

  /* the actual cardinal is available ONLY at compare (you must COUNT to get it) */
  function getActual(round, state) {
    if (!state || state.stage !== 'compare') throw new Error('actual is not available before the count is finished');
    return actualOf(round);
  }

  /* the compare — SIGN only (actual relative to the wish), never a magnitude */
  function compareDir(guess, actual) { return actual === guess ? 'same' : (actual > guess ? 'more' : 'fewer'); }

  /* the ONLY projection a skin / in-DOM solver may read. At estimate the jar is
     CLUMPED — NO items, NO count, NO actual. The actual surfaces only at compare. */
  function renderableState(round, state) {
    state = state || newState(round);
    if (state.stage === 'estimate') {
      return { stage: 'estimate', guess: state.guess, clumped: true, benchmarks: round.benchmarks || [5, 10, 20] };
    }
    if (state.stage === 'count') {
      var items = round.items.map(function (it, i) { return { id: it.id != null ? it.id : i, sprite: it.sprite, hue: it.hue, counted: !!state.counted[it.id != null ? it.id : i] }; });
      return { stage: 'count', guess: state.guess, items: items, count: countOf(state) };   // NO 'actual' scalar
    }
    return { stage: state.stage, guess: state.guess, actual: actualOf(round), dir: compareDir(state.guess, actualOf(round)) };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */

  // the UNIQUE passing class: tag N distinct items → compare, counted===actual.
  function distinctItemCounter(round) {
    var s = newState(round); lockGuess(round, s, 7);
    round.items.forEach(function (it, i) { countItem(round, s, it.id != null ? it.id : i); });
    return { solved: validate(round, s), count: countOf(s), traceLen: s._trace.length };
  }
  // zero child events + a fake clock → the count never advances (no auto path).
  function watchTheMovieSolver(round) {
    var s = newState(round); lockGuess(round, s, 7);
    for (var t = 0; t < 600; t++) { /* "watch" — no countItem calls */ }
    return { solved: validate(round, s), count: countOf(s) };
  }
  // taps the SAME id N times → counted.size===1 → never reaches actual (N>1).
  function sameItemRepeatSolver(round) {
    var s = newState(round); lockGuess(round, s, 7);
    var id = round.items[0].id != null ? round.items[0].id : 0;
    for (var i = 0; i < actualOf(round) + 5; i++) countItem(round, s, id);
    return { solved: validate(round, s), count: countOf(s) };
  }
  // tries to read the actual at estimate (pre-spread) → throws / no answer field.
  function slideToLeakedActualSolver(round) {
    var s = newState(round); // stage 'estimate'
    var leaked = false, threw = false;
    try { getActual(round, s); leaked = true; } catch (e) { threw = true; }
    var rs = renderableState(round, s);
    var hasAnswerField = Object.keys(rs).some(function (k) { return rs[k] === actualOf(round); });
    return { leaked: leaked || hasAnswerField, threwPreCompare: threw };
  }
  // proves the estimate is honored-never-graded: any value locks; validate is
  // independent of the guess; no score/distance field is created.
  function estimateGradedProbe(round) {
    var s = newState(round); lockGuess(round, s, 0);                 // wildest possible wish
    round.items.forEach(function (it, i) { countItem(round, s, it.id != null ? it.id : i); });
    var advanced = validate(round, s);                              // true even though guess=0
    // honored-never-graded: state carries ONLY the known counting keys — no
    // extra "how wrong was the wish" field of any name was created.
    var ALLOWED = { stage: 1, guess: 1, counted: 1, _trace: 1 };
    var hasScore = Object.keys(s).some(function (k) { return !ALLOWED[k]; });
    return { advancedWithGuessZero: advanced, hasScoreField: hasScore };
  }

  global.EstimateJarCore = {
    MAXN: MAXN, SCATTER_CAP: SCATTER_CAP,
    newState: newState, lockGuess: lockGuess, countItem: countItem, countOf: countOf, isCounted: isCounted,
    validate: validate, getActual: getActual, compareDir: compareDir, renderableState: renderableState,
    actualOf: actualOf, isScatter: isScatter, isOnRamp: isOnRamp,
    SOLVERS: {
      distinctItemCounter: distinctItemCounter, watchTheMovieSolver: watchTheMovieSolver,
      sameItemRepeatSolver: sameItemRepeatSolver, slideToLeakedActualSolver: slideToLeakedActualSolver,
      estimateGradedProbe: estimateGradedProbe
    }
  };

}(typeof window !== 'undefined' ? window : this));

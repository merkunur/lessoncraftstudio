/* =====================================================================
   CORE — Bead String  (bead-string-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "the NUMBER OUTLIVES the ARRANGEMENT" cognition
   (the spec's `engine-bead-string.js`). First skin: "The Necklace That Won't
   Hold Still" — CCSS K.CC.B.4 (one-to-one correspondence = the MECHANIC;
   cardinality = the GRADE; conservation = the DEMONSTRATED signature).

   The SPINE: a friend's necklace is counted ONE-TO-ONE, then disturbed/hidden
   (narrated first), then the child PRODUCES or RE-COUNTS to the remembered
   count. The cognition is "the count is a stable property I hold" — distinct
   from Game 12 Twinsies (a static-VISIBLE decorrelated match) and Game 13
   (count-ON from a given number).

   THE NON-NEGOTIABLE INVARIANT: correctness = COUNT-EQUALITY ONLY — never
   color order, never arrangement. `validate` takes ONLY a count → color/order
   are not even inputs → color-copying provably can't win, and a right-count /
   wrong-color necklace is ACCEPTED (that acceptance IS conservation).

   The produced count exists ONLY as the integer emitted by the guarded
   `thread()` events on the SKIN side (`_busy` rAF lock → bulk impossible;
   `_consumed` Set → double impossible; no count channel outside thread/
   unthread → rote-decoupled impossible). This CORE is pure: validity DERIVED
   (`count === targetCount`, no stored on-screen answer), feedback BINARY
   (no direction), `getRenderableState` NEVER leaks the target. Pure functions,
   no DOM. Mirrors count-twin / compound-order / retell-story cores.

   CONSERVATION DEMONSTRATED-NOT-TESTED: every disturbance kind is
   ARRANGEMENT-ONLY (hide/bunch/spread/scatter) — none adds/removes a bead →
   the count never actually changes in a conservation round; no win-condition
   branches on "did it change," and there is no "is it still the same?" gate.
   ===================================================================== */
(function (global) {
  'use strict';

  var SUBITIZE_CAP = 5;                       // exact subitizing tops out ~5; N≥6 needs one-to-one

  function targetN(round) { return round.targetCount; }
  function capacityFor(round) { return Math.max(round.targetCount + 3, 10); } // palette ALWAYS supplies > N
  function isOnRamp(round) { return round.assessment === false; }
  function requiresDisturbance(round) { return !!(round.disturbance && round.disturbance.narratedBefore); }
  function hasModel(round) { return !round.heardTarget; }     // #6 thread-to-a-heard-number shows NO model

  /* validity DERIVED — count-EQUALITY ONLY. Color/order/arrangement are NOT
     inputs → a right-count/wrong-color necklace is accepted (= conservation). */
  function validate(round, count) { return count === round.targetCount; }

  /* the ONLY feedback channel — BINARY, undirected. feedback(n−1) and
     feedback(n+1) MUST be byte-identical (the anti-nudge keystone). */
  function feedback(round, count) { return { clasp: count === round.targetCount }; }

  /* the ONLY projection the skin / an in-DOM solver may read. Model beads carry
     label:'bead' (NEVER an ordinal); the produced count + placed + spoken are
     the child's own work; the TARGET is NEVER exposed (the child must count). */
  function getRenderableState(round, state) {
    state = state || {};
    var n = hasModel(round) ? round.model.n : 0;
    var model = [];
    for (var i = 0; i < n; i++) model.push({ label: 'bead', counted: !!(state.modelCounted && state.modelCounted[i]) });
    return {
      modelBeads: model,                       // NO ordinal, NO number
      count: state.count || 0,                 // the child's produced count (derived)
      placed: (state.placed || []).slice(),
      spoken: state.spoken || 0,
      stage: state.stage || 'count-model'
      // NOTE: round.targetCount is deliberately absent.
    };
  }

  /* CONSERVATION teeth: every disturbance kind is arrangement-only (no add/
     remove) → the count is invariant under it. */
  var ARRANGEMENT_ONLY = { hide: 1, bunch: 1, spread: 1, scatter: 1 };
  function disturbanceChangesCount(round) {
    return !!(round.disturbance && !ARRANGEMENT_ONLY[round.disturbance.kind]);
  }

  /* ----- the SOLVER gauntlet (the gate drives these against the REAL core) -----
     Each solver returns the COUNT it would submit for a round. Honest = target. */

  // the UNIQUE passing class: count each model bead one-to-one (or count to the
  // heard number) → the target. Passes EVERY round.
  function oneToOneCounter(round) { return round.targetCount; }

  // threads the WRONG color order, producing a count tied to the palette period
  // (e.g. 2 for red/blue), NOT the quantity → ≠ target → FAILS. (The companion
  // proof that color is irrelevant is `wrongColorCounter`, which threads the
  // right COUNT in the wrong colors → PASSES.)
  function colorCopySolver(round) { return (round.model && round.model.palette ? round.model.palette.length : 2); }
  function wrongColorCounter(round) { return round.targetCount; }   // right count, wrong colors → must PASS

  // recites/calls nothing — no count-mutating method outside thread/unthread,
  // so count stays 0 → never reaches the target. FAILS all (target ≥ 1).
  function roteDecoupledSolver(/*round*/) { return 0; }

  // a single-frame burst — the `_busy` rAF lock admits ≤1 thread/frame → 1.
  // FAILS every round with target > 1.
  function bulkSubitizeSolver(/*round*/) { return 1; }

  // subitizes the MODEL instead of counting one-to-one — exact only to ~5.
  // FAILS on N≥6 (returns the cap); legit on the N≤5 on-ramp.
  function modelSubitizeSolver(round) { return round.targetCount <= SUBITIZE_CAP ? round.targetCount : SUBITIZE_CAP; }

  // trusts the FIRST / naive-visible read and never re-enumerates after the
  // disturbance changed the node-set (scatter disorder, an injected skip/double,
  // or no model at all → 0). FAILS exactly the rounds that REQUIRE re-enumeration
  // — the assertion that makes this game need what Twinsies doesn't.
  function cacheTheCountSolver(round) { return ('naiveCount' in round) ? round.naiveCount : round.targetCount; }

  // the cardinality-confirm round (#5) accepts ONLY the value the child's count
  // PRODUCED — there is no free keypad. A solver that types a number without
  // counting submits a count of 0 → rejected. FAILS #5.
  function keypadExhaustionSolver(round) { return round.confirmFromCount ? 0 : round.targetCount; }

  // the respond-to-the-nudge hill-climb: submit → read BINARY feedback → adjust.
  // The binary channel carries NO direction, so seeFeedback gives only a random
  // ±1 step (no localizing signal) — the #10 / count-twin seen-vs-blind analog.
  function nudgeClimber(round, rng, opts) {
    var K = opts.K || 40, cap = capacityFor(round), placed = 1 + Math.floor(rng() * cap);
    for (var t = 0; t < K; t++) {
      if (feedback(round, placed).clasp) return { placed: placed, calls: t + 1, solved: true };
      if (opts.seeFeedback) { placed = placed + (rng() < 0.5 ? -1 : 1); if (placed < 1) placed = 1; if (placed > cap) placed = cap; }
      else { placed = 1 + Math.floor(rng() * cap); }
    }
    return { placed: placed, calls: K, solved: false };
  }

  global.BeadStringCore = {
    validate: validate, feedback: feedback, getRenderableState: getRenderableState,
    targetN: targetN, capacityFor: capacityFor, isOnRamp: isOnRamp,
    requiresDisturbance: requiresDisturbance, hasModel: hasModel,
    disturbanceChangesCount: disturbanceChangesCount, SUBITIZE_CAP: SUBITIZE_CAP,
    SOLVERS: {
      oneToOneCounter: oneToOneCounter,
      colorCopySolver: colorCopySolver, wrongColorCounter: wrongColorCounter,
      roteDecoupledSolver: roteDecoupledSolver, bulkSubitizeSolver: bulkSubitizeSolver,
      modelSubitizeSolver: modelSubitizeSolver, cacheTheCountSolver: cacheTheCountSolver,
      keypadExhaustionSolver: keypadExhaustionSolver, nudgeClimber: nudgeClimber
    }
  };

}(typeof window !== 'undefined' ? window : this));

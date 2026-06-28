/* =====================================================================
   CORE — Ten-Frame Tank  (ten-frame-tank-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "UNITIZING — a complete ten becomes ONE wielded
   unit" cognition (the spec's `engine-ten-frame-tank.js`). First skin:
   "Dewey's Ten-Tank" — CCSS K.NBT.A.1 (compose/decompose 11–19 into a ten and
   some ones, recorded 10 + N). Head of the base-ten / physical-metaphor family.

   THE SPINE: the double ten-frame "tank" — left = the sealed TEN (one unit),
   right = the ONES (caps at 9). The graded cognition is unitizing: a complete
   ten SEALS into a single composite unit the child wields; a teen is built/read
   as ten + ones, recorded 10 + N.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • THE TEN IS ONE SEALED UNIT — there is NO function that places a loose
       single into the left frame (`singleDotPlacedInLeft` is an invariant 0);
       `validate` REQUIRES `sealedTenPlaced` → 13 loose singles is unconstructible.
     • THE READY-MADE TEN IS VISIBLY TEN, NEVER A TOKEN — `tenUnitSubDots()`===10
       (a 2×5 frame), and `placeReadyTen` is REFUSED until `sealedThisSession`
       (the gate-ordered #1→#2 lock — the child must have SEEN ten get made).
     • THE SEAL COLLAPSES 10→1 — completing a ten flips ten in-progress dots to
       one `sealedTenPlaced` unit.
     • NO MOTOR-TIMING — every transition is synchronous; nothing is clocked.
     • DECOMPOSE = SEPARATE, NOT CRACK — the ten moves to the tens-tray AS a
       unit; it never bursts into singles on any win-path.

   Pure functions, no DOM. Mirrors count-twin / estimate-jar / bead-string cores.
   ===================================================================== */
(function (global) {
  'use strict';

  var ONES_CAP = 9, TEN = 10;

  function tensOf(round) { return Math.floor(round.target / 10); }     // DERIVED — always 1 for 11–19
  function onesOf(round) { return round.target % 10; }                 // DERIVED — 1–9
  function isOnRamp(round) { return round.assessment === false; }
  function tenUnitSubDots() { return TEN; }                            // the ready-made ten ALWAYS shows 10 sub-dots

  function newState(round, sessionSealed) {
    // decompose (#3) + repair (#5) START from a pre-shown structure whose ten
    // already exists (the child separates / fixes it) → the ten is sealed from
    // the outset; it is moved/kept AS a unit, never re-built from singles.
    var prebuiltTen = (round.mode === 'decompose' || round.type === 'repair');
    return {
      type: round.type, mode: round.mode, target: round.target,
      tenInProgress: prebuiltTen ? TEN : 0,   // dots filling the left frame toward a seal (#1)
      sealedTenPlaced: prebuiltTen,
      singleDotPlacedInLeft: 0,         // INVARIANT 0 — no function ever increments this
      sealedThisSession: !!sessionSealed,
      looseOnes: 0,                     // regroup (#4): loose ones not yet sealed
      ones: 0,                          // ones placed in the right frame
      // decompose (#3):
      tenInTensTray: false, onesInOnesTray: 0,
      // repair (#5):
      presetOnes: (round.preset && typeof round.preset.ones === 'number') ? round.preset.ones : 0,
      fixCommitted: false,
      // compare (#7):
      revealedA: false, revealedB: false, picked: null,
      won: false
    };
  }

  /* ---- #1 compose-by-completing-and-sealing: build the left frame, seal at 10 ---- */
  function addToTen(round, state) {
    if (state.sealedTenPlaced) return { changed: false };
    if (state.tenInProgress >= TEN) return { changed: false };
    state.tenInProgress++;
    if (state.tenInProgress === TEN) { seal(state); return { changed: true, sealed: true }; }
    return { changed: true, count: state.tenInProgress };
  }
  function seal(state) { state.sealedTenPlaced = true; state.sealedThisSession = true; state.tenInProgress = TEN; state.looseOnes = 0; }

  /* ---- #2 compose-by-placing-a-ready-made-ten: REFUSED until the child sealed one ---- */
  function canPlaceReadyTen(state) { return !!state.sealedThisSession; }   // the #1→#2 ordering lock
  function placeReadyTen(round, state) {
    if (!canPlaceReadyTen(state)) return { rejected: true, reason: 'must-seal-first' };
    if (state.sealedTenPlaced) return { changed: false };
    state.sealedTenPlaced = true;
    return { changed: true };
  }

  /* ---- ones: the SOLE ones-advancer. Cap 9 (the 10th refused) EXCEPT regroup,
          where the 10th loose AUTO-SNAPS into a sealed ten. ---- */
  function placeOne(round, state) {
    if (state.mode === 'regroup' && !state.sealedTenPlaced) {
      state.looseOnes++;
      if (state.looseOnes === TEN) { seal(state); return { changed: true, snapped: true }; }
      return { changed: true, loose: state.looseOnes };
    }
    if (state.ones >= ONES_CAP) return { rejected: true, reason: 'would-make-a-ten' };
    state.ones++;
    return { changed: true, ones: state.ones };
  }
  function removeOne(round, state) { if (state.ones > 0) { state.ones--; return { changed: true }; } if (state.looseOnes > 0) { state.looseOnes--; return { changed: true }; } return { changed: false }; }
  function removeTen(round, state) { if (state.sealedTenPlaced) { state.sealedTenPlaced = false; state.tenInProgress = 0; return { changed: true }; } return { changed: false }; }

  /* ---- #3 decompose: move the sealed ten AS a unit + the ones, into trays ---- */
  function dragTenToTens(round, state) { if (state.tenInTensTray) return { changed: false }; state.tenInTensTray = true; return { changed: true }; }
  function dragOneToOnes(round, state) { if (state.onesInOnesTray >= onesOf(round)) return { changed: false }; state.onesInOnesTray++; return { changed: true }; }

  /* ---- #5 repair: pick the correct missing-count (a single committed fix; NOT incremental) ---- */
  function repairOptions(round) {
    var need = onesOf(round) - (round.preset ? round.preset.ones : 0);   // the correct "+K more"
    var opts = [need, need + 1, Math.max(0, need - 1)];
    var seen = {}, out = []; opts.forEach(function (k) { if (!seen[k] && k >= 0) { seen[k] = 1; out.push(k); } });
    while (out.length < 3) { var c = out.length; if (!seen[c]) { seen[c] = 1; out.push(c); } else out.push(need + out.length); }
    return out.slice(0, 3);
  }
  function commitFix(round, state, k) {
    state.fixCommitted = true;
    state.sealedTenPlaced = true;                       // the preset already has the sealed ten
    state.ones = state.presetOnes + k;
    return { committed: true };
  }

  /* ---- #7 structural-compare: reveal BOTH, then judge by the ones ---- */
  function canJudge(state) { return state.revealedA && state.revealedB; }   // the reveal-both-first gate
  function reveal(state, which) { if (which === 'A') state.revealedA = true; else state.revealedB = true; return { changed: true }; }
  function compareByOnes(a, b) { var oa = a % 10, ob = b % 10; return oa === ob ? 'same' : (oa > ob ? 'A' : 'B'); }
  function judge(round, state, pick) { if (!canJudge(state)) return { rejected: true, reason: 'reveal-both-first' }; state.picked = pick; return { committed: true }; }

  /* ---- validity DERIVED per mode; compose REQUIRES a sealed ten + exact ones + 0 singles-in-left ---- */
  function validate(round, state) {
    if (round.mode === 'decompose') return state.tenInTensTray && state.onesInOnesTray === onesOf(round) && state.sealedTenPlaced;
    if (round.type === 'compare') return canJudge(state) && state.picked != null && state.picked === compareByOnes(round.comparePair[0], round.comparePair[1]);
    if (round.type === 'repair') return state.fixCommitted && state.sealedTenPlaced && state.ones === onesOf(round) && state.singleDotPlacedInLeft === 0;
    return state.sealedTenPlaced && state.ones === onesOf(round) && state.singleDotPlacedInLeft === 0;
  }

  function __TFT_TRACE__(round, state) {
    return {
      target: state.target, ones: state.ones, looseOnes: state.looseOnes,
      sealedTenPlaced: state.sealedTenPlaced, looseOnesPlaced: state.ones,
      singleDotPlacedInLeft: state.singleDotPlacedInLeft, tenUnitSubDots: tenUnitSubDots(),
      sealedThisSession: state.sealedThisSession, won: validate(round, state)
    };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */

  // the UNIQUE passing class: seal/place a ten + the exact ones (or separate / reveal-judge).
  function genuineComposer(round, sessionSealed) {
    var s = newState(round, sessionSealed != null ? sessionSealed : true);
    if (round.mode === 'decompose') { dragTenToTens(round, s); for (var d = 0; d < onesOf(round); d++) dragOneToOnes(round, s); return { won: validate(round, s) }; }
    if (round.type === 'compare') { reveal(s, 'A'); reveal(s, 'B'); judge(round, s, compareByOnes(round.comparePair[0], round.comparePair[1])); return { won: validate(round, s) }; }
    if (round.type === 'repair') { commitFix(round, s, onesOf(round) - s.presetOnes); return { won: validate(round, s) }; }
    if (round.type === 'ready-ten') { placeReadyTen(round, s); }
    else if (round.mode === 'regroup') { for (var r = 0; r < TEN; r++) placeOne(round, s); }
    else { for (var t = 0; t < TEN; t++) addToTen(round, s); }
    for (var o = 0; o < onesOf(round); o++) placeOne(round, s);
    return { won: validate(round, s) };
  }
  // tries to make a teen from loose singles — there is NO path to place a single
  // in the left frame, so `sealedTenPlaced` never becomes true → won false.
  function count13SinglesSolver(round) {
    var s = newState(round, true);
    for (var i = 0; i < round.target; i++) placeOne(round, s);   // every one lands in the ones frame (cap 9); the ten is never sealed
    return { won: validate(round, s), sealedTenPlaced: s.sealedTenPlaced, singleDotPlacedInLeft: s.singleDotPlacedInLeft };
  }
  // 7 + 6 across frames, no sealed ten → won false.
  function fillWithoutFullTenSolver(round) {
    var s = newState(round, true); for (var i = 0; i < 7; i++) placeOne(round, s);   // 7 ones (capped), no ten
    return { won: validate(round, s) };
  }
  // place-a-ready-ten BEFORE sealing one this session → refused (the #1→#2 lock).
  function tokenBeforeSealSolver(round) {
    var s = newState(round, false); var r = placeReadyTen(round, s);
    return { rejected: !!r.rejected, sealedTenPlaced: s.sealedTenPlaced, subDots: tenUnitSubDots() };
  }
  // random-pick repair / judge-without-revealing compare → fails the structural gate.
  function bruteForceSolver(round, rng) {
    var s = newState(round, true);
    if (round.type === 'repair') { var opts = repairOptions(round); commitFix(round, s, opts[Math.floor(rng() * opts.length)]); return { won: validate(round, s) }; }
    if (round.type === 'compare') { judge(round, s, rng() < 0.5 ? 'A' : 'B'); return { won: validate(round, s) }; }   // no reveal → canJudge false → no-op
    return { won: false };
  }

  global.TenFrameTankCore = {
    ONES_CAP: ONES_CAP, tensOf: tensOf, onesOf: onesOf, isOnRamp: isOnRamp, tenUnitSubDots: tenUnitSubDots,
    newState: newState, addToTen: addToTen, seal: seal, canPlaceReadyTen: canPlaceReadyTen, placeReadyTen: placeReadyTen,
    placeOne: placeOne, removeOne: removeOne, removeTen: removeTen,
    dragTenToTens: dragTenToTens, dragOneToOnes: dragOneToOnes,
    repairOptions: repairOptions, commitFix: commitFix,
    canJudge: canJudge, reveal: reveal, compareByOnes: compareByOnes, judge: judge,
    validate: validate, __TFT_TRACE__: __TFT_TRACE__,
    SOLVERS: {
      genuineComposer: genuineComposer, count13SinglesSolver: count13SinglesSolver,
      fillWithoutFullTenSolver: fillWithoutFullTenSolver, tokenBeforeSealSolver: tokenBeforeSealSolver,
      bruteForceSolver: bruteForceSolver
    }
  };

}(typeof window !== 'undefined' ? window : this));

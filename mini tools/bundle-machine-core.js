/* =====================================================================
   CORE — Bundle Machine  (bundle-machine-core.js)
   ---------------------------------------------------------------------
   The transform-machine FAMILY HEAD. Generic, LOCALE-NEUTRAL "the CHILD authors
   the bundle — ten loose ones BECOME one ten (the composite-unit insight)"
   cognition. First skin: "Bundle Bot" — CCSS 1.NBT.B.2.a (10 = a bundle of ten
   ones, a "ten") + 1.NBT.B.2.c (decades). Produces a multi-ten number (20-49).

   THE FAMILY-HEAD DOCTRINE (this game establishes it): the machine executes a
   delightful TRANSFORM, but the CHILD must supply the defining numerical
   JUDGMENT that GATES the transform — and triggering it wrong is REFUSED, not
   corrected. The cognition lives in the gate-CONDITION, not the trigger act
   ("trigger ≠ decide"). For Bundle Bot: the child judges "this IS ten."

   THE SPINE — FEED → JUDGE-TEN → BUNDLE: loose ones land in a loose SCATTER
   (not a clean ten-frame — that lets the child read "full" as a gestalt). A
   subitizable clump-feeder drops 1-3 at a time. The child counts to ten and
   pulls the BUNDLE LEVER (never glows). The lever reads the count at the pull-
   instant.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NO AUTO-BUNDLE — there is NO `if(ones===10)bundle()` path; bundling is
       ONLY reachable through `pullLever()`. Feeding ten ones with no pull leaves
       ten loose + the tens column EMPTY (`autoBundlePathExists===false`).
     • SUB-TEN REFUSED — `pullLever()` at <10 refuses (`bundleRefusedBelowTen`).
       Bundling at 8 is "the most valuable wrong in the game."
     • IMPOSTOR (count-not-gestalt) — a scatter that LOOKS ~10 but is 9 → a pull
       refuses; only a COUNTED ten bundles. The only state where "full"≠"ten"
       (`scatterNotCleanTenFrame===true`) — the discriminating assertion.
     • CANONICAL-FORM SOLVE — `solved` requires `tens===tensNeeded` (34-as-"2
       tens 14 loose" is NOT solved → bundling is load-bearing).
     • ≥2-TENS FLOOR — every target ≥20 (a teen collapses into Game 16).

   Pure functions, no DOM. Mirrors make-total / slingshot-tens / ten-frame-tank.
   ===================================================================== */
(function (global) {
  'use strict';

  var TEN = 10;
  function tensNeeded(round) { return Math.floor((round.target | 0) / 10); }
  /* a round's solve form: canonical (tens===tensNeeded) by default; the
     `unbundle` cog overrides to a NON-default grouping (e.g. 32 as 2t 12o). */
  function solveTens(round) { return (round.solveTens != null) ? (round.solveTens | 0) : tensNeeded(round); }
  function solveOnes(round) { return (round.solveOnes != null) ? (round.solveOnes | 0) : ((round.target | 0) - tensNeeded(round) * 10); }

  function newState(round) {
    var start = round.start || {};
    var tens = start.tens | 0;
    var ones = (round.cog === 'impostor') ? (round.impostorOnes | 0) : (start.ones | 0);   // impostor seeds a looks-~10-but-9 scatter
    return { round: round, cog: round.cog, target: round.target | 0, tens: tens, ones: ones, bundleLog: [], everWrong: false, _feedIdx: 0 };
  }

  /* FEED — a subitizable clump (1-3) lands in the scatter. An 11th+ is allowed
     (the over-fill state is a genuine decision, NOT a blocked tap). */
  function feed(s, clump) { s.ones += (clump | 0); return true; }
  /* the next clump size for a procedural feed (round.clumpSizes cycles). */
  function nextClump(s) { var sizes = s.round.clumpSizes || [1, 2, 3]; return sizes[(s._feedIdx++) % sizes.length] | 0; }
  /* REMOVE-ONE — take a single loose one back out of the scatter (the child's
     correction; floors at 0). Can never create a bundle, so no anti-cheat
     impact. Pairs with one-by-one feed for full control of the loose count. */
  function removeOne(s) { if (s.ones > 0) { s.ones -= 1; return 'removed'; } return 'none'; }

  /* THE BUNDLE LEVER — the child's judged trigger; the ONLY bundle path.
     ones≥10 → transfer EXACTLY ten into one banded rod (at 10 leaves 0; at 11+
     leaves the extra — the over-fill recovery). ones<10 → REFUSE (no rod). */
  function pullLever(s) {
    if (s.ones >= TEN) { s.tens += 1; s.ones -= TEN; s.bundleLog.push({ atCount: TEN, success: true, source: 'lever' }); return (s.ones > 0) ? 'overfill-bundled' : 'bundled'; }
    s.everWrong = true; return 'refused';                                     // a sub-ten pull — the non-shame refuse
  }
  /* UN-BUNDLE — tap a banded rod → it explodes back into ten scatter cubes
     (the inverse unitizing; the rote-killer). Value-preserving. */
  function unbundle(s) { if (s.tens > 0) { s.tens -= 1; s.ones += TEN; return 'unbundled'; } return 'none'; }

  function value(s) { return s.tens * 10 + s.ones; }
  function isSolved(s) { return value(s) === s.target && s.tens === solveTens(s.round) && s.ones === solveOnes(s.round); }
  function isComplete(round, s) { return isSolved(s); }
  function firstAttemptCorrect(s) { return isSolved(s) && !s.everWrong; }

  function facts(round, s) {
    return {
      cog: round.cog,
      autoBundlePathExists: false,                                            // structural: only pullLever bundles
      bundleRefusedBelowTen: true,                                            // structural: pullLever refuses <10
      canonicalSolveRequired: true,                                           // structural: isSolved checks the tens grouping
      scatterNotCleanTenFrame: true,                                          // structural: the tray is a loose scatter
      feedIsClumpNotBlindTap: true,
      tensFloor: tensNeeded(round),                                           // ≥2 (gate-enforced)
      solveTens: solveTens(round), solveOnes: solveOnes(round),
      firstAttemptCorrect: s ? firstAttemptCorrect(s) : false
    };
  }
  /* snapshot exposes the visible state shape — NO hidden answer (the goal is the
     target, shown; the cognition is the child's judgment, not a stored secret). */
  function snapshot(round, s) { return { cog: round.cog, target: s.target, tens: s.tens, ones: s.ones, solved: isSolved(s) }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* a genuine COUNT-AND-AUTHOR play of a round → reaches the (possibly non-
     canonical) solve form. Counts to exactly ten + pulls, per ten; for unbundle
     it breaks a rod; for impostor it feeds one onto the seeded 9 first. */
  function countAndAuthorSolver(round) {
    var s = newState(round);
    if (round.cog === 'unbundle') { while (s.tens > solveTens(round)) unbundle(s); return { result: isSolved(s) ? 'solved' : 'stuck', solved: isSolved(s) }; }
    var needTens = solveTens(round), needOnes = solveOnes(round);
    // bring tens up to needTens by counting ten loose ones then bundling, each time
    var guard = 0;
    while (s.tens < needTens && guard++ < 99) { while (s.ones < TEN) feed(s, 1); pullLever(s); }   // exactly ten → bundle
    while (s.ones < needOnes && guard++ < 99) feed(s, 1);                     // the final loose ones
    while (s.ones > needOnes && guard++ < 99) s.ones--;                       // (read-state given extra — never happens in data)
    return { result: isSolved(s) ? 'solved' : 'stuck', solved: isSolved(s) };
  }
  /* NO-AUTO-BUNDLE — feed ten ones with NO lever pull → ten loose, tens EMPTY. */
  function noAutoBundleSolver(round) {
    var s = newState(round); var base = s.tens;
    while (s.ones < TEN) feed(s, 1);                                          // reach ten in the scatter
    return { ones: s.ones, tens: s.tens, addedRod: s.tens > base };          // expect addedRod === false
  }
  /* SUB-TEN-REFUSE — feed to 8, pull → refused, no rod. */
  function subTenRefuseSolver(round) {
    var s = newState(round); var base = s.tens; while (s.ones < 8) feed(s, 1); if (s.ones > 8) s.ones = 8;
    var r = pullLever(s); return { result: r, addedRod: s.tens > base };     // expect 'refused', addedRod false
  }
  /* IMPOSTOR-REFUSE — a fullness-reflex pull on the seeded looks-~10-but-9
     scatter REFUSES (it's 9); a counting solver feeds one then bundles. */
  function impostorRefuseSolver(round) {
    if (round.cog !== 'impostor') return { skip: true };
    var s = newState(round); var seeded = s.ones;                            // 9
    var reflex = pullLever(s);                                               // pulls on "looks full" → refused
    feed(s, 1); var counted = pullLever(s);                                  // counts: 9→10 → bundles
    return { seeded: seeded, reflexResult: reflex, countedResult: counted, bundledAfterCount: s.tens === 1 };
  }
  /* TAP-ONLY — feeds ones but never authors a bundle → tens stays at start,
     can't reach a ≥2-tens canonical solve. */
  function tapOnlySolver(round) {
    var s = newState(round); for (var i = 0; i < 30; i++) feed(s, 1); return { solved: isSolved(s), tens: s.tens };
  }
  /* ROTE (bundle-at-any-fill) — pulls at sub-ten → refused → never bundles. */
  function roteSolver(round) {
    var s = newState(round); feed(s, (s.round.clumpSizes || [3])[0] | 0); if (s.ones >= TEN) s.ones = 3;   // ensure sub-ten
    var r = pullLever(s); return { result: r, solved: isSolved(s) };         // expect 'refused'
  }
  /* CANONICAL — reaching the value in a NON-canonical grouping is NOT solved. */
  function canonicalSolveSolver(round) {
    if (round.cog !== 'build') return { skip: true };
    var s = newState(round); var nt = tensNeeded(round);
    // build (nt-1) tens, then dump the remaining value as loose (a hidden extra ten)
    var guard = 0; while (s.tens < nt - 1 && guard++ < 99) { while (s.ones < TEN) feed(s, 1); pullLever(s); }
    s.ones = round.target - s.tens * 10;                                     // value correct, but tens = nt-1 (one ten still loose)
    return { valueCorrect: value(s) === round.target, solvedNonCanonical: isSolved(s) };   // expect valueCorrect true, solved false
  }

  global.BundleMachineCore = {
    TEN: TEN, tensNeeded: tensNeeded, solveTens: solveTens, solveOnes: solveOnes, value: value,
    newState: newState, feed: feed, nextClump: nextClump, removeOne: removeOne, pullLever: pullLever, unbundle: unbundle,
    isSolved: isSolved, isComplete: isComplete, firstAttemptCorrect: firstAttemptCorrect, facts: facts, snapshot: snapshot,
    SOLVERS: { countAndAuthorSolver: countAndAuthorSolver, noAutoBundleSolver: noAutoBundleSolver, subTenRefuseSolver: subTenRefuseSolver, impostorRefuseSolver: impostorRefuseSolver, tapOnlySolver: tapOnlySolver, roteSolver: roteSolver, canonicalSolveSolver: canonicalSolveSolver }
  };

}(typeof window !== 'undefined' ? window : this));

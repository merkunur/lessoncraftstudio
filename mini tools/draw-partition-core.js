/* =====================================================================
   CORE — Draw Partition  (draw-partition-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "draw a line to cut a rectangular array into
   EQUAL row-piles, READ each pile, and write the sum of EQUAL ADDENDS"
   cognition (the spec's `engine-draw-partition.js`). First skin:
   "Squirrel's Fair Winter Piles" — CCSS 2.OA.C.4 (the additive foundation
   of multiplication). The REVERSE of the live E13 array-core ("Build the
   Array", equation→array): here a GIVEN array, the child DRAWS the
   partition + SUPPLIES each addend by reading the pile + JUDGES equality
   (uneven cuts are REACHABLE but UNFAIR — the equal-addends equation can't
   close). `×` is NEVER assessed.

   Validity is DERIVED from the cut-set + the CHILD's reads — NEVER a stored
   equation/answer, NEVER auto-filled. The build-gate proves a BLIND-LINE-
   TRACER (cuts every gap, doesn't read) and an UNEQUAL-ACCEPTOR (uneven
   piles) both FAIL — only cut-correctly-AND-read-each-correctly-AND-all-
   equal PASSES. Pure functions, no DOM. Mirrors mend-page-core.js /
   compound-order-core.js / retell-story-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- piles from a cut-set ----
     cuts = sorted unique integer ROW-boundary indices in 1..R-1 (whole-row by
     construction → arbitrary blobs impossible; uneven contiguous groupings ARE
     producible, so equality stays a real judgment). Returns per-pile COUNTS. */
  function derivePiles(round, cuts) {
    var R = round.array.rows, C = round.array.cols;
    var sorted = (cuts || []).slice().filter(function (c) { return c >= 1 && c <= R - 1; }).sort(function (a, b) { return a - b; });
    var bounds = [0], i;
    for (i = 0; i < sorted.length; i++) if (sorted[i] !== bounds[bounds.length - 1]) bounds.push(sorted[i]);
    bounds.push(R);
    var piles = [];
    for (i = 0; i < bounds.length - 1; i++) { var rows = bounds[i + 1] - bounds[i]; if (rows > 0) piles.push(rows * C); }
    return piles;
  }
  function truePileCounts(round, cuts) { return derivePiles(round, cuts); }
  function isWholeRowCut(round, c) { return c === Math.round(c) && c >= 1 && c <= round.array.rows - 1; }

  /* ---- the ASSESSED form (DERIVED; NEVER a stored answer / auto-fill) ----
     valid = ≥2 piles ∧ #addends===#piles ∧ each child addend === the true pile
     count ∧ all piles EQUAL ∧ Σ===R·C ∧ the type-constraint. */
  function validate(round, cuts, addends) {
    var R = round.array.rows, C = round.array.cols;
    var piles = derivePiles(round, cuts);
    if (piles.length < 2) return false;
    if (!addends || addends.length !== piles.length) return false;
    var i, sum = 0;
    for (i = 0; i < piles.length; i++) { if (addends[i] !== piles[i]) return false; }     // the child read each pile correctly
    for (i = 1; i < piles.length; i++) { if (piles[i] !== piles[0]) return false; }        // ALL EQUAL (the judgment)
    for (i = 0; i < addends.length; i++) sum += addends[i];
    if (sum !== R * C) return false;                                                       // Σ of equal addends === the array total
    var t = round.type, tg = round.target;
    if (t === 'make-n' && tg && piles.length !== tg.piles) return false;                   // exactly N fair piles
    if (t === 'match' && tg && (piles.length !== tg.count || piles[0] !== tg.addend)) return false; // match the given equation
    return true;
  }

  /* ---- all EQUAL cut-sets (a partition into k equal row-groups exists iff k | R, k≥2) ---- */
  function equalPartitions(round) {
    var R = round.array.rows, out = [];
    for (var k = 2; k <= R; k++) {
      if (R % k === 0) { var step = R / k, cs = []; for (var i = 1; i < k; i++) cs.push(i * step); out.push(cs); }
    }
    return out;
  }
  // the canonical valid solution for a round's TYPE (gate + with-prompting demo)
  function solutionFor(round) {
    var parts = equalPartitions(round), cuts = null;
    if (round.type === 'make-n' && round.target) cuts = parts.filter(function (cs) { return cs.length + 1 === round.target.piles; })[0];
    else if (round.type === 'match' && round.target) cuts = parts.filter(function (cs) { return cs.length + 1 === round.target.count; })[0];
    else cuts = parts[0]; // make-fair / fix → any equal partition
    if (!cuts) cuts = parts[parts.length - 1] || [];
    return { cuts: cuts, addends: derivePiles(round, cuts) };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against validate) ---- */
  function cutCorrectAndRead(round) { return solutionFor(round); }                          // the UNIQUE passing class
  function blindLineTracer(round) {                                                          // cuts every gap, DOESN'T read (blank/wrong addends)
    var R = round.array.rows, cuts = []; for (var i = 1; i < R; i++) cuts.push(i);
    return { cuts: cuts, addends: derivePiles(round, cuts).map(function () { return 0; }) };  // blank/wrong → must FAIL
  }
  function unequalAcceptor(round) {                                                          // an UNEVEN cut (reachable) + CORRECT reads → must FAIL (not all equal)
    var R = round.array.rows; if (R < 3) return null;                                        // R=2 admits no uneven whole-row partition
    var cuts = [1];                                                                          // 1 row + (R-1) rows → unequal
    return { cuts: cuts, addends: derivePiles(round, cuts) };                                // reads correct, but unequal
  }
  function countAll(round) { return { cuts: [], addends: [round.array.rows * round.array.cols] }; } // no cut → <2 piles; "type the total" has nowhere to go
  function wrongCount(round) { var s = solutionFor(round), a = s.addends.slice(); a[0] = a[0] + 1; return { cuts: s.cuts, addends: a }; } // correct cut, one mis-read

  global.DrawPartitionCore = {
    derivePiles: derivePiles, truePileCounts: truePileCounts, isWholeRowCut: isWholeRowCut,
    validate: validate, equalPartitions: equalPartitions, solutionFor: solutionFor,
    SOLVERS: {
      cutCorrectAndRead: cutCorrectAndRead, blindLineTracer: blindLineTracer,
      unequalAcceptor: unequalAcceptor, countAll: countAll, wrongCount: wrongCount
    }
  };

}(typeof window !== 'undefined' ? window : this));

/* =====================================================================
   CORE — Make Total  (make-total-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "DECOMPOSE a target T into a self-chosen combination
   of addends — multiple ways — and determine an unknown completer" cognition.
   First skin: "Clunk's Lost Lunch" — CCSS K.OA.A.3 (decompose ≤10 more than one
   way) + 1.OA.D.8 (the unknown completer). A collect-trade sibling.

   THE SPINE — PLAN-THEN-FEED (no live aggregate): the child taps snacks (each a
   hunger-NUMBER) off a wall into a lunchbox, plans a combination making exactly
   T, then FEEDS Clunk (the lever — the ONLY evaluator). There is NO running
   total anywhere; the child must add it up themselves.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NO LIVE AGGREGATE + FEED-IS-THE-ONLY-EVALUATOR — the sum is a TRANSIENT
       local computed ONLY in `commit()`; it is never stored on state nor exposed
       in `snapshot()` (`hasLiveAggregate===false`). The "watch a total climb to
       T" cheat is structurally impossible (the differentiator from a money game).
     • WRONG EMPTIES + NON-DIRECTIONAL — a wrong feed empties the tray to the
       locked givens (snacks return) with ONE state regardless of over/under
       (`wrongStateDirectional===false`). Commit-spam + binary-search die.
     • SECOND-DIFFERENT-WAY (multiset-of-costs) — two-ways rejects a commit whose
       sorted multiset of costs repeats a prior way (6+4 === 4+6; ≠ 7+3).
     • PALETTE-FLOOR — no single wall snack ≥ T (no 1-tap solve); ≥2 declared
       non-subset decompositions per generative target.

   Pure functions, no DOM. Mirrors numeral-album / make-fair / rail-decompose.
   ===================================================================== */
(function (global) {
  'use strict';

  function isGenerative(schema) { return schema === 'free' || schema === 'two-ways'; }
  function sortedMultiset(costs) { return costs.slice().sort(function (a, b) { return a - b; }).join(','); }

  function newState(round) {
    var tray = [], seq = 0, i;
    if (round.given) for (i = 0; i < round.given.length; i++) tray.push({ id: 'g' + (seq++), cost: round.given[i] | 0, locked: true });   // #3/#4 pre-held, locked
    if (round.start) for (i = 0; i < round.start.length; i++) tray.push({ id: 's' + (seq++), cost: round.start[i] | 0, locked: false });   // #7 over-full, removable
    return { round: round, target: round.target | 0, schema: round.schema, tray: tray, prevWays: [], wayCount: 0, sealed: false, wrong: false, everWrong: false, _seq: seq };
  }
  function addChip(s, cost) { s.tray.push({ id: 'c' + (s._seq++), cost: cost | 0, locked: false }); return true; }
  function removeChip(s, id) { for (var i = 0; i < s.tray.length; i++) if (s.tray[i].id === id) { if (s.tray[i].locked) return false; s.tray.splice(i, 1); return true; } return false; }
  function removeByCost(s, cost) { for (var i = 0; i < s.tray.length; i++) if (!s.tray[i].locked && s.tray[i].cost === (cost | 0)) { s.tray.splice(i, 1); return true; } return false; }
  function trayCosts(s) { return s.tray.map(function (c) { return c.cost; }); }
  function nonLockedCount(s) { return s.tray.filter(function (c) { return !c.locked; }).length; }
  function emptyToLocked(s) { s.tray = s.tray.filter(function (c) { return c.locked; }); }

  /* the schema constraint (beyond sum===T). */
  function constraintOK(s, costs) {
    var r = s.round;
    if (r.schema === 'exact-n') return costs.length === (r.exactN | 0);
    if (r.schema === 'missing-addend') return nonLockedCount(s) === 1;        // a single completer
    if (r.schema === 'multi-completer') return nonLockedCount(s) === 2;       // the completer decomposes into TWO
    if (r.schema === 'constrained-wall') { var allow = r.allow || r.wall || []; return costs.every(function (c) { return allow.indexOf(c) >= 0; }); }
    return true;                                                              // free / two-ways / reduce
  }

  /* THE FEED — the ONLY evaluator. The sum is a TRANSIENT local (never stored,
     never exposed). Seals IFF sum===T AND the schema constraint holds. */
  function commit(s) {
    var costs = trayCosts(s), sum = 0, i;                                     // <-- transient aggregate, local only
    for (i = 0; i < costs.length; i++) sum += costs[i];
    var ok = (sum === s.target) && constraintOK(s, costs);
    if (s.schema === 'two-ways') {
      if (ok) {
        var ms = sortedMultiset(costs);
        if (s.prevWays.indexOf(ms) >= 0) { s.tray = []; return 'repeat'; }    // a repeated way — clear for a fresh way, NOT a wrong-empty (not counted as wrong)
        s.prevWays.push(ms); s.wayCount++;
        if (s.wayCount >= 2) { s.sealed = true; return 'sealed'; }
        s.tray = []; return 'next-way';                                       // first way good → fresh tray for the 2nd
      }
      s.wrong = true; s.everWrong = true; emptyToLocked(s); return 'wrong';
    }
    if (ok) { s.sealed = true; return 'sealed'; }
    s.wrong = true; s.everWrong = true; emptyToLocked(s); return 'wrong';
  }

  function isComplete(round, s) { return s.sealed; }
  function noSingleItemGEtarget(round) {
    var pal = (round.allow || round.wall || []);
    return pal.every(function (c) { return c < (round.target | 0); });
  }
  function facts(round, s) {
    return {
      hasLiveAggregate: false,                                                // structural: the sum lives only inside commit()
      wrongStateDirectional: false,                                           // over and under produce the same empty-to-locked state
      noSingleItemGEtarget: noSingleItemGEtarget(round),
      decompositionsDeclared: (round.solutions || []).length,
      multisetRepeatRejected: round.schema === 'two-ways',
      firstAttemptCorrect: s.sealed && !s.everWrong,
      schema: round.schema
    };
  }
  /* snapshot NEVER exposes an aggregate — only the chips + the way-count. */
  function snapshot(round, s) { return { schema: s.schema, target: s.target, trayChips: s.tray.map(function (c) { return { cost: c.cost, locked: c.locked }; }), wayCount: s.wayCount, sealed: s.sealed, wrong: s.wrong }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* apply a declared solution: add-schemas TAP the costs; reduce REMOVES them. */
  function applySolution(s, sol) {
    if (s.round.schema === 'reduce') sol.forEach(function (cost) { removeByCost(s, cost); });
    else sol.forEach(function (cost) { addChip(s, cost); });
  }
  /* PLAN-THEN-FEED — assemble a declared good combination → feed → seals (two-
     ways feeds a 2nd multiset-distinct way). The UNIQUE pass across the deck. */
  function planThenFeedSolver(round) {
    var s = newState(round), sols = round.solutions || [];
    applySolution(s, sols[0] || []); var r = commit(s);
    if (round.schema === 'two-ways') { applySolution(s, sols[1] || []); r = commit(s); }
    return { result: r, sealed: s.sealed };
  }
  /* COMMIT-SPAM — repeated wrong commits can never accumulate (the tray empties). */
  function commitSpamSolver(round) {
    var s = newState(round), wall = round.wall || [], i;
    for (i = 0; i < 5; i++) { if (wall.length) addChip(s, wall[0]); commit(s); }                // add one, feed, empties; repeat
    return { sealed: s.sealed, trayAfter: nonLockedCount(s) };
  }
  /* BRUTE-FORCE (free rounds) — a single max wall item never reaches T. */
  function bruteForceSolver(round) {
    if (round.schema !== 'free') return { skip: true };
    var s = newState(round), wall = (round.wall || []).slice().sort(function (a, b) { return b - a; });
    if (wall.length) addChip(s, wall[0]);                                     // the biggest single snack
    return { result: commit(s), sealed: s.sealed };                          // expect 'wrong' (no single item ≥ T)
  }
  /* DIRECTIONAL-ABSENCE — an over tray and an under tray wrong commit are the
     same observable state (both empty to locked, wrong set). */
  function directionalAbsenceSolver(round) {
    if (round.schema === 'two-ways') return { skip: true };
    var sol = (round.solutions || [[]])[0] || [];
    var over = newState(round); applySolution(over, sol); if (round.schema !== 'reduce') addChip(over, 1); else { over.tray.push({ id: 'x', cost: 1, locked: false }); } var ro = commit(over);
    var under = newState(round); if (round.schema === 'reduce') { /* remove one too many */ applySolution(under, sol); if (under.tray.filter(function (c) { return !c.locked; }).length) removeChip(under, under.tray.filter(function (c) { return !c.locked; })[0].id); } else { applySolution(under, sol.slice(0, Math.max(0, sol.length - 1))); } var ru = commit(under);
    var oState = snapshot(round, over), uState = snapshot(round, under);
    return { overResult: ro, underResult: ru, identical: JSON.stringify(oState.trayChips) === JSON.stringify(uState.trayChips) && over.wrong === under.wrong };
  }
  /* MULTISET-REPEAT (two-ways) — feed a way, then the SAME multiset → rejected;
     a distinct multiset → accepted. */
  function multisetRepeatSolver(round) {
    if (round.schema !== 'two-ways') return { skip: true };
    var s = newState(round), sols = round.solutions || [];
    applySolution(s, sols[0]); var r1 = commit(s);                            // 'next-way'
    applySolution(s, sols[0]); var rRepeat = commit(s);                       // SAME way → 'repeat'
    applySolution(s, sols[1]); var rNew = commit(s);                          // distinct → 'sealed'
    return { firstWay: r1, repeat: rRepeat, distinct: rNew, sealed: s.sealed };
  }

  global.MakeTotalCore = {
    isGenerative: isGenerative, sortedMultiset: sortedMultiset, noSingleItemGEtarget: noSingleItemGEtarget,
    newState: newState, addChip: addChip, removeChip: removeChip, removeByCost: removeByCost, trayCosts: trayCosts, nonLockedCount: nonLockedCount,
    commit: commit, isComplete: isComplete, facts: facts, snapshot: snapshot,
    SOLVERS: { planThenFeedSolver: planThenFeedSolver, commitSpamSolver: commitSpamSolver, bruteForceSolver: bruteForceSolver, directionalAbsenceSolver: directionalAbsenceSolver, multisetRepeatSolver: multisetRepeatSolver }
  };

}(typeof window !== 'undefined' ? window : this));

/* =====================================================================
   CORE — Make Fair  (make-fair-core.js)   ·   the social-fair FAMILY HEAD
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "DETERMINE + PRODUCE the unknown number that sets a
   felt social wrong right" cognition — the reusable head of the social-fair
   family. First skin: "The Sharing Jar" — CCSS 1.OA.D.8 (determine the UNKNOWN
   in a single-unknown add/sub relation of three numbers). The head demonstrates
   5 distinct CGI single-unknown SCHEMAS so the family is born with a math spine.

   THE SPINE — LEVEL-UP-TO-MATCH, produce-the-numeral-FIRST: two friends' jars
   (Pim 3, Bo 5); the child DETERMINES the gap and PRODUCES the numeral m DIRECTLY
   (taps a number-tile). The give (m beads float from the neutral floor-pile into
   the quiet jar) is the CELEBRATION of the correct answer, NOT the input.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • PRODUCE-THE-NUMERAL-FIRST (`viaNumber` literal) — there is NO fill-a-basket-
       against-a-visible-target surface (`incrementSurfaceExists===false`,
       structural). The only input is `produceNumeral`; the increment-and-watch
       perceptual cheat cannot be performed; the child must DETERMINE m.
     • THE GIVE IS THE CELEBRATION — `commit()` is the ONLY correctness check; it
       seals only on a produced numeral that equals the unknown.
     • 5 DISTINCT SCHEMAS — `unknownFor` differs per schema, so a schema-blind /
       constant stub mis-answers; off-by-one fails. The child must read the schema.
     • HONEST TIERS — ceiling hides the bigger given's numeral
       (`biggerCountRenderedDuringDecide===false`) so the missing-addend does real
       work (the child counts + derives).

   Pure functions, no DOM. Mirrors compare-balance / numeral-album / rail-decompose.
   ===================================================================== */
(function (global) {
  'use strict';

  /* the single SoT — the unknown derived from the schema + givens. No answer
     authored or rendered anywhere; the number-tiles are a fixed 0-10 row. */
  function unknownFor(schema, n) {
    switch (schema) {
      case 'equalize-add': return (n.a | 0) - (n.b | 0);     // b + ? = a
      case 'compare-diff': return (n.a | 0) - (n.b | 0);     // a − b = ?
      case 'restore': return (n.s | 0) - (n.r | 0);          // s − ? = r
      case 'reduce-to-target': return (n.a | 0) - (n.T | 0); // a − ? = T
      case 'start-unknown': return (n.r | 0) + (n.k | 0);    // ? − k = r
      default: return -999;
    }
  }
  /* the two GIVENS in a fixed order — for the schema-blind stub probes. */
  function givensOf(round) {
    var n = round.nums;
    switch (round.schema) {
      case 'equalize-add': case 'compare-diff': return [n.a | 0, n.b | 0];
      case 'restore': return [n.s | 0, n.r | 0];
      case 'reduce-to-target': return [n.a | 0, n.T | 0];
      case 'start-unknown': return [n.k | 0, n.r | 0];
      default: return [0, 0];
    }
  }
  /* the give-arc direction (a render/celebration concern, not the answer). */
  function giveDirection(schema) {
    if (schema === 'equalize-add' || schema === 'restore') return 'into-jar';
    if (schema === 'reduce-to-target') return 'to-floor';
    return 'reveal'; // compare-diff (static gap) / start-unknown (the start named)
  }

  function newState(round) {
    return { round: round, schema: round.schema, tier: round.tier || 'floor', committedNumeral: null, sealed: false, posed: 0 };
  }
  function unknown(s) { return unknownFor(s.schema, s.round.nums); }

  /* the child's gated act — produce the unknown as a numeral (the `viaNumber`
     invariant). There is NO increment/fill API on this core. */
  function produceNumeral(s, n) { s.committedNumeral = (n == null ? null : (n | 0)); return s.committedNumeral; }

  /* the ONLY correctness check. Seals IFF the produced numeral === the unknown.
     A wrong numeral does NOT seal (the activity re-poses non-directionally). */
  function commit(s) {
    if (s.committedNumeral != null && s.committedNumeral === unknown(s)) { s.sealed = true; return 'sealed'; }
    s.posed++; s.committedNumeral = null; return 'mismatch';
  }

  function isComplete(round, s) { return s.sealed; }
  function biggerCountRenderedDuringDecide(round) { return (round.tier || 'floor') === 'floor'; } // ceiling hides the bigger given's numeral
  function facts(round, s) {
    return {
      unknown: unknownFor(round.schema, round.nums),
      viaNumber: s.committedNumeral != null,
      incrementSurfaceExists: false,                                   // structural: no fill-against-target control
      biggerCountRenderedDuringDecide: biggerCountRenderedDuringDecide(round),
      firstAttemptCorrect: s.sealed && s.posed === 0,
      schema: round.schema
    };
  }
  function snapshot(round, s) { return { schema: s.schema, tier: s.tier, givens: round.nums, committedNumeral: s.committedNumeral, sealed: s.sealed, posed: s.posed }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* PRODUCE-THE-UNKNOWN — the genuine strategy: read the schema, produce the
     unknown numeral → seals EVERY round (the UNIQUE pass). */
  function produceUnknownSolver(round) { var s = newState(round); produceNumeral(s, unknownFor(round.schema, round.nums)); return { result: commit(s), sealed: s.sealed }; }
  /* OFF-BY-ONE — produce unknown±1 → does NOT seal (the determined number is load-bearing). */
  function offByOneSolver(round) {
    var u = unknownFor(round.schema, round.nums);
    var s1 = newState(round); produceNumeral(s1, u + 1); commit(s1);
    var ok = !s1.sealed;
    if (u > 0) { var s2 = newState(round); produceNumeral(s2, u - 1); commit(s2); ok = ok && !s2.sealed; }
    return { sealed: false, neverSeals: ok };
  }
  /* SCHEMA-BLIND STUB — a fixed function of (g1,g2), schema-ignorant. `op`:
     'sub' (g1−g2) / 'add' (g1+g2) / 'one' (always 1) / 'first' (g1). Returns
     whether it sealed EVERY round (it must NOT — no fixed formula spans the 5). */
  function schemaBlindStub(rounds, op) {
    var allSeal = true, anyMiss = false;
    rounds.forEach(function (round) {
      var g = givensOf(round), ans = op === 'sub' ? g[0] - g[1] : op === 'add' ? g[0] + g[1] : op === 'one' ? 1 : g[0];
      var s = newState(round); produceNumeral(s, ans); commit(s);
      if (!s.sealed) { allSeal = false; anyMiss = true; }
    });
    return { sealedEveryRound: allSeal, missedAtLeastOne: anyMiss };
  }
  /* viaNumber literal — commit with NO produced numeral → no seal. */
  function viaNumberLiteralSolver(round) { var s = newState(round); commit(s); return { sealed: s.sealed }; }

  global.MakeFairCore = {
    unknownFor: unknownFor, givensOf: givensOf, giveDirection: giveDirection,
    newState: newState, unknown: unknown, produceNumeral: produceNumeral, commit: commit, isComplete: isComplete,
    biggerCountRenderedDuringDecide: biggerCountRenderedDuringDecide, facts: facts, snapshot: snapshot,
    SOLVERS: { produceUnknownSolver: produceUnknownSolver, offByOneSolver: offByOneSolver, schemaBlindStub: schemaBlindStub, viaNumberLiteralSolver: viaNumberLiteralSolver }
  };

}(typeof window !== 'undefined' ? window : this));

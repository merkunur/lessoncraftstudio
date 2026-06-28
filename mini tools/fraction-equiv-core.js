/* =====================================================================
   CRUMB'S SAME-AMOUNT BAKERY — CORE  (fraction-equiv-core.js)
   ---------------------------------------------------------------------
   CCSS 3.NF.A.3 — fraction EQUIVALENCE: different fractions name the SAME
   amount (1/2 = 2/4 = 3/6). Pure cognition, NO DOM. 0 lines to ANY existing
   core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #86 (2026-06-27): the spec's heavy multi-phase
   comb-rake → child-glaze-proportional → "did the dough move?" motion-judgment
   + the 8-solver anti-cheat suite (KXK_PROCEDURE / ENGINE_AUTOSHADE /
   COMB_VOCABULARY_BRUTE_FORCE / …) are SET ASIDE for clarity. The standard's
   own model — a visual fraction model + the symbolic fraction — is the clear
   mechanic: each round shows a REFERENCE fraction (numerals + a proportion-
   shaded bar) and 3 candidate fractions (numerals + shaded bars); the child
   taps the candidate showing the SAME amount. Proportion is scale-invariant
   (a half-full bar looks half-full at any width) + the numerals tie the visual
   amount to the symbol → genuine equivalence, not eyeball-only.

   THE ANSWER IS DERIVED BY INTEGER CROSS-MULTIPLY, NEVER STORED. A round stores
   {id, ref:{num,den}, candidates:[{id,num,den}]} — no correctIndex/answer/
   equivalent field. isEquivalent(a,b)=a.num*b.den===a.den*b.num; oracle = the
   candidate index equivalent to ref. Re-pointable: change round.ref → the
   equivalent candidate changes (equivalence is relative to the committed ref).
   ===================================================================== */
(function (global) {
  'use strict';

  function cands(round) { return (round && round.candidates) || []; }

  /* integer cross-multiply — no float, exact for all grade-3 fractions */
  function isEquivalent(a, b) { return !!a && !!b && (a.num * b.den === a.den * b.num); }

  function oracle(round) {
    var c = cands(round), ref = round && round.ref;
    for (var i = 0; i < c.length; i++) if (isEquivalent(c[i], ref)) return i;
    return -1;
  }
  function isAnswer(round, i) {
    var c = cands(round);
    return i >= 0 && i < c.length && isEquivalent(c[i], round.ref);
  }
  function correctCount(round) {
    var c = cands(round), n = 0;
    for (var i = 0; i < c.length; i++) if (isEquivalent(c[i], round.ref)) n++;
    return n;
  }

  function value(f) { return (f && f.den) ? f.num / f.den : NaN; }

  /* relation of candidate i to ref: 'same' | 'more' | 'less' (integer compare) */
  function relation(round, i) {
    var c = cands(round)[i], ref = round && round.ref;
    if (!c || !ref) return '';
    var lhs = c.num * ref.den, rhs = ref.num * c.den;
    return lhs === rhs ? 'same' : (lhs > rhs ? 'more' : 'less');
  }

  function snapshot(round) {
    return {
      id: round.id, ref: { num: round.ref.num, den: round.ref.den },
      candidates: cands(round).map(function (x) { return { id: x.id, num: x.num, den: x.den }; })   /* equivalence NOT exposed */
    };
  }

  var GRADE3_DENOMS = { 2: 1, 3: 1, 4: 1, 6: 1, 8: 1 };

  function facts(round) {
    var c = cands(round), ref = round.ref;
    var proper = !!ref && ref.num > 0 && ref.num < ref.den &&
      c.every(function (x) { return x.num > 0 && x.num < x.den; });
    var denoms = !!ref && !!GRADE3_DENOMS[ref.den] &&
      c.every(function (x) { return !!GRADE3_DENOMS[x.den]; });
    var distinct = new Set(c.map(function (x) { return Math.round(value(x) * 1e6); })).size === c.length;
    return {
      ref: ref,
      candidateCount: c.length,
      exactlyOneEquivalent: correctCount(round) === 1,
      properFractions: proper,
      denomsInGrade3Set: denoms,
      distinctCandidates: distinct,
      derivedNotStored: true,
      oracleValid: oracle(round) >= 0
    };
  }

  function deckFacts(rounds) {
    var refs = {}, ex = {}, pos = {};
    (rounds || []).forEach(function (r) {
      refs[r.ref.num + '/' + r.ref.den] = 1; ex[r.id] = 1; pos[oracle(r)] = 1;
    });
    return {
      total: (rounds || []).length,
      distinctRefs: Object.keys(refs).length,
      distinctEquivPositions: Object.keys(pos).length,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return { id: round.id, ref: round.ref, equivIndex: oracle(round), values: cands(round).map(value) };
  }

  global.FractionEquivCore = {
    isEquivalent: isEquivalent, oracle: oracle, isAnswer: isAnswer, correctCount: correctCount,
    value: value, relation: relation, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

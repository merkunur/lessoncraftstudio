/* =====================================================================
   SKIP THE KANGAROO — CORE  (jump-tens-core.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.8 — mentally add 10 or 100 to a number 100–900, and mentally
   subtract 10 or 100 from a number 100–900. First skin: "Skip the Kangaroo."
   Pure cognition, NO DOM. The child reads a START number and a hop
   (10 more / 10 less / 100 more / 100 less) and types the result.

   THE ANSWER IS DERIVED FROM THE OPERANDS, NEVER STORED. A round stores
   {start, delta} (delta ∈ {+10,−10,+100,−100}) — never the result.
   `oracle` = start + delta. The defining place-value-jump invariant: the
   ONES digit of the result equals the ones digit of the start (a tens/
   hundreds hop never touches the ones). 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var DELTAS = [10, -10, 100, -100];

  function oracle(round) { return round.start + round.delta; }
  function isAnswer(round, n) { return n === oracle(round); }

  /* kid-words for the hop, EN (e.g. "10 more", "100 less") */
  function hopWord(round) { return Math.abs(round.delta) + (round.delta > 0 ? ' more' : ' less'); }
  function dir(round) { return round.delta > 0 ? 'more' : 'less'; }

  function childView(round) {
    return { start: round.start, deltaAbs: Math.abs(round.delta), dir: dir(round), hop: hopWord(round) };  /* result NOT exposed */
  }

  function facts(round) {
    var res = oracle(round);
    return {
      validDelta: DELTAS.indexOf(round.delta) >= 0,
      inRange: res >= 100 && res <= 900 && round.start >= 100 && round.start <= 900,
      onesUnchanged: (res % 10) === (round.start % 10),     /* the place-value-jump invariant */
      derivedNotStored: !('result' in round) && !('answer' in round)
    };
  }

  function deckFacts(rounds) {
    var deltas = {}, ans = {}, ids = {};
    (rounds || []).forEach(function (r, i) { deltas[r.delta] = 1; ans[oracle(r)] = (ans[oracle(r)] || 0) + 1; ids[i] = 1; });
    return { total: (rounds || []).length, distinctDeltas: Object.keys(deltas).map(Number), answerCounts: ans, distinctExercises: Object.keys(ids).length };
  }

  function audit(round) {
    return { start: round.start, delta: round.delta, hop: hopWord(round), correct: oracle(round) };
  }

  global.JumpTensCore = {
    DELTAS: DELTAS,
    oracle: oracle, isAnswer: isAnswer, hopWord: hopWord, dir: dir,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

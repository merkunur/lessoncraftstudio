/* =====================================================================
   SPAN'S LENGTH GAP — CORE  (length-gap-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.4 — measure to determine how much LONGER one object is than
   another, expressing the difference in length units. First skin: "Span's
   Length Gap." Pure cognition, NO DOM. Two labeled bars; the child types how
   much longer the longer one is. 0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED, NEVER STORED: answer = aLen - bLen (aLen > bLen). A
   round stores { id, aLabel, aLen, bLabel, bLen, unit }. childView exposes the
   two labels + lengths (the DATA the child reads) but never a stored answer.
   Keypad has no card-position to game; the meaningful bots are FIXED-GUESS
   (always type the most-common difference), ECHO-A (type aLen), ECHO-B (type
   bLen) — the manifest keeps each well under chance (no diff === an operand).
   ===================================================================== */
(function (global) {
  'use strict';

  function answerValue(round) { return round.aLen - round.bLen; }
  function grade(round, typed) { return Number(typed) === answerValue(round); }
  function childView(round) { return { aLabel: round.aLabel, aLen: round.aLen, bLabel: round.bLabel, bLen: round.bLen, unit: round.unit }; }

  function facts(round) {
    var d = answerValue(round);
    return {
      aLongerThanB: round.aLen > round.bLen,
      lensInRange: round.aLen > 0 && round.aLen <= 20 && round.bLen > 0 && round.bLen <= 20,
      diffPositive: d > 0,
      notEchoA: d !== round.aLen,
      notEchoB: d !== round.bLen
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, ans = {}, echoA = 0, echoB = 0;
    rounds.forEach(function (r) {
      var d = answerValue(r);
      ans[d] = (ans[d] || 0) + 1;
      if (d === r.aLen) echoA++;
      if (d === r.bLen) echoB++;
    });
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, fixedGuessBot: maxAns / n, echoABot: echoA / n, echoBBot: echoB / n };
  }

  function audit(round) { return { a: round.aLabel + ' ' + round.aLen, b: round.bLabel + ' ' + round.bLen, unit: round.unit, answer: answerValue(round) }; }

  global.LengthGapCore = {
    answerValue: answerValue, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

/* =====================================================================
   TALLY THE SQUIRREL — CORE  (add-stack-core.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.6 — add up to four two-digit numbers using strategies based
   on place value. First skin: "Tally the Squirrel." Pure cognition, NO DOM.
   The child reads 2–4 baskets (each a two-digit count) and types the total.

   THE ANSWER IS DERIVED FROM THE OPERANDS, NEVER STORED. A round stores
   {addends:[...]} (2–4 two-digit numbers) — never the total. `oracle` =
   sum(addends). 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function sum(addends) { return (addends || []).reduce(function (a, b) { return a + b; }, 0); }
  function oracle(round) { return sum(round.addends); }
  function isAnswer(round, n) { return n === oracle(round); }

  function childView(round) {
    return { addends: (round.addends || []).slice(), count: (round.addends || []).length };  /* total NOT exposed */
  }

  function facts(round) {
    var a = round.addends || [];
    return {
      countInRange: a.length >= 2 && a.length <= 4,
      allTwoDigit: a.length > 0 && a.every(function (x) { return x >= 10 && x <= 99; }),
      derivedNotStored: !('total' in round) && !('answer' in round),
      totalInBound: oracle(round) <= 140
    };
  }

  function deckFacts(rounds) {
    var counts = {}, ans = {}, maxBot = 0, firstBot = 0;
    (rounds || []).forEach(function (r) {
      var a = r.addends || []; counts[a.length] = (counts[a.length] || 0) + 1;
      var t = oracle(r); ans[t] = (ans[t] || 0) + 1;
      if (Math.max.apply(null, a) === t) maxBot++;
      if (a[0] === t) firstBot++;
    });
    return { total: (rounds || []).length, addendCounts: counts, answerCounts: ans, largestAddendHits: maxBot, firstAddendHits: firstBot };
  }

  function audit(round) {
    return { addends: (round.addends || []).slice(), correct: oracle(round) };
  }

  global.AddStackCore = {
    sum: sum, oracle: oracle, isAnswer: isAnswer,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

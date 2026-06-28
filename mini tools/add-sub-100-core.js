/* =====================================================================
   GUS'S SNACK CART — CORE  (add-sub-100-core.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.B.5 — fluently add and subtract within 100 using strategies.
   First skin: "Gus's Snack Cart." Pure cognition, NO DOM. A round is a small
   restock/sell story → a number sentence (a + b OR a − b); the child types the
   answer on the shell keypad. 0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED, NEVER STORED: answer = (op==='+') ? a+b : a-b. A round
   stores only { id, a, b, op, item, verb }. `childView` exposes {a,b,op} only —
   never the answer. Keypad has no card-position to game; the meaningful bots are
   FIXED-GUESS (always type the most-common answer), ECHO-A (type a), ECHO-B
   (type b) — the manifest keeps each well under chance.
   ===================================================================== */
(function (global) {
  'use strict';

  function answerValue(round) { return round.op === '+' ? round.a + round.b : round.a - round.b; }
  function grade(round, typed) { return Number(typed) === answerValue(round); }
  function childView(round) { return { a: round.a, b: round.b, op: round.op }; }

  function facts(round) {
    var v = answerValue(round);
    return {
      opValid: round.op === '+' || round.op === '-',
      resultInRange: v >= 0 && v <= 100,
      operandsInRange: round.a >= 0 && round.a <= 100 && round.b >= 0 && round.b <= 100,
      bNonZero: round.b >= 1,                                  /* keeps echo-a a real miss */
      withinHundred: round.op === '+' ? (round.a + round.b) <= 100 : round.a <= 100
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, ans = {}, echoA = 0, echoB = 0, hasAdd = false, hasSub = false;
    rounds.forEach(function (r) {
      var v = answerValue(r);
      ans[v] = (ans[v] || 0) + 1;
      if (v === r.a) echoA++;
      if (v === r.b) echoB++;
      if (r.op === '+') hasAdd = true;
      if (r.op === '-') hasSub = true;
    });
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, opMix: hasAdd && hasSub, fixedGuessBot: maxAns / n, echoABot: echoA / n, echoBBot: echoB / n };
  }

  function audit(round) { return { a: round.a, op: round.op, b: round.b, answer: answerValue(round) }; }

  global.AddSub100Core = {
    answerValue: answerValue, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

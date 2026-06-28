/* =====================================================================
   ATLAS'S FACT FILES — CORE  (fact-detail-core.js)
   ---------------------------------------------------------------------
   CCSS RI.K.1 — with prompting and support, ask and answer questions about key
   details in an informational text. First skin: "Atlas's Fact Files." Pure
   cognition, NO DOM. The child reads a short real-fact blurb, then taps the
   answer to a key-detail question. 0 lines to any protected core +
   lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY MATCH, NEVER A STORED INDEX. A round stores
   { id, fact, question, answer, options:[3] }; oracle = options.indexOf(answer)
   (a hand-authored index is ignored); exactly one option === answer. The answer
   is genuinely FINDABLE in the fact text (it is a substring of `fact`), so the
   task is a real comprehension check. childView exposes {fact, question,
   options:[{text}]} only — no flag for which option is correct.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) { return (round.options || []).indexOf(round.answer); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var o = (round.options || [])[id]; return o != null && o === round.answer; }

  function childView(round) {
    return { fact: round.fact, question: round.question, options: (round.options || []).map(function (o, i) { return { id: i, text: o }; }) };
  }

  function norm(s) { return String(s == null ? '' : s).toLowerCase(); }

  function facts(round) {
    var opts = round.options || [];
    return {
      hasAnswer: typeof round.answer === 'string' && round.answer.length > 0,
      oneMatch: opts.filter(function (o) { return o === round.answer; }).length === 1,
      threeOptions: opts.length === 3,
      distinct: new Set(opts).size === opts.length,
      answerInFact: norm(round.fact).indexOf(norm(round.answer)) >= 0
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var opts = r.options || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[r.answer] = (ans[r.answer] || 0) + 1;
      var lens = opts.map(function (o) { return o.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { return { fact: round.fact, question: round.question, options: round.options, answer: round.answer }; }

  global.FactDetailCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

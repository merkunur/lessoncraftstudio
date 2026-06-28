/* =====================================================================
   LINC'S FACT CHAIN — CORE  (fact-connect-core.js)
   ---------------------------------------------------------------------
   CCSS RI.K.3 — describe the connection between two individual events, ideas, or
   pieces of information in a text. First skin: "Linc's Fact Chain." Pure
   cognition, NO DOM. The child reads a stem fact, then taps the fact that
   correctly CONNECTS — what happens next (sequence) or what it causes (cause).
   0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY MATCH, NEVER A STORED INDEX. A round stores
   { id, mode:'sequence'|'cause', stem, question, answer, options:[3] }; oracle =
   options.indexOf(answer); exactly one option === answer. childView exposes
   {stem, question, options:[{text}]} only — no flag for which option connects.
   The bank carries BOTH modes (sequence + cause) so the child must read, not
   pattern-match on one connector.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) { return (round.options || []).indexOf(round.answer); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var o = (round.options || [])[id]; return o != null && o === round.answer; }

  function childView(round) {
    return { stem: round.stem, question: round.question, options: (round.options || []).map(function (o, i) { return { id: i, text: o }; }) };
  }

  function facts(round) {
    var opts = round.options || [];
    return {
      modeValid: round.mode === 'sequence' || round.mode === 'cause',
      hasAnswer: typeof round.answer === 'string' && round.answer.length > 0,
      oneMatch: opts.filter(function (o) { return o === round.answer; }).length === 1,
      threeOptions: opts.length === 3,
      distinct: new Set(opts).size === opts.length,
      hasStem: typeof round.stem === 'string' && round.stem.length > 0
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, seq = 0, cau = 0;
    rounds.forEach(function (r) {
      var opts = r.options || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[r.answer] = (ans[r.answer] || 0) + 1;
      if (r.mode === 'sequence') seq++; else if (r.mode === 'cause') cau++;
      var lens = opts.map(function (o) { return o.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n, sequence: seq, cause: cau, modeMix: seq > 0 && cau > 0 };
  }

  function audit(round) { return { mode: round.mode, stem: round.stem, question: round.question, options: round.options, answer: round.answer }; }

  global.FactConnectCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

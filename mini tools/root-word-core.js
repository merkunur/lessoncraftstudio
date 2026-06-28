/* =====================================================================
   SAGE'S ROOT GARDEN — CORE  (root-word-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.c — use a known root word as a clue to the meaning of an unknown
   word with the same root. First skin: "Sage's Root Garden." Pure cognition, NO
   DOM. Given a known ROOT word, the child taps the word that GROWS from it (its
   word family), using the root as the clue.

   ANSWER IS DERIVED BY ROOT-FAMILY MATCH, NEVER A STORED INDEX. A round stores
   {root, correct, choices:[{word}×3]} — exactly one choice.word equals the
   correct derivative (which contains the root as its base); `oracle` = that
   choice; foils are similar-spelled words from a DIFFERENT root. 0 lines to any
   protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].word === round.correct) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.word === round.correct; }

  function childView(round) {
    return { root: round.root, choices: (round.choices || []).map(function (c, i) { return { id: i, word: c.word }; }) };
  }

  function facts(round) {
    var ch = round.choices || [], words = ch.map(function (c) { return c.word; });
    return {
      oneMatch: words.filter(function (w) { return w === round.correct; }).length === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(words).size === words.length,
      correctFromRoot: typeof round.correct === 'string' && typeof round.root === 'string' && round.correct.toLowerCase().indexOf(round.root.toLowerCase()) === 0
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ch[ci].word] = (ans[ch[ci].word] || 0) + 1;
      var lens = ch.map(function (c) { return c.word.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { var ci = correctIndex(round); return { root: round.root, correct: round.correct, choices: (round.choices || []).map(function (c) { return c.word; }), answer: (round.choices[ci] || {}).word }; }

  global.RootWordCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

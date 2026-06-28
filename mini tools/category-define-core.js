/* =====================================================================
   OLIVE'S KIND-OF TREE — CORE  (category-define-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.b — define words by category and by one or more key attributes.
   First skin: "Olive's Kind-Of Tree." Pure cognition, NO DOM. The child sees a
   picture with a short attribute clue and taps the CATEGORY it belongs to.

   ANSWER IS DERIVED BY CATEGORY MATCH, NEVER A STORED INDEX. A round stores
   {target:{noun,themeDir}, clue, category, choices:[{word}×3]} — exactly one
   choice.word equals the category; `oracle` = that choice; the foils are
   clearly-different categories. 0 lines to any protected core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].word === round.category) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.word === round.category; }

  function childView(round) {
    return { target: { noun: round.target.noun, themeDir: round.target.themeDir }, clue: round.clue, choices: (round.choices || []).map(function (c, i) { return { id: i, word: c.word }; }) };
  }

  function facts(round) {
    var ch = round.choices || [], words = ch.map(function (c) { return c.word; });
    return {
      oneMatch: words.filter(function (w) { return w === round.category; }).length === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(words).size === words.length,
      hasClue: !!round.clue
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

  function allNouns(rounds) {
    var s = {};
    (rounds || []).forEach(function (r) { s[r.target.noun] = r.target.themeDir; });   /* only the picture target needs an image */
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { picture: round.target.noun, clue: round.clue, category: round.category, choices: (round.choices || []).map(function (c) { return c.word; }), answer: (round.choices[ci] || {}).word }; }

  global.CategoryDefineCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

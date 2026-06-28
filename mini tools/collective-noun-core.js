/* =====================================================================
   MANGO'S ANIMAL GROUPS — CORE  (collective-noun-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.a — use collective nouns (e.g., group). First skin: "Mango's Animal
   Groups." Pure cognition, NO DOM. The child sees a pictured animal and taps the
   word for a GROUP of them (a group of cows is a herd).

   ANSWER IS DERIVED BY WORD MATCH, NEVER A STORED INDEX. A round stores
   {subject:{noun,themeDir}, plural, correct, choices:[{word}×3]} — exactly one
   choice.word equals the correct collective noun; `oracle` = that choice; the
   foils are other collective nouns. 0 lines to any protected core + lcs-shell.
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
    return { subject: { noun: round.subject.noun, themeDir: round.subject.themeDir }, plural: round.plural, choices: (round.choices || []).map(function (c, i) { return { id: i, word: c.word }; }) };
  }

  function facts(round) {
    var ch = round.choices || [], words = ch.map(function (c) { return c.word; });
    return {
      oneMatch: words.filter(function (w) { return w === round.correct; }).length === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(words).size === words.length,
      hasPlural: !!round.plural
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
    (rounds || []).forEach(function (r) { s[r.subject.noun] = r.subject.themeDir; });   /* only the subject picture needs an image */
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { subject: round.subject.noun, plural: round.plural, correct: round.correct, choices: (round.choices || []).map(function (c) { return c.word; }), answer: (round.choices[ci] || {}).word }; }

  global.CollectiveNounCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

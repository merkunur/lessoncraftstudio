/* =====================================================================
   BINGO'S WORD HUNT — CORE  (word-match-core.js)
   ---------------------------------------------------------------------
   CCSS RF.K.3.d — distinguish similarly spelled words by identifying the sounds
   of the letters that differ. First skin: "Bingo's Word Hunt." Pure cognition,
   NO DOM. INVERTS the named decoding game: the child sees a PICTURE and 3
   printed near-words, and taps the WORD that reads as the picture.

   ANSWER IS DERIVED BY WORD MATCH, NEVER A STORED INDEX. A round stores
   {target:{noun,themeDir}, choices:[{word}×3]} — exactly one choice.word equals
   the target noun; the two foils are minimal pairs (share onset+coda, differ in
   the vowel: cat/cot/cut) so first- and last-letter matching both fail. `oracle`
   = the choice whose word === target.noun. 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [], n = (round.target || {}).noun;
    for (var i = 0; i < ch.length; i++) { if (ch[i].word === n) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.word === (round.target || {}).noun; }

  function childView(round) {
    return { target: { noun: round.target.noun, themeDir: round.target.themeDir }, choices: (round.choices || []).map(function (c, i) { return { id: i, word: c.word }; }) };
  }

  /* same length AND exactly one position differs */
  function differsByOne(a, b) {
    if (a.length !== b.length) return false;
    var d = 0; for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) d++; }
    return d === 1;
  }

  function facts(round) {
    var ch = round.choices || [], ans = (round.target || {}).noun;
    var words = ch.map(function (c) { return c.word; });
    var nMatch = words.filter(function (w) { return w === ans; }).length;
    var foilsMinimalPair = words.filter(function (w) { return w !== ans; }).every(function (w) { return differsByOne(w, ans); });
    return {
      oneMatch: nMatch === 1,
      foilsMinimalPair: foilsMinimalPair,
      threeChoices: ch.length === 3,
      distinct: new Set(words).size === words.length
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

  function audit(round) { var ci = correctIndex(round); return { picture: round.target.noun, choices: (round.choices || []).map(function (c) { return c.word; }), answer: (round.choices[ci] || {}).word }; }

  global.WordMatchCore = {
    oracle: oracle, grade: grade, childView: childView, differsByOne: differsByOne,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

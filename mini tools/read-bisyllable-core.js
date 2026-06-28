/* =====================================================================
   DOMINO'S TWO-PART WORDS — CORE  (read-bisyllable-core.js)
   ---------------------------------------------------------------------
   CCSS RF.1.3.e — decode two-syllable words by breaking the words into
   syllables. First skin: "Domino's Two-Part Words." Pure cognition, NO DOM. The
   child reads a printed two-syllable word shown SPLIT into syllables (rab·bit)
   and taps the picture it names.

   ANSWER IS DERIVED BY NOUN MATCH, NEVER A STORED INDEX. A round stores
   {word, syl:[s1,s2], choices:[{noun,themeDir}×3]} — exactly one choice.noun
   equals the printed word; `oracle` = that choice. The syllable split is the
   decoding cue (and must join back to the word). 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].noun === round.word) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.noun === round.word; }

  function childView(round) {
    return { word: round.word, syl: (round.syl || []).slice(), choices: (round.choices || []).map(function (c, i) { return { id: i, noun: c.noun, themeDir: c.themeDir }; }) };
  }

  function facts(round) {
    var ch = round.choices || [];
    var nMatch = ch.filter(function (c) { return c.noun === round.word; }).length;
    return {
      sylJoinsToWord: (round.syl || []).join('') === round.word,
      twoSyllables: (round.syl || []).length === 2,
      oneMatch: nMatch === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(ch.map(function (c) { return c.noun; })).size === ch.length
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ch[ci].noun] = (ans[ch[ci].noun] || 0) + 1;
      var lens = ch.map(function (c) { return c.noun.length; });
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
    (rounds || []).forEach(function (r) { (r.choices || []).forEach(function (c) { s[c.noun] = c.themeDir; }); });
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { word: round.word, syl: round.syl, choices: (round.choices || []).map(function (c) { return c.noun; }), answer: (round.choices[ci] || {}).noun }; }

  global.ReadBisyllableCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

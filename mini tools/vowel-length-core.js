/* =====================================================================
   STRETCH THE GIRAFFE — CORE  (vowel-length-core.js)
   ---------------------------------------------------------------------
   CCSS RF.1.2.a — distinguish long from short vowel sounds in spoken
   single-syllable words. First skin: "Stretch the Giraffe." Pure cognition, NO
   DOM. The child hears picture-words and taps the one whose vowel is long (or
   short — the ask alternates).

   ANSWER IS DERIVED FROM THE VOWEL TAG, NEVER A STORED INDEX. A round stores
   {ask:'long'|'short', choices:[{noun,themeDir,vowel}×3]} with exactly one
   choice whose vowel === ask. `oracle` = that choice. The ask ALTERNATES so a
   prompt-ignoring "always pick the long one" reader fails. 0 lines to any
   protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].vowel === round.ask) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.vowel === round.ask; }

  function childView(round) {
    return { ask: round.ask, choices: (round.choices || []).map(function (c, i) { return { id: i, noun: c.noun, themeDir: c.themeDir }; }) };
  }

  function facts(round) {
    var ch = round.choices || [];
    var nMatch = ch.filter(function (c) { return c.vowel === round.ask; }).length;
    return {
      validAsk: round.ask === 'long' || round.ask === 'short',
      exactlyOneMatch: nMatch === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(ch.map(function (c) { return c.noun; })).size === ch.length,
      allTagged: ch.every(function (c) { return c.vowel === 'long' || c.vowel === 'short'; })
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, askLong = 0;
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ch[ci].noun] = (ans[ch[ci].noun] || 0) + 1;
      if (r.ask === 'long') askLong++;
      var lens = ch.map(function (c) { return c.noun.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n, askLong: askLong, askShort: rounds.length - askLong };
  }

  function allNouns(rounds) {
    var s = {};
    (rounds || []).forEach(function (r) { (r.choices || []).forEach(function (c) { s[c.noun] = c.themeDir; }); });
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { ask: round.ask, answer: (round.choices[ci] || {}).noun, choices: round.choices }; }

  global.VowelLengthCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

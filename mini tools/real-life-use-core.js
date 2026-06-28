/* =====================================================================
   JASPER'S JUST-RIGHT BAG — CORE  (real-life-use-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.c — identify real-life connections between words and their use.
   First skin: "Jasper's Just-Right Bag." Pure cognition, NO DOM. The child
   reads a real-life situation and taps the picture of the thing they'd use.

   ANSWER IS DERIVED BY NOUN MATCH, NEVER A STORED INDEX. A round stores
   {situation, correctNoun, choices:[{noun,themeDir}×3]} — exactly one
   choice.noun equals correctNoun; `oracle` = that choice. The foils are
   everyday objects that DON'T fit the situation (and a given object is correct
   in one round / a foil in another). 0 lines to any protected core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].noun === round.correctNoun) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.noun === round.correctNoun; }

  function childView(round) {
    return { situation: round.situation, choices: (round.choices || []).map(function (c, i) { return { id: i, noun: c.noun, themeDir: c.themeDir }; }) };
  }

  function facts(round) {
    var ch = round.choices || [], nouns = ch.map(function (c) { return c.noun; });
    return {
      oneMatch: nouns.filter(function (nn) { return nn === round.correctNoun; }).length === 1,
      threeChoices: ch.length === 3,
      distinct: new Set(nouns).size === nouns.length,
      hasSituation: !!round.situation
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

  function audit(round) { var ci = correctIndex(round); return { situation: round.situation, choices: (round.choices || []).map(function (c) { return c.noun; }), answer: (round.choices[ci] || {}).noun }; }

  global.RealLifeUseCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

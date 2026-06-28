/* =====================================================================
   ZIGGY'S ODD ONE OUT — CORE  (odd-one-out-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.a — sort words into categories to gain a sense of the concepts the
   categories represent. First skin: "Ziggy's Odd One Out." Pure cognition, NO
   DOM. The flip side of sorting: 4 pictures, 3 from one category + 1 outsider —
   the child taps the one that DOESN'T belong.

   ANSWER IS DERIVED FROM THE CATEGORIES, NEVER A STORED INDEX. A round stores
   {items:[{noun,themeDir,category}×4]} with exactly 3 sharing one category and 1
   differing; `oracle` = the outsider (the item whose category is the minority).
   0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function counts(round) {
    var c = {}; (round.items || []).forEach(function (it) { c[it.category] = (c[it.category] || 0) + 1; });
    return c;
  }
  function correctIndex(round) {
    var c = counts(round), items = round.items || [];
    for (var i = 0; i < items.length; i++) { if (c[items[i].category] === 1) return i; }   /* the minority-of-one */
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return id === correctIndex(round); }

  function childView(round) {
    return { items: (round.items || []).map(function (it, i) { return { id: i, noun: it.noun, themeDir: it.themeDir }; }) };   /* category NOT exposed */
  }

  function facts(round) {
    var items = round.items || [], c = counts(round), cats = Object.keys(c);
    var ones = cats.filter(function (k) { return c[k] === 1; });
    var threes = cats.filter(function (k) { return c[k] === 3; });
    return {
      fourItems: items.length === 4,
      cleanSplit: ones.length === 1 && threes.length === 1 && cats.length === 2,   /* exactly 3-1 */
      distinct: new Set(items.map(function (it) { return it.noun; })).size === items.length
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var items = r.items || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[items[ci].noun] = (ans[items[ci].noun] || 0) + 1;
      var lens = items.map(function (it) { return it.noun.length; });
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
    (rounds || []).forEach(function (r) { (r.items || []).forEach(function (it) { s[it.noun] = it.themeDir; }); });
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { items: (round.items || []).map(function (it) { return it.noun + '/' + it.category; }), odd: (round.items[ci] || {}).noun }; }

  global.OddOneOutCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

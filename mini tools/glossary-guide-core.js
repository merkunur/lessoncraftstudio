/* =====================================================================
   BOOKER'S GLOSSARY DESK — CORE  (glossary-guide-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.e — use a glossary/beginning dictionary; guide words are its
   canonical navigation tool. First skin: "Booker's Glossary Desk." Pure
   cognition, NO DOM. A glossary page shows two GUIDE WORDS; the child taps
   the word that belongs ON that page (alphabetically between the guides).

   THE ANSWER IS DERIVED BY ALPHABETICAL COMPARISON, NEVER STORED. A round
   stores {g1, g2, words:[3]} — never which is correct. `oracle` = the single
   word w with lower(g1) <= lower(w) <= lower(g2). Foils are out of range and
   (by data design) at least one out-of-range foil SHARES the guides' first
   letter, so first-letter matching alone fails. 0 lines to any protected core
   + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function lc(s) { return String(s == null ? '' : s).toLowerCase(); }
  function inRange(round, w) { var x = lc(w); return lc(round.g1) <= x && x <= lc(round.g2); }
  function correctIndex(round) {
    var ws = round.words || [];
    for (var i = 0; i < ws.length; i++) { if (inRange(round, ws[i])) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var w = (round.words || [])[id]; return w != null && inRange(round, w); }

  function childView(round) {
    return { g1: round.g1, g2: round.g2, words: (round.words || []).map(function (w, i) { return { id: i, text: w }; }) };
  }

  function facts(round) {
    var ws = round.words || [];
    var nIn = ws.filter(function (w) { return inRange(round, w); }).length;
    var gl = lc(round.g1)[0];
    var sameLetterFoil = ws.some(function (w) { return !inRange(round, w) && lc(w)[0] === gl; });
    return {
      guidesOrdered: lc(round.g1) < lc(round.g2),
      exactlyOneInRange: nIn === 1,
      sameLetterFoil: sameLetterFoil,         /* forces beyond-first-letter reasoning */
      threeWords: ws.length === 3,
      distinct: new Set(ws.map(lc)).size === ws.length
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var ws = r.words || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[lc(ws[ci])] = (ans[lc(ws[ci])] || 0) + 1;
      var lens = ws.map(function (w) { return String(w).length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { return { g1: round.g1, g2: round.g2, words: round.words, correct: (round.words || [])[correctIndex(round)] }; }

  global.GlossaryGuideCore = {
    inRange: inRange, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

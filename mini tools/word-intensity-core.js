/* =====================================================================
   ROARY'S ROAR METER — CORE  (word-intensity-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.5.b — distinguish shades of meaning among closely related verbs and
   adjectives. First skin: "Roary's Roar Meter." Pure cognition, NO DOM. Given a
   graded set of 3 related words, the child taps the STRONGEST (or WEAKEST) one.

   ANSWER IS DERIVED FROM THE RANKS, NEVER A STORED INDEX. A round stores
   {setId, ask:'strongest'|'weakest', words:[{word,rank}×3]} (ranks 1<2<3).
   `oracle` = the word with the max rank (strongest) or min rank (weakest). The
   MIDDLE-rank word is never the answer. The ask ALTERNATES so a prompt-ignoring
   reader fails. 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function targetRank(round) {
    var ranks = (round.words || []).map(function (w) { return w.rank; });
    return round.ask === 'weakest' ? Math.min.apply(null, ranks) : Math.max.apply(null, ranks);
  }
  function correctIndex(round) {
    var tr = targetRank(round), ch = round.words || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].rank === tr) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var w = (round.words || [])[id]; return !!w && w.rank === targetRank(round); }

  function childView(round) {
    return { ask: round.ask, words: (round.words || []).map(function (w, i) { return { id: i, word: w.word }; }) };
  }

  function facts(round) {
    var ws = round.words || [], ranks = ws.map(function (w) { return w.rank; });
    var distinctRanks = new Set(ranks).size === ranks.length;
    var ci = correctIndex(round), midRank = ranks.slice().sort(function (a, b) { return a - b; })[1];
    return {
      validAsk: round.ask === 'strongest' || round.ask === 'weakest',
      threeWords: ws.length === 3,
      ranksDistinct: distinctRanks,
      distinct: new Set(ws.map(function (w) { return w.word; })).size === ws.length,
      answerNotMiddle: ci >= 0 && ws[ci].rank !== midRank
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, askStrong = 0, midHits = 0;
    rounds.forEach(function (r) {
      var ws = r.words || [], ci = correctIndex(r), ranks = ws.map(function (w) { return w.rank; });
      var midRank = ranks.slice().sort(function (a, b) { return a - b; })[1];
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ws[ci].word] = (ans[ws[ci].word] || 0) + 1;
      if (r.ask === 'strongest') askStrong++;
      if (ws[ci].rank === midRank) midHits++;
      var lens = ws.map(function (w) { return w.word.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n, askStrong: askStrong, askWeak: rounds.length - askStrong, middleHits: midHits };
  }

  function audit(round) { var ci = correctIndex(round); return { setId: round.setId, ask: round.ask, words: (round.words || []).map(function (w) { return w.word + '(' + w.rank + ')'; }), answer: (round.words[ci] || {}).word }; }

  global.WordIntensityCore = {
    oracle: oracle, grade: grade, childView: childView, targetRank: targetRank,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

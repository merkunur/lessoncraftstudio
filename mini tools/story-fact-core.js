/* =====================================================================
   BEA'S TWO BOOKSHELVES — CORE  (story-fact-core.js)
   ---------------------------------------------------------------------
   CCSS RL.1.5 — explain major differences between books that tell stories and
   books that give information. First skin: "Bea's Two Bookshelves." Pure
   cognition, NO DOM. 3 book cards (title + content blurb, NO type shown); the
   prompt alternates "tell a STORY?" / "give real FACTS?"; the child taps the
   book of the asked kind. 0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY TYPE-MATCH, NEVER A STORED INDEX. A round stores
   { id, ask, books:[{title, blurb, type}×3] } with EXACTLY ONE book whose
   type === ask; `oracle` = that book. `childView` exposes {ask, books:[{title,
   blurb}]} only — never `type` (the child must READ to decide). ask-flip
   (half story-asked, half fact-asked) so the child can't ignore the prompt.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var b = round.books || [];
    for (var i = 0; i < b.length; i++) { if (b[i].type === round.ask) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.books || [])[id]; return !!c && c.type === round.ask; }

  function childView(round) {
    return { ask: round.ask, books: (round.books || []).map(function (b, i) { return { id: i, title: b.title, blurb: b.blurb }; }) };
  }

  function facts(round) {
    var b = round.books || [], titles = b.map(function (x) { return x.title; });
    return {
      askValid: round.ask === 'story' || round.ask === 'fact',
      oneOfAsk: b.filter(function (x) { return x.type === round.ask; }).length === 1,
      threeBooks: b.length === 3,
      distinctTitles: new Set(titles).size === titles.length,
      typesValid: b.every(function (x) { return x.type === 'story' || x.type === 'fact'; })
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, askStory = 0, askFact = 0;
    rounds.forEach(function (r) {
      var b = r.books || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[b[ci].title] = (ans[b[ci].title] || 0) + 1;
      if (r.ask === 'story') askStory++; else if (r.ask === 'fact') askFact++;
      var lens = b.map(function (x) { return x.title.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n, askStory: askStory, askFact: askFact, askBalanced: Math.abs(askStory - askFact) <= 1 };
  }

  function audit(round) { var ci = correctIndex(round); return { ask: round.ask, books: (round.books || []).map(function (b) { return b.title + '[' + b.type + ']'; }), answer: (round.books[ci] || {}).title }; }

  global.StoryFactCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

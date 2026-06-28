/* =====================================================================
   WALLY'S CAPITAL CRANE — CORE  (capital-name-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.2.a — capitalize holidays, product names, and geographic names.
   First skin: "Wally's Capital Crane." Pure cognition, NO DOM. A sentence is
   shown as word chips (the sentence-start word already correctly capitalized);
   exactly ONE mid-sentence word is a special name written lowercase. The child
   taps the chip that needs a capital letter. 0 lines to any protected core +
   lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY MATCH, NEVER A STORED INDEX. A round stores
   { id, tokens:[…], proper } where `proper` is the lowercase special-name token;
   oracle = tokens.indexOf(proper); the capitalized form = capitalize(proper).
   A hand-authored index is ignored. childView shows the tokens only (no flag for
   which is the special name — the child must know the rule).
   ===================================================================== */
(function (global) {
  'use strict';

  function capitalize(w) { return w ? w.charAt(0).toUpperCase() + w.slice(1) : w; }
  function correctIndex(round) { return (round.tokens || []).indexOf(round.proper); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return id === correctIndex(round); }

  function childView(round) {
    return { tokens: (round.tokens || []).map(function (w, i) { return { id: i, word: w }; }) };
  }

  function isWord(t) { return /[A-Za-z]/.test(t); }
  function startIndex(round) {
    var t = round.tokens || [];
    for (var i = 0; i < t.length; i++) { if (isWord(t[i])) return i; }
    return -1;
  }

  function facts(round) {
    var t = round.tokens || [], ci = correctIndex(round);
    return {
      hasProper: typeof round.proper === 'string' && round.proper.length > 0,
      oneMatch: t.filter(function (w) { return w === round.proper; }).length === 1,
      properLower: typeof round.proper === 'string' && round.proper === round.proper.toLowerCase(),
      notSentenceStart: ci !== startIndex(round),
      capForm: capitalize(round.proper) !== round.proper
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var t = r.tokens || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[r.proper] = (ans[r.proper] || 0) + 1;
      /* only the WORD chips are tappable candidates for a length bot */
      var wordIdx = t.map(function (w, i) { return isWord(w) ? i : -1; }).filter(function (i) { return i >= 0; });
      var lens = wordIdx.map(function (i) { return t[i].length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      var cl = t[ci].length;
      if (cl === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (cl === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { var ci = correctIndex(round); return { tokens: (round.tokens || []).join(' '), proper: round.proper, answer: capitalize(round.proper), index: ci }; }

  global.CapitalNameCore = {
    capitalize: capitalize, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

/* =====================================================================
   FERN'S CLUE GARDEN — CORE  (context-clue-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.a — use sentence-level context as a clue to a word's meaning.
   First skin: "Fern's Clue Garden." Pure cognition, NO DOM. The child reads a
   sentence containing a multi-meaning word and picks the meaning the SENTENCE
   points to.

   ANSWER IS DERIVED FROM THE CARD KINDS, NEVER A BARE STORED ANSWER. A round
   stores {sentence, word, choices:[{text, kind}]} with kinds:
     • 'correct'    — the context-true meaning
     • 'no-context' — the word's OTHER common sense, ignoring the clue (the
                      obvious-looking foil: a "meaning in isolation" reader bites)
     • 'off'        — unrelated.
   `oracle` = the index of the 'correct' card. A naive "pick the dominant
   meaning" / "pick the wordiest match" solver fails by construction. 0 lines
   to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var STOP = {};
  ('the a an to at of on in so it its is that and for with was were he she they you we i my her his ' +
   'began started during out up down next after over this these those then there here as by from').split(' ')
    .forEach(function (w) { STOP[w] = 1; });

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].kind === 'correct') return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.kind === 'correct'; }

  function childView(round) {
    return { sentence: round.sentence, word: round.word, choices: (round.choices || []).map(function (c, i) { return { id: i, text: c.text }; }) };
  }

  /* content-word tokens, lowercase, minus stopwords + the target word itself */
  function contentTokens(s, word) {
    var w = String(word || '').toLowerCase();
    return String(s || '').toLowerCase().replace(/[.,!?;:'"]/g, '').split(/\s+/)
      .filter(function (t) { return t && !STOP[t] && t !== w; });
  }
  function overlapCount(choiceText, sentence, word) {
    var st = {}; contentTokens(sentence, word).forEach(function (t) { st[t] = 1; });
    var n = 0, seen = {};
    contentTokens(choiceText, word).forEach(function (t) { if (st[t] && !seen[t]) { seen[t] = 1; n++; } });
    return n;
  }
  /* index of the UNIQUE max-overlap choice, or -1 if tie/none */
  function maxOverlapIndex(round) {
    var best = -1, bestN = -1, tie = false;
    (round.choices || []).forEach(function (c, i) {
      var n = overlapCount(c.text, round.sentence, round.word);
      if (n > bestN) { bestN = n; best = i; tie = false; }
      else if (n === bestN) { tie = true; }
    });
    return (tie || bestN <= 0) ? -1 : best;
  }

  function facts(round) {
    var ch = round.choices || [];
    var nCorrect = ch.filter(function (c) { return c.kind === 'correct'; }).length;
    var texts = ch.map(function (c) { return c.text; });
    return {
      oneCorrect: nCorrect === 1,
      hasNoContext: ch.some(function (c) { return c.kind === 'no-context'; }),
      threeChoices: ch.length === 3,
      distinct: new Set(texts).size === ch.length,
      wordInSentence: String(round.sentence || '').toLowerCase().indexOf(String(round.word || '').toLowerCase()) >= 0
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, overlapHits = 0, posCount = {};
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      var lens = ch.map(function (c) { return c.text.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
      if (maxOverlapIndex(r) === ci) overlapHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    return { total: rounds.length, longestBot: longHits / n, shortestBot: shortHits / n, overlapBot: overlapHits / n, positionBot: maxPos / n };
  }

  function audit(round) { return { word: round.word, sentence: round.sentence, correct: (round.choices[correctIndex(round)] || {}).text, choices: round.choices }; }

  global.ContextClueCore = {
    oracle: oracle, grade: grade, childView: childView,
    overlapCount: overlapCount, maxOverlapIndex: maxOverlapIndex,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

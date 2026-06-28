/* =====================================================================
   TEMPO'S DAY PLAN — CORE  (time-preposition-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.i — use frequently occurring prepositions. Built as prepositions of
   TIME (before / during / after + a noun). First skin: "Tempo's Day Plan." Pure
   cognition, NO DOM. The child reads a sentence and taps the time preposition
   that fits. 0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED, NEVER A STORED INDEX. A round stores
   { id, before, after, correct } with correct ∈ {before,during,after}; the 3
   cards are the constant [before,during,after] (the activity shuffles them for
   display); oracle = [before,during,after].indexOf(correct). before/during/after
   is a genuine 3-WAY (each preposition is correct in some rounds) — no binary
   floor, no odd-one-out leak.
   ===================================================================== */
(function (global) {
  'use strict';

  var FORMS = ['before', 'during', 'after'];

  function cards() { return FORMS.slice(); }
  function correctIndex(round) { return FORMS.indexOf(round.correct); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return FORMS[id] === round.correct; }

  function childView(round) {
    return { before: round.before, after: round.after, choices: FORMS.map(function (f, i) { return { id: i, word: f }; }) };
  }

  function facts(round) {
    return {
      correctValid: FORMS.indexOf(round.correct) >= 0,
      hasSentence: typeof round.before === 'string' || typeof round.after === 'string',
      threeChoices: FORMS.length === 3,
      distinct: new Set(FORMS).size === FORMS.length,
      /* a preposition takes a noun object — the gap is followed by content (not the end). */
      hasNounObject: typeof round.after === 'string' && round.after.trim().length > 0
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    var lens = FORMS.map(function (f) { return f.length; });
    var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
    rounds.forEach(function (r) {
      var ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[r.correct] = (ans[r.correct] || 0) + 1;
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return {
      total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n,
      hasBefore: !!ans.before, hasDuring: !!ans.during, hasAfter: !!ans.after, formMix: !!ans.before && !!ans.during && !!ans.after
    };
  }

  function audit(round) { return { sentence: round.before + ' ___ ' + round.after, correct: round.correct, choices: FORMS.slice() }; }

  global.TimePrepositionCore = {
    FORMS: FORMS, cards: cards, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

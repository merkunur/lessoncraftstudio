/* =====================================================================
   VERA'S VERB MATCH — CORE  (be-agreement-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.c — use singular and plural nouns with matching verbs in basic
   sentences. First skin: "Vera's Verb Match." Pure cognition, NO DOM. The child
   reads a sentence with a blank subject + verb gap and taps the be-verb that
   AGREES (am / is / are). 0 lines to any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED, NEVER A STORED INDEX. A round stores
   { id, subject, before, after, correct } with correct ∈ {am,is,are}; the 3
   cards are the constant [am,is,are] (the activity shuffles them for display);
   oracle = [am,is,are].indexOf(correct). am/is/are is a genuine 3-WAY (each form
   is correct in some rounds) — this dodges the binary 50% floor AND the
   "odd-number-out" leak of a two-form (base vs base+s) agreement task.
   ===================================================================== */
(function (global) {
  'use strict';

  var FORMS = ['am', 'is', 'are'];

  function cards() { return FORMS.slice(); }
  function correctIndex(round) { return FORMS.indexOf(round.correct); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return FORMS[id] === round.correct; }

  function childView(round) {
    return { subject: round.subject, before: round.before, after: round.after, choices: FORMS.map(function (f, i) { return { id: i, word: f }; }) };
  }

  function facts(round) {
    return {
      correctValid: FORMS.indexOf(round.correct) >= 0,
      hasSentence: typeof round.before === 'string' || typeof round.after === 'string',
      threeChoices: FORMS.length === 3,
      distinct: new Set(FORMS).size === FORMS.length
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
      hasAm: !!ans.am, hasIs: !!ans.is, hasAre: !!ans.are, formMix: !!ans.am && !!ans.is && !!ans.are
    };
  }

  function audit(round) { return { subject: round.subject, correct: round.correct, choices: FORMS.slice() }; }

  global.BeAgreementCore = {
    FORMS: FORMS, cards: cards, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

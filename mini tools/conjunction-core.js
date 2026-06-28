/* =====================================================================
   HAZEL'S WORD BRIDGE — CORE  (conjunction-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.g — use frequently occurring CONJUNCTIONS (and, but, because,
   so). First skin: "Hazel's Word Bridge" (a conjunction bridges two ideas).
   Pure cognition, NO DOM. The child reads a two-clause sentence with a "___"
   and taps the joining word that fits the RELATIONSHIP.

   THE ANSWER IS DERIVED FROM RELATION_CONJ, NEVER STORED. A round stores
   {sentence, relation} (an enum: addition / contrast / cause / result) — never
   the conjunction literal. `oracle` = RELATION_CONJ[relation]; the 4 chips are
   the fixed conjunction set (the axis is the RELATION, not a surface cue).
   A no-answer-leak check keeps the conjunction out of the sentence. 0 lines to
   any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var RELATION_CONJ = { addition: 'and', contrast: 'but', cause: 'because', result: 'so' };
  var CONJ_CHIPS = ['and', 'but', 'because', 'so'];

  function oracle(round) { return RELATION_CONJ[round.relation] || ''; }
  function chips() { return CONJ_CHIPS.slice(); }
  function isAnswer(round, str) { return str === oracle(round); }

  function sentenceNoAnswerLeak(round) {
    var ans = oracle(round);
    var toks = String(round.sentence || '').toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    return toks.indexOf(ans.toLowerCase()) < 0;
  }

  function childView(round) {
    return { id: round.id, sentence: round.sentence, chips: chips() };   /* relation/answer NOT exposed */
  }

  function facts(round) {
    return {
      relationValid: !!RELATION_CONJ[round.relation],
      fourChips: chips().length === 4,
      sentenceHasBlank: String(round.sentence || '').indexOf('___') >= 0,
      sentenceNoAnswerLeak: sentenceNoAnswerLeak(round),
      derivedNotStored: !('answer' in round)
    };
  }

  function deckFacts(rounds) {
    var rels = {}, ans = {}, ids = {};
    (rounds || []).forEach(function (r) { rels[r.relation] = 1; ans[oracle(r)] = (ans[oracle(r)] || 0) + 1; ids[r.id] = 1; });
    return { total: (rounds || []).length, distinctRelations: Object.keys(rels), answerCounts: ans, distinctExercises: Object.keys(ids).length };
  }

  function audit(round) {
    return { id: round.id, sentence: round.sentence, relation: round.relation, correct: oracle(round), chips: chips() };
  }

  global.ConjunctionCore = {
    RELATION_CONJ: RELATION_CONJ, CONJ_CHIPS: CONJ_CHIPS,
    oracle: oracle, chips: chips, isAnswer: isAnswer,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

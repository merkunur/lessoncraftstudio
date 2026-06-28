/* =====================================================================
   WREN'S QUESTION WINDOW — CORE  (question-word-core.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.d — understand and use question words (who, what, where, when,
   why, how). First skin: "Wren's Question Window." Pure cognition, NO DOM.
   The child reads a question with a "___" and taps the question word that
   fits what the question is asking.

   THE ANSWER IS DERIVED FROM QWORD_TABLE, NEVER STORED. A round stores
   {sentence, asks} (an answer-TYPE enum: person/thing/place/time/reason/
   manner) — never the question-word literal. `oracle` = QWORD_TABLE[asks];
   the 6 chips are the fixed wh-set (the axis is the answer-type). A no-answer-
   leak check keeps the wh-word out of the sentence. 0 lines to any protected
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var QWORD_TABLE = { person: 'who', thing: 'what', place: 'where', time: 'when', reason: 'why', manner: 'how' };
  var QWORD_CHIPS = ['who', 'what', 'where', 'when', 'why', 'how'];

  function oracle(round) { return QWORD_TABLE[round.asks] || ''; }
  function chips() { return QWORD_CHIPS.slice(); }
  function isAnswer(round, str) { return str === oracle(round); }

  function sentenceNoAnswerLeak(round) {
    var ans = oracle(round);
    var toks = String(round.sentence || '').toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    return toks.indexOf(ans.toLowerCase()) < 0;
  }

  function childView(round) {
    return { id: round.id, sentence: round.sentence, chips: chips() };   /* asks/answer NOT exposed */
  }

  function facts(round) {
    return {
      asksValid: !!QWORD_TABLE[round.asks],
      sixChips: chips().length === 6,
      sentenceHasBlank: String(round.sentence || '').indexOf('___') >= 0,
      sentenceNoAnswerLeak: sentenceNoAnswerLeak(round),
      derivedNotStored: !('answer' in round)
    };
  }

  function deckFacts(rounds) {
    var asks = {}, ans = {}, ids = {};
    (rounds || []).forEach(function (r) { asks[r.asks] = 1; ans[oracle(r)] = (ans[oracle(r)] || 0) + 1; ids[r.id] = 1; });
    return { total: (rounds || []).length, distinctAsks: Object.keys(asks), answerCounts: ans, distinctExercises: Object.keys(ids).length };
  }

  function audit(round) {
    return { id: round.id, sentence: round.sentence, asks: round.asks, correct: oracle(round), chips: chips() };
  }

  global.QuestionWordCore = {
    QWORD_TABLE: QWORD_TABLE, QWORD_CHIPS: QWORD_CHIPS,
    oracle: oracle, chips: chips, isAnswer: isAnswer,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

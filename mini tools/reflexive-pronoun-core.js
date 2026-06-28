/* =====================================================================
   ROBIN'S MIRROR — CORE  (reflexive-pronoun-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.c — use REFLEXIVE pronouns (myself, ourselves, himself,
   herself, themselves, yourself, itself). First skin: "Robin's Mirror" (a
   reflexive pronoun mirrors the subject). Pure cognition, NO DOM. The child
   reads a sentence with a "___" and taps the reflexive that matches the
   SUBJECT.

   THE ANSWER IS DERIVED FROM REFLEXIVE_TABLE, NEVER STORED. A round stores
   {sentence, referent, wrongA, wrongB} (referent keys, never the reflexive
   literal). `oracle` = REFLEXIVE_TABLE[referent]; the 3 chips are the three
   referents' reflexives DERIVED. `isAnswer` is string-equality to the oracle
   (chips are distinct words). A no-answer-leak check keeps the correct
   reflexive out of the sentence. 0 lines to any protected core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var REFLEXIVE_TABLE = {
    i: 'myself', you: 'yourself', he: 'himself', she: 'herself',
    we: 'ourselves', they: 'themselves', it: 'itself'
  };

  function reflexiveOf(ref) { return REFLEXIVE_TABLE[ref] || ''; }
  function oracle(round) { return reflexiveOf(round.referent); }
  function chips(round) { return [reflexiveOf(round.referent), reflexiveOf(round.wrongA), reflexiveOf(round.wrongB)]; }
  function isAnswer(round, str) { return str === oracle(round); }

  function sentenceNoAnswerLeak(round) {
    var ans = oracle(round);
    var toks = String(round.sentence || '').toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    return toks.indexOf(ans.toLowerCase()) < 0;
  }

  function childView(round) {
    return { id: round.id, sentence: round.sentence, chips: chips(round).slice() };   /* which-correct NOT exposed */
  }

  function facts(round) {
    var c = chips(round);
    return {
      referentValid: !!REFLEXIVE_TABLE[round.referent],
      wrongsValid: !!REFLEXIVE_TABLE[round.wrongA] && !!REFLEXIVE_TABLE[round.wrongB],
      threeDistinctChips: c[0] && c[1] && c[2] && c[0] !== c[1] && c[0] !== c[2] && c[1] !== c[2],
      sentenceHasBlank: String(round.sentence || '').indexOf('___') >= 0,
      sentenceNoAnswerLeak: sentenceNoAnswerLeak(round),
      derivedNotStored: !('answer' in round)
    };
  }

  function deckFacts(rounds) {
    var refs = {}, ans = {}, ids = {};
    (rounds || []).forEach(function (r) { refs[r.referent] = 1; ans[oracle(r)] = (ans[oracle(r)] || 0) + 1; ids[r.id] = 1; });
    return { total: (rounds || []).length, distinctReferents: Object.keys(refs), answerCounts: ans, distinctExercises: Object.keys(ids).length };
  }

  function audit(round) {
    return { id: round.id, sentence: round.sentence, referent: round.referent, correct: oracle(round), chips: chips(round) };
  }

  global.ReflexivePronounCore = {
    REFLEXIVE_TABLE: REFLEXIVE_TABLE, reflexiveOf: reflexiveOf,
    oracle: oracle, chips: chips, isAnswer: isAnswer,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

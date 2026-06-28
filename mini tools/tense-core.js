/* =====================================================================
   THE CLOCK TOWER — CORE  (tense-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.e — use verbs to convey a sense of past, present, and future.
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #70 (2026-06-27): the spec's OPTION_SURFACE_NON_
   DIAGNOSTIC rigor (ban the time cue, HIDE the future "will", avoid the
   novelty-outlier irregular, demote the morph to a post-correct reveal, 4
   modes) is set aside for clarity. For a 6-year-old, recognizing "Yesterday →
   -ed" and "Tomorrow → will …" IS how L.1.1.e is learned, so the time cue and
   the visible "will" are KEPT (good pedagogy, not a cheat). The standard's
   heart — pick the verb form that conveys the time — is kept in a clear,
   cue-present form: a sentence with a clear TIME word + three verb-form chips.

   THE ANSWER IS DERIVED, NEVER STORED: the correct chip is the one whose tense
   key === the round's `time`; its text is `verb.forms[time]`. No stored
   isCorrect / correctIndex anywhere.
   ===================================================================== */
(function (global) {
  'use strict';

  var TENSES = ['present', 'past', 'future'];

  function formsOf(round) { return (round.verb && round.verb.forms) || {}; }

  function oracle(round) { return round.time; }                 /* the answer tense key */
  function isAnswer(round, tenseKey) { return tenseKey === round.time; }
  function formText(round, tenseKey) { return formsOf(round)[tenseKey]; }

  function snapshot(round) {
    var f = formsOf(round);
    return {
      id: round.id, time: round.time, timeWord: round.timeWord, subject: round.subject,
      lemma: round.verb && round.verb.lemma,
      forms: { present: f.present, past: f.past, future: f.future }   /* answer NOT flagged */
    };
  }

  function facts(round) {
    var f = formsOf(round);
    var vals = TENSES.map(function (t) { return f[t]; });
    var distinct = new Set(vals).size === vals.length && vals.every(function (v) { return typeof v === 'string' && v.length; });
    var fut = (f.future || '');
    var present = (f.present || '');
    return {
      time: round.time,
      timeValid: TENSES.indexOf(round.time) >= 0,
      formsDistinct: distinct,
      futureWellFormed: /^will\s+\S/.test(fut),
      presentIsBare: !/s$/.test(present) || /ss$/.test(present),   /* no 3rd-sing -s trap (allow words ending in ss) */
      exactlyOneCorrect: TENSES.filter(function (t) { return isAnswer(round, t); }).length === 1,
      derivedNotStored: true,
      oracleValid: TENSES.indexOf(oracle(round)) >= 0
    };
  }

  function deckFacts(rounds) {
    var times = {}, verbs = {}, ex = {}, irr = 0;
    (rounds || []).forEach(function (r) {
      times[r.time] = (times[r.time] || 0) + 1; ex[r.id] = 1;
      verbs[(r.verb && r.verb.lemma) || r.id] = 1;
      if (r.verb && r.verb.regular === false) irr++;
    });
    return {
      total: (rounds || []).length,
      distinctTimes: Object.keys(times),
      timeCounts: times,
      distinctVerbs: Object.keys(verbs).length,
      distinctExercises: Object.keys(ex).length,
      irregularCount: irr
    };
  }

  function audit(round) {
    var f = formsOf(round);
    return { id: round.id, time: round.time, timeWord: round.timeWord, lemma: round.verb && round.verb.lemma, forms: f, answer: f[round.time] };
  }

  global.TenseCore = {
    TENSES: TENSES, oracle: oracle, isAnswer: isAnswer, formText: formText,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

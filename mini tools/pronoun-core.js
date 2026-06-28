/* =====================================================================
   THE BORROWED HAT — CORE  (pronoun-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.d — use personal and possessive pronouns correctly (pronoun CASE
   by syntactic role: subject I/he/they/we vs object me/him/them/us vs
   possessive my/his/their/our). Pure cognition, NO DOM. 0 lines to ANY existing
   core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #84 (2026-06-27): the spec's grade-only-ear-
   resistant / role-cue-withhold-mechanics / ROLE_AFFORDANCE_READ_SOLVER / hard-
   discrete-commit / flail / position-heuristic rigor is set aside. Two spec
   elements are KEPT (clarity-aligned): the TWO-TILE SAME-REFERENT board (both
   chips are the two case forms of ONE pronoun → CASE is the only axis, no gender
   cue) + the FORM-BY-FUNCTION vein (his↔him, their↔them). Simple subject/object
   cases are kept as valid first-learning. The clean mechanic — read the
   sentence, pick the right pronoun form — shows NO role cue.

   THE ANSWER IS DERIVED FROM THE CASE_TABLE, NEVER STORED. A round stores
   {sentence (with "___"), referent (case-set key), role, wrongRole, cap} — never
   the pronoun literal. displayForm(referent, role, cap) reads the CASE_TABLE.
   The 2 chips = [form(role), form(wrongRole)] of the SAME referent; isAnswer =
   str === deriveCorrect.
   ===================================================================== */
(function (global) {
  'use strict';

  var CASE_TABLE = {
    i:    { subject: 'I',    object: 'me',   possessive: 'my' },
    he:   { subject: 'he',   object: 'him',  possessive: 'his' },
    they: { subject: 'they', object: 'them', possessive: 'their' },
    we:   { subject: 'we',   object: 'us',   possessive: 'our' }
  };

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function displayForm(referent, role, capitalize) {
    var set = CASE_TABLE[referent]; if (!set) return '';
    var w = set[role]; if (!w) return '';
    if (w === 'I') return 'I';                 /* always capital */
    return capitalize ? cap(w) : w;
  }

  function deriveCorrect(round) { return displayForm(round.referent, round.role, round.cap); }
  function deriveWrong(round) { return displayForm(round.referent, round.wrongRole, round.cap); }
  function chipStrings(round) { return [deriveCorrect(round), deriveWrong(round)]; }
  function isAnswer(round, str) { return str === deriveCorrect(round); }

  function snapshot(round) {
    return { id: round.id, sentence: round.sentence, referent: round.referent, role: round.role };   /* pronoun literal NOT exposed */
  }

  /* the derived correct pronoun must NOT already sit as a standalone token in
     the sentence (no answer-leak); the blank "___" is not a token. */
  function sentenceNoAnswerLeak(round) {
    var ans = deriveCorrect(round);
    var toks = String(round.sentence || '').replace(/[.,!?]/g, '').split(/\s+/);
    return toks.indexOf(ans) < 0;
  }

  function facts(round) {
    var chips = chipStrings(round);
    return {
      role: round.role,
      roleValid: ['subject', 'object', 'possessive'].indexOf(round.role) >= 0 && ['subject', 'object', 'possessive'].indexOf(round.wrongRole) >= 0 && round.role !== round.wrongRole,
      twoDistinctChips: chips[0] !== chips[1] && !!chips[0] && !!chips[1],
      sentenceHasBlank: String(round.sentence || '').indexOf('___') >= 0,
      sentenceNoAnswerLeak: sentenceNoAnswerLeak(round),
      derivedNotStored: true,
      referentValid: !!CASE_TABLE[round.referent]
    };
  }

  function deckFacts(rounds) {
    var roles = {}, ex = {}, compoundSubj = 0, compoundObj = 0, fbf = 0;
    (rounds || []).forEach(function (r) {
      roles[r.role] = 1; ex[r.id] = 1;
      if (r.kind === 'compound-subject') compoundSubj++;
      if (r.kind === 'compound-object') compoundObj++;
      if (r.kind === 'form-by-function') fbf++;
    });
    return {
      total: (rounds || []).length,
      distinctRoles: Object.keys(roles),
      compoundSubjectCount: compoundSubj,
      compoundObjectCount: compoundObj,
      formByFunctionCount: fbf,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return { id: round.id, sentence: round.sentence, referent: round.referent, role: round.role, correct: deriveCorrect(round), wrong: deriveWrong(round) };
  }

  global.PronounCore = {
    CASE_TABLE: CASE_TABLE, displayForm: displayForm,
    deriveCorrect: deriveCorrect, deriveWrong: deriveWrong, chipStrings: chipStrings, isAnswer: isAnswer,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

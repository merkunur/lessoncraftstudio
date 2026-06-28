/* =====================================================================
   NIB'S APOSTROPHE SEAT — CORE  (contraction-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.2.c — use an apostrophe to form contractions. Pure cognition, NO
   DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #77 (2026-06-27): the spec's PROCESS-axis rigor
   (build-by-dropping-letters is brute-forceable → no-pre-commit-oracle /
   commit-then-grade-with-cost / TRIAL_AND_ERROR_SOLVER / FAMILY_RULE_SOLVER /
   cross-family-≥4 / discriminating-≥50%) is set aside by choosing a mechanic
   with NO brute-force surface: a clean 3-way recognition PICK of the correctly-
   written contraction (correct / misplaced-apostrophe / no-apostrophe). The
   standard's heart — right letters dropped + apostrophe AT the omission site —
   is what the pick tests; the distractors embody the two common mistakes.

   THE ANSWER IS DERIVED FROM THE OMISSION STRUCTURE, NEVER STORED. A round
   stores {word1, word2, combined (de-apostrophe'd letters, e.g. "dont"),
   apostropheIndex, wrongIndex, irregular} — never the contraction literal. The
   3 chip strings are derived by inserting "'" into `combined`:
     correct  = insertApos(combined, apostropheIndex)   // "don't"
     misplaced= insertApos(combined, wrongIndex)         // "do'nt"
     none     = combined                                 // "dont"
   isAnswer(round, str) = str === deriveCorrect(round).
   ===================================================================== */
(function (global) {
  'use strict';

  function insertApos(combined, i) {
    var c = String(combined || '');
    if (i < 0 || i > c.length) return c;
    return c.slice(0, i) + "'" + c.slice(i);
  }

  function deriveCorrect(round) { return insertApos(round.combined, round.apostropheIndex); }
  function deriveMisplaced(round) { return insertApos(round.combined, round.wrongIndex); }
  function deriveNone(round) { return String(round.combined || ''); }

  function chipStrings(round) {
    return [deriveCorrect(round), deriveMisplaced(round), deriveNone(round)];
  }
  function isAnswer(round, str) { return str === deriveCorrect(round); }

  function snapshot(round) {
    return { id: round.id, word1: round.word1, word2: round.word2, combined: round.combined };   /* contraction literal NOT exposed */
  }

  function facts(round) {
    var c = String(round.combined || ''), L = c.length;
    var ai = round.apostropheIndex, wi = round.wrongIndex;
    var chips = chipStrings(round);
    var distinct = new Set(chips).size === 3;
    var correct = deriveCorrect(round);
    var aposCount = (correct.match(/'/g) || []).length;
    return {
      indicesValid: typeof ai === 'number' && typeof wi === 'number' && ai !== wi && ai >= 0 && ai <= L && wi >= 0 && wi <= L,
      threeDistinctChips: distinct,
      combinedHasNoApostrophe: c.indexOf("'") < 0,
      correctHasOneApostropheAtIndex: aposCount === 1 && correct.indexOf("'") === ai,
      derivedNotStored: true,
      family: round.family,
      irregular: !!round.irregular
    };
  }

  function deckFacts(rounds) {
    var fams = {}, ex = {}, irr = 0;
    (rounds || []).forEach(function (r) { if (r.family) fams[r.family] = 1; ex[r.id] = 1; if (r.irregular) irr++; });
    return {
      total: (rounds || []).length,
      distinctFamilies: Object.keys(fams),
      irregularCount: irr,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return { id: round.id, pair: round.word1 + ' + ' + round.word2, correct: deriveCorrect(round), misplaced: deriveMisplaced(round), none: deriveNone(round), irregular: !!round.irregular };
  }

  global.ContractionCore = {
    insertApos: insertApos, deriveCorrect: deriveCorrect, deriveMisplaced: deriveMisplaced, deriveNone: deriveNone,
    chipStrings: chipStrings, isAnswer: isAnswer,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

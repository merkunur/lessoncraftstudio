/* =====================================================================
   NUMBER-LINE JUMP — CORE  (numberline-jump-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.B.6 — represent whole-number SUMS and DIFFERENCES within 100 on
   a NUMBER-LINE diagram. First skin: "Hopper's Number Line." Pure cognition,
   NO DOM. The graded cognition is REPRESENT THE HOP: place the START on the
   right tick, choose the DIRECTION (forward = sum / back = difference), pick
   the correct HOP SIZE (from chips that include a decoy), and dial the
   LANDING (= start ± size). The landing is shown as "?" on the line until
   dialed, so it must be COMPUTED, not read off.

   The landing is DERIVED (start ± size) — NO `answer`/`landing` field on a
   round, so a number-grab is structurally impossible. A correct attempt
   requires the full MODEL (start + direction + size) AND the computed
   landing — so reproducing the story without computing, or computing without
   the model, both fail. 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function landing(round) { return round.start + (round.dir === 'back' ? -1 : 1) * round.size; }
  function ticks(round) { var out = [], v = 0, step = round.step || 1; for (v = 0; v <= round.max; v += step) out.push(v); return out; }
  function sizeChips(round) { return [round.size].concat(round.decoys || []); }   /* the activity shuffles for display */

  /* THE GRADE — full model (start + direction + size) correct AND the dialed
     landing === the DERIVED landing. Pure → the verify gate tests it. */
  function gradeAttempt(round, model, dialed) {
    model = model || {};
    if (model.start !== round.start) return false;
    if (model.dir !== round.dir) return false;
    if (model.size !== round.size) return false;
    return Number(dialed) === landing(round);
  }

  function snapshot(round) {
    return {
      max: round.max, step: round.step || 1, dir: round.dir,    /* dir given by the story (the child still commits it) */
      ticks: ticks(round),
      sizeChips: sizeChips(round)                                 /* correct size + decoy(s); NEVER which is correct */
    };
  }

  function facts(round) {
    var L = landing(round);
    return {
      answerDerivedNotAuthored: !('answer' in round) && !('landing' in round),
      hasDecoy: (round.decoys || []).length >= 1,
      decoyNotSize: (round.decoys || []).every(function (d) { return d !== round.size; }),
      onLine: L >= 0 && L <= round.max && round.start >= 0 && round.start <= round.max,
      startOnTick: round.start % (round.step || 1) === 0,
      sizeOnTick: round.size % (round.step || 1) === 0,
      withinHundred: round.max <= 100 && L <= 100,
      dir: round.dir
    };
  }

  function audit(round) {
    return {
      id: round.id, max: round.max, step: round.step || 1,
      start: round.start, size: round.size, dir: round.dir,
      decoys: (round.decoys || []).slice(), answer: landing(round)
    };
  }

  global.NumberlineJumpCore = {
    landing: landing, ticks: ticks, sizeChips: sizeChips,
    gradeAttempt: gradeAttempt, snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

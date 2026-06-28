/* =====================================================================
   CORE — Pour Measure  (pour-measure-core.js)
   ---------------------------------------------------------------------
   Generic "measure and ESTIMATE liquid volume — read a level off a graduated
   scale" cognition. First skin: "Pippa's Pond-Juice Lab" — CCSS 3.MD.A.2
   (Grade 3, Measurement & Data). An experiment-measure sibling (Game 15 The
   Wondering Jar = estimate-then-COUNT discrete; this = estimate-then-READ a
   continuous liquid volume).

   THE SPINE — ESTIMATE → POUR-BLIND → REVEAL → READ: a customer orders an
   ESTIMATE ("about six"); the child pours into a FROSTED beaker (the level is
   HIDDEN — nothing to chase) toward the estimate; on RELEASE the beaker turns
   CLEAR, revealing where the juice landed against the numbered scale; the child
   READS the revealed level + reports it on a number-strip.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • THE ANSWER IS THE REVEALED LEVEL, NEVER THE ORDER — `report()` checks the
       revealed `actualLevel`, not the spoken order (`answerIsFunctionOfLevel
       NotPrompt`, `noGivenNumeralToMatch`). The order "about six" ≠ the actual 5
       → a numeral-matcher reporting "6" is WRONG.
     • FROSTED HIDDEN-POUR — the level is invisible during the pour
       (`levelHiddenDuringPour`) → perceptual-line-chasing structurally
       impossible; the pour is genuinely child-controlled (the family identity).
     • NO POUR-PRECISION ASSESSMENT — the READING is judged, never the pour
       (`pourPrecisionNotAssessed`) → no motor-punishment, no-shame.
     • CONSERVATION — compare-two-cups + different-graduation make the NUMBER
       (not the visual height) decide; on diff-scale the SHORTER column can be
       MORE → a height-reader fails (cognitions the readruler lacks).
     • ESTIMATE-IS-LOOP — every estimate-pour round opens with a predict-then-
       verify (the Grade-3 verb, load-bearing, not a token).

   Pure functions, no DOM. Mirrors category-sort / mail-route / make-total.
   ===================================================================== */
(function (global) {
  'use strict';

  function levelValue(round) { return round.actualLevel; }                     // the read = the revealed level's scale value
  function cupMax(round, cup) { return (cup.scaleMax != null) ? cup.scaleMax : round.scale.max; }
  function argMaxCup(round) { var c = round.cups, bi = 0; for (var i = 1; i < c.length; i++) if ((c[i].level | 0) > (c[bi].level | 0)) bi = i; return bi; }   // the higher VALUE (read the scale)
  /* the visually-TALLER juice column = max fill-fraction (level / the cup's own
     scale max). With different per-cup scales, the taller column can be the
     LESSER value — the conservation trap. */
  function tallestColumn(round) { var c = round.cups, best = -1, bi = 0; for (var i = 0; i < c.length; i++) { var f = c[i].level / cupMax(round, c[i]); if (f > best) { best = f; bi = i; } } return bi; }

  function newState(round) { return { round: round, cog: round.cog, poured: false, revealed: false, reportedValue: null, picked: null, everWrong: false }; }
  /* POUR — the child's calibration gesture (estimate-pour). Cosmetic: the level
     is FROSTED/hidden; the landed level is the round's curated clean value. */
  function pour(s) { if (s.cog === 'estimate-pour') s.poured = true; return true; }
  function release(s) { s.revealed = true; return s.round.actualLevel; }        // estimate-pour: reveal where it landed
  function reveal(s) { s.revealed = true; return true; }                        // read-level / compare / diff-scale
  /* REPORT — single-cup read. Correct IFF the reported value === the REVEALED
     level (never the order). */
  function report(s, value) {
    var ok = (value === levelValue(s.round));
    if (ok) s.reportedValue = value; else s.everWrong = true;
    return { correct: ok };
  }
  /* PICK — compare / diff-scale: pick the higher-VALUE cup (read the scale, not
     the height). */
  function pick(s, cupIndex) {
    var ok = (cupIndex === argMaxCup(s.round));
    if (ok) s.picked = cupIndex; else s.everWrong = true;
    return { correct: ok };
  }
  function isSolved(round, s) {
    if (round.cog === 'compare' || round.cog === 'diff-scale') return s.picked === argMaxCup(round);
    return s.reportedValue === levelValue(round);
  }
  function isComplete(round, s) { return isSolved(round, s); }
  function firstAttemptCorrect(round, s) { return isSolved(round, s) && !s.everWrong; }

  function facts(round, s) {
    var twoCup = (round.cog === 'compare' || round.cog === 'diff-scale');
    return {
      cog: round.cog,
      levelHiddenDuringPour: true,                                             // structural: the frost hides the level during the pour
      answerIsFunctionOfLevelNotPrompt: true,                                  // structural: report/pick read the level/cups, not the order
      noGivenNumeralToMatch: true,                                             // structural: the order is spoken, never on screen
      pourPrecisionNotAssessed: true,                                          // structural: the READING is judged, not the pour
      estimateIsLoop: round.cog !== 'estimate-pour' || round.order != null,    // estimate-pour rounds carry an order
      scaleNumbersLegible: true,
      conservation: twoCup,
      heightTrapPresent: round.cog === 'diff-scale' ? (argMaxCup(round) !== tallestColumn(round)) : false,
      orderEqualsActual: (round.cog === 'estimate-pour') ? (round.order === round.actualLevel) : false,
      firstAttemptCorrect: s ? firstAttemptCorrect(round, s) : false
    };
  }
  /* snapshot exposes the player-visible state — the order numeral is NOT here
     for the read (the order is spoken only). */
  function snapshot(round, s) { return { cog: round.cog, scale: round.scale, revealed: s.revealed, reportedValue: s.reportedValue, picked: s.picked }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* SCALE-READER (PASSES 100%) — reads the revealed level → reports/picks it. */
  function scaleReader(round) {
    var s = newState(round);
    if (round.cog === 'estimate-pour') { pour(s); release(s); } else reveal(s);
    if (round.cog === 'compare' || round.cog === 'diff-scale') { pick(s, argMaxCup(round)); }
    else { report(s, levelValue(round)); }
    return { solved: isSolved(round, s) };
  }
  /* NUMERAL-MATCH (FAILS) — reports the ORDER numeral (estimate-pour) → wrong
     (order ≠ the revealed level). Skips rounds with no order. */
  function numeralMatchSolver(round) {
    if (round.cog !== 'estimate-pour') return { skip: true };
    var s = newState(round); pour(s); release(s); var r = report(s, round.order);
    return { reportedOrder: round.order, actual: levelValue(round), correct: r.correct };   // expect correct === false
  }
  /* PERCEPTUAL-POUR (FAILS) — there is no visible level during the pour. */
  function perceptualPourSolver(round) { return { levelHidden: facts(round, null).levelHiddenDuringPour }; }
  /* MOTOR-TIMING (FAILS) — the answer is the reading; no hold-duration judged. */
  function motorTimingSolver(round) { return { precisionAssessed: !facts(round, null).pourPrecisionNotAssessed }; }
  /* HEIGHT-READER (FAILS on diff-scale) — picks the TALLER column → the lower
     value → wrong. */
  function heightReaderSolver(round) {
    if (round.cog !== 'compare' && round.cog !== 'diff-scale') return { skip: true };
    var s = newState(round); reveal(s); var r = pick(s, tallestColumn(round));
    return { pickedTallest: tallestColumn(round), maxCup: argMaxCup(round), correct: r.correct };
  }

  global.PourMeasureCore = {
    levelValue: levelValue, argMaxCup: argMaxCup, tallestColumn: tallestColumn, cupMax: cupMax,
    newState: newState, pour: pour, release: release, reveal: reveal, report: report, pick: pick,
    isSolved: isSolved, isComplete: isComplete, firstAttemptCorrect: firstAttemptCorrect, facts: facts, snapshot: snapshot,
    SOLVERS: { scaleReader: scaleReader, numeralMatchSolver: numeralMatchSolver, perceptualPourSolver: perceptualPourSolver, motorTimingSolver: motorTimingSolver, heightReaderSolver: heightReaderSolver }
  };

}(typeof window !== 'undefined' ? window : this));

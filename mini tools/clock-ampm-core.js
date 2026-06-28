/* =====================================================================
   SPROCKET'S CLOCK — A.M. / P.M. — CORE  (clock-ampm-core.js)
   ---------------------------------------------------------------------
   A TIME-EXPANSION engine: decide whether an everyday activity happens in the
   a.m. (morning) or p.m. (afternoon/evening). CCSS 2.MD.C.7 (the "using a.m. and
   p.m." clause). a.m./p.m. CANNOT be read from a clock alone (3:00 is ambiguous)
   — the ACTIVITY is the cue. Pure cognition, NO DOM — the activity owns the
   scene + the 2 buttons and calls this. 0 lines to any protected core /
   clock-* siblings / lcs-shell.* / game-shell.*.

   THE ANSWER IS THE CONTENT — a round stores { activity, time, ampm }; ampm is
   the pedagogical fact (breakfast → AM), like a target word. The 2 choices are
   the fixed pair ['AM','PM']; isAnswer(choice) = choice === round.ampm. NO stored
   correctIndex. Re-pointable: change ampm → the correct choice flips.
   ===================================================================== */
(function (global) {
  'use strict';

  var CHOICES = ['AM', 'PM'];

  function isAnswer(round, choice) { return choice === round.ampm; }
  function oracle(round) { return round.ampm; }
  function correctChoice(round) { return round.ampm; }

  function snapshot(round) {
    return { id: round.id, activity: round.activity, time: round.time };   /* what the player sees — ampm NOT exposed */
  }

  function facts(round) {
    return {
      validAmpm: round.ampm === 'AM' || round.ampm === 'PM',
      hasActivity: typeof round.activity === 'string' && round.activity.length > 0,
      hasTime: typeof round.time === 'string' && round.time.length > 0,
      oracleValid: CHOICES.indexOf(oracle(round)) >= 0,
      derivedNotStored: true
    };
  }

  function deckFacts(rounds) {
    var act = {}, ex = {}, am = 0, pm = 0;
    (rounds || []).forEach(function (r) { act[r.activity] = 1; ex[r.id] = 1; if (r.ampm === 'AM') am++; else if (r.ampm === 'PM') pm++; });
    return { total: (rounds || []).length, distinctActivities: Object.keys(act).length, distinctExercises: Object.keys(ex).length, countAM: am, countPM: pm };
  }

  function audit(round) {
    return { id: round.id, activity: round.activity, time: round.time, answer: round.ampm };
  }

  global.ClockAmpmCore = {
    CHOICES: CHOICES, isAnswer: isAnswer, oracle: oracle, correctChoice: correctChoice,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

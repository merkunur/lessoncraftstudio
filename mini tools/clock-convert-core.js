/* =====================================================================
   SPROCKET'S CLOCK — 12-HOUR ↔ 24-HOUR CONVERSION — CORE  (clock-convert-core.js)
   ---------------------------------------------------------------------
   A TIME-EXPANSION *operation* engine: convert a time between 12-hour (a.m./p.m.)
   and 24-hour notation. Aligned 2.MD.C.7 (the "using a.m. and p.m." clause,
   extended to 24-hour for the European K-3 audience). Pure cognition, NO DOM —
   the activity owns the digital readout + the answer cards and calls this. 0
   lines to any protected core / clock-digital-* / clock-elapsed-* / lcs-shell.* /
   game-shell.* — digital-only (no analog clock).

   THE ANSWER IS DERIVED — a round stores { dir, h24, m, options:[h24 ints] }; the
   true time is h24; the answer is the option whose value === h24. The core RENDERS
   each value in the right notation per `dir`. NO stored correctIndex. Re-pointable:
   change h24 → a different option wins.
   ===================================================================== */
(function (global) {
  'use strict';

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* 24-hour integer (0-23) → { h12:1-12, ampm:'AM'|'PM' } */
  function to12(h24) {
    if (h24 === 0) return { h12: 12, ampm: 'AM' };
    if (h24 === 12) return { h12: 12, ampm: 'PM' };
    if (h24 < 12) return { h12: h24, ampm: 'AM' };
    return { h12: h24 - 12, ampm: 'PM' };
  }
  function to24str(h24, m) { return pad2(h24) + ':' + pad2(m); }       /* "15:00" */
  function to12str(h24, m) { var t = to12(h24); return t.h12 + ':' + pad2(m) + ' ' + t.ampm; }  /* "3:00 PM" */

  /* the GIVEN stimulus is shown in the source notation; options in the target notation */
  function givenStr(round) { return round.dir === '12to24' ? to12str(round.h24, round.m) : to24str(round.h24, round.m); }
  function optionStr(round, oh24) { return round.dir === '12to24' ? to24str(oh24, round.m) : to12str(oh24, round.m); }

  function opts(round) { return (round && round.options) || []; }
  function isAnswer(round, i) { var o = opts(round); return i >= 0 && i < o.length && o[i] === round.h24; }
  function oracle(round) { var o = opts(round); for (var i = 0; i < o.length; i++) if (o[i] === round.h24) return i; return -1; }
  function correctCount(round) { var o = opts(round), n = 0; for (var i = 0; i < o.length; i++) if (o[i] === round.h24) n++; return n; }

  function snapshot(round) {
    return {
      id: round.id, dir: round.dir, h24: round.h24, m: round.m,   /* the true time + direction */
      options: opts(round).slice()                                  /* candidate h24 ints — answer NOT flagged */
    };
  }

  function facts(round) {
    var o = opts(round), vals = [round.h24].concat(o);
    var distinct = new Set(o).size === o.length;
    return {
      optionCount: o.length,
      exactlyOneMatch: correctCount(round) === 1,
      validH24: vals.every(function (h) { return h >= 0 && h <= 23; }) && round.m >= 0 && round.m <= 59,
      validDir: round.dir === '12to24' || round.dir === '24to12',
      distinctOptions: distinct,
      derivedNotStored: true
    };
  }

  function deckFacts(rounds) {
    var tt = {}, ex = {};
    (rounds || []).forEach(function (r) { tt[r.dir + ':' + r.h24 + ':' + r.m] = 1; ex[r.id] = 1; });
    return { total: (rounds || []).length, distinctTrueTimes: Object.keys(tt).length, distinctExercises: Object.keys(ex).length };
  }

  function audit(round) {
    return {
      id: round.id, dir: round.dir, given: givenStr(round),
      answer: optionStr(round, round.h24), oracleIndex: oracle(round),
      options: opts(round).map(function (h) { return optionStr(round, h); })
    };
  }

  global.ClockConvertCore = {
    to12: to12, to24str: to24str, to12str: to12str, givenStr: givenStr, optionStr: optionStr,
    isAnswer: isAnswer, oracle: oracle, correctCount: correctCount,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

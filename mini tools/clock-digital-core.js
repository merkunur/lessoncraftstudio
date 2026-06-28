/* =====================================================================
   SPROCKET'S CLOCK — READ ANALOG → DIGITAL — CORE  (clock-digital-core.js)
   ---------------------------------------------------------------------
   The TIME-EXPANSION engine: read an analog clock face and match the DIGITAL
   time. CCSS 1.MD.B.3 (hour/half) → 2.MD.C.7 (quarter/5-min) → 3.MD.A.1 (to the
   minute), by granularity config. Pure cognition, NO DOM — the activity owns the
   analog-clock SVG + the digital cards and calls this math. 0 lines to the
   protected clock-core / any of the 5 protected cores / lcs-shell.{js,css} /
   game-shell.* — it RE-IMPLEMENTS the coupled hand-angle math, never imports.

   THE ANSWER IS DERIVED — a round stores { target:{h,m}, options:[{h,m}] }; the
   digital card text is rendered from {h,m}; isAnswer(i)=options[i] equals target.
   NO stored correctIndex. Re-pointable: change target → a different option wins.
   ===================================================================== */
(function (global) {
  'use strict';

  /* coupled hand angles (deg clockwise from 12): hour 30°/hr + 0.5°/min; minute 6°/min */
  function handAngles(h, m) {
    return {
      hour: ((30 * h + 0.5 * m) % 360 + 360) % 360,
      minute: ((6 * m) % 360 + 360) % 360
    };
  }
  function sameTime(a, b) { return !!a && !!b && a.h === b.h && a.m === b.m; }
  function digitalStr(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }

  function opts(round) { return (round && round.options) || []; }
  function isAnswer(round, i) {
    var o = opts(round); return i >= 0 && i < o.length && sameTime(o[i], round.target);
  }
  function oracle(round) {
    var o = opts(round);
    for (var i = 0; i < o.length; i++) if (sameTime(o[i], round.target)) return i;
    return -1;
  }
  function correctCount(round) {
    var o = opts(round), n = 0;
    for (var i = 0; i < o.length; i++) if (sameTime(o[i], round.target)) n++;
    return n;
  }

  function snapshot(round) {
    return {
      id: round.id, target: { h: round.target.h, m: round.target.m },   /* the analog face to READ */
      options: opts(round).map(function (t) { return { h: t.h, m: t.m }; })   /* digital choices — match NOT flagged */
    };
  }

  var GRAN = { hour: { m: [0] }, half: { m: [0, 30] }, quarter: { m: [0, 15, 30, 45] }, five: null, minute: null };

  function inScope(t, granularity) {
    var g = GRAN[granularity];
    if (g === undefined) return true;
    if (granularity === 'five') return t.m % 5 === 0;
    if (granularity === 'minute') return t.m >= 0 && t.m <= 59;
    return g.m.indexOf(t.m) >= 0;
  }

  function facts(round, granularity) {
    var o = opts(round), times = [round.target].concat(o);
    var distinct = new Set(o.map(function (t) { return t.h + ':' + t.m; })).size === o.length;
    return {
      optionCount: o.length,
      exactlyOneMatch: correctCount(round) === 1,
      granularityInScope: times.every(function (t) { return inScope(t, granularity); }),
      validTimes: times.every(function (t) { return t.h >= 1 && t.h <= 12 && t.m >= 0 && t.m <= 59; }),
      distinctOptions: distinct,
      derivedNotStored: true,
      oracleValid: oracle(round) >= 0
    };
  }

  function deckFacts(rounds) {
    var tg = {}, ex = {};
    (rounds || []).forEach(function (r) { tg[r.target.h + ':' + r.target.m] = 1; ex[r.id] = 1; });
    return { total: (rounds || []).length, distinctTargets: Object.keys(tg).length, distinctExercises: Object.keys(ex).length };
  }

  function audit(round) {
    return { id: round.id, target: digitalStr(round.target), oracleIndex: oracle(round), options: opts(round).map(digitalStr) };
  }

  global.ClockDigitalCore = {
    handAngles: handAngles, sameTime: sameTime, digitalStr: digitalStr, inScope: inScope,
    isAnswer: isAnswer, oracle: oracle, correctCount: correctCount,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

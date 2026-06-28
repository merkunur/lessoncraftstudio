/* =====================================================================
   SPROCKET'S CLOCK — ELAPSED TIME — CORE  (clock-elapsed-core.js)
   ---------------------------------------------------------------------
   The first TIME-EXPANSION *operation* engine: read a START clock + a
   duration, compute the END time. CCSS 3.MD.A.1 (the elapsed-word-problem
   clause). Pure cognition, NO DOM — the activity owns the analog-clock SVG +
   the digital answer cards and calls this math. 0 lines to the protected
   clock-core / clock-digital-* / any of the 5 protected cores / lcs-shell.* /
   game-shell.* — it RE-IMPLEMENTS the coupled hand-angle math, never imports.

   THE ANSWER IS DERIVED — a round stores { start:{h,m}, deltaMin, options:[{h,m}] };
   the END time is COMPUTED endTime(start, delta) with a 12-hour wrap; NO stored
   correctIndex. Re-pointable: change deltaMin → a different option wins.
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

  /* add delta minutes to a 12-hour clock time → {h:1..12, m:0..59} */
  function endTime(start, delta) {
    var total = (start.h % 12) * 60 + start.m + delta;
    total = ((total % 720) + 720) % 720;        /* wrap into one 12-hour cycle (handles negative delta) */
    var endM = total % 60;
    var endH = Math.floor(total / 60) % 12;
    if (endH === 0) endH = 12;
    return { h: endH, m: endM };
  }

  function sameTime(a, b) { return !!a && !!b && a.h === b.h && a.m === b.m; }
  function digitalStr(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }

  function opts(round) { return (round && round.options) || []; }
  function isAnswer(round, i) {
    var o = opts(round); return i >= 0 && i < o.length && sameTime(o[i], endTime(round.start, round.deltaMin));
  }
  function oracle(round) {
    var o = opts(round), end = endTime(round.start, round.deltaMin);
    for (var i = 0; i < o.length; i++) if (sameTime(o[i], end)) return i;
    return -1;
  }
  function correctCount(round) {
    var o = opts(round), end = endTime(round.start, round.deltaMin), n = 0;
    for (var i = 0; i < o.length; i++) if (sameTime(o[i], end)) n++;
    return n;
  }

  function snapshot(round) {
    return {
      id: round.id,
      start: { h: round.start.h, m: round.start.m },   /* the analog face to READ */
      deltaMin: round.deltaMin,                          /* the duration to count on */
      options: opts(round).map(function (t) { return { h: t.h, m: t.m }; })   /* digital choices — end NOT flagged */
    };
  }

  function facts(round) {
    var o = opts(round), times = [round.start].concat(o);
    var distinct = new Set(o.map(function (t) { return t.h + ':' + t.m; })).size === o.length;
    return {
      optionCount: o.length,
      exactlyOneMatch: correctCount(round) === 1,
      validTimes: times.every(function (t) { return t.h >= 1 && t.h <= 12 && t.m >= 0 && t.m <= 59; }),
      validDelta: typeof round.deltaMin === 'number' && round.deltaMin !== 0,
      distinctOptions: distinct,
      endComputed: oracle(round) >= 0 && sameTime(o[oracle(round)], endTime(round.start, round.deltaMin)),
      derivedNotStored: true
    };
  }

  function deckFacts(rounds) {
    var st = {}, ex = {};
    (rounds || []).forEach(function (r) { st[r.start.h + ':' + r.start.m] = 1; ex[r.id] = 1; });
    return { total: (rounds || []).length, distinctStarts: Object.keys(st).length, distinctExercises: Object.keys(ex).length };
  }

  function audit(round) {
    return {
      id: round.id, start: digitalStr(round.start), delta: round.deltaMin,
      end: digitalStr(endTime(round.start, round.deltaMin)),
      oracleIndex: oracle(round), options: opts(round).map(digitalStr)
    };
  }

  global.ClockElapsedCore = {
    handAngles: handAngles, endTime: endTime, sameTime: sameTime, digitalStr: digitalStr,
    isAnswer: isAnswer, oracle: oracle, correctCount: correctCount,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

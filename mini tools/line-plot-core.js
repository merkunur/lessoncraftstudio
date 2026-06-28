/* =====================================================================
   SHELLY'S TIDE-LINE — CORE  (line-plot-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.D.9 — generate measurement data + show it on a LINE PLOT
   (a numeric whole-unit scale, an X above each measured length). Pure
   cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST build (2026-06-26): a clear, visual line-plot game — Shelly
   the hermit crab measures shells and plots their lengths; the child reads
   the X-stacks over a numbered scale. Two cogs:
     • plot — a new shell is drawn as a bar 0→its length; tap that length to
       plot its X.  answer = the bar's length.
     • read — a complete line plot; answer a question (how-many-at-N /
       how-many-longer-than-N / most-common / longest-minus-shortest /
       how-many-more-at-A-than-B).  answer = oracle(marks, question).
   The spec's (line-plot-01.md) VALUE_PERMUTE_INVARIANCE tier taxonomy +
   VISUAL_REGION_COUNT_SOLVER suite is deliberately set aside for clarity
   (operator's CLARITY-FIRST ruling), but the genuine VALUE-reads (longest-
   minus-shortest / how-many-more) are KEPT so it stays a real line plot.

   THE ANSWER IS DERIVED, NEVER STORED: computed from {marks, question} or
   {placeLength}; a hand-authored answer is ignored.
   ===================================================================== */
(function (global) {
  'use strict';

  function counts(marks) { var c = {}; (marks || []).forEach(function (m) { c[m] = (c[m] || 0) + 1; }); return c; }
  function modeOf(marks) {
    var c = counts(marks), best = null, bc = -1;
    Object.keys(c).forEach(function (k) { if (c[k] > bc) { bc = c[k]; best = +k; } });
    return best;
  }
  function presentLengths(marks) { return Object.keys(counts(marks)).map(Number).sort(function (x, y) { return x - y; }); }

  function oracle(round) {
    if (round.cog === 'plot') return round.placeLength;
    var q = round.question || {}, m = round.marks || [], c = counts(m);
    switch (q.type) {
      case 'atN': return c[q.n] || 0;
      case 'longerN': return m.filter(function (x) { return x > q.n; }).length;
      case 'mode': return modeOf(m);
      case 'maxMinusMin': return Math.max.apply(null, m) - Math.min.apply(null, m);
      case 'moreAB': return (c[q.a] || 0) - (c[q.b] || 0);
      default: return null;
    }
  }
  function isValueRead(round) { return round.cog === 'read' && (round.question.type === 'maxMinusMin' || round.question.type === 'moreAB'); }

  function nearNums(a, lo, hi) {
    var pool = [a - 1, a + 1, a + 2, a - 2], out = [a];
    for (var i = 0; i < pool.length && out.length < 3; i++) { var v = pool[i]; if (v >= lo && v <= hi && out.indexOf(v) < 0) out.push(v); }
    while (out.length < 3) out.push(a + out.length);   /* defensive distinct */
    return out.sort(function (x, y) { return x - y; });
  }
  function choices(round) {
    var a = oracle(round);
    if (round.cog === 'read' && round.question.type === 'mode') {
      var others = presentLengths(round.marks).filter(function (x) { return x !== a; }).slice(0, 2);
      return [a].concat(others).sort(function (x, y) { return x - y; });
    }
    var hi = round.cog === 'plot' ? round.scale.max : round.scale.max;
    return nearNums(a, 0, hi);
  }

  function isAnswer(round, value) { return Number(value) === oracle(round); }

  function hasInteriorGap(round) {
    var m = round.marks || [], lo = Math.min.apply(null, m), hi = Math.max.apply(null, m), c = counts(m);
    for (var v = lo + 1; v < hi; v++) if (!c[v]) return true;
    return false;
  }
  function modeIsNonExtreme(round) {
    var md = modeOf(round.marks), lo = Math.min.apply(null, round.marks), hi = Math.max.apply(null, round.marks);
    return md !== lo && md !== hi;
  }

  function snapshot(round) {
    var o = { id: round.id, cog: round.cog, scale: round.scale, marks: (round.marks || []).slice(), choices: choices(round) };
    if (round.cog === 'plot') o.placeBar = round.placeLength;   /* the bar length shown — the child reads it; not "the answer" labelled */
    else o.question = { type: round.question.type, n: round.question.n, a: round.question.a, b: round.question.b };
    return o;
  }

  function facts(round) {
    var ch = choices(round), a = oracle(round), distinct = {};
    ch.forEach(function (c) { distinct[c] = 1; });
    var f = {
      cog: round.cog, answerDerivedNotStored: true, choicesCount: ch.length,
      distinctChoices: Object.keys(distinct).length === ch.length, answerInChoices: ch.indexOf(a) >= 0,
      wrongRejected: !isAnswer(round, ch.filter(function (c) { return c !== a; })[0]),
      isValueRead: isValueRead(round), readType: round.cog === 'read' ? round.question.type : null
    };
    if (round.cog === 'read') { f.hasInteriorGap = hasInteriorGap(round); if (round.question.type === 'mode') f.modeNonExtreme = modeIsNonExtreme(round); }
    return f;
  }

  function deckFacts(rounds) {
    var cogs = {}, ex = {}, readTypes = {}, valueReads = 0, gapRounds = 0;
    rounds.forEach(function (r) {
      cogs[r.cog] = 1; ex[r.id] = 1;
      if (r.cog === 'read') { readTypes[r.question.type] = 1; if (isValueRead(r)) valueReads++; if (hasInteriorGap(r)) gapRounds++; }
    });
    return { total: rounds.length, distinctCogs: Object.keys(cogs), distinctExercises: Object.keys(ex).length, readTypes: Object.keys(readTypes), valueReadCount: valueReads, gapRoundCount: gapRounds };
  }

  function audit(round) {
    return { id: round.id, cog: round.cog, marks: round.marks, placeLength: round.placeLength, question: round.question, answer: oracle(round), choices: choices(round), valueRead: isValueRead(round) };
  }

  global.LinePlotCore = {
    counts: counts, modeOf: modeOf, oracle: oracle, isAnswer: isAnswer, choices: choices, isValueRead: isValueRead,
    hasInteriorGap: hasInteriorGap, modeIsNonExtreme: modeIsNonExtreme, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));

/* =====================================================================
   DIGBY'S NUMBER TRACE — CORE  (number-trace-core.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.3 — write numbers 0–20 (numeral FORMATION). Pure cognition, NO
   DOM. The child traces every numeral 0–9 in stroke order. 0 lines to ANY
   protected core + lcs-shell.{js,css}.

   GLYPHS: the 10 digit glyphs 0–9 are COPIED VERBATIM from the operator-approved
   numeral-trace-core.js GLYPHS — dense points lying ON a smooth standard print
   numeral, so the activity renders them as a Catmull-Rom spline (a professional,
   traceable numeral) and the SAME points are the ordered trace checkpoints
   (lenient TOL — wobble fine, STRICT on order). Copied (not imported) so the
   verify harness loads this core standalone. The TRACE ENGINE is the proven
   Penny alphabet-trace engine, for digits.

   GATE (verify-number-trace-core.js): an in-order on-path ORACLE traces every
   numeral (100%); a SCRIBBLER (garbage path) and an OUT-OF-ORDER tap both fail.
   ===================================================================== */
(function (global) {
  'use strict';

  /* === digit glyphs 0–9 — verbatim from numeral-trace-core.js (normalized 0..100,
     EN print, K-handwriting stroke order/direction) === */
  var GLYPHS = {
    '0': [[{ x: 50, y: 14 }, { x: 34, y: 22 }, { x: 28, y: 40 }, { x: 28, y: 60 }, { x: 36, y: 80 }, { x: 50, y: 86 }, { x: 64, y: 80 }, { x: 72, y: 60 }, { x: 72, y: 40 }, { x: 66, y: 22 }, { x: 50, y: 14 }]],
    '1': [[{ x: 36, y: 30 }, { x: 50, y: 16 }, { x: 50, y: 52 }, { x: 50, y: 86 }]],
    '2': [[{ x: 30, y: 30 }, { x: 44, y: 16 }, { x: 60, y: 18 }, { x: 68, y: 34 }, { x: 54, y: 52 }, { x: 36, y: 70 }, { x: 28, y: 84 }, { x: 50, y: 84 }, { x: 72, y: 84 }]],
    '3': [[{ x: 30, y: 24 }, { x: 48, y: 14 }, { x: 66, y: 26 }, { x: 50, y: 48 }, { x: 68, y: 60 }, { x: 68, y: 76 }, { x: 48, y: 86 }, { x: 28, y: 78 }]],
    '4': [[{ x: 58, y: 14 }, { x: 40, y: 40 }, { x: 24, y: 62 }, { x: 50, y: 62 }, { x: 78, y: 62 }], [{ x: 64, y: 14 }, { x: 64, y: 50 }, { x: 64, y: 88 }]],
    '5': [[{ x: 66, y: 16 }, { x: 36, y: 16 }, { x: 34, y: 32 }, { x: 34, y: 48 }, { x: 54, y: 46 }, { x: 70, y: 60 }, { x: 60, y: 82 }, { x: 34, y: 80 }]],
    '6': [[{ x: 66, y: 18 }, { x: 46, y: 16 }, { x: 32, y: 38 }, { x: 28, y: 62 }, { x: 32, y: 80 }, { x: 48, y: 86 }, { x: 64, y: 80 }, { x: 68, y: 64 }, { x: 56, y: 52 }, { x: 38, y: 54 }, { x: 28, y: 62 }]],
    '7': [[{ x: 26, y: 16 }, { x: 50, y: 16 }, { x: 76, y: 16 }, { x: 56, y: 52 }, { x: 44, y: 88 }]],
    '8': [[{ x: 50, y: 16 }, { x: 34, y: 24 }, { x: 34, y: 42 }, { x: 50, y: 50 }, { x: 66, y: 60 }, { x: 66, y: 76 }, { x: 50, y: 86 }, { x: 34, y: 76 }, { x: 34, y: 60 }, { x: 50, y: 50 }, { x: 66, y: 42 }, { x: 66, y: 24 }, { x: 50, y: 16 }]],
    '9': [[{ x: 66, y: 38 }, { x: 52, y: 16 }, { x: 34, y: 24 }, { x: 30, y: 42 }, { x: 46, y: 54 }, { x: 64, y: 50 }, { x: 68, y: 34 }, { x: 66, y: 60 }, { x: 58, y: 86 }]]
  };
  var TOL = 18;     /* checkpoint hit tolerance (normalized) — lenient on precision, strict on order */

  function glyphOf(d) { return GLYPHS[String(d)] || GLYPHS['0']; }
  function numStrokes(d) { return glyphOf(d).length; }
  function startOf(d, i) { return glyphOf(d)[i][0]; }

  function newState(round) { return { round: round, digit: String(round.digit), strokesDone: 0, formed: false }; }

  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function segDist(a, b, p) {
    var vx = b.x - a.x, vy = b.y - a.y, wx = p.x - a.x, wy = p.y - a.y;
    var L2 = vx * vx + vy * vy; if (L2 === 0) return dist(a, p);
    var t = (wx * vx + wy * vy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t;
    return dist({ x: a.x + t * vx, y: a.y + t * vy }, p);
  }
  /* in-order on-path: each checkpoint counted when a drawn segment passes within
     TOL (point-to-segment); order strict (cp only advances forward). */
  function traceScore(stroke, path) {
    if (!path || path.length < 2) return false;
    var cp = 0, i;
    for (i = 0; i < path.length - 1 && cp < stroke.length; i++) {
      while (cp < stroke.length && segDist(path[i], path[i + 1], stroke[cp]) <= TOL) cp++;
    }
    return cp >= stroke.length;
  }

  /* STRICT order: a stroke is accepted only when it is the NEXT one AND the
     pointer path traverses its checkpoints in order. */
  function attemptStroke(s, idx, path) {
    var g = glyphOf(s.digit);
    if (idx !== s.strokesDone) return 'wrong-order';
    if (!traceScore(g[idx], path)) return 'off-path';
    s.strokesDone++;
    if (s.strokesDone >= g.length) { s.formed = true; return 'formed'; }
    return 'stroke-ok';
  }
  function isComplete(s) { return !!s.formed; }

  function snapshot(round, s) {
    var g = glyphOf(round.digit);
    return { digit: String(round.digit), numStrokes: g.length, strokes: g, strokesDone: s ? s.strokesDone : 0, nextStart: s && s.strokesDone < g.length ? g[s.strokesDone][0] : null };
  }

  function facts(round) {
    var g = glyphOf(round.digit);
    return { digit: String(round.digit), numStrokes: g.length, hasStrokes: g.length >= 1, validStart: !!(g[0] && g[0].length && typeof g[0][0].x === 'number'), denseFirst: g[0].length >= 2 };
  }
  function audit(round) { return { id: round.id, digit: String(round.digit), numStrokes: glyphOf(round.digit).length }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  function idealPath(stroke) { return stroke.map(function (p) { return { x: p.x, y: p.y }; }); }
  function oracleSolver(round) {
    var s = newState(round), g = glyphOf(round.digit);
    for (var i = 0; i < g.length; i++) attemptStroke(s, i, idealPath(g[i]));
    return { complete: isComplete(s), strokesDone: s.strokesDone };
  }
  function scribbleSolver(round) {
    var s = newState(round);
    attemptStroke(s, 0, [{ x: 0, y: 0 }, { x: 4, y: 6 }, { x: 1, y: 9 }]);   /* garbage → off-path */
    return { complete: isComplete(s), strokesDone: s.strokesDone };
  }
  function outOfOrderSolver(round) {
    if (numStrokes(round.digit) < 2) return { skip: true };
    var s = newState(round), g = glyphOf(round.digit);
    return { result: attemptStroke(s, 1, idealPath(g[1])) };   /* expect 'wrong-order' */
  }

  global.NumberTraceCore = {
    GLYPHS: GLYPHS, TOL: TOL,
    glyphOf: glyphOf, numStrokes: numStrokes, startOf: startOf,
    newState: newState, traceScore: traceScore, attemptStroke: attemptStroke, isComplete: isComplete,
    snapshot: snapshot, facts: facts, audit: audit,
    SOLVERS: { oracleSolver: oracleSolver, scribbleSolver: scribbleSolver, outOfOrderSolver: outOfOrderSolver }
  };

}(typeof window !== 'undefined' ? window : this));

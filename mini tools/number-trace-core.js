/* =====================================================================
   DIGBY'S NUMBER TRACE — CORE  (number-trace-core.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.3 — write numbers 0–20 (numeral FORMATION). Pure cognition, NO
   DOM. The child traces every numeral 0–9 in stroke order. 0 lines to ANY
   protected core + lcs-shell.{js,css}.

   GLYPHS: the 10 digit glyphs 0–9 are CONSTRUCTED from arcs and lines
   (2026-08 type-panel rebuild). They were previously copied verbatim from
   numeral-trace-core.js as hand-typed point lists, and that is precisely
   how nine of the ten came to disagree with the baseline the writing
   guide draws at y=84: `4` and `7` hung four units below it, `5` floated
   two above, and only `2` sat on the line. Metrics you construct can be
   stated; metrics you type drift. See the GLYPHS block for the three
   letterform rulings (two-stroke 9, cuspless 6 and 8, the barred seven).

   GATE (verify-number-trace-core.js): an in-order on-path ORACLE traces every
   numeral (100%); a SCRIBBLER (garbage path) and an OUT-OF-ORDER tap both fail.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- geometry helpers, same vocabulary as alphabet-trace-core.js ----
     The digits used to be hand-typed point lists copied verbatim from
     numeral-trace-core.js. That is why NINE OF THE TEN disagreed with the
     baseline the writing guide draws at y=84 — `4` and `7` hung four
     units below it, `5` floated two above, and only `2` sat on the line.
     On a tool whose whole subject is "the numeral rests on the line",
     that was the one thing that had to be exact. Built from arcs and
     lines, the metrics are stated rather than typed. */
  function rnd(v) { return Math.round(v * 10) / 10; }
  function arc(cx, cy, rx, ry, d0, d1, n) {
    var pts = [], i, t;
    for (i = 0; i <= n; i++) { t = (d0 + (d1 - d0) * i / n) * Math.PI / 180; pts.push({ x: rnd(cx + rx * Math.cos(t)), y: rnd(cy + ry * Math.sin(t)) }); }
    return pts;
  }
  function line(x0, y0, x1, y1, n) {
    n = n || 3; var pts = [], i;
    for (i = 0; i <= n; i++) pts.push({ x: rnd(x0 + (x1 - x0) * i / n), y: rnd(y0 + (y1 - y0) * i / n) });
    return pts;
  }
  function pl() { var a = []; for (var i = 0; i < arguments.length; i += 2) a.push({ x: arguments[i], y: arguments[i + 1] }); return a; }

  /* === digit glyphs 0-9 (normalized 0..100; cap top 16, baseline 84) ===
     Ruled by the three-expert type panel. Two things to know:

     ⚠ `9` IS TWO STROKES — bowl, then tail. One stroke cannot leave a
       closed bowl without reversing direction on itself, and the shipped
       one-stroke 9 did exactly that: a 180 degree tangent reversal inside
       a single stroke, which renders as a spike and which no finger can
       trace, because at the reversal the path runs backwards through
       space while running forwards through arc length. This is the
       Zaner-Bloser form: circle, then straight down.

     ⚠ `6` and `8` are deliberately ONE stroke with NO cusp. 6's spine is
       the upper-left quadrant of a large ellipse arriving at (28,66)
       travelling straight down, and its bowl leaves (28,66) travelling
       straight down too — C1-smooth, with the bowl's seam buried under
       the spine. 8's three arcs all meet at (50,50) with the pen moving
       right through the waist on every pass.

     ⚠ THE BARRED SEVEN IS A REAL DEFECT FOR TEN OF ELEVEN LOCALES — a
       German or French seven without its bar reads as a ONE to a
       seven-year-old. It is not applied here because the bar is a
       per-locale decision; see `barFor()` below. */
  var GLYPHS = {
    '0': [arc(50, 50, 21, 34, 300, -60, 18)],

    '1': [line(34, 30, 50, 16, 2).concat(pl(50, 16))
                                 .concat(line(50, 16, 50, 84, 7).slice(1))],

    '2': [arc(50, 34, 20, 18, 200, 380, 10)
          .concat(line(68.8, 40.2, 28, 84, 5).slice(1))
          .concat(pl(28, 84))
          .concat(line(28, 84, 72, 84, 4).slice(1))],

    '3': [arc(46, 32, 18, 16, 200, 400, 10).concat(arc(46, 66, 22, 18, 290, 510, 11))],

    '4': [line(54, 16, 26, 62, 5).concat(pl(26, 62))
                                 .concat(line(26, 62, 78, 62, 5).slice(1)),
          line(64, 16, 64, 84, 7)],

    '5': [line(34, 16, 34, 48, 3).concat(arc(48, 64, 22, 20, 231, 510, 14).slice(1)),
          line(34, 16, 68, 16, 3)],

    '6': [arc(66, 66, 38, 50, 275, 180, 9).concat(arc(48, 66, 20, 18, 180, -180, 14).slice(1))],

    '7': [line(26, 16, 74, 16, 4).concat(pl(74, 16))
                                 .concat(line(74, 16, 46, 84, 6).slice(1))],

    '8': [arc(50, 33, 17, 17, 270, 90, 7)
          .concat(arc(50, 67, 19, 17, 270, 630, 14).slice(1))
          .concat(arc(50, 33, 17, 17, 90, -90, 7).slice(1))],

    '9': [arc(48, 36, 19, 20, 300, -60, 14), line(67, 36, 60, 84, 5)]
  };

  /* The crossbar ten of the eleven locales teach. Returned separately so
     a consumer applies it per locale rather than the table carrying one
     nationality's seven for everybody. */
  function barFor(lang) {
    return (lang && lang !== 'en') ? [line(38, 50, 62, 50, 2)] : [];
  }
  function glyphFor(d, lang) {
    var g = GLYPHS[String(d)];
    if (!g) return GLYPHS['0'];
    return (String(d) === '7') ? g.concat(barFor(lang)) : g;
  }
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
    GLYPHS: GLYPHS, arc: arc, line: line, barFor: barFor, glyphFor: glyphFor, TOL: TOL,
    glyphOf: glyphOf, numStrokes: numStrokes, startOf: startOf,
    newState: newState, traceScore: traceScore, attemptStroke: attemptStroke, isComplete: isComplete,
    snapshot: snapshot, facts: facts, audit: audit,
    SOLVERS: { oracleSolver: oracleSolver, scribbleSolver: scribbleSolver, outOfOrderSolver: outOfOrderSolver }
  };

}(typeof window !== 'undefined' ? window : this));

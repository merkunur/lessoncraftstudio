/* =====================================================================
   PENNY'S ALPHABET TRACE — CORE  (alphabet-trace-core.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.a — print upper- and lowercase letters (letter FORMATION). Pure
   cognition, NO DOM. The child traces every letter A–Z + a–z in stroke order.
   0 lines to ANY protected core + lcs-shell.{js,css}.

   GLYPH QUALITY (the whole point): each glyph is ORDERED strokes of DENSE points
   that lie ON a smooth standard print letterform — round letters are built from
   TRUE ELLIPSE ARCS (`arc`) and straights from sampled segments (`line`), so the
   activity can render them as a Catmull-Rom spline (passes through every point)
   and the guide is a professional, traceable letter. The SAME points are the
   ordered trace checkpoints (lenient TOL — wobble fine, STRICT on order).

   Normalized 0..100 box. Vertical metrics (y down): cap/ascender top ~14,
   x-height top ~44, baseline ~84, descender bottom ~96.

   GATE (verify-alphabet-trace-core.js): an in-order on-path ORACLE traces every
   glyph (100%); a SCRIBBLER (garbage path) and an OUT-OF-ORDER tap both fail.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ----- geometry helpers: points ON a curve (smooth by construction) ----- */
  function rnd(v) { return Math.round(v * 10) / 10; }
  /* ellipse arc; deg: 0=east, 90=south, 180=west, 270=north (y-down). Linear
     interpolation deg0→deg1 (may decrease) → the sweep direction is explicit. */
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
  function pl() { var a = []; for (var i = 0; i < arguments.length; i += 2) a.push({ x: arguments[i], y: arguments[i + 1] }); return a; }   /* explicit point list */

  /* ----- the 52 glyphs (each = array of strokes; stroke = ordered points) ----- */
  function buildGlyphs() {
    var G = {};
    /* ===== UPPERCASE (cap top 16, base 84, left 30, right 70, center 50) ===== */
    G['A'] = [line(50, 16, 30, 84, 5), line(50, 16, 70, 84, 5), line(34, 60, 66, 60, 3)];
    G['B'] = [line(33, 16, 33, 84, 6), pl(33, 16, 52, 16, 64, 27, 53, 49, 33, 49), pl(33, 49, 56, 49, 69, 65, 54, 84, 33, 84)];
    G['C'] = [arc(50, 50, 23, 34, 305, 55, 12)];
    G['D'] = [line(34, 16, 34, 84, 6), pl(34, 16, 55, 16, 70, 34, 70, 66, 55, 84, 34, 84)];
    G['E'] = [line(33, 16, 33, 84, 5), line(33, 16, 68, 16, 3), line(33, 50, 60, 50, 3), line(33, 84, 68, 84, 3)];
    G['F'] = [line(33, 16, 33, 84, 5), line(33, 16, 68, 16, 3), line(33, 50, 60, 50, 3)];
    G['G'] = [arc(50, 50, 23, 34, 305, 70, 12).concat(pl(66, 60, 50, 60))];
    G['H'] = [line(32, 16, 32, 84, 5), line(68, 16, 68, 84, 5), line(32, 50, 68, 50, 3)];
    G['I'] = [line(38, 16, 62, 16, 2), line(50, 16, 50, 84, 5), line(38, 84, 62, 84, 2)];
    G['J'] = [line(46, 16, 72, 16, 2), pl(60, 16, 60, 66, 52, 80, 40, 80, 32, 70)];
    G['K'] = [line(32, 16, 32, 84, 5), line(66, 16, 34, 52, 3), line(44, 46, 68, 84, 3)];
    G['L'] = [line(32, 16, 32, 84, 5), line(32, 84, 66, 84, 3)];
    G['M'] = [line(28, 16, 28, 84, 4), line(28, 16, 50, 54, 3), line(50, 54, 72, 16, 3), line(72, 16, 72, 84, 4)];
    G['N'] = [line(30, 16, 30, 84, 4), line(30, 16, 70, 84, 4), line(70, 16, 70, 84, 4)];
    G['O'] = [arc(50, 50, 23, 34, 270, 630, 16)];
    G['P'] = [line(32, 16, 32, 84, 5), pl(32, 16, 55, 16, 67, 28, 55, 50, 32, 50)];
    G['Q'] = [arc(50, 48, 23, 32, 270, 630, 16), line(56, 60, 74, 86, 2)];
    G['R'] = [line(32, 16, 32, 84, 5), pl(32, 16, 55, 16, 67, 28, 55, 50, 32, 50), line(46, 50, 70, 84, 3)];
    G['S'] = [pl(66, 26, 50, 16, 36, 21, 34, 35, 49, 47, 61, 55, 64, 69, 50, 80, 34, 75, 28, 65)];
    G['T'] = [line(28, 16, 72, 16, 3), line(50, 16, 50, 84, 5)];
    G['U'] = [pl(30, 16, 30, 58, 40, 78, 60, 78, 70, 58, 70, 16)];
    G['V'] = [line(30, 16, 50, 84, 4), line(50, 84, 70, 16, 4)];
    G['W'] = [line(26, 16, 38, 84, 4), line(38, 84, 50, 42, 3), line(50, 42, 62, 84, 3), line(62, 84, 74, 16, 4)];
    G['X'] = [line(30, 16, 70, 84, 4), line(70, 16, 30, 84, 4)];
    G['Y'] = [line(30, 16, 50, 52, 3), line(70, 16, 50, 52, 3), line(50, 52, 50, 84, 3)];
    G['Z'] = [line(30, 16, 70, 16, 3), line(70, 16, 30, 84, 4), line(30, 84, 70, 84, 3)];

    /* ===== lowercase (x-top 44, base 84, ascender 14, descender 96) ===== */
    G['a'] = [pl(66, 50, 52, 44, 38, 50, 34, 64, 42, 80, 60, 82, 66, 70), line(66, 44, 66, 84, 4)];
    G['b'] = [line(34, 14, 34, 84, 6), pl(34, 52, 50, 46, 64, 54, 64, 72, 50, 82, 34, 80)];
    G['c'] = [arc(50, 64, 20, 22, 300, 60, 10)];
    G['d'] = [pl(64, 52, 50, 46, 36, 52, 36, 68, 50, 82, 64, 76), line(64, 14, 64, 84, 6)];
    G['e'] = [pl(35, 66, 64, 66, 64, 53, 50, 45, 36, 52, 32, 66, 41, 80, 59, 82, 66, 72)];
    G['f'] = [pl(64, 22, 50, 15, 40, 22, 38, 40, 38, 84), line(26, 46, 52, 46, 2)];
    G['g'] = [pl(64, 52, 50, 46, 36, 52, 36, 66, 50, 80, 64, 74), pl(64, 46, 64, 84, 56, 94, 42, 92, 34, 84)];
    G['h'] = [line(34, 14, 34, 84, 6), pl(34, 52, 50, 46, 64, 54, 64, 84)];
    G['i'] = [line(50, 44, 50, 84, 4), line(50, 28, 50, 31, 1)];
    G['j'] = [pl(56, 44, 56, 80, 48, 92, 36, 90, 30, 80), line(56, 28, 56, 31, 1)];
    G['k'] = [line(34, 14, 34, 84, 6), line(64, 46, 38, 66, 2), line(46, 62, 66, 84, 2)];
    G['l'] = [line(50, 14, 50, 84, 6)];
    G['m'] = [line(30, 44, 30, 84, 4), pl(30, 52, 44, 45, 50, 54, 50, 84), pl(50, 54, 62, 45, 70, 54, 70, 84)];
    G['n'] = [line(34, 44, 34, 84, 4), pl(34, 52, 50, 45, 64, 54, 64, 84)];
    G['o'] = [arc(50, 64, 20, 22, 270, 630, 14)];
    G['p'] = [line(34, 44, 34, 96, 5), pl(34, 52, 52, 46, 66, 56, 52, 73, 34, 72)];
    G['q'] = [pl(64, 52, 50, 46, 36, 52, 36, 66, 50, 80, 64, 74), line(64, 44, 64, 96, 5)];
    G['r'] = [line(34, 44, 34, 84, 4), pl(34, 53, 48, 45, 62, 48)];
    G['s'] = [pl(62, 50, 47, 45, 38, 52, 47, 62, 58, 69, 50, 80, 35, 76, 30, 68)];
    G['t'] = [pl(46, 28, 46, 76, 54, 84, 62, 80), line(33, 44, 60, 44, 2)];
    G['u'] = [pl(34, 44, 34, 70, 43, 80, 57, 80, 66, 70, 66, 44), line(66, 44, 66, 84, 3)];
    G['v'] = [line(34, 44, 50, 84, 3), line(50, 84, 66, 44, 3)];
    G['w'] = [line(30, 44, 40, 84, 3), line(40, 84, 50, 56, 2), line(50, 56, 60, 84, 3), line(60, 84, 70, 44, 3)];
    G['x'] = [line(34, 44, 66, 84, 3), line(66, 44, 34, 84, 3)];
    G['y'] = [line(34, 44, 50, 76, 3), pl(66, 44, 50, 76, 42, 92, 30, 92)];
    G['z'] = [line(34, 44, 66, 44, 3), line(66, 44, 34, 84, 3), line(34, 84, 66, 84, 3)];
    return G;
  }

  var GLYPHS = buildGlyphs();
  var TOL = 18;     /* checkpoint hit tolerance (normalized) — lenient on precision, strict on order */

  function glyphOf(letter) { return GLYPHS[letter] || GLYPHS['l']; }
  function numStrokes(letter) { return glyphOf(letter).length; }
  function startOf(letter, i) { return glyphOf(letter)[i][0]; }

  function newState(round) { return { round: round, letter: round.letter, strokesDone: 0, formed: false }; }

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
    var g = glyphOf(s.letter);
    if (idx !== s.strokesDone) return 'wrong-order';
    if (!traceScore(g[idx], path)) return 'off-path';
    s.strokesDone++;
    if (s.strokesDone >= g.length) { s.formed = true; return 'formed'; }
    return 'stroke-ok';
  }
  function isComplete(s) { return !!s.formed; }

  function snapshot(round, s) {
    var g = glyphOf(round.letter);
    return { letter: round.letter, case: round.case || (round.letter === round.letter.toUpperCase() ? 'upper' : 'lower'), numStrokes: g.length, strokes: g, strokesDone: s ? s.strokesDone : 0, nextStart: s && s.strokesDone < g.length ? g[s.strokesDone][0] : null };
  }

  function facts(round) {
    var g = glyphOf(round.letter);
    return { letter: round.letter, numStrokes: g.length, hasStrokes: g.length >= 1, validStart: !!(g[0] && g[0].length && typeof g[0][0].x === 'number'), denseFirst: g[0].length >= 2 };
  }
  function audit(round) { return { id: round.id, letter: round.letter, numStrokes: glyphOf(round.letter).length }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  function idealPath(stroke) { return stroke.map(function (p) { return { x: p.x, y: p.y }; }); }
  function oracleSolver(round) {
    var s = newState(round), g = glyphOf(round.letter);
    for (var i = 0; i < g.length; i++) attemptStroke(s, i, idealPath(g[i]));
    return { complete: isComplete(s), strokesDone: s.strokesDone };
  }
  function scribbleSolver(round) {
    var s = newState(round);
    attemptStroke(s, 0, [{ x: 0, y: 0 }, { x: 4, y: 6 }, { x: 1, y: 9 }]);   /* garbage → off-path */
    return { complete: isComplete(s), strokesDone: s.strokesDone };
  }
  function outOfOrderSolver(round) {
    if (numStrokes(round.letter) < 2) return { skip: true };
    var s = newState(round), g = glyphOf(round.letter);
    return { result: attemptStroke(s, 1, idealPath(g[1])) };   /* expect 'wrong-order' */
  }

  global.AlphabetTraceCore = {
    GLYPHS: GLYPHS, TOL: TOL, arc: arc, line: line,
    glyphOf: glyphOf, numStrokes: numStrokes, startOf: startOf,
    newState: newState, traceScore: traceScore, attemptStroke: attemptStroke, isComplete: isComplete,
    snapshot: snapshot, facts: facts, audit: audit,
    SOLVERS: { oracleSolver: oracleSolver, scribbleSolver: scribbleSolver, outOfOrderSolver: outOfOrderSolver }
  };

}(typeof window !== 'undefined' ? window : this));

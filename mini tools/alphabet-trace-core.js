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

  /* ----- the 52 glyphs (each = array of strokes; stroke = ordered points) -----
     REBUILT to the type panel's ruling. Four defect classes closed, each of
     which the shipped table carried:

     * WINDING. `o O Q` ran CLOCKWISE (`arc(...,270,630,...)` interpolates
       UPWARD: top -> east -> bottom -> west) while `c C G` ran the other way,
       so the file drew `c` and `o` — the same curve, one of them unclosed —
       in opposite directions. Every manuscript model in all 11 locales teaches
       "start at one o'clock, go LEFT", and these points are the ordered trace
       checkpoints, so the shipped tool refused the child who drew it the way
       the teacher taught. Every round form below is counter-clockwise, which
       for `arc` means deg1 < deg0.
     * METRICS. Only 11 of 26 lowercase reached the x-line; round bottoms were
       spread over y=73..86 (`p`'s bowl stopped ELEVEN units above the
       baseline, `U`'s flat bottom six). Now every lowercase extreme touches
       44 and 84 exactly, every cap 16 and 84, every descender 96.
       NO typographic overshoot, deliberately: this is a stroked CENTRELINE,
       and a round bottom tangent to y=84 at pen-width 7 already paints ink to
       87.5 — 8.75% of the x-height, where real overshoot is 1-1.5%. Adding
       geometric overshoot double-counts it, which is why the old c/o at ry=22
       read heavy and low. The centreline IS the pedagogy: the child is taught
       to put the pencil tip ON the line.
     * SAMPLING. The same points are the trace checkpoints, so a gap is a hole
       in the strict-order guarantee: `J`'s 50-unit stem->hook gap let a child
       touch two ends and be credited with everything between. Cap is 12 units
       on a curve (the chord-vs-spline sagitta stays under an eighth of the pen
       width) and 15 on a straight, where Catmull-Rom is exact.
     * WIDTH COHERENCE. `n` was 25% narrower than `o`; round caps 28% wider
       than square ones. Standard round lowercase is now 40 (x 30..70), `e` 36,
       `s` 32, `m` 62 (1.55 x n); square caps 40, round caps 46.

     Two reversal-safety rules are load-bearing and must survive any edit:
     `b`/`p` are STEM-FIRST with a 360-degree bowl tangent to the stem, while
     `d`/`q` are BOWL-FIRST — deliberately NOT harmonised, because identical
     bowls plus opposite entry is what separates the reversal set. And no
     stroke may double back on itself: the tracer walks arc length forward, so
     a 180-degree tangent reversal inside one stroke cannot be traced at all. */
  function buildGlyphs() {
    var G = {};
    /* ===== UPPERCASE (cap top 16, base 84, left 30, right 70, center 50) ===== */
    G['A'] = [line(50, 16, 30, 84, 5), line(50, 16, 70, 84, 5), line(36, 60, 64, 60, 3)];
    /* B D P R — the bowl sweeps 270 -> 450: north -> EAST -> south. The panel's
       listing wrote `270, 90`, which `arc` interpolates DOWNWARD through 180,
       swinging the bowl out to the LEFT of its own stem (measured on B's upper
       bowl: x reached 27 against a stem at x=31). Kept the geometry, fixed the
       sweep. Bowls were 5- and 6-point hand lists with 23-32 unit gaps. */
    G['B'] = [line(31, 16, 31, 84, 7),
              line(31, 16, 46, 16, 2).concat(arc(46, 32.5, 19, 16.5, 270, 450, 8).slice(1))
                                     .concat(line(46, 49, 31, 49, 2).slice(1)),
              line(31, 49, 49, 49, 2).concat(arc(49, 66.5, 21, 17.5, 270, 450, 8).slice(1))
                                     .concat(line(49, 84, 31, 84, 2).slice(1))];
    G['C'] = [arc(50, 50, 23, 34, 300, 60, 16)];
    /* D — the shipped right side was a STRAIGHT (70,34)->(70,66) whose spline
       accidentally bulged to x=71.9: an unplanned curve that happened to be
       roughly right, which is not the same as being drawn. */
    G['D'] = [line(31, 16, 31, 84, 7),
              line(31, 16, 46, 16, 2).concat(arc(46, 50, 24, 34, 270, 450, 12).slice(1))
                                     .concat(line(46, 84, 31, 84, 2).slice(1))];
    /* E F H X — middle bar at the OPTICAL centre (48), not dead centre (50) */
    G['E'] = [line(31, 16, 31, 84, 7), line(31, 16, 66, 16, 3), line(31, 48, 60, 48, 3), line(31, 84, 66, 84, 3)];
    G['F'] = [line(31, 16, 31, 84, 7), line(31, 16, 66, 16, 3), line(31, 48, 60, 48, 3)];
    /* G — two strokes. The shipped one JUMPED 23.3 units up-and-right from the
       bowl's terminus to (66,60) inside a single stroke: a reversal cusp plus a
       spur no G has, and the bar started 6 units inside nothing (the bowl's true
       right edge at y=60 is x=72). The arc now ENDS at 15 degrees = (72.2,58.8),
       which is exactly where the crossbar begins — one stroke, then the other.
       15 rather than the panel's 17 because a 15-degree step is what puts the
       cap line (270) and the baseline (90) ON a sampled point; at 17 the curve
       touched 16 and 84 but no CHECKPOINT did, and the checkpoints are the
       metric contract. Same reason for every other sample count on this page. */
    G['G'] = [arc(50, 50, 23, 34, 300, 15, 19), line(72.2, 58.8, 52, 58.8, 3)];
    G['H'] = [line(30, 16, 30, 84, 7), line(70, 16, 70, 84, 7), line(30, 48, 70, 48, 4)];
    G['I'] = [line(36, 16, 64, 16, 2), line(50, 16, 50, 84, 7), line(36, 84, 64, 84, 2)];
    /* J — the shipped hook bottomed at y=80 and was FLAT from x=52 to 40; it
       reached the baseline only because 7-wide ink lands at 83.5, by accident
       and on a different convention from every other cap. Also a 50-unit gap. */
    G['J'] = [line(44, 16, 72, 16, 3),
              line(60, 16, 60, 62, 5).concat(arc(46, 62, 14, 22, 0, 144, 8).slice(1))];
    /* K — the shipped leg started at (46,46), whose perpendicular distance to
       the arm is 3.49: exactly the half stroke-width, so the two limbs touched
       on a hairline, 0.02 units from a visible gap. (42,42) measures 0.18. */
    G['K'] = [line(31, 16, 31, 84, 7), line(69, 16, 34, 50, 4), line(42, 42, 69, 84, 4)];
    G['L'] = [line(31, 16, 31, 84, 7), line(31, 84, 66, 84, 3)];
    /* M — vertex to the BASELINE. The shipped vertex stopped at y=54, 56% of
       cap height; every K-3 model takes it down ("down, down to the line"). */
    G['M'] = [line(26, 16, 26, 84, 6), line(26, 16, 50, 84, 6), line(50, 84, 74, 16, 6), line(74, 16, 74, 84, 6)];
    G['N'] = [line(30, 16, 30, 84, 6), line(30, 16, 70, 84, 7), line(70, 16, 70, 84, 6)];
    G['O'] = [arc(50, 50, 23, 34, 300, -60, 24)];
    G['P'] = [line(31, 16, 31, 84, 7),
              line(31, 16, 46, 16, 2).concat(arc(46, 33, 21, 17, 270, 450, 8).slice(1))
                                     .concat(line(46, 50, 31, 50, 2).slice(1))];
    G['Q'] = [arc(50, 50, 23, 34, 300, -60, 24), line(62, 70, 80, 92, 3)];
    G['R'] = [line(31, 16, 31, 84, 7),
              line(31, 16, 46, 16, 2).concat(arc(46, 33, 21, 17, 270, 450, 8).slice(1))
                                     .concat(line(46, 50, 31, 50, 2).slice(1)),
              line(42, 50, 70, 84, 4)];
    /* S — two circles and a spine. Both terminals are now symmetric about the
       middle; the shipped lower terminal stopped at y=65, nineteen units up,
       against a top terminal only ten down from the cap, and the whole letter
       bottomed at 80. The waist carries TWO points, not the panel's one: a
       single (50.5,48) left 12.1- and 12.6-unit gaps either side of it, over
       the 12-unit curve cap. Same straight spine, sampled honestly. */
    G['S'] = [arc(50, 31, 16, 15, 330, 130, 10)
              .concat(pl(47, 46.3, 54.3, 50.2))
              .concat(arc(50, 67, 18, 17, 310, 510, 10))];
    G['T'] = [line(28, 16, 72, 16, 4), line(50, 16, 50, 84, 7)];
    /* U — one stroke with a ROUND bottom on the baseline. The shipped U was
       flat from x=40 to 60 at y=78 (the spline sagged to 80.5, still 3.5
       short) and carried two 42-unit gaps. */
    G['U'] = [line(30, 16, 30, 56, 4)
              .concat(arc(50, 56, 20, 28, 180, 0, 10).slice(1))
              .concat(line(70, 56, 70, 16, 4).slice(1))];
    G['V'] = [line(30, 16, 50, 84, 6), line(50, 84, 70, 16, 6)];
    /* W — the shipped middle apex reached only y=42, 62% of the way up; it
       read as a wobble rather than a W. */
    G['W'] = [line(22, 16, 34, 84, 6), line(34, 84, 50, 24, 5), line(50, 24, 66, 84, 5), line(66, 84, 78, 16, 6)];
    G['X'] = [line(30, 16, 70, 84, 7), line(70, 16, 30, 84, 7)];
    G['Y'] = [line(30, 16, 50, 52, 4), line(70, 16, 50, 52, 4), line(50, 52, 50, 84, 3)];
    G['Z'] = [line(28, 16, 72, 16, 4), line(72, 16, 28, 84, 6), line(28, 84, 72, 84, 4)];

    /* ===== lowercase (x-top 44, base 84, ascender 14, descender 96) ===== */
    /* a — ONE true ellipse, tangent to the stem, started at one o'clock (the
       taught "make a c first" motion). The shipped bowl fitted an ellipse at
       four of its seven points and missed the fifth by r2=1.39, bulging hard
       at the bottom right and then hooking back up: a lopsided egg with a cut
       top-right, and 18-unit gaps throughout. */
    G['a'] = [arc(49, 64, 19, 20, 300, -60, 12), line(68, 44, 68, 84, 5)];
    /* b d p q — ONE bowl geometry (rx 19, ry 20, cy 64), mirrored, so the only
       difference between them is side and ascender-vs-descender. The shipped
       set had FOUR different bowls, none matching o, and b/d differed from
       each other by 2 units so they were not even mirrors — in the one letter
       set where geometric identity is pedagogically load-bearing.
       b/p are STEM-FIRST: their bowl is a full 360-degree loop tangent to the
       stem at (32,64), so (i) the seam is BURIED IN THE STEM, (ii) the first
       sampled motion off 180 degrees increasing is straight UP, which is the
       taught "push up the stem, then curve over". d/q are BOWL-FIRST. Do not
       harmonise them; the asymmetry is the anti-reversal strategy. */
    G['b'] = [line(32, 14, 32, 84, 7), arc(51, 64, 19, 20, 180, 540, 12)];
    G['c'] = [arc(50, 64, 20, 20, 300, 60, 16)];
    G['d'] = [arc(49, 64, 19, 20, 300, -60, 12), line(68, 14, 68, 84, 7)];
    /* e — bar at 50% of the x-height and a bowl matched to o less 4. The
       shipped bar started at x=35 while the bowl's left edge was 32. */
    G['e'] = [line(32, 64, 68, 64, 3).concat(arc(50, 64, 18, 20, 0, -300, 10).slice(1))];
    /* f — a REAL hook onto the ascender line, and the crossbar ON the x-line.
       The shipped hook was 24 wide and 7 deep (a flat cap, not a hook) with
       its crossbar at y=46, two units BELOW the line it exists to mark. */
    G['f'] = [arc(45, 24, 11, 10, 0, -180, 8).concat(line(34, 24, 34, 84, 6).slice(1)),
              line(24, 44, 46, 44, 2)];
    /* g — the d/q bowl plus a tail that reaches the descender and sweeps out */
    G['g'] = [arc(49, 64, 19, 20, 300, -60, 12),
              line(68, 44, 68, 80, 4).concat(arc(51, 80, 17, 16, 0, 150, 10).slice(1))];
    /* h m n r — a TRUE semicircular arch springing vertically off the stem.
       The shipped shoulder sprang at y=52, apexed at 45 and landed at 54: a
       rise of 7 units on a 30-unit span, which is a flat bridge, and the
       letter read as a table. At 180 degrees the tangent is straight up,
       which is exactly the taught "push up, then curve over" — and it makes
       u the honest mirror of n. */
    G['h'] = [line(30, 14, 30, 84, 7),
              arc(50, 64, 20, 20, 180, 360, 10).concat(line(70, 64, 70, 84, 2).slice(1))];
    G['i'] = [line(50, 44, 50, 84, 4), line(50, 28, 50, 31, 1)];
    G['j'] = [line(56, 44, 56, 80, 4).concat(arc(42, 80, 14, 16, 0, 150, 10).slice(1)),
              line(56, 28, 56, 31, 1)];
    G['k'] = [line(32, 14, 32, 84, 7), line(68, 44, 34, 66, 4), line(42, 60, 68, 84, 3)];
    G['l'] = [line(50, 14, 50, 84, 7)];
    G['m'] = [line(18, 44, 18, 84, 4),
              arc(33.5, 64, 15.5, 20, 180, 360, 8).concat(line(49, 64, 49, 84, 2).slice(1)),
              arc(64.5, 64, 15.5, 20, 180, 360, 8).concat(line(80, 64, 80, 84, 2).slice(1))];
    G['n'] = [line(30, 44, 30, 84, 4),
              arc(50, 64, 20, 20, 180, 360, 10).concat(line(70, 64, 70, 84, 2).slice(1))];
    G['o'] = [arc(50, 64, 20, 20, 300, -60, 12)];
    /* p — the worst glyph in the shipped table. Its bowl bottomed at y=73,
       ELEVEN units above the baseline, and closed onto the stem at 72: a blob
       in the upper half of the x-height with a full-length descender hanging
       under it. A broken letter, not a crude one. */
    G['p'] = [line(32, 44, 32, 96, 6), arc(51, 64, 19, 20, 180, 540, 12)];
    G['q'] = [arc(49, 64, 19, 20, 300, -60, 12), line(68, 44, 68, 96, 6)];
    G['r'] = [line(32, 44, 32, 84, 5), arc(50, 64, 18, 20, 180, 315, 6)];
    G['s'] = [arc(50, 53, 14, 9, 330, 130, 10).concat(pl(50.7, 62.3))
                                             .concat(arc(50, 73, 16, 11, 310, 510, 10))];
    /* t — hook on the baseline, stem sampled. The shipped t was FOUR points
       for the whole letter, with a 48-unit gap down the stem. */
    G['t'] = [line(46, 26, 46, 74, 5).concat(arc(56, 74, 10, 10, 180, 45, 6).slice(1)),
              line(32, 44, 60, 44, 3)];
    G['u'] = [line(30, 44, 30, 64, 2).concat(arc(50, 64, 20, 20, 180, 0, 10).slice(1))
                                     .concat(line(70, 64, 70, 44, 2).slice(1)),
              line(70, 44, 70, 84, 4)];
    G['v'] = [line(32, 44, 50, 84, 4), line(50, 84, 68, 44, 4)];
    G['w'] = [line(20, 44, 32, 84, 4), line(32, 84, 50, 50, 3), line(50, 50, 68, 84, 3), line(68, 84, 80, 44, 4)];
    G['x'] = [line(32, 44, 68, 84, 4), line(68, 44, 32, 84, 4)];
    /* y — the shipped tail ended as a horizontal run from x=42 to 30 at y=92:
       a flat bottom four units short of the descender line. */
    G['y'] = [line(32, 44, 49, 82, 4),
              line(68, 44, 48, 84, 4).concat(arc(38, 84, 10, 12, 0, 135, 6).slice(1))];
    G['z'] = [line(32, 44, 68, 44, 3), line(68, 44, 32, 84, 4), line(32, 84, 68, 84, 3)];
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
  /* Per-stroke tolerance. Returns TOL for every one of the 52 shipped glyphs
     (none carries `.tol`, and the gate asserts that), so this is a no-op for
     everything that shipped. It exists because two marks can sit close
     enough that one shared tolerance makes them the SAME stroke: an umlaut's
     dots are 20 units apart, and at TOL=18 a tap between them satisfies both
     — they would not be two strokes at all. A tighter own-tolerance is what
     makes them separable. */
  function tolOf(stroke) { return (stroke && stroke.tol) || TOL; }

  /* in-order on-path: each checkpoint counted when a drawn segment passes within
     tolerance (point-to-segment); order strict (cp only advances forward). */
  function traceScore(stroke, path) {
    if (!path || path.length < 2) return false;
    var cp = 0, i, tol = tolOf(stroke);
    for (i = 0; i < path.length - 1 && cp < stroke.length; i++) {
      while (cp < stroke.length && segDist(path[i], path[i + 1], stroke[cp]) <= tol) cp++;
    }
    return cp >= stroke.length;
  }

  /* ---- LIVE INK (added for Letter Studio, tool #25) -------------------
     `traceScore`/`attemptStroke` judge a WHOLE stroke at pointerup, which is
     right for a tap-and-check activity but cannot drive "the line inks only
     while you follow the path". `advance` is the per-SAMPLE companion: call
     it on each pointermove to ask whether THIS point is on the path, and to
     walk the same checkpoint cursor forward.

     Purely additive — it introduces no new tolerance, reuses segDist/TOL,
     and does not touch traceScore or attemptStroke, so the shipped
     penny-alphabet-trace activity is unaffected. The cursor is lazily
     initialised on the state object and re-zeroes itself whenever the
     stroke index changes, so `newState` keeps its exact shape too. */
  function polyDist(stroke, p) {
    if (!stroke || !stroke.length) return Infinity;
    if (stroke.length === 1) return dist(stroke[0], p);
    var d = Infinity, i;
    for (i = 0; i < stroke.length - 1; i++) d = Math.min(d, segDist(stroke[i], stroke[i + 1], p));
    return d;
  }
  function advance(s, idx, pt) {
    var g = glyphOf(s.letter);
    if (idx !== s.strokesDone) return { onPath: false, cp: 0, done: false };
    var stroke = g[idx];
    if (s._cpStroke !== idx) { s._cpStroke = idx; s._cp = 0; }
    var tol = tolOf(stroke);
    var on = polyDist(stroke, pt) <= tol;
    if (on) { while (s._cp < stroke.length && dist(stroke[s._cp], pt) <= tol) s._cp++; }
    return { onPath: on, cp: s._cp, done: s._cp >= stroke.length };
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
    advance: advance, tolOf: tolOf,
    snapshot: snapshot, facts: facts, audit: audit,
    SOLVERS: { oracleSolver: oracleSolver, scribbleSolver: scribbleSolver, outOfOrderSolver: outOfOrderSolver }
  };

}(typeof window !== 'undefined' ? window : this));

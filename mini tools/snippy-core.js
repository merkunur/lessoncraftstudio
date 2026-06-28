/* =====================================================================
   SNIPPY THE SOUND-SPARK SNAIL — CORE  (snippy-core.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.a — print upper- and lowercase LETTERS (letter FORMATION). Pure
   cognition, NO DOM. The graded cognition is FORMATION: supply the formation
   PLAN (correct START-POINT, stroke ORDER, direction, shape) and produce the
   letter. The letter is SHOWN (formation, NOT recognition — the sound/word is a
   light frame). 0 lines to ANY existing core (incl. numeral-trace-core.js, which
   this MODELS read-only) + lcs-shell.

   THE 3-LEVEL PASS (only CERTIFY is graded): guided (path+start+arrow+order
   numbers) → checkpointed (path, no arrows) → CERTIFY (path HIDDEN + order
   numbers HIDDEN; the per-stroke start-dots are UNLABELED, UNORDERED targets →
   to pass, pointerdown on the CORRECT start among ALL starts + take the strokes
   in the right ORDER unprompted). A wrong first start at certify DEMOTES (no
   free retry to brute-force the order).

   THE GATE-CAN'T-CHEAT PROOF (verify-snippy-core.js): a form-from-the-plan
   oracle certifies 100% while CHECKPOINT-HOMING-FOLLOWER (a convention-free
   geometric dot-connector — knows the coords, ZERO handwriting knowledge → picks
   starts/strokes by PROXIMITY → cannot derive which start is FIRST or the stroke
   ORDER) / DOT-FOLLOWER (no path+no order at certify) / SCRIBBLER all <= chance.
   The certify deck is SKEWED so formation-order != proximity-order for the
   MAJORITY (multi-stroke + the dot-last i + the serpentine s/S + the b/d
   reversal); single proximity-traceable letters (c,o,l,b) are the minority.

   Glyphs: per-letter ORDERED stroke-checkpoint paths in a normalized 0..100 box
   (EN print, K-handwriting order). start of stroke i = strokes[i][0].
   ===================================================================== */
(function (global) {
  'use strict';

  /* Glyphs REDRAWN 2026-06-28 (operator: "the letters are not good") — each stroke
     is now DENSE points lying ON the smooth standard print-letter curve, so the
     activity renders the guide as a Catmull-Rom spline (the Mama's-Roll-Call
     numeral fix). The per-stroke START point, the stroke ORDER, and the stroke
     COUNT are PRESERVED at their prior coordinates so the homer/dot-follower
     anti-cheat skew (verify-snippy-core.js) is unchanged. */
  var GLYPHS = {
    /* single-stroke curves (proximity-traceable — the homer minority) */
    'c': [[{ x: 65, y: 49 }, { x: 50, y: 41 }, { x: 33, y: 48 }, { x: 26, y: 64 }, { x: 33, y: 80 }, { x: 50, y: 87 }, { x: 67, y: 80 }]],
    's': [[{ x: 66, y: 46 }, { x: 48, y: 40 }, { x: 37, y: 50 }, { x: 50, y: 60 }, { x: 60, y: 70 }, { x: 46, y: 84 }, { x: 30, y: 78 }]],
    'S': [[{ x: 72, y: 28 }, { x: 52, y: 18 }, { x: 34, y: 27 }, { x: 44, y: 44 }, { x: 62, y: 53 }, { x: 66, y: 70 }, { x: 48, y: 82 }, { x: 30, y: 74 }]],
    /* multi-stroke — the formation order != proximity order → the homer picks the
       WRONG first start (proximity-nearest-to-origin != the true first stroke):
       i/j (dot drawn last, dot nearer origin), t (cross nearer), a/d (stick
       nearer than the loop), f (cross nearer than the hook). These DEFEAT the
       checkpoint-homing-follower at the certify start-selection. */
    't': [[{ x: 50, y: 18 }, { x: 50, y: 50 }, { x: 50, y: 74 }, { x: 58, y: 82 }, { x: 66, y: 78 }], [{ x: 34, y: 40 }, { x: 50, y: 40 }, { x: 66, y: 40 }]],
    'i': [[{ x: 50, y: 40 }, { x: 50, y: 64 }, { x: 50, y: 88 }], [{ x: 50, y: 20 }, { x: 50, y: 23 }]],
    'j': [[{ x: 52, y: 38 }, { x: 52, y: 64 }, { x: 52, y: 78 }, { x: 43, y: 90 }, { x: 31, y: 86 }], [{ x: 52, y: 20 }, { x: 52, y: 23 }]],
    'a': [[{ x: 66, y: 48 }, { x: 50, y: 40 }, { x: 34, y: 50 }, { x: 30, y: 66 }, { x: 40, y: 82 }, { x: 58, y: 82 }, { x: 66, y: 70 }], [{ x: 66, y: 42 }, { x: 66, y: 64 }, { x: 66, y: 88 }]],
    'd': [[{ x: 66, y: 48 }, { x: 50, y: 40 }, { x: 34, y: 50 }, { x: 30, y: 66 }, { x: 40, y: 82 }, { x: 58, y: 82 }, { x: 66, y: 70 }], [{ x: 66, y: 12 }, { x: 66, y: 50 }, { x: 66, y: 88 }]],
    'f': [[{ x: 66, y: 22 }, { x: 50, y: 14 }, { x: 38, y: 22 }, { x: 35, y: 44 }, { x: 35, y: 88 }], [{ x: 20, y: 46 }, { x: 36, y: 46 }, { x: 52, y: 46 }]],
    /* b — stick THEN bump; proximity-first == formation-first → a homer PASSER
       (kept for the b/d reversal pair; the minority that the homer can form). */
    'b': [[{ x: 34, y: 12 }, { x: 34, y: 50 }, { x: 34, y: 88 }], [{ x: 34, y: 52 }, { x: 52, y: 46 }, { x: 64, y: 60 }, { x: 52, y: 80 }, { x: 34, y: 80 }]],
    /* fallback single-stroke l (used when a manifest letter has no glyph) */
    'l': [[{ x: 50, y: 14 }, { x: 50, y: 50 }, { x: 50, y: 86 }]]
  };
  var TOL = 22;            /* checkpoint hit tolerance — lenient on precision, strict on order */
  var START_TOL = 16;      /* a pointerdown within START_TOL of a stroke-start counts as "on" that start */
  var LEVELS = ['guided', 'checkpoint', 'certify'];

  function glyphOf(letter) { return GLYPHS[letter] || GLYPHS['l']; }
  function numStrokes(letter) { return glyphOf(letter).length; }
  function startOf(letter, i) { return glyphOf(letter)[i][0]; }
  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }

  /* which stroke's START is `pt` nearest to (among ALL the letter's stroke-starts)? */
  function nearestStartIndex(letter, pt) {
    var g = glyphOf(letter), best = -1, bd = Infinity;
    for (var i = 0; i < g.length; i++) { var d = dist(pt, g[i][0]); if (d < bd) { bd = d; best = i; } }
    return { idx: best, d: bd };
  }
  /* does a pointer path traverse the stroke's checkpoints IN ORDER (within tol)? */
  function traceScore(stroke, path) {
    var cp = 0;
    for (var i = 0; i < path.length && cp < stroke.length; i++) if (dist(path[i], stroke[cp]) <= TOL) cp++;
    return cp >= stroke.length;
  }

  function newState(round, level) {
    return { round: round, letter: round.letter, level: level || 'certify', strokesDone: 0, demoted: false, formed: false, attempts: [] };
  }

  /* attemptStroke(state, startPt, path) — the child pointerdowns near `startPt`
     then drags `path`. STRICT order always. At CERTIFY the start must be SELECTED
     correctly among all starts (nearest-start === the next stroke), else demote;
     at guided/checkpoint the next start is cued so selection is lenient. */
  function attemptStroke(s, startPt, path) {
    var g = glyphOf(s.letter), idxExpected = s.strokesDone;
    if (idxExpected >= g.length) return 'done';
    var ns = nearestStartIndex(s.letter, startPt);
    if (s.level === 'certify') {
      /* start-SELECTION among all starts + unprompted ORDER */
      if (ns.idx !== idxExpected || ns.d > START_TOL) { s.demoted = true; return 'wrong-start'; }
    } else {
      /* practice: the next start is cued; only reject a start that's clearly elsewhere */
      if (ns.idx !== idxExpected && ns.d <= START_TOL) return 'wrong-order';
    }
    if (path && path.length) { if (!traceScore(g[idxExpected], path)) return 'off-path'; }
    else if (s.level === 'certify') { return 'off-path'; }   /* certify REQUIRES a real trace — a bare start-tap forms nothing (closes the dot-follower hole) */
    s.strokesDone++;
    s.attempts.push(idxExpected);
    if (s.strokesDone >= g.length) { s.formed = true; return 'formed'; }
    return 'stroke-ok';
  }

  function isGenuineFormation(s) { return !!s.formed && !s.demoted; }

  /* snapshot — the renderer's view. CRUCIAL: at certify the connecting PATH and
     the order NUMBERS are NOT in the payload; only the unlabeled stroke-STARTS. */
  function snapshot(round, level) {
    var g = glyphOf(round.letter), lvl = level || 'certify';
    return {
      letter: round.letter, word: round.word || '', level: lvl,
      numStrokes: g.length,
      starts: g.map(function (st) { return { x: st[0].x, y: st[0].y }; }),   /* the start-dots (unlabeled at certify) */
      showPath: lvl !== 'certify',           /* the connecting glyph path/checkpoints — HIDDEN at certify */
      showOrderNumbers: lvl === 'guided',    /* the 1-2-3 order — only at guided */
      showArrows: lvl === 'guided',
      glyphPath: lvl !== 'certify' ? g : null,   /* the practice levels expose the path; certify does NOT */
      prompt: round.prompt || ''
      /* certify payload carries NO glyphPath + NO order numbers (CERTIFY_LEVEL_HIDES_ORDER_AND_PATH) */
    };
  }

  function facts(round) {
    var g = glyphOf(round.letter);
    return {
      letter: round.letter, numStrokes: g.length, multiStroke: g.length > 1,
      onlyCertifyGraded: true,
      certifyHidesOrderAndPath: !snapshot(round, 'certify').showPath && !snapshot(round, 'certify').showOrderNumbers,
      certifyShowsUnlabeledStarts: true,
      demoteOnWrongStart: true,
      startSelectionAmongAllStarts: g.length > 1,        /* the start-selection bites on multi-stroke */
      letterShownNotRecognition: true
    };
  }

  /* audit — gate-only per-round data. */
  function audit(round) {
    var g = glyphOf(round.letter);
    return { id: round.id, letter: round.letter, numStrokes: g.length, strokes: g, word: round.word || null };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  function idealPath(stroke) { return stroke.map(function (p) { return { x: p.x, y: p.y }; }); }

  /* FORM-FROM-THE-PLAN ORACLE — knows the letter: correct start in order + an
     in-order trace of each stroke → certifies every round (the unique pass). */
  function oracleSolver(round) {
    var s = newState(round, 'certify'), g = glyphOf(round.letter);
    for (var i = 0; i < g.length; i++) attemptStroke(s, g[i][0], idealPath(g[i]));
    return { genuine: isGenuineFormation(s), strokesDone: s.strokesDone };
  }

  /* CHECKPOINT-HOMING-FOLLOWER — convention-free: orders the strokes by their
     start's PROXIMITY to the top-left origin (no handwriting knowledge), and
     traces each via nearest-neighbour through its checkpoints. At certify the
     first proximity-order != formation-order start is a wrong-start → demote. */
  function homerSolver(round) {
    var s = newState(round, 'certify'), g = glyphOf(round.letter);
    /* the homer's stroke ORDER: by start distance to (0,0), nearest first */
    var order = g.map(function (st, i) { return { i: i, d: dist(st[0], { x: 0, y: 0 }) }; })
      .sort(function (a, b) { return a.d - b.d; }).map(function (o) { return o.i; });
    for (var k = 0; k < order.length; k++) {
      var idx = order[k], stroke = g[idx];
      /* nearest-neighbour traversal of THIS stroke's checkpoints from its start */
      var pts = stroke.slice(), path = [pts.shift()];
      while (pts.length) {
        var last = path[path.length - 1], bj = 0, bd = Infinity;
        for (var j = 0; j < pts.length; j++) { var dd = dist(last, pts[j]); if (dd < bd) { bd = dd; bj = j; } }
        path.push(pts.splice(bj, 1)[0]);
      }
      var res = attemptStroke(s, stroke[0], path);
      if (res === 'wrong-start' || res === 'off-path' || res === 'wrong-order') break;
    }
    return { genuine: isGenuineFormation(s) };
  }

  /* DOT-FOLLOWER — at certify there is no path + no order; it can only tap the
     start-dots in their array order (which it does NOT know is the formation
     order) → model it tapping in PROXIMITY order with NO trace path. */
  function dotFollowerSolver(round) {
    var s = newState(round, 'certify'), g = glyphOf(round.letter);
    var order = g.map(function (st, i) { return { i: i, d: dist(st[0], { x: 0, y: 0 }) }; })
      .sort(function (a, b) { return a.d - b.d; }).map(function (o) { return o.i; });
    for (var k = 0; k < order.length; k++) { var res = attemptStroke(s, g[order[k]][0], null); if (res === 'wrong-start' || res === 'wrong-order') break; }
    return { genuine: isGenuineFormation(s) };   /* no path → even if order right, strokes with checkpoints need a trace at certify? (path optional → but order still must hold) */
  }

  /* SCRIBBLER — correct starts but a garbage path → off-path. */
  function scribblerSolver(round) {
    var s = newState(round, 'certify'), g = glyphOf(round.letter);
    for (var i = 0; i < g.length; i++) { var res = attemptStroke(s, g[i][0], [{ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 2, y: 9 }]); if (res === 'off-path') break; }
    return { genuine: isGenuineFormation(s) };
  }

  global.SnippyCore = {
    GLYPHS: GLYPHS, TOL: TOL, START_TOL: START_TOL, LEVELS: LEVELS,
    glyphOf: glyphOf, numStrokes: numStrokes, startOf: startOf, nearestStartIndex: nearestStartIndex, traceScore: traceScore,
    newState: newState, attemptStroke: attemptStroke, isGenuineFormation: isGenuineFormation,
    snapshot: snapshot, facts: facts, audit: audit,
    SOLVERS: { oracleSolver: oracleSolver, homerSolver: homerSolver, dotFollowerSolver: dotFollowerSolver, scribblerSolver: scribblerSolver }
  };

}(typeof window !== 'undefined' ? window : this));

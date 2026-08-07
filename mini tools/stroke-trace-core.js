/* =====================================================================
   STROKE TRACE CORE  (stroke-trace-core.js)
   ---------------------------------------------------------------------
   The live-ink tracer for finger tracing. Pure cognition, NO DOM.
   0 lines to lcs-shell.{js,css} or any protected core.

   ⭐ IT TAKES STROKES, NEVER A LETTER KEY. That is the whole point.

   The tracer this replaces lived in alphabet-trace-core.js and looked its
   glyph up by character. Letter Studio rendered digits out of
   number-trace-core.js and then asked THIS core to judge the same key —
   which it did not have, so `glyphOf()` silently returned lowercase "l".
   All ten digits were scored against a vertical line: one stroke down the
   middle "wrote" any of them, and 9 of the 10 green start dots pointed
   somewhere the judge never read. A whole shipped mode was theatre.

   Handing the judge the ACTUAL strokes the renderer is drawing makes that
   class of defect structurally impossible — there is no lookup, so there
   is no fallback, so the drawn glyph and the judged glyph are the same
   object by construction.

   ---------------------------------------------------------------------
   WHY THE OLD TRACER AUTOCOMPLETED (the operator's complaint, measured)

   It counted CHECKPOINTS with one radius doing two different jobs:

       while (dist(stroke[cp], pt) <= TOL) cp++;      // TOL = 18

   As a corridor ("am I on the road?") 18 units is merely generous. As a
   capture radius ("have I reached this checkpoint?") it is fatal: one
   stationary finger swallows every checkpoint within 18 units, and the
   stroke reports `done` while the finger is still a fifth of the letter's
   height from the end. Measured over all 115 strokes of the two glyph
   tables: the tool drew an average of 36.2% of every stroke FOR the child
   — 75% of capital I's serifs, 69% of J's bar, 66% of t's crossbar — and
   14 strokes completed from a single tap at their midpoint.

   ---------------------------------------------------------------------
   THE MODEL: CONTIGUOUS ARC LENGTH SWEPT BY THE FINGER

   Each stroke is flattened to dense points along the SAME Catmull-Rom
   curve the renderer draws (see `flatten`). A cursor `u` walks that
   flattened path, in arc-length units, and one rule governs it:

       a path point is earned when the segment the finger just swept
       (prev -> now) passes within CORRIDOR of it, AND every point
       before it has already been earned.

   CONTIGUITY is what makes cheating impossible, and it is doing all the
   work at once:
     * a tap sweeps ZERO length, so it earns only what is under it — and
       nothing before that is earned, so the run does not connect and the
       cursor does not move. One tap can never finish a stroke.
     * tap-the-start-then-tap-the-end likewise leaves the middle unearned.
     * tracing BACKWARDS earns nothing, because the first thing swept is
       the far end and the run must start at the cursor.
     * stopping short leaves the tail unearned — which IS the complaint.
     * a genuinely fast finger sweeps a LONG segment that passes near
       every point along it, so the whole run is earned. Speed is not
       punished; only absence is.

   Nothing is ever credited that the finger did not pass. There is no
   terminal-point snap, no "close enough" jump, no drawing-ahead.

   ⚠ FLATTEN ALONG THE CURVE, NOT THE POLYLINE. The renderer draws a
   Catmull-Rom spline through the stroke's points; the old tracer measured
   against the straight polyline between them. Measured max divergence is
   2.84 units (t#0, e#0, B#2) — 16% of an 18-unit corridor and harmless,
   but 35% of an 8-unit one. Tighten the corridor without flattening along
   the curve and you start rejecting children who are exactly on the line
   they can see.

   ⚠ DOTS ARE TAPPED, NOT TRACED. The dot of i/j is a ~3-unit stroke. You
   cannot "sweep" it and no child would try. A stroke shorter than
   DOT_LEN completes on a tap within DOT_R — which is the correct
   behaviour and not a hole in the rules above.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- tuning. Every one of these is measured, not chosen. ----------
     CORRIDOR   how far off the path the finger may stray and still ink.
                The guide is drawn 7 units wide, so its half-width is 3.5;
                8 is a shade over two half-widths. The old 18 was 5.1x.
     WIDE       the accessibility corridor (settings / repeated stalls).
     STEP       flattening resolution. Must be well under CORRIDOR or a
                fast sweep can pass between two path points and skip them.
     LOOK       how far ahead of the cursor to scan, beyond what the
                finger just swept. Bounds cost and nothing else — the
                contiguity rule is what bounds progress.
     END_SLACK  the cursor must reach within this of the end. The ink is
                5.4 units wide, so 4 units is inside one pen width: the
                child cannot see the difference, which is the definition
                of "finished". Scaled down for short strokes so a 24-unit
                serif cannot be 17% auto-finished.
     DOT_LEN/R  a stroke this short is a dot; tap it within DOT_R.       */
  var CORRIDOR  = 8;
  var WIDE      = 12;
  var STEP      = 1.2;
  var LOOK      = 10;
  var END_SLACK = 4;
  var DOT_LEN   = 6;
  var DOT_R     = 7;
  var SLACK     = 1.15;  /* the cursor may barely lead the finger; see sample() */
  var RESUME    = 6;     /* how far ahead a re-entry may rejoin the path   */

  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }

  /* point-to-SEGMENT distance, clamped. Used for the plain proximity
     questions where "near either end" is genuinely what is meant. */
  function segDist(a, b, p) {
    var vx = b.x - a.x, vy = b.y - a.y, wx = p.x - a.x, wy = p.y - a.y;
    var L2 = vx * vx + vy * vy;
    if (L2 === 0) return dist(a, p);
    var t = (wx * vx + wy * vy) / L2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return dist({ x: a.x + t * vx, y: a.y + t * vy }, p);
  }

  /* Catmull-Rom -> cubic Bezier, sampled. IDENTICAL curve to the one the
     renderer draws (letter-studio.js _d()), so the judge and the picture
     agree. Strokes of fewer than 3 points are straight there and here. */
  function flatten(stroke, step) {
    step = step || STEP;
    if (!stroke || stroke.length < 2) return (stroke || []).slice();
    var out = [], k, p0, p1, p2, p3, c1x, c1y, c2x, c2y, i, n, t, mt;
    if (stroke.length === 2) {
      n = Math.max(1, Math.ceil(dist(stroke[0], stroke[1]) / step));
      for (i = 0; i <= n; i++) {
        t = i / n;
        out.push({ x: stroke[0].x + (stroke[1].x - stroke[0].x) * t,
                   y: stroke[0].y + (stroke[1].y - stroke[0].y) * t });
      }
      return out;
    }
    out.push({ x: stroke[0].x, y: stroke[0].y });
    for (k = 0; k < stroke.length - 1; k++) {
      p0 = stroke[k - 1] || stroke[k]; p1 = stroke[k];
      p2 = stroke[k + 1]; p3 = stroke[k + 2] || p2;
      c1x = p1.x + (p2.x - p0.x) / 6; c1y = p1.y + (p2.y - p0.y) / 6;
      c2x = p2.x - (p3.x - p1.x) / 6; c2y = p2.y - (p3.y - p1.y) / 6;
      /* chord is a fine length estimate at these scales; err denser */
      n = Math.max(1, Math.ceil((dist(p1, p2) * 1.15) / step));
      for (i = 1; i <= n; i++) {
        t = i / n; mt = 1 - t;
        out.push({
          x: mt * mt * mt * p1.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * p2.x,
          y: mt * mt * mt * p1.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * p2.y
        });
      }
    }
    return out;
  }

  /* cumulative arc length along the flattened path */
  function measure(flat) {
    var cum = [0], i;
    for (i = 1; i < flat.length; i++) cum.push(cum[i - 1] + dist(flat[i - 1], flat[i]));
    return cum;
  }

  function prepare(strokes) {
    var out = [], i, flat, cum;
    for (i = 0; i < strokes.length; i++) {
      flat = flatten(strokes[i]);
      cum = measure(flat);
      out.push({
        pts: flat,
        cum: cum,
        total: cum[cum.length - 1] || 0,
        isDot: (cum[cum.length - 1] || 0) <= DOT_LEN,
        raw: strokes[i]
      });
    }
    return out;
  }

  /* ---- state ------------------------------------------------------- */
  function newTrace(strokes, opts) {
    opts = opts || {};
    return {
      lanes: prepare(strokes || []),
      idx: 0,            /* the stroke currently being formed          */
      u: 0,              /* arc length earned on THIS stroke           */
      i: 0,              /* index of the last earned flattened point   */
      n: 0,              /* on-path samples this stroke                */
      last: null,        /* previous sample, for the swept segment     */
      onPath: false,     /* was it on the path? see `sample`           */
      corridor: opts.corridor || CORRIDOR,
      formed: false,
      strokesDone: 0
    };
  }

  function lane(s) { return s.lanes[s.idx] || null; }

  /* Where the next stroke begins — the green dot. */
  function startPoint(s) {
    var L = lane(s);
    return L && L.pts.length ? L.pts[0] : null;
  }
  /* Where the child has got to — for a "you are here" marker. */
  function cursorPoint(s) {
    var L = lane(s);
    if (!L || !L.pts.length) return null;
    return L.pts[Math.min(s.i, L.pts.length - 1)];
  }
  function progress(s) {
    var L = lane(s);
    if (!L || !L.total) return 0;
    return Math.max(0, Math.min(1, s.u / L.total));
  }

  /* how close to the end the cursor must get. Scaled so a short stroke
     cannot be proportionally auto-finished: on a 24-unit serif this is
     3.6 units, not 4. */
  /* the single definition of "finished", used by sample() and endStroke()
     alike so the live hint and the verdict can never disagree */
  function reached(s, L) {
    if (L.isDot) return s.u >= L.total;
    return s.u >= L.total - endSlack(L.total) && s.n >= minSamples(L.total);
  }

  function endSlack(total) { return Math.min(END_SLACK, total * 0.15); }

  /* ⚠ HOW MANY ON-PATH SAMPLES A REAL TRACE PRODUCES.
     Two pointer events cannot be a traced stroke. On a straight stroke a
     single sweep from the start to the end lies exactly on the path, so
     the contiguity rule alone cannot tell it from a genuinely fast
     finger — measured, that let 82 of 126 strokes complete from
     tap-start-then-tap-end. A real drag at 60Hz over even a fast 100ms
     swipe delivers ~6 samples, and `getCoalescedEvents()` recovers more
     on a stuttering device, so this floor never touches an honest child.
     It is deliberately about EVENT COUNT, not speed: speed is allowed. */
  function minSamples(total) { return Math.max(6, Math.round(total / 12)); }

  /* ---- the one rule ------------------------------------------------ */
  /* Advance the cursor over every path point the swept segment reached,
     stopping at the first point it did NOT reach. Contiguity is enforced
     by that stop: progress can never resume past a gap. */
  function sample(s, pt) {
    var L = lane(s);
    if (!L || s.formed) return { on: false, done: false, progress: progress(s) };

    if (L.isDot) {
      if (dist(pt, L.pts[0]) <= DOT_R) {
        s.u = L.total; s.i = L.pts.length - 1; s.n++; s.last = pt; s.onPath = true;
        return { on: true, done: true, progress: 1 };
      }
      return { on: false, done: false, progress: 0 };
    }

    /* Where is the finger, and how far off the path? Forward of the
       cursor only — a global search hands a backwards `o` instant credit
       because its start and end are the same point. */
    var fu = fingerU(L, pt, s.i, s.u + Math.max(LOOK, dist(s.last || pt, pt) * SLACK), s.corridor);
    if (fu.d > s.corridor) { s.last = pt; s.onPath = false; return { on: false, done: reached(s, L), progress: progress(s) }; }

    /* ⭐ THE CURSOR MAY NOT ADVANCE FURTHER THAN THE FINGER TRAVELLED.
       That single physical rule is what makes autocompletion impossible,
       and it is all that is needed: a tap travels nothing and earns
       nothing; a fast drag travels far and earns the span it crossed.

       ⚠ It replaces a swept-segment test that credited a path point only
       when the segment prev->now passed perpendicular to it. That is
       correct geometry and wrong physics: a finger delivers samples under
       a unit apart and a five-year-old's hand wobbles by more than that,
       so the SEGMENT'S DIRECTION is noise. Measured on a straight
       downstroke with +/-2u of tremor, path points the finger had plainly
       passed failed the test and the ink stalled at 1.9% of the letter.
       Direction cannot be recovered from two adjacent noisy samples; the
       distance between them can. */
    var wasOn = s.onPath && s.last;
    var travel = wasOn ? dist(s.last, pt) : 0;
    /* Re-entry after leaving the path may only resume NEAR where it left,
       or a detour out and back rejoins further along for free. */
    /* ⚠ SLACK MUST BE CLOSE TO 1. At 1.6 the cursor gains 60% on the
       finger every sample, and over a long tail that accumulated enough
       to close the gap left by a detour: a finger that stepped off the
       path and rejoined further along caught up and completed 30 of 97
       strokes. The cursor TRACKS the finger; it does not outrun it. */
    var allow = wasOn ? travel * SLACK + 0.2 : RESUME;
    if (fu.u > s.u) {
      s.u = Math.min(fu.u, s.u + allow);
      while (s.i + 1 < L.pts.length && L.cum[s.i + 1] <= s.u) s.i++;
    }
    s.n++; s.last = pt; s.onPath = true;
    return { on: true, done: reached(s, L), progress: progress(s) };
  }

  /* Arc position of the path point nearest the FINGER, searched forward
     from the cursor. This is the ceiling on progress — see `sample`. */
  function fingerU(L, pt, from, limit, corridor) {
    var best = -1, bd = Infinity, i, d;
    for (i = from; i < L.pts.length; i++) {
      if (L.cum[i] > limit + corridor) break;
      d = dist(L.pts[i], pt);
      if (d < bd) { bd = d; best = i; }
    }
    return { u: best < 0 ? 0 : L.cum[best], d: bd };
  }

  /* ---- pointer up -------------------------------------------------- */
  /* 'stroke-ok' / 'formed' advance the stroke. 'incomplete' does NOT
     reset anything: the cursor and the ink survive so a child who lifts
     to re-grip resumes where they were. The shipped tool threw the
     partial stroke away, which for a four-year-old is the same defect as
     the autocomplete wearing the other face. */
  function endStroke(s) {
    var L = lane(s);
    if (!L) return 'incomplete';
    if (!reached(s, L)) { s.last = null; s.onPath = false; return 'incomplete'; }

    s.idx++; s.strokesDone++;
    s.u = 0; s.i = 0; s.n = 0; s.last = null; s.onPath = false;
    if (s.idx >= s.lanes.length) { s.formed = true; return 'formed'; }
    return 'stroke-ok';
  }

  /* abandon the in-progress stroke entirely (the Undo control) */
  function clearStroke(s) { s.u = 0; s.i = 0; s.n = 0; s.last = null; s.onPath = false; }

  /* widen the corridor after repeated stalls — silently, per the
     no-shame rule. Never narrows. */
  function relax(s) { s.corridor = WIDE; return s.corridor; }

  function isComplete(s) { return !!s.formed; }
  function strokeCount(s) { return s.lanes.length; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL
     core, and each one is a defect this core exists to prevent) ------- */
  function pathAlong(L, fromU, toU, step) {
    var out = [], i;
    for (i = 0; i < L.pts.length; i++)
      if (L.cum[i] >= fromU && L.cum[i] <= toU) out.push({ x: L.pts[i].x, y: L.pts[i].y });
    if (!out.length && L.pts.length) out.push({ x: L.pts[0].x, y: L.pts[0].y });
    return out;
  }
  /* an honest child who traces the whole stroke */
  function oracleSolver(strokes) {
    var s = newTrace(strokes), k, L, p;
    for (k = 0; k < s.lanes.length; k++) {
      L = s.lanes[s.idx];
      p = pathAlong(L, 0, L.total);
      for (var i = 0; i < p.length; i++) sample(s, p[i]);
      endStroke(s);
    }
    return { complete: isComplete(s), strokesDone: s.strokesDone };
  }
  /* a child who stops short by `short` units — MUST NOT complete */
  function shortSolver(strokes, short) {
    var s = newTrace(strokes), L = s.lanes[0];
    if (!L || L.isDot) return { skip: true };
    var p = pathAlong(L, 0, Math.max(0, L.total - short));
    for (var i = 0; i < p.length; i++) sample(s, p[i]);
    return { result: endStroke(s) };
  }
  /* one tap at the midpoint — MUST NOT complete */
  function tapSolver(strokes) {
    var s = newTrace(strokes), L = s.lanes[0];
    if (!L || L.isDot) return { skip: true };
    sample(s, L.pts[Math.floor(L.pts.length / 2)]);
    return { result: endStroke(s) };
  }
  /* tap the start, then tap the end — MUST NOT complete */
  function teleportSolver(strokes) {
    var s = newTrace(strokes), L = s.lanes[0];
    if (!L || L.isDot) return { skip: true };
    sample(s, L.pts[0]);
    sample(s, L.pts[L.pts.length - 1]);
    return { result: endStroke(s) };
  }
  /* trace it backwards — MUST NOT complete */
  function reverseSolver(strokes) {
    var s = newTrace(strokes), L = s.lanes[0];
    if (!L || L.isDot) return { skip: true };
    var p = pathAlong(L, 0, L.total).slice().reverse();
    for (var i = 0; i < p.length; i++) sample(s, p[i]);
    return { result: endStroke(s) };
  }
  /* scribble far from the path — MUST NOT complete */
  function scribbleSolver(strokes) {
    var s = newTrace(strokes);
    var junk = [{ x: 0, y: 0 }, { x: 4, y: 6 }, { x: 1, y: 9 }, { x: 6, y: 2 }];
    for (var i = 0; i < junk.length; i++) sample(s, junk[i]);
    return { result: endStroke(s) };
  }
  /* ⚠ NOT "skip the middle third". I wrote that solver first and it
     reported 100 of 126 strokes cheating — a wrong measurement. Within a
     single pointer-down, a gap in the event stream IS a fast finger, and
     on a straight stroke a sweep from 30% to 70% lies exactly on the
     path: the child really did cross it, and no event model can say
     otherwise. Testing it condemned correct behaviour.
     The real cheat is a detour that LEAVES the path and rejoins further
     along — there the sweep genuinely misses the middle. */
  function detourSolver(strokes) {
    var s = newTrace(strokes), L = s.lanes[0], i;
    if (!L || L.isDot || L.total < 30) return { skip: true };
    var head = pathAlong(L, 0, L.total * 0.25);
    for (i = 0; i < head.length; i++) sample(s, head[i]);
    /* ⚠ Leave PERPENDICULAR to the local tangent. My first version used a
       fixed (+40,-40) offset, which for a stroke running that same
       diagonal is not a detour at all — it is simply further along the
       line. It reported M#2 and r#1 as cheats when the tool was right. */
    var ia = Math.floor(L.pts.length * 0.25), ib = Math.floor(L.pts.length * 0.75);
    var a = L.pts[ia], b = L.pts[ib];
    function away(idx, p) {
      var q = L.pts[Math.min(idx + 1, L.pts.length - 1)];
      var dx = q.x - p.x, dy = q.y - p.y, m = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: p.x - (dy / m) * 40, y: p.y + (dx / m) * 40 };   /* normal */
    }
    /* ⚠ AND VERIFY THE PREMISE. On `m` the arch curves back under itself,
       so a 40-unit normal lands ON a later part of the same stroke — the
       "detour" was a shortcut along the path, and the solver reported a
       correct tool as cheating. If either escape point is not genuinely
       clear of the whole path, this stroke cannot host the test. */
    var oa = away(ia, a), ob = away(ib, b);
    function clear(p) {
      for (var q = 0; q < L.pts.length; q++) if (dist(L.pts[q], p) <= 25) return false;
      return true;
    }
    if (!clear(oa) || !clear(ob)) return { skip: true };
    sample(s, oa);
    sample(s, ob);
    var tail = pathAlong(L, L.total * 0.75, L.total);
    for (i = 0; i < tail.length; i++) sample(s, tail[i]);
    return { result: endStroke(s) };
  }

  /* a straight line from start to end. For a genuinely CURVED stroke the
     chord leaves the corridor and must fail; for a straight stroke the
     chord IS the stroke, so the gate only asks this of curved ones. */
  function chordSolver(strokes) {
    var s = newTrace(strokes), L = s.lanes[0], i, t;
    if (!L || L.isDot) return { skip: true };
    var a = L.pts[0], b = L.pts[L.pts.length - 1];
    var dev = 0;
    for (i = 0; i < L.pts.length; i++) dev = Math.max(dev, segDist(a, b, L.pts[i]));
    if (dev <= 6) return { skip: true };            /* straight: not a cheat */
    var n = Math.max(8, Math.ceil(dist(a, b) / 1.5));
    for (i = 0; i <= n; i++) {
      t = i / n;
      sample(s, { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
    return { result: endStroke(s), dev: dev };
  }
  /* the SECOND stroke attempted first — MUST NOT be accepted */
  function outOfOrderSolver(strokes) {
    if (!strokes || strokes.length < 2) return { skip: true };
    var s = newTrace(strokes), L = s.lanes[1];
    var p = pathAlong(L, 0, L.total);
    for (var i = 0; i < p.length; i++) sample(s, p[i]);
    return { result: endStroke(s), strokesDone: s.strokesDone };
  }

  global.StrokeTraceCore = {
    CORRIDOR: CORRIDOR, WIDE: WIDE, STEP: STEP, SLACK: SLACK, RESUME: RESUME,
    END_SLACK: END_SLACK, DOT_LEN: DOT_LEN, DOT_R: DOT_R,
    flatten: flatten, measure: measure, prepare: prepare,
    newTrace: newTrace, sample: sample, endStroke: endStroke,
    clearStroke: clearStroke, relax: relax,
    startPoint: startPoint, cursorPoint: cursorPoint, progress: progress,
    isComplete: isComplete, strokeCount: strokeCount,
    endSlack: endSlack, minSamples: minSamples,
    SOLVERS: {
      oracleSolver: oracleSolver, shortSolver: shortSolver,
      tapSolver: tapSolver, teleportSolver: teleportSolver,
      reverseSolver: reverseSolver, scribbleSolver: scribbleSolver,
      detourSolver: detourSolver, chordSolver: chordSolver,
      outOfOrderSolver: outOfOrderSolver
    }
  };

}(typeof window !== 'undefined' ? window : this));

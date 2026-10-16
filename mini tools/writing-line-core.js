/* =====================================================================
   writing-line-core.js — the MODEL of "Digby's Number Trace" (K.CC.A.3),
   activity #5 of the one-by-one rebuild (docs/activities-rebuild/005-writing-line.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-writing-line-core.js
   drives it; scripts/mutate-writing-line.js proves the gate bites).

   THE SKILL. K.CC.A.3: write the numerals 0–9. The apparatus is THE FADING
   LINE: three boxes on one writing line — full guide, ghost, blank — so the
   third numeral is the child's own. This core owns the pedagogy: the plan
   of guide levels, the corridor per level, the box the child is on, the
   slip named from the finger's own path (reversed · mirror · direction ·
   short · off), the help that steps the guide back in after stalls, the
   layout. It LOADS two shipped instruments unchanged and never edits them:
     NumberTraceCore  — the ten digit glyphs constructed from arcs and lines,
                        the per-locale barred seven (glyphFor(d, lang));
     StrokeTraceCore  — the live-ink judge: a stroke inks only where the
                        finger has swept it, from its start, contiguously.
   ===================================================================== */
(function (global) {
  'use strict';

  var NT = global.NumberTraceCore, ST = global.StrokeTraceCore;
  if ((!NT || !ST) && typeof require === 'function') {
    try { NT = NT || require('./number-trace-core.js').NumberTraceCore; } catch (e) { /* the gate points at a dir */ }
    try { ST = ST || require('./stroke-trace-core.js').StrokeTraceCore; } catch (e) { /* idem */ }
  }

  var PLANS = { fading: ['full', 'ghost', 'blank'], full: ['full', 'full', 'full'], alone: ['ghost', 'blank', 'blank'] };
  var CORRIDOR = { full: 8, ghost: 12, blank: 16 };     // units of the 100-unit box
  var LEVEL_UP = { blank: 'ghost', ghost: 'full', full: 'full' };
  var HELP_AFTER = 3;                                    // stalls in a box before the guide steps back in
  var LINES = { top: 16, mid: 50, base: 84 };
  var SYM_TOL = 3;                                       // a glyph whose mirror lies within this of itself is symmetric

  function rounds(seed) { var out = []; for (var d = 0; d <= 9; d++) out.push({ digit: d, seed: (seed || 'wl') + ':' + d }); return out; }
  function plan(guide) { return (PLANS[guide] || PLANS.fading).slice(); }
  function glyph(d, lang) { return NT.glyphFor(d, lang); }

  /* ---- geometry on strokes ---- */
  function mirrorStrokes(strokes) { return strokes.map(function (s) { return s.map(function (p) { return { x: Math.round((100 - p.x) * 10) / 10, y: p.y }; }); }); }
  function reverseStroke(s) { return s.slice().reverse(); }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  /* is the glyph its own mirror image (0, 8)? every mirrored point lies within SYM_TOL of the original ink */
  function symmetric(strokes) {
    var orig = [], i, j, k;
    for (i = 0; i < strokes.length; i++) orig = orig.concat(ST.flatten(strokes[i]));
    var mir = mirrorStrokes(strokes);
    for (i = 0; i < mir.length; i++) {
      var f = ST.flatten(mir[i]);
      for (j = 0; j < f.length; j++) {
        var best = Infinity;
        for (k = 0; k < orig.length; k++) { var d = dist(f[j], orig[k]); if (d < best) best = d; }
        if (best > SYM_TOL) return false;
      }
    }
    return true;
  }

  /* ---- state ---- */
  function newState(round, lang, guide) {
    var strokes = glyph(round.digit, lang), levels = plan(guide), cells = [];
    for (var i = 0; i < 3; i++) cells.push(newCell(strokes, levels[i]));
    return { digit: round.digit, lang: lang, seed: round.seed, guide: PLANS[guide] ? guide : 'fading', strokes: strokes, symmetric: symmetric(strokes), cells: cells, at: 0, done: false };
  }
  function newCell(strokes, level) {
    return { level: level, shown: level, trace: ST.newTrace(strokes, { corridor: CORRIDOR[level] }), ink: [], live: [], raw: [], fails: 0, formed: false, helped: 0 };
  }
  function activeCell(st) { return st.cells[st.at] || null; }
  function strokeIndex(st) { var c = activeCell(st); return c ? c.trace.idx : -1; }

  /* a pointer sample on the active box: the judge says whether it inks */
  function sample(st, pt) {
    var c = activeCell(st);
    if (!c || st.done || c.formed) return { on: false, done: false, progress: 0 };
    c.raw.push(pt);
    var r = ST.sample(c.trace, pt);
    if (r.on) c.live.push(pt);
    return r;
  }
  /* the pointer lifts: 'stroke-ok' | 'formed' (the box) | 'incomplete' (+ the slip named) */
  function endStroke(st) {
    var c = activeCell(st);
    if (!c || st.done || c.formed) return { result: 'none' };
    var idx = c.trace.idx, progressBefore = ST.progress(c.trace);
    var res = ST.endStroke(c.trace);
    if (res === 'stroke-ok' || res === 'formed') {
      c.ink.push(c.live.slice()); c.live = []; c.raw = [];
      if (res === 'formed') { c.formed = true; st.at++; if (st.at >= 3) { st.done = true; return { result: 'formed', box: st.at - 1, round: true }; } return { result: 'formed', box: st.at - 1, round: false }; }
      return { result: 'stroke-ok', stroke: idx };
    }
    /* a stall: name it from the finger's own path, then maybe help */
    var slip = classify(st.strokes, idx, c.raw, c.trace.corridor, progressBefore, st.symmetric);
    /* a genuine lift mid-stroke keeps its ink and its cursor (the child re-grips and goes on);
       a named slip does not — the little that a backwards or flipped finger earned near the
       start is not the child's stroke, so the stroke starts again clean */
    if (slip !== 'short') { ST.clearStroke(c.trace); c.live = []; }
    c.fails++; c.raw = [];
    var helped = false;
    if (c.fails % HELP_AFTER === 0 && LEVEL_UP[c.shown] !== c.shown) { c.shown = LEVEL_UP[c.shown]; c.helped++; helped = true; }
    return { result: 'incomplete', slip: slip, helped: helped, shown: c.shown };
  }
  /* replay a raw path against a stroke set: does it complete stroke 0? */
  function completes(strokes, raw, corridor) {
    if (!raw || raw.length < 2) return false;
    var t = ST.newTrace(strokes, { corridor: corridor });
    for (var i = 0; i < raw.length; i++) ST.sample(t, raw[i]);
    var r = ST.endStroke(t);
    return r === 'stroke-ok' || r === 'formed';
  }
  /* 'direction' (a symmetric glyph the wrong way round) · 'reversed' (the stroke backwards) ·
     'mirror' (the mirrored numeral) · 'short' (half way or more) · 'off' */
  function classify(strokes, idx, raw, corridor, progress, isSymmetric) {
    var s = strokes[idx]; if (!s) return 'off';
    var m = mirrorStrokes(strokes)[idx];
    /* a symmetric glyph's reversed path IS its mirror (a 0 or 8 drawn clockwise): the honest
       name is the direction, so the mirror is asked first there */
    if (isSymmetric && completes([m], raw, corridor)) return 'direction';
    if (completes([reverseStroke(s)], raw, corridor)) return 'reversed';
    if (!isSymmetric && completes([m], raw, corridor)) return 'mirror';
    /* a whole mirrored or reversed shape is the stronger evidence, so it is asked first — the
       wide blank-box corridor can let a flipped 4 earn half its real stroke on the way */
    if (progress >= 0.5) return 'short';
    return 'off';
  }
  /* Rub out: the active box starts again (its guide level and stalls are kept) */
  function rubOut(st) {
    var c = activeCell(st);
    if (!c || c.formed) return false;
    c.trace = ST.newTrace(st.strokes, { corridor: CORRIDOR[c.level] });
    c.ink = []; c.live = []; c.raw = [];
    return true;
  }
  function verdict(st) { return st.done ? 'done' : 'unfinished'; }
  function boxesDone(st) { return st.cells.filter(function (c) { return c.formed; }).length; }
  /* the walker's route over the active box's remaining strokes (dense points) */
  function demoRoute(st) {
    var c = activeCell(st); if (!c) return [];
    var out = [];
    for (var i = c.trace.idx; i < st.strokes.length; i++) out.push(ST.flatten(st.strokes[i], 1.2));
    return out;
  }

  /* ---- layout: three boxes in a row from 480 px; one big box below ---- */
  function layout(W) {
    var gap = 12;
    if (W >= 480) { var cell = Math.min(220, Math.floor((W - 2 * gap) / 3)); return { mode: 'row', cell: cell, gap: gap, thumb: 0 }; }
    var one = Math.min(320, Math.round(W * 0.82));
    return { mode: 'single', cell: one, gap: gap, thumb: 44 };
  }

  var api = {
    PLANS: PLANS, CORRIDOR: CORRIDOR, HELP_AFTER: HELP_AFTER, LINES: LINES, SYM_TOL: SYM_TOL,
    rounds: rounds, plan: plan, glyph: glyph, mirrorStrokes: mirrorStrokes, reverseStroke: reverseStroke, symmetric: symmetric,
    newState: newState, activeCell: activeCell, strokeIndex: strokeIndex, sample: sample, endStroke: endStroke,
    classify: classify, completes: completes, rubOut: rubOut, verdict: verdict, boxesDone: boxesDone, demoRoute: demoRoute, layout: layout,
    deps: function () { return { NT: NT, ST: ST }; }
  };
  global.WritingLineCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));

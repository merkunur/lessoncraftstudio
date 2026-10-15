/* =====================================================================
   egg-cartons-core.js — the MODEL of "Count by tens" (K.CC.A.1), activity
   #2 of the one-by-one rebuild (docs/activities-rebuild/002-egg-cartons.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-egg-cartons-core.js
   drives it exhaustively; scripts/mutate-egg-cartons.js proves the gate bites).

   THE SKILL. K.CC.A.1: count to 100 by tens. A carton IS ten. Two kinds of
   round on one shelf:
     count — k cartons stand on the shelf; the child TAGS each once and the
             tag is the RUNNING TOTAL (10, 20, 30…); the last tag is the
             answer, which the child names on a 10…100 rail. The verdict
             names the slip: 'untagged' / 'noAnswer' / 'ones' (answered k,
             the by-ones miscount) / 'wrong' / 'ok'.
     pack  — the shelf starts empty; the child ADDS cartons until the last
             one says the target (20…100); verdict 'short' / 'over' / 'ok'.
   LAYOUT is part of the model: cartons in rows of five (fifty and a hundred
   are visible), four on a phone; the carton is the tap target (≥ 44 px tall).
   ===================================================================== */
(function (global) {
  'use strict';

  var ASPECT = 72 / 120;                 // carton height ÷ width (the SVG viewBox)

  function caps(W) {
    var gap = W < 400 ? 6 : 10, pad = W < 400 ? 8 : 14, minW = 60;
    /* five across on a wide mat (fifty is visible), fewer where five cartons
       of the floor width will not fit — the carton is the tap target */
    var fit = Math.floor((W - 2 * pad + gap) / (minW + gap));
    var cols = Math.max(1, Math.min(W >= 520 ? 5 : 4, fit));
    return { cols: cols, gap: gap, pad: pad, maxW: 150, minW: minW };
  }

  /* layout(k, W) → { w, h, rows, cols, points:[{x,y}], fits } — cartons row-major,
     the last row centred. */
  function layout(k, W) {
    var c = caps(W), fits = true;
    var cols = Math.min(c.cols, Math.max(1, k));
    var w = Math.min(c.maxW, Math.floor((W - 2 * c.pad - (cols - 1) * c.gap) / cols));
    if (w < c.minW) { w = c.minW; fits = false; }
    var h = Math.round(w * ASPECT);
    if (h < 44) { h = 44; }
    var rows = k === 0 ? 1 : Math.ceil(k / cols);
    var pts = [];
    for (var i = 0; i < k; i++) {
      var r = Math.floor(i / cols), col = i % cols;
      var inRow = Math.min(cols, k - r * cols);
      var rowW = inRow * w + (inRow - 1) * c.gap;
      var x0 = Math.round((W - rowW) / 2);
      pts.push({ x: x0 + col * (w + c.gap), y: c.pad + r * (h + c.gap) });
    }
    var H = c.pad * 2 + rows * h + (rows - 1) * c.gap;
    if (k === 0) H = c.pad * 2 + h;
    return { w: w, h: h, rows: rows, cols: cols, points: pts, height: H, fits: fits };
  }

  /* ---- rounds ---- */
  function rounds(maxTens, kind, seed) {
    var out = [];
    if (kind !== 'pack') for (var k = 2; k <= maxTens; k++) out.push({ kind: 'count', tens: k, seed: (seed || 'ec') + ':c' + k });
    if (kind !== 'count') for (var t = 2; t <= maxTens; t++) out.push({ kind: 'pack', tens: t, seed: (seed || 'ec') + ':p' + t });
    return out;
  }

  /* ---- state ---- */
  function newState(round) {
    return { kind: round.kind, tens: round.tens, seed: round.seed, tags: [], packed: 0, answer: null };
  }
  function tag(st, i) {
    if (!st || st.kind !== 'count' || i < 0 || i >= st.tens) return { ok: false, k: st ? st.tags.length : 0, reason: 'range' };
    if (st.tags.indexOf(i) >= 0) return { ok: false, k: st.tags.length, reason: 'again' };
    st.tags.push(i);
    return { ok: true, k: st.tags.length, total: 10 * st.tags.length };
  }
  function untagAll(st) { st.tags = []; st.answer = null; }
  function allTagged(st) { return st.kind === 'count' && st.tags.length === st.tens; }
  function lastTagged(st) { return st.tags.length ? st.tags[st.tags.length - 1] : -1; }
  function untagged(st) { var o = []; for (var i = 0; i < st.tens; i++) if (st.tags.indexOf(i) < 0) o.push(i); return o; }
  function setAnswer(st, v) { st.answer = (v === null || v === undefined) ? null : Number(v); }
  function add(st) { if (st.kind !== 'pack' || st.packed >= 10) return false; st.packed++; return true; }
  function remove(st) { if (st.kind !== 'pack' || st.packed <= 0) return false; st.packed--; return true; }
  function target(st) { return 10 * st.tens; }
  /* the label a carton wears: its running total in the order it was counted
     (count) or placed (pack) */
  function labelOf(st, i) {
    if (st.kind === 'pack') return i < st.packed ? 10 * (i + 1) : null;
    var k = st.tags.indexOf(i);
    return k >= 0 ? 10 * (k + 1) : null;
  }
  /* verdict: count → 'untagged' | 'noAnswer' | 'ones' | 'wrong' | 'ok'
              pack  → 'short' | 'over' | 'ok' */
  function verdict(st) {
    if (st.kind === 'pack') {
      if (st.packed < st.tens) return 'short';
      if (st.packed > st.tens) return 'over';
      return 'ok';
    }
    if (!allTagged(st)) return 'untagged';
    if (st.answer === null || !isFinite(st.answer)) return 'noAnswer';
    if (st.answer === target(st)) return 'ok';
    /* the by-ones slip, in the two forms the rail can show: the carton count
       itself (k = 10 → '10') or the stamp on one carton ('10' for any shelf
       of more than one) */
    if (st.answer === st.tens || (st.answer === 10 && st.tens > 1)) return 'ones';
    return 'wrong';
  }

  var api = {
    ASPECT: ASPECT, caps: caps, layout: layout, rounds: rounds, newState: newState,
    tag: tag, untagAll: untagAll, allTagged: allTagged, lastTagged: lastTagged, untagged: untagged,
    setAnswer: setAnswer, add: add, remove: remove, target: target, labelOf: labelOf, verdict: verdict
  };
  global.EggCartonsCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));

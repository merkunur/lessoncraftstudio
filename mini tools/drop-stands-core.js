/* =====================================================================
   drop-stands-core.js — the model behind ACTIVITY #34 of the one-by-one
   rebuild: "Comparing Length" (K.MD.A.2) — THE DROP-DOWN STANDS.
   Design sheet: docs/activities-rebuild/designs/034-choice-board.md
   ---------------------------------------------------------------------
   Pure UMD, Node-loadable, no DOM. Things stand on stands of different
   heights (or lie on rails, some way from the start wall), so their tops
   (or far ends) lie. The truth of a round is derived from the SIZES only;
   the stands and offsets are the lure. Check folds every stand / slides
   everything to the wall and a level beam comes to rest on the true
   tallest top or longest end. Every picture is placed by its measured INK
   box (alpha > 40, 256-px contained render), so its bottom sits exactly on
   the plate or floor and its left end exactly at the wall.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DropStandsCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------- the pictures: theme dir, the turn that stands or lays them, the ink box at that turn ---------------- */
  var OBJ = {
    coconut:    { dir: 'tree',          rot: 0,     box: [-98, -121, 94, 124] },
    candle:     { dir: 'christmas',     rot: 0,     box: [-41, -121, 42, 124] },
    crayon:     { dir: 'classroom',     rot: 0,     box: [-32, -122, 26, 124] },
    corn:       { dir: 'vegetables',    rot: 0,     box: [-70, -121, 69, 124] },
    giraffe:    { dir: 'zoo animals',   rot: 0,     box: [-69, -122, 63, 126] },
    lighthouse: { dir: 'beach',         rot: 0,     box: [-52, -120, 46, 124] },
    sunflower:  { dir: 'flowers',       rot: 0,     box: [-88, -120, 85, 124] },
    ladder:     { dir: 'tools',         rot: 0,     box: [-48, -122, 46, 126] },
    bottle:     { dir: 'kitchen tools', rot: 0,     box: [-49, -122, 52, 123] },
    pencil:     { dir: 'classroom',     rot: 44.7,  box: [-170, -28, 148, 32] },
    ruler:      { dir: 'classroom',     rot: 44.4,  box: [-148, -30, 149, 31] },
    marker:     { dir: 'classroom',     rot: 50,    box: [-161, -45, 142, 41] },
    carrot:     { dir: 'vegetables',    rot: 48.2,  box: [-167, -39, 144, 49] },
    cucumber:   { dir: 'vegetables',    rot: 32.2,  box: [-139, -27, 145, 48] },
    baguette:   { dir: 'bakery',        rot: -16.7, box: [-127, -27, 129, 29] },
    circle:     { shape: 'circle', box: [-128, -128, 128, 128] },
    square:     { shape: 'square', box: [-128, -128, 128, 128] }
  };
  /* which questions are about height (stands, floor) and which about length (rails, wall) */
  var MODE = { taller: 'height', shorterH: 'height', tallest: 'height', shortestH: 'height', biggest: 'height', longer: 'length', shorterL: 'length', longest: 'length', shortestL: 'length' };
  var SHORT = { shorterH: 1, shorterL: 1, shortestH: 1, shortestL: 1 };
  var ROWQ = { tallest: 1, longest: 1, shortestH: 1, shortestL: 1, biggest: 1 };

  /* ---------------- the rounds (design §6): sizes, and the stand heights / offsets in px at the 704 page ---------------- */
  /* review: the stand height alone gave the answer (right = lower stand for taller/longer, higher for shorter,
     in every staged pair). P2, P6, P9, P11 and R1, R3, R4, R6 put the right one on the 'wrong' stand; lures kept. */
  var PAIRS = [
    { id: 'P1',  noun: 'coconut',    q: 'taller',   sizes: [1.00, 0.78], lift: [0, 80] },
    { id: 'P2',  noun: 'pencil',     q: 'longer',   sizes: [0.80, 1.00], lift: [0, 40] },
    { id: 'P3',  noun: 'candle',     q: 'shorterH', sizes: [1.00, 0.74], lift: [0, 120] },
    { id: 'P4',  noun: 'carrot',     q: 'longer',   sizes: [1.00, 0.82], lift: [0, 110] },
    { id: 'P5',  noun: 'giraffe',    q: 'taller',   sizes: [0.80, 1.00], lift: [120, 0] },
    { id: 'P6',  noun: 'crayon',     q: 'shorterH', sizes: [0.70, 1.00], lift: [0, 40] },
    { id: 'P7',  noun: 'lighthouse', q: 'taller',   sizes: [1.00, 0.84], lift: [0, 80] },
    { id: 'P8',  noun: 'ruler',      q: 'longer',   sizes: [0.82, 1.00], lift: [110, 0] },
    { id: 'P9',  noun: 'marker',     q: 'shorterL', sizes: [1.00, 0.76], lift: [40, 0] },
    { id: 'P10', noun: 'sunflower',  q: 'taller',   sizes: [0.82, 1.00], lift: [120, 40] },
    { id: 'P11', noun: 'cucumber',   q: 'longer',   sizes: [1.00, 0.80], lift: [40, 0] },
    { id: 'P12', noun: 'corn',       q: 'shorterH', sizes: [0.72, 1.00], lift: [120, 40] }   /* mirrored from the design table: its own tally was 5 left / 7 right, not 6 / 6 */
  ];
  /* R3, R5, R9 re-placed from the design table: the design balanced the answer slots only for the unmirrored
     pass; reversed on alternate passes, slot 1 answered 5 of 9. Re-placed so BOTH orientations stay ≤ 3 of 9,
     every lure kept (the naive judge is still right in only R2 and R5). */
  var ROWS = [
    { id: 'R1', noun: 'giraffe',    q: 'tallest',   sizes: [0.66, 1.00, 0.82],       lift: [0, 40, 120] },
    { id: 'R2', noun: 'pencil',     q: 'longest',   sizes: [0.82, 0.56, 0.68, 1.00], lift: [0, 110, 60, 30] },
    { id: 'R3', noun: 'lighthouse', q: 'shortestH', sizes: [1.00, 0.82, 0.56, 0.68], lift: [0, 40, 100, 120] },
    { id: 'R4', noun: 'circle',     q: 'biggest',   sizes: [0.68, 0.82, 0.56, 1.00], lift: [120, 0, 80, 30] },
    { id: 'R5', noun: 'carrot',     q: 'shortestL', sizes: [0.66, 1.00, 0.82],       lift: [0, 0, 60] },
    { id: 'R6', noun: 'ladder',     q: 'tallest',   sizes: [1.00, 0.82, 0.56, 0.68], lift: [20, 0, 120, 80] },
    { id: 'R7', noun: 'square',     q: 'biggest',   sizes: [0.56, 1.00, 0.68, 0.82], lift: [120, 0, 80, 40] },
    { id: 'R8', noun: 'baguette',   q: 'longest',   sizes: [0.68, 0.82, 1.00],       lift: [60, 110, 0] },
    { id: 'R9', noun: 'bottle',     q: 'shortestH', sizes: [0.82, 0.66, 1.00],       lift: [0, 120, 40] }
  ];

  function compare(v) { return v === 'row' ? 'row' : 'two'; }
  function start(v) { return v === 'floor' ? 'floor' : 'stands'; }
  function rounds(cmp) { return (compare(cmp) === 'row' ? ROWS : PAIRS).map(function (r, i) { var o = {}; for (var k in r) o[k] = r[k]; o.i = i; return o; }); }
  function mode(r) { return MODE[r.q]; }
  function isShort(q) { return !!SHORT[q]; }
  function isRow(q) { return !!ROWQ[q]; }
  /* the sizes / lifts as they stand this pass (mirrored on odd passes) */
  function arrange(r, mirror) { var s = r.sizes.slice(), l = r.lift.slice(); if (mirror) { s.reverse(); l.reverse(); } return { sizes: s, lift: l }; }
  /* the right slot, from the sizes alone — never a stored index */
  function answer(sizes, q) {
    var best = 0;
    for (var i = 1; i < sizes.length; i++) if (isShort(q) ? sizes[i] < sizes[best] : sizes[i] > sizes[best]) best = i;
    return best;
  }
  /* order-only reshuffle: never the previous order; never the same right SIDE three times running (two) */
  function order(pool, rnd, prev, pass) {
    var n = pool.length, a;
    for (var t = 0; t < 400; t++) {
      a = pool.map(function (_, i) { return i; });
      for (var i = n - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;
      if (!runOk(pool, a, pass || 0)) continue;
      return a;
    }
    return a;
  }
  function sideOf(r, mirror) { var g = arrange(r, mirror), k = answer(g.sizes, r.q); return g.sizes.length === 2 ? k : (k < g.sizes.length / 2 ? 0 : 1); }
  function runOk(pool, a, pass) {
    var last = -1, run = 0, m = pass % 2 === 1;
    for (var k = 0; k < a.length; k++) { var s = sideOf(pool[a[k]], m); if (s === last) { run++; if (run >= 3) return false; } else { last = s; run = 1; } }
    return true;
  }

  /* ---------------- a round's state ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var g = arrange(r, !!opts.mirror), flat = start(opts.start) === 'floor';
    return {
      round: r.id, noun: r.noun, q: r.q, mode: mode(r), mirror: !!opts.mirror, flat: flat,
      items: g.sizes.map(function (s, i) { return { size: s, lift: flat ? 0 : g.lift[i], down: flat }; }),
      choice: null, revealed: false, misses: 0, help: 0, halo: false, done: false, last: null
    };
  }
  function right(st) { return answer(st.items.map(function (it) { return it.size; }), st.q); }
  /* bring one down to the floor / to the wall, or put it back up / out */
  function align(st, i) { var it = st.items[i]; if (!it || it.down) return false; it.down = true; return true; }
  function unalign(st, i) { var it = st.items[i]; if (!it || !it.down || st.flat || !it.lift) return false; if (st.revealed && !st.done) return false; it.down = false; return true; }
  function liftOf(it) { return it.down ? 0 : it.lift; }
  function choose(st, i) {
    if (st.done || i < 0 || i >= st.items.length) return null;
    st.choice = i; st.halo = false; st.last = { result: 'chose', i: i };
    return st.last;
  }
  /* Check: everything comes down / to the wall, the beam rests on the true extreme, the choice is judged */
  function check(st) {
    if (st.done) return { result: 'done' };
    if (st.choice == null) { st.last = { result: 'empty' }; return st.last; }
    st.items.forEach(function (it) { it.down = true; });
    st.revealed = true;
    if (st.choice === right(st)) { st.done = true; st.halo = false; st.last = { result: 'ok' }; return st.last; }
    st.misses++; st.help++; st.halo = st.help >= 2;
    st.last = { result: 'wrong', i: st.choice };
    return st.last;
  }
  /* after a right call the stands spring back up (free play) */
  function relift(st) { if (!st.done || st.flat) return; st.items.forEach(function (it) { it.down = false; }); st.revealed = false; }
  function glow(st) { return !st.done && st.halo ? right(st) : null; }
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.result === 'empty') return { key: 'tap' + cap(st.q) };
    if (L.result === 'wrong') return { key: st.help >= 2 ? (isShort(st.q) ? 'haloFar' : 'haloReach') : (st.mode === 'length' ? 'missWall' : 'missFloor'), wrong: true };
    return null;
  }
  function success(st) {
    if (!st.done) return null;
    return { key: 'ok' + cap(st.q) };
  }
  function cap(q) { return q.charAt(0).toUpperCase() + q.slice(1); }

  /* ---------------- geometry (px; the 704 page is the reference) ---------------- */
  /* wide ≥ 560: the design's 704 numbers, shrunk only if the stage is narrower than 660;
     narrow: the design's phone numbers (at a 336-px stage), scaled with the stage */
  function layout(W) {
    var wide = W >= 560, k = wide ? Math.min(W, 660) / 660 : W / 336;
    return wide
      ? { mode: 'wide', W: W, k: k, HM2: 220 * k, HMR: 200 * k, HMS: 140 * k, standK: k, col2: 230 * k, colR: 150 * k, rail: 600 * k, LM: 520 * k, offK: k, wallW: 12 * k, plate: 120 * k }
      : { mode: 'narrow', W: W, k: k, HM2: 150 * k, HMR: 140 * k, HMS: 78 * k, standK: 0.65 * k, col2: 160 * k, colR: 82 * k, rail: (W - 16), LM: (W - 16 - 24 * k) * 520 / 600, offK: (W - 16 - 24 * k) / 600, wallW: 10 * k, plate: 74 * k };   /* lengths scale with the rail LESS the wall and the beam, so the longest end + beam always fit */
  }
  /* how tall/long each thing is on screen, and where its top/end lies as it stands now */
  function inkScale(st, L) {
    var o = OBJ[st.noun], two = st.items.length === 2;
    if (st.mode === 'length') return L.LM / (o.box[2] - o.box[0]);
    var HM = o.shape ? L.HMS : two ? L.HM2 : L.HMR;
    return HM / (o.box[3] - o.box[1]);
  }
  function extent(st, L, i) {           /* the measured extent (ink height or length) of item i */
    var o = OBJ[st.noun], k = inkScale(st, L) * st.items[i].size;
    return st.mode === 'length' ? (o.box[2] - o.box[0]) * k : (o.box[3] - o.box[1]) * k;
  }
  function reach(st, L, i) {            /* where its top / far end is, from the floor / the wall, as it stands */
    var off = liftOf(st.items[i]) * (st.mode === 'length' ? L.offK : L.standK);
    return off + extent(st, L, i);
  }
  function thick(st, L, i) {            /* a lying thing's thickness across its rail */
    var o = OBJ[st.noun], k = inkScale(st, L) * st.items[i].size;
    return (o.box[3] - o.box[1]) * k;
  }
  /* the beam rests on the greatest extent (all aligned); each item's gap to it */
  function reveal(st, L) {
    var ext = st.items.map(function (_, i) { return extent(st, L, i); }), beam = Math.max.apply(null, ext);
    return { beam: beam, at: ext.indexOf(beam), gaps: ext.map(function (e) { return beam - e; }) };
  }
  /* the naive judge: answer by the tops / ends as they stand now (the lure) */
  function naive(st, L) {
    var r = st.items.map(function (_, i) { return reach(st, L, i); }), best = 0;
    for (var i = 1; i < r.length; i++) if (isShort(st.q) ? r[i] < r[best] : r[i] > r[best]) best = i;
    return best;
  }
  /* the stage: its height (px) for this round */
  function stageH(st, L) {
    if (st.mode === 'length') {
      var t = 0; st.items.forEach(function (_, i) { t = Math.max(t, thick(st, L, i)); });
      return st.items.length * (t + 18 * L.k) + 10 * L.k;
    }
    var m = 0; st.items.forEach(function (it, i) { m = Math.max(m, it.lift * L.standK + extent(st, L, i)); });
    return m + 34 * L.k;
  }

  return {
    OBJ: OBJ, MODE: MODE, PAIRS: PAIRS, ROWS: ROWS,
    compare: compare, start: start, rounds: rounds, mode: mode, isShort: isShort, isRow: isRow, arrange: arrange, answer: answer, order: order, sideOf: sideOf,
    newState: newState, right: right, align: align, unalign: unalign, liftOf: liftOf, choose: choose, check: check, relift: relift, glow: glow, hint: hint, success: success, cap: cap,
    layout: layout, inkScale: inkScale, extent: extent, reach: reach, thick: thick, reveal: reveal, naive: naive, stageH: stageH
  };
});

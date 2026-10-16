/* =====================================================================
   constellation-core.js — the MODEL of "Count the Stars Awake" (K.CC.A.2),
   activity #4 of the one-by-one rebuild (docs/activities-rebuild/004-constellation.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-constellation-core.js
   drives it exhaustively; scripts/mutate-constellation.js proves the gate bites).

   THE SKILL. K.CC.A.2: count forward from a given number — instead of
   starting at 1. The apparatus is THE CONSTELLATION THREAD: a night sky of
   numbered stars; one is awake (the start, never 1); the child taps the star
   that comes next and a thread runs to it, star by star, until the thread has
   drawn a picture (a kite, a cup, a staircase …). Stars numbered BELOW the
   start sleep in the same sky (1 is always there) — tapping one is the slip
   the standard names ('back'); a star too far ahead is 'skip'. A tap is
   'next' | 'done' | 'same' | 'back' | 'skip' | 'none'. LAYOUT is part of the
   model: every star ≥ 44 px, centres ≥ 1.12 × a star apart at every width,
   extra stars placed deterministically from the round's seed as LURES near
   the path so nearness never gives the answer.
   ===================================================================== */
(function (global) {
  'use strict';

  var DMIN = 0.22;           // minimum centre distance in the unit square
  var PAD = 10;              // inner frame of the sky panel, px

  /* ---- the pictures: point lists in the unit square (x right, y down), in
     counting order; `close` = segments drawn when the picture completes ---- */
  var SHAPES = {
    mountains: { pts: [[0.05, 0.85], [0.27, 0.2], [0.5, 0.62], [0.73, 0.15], [0.95, 0.85]], close: [] },
    star:      { pts: [[0.5, 0.05], [0.765, 0.864], [0.072, 0.36], [0.928, 0.36], [0.235, 0.864]], close: [[4, 0]] },
    house:     { pts: [[0.15, 0.9], [0.15, 0.45], [0.5, 0.1], [0.85, 0.45], [0.85, 0.9]], close: [[4, 0]] },
    fish:      { pts: [[0.05, 0.5], [0.4, 0.15], [0.92, 0.12], [0.92, 0.88], [0.4, 0.85]], close: [[4, 0]] },
    cup:       { pts: [[0.12, 0.2], [0.22, 0.85], [0.66, 0.85], [0.76, 0.2], [0.95, 0.52]], close: [[4, 2], [3, 0]] },
    kite:      { pts: [[0.5, 0.62], [0.18, 0.32], [0.5, 0.05], [0.82, 0.32], [0.3, 0.82], [0.6, 0.95]], close: [[3, 0]] },
    boat:      { pts: [[0.06, 0.6], [0.22, 0.88], [0.78, 0.88], [0.94, 0.6], [0.72, 0.42], [0.42, 0.05]], close: [[3, 0], [5, 3]] },
    bolt:      { pts: [[0.66, 0.04], [0.34, 0.36], [0.6, 0.4], [0.3, 0.72], [0.56, 0.74], [0.4, 0.98]], close: [] },
    saucepan:  { pts: [[0.06, 0.36], [0.3, 0.33], [0.54, 0.3], [0.5, 0.72], [0.9, 0.74], [0.92, 0.3], [0.72, 0.08]], close: [[5, 2], [6, 2]] },
    crown:     { pts: [[0.1, 0.88], [0.1, 0.22], [0.3, 0.5], [0.5, 0.08], [0.7, 0.5], [0.9, 0.22], [0.9, 0.88]], close: [[6, 0]] },
    umbrella:  { pts: [[0.56, 0.96], [0.5, 0.62], [0.94, 0.5], [0.78, 0.2], [0.5, 0.06], [0.22, 0.2], [0.06, 0.5]], close: [[6, 1]] },
    wave:      { pts: [[0.05, 0.3], [0.2, 0.74], [0.35, 0.26], [0.5, 0.72], [0.65, 0.28], [0.8, 0.74], [0.95, 0.3]], close: [] },
    stairs:    { pts: [[0.06, 0.94], [0.32, 0.94], [0.32, 0.68], [0.58, 0.68], [0.58, 0.42], [0.84, 0.42], [0.84, 0.16]], close: [] }
  };

  /* ---- the pools: (start, picture); the run is start … start + points − 1 ---- */
  var ROUNDS = {
    10: [[2, 'mountains'], [3, 'star'], [4, 'house'], [5, 'fish'], [6, 'cup'], [3, 'kite'], [4, 'boat'], [5, 'bolt'], [3, 'crown']],
    20: [[7, 'saucepan'], [8, 'umbrella'], [9, 'wave'], [10, 'stairs'], [11, 'kite'], [12, 'crown'], [13, 'boat'], [14, 'house'], [15, 'star'], [16, 'cup']]
  };

  function rounds(range, seed) {
    var N = Number(range) === 20 ? 20 : 10, out = [];
    for (var i = 0; i < ROUNDS[N].length; i++) {
      var r = ROUNDS[N][i], pts = SHAPES[r[1]].pts.length;
      out.push({ start: r[0], end: r[0] + pts - 1, shape: r[1], N: N, seed: (seed || 'sky') + ':' + N + ':' + r[1] + ':' + r[0] });
    }
    return out;
  }

  /* ---- a small deterministic PRNG (FNV-1a hash → mulberry32) ---- */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = hash(String(seed)); return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---- the extra numerals, in priority: 1 → start−1 → every numeral ABOVE
     the end, ascending (these can fool a "nearest bigger number" guess) → the
     rest below the start, descending (the start-over stars) ---- */
  function extraNumerals(start, end, N, D) {
    var out = [], v;
    function take(x) { if (x >= 1 && x <= N && out.indexOf(x) < 0 && out.length < D) out.push(x); }
    if (start > 1) take(1);
    take(start - 1);
    for (v = end + 1; v <= N; v++) take(v);
    for (v = start - 2; v >= 2; v--) take(v);
    return out;
  }
  function extraCount(shape, start, end, N) {
    var pts = SHAPES[shape].pts.length, L = pts - 1;
    var avail = (start - 1) + (N - end);
    return Math.max(0, Math.min(L + 1, 13 - pts, avail));
  }

  function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }

  /* the two guessers the sky must defeat, on the stars placed so far:
       A — "the nearest sleeping star" (reads no numerals)
       B — "the nearest star with a bigger number" (knows forward, not next)
     firstGuessableStep returns the first step a guesser still gets right, −1 if none.
     placed[] entries: { p, order } — order = index on the path, or the numeral
     class of an extra: 'above' (counts for A and B) / 'below' (counts for A). */
  function firstGuessableStep(pts, placed, mode) {
    var L = pts.length - 1;
    for (var i = 0; i < L; i++) {
      var best = -1, bestD = Infinity;
      for (var k = 0; k < placed.length; k++) {
        var o = placed[k].order;
        if (typeof o === 'number') { if (o <= i) continue; }           // lit or behind
        else if (mode === 'B' && o !== 'above') continue;               // a smaller numeral is no candidate for B
        var d = dist(pts[i], placed[k].p);
        if (d < bestD) { bestD = d; best = typeof o === 'number' ? o : -2; }
      }
      if (best === i + 1) return i;
    }
    return -1;
  }
  /* place the extra stars (numerals in priority order): each ≥ DMIN from every
     star already placed and set as a LURE — nearer to the star the child stands
     on than the right next star is — at the first step the guesser it can fool
     still gets right; when no step is guessable the lure cycles the path.
     Deterministic from the seed; null when the sky is too crowded. */
  function placeExtras(shape, nums, end, seed) {
    var pts = SHAPES[shape].pts, out = [], L = pts.length - 1, placed = [];
    for (var j = 0; j < pts.length; j++) placed.push({ p: pts[j], order: j });
    var rand = rng(seed);
    for (var i = 0; i < nums.length; i++) {
      var cls = nums[i] > end ? 'above' : 'below';
      var step = cls === 'above' ? firstGuessableStep(pts, placed, 'B') : -1;
      if (step < 0) step = firstGuessableStep(pts, placed, 'A');
      var li = step >= 0 ? step : (i % L), lure = pts[li], nextD = dist(lure, pts[li + 1]);
      var best = null, bestD = Infinity, bestIn = false, valid = 0, tries = 0;
      while (tries < 900 && valid < 90) {
        tries++;
        var c = [rand(), rand()], ok = true;
        for (var k = 0; k < placed.length; k++) if (dist(c, placed[k].p) < DMIN) { ok = false; break; }
        if (!ok) continue;
        valid++;
        var d = dist(c, lure), inside = d < nextD;
        if ((inside && !bestIn) || (inside === bestIn && d < bestD)) { bestD = d; best = c; bestIn = inside; }
      }
      if (!best) return null;
      placed.push({ p: best, order: cls }); out.push(best);
    }
    return out;
  }

  /* ---- state ---- */
  function newState(round, sky) {
    var st = { start: round.start, end: round.end, N: round.N, shape: round.shape, seed: round.seed, cur: round.start, lit: [round.start], done: false, stars: [], placed: true };
    var pts = SHAPES[round.shape].pts, i;
    for (i = 0; i < pts.length; i++) st.stars.push({ v: round.start + i, kind: 'path', u: pts[i][0], w: pts[i][1] });
    if (sky !== 'clear') {
      var D = extraCount(round.shape, round.start, round.end, round.N);
      var nums = extraNumerals(round.start, round.end, round.N, D), pos = null;
      for (var attempt = 0; attempt < 24 && !pos; attempt++) pos = placeExtras(round.shape, nums, round.end, round.seed + ':x' + attempt);
      if (!pos) { st.placed = false; pos = []; nums = []; }
      for (i = 0; i < pos.length; i++) st.stars.push({ v: nums[i], kind: 'extra', u: pos[i][0], w: pos[i][1] });
    }
    return st;
  }
  function star(st, v) { for (var i = 0; i < st.stars.length; i++) if (st.stars[i].v === v) return st.stars[i]; return null; }
  function isLit(st, v) { return st.lit.indexOf(v) >= 0; }
  /* tap(st, v): the verdict of touching star v
       'next' — v is cur+1: it wakes, the thread grows, cur = v
       'done' — the same, and v was the last star of the picture
       'same' — v is the star you stand on
       'back' — v is lit already or numbered below cur (the start-over slip)
       'skip' — v is beyond cur+1 (counted past a number)
       'none' — no such star, or the round is already done */
  function tap(st, v) {
    if (st.done || !star(st, v)) return { kind: 'none' };
    if (v === st.cur) return { kind: 'same' };
    if (v < st.cur) return { kind: 'back' };                 // every lit star is below cur
    if (v > st.cur + 1) return { kind: 'skip' };
    st.lit.push(v); st.cur = v;
    if (v === st.end) { st.done = true; return { kind: 'done' }; }
    return { kind: 'next' };
  }
  function restart(st) { st.lit = [st.start]; st.cur = st.start; st.done = false; }
  function verdict(st) { return st.done ? 'done' : 'unfinished'; }
  function remaining(st) { return st.end - st.cur; }

  /* ---- layout: the sky is W wide, H = W × aspect; a star is the shorter
     side ÷ 6.8 clamped to 44…68 px; centres map the unit square onto
     [PAD + R, W − PAD − R] × [PAD + R, H − PAD − R] ---- */
  function layout(st, W) {
    var aspect = W < 480 ? 1.0 : 0.66;                          // a square sky on a phone; 3:2 from 480 up (the card must fit a 640 / 900 fold with the strip and Check)
    var H = Math.round(W * aspect);
    var s = Math.round(Math.min(W, H) / 6.8); if (s < 44) s = 44; if (s > 68) s = 68;   // the shorter side sets the star
    var R = s / 2, Sx = W - 2 * (PAD + R), Sy = H - 2 * (PAD + R);
    var pos = {}, i;
    for (i = 0; i < st.stars.length; i++) {
      var q = st.stars[i];
      pos[q.v] = { x: Math.round(PAD + R + q.u * Sx), y: Math.round(PAD + R + q.w * Sy), kind: q.kind };
    }
    var segs = [];
    for (i = 1; i < st.lit.length; i++) segs.push([st.lit[i - 1], st.lit[i]]);
    var closing = SHAPES[st.shape].close.map(function (c) { return [st.start + c[0], st.start + c[1]]; });
    return { W: W, H: H, pad: PAD, star: s, R: R, pos: pos, segments: segs, closing: closing, minSpan: Math.min(Sx, Sy) };
  }

  /* the guess measurement for the gate: from each path star, is the nearest
     candidate the right one? A = any sleeping star; B = any star with a bigger
     numeral. The starry sky must never make either easier than the clear sky. */
  function proximityBot(st, mode) {
    var pts = SHAPES[st.shape].pts, L = pts.length - 1, hits = 0;
    for (var i = 0; i < L; i++) {
      var here = pts[i], cur = st.start + i, best = null, bestD = Infinity;
      for (var k = 0; k < st.stars.length; k++) {
        var q = st.stars[k];
        if (q.kind === 'path' && q.v <= cur) continue;                 // lit
        if (mode === 'B' && q.v <= cur) continue;                       // not bigger
        var d = dist(here, [q.u, q.w]);
        if (d < bestD) { bestD = d; best = q.v; }
      }
      if (best === cur + 1) hits++;
    }
    return { steps: L, hits: hits, rate: hits / L };
  }

  var api = {
    DMIN: DMIN, PAD: PAD, SHAPES: SHAPES, ROUNDS: ROUNDS,
    rounds: rounds, extraNumerals: extraNumerals, extraCount: extraCount, placeExtras: placeExtras,
    newState: newState, star: star, isLit: isLit, tap: tap, restart: restart, verdict: verdict, remaining: remaining,
    layout: layout, proximityBot: proximityBot, rng: rng, dist: dist
  };
  global.ConstellationCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));

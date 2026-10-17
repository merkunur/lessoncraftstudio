/* =====================================================================
   twin-pools-core.js — the MODEL of the Twin Pools, activity #15 of the
   one-by-one rebuild: "Twinsies — count how many & count out that many"
   (K.CC.B.5). Design sheet: docs/activities-rebuild/015-twin-pools.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-twin-pools-core.js
   drives it; scripts/mutate-twin-pools.js proves the gate bites).

   THE SKILL. Both halves of K.CC.B.5 in one move: count how many are in the
   first pool (a line, a ring, an array or a scatter — K.CC.B.5's four
   arrangements), then count out THAT many into an empty twin pool, with a
   different sea creature, so only the number can match. The first pool's
   creatures can be tapped to mark them as counted (the child's own marks,
   never a number).

   THE INVENTION IS THE STRINGS. On a right Check a string ties every creature
   in the first pool to one in the twin pool: nothing is left over on either
   side, which is what "the same many" means (K.CC.C.6's matching, shown as
   the proof of the count). Miss 1 → the twin pool's creatures are numbered;
   miss 2 → the strings tie as many pairs as they can and ring the ones left
   without a twin. The help never moves a creature. The twin pool always has
   more places than the round needs (12, or 8 up to five), so its size never
   tells. Never 0.
   ===================================================================== */
(function (global) {
  'use strict';

  var THEME = 'ocean life';
  /* contact sheet read 2026-10-17: these nine are small, whole and unmistakable;
     dolphin/whale/orca/shark/seal/manatee/narwhal are big animals, "fish" is generic,
     tuna reads as food, oyster/seaweed as not-animals */
  var NOUNS = ['crab', 'starfish', 'clownfish', 'jellyfish', 'octopus', 'scallop', 'shrimp', 'pufferfish', 'angelfish'];
  /* each round: how many, how they lie, the first pool's creature, the twin's creature */
  var POOLS = {
    to10: [
      { n: 7, arr: 'scatter', model: 'crab', twin: 'starfish' },
      { n: 4, arr: 'line', model: 'clownfish', twin: 'jellyfish' },
      { n: 8, arr: 'array', rows: 2, cols: 4, model: 'octopus', twin: 'scallop' },
      { n: 6, arr: 'ring', model: 'starfish', twin: 'crab' },
      { n: 9, arr: 'scatter', model: 'shrimp', twin: 'pufferfish' },
      { n: 6, arr: 'array', rows: 2, cols: 3, model: 'jellyfish', twin: 'clownfish' },
      { n: 10, arr: 'scatter', model: 'scallop', twin: 'octopus' },
      { n: 7, arr: 'ring', model: 'pufferfish', twin: 'shrimp' },
      { n: 5, arr: 'scatter', model: 'angelfish', twin: 'crab' }
    ],
    to5: [
      { n: 3, arr: 'line', model: 'crab', twin: 'starfish' },
      { n: 5, arr: 'ring', model: 'clownfish', twin: 'jellyfish' },
      { n: 2, arr: 'line', model: 'octopus', twin: 'scallop' },
      { n: 4, arr: 'scatter', model: 'starfish', twin: 'crab' },
      { n: 1, arr: 'scatter', model: 'shrimp', twin: 'pufferfish' },
      { n: 5, arr: 'scatter', model: 'jellyfish', twin: 'clownfish' },
      { n: 4, arr: 'array', rows: 2, cols: 2, model: 'pufferfish', twin: 'shrimp' },
      { n: 3, arr: 'ring', model: 'angelfish', twin: 'octopus' }
    ]
  };
  var PLACES = { to10: 12, to5: 8 };
  var RANGES = ['to5', 'to10'], TWINS = ['other', 'same'];

  /* mulberry32, seeded per round: the scatter and the tilts are fixed per round */
  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function rounds(range, prefix, twin) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var p = POOLS[key][i];
      out.push({ id: (prefix || 'tw') + '-' + key + '-' + i, n: p.n, arr: p.arr, rows: p.rows || 0, cols: p.cols || 0,
        model: p.model, twin: twin === 'same' ? p.model : p.twin, places: PLACES[key] });
    }
    return out;
  }
  function newState(r) {
    var marks = []; for (var i = 0; i < r.n; i++) marks.push(false);
    return { id: r.id, n: r.n, arr: r.arr, rows: r.rows, cols: r.cols, model: r.model, twin: r.twin, places: r.places,
      filled: [], marks: marks, misses: 0, checked: null, done: false };
  }
  function isFilled(st, p) { return st.filled.indexOf(p) >= 0; }
  /* a tap on an empty place in the twin pool: a creature goes there */
  function place(st, p) {
    if (!st || st.done || p !== Math.floor(p) || p < 0 || p >= st.places || isFilled(st, p)) return false;
    st.filled.push(p); st.filled.sort(function (a, b) { return a - b; }); st.checked = null; return true;
  }
  /* a tap on a creature in the twin pool: it goes away */
  function remove(st, p) {
    if (!st || st.done) return false;
    var i = st.filled.indexOf(p); if (i < 0) return false;
    st.filled.splice(i, 1); st.checked = null; return true;
  }
  function empty(st) { if (!st || st.done || !st.filled.length) return false; st.filled = []; st.checked = null; return true; }
  /* a tap on a creature in the first pool: the child's own counted-mark goes on or off */
  function mark(st, k) {
    if (!st || st.done || k !== Math.floor(k) || k < 0 || k >= st.n) return false;
    st.marks[k] = !st.marks[k]; return true;
  }

  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.filled.length };
    var a = st.filled.length, slip;
    if (a === 0) slip = 'none';
    else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';
    else slip = 'right';
    var res = { ok: slip === 'right', slip: slip, a: a };
    if (res.ok) st.done = true;
    else if (slip !== 'none') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  /* numbers on the twin pool's creatures (place order): when done, and from miss 1 — but only for
     the Check that made them; a change takes them away, so they are never a running count */
  function twinNums(st) { var on = st.done || (helpLevel(st) >= 1 && !!st.checked); return st.filled.map(function (p, i) { return on ? String(i + 1) : ''; }); }
  /* numbers on the first pool's creatures: only when done (then both pools read 1..n) */
  function modelNums(st, order) { return order.map(function (k, i) { return st.done ? String(i + 1) : ''; }); }
  /* the strings: when done, and from miss 2 — only for the Check that tied them (a change unties them) */
  function showStrings(st) { return st.done || (helpLevel(st) >= 2 && !!st.checked); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none', tied = showStrings(st) && !st.done;
    if (s === 'more') return tied ? 'hintMoreTied' : 'hintMore';
    if (s === 'fewer') return tied ? 'hintFewerTied' : 'hintFewer';
    return 'hintStart';
  }

  /* THE STRINGS. Tie the two pools by the matching of SMALLEST TOTAL STRING
     LENGTH (Hungarian method): a shortest matching never crosses two strings,
     so every pair reads at a glance. With unequal groups the matching ties as
     many pairs as the smaller side has; whatever it leaves out has no twin.
     Points are {x,y}; ties break by index, so the result is fixed. */
  function order(pts) {
    var idx = []; for (var i = 0; i < pts.length; i++) idx.push(i);
    idx.sort(function (a, b) { return (pts[a].x - pts[b].x) || (pts[a].y - pts[b].y) || (a - b); });
    return idx;
  }
  function assign(cost) {   /* rows ≤ cols; returns the column for each row (minimum total cost) */
    var n = cost.length, m = n ? cost[0].length : 0, INF = 1e18, i, j;
    var u = [], v = [], p = [], way = [];
    for (i = 0; i <= n; i++) u.push(0);
    for (j = 0; j <= m; j++) { v.push(0); p.push(0); way.push(0); }
    for (i = 1; i <= n; i++) {
      p[0] = i; var j0 = 0, minv = [], used = [];
      for (j = 0; j <= m; j++) { minv.push(INF); used.push(false); }
      do {
        used[j0] = true; var i0 = p[j0], delta = INF, j1 = 0;
        for (j = 1; j <= m; j++) if (!used[j]) {
          var cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j] - 1e-9) { minv[j] = cur; way[j] = j0; }
          if (minv[j] < delta - 1e-9) { delta = minv[j]; j1 = j; }
        }
        for (j = 0; j <= m; j++) { if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta; }
        j0 = j1;
      } while (p[j0] !== 0);
      do { var jj = way[j0]; p[j0] = p[jj]; j0 = jj; } while (j0);
    }
    var out = []; for (i = 0; i < n; i++) out.push(-1);
    for (j = 1; j <= m; j++) if (p[j]) out[p[j] - 1] = j - 1;
    return out;
  }
  function pairUp(mPts, tPts) {
    var A = mPts, B = tPts, swap = A.length > B.length, i, j;
    if (swap) { A = tPts; B = mPts; }
    var cost = [];
    for (i = 0; i < A.length; i++) { var row = []; for (j = 0; j < B.length; j++) row.push(Math.hypot(A[i].x - B[j].x, A[i].y - B[j].y)); cost.push(row); }
    var col = A.length ? assign(cost) : [], pairs = [], usedB = {};
    for (i = 0; i < A.length; i++) { usedB[col[i]] = true; pairs.push(swap ? [col[i], i] : [i, col[i]]); }
    pairs.sort(function (a, b) { return mPts[a[0]].x - mPts[b[0]].x || a[0] - b[0]; });
    var lone = []; for (j = 0; j < B.length; j++) if (!usedB[j]) lone.push(j);
    return { pairs: pairs, loneModel: swap ? lone : [], loneTwin: swap ? [] : lone };
  }

  /* THE BENCH. Two pools of the same size.
     wide  (W ≥ 560):            SIDE BY SIDE, tall pools of cols × 4 places (3 × 4, or 2 × 4 up to
                                 five), a 6 px rim, a 28–56 px gap the strings cross; cell ≤ 112,
                                 picture cell − 2 — 97 px on the live 648 px stage (a two-row pool
                                 squashed every ring flat and every big scatter into rows)
     stack (300–559, and < 280): the first above the twin, 4 × 3 (or 4 × 2), cell ≤ 66, picture cell − 2
     narrow (280–299, twelve places only): the first above the twin, 6 × 2, picture = cell */
  var GAP = 28, GAP_MAX = 56;
  function layout(W, places) {
    W = Math.max(240, Math.floor(W)); places = places === 8 ? 8 : 12;
    var PAD = 8, cols, rows, cell, pic, mode, gap = 0;
    if (W >= 560) { mode = 'wide'; PAD = 6; cols = places === 8 ? 2 : 3; rows = 4; cell = Math.min(112, Math.floor((W - 4 * PAD - GAP) / 6)); pic = cell - 2; gap = Math.min(GAP_MAX, W - 2 * (cols * cell + 2 * PAD)); }
    else if (W >= 300 || W < 280 || places === 8) { mode = 'stack'; cols = 4; rows = places === 8 ? 2 : 3; cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2; }
    else { mode = 'narrow'; cols = 6; rows = 2; cell = Math.floor((W - 2 * PAD) / 6); pic = cell; }
    return { mode: mode, side: mode === 'wide', gap: gap, cols: cols, rows: rows, cell: cell, pic: pic, pad: PAD, poolW: cols * cell + 2 * PAD, poolH: rows * cell + 2 * PAD };
  }
  function placeCell(p, L) { return [p % L.cols, Math.floor(p / L.cols)]; }
  /* the twin pool's places: top-left of the picture inside the pool */
  function placeSpot(p, L) { var c = placeCell(p, L), room = L.cell - L.pic; return { x: L.pad + c[0] * L.cell + room / 2, y: L.pad + c[1] * L.cell + room / 2 }; }

  /* the first pool's picture size: the place size (one size for both pools) */
  function modelPic(st, L) { return L.pic; }
  /* the ring's ellipse (centre and radii, in pool px) — the wrapper draws it as a loop of pebbles */
  function ringEllipse(st, L) {
    if (st.arr !== 'ring') return null;
    var s = modelPic(st, L);
    return { cx: L.poolW / 2, cy: L.poolH / 2, rx: Math.max(0, (L.poolW - 2 * L.pad - s) / 2), ry: Math.max(0, (L.poolH - 2 * L.pad - s) / 2) };
  }
  /* where the first pool's creatures lie: top-left of each picture inside the pool, + a tilt */
  function modelSpots(st, L) {
    var rand = rng(st.id + ':' + L.mode), out = [], i, n = st.n, s = modelPic(st, L);
    var innerW = L.poolW - 2 * L.pad, innerH = L.poolH - 2 * L.pad;
    var cx = L.poolW / 2, cy = L.poolH / 2;
    var tilt = function () { return Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 10 : 20)); };
    if (st.arr === 'line') {
      /* one straight line through the middle of the pool, along its long side */
      var across = innerW >= innerH, len = across ? innerW : innerH;
      var gap = n > 1 ? Math.min(L.cell * 1.3, (len - s) / (n - 1)) : 0, o0 = -gap * (n - 1) / 2;
      for (i = 0; i < n; i++) out.push(across ? { x: cx + o0 + i * gap - s / 2, y: cy - s / 2, tilt: 0 } : { x: cx - s / 2, y: cy + o0 + i * gap - s / 2, tilt: 0 });
    } else if (st.arr === 'array') {
      var R = st.rows, Cc = st.cols;
      if (innerH > innerW) { var tmp = R; R = Cc; Cc = tmp; }   /* the array's long side along the pool's long side */
      var gx = Cc > 1 ? Math.min(L.cell * 1.3, (innerW - s) / (Cc - 1)) : 0, gy = R > 1 ? Math.min(L.cell * 1.15, (innerH - s) / (R - 1)) : 0;
      for (var r = 0; r < R; r++) for (var c = 0; c < Cc; c++) out.push({ x: cx - gx * (Cc - 1) / 2 + c * gx - s / 2, y: cy - gy * (R - 1) / 2 + r * gy - s / 2, tilt: 0 });
    } else if (st.arr === 'ring') {
      /* an ellipse through the pool, the creatures at EQUAL ARC LENGTHS (equal angles crowd the
         ends); the starting point is turned to whichever of 36 offsets keeps them furthest apart */
      var a = Math.max(0, (innerW - s) / 2), b = Math.max(0, (innerH - s) / 2), N = 720, k;
      if (n > 1) {
        var pts = [], cum = [0];
        for (k = 0; k <= N; k++) { var th = 2 * Math.PI * k / N; pts.push([cx + a * Math.cos(th), cy + b * Math.sin(th)]); if (k) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1])); }
        var per = cum[N], at = function (len) { len = ((len % per) + per) % per; var j = 0; while (j < N - 1 && cum[j + 1] < len) j++; return pts[j]; };
        var best = null, bestD = -1;
        for (var o = 0; o < 36; o++) {
          var cand = [], d = Infinity;
          for (i = 0; i < n; i++) cand.push(at(per * (o / 36 / n + i / n)));
          for (i = 0; i < n; i++) for (var m2 = i + 1; m2 < n; m2++) d = Math.min(d, Math.hypot(cand[i][0] - cand[m2][0], cand[i][1] - cand[m2][1]));
          if (d > bestD + 1e-6) { bestD = d; best = cand; }
        }
        for (i = 0; i < n; i++) out.push({ x: best[i][0] - s / 2, y: best[i][1] - s / 2, tilt: tilt() });
      } else out.push({ x: cx - s / 2, y: cy - s / 2, tilt: 0 });
    } else {
      /* scatter: free, seeded placement anywhere in the pool, every two creatures at least a
         picture apart (centre to centre); if a crowded pool will not take them that way, n of
         the pool's cells, shuffled, each picture jittered inside its cell */
      /* spacing tried at 1.04, then closer — down to 0.92 of a picture, which the library's sea
         creatures (ink 0.67–0.96 of their box, measured) still clear */
      var FACTORS = [1.04, 0.98, 0.95, 0.92], x0 = L.pad + s / 2, x1 = L.poolW - L.pad - s / 2, y0 = L.pad + s / 2, y1 = L.poolH - L.pad - s / 2, got = null;
      for (var tries = 0; tries < 160 && !got; tries++) {
        var minD = s * FACTORS[Math.floor(tries / 40)];
        var pts2 = [];
        for (i = 0; i < n; i++) {
          var ok = false;
          for (var att = 0; att < 300 && !ok; att++) {
            var nx = x0 + rand() * (x1 - x0), ny = y0 + rand() * (y1 - y0);
            ok = pts2.every(function (q2) { return Math.hypot(q2[0] - nx, q2[1] - ny) >= minD; });
            if (ok) pts2.push([nx, ny]);
          }
          if (!ok) break;
        }
        if (pts2.length === n) got = pts2;
      }
      if (!got && L.rows >= 3) {
        /* a crowded pool: start from n of the places (random holes), then SHAKE — 600 small seeded
           moves, each kept only if every creature stays ≥ 0.95 of a picture from every other and
           inside the pool — until the heap is irregular */
        var cl = [], c3, r3, tt;
        for (r3 = 0; r3 < L.rows; r3++) for (c3 = 0; c3 < L.cols; c3++) cl.push([L.pad + c3 * L.cell + L.cell / 2, L.pad + r3 * L.cell + L.cell / 2]);
        for (i = cl.length - 1; i > 0; i--) { k = Math.floor(rand() * (i + 1)); tt = cl[i]; cl[i] = cl[k]; cl[k] = tt; }
        var pts3 = cl.slice(0, n), lim = 0.95 * s;
        for (var mv = 0; mv < 600; mv++) {
          var w3 = Math.floor(rand() * n), nx3 = pts3[w3][0] + (rand() - 0.5) * s * 0.6, ny3 = pts3[w3][1] + (rand() - 0.5) * s * 0.6;
          if (nx3 < x0 || nx3 > x1 || ny3 < y0 || ny3 > y1) continue;
          var fine = true;
          for (var o3 = 0; o3 < n && fine; o3++) if (o3 !== w3 && Math.hypot(pts3[o3][0] - nx3, pts3[o3][1] - ny3) < lim) fine = false;
          if (fine) pts3[w3] = [nx3, ny3];
        }
        got = pts3;
      }
      if (got) { for (i = 0; i < n; i++) out.push({ x: got[i][0] - s / 2, y: got[i][1] - s / 2, tilt: tilt() }); }
      else {
        /* a two-row pool (the 320 phone): the creatures go row by row, each row at RANDOM spacing,
           the best of 50 seeded tries kept — the one whose rows stand furthest out of each
           other's columns, so the scatter never reads as an array */
        var rowsN = L.rows, per = [], left = n, rr, kk, best2 = null, bestScore = -1;
        for (rr = 0; rr < rowsN; rr++) { kk = Math.ceil(left / (rowsN - rr)); per.push(kk); left -= kk; }
        for (var tr = 0; tr < 50; tr++) {
          var cand2 = [], rowXs = [];
          for (rr = 0; rr < rowsN; rr++) {
            kk = per[rr]; var xs2 = []; if (!kk) { rowXs.push(xs2); continue; }
            var slack = (L.poolW - 2 * L.pad) - kk * s, cuts = [], g;
            for (g = 0; g <= kk; g++) cuts.push(0.2 + rand());
            var sum = cuts.reduce(function (x, y) { return x + y; }, 0), x = L.pad, yRow = L.pad + rr * ((L.poolH - 2 * L.pad - s) / Math.max(1, rowsN - 1));
            for (g = 0; g < kk; g++) { x += slack * cuts[g] / sum; cand2.push({ x: x, y: yRow }); xs2.push(x); x += s; }
            rowXs.push(xs2);
          }
          var score = Infinity;
          for (rr = 1; rr < rowXs.length; rr++) rowXs[rr].forEach(function (xv) { rowXs[rr - 1].forEach(function (xu) { score = Math.min(score, Math.abs(xv - xu)); }); });
          if (score > bestScore) { bestScore = score; best2 = cand2; }
        }
        for (i = 0; i < best2.length; i++) out.push({ x: best2[i].x, y: best2[i].y, tilt: tilt() });
      }
    }
    return out;
  }

  var api = { GAP: GAP, THEME: THEME, NOUNS: NOUNS, POOLS: POOLS, PLACES: PLACES, RANGES: RANGES, TWINS: TWINS,
    rounds: rounds, newState: newState, isFilled: isFilled, place: place, remove: remove, empty: empty, mark: mark,
    check: check, helpLevel: helpLevel, twinNums: twinNums, modelNums: modelNums, showStrings: showStrings, hintKey: hintKey,
    order: order, assign: assign, pairUp: pairUp, layout: layout, placeCell: placeCell, placeSpot: placeSpot, modelPic: modelPic, ringEllipse: ringEllipse, modelSpots: modelSpots };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TwinPoolsCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

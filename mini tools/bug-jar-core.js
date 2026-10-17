/* =====================================================================
   bug-jar-core.js — the MODEL of the Bug Jar, activity #16 of the
   one-by-one rebuild: "The Wondering Jar — guess, then count to find
   out" (K.CC.B.5). Design sheet: docs/activities-rebuild/016-bug-jar.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-bug-jar-core.js
   drives it; scripts/mutate-bug-jar.js proves the gate bites).

   THE SKILL. K.CC.B.5's upper half — count to answer "how many?" past
   ten, up to 16, in rows, an array, a ring or a scatter (≤ 10) — with a
   benchmark guess first. THE INVENTION IS THE JAR OF TEN. A packed jar
   of library bugs cannot be counted; beside it stands a jar with exactly
   ten of the same bugs (five up to ten). The child guesses: fewer than
   the jar of ten, or more? Then pours the jar out — the bugs land where
   they can be counted — ticks each one while counting (a tick, never a
   number), and sets the jar's label with − and +, which starts at ten,
   so "ten and four more" is a way to get there. Check tells the count
   and holds it against the guess (never graded: a guess cannot be
   wrong). Miss 1 → a hint (some bugs untick'd / fewer / more); miss 2 →
   the bugs are numbered up to the last, which shows "?": the child takes
   the last step (the last number counted tells how many). n is never the
   benchmark, so the guess always has an answer; never 0.
   ===================================================================== */
(function (global) {
  'use strict';

  var THEME = 'insects and bugs';
  /* contact sheet read 2026-10-17: six small, whole, unmistakable bugs; the wasp is the bee's
     double, the spider and the mosquito are not jar friends, the long ones (worm, centipede,
     millipede, dragonfly) do not pack */
  var NOUNS = ['ladybug', 'bee', 'butterfly', 'snail', 'caterpillar', 'ant'];
  var BENCH = { to16: 10, to10: 5 };
  var MAX = { to16: 20, to10: 10 };
  var POOLS = {
    to16: [
      { n: 12, arr: 'array', rows: 3, cols: 4 },
      { n: 7, arr: 'scatter' },
      { n: 14, arr: 'rows' },
      { n: 9, arr: 'ring' },
      { n: 16, arr: 'array', rows: 4, cols: 4 },
      { n: 8, arr: 'scatter' },
      { n: 13, arr: 'rows' },
      { n: 11, arr: 'rows' },
      { n: 15, arr: 'rows' }
    ],
    to10: [
      { n: 7, arr: 'scatter' },
      { n: 3, arr: 'line' },
      { n: 8, arr: 'array', rows: 2, cols: 4 },
      { n: 4, arr: 'line' },
      { n: 6, arr: 'ring' },
      { n: 9, arr: 'scatter' },
      { n: 2, arr: 'line' },
      { n: 6, arr: 'array', rows: 2, cols: 3 }
    ]
  };
  var RANGES = ['to10', 'to16'];

  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function rounds(range, prefix, guessOn) {
    var key = POOLS[range] ? range : 'to16', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var p = POOLS[key][i];
      out.push({ id: (prefix || 'bj') + '-' + key + '-' + i, n: p.n, arr: p.arr, rows: p.rows || 0, cols: p.cols || 0,
        noun: NOUNS[i % NOUNS.length], bench: BENCH[key], max: MAX[key], guessOn: guessOn !== false });
    }
    return out;
  }
  function newState(r) {
    var t = []; for (var i = 0; i < r.n; i++) t.push(false);
    return { id: r.id, n: r.n, arr: r.arr, rows: r.rows, cols: r.cols, noun: r.noun, bench: r.bench, max: r.max, guessOn: r.guessOn !== false,
      phase: 'jar', guess: null, ticks: t, seq: [], answer: null, misses: 0, checked: null, done: false };
  }
  /* the guess: fewer or more than the jar of ten — before the pour only, and it can change until then */
  function guess(st, g) {
    if (!st || st.done || st.phase !== 'jar' || !st.guessOn || (g !== 'fewer' && g !== 'more')) return false;
    st.guess = g; return true;
  }
  function canPour(st) { return !!st && !st.done && st.phase === 'jar' && (!st.guessOn || !!st.guess); }
  function pour(st) { if (!canPour(st)) return false; st.phase = 'count'; st.checked = null; return true; }
  /* a tap on a poured bug: the child's own tick goes on or off (the order is kept for the end) */
  function tick(st, k) {
    if (!st || st.done || st.phase !== 'count' || k !== Math.floor(k) || k < 0 || k >= st.n) return false;
    st.ticks[k] = !st.ticks[k];
    var j = st.seq.indexOf(k);
    if (st.ticks[k]) { if (j < 0) st.seq.push(k); } else if (j >= 0) st.seq.splice(j, 1);
    return true;
  }
  function clearTicks(st) { if (!st || st.done || !st.seq.length) return false; for (var i = 0; i < st.n; i++) st.ticks[i] = false; st.seq = []; return true; }
  function unticked(st) { var c = 0; for (var i = 0; i < st.n; i++) if (!st.ticks[i]) c++; return c; }
  /* the label: − and + from the benchmark; untouched it shows the benchmark, which is never the answer */
  function shown(st) { return st.answer === null ? st.bench : st.answer; }
  function step(st, d) {
    if (!st || st.done || st.phase !== 'count' || (d !== 1 && d !== -1)) return false;
    var v = shown(st) + d; if (v < 1 || v > st.max) return false;
    st.answer = v; st.checked = null; return true;
  }

  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.answer };
    var slip, a = st.answer;
    if (st.phase !== 'count') slip = 'pour';
    else if (a === null) slip = 'set';
    else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';
    else slip = 'right';
    var res = { ok: slip === 'right', slip: slip, a: a };
    if (res.ok) st.done = true;
    else if (slip === 'more' || slip === 'fewer') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : '';
    if (s === 'pour') return st.guessOn && !st.guess ? 'hintGuess' : 'hintPour';
    if (s === 'set') return 'hintSet';
    if (s === 'more' || s === 'fewer') {
      if (helpLevel(st) >= 2) return 'hintLast';
      if (unticked(st) > 0) return 'hintTicks';
      return s === 'more' ? 'hintMore' : 'hintFewer';
    }
    return 'hintSet';
  }
  /* the numbers on the poured bugs: when done, 1..n in the order the child ticked (then the rest
     in reading order); at miss 2, only for that Check, 1..n−1 in reading order and "?" on the last */
  function readingOrder(spots) {
    var idx = []; for (var i = 0; i < spots.length; i++) idx.push(i);
    idx.sort(function (a, b) { var dy = spots[a].y - spots[b].y; return (Math.abs(dy) > 8 ? dy : spots[a].x - spots[b].x) || a - b; });
    return idx;
  }
  function bugNums(st, spots) {
    var out = []; for (var i = 0; i < st.n; i++) out.push('');
    if (st.done) {
      var ord = st.seq.slice(); readingOrder(spots).forEach(function (k) { if (ord.indexOf(k) < 0) ord.push(k); });
      ord.forEach(function (k, j) { out[k] = String(j + 1); });
    } else if (helpLevel(st) >= 2 && st.checked) {
      readingOrder(spots).forEach(function (k, j) { out[k] = j === st.n - 1 ? '?' : String(j + 1); });
    }
    return out;
  }
  /* the guess held against the count (never a score): which side it was, and whether the guess said so */
  function verdict(st) {
    if (!st.done || !st.guessOn || !st.guess) return null;
    var side = st.n > st.bench ? 'more' : 'fewer';
    return { side: side, matched: st.guess === side, key: 'verdict' + (side === 'more' ? 'More' : 'Fewer') + (st.guess === side ? 'Yes' : 'No') };
  }

  /* THE BENCH. The tray is always 4 × 4 places (its size never tells): wide cell ≤ 100,
     picture cell − 4 (96 on the live 648 px stage); phones cell ≤ 66 (≤ 60 below a 300 px stage),
     picture cell − 2. */
  function layout(W) {
    W = Math.max(240, Math.floor(W));
    var PAD = 8, wide = W >= 560;
    var tight = !wide && W < 300;   /* the 320 phone: the tray steps down so Check stays above a 640 fold */
    var cell = wide ? Math.min(100, Math.floor((W - 2 * PAD) / 6)) : Math.min(tight ? 60 : 66, Math.floor((W - 2 * PAD) / 4));
    var pic = wide ? cell - 4 : cell - 2;
    var jarW = wide ? Math.min(220, Math.floor((W - 48) / 2)) : Math.floor((W - 24) / 2);
    return { mode: wide ? 'wide' : 'stack', tight: tight, cols: 4, rows: 4, cell: cell, pic: pic, pad: PAD, trayW: 4 * cell + 2 * PAD, trayH: 4 * cell + 2 * PAD, jarW: jarW, jarH: Math.round(jarW * 1.3) };
  }
  /* where the poured bugs lie: top-left of each picture inside the tray, + a tilt */
  function traySpots(st, L) {
    var rand = rng(st.id + ':' + L.mode), out = [], i, k, n = st.n, s = L.pic;
    var inner = 4 * L.cell, cx = L.trayW / 2, cy = L.trayH / 2;
    var tilt = function () { return Math.round((rand() - 0.5) * 16); };
    if (st.arr === 'line') {
      var g = n > 1 ? Math.min(L.cell, (inner - s) / (n - 1)) : 0;
      for (i = 0; i < n; i++) out.push({ x: cx - g * (n - 1) / 2 + i * g - s / 2, y: cy - s / 2, tilt: 0 });
    } else if (st.arr === 'array' || st.arr === 'rows') {
      /* an array: rows × cols; rows: full rows of four, the last one short, left-aligned like reading */
      var C = st.arr === 'array' ? st.cols : 4, R = st.arr === 'array' ? st.rows : Math.ceil(n / 4);
      var x0 = cx - L.cell * C / 2, y0 = cy - L.cell * R / 2, room = (L.cell - s) / 2;
      for (i = 0; i < n; i++) out.push({ x: x0 + (i % C) * L.cell + room, y: y0 + Math.floor(i / C) * L.cell + room, tilt: 0 });
    } else if (st.arr === 'ring') {
      var r = (inner - s) / 2;
      for (i = 0; i < n; i++) { var th = -Math.PI / 2 + 2 * Math.PI * i / n; out.push({ x: cx + r * Math.cos(th) - s / 2, y: cy + r * Math.sin(th) - s / 2, tilt: tilt() }); }
    } else {
      /* scatter: free seeded placement, every two bugs at least a picture apart */
      var x0s = L.pad + s / 2, x1s = L.trayW - L.pad - s / 2, got = null;
      for (var tries = 0; tries < 200 && !got; tries++) {
        var pts = [], minD = s * (tries < 100 ? 1.04 : 0.96);
        for (i = 0; i < n; i++) {
          var ok = false;
          for (var att = 0; att < 300 && !ok; att++) {
            var nx = x0s + rand() * (x1s - x0s), ny = x0s + rand() * (x1s - x0s);
            ok = pts.every(function (q) { return Math.hypot(q[0] - nx, q[1] - ny) >= minD; });
            if (ok) pts.push([nx, ny]);
          }
          if (!ok) break;
        }
        if (pts.length === n) got = pts;
      }
      for (i = 0; i < n; i++) out.push({ x: got[i][0] - s / 2, y: got[i][1] - s / 2, tilt: tilt() });
    }
    return out;
  }
  /* the packed jar: bugs heaped in loose layers of three from the bottom, at ONE density for every
     jar (so a jar's fill is honest: the jar of ten is a fair yardstick) — centres as fractions of the
     glass (fx of its width, fy of its height), the picture as a fraction of the glass width, a tilt.
     SIZE / ASPECT: the glass is 1.118 × as tall as wide, so a picture of 0.44 W is 0.39 of the height. */
  var PACK = { size: 0.44, perRow: 3, rowsMax: 7, hFrac: 0.39 };
  function jarPack(count, seed) {
    var rand = rng(seed), out = [], P = PACK, step = (1 - P.hFrac) / (P.rowsMax - 1);
    for (var i = 0; i < count; i++) {
      var row = Math.floor(i / P.perRow), col = i % P.perRow, shift = row % 2 ? 0.11 : 0;
      out.push({ fx: 0.22 + col * 0.28 + shift + (rand() - 0.5) * 0.1, fy: 1 - P.hFrac / 2 - row * step + (rand() - 0.5) * 0.04, size: P.size, tilt: Math.round((rand() - 0.5) * 70) });
    }
    return out;
  }

  var api = { THEME: THEME, NOUNS: NOUNS, BENCH: BENCH, MAX: MAX, POOLS: POOLS, RANGES: RANGES,
    rounds: rounds, newState: newState, guess: guess, canPour: canPour, pour: pour, tick: tick, clearTicks: clearTicks, unticked: unticked,
    shown: shown, step: step, check: check, helpLevel: helpLevel, hintKey: hintKey, readingOrder: readingOrder, bugNums: bugNums, verdict: verdict,
    layout: layout, traySpots: traySpots, PACK: PACK, jarPack: jarPack };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.BugJarCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

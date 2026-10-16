/* =====================================================================
   peek-window-core.js — the MODEL of the Peek Window, activity #12 of the
   one-by-one rebuild: "How Many Are There?" (K.CC.B.5).
   Design sheet: docs/activities-rebuild/012-peek-window.md · law: LAW.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-peek-window-core.js
   drives it; scripts/mutate-peek-window.js proves the gate bites).

   THE SKILL. K.CC.B.5 — answer "how many?" about up to 10 things. A group
   stands behind a window in a shape teachers use in number talks: a dice
   face (to 6), five in a line and some more (6–10), pairs, a short line,
   a small scatter (≤ 5). The window opens for a moment and closes: the
   child reads the group as a whole, taps how many, may look again as often
   as they like. Check: a wrong number opens the window for good (count
   them); a second wrong number runs the numbers along the pictures to a
   "?" on the last one, so the child still says how many. Never 0.

   GEOMETRY. Every pattern is a list of picture positions (top-left of a
   cell, in cell units) inside a 5 × 3 box; portrait layouts transpose it to
   3 × 5. Pictures never overlap (centres ≥ 1 cell apart — the gate checks).
   ===================================================================== */
(function (global) {
  'use strict';

  var BOX_W = 5, BOX_H = 3;
  var POOLS = {
    to10: [
      { n: 4, p: 'dice', theme: 'fruits', noun: 'apple' },
      { n: 7, p: 'five', theme: 'animals', noun: 'duck' },
      { n: 2, p: 'pairs', theme: 'vegetables', noun: 'carrot' },
      { n: 5, p: 'dice', theme: 'animals', noun: 'cat' },
      { n: 9, p: 'five', theme: 'fruits', noun: 'orange' },
      { n: 3, p: 'scatter', theme: 'vegetables', noun: 'tomato' },
      { n: 6, p: 'dice', theme: 'animals', noun: 'owl' },
      { n: 8, p: 'pairs', theme: 'fruits', noun: 'strawberry' },
      { n: 10, p: 'five', theme: 'vegetables', noun: 'pumpkin' },
      { n: 5, p: 'line', theme: 'animals', noun: 'rabbit' }
    ],
    to5: [
      { n: 3, p: 'dice', theme: 'fruits', noun: 'pear' },
      { n: 1, p: 'dice', theme: 'animals', noun: 'pig' },
      { n: 4, p: 'dice', theme: 'vegetables', noun: 'onion' },
      { n: 2, p: 'pairs', theme: 'fruits', noun: 'lemon' },
      { n: 5, p: 'dice', theme: 'vegetables', noun: 'corn' },
      { n: 3, p: 'scatter', theme: 'animals', noun: 'duck' },
      { n: 4, p: 'pairs', theme: 'fruits', noun: 'apple' },
      { n: 5, p: 'line', theme: 'vegetables', noun: 'carrot' }
    ]
  };
  var THEMES = ['animals', 'fruits', 'vegetables'];
  var RANGES = ['to5', 'to10'], LOOKS = ['quick', 'long', 'open'];
  var LOOK_MS = { quick: 1400, long: 3200 };

  var DICE = {
    1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
  };
  var SCATTER = {
    3: [[0.6, 0.3], [3.3, 0.8], [1.8, 2.0]],
    4: [[0.3, 0.4], [2.5, 0.1], [1.3, 1.9], [3.8, 1.6]],
    5: [[0.2, 0.2], [2.0, 0.5], [3.9, 0.1], [0.9, 2.0], [3.0, 1.9]]
  };
  /* picture positions (top-left of the cell) in the 5 × 3 box, in counting order */
  function positions(p, n) {
    var out = [], i, k;
    if (p === 'dice') { var d = DICE[n]; if (!d) return null; for (i = 0; i < d.length; i++) out.push([d[i][0] + 1, d[i][1]]); return out; }
    if (p === 'five') { if (n < 6 || n > 10) return null; for (i = 0; i < 5; i++) out.push([i, 0.5]); for (i = 0; i < n - 5; i++) out.push([i, 1.5]); return out; }
    if (p === 'pairs') { if (n % 2 || n < 2 || n > 10) return null; k = n / 2; var x0 = (BOX_W - k) / 2; for (i = 0; i < k; i++) { out.push([x0 + i, 0.5]); out.push([x0 + i, 1.5]); } return out; }
    if (p === 'line') { if (n < 1 || n > 5) return null; var l0 = (BOX_W - n) / 2; for (i = 0; i < n; i++) out.push([l0 + i, 1]); return out; }
    if (p === 'scatter') { var s = SCATTER[n]; return s ? s.map(function (q) { return [q[0], q[1]]; }) : null; }
    return null;
  }

  function rounds(range, prefix) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var r = POOLS[key][i];
      out.push({ id: (prefix || 'pw') + '-' + key + '-' + i, n: r.n, p: r.p, theme: r.theme, noun: r.noun, max: key === 'to5' ? 5 : 10 });
    }
    return out;
  }
  function newState(r) {
    return { id: r.id, n: r.n, p: r.p, theme: r.theme, noun: r.noun, max: r.max,
      looks: 0, answer: null, misses: 0, checked: null, done: false };
  }
  function look(st) { if (!st || st.done) return false; st.looks++; return true; }
  function choose(st, a) {
    if (!st || st.done || a < 1 || a > st.max || a !== Math.floor(a)) return false;
    st.answer = a; st.checked = null; return true;
  }
  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.answer };
    var a = st.answer, res;
    if (a === null) res = { ok: false, slip: 'none', a: null };
    else if (a === st.n) res = { ok: true, slip: 'right', a: a };
    else res = { ok: false, slip: a > st.n ? 'more' : 'fewer', a: a };
    if (res.ok) st.done = true; else if (res.slip !== 'none') st.misses++;
    st.checked = res;
    return res;
  }
  /* the window: shut at rest, open while looking; after a wrong answer, and once done, it stays open */
  function staysOpen(st) { return st.done || st.misses > 0; }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  /* numbers on the pictures: '?' on the last at help 2; all + gold on the last once done */
  function labels(st) {
    var out = [], lv = helpLevel(st);
    for (var i = 0; i < st.n; i++) {
      if (st.done) out.push(String(i + 1));
      else if (lv >= 2) out.push(i === st.n - 1 ? '?' : String(i + 1));
      else out.push('');
    }
    return out;
  }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    if (s === 'none') return 'hintNone';
    if (st.misses >= 2) return 'hintCountOn';
    return st.p === 'five' ? 'hintFive' : 'hintCount';
  }

  /* LAYOUT — integer px, gated without a browser.
     wide (W ≥ 560): landscape box, rail in one row below.
     side (328 ≤ W < 560): the box upright (3 × 5), the rail beside it in two columns.
     narrow (W < 328): landscape box, the rail in two rows below. */
  var FRAME = 8, MARGIN = 0, RAIL_GAP = 4, SIDE_GAP = 8;   /* the open shutters slide fully out of the frame, so no margin is needed (kept as a knob) */
  function layout(W, max) {
    W = Math.max(240, Math.floor(W)); max = max || 10;
    if (W >= 560) {
      var cell = Math.min(112, Math.floor((W - 2 * (FRAME + MARGIN)) / BOX_W));
      var chip = Math.min(56, Math.floor((W - (max - 1) * RAIL_GAP) / max));
      return { mode: 'wide', cols: BOX_W, rows: BOX_H, cell: cell, pic: cell - 10, winW: BOX_W * cell + 2 * (FRAME + MARGIN), winH: BOX_H * cell + 2 * FRAME, margin: MARGIN, chip: chip, railCols: max };
    }
    if (W >= 328) {   /* a 360 phone's stage */
      var railW = 2 * 45 + RAIL_GAP;
      var c2 = Math.min(84, Math.floor((W - 2 * (FRAME + MARGIN) - SIDE_GAP - railW) / BOX_H));
      return { mode: 'side', cols: BOX_H, rows: BOX_W, cell: c2, pic: c2 - 6, winW: BOX_H * c2 + 2 * (FRAME + MARGIN), winH: BOX_W * c2 + 2 * FRAME, margin: MARGIN, chip: 45, railCols: max > 5 ? 2 : 1, railW: railW };
    }
    var c3 = Math.floor((W - 2 * (FRAME + MARGIN)) / BOX_W);
    var chip3 = Math.floor((W - 4 * RAIL_GAP) / 5);
    return { mode: 'narrow', cols: BOX_W, rows: BOX_H, cell: c3, pic: c3 - 6, winW: BOX_W * c3 + 2 * (FRAME + MARGIN), winH: BOX_H * c3 + 2 * FRAME, margin: MARGIN, chip: chip3, railCols: 5 };
  }
  /* a picture's centre in px inside the box for this layout (portrait transposes) */
  function place(pos, L) {
    var x = pos[0], y = pos[1];
    if (L.mode === 'side') { var t = x; x = y; y = t; }
    return { cx: (L.margin || 0) + (x + 0.5) * L.cell, cy: (y + 0.5) * L.cell };
  }

  var api = { BOX_W: BOX_W, BOX_H: BOX_H, POOLS: POOLS, THEMES: THEMES, RANGES: RANGES, LOOKS: LOOKS, LOOK_MS: LOOK_MS,
    positions: positions, rounds: rounds, newState: newState, look: look, choose: choose, check: check,
    staysOpen: staysOpen, helpLevel: helpLevel, labels: labels, hintKey: hintKey, layout: layout, place: place };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.PeekWindowCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

/* =====================================================================
   next-number-core.js — the MODEL of "What number comes next?" (K.CC.A.2),
   activity #3 of the one-by-one rebuild (docs/activities-rebuild/003-next-number.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-next-number-core.js
   drives it exhaustively; scripts/mutate-next-number.js proves the gate bites).

   THE SKILL. K.CC.A.2: count forward from a given number within the known
   sequence — instead of starting at 1. The apparatus is THE PEEK PATH: N
   stones (1…N) under lids; the child STANDS on n (open, with a counter) and
   WRITES n+1 on number keys; the stone after n is the question. Stones
   before n may be peeked (a lid per tap) or shown by a setting; stones after
   the question stay locked until the round is answered. The verdict names
   the slip: 'noAnswer' / 'same' (n) / 'before' (< n) / 'far' (> n+1) / 'ok'. LAYOUT is part of the model: rows of ten (five on a
   phone), a stone ≥ 44 px wide and 1.15 × as tall, keys ≥ 44 px.
   ===================================================================== */
(function (global) {
  'use strict';

  var ASPECT = 1.15;                     // stone height ÷ width

  /* ---- rounds: to 10 → n = 1…9; to 20 → n = 9…19 (the teens and 19 → 20) ---- */
  function rounds(range, seed) {
    var N = Number(range) === 20 ? 20 : 10, lo = N === 20 ? 9 : 1, out = [];
    for (var n = lo; n < N; n++) out.push({ n: n, N: N, seed: (seed || 'np') + ':' + N + ':' + n });
    return out;
  }

  /* ---- state ---- */
  function newState(round, path) {
    var st = { n: round.n, N: round.N, seed: round.seed, open: [], typed: '', done: false };
    if (path === 'shown') for (var v = 1; v < round.n; v++) st.open.push(v);
    return st;
  }
  function target(st) { return st.n + 1; }
  function isOpen(st, v) {
    if (v === st.n) return true;
    if (st.done && v === st.n + 1) return true;
    return st.open.indexOf(v) >= 0;
  }
  /* peek(st, v): toggle the lid of stone v. Refused on the stone you stand
     on ('self'), on a locked stone after the question ('locked' — until the
     round is done), and off the path ('range'). */
  function peek(st, v) {
    if (v < 1 || v > st.N) return { ok: false, reason: 'range' };
    if (v === st.n) return { ok: false, reason: 'self' };
    if (st.done && v === st.n + 1) return { ok: false, reason: 'self' };
    if (v > st.n && !st.done) return { ok: false, reason: 'locked' };
    var i = st.open.indexOf(v);
    if (i >= 0) { st.open.splice(i, 1); return { ok: true, open: false }; }
    st.open.push(v);
    return { ok: true, open: true };
  }
  function closeAll(st) { st.open = []; }
  /* the run-up scaffold after a wrong answer: every stone before n opens */
  function revealRunUp(st) { for (var v = 1; v < st.n; v++) if (st.open.indexOf(v) < 0) st.open.push(v); }
  /* typing: digits only, leading zeros stripped, at most two digits, never above N */
  function type(st, d) {
    if (st.done) return false;
    d = String(d);
    if (!/^\d$/.test(d)) return false;
    var s = (st.typed + d).replace(/^0+(?=\d)/, '');
    if (s.length > 2 || Number(s) > st.N) return false;
    st.typed = s;
    return true;
  }
  function erase(st) { if (st.done || !st.typed) return false; st.typed = st.typed.slice(0, -1); return true; }
  function clear(st) { st.typed = ''; }
  function answer(st) { return st.typed === '' ? null : Number(st.typed); }
  /* verdict: 'noAnswer' | 'ok' | 'same' | 'before' (any answer below n) | 'far' (any answer above n+1) */
  function verdict(st) {
    var a = answer(st);
    if (a === null) return 'noAnswer';
    if (a === st.n + 1) return 'ok';
    if (a === st.n) return 'same';
    if (a < st.n) return 'before';
    return 'far';
  }
  function finish(st) { if (verdict(st) !== 'ok') return false; st.done = true; return true; }

  /* ---- layout ---- */
  function layout(N, W) {
    var pad = W < 400 ? 8 : 12, gap = W < 400 ? 5 : 6, rowGap = gap + 6;
    var cols = W >= 570 ? 10 : 5;
    var w = Math.floor((W - 2 * pad - (cols - 1) * gap) / cols), fits = true;
    if (w > 72) w = 72;
    if (w < 44) { w = 44; fits = false; }
    var h = Math.round(w * ASPECT);
    var rows = Math.ceil(N / cols);
    var rowW = cols * w + (cols - 1) * gap, x0 = Math.round((W - rowW) / 2);
    var pts = [];
    for (var i = 0; i < N; i++) {
      var r = Math.floor(i / cols), c = i % cols;
      pts.push({ x: x0 + c * (w + gap), y: pad + r * (h + rowGap) });
    }
    var puck = Math.round(w * 0.5);
    /* the counter rests on a stone's lower edge and overhangs it by 0.38 × its
       size — the mat keeps that room below the last row */
    var bottomPad = pad + Math.ceil(puck * 0.4);
    return { w: w, h: h, cols: cols, rows: rows, gap: gap, pad: pad, bottomPad: bottomPad, points: pts, puck: puck,
             height: pad + rows * h + (rows - 1) * rowGap + bottomPad, fits: fits };
  }
  /* keys: 0…9 + erase = 11 chips; as many per row as fit at 44 px */
  function keypad(W) {
    var gap = 5, perRow = 4;
    if (11 * 44 + 10 * gap <= W) perRow = 11; else if (6 * 44 + 5 * gap <= W) perRow = 6;
    var chip = Math.max(44, Math.min(56, Math.floor((W - (perRow - 1) * gap) / perRow)));
    return { perRow: perRow, chip: chip, gap: gap, width: perRow * chip + (perRow - 1) * gap };
  }

  var api = {
    ASPECT: ASPECT, rounds: rounds, newState: newState, target: target, isOpen: isOpen, peek: peek,
    closeAll: closeAll, revealRunUp: revealRunUp, type: type, erase: erase, clear: clear, answer: answer,
    verdict: verdict, finish: finish, layout: layout, keypad: keypad
  };
  global.NextNumberCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));

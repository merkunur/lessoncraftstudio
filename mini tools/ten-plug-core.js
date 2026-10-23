/* =====================================================================
   ten-plug-core.js — the model of ACTIVITY #85, THE TEN PLUG ("Make a
   Ten to Add", 1.OA.C.6). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/085-numberbond.md
   ---------------------------------------------------------------------
   The first number sits in a ten-rack with a hole (10 − a empty slots).
   The second number is a stick of linking cubes. Snap the stick, drag a
   piece into the hole: too long → it bounces back; too short → empty
   slots stay; exactly the hole → the rack turns into a golden ten and the
   rest waits beside it on the ones shelf. Then the child types the total.
   Level "Make 10": the stick is a full ten-stick and the child types the
   partner that filled the hole.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TenPlugCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['add', 'm10'];
  var MAX_PIECES = 3;
  var SUMS = [[8, 5], [9, 4], [7, 6], [8, 7], [9, 6], [7, 5], [6, 8], [9, 8], [7, 4], [9, 7], [5, 9], [4, 8], [8, 8], [6, 5]];
  var TENS = [7, 4, 9, 2, 6, 5, 8, 3];
  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'add'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = levelOf(level) === 'm10' ? TENS.length : SUMS.length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function round(level, idx) {
    level = levelOf(level);
    if (level === 'm10') { var k = TENS[idx]; return { level: level, idx: idx, a: k, b: 10, answer: 10 - k, swapOk: false }; }
    var s = SUMS[idx]; return { level: level, idx: idx, a: s[0], b: s[1], answer: s[0] + s[1], swapOk: s[0] < s[1] };
  }
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var k = 0; k < 4000; k++) {
      order = shuffle(all, rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      var bad = false; for (var p = 1; p < order.length && !bad; p++) if (round(level, order[p]).answer === round(level, order[p - 1]).answer) bad = true;
      if (!bad) break;
    }
    return { order: order };
  }

  /* ---- state ---- */
  var pid = 0;
  function stick(n) { return [{ id: 'p' + (++pid), len: n, where: 'mat' }]; }
  function newState(r, mode) {
    return { r: r, mode: mode === 'head' ? 'head' : 'snap', a: r.a, b: r.b, swapped: false, pieces: stick(r.b), first: null,
      plugged: false, typed: '', misses: 0, show: 0, last: null, done: false, auto: false };
  }
  function moved(st) { st.show = 0; st.last = null; }
  function hole(st) { return 10 - st.a; }
  function find(st, id) { for (var i = 0; i < st.pieces.length; i++) if (st.pieces[i].id === id) return st.pieces[i]; return null; }
  function inRack(st) { return st.pieces.reduce(function (s, p) { return s + (p.where === 'rack' ? p.len : 0); }, 0); }
  function left(st) { return st.pieces.reduce(function (s, p) { return s + (p.where === 'mat' ? p.len : 0); }, 0); }
  function whole(st) { return st.pieces.length === 1 && st.pieces[0].where === 'mat' && st.pieces[0].len === st.b; }
  /* snap a piece on the mat after its j-th cube */
  function snap(st, id, j) {
    if (st.done || st.plugged) return null;
    var p = find(st, id); if (!p || p.where !== 'mat' || j < 1 || j >= p.len || st.pieces.length >= MAX_PIECES) return null;
    var wasWhole = whole(st), i = st.pieces.indexOf(p);
    var x = { id: 'p' + (++pid), len: j, where: 'mat' }, y = { id: 'p' + (++pid), len: p.len - j, where: 'mat' };
    st.pieces.splice(i, 1, x, y);
    if (wasWhole) st.first = [j, p.len - j];
    moved(st); return [x, y];
  }
  /* join every piece back into one stick (the undo) */
  function reset(st) {
    if (st.done || st.plugged) return false;
    if (whole(st)) return false;
    st.pieces = stick(st.b); st.first = null; moved(st); return true;
  }
  function plug(st, id) {
    if (st.done || st.plugged) return null;
    var p = find(st, id); if (!p || p.where !== 'mat') return null;
    var room = hole(st) - inRack(st);
    if (p.len > room) { moved(st); st.last = { reason: 'long', over: p.len - room }; return 'long'; }
    p.where = 'rack';
    if (p.len < room) { moved(st); st.last = { reason: 'short', gap: room - p.len }; return 'short'; }
    st.plugged = true; moved(st); st.last = { reason: 'fit' }; return 'fit';
  }
  function unplug(st, id) {
    if (st.done || st.plugged) return false;
    var p = find(st, id); if (!p || p.where !== 'rack') return false;
    /* back to the mat, at the end of the row */
    st.pieces.splice(st.pieces.indexOf(p), 1); p.where = 'mat'; st.pieces.push(p); moved(st); return true;
  }
  function swap(st) {
    if (!st.r.swapOk || st.done || st.plugged || !whole(st)) return false;
    var t = st.a; st.a = st.b; st.b = t; st.swapped = !st.swapped; st.pieces = stick(st.b); st.first = null; moved(st); return true;
  }
  /* the strategy, shown by the apparatus: snap at the hole and plug it */
  function autoPlug(st) {
    st.pieces = stick(st.b); st.first = null;
    var h = hole(st); var two = snap(st, st.pieces[0].id, h);
    st.auto = true; plug(st, two[0].id);
  }
  function type(st, d) {
    if (st.done) return false;
    if (st.mode === 'snap' && !st.plugged) return false;   /* the keys sleep until the ten is full */
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); moved(st); return true; }
    if (!/^[0-9]$/.test(String(d)) || st.typed.length >= 2 || (st.typed === '' && d === '0')) return false;
    st.typed += d; moved(st); return true;
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (st.mode === 'snap' && !st.plugged) { st.last = { reason: 'snap' }; st.show = 0; return { ok: false, reason: 'snap' }; }
    if (st.typed === '') { st.last = { reason: 'empty' }; st.show = 0; return { ok: false, reason: 'empty' }; }
    var n = +st.typed;
    if (n === r.answer) { if (!st.plugged) autoPlug(st); st.done = true; st.show = 0; st.last = { reason: 'ok' }; return { ok: true }; }
    st.misses++; var show = Math.min(2, st.misses);
    if (!st.plugged) { autoPlug(st); st.last = { reason: 'shown', n: n }; }
    else st.last = { reason: 'ghost', n: n };
    st.show = show;
    return { ok: false, reason: st.last.reason, show: show };
  }
  /* the miss picture on the shelves: a ghost ten and (typed − 10) ghost ones */
  function ghost(st) {
    if (!st.last || st.last.n == null || st.r.level !== 'add') return null;
    var g = Math.max(0, st.last.n - 10), L = left(st);
    return { slots: g, extra: Math.max(0, g - L), outside: Math.max(0, L - g) };
  }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason, m10 = st.r.level === 'm10';
    if (R === 'snap') return whole(st) ? 'hSnap' : 'hSnap2';   /* a wrongly snapped stick: fill the hole exactly, or join it again */
    if (R === 'long') return 'nLong';
    if (R === 'short') return 'nShort';
    if (R === 'fit') return m10 ? 'nFitM10' : 'nFit';
    if (R === 'empty') return st.plugged ? (m10 ? 'nFitM10' : 'hEmpty') : 'hType';
    if (st.show >= 2) return m10 ? 'hM10b' : 'hOn';
    if (R === 'shown') return m10 ? 'hM10a' : 'hShown';
    if (m10) return 'hM10a';
    var g = ghost(st); return g && g.extra > 0 ? 'hOver' : 'hLeft';   /* the 10 + b slip is named: those cubes are inside the ten */
  }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W }; }
  return {
    DATA: { SUMS: SUMS, TENS: TENS, MAX_PIECES: MAX_PIECES }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, round: round, plan: plan,
    newState: newState, hole: hole, find: find, inRack: inRack, left: left, whole: whole, snap: snap, reset: reset, plug: plug, unplug: unplug, swap: swap, autoPlug: autoPlug,
    type: type, check: check, ghost: ghost, hint: hint, layout: layout
  };
});

/* =====================================================================
   fruit-stand-core.js — the MODEL of the Fruit Stand, activity #11 of the
   one-by-one rebuild: "Count to 20 with Fruits" (K.CC.B.4).
   Design sheet: docs/activities-rebuild/011-fruit-stand.md · law: LAW.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-fruit-stand-core.js
   drives it; scripts/mutate-fruit-stand.js proves the gate bites).

   THE SKILL. K.CC.B.4 to 20, PRODUCED: an order slip shows a number; two
   market trays of ten cups (a double ten-frame) wait. FILL TO HERE: a tap
   on an empty cup fills every cup up to it, in counting order (B.4a — one
   fruit per cup, cups in order); a tap on a fruit takes back that fruit
   and every fruit after it. The child decides where the count ENDS: the
   last number tells how many (B.4b); the next cup is one more, the last
   fruit taken back one fewer (B.4c). Setting "one at a time": every tap on
   an empty cup adds ONE fruit, every tap on a fruit takes back the LAST.
   check() names the slip — at the teens the two a teacher sees: only the
   ones of the order (7 for 17) and only the full tray (10 for 17) — and
   the help grows: 1 miss → the stand numbers its fruit; 2 → it also
   marks the extra fruit / the cups still waiting. It never moves a fruit.
   Counting never includes 0 (operator ruling 2026-10-16).
   ===================================================================== */
(function (global) {
  'use strict';

  var TRAY = 10, ROW = 5;
  var THEME = 'fruits';
  /* contact sheet read 2026-10-16: whole fruit, one each, none that reads as an apple */
  var NOUNS = ['strawberry', 'banana', 'pear', 'lemon', 'raspberry', 'pomegranate', 'pineapple', 'orange', 'apple', 'blackberry'];
  var POOLS = {
    to20: [12, 17, 9, 15, 20, 11, 14, 6, 18, 13],
    to10: [4, 7, 9, 3, 10, 6, 8, 5]
  };
  var RANGES = ['to10', 'to20'], MODES = ['fill', 'one'];

  function rounds(range, prefix) {
    var key = POOLS[range] ? range : 'to20', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      out.push({ id: (prefix || 'fs') + '-' + key + '-' + i, n: POOLS[key][i], trays: key === 'to10' ? 1 : 2, noun: NOUNS[(i * 3 + (key === 'to10' ? 1 : 0)) % NOUNS.length] });
    }
    return out;
  }
  function cups(st) { return st.trays * TRAY; }
  function newState(r, mode) {
    return { id: r.id, n: r.n, trays: r.trays, noun: r.noun, mode: MODES.indexOf(mode) >= 0 ? mode : 'fill',
      filled: 0, misses: 0, checked: null, done: false };
  }

  /* a tap on cup c (0-based); returns { from, to } (the fruit count before and after) or null */
  function tap(st, c) {
    if (!st || st.done || c < 0 || c >= cups(st)) return null;
    var from = st.filled, to;
    if (st.mode === 'one') to = c < st.filled ? st.filled - 1 : st.filled + 1;
    else to = c < st.filled ? c : c + 1;
    if (to === from) return null;
    st.filled = to; st.checked = null;
    return { from: from, to: to };
  }

  function classify(a, n) {
    if (a === 0) return 'none';
    if (a === n) return 'right';
    if (n > 10 && a === n - 10) return 'onesOnly';
    if (n > 10 && a === 10) return 'tenOnly';
    return a > n ? 'more' : 'fewer';
  }
  /* Check: an empty stand is not a miss; anything else wrong is */
  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.filled };
    var slip = classify(st.filled, st.n);
    var res = { ok: slip === 'right', slip: slip, a: st.filled };
    if (res.ok) st.done = true;
    else if (slip !== 'none') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }

  /* per cup: the number on its fruit ('' = none) and a mark:
     'extra' = fruit beyond the order, 'need' = an empty cup the order still wants, 'last' = the last fruit of a finished round */
  function cupView(st) {
    var a = st.filled, lv = helpLevel(st), out = [];
    for (var c = 0; c < cups(st); c++) {
      var v = { num: '', mark: '' };
      if (c < a && (st.done || lv >= 1)) v.num = c + 1;
      if (lv >= 2 && c < a && c >= st.n) v.mark = 'extra';
      if (lv >= 2 && c >= a && c < st.n) v.mark = 'need';
      if (st.done && c === a - 1) v.mark = 'last';
      out.push(v);
    }
    return out;
  }
  /* the note under the stand after a wrong Check: { a, n } or null */
  function note(st) { return st.checked && !st.checked.ok && st.checked.slip !== 'none' ? { a: st.checked.a, n: st.n } : null; }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    return { none: 'hintNone', onesOnly: 'hintOnesOnly', tenOnly: 'hintTenOnly', more: 'hintMore', fewer: 'hintFewer' }[s] || 'hintNone';
  }

  /* LAYOUT — integer px, gated without a browser.
     row (W >= 560): trays stacked, five cups a row; stack: trays upright side by side, five cups a column. */
  function layout(W, trays) {
    W = Math.max(240, Math.floor(W)); trays = trays || 2;
    if (W >= 560) {
      var FR = 12, G = 6;
      var cup = Math.min(108, Math.floor((W - 2 * FR - 4 * G) / 5));
      return { mode: 'row', cup: cup, pic: cup - 8, frame: FR, gap: G, trayW: 5 * cup + 4 * G + 2 * FR, between: 12 };
    }
    var fr = 4, g = 4, split = 10;   /* the phone fold (320 × 640) is the budget */
    /* below a 300 px stage (a 320 × 640 phone) the height is the limit, not the width */
    var cell = Math.min(W < 300 ? 58 : 84, Math.floor((W - trays * (2 * fr + g) - (trays - 1) * split) / (2 * trays)));
    return { mode: 'stack', cup: cell, pic: cell - 4, frame: fr, gap: g, trayW: 2 * cell + g + 2 * fr, between: split };
  }

  var api = { TRAY: TRAY, ROW: ROW, THEME: THEME, NOUNS: NOUNS, POOLS: POOLS, RANGES: RANGES, MODES: MODES,
    rounds: rounds, cups: cups, newState: newState, tap: tap, classify: classify, check: check,
    helpLevel: helpLevel, cupView: cupView, note: note, hintKey: hintKey, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.FruitStandCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

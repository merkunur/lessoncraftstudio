/* =====================================================================
   pot-nest-core.js — the MODEL of the Nesting Pots, activity #22 of the
   one-by-one rebuild: "Grandpa Pip's Nesting Pots" (K.CC.C.7).
   Design sheet: docs/activities-rebuild/022-pot-nest.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-pot-nest-core.js
   drives it; scripts/mutate-pot-nest.js proves the gate bites).

   THE SKILL. K.CC.C.7: compare numbers between 1 and 10 given as written
   numerals — here three or four at a time, put in order.
   THE INVENTION IS THE POT THAT GROWS TO ITS NUMBER. In the tray every pot
   is the same size, so only the painted numeral tells them apart. Tapped,
   a pot drops into the nest and grows to its true size (a 9 is a big pot,
   a 2 a small one): smaller than the innermost pot, it settles inside; not
   smaller, it sticks out over the rim, wobbles and goes back (a bounce). A
   pot that fits but is not the next biggest leaves a dead end later —
   nothing left fits — and the child lifts pots back out (tap the inside
   pot). Check when the tray is empty: the nest is then in order by
   construction. Bounces raise the help: from two, dots appear on the
   waiting pots. Never 0, never two pots the same.
   ===================================================================== */
(function (global) {
  'use strict';

  /* each round: the pots in the tray, left to right (never already in order) */
  var POOLS = {
    to10: [[6, 9, 2, 4], [7, 3, 5, 8], [10, 1, 6, 3], [5, 2, 9, 8], [4, 7, 1, 10], [9, 3, 6, 8], [2, 5, 10, 7], [9, 4, 6, 1], [7, 10, 3, 2]],
    to5: [[2, 5, 3], [4, 1, 3], [3, 1, 5], [1, 4, 2], [5, 2, 4], [2, 3, 1], [4, 3, 5], [1, 5, 4]]
  };
  var MAX = { to10: 10, to5: 5 };
  var RANGES = ['to5', 'to10'], DOTS = ['help', 'always'];

  function rounds(range, prefix, dots) {
    var key = POOLS[range] ? range : 'to10', out = [], P = POOLS[key];
    for (var i = 0; i < P.length; i++) out.push({ id: (prefix || 'pn') + '-' + key + '-' + i, max: MAX[key], pots: P[i].slice(), dots: dots === 'always' ? 'always' : 'help' });
    return out;
  }
  function order(pots) { return pots.slice().sort(function (a, b) { return b - a; }); }
  function newState(r) {
    return { id: r.id, max: r.max, pots: r.pots.slice(), dots: r.dots, tray: r.pots.slice(), nest: [], bounces: 0, last: null, checked: null, done: false };
  }
  function inner(st) { return st.nest.length ? st.nest[st.nest.length - 1] : null; }
  /* a pot fits when the nest is empty or it is smaller than the innermost pot */
  function fits(st, v) { var i = inner(st); return i === null || v < i; }
  function drop(st, v) {
    if (!st || st.done || st.tray.indexOf(v) < 0) return 'none';
    st.checked = null;
    if (!fits(st, v)) { st.bounces++; st.last = { v: v, inner: inner(st) }; return 'bounce'; }
    st.tray.splice(st.tray.indexOf(v), 1); st.nest.push(v); st.last = null;
    return 'fit';
  }
  /* lift the innermost pot back out; it returns to its own place in the tray */
  function lift(st) {
    if (!st || st.done || !st.nest.length) return null;
    var v = st.nest.pop(); st.checked = null;
    var tray = [];
    st.pots.forEach(function (p) { if (p === v || st.tray.indexOf(p) >= 0) tray.push(p); });
    st.tray = tray;
    return v;
  }
  function stuck(st) { return st.tray.length > 0 && st.nest.length > 0 && st.tray.every(function (v) { return !fits(st, v); }); }
  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var slip = !st.nest.length ? 'none' : !st.tray.length ? 'right' : stuck(st) ? 'stuck' : 'incomplete';
    var res = { ok: slip === 'right', slip: slip };
    if (res.ok) st.done = true;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.bounces); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    if (s === 'stuck') return 'hintStuck';
    if (s === 'incomplete') return helpLevel(st) >= 2 ? 'hintDots' : 'hintMore';
    return 'hintStart';
  }
  function dotsOn(st) { return st.dots === 'always' || helpLevel(st) >= 2; }
  /* the inside pot glows to be lifted out when nothing left fits */
  function liftCue(st) { return !st.done && stuck(st); }

  /* THE BENCH. The tray (all pots one size) above the nest (each pot at its true size, all on one floor,
     inner pots in front). A pot's height = base + v·k and its rim band ≤ k, so every rim — with its numeral —
     shows above the next pot in. wide (W ≥ 560): k 26, tray pot 84; stack: k 20, tray pot ≤ 64. */
  function layout(W, max) {
    W = Math.max(240, Math.floor(W)); max = max === 5 ? 5 : 10;
    var wide = W >= 560;
    var k = wide ? (max === 5 ? 40 : 26) : (max === 5 ? 30 : 20);
    var base = wide ? 40 : 28;
    var kw = wide ? (max === 5 ? 26 : 14) : (max === 5 ? 18 : 10);
    var wBase = wide ? 70 : 52;
    var band = Math.min(k - 2, wide ? 26 : 20);
    var tray = wide ? 84 : Math.min(64, Math.floor((W - 3 * 10) / 4));
    return { mode: wide ? 'wide' : 'stack', max: max, k: k, base: base, kw: kw, wBase: wBase, band: band, tray: tray,
      nestH: base + max * k + 24, potH: function (v) { return base + v * k; }, potW: function (v) { return wBase + v * kw; } };
  }

  var api = { POOLS: POOLS, MAX: MAX, RANGES: RANGES, DOTS: DOTS,
    rounds: rounds, order: order, newState: newState, inner: inner, fits: fits, drop: drop, lift: lift, stuck: stuck,
    check: check, helpLevel: helpLevel, hintKey: hintKey, dotsOn: dotsOn, liftCue: liftCue, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.PotNestCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

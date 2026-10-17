/* =====================================================================
   block-towers-core.js — the MODEL of the Block Towers, activity #20 of the
   one-by-one rebuild: "Which number is smaller?" (K.CC.C.7).
   Design sheet: docs/activities-rebuild/020-block-towers.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-block-towers-core.js
   drives it; scripts/mutate-block-towers.js proves the gate bites).

   THE SKILL. K.CC.C.7: compare two numbers between 1 and 10 given as
   written numerals. THE INVENTION IS THE COUNT THAT STOPS: two big number
   cards, a tower base above each. The child taps the smaller number and
   presses Check. Then both towers grow TOGETHER, one cube per beat, while
   the count goes 1, 2, 3 … — the smaller number's tower stops first and
   raises a flag, the other keeps climbing to its number. Smaller is the
   number you say first when you count; the towers show how many each
   numeral means. Miss 1 → a hint (count from 1: which number do you say
   first?); miss 2 → the towers grow for that look. A setting shows or
   hides the counting row 1…10 under the towers. Never 0, never equal.
   ===================================================================== */
(function (global) {
  'use strict';

  /* each round: [the left card, the right card] */
  var POOLS = {
    to10: [[3, 8], [7, 2], [8, 9], [5, 1], [4, 7], [10, 8], [5, 6], [2, 9], [8, 4]],
    to5: [[2, 3], [4, 1], [3, 5], [5, 4], [1, 3], [4, 2], [2, 5], [3, 1]]
  };
  var MAX = { to10: 10, to5: 5 };
  var RANGES = ['to5', 'to10'], STRIPS = ['shown', 'hidden'];

  function rounds(range, prefix, strip) {
    var key = POOLS[range] ? range : 'to10', out = [], P = POOLS[key];
    for (var i = 0; i < P.length; i++) {
      out.push({ id: (prefix || 'bt') + '-' + key + '-' + i, left: P[i][0], right: P[i][1], max: MAX[key],
        answer: P[i][0] < P[i][1] ? 'left' : 'right', strip: strip === 'hidden' ? 'hidden' : 'shown' });
    }
    return out;
  }
  function newState(r) {
    return { id: r.id, left: r.left, right: r.right, max: r.max, answer: r.answer, strip: r.strip,
      choice: null, misses: 0, checked: null, done: false };
  }
  function smaller(st) { return Math.min(st.left, st.right); }
  function bigger(st) { return Math.max(st.left, st.right); }
  function choose(st, side) { if (!st || st.done || (side !== 'left' && side !== 'right')) return false; st.choice = side; st.checked = null; return true; }
  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var slip = !st.choice ? 'none' : st.choice === st.answer ? 'right' : 'wrong';
    var res = { ok: slip === 'right', slip: slip, choice: st.choice };
    if (res.ok) st.done = true;
    else if (slip === 'wrong') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    if (s === 'wrong') return helpLevel(st) >= 2 ? 'hintBuilt' : 'hintCount';
    return 'hintStart';
  }
  /* the towers stand (built to their numbers) when done, and from miss 2 until a new choice */
  function built(st) { return st.done || (helpLevel(st) >= 2 && !!st.checked); }
  /* the growth: beat k = 1 … bigger; at beat k a tower holds min(k, its number) cubes; the smaller stops at beat `smaller` */
  function towersAt(st, k) { k = Math.max(0, Math.min(k, bigger(st))); return [Math.min(k, st.left), Math.min(k, st.right)]; }
  function beats(st) { return bigger(st); }
  function stopsFirst(st) { return st.left < st.right ? 'left' : 'right'; }

  /* THE BENCH. Two towers side by side, each above its card. wide (W ≥ 560): cube ≤ 38, card ≥ 104;
     stack (< 560): cube ≤ 26 (ten cubes ≤ 260 — the 360 fold), card ≥ 76. */
  function layout(W, max) {
    W = Math.max(240, Math.floor(W)); max = max === 5 ? 5 : 10;
    var wide = W >= 560;
    var cube = wide ? (max === 5 ? 52 : 34) : (max === 5 ? 40 : 24);
    var card = wide ? Math.min(140, Math.floor((W - 120) / 3)) : Math.max(76, Math.min(104, Math.floor((W - 56) / 2.6)));
    var gap = wide ? Math.min(120, Math.floor(W * 0.12)) : 28;
    return { mode: wide ? 'wide' : 'stack', max: max, cube: cube, card: card, gap: gap, towerH: max * cube };
  }

  var api = { POOLS: POOLS, MAX: MAX, RANGES: RANGES, STRIPS: STRIPS,
    rounds: rounds, newState: newState, smaller: smaller, bigger: bigger, choose: choose, check: check, helpLevel: helpLevel, hintKey: hintKey,
    built: built, towersAt: towersAt, beats: beats, stopsFirst: stopsFirst, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.BlockTowersCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

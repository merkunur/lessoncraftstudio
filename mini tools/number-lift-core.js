/* =====================================================================
   number-lift-core.js — the MODEL of the Number Elevator, activity #19 of
   the one-by-one rebuild: "Which number is bigger?" (K.CC.C.7).
   Design sheet: docs/activities-rebuild/019-number-lift.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-number-lift-core.js
   drives it; scripts/mutate-number-lift.js proves the gate bites).

   THE SKILL. K.CC.C.7: compare two numbers between 1 and 10 given as
   written numerals. THE INVENTION IS THE BUILDING: a building of ten
   floors (five up to five), its floor numbers on the wall in counting
   order — a number line stood upright. Two animal passengers wait, each
   with a ticket to a floor. "Who goes higher?" — the bigger number. The
   child can look for both numbers on the building first (the higher floor
   is the later number in the count), taps the passenger going higher and
   presses Check. Right → the elevator rides up, lets one passenger off at
   the lower floor and carries the other on, higher. Miss 1 → a hint (find
   both numbers on the building); miss 2 → both floors light up. A setting
   hides the floor numbers, so the floors have to be counted. Never 0,
   never the same floor.
   ===================================================================== */
(function (global) {
  'use strict';

  var THEME = 'farm animals';
  /* contact sheet read 2026-10-17: ten animals unmistakable at a glance (chicken/hen, calf/cow,
     duck/duckling, horse/foal are near-doubles; the owl and the bee are not farm passengers) */
  var NOUNS = ['pig', 'dog', 'cat', 'sheep', 'cow', 'duck', 'rabbit', 'goat', 'donkey', 'llama'];
  /* each round: [the left passenger's floor, the right passenger's floor] */
  var POOLS = {
    to10: [[6, 9], [4, 3], [8, 2], [5, 7], [10, 9], [1, 6], [7, 8], [3, 5], [9, 4]],
    to5: [[2, 4], [5, 3], [1, 2], [4, 5], [3, 1], [2, 5], [4, 1], [3, 4]]
  };
  var FLOORS = { to10: 10, to5: 5 };
  var RANGES = ['to5', 'to10'], LABELS = ['shown', 'hidden'];

  function rounds(range, prefix, labels) {
    var key = POOLS[range] ? range : 'to10', out = [], P = POOLS[key];
    for (var i = 0; i < P.length; i++) {
      out.push({ id: (prefix || 'nl') + '-' + key + '-' + i, left: P[i][0], right: P[i][1], floors: FLOORS[key],
        animals: [NOUNS[(2 * i) % NOUNS.length], NOUNS[(2 * i + 1) % NOUNS.length]],
        answer: P[i][0] > P[i][1] ? 'left' : 'right', labels: labels === 'hidden' ? 'hidden' : 'shown' });
    }
    return out;
  }
  function newState(r) {
    return { id: r.id, left: r.left, right: r.right, floors: r.floors, animals: r.animals.slice(), answer: r.answer, labels: r.labels,
      choice: null, misses: 0, checked: null, done: false };
  }
  function bigger(st) { return Math.max(st.left, st.right); }
  function smaller(st) { return Math.min(st.left, st.right); }
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
    if (s === 'wrong') return helpLevel(st) >= 2 ? 'hintLit' : (st.labels === 'hidden' ? 'hintCount' : 'hintFind');
    return 'hintStart';
  }
  /* the floors lit on the building: both tickets' floors, from miss 2 (until a new choice) and when done */
  function litFloors(st) { return (st.done || (helpLevel(st) >= 2 && !!st.checked)) ? [st.left, st.right] : []; }
  /* the ride after a right answer: the elevator stops at the lower floor, then the higher one */
  function ride(st) { return st.done ? [smaller(st), bigger(st)] : []; }

  /* THE BENCH. The building beside the passengers. wide (W ≥ 560): floor height ≤ 44, passenger
     cards 2 side by side, picture ≥ 96; stack (< 560): floor height ≤ 30 (ten floors ≤ 300), the
     two passengers side by side beside the building at the same height, picture ≥ 64 from 286 px. */
  function layout(W, floors) {
    W = Math.max(240, Math.floor(W)); floors = floors === 5 ? 5 : 10;
    var wide = W >= 560;
    var floorH = wide ? (floors === 5 ? 64 : 40) : (floors === 5 ? 50 : 28);
    var buildW = wide ? 168 : Math.min(110, Math.floor(W * 0.33));
    /* phones: the two passengers stand side by side at the same height (never one above the other: on screen, height means floors) */
    var pic = wide ? Math.min(120, Math.floor((W - buildW - 72) / 2) - 24) : Math.max(48, Math.min(96, Math.floor((W - buildW - 62) / 2)));
    return { mode: wide ? 'wide' : 'stack', floors: floors, floorH: floorH, buildW: buildW, buildH: floors * floorH, pic: pic };
  }

  var api = { THEME: THEME, NOUNS: NOUNS, POOLS: POOLS, FLOORS: FLOORS, RANGES: RANGES, LABELS: LABELS,
    rounds: rounds, newState: newState, bigger: bigger, smaller: smaller, choose: choose, check: check, helpLevel: helpLevel, hintKey: hintKey,
    litFloors: litFloors, ride: ride, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NumberLiftCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

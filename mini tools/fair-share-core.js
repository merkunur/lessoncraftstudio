/* =====================================================================
   fair-share-core.js — the MODEL of the Friendship Bridge (fair share),
   activity #18 of the one-by-one rebuild: "The Friendship Bridge —
   compare groups: more, fewer, same" (K.CC.C.6).
   Design sheet: docs/activities-rebuild/018-friendship-bridge.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-fair-share-core.js
   drives it; scripts/mutate-fair-share.js proves the gate bites).

   THE SKILL. K.CC.C.6 by COUNTING: which of two groups has more, which
   fewer, or are they the same — and then the meaning of "the same", made
   by hand. THE INVENTION IS THE BRIDGE. Two plates of toys, a little bridge
   between them. First the child says which plate has more (a tap on that
   plate) or "the same". Then the child makes it fair: a tap on a toy sends
   it across the bridge to the other plate, one at a time, until both plates
   hold the same number — and presses Check. Seven against three is two
   toys across, so the child counts both plates again and again: counting
   is the strategy (#17 owns matching). A wrong judgment shakes the plate,
   never a miss; a wrong Check (not the same yet) is a miss: miss 1 names
   the plate with more and numbers both plates for that Check; miss 2 also
   lights one toy to move. Totals are always even, so fair is always
   possible. The plates hold 12, so their size never tells. Never 0.
   ===================================================================== */
(function (global) {
  'use strict';

  var THEME = 'toys';
  /* contact sheet read 2026-10-17: single, whole toys (crayons, blocks, cards, dominoes are sets;
     the dolls and the baby are people; teddy bear, race car and lego have no vocabulary entry) */
  var NOUNS = ['ball', 'car', 'boat', 'robot', 'truck', 'rocket', 'kite', 'dinosaur', 'train'];
  var POOLS = {
    to10: [[7, 3], [2, 8], [6, 6], [4, 6], [9, 5], [5, 5], [3, 7], [8, 4], [6, 2]],
    to5: [[4, 2], [1, 5], [3, 3], [5, 3], [2, 4], [4, 4], [5, 1], [3, 5]]
  };
  var PLACES = 12;
  var RANGES = ['to5', 'to10'];

  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffled(n, seed) { var a = [], i, j, t, r = rng(seed); for (i = 0; i < n; i++) a.push(i); for (i = n - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function rounds(range, prefix, arr) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var p = POOLS[key][i];
      out.push({ id: (prefix || 'fs') + '-' + key + '-' + i, a: p[0], b: p[1], noun: NOUNS[i % NOUNS.length], arr: arr === 'rows' ? 'rows' : 'scatter',
        answer: p[0] > p[1] ? 'a' : p[0] < p[1] ? 'b' : 'same', fair: (p[0] + p[1]) / 2 });
    }
    return out;
  }
  /* each plate fills its places in its own seeded order, so the toys lie scattered (never in rows to match by
     eye) — unless the teacher chose rows: then both plates fill in reading order, a scaffold */
  function identity(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function newState(r) {
    var rows = r.arr === 'rows', oa = rows ? identity(PLACES) : shuffled(PLACES, r.id + ':a'), ob = rows ? identity(PLACES) : shuffled(PLACES, r.id + ':b');
    return { id: r.id, a0: r.a, b0: r.b, answer: r.answer, fair: r.fair, noun: r.noun, arr: r.arr || 'scatter',
      order: { a: oa, b: ob }, plates: { a: oa.slice(0, r.a), b: ob.slice(0, r.b) },
      phase: 'judge', judged: null, judgeMisses: 0, moves: 0, misses: 0, checked: null, done: false };
  }
  function count(st, side) { return st.plates[side].length; }
  /* step 1: which plate has more, or the same — a wrong judgment is no miss (the plate shakes) */
  function judge(st, c) {
    if (!st || st.done || st.phase !== 'judge' || (c !== 'a' && c !== 'b' && c !== 'same')) return false;
    if (c !== st.answer) { st.judgeMisses++; return 'wrong'; }
    st.judged = c; st.phase = 'share'; return 'right';
  }
  /* step 2: a tap on a toy sends it across the bridge to the first free place (in that plate's order) */
  function move(st, side, place) {
    if (!st || st.done || st.phase !== 'share' || (side !== 'a' && side !== 'b')) return -1;
    var from = st.plates[side], k = from.indexOf(place), other = side === 'a' ? 'b' : 'a', to = st.plates[other];
    if (k < 0 || to.length >= PLACES) return -1;
    var dest = -1, ord = st.order[other];
    for (var i = 0; i < ord.length; i++) if (to.indexOf(ord[i]) < 0) { dest = ord[i]; break; }
    from.splice(k, 1); to.push(dest); st.moves++; st.checked = null;
    return dest;
  }
  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var slip, a = count(st, 'a'), b = count(st, 'b');
    if (st.phase === 'judge') slip = 'judge';
    else if (a === b) slip = 'right';
    else slip = a > b ? 'moreA' : 'moreB';
    var res = { ok: slip === 'right', slip: slip, a: a, b: b };
    if (res.ok) st.done = true;
    else if (slip !== 'judge') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : '';
    if (s === 'judge') return 'hintJudge';
    if (s === 'moreA' || s === 'moreB') return (helpLevel(st) >= 2 ? 'hintOne' : 'hintMore') + (s === 'moreA' ? 'Top' : 'Bottom');
    return 'hintShare';
  }
  /* numbers on the toys: when done, and from miss 1 for that Check only (a move takes them away) */
  function showNums(st) { return st.done || (helpLevel(st) >= 1 && !!st.checked); }
  /* at miss 2 (that Check only): the one toy to send — the last-placed toy on the plate with more */
  function suggest(st) {
    if (st.done || helpLevel(st) < 2 || !st.checked) return null;
    var a = count(st, 'a'), b = count(st, 'b'); if (a === b) return null;
    var side = a > b ? 'a' : 'b', pl = st.plates[side];
    return { side: side, place: pl[pl.length - 1] };
  }

  /* THE BENCH. Two plates of 12 places, the top over the bottom, the bridge between them.
     wide (W ≥ 560): 6 × 2, cell ≤ 112, picture cell − 6; stack (300–559, and < 280): 4 × 3,
     cell ≤ 66, picture cell − 2; narrow (280–299): 6 × 2, picture = cell. */
  function layout(W) {
    W = Math.max(240, Math.floor(W));
    var PAD = 8, cols, rows, cell, pic, mode;
    if (W >= 560) { mode = 'wide'; cols = 6; rows = 2; cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 6; }
    else if (W >= 300 || W < 280) { mode = 'stack'; cols = 4; rows = 3; cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2; }
    else { mode = 'narrow'; cols = 6; rows = 2; cell = Math.floor((W - 2 * PAD) / 6); pic = cell; }
    return { mode: mode, cols: cols, rows: rows, cell: cell, pic: pic, pad: PAD, plateW: cols * cell + 2 * PAD, plateH: rows * cell + 2 * PAD };
  }
  /* a place's picture, top-left inside the plate, with a small seeded jitter and tilt */
  function placeSpot(st, side, place, L) {
    var c = place % L.cols, r = Math.floor(place / L.cols), rand = rng(st.id + ':' + side + ':' + place + ':' + L.mode), room = L.cell - L.pic, j = st.arr === 'rows' ? 0 : 1;
    return { x: L.pad + c * L.cell + room / 2 + (rand() - 0.5) * room * j, y: L.pad + r * L.cell + room / 2 + (rand() - 0.5) * room * j, tilt: j ? Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 10 : 18)) : 0 };
  }
  /* reading order of a plate's toys (for the numbers): rows top to bottom, each left to right */
  function readOrder(st, side, L) {
    return st.plates[side].slice().sort(function (p, q) { var rp = Math.floor(p / L.cols), rq = Math.floor(q / L.cols); return rp - rq || (p % L.cols) - (q % L.cols); });
  }

  var api = { THEME: THEME, NOUNS: NOUNS, POOLS: POOLS, PLACES: PLACES, RANGES: RANGES,
    rounds: rounds, newState: newState, count: count, judge: judge, move: move, check: check, helpLevel: helpLevel, hintKey: hintKey,
    showNums: showNums, suggest: suggest, layout: layout, placeSpot: placeSpot, readOrder: readOrder };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.FairShareCore = api;
}(typeof window !== 'undefined' ? window : globalThis));

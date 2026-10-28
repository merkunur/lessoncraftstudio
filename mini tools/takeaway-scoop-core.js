/* =====================================================================
   takeaway-scoop-core.js — the model of THE TAKE-AWAY SCOOP (row 147,
   "Tuck Breaks a Ten", 2.NBT.B.7; G2-205, G2-251/256/257/259,
   G3-357/360/363). Pure, no DOM.
   Design: docs/activities-rebuild/designs/147-place-value-regroup.md
   ---------------------------------------------------------------------
   The number taken away is a SCOOP with exactly that many cups (one cup
   per one, one rod-slot per ten, one flat-slot per hundred). It lifts
   only when every cup has a block under it — it always takes ITS number
   from the mat, so "the smaller digit from the bigger" cannot happen:
   five cups over two cubes leave three cups empty, and it will not lift.
   Snapping a rod (tap) breaks it into ten cubes on the ones shelf, a flat
   into ten rods — only downhill, and only while the next shelf holds
   fewer than ten. One scoop per round, used once. Then the child types
   what is left on the mat.
   Faces: nothing to snap (warm-up) · ones only (default, the frozen
   eight) · tens and ones.
   ===================================================================== */
(function (root) {
  'use strict';

  var TUCK = 'pets/hamster';
  var COLS = ['H', 'T', 'O'], VAL = { H: 100, T: 10, O: 1 }, DOWN = { H: 'T', T: 'O' }, UP = { O: 'T', T: 'H' };
  var TEN = 10, SHELF_MAX = 19;
  /* ones only: the old activity's eight rounds — every one needs one rod snapped */
  var ONES = [[342, 5], [451, 8], [213, 7], [132, 5], [415, 9], [124, 6], [351, 8], [243, 5]];
  /* nothing to snap (G2-205): no column borrows; the scoop lifts at once */
  var NONE = [[58, 23], [47, 15], [86, 52], [79, 46], [64, 21], [95, 54], [38, 14], [77, 35]];
  /* tens and ones: one snap each — a rod, except 627 − 346 (a flat) */
  var TENS = [[52, 27], [84, 39], [71, 44], [345, 128], [462, 37], [536, 219], [93, 58], [627, 346]];

  function faceOf(v) { return v === 'none' || v === 'tens' ? v : 'ones'; }
  function table(face) { face = faceOf(face); return face === 'none' ? NONE : face === 'tens' ? TENS : ONES; }
  function rounds(face) { return table(face).map(function (r, i) { return { k: i, a: r[0], b: r[1] }; }); }
  function digit(n, col) { return Math.floor(n / VAL[col]) % 10; }

  /* ---------- state ---------- */
  function newState(face, k) {
    face = faceOf(face);
    var rd = rounds(face)[k], mat = {}, need = {};
    COLS.forEach(function (c) { mat[c] = digit(rd.a, c); need[c] = digit(rd.b, c); });
    return { face: face, k: k, a: rd.a, b: rd.b, mat: mat, scoop: { need: need, used: false }, snaps: { H: 0, T: 0 }, typed: '', misses: 0, help: false, verdict: null, done: false };
  }
  function answer(st) { return st.a - st.b; }
  function value(st) { return COLS.reduce(function (s, c) { return s + st.mat[c] * VAL[c]; }, 0); }
  function scoopValue(st) { return st.scoop.used ? st.b : 0; }

  /* ---------- the scoop ---------- */
  /* how many of each kind of cup find a block under them */
  function cupsFilled(st) { var o = {}; COLS.forEach(function (c) { o[c] = st.scoop.used ? 0 : Math.min(st.mat[c], st.scoop.need[c]); }); return o; }
  function canLift(st) { return !st.done && !st.scoop.used && COLS.every(function (c) { return st.mat[c] >= st.scoop.need[c]; }); }
  /* every cup full → it lifts its number off the mat; any cup empty → nothing moves */
  function lift(st) {
    if (st.done || st.scoop.used) return { result: 'no' };
    if (!canLift(st)) { var f = cupsFilled(st), empty = {}; COLS.forEach(function (c) { empty[c] = st.scoop.need[c] - f[c]; }); return { result: 'short', empty: empty }; }
    COLS.forEach(function (c) { st.mat[c] -= st.scoop.need[c]; });
    st.scoop.used = true; st.verdict = null;
    return { result: 'lift' };
  }
  /* the scoop pours its blocks back onto the mat (undo, until solved) */
  function pour(st) {
    if (st.done || !st.scoop.used) return false;
    if (COLS.some(function (c) { return st.mat[c] + st.scoop.need[c] > SHELF_MAX; })) return false;
    COLS.forEach(function (c) { st.mat[c] += st.scoop.need[c]; });
    st.scoop.used = false; st.verdict = null;
    return true;
  }
  /* ---------- snapping, only downhill ---------- */
  function snap(st, col) {
    var to = DOWN[col];
    if (st.done || !to) return { result: 'no' };
    if (!st.mat[col]) return { result: 'empty' };
    if (st.mat[to] >= TEN) return { result: 'enough' };
    st.mat[col]--; st.mat[to] += TEN; st.snaps[col]++; st.verdict = null;
    return { result: 'snap', from: col, to: to };
  }
  /* ten loose pieces click back into one of the next place */
  function rebuild(st, col) {
    var to = UP[col];
    if (st.done || !to || st.mat[col] < TEN || st.mat[to] + 1 > SHELF_MAX) return false;
    st.mat[col] -= TEN; st.mat[to]++;
    if (st.snaps[to] > 0) st.snaps[to]--;
    st.verdict = null;
    return true;
  }
  /* digits land right-aligned; no leading zero */
  function type(st, d) {
    if (st.done) return false;
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); st.verdict = null; return true; }
    if (!/^[0-9]$/.test(d) || st.typed.length >= 3 || (d === '0' && !st.typed)) return false;
    st.typed += d; st.verdict = null;
    return true;
  }
  function boxDigit(s, col) { var i = s.length - 1 - COLS.slice().reverse().indexOf(col); return i >= 0 ? s.charAt(i) : ''; }

  /* Check: notes (no miss) for an unused scoop and nothing typed; then each digit against the mat's value.
     A right answer on an untidy mat (ten or more on a shelf) is accepted: the mat is tidied first. */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!st.scoop.used) return { result: 'note', key: 'hintScoop' };
    if (!st.typed) return { result: 'note', key: 'hintType' };
    var left = String(value(st));
    var wrongs = COLS.filter(function (c) { return boxDigit(st.typed, c) !== boxDigit(left, c); });
    if (!wrongs.length) { var tidied = tidy(st); st.done = true; st.verdict = null; return { result: 'ok', tidied: tidied }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { wrongs: wrongs };
    return { result: 'miss', wrong: wrongs[0], wrongs: wrongs };
  }
  function tidy(st) { var n = 0; while (rebuild(st, 'O')) n++; while (rebuild(st, 'T')) n++; return n; }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) { if (!st.verdict) return null; return st.help ? 'hintCountOn' : 'hintCount'; }

  /* the written marks: strike-and-rewrite over the top digits, as the blocks were snapped */
  function chains(a, top) {
    var out = {};
    COLS.forEach(function (c) { var ch = [digit(a, c)]; if (top[c] !== ch[0]) ch.push(top[c]); out[c] = ch; });
    return out;
  }
  /* what the child's snaps did to the top number (the mat plus what the scoop took) */
  function marks(st) { var R = {}; COLS.forEach(function (c) { R[c] = st.mat[c] + (st.scoop.used ? st.scoop.need[c] : 0); }); return chains(st.a, R); }
  /* the written method's own regrouping, from the numbers alone */
  function truthMarks(a, b) {
    var R = { H: digit(a, 'H'), T: digit(a, 'T'), O: digit(a, 'O') };
    if (R.O < digit(b, 'O')) { R.T--; R.O += TEN; }
    if (R.T < digit(b, 'T')) { R.H--; R.T += TEN; }
    return chains(a, R);
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* a round that leaves no tens on the mat (213 − 7, 415 − 9) */
  function zeroTens(face, k) { var r = rounds(face)[k]; return faceOf(face) === 'ones' && digit(r.a - r.b, 'T') === 0; }
  /* order-only reshuffle: never the same order twice; the two 0-tens rounds never open together */
  function plan(face, rnd, prev) {
    rnd = rnd || Math.random;
    var R = rounds(face).map(function (r) { return r.k; });
    for (var a = 0; a < 2000; a++) {
      var o = shuffle(R, rnd);
      if (zeroTens(face, o[0]) && zeroTens(face, o[1])) continue;
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: R.slice(1).concat(R[0]) };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { TUCK: TUCK, COLS: COLS, VAL: VAL, DOWN: DOWN, UP: UP, TEN: TEN, SHELF_MAX: SHELF_MAX, ONES: ONES, NONE: NONE, TENS: TENS, faceOf: faceOf, rounds: rounds, digit: digit, newState: newState, answer: answer, value: value, scoopValue: scoopValue, cupsFilled: cupsFilled, canLift: canLift, lift: lift, pour: pour, snap: snap, rebuild: rebuild, type: type, boxDigit: boxDigit, check: check, tidy: tidy, hint: hint, marks: marks, truthMarks: truthMarks, zeroTens: zeroTens, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TakeawayScoopCore = api;
})(typeof window !== 'undefined' ? window : this);

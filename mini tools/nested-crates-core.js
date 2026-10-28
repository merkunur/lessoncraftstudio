/* =====================================================================
   nested-crates-core.js — the model of THE NESTED CRATES (row 146, "Tuck
   Breaks a Hundred", 2.NBT.B.7; G2-205, G3-357/360/362/363). Pure, no DOM.
   Design: docs/activities-rebuild/designs/146-place-value-regroup.md
   ---------------------------------------------------------------------
   Tuck's stock room has three shelves: crates (hundreds), boxes (tens),
   cubes (ones). A crate is packed with ten boxes and a box with ten
   cubes, and only what lies on a shelf can be opened: opening a crate
   puts ten BOXES on the tens shelf (never cubes), opening a box puts ten
   cubes on the ones shelf. A crate opens only while no loose box lies on
   the tens shelf, a box only while the ones shelf holds fewer than ten —
   so across a zero the crate must open before the box, every time.
   A customer's order slip has exactly the take-away number of empty
   cells; pieces go from their shelf to the cells of their own kind. When
   the slip is full the child types what is left on the shelves.
   Faces: a few ones (default, the frozen eight) · a three-digit number.
   ===================================================================== */
(function (root) {
  'use strict';

  var TUCK = 'pets/hamster';
  var COLS = ['H', 'T', 'O'], VAL = { H: 100, T: 10, O: 1 }, NEXT = { O: 'T', T: 'H' };
  var TEN = 10, SHELF_MAX = 19;
  /* a few ones across a zero: the old activity's eight rounds */
  var ONES = [[302, 5], [403, 8], [201, 6], [402, 9], [303, 9], [202, 8], [301, 6], [203, 7]];
  /* a three-digit number (G3-362 / G3-360): every minuend has 0 tens */
  var BIG = [[400, 136], [503, 247], [600, 258], [702, 365], [801, 426], [300, 174], [905, 368], [604, 279]];

  function faceOf(v) { return v === 'big' ? 'big' : 'ones'; }
  function table(face) { return faceOf(face) === 'big' ? BIG : ONES; }
  function rounds(face) { return table(face).map(function (r, i) { return { k: i, a: r[0], b: r[1] }; }); }
  function digit(n, col) { return Math.floor(n / VAL[col]) % 10; }

  /* ---------- state ---------- */
  function newState(face, k) {
    face = faceOf(face);
    var rd = rounds(face)[k], shelves = {}, need = {}, have = {};
    COLS.forEach(function (c) { shelves[c] = digit(rd.a, c); need[c] = digit(rd.b, c); have[c] = 0; });
    return { face: face, k: k, a: rd.a, b: rd.b, shelves: shelves, slip: { need: need, have: have, log: [] }, opened: { H: 0, T: 0 }, typed: '', misses: 0, help: false, verdict: null, done: false };
  }
  function answer(st) { return st.a - st.b; }
  function value(st) { return COLS.reduce(function (s, c) { return s + st.shelves[c] * VAL[c]; }, 0); }
  function slipValue(st) { return COLS.reduce(function (s, c) { return s + st.slip.have[c] * VAL[c]; }, 0); }
  function slipFull(st) { return COLS.every(function (c) { return st.slip.have[c] === st.slip.need[c]; }); }

  /* ---------- the hand ---------- */
  /* a crate opens into ten boxes, only while no loose box lies on the tens shelf */
  function openCrate(st) {
    var s = st.shelves;
    if (st.done) return { result: 'no' };
    if (!s.H) return { result: 'empty' };
    if (s.T > 0) return { result: 'full' };
    s.H--; s.T += TEN; st.opened.H++; st.verdict = null;
    return { result: 'open', from: 'H', to: 'T' };
  }
  /* a box opens into ten cubes, only while the ones shelf holds fewer than ten */
  function openBox(st) {
    var s = st.shelves;
    if (st.done) return { result: 'no' };
    if (!s.T) return { result: 'empty' };
    if (s.O >= TEN) return { result: 'full' };
    s.T--; s.O += TEN; st.opened.T++; st.verdict = null;
    return { result: 'open', from: 'T', to: 'O' };
  }
  function open(st, col) { return col === 'H' ? openCrate(st) : col === 'T' ? openBox(st) : { result: 'no' }; }
  /* packing back: ten loose pieces close into one package of the next place */
  function pack(st, col) {
    var s = st.shelves, to = NEXT[col];
    if (st.done || !to || s[col] < TEN || s[to] + 1 > SHELF_MAX) return false;
    s[col] -= TEN; s[to]++;
    if (st.opened[to] > 0) st.opened[to]--;
    st.verdict = null;
    return true;
  }
  /* one piece from its shelf into the next empty cell of its own kind */
  function toSlip(st, col, n) {
    if (st.done || COLS.indexOf(col) < 0) return { result: 'no', moved: 0 };
    var room = st.slip.need[col] - st.slip.have[col];
    if (room <= 0) return { result: 'full', moved: 0 };
    if (!st.shelves[col]) return { result: 'air', moved: 0 };
    var k = Math.max(1, Math.min(n || 1, room, st.shelves[col]));
    st.shelves[col] -= k; st.slip.have[col] += k; for (var i = 0; i < k; i++) st.slip.log.push(col); st.verdict = null;
    return { result: 'moved', moved: k };
  }
  /* the last piece put on the slip goes back to its shelf */
  function fromSlip(st) {
    var log = st.slip.log;
    /* a full shelf takes nothing back */
    if (st.done || !log.length || st.shelves[log[log.length - 1]] >= SHELF_MAX) return false;
    var col = log.pop();
    st.slip.have[col]--; st.shelves[col]++; st.verdict = null;
    return col;
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

  /* Check: notes (no miss) for an unfilled slip, nothing typed, a shelf too full for one digit; then each digit against its shelf */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!slipFull(st)) return { result: 'note', key: 'hintSlip' };
    if (!st.typed) return { result: 'note', key: 'hintType' };
    var full = COLS.filter(function (c) { return st.shelves[c] >= TEN; });
    if (full.length) return { result: 'note', key: 'hintTooMany', cols: full };
    var left = String(value(st));
    var wrongs = COLS.filter(function (c) { return boxDigit(st.typed, c) !== boxDigit(left, c); });
    if (!wrongs.length) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { wrongs: wrongs };
    return { result: 'miss', wrong: wrongs[0], wrongs: wrongs };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) { if (!st.verdict) return null; return st.help ? 'hintNest' : 'hintCount'; }

  /* the written marks: strike-and-rewrite over each top digit, as the packages opened */
  function chains(a, regrouped, crates) {
    var out = {};
    COLS.forEach(function (c) {
      var ch = [digit(a, c)];
      if (c === 'T' && crates > 0) ch.push(digit(a, 'T') + TEN * crates);
      if (regrouped[c] !== ch[ch.length - 1]) ch.push(regrouped[c]);
      out[c] = ch;
    });
    return out;
  }
  /* what the child's openings did to the top number (shelves + what went to the slip) */
  function marks(st) {
    var R = {}; COLS.forEach(function (c) { R[c] = st.shelves[c] + st.slip.have[c]; });
    return chains(st.a, R, st.opened.H);
  }
  /* the written method's own regrouping, from the numbers alone (the gate checks it independently) */
  function truthMarks(a, b) {
    var R = { H: digit(a, 'H'), T: digit(a, 'T'), O: digit(a, 'O') }, crates = 0;
    if (R.O < digit(b, 'O')) {
      if (!R.T) { R.H--; R.T += TEN; crates = 1; }
      R.T--; R.O += TEN;
    }
    if (R.T < digit(b, 'T')) { R.H--; R.T += TEN; crates++; }
    return chains(a, R, crates);
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* order-only reshuffle: never the same order twice */
  function plan(face, rnd, prev) {
    rnd = rnd || Math.random;
    var R = rounds(face).map(function (r) { return r.k; });
    for (var a = 0; a < 2000; a++) { var o = shuffle(R, rnd); if (!prev || prev.join() !== o.join()) return { order: o }; }
    return { order: R.slice(1).concat(R[0]) };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { TUCK: TUCK, COLS: COLS, VAL: VAL, NEXT: NEXT, TEN: TEN, SHELF_MAX: SHELF_MAX, ONES: ONES, BIG: BIG, faceOf: faceOf, rounds: rounds, digit: digit, newState: newState, answer: answer, value: value, slipValue: slipValue, slipFull: slipFull, openCrate: openCrate, openBox: openBox, open: open, pack: pack, toSlip: toSlip, fromSlip: fromSlip, type: type, boxDigit: boxDigit, check: check, hint: hint, marks: marks, truthMarks: truthMarks, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NestedCratesCore = api;
})(typeof window !== 'undefined' ? window : this);

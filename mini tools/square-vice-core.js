/* =====================================================================
   square-vice-core.js — the model of THE SQUARE VICE (row 145, "Tuck
   Makes a Hundred", 2.NBT.B.7; G2-203, G3-357/359/361/363). Pure, no DOM.
   Design: docs/activities-rebuild/designs/145-place-value-regroup.md
   ---------------------------------------------------------------------
   Three bays hold the blocks of both numbers: flats (hundreds), rods
   (tens), cubes (ones). The child moves pieces of ONE kind onto the bed
   of Tuck's vice and cranks the jaw down. The jaw stops on top of the
   stack; its catch drops into the notch only when the stack is exactly
   ten high — ten rods stacked are as tall as one rod is long, a square,
   a hundred. Nine leave a bare stripe, eleven stick out: no lock. A lock
   empties the bed and puts one new piece of the next place in the next
   bay. Cranking UP splits a single rod or flat on the bed back into ten.
   The child types the total; Check refuses while a bay holds ten or
   more (one digit cannot describe it), then compares each digit box with
   the bay above it.
   Faces: no trade needed · tens make a hundred (default, the frozen
   eight) · ones and tens both trade.
   ===================================================================== */
(function (root) {
  'use strict';

  var TUCK = 'pets/hamster';
  var COLS = ['H', 'T', 'O'], UP = { O: 'T', T: 'H' }, DOWN = { T: 'O', H: 'T' }, VAL = { H: 100, T: 10, O: 1 };
  /* a bay never holds more than nineteen (a split that would overfill it is refused) */
  var LOCK = 10, BED_MAX = 12, BAY_MAX = 19;
  /* tens make a hundred: the old activity's eight rounds — four leave exactly ten tens, four leave eleven */
  var HUNDRED = [[160, 50], [280, 30], [340, 70], [320, 80], [450, 60], [130, 70], [410, 90], [240, 60]];
  /* no trade needed (G2-203): no kind ever reaches ten */
  var NONE = [[34, 25], [52, 36], [234, 52], [312, 46], [125, 63], [451, 127], [206, 81], [343, 215]];
  /* ones and tens both trade (G3-359 / G3-361) */
  var BOTH = [[268, 157], [349, 276], [185, 237], [456, 178], [297, 135], [374, 159], [168, 284], [529, 193]];

  function faceOf(v) { return v === 'none' || v === 'both' ? v : 'hundred'; }
  function table(face) { return face === 'none' ? NONE : face === 'both' ? BOTH : HUNDRED; }
  function rounds(face) { return table(faceOf(face)).map(function (r, i) { return { k: i, a: r[0], b: r[1] }; }); }
  function digit(n, col) { return Math.floor(n / VAL[col]) % 10; }

  /* ---------- state ---------- */
  function newState(face, k) {
    face = faceOf(face);
    var rd = rounds(face)[k], bays = { H: [], T: [], O: [] };
    COLS.forEach(function (c) {
      for (var i = 0; i < digit(rd.a, c); i++) bays[c].push('a');
      for (var j = 0; j < digit(rd.b, c); j++) bays[c].push('b');
    });
    return { face: face, k: k, a: rd.a, b: rd.b, bays: bays, bed: { kind: null, pieces: [] }, typed: '', misses: 0, help: false, verdict: null, done: false, locks: { O: 0, T: 0 } };
  }
  function total(st) { return st.a + st.b; }
  /* what a bay holds, counting the pieces lifted from it onto the bed */
  function count(st, col) { return st.bays[col].length + (st.bed.kind === col ? st.bed.pieces.length : 0); }
  function value(st) { return COLS.reduce(function (s, c) { return s + count(st, c) * VAL[c]; }, 0); }
  function describable(st, col) { return count(st, col) <= 9; }

  /* ---------- the hand ---------- */
  /* lift up to n pieces of one kind from a bay onto the bed; a flat only alone (to split it) */
  function load(st, col, n) {
    if (st.done || COLS.indexOf(col) < 0) return 0;
    var bed = st.bed;
    if (bed.kind && bed.kind !== col) return 0;
    var room = col === 'H' ? 1 - bed.pieces.length : BED_MAX - bed.pieces.length;
    var k = Math.max(0, Math.min(n || 1, room, st.bays[col].length));
    /* the oldest pieces go first, so a piece made in the vice stays in its bay as long as it can */
    for (var i = 0; i < k; i++) bed.pieces.push(st.bays[col].shift());
    if (k) { bed.kind = col; st.verdict = null; }
    return k;
  }
  /* the top piece goes back to its bay */
  function unload(st) {
    var bed = st.bed;
    if (st.done || !bed.pieces.length) return false;
    st.bays[bed.kind].push(bed.pieces.pop());
    if (!bed.pieces.length) bed.kind = null;
    st.verdict = null;
    return true;
  }
  /* the crank: the jaw stops on the stack; the catch drops into the notch only at exactly ten */
  function crankDown(st) {
    var bed = st.bed, n = bed.pieces.length;
    if (st.done || !n || bed.kind === 'H') return { result: 'none', stop: n };
    if (n < LOCK) return { result: 'short', stop: n, bare: LOCK - n };
    if (n > LOCK) return { result: 'tall', stop: n, over: n - LOCK };
    var from = bed.kind, to = UP[from];
    /* free play can fill a column; a lock never overfills the next one */
    if (st.bays[to].length >= BAY_MAX) return { result: 'none', stop: n };
    bed.pieces = []; bed.kind = null;
    st.bays[to].push('made'); st.locks[from]++; st.verdict = null;
    return { result: 'lock', stop: n, from: from, to: to };
  }
  /* cranking up: a single rod or flat on the bed splits back into ten of the place below */
  function crankUp(st) {
    var bed = st.bed;
    if (st.done || bed.pieces.length !== 1 || !DOWN[bed.kind] || st.bays[DOWN[bed.kind]].length + LOCK > BAY_MAX) return { result: 'none' };
    var from = bed.kind, to = DOWN[from], src = bed.pieces.pop();
    bed.kind = null;
    for (var i = 0; i < LOCK; i++) st.bays[to].push(src);
    if (src === 'made' && st.locks[to] > 0) st.locks[to]--;
    st.verdict = null;
    return { result: 'split', from: from, to: to };
  }
  /* a carry mark stands over a column once the vice has locked a piece into it (and it has not been split again) */
  function carry(st, col) { return (col === 'T' ? st.locks.O : col === 'H' ? st.locks.T : 0) > 0; }
  /* digits land right-aligned; no leading zero */
  function type(st, d) {
    if (st.done) return false;
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); st.verdict = null; return true; }
    if (!/^[0-9]$/.test(d) || st.typed.length >= 3 || (d === '0' && !st.typed)) return false;
    st.typed += d; st.verdict = null;
    return true;
  }
  /* the typed digit standing under a column ('' when the number is shorter) */
  function boxDigit(s, col) { var i = s.length - 1 - COLS.slice().reverse().indexOf(col); return i >= 0 ? s.charAt(i) : ''; }
  function truthDigit(st, col) { var t = String(total(st)); return boxDigit(t, col); }

  /* Check: a gentle note (no miss), a bay too full for one digit (no miss), or each box against its bay */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!st.typed) return { result: 'note', key: 'hintType' };
    var full = COLS.filter(function (c) { return !describable(st, c); });
    if (full.length) return { result: 'note', key: 'hintTooMany', tooMany: full[0], cols: full };
    /* every bay holds one digit's worth now, so what lies in the bays IS a number: each box against it */
    var lying = String(value(st));
    var wrongs = COLS.filter(function (c) { return boxDigit(st.typed, c) !== boxDigit(lying, c); });
    if (!wrongs.length) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { wrongs: wrongs };
    return { result: 'miss', wrong: wrongs[0], wrongs: wrongs };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) { if (!st.verdict) return null; return st.help ? 'hintShow' : 'hintCount'; }
  /* how many locks a round needs: ones first (the order of the written method), then tens */
  function needs(a, b) {
    var o = digit(a, 'O') + digit(b, 'O'), co = o >= 10 ? 1 : 0, t = digit(a, 'T') + digit(b, 'T') + co;
    return { O: co, T: t >= 10 ? 1 : 0 };
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* an exactly-ten round: the tens make a hundred with none left over */
  function exactTen(face, k) { var r = rounds(face)[k]; return faceOf(face) === 'hundred' && digit(r.a, 'T') + digit(r.b, 'T') === 10; }
  /* order-only reshuffle: never the same order twice; the default face never opens with two exactly-ten rounds */
  function plan(face, rnd, prev) {
    rnd = rnd || Math.random; face = faceOf(face);
    var R = rounds(face).map(function (r) { return r.k; });
    for (var a = 0; a < 2000; a++) {
      var o = shuffle(R, rnd);
      if (exactTen(face, o[0]) && exactTen(face, o[1])) continue;
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: R.slice(1).concat(R[0]) };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { TUCK: TUCK, COLS: COLS, UP: UP, DOWN: DOWN, VAL: VAL, LOCK: LOCK, BED_MAX: BED_MAX, BAY_MAX: BAY_MAX, HUNDRED: HUNDRED, NONE: NONE, BOTH: BOTH, faceOf: faceOf, rounds: rounds, digit: digit, newState: newState, total: total, count: count, value: value, describable: describable, load: load, unload: unload, crankDown: crankDown, crankUp: crankUp, carry: carry, type: type, boxDigit: boxDigit, truthDigit: truthDigit, check: check, hint: hint, needs: needs, exactTen: exactTen, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SquareViceCore = api;
})(typeof window !== 'undefined' ? window : this);

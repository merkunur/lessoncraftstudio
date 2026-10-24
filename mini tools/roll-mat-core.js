/* =====================================================================
   roll-mat-core.js — the model of ACTIVITY #96, THE ROLL-UP MATS ("Tuck's
   Ten Bundles — Add with Regrouping", 1.NBT.C.4 with the 2.NBT.B.5 / B.7
   column faces). Pure, no DOM.
   Design: docs/activities-rebuild/designs/096-place-value-regroup.md
   ---------------------------------------------------------------------
   Every column of the bench has a mat with exactly TEN wells, and the
   tenth well hangs out over that column's answer box: while a mat is full
   its tenth block lies on the box and the box cannot be written in. A full
   mat is rolled up into one ten (or a hundred) that can only go next door:
   it lands on the next column's shelf, and the shelf rod covers that box
   too until it is dropped into the mat. Taking away: a ten pulled down
   from next door unrolls into a full mat of ten. A box opens only when its
   own column AND every column to its right is settled (nothing waiting in
   the bin, on the doorstep, on the shelf, no full mat) — so the boxes open
   right to left by themselves. Faces: + one digit (one total box), two
   digits, three digits; way add / take away / both.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RollMatCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var FACES = ['add1', 'col2', 'col3'], WAYS = ['add', 'sub', 'both'];
  var COLS = { add1: ['T', 'O'], col2: ['T', 'O'], col3: ['H', 'T', 'O'] }, UNIT = { H: 100, T: 10, O: 1 };
  var ROUNDS = {
    add1: { add: [[27, 5], [48, 6], [36, 7], [19, 4], [55, 8], [63, 9], [74, 8], [28, 6], [46, 4], [42, 5]],
            sub: [[32, 5], [54, 6], [43, 7], [23, 4], [63, 8], [72, 9], [81, 3], [50, 6], [47, 5], [68, 4]] },
    col2: { add: [[38, 25], [47, 36], [29, 44], [56, 28], [15, 67], [64, 17], [52, 34], [45, 45]],
            sub: [[52, 17], [63, 29], [71, 46], [84, 39], [45, 18], [90, 34], [76, 32], [60, 23]] },
    col3: { add: [[247, 135], [368, 154], [456, 273], [189, 236], [305, 478], [625, 193], [432, 215], [199, 201]],
            sub: [[452, 127], [634, 281], [503, 168], [721, 345], [860, 412], [915, 308], [586, 243], [400, 156]] }
  };
  var TUCK = ['pets', 'hamster'];   /* pets/gerbil is a near-twin — never used */

  function faceOf(f) { return FACES.indexOf(f) >= 0 ? f : 'add1'; }
  function wayOf(w) { return WAYS.indexOf(w) >= 0 ? w : 'add'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the digit of n in column c */
  function digit(n, c) { return Math.floor(n / UNIT[c]) % 10; }
  /* a round id is 'a3' (add, row 3) or 's3' (take away, row 3) */
  function ids(face, way) {
    face = faceOf(face); way = wayOf(way); var out = [], i;
    if (way !== 'sub') for (i = 0; i < ROUNDS[face].add.length; i++) out.push('a' + i);
    if (way !== 'add') for (i = 0; i < ROUNDS[face].sub.length; i++) out.push('s' + i);
    return out;
  }
  /* what kind of regrouping the round needs: 'none', 'O' (ones only), 'T' (tens only), 'OT' (both), with the ones exactly ten marked */
  function regroups(a, b, op, cols) {
    var out = [], i, carry = 0;
    if (op === '+') { for (i = cols.length - 1; i >= 0; i--) { var s = digit(a, cols[i]) + digit(b, cols[i]) + carry; carry = s >= 10 ? 1 : 0; if (carry) out.push(cols[i]); } }
    else { var borrow = 0; for (i = cols.length - 1; i >= 0; i--) { var d = digit(a, cols[i]) - borrow - digit(b, cols[i]); borrow = d < 0 ? 1 : 0; if (borrow) out.push(cols[i]); } }
    return out;
  }
  function round(face, id) {
    face = faceOf(face); var sub = id.charAt(0) === 's', row = ROUNDS[face][sub ? 'sub' : 'add'][+id.slice(1)], cols = COLS[face];
    var a = row[0], b = row[1], op = sub ? '-' : '+', c = sub ? a - b : a + b;
    return { face: face, id: id, op: op, a: a, b: b, c: c, cols: cols.slice(), total: face === 'add1', regroup: regroups(a, b, op, cols) };
  }
  function newState(r) {
    var cols = {}, bin = {}, away = {}, written = {}, got = {}, lost = {};
    r.cols.forEach(function (c) {
      var n = digit(r.a, c), mat = []; for (var k = 0; k < n; k++) mat.push('a');
      cols[c] = { mat: mat, door: [], shelf: 0 }; bin[c] = r.op === '+' ? digit(r.b, c) : 0; away[c] = 0; written[c] = ''; got[c] = 0; lost[c] = 0;
    });
    return { r: r, cols: cols, bin: bin, away: away, written: written, total: '', got: got, lost: lost, rolls: 0, touched: false, misses: 0, show: 0, last: null, done: false };
  }
  function clear(st) { st.show = 0; st.last = null; st.touched = true; }
  function count(st, c) { return st.cols[c].mat.length + st.cols[c].door.length; }
  function leftOf(st, c) { var i = st.r.cols.indexOf(c); return i > 0 ? st.r.cols[i - 1] : null; }
  function rightOf(st, c) { var i = st.r.cols.indexOf(c); return i < st.r.cols.length - 1 ? st.r.cols[i + 1] : null; }
  function put(col, src) { if (col.mat.length < 10) col.mat.push(src); else col.door.push(src); }
  /* what is left on the bench, column by column */
  function value(st) { var v = 0; st.r.cols.forEach(function (c) { v += UNIT[c] * (count(st, c) + st.cols[c].shelf + (st.bin[c] || 0));   /* a rod on the shelf is ONE of that column (a ten on the tens shelf = 10) */ }); return v; }
  function awayValue(st) { var v = 0; st.r.cols.forEach(function (c) { v += UNIT[c] * st.away[c]; }); return v; }

  /* ---- the hand ---- */
  function pour(st, c) {
    if (st.done || st.r.op !== '+' || !st.bin[c]) return false;
    st.bin[c]--; put(st.cols[c], 'b'); clear(st); return true;
  }
  /* bring one of the second number's blocks back to the bin (the doorstep first) */
  function unpour(st, c) {
    if (st.done || st.r.op !== '+') return false;
    var col = st.cols[c], i = col.door.lastIndexOf('b');
    if (i >= 0) col.door.splice(i, 1);
    else { i = col.mat.lastIndexOf('b'); if (i < 0) return false; col.mat.splice(i, 1); if (col.door.length && col.mat.length < 10) col.mat.push(col.door.shift()); }
    st.bin[c]++; clear(st); return true;
  }
  /* roll a full mat into one ten (one hundred) that lands on the next column's shelf; the doorstep blocks tumble into the fresh mat */
  function roll(st, c) {
    var col = st.cols[c], L = leftOf(st, c);
    if (st.done || col.mat.length !== 10 || !L) return null;
    col.mat = []; st.cols[L].shelf++; st.got[L]++; st.rolls++;
    while (col.door.length && col.mat.length < 10) col.mat.push(col.door.shift());
    clear(st); return { to: L };
  }
  function dropShelf(st, c) {
    var col = st.cols[c]; if (st.done || !col.shelf) return false;
    col.shelf--; put(col, 'r'); clear(st); return true;
  }
  /* take away: pull one block down from next door; it unrolls into a full mat of ten, the blocks already there step onto the doorstep */
  function unroll(st, c) {
    var L = leftOf(st, c), col = st.cols[c];
    if (st.done || !L) return null;
    if (col.mat.length >= 10) return { result: 'full' };
    var from = st.cols[L];
    if (!from.mat.length && !from.door.length) return { result: 'empty', from: L };
    if (from.door.length) from.door.pop(); else from.mat.pop();
    col.door = col.door.concat(col.mat); col.mat = []; for (var k = 0; k < 10; k++) col.mat.push('r');
    st.lost[L]++; st.got[c]++; clear(st); return { result: 'unrolled', from: L };
  }
  function takeAway(st, c) {
    var col = st.cols[c]; if (st.done || st.r.op !== '-') return null;
    if (!col.mat.length && !col.door.length) return { result: 'empty' };
    if (col.door.length) col.door.pop(); else col.mat.pop();
    st.away[c]++; clear(st); return { result: 'taken' };
  }
  function giveBack(st, c) {
    if (st.done || st.r.op !== '-' || !st.away[c]) return false;
    st.away[c]--; put(st.cols[c], 'a'); clear(st); return true;
  }

  /* ---- the boxes ---- */
  /* a column is settled when nothing waits in its bin, on its doorstep or on its shelf, and its mat is not full */
  function settled(st, c) { var col = st.cols[c]; return !(st.bin[c] || 0) && !col.door.length && col.mat.length < 10 && !col.shelf; }
  /* covered: the full mat's tenth block or a shelf rod lies on the box */
  function covered(st, c) { var col = st.cols[c]; return col.mat.length >= 10 || col.shelf > 0; }
  function boxOpen(st, c) {
    if (st.r.total) { for (var k = 0; k < st.r.cols.length; k++) if (!settled(st, st.r.cols[k])) return false; return true; }
    var i = st.r.cols.indexOf(c); for (var j = i; j < st.r.cols.length; j++) if (!settled(st, st.r.cols[j])) return false;
    return true;
  }
  function write(st, c, d) {
    d = String(d); if (st.done || !/^[0-9]$/.test(d)) return false;
    if (st.r.total) {
      if (!boxOpen(st, null) || st.total.length >= 3 || (st.total === '' && d === '0')) return false;
      st.total += d; clear(st); return true;
    }
    if (!boxOpen(st, c) || st.written[c] !== '') return false;
    st.written[c] = d; clear(st); return true;
  }
  function del(st, c) {
    if (st.done) return false;
    if (st.r.total) { if (!st.total) return false; st.total = st.total.slice(0, -1); clear(st); return true; }
    if (!st.written[c]) return false; st.written[c] = ''; clear(st); return true;
  }

  /* ---- Check ---- */
  function check(st) {
    var r = st.r; if (st.done) return null;
    var none = null, i, c;
    if (!st.touched) none = r.op === '+' ? 'hintStart' : 'hintStartSub';
    else {
      if (r.op === '+' && r.cols.some(function (x) { return st.bin[x] > 0; })) none = 'hintStart';   /* blocks still in the bin: bring them over first */
      for (i = r.cols.length - 1; i >= 0 && !none; i--) if (!settled(st, r.cols[i])) { none = 'hintCovered'; st.coveredCol = r.cols[i]; }   /* ones first */
      if (!none) {
        var blank = r.total ? st.total === '' : r.cols.some(function (x) { return st.written[x] === ''; });
        if (blank) none = 'hintWrite';
      }
    }
    if (none) { st.last = { reason: 'none', hint: none, col: none === 'hintCovered' ? st.coveredCol : null }; return { result: 'none', hint: none }; }
    var kind = null, missCol = null;
    if (r.op === '-' && awayValue(st) !== r.b) kind = 'away';
    else {
      var want = String(r.c);
      if (r.total) { if (st.total !== want) { kind = 'digit'; for (i = r.cols.length - 1; i >= 0; i--) { c = r.cols[i]; var w = want.charAt(want.length - 1 - (r.cols.length - 1 - i)) || '', got = st.total.charAt(st.total.length - 1 - (r.cols.length - 1 - i)) || ''; if (w !== got) { missCol = c; break; } } if (!missCol) missCol = r.cols[0]; } }
      else for (i = r.cols.length - 1; i >= 0; i--) { c = r.cols[i]; if (st.written[c] !== String(digit(r.c, c))) { kind = 'digit'; missCol = c; break; } }
    }
    if (!kind) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok', rolls: st.rolls }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: kind, col: missCol };
    return { result: 'miss', kind: kind, col: missCol };
  }
  function hint(st) {
    var L = st.last; if (!L || L.reason === 'fair') return null;
    if (L.reason === 'none') return { key: L.hint, col: L.col };
    if (L.reason === 'away') return { key: 'hintAway', args: { b: st.r.b } };
    return { key: st.show >= 2 ? 'hintCount2' : 'hintCount', col: L.col };
  }
  /* the success line */
  function okKey(r) {
    if (r.op === '-') { if (!r.regroup.length) return 'okSub'; var t = r.regroup.indexOf('T') >= 0, o = r.regroup.indexOf('O') >= 0; return t && o ? 'okSubBoth' : t ? 'okSubHundred' : 'okSubRoll'; }
    if (!r.regroup.length) return 'okAddNone';
    var tt = r.regroup.indexOf('T') >= 0 && r.cols.indexOf('H') >= 0, oo = r.regroup.indexOf('O') >= 0;
    return tt && oo ? 'okAddBoth' : tt ? 'okAddHundred' : 'okAddRoll';
  }

  /* ---- order of a pass: never the previous pass; a round without regrouping is never first; never three of one way in a row ---- */
  function orderOk(face, order) {
    if (!order.length) return true;
    if (!round(face, order[0]).regroup.length) return false;
    for (var i = 2; i < order.length; i++) if (order[i].charAt(0) === order[i - 1].charAt(0) && order[i - 1].charAt(0) === order[i - 2].charAt(0) && ids(face, 'both').length === order.length) return false;
    return true;
  }
  function plan(face, way, rnd, prev) {
    var all = ids(face, way), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(face, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, TUCK: TUCK, COLS: COLS, UNIT: UNIT }, LOCALES: LOCALES, FACES: FACES, WAYS: WAYS,
    faceOf: faceOf, wayOf: wayOf, locale: locale, shuffle: shuffle, digit: digit, ids: ids, regroups: regroups, round: round, newState: newState,
    count: count, leftOf: leftOf, rightOf: rightOf, value: value, awayValue: awayValue,
    pour: pour, unpour: unpour, roll: roll, dropShelf: dropShelf, unroll: unroll, takeAway: takeAway, giveBack: giveBack,
    settled: settled, covered: covered, boxOpen: boxOpen, write: write, del: del, check: check, hint: hint, okKey: okKey, orderOk: orderOk, plan: plan, layout: layout
  };
});

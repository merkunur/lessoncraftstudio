/* =====================================================================
   skewer-plate-core.js — the model of THE SKEWER PLATE (row 138, "Build
   an Array", 2.OA.C.4; big arrays 3.OA.A.1 / 3.OA.C.7). Pure, no DOM.
   Design: docs/activities-rebuild/designs/138-array.md
   ---------------------------------------------------------------------
   Every row of the array is threaded on ONE skewer, so a row can only be
   lifted whole; the lifted skewers lie in the rack and their boxes are
   the repeated addition. Re-skewering turns the sticks the other way
   (rows ↔ columns) while no picture moves. Jobs: count (lift, write the
   addition and the total), build (grow the plate for a given sum), find
   (pick the plate that is r rows of c). Big arrays: tiles to 10 × 10,
   only the product typed.
   ===================================================================== */
(function (root) {
  'use strict';

  /* r rows of c */
  var COUNT = [[2, 3, 'fruits/strawberry'], [3, 4, 'fruits/raspberry'], [4, 2, 'fruits/kiwi'], [2, 5, 'fruits/lemon'], [3, 3, 'fruits/apple'], [5, 2, 'fruits/orange'], [4, 4, 'fruits/blueberry'], [4, 3, 'vegetables/tomato'], [3, 5, 'fruits/blackberry']];
  var FIND = [
    { t: [3, 4], plates: [[3, 4], [3, 5], [4, 4]] }, { t: [2, 5], plates: [[2, 4], [2, 5], [3, 5]] }, { t: [4, 3], plates: [[3, 3], [4, 2], [4, 3]] },
    { t: [2, 4], plates: [[2, 5], [2, 4], [3, 4]] }, { t: [3, 3], plates: [[2, 3], [3, 4], [3, 3]] }, { t: [4, 5], plates: [[4, 5], [4, 4], [3, 5]] },
    { t: [2, 3], plates: [[2, 4], [3, 3], [2, 3]] }, { t: [5, 2], plates: [[5, 2], [4, 2], [5, 3]] }, { t: [5, 4], plates: [[4, 4], [5, 4], [5, 3]] }
  ];
  var BIG = [[7, 2], [9, 3], [10, 4], [6, 5], [4, 6], [8, 7], [6, 8], [7, 9], [5, 10]];

  function jobOf(v) { return v === 'build' || v === 'find' ? v : 'count'; }
  function sizeOf(v) { return v === 'big' ? 'big' : 'pics'; }
  /* big arrays are a count job on tiles */
  function modeOf(job, size) { return sizeOf(size) === 'big' ? 'big' : jobOf(job); }
  function rounds(mode) { return mode === 'find' ? FIND : mode === 'big' ? BIG : COUNT; }
  function total(rd) { return rd[0] * rd[1]; }
  function sumText(r, c) { var a = []; for (var i = 0; i < r; i++) a.push(c); return a.join(' + '); }
  function rightIndex(f) { for (var i = 0; i < 3; i++) if (f.plates[i][0] === f.t[0] && f.plates[i][1] === f.t[1]) return i; return -1; }

  function newState(mode, k) {
    var st = { mode: mode, k: k, misses: 0, help: false, last: null, done: false };
    if (mode === 'find') { st.f = FIND[k]; st.chosen = null; return st; }
    var rd = rounds(mode)[k]; st.r = rd[0]; st.c = rd[1]; st.pic = rd[2] || null;
    if (mode === 'build') { st.b = { r: 0, c: 0 }; return st; }
    st.dir = 'rows'; st.lifted = []; st.boxes = {}; st.totalBox = ''; st.focus = null;
    return st;
  }
  /* the skewers of the plate: rows (each holds c) or columns (each holds r) */
  function skewers(st) { return st.dir === 'rows' ? st.r : st.c; }
  function holds(st) { return st.dir === 'rows' ? st.c : st.r; }
  /* the cells on skewer i: always a whole row or a whole column */
  function cellsOf(st, i) { var out = []; if (st.dir === 'rows') for (var c = 0; c < st.c; c++) out.push([i, c]); else for (var r = 0; r < st.r; r++) out.push([r, i]); return out; }
  function isLifted(st, i) { return st.lifted.indexOf(i) >= 0; }

  function lift(st, i) {
    if (st.mode !== 'count' && st.mode !== 'big') return 'no';
    if (i < 0 || i >= skewers(st) || isLifted(st, i)) return 'no';
    st.lifted.push(i); st.help = false; if (st.mode === 'count' && st.focus == null) st.focus = 'k' + i;
    return 'lifted';
  }
  function putBack(st, i) {
    if (!isLifted(st, i) || st.done) return 'no';
    st.lifted.splice(st.lifted.indexOf(i), 1); delete st.boxes[i]; st.help = false;
    if (st.focus === 'k' + i) st.focus = null;
    return 'back';
  }
  /* every skewer back on the plate, the sticks turned the other way; no picture moves */
  function reskewer(st) {
    if ((st.mode !== 'count' && st.mode !== 'big') || st.done) return 'no';
    st.lifted = []; st.boxes = {}; st.focus = null; st.help = false;
    st.dir = st.dir === 'rows' ? 'cols' : 'rows';
    return 'turned';
  }
  function focus(st, key) { if (st.mode !== 'count' && st.mode !== 'big') return 'no'; if (key === 'total' || (/^k\d+$/.test(key) && isLifted(st, +key.slice(1)))) { st.focus = key; return 'focus'; } return 'no'; }
  function type(st, d) {
    if (st.done || !/^\d$/.test(String(d))) return 'no';
    var key = st.mode === 'big' ? 'total' : st.focus; if (!key) return 'no';
    var cur = key === 'total' ? st.totalBox : (st.boxes[+key.slice(1)] || '');
    if (cur === '0') cur = '';
    if (cur.length >= (key === 'total' ? 3 : 2)) return 'full';
    cur += d; st.help = false;
    if (key === 'total') st.totalBox = cur; else st.boxes[+key.slice(1)] = cur;
    return 'typed';
  }
  function del(st) {
    if (st.done) return 'no';
    var key = st.mode === 'big' ? 'total' : st.focus; if (!key) return 'no';
    if (key === 'total') { if (!st.totalBox) return 'no'; st.totalBox = st.totalBox.slice(0, -1); }
    else { var i = +key.slice(1); if (!st.boxes[i]) return 'no'; st.boxes[i] = st.boxes[i].slice(0, -1); }
    st.help = false; return 'del';
  }
  /* build: whole rows and whole columns only */
  function step(st, axis, d) {
    if (st.mode !== 'build' || st.done) return 'no';
    var v = st.b[axis] + d; if (v < 0 || v > 5) return 'no';
    st.b[axis] = v; st.help = false; return 'step';
  }
  function pick(st, i) { if (st.mode !== 'find' || st.done || i < 0 || i > 2) return 'no'; st.chosen = i; st.help = false; return 'pick'; }

  function miss(st, kind, extra) { st.misses++; st.help = st.misses >= 2; st.last = { result: kind }; if (extra) for (var k in extra) st.last[k] = extra[k]; return st.last; }
  function check(st) {
    if (st.done) return { result: 'done' };
    var t = st.r * st.c;
    if (st.mode === 'find') {
      if (st.chosen == null) { st.last = { result: 'noPick' }; return st.last; }
      if (st.chosen === rightIndex(st.f)) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
      var p = st.f.plates[st.chosen]; return miss(st, 'tray', { r: p[0], c: p[1] });
    }
    if (st.mode === 'build') {
      if (!st.b.r || !st.b.c) { st.last = { result: 'emptyPlate' }; return st.last; }
      if (st.b.r === st.r && st.b.c === st.c) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
      if (st.b.r === st.c && st.b.c === st.r) return miss(st, 'turned');
      return miss(st, 'shape', { k: st.b.c });
    }
    if (st.mode === 'big') {
      if (!st.totalBox) { st.last = { result: 'emptyBox' }; return st.last; }
      if (+st.totalBox === t) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
      return miss(st, 'big');
    }
    if (!st.lifted.length) { st.last = { result: 'notLifted' }; return st.last; }
    if (st.lifted.length < skewers(st)) { st.last = { result: 'partly' }; return st.last; }
    for (var j = 0; j < st.lifted.length; j++) if (!st.boxes[st.lifted[j]]) { st.last = { result: 'emptyBox' }; return st.last; }
    if (!st.totalBox) { st.last = { result: 'emptyBox' }; return st.last; }
    for (var q = 0; q < st.lifted.length; q++) { var s = st.lifted[q]; if (+st.boxes[s] !== holds(st)) return miss(st, 'unequal', { bad: s }); }
    var tv = +st.totalBox;
    if (tv === t) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
    if (tv === st.r + st.c || tv === st.r + st.c - 1) return miss(st, 'edges');
    return miss(st, 'total');
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    switch (L.result) {
      case 'notLifted': return 'hLift';
      case 'partly': return 'hPartly';
      case 'emptyBox': return 'hBoxes';
      case 'emptyPlate': return 'hBuild';
      case 'noPick': return 'hPick';
      case 'unequal': return st.help ? 'missUnequal2' : 'missUnequal';
      case 'edges': return 'missEdges';
      case 'total': return st.help ? 'missTotal2' : 'missTotal';
      case 'shape': return st.help ? 'missShape2' : 'missShape';
      case 'turned': return st.help ? 'missShape2' : 'missTurned';
      case 'tray': return st.help ? 'missFind2' : 'missFind';
      case 'big': return st.help ? 'missTotal2' : 'missBig';
    }
    return null;
  }

  /* ---------- the order ---------- */
  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  function totalOf(mode, k) { var rd = rounds(mode)[k]; return mode === 'find' ? rd.t[0] * rd.t[1] : rd[0] * rd[1]; }
  /* a fresh order every pass, never two rounds with the same total in a row */
  function plan(mode, rnd, prev) {
    rnd = rnd || Math.random; var n = rounds(mode).length, ids = []; for (var i = 0; i < n; i++) ids.push(i);
    for (var a = 0; a < 20000; a++) {
      var o = shuffle(ids, rnd); if (prev && prev.join() === o.join()) continue;
      var ok = true; for (var j = 1; j < n; j++) if (totalOf(mode, o[j]) === totalOf(mode, o[j - 1])) { ok = false; break; }
      if (ok) return { order: o };
    }
    return { order: ids };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { COUNT: COUNT, FIND: FIND, BIG: BIG, jobOf: jobOf, sizeOf: sizeOf, modeOf: modeOf, rounds: rounds, total: total, sumText: sumText, rightIndex: rightIndex, newState: newState, skewers: skewers, holds: holds, cellsOf: cellsOf, isLifted: isLifted, lift: lift, putBack: putBack, reskewer: reskewer, focus: focus, type: type, del: del, step: step, pick: pick, check: check, hint: hint, plan: plan, totalOf: totalOf, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SkewerPlateCore = api;
})(typeof window !== 'undefined' ? window : this);

/* =====================================================================
   ten-band-core.js — the model of ACTIVITY #94, THE TEN-POCKET BAND
   ("Bundle Bot — Make a Ten from Ten Ones", 1.NBT.B.2.a with 2.b, 2.c).
   Pure, no DOM. Design sheet: docs/activities-rebuild/designs/094-bundle-bot.md
   ---------------------------------------------------------------------
   Bolt's machine: a hopper drops clumps of 1–3 cubes onto a press plate;
   the child's lever wraps a band with exactly TEN pockets around the loose
   cubes — ten clasps into one ten (it rolls to the rack); fewer leaves
   empty pockets and the band springs open; more and the extras are pushed
   back out. A ten carried back to the plate is snipped open, pocket by
   pocket, into ten loose cubes — the number unchanged. Round types: build
   (make n), decade, impostor (a near-ten scatter of nine), overfill (clumps
   of three), unbundle (keep n, but loose ones are needed), read (how many
   cubes?) and tens (bundle every ten you can, then fill in tens and ones).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TenBandCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var RANGES = ['49', '99'], GAPS = ['show', 'spring'], CAP = { '49': 4, '99': 9 };
  var COLS = 10, ROWS = 5;   /* the plate is a 10 × 5 field of cells; a cube jitters inside its own cell, so cubes never overlap and never line up into a frame */
  /* [type, target, startRack, startPlate, clumps, extra] — extra = the loose ones asked for (unbundle) */
  var ROUNDS = {
    '49': [['build', 23, 0, 0, [1, 2, 3]], ['build', 34, 0, 0, [1, 2, 3]], ['unbundle', 32, 3, 2, [], 12], ['impostor', 29, 1, 9, [1, 2, 3]], ['decade', 40, 0, 0, [1, 2, 3]],
      ['read', 24, 2, 4, []], ['overfill', 36, 0, 0, [3]], ['build', 45, 0, 0, [1, 2, 3]], ['build', 27, 0, 0, [1, 2, 3]], ['tens', 37, 0, 37, []], ['read', 25, 1, 15, []]],
    '99': [['build', 58, 0, 0, [1, 2, 3]], ['build', 63, 0, 0, [1, 2, 3]], ['decade', 70, 0, 0, [1, 2, 3]], ['unbundle', 51, 5, 1, [], 11], ['impostor', 79, 6, 9, [1, 2, 3]],
      ['read', 75, 7, 5, []], ['overfill', 47, 0, 0, [3]], ['tens', 46, 0, 46, []], ['read', 64, 5, 14, []], ['build', 81, 0, 0, [1, 2, 3]]]
  };
  var BOT = ['toys', 'robot'];

  function rangeOf(r) { r = String(r); return RANGES.indexOf(r) >= 0 ? r : '49'; }
  function gapsOf(g) { return GAPS.indexOf(g) >= 0 ? g : 'show'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(range) { var n = ROUNDS[rangeOf(range)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function round(range, idx) {
    range = rangeOf(range);
    var row = ROUNDS[range][idx];
    return { range: range, idx: idx, type: row[0], n: row[1], t: Math.floor(row[1] / 10), o: row[1] % 10, startRack: row[2], startPlate: row[3], clumps: row[4].slice(), extra: row[5] || 0, cap: CAP[range],
      material: row[4].length === 0 /* the cubes are given: no hopper, no take-out */ };
  }
  /* ---- the plate: cubes in cells, with a jitter ---- */
  function freeCells(plate) { var used = {}, out = [], i; for (i = 0; i < plate.length; i++) used[plate[i].c] = 1; for (i = 0; i < COLS * ROWS; i++) if (!used[i]) out.push(i); return out; }
  function cube(c, rnd) { return { c: c, jx: (rnd() - 0.5) * 0.36, jy: (rnd() - 0.5) * 0.36 }; }
  /* drop k cubes as one clump: neighbouring free cells around a random free cell */
  function drop(plate, k, rnd) {
    var free = freeCells(plate); if (free.length < k) return null;
    var seed = free[Math.floor(rnd() * free.length)], picked = [seed], i;
    while (picked.length < k) {
      var best = null, bd = 1e9;
      for (i = 0; i < free.length; i++) { var f = free[i]; if (picked.indexOf(f) >= 0) continue; var d = Math.min.apply(null, picked.map(function (p) { return Math.abs(f % COLS - p % COLS) + Math.abs(Math.floor(f / COLS) - Math.floor(p / COLS)); })) + rnd() * 0.5; if (d < bd) { bd = d; best = f; } }
      picked.push(best);
    }
    return picked.map(function (c) { return cube(c, rnd); });
  }
  function scatter(n, rnd) { var p = []; while (p.length < n) { var add = drop(p, 1, rnd); if (!add) break; p = p.concat(add); } return p; }
  /* the impostor's nine: two rows of five with one missing in the middle — the scatter that looks most like ten */
  function nearTen(rnd) { var cells = [2, 3, 4, 5, 6, 12, 13, 15, 16]; return cells.map(function (c) { return cube(c, rnd); }); }

  function newState(r, rnd) {
    rnd = rnd || Math.random;
    var plate = r.type === 'impostor' ? nearTen(rnd) : scatter(r.startPlate, rnd);
    return { r: r, rack: r.startRack, plate: plate, clumpIdx: 0, typed: '', slots: { t: '', o: '' }, misses: 0, show: 0, last: null, done: false, pulls: 0, snips: 0, rnd: rnd };
  }
  function clear(st) { st.show = 0; st.last = null; }
  function value(st) { return 10 * st.rack + st.plate.length; }
  /* tap the hopper: the round's next clump, cycling */
  function hopper(st) {
    var r = st.r; if (st.done || r.material || !r.clumps.length) return null;
    var k = r.clumps[st.clumpIdx % r.clumps.length], add = drop(st.plate, k, st.rnd); if (!add) return null;
    st.plate = st.plate.concat(add); st.clumpIdx++; clear(st); return { k: k, cells: add.map(function (c) { return c.c; }) };
  }
  function takeOut(st) { if (st.done || st.r.material || !st.plate.length) return false; st.plate = st.plate.slice(0, -1); clear(st); return true; }
  /* pull the lever: the band takes the first ten cubes left to right; exactly ten pockets */
  function bandOrder(plate) { return plate.map(function (c, i) { return i; }).sort(function (a, b) { var ca = plate[a].c, cb = plate[b].c; return (ca % COLS) - (cb % COLS) || Math.floor(ca / COLS) - Math.floor(cb / COLS); }); }
  function pull(st) {
    if (st.done || st.r.type === 'read') return null;
    if (st.rack >= st.r.cap) return { result: 'stiff' };
    var n = st.plate.length; st.pulls++;
    if (n < 10) return { result: 'spring', filled: n, empty: 10 - n };
    var order = bandOrder(st.plate), take = order.slice(0, 10), keep = st.plate.filter(function (c, i) { return take.indexOf(i) < 0; });
    st.plate = keep; st.rack++; clear(st);
    return { result: 'clunk', squeezed: n - 10, taken: take };
  }
  /* snip a ten carried back to the plate: ten loose cubes, the number unchanged */
  function snip(st) {
    if (st.done || st.r.type === 'read' || st.rack < 1) return null;
    var add = []; for (var k = 0; k < 10; k++) { var a = drop(st.plate.concat(add), 1, st.rnd); if (!a) return null; add = add.concat(a); }
    st.rack--; st.plate = st.plate.concat(add); st.snips++; clear(st); return { added: 10 };
  }
  function type(st, d) {
    if (st.done || st.r.type !== 'read') return false;
    d = String(d); if (!/^[0-9]$/.test(d) || st.typed.length >= 2 || (st.typed === '' && d === '0')) return false;
    st.typed += d; clear(st); return true;
  }
  function del(st) { if (st.done || st.r.type !== 'read' || !st.typed) return false; st.typed = st.typed.slice(0, -1); clear(st); return true; }
  function setSlot(st, which, d) {
    if (st.done || st.r.type !== 'tens' || (which !== 't' && which !== 'o')) return false;
    d = d === '' ? '' : String(d); if (d !== '' && !/^[0-9]$/.test(d)) return false;
    if (st.slots[which] === d) return false;
    st.slots[which] = d; clear(st); return true;
  }

  function check(st) {
    var r = st.r; if (st.done) return null;
    var none = null, ok = false, kind = 'other';
    if (r.type === 'read') { if (!st.typed) none = 'hintType'; }
    else if (r.type === 'tens') { if (st.slots.t === '' || st.slots.o === '') none = 'hintSlots'; }
    else if (r.type !== 'unbundle' && st.rack === r.startRack && st.plate.length === r.startPlate && st.pulls === 0 && st.snips === 0 && r.startPlate + r.startRack === 0) none = 'hintStart';
    if (none) { st.last = { reason: 'none', hint: none }; return { result: 'none', hint: none }; }
    if (r.type === 'read') { ok = +st.typed === r.n; kind = 'readWrong'; }
    else if (r.type === 'tens') {
      var right = +st.slots.t === r.t && +st.slots.o === r.o;
      ok = right && st.plate.length < 10;
      kind = right ? 'tenHiding' : 'slotsWrong';
    } else if (r.type === 'unbundle') {
      ok = st.rack === r.t - 1 && st.plate.length === r.o + 10;
      kind = st.rack < r.t - 1 || st.plate.length >= r.o + 20 ? 'tenHiding' : 'notUnbundled';   /* snipped too many: a ten to bundle back up */
    } else {
      var v = value(st);
      if (v === r.n && st.plate.length < 10) ok = true;
      else if (v === r.n) kind = 'tenHiding';
      else if (st.plate.length >= 10) kind = 'tenHiding';
      else kind = st.rack > r.t ? 'tooManyTens' : st.rack < r.t ? 'tooFewTens' : 'onesWrong';
    }
    if (ok) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: kind };
    return { result: 'miss', kind: kind, value: value(st) };
  }
  function hint(st) {
    var L = st.last, r = st.r; if (!L || L.reason === 'fair') return null;
    if (L.reason === 'none') return { key: L.hint };
    if (st.show >= 2) return { key: 'hintStrong' };
    if (L.reason === 'tenHiding') return { key: 'hintHiding' };
    if (r.type === 'read' || r.type === 'tens') return { key: 'hintTensByTens' };
    if (r.type === 'unbundle') return { key: 'hintSnip' };
    if (r.type === 'impostor' && st.misses === 1) return { key: 'hintImpostor' };
    return { key: 'hintCount' };
  }
  /* the right end state of a round (the oracle's twin, for the screens) */
  function goal(r) { return r.type === 'unbundle' ? { rack: r.t - 1, plate: r.o + 10 } : { rack: r.t, plate: r.o }; }

  /* ---- order: never the previous pass; no two neighbours of the same type; no two read rounds side by side ---- */
  function orderOk(range, order) {
    for (var i = 1; i < order.length; i++) { var a = round(range, order[i - 1]), b = round(range, order[i]); if (a.type === b.type) return false; }
    return true;
  }
  function plan(range, rnd, prev) {
    var all = ids(range), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(range, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, BOT: BOT }, LOCALES: LOCALES, RANGES: RANGES, GAPS: GAPS, CAP: CAP, COLS: COLS, ROWS: ROWS,
    rangeOf: rangeOf, gapsOf: gapsOf, locale: locale, ids: ids, shuffle: shuffle, round: round, freeCells: freeCells, drop: drop, scatter: scatter, nearTen: nearTen,
    newState: newState, value: value, hopper: hopper, takeOut: takeOut, bandOrder: bandOrder, pull: pull, snip: snip, type: type, del: del, setSlot: setSlot,
    check: check, hint: hint, goal: goal, orderOk: orderOk, plan: plan, layout: layout
  };
});

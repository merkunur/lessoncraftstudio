/* =====================================================================
   one-hop-core.js — the model of ACTIVITY #100 of the one-by-one
   rebuild: "Inchie's Garden Path" → THE ONE-HOP HELPERS (1.MD.A.2).
   Pure, no DOM. Design: docs/activities-rebuild/designs/100-lay-units.md
   ---------------------------------------------------------------------
   The child lays identical helpers end to end under an object, from the
   start stone at its tip. Inchie can only hop exactly ONE helper long, so
   counting by tapping makes her hop along them — a gap, an overlap, a
   helper of another size, a crooked start or a helper past the end makes
   her land in the wrong place. Only a clean row lets her reach the end;
   then the child writes how many hops it took. All positions are in
   EIGHTHS of a unit (the old data's 3/8 start offsets survive exactly);
   laying snaps to quarters and clicks flush within an eighth.
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OneHopCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var E8 = 8;          /* eighths per unit */
  var LMAX = 6;        /* every bed is drawn for six units, so a unit has one size in every round */
  /* the objects: [theme, picture] — all lie flat in their drawings (opened); chosen by measured ink aspect */
  var OBJ = {
    car: ['toys', 'car'], train: ['toys', 'train'], truck: ['toys', 'truck'], skateboard: ['vehicles', 'skateboard'],
    fish: ['animals', 'fish'], shoe: ['clothing', 'shoe'], snail: ['forest creatures', 'snail'], alligator: ['reptiles and amphibians', 'alligator'],
    caterpillar: ['forest creatures', 'caterpillar'], ferry: ['vehicles', 'ferry'], submarine: ['vehicles', 'submarine'], baguette: ['bakery', 'baguette']
  };
  /* measured ink boxes (scripts/worksheet-gen/data/art-extents.json: w, x, h, y as fractions of the square image) */
  var INK = {
    car: [0.951, 0.023, 0.608, 0.218], train: [0.953, 0.023, 0.704, 0.162], truck: [0.955, 0.021, 0.635, 0.21], skateboard: [0.937, 0.035, 0.359, 0.35],
    fish: [0.96, 0.02, 0.701, 0.161], shoe: [0.947, 0.027, 0.536, 0.268], snail: [0.951, 0.027, 0.712, 0.143], alligator: [0.947, 0.029, 0.528, 0.264],
    caterpillar: [0.964, 0.02, 0.709, 0.154], ferry: [0.942, 0.027, 0.519, 0.243], submarine: [0.945, 0.029, 0.513, 0.245], baguette: [0.954, 0.023, 0.393, 0.313]
  };
  var WORM = ['spring', 'worm'];

  /* lay and count: [id, object, L, pots (decoy width in eighths or 0), pre-laid helpers [[start, width]]] */
  var LAY = [
    ['A1', 'car', 4, 0, []], ['A2', 'fish', 3, 0, []], ['A3', 'shoe', 4, 12, []], ['A4', 'snail', 3, 0, [[3, 8]]],
    ['A5', 'ferry', 5, 0, []], ['A6', 'submarine', 5, 4, []], ['A7', 'skateboard', 6, 0, []]
  ];
  /* fix it: [id, object, L, fault, helpers] (the old prePlaced faults, positions ÷ 8 kept) */
  var FIX = [
    ['B1', 'alligator', 4, 'gap', [[0, 8], [8, 8], [16, 8], [26, 8]]],
    ['B2', 'car', 4, 'overlap', [[0, 8], [8, 8], [16, 8], [22, 8]]],
    ['B3', 'caterpillar', 3, 'gap', [[0, 8], [8, 8], [18, 8]]],
    ['B4', 'shoe', 4, 'past', [[0, 8], [8, 8], [16, 8], [24, 8], [32, 8]]],
    ['B5', 'train', 3, 'start', [[3, 8], [11, 8], [19, 8]]],
    ['B6', 'fish', 3, 'inside', [[0, 8], [8, 12]]],
    ['B7', 'ferry', 5, 'gap', [[0, 8], [10, 8], [16, 8], [24, 8], [32, 8]]]
  ];
  /* judge: [id, object, L, three tracks] — exactly one track is clean */
  var JUDGE = [
    ['J1', 'car', 4, [[[0, 8], [8, 8], [16, 12], [28, 8]], [[0, 8], [8, 8], [16, 8], [24, 8]], [[0, 8], [8, 8], [16, 8], [24, 8], [32, 8]]]],
    ['J2', 'shoe', 4, [[[0, 8], [8, 8], [16, 8], [24, 8]], [[2, 8], [10, 8], [18, 8], [26, 8]], [[0, 8], [8, 8], [20, 8], [28, 8]]]],
    ['J3', 'alligator', 4, [[[0, 8], [6, 8], [14, 8], [22, 8], [30, 8]], [[0, 8], [8, 8], [16, 8], [26, 8]], [[0, 8], [8, 8], [16, 8], [24, 8]]]]
  ];
  /* line up three: [id, [[object, L] × 3]] */
  var ORDER = [
    ['C1', [['fish', 3], ['car', 4], ['ferry', 5]]], ['C2', [['submarine', 5], ['snail', 3], ['shoe', 4]]], ['C3', [['skateboard', 6], ['alligator', 4], ['caterpillar', 3]]],
    ['C4', [['shoe', 4], ['baguette', 6], ['ferry', 5]]], ['C5', [['submarine', 5], ['train', 3], ['skateboard', 6]]], ['C6', [['car', 4], ['fish', 3], ['baguette', 6]]],
    ['C7', [['alligator', 4], ['ferry', 5], ['snail', 3]]]
  ];
  /* big and small: [id, object, small L] — big helpers are two units, so every L is even */
  var BIG = [['D1', 'car', 4], ['D2', 'shoe', 4], ['D3', 'skateboard', 6], ['D4', 'alligator', 4], ['D5', 'baguette', 6], ['D6', 'submarine', 4], ['D7', 'truck', 4]];
  var DATA = { E8: E8, LMAX: LMAX, OBJ: OBJ, INK: INK, WORM: WORM, LAY: LAY, FIX: FIX, JUDGE: JUDGE, ORDER: ORDER, BIG: BIG };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function jobOf(j) { return j === 'fix' || j === 'order' ? j : 'lay'; }
  function sizesOf(s) { return s === 'big' ? 'big' : 'one'; }
  /* the pool: lay (or big-and-small), fix + judge, order */
  function ids(job, sizes) {
    job = jobOf(job);
    if (job === 'fix') return FIX.map(function (r) { return r[0]; }).concat(JUDGE.map(function (r) { return r[0]; }));
    if (job === 'order') return ORDER.map(function (r) { return r[0]; });
    return (sizesOf(sizes) === 'big' ? BIG : LAY).map(function (r) { return r[0]; });
  }
  function find(tb, id) { for (var i = 0; i < tb.length; i++) if (tb[i][0] === id) return tb[i]; return null; }
  function hl(list) { return list.map(function (h) { return { p: h[0], w: h[1] }; }); }
  function round(id) {
    var row;
    if ((row = find(LAY, id))) return { id: id, kind: 'lay', obj: row[1], L: row[2], decoy: row[3], pre: hl(row[4]) };
    if ((row = find(FIX, id))) return { id: id, kind: 'fix', obj: row[1], L: row[2], fault: row[3], pre: hl(row[4]) };
    if ((row = find(JUDGE, id))) return { id: id, kind: 'judge', obj: row[1], L: row[2], tracks: row[3].map(hl) };
    if ((row = find(ORDER, id))) return { id: id, kind: 'order', objs: row[1].map(function (x) { return { obj: x[0], L: x[1] }; }) };
    if ((row = find(BIG, id))) return { id: id, kind: 'big', obj: row[1], L: row[2], pre: [] };
    return round('A1');
  }

  /* ---- where a hop lands: from a to b (eighths), on helpers H, for an object ending at E ---- */
  function sorted(H) { return H.slice().sort(function (x, y) { return x.p - y.p || x.w - y.w; }); }
  function classify(H, a, b, E, U, first) {
    if (!H.length) return { status: 'none' };
    /* the row must begin AT the stone, and nothing may lie behind it */
    if (first && (!H.some(function (h) { return h.p === 0; }) || H.some(function (h) { return h.p < 0; }))) return { status: 'start', bad: H.map(function (h, i) { return i; }).filter(function (i) { return H[i].p < 0 || (H[i].p !== 0 && H[i].p < U); }) };
    var i0 = -1; for (var i = 0; i < H.length; i++) if (H[i].p === a) { i0 = i; break; }
    if (i0 < 0) return { status: 'gap', at: a };
    var h0 = H[i0];
    /* another helper beginning inside the one she hops along: an overlap */
    for (var j = 0; j < H.length; j++) if (j !== i0 && H[j].p >= a && H[j].p < a + h0.w && !(H[j].p === a + h0.w)) return { status: 'overlap', bad: [i0, j] };
    if (h0.w !== U) return { status: 'inside', bad: [i0] };
    if (b === E) {
      for (var k = 0; k < H.length; k++) if (H[k].p + H[k].w > E) return { status: 'past', bad: [k] };
      return { status: 'end' };
    }
    if (b > E) return { status: 'past', bad: [i0] };
    if (H.some(function (h) { return h.p === b; })) return { status: 'seam' };
    if (H.some(function (h) { return h.p > b; })) return { status: 'gap', at: b };
    return { status: 'short' };
  }
  /* a row is CLEAN when Inchie hops from the stone to the end with every landing on a seam */
  function runOf(H, E, U) {
    var out = [], k = 0;
    for (var g = 0; g < 40; g++) {
      var r = classify(H, k * U, (k + 1) * U, E, U, k === 0); out.push(r);
      if (r.status !== 'seam') break; k++;
    }
    return out;
  }
  function clean(H, E, U) { var run = runOf(H, E, U); return run[run.length - 1].status === 'end'; }

  function newState(r, perm) {
    var st = { r: r, helpers: [], hops: 0, status: null, bad: [], typed: '', misses: 0, show: 0, last: null, done: false, phase: 0, bigN: null, track: null, runs: [null, null, null], perm: perm || [0, 1, 2], cur: 0, labels: [null, null, null], slots: [null, null, null], chosen: null };
    if (r.pre) st.helpers = r.pre.map(function (h) { return { p: h.p, w: h.w }; });
    return st;
  }
  /* order rounds: the queue is shuffled per showing (perm), and the bed measures the queue's card cur */
  function objOf(st) { var r = st.r; return r.kind === 'order' ? (st.cur < 3 ? r.objs[st.perm[st.cur]] : null) : r; }
  function unit(st) { return st.r.kind === 'big' && st.phase === 0 ? 2 * E8 : E8; }
  function target(st) { var o = objOf(st); return st.r.kind === 'big' && st.phase === 0 ? o.L / 2 : o.L; }
  function fixed(st) { return st.done || st.r.kind === 'judge' || (st.r.kind === 'order' && st.cur >= 3); }
  function resetHops(st) { st.hops = 0; st.status = null; st.bad = []; st.typed = ''; st.show = 0; st.last = null; }

  /* lay a helper of width w (eighths) near x (units): quarters, and a flush click within an eighth of an end or of the stone */
  function snap(st, x, w, skip) {
    var q = Math.round(x * 4) * 2, raw = x * E8, best = null, bd = 1.0001;
    var ends = [0]; st.helpers.forEach(function (h, i) { if (i !== skip) ends.push(h.p + h.w); });
    ends.forEach(function (e) { var d = Math.abs(raw - e); if (d <= bd) { bd = d; best = e; } });
    var p = best != null ? best : q, E = objOf(st).L * E8;
    return Math.max(-E8, Math.min(p, E + 2 * E8));
  }
  function lay(st, x, w) { if (fixed(st)) return -1; w = w || unit(st); st.helpers.push({ p: snap(st, x, w, -1), w: w }); resetHops(st); return st.helpers.length - 1; }
  /* the pot tapped (or Enter): a helper laid flush after the last one — at the stone if the path is empty */
  function append(st, w) { if (fixed(st)) return -1; w = w || unit(st); var end = 0; st.helpers.forEach(function (h) { end = Math.max(end, h.p + h.w); }); st.helpers.push({ p: end, w: w }); resetHops(st); return st.helpers.length - 1; }
  function move(st, i, x) { if (fixed(st) || !st.helpers[i]) return 'no'; st.helpers[i].p = snap(st, x, st.helpers[i].w, i); resetHops(st); return 'moved'; }
  function nudge(st, i, d) { if (fixed(st) || !st.helpers[i]) return 'no'; var E = objOf(st).L * E8; st.helpers[i].p = Math.max(-E8, Math.min(st.helpers[i].p + d * 2, E + 2 * E8)); resetHops(st); return 'moved'; }
  function remove(st, i) { if (fixed(st) || !st.helpers[i]) return 'no'; st.helpers.splice(i, 1); resetHops(st); return 'removed'; }
  /* one tap = one hop of exactly one helper (two for big helpers) */
  function hop(st) {
    if (st.done || st.r.kind === 'judge' || (st.r.kind === 'order' && st.cur >= 3)) return null;
    if (st.status && st.status !== 'seam') return null;
    var U = unit(st), E = objOf(st).L * E8, H = st.helpers;
    var r = classify(H, st.hops * U, (st.hops + 1) * U, E, U, st.hops === 0);
    if (r.status === 'none') { st.status = null; return r; }
    st.hops++; st.status = r.status; st.bad = r.bad || []; st.last = null;
    return r;
  }
  function home(st) { if (st.done) return 'no'; st.hops = 0; st.status = null; st.bad = []; return 'home'; }
  function canType(st) { return st.status === 'end' && !fixed(st); }
  function type(st, d) {
    if (!canType(st)) return 'no';
    if (d === 'del') { st.typed = ''; st.last = null; st.show = 0; return 'typed'; }
    st.typed = String(d); st.last = null; st.show = 0; return 'typed';
  }
  /* judge: run a track to its stop; choose it */
  function runTrack(st, t) { if (st.r.kind !== 'judge' || st.done) return null; var tr = st.r.tracks[st.perm[t]]; st.runs[t] = runOf(tr, st.r.L * E8, E8); return st.runs[t]; }
  function pickTrack(st, t) { if (st.r.kind !== 'judge' || st.done || !(t >= 0 && t < 3)) return 'no'; st.track = t; st.last = null; st.show = 0; return 'picked'; }
  function rightTrack(st) { for (var t = 0; t < 3; t++) if (clean(st.r.tracks[st.perm[t]], st.r.L * E8, E8)) return t; return -1; }
  /* order: a measured card onto a shelf slot */
  function chooseCard(st, i) { if (st.r.kind !== 'order' || st.cur < 3 || st.done || !(i >= 0 && i < 3)) return 'no'; st.chosen = i; st.last = null; st.show = 0; return 'chosen'; }
  function place(st, i, slot) {
    if (st.r.kind !== 'order' || st.cur < 3 || st.done || !(slot >= 0 && slot < 3) || !(i >= 0 && i < 3)) return 'no';
    var from = st.slots.indexOf(i); if (from === slot) return 'same';
    if (from >= 0) st.slots[from] = st.slots[slot]; st.slots[slot] = i; st.chosen = null; st.last = null; st.show = 0; return 'placed';
  }

  function check(st) {
    var r = st.r;
    if (st.done) return { result: 'ok' };
    if (r.kind === 'judge') {
      if (st.track == null) { st.last = { reason: 'none', hint: 'hintPickTrack' }; return { result: 'none', hint: 'hintPickTrack' }; }
      if (st.track === rightTrack(st)) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
      st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' }; st.track = null; return { result: 'miss' };
    }
    if (r.kind === 'order' && st.cur >= 3) {
      if (st.slots.some(function (x) { return x == null; })) { st.last = { reason: 'none', hint: 'hintFill' }; return { result: 'none', hint: 'hintFill' }; }
      var ok = st.slots.every(function (x, i) { return i === 0 || r.objs[st.perm[st.slots[i - 1]]].L <= r.objs[st.perm[x]].L; });
      if (ok) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
      st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' }; return { result: 'miss' };
    }
    if (st.status !== 'end') { st.last = { reason: 'none', hint: 'hintHop' }; return { result: 'none', hint: 'hintHop' }; }
    if (st.typed === '') { st.last = { reason: 'none', hint: 'hintWrite' }; return { result: 'none', hint: 'hintWrite' }; }
    if (+st.typed !== target(st)) { st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' }; return { result: 'miss' }; }
    /* right */
    if (r.kind === 'big' && st.phase === 0) { st.bigN = +st.typed; st.phase = 1; st.bigRow = st.helpers; st.helpers = []; resetHops(st); st.misses = 0; st.last = { reason: 'step' }; return { result: 'step' }; }
    if (r.kind === 'order') { st.labels[st.cur] = +st.typed; st.cur++; st.helpers = []; resetHops(st); st.misses = 0; st.last = { reason: 'step' }; return { result: 'step' }; }
    st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' };
  }
  /* hints never print the number: they point at the hops, the helpers, the rows, the labels */
  function hint(st) {
    var r = st.r, L = st.last;
    if (!L) return null;
    if (L.reason === 'none') return { key: L.hint };
    if (L.reason !== 'miss') return null;
    if (r.kind === 'judge') return { key: st.show >= 2 ? 'hintJudge2' : 'hintJudge1' };
    if (r.kind === 'order' && st.cur >= 3) return { key: st.show >= 2 ? 'hintOrder2' : 'hintOrder1' };
    return { key: st.show >= 2 ? 'hintCount2' : 'hintCount1' };
  }
  /* what a stop means (not a miss): the fault Inchie found */
  function faultKey(status) { return { gap: 'fGap', overlap: 'fOverlap', inside: 'fSize', start: 'fStart', past: 'fPast', short: 'fShort', none: 'fNone' }[status] || null; }
  function okOf(st) {
    var r = st.r;
    if (r.kind === 'judge') return { key: 'okJudge' };
    if (r.kind === 'order') return { key: 'okOrder', objs: st.slots.map(function (i) { return r.objs[st.perm[i]].obj; }) };
    if (r.kind === 'big') return { key: 'okBig', B: st.bigN, S: r.L, obj: r.obj };
    return { key: 'okLen', obj: r.obj, n: r.L };
  }

  /* order-only reshuffle; never the previous pass; fix: never three judge rounds in a row */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function plan(job, sizes, rnd, prev) {
    rnd = rnd || Math.random;
    var base = ids(job, sizes), same = function (a, b) { return !!(a && b && a.join() === b.join()); };
    for (var k = 0; k < 400; k++) {
      var o = shuffle(base, rnd), bad = false;
      for (var i = 2; i < o.length; i++) if (o[i][0] === 'J' && o[i - 1][0] === 'J' && o[i - 2][0] === 'J') bad = true;
      if (!bad && !same(o, prev)) return { order: o };
    }
    var f = base.slice(); if (same(f, prev)) f.reverse(); return { order: f };
  }
  /* per showing: judge tracks and order queues are permuted */
  function perm(rnd) { return shuffle([0, 1, 2], rnd || Math.random); }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, DATA: DATA, E8: E8, LMAX: LMAX,
    locale: locale, jobOf: jobOf, sizesOf: sizesOf, ids: ids, round: round, classify: classify, runOf: runOf, clean: clean,
    newState: newState, objOf: objOf, unit: unit, target: target, snap: snap, lay: lay, append: append, move: move, nudge: nudge, remove: remove, hop: hop, home: home,
    canType: canType, type: type, runTrack: runTrack, pickTrack: pickTrack, rightTrack: rightTrack, chooseCard: chooseCard, place: place,
    check: check, hint: hint, faultKey: faultKey, okOf: okOf, plan: plan, perm: perm, band: band
  };
});

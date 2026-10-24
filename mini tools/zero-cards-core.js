/* =====================================================================
   zero-cards-core.js — the model of ACTIVITY #98 of the one-by-one
   rebuild: "Tens and Ones" → THE ZERO-SWALLOWING CARDS (1.NBT.B.2).
   Pure, no DOM. Design: docs/activities-rebuild/designs/098-place-value.md
   ---------------------------------------------------------------------
   A number is built from arrow cards on a stand exactly two digits wide:
   a long tens card (40) fills both cells, a short ones card (7) can only
   lie in the right cell — on the 0 of the tens card, which it swallows:
   the stack reads 47 and pours 4 rods and 7 cubes. A ones card laid over
   the tens digit or beside the stand tips off, so "407" cannot be built.
   Faces: build (the target in one coat: numeral, word, tens-and-ones,
   n tens, ten frames, tally, spoken) · tens (the target as blocks) ·
   stretch (pull 43 apart into 40 + 3 / put 60 + 7 together) · which (the
   stack is given; which of three trays of blocks shows it?).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ZeroCardsCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var FACES = ['build', 'tens', 'stretch', 'which'];
  var RANGES = ['20', '50', '99'];

  /* build: [target, coat] — coats travel with their targets */
  var BUILD = {
    '99': [[12, 'frames'], [23, 'tally'], [35, 'num'], [47, 'word'], [58, 'spoken'], [64, 'to'], [72, 'word'], [86, 'spoken'], [90, 'tens'],
           [13, 'word'], [16, 'tally'], [19, 'frames'], [29, 'to'], [30, 'tens'], [50, 'tens'], [70, 'num'], [89, 'word'], [95, 'spoken']],
    '50': [[13, 'word'], [19, 'frames'], [21, 'tally'], [28, 'to'], [30, 'tens'], [34, 'num'], [40, 'tens'], [45, 'spoken'], [47, 'word']],
    '20': [[10, 'tens'], [11, 'word'], [12, 'frames'], [13, 'num'], [14, 'to'], [15, 'tally'], [16, 'spoken'], [17, 'word'], [18, 'frames'], [19, 'num']]
  };
  /* tens: the target shown as blocks (decades = rods only) */
  var TENS = { '99': [30, 60, 20, 80, 50, 90, 40, 70], '50': [20, 40, 10, 30, 50, 14, 32, 45], '20': [10, 20, 14, 17, 12, 19, 15, 11] };
  /* stretch: even index = pull apart (build n, then stretch it), odd = put together (build a + b as one stack) */
  var STRETCH = { '99': [43, 67, 25, 81, 59, 34, 96, 18], '50': [43, 25, 34, 18, 47, 12, 39, 28], '20': [18, 13, 16, 12, 19, 14, 17, 15] };
  /* which: [n, right [rods, cubes], reversed, one off] */
  var WHICH = {
    '99': [[47, [4, 7], [7, 4], [4, 6]], [63, [6, 3], [3, 6], [5, 3]], [28, [2, 8], [8, 2], [2, 7]], [51, [5, 1], [1, 5], [4, 1]], [39, [3, 9], [9, 3], [3, 8]],
           [16, [1, 6], [6, 1], [1, 5]], [72, [7, 2], [2, 7], [8, 2]], [85, [8, 5], [5, 8], [8, 4]], [14, [1, 4], [4, 1], [2, 4]]],
    '50': [[47, [4, 7], [7, 4], [4, 6]], [28, [2, 8], [8, 2], [2, 7]], [39, [3, 9], [9, 3], [3, 8]], [16, [1, 6], [6, 1], [1, 5]], [14, [1, 4], [4, 1], [2, 4]],
           [23, [2, 3], [3, 2], [2, 2]], [35, [3, 5], [5, 3], [3, 4]], [41, [4, 1], [1, 4], [3, 1]], [12, [1, 2], [2, 1], [1, 3]]],
    '20': [[10, [1, 0], [0, 1], [1, 1]], [12, [1, 2], [2, 1], [1, 1]], [13, [1, 3], [3, 1], [1, 2]], [14, [1, 4], [4, 1], [1, 3]], [15, [1, 5], [5, 1], [1, 4]],
           [16, [1, 6], [6, 1], [1, 5]], [17, [1, 7], [7, 1], [1, 6]], [18, [1, 8], [8, 1], [1, 7]], [19, [1, 9], [9, 1], [1, 8]]]
  };
  var DATA = { BUILD: BUILD, TENS: TENS, STRETCH: STRETCH, WHICH: WHICH };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function faceOf(t) { return FACES.indexOf(t) >= 0 ? t : 'build'; }
  function rangeOf(r) { r = String(r || ''); return RANGES.indexOf(r) >= 0 ? r : '99'; }
  function table(face, range) { range = rangeOf(range); return face === 'tens' ? TENS[range] : face === 'stretch' ? STRETCH[range] : face === 'which' ? WHICH[range] : BUILD[range]; }
  function ids(face, range) { var t = table(faceOf(face), range), out = []; for (var i = 0; i < t.length; i++) out.push((face === 'which' ? 'w' : face === 'tens' ? 't' : face === 'stretch' ? 's' : 'b') + i); return out; }
  function split(n) { return { t: Math.floor(n / 10) * 10, o: n % 10 }; }

  function round(face, range, id) {
    face = faceOf(face); range = rangeOf(range);
    var i = parseInt(String(id).slice(1), 10), t = table(face, range);
    if (!(i >= 0 && i < t.length)) i = 0;
    var row = t[i], r;
    if (face === 'build') r = { kind: 'build', n: row[0], coat: row[1] };
    else if (face === 'tens') r = { kind: 'tens', n: row, coat: 'blocks', decade: row % 10 === 0 };
    else if (face === 'stretch') r = { kind: 'stretch', n: row, dir: i % 2 === 0 ? 'apart' : 'together', coat: i % 2 === 0 ? 'num' : 'sum' };
    else r = { kind: 'which', n: row[0], sets: { right: row[1], rev: row[2], off: row[3] }, coat: 'num' };
    r.face = face; r.range = range; r.id = face.charAt(0) + i; r.tens = split(r.n).t; r.ones = split(r.n).o;
    return r;
  }
  function rack(range) { var max = rangeOf(range) === '20' ? 20 : rangeOf(range) === '50' ? 50 : 90, t = []; for (var v = 10; v <= max; v += 10) t.push(v); return { tens: t, ones: [1, 2, 3, 4, 5, 6, 7, 8, 9] }; }

  /* which: trays in the order the plan chose — code = right position (0..2) + 3 when the one-off set comes before the reversed one */
  function traysFor(r, code) {
    code = +code || 0; var p = code % 3, swap = code >= 3, out = [null, null, null], rest = swap ? [r.sets.off, r.sets.rev] : [r.sets.rev, r.sets.off], k = 0;
    out[p] = r.sets.right;
    for (var i = 0; i < 3; i++) if (i !== p) out[i] = rest[k++];
    return out.map(function (s) { return { rods: s[0], cubes: s[1] }; });
  }

  function newState(r, code) {
    var st = { r: r, tens: null, ones: null, stretched: false, tray: null, trays: null, rightPos: null, misses: 0, show: 0, last: null, done: false, touched: false, lastTray: null };
    if (r.kind === 'which') { st.trays = traysFor(r, code); st.rightPos = st.trays.map(function (t) { return t.rods * 10 + t.cubes; }).indexOf(r.n); st.tens = r.tens || null; st.ones = r.ones || null; }
    return st;
  }
  function clearHelp(st) { st.show = 0; st.last = null; st.touched = true; st.lastTray = null; }
  function fixed(st) { return st.r.kind === 'which' || st.done; }
  function rackHas(st, kind, v) { var R = rack(st.r.range); return (kind === 't' ? R.tens : R.ones).indexOf(v) >= 0; }

  /* a tens card fills both cells: an old tens card goes back, a lone ones card ends up on its 0 */
  function placeTens(st, v) {
    if (fixed(st) || !rackHas(st, 't', v)) return 'no';
    if (st.tens === v) return 'same';
    var had = st.tens != null; st.tens = v; st.stretched = false; clearHelp(st);
    return had ? 'swapped' : 'placed';
  }
  /* where: 'zero' = the right cell (on the 0 of a tens card, or alone on an empty stand) · 'left' = over the tens cell · 'off' = beside the stand */
  function placeOnes(st, v, where) {
    if (fixed(st) || !rackHas(st, 'o', v)) return 'no';
    where = where || 'zero';
    if (where !== 'zero') return 'tipped';
    if (st.ones === v && !st.stretched) return 'same';
    st.ones = v; st.stretched = false; clearHelp(st);
    return st.tens != null ? 'stacked' : 'alone';
  }
  function lift(st, which) {
    if (fixed(st)) return 'no';
    if (which === 't' && st.tens != null) { st.tens = null; st.stretched = false; clearHelp(st); return 'lifted'; }
    if (which === 'o' && st.ones != null) { st.ones = null; st.stretched = false; clearHelp(st); return 'lifted'; }
    return 'no';
  }
  function canStretch(st) { return st.r.kind === 'stretch' && !st.done && st.tens != null && st.ones != null; }
  function stretch(st, on) {
    if (!canStretch(st)) return 'no';
    on = on == null ? !st.stretched : !!on;
    if (st.stretched === on) return 'same';
    st.stretched = on; clearHelp(st);
    return on ? 'stretched' : 'together';
  }
  function pickTray(st, i) { if (st.r.kind !== 'which' || st.done || !(i >= 0 && i < 3)) return 'no'; st.tray = i; st.show = 0; st.last = null; st.touched = true; st.lastTray = null; return 'picked'; }

  function value(st) { return (st.tens || 0) + (st.ones || 0); }
  function blocks(st) { return { rods: (st.tens || 0) / 10, cubes: st.ones || 0 }; }
  function targetBlocks(r) { return { rods: r.tens / 10, cubes: r.ones }; }
  /* the shown value never reads 407: a ones card is either on the 0 or absent */
  function reads(st) { var v = value(st); return v ? String(v) : ''; }

  function check(st) {
    var r = st.r;
    if (st.done) return { result: 'ok' };
    if (r.kind === 'which') {
      if (st.tray == null) { st.last = { reason: 'none', hint: 'hintPickTray' }; return { result: 'none', hint: 'hintPickTray' }; }
      var t = st.trays[st.tray];
      if (t.rods * 10 + t.cubes === r.n) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
      st.lastTray = st.tray; st.tray = null; st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' };
      return { result: 'miss' };
    }
    if (st.tens == null && st.ones == null) { st.last = { reason: 'none', hint: 'hintEmpty' }; return { result: 'none', hint: 'hintEmpty' }; }
    var right = value(st) === r.n;
    if (r.kind === 'stretch' && right) {
      if (r.dir === 'apart' && !st.stretched) { st.last = { reason: 'none', hint: 'hintStretch' }; return { result: 'none', hint: 'hintStretch' }; }
      if (r.dir === 'together' && st.stretched) { st.last = { reason: 'none', hint: 'hintTogether' }; return { result: 'none', hint: 'hintTogether' }; }
    }
    if (right) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' };
    return { result: 'miss' };
  }

  /* the hint never names the answer: no target numeral, no card value */
  function hint(st) {
    var r = st.r, L = st.last;
    if (!L) return null;
    if (L.reason === 'none') return { key: L.hint };
    if (L.reason !== 'miss') return null;
    if (r.kind === 'which') return { key: st.show >= 2 ? 'hintWhich2' : 'hintWhich1' };
    if (st.show >= 2) return { key: r.kind === 'tens' ? 'hintTensCount' : 'hintGhost' };
    var b = blocks(st), w = targetBlocks(r);
    return { key: b.rods !== w.rods ? 'hintRods' : 'hintCubes' };
  }
  /* which half of the mat differs (for the miss-1 glow) */
  function differs(st) { var b = blocks(st), w = targetBlocks(st.r); return { rods: b.rods !== w.rods, cubes: b.cubes !== w.cubes }; }
  /* the comparison drawn after a "which" miss: the stack's blocks laid over the chosen tray */
  function compare(stack, tray) { return { match: stack.rods === tray.rods && stack.cubes === tray.cubes, extra: { rods: Math.max(0, tray.rods - stack.rods), cubes: Math.max(0, tray.cubes - stack.cubes) }, missing: { rods: Math.max(0, stack.rods - tray.rods), cubes: Math.max(0, stack.cubes - tray.cubes) } }; }

  /* success line: key + args (tp / op are the "n tens" and "n ones" phrase keys, filled by the activity) */
  function okOf(st) {
    var r = st.r;
    if (r.kind === 'stretch') return { key: r.dir === 'apart' ? 'okApart' : 'okTogether', args: { n: r.n, a: r.tens, b: r.ones } };
    return { key: 'okBuild', args: { n: r.n, t: r.tens / 10, o: r.ones } };
  }

  /* order-only reshuffle; never the previous pass; per-face rules; which: right tray 3/3/3 per pass */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function orderOk(face, range, order) {
    for (var i = 0; i < order.length; i++) {
      var r = round(face, range, order[i]), p = i > 0 ? round(face, range, order[i - 1]) : null, q = i > 1 ? round(face, range, order[i - 2]) : null;
      if (face === 'build' && p && p.coat === r.coat) return false;
      if (face === 'build' && p && p.ones === 0 && r.ones === 0) return false;
      if (face === 'stretch' && p && q && p.dir === r.dir && q.dir === r.dir) return false;
    }
    return true;
  }
  function positionsOk(pos) {
    var c = [0, 0, 0], twice = 0;
    for (var i = 0; i < pos.length; i++) { c[pos[i]]++; if (i > 0 && pos[i] === pos[i - 1]) twice++; }
    var per = pos.length / 3;
    return c[0] === per && c[1] === per && c[2] === per && twice <= 1;
  }
  function plan(face, range, rnd, prev) {
    face = faceOf(face); range = rangeOf(range); rnd = rnd || Math.random;
    var base = ids(face, range), order = null, tries = 0;
    var same = function (a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; };
    while (tries++ < 400) { var o = shuffle(base, rnd); if (orderOk(face, range, o) && !same(o, prev)) { order = o; break; } }
    if (!order) { order = base.slice(); if (same(order, prev)) order.reverse(); }
    var pos = {};
    if (face === 'which') {
      var p = null, t2 = 0;
      while (t2++ < 400) { var cand = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2], rnd); if (positionsOk(cand)) { p = cand; break; } }
      if (!p) p = [0, 1, 2, 1, 2, 0, 2, 0, 1];
      for (var k = 0; k < order.length; k++) pos[order[k]] = p[k] + (rnd() < 0.5 ? 3 : 0);
    }
    return { order: order, pos: pos };
  }

  /* layout bands for the activity */
  function layout(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, FACES: FACES, RANGES: RANGES, DATA: DATA,
    locale: locale, faceOf: faceOf, rangeOf: rangeOf, ids: ids, round: round, rack: rack, split: split, traysFor: traysFor,
    newState: newState, placeTens: placeTens, placeOnes: placeOnes, lift: lift, canStretch: canStretch, stretch: stretch, pickTray: pickTray,
    value: value, blocks: blocks, targetBlocks: targetBlocks, reads: reads, check: check, hint: hint, differs: differs, compare: compare, okOf: okOf,
    orderOk: orderOk, positionsOk: positionsOk, plan: plan, layout: layout
  };
});

/* =====================================================================
   nine-stop-core.js — the model of ACTIVITY #97, THE NINE-STOP TUBES
   ("Ten More, Ten Less — Mental Math With Two-Digit Numbers", 1.NBT.C.5).
   Pure, no DOM. Design: docs/activities-rebuild/designs/097-choice-board.md
   ---------------------------------------------------------------------
   The number lives in two glass tubes: rods in the tens tube, cubes in the
   ones tube. Both stop at nine — a lid — so ten more can never be ten cubes:
   it is one rod in the tens tube, and the ones do not change. Faces: ten
   more / ten less; one more / one less (a full ones tube needs a trade by
   hand); arrow jumps (follow the cards ↓ ↑ → ←, each card tied to its own
   tube; two trips that meet; count the jumps — predict, then the tubes run
   the counted trip); number of the day (its four neighbours in the
   hundreds-chart cross: 10 less, 1 less, 1 more, 10 more).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NineStopCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var FACES = ['ten', 'one', 'jumps', 'nod'];
  var STEP = { D: 10, U: -10, R: 1, L: -1 }, TUBE = { D: 't', U: 't', R: 'o', L: 'o' };
  var TEN = [[34, 10], [57, -10], [60, 10], [82, -10], [25, 10], [48, -10], [71, 10], [39, -10], [13, -10], [86, 10]];
  var ONE = [[46, 1], [39, 1], [52, -1], [70, -1], [18, 1], [29, 1], [61, -1], [80, -1], [14, -1]];
  var FOLLOW = [[34, 'DDR'], [27, 'DRR'], [32, 'UL'], [45, 'DDL'], [58, 'UURR'], [92, 'LU'], [16, 'DDD'], [83, 'URR']];
  var MYSTERY = [[24, 'DDR', 56, 'UL'], [17, 'DDR', 49, 'UL'], [22, 'DDR', 64, 'UUL'], [35, 'DRR', 67, 'UU']];
  var COUNT = [[23, 57], [41, 63], [68, 35], [12, 45], [76, 54]];
  var NOD = [47, 63, 28, 15, 52, 36, 70, 19, 89, 11];

  function faceOf(f) { return FACES.indexOf(f) >= 0 ? f : 'ten'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function land(start, cards) { var v = start; for (var i = 0; i < cards.length; i++) v += STEP[cards.charAt(i)]; return v; }
  /* round ids: 'n3' (ten / one / nod faces), 'f3' follow, 'm3' mystery, 'c3' count */
  function ids(face) {
    face = faceOf(face); var out = [], i;
    if (face === 'ten') for (i = 0; i < TEN.length; i++) out.push('n' + i);
    if (face === 'one') for (i = 0; i < ONE.length; i++) out.push('n' + i);
    if (face === 'nod') for (i = 0; i < NOD.length; i++) out.push('n' + i);
    if (face === 'jumps') { for (i = 0; i < FOLLOW.length; i++) out.push('f' + i); for (i = 0; i < MYSTERY.length; i++) out.push('m' + i); for (i = 0; i < COUNT.length; i++) out.push('c' + i); }
    return out;
  }
  function round(face, id) {
    face = faceOf(face); var k = id.charAt(0), i = +id.slice(1), row;
    if (face === 'ten' || face === 'one') { row = (face === 'ten' ? TEN : ONE)[i]; return { face: face, id: id, kind: face, start: row[0], step: row[1], answer: row[0] + row[1] }; }
    if (face === 'nod') { var n = NOD[i]; return { face: face, id: id, kind: 'nod', start: n, n: n, targets: [n - 10, n - 1, n + 1, n + 10], labels: ['m10', 'm1', 'p1', 'p10'] }; }
    if (k === 'f') { row = FOLLOW[i]; return { face: face, id: id, kind: 'follow', start: row[0], cards: row[1], answer: land(row[0], row[1]) }; }
    if (k === 'm') { row = MYSTERY[i]; return { face: face, id: id, kind: 'mystery', start: row[0], trips: [{ start: row[0], cards: row[1], land: land(row[0], row[1]) }, { start: row[2], cards: row[3], land: land(row[2], row[3]) }], answer: land(row[2], row[3]) }; }
    row = COUNT[i]; var a = row[0], b = row[1], dt = Math.floor(b / 10) - Math.floor(a / 10), dor = b % 10 - a % 10;
    return { face: face, id: id, kind: 'count', start: a, end: b, answer: b, d: Math.abs(dt), r: Math.abs(dor), dirT: dt >= 0 ? 'D' : 'U', dirO: dor >= 0 ? 'R' : 'L' };
  }
  function setTo(st, v) { st.t = Math.floor(v / 10); st.o = v % 10; }
  function newState(r) {
    var st = { r: r, t: 0, o: 0, phase: 0, played: [], filled: [], ghost: null, counts: { d: '', r: '' }, ran: null, reveal: false, touched: false, misses: 0, show: 0, last: null, done: false, flash: null };
    setTo(st, r.start); resetCards(st); return st;
  }
  function cardsOf(st) { var r = st.r; return r.kind === 'mystery' ? r.trips[st.phase].cards : (r.cards || ''); }
  function resetCards(st) { st.played = []; for (var i = 0; i < cardsOf(st).length; i++) st.played.push(false); }
  function clear(st) { st.show = 0; st.last = null; st.reveal = false; st.touched = true; st.ran = null; }
  function value(st) { return 10 * st.t + st.o; }
  function base(st) { var r = st.r; return r.kind === 'mystery' ? r.trips[st.phase].start : r.start; }

  /* ---- the handles ---- */
  function up(st, tube) {
    if (st.done || st.r.kind === 'count') return null;
    if (st[tube] >= 9) return 'lid';   /* the nine-stop: ten never fit in a tube */
    st[tube]++; clear(st); return 'up';
  }
  function down(st, tube) {
    if (st.done || st.r.kind === 'count') return null;
    if (st[tube] <= 0) return 'empty';
    st[tube]--; clear(st); return 'down';
  }
  /* an arrow card works only on its own tube; tapping a played card takes the move back */
  function playCard(st, i, tube) {
    var cards = cardsOf(st); if (st.done || i < 0 || i >= cards.length) return null;
    var dir = cards.charAt(i), own = TUBE[dir];
    if (tube && tube !== own) return 'wrongTube';
    var res;
    if (st.played[i]) { res = (STEP[dir] > 0 ? down : up)(st, own); if (res === 'down' || res === 'up') { st.played[i] = false; return 'undone'; } return res; }
    res = (STEP[dir] > 0 ? up : down)(st, own);
    if (res === 'up' || res === 'down') { st.played[i] = true; return 'played'; }
    return res;   /* 'lid' or 'empty': the card does not flip */
  }
  /* count the jumps: the two predicted counts */
  function typeCount(st, which, d) {
    if (st.done || st.r.kind !== 'count' || (which !== 'd' && which !== 'r')) return false;
    d = String(d); if (!/^[0-9]$/.test(d) || st.counts[which] !== '') return false;
    st.counts[which] = d; clear(st); setTo(st, st.r.start); return true;   /* a changed count: the tubes go back to the start */
  }
  function clearCount(st, which) { if (st.done || st.r.kind !== 'count' || !st.counts[which]) return false; st.counts[which] = ''; clear(st); setTo(st, st.r.start); return true; }
  /* where a count would land: the tubes run d rods and r cubes in the round's directions (and stop at a lid or an empty tube) */
  function runCount(r, d, rr) {
    var t = Math.floor(r.start / 10), o = r.start % 10, k;
    for (k = 0; k < d; k++) t = Math.max(0, Math.min(9, t + (r.dirT === 'D' ? 1 : -1)));
    for (k = 0; k < rr; k++) o = Math.max(0, Math.min(9, o + (r.dirO === 'R' ? 1 : -1)));
    return 10 * t + o;
  }

  /* ---- Check ---- */
  function target(st) { var r = st.r; return r.kind === 'nod' ? r.targets[st.phase] : r.kind === 'mystery' ? r.trips[st.phase].land : r.answer; }
  function check(st) {
    var r = st.r; if (st.done) return null;
    var none = null;
    if (r.kind === 'count') { if (st.counts.d === '' || st.counts.r === '') none = 'hintTypeCounts'; }
    else if (value(st) === base(st)) none = 'hintMove';
    if (none) { st.last = { reason: 'none', hint: none }; return { result: 'none', hint: none }; }
    st.reveal = true;
    if (r.kind === 'count') {
      var v = runCount(r, +st.counts.d, +st.counts.r); st.ran = v; setTo(st, v);
      if (v === r.end) { st.done = true; st.last = { reason: 'fair' }; return { result: 'ok' }; }
      st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'count' }; return { result: 'miss', kind: 'count', landed: v };
    }
    if (value(st) === target(st)) {
      if (r.kind === 'mystery' && st.phase === 0) { st.ghost = r.trips[0].land; st.phase = 1; setTo(st, r.trips[1].start); resetCards(st); st.misses = 0; st.show = 0; st.last = { reason: 'step' }; st.reveal = false; return { result: 'step' }; }
      if (r.kind === 'nod' && st.phase < 3) { st.filled.push(r.targets[st.phase]); st.phase++; setTo(st, r.n); st.misses = 0; st.show = 0; st.last = { reason: 'step' }; st.reveal = false; return { result: 'step' }; }
      if (r.kind === 'nod') st.filled.push(r.targets[3]);
      st.done = true; st.last = { reason: 'fair' }; return { result: 'ok' };
    }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' };
    return { result: 'miss', kind: r.kind };
  }
  /* the step the child had to make now: +10 / -10 / +1 / -1, and whether it crosses a ten (a trade by hand) */
  function stepNow(st) {
    var r = st.r, from = r.kind === 'nod' ? r.n : r.start, to = target(st);
    return { step: to - from, from: from, to: to, trade: Math.abs(to - from) === 1 && Math.floor(to / 10) !== Math.floor(from / 10) };
  }
  function hint(st) {
    var L = st.last, r = st.r; if (!L || L.reason === 'fair' || L.reason === 'step') return null;
    if (L.reason === 'none') return { key: L.hint };
    if (r.kind === 'count') return { key: st.show >= 2 ? 'hintCount2' : 'hintCount1' };
    if (r.kind === 'follow' || r.kind === 'mystery') return { key: st.show >= 2 ? 'hintCards' : 'hintArrows' };
    var s = stepNow(st), from = s.from;
    if (s.trade) return { key: s.step > 0 ? 'hintTradeUp' : 'hintTradeDown', args: { start: from } };   /* across a ten the ones tube is full / empty: the trade is the whole story from the first miss */
    if (st.show >= 2) {
      if (Math.abs(s.step) === 10) return { key: 'hintOnlyTens' };
      return s.trade ? { key: s.step > 0 ? 'hintTradeUp' : 'hintTradeDown', args: { start: from } } : { key: 'hintOnlyOnes' };
    }
    return { key: s.step === 10 ? 'hintTenMore' : s.step === -10 ? 'hintTenLess' : s.step === 1 ? 'hintOneMore' : 'hintOneLess' };
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }

  /* ---- order of a pass: never the previous pass; ten / one faces never three of one direction in a row; jumps never two count rounds side by side ---- */
  function orderOk(face, order) {
    face = faceOf(face);
    for (var i = 1; i < order.length; i++) {
      var a = round(face, order[i - 1]), b = round(face, order[i]);
      if (face === 'jumps' && a.kind === 'count' && b.kind === 'count') return false;
      if ((face === 'ten' || face === 'one') && i >= 2) { var z = round(face, order[i - 2]); if ((z.step > 0) === (a.step > 0) && (a.step > 0) === (b.step > 0)) return false; }
    }
    return true;
  }
  function plan(face, rnd, prev) {
    var all = ids(face), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(face, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  return {
    DATA: { TEN: TEN, ONE: ONE, FOLLOW: FOLLOW, MYSTERY: MYSTERY, COUNT: COUNT, NOD: NOD, STEP: STEP, TUBE: TUBE }, LOCALES: LOCALES, FACES: FACES,
    faceOf: faceOf, locale: locale, shuffle: shuffle, land: land, ids: ids, round: round, newState: newState, value: value, base: base, cardsOf: cardsOf,
    up: up, down: down, playCard: playCard, typeCount: typeCount, clearCount: clearCount, runCount: runCount, target: target, check: check, stepNow: stepNow, hint: hint,
    orderOk: orderOk, plan: plan, layout: layout
  };
});

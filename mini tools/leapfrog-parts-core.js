/* =====================================================================
   leapfrog-parts-core.js — the model for ACTIVITY #135 of the one-by-one
   rebuild: "Add It Both Ways" → THE LEAPFROG PARTS (1.OA.B.3; all 11
   locales).
   Design: docs/activities-rebuild/designs/135-match-pairs.md
   ---------------------------------------------------------------------
   The two numbers on every card are blocks of cubes. The child picks a
   card, then the card they think is its twin: on the way over, the two
   blocks leapfrog across the "+" (4 + 7 becomes 7 + 4, nothing gained or
   lost) and the card settles only onto its true twin. Most rounds give
   all six cards the SAME total, so the total alone never finds a twin.
   Take-away cards (11 − 4 = 7) swap their two parts across the "=" while
   the whole stays first; the "−" refuses to swap.
   Pure and DOM-free; UMD (window.LeapfrogPartsCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LeapfrogPartsCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  /* the rounds: three pairs each, [a, b] with a < b (add) or [w, a, b] with a < b, a + b = w (take) */
  var ADD = {
    '10': [[[1, 9], [2, 8], [3, 7]], [[1, 8], [2, 7], [4, 5]], [[1, 7], [2, 6], [3, 5]], [[1, 6], [2, 5], [3, 4]], [[4, 6], [3, 6], [2, 4]], [[1, 5], [2, 4], [1, 3]], [[1, 8], [3, 6], [4, 5]], [[4, 6], [1, 9], [3, 4]], [[1, 4], [2, 3], [1, 2]]],
    '20': [[[4, 7], [3, 8], [2, 9]], [[3, 9], [4, 8], [5, 7]], [[4, 9], [5, 8], [6, 7]], [[5, 9], [6, 8], [4, 10]], [[6, 9], [7, 8], [5, 10]], [[4, 7], [3, 6], [2, 8]], [[7, 9], [6, 10], [5, 11]], [[2, 5], [6, 9], [3, 8]], [[8, 9], [7, 10], [6, 11]]]
  };
  var TAKE = {
    '10': [[[10, 1, 9], [10, 2, 8], [10, 3, 7]], [[9, 1, 8], [9, 2, 7], [9, 4, 5]], [[8, 1, 7], [8, 2, 6], [8, 3, 5]], [[7, 1, 6], [7, 2, 5], [7, 3, 4]], [[10, 4, 6], [10, 1, 9], [10, 2, 8]], [[6, 1, 5], [6, 2, 4], [5, 1, 4]], [[9, 3, 6], [9, 1, 8], [9, 2, 7]], [[10, 3, 7], [10, 4, 6], [10, 1, 9]], [[5, 1, 4], [5, 2, 3], [6, 1, 5]]],
    '20': [[[11, 2, 9], [11, 3, 8], [11, 4, 7]], [[12, 3, 9], [12, 4, 8], [12, 5, 7]], [[13, 4, 9], [13, 5, 8], [13, 6, 7]], [[14, 5, 9], [14, 6, 8], [14, 4, 10]], [[15, 6, 9], [15, 7, 8], [15, 5, 10]], [[16, 7, 9], [16, 6, 10], [16, 5, 11]], [[17, 8, 9], [17, 7, 10], [17, 6, 11]], [[11, 4, 7], [9, 3, 6], [10, 2, 8]], [[12, 2, 10], [12, 3, 9], [12, 5, 7]]]
  };
  var DATA = { ADD: ADD, TAKE: TAKE };
  function numOf(v) { return String(v) === '10' ? '10' : '20'; }
  function cardsOf(v) { v = String(v); return v === 'take' || v === 'mix' ? v : 'add'; }
  function rounds() { return [0, 1, 2, 3, 4, 5, 6, 7, 8]; }
  function kindOf(cards, r) { cards = cardsOf(cards); return cards === 'mix' ? (r % 2 ? 'take' : 'add') : cards; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function same(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  var FIX = [0, 3, 4, 1, 5, 2];
  /* a talking round: its three pairs do not all make the same total */
  function talking(num, kind, r) { var P = (kind === 'take' ? TAKE : ADD)[numOf(num)][r], t = P.map(function (p) { return kind === 'take' ? p[0] : p[0] + p[1]; }); return !(t[0] === t[1] && t[1] === t[2]); }

  /* ---------------- a round ---------------- */
  /* a card: add {kind, a, b, s} shows a + b; take {kind, w, a, b} shows w − a = b. Its leapfrog: add b + a; take w − b = a */
  function round(num, cards, r, opts) {
    num = numOf(num); opts = opts || {};
    var kind = kindOf(cards, r), P = (kind === 'take' ? TAKE : ADD)[num][r], all = [];
    P.forEach(function (p, k) {
      if (kind === 'take') { all.push({ kind: 'take', w: p[0], a: p[1], b: p[2], pair: k }); all.push({ kind: 'take', w: p[0], a: p[2], b: p[1], pair: k }); }
      else { all.push({ kind: 'add', a: p[0], b: p[1], s: p[0] + p[1], pair: k }); all.push({ kind: 'add', a: p[1], b: p[0], s: p[0] + p[1], pair: k }); }
    });
    var ord = opts.order && opts.order.length === 6 ? opts.order : FIX;
    var max = 0; all.forEach(function (c) { max = Math.max(max, c.kind === 'take' ? c.w : c.s); });
    return { num: num, kind: kind, r: r, cards: ord.map(function (i) { return all[i]; }), max: max };
  }
  function leap(c) { return c.kind === 'take' ? { kind: 'take', w: c.w, a: c.b, b: c.a, pair: c.pair } : { kind: 'add', a: c.b, b: c.a, s: c.s, pair: c.pair }; }
  function sameCard(x, y) { return x.kind === y.kind && x.a === y.a && x.b === y.b && (x.kind !== 'take' || x.w === y.w); }
  function total(c) { return c.kind === 'take' ? c.w : c.a + c.b; }
  /* the cube colours of a card, left to right: the smaller part coral ('s'), the larger teal ('l'); take cards: the part that stays, then the part lifted off */
  function cubes(c) {
    var out = [], small = Math.min(c.a, c.b), col = function (n) { return n === small ? 's' : 'l'; };
    if (c.kind === 'take') { for (var i = 0; i < c.b; i++) out.push(col(c.b)); for (var j = 0; j < c.a; j++) out.push(col(c.a)); }
    else { for (var p = 0; p < c.a; p++) out.push(col(c.a)); for (var q = 0; q < c.b; q++) out.push(col(c.b)); }
    return out;
  }
  /* lay the leapfrogged card on another: twins, or where the cubes disagree / the row sticks out */
  function compare(from, to) {
    var L = leap(from), A = cubes(L), B = cubes(to), bad = [];
    for (var i = 0; i < Math.min(A.length, B.length); i++) if (A[i] !== B[i]) bad.push(i);
    return { twins: sameCard(L, to), sameTotal: total(L) === total(to), bad: bad, over: A.length - B.length };
  }

  /* ---------------- the state ---------------- */
  function newState(num, cards, r, opts) {
    var rd = round(num, cards, r, opts);
    return { rd: rd, held: null, matched: [], misses: [0, 0, 0, 0, 0, 0], help: null, last: null, lay: null, done: false };
  }
  function isMatched(st, i) { return st.matched.indexOf(st.rd.cards[i].pair) >= 0; }
  /* tap a card: lift it, put it down, or lay the lifted one on it */
  function pick(st, i) {
    if (st.done || i < 0 || i > 5 || isMatched(st, i)) return { result: 'no' };
    if (st.held == null) { st.held = i; st.lay = null; st.last = null; if (st.help !== i) st.help = null; return { result: 'lift' }; }
    if (st.held === i) { st.held = null; st.help = null; st.lay = null; st.last = null; return { result: 'drop' }; }
    var from = st.held, c = compare(st.rd.cards[from], st.rd.cards[i]);
    st.lay = { from: from, to: i, twins: c.twins, sameTotal: c.sameTotal, bad: c.bad, over: c.over };
    if (c.twins) {
      st.matched.push(st.rd.cards[i].pair); st.held = null; st.help = null; st.last = 'twins';
      if (st.matched.length === 3) st.done = true;
      return { result: 'twins', pair: st.rd.cards[i].pair, done: st.done };
    }
    st.misses[from]++; st.last = 'miss';
    /* miss 2 with the same first card: it stays lifted, leapfrogged, as the help */
    if (st.misses[from] >= 2) { st.held = from; st.help = from; } else { st.held = null; st.help = null; }
    return { result: 'miss', sameTotal: c.sameTotal };
  }
  /* the minus is not a hinge: the whole and its part never trade places */
  function minusSwap(st, i) { var c = st.rd.cards[i]; return c && c.kind === 'take' ? 'refused' : 'no'; }
  /* undo: a found twin goes back to the grid */
  function unmatch(st, pair) { if (st.done) return 'no'; var k = st.matched.indexOf(pair); if (k < 0) return 'no'; st.matched.splice(k, 1); st.lay = null; st.last = null; return 'back'; }
  function hint(st) {
    if (st.last !== 'miss') return null;
    if (st.help != null) return 'missHelp';
    var same = st.lay && st.lay.sameTotal;
    if (st.rd.kind === 'take') return same ? 'missSameTake' : 'missTotalTake';
    return same ? 'missSame' : 'missTotal';
  }

  /* ---------------- the plan ---------------- */
  /* per pass: a fresh round order whose first round is never a talking round; every round's six places a uniform shuffle (all 15 pairings equally likely) */
  function plan(num, cards, rnd, prev) {
    rnd = rnd || Math.random; num = numOf(num);
    var ids = rounds(), o = null;
    for (var a = 0; a < 400; a++) { var c = shuffle(ids, rnd); if (!same(c, prev) && !talking(num, kindOf(cards, c[0]), c[0])) { o = c; break; } }
    o = o || ids;
    var orders = {}; o.forEach(function (r) { orders[r] = shuffle([0, 1, 2, 3, 4, 5], rnd); });
    return { order: o, orders: orders };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 340 }; }

  return {
    DATA: DATA, numOf: numOf, cardsOf: cardsOf, rounds: rounds, kindOf: kindOf, talking: talking, round: round, leap: leap, sameCard: sameCard, total: total, cubes: cubes, compare: compare,
    newState: newState, isMatched: isMatched, pick: pick, minusSwap: minusSwap, unmatch: unmatch, hint: hint, plan: plan, band: band
  };
});

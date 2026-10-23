/* =====================================================================
   rung-ladder-core.js — the model of ACTIVITY #87, THE RUNG LADDER
   ("Addition & Subtraction Pairs", 1.OA.D.7). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/087-match-pairs.md
   ---------------------------------------------------------------------
   Every card is one rail of a ladder: an addition joins two rails (a then
   b holes), a subtraction is sawn (c holes, the top d fall away). The
   child picks an addition and a subtraction; the squirrel climbs, a rung
   at every height that has a hole on BOTH rails. Equal rails → the gold
   cap rung and the acorn: the ladder IS the equals sign. "Undo it": the
   four facts of one family — every rail is w tall, so only the colour
   seam decides (a + b changes colour after a holes; w − d after w − d).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RungLadderCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['same', 'undo'];
  /* Same answer: additions then subtractions, as "a+b" / "c-d" */
  var SAME = [
    ['2+3', '3+4', '9-4', '9-2'], ['1+3', '2+6', '5-1', '10-2'], ['1+2', '2+4', '6-3', '8-2'], ['4+5', '1+4', '10-1', '7-2'],
    ['1+5', '4+6', '9-3', '12-2'], ['2+5', '2+2', '10-3', '7-3'], ['2+1', '3+5', '3+7', '5-2', '9-1', '13-3'],
    ['4+1', '3+3', '3+6', '8-3', '10-4', '12-3'], ['4+4', '2+1', '12-4', '4-1'], ['5+5', '1+6', '13-3', '8-1'],
    ['2+7', '4+2', '11-2', '10-4'], ['1+3', '5+2', '6+3', '9-5', '12-5', '13-4'], ['8+2', '2+3', '14-4', '6-1'],
    ['1+7', '2+4', '11-3', '7-1'], ['1+4', '2+6', '1+2', '10-5', '10-2', '8-5'], ['4+3', '4+5', '9-2', '10-1'],
    ['5+1', '6+4', '8-2', '12-2'], ['2+2', '3+4', '5+4', '6-2', '10-3', '11-2']
  ];
  /* Undo it: one family per round [a, b] (w = a + b) */
  var FAMILIES = [[3, 5], [4, 6], [2, 7], [1, 6], [3, 4], [2, 6], [6, 8], [7, 9], [5, 8], [4, 7]];
  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'same'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = levelOf(level) === 'undo' ? FAMILIES.length : SAME.length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function parse(s, i) { var m = /^(\d+)([+-])(\d+)$/.exec(s); return { id: 'c' + i, kind: m[2] === '+' ? 'add' : 'sub', a: +m[1], b: +m[3] }; }
  function value(c) { return c.kind === 'add' ? c.a + c.b : c.a - c.b; }
  function text(c) { return c.a + (c.kind === 'add' ? ' + ' : ' − ') + c.b; }
  function round(level, idx) {
    level = levelOf(level); var cards;
    if (level === 'undo') { var f = FAMILIES[idx], a = f[0], b = f[1], w = a + b; cards = [{ kind: 'add', a: a, b: b }, { kind: 'add', a: b, b: a }, { kind: 'sub', a: w, b: b }, { kind: 'sub', a: w, b: a }].map(function (c, i) { c.id = 'c' + i; return c; }); return { level: level, idx: idx, cards: cards, w: w, fa: a, fb: b }; }
    cards = SAME[idx].map(parse);
    return { level: level, idx: idx, cards: cards };
  }
  function card(r, id) { for (var i = 0; i < r.cards.length; i++) if (r.cards[i].id === id) return r.cards[i]; return null; }
  /* the partner: Same answer = the subtraction of equal value; Undo it = the subtraction that takes away the part added last */
  function partnerOf(r, id) {
    var c = card(r, id); if (!c) return null;
    for (var i = 0; i < r.cards.length; i++) { var o = r.cards[i]; if (o.kind === c.kind) continue;
      var add = c.kind === 'add' ? c : o, sub = c.kind === 'add' ? o : c;
      if (r.level === 'undo' ? (sub.a === add.a + add.b && sub.b === add.b) : value(add) === value(sub)) return o.id; }
    return null;
  }
  /* a rail: the holes from the grass up; kind 'p' first part, 'q' second part, 'g' a sawn-off ghost (Undo it only) */
  function rail(c, level) {
    var out = [], i;
    if (c.kind === 'add') { for (i = 0; i < c.a; i++) out.push('p'); for (i = 0; i < c.b; i++) out.push('q'); return out; }
    for (i = 0; i < c.a - c.b; i++) out.push('p');
    if (level === 'undo') for (i = 0; i < c.b; i++) out.push('g');
    return out;
  }
  /* the climb: a rung at every height with a hole on both rails (Undo it: and the same colour) */
  function climb(r, addId, subId) {
    var A = card(r, addId), S = card(r, subId);
    if (!A || !S || A.kind !== 'add' || S.kind !== 'sub') return null;
    if (r.level === 'undo') {
      var sa = A.a, ss = S.a - S.b, rungs = Math.min(sa, ss);
      return { done: sa === ss, rungs: sa === ss ? r.w : rungs, open: Math.abs(sa - ss), side: sa > ss ? 'add' : 'sub', seam: true };
    }
    var va = value(A), vs = value(S);
    return { done: va === vs, rungs: Math.min(va, vs), open: Math.abs(va - vs), side: va > vs ? 'add' : 'sub', seam: false };
  }
  /* the grid: shuffled every time a round appears */
  function grid(r, rnd) { return shuffle(r.cards.map(function (c) { return c.id; }), rnd); }
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var k = 0; k < 4000; k++) { order = shuffle(all, rnd); if (!(prev && prev.length && prev.join() === order.join())) break; }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r) { return { r: r, selected: null, pending: null, climbed: [], misses: 0, show: 0, last: null, done: false }; }
  function moved(st) { st.show = 0; st.last = null; }
  function used(st, id) { return st.climbed.some(function (p) { return p[0] === id || p[1] === id; }); }
  function select(st, id) {
    if (st.done || st.pending) return null;
    var c = card(st.r, id); if (!c || used(st, id)) return null;
    moved(st);
    if (!st.selected) { st.selected = id; return 'lift'; }
    if (st.selected === id) { st.selected = null; return 'drop'; }
    var o = card(st.r, st.selected);
    if (o.kind === c.kind) { st.selected = id; st.last = { reason: 'kind' }; return 'kind'; }
    st.pending = c.kind === 'add' ? [id, o.id] : [o.id, id]; st.selected = null; return 'pair';
  }
  /* the squirrel climbs the pending ladder */
  function go(st) {
    if (st.done || !st.pending) return null;
    var p = st.pending, res = climb(st.r, p[0], p[1]);
    st.pending = null;
    if (res.done) { st.climbed.push(p); st.last = { reason: 'pair', pair: p }; if (st.climbed.length * 2 === st.r.cards.length) st.done = true; return res; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'stop', pair: p, k: res.open, side: res.side };
    return res;
  }
  function cancel(st) { if (!st.pending) return false; st.pending = null; moved(st); return true; }
  function unfold(st, i) { if (st.done || i < 0 || i >= st.climbed.length) return false; st.climbed.splice(i, 1); moved(st); return true; }
  function hint(st) {
    if (!st.last) return null;
    var R = st.last.reason, undo = st.r.level === 'undo';
    if (R === 'kind') return 'hKind';
    if (R !== 'stop') return null;
    if (st.show >= 2) return undo ? 'hSeam' : 'hLook';
    return undo ? 'hColour' : 'hMore';
  }
  function tag(r, p) {
    var A = card(r, p[0]), S = card(r, p[1]);
    if (r.level === 'undo') return text(A) + ' = ' + (A.a + A.b) + ' · ' + text(S) + ' = ' + A.a;
    return text(A) + ' = ' + text(S);
  }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W }; }
  return {
    DATA: { SAME: SAME, FAMILIES: FAMILIES }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, round: round, card: card, value: value, text: text, partnerOf: partnerOf, rail: rail, climb: climb, grid: grid, plan: plan,
    newState: newState, used: used, select: select, go: go, cancel: cancel, unfold: unfold, hint: hint, tag: tag, layout: layout
  };
});

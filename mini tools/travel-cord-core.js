/* =====================================================================
   travel-cord-core.js — the model of ACTIVITY #99 of the one-by-one
   rebuild: "The Faraway Shelf" → THE TRAVELLING CORD (1.MD.A.1).
   Pure, no DOM. Design: docs/activities-rebuild/designs/099-seriation.md
   ---------------------------------------------------------------------
   Tilly's ribbons live in places that can never meet — hanging from a
   hook, lying on a high shelf, lying on the counter — so the eye cannot
   line them up. ONE cord, always 6 units long, travels to each and leaves
   a tag: shorter than the cord, just as long, longer. The tags alone
   decide every question (exactly one longer / shorter / equal; order =
   one of each). Tall things: three copies of one picture on a stool, a
   box and a high shelf; the cord is held up from each object's own foot.
   Lengths are units, never shown; the comparison is len vs cord, never
   anything drawn.
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TravelCordCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var CORD = 6;
  var COLOURS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  var HEX = { red: '#E0524A', blue: '#3E7CB1', green: '#5FA85C', yellow: '#E0A92E', purple: '#8C6BB1', orange: '#E8833A' };
  var PLACES = ['H', 'S', 'C'];            /* hanging from the hook · lying on the high shelf · lying on the counter */
  var STANDS = ['stool', 'box', 'shelf'];  /* tall things stand on these */
  var STAND_H = { stool: 0.8, box: 2, shelf: 4 };
  var PICS = { candle: ['christmas', 'candle'], bottle: ['kitchen tools', 'bottle'] };
  /* the measured ink box of each picture in its square image (scripts/worksheet-gen/data/art-extents.json: w, x, h, y as fractions) */
  var INK = { candle: { w: 0.3216, x: 0.3411, h: 0.9551, y: 0.0280 }, bottle: { w: 0.3919, x: 0.3099, h: 0.9557, y: 0.0254 } };

  /* ribbons · mixed: [id, kind, [[colour, len, place]×3], flags] — flags: i = illusion (keep the default places), c = [answer, rival] close call */
  var MIXED = [
    ['L1', 'long', [['red', 8, 'H'], ['blue', 5, 'S'], ['green', 3, 'C']]],
    ['L2', 'long', [['blue', 4, 'H'], ['green', 9, 'C'], ['yellow', 6, 'S']]],
    ['L3', 'long', [['purple', 7, 'C'], ['red', 6, 'H'], ['orange', 3, 'S']], { c: ['purple', 'red'] }],
    ['L4', 'long', [['green', 6, 'H'], ['yellow', 10, 'C'], ['blue', 2, 'S']]],
    ['L5', 'long', [['orange', 6, 'H'], ['red', 7, 'C'], ['purple', 4, 'S']], { i: 1, c: ['red', 'orange'] }],
    ['L6', 'long', [['blue', 9, 'H'], ['red', 6, 'S'], ['green', 5, 'C']]],
    ['L7', 'long', [['yellow', 3, 'S'], ['purple', 6, 'H'], ['orange', 7, 'C']], { c: ['orange', 'purple'] }],
    ['S1', 'short', [['red', 4, 'C'], ['blue', 7, 'H'], ['green', 9, 'S']]],
    ['S2', 'short', [['blue', 8, 'C'], ['green', 6, 'H'], ['yellow', 2, 'S']]],
    ['S3', 'short', [['red', 9, 'H'], ['purple', 6, 'S'], ['orange', 3, 'C']]],
    ['S4', 'short', [['green', 5, 'H'], ['yellow', 6, 'S'], ['blue', 10, 'C']], { i: 1, c: ['green', 'yellow'] }],
    ['S5', 'short', [['orange', 7, 'C'], ['red', 6, 'H'], ['purple', 5, 'S']], { c: ['purple', 'red'] }],
    ['S6', 'short', [['blue', 6, 'H'], ['green', 9, 'C'], ['yellow', 5, 'S']], { c: ['yellow', 'blue'] }],
    ['S7', 'short', [['purple', 3, 'H'], ['orange', 8, 'S'], ['red', 7, 'C']], { i: 1 }],
    ['C1', 'same', [['red', 6, 'C'], ['blue', 8, 'H'], ['green', 3, 'S']]],
    ['C2', 'same', [['blue', 4, 'S'], ['green', 6, 'H'], ['yellow', 9, 'C']]],
    ['C3', 'same', [['red', 6, 'H'], ['purple', 2, 'S'], ['orange', 9, 'C']]],
    ['C4', 'same', [['green', 7, 'C'], ['yellow', 6, 'S'], ['blue', 5, 'H']], { c: ['yellow', 'blue'] }],
    ['C5', 'same', [['orange', 6, 'H'], ['red', 7, 'C'], ['purple', 4, 'S']], { c: ['orange', 'red'] }],
    ['C6', 'same', [['blue', 5, 'C'], ['green', 7, 'H'], ['yellow', 6, 'S']], { c: ['yellow', 'green'] }],
    ['C7', 'same', [['purple', 6, 'S'], ['orange', 3, 'H'], ['red', 10, 'C']]]
  ];
  var ORDER = [
    ['O1', 'order', [['red', 8, 'H'], ['blue', 6, 'S'], ['green', 4, 'C']]],
    ['O2', 'order', [['yellow', 3, 'C'], ['purple', 6, 'H'], ['orange', 9, 'S']]],
    ['O3', 'order', [['blue', 7, 'H'], ['green', 6, 'C'], ['red', 5, 'S']]],
    ['O4', 'order', [['orange', 2, 'S'], ['yellow', 6, 'C'], ['purple', 10, 'H']]],
    ['O5', 'order', [['green', 9, 'C'], ['red', 4, 'H'], ['blue', 6, 'S']]],
    ['O6', 'order', [['purple', 5, 'H'], ['orange', 7, 'S'], ['yellow', 6, 'C']]],
    ['O7', 'order', [['red', 6, 'H'], ['green', 3, 'S'], ['blue', 8, 'C']]]
  ];
  /* tall things: [id, kind, picture, [height on stool, on box, on shelf], flags] — i = the trap rounds keep their stands:
     T4 (tallest) the 6 on the high shelf reaches highest; T8 (shortest) the 5 on the high shelf reaches highest, so the eye's
     "top" answer is wrong in both (values re-derived from the stand heights; the design's 9/6/5 and 9/7/4 were not traps) */
  var TALL = [
    ['T1', 'long', 'candle', [8, 5, 4]], ['T2', 'short', 'bottle', [7, 9, 3]], ['T3', 'same', 'candle', [4, 6, 9]],
    ['T4', 'long', 'bottle', [9, 5, 6], { i: 1 }], ['T5', 'short', 'candle', [8, 5, 7]], ['T6', 'same', 'bottle', [6, 3, 8]],
    ['T7', 'long', 'candle', [4, 7, 5]], ['T8', 'short', 'bottle', [8, 6, 5], { i: 1 }], ['T9', 'same', 'candle', [9, 6, 3]]
  ];
  var TALL_ORDER = [
    ['TO1', 'order', 'candle', [7, 6, 4]], ['TO2', 'order', 'bottle', [3, 6, 8]], ['TO3', 'order', 'candle', [6, 9, 5]], ['TO4', 'order', 'bottle', [9, 6, 3]],
    ['TO5', 'order', 'candle', [6, 4, 7]], ['TO6', 'order', 'bottle', [5, 6, 9]], ['TO7', 'order', 'candle', [8, 3, 6]]
  ];
  var DATA = { CORD: CORD, COLOURS: COLOURS, HEX: HEX, PLACES: PLACES, STANDS: STANDS, STAND_H: STAND_H, PICS: PICS, INK: INK, MIXED: MIXED, ORDER: ORDER, TALL: TALL, TALL_ORDER: TALL_ORDER };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function questionOf(q) { return q === 'order' ? 'order' : 'mixed'; }
  function thingsOf(t) { return t === 'tall' ? 'tall' : 'ribbons'; }
  function table(q, t) { q = questionOf(q); t = thingsOf(t); return t === 'tall' ? (q === 'order' ? TALL_ORDER : TALL) : (q === 'order' ? ORDER : MIXED); }
  function ids(q, t) { return table(q, t).map(function (r) { return r[0]; }); }

  /* a round: items = the three things; each item {id, len, colour | stand} */
  function round(q, t, id) {
    var tb = table(q, t), row = null;
    for (var i = 0; i < tb.length; i++) if (tb[i][0] === id) row = tb[i];
    if (!row) row = tb[0];
    var r = { id: row[0], kind: row[1], things: thingsOf(t), question: questionOf(q), cord: CORD, flags: {} };
    if (r.things === 'ribbons') {
      r.items = row[2].map(function (x) { return { id: x[0], colour: x[0], len: x[1], home: x[2] }; });
      r.flags = row[3] || {};
    } else {
      r.pic = row[2];
      r.items = row[3].map(function (h, k) { return { id: STANDS[k], stand: STANDS[k], len: h, home: STANDS[k] }; });
      r.flags = row[4] || {};
    }
    return r;
  }
  function item(r, id) { for (var i = 0; i < r.items.length; i++) if (r.items[i].id === id) return r.items[i]; return null; }
  /* the answer, derived: the unique longer / shorter / equal one, or the order shortest → longest */
  function answer(r) {
    var it = r.items;
    if (r.kind === 'order') return it.slice().sort(function (a, b) { return a.len - b.len; }).map(function (x) { return x.id; });
    var want = r.kind === 'long' ? 'long' : r.kind === 'short' ? 'short' : 'same';
    var hits = it.filter(function (x) { return tagOf(r, x.id) === want; });
    return hits.length === 1 ? hits[0].id : null;
  }
  /* what the cord says about one thing: from len vs the cord, never from anything drawn */
  function tagOf(r, id) { var x = item(r, id); return x.len < r.cord ? 'short' : x.len > r.cord ? 'long' : 'same'; }

  /* where each thing sits at one showing. ribbons: place + a start offset of 0–2 units (halves);
     illusion rounds keep their default places; close calls keep the two rivals in different directions (one hangs). */
  function layout(r, rnd) {
    rnd = rnd || Math.random;
    var out = { place: {}, off: {}, order: null };
    var perm = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; };
    if (r.things === 'ribbons') {
      var p = null;
      if (r.flags.i) p = r.items.map(function (x) { return x.home; });
      else {
        if (r.flags.c) {
          /* a close call: one rival hangs. The ANSWER hangs a quarter of the time — weighted so that over a pass the
             answer is on the hook about a third of the time (illusion rounds S4/S7 already hang theirs) */
          var hang = rnd() < 0.25 ? r.flags.c[0] : r.flags.c[1], rest = perm(['S', 'C']), k2 = 0;
          p = r.items.map(function (x) { return x.id === hang ? 'H' : rest[k2++]; });
        } else p = perm(PLACES);
        if (!p) p = r.items.map(function (x) { return x.home; });
      }
      r.items.forEach(function (x, k) { out.place[x.id] = p[k]; out.off[x.id] = Math.floor(rnd() * 5) / 2; });
    } else {
      /* tall: which object stands on which stand (trap rounds keep theirs), and the stands' left-to-right order */
      var on = r.flags.i ? STANDS.slice() : perm(STANDS);
      r.items.forEach(function (x, k) { out.place[x.id] = on[k]; out.off[x.id] = 0; });
      out.order = perm(STANDS);
    }
    return out;
  }
  function indexOf(r, id) { for (var i = 0; i < r.items.length; i++) if (r.items[i].id === id) return i; return -1; }

  function newState(r, lay) {
    return { r: r, lay: lay || layout(r), tags: {}, chosen: null, slots: [null, null, null], carrying: false, laid: null, misses: 0, show: 0, last: null, done: false, touched: false };
  }
  function clearHelp(st) { st.show = 0; st.last = null; st.touched = true; }
  function pick(st) { if (st.done) return 'no'; st.carrying = true; return 'carrying'; }
  /* lay the cord along one thing (its clip at that thing's start): leaves the tag */
  function measure(st, id) {
    if (st.done || !item(st.r, id)) return null;
    var t = tagOf(st.r, id); st.tags[id] = t; st.laid = id; st.carrying = false; st.touched = true;
    return t;
  }
  function untag(st, id) { if (st.done || !st.tags[id]) return 'no'; delete st.tags[id]; if (st.laid === id) st.laid = null; clearHelp(st); return 'untagged'; }
  function choose(st, id) { if (st.done || !item(st.r, id)) return 'no'; st.chosen = st.chosen === id && st.r.kind !== 'order' ? st.chosen : id; st.carrying = false; clearHelp(st); return 'chosen'; }
  /* order: put a thing on a rail slot (a thing already on the rail moves; an occupied slot swaps) */
  function place(st, id, slot) {
    if (st.done || st.r.kind !== 'order' || !item(st.r, id) || !(slot >= 0 && slot < 3)) return 'no';
    var from = st.slots.indexOf(id), there = st.slots[slot];
    if (from === slot) return 'same';
    if (from >= 0) st.slots[from] = there; else if (there != null) { /* the old one goes back off the rail */ }
    st.slots[slot] = id; st.chosen = null; clearHelp(st);
    return 'placed';
  }
  function unplace(st, slot) { if (st.done || st.slots[slot] == null) return 'no'; st.slots[slot] = null; clearHelp(st); return 'removed'; }

  function check(st) {
    var r = st.r;
    if (st.done) return { result: 'ok' };
    /* the cord must have been to all three first: the indirect comparison is the point (no miss) */
    if (Object.keys(st.tags).length < r.items.length) { var k0 = 'hintTagFirst' + (r.things === 'tall' ? 'Tall' : ''); st.last = { reason: 'none', hint: k0 }; return { result: 'none', hint: k0 }; }
    if (r.kind === 'order') {
      if (st.slots.some(function (x) { return x == null; })) { st.last = { reason: 'none', hint: 'hintFill' }; return { result: 'none', hint: 'hintFill' }; }
      if (st.slots.join() === answer(r).join()) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
    } else {
      if (st.chosen == null) { var k = r.things === 'tall' ? 'hintNoneTall' : 'hintNone'; st.last = { reason: 'none', hint: k }; return { result: 'none', hint: k }; }
      if (st.chosen === answer(r)) { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
    }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss' };
    return { result: 'miss' };
  }
  /* the hint names no thing and no colour: it points at the tags */
  function hint(st) {
    var r = st.r, L = st.last, T = r.things === 'tall' ? 'Tall' : '';
    if (!L) return null;
    if (L.reason === 'none') return { key: L.hint };
    if (L.reason !== 'miss') return null;
    if (st.show >= 2) return { key: 'hintTags2' + T };
    return { key: (r.kind === 'long' ? 'hintLong' : r.kind === 'short' ? 'hintShort' : r.kind === 'same' ? 'hintSame' : 'hintOrder') + T };
  }
  function okOf(st) {
    var r = st.r, T = r.things === 'tall';
    if (r.kind === 'order') return { key: T ? 'okOrderTall' : 'okOrder', order: answer(r) };
    return { key: (r.kind === 'long' ? 'okLong' : r.kind === 'short' ? 'okShort' : 'okSame') + (T ? 'Tall' : ''), id: answer(r) };
  }

  /* geometry in units (the activity scales it): where each ribbon starts and ends, so tests can measure the drawing */
  /* tall: 13 units wide so the smallest object (3 units) stays ≥ 64 px on a 320 px phone */
  var WALL = { ribbons: { W: 18, H: 14.2 }, tall: { W: 13, H: 13.7 } };
  function geom(r, lay) {
    var g = {};
    if (r.things === 'ribbons') {
      r.items.forEach(function (x) {
        var p = lay.place[x.id], o = lay.off[x.id];
        if (p === 'H') g[x.id] = { dir: 'v', x0: 1.6, y0: 1.5 + o, x1: 1.6, y1: 1.5 + o + x.len };
        else if (p === 'S') g[x.id] = { dir: 'h', x0: 4.2 + o, y0: 2.7, x1: 4.2 + o + x.len, y1: 2.7 };
        else g[x.id] = { dir: 'h', x0: 4.2 + o, y0: 11.0, x1: 4.2 + o + x.len, y1: 11.0 };
      });
    } else {
      var floor = WALL.tall.H - 0.4;
      r.items.forEach(function (x) {
        var stand = lay.place[x.id], col = lay.order.indexOf(stand), cx = 2.0 + col * 4.5, foot = floor - STAND_H[stand];
        g[x.id] = { dir: 'v', x0: cx, y0: foot, x1: cx, y1: foot - x.len, stand: stand, foot: foot, top: foot - x.len };
      });
    }
    return g;
  }

  /* order-only reshuffle; never the previous pass; mixed: one kind never three times in a row */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function orderOk(q, t, order) {
    if (questionOf(q) === 'order') return true;
    for (var i = 2; i < order.length; i++) { var a = round(q, t, order[i - 2]).kind, b = round(q, t, order[i - 1]).kind, c = round(q, t, order[i]).kind; if (a === b && b === c) return false; }
    return true;
  }
  function plan(q, t, rnd, prev) {
    rnd = rnd || Math.random;
    var base = ids(q, t), same = function (a, b) { return !!(a && b && a.join() === b.join()); };
    for (var k = 0; k < 400; k++) { var o = shuffle(base, rnd); if (orderOk(q, t, o) && !same(o, prev)) return { order: o }; }
    var f = base.slice(); if (same(f, prev)) f.reverse(); return { order: f };
  }
  function layoutBand(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, CORD: CORD, DATA: DATA, WALL: WALL,
    locale: locale, questionOf: questionOf, thingsOf: thingsOf, ids: ids, round: round, item: item, answer: answer, tagOf: tagOf, layout: layout, geom: geom,
    newState: newState, pick: pick, measure: measure, untag: untag, choose: choose, place: place, unplace: unplace, check: check, hint: hint, okOf: okOf,
    orderOk: orderOk, plan: plan, band: layoutBand
  };
});

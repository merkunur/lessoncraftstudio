/* =====================================================================
   door-tag-core.js — the model of ACTIVITY #93, THE STRETCHING DOOR TAG
   ("Bo's Berry Pantry — Tens and Ones the Smart Way", 1.NBT.B.2). Pure,
   no DOM. Design sheet: docs/activities-rebuild/designs/093-bos-berry-pantry.md
   ---------------------------------------------------------------------
   Bo's shelf holds sealed crates (a crate is ten berries, always) on the
   crate deck and loose berries in a bowl of nine dimples (more spill onto
   the shelf lip). The door tag above the shelf stretches into tens and
   ones on Check — the hidden 0 rolls out behind the ones — and each part
   hangs over the crates or the berries it counts, while the crates crack
   open by tens and the berries count on. Four round types: STOCK (sling
   pieces to make the tag's number), LABEL (write the number of a stocked
   shelf on two wheels, 0–9 each), STRETCH (hang a tens plaque and a ones
   plaque) and OVERFLOW (a spilled bowl: write the number).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DoorTagCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var RANGES = ['50', '99'], CARDS = ['num', 'words'];
  var DIMPLES = 9, LIP = 12, DECK = { '50': 5, '99': 9 };
  /* [type, a, b, c] — stock: [n] · label: [crates, berries] · stretch: [crates, berries, rack] · overflow: [crates, loose] */
  var ROUNDS = {
    '99': [['stock', 34], ['stock', 40], ['label', 2, 5], ['stretch', 6, 3, [60, 6, 3, 30]], ['stock', 28], ['overflow', 1, 13], ['label', 7, 0],
      ['stretch', 8, 5, [80, 5, 8, 50]], ['stock', 13], ['overflow', 3, 16], ['label', 5, 8]],
    '50': [['stock', 34], ['stock', 40], ['label', 2, 5], ['stretch', 4, 7, [40, 7, 4, 70]], ['stock', 28], ['overflow', 1, 14], ['label', 3, 0],
      ['stock', 13], ['overflow', 2, 15]]
  };
  var BERRIES = ['strawberry', 'blueberry', 'raspberry', 'blackberry'];
  var BEAD = { strawberry: '#D9363E', blueberry: '#3D4A8C', raspberry: '#D94C6B', blackberry: '#4A2D4F' };
  var BO = ['forest creatures', 'rabbit'];

  function rangeOf(r) { r = String(r); return RANGES.indexOf(r) >= 0 ? r : '99'; }
  function cardOf(c) { return CARDS.indexOf(c) >= 0 ? c : 'num'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(range) { var n = ROUNDS[rangeOf(range)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the place-value split the tag stretches into */
  function stretch(n) { return { tens: 10 * Math.floor(n / 10), ones: n % 10, t: Math.floor(n / 10), o: n % 10 }; }
  /* a round: what is given, and the number it is about */
  function round(range, idx) {
    range = rangeOf(range);
    var row = ROUNDS[range][idx], r = { range: range, idx: idx, type: row[0], deckMax: DECK[range], berry: BERRIES[idx % BERRIES.length], given: null, rack: null };
    if (row[0] === 'stock') r.n = row[1];
    else if (row[0] === 'overflow') { r.given = { deck: row[1], bowl: Math.min(DIMPLES, row[2]), lip: Math.max(0, row[2] - DIMPLES) }; r.n = 10 * row[1] + row[2]; }
    else { r.given = { deck: row[1], bowl: row[2], lip: 0 }; r.n = 10 * row[1] + row[2]; if (row[0] === 'stretch') r.rack = row[3].slice(); }
    var s = stretch(r.n); r.t = s.t; r.o = s.o;
    return r;
  }
  /* ---- the shelf ---- */
  function value(sh) { return 10 * sh.deck + sh.bowl + sh.lip; }
  function loose(sh) { return sh.bowl + sh.lip; }
  function newState(r) {
    return { r: r, shelf: r.given ? { deck: r.given.deck, bowl: r.given.bowl, lip: r.given.lip } : { deck: 0, bowl: 0, lip: 0 }, order: [],
      wheels: { t: 0, o: 0 }, hooks: { left: null, right: null }, misses: 0, show: 0, last: null, done: false, packed: false };
  }
  function clear(st) { st.show = 0; st.last = null; }
  /* a crate always lands on the deck (it bounces off the bowl); a berry fills the next dimple, then spills onto the lip */
  function fling(st, kind) {
    var sh = st.shelf; if (st.done || st.r.type !== 'stock') return null;
    if (kind === 'crate') { if (sh.deck >= st.r.deckMax) return null; sh.deck++; st.order.push('crate'); clear(st); return { kind: 'crate', at: sh.deck - 1 }; }
    if (kind === 'berry') {
      if (sh.bowl < DIMPLES) { sh.bowl++; st.order.push('berry'); clear(st); return { kind: 'berry', to: 'bowl', at: sh.bowl - 1 }; }
      if (sh.lip < LIP) { sh.lip++; st.order.push('berry'); clear(st); return { kind: 'berry', to: 'lip', at: sh.lip - 1 }; }
    }
    return null;
  }
  /* take back the last piece flung: the lip first, then the bowl, a crate in the order flung — never a gap */
  function takeBack(st, kind) {
    var sh = st.shelf; if (st.done || st.r.type !== 'stock') return false;
    kind = kind || st.order[st.order.length - 1]; if (!kind) return false;
    if (kind === 'crate') { if (!sh.deck) return false; sh.deck--; }
    else if (sh.lip) sh.lip--; else if (sh.bowl) sh.bowl--; else return false;
    var k = st.order.lastIndexOf(kind); if (k >= 0) st.order.splice(k, 1);
    clear(st); return true;
  }
  function turn(st, wheel, d) {
    if (st.done || (st.r.type !== 'label' && st.r.type !== 'overflow')) return false;
    var v = st.wheels[wheel] + d; if (v < 0 || v > 9) return false;   /* the ones wheel stops at 9: there is no 13 to write */
    st.wheels[wheel] = v; clear(st); return true;
  }
  function hang(st, hook, v) {
    if (st.done || st.r.type !== 'stretch' || (hook !== 'left' && hook !== 'right')) return false;
    if (v != null && st.r.rack.indexOf(v) < 0) return false;
    var other = hook === 'left' ? 'right' : 'left';
    if (v != null && st.hooks[other] === v) st.hooks[other] = null;
    if (st.hooks[hook] === v) return false;
    st.hooks[hook] = v; clear(st); return true;
  }
  /* pack ten loose berries into a crate, while ten or more lie loose */
  function pack(sh) { var n = 0; while (sh.bowl + sh.lip >= 10) { var take = 10, fromLip = Math.min(sh.lip, take); sh.lip -= fromLip; sh.bowl -= take - fromLip; sh.deck++; n++; } return n; }

  /* ---- the crack-count: each crate counts ten, every berry one; where it meets or misses the tag ---- */
  function countRun(sh) {
    var ev = [], c = 0, i;
    for (i = 0; i < sh.deck; i++) { c += 10; ev.push({ kind: 'crate', i: i, count: c }); }
    for (i = 0; i < sh.bowl + sh.lip; i++) { c += 1; ev.push({ kind: 'berry', i: i, count: c }); }
    return ev;
  }
  /* what the tag says in this round (the order, the child's wheels, or the child's plaques) */
  function tagOf(st) {
    var r = st.r;
    if (r.type === 'stock') return r.n;
    if (r.type === 'stretch') return st.hooks.left == null || st.hooks.right == null ? null : st.hooks.left + st.hooks.right;
    return 10 * st.wheels.t + st.wheels.o;
  }
  function check(st) {
    var r = st.r, sh = st.shelf; if (st.done) return null;
    var none = null;
    if (r.type === 'stock' && value(sh) === 0) none = 'hintEmpty';
    if ((r.type === 'label' || r.type === 'overflow') && st.wheels.t === 0 && st.wheels.o === 0) none = 'hintWheels';
    if (r.type === 'stretch' && (st.hooks.left == null || st.hooks.right == null)) none = 'hintHooks';
    if (none) { st.last = { reason: 'none', hint: none }; return { result: 'none', hint: none }; }
    var ok, kind = 'other', built = value(sh);
    if (r.type === 'stock') {
      ok = built === r.n;
      if (ok && loose(sh) > 9) { st.packed = pack(sh) > 0; }
      else if (!ok) {
        var L = loose(sh);
        if (r.o !== r.t && sh.deck === r.o && L === r.t) kind = 'reverse';
        else if (sh.deck === 0 && L === r.t) kind = 'face';
        else if (L >= 10) kind = 'overflow';
        else kind = 'crateTen';
      }
    } else if (r.type === 'stretch') {
      ok = st.hooks.left === 10 * r.t && st.hooks.right === r.o;
      if (!ok) kind = st.hooks.left === r.t ? 'face' : (st.hooks.left === 10 * r.o || st.hooks.right === r.t) ? 'reverse' : 'crateTen';
    } else {
      var w = 10 * st.wheels.t + st.wheels.o; ok = w === r.n;
      if (ok && r.type === 'overflow') st.packed = pack(sh) > 0;   /* written right: Bo packs ten of the spilled berries into a crate, so the shelf shows what the number says */
      if (!ok) kind = (st.wheels.t === r.o && st.wheels.o === r.t && r.o !== r.t) ? 'reverse' : w === r.given.deck + r.given.bowl + r.given.lip ? 'crateAsOne' : r.type === 'overflow' ? 'overflow' : 'crateTen';
    }
    if (ok) { st.done = true; st.last = { reason: 'fair', packed: st.packed }; return { result: 'ok', packed: st.packed, run: countRun(sh) }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: kind };
    return { result: 'miss', kind: kind, run: countRun(sh), tag: tagOf(st) };
  }
  function hint(st) {
    var L = st.last, r = st.r; if (!L || L.reason === 'fair') return null;
    if (L.reason === 'none') return { key: L.hint };
    if (st.show >= 2) return { key: 'hintStrong' };
    if (L.reason === 'reverse') return { key: 'hintReverse' };
    if (L.reason === 'face') return { key: 'hintFace', args: { t: r.t, n: r.n, t0: 10 * r.t } };
    if (L.reason === 'overflow') return { key: 'hintOverflow' };
    return { key: 'hintCrateTen' };
  }
  /* what the shelf shows against the tag after a miss in a STOCK round: crates past the tens (coral), missing crates (dotted), missing / extra berries */
  function compare(st) {
    var sh = st.shelf, r = st.r;
    return { extraCrates: Math.max(0, sh.deck - r.t), missingCrates: Math.max(0, r.t - sh.deck), extraBerries: Math.max(0, loose(sh) - r.o), missingBerries: Math.max(0, r.o - Math.min(loose(sh), DIMPLES)) };
  }

  /* ---- order: never the previous pass; the same type never three in a row; no neighbours with the same number ---- */
  function orderOk(range, order) {
    for (var i = 1; i < order.length; i++) {
      var a = round(range, order[i - 1]), b = round(range, order[i]);
      if (a.n === b.n) return false;
      if (i >= 2 && round(range, order[i - 2]).type === a.type && a.type === b.type) return false;
    }
    return true;
  }
  function plan(range, rnd, prev) {
    var all = ids(range), order = all, ok = false;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(range, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order };
  }
  /* the rack's plaques in a shuffled order (never the right pair side by side in tens-ones order at the left) */
  function rackOrder(r, rnd) {
    var o = r.rack.slice();
    for (var k = 0; k < 50; k++) { o = shuffle(r.rack, rnd); if (!(o[0] === 10 * r.t && o[1] === r.o)) break; }
    return o;
  }
  function layout(W) { return { wide: W >= 560, tiny: W < 330, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, BERRIES: BERRIES, BEAD: BEAD, BO: BO }, LOCALES: LOCALES, RANGES: RANGES, CARDS: CARDS, DIMPLES: DIMPLES, LIP: LIP, DECK: DECK,
    rangeOf: rangeOf, cardOf: cardOf, locale: locale, ids: ids, shuffle: shuffle, stretch: stretch, round: round, value: value, loose: loose,
    newState: newState, fling: fling, takeBack: takeBack, turn: turn, hang: hang, pack: pack, countRun: countRun, tagOf: tagOf, check: check, hint: hint,
    compare: compare, orderOk: orderOk, plan: plan, rackOrder: rackOrder, layout: layout
  };
});

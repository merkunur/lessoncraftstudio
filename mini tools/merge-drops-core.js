/* =====================================================================
   merge-drops-core.js — the model of ACTIVITY #83, THE MERGING DROPS
   ("Add Three Numbers", 1.OA.A.2). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/083-numberbond.md
   ---------------------------------------------------------------------
   Three numbers are three drops of beads. Any two drops melt into one in
   any order; a drop of ten or more holds a PEARL (the first ten packed as
   a 2 × 5 frame in a gold ring) and the rest in a droplet. Every order of
   joining ends in the same drop. The child types the total; a miss that
   is the sum of two drops joins exactly those two, so the third is seen
   left outside.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MergeDropsCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['w20', 'w10'];
  var COLOURS = ['A', 'B', 'C'];   /* by place, never by size: coral, teal, gold */
  var TRIPLES = {
    w20: [[3, 4, 5], [2, 3, 6], [5, 6, 7], [4, 4, 5], [2, 5, 7], [6, 2, 5], [7, 4, 3], [5, 5, 6], [5, 8, 2], [6, 4, 9], [9, 7, 1], [6, 3, 7]],
    w10: [[2, 1, 3], [1, 4, 2], [3, 3, 2], [2, 3, 4], [5, 1, 4], [2, 2, 3], [6, 1, 2], [3, 2, 5]]
  };
  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'w20'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = TRIPLES[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function round(level, idx) { level = levelOf(level); var t = TRIPLES[level][idx]; return { level: level, idx: idx, t: t.slice(), total: t[0] + t[1] + t[2] }; }
  /* the friendly pair: two parts that make ten, else a double (positions, or null) */
  function friendly(t) {
    var P = [[0, 1], [0, 2], [1, 2]], k;
    for (k = 0; k < 3; k++) if (t[P[k][0]] + t[P[k][1]] === 10) return P[k];
    for (k = 0; k < 3; k++) if (t[P[k][0]] === t[P[k][1]]) return P[k];
    return null;
  }
  function bestOrder(t) { return friendly(t) || [0, 1]; }
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var k = 0; k < 4000; k++) {
      order = shuffle(all, rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      var bad = false; for (var p = 1; p < order.length && !bad; p++) if (round(level, order[p]).total === round(level, order[p - 1]).total) bad = true;
      if (!bad) break;
    }
    return { order: order };
  }

  /* ---- drops ---- a drop: { id, parts: [{c: 'A'|'B'|'C', n}], n, slot } */
  function newState(r) {
    var drops = r.t.map(function (n, i) { return { id: COLOURS[i], parts: [{ c: COLOURS[i], n: n }], n: n, slot: i }; });
    return { r: r, drops: drops, log: [], typed: '', misses: 0, show: 0, last: null, done: false, sel: null };
  }
  function find(st, id) { for (var i = 0; i < st.drops.length; i++) if (st.drops[i].id === id) return st.drops[i]; return null; }
  function moved(st) { st.show = 0; st.last = null; }
  function isPearl(d) { return d.n >= 10; }
  /* join two drops: the new drop keeps every bead's colour and sits in the TARGET's place */
  function merge(st, fromId, toId) {
    if (st.done || fromId === toId) return null;
    var a = find(st, fromId), b = find(st, toId); if (!a || !b) return null;
    var d = { id: b.id + a.id, parts: b.parts.concat(a.parts), n: a.n + b.n, slot: b.slot };
    st.drops = st.drops.filter(function (x) { return x !== a && x !== b; }); st.drops.push(d);
    st.log.push({ from: a, to: b, made: d }); st.sel = null; moved(st); return d;
  }
  function undo(st) {
    if (st.done || !st.log.length) return false;
    var e = st.log.pop(); st.drops = st.drops.filter(function (x) { return x !== e.made; }); st.drops.push(e.to, e.from); st.drops.sort(function (x, y) { return x.slot - y.slot; });
    moved(st); return true;
  }
  function resetDrops(st) { while (st.log.length) undo(st); }
  /* the beads of a drop in their drawn order: the first ten fill a 2 × 5 frame (the pearl), the rest a droplet */
  function pack(d) {
    var beads = []; d.parts.forEach(function (p) { for (var i = 0; i < p.n; i++) beads.push(p.c); });
    if (d.parts.length === 1) return { single: true, beads: beads };
    return { single: false, pearl: d.n >= 10, ten: beads.slice(0, Math.min(10, beads.length)), rest: beads.slice(10) };
  }
  function type(st, d) {
    if (st.done) return false;
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); moved(st); return true; }
    if (!/^[0-9]$/.test(String(d)) || st.typed.length >= 2 || (st.typed === '' && d === '0')) return false;   /* never a leading 0 */
    st.typed += d; moved(st); return true;
  }
  /* which two ORIGINAL drops sum to n (the forgotten third), or null */
  function subsetMatching(r, n) {
    var t = r.t, P = [[0, 1], [0, 2], [1, 2]];
    for (var k = 0; k < 3; k++) if (t[P[k][0]] + t[P[k][1]] === n) return P[k];
    return null;
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (st.typed === '') { st.last = { reason: 'empty' }; st.show = 0; return { ok: false, reason: 'empty' }; }
    var n = +st.typed;
    if (n === r.total) { st.done = true; st.show = 0; st.last = { reason: 'ok' }; return { ok: true }; }
    st.misses++; var show = Math.min(2, st.misses);   /* held in a local: re-joining the drops below resets st.show */
    var sub = show === 1 ? subsetMatching(r, n) : null;
    /* the apparatus does what the child did: join exactly those two (miss 1, two-drop sum), else join all in the best order */
    resetDrops(st);
    if (sub) { merge(st, COLOURS[sub[1]], COLOURS[sub[0]]); st.last = { reason: 'two', pair: sub, n: n, out: 3 - sub[0] - sub[1] }; }
    else { var b = bestOrder(r.t), third = 3 - b[0] - b[1]; merge(st, COLOURS[b[1]], COLOURS[b[0]]); var made = st.drops.filter(function (x) { return x.parts.length > 1; })[0]; merge(st, COLOURS[third], made.id); st.last = { reason: show >= 2 ? 'count' : 'joined' }; }
    st.show = show;
    return { ok: false, reason: st.last.reason, show: st.show };
  }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason, big = st.r.total >= 10, ten = st.r.total === 10;   /* exactly ten: no ones left over to ask about */
    if (R === 'empty') return 'hEmpty';
    if (R === 'two') return 'hTwo';
    if (R === 'joined') return ten ? 'hPearlTen' : big ? 'hPearl' : 'hJoined';
    return ten ? 'hCountTen' : big ? 'hCount' : 'hCountAll';
  }
  /* the child's own path, as the success line writes it */
  function path(st) {
    var r = st.r;
    if (st.log.length === 2) { var a = st.log[0], b = st.log[1]; return { kind: 'path', a: a.to.n, b: a.from.n, s: a.made.n, c: (b.from === a.made ? b.to : b.from).n, total: b.made.n }; }
    return { kind: 'plain', a: r.t[0], b: r.t[1], c: r.t[2], total: r.total };
  }
  /* the three orders: which pair first, and the running totals */
  function allOrders(r) { return [[0, 1], [0, 2], [1, 2]].map(function (p) { var third = 3 - p[0] - p[1], s = r.t[p[0]] + r.t[p[1]]; return { first: p, a: r.t[p[0]], b: r.t[p[1]], s: s, c: r.t[third], total: s + r.t[third] }; }); }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W, part: wide ? 170 : W < 300 ? 92 : 104, whole: wide ? 196 : 120, bead: wide ? 20 : 11 }; }
  return {
    DATA: { TRIPLES: TRIPLES, COLOURS: COLOURS }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, round: round, friendly: friendly, bestOrder: bestOrder, plan: plan,
    newState: newState, find: find, merge: merge, undo: undo, resetDrops: resetDrops, pack: pack, isPearl: isPearl, type: type,
    subsetMatching: subsetMatching, check: check, hint: hint, path: path, allOrders: allOrders, layout: layout
  };
});

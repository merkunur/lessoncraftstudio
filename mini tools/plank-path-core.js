/* =====================================================================
   plank-path-core.js — the model of ACTIVITY #90, THE PLANK PATH ("Find
   the Missing Number", 1.OA.D.8). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/090-match-pairs.md
   ---------------------------------------------------------------------
   Every equation is a gap in a stream-side path and every number is a
   plank exactly that long. A path has four gaps (four equations, the
   blank in four different places) and a tray of five planks: the four
   answers and one decoy — a real mistake ("add the numbers you see",
   "subtract instead of add") or an answer's neighbour. A plank that is
   too short falls in; one that is too long sticks out; only the number
   that makes the equation true fits. All four fit → the walker crosses.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PlankPathCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['10', '20'], TOP = { '10': 10, '20': 20 };
  /* the paths: four equations (? = the blank) and the decoy */
  var PATHS = {
    '10': [[['?+4=9', '8-?=5', '3+4=?', '?-6=2'], 4], [['2+?=8', '?-3=4', '9-5=?', '?+7=10'], 10], [['?+6=8', '10-?=6', '5+4=?', '?-2=5'], 3],
      [['6+?=9', '?-1=7', '10-4=?', '?+5=6'], 2], [['?+3=7', '9-?=4', '2+8=?', '?-4=2'], 2], [['5+?=7', '?-5=4', '8-7=?', '?+3=9'], 3],
      [['?+2=5', '7-?=1', '4+4=?', '?-5=5'], 9], [['1+?=5', '?-2=7', '6-3=?', '?+2=8'], 7], [['?+1=8', '10-?=8', '3+3=?', '?-1=4'], 9]],
    '20': [[['?+4=13', '14-?=6', '7+8=?', '?-5=7'], 2], [['8+?=11', '?-6=10', '13-7=?', '?+9=18'], 19], [['?+7=15', '16-?=9', '6+5=?', '?-8=6'], 2],
      [['5+?=12', '?-9=4', '18-6=?', '?+6=20'], 5], [['?+8=17', '15-?=11', '9+9=?', '?-3=10'], 7], [['9+?=15', '?-4=12', '20-6=?', '?+5=13'], 18],
      [['?+6=11', '17-?=7', '8+6=?', '?-7=9'], 17], [['7+?=16', '?-8=11', '12-9=?', '?+10=18'], 10], [['?+9=20', '13-?=8', '4+9=?', '?-2=14'], 12]]
  };
  /* the walkers, one per path in a pass (library pictures: dir, key, mirror so it walks left → right) */
  var WALKERS = [['forest creatures', 'rabbit', true], ['forest creatures', 'beaver', false], ['farm animals', 'duckling', false], ['pets', 'tortoise', false],
    ['farm animals', 'pig', false], ['forest creatures', 'fox', false], ['farm animals', 'lamb', false], ['forest creatures', 'squirrel', true], ['farm animals', 'goat', true]];

  function levelOf(l) { l = String(l); return LEVELS.indexOf(l) >= 0 ? l : '10'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = PATHS[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an equation x op y = z, one of x, y, z unknown */
  function parse(s) {
    var m = /^(\d+|\?)([+-])(\d+|\?)=(\d+|\?)$/.exec(s), n = function (v) { return v === '?' ? null : +v; };
    var e = { x: n(m[1]), op: m[2], y: n(m[3]), z: n(m[4]) };
    e.kind = e.op === '+' ? (e.x == null ? 'first' : e.y == null ? 'second' : 'sum') : (e.x == null ? 'start' : e.y == null ? 'takeaway' : 'diff');
    e.ans = e.op === '+' ? (e.x == null ? e.z - e.y : e.y == null ? e.z - e.x : e.x + e.y) : (e.x == null ? e.z + e.y : e.y == null ? e.x - e.z : e.x - e.y);
    return e;
  }
  function text(e, v) { var f = function (x) { return x == null ? (v == null ? '?' : String(v)) : String(x); }; return f(e.x) + (e.op === '+' ? ' + ' : ' − ') + f(e.y) + ' = ' + f(e.z); }
  /* the road a gap draws, in squares from the start post: banks, the open stretch, and where a plank is laid */
  function layout(e) {
    var C = 'c', T = 't';
    switch (e.kind) {
      case 'first': return { whole: e.z, banks: [{ from: e.z - e.y, len: e.y, c: T }], gap: { from: 0, len: e.ans, base: false } };
      case 'second': return { whole: e.z, banks: [{ from: 0, len: e.x, c: C }], gap: { from: e.x, len: e.ans, base: false } };
      case 'takeaway': return { whole: e.x, banks: [{ from: 0, len: e.z, c: C }], gap: { from: e.z, len: e.ans, base: false } };
      case 'start': return { whole: e.z + e.y, banks: [{ from: 0, len: e.z, c: C }, { from: e.z, len: e.y, c: T }], gap: { from: 0, len: e.ans, base: true } };
      case 'sum': return { whole: e.x + e.y, banks: [{ from: 0, len: e.x, c: C }, { from: e.x, len: e.y, c: T }], gap: { from: 0, len: e.ans, base: true } };
      default: return { whole: e.x, banks: [{ from: e.x - e.y, len: e.y, c: T, gone: true }], gap: { from: 0, len: e.ans, base: false } };   /* diff: the taken-away stretch at the end, the rest is the gap */
    }
  }
  function round(level, idx) {
    level = levelOf(level);
    var row = PATHS[level][idx], gaps = row[0].map(parse);
    return { level: level, idx: idx, top: TOP[level], gaps: gaps, answers: gaps.map(function (g) { return g.ans; }), decoy: row[1] };
  }
  /* lay a plank of length p in a gap */
  function fit(e, p) { return p === e.ans ? { fit: 'exact', diff: 0 } : p < e.ans ? { fit: 'short', diff: e.ans - p } : { fit: 'long', diff: p - e.ans }; }

  /* ---- the tray: four answers + the decoy, a fresh order every path; the decoy never in the same slot twice running ---- */
  function tray(r, rnd, prevDecoySlot) {
    var planks = r.answers.concat([r.decoy]), order;
    for (var k = 0; k < 200; k++) { order = shuffle(planks, rnd); if (order.indexOf(r.decoy) !== prevDecoySlot) break; }
    return order;
  }
  function plan(level, rnd, prev) {
    var all = ids(level), order = all;
    for (var k = 0; k < 4000; k++) { order = shuffle(all, rnd); if (!(prev && prev.length && prev.join() === order.join())) break; }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r, trayOrder) {
    return { r: r, tray: trayOrder || r.answers.concat([r.decoy]), laid: [null, null, null, null], selected: 0, misses: [0, 0, 0, 0], last: null, done: false, seen: [false, false, false, false] };
  }
  function used(st, p) { return st.laid.indexOf(p) >= 0; }
  function nextOpen(st, from) { for (var k = 0; k < 4; k++) { var g = (from + k) % 4; if (st.laid[g] == null) return g; } return -1; }
  function select(st, g) { if (st.done || g < 0 || g > 3 || st.laid[g] != null) return false; st.selected = g; st.last = null; return true; }
  /* lay plank p in the selected gap */
  function lay(st, p) {
    if (st.done || st.tray.indexOf(p) < 0 || used(st, p) || st.laid[st.selected] != null) return null;
    var g = st.selected, e = st.r.gaps[g], res = fit(e, p);
    st.seen[g] = true;
    if (res.fit === 'exact') {
      st.laid[g] = p; st.last = { reason: 'fit', gap: g, p: p };
      if (st.laid.every(function (x) { return x != null; })) st.done = true;
      else st.selected = nextOpen(st, g);
      return { gap: g, fit: 'exact', diff: 0, done: st.done };
    }
    st.misses[g]++; st.last = { reason: res.fit, gap: g, p: p, diff: res.diff, help: Math.min(2, st.misses[g]) };
    return { gap: g, fit: res.fit, diff: res.diff, done: false };
  }
  function lift(st, g) { if (st.done || st.laid[g] == null) return false; st.laid[g] = null; st.selected = g; st.last = null; return true; }
  function hint(st) {
    var L = st.last; if (!L || L.reason === 'fit') return null;
    if (L.help >= 2) return 'hCount';
    return L.reason === 'short' ? 'hShort' : 'hLong';
  }
  /* the counting help (miss 2): numbered squares across the open stretch of that gap */
  function countHelp(st) { var L = st.last; if (!L || L.reason === 'fit' || L.help < 2) return null; var lay_ = layout(st.r.gaps[L.gap]); return { gap: L.gap, from: lay_.gap.from, len: lay_.gap.len }; }
  function layoutW(W) { var wide = W >= 620; return { wide: wide, tiny: W < 330, W: W, cols: wide ? 2 : 1 }; }
  return {
    DATA: { PATHS: PATHS, WALKERS: WALKERS }, LOCALES: LOCALES, LEVELS: LEVELS, TOP: TOP,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, parse: parse, text: text, layout: layout, round: round, fit: fit, tray: tray, plan: plan,
    newState: newState, used: used, nextOpen: nextOpen, select: select, lay: lay, lift: lift, hint: hint, countHelp: countHelp, layoutW: layoutW
  };
});

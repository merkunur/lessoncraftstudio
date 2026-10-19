/* =====================================================================
   post-box-core.js — the model of ACTIVITY #40 of the one-by-one rebuild:
   "Count the Sides" → THE NUMBER POST BOX (K.G.B.4; G1/G2 shape sorting,
   real or not, shape names).
   Design sheet: docs/activities-rebuild/designs/040-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: a shape-sorter post box whose doors are NUMBERS (or, in
   the name mode, shape names). Offered a shape, a door lays its sticks one
   on each side: the shape is posted only when the sticks fit — as many
   sticks as sides, a closed figure, straight sides, and for the square and
   rectangle doors the lengths and the square corners.

   What a shape IS comes from its own vertices: corners are counted after
   merging collinear points; lengths and right angles are measured. A
   square fits the rectangle door (it is one); the round tables keep one
   right answer by never dealing a square where a rectangle door could
   take it. A rhombus door also takes squares, so it never meets one.
   No DOM. UMD: window.PostBoxCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PostBoxCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------- the shape catalogue (100 × 100 grid) ---------------- */
  function reg(n, rx, ry, rot) { var p = []; for (var i = 0; i < n; i++) { var a = (rot || 0) + i * 2 * Math.PI / n; p.push([50 + rx * Math.cos(a), 50 + (ry || rx) * Math.sin(a)]); } return p; }
  var H3 = 86.6;
  var CAT = {
    T1: [[50, 0], [100, H3], [0, H3]],
    T2: [[0, 0], [80, 0], [0, 60]],
    T3: [[0, 40], [100, 30], [0, 60]],
    T4: [[0, 0], [100, 20], [30, 70]],
    Q1: [[0, 0], [100, 0], [100, 100], [0, 100]],
    Q2: [[0, 0], [100, 0], [100, 36], [0, 36]],
    Q3: [[20, 0], [80, 0], [100, 60], [0, 60]],
    Q4: [[50, 0], [90, 50], [50, 100], [10, 50]],
    Q5: [[0, 10], [70, 0], [100, 80], [20, 60]],
    Q6: [[0, 0], [100, 0], [100, 60], [0, 60]],
    P1: reg(5, 50, 50, -Math.PI / 2),
    P2: [[0, 40], [50, 0], [100, 40], [100, 100], [0, 100]],
    P3: [[0, 30], [40, 0], [100, 20], [90, 90], [15, 80]],
    H1: reg(6, 50, 50, 0),
    H2: [[0, 30], [20, 0], [80, 0], [100, 30], [80, 60], [20, 60]],
    S7: reg(7, 50, 50, -Math.PI / 2),
    S7b: [[10, 30], [45, 0], [85, 10], [100, 50], [80, 90], [35, 100], [0, 70]],
    O8: reg(8, 50, 50, Math.PI / 8),
    O8b: reg(8, 75, 50, Math.PI / 8)
  };
  /* the near-misses: an open figure (a gap at one corner) and a curved side */
  var NEAR = {
    'N-open3': { base: 'T1', open: 0 }, 'N-curve3': { base: 'T1', curve: 2 }, 'N-4for3': { base: 'Q5' },
    'N-open4': { base: 'Q1', open: 0 }, 'N-curve4': { base: 'Q1', curve: 1 },
    'N-long': { base: 'Q2' }, 'N-skew': { base: 'Q4' }, 'N-5for4': { base: 'P2' }
  };
  function shapeOf(key) {
    if (CAT[key]) return { key: key, verts: CAT[key].map(function (p) { return p.slice(); }), open: null, curve: null };
    var n = NEAR[key]; if (!n) return null;
    return { key: key, verts: CAT[n.base].map(function (p) { return p.slice(); }), open: n.open != null ? n.open : null, curve: n.curve != null ? n.curve : null };
  }

  /* ---------------- measuring a shape ---------------- */
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
  /* corners after merging any vertex that lies on a straight line */
  function corners(verts) {
    var n = verts.length, out = [];
    for (var i = 0; i < n; i++) { var a = verts[(i - 1 + n) % n], b = verts[i], c = verts[(i + 1) % n]; if (Math.abs(cross(a, b, c)) > 1e-6 * dist(a, b) * dist(b, c)) out.push(b); }
    return out;
  }
  function isClosed(s) { return s.open == null; }
  function hasCurve(s) { return s.curve != null; }
  function sidesOf(s) { if (!isClosed(s) || hasCurve(s)) return null; return corners(s.verts).length; }
  function lengths(pts) { return pts.map(function (p, i) { return dist(p, pts[(i + 1) % pts.length]); }); }
  function angleAt(pts, i) { var n = pts.length, a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n], u = [a[0] - b[0], a[1] - b[1]], v = [c[0] - b[0], c[1] - b[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))))) * 180 / Math.PI; }
  function eq(a, b) { return Math.abs(a - b) <= 0.01 * Math.max(a, b); }
  function allEqual(L) { return L.every(function (x) { return eq(x, L[0]); }); }
  function rightAngles(pts) { return pts.every(function (_, i) { return Math.abs(angleAt(pts, i) - 90) <= 1; }); }
  function parallel(a, b, c, d) { var u = [b[0] - a[0], b[1] - a[1]], v = [d[0] - c[0], d[1] - c[1]]; return Math.abs(u[0] * v[1] - u[1] * v[0]) <= 1e-6 * Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]); }
  /* what a closed straight shape is, by its parts */
  function kindOf(s) {
    var n = sidesOf(s); if (!n) return null;
    if (n === 3) return 'tri';
    if (n === 4) {
      var p = corners(s.verts), L = lengths(p), right = rightAngles(p), opp = eq(L[0], L[2]) && eq(L[1], L[3]);
      if (allEqual(L) && right) return 'sq';
      if (opp && right) return 'rect';
      if (allEqual(L)) return 'rhom';
      var pp = (parallel(p[0], p[1], p[3], p[2]) ? 1 : 0) + (parallel(p[1], p[2], p[0], p[3]) ? 1 : 0);
      return pp === 1 ? 'trap' : 'quad';
    }
    return { 5: 'pent', 6: 'hex', 7: 'hept', 8: 'oct' }[n] || null;
  }

  /* ---------------- the doors ---------------- */
  var NAMED = { tri: 3, sq: 4, rect: 4, rhom: 4, pent: 5, hex: 6, hept: 7, oct: 8 };
  function sticksOf(door) { return typeof door === 'number' ? door : NAMED[door]; }
  /* offer a shape to a door: the door lays its sticks one on each side */
  function offer(s, door) {
    if (!isClosed(s)) return { result: 'open' };
    if (hasCurve(s)) return { result: 'curve', side: s.curve };
    var n = sidesOf(s), m = sticksOf(door);
    if (m > n) return { result: 'tooMany', sticks: m, sides: n, diff: m - n };
    if (m < n) return { result: 'tooFew', sticks: m, sides: n, diff: n - m };
    if (typeof door === 'number' || door === 'tri' || door === 'pent' || door === 'hex' || door === 'hept' || door === 'oct') return { result: 'fit' };
    var p = corners(s.verts), L = lengths(p);
    if (door === 'sq') { if (!allEqual(L)) return { result: 'lengths' }; if (!rightAngles(p)) return { result: 'corners' }; return { result: 'fit' }; }
    if (door === 'rect') { if (!(eq(L[0], L[2]) && eq(L[1], L[3]))) return { result: 'lengths' }; if (!rightAngles(p)) return { result: 'corners' }; return { result: 'fit' }; }
    if (door === 'rhom') { if (!allEqual(L)) return { result: 'lengths' }; return { result: 'fit' }; }
    return { result: 'tooFew', sticks: m, sides: n, diff: 0 };
  }
  function fits(s, door) { return offer(s, door).result === 'fit'; }

  /* ---------------- the rounds ---------------- */
  function T(key, turn) { return { key: key, turn: turn == null ? null : turn }; }
  var COUNT = {
    first: [['T1', 0], ['Q2', 20], ['P1', 36], ['H1', 30], ['T3', 90], ['Q1', 45], ['P2', 180], ['H2', 15], ['Q3', 160]],
    more: [['T4', 25], ['Q4', 0], ['P3', 200], ['O8', 22], ['S7', 10], ['H2', 75], ['Q5', 300], ['S7b', 140], ['O8b', 60]]
  };
  var SORT = [
    { doors: [3, 4, 5], tiles: ['T1', 'T2', 'Q1', 'Q3', 'P1', 'P2'], more: [6, 'H1', 'H2'] },
    { doors: [4, 5, 6], tiles: ['Q2', 'Q4', 'P3', 'P1', 'H1', 'H2'], more: [7, 'S7', 'S7b'] },
    { doors: [3, 4, 6], tiles: ['T3', 'T4', 'Q5', 'Q1', 'H2', 'H1'], more: [5, 'P1', 'P3'] },
    { doors: [3, 5, 6], tiles: ['T2', 'T1', 'P2', 'P3', 'H1', 'H2'], more: [8, 'O8', 'O8b'] },
    { doors: [3, 4, 5], tiles: ['T4', 'T3', 'Q4', 'Q2', 'P3', 'P2'], more: [6, 'H1', 'H2'] },
    { doors: [4, 5, 6], tiles: ['Q3', 'Q5', 'P1', 'P2', 'H2', 'H1'], more: [7, 'S7', 'S7b'] },
    { doors: [3, 4, 6], tiles: ['T1', 'T3', 'Q2', 'Q4', 'H1', 'H2'], more: [5, 'P1', 'P3'] },
    { doors: [3, 5, 6], tiles: ['T4', 'T2', 'P1', 'P3', 'H2', 'H1'], more: [8, 'O8', 'O8b'] },
    { doors: [3, 4, 5], tiles: ['T3', 'T1', 'Q5', 'Q3', 'P2', 'P1'], more: [6, 'H1', 'H2'] }
  ];
  var REAL = [
    { target: 'tri', tiles: [T('T1', 150), T('T3'), T('N-open3'), T('N-curve3'), T('N-4for3')] },
    { target: 'sq', tiles: [T('Q1', 45), T('N-long'), T('N-curve4'), T('N-open4'), T('N-skew')] },
    { target: 'rect', tiles: [T('Q2', 0), T('Q6', 70), T('N-skew'), T('N-curve4'), T('N-open4')] },
    { target: 'tri', tiles: [T('T2'), T('T4'), T('T3', 200), T('N-open3'), T('N-4for3')] },
    { target: 'sq', tiles: [T('Q1', 0), T('Q1', 20), T('N-long'), T('N-skew'), T('N-open4')] },
    { target: 'rect', tiles: [T('Q6', 110), T('N-open4'), T('N-curve4'), T('N-skew'), T('N-5for4')] },
    { target: 'tri', tiles: [T('T4', 90), T('N-curve3'), T('N-open3'), T('N-4for3'), T('N-5for4')] },
    { target: 'sq', tiles: [T('Q1', 70), T('Q1', 10), T('Q1', 45), T('N-long'), T('N-curve4')] },
    { target: 'rect', tiles: [T('Q2', 30), T('Q6', 160), T('N-skew'), T('N-open4'), T('N-curve4')] }
  ];
  var NAME = [
    { doors: ['tri', 'sq', 'pent'], tiles: [T('T1', 150), T('T3'), T('Q1', 45), T('P1'), T('P2')], more: 'hept' },
    { doors: ['rect', 'tri', 'hex'], tiles: [T('Q2'), T('Q6', 30), T('T4'), T('H1'), T('H2')], more: 'oct' },
    { doors: ['sq', 'hex', 'pent'], tiles: [T('Q1'), T('Q1', 20), T('H2', 75), T('P3'), T('P1', 36)], more: 'hept' },
    { doors: ['tri', 'rect', 'pent'], tiles: [T('T2'), T('Q6'), T('Q2', 110), T('P2', 180), T('T3', 90)], more: 'rhom' },
    { doors: ['hex', 'sq', 'tri'], tiles: [T('H1', 30), T('Q1', 70), T('T4'), T('T1'), T('H2')], more: 'hept' },
    { doors: ['pent', 'rect', 'hex'], tiles: [T('P1'), T('P3', 200), T('Q2', 160), T('H1'), T('Q6')], more: 'oct' },
    { doors: ['sq', 'tri', 'hex'], tiles: [T('Q1', 45), T('T3'), T('T2', 200), T('H2'), T('Q1')], more: 'hept' },
    { doors: ['rect', 'pent', 'tri'], tiles: [T('Q6', 70), T('P2'), T('T1'), T('Q2'), T('P3')], more: 'rhom' },
    { doors: ['hex', 'sq', 'pent'], tiles: [T('H2', 15), T('H1'), T('Q1', 10), T('P1', 36), T('P2')], more: 'hept' }
  ];
  var MORE_TILES = { hept: [T('S7', 10), T('S7b', 140)], oct: [T('O8', 22), T('O8b', 60)], rhom: [T('Q4', 0), T('Q4', 40)] };
  var TURNS = [0, 20, 45, 70, 110, 160, 200, 250, 300, 335];

  var MODES = ['count', 'sort', 'real', 'name'], LEVELS = ['first', 'more'];
  function mode(v) { return MODES.indexOf(v) >= 0 ? v : 'count'; }
  function level(v) { return LEVELS.indexOf(v) >= 0 ? v : 'first'; }
  function rounds(md, lv) {
    md = mode(md); lv = level(lv);
    if (md === 'count') return COUNT[lv].map(function (c, i) { var s = shapeOf(c[0]); return { id: 'C' + (lv === 'more' ? 'm' : '') + (i + 1), mode: md, level: lv, doors: lv === 'more' ? [3, 4, 5, 6, 7, 8] : [3, 4, 5, 6], tiles: [{ id: 't0', key: c[0], turn: c[1] }], answer: sidesOf(s) }; });
    if (md === 'sort') return SORT.map(function (r, i) { var doors = r.doors.slice(), keys = r.tiles.slice(); if (lv === 'more') { doors.push(r.more[0]); doors.sort(function (a, b) { return a - b; }); keys.push(r.more[1], r.more[2]); } return { id: 'S' + (lv === 'more' ? 'm' : '') + (i + 1), mode: md, level: lv, doors: doors, tiles: keys.map(function (k, j) { return { id: 't' + j, key: k, turn: null }; }) }; });
    if (md === 'real') return REAL.map(function (r, i) { var tiles = r.tiles.slice(); if (lv === 'more') tiles.push(T(r.target === 'tri' ? 'N-curve3' : 'N-curve4', 250)); return { id: 'R' + (lv === 'more' ? 'm' : '') + (i + 1), mode: md, level: lv, target: r.target, doors: [r.target], tiles: tiles.map(function (t, j) { return { id: 't' + j, key: t.key, turn: t.turn }; }) }; });
    return NAME.map(function (r, i) { var doors = r.doors.slice(), tiles = r.tiles.slice(); if (lv === 'more') { doors.push(r.more); tiles = tiles.concat(MORE_TILES[r.more]); } return { id: 'N' + (lv === 'more' ? 'm' : '') + (i + 1), mode: md, level: lv, doors: doors, tiles: tiles.map(function (t, j) { return { id: 't' + j, key: t.key, turn: t.turn }; }) }; });
  }
  function tileShape(t) { return shapeOf(t.key); }
  /* is this tile one the round asks to post? */
  function isReal(r, t) { var s = tileShape(t); return r.mode === 'real' ? fits(s, r.target) : true; }
  function rightDoor(r, t) { var s = tileShape(t), D = r.doors.filter(function (d) { return fits(s, d); }); return D.length === 1 ? D[0] : D.length ? D : null; }

  /* ---------------- state ---------------- */
  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function hashId(id) { var h = 7; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return h; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function newState(r, rnd) {
    rnd = rnd || seeded(hashId(r.id));
    var turns = shuffle(TURNS.slice(), rnd), ti = 0;
    var tiles = r.tiles.map(function (t) { var turn = t.turn; if (turn == null) turn = r.mode === 'count' ? 0 : turns[ti++ % turns.length]; return { id: t.id, key: t.key, turn: turn, posted: false }; });
    var slots = r.mode === 'count' ? tiles.map(function (t) { return t.id; }) : shuffle(tiles.map(function (t) { return t.id; }), rnd);
    var doors = r.doors.slice();
    if (r.mode === 'name') doors = shuffle(doors, rnd);
    return { r: r, tiles: tiles, slots: slots, doors: doors, pegs: [], bounces: 0, offers: 0, misses: 0, help: 0, show: false, done: false, last: null, posted: [] };
  }
  function tileById(st, id) { for (var i = 0; i < st.tiles.length; i++) if (st.tiles[i].id === id) return st.tiles[i]; return null; }
  /* offer a tile to a door: a fit posts it; anything else bounces — free, the sticks show why */
  function post(st, id, door) {
    if (st.done) return null;
    var t = tileById(st, id); if (!t || t.posted || st.doors.indexOf(door) < 0) return null;
    var o = offer(tileShape(t), door);
    st.offers++; st.show = false;
    st.last = { tile: id, door: door, res: o };
    if (o.result === 'fit') {
      t.posted = true; st.posted.push(id);
      if (st.r.mode === 'count') { st.done = true; st.result = 'ok'; }
      return o;
    }
    if (st.r.mode === 'count') { st.bounces++; st.help = st.bounces >= 4 ? 2 : st.bounces >= 2 ? 1 : 0; st.misses = st.help; }
    return o;
  }
  /* pegs: one per side, in order; only the last can be lifted */
  function plantPeg(st, side) {
    if (st.r.mode !== 'count' || st.done) return null;
    var n = sidesOf(tileShape(st.tiles[0])); if (side < 0 || side >= n) return null;
    var at = st.pegs.indexOf(side);
    if (at < 0) { st.pegs.push(side); return 'plant'; }
    if (at === st.pegs.length - 1) { st.pegs.pop(); return 'lift'; }
    return 'wiggle';
  }
  function liftPeg(st) { if (st.r.mode !== 'count' || !st.pegs.length || st.done) return false; st.pegs.pop(); return true; }
  function spin(st, id) { var t = tileById(st, id); if (!t || t.posted) return false; t.turn = (t.turn + 45) % 360; return true; }
  /* what is still to post: every real tile (real mode), every tile (sort, name) */
  function remaining(st) { var r = st.r; return st.tiles.filter(function (t) { return !t.posted && isReal(r, t); }); }
  function check(st) {
    var r = st.r;
    if (st.done) return st.last;
    if (r.mode === 'count') { st.last = { check: 'count' }; return st.last; }
    if (!st.offers) { st.last = { check: 'start' }; return st.last; }
    if (remaining(st).length) { st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { check: 'left', left: remaining(st).map(function (t) { return t.id; }) }; return st.last; }
    st.done = true; st.result = 'ok'; st.last = { check: 'ok' }; return st.last;
  }
  function hint(st) {
    var l = st.last, r = st.r; if (!l || st.done) return null;
    if (r.mode === 'count') {
      if (l.check === 'count' && !st.offers) return 'hintStart';
      if (st.help >= 2) return 'hintCount2';
      if (st.help >= 1) return 'hintCount1';
      return l.check === 'count' ? 'hintStart' : null;
    }
    if (l.check === 'start') return 'hintStartTray';
    if (l.check === 'left') return st.help >= 2 ? 'hintTray2' : 'hintTray1';
    return null;
  }
  /* the result line after an offer (for the note and the screen reader) */
  function resultKey(o) { return o ? { fit: null, tooMany: 'resTooMany', tooFew: 'resTooFew', open: 'resOpen', curve: 'resCurve', lengths: 'resLengths', corners: 'resCorners' }[o.result] : null; }

  /* order-only reshuffle: never the previous order; never the same answer three rounds running */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 400; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      shuffle(o, rnd);
      if (prev && n > 1 && o.join() === prev.join()) continue;
      var bad = false; for (var q = 2; q < n; q++) { var a = pool[o[q]].answer; if (a != null && a === pool[o[q - 1]].answer && a === pool[o[q - 2]].answer) { bad = true; break; } }
      if (bad) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  function layout(W, r) {
    var wide = W >= 560, narrow = W < 340, nd = r.doors.length;
    var L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.big = wide ? 220 : narrow ? 140 : 150;               /* the counting shape */
    L.tile = wide ? 96 : narrow ? 76 : 84;                 /* tray tiles */
    L.cols = wide ? (r.tiles.length <= 6 ? r.tiles.length : Math.ceil(r.tiles.length / 2)) : (r.tiles.length > 6 ? 4 : 3);
    if (!wide && r.tiles.length > 6) L.tile = Math.min(L.tile, Math.floor((W - 16 - 3 * 8) / 4));
    if (r.mode === 'real') { L.doorW = wide ? 180 : 160; L.doorH = wide ? 150 : 120; L.doorCols = 1; }
    else {
      L.doorCols = (!wide && nd > 4) ? 3 : (!wide && r.mode === 'name' && nd > 3) ? 2 : nd;
      L.doorW = Math.min(wide ? 104 : 96, Math.floor((W - 24 - (L.doorCols - 1) * 8) / L.doorCols));
      L.doorH = (!wide && nd > 4) ? 74 : (!wide && r.mode === 'name' && nd > 3) ? 70 : wide ? 120 : 104;
    }
    return L;
  }
  function fitted(s, turn, size) {
    var c = [0, 0]; s.verts.forEach(function (p) { c[0] += p[0]; c[1] += p[1]; }); c[0] /= s.verts.length; c[1] /= s.verts.length;
    var a = (turn || 0) * Math.PI / 180, R = s.verts.map(function (p) { var x = p[0] - c[0], y = p[1] - c[1]; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; });
    var xs = R.map(function (p) { return p[0]; }), ys = R.map(function (p) { return p[1]; }), w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys), k = size / Math.max(w, h), mx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, my = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2;
    return R.map(function (p) { return [(p[0] - mx) * k, (p[1] - my) * k]; });
  }

  return {
    CAT: CAT, NEAR: NEAR, NAMED: NAMED, MODES: MODES, LEVELS: LEVELS, TURNS: TURNS,
    shapeOf: shapeOf, corners: corners, sidesOf: sidesOf, isClosed: isClosed, hasCurve: hasCurve, lengths: lengths, angleAt: angleAt, kindOf: kindOf,
    sticksOf: sticksOf, offer: offer, fits: fits,
    mode: mode, level: level, rounds: rounds, tileShape: tileShape, isReal: isReal, rightDoor: rightDoor,
    newState: newState, tileById: tileById, post: post, plantPeg: plantPeg, liftPeg: liftPeg, spin: spin, remaining: remaining,
    check: check, hint: hint, resultKey: resultKey, order: order, layout: layout, fitted: fitted
  };
}));

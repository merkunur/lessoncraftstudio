/* =====================================================================
   trundle-wheel-core.js — the model of ACTIVITY #169 of the one-by-one
   rebuild: "Sort Shapes by Sides" → THE TRUNDLE WHEEL (2.G.A.1).
   Pure, no DOM. Design: docs/activities-rebuild/designs/169-sort-bins.md
   ---------------------------------------------------------------------
   Every shape is a wonky trundle wheel: on the lane it tips over its front
   corner onto its next side, again and again, and each side that lands
   prints a dash on the paper strip (as long as the side) with a mark for
   the corner it tipped over (a dot, or a little open square for a square
   corner). When the start side (coral) comes round again the ticket is
   done: n dashes, n marks, a full turn of 360°. Then the shape is sorted on
   one of three boards: sides crates, the quadrilateral cabinet (equal
   sides × square corners, with a missing cell in Q5–Q8), or two rings
   ("four sides", "a square corner"). Everything is derived from the
   vertices — never from a table of answers.
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var BOARDS = ['sides', 'quads', 'rings'];
  var REG = function (angles) { return angles.map(function (a) { var r = a * Math.PI / 180; return [50 + 40 * Math.cos(r), 50 - 40 * Math.sin(r)]; }); };
  /* the catalogue: unit box 0–100, y down (design §6) */
  var SHAPES = {
    tri_equi: REG([90, 210, 330]),
    tri_right: [[16, 16], [16, 86], [86, 86]],
    tri_obtuse: [[8, 72], [92, 72], [34, 46]],
    tri_tall: [[50, 8], [30, 92], [70, 92]],
    tri_scalene: [[10, 80], [90, 62], [38, 14]],
    quad_square: [[18, 18], [82, 18], [82, 82], [18, 82]],
    quad_square45: REG([90, 0, 270, 180]),
    quad_rect: [[8, 28], [92, 28], [92, 72], [8, 72]],
    quad_rect_thin: [[6, 40], [94, 40], [94, 60], [6, 60]],
    quad_rhombus60: [[14, 50], [50, 29.2], [86, 50], [50, 70.8]],
    quad_trap: [[26, 28], [74, 28], [92, 78], [8, 78]],
    quad_right_trap: [[16, 20], [60, 20], [88, 80], [16, 80]],
    quad_para: [[30, 28], [92, 28], [70, 78], [8, 78]],
    quad_kite: [[50, 4], [80, 40], [50, 92], [20, 40]],
    quad_irreg: [[85, 48], [37, 9], [20, 46], [35, 86]],
    pent_reg: REG([90, 162, 234, 306, 18]),
    pent_house: [[18, 46], [50, 6], [82, 46], [82, 84], [18, 84]],
    pent_irreg: [[20, 24], [66, 12], [90, 48], [64, 88], [14, 72]],
    hex_reg: REG([90, 150, 210, 270, 330, 30]),
    hex_irreg: [[30, 18], [70, 18], [90, 50], [70, 82], [30, 82], [10, 50]],
    hex_long: [[8, 50], [26, 22], [74, 22], [92, 50], [74, 78], [26, 78]],
    hex_lopsided: [[20, 14], [62, 10], [90, 38], [84, 78], [40, 92], [10, 58]]
  };
  var I = function (s) { var p = s.split('@'); return { id: p[0], rot: p.length > 1 ? +p[1] : 0 }; };
  var items = function (s) { return s.split(' · ').map(I); };
  /* board A — sides crates (the 8 old rounds kept as A1–A8, A9 new) */
  var SIDES = [
    { crates: [3, 4, 5], tray: items('tri_equi@180 · tri_right@0 · quad_square@0 · quad_rect@90 · pent_reg@0 · pent_house@180') },
    { crates: [3, 4, 6], tray: items('tri_equi@0 · tri_obtuse@200 · quad_square45@0 · quad_trap@180 · hex_reg@0 · hex_irreg@30') },
    { crates: [4, 5, 6], tray: items('quad_square@20 · quad_para@0 · pent_reg@36 · pent_house@0 · hex_reg@15 · hex_irreg@90') },
    { crates: [3, 4], tray: items('tri_equi@0 · tri_right@135 · tri_obtuse@0 · quad_square@0 · quad_rect@30 · quad_square45@0 · quad_trap@0') },
    { crates: [3, 4, 5, 6], tray: items('tri_tall@0 · quad_trap@0 · pent_reg@0 · hex_reg@0 · quad_rect@0 · hex_irreg@0') },
    { crates: [3, 5], tray: items('tri_equi@60 · tri_right@0 · tri_obtuse@0 · pent_reg@180 · pent_house@90') },
    { crates: [4, 6], tray: items('quad_square@0 · quad_rect@0 · quad_square45@0 · hex_reg@0 · hex_irreg@0') },
    { crates: [3, 4, 5, 6], tray: items('tri_obtuse@0 · quad_para@180 · pent_house@0 · hex_irreg@0 · quad_rect@0 · pent_reg@0') },
    { crates: [5, 6], tray: items('pent_irreg@0 · pent_house@200 · pent_reg@0 · hex_long@0 · hex_lopsided@0 · hex_reg@30') }
  ];
  /* board B — the quadrilateral cabinet (Q5–Q8: one cell empty, three candidates in the drawer) */
  var QUADS = [
    { tray: items('quad_square@0 · quad_rect@0 · quad_rhombus60@0 · quad_trap@0 · quad_square45@0') },
    { tray: items('quad_square45@0 · quad_rect_thin@30 · quad_rhombus60@90 · quad_para@0 · quad_kite@0') },
    { tray: items('quad_square@15 · quad_rect@90 · quad_rhombus60@30 · quad_irreg@0 · quad_kite@30') },
    { tray: [{ id: 'quad_square', rot: 0, size: 0.6 }].concat(items('quad_square45@0 · quad_rect@60 · quad_rhombus60@150 · quad_para@120')) },
    { tray: items('quad_rect@0 · quad_rhombus60@0 · quad_trap@0'), drawer: items('quad_square@45 · quad_rhombus60@45 · quad_rect_thin@0') },
    { tray: items('quad_square@0 · quad_rhombus60@0 · quad_kite@0'), drawer: items('quad_rect_thin@45 · quad_para@0 · quad_kite@90') },
    { tray: items('quad_square45@0 · quad_rect@0 · quad_irreg@0'), drawer: items('quad_rhombus60@120 · quad_kite@0 · quad_rect@20') },
    { tray: items('quad_square@0 · quad_rect@0 · quad_rhombus60@0'), drawer: items('quad_para@0 · quad_square@30 · quad_rect_thin@60') }
  ];
  /* board C — two rings: A "four sides", B "a square corner" */
  var RINGS = [
    { tray: items('quad_square · quad_rhombus60 · tri_right · tri_equi · pent_house · hex_reg') },
    { tray: items('quad_rect · quad_para · tri_right@135 · pent_reg · quad_kite') },
    { tray: items('quad_right_trap · quad_trap · pent_house@180 · hex_long · quad_square45') },
    { tray: items('quad_rect_thin@30 · quad_irreg · tri_right@200 · tri_obtuse · pent_irreg') },
    { tray: items('quad_square@15 · quad_rhombus60 · pent_house · hex_irreg · tri_tall') },
    { tray: items('quad_para@90 · quad_kite · tri_right · quad_rect · hex_lopsided') },
    { tray: items('quad_square45 · quad_trap@180 · pent_house@90 · pent_reg · tri_scalene') },
    { tray: items('quad_right_trap@90 · quad_rhombus60@60 · tri_right@45 · hex_reg · quad_irreg') }
  ];
  var POOL = { sides: SIDES, quads: QUADS, rings: RINGS };

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function boardOf(v) { return BOARDS.indexOf(String(v)) >= 0 ? String(v) : 'sides'; }
  function rounds(board) { board = boardOf(board); return POOL[board].map(function (r, i) { var o = { k: i, board: board }; for (var p in r) o[p] = r[p]; return o; }); }
  function passSize(board) { return rounds(board).length; }

  /* ---- geometry, from the vertices only ---- */
  function centroid(v) { var x = 0, y = 0; v.forEach(function (p) { x += p[0]; y += p[1]; }); return [x / v.length, y / v.length]; }
  function rotate(v, deg, c) { var a = deg * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a); c = c || centroid(v); return v.map(function (p) { var dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * cs - dy * sn, c[1] + dx * sn + dy * cs]; }); }
  function verts(id, rot) { var v = SHAPES[id]; if (!v) throw new Error('no shape ' + id); return rotate(v, rot || 0); }
  function lens(v) { return v.map(function (p, i) { var q = v[(i + 1) % v.length]; return Math.hypot(q[0] - p[0], q[1] - p[1]); }); }
  /* the interior angle at each vertex i (between side i-1 and side i), degrees */
  function angles(v) { var n = v.length; return v.map(function (p, i) { var a = v[(i + n - 1) % n], b = v[(i + 1) % n]; var u = [a[0] - p[0], a[1] - p[1]], w = [b[0] - p[0], b[1] - p[1]]; var c = (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1])); return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI; }); }
  function convex(v) { var n = v.length, sign = 0; for (var i = 0; i < n; i++) { var a = v[i], b = v[(i + 1) % n], c = v[(i + 2) % n]; var z = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]); if (Math.abs(z) < 1e-9) continue; var s = z > 0 ? 1 : -1; if (sign && s !== sign) return false; sign = s; } return true; }
  var isSquare = function (a) { return Math.abs(a - 90) <= 0.5; };
  function info(v) {
    var L = lens(v), A = angles(v), mean = L.reduce(function (s, x) { return s + x; }, 0) / L.length;
    var sq = A.map(isSquare);
    return { n: v.length, lens: L, angles: A, squares: sq.filter(Boolean).length, allSquare: sq.every(Boolean), hasSquare: sq.some(Boolean), allEqual: L.every(function (x) { return Math.abs(x - mean) <= 0.01 * mean; }) };
  }
  function infoOf(it) { return info(verts(it.id, it.rot)); }

  /* ---- the roll ---- */
  /* the side it lands on when dropped on the dock: the side whose midpoint is lowest (y down) */
  function bottomSide(v) { var best = 0, by = -1e9; v.forEach(function (p, i) { var q = v[(i + 1) % v.length], y = (p[1] + q[1]) / 2; if (y > by + 1e-9) { by = y; best = i; } }); return best; }
  /* the plan of a full roll to the right from start side s: the polygon placed with side s on the ground (y = 0, the body above,
     y < 0) from x = 0; then the sides in the order they land, each corner's exterior angle and mark */
  function rollPlan(v, s) {
    var n = v.length, A = v[s], B = v[(s + 1) % n];
    var ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    var placed = rotate(v, -ang * 180 / Math.PI, A).map(function (p) { return [p[0] - A[0], p[1] - A[1]]; });
    /* the body must be above the ground; if it hangs below, mirror the side direction (start at B instead) */
    var cy = centroid(placed)[1], dir = 1;
    if (cy > 0) { ang = Math.atan2(A[1] - B[1], A[0] - B[0]); placed = rotate(v, -ang * 180 / Math.PI, B).map(function (p) { return [p[0] - B[0], p[1] - B[1]]; }); dir = -1; }
    var L = lens(v), An = angles(v), order = [], marks = [], ext = [];
    /* rolling right tips over the front corner: with dir = 1 that is vertex s+1 and the next side is s+1; with dir = -1 vertex s and side s-1 */
    for (var k = 0; k < n; k++) {
      var side = dir > 0 ? (s + k) % n : (s - k + n) % n, corner = dir > 0 ? (side + 1) % n : side;
      order.push(side); marks.push(isSquare(An[corner]) ? 'sq' : 'dot'); ext.push(180 - An[corner]);
    }
    return { start: s, order: order, dashes: order.map(function (i) { return L[i]; }), marks: marks, ext: ext, placed: placed };
  }
  /* the pose after `step` sides have tipped and a fraction t of the next tip: points relative to the ground (y up is negative) */
  function poseAt(plan, step, t) {
    var pts = plan.placed.map(function (p) { return p.slice(); }), x = 0;
    var turn = function (deg, cx) { var a = deg * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a); pts = pts.map(function (p) { var dx = p[0] - cx, dy = p[1]; return [cx + dx * cs - dy * sn, dx * sn + dy * cs]; }); };
    for (var k = 0; k < step && k < plan.order.length; k++) { x += plan.dashes[k]; turn(plan.ext[k], x); }
    if (t > 0 && step < plan.order.length) turn(plan.ext[step] * t, x + plan.dashes[step]);
    return { pts: pts, x: x };
  }
  function totalTurn(plan) { return plan.ext.reduce(function (s, e) { return s + e; }, 0); }
  function ticketOf(it) { var v = verts(it.id, it.rot); var p = rollPlan(v, bottomSide(v)); return { dashes: p.dashes, marks: p.marks, start: p.start }; }

  /* ---- the boards ---- */
  var CELLS = ['TL', 'TR', 'BL', 'BR'];
  /* cabinet: top row = all four sides equal, left column = four square corners */
  function cellOf(inf) { return (inf.allEqual ? 'T' : 'B') + (inf.allSquare ? 'L' : 'R'); }
  /* rings: A = four sides, B = a square corner */
  function regionOf(inf) { var a = inf.n === 4, b = inf.hasSquare; return a && b ? 'AB' : a ? 'A' : b ? 'B' : 'out'; }
  function placeFor(board, inf) { return board === 'sides' ? inf.n : board === 'quads' ? cellOf(inf) : regionOf(inf); }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var seedSize = function (id, k) { var h = 0, s = id + ':' + k; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return 0.8 + (h % 21) / 100; };
  /* the missing cell of a cabinet round: the one cell its tray does not fill */
  function missingCell(r) { if (!r.drawer) return null; var have = r.tray.map(function (it) { return cellOf(infoOf(it)); }); return CELLS.filter(function (c) { return have.indexOf(c) < 0; })[0]; }

  /* a fresh round: the tray in a new order (no three neighbours share a place), the crates and the drawer reshuffled */
  function newState(board, k, rnd) {
    board = boardOf(board); rnd = rnd || Math.random;
    var pool = rounds(board), r = pool[((k % pool.length) + pool.length) % pool.length];
    var make = function (it, i, from) { return { key: from + i, id: it.id, rot: it.rot, size: it.size || seedSize(it.id, r.k * 10 + i), place: null, ticket: null, from: from }; };
    var tray = r.tray.map(function (it, i) { return make(it, i, 't'); }), order;
    for (var tries = 0; tries < 200; tries++) {
      order = shuffle(tray.slice(), rnd);
      var ok = true; for (var i = 2; i < order.length; i++) { var a = placeFor(board, infoOf(order[i])), b = placeFor(board, infoOf(order[i - 1])), c = placeFor(board, infoOf(order[i - 2])); if (a === b && b === c) ok = false; }
      if (ok) break;
    }
    var drawer = r.drawer ? shuffle(r.drawer.map(function (it, i) { return make(it, i, 'd'); }), rnd) : [];
    return { board: board, k: r.k, round: r, items: order.concat(drawer), crates: r.crates ? shuffle(r.crates.slice(), rnd) : null,
      missing: missingCell(r), docked: null, step: 0, misses: 0, help: false, verdict: null, done: false, touched: false };
  }
  function item(st, key) { for (var i = 0; i < st.items.length; i++) if (st.items[i].key === key) return st.items[i]; return null; }
  function changed(st) { st.verdict = null; st.touched = true; }
  /* the places of the current board */
  function places(st) { return st.board === 'sides' ? st.crates.slice() : st.board === 'quads' ? CELLS.slice() : ['A', 'B', 'AB', 'out']; }
  /* put a shape somewhere: a place on the board, 'tray' (back), or 'dock' (onto the lane) */
  function put(st, key, where) {
    var it = item(st, key); if (st.done || !it) return false;
    if (where === 'dock') { if (st.docked === key) return false; st.docked = key; st.step = 0; it.place = null; it.ticket = null; changed(st); return true; }
    if (where !== 'tray' && places(st).indexOf(where) < 0) return false;
    if (st.docked === key) { st.docked = null; st.step = 0; }
    var to = where === 'tray' ? null : where; if (it.place === to) return false;
    it.place = to; changed(st); return true;
  }
  /* roll the docked shape one side (d = 1) or back (d = −1); the last side lands on the start again → the ticket is done */
  function roll(st, d) {
    if (st.done || st.docked == null) return null;
    var it = item(st, st.docked), v = verts(it.id, it.rot), plan = rollPlan(v, bottomSide(v)), n = plan.order.length;
    var s = st.step + (d < 0 ? -1 : 1);
    if (s < 0) return null;
    st.step = s; st.touched = true; st.verdict = null;
    if (s >= n) { it.ticket = { dashes: plan.dashes, marks: plan.marks, start: plan.start }; st.docked = null; st.step = 0; return 'done'; }
    return 'step';
  }
  /* the shapes that must be placed: the tray, and in Q5–Q8 exactly one drawer shape in the empty cell */
  function wrongItems(st) {
    var out = [];
    st.items.forEach(function (it) {
      var inf = infoOf(it);
      if (it.from === 't') { if (it.place !== placeFor(st.board, inf)) out.push(it); }
      else if (it.place != null && it.place !== placeFor(st.board, inf)) out.push(it);
    });
    return out;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var unplaced = st.items.filter(function (it) { return it.from === 't' && it.place == null; });
    var gap = st.missing && !st.items.some(function (it) { return it.place === st.missing; });
    if (unplaced.length || gap) return { result: 'note', key: 'hintPlace' };
    /* after a miss every wrong shape is back in the tray, so the next Check meets "every shape needs a place" first: no separate unchanged-Check reminder is needed */
    var wrong = wrongItems(st);
    if (!wrong.length) { st.done = true; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    /* the wrong shapes come home and are rolled for the child; right ones stay placed */
    wrong.forEach(function (it) { it.place = null; it.ticket = ticketOf(it); });
    st.verdict = { wrong: wrong.map(function (it) { return it.key; }) };
    return { result: 'miss', keys: st.verdict.wrong };
  }
  function hint(st) { if (st.help) return 'hintNumbers'; return { sides: 'hintCount', quads: 'hintCabinet', rings: 'hintRings' }[st.board]; }
  /* the success counts per crate (board A), in crate order */
  function counts(st) { if (st.board !== 'sides') return null; return st.crates.map(function (n) { return { n: n, k: st.items.filter(function (it) { return it.place === n; }).length }; }); }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(board, rnd, prev) {
    var ks = rounds(board).map(function (r) { return r.k; });
    for (var tries = 0; tries < 200; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return (prev || ks).slice(1).concat((prev || ks).slice(0, 1));
  }
  var api = { LOCALES: LOCALES, BOARDS: BOARDS, SHAPES: SHAPES, CELLS: CELLS, locOf: locOf, boardOf: boardOf, rounds: rounds, passSize: passSize,
    verts: verts, rotate: rotate, centroid: centroid, lens: lens, angles: angles, convex: convex, info: info, infoOf: infoOf,
    bottomSide: bottomSide, rollPlan: rollPlan, poseAt: poseAt, totalTurn: totalTurn, ticketOf: ticketOf, cellOf: cellOf, regionOf: regionOf, placeFor: placeFor,
    missingCell: missingCell, newState: newState, item: item, places: places, put: put, roll: roll, wrongItems: wrongItems, check: check, hint: hint, counts: counts, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TrundleWheelCore = api;
})(typeof window !== 'undefined' ? window : this);

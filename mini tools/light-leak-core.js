/* =====================================================================
   light-leak-core.js — the model for ACTIVITY #106 of the one-by-one
   rebuild: "Mim's Glow Workshop" → THE LIGHT-LEAK LANTERN (1.G.A.2).
   Design: docs/activities-rebuild/designs/106-shapeforge.md
   ---------------------------------------------------------------------
   A lantern frame glows where it is not covered (a light leak) and every
   bit of glass outside the frame throws a shadow (an overhang). Sealed =
   no leak, no overhang (overlaps are impossible: a piece never lands on
   another). Two exact geometries:
   · TRI (pattern blocks): triangle cells (r, c), up when r + c is even;
     pieces are cell sets, turned in 60° steps through axial lattice
     points (a, b) with x = a + b/2 + 1/2, y = b (x in sides, y in rows).
   · TAN (tangram): integer lattice of side 1 = the small triangle's leg;
     every unit square is cut by both diagonals into four quarter-cells
     (N, E, S, W), so every tangram polygon is an exact set of quarters.
     Turns are 90° steps (a 45° turn leaves the lattice); a round in
     frame "A" is drawn turned 45° (the full tangram square stands upright).
   Seams = edges between two different pieces; "a new way" = a different
   seam set from the remembered one. Pure and DOM-free; UMD.
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LightLeakCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function key2(a, b) { return a + ',' + b; }
  function uniq(a) { var s = {}, o = []; for (var i = 0; i < a.length; i++) if (!s[a[i]]) { s[a[i]] = 1; o.push(a[i]); } return o; }

  /* ================= TRI: the pattern-block triangle grid ================= */
  /* the three axial points of cell (r, c) */
  function triPts(r, c) {
    if ((r + c) % 2 === 0) return [[(c - r) / 2, r], [(c - r - 2) / 2, r + 1], [(c - r) / 2, r + 1]];
    return [[(c - r - 1) / 2, r], [(c - r + 1) / 2, r], [(c - r - 1) / 2, r + 1]];
  }
  function ax2xy(p) { return [p[0] + p[1] / 2 + 0.5, p[1]]; }
  /* three axial points → the cell they bound */
  function triCell(pts) {
    var x = 0, y = 0; for (var i = 0; i < 3; i++) { var q = ax2xy(pts[i]); x += q[0] / 3; y += q[1] / 3; }
    return [Math.floor(y + 1e-9), Math.round(2 * x - 1)];
  }
  function triRot(p) { return [-p[1], p[0] + p[1]]; }
  function triTurnCells(cells) { return cells.map(function (rc) { return triCell(triPts(rc[0], rc[1]).map(triRot)); }); }
  /* normalise a cell set: min row 0, min column 0 or 1 (the parity of every cell is kept by an even shift) */
  function triNorm(cells) {
    var mr = Infinity, mc = Infinity; cells.forEach(function (x) { mr = Math.min(mr, x[0]); mc = Math.min(mc, x[1]); });
    var dc = (mr + mc) % 2 === 0 ? mc : mc - 1;
    return cells.map(function (x) { return [x[0] - mr, x[1] - dc]; }).sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
  }
  var TRI_SHAPES = {
    triangle: [[0, 0]],
    rhombus: [[0, 0], [0, 1]],
    trapezoid: [[0, 0], [0, 1], [0, 2]],
    hexagon: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]]
  };
  var TRI_AREA = { triangle: 1, rhombus: 2, trapezoid: 3, hexagon: 6 };
  /* orientation k (0…5) of a piece kind: turned k × 60° and normalised */
  function triOrient(kind, k) { var c = TRI_SHAPES[kind]; for (var i = 0; i < ((k % 6) + 6) % 6; i++) c = triTurnCells(c); return triNorm(c); }
  function cellKey(rc) { return key2(rc[0], rc[1]); }
  function triCentre(cells) {
    var x = 0, y = 0; cells.forEach(function (rc) { var p = triPts(rc[0], rc[1]); p.forEach(function (q) { var s = ax2xy(q); x += s[0]; y += s[1]; }); });
    var n = cells.length * 3; return [x / n, y / n];
  }

  /* ================= TAN: the tangram lattice ================= */
  var TAN_SHAPES = {
    small: [[0, 0], [1, 0], [0, 1]],
    medium: [[0, 0], [2, 0], [1, 1]],
    large: [[0, 0], [2, 0], [0, 2]],
    square: [[0, 0], [1, 0], [1, 1], [0, 1]],
    para: [[0, 0], [1, 0], [2, 1], [1, 1]]
  };
  var TAN_AREA = { small: 2, medium: 4, large: 8, square: 4, para: 4 };   /* in quarter-cells */
  function tanTurn(p) { return [-p[1], p[0]]; }
  function tanFlip(p) { return [-p[0], p[1]]; }
  function polyNorm(poly) { var mx = Infinity, my = Infinity; poly.forEach(function (p) { mx = Math.min(mx, p[0]); my = Math.min(my, p[1]); }); return poly.map(function (p) { return [p[0] - mx, p[1] - my]; }); }
  function tanOrient(kind, k, f) { var p = TAN_SHAPES[kind].map(function (q) { return q.slice(); }); if (f) p = p.map(tanFlip); for (var i = 0; i < ((k % 4) + 4) % 4; i++) p = p.map(tanTurn); return polyNorm(p); }
  function shift(poly, dx, dy) { return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; }); }
  function inPoly(x, y, poly) { var ins = false; for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) { var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins; } return ins; }
  /* the quarter-cells a polygon covers (each unit square cut by both diagonals into N, E, S, W) */
  var QOFF = { N: [0.5, 1 / 6], E: [5 / 6, 0.5], S: [0.5, 5 / 6], W: [1 / 6, 0.5] };
  function quarters(poly) {
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, out = [];
    poly.forEach(function (p) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    for (var i = Math.floor(x0); i < x1; i++) for (var j = Math.floor(y0); j < y1; j++) for (var q in QOFF) if (inPoly(i + QOFF[q][0], j + QOFF[q][1], poly)) out.push(i + ',' + j + ',' + q);
    return out;
  }
  /* the corners of a quarter-cell (for drawing) */
  function quarterPoly(k) {
    var p = k.split(','), i = +p[0], j = +p[1], q = p[2], c = [i + 0.5, j + 0.5];
    if (q === 'N') return [[i, j], [i + 1, j], c]; if (q === 'E') return [[i + 1, j], [i + 1, j + 1], c];
    if (q === 'S') return [[i + 1, j + 1], [i, j + 1], c]; return [[i, j + 1], [i, j], c];
  }
  function polyCentre(poly) { var x = 0, y = 0; poly.forEach(function (p) { x += p[0]; y += p[1]; }); return [x / poly.length, y / poly.length]; }
  /* frame "A" rounds are drawn turned 45° (and √2 bigger in lattice units): A = (x − y, x + y) */
  function toA(p) { return [p[0] - p[1], p[0] + p[1]]; }
  function fromA(p) { return [(p[0] + p[1]) / 2, (p[1] - p[0]) / 2]; }
  /* a classic-layout polygon given in "A" units (the upright tangram square of side 4) → lattice units */
  function A2L(poly) { return poly.map(function (p) { return [(p[0] + p[1]) / 2, (p[1] - p[0]) / 2]; }); }

  /* ================= the rounds (design §6) ================= */
  var HEX = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]], BIGT = [[0, 2], [1, 1], [1, 2], [1, 3]], PAR = [[0, 0], [0, 1], [0, 2], [0, 3]];
  var REAL = [
    { id: 'L1', cog: 'build', target: 'rhombus', cells: [[0, 0], [0, 1]], palette: { triangle: 2, rhombus: 2 } },
    { id: 'L2', cog: 'build', target: 'trapezoid', cells: [[0, 0], [0, 1], [0, 2]], palette: { triangle: 3, rhombus: 2 } },
    { id: 'L3', cog: 'exact', target: 'rhombus', cells: [[0, 0], [0, 1]], palette: { triangle: 2 } },
    { id: 'L4', cog: 'exact', target: 'trapezoid', cells: [[0, 0], [0, 1], [0, 2]], palette: { triangle: 1, rhombus: 1 } },
    { id: 'L5', cog: 'build', target: 'triangle', cells: BIGT, palette: { triangle: 3, rhombus: 2 } },
    { id: 'L6', cog: 'build', target: 'para', cells: PAR, palette: { triangle: 2, rhombus: 3 } },
    { id: 'L7', cog: 'build', target: 'hexagon', cells: HEX, palette: { triangle: 4, rhombus: 3 } },
    { id: 'L8', cog: 'new', target: 'hexagon', cells: HEX, palette: { triangle: 6, rhombus: 3, trapezoid: 2 }, from: 'L7' },
    { id: 'L9', cog: 'new', target: 'para', cells: PAR, palette: { triangle: 4, rhombus: 2 }, from: 'L6' },
    { id: 'L10', cog: 'tri', target: 'para', cells: PAR, palette: { triangle: 4 } },
    { id: 'L11', cog: 'grow', target: 'hexagon', cells: HEX, palette: { triangle: 4, rhombus: 3 }, locked: [{ kind: 'rhombus', cells: [[0, 0], [0, 1]] }] },
    { id: 'L12', cog: 'bar', target: 'bar', cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]], palette: { triangle: 4, rhombus: 3, trapezoid: 2 } }
  ];
  /* the remembered filling a "new way" round shows when its source round was not built this pass */
  var DEFAULT_FILL = {
    L7: [{ kind: 'rhombus', cells: [[0, 0], [0, 1]] }, { kind: 'rhombus', cells: [[0, 2], [1, 2]] }, { kind: 'rhombus', cells: [[1, 0], [1, 1]] }],
    L6: [{ kind: 'rhombus', cells: [[0, 0], [0, 1]] }, { kind: 'rhombus', cells: [[0, 2], [0, 3]] }]
  };
  /* tangram figures in lattice units (frame A rounds are drawn turned 45°) */
  var CLASSIC = A2L([[0, 0], [4, 0], [4, 4], [0, 4]]).map(function (p) { return [p[0], p[1] + 2]; });
  var CL = function (poly) { return A2L(poly).map(function (p) { return [p[0], p[1] + 2]; }); };
  var CLASSIC_PIECES = [
    { kind: 'large', poly: CL([[0, 0], [4, 0], [2, 2]]) },
    { kind: 'large', poly: CL([[0, 0], [2, 2], [0, 4]]) },
    { kind: 'medium', poly: CL([[2, 4], [4, 4], [4, 2]]) },
    { kind: 'square', poly: CL([[2, 2], [3, 1], [4, 2], [3, 3]]) },
    { kind: 'small', poly: CL([[3, 1], [4, 0], [4, 2]]) },
    { kind: 'small', poly: CL([[2, 2], [3, 3], [1, 3]]) },
    { kind: 'para', poly: CL([[0, 4], [1, 3], [3, 3], [2, 4]]) }
  ];
  var MISS = [
    { id: 'M1', grid: 'tri', target: 'hexagon', cells: HEX, locked: [{ kind: 'trapezoid', cells: [[0, 0], [0, 1], [0, 2]] }, { kind: 'triangle', cells: [[1, 2]] }], hole: 'rhombus', spares: [{ kind: 'rhombus', rot: 0 }, { kind: 'triangle', rot: 0 }, { kind: 'trapezoid', rot: 0 }] },
    { id: 'M2', grid: 'tri', target: 'hexagon', cells: HEX, locked: [{ kind: 'trapezoid', cells: [[0, 0], [0, 1], [0, 2]] }], hole: 'trapezoid', spares: [{ kind: 'trapezoid', rot: 0 }, { kind: 'rhombus', rot: 0 }, { kind: 'hexagon', rot: 0 }] },
    { id: 'M3', grid: 'tri', target: 'triangle', cells: BIGT, locked: [{ kind: 'trapezoid', cells: [[1, 1], [1, 2], [1, 3]] }], hole: 'triangle', spares: [{ kind: 'triangle', rot: 0 }, { kind: 'rhombus', rot: 0 }, { kind: 'trapezoid', rot: 0 }] },
    { id: 'M4', grid: 'tri', target: 'para', cells: PAR, locked: [{ kind: 'triangle', cells: [[0, 0]] }, { kind: 'triangle', cells: [[0, 3]] }], hole: 'rhombus', spares: [{ kind: 'rhombus', rot: 0 }, { kind: 'trapezoid', rot: 0 }, { kind: 'triangle', rot: 0 }] },
    { id: 'M5', grid: 'tan', frame: 'A', target: 'square', poly: [[1, 0], [2, 1], [1, 2], [0, 1]], locked: [{ kind: 'small', poly: [[0, 1], [1, 1], [1, 2]] }, { kind: 'small', poly: [[1, 1], [2, 1], [1, 2]] }], hole: 'medium', spares: [{ kind: 'medium', rot: 0 }, { kind: 'small', rot: 0 }, { kind: 'large', rot: 0 }] },
    { id: 'M6', grid: 'tan', frame: 'B', target: 'rectangle', poly: [[0, 0], [2, 0], [2, 1], [0, 1]], locked: [{ kind: 'square', poly: [[0, 0], [1, 0], [1, 1], [0, 1]] }, { kind: 'small', poly: [[1, 0], [2, 0], [2, 1]] }], hole: 'small', spares: [{ kind: 'small', rot: 0 }, { kind: 'medium', rot: 0 }, { kind: 'square', rot: 0 }] },
    { id: 'M7', grid: 'tan', frame: 'A', target: 'square', poly: CLASSIC, locked: CLASSIC_PIECES.slice(0, 6), hole: 'para', spares: [{ kind: 'para', rot: 0, flip: 1 }, { kind: 'square', rot: 0 }, { kind: 'medium', rot: 0 }] },
    { id: 'M8', grid: 'tan', frame: 'B', target: 'triangle', poly: [[0, 0], [2, 0], [0, 2]], locked: [{ kind: 'small', poly: [[0, 0], [1, 1], [0, 1]] }, { kind: 'small', poly: [[0, 1], [1, 1], [0, 2]] }], hole: 'medium', spares: [{ kind: 'medium', rot: 0 }, { kind: 'square', rot: 0 }, { kind: 'small', rot: 0 }] }
  ];
  var TANGRAM = [
    { id: 'T1', kind: 'build', frame: 'B', target: 'square', poly: [[0, 0], [1, 0], [1, 1], [0, 1]], palette: { small: 2 } },
    { id: 'T2', kind: 'build', frame: 'B', target: 'triangle', poly: [[0, 1], [2, 1], [1, 0]], palette: { small: 2 } },
    { id: 'T3', kind: 'build', frame: 'B', target: 'para', poly: [[0, 0], [1, 0], [2, 1], [1, 1]], palette: { small: 2 } },
    { id: 'T4', kind: 'build', frame: 'A', target: 'square', poly: [[1, 0], [2, 1], [1, 2], [0, 1]], palette: { medium: 1, small: 2 } },
    { id: 'T5', kind: 'build', frame: 'B', target: 'rectangle', poly: [[0, 0], [2, 0], [2, 1], [0, 1]], palette: { square: 1, small: 2 } },
    { id: 'T6', kind: 'build', frame: 'B', target: 'triangle', poly: [[0, 0], [2, 0], [0, 2]], palette: { medium: 1, small: 2 } },
    { id: 'T7', kind: 'build', frame: 'A', target: 'square', poly: CLASSIC, palette: { large: 2, medium: 1, square: 1, small: 2, para: 1 } },
    /* shadow rounds: three rigid panes — the match first, then a flipped and a turned copy */
    { id: 'S1', kind: 'shadow', frame: 'B', poly: [[0, 0], [1, 0], [2, 1], [1, 1]], pane: [{ kind: 'small', poly: [[0, 0], [1, 0], [1, 1]] }, { kind: 'small', poly: [[1, 0], [2, 1], [1, 1]] }], decoys: ['flip', 'turn'] },
    { id: 'S2', kind: 'shadow', frame: 'B', poly: [[0, 0], [1, 0], [2, 1], [0, 1]], pane: [{ kind: 'square', poly: [[0, 0], [1, 0], [1, 1], [0, 1]] }, { kind: 'small', poly: [[1, 0], [2, 1], [1, 1]] }], decoys: ['flip', 'turn'] },
    { id: 'S3', kind: 'shadow', frame: 'A', poly: [[0, 0], [2, 0], [0, 2]], pane: [{ kind: 'medium', poly: [[0, 0], [2, 0], [1, 1]] }, { kind: 'small', poly: [[0, 0], [1, 1], [0, 1]] }, { kind: 'small', poly: [[0, 1], [1, 1], [0, 2]] }], decoys: ['turn', 'turn2'] },
    { id: 'S4', kind: 'shadow', frame: 'B', poly: [[1, 0], [2, 1], [1, 1], [1, 2], [0, 2], [0, 1]], pane: [{ kind: 'medium', poly: [[0, 1], [2, 1], [1, 0]] }, { kind: 'square', poly: [[0, 1], [1, 1], [1, 2], [0, 2]] }], decoys: ['flip', 'turn'] }
  ];
  var TBASE = ['T1', 'T2', 'S1', 'T3', 'T4', 'S2', 'T5', 'S3', 'T6', 'S4', 'T7'];
  var LEVELS = { glass: REAL, missing: MISS, tangram: TANGRAM };
  function levelOf(v) { return LEVELS[v] ? v : 'glass'; }
  function ids(level) { return LEVELS[levelOf(level)].map(function (r) { return r.id; }); }
  function roundOf(id) { var all = REAL.concat(MISS, TANGRAM); for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i]; return null; }
  function gridOf(R) { return R.cells ? 'tri' : 'tan'; }

  /* a pane variant: 'same' | 'flip' | 'turn' (90°) | 'turn2' (180°), kept rigid */
  function paneVariant(pane, how) {
    var all = []; pane.forEach(function (p) { all = all.concat(p.poly); });
    var f = function (q) { return how === 'flip' ? tanFlip(q) : how === 'turn' ? tanTurn(q) : how === 'turn2' ? tanTurn(tanTurn(q)) : q; };
    var ps = pane.map(function (p) { return { kind: p.kind, poly: p.poly.map(f) }; }), flat = []; ps.forEach(function (p) { flat = flat.concat(p.poly); });
    var mx = Infinity, my = Infinity; flat.forEach(function (q) { mx = Math.min(mx, q[0]); my = Math.min(my, q[1]); });
    return ps.map(function (p) { return { kind: p.kind, poly: shift(p.poly, -mx, -my) }; });
  }

  /* ================= state ================= */
  function trayOf(R) {
    if (R.spares) { var t = {}; return t; }
    var o = {}; for (var k in R.palette) o[k] = R.palette[k]; return o;
  }
  function newState(level, id, opts) {
    opts = opts || {}; var R = roundOf(id), rnd = opts.rnd || Math.random;
    var st = { level: levelOf(level), id: id, R: R, grid: gridOf(R), placed: [], tray: {}, rot: {}, flip: {}, sel: null, misses: 0, show: 0, last: null, done: false, nid: 0, memory: opts.memory || null, spares: null, panes: null, pane: null };
    if (R.palette) { st.tray = trayOf(R); for (var k in st.tray) { st.rot[k] = 0; st.flip[k] = 0; } }
    (R.locked || []).forEach(function (L) { st.placed.push({ id: 'k' + (st.nid++), kind: L.kind, cells: L.cells ? L.cells.map(function (c) { return c.slice(); }) : null, poly: L.poly ? L.poly.map(function (c) { return c.slice(); }) : null, locked: true }); });
    if (R.spares) {
      var pos = opts.pos == null ? Math.floor(rnd() * 3) : opts.pos, rest = shuffle(R.spares.slice(1), rnd), list = rest.slice(0, pos).concat([R.spares[0]], rest.slice(pos));
      st.spares = list.map(function (s, i) { return { slot: i, kind: s.kind, rot: s.rot || 0, flip: s.flip || 0, used: false, right: s === R.spares[0] }; });
      st.right = pos;
    }
    if (R.kind === 'shadow') {
      var ps = opts.pos == null ? Math.floor(rnd() * 3) : opts.pos, ds = shuffle(R.decoys.slice(), rnd), vs = ds.slice(0, ps).concat(['same'], ds.slice(ps));
      st.panes = vs.map(function (how) { return { how: how, pieces: paneVariant(R.pane, how) }; });
      st.right = ps;
    }
    if (R.cog === 'new') {
      var src = (st.memory && st.memory[R.from]) || DEFAULT_FILL[R.from];
      st.remembered = seamsOf(src.map(function (p) { return { kind: p.kind, cells: p.cells }; }));
    }
    return st;
  }

  /* ---- coverage ---- */
  function targetSet(R) { return R.cells ? R.cells.map(cellKey) : quarters(R.poly); }
  function pieceSet(st, p) { return p.cells ? p.cells.map(cellKey) : quarters(p.poly); }
  function covered(st) {
    var s = {}; st.placed.forEach(function (p) { pieceSet(st, p).forEach(function (k) { s[k] = (s[k] || 0) + 1; }); });
    if (st.pane != null) { var pc = paneInFrame(st); pc.forEach(function (p) { quarters(p.poly).forEach(function (k) { s[k] = (s[k] || 0) + 1; }); }); }
    return s;
  }
  /* the pane in the frame: its corner on the frame's corner (bounding boxes), never turned or flipped */
  function paneInFrame(st) {
    var P = st.panes[st.pane].pieces, R = st.R, mx = Infinity, my = Infinity;
    R.poly.forEach(function (q) { mx = Math.min(mx, q[0]); my = Math.min(my, q[1]); });
    return P.map(function (p) { return { kind: p.kind, poly: shift(p.poly, mx, my) }; });
  }
  function coverage(st) {
    var T = targetSet(st.R), tset = {}, cov = covered(st), unc = [], over = [], dup = [];
    T.forEach(function (k) { tset[k] = 1; if (!cov[k]) unc.push(k); });
    for (var k in cov) { if (!tset[k]) over.push(k); if (cov[k] > 1) dup.push(k); }
    return { uncovered: unc, overhang: over, overlap: dup, total: T.length };
  }
  function isSealed(st) { var c = coverage(st); return !c.uncovered.length && !c.overhang.length && !c.overlap.length; }

  /* ---- seams (TRI): the edges between cells of two different pieces ---- */
  function edgesOf(rc) { var p = triPts(rc[0], rc[1]).map(function (q) { return q[0] + ':' + q[1]; }); return [[p[0], p[1]], [p[1], p[2]], [p[0], p[2]]].map(function (e) { return e.sort().join('|'); }); }
  function seamsOf(pieces) {
    var owner = {}, seams = {};
    pieces.forEach(function (p, i) { (p.cells || []).forEach(function (rc) { edgesOf(rc).forEach(function (e) { if (owner[e] != null && owner[e] !== i) seams[e] = 1; else owner[e] = i; }); }); });
    return Object.keys(seams).sort();
  }
  function sameSet(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }

  /* ---- placing ---- */
  function occupied(st, except) { var s = {}; st.placed.forEach(function (p) { if (p.id === except) return; pieceSet(st, p).forEach(function (k) { s[k] = 1; }); }); return s; }
  function cellsAt(kind, rot, flip, dr, dc) { return triOrient(kind, rot).map(function (x) { return [x[0] + dr, x[1] + dc]; }); }
  /* the placement nearest a point (x in sides, y in rows for TRI; lattice units for TAN), never on another piece */
  /* within (optional): the placement must pass it (the activity keeps every piece on its bench) */
  function snapTri(st, kind, rot, x, y, except, within, inFirst) {
    var o = triOrient(kind, rot), c0 = triCentre(o), occ = occupied(st, except), best = null, bd = Infinity, T = inFirst ? keySet(targetSet(st.R)) : null;
    var r0 = Math.round(y - c0[1]), cc0 = Math.round(2 * (x - c0[0]));
    for (var dr = r0 - 2; dr <= r0 + 2; dr++) for (var dc = cc0 - 4; dc <= cc0 + 4; dc++) {
      if ((dr + dc) % 2 !== 0) continue;
      var cells = o.map(function (q) { return [q[0] + dr, q[1] + dc]; });
      if (cells.some(function (q) { return occ[cellKey(q)]; })) continue;
      if (within && !within(cells, null)) continue;
      var ce = triCentre(cells), d = Math.hypot(ce[0] - x, (ce[1] - y) * 0.866);
      /* a turn prefers the spot that stays in the frame (each cell outside costs more than any distance) */
      if (T) d += cells.filter(function (q) { return !T[cellKey(q)]; }).length * 10;
      if (d < bd) { bd = d; best = cells; }
    }
    return (T ? bd % 10 : bd) <= 1.0 ? best : null;
  }
  function keySet(a) { var s = {}; a.forEach(function (k) { s[k] = 1; }); return s; }
  function snapTan(st, kind, rot, flip, x, y, except, within, inFirst) {
    var o = tanOrient(kind, rot, flip), c0 = polyCentre(o), occ = occupied(st, except), best = null, bd = Infinity, T = inFirst ? keySet(targetSet(st.R)) : null;
    for (var dx = Math.round(x - c0[0]) - 1; dx <= Math.round(x - c0[0]) + 1; dx++) for (var dy = Math.round(y - c0[1]) - 1; dy <= Math.round(y - c0[1]) + 1; dy++) {
      var poly = shift(o, dx, dy); if (quarters(poly).some(function (q) { return occ[q]; })) continue; if (within && !within(null, poly)) continue;
      var ce = polyCentre(poly), d = Math.hypot(ce[0] - x, ce[1] - y); if (T) d += quarters(poly).filter(function (q) { return !T[q]; }).length * 10; if (d < bd) { bd = d; best = poly; }
    }
    return (T ? bd % 10 : bd) <= 1.2 ? best : null;
  }
  function fitsInside(st, set, except) { var T = {}; targetSet(st.R).forEach(function (k) { T[k] = 1; }); return set.every(function (k) { return T[k]; }); }
  /* drop a piece of `kind` (from the tray or a spare) at a point; `auto` tries the other turns for one that fits */
  function drop(st, src, x, y, auto, moving, within) {
    if (st.done && !st.free) return 'no';
    var kind = src.kind, rot = src.rot || 0, flip = src.flip || 0, ex = moving ? moving.id : null;
    var tries = [[rot, flip]];
    if (auto) for (var f = 0; f < (st.grid === 'tan' && kind === 'para' ? 2 : 1); f++) for (var k = 0; k < (st.grid === 'tri' ? 6 : 4); k++) tries.push([k, f]);
    var got = null, gotFit = null;
    for (var i = 0; i < tries.length; i++) {
      var g = st.grid === 'tri' ? snapTri(st, kind, tries[i][0], x, y, ex, within) : snapTan(st, kind, tries[i][0], tries[i][1], x, y, ex, within);
      if (!g) continue;
      var set = st.grid === 'tri' ? g.map(cellKey) : quarters(g);
      if (!got) got = { geo: g, rot: tries[i][0], flip: tries[i][1] };
      if (fitsInside(st, set, ex)) { gotFit = { geo: g, rot: tries[i][0], flip: tries[i][1] }; break; }
      if (!auto) break;
    }
    var use = gotFit || got; if (!use) return 'no';
    if (moving) { if (st.grid === 'tri') moving.cells = use.geo; else moving.poly = use.geo; moving.rot = use.rot; moving.flip = use.flip; return 'moved'; }
    var piece = { id: 'p' + (st.nid++), kind: kind, rot: use.rot, flip: use.flip, cells: st.grid === 'tri' ? use.geo : null, poly: st.grid === 'tan' ? use.geo : null, locked: false };
    if (src.slot != null) { piece.slot = src.slot; st.spares[src.slot].used = true; }
    else st.tray[kind]--;
    st.placed.push(piece);
    return 'placed';
  }
  function canDrop(st, kind) { if (st.spares) return true; return (st.tray[kind] || 0) > 0; }
  /* turn a placed piece about its centre (the next angle that is free) */
  function turnPiece(st, id, within) {
    var p = byId(st, id); if (!p || p.locked) return 'no';
    var c = p.cells ? triCentre(p.cells) : polyCentre(p.poly), n = st.grid === 'tri' ? 6 : 4;
    for (var s = 1; s < n; s++) {
      var rot = (p.rot + s) % n, g = st.grid === 'tri' ? snapTri(st, p.kind, rot, c[0], c[1], p.id, within, true) : snapTan(st, p.kind, rot, p.flip, c[0], c[1], p.id, within, true);
      if (g) { if (p.cells) p.cells = g; else p.poly = g; p.rot = rot; return 'turned'; }
    }
    return 'no';
  }
  function takeOut(st, id) {
    var p = byId(st, id); if (!p || p.locked) return 'no';
    st.placed = st.placed.filter(function (q) { return q.id !== id; });
    if (p.slot != null) st.spares[p.slot].used = false; else st.tray[p.kind]++;
    return 'out';
  }
  function byId(st, id) { for (var i = 0; i < st.placed.length; i++) if (st.placed[i].id === id) return st.placed[i]; return null; }
  function turnTray(st, kind) { st.rot[kind] = ((st.rot[kind] || 0) + 1) % (st.grid === 'tri' ? 6 : 4); return 'turned'; }
  function flipTray(st, kind) { if (!(st.grid === 'tan' && kind === 'para')) return 'no'; st.flip[kind] = st.flip[kind] ? 0 : 1; return 'flipped'; }
  function turnSpare(st, slot) { var s = st.spares[slot]; s.rot = (s.rot + 1) % (st.grid === 'tri' ? 6 : 4); return 'turned'; }
  function flipSpare(st, slot) { var s = st.spares[slot]; if (!(st.grid === 'tan' && s.kind === 'para')) return 'no'; s.flip = s.flip ? 0 : 1; return 'flipped'; }
  function setPane(st, i) { if (st.done) return 'no'; st.pane = i == null ? null : i; return 'placed'; }

  /* ---- Check ---- */
  function own(st) { return st.placed.filter(function (p) { return !p.locked; }); }
  function kindOf(st) {
    var R = st.R;
    if (R.kind === 'shadow') { if (st.pane == null) return 'tray'; return isSealed(st) ? 'ok' : 'shadow'; }
    if (!own(st).length) return 'tray';
    var c = coverage(st);
    if (R.spares) return (!c.uncovered.length && !c.overhang.length) ? 'ok' : 'spare';
    if (c.uncovered.length && c.overhang.length) return 'both';
    if (c.uncovered.length) return 'leak';
    if (c.overhang.length) return 'over';
    if (R.cog === 'new' && sameSet(seamsOf(st.placed), st.remembered)) return 'same';
    return 'ok';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    if (k === 'ok') { st.done = true; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses);
    return { result: 'miss', kind: k };
  }
  var HINT = { leak: 'hintLeak', over: 'hintOver', both: 'hintBoth', same: 'hintSame', spare: 'hintSpare', shadow: 'hintShadow' };
  function hint(st) {
    var k = st.last, R = st.R;
    if (k === 'tray') return { key: R.kind === 'shadow' ? 'hintPane' : R.spares ? 'hintHole' : 'hintEmpty' };
    if (!st.show || k === 'ok') return null;
    if (st.show >= 2) return { key: k === 'same' ? 'hintSame2' : R.kind === 'shadow' ? 'hintShadow2' : R.spares ? 'hintSpare2' : 'hintGhost' };
    return { key: HINT[k] };
  }

  /* ---- the ghost (miss 2): one piece of an exact cover of what is still open, from what is left in the tray ---- */
  function placementsFor(st, kind, uncSet) {
    var out = [], keys = Object.keys(uncSet);
    if (st.grid === 'tri') {
      for (var k = 0; k < 6; k++) { var o = triOrient(kind, k);
        keys.forEach(function (key) { var rc = key.split(',').map(Number); o.forEach(function (q) { var dr = rc[0] - q[0], dc = rc[1] - q[1]; if ((dr + dc) % 2) return; var cells = o.map(function (x) { return [x[0] + dr, x[1] + dc]; }); if (cells.every(function (x) { return uncSet[cellKey(x)]; })) out.push({ kind: kind, rot: k, flip: 0, cells: cells, set: cells.map(cellKey) }); }); }); }
    } else {
      for (var f = 0; f < 2; f++) for (var r = 0; r < 4; r++) { var po = tanOrient(kind, r, f), qs = quarters(po);
        var xs = keys.map(function (q) { return q.split(','); });
        var seen = {};
        xs.forEach(function (q) { for (var dx = -3; dx <= 3; dx++) for (var dy = -3; dy <= 3; dy++) { var key = dx + '/' + dy; if (seen[key]) continue; seen[key] = 1;
          var sh = qs.map(function (z) { var a = z.split(','); return (+a[0] + dx + +q[0]) + ',' + (+a[1] + dy + +q[1]) + ',' + a[2]; });
          if (sh.every(function (z) { return uncSet[z]; })) out.push({ kind: kind, rot: r, flip: f, poly: shift(po, dx + +q[0], dy + +q[1]), set: sh }); } });
      }
    }
    return out;
  }
  /* an exact cover of what is open, from what is left; in a "new way" round a cover that repeats the remembered seams is no answer */
  function solve(st, uncKeys, tray, depth, acc) {
    acc = acc || [];
    if (!uncKeys.length) { if (st.R.cog === 'new' && sameSet(seamsOf(st.placed.concat(acc)), st.remembered)) return null; return []; }
    if (depth > 12) return null;
    var unc = {}; uncKeys.forEach(function (k) { unc[k] = 1; });
    var first = uncKeys.slice().sort()[0];
    var kinds = Object.keys(tray).filter(function (k) { return tray[k] > 0; }).sort(function (a, b) { return (st.grid === 'tri' ? TRI_AREA[b] - TRI_AREA[a] : TAN_AREA[b] - TAN_AREA[a]); });
    for (var i = 0; i < kinds.length; i++) {
      var pl = placementsFor(st, kinds[i], unc).filter(function (p) { return p.set.indexOf(first) >= 0; });
      for (var j = 0; j < pl.length; j++) {
        var rest = uncKeys.filter(function (k) { return pl[j].set.indexOf(k) < 0; }), t2 = {}; for (var k in tray) t2[k] = tray[k]; t2[kinds[i]]--;
        var s = solve(st, rest, t2, depth + 1, acc.concat([pl[j]])); if (s) return [pl[j]].concat(s);
      }
    }
    return null;
  }
  function ghost(st) {
    if (st.R.spares || st.R.kind === 'shadow') return null;
    var c = coverage(st); if (c.overhang.length || !c.uncovered.length) return null;
    var tray = {}; for (var k in st.tray) tray[k] = st.tray[k];
    var s = solve(st, c.uncovered, tray, 0); if (!s || !s.length) return null;
    s.sort(function (a, b) { return b.set.length - a.set.length; });
    return s[0];
  }

  /* ---- the plan: order-only reshuffle; L1 opens with #1, #2 and keeps #8 after #7, #9 after #6; L3 keeps T7 last ---- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function valid(level, o, first) {
    if (level === 'glass') { if (first && (o[0] !== 'L1' || o[1] !== 'L2')) return false; return o.indexOf('L8') > o.indexOf('L7') && o.indexOf('L9') > o.indexOf('L6'); }
    if (level === 'tangram') return o[o.length - 1] === 'T7';
    return true;
  }
  function plan(level, rnd, prev) {
    rnd = rnd || Math.random; level = levelOf(level); var base = ids(level), o = null;
    if (!prev && level === 'tangram') o = TBASE.slice();
    else for (var k = 0; k < 400; k++) { var c = shuffle(base, rnd); if (valid(level, c, !prev) && !eq(c, prev)) { o = c; break; } }
    if (!o) { o = base.slice(); if (level === 'tangram') o = TBASE.slice(); if (eq(o, prev)) { var a = o.splice(level === 'tangram' ? 0 : 2, 1)[0]; o.splice(level === 'tangram' ? 1 : 3, 0, a); } }
    /* the right spare / pane's slot over the rounds that have one: an equal share each, the leftover slots drawn at random */
    var slotted = o.filter(function (id) { return level === 'missing' || (level === 'tangram' && id.charAt(0) === 'S'); }), m = slotted.length, pool = [];
    for (var i = 0; i < m - m % 3; i++) pool.push(i % 3);
    pool = pool.concat(shuffle([0, 1, 2], rnd).slice(0, m % 3)); pool = shuffle(pool, rnd);
    var pos = o.map(function (id) { return slotted.indexOf(id) >= 0 ? pool.shift() : 0; });
    return { order: o, pos: pos };
  }
  /* the width band: bench + side tray from 560 px; tiny under 300 */
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    locale: locale, levelOf: levelOf, ids: ids, roundOf: roundOf, gridOf: gridOf,
    triPts: triPts, triCell: triCell, triOrient: triOrient, triCentre: triCentre, ax2xy: ax2xy, cellKey: cellKey,
    tanOrient: tanOrient, quarters: quarters, quarterPoly: quarterPoly, polyCentre: polyCentre, shift: shift, toA: toA, fromA: fromA, paneVariant: paneVariant,
    newState: newState, coverage: coverage, isSealed: isSealed, seamsOf: seamsOf, targetSet: targetSet, pieceSet: pieceSet, paneInFrame: paneInFrame,
    drop: drop, canDrop: canDrop, turnPiece: turnPiece, takeOut: takeOut, turnTray: turnTray, flipTray: flipTray, turnSpare: turnSpare, flipSpare: flipSpare, setPane: setPane,
    own: own, kindOf: kindOf, check: check, hint: hint, ghost: ghost, solve: solve, plan: plan, band: band,
    DATA: { LOCALES: LOCALES, REAL: REAL, MISS: MISS, TANGRAM: TANGRAM, TBASE: TBASE, TRI_SHAPES: TRI_SHAPES, TAN_SHAPES: TAN_SHAPES, TRI_AREA: TRI_AREA, TAN_AREA: TAN_AREA, DEFAULT_FILL: DEFAULT_FILL, CLASSIC: CLASSIC, CLASSIC_PIECES: CLASSIC_PIECES }
  };
});

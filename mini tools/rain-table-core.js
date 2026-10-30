/* =====================================================================
   rain-table-core.js — the model of ACTIVITY #172 of the one-by-one
   rebuild: "Make Thirds" → THE RAIN TABLE (2.G.A.3).
   Pure, no DOM. Design: docs/activities-rebuild/designs/172-fractions.md
   ---------------------------------------------------------------------
   The shape is a little rain table. The child puts up walls — straight
   walls across from an edge notch, or walls from the centre pin to a rim
   peg — then it rains evenly: every part drains into its own glass tube,
   so the water in a tube is the part's AREA. Equal parts fill their tubes
   to the same gold line; a bigger part always catches more rain. Every
   part is computed by cutting the outline with the walls (never a table).
   ===================================================================== */
(function (root) {
  'use strict';
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var PARTS = [2, 3, 4];
  var TOL = 0.005;       /* equal = every part within 0.5 % of the whole of its fair share */
  var MAXWALLS = 4;
  var CAP = 1.6;         /* a tube shows up to 1.6 × the gold line */
  var E = 1e-7;

  /* ---- outlines (a 100-unit box, y down; curves as fine polygons) ---- */
  var D = Math.PI / 180;
  function ngon(cx, cy, rx, ry, n, a0) { var o = []; for (var i = 0; i < n; i++) { var a = (a0 + 360 * i / n) * D; o.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } return o; }
  var S3 = Math.sqrt(3);
  var TRI = [[50, 10], [50 + 20 * S3, 70], [50 - 20 * S3, 70]];
  var HEX = [[70, 50 - 20 * S3], [90, 50], [70, 50 + 20 * S3], [30, 50 + 20 * S3], [10, 50], [30, 50 - 20 * S3]];
  var TSQ = [[50, 10], [90, 50], [50, 90], [10, 50]];
  var SHAPES = {
    circle: { outline: ngon(50, 50, 40, 40, 360, -90), box: [10, 10, 90, 90], pin: [50, 50] },
    oval: { outline: ngon(50, 50, 44, 30, 360, -90), box: [6, 20, 94, 80], pin: [50, 50] },
    square: { outline: [[20, 20], [80, 20], [80, 80], [20, 80]], box: [20, 20, 80, 80], pin: [50, 50] },
    rectL: { outline: [[8, 26], [92, 26], [92, 74], [8, 74]], box: [8, 26, 92, 74], pin: null },
    rectT: { outline: [[26, 8], [74, 8], [74, 92], [26, 92]], box: [26, 8, 74, 92], pin: null },
    triangle: { outline: TRI, box: [TRI[2][0], 10, TRI[1][0], 70], pin: [50, 50] },
    hexagon: { outline: HEX, box: [10, HEX[0][1], 90, HEX[2][1]], pin: [50, 50] },
    tsquare: { outline: TSQ, box: [10, 10, 90, 90], pin: null }
  };
  /* a point at perimeter distance d along a closed polygon, starting at its first vertex */
  function alongPoly(poly, d) {
    var L = 0, seg = []; for (var i = 0; i < poly.length; i++) { var a = poly[i], b = poly[(i + 1) % poly.length], s = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push(s); L += s; }
    d = ((d % L) + L) % L;
    for (var j = 0; j < poly.length; j++) { if (d <= seg[j] + 1e-9) { var p = poly[j], q = poly[(j + 1) % poly.length], f = seg[j] ? d / seg[j] : 0; return [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f]; } d -= seg[j]; }
    return poly[0].slice();
  }
  /* the rim pegs, clockwise from peg 0 */
  function pegs(shape) {
    var o = [], i;
    if (shape === 'circle') for (i = 0; i < 24; i++) { var a = (-90 + 15 * i) * D; o.push([50 + 40 * Math.cos(a), 50 + 40 * Math.sin(a)]); }
    /* the square: 24 pegs every 10 units of the 240-unit perimeter, the first 5 units clockwise of top-middle — no peg on a corner or an edge middle */
    else if (shape === 'square') for (i = 0; i < 24; i++) o.push(alongPoly([[50, 20], [80, 20], [80, 80], [20, 80], [20, 20]], 5 + 10 * i));
    /* the triangle: 12 equal perimeter steps from the top corner (corners and edge middles among them) */
    else if (shape === 'triangle') { var side = 40 * S3; for (i = 0; i < 12; i++) o.push(alongPoly(TRI, i * side / 4)); }
    /* the hexagon: peg 0 the middle of the top edge, then corners and edge middles */
    else if (shape === 'hexagon') for (i = 0; i < 12; i++) o.push(alongPoly([[50, HEX[0][1]], HEX[0], HEX[1], HEX[2], HEX[3], HEX[4], HEX[5]], i * 20));
    /* the oval: PARAMETRIC 30° steps (the affine image of the circle's spokes — equal areas) */
    else if (shape === 'oval') for (i = 0; i < 12; i++) { var b = (-90 + 30 * i) * D; o.push([50 + 44 * Math.cos(b), 50 + 30 * Math.sin(b)]); }
    return o;
  }
  /* the edge-notch families: each notch gives a straight wall across the shape (a point and a direction) and a mark position */
  function notches(shape, fam) {
    var sh = SHAPES[shape], b = sh.box, o = [], i, OFF = 5;
    if (fam === 'top') for (i = 1; i < 12; i++) { var x = b[0] + (b[2] - b[0]) * i / 12; o.push({ p: [x, 50], d: [0, 1], mark: [x, b[1] - OFF] }); }
    else if (fam === 'left') for (i = 1; i < 12; i++) { var y = b[1] + (b[3] - b[1]) * i / 12; o.push({ p: [50, y], d: [1, 0], mark: [b[0] - OFF, y] }); }
    else if (fam === 'base') for (i = 1; i < 12; i++) { var x2 = TRI[2][0] + (TRI[1][0] - TRI[2][0]) * i / 12; o.push({ p: [x2, 50], d: [0, 1], mark: [x2, 70 + OFF] }); }
    /* the triangle's left side at sixths → walls parallel to the base */
    else if (fam === 'side') for (i = 1; i < 6; i++) { var y2 = 10 + 60 * i / 6, xs = 50 - (y2 - 10) / 60 * 20 * S3; o.push({ p: [xs, y2], d: [1, 0], mark: [xs - OFF * S3 / 2, y2 - OFF / 2] }); }
    /* the turned square's lower edges at sixths → walls parallel to an edge */
    else if (fam === 'll') for (i = 1; i < 6; i++) { var p = [10 + 40 * i / 6, 50 + 40 * i / 6]; o.push({ p: p, d: [1, -1], mark: [p[0] - OFF / Math.SQRT2, p[1] + OFF / Math.SQRT2] }); }
    else if (fam === 'lr') for (i = 1; i < 6; i++) { var q = [50 + 40 * i / 6, 90 - 40 * i / 6]; o.push({ p: q, d: [1, 1], mark: [q[0] + OFF / Math.SQRT2, q[1] + OFF / Math.SQRT2] }); }
    else throw new Error('no notch family ' + fam);
    return o;
  }

  /* ---- the rounds (design §6) ---- */
  var R = function (shape, fams, ghost, colour, surprise) { return { shape: shape, fams: fams, ghost: ghost, colour: colour, surprise: !!surprise }; };
  var POOL = {
    3: [
      R('circle', ['pegs', 'top', 'left'], ['p:0', 'p:8', 'p:16'], 1),
      R('triangle', ['pegs', 'side'], ['p:0', 'p:4', 'p:8'], 2),
      R('hexagon', ['pegs', 'top'], ['p:1', 'p:5', 'p:9'], 1),
      R('square', ['top', 'left'], ['top:4', 'top:8'], 2),
      R('rectL', ['top', 'left'], ['top:4', 'top:8'], 1),
      R('tsquare', ['ll', 'lr'], ['ll:2', 'll:4'], 2),
      R('oval', ['pegs', 'top', 'left'], ['p:0', 'p:4', 'p:8'], 1),
      R('square', ['pegs'], ['p:0', 'p:8', 'p:16'], 2, true),
      R('rectT', ['top', 'left'], ['left:4', 'left:8'], 1)
    ],
    2: [
      R('circle', ['pegs', 'top', 'left'], ['p:0', 'p:12'], 1),
      R('square', ['pegs'], ['p:0', 'p:12'], 1),
      R('rectL', ['top', 'left'], ['top:6'], 1),
      R('triangle', ['pegs', 'base'], ['base:6'], 1),
      R('hexagon', ['pegs', 'top'], ['p:0', 'p:6'], 1),
      R('oval', ['pegs', 'top', 'left'], ['top:6'], 1),
      R('tsquare', ['ll', 'lr'], ['ll:3'], 1),
      R('rectT', ['top', 'left'], ['left:6'], 1)
    ],
    4: [
      R('circle', ['pegs', 'top', 'left'], ['p:0', 'p:6', 'p:12', 'p:18'], 1),
      R('square', ['top', 'left'], ['top:6', 'left:6'], 3),
      R('rectL', ['top', 'left'], ['top:3', 'top:6', 'top:9'], 2),
      R('oval', ['pegs', 'top', 'left'], ['top:6', 'left:6'], 1),
      R('tsquare', ['ll', 'lr'], ['ll:3', 'lr:3'], 3),
      R('hexagon', ['pegs', 'top'], ['p:0', 'p:3', 'p:6', 'p:9'], 2),
      R('triangle', ['pegs'], ['p:0', 'p:3', 'p:6', 'p:9'], 1),
      R('rectT', ['top', 'left'], ['left:3', 'left:6', 'left:9'], 3)
    ]
  };

  /* every wall a round offers: id, kind, the line (point + direction), the segment it really occupies, the mark */
  function wallsOf(round) {
    var sh = SHAPES[round.shape], o = [];
    round.fams.forEach(function (f) {
      if (f === 'pegs') pegs(round.shape).forEach(function (pg, i) { o.push({ id: 'p:' + i, kind: 'peg', i: i, p: sh.pin, d: [pg[0] - sh.pin[0], pg[1] - sh.pin[1]], seg: [sh.pin, pg], mark: pg }); });
      else notches(round.shape, f).forEach(function (n, i) { var c = chord(sh.outline, n.p, n.d); o.push({ id: f + ':' + (i + 1), kind: 'notch', fam: f, i: i + 1, p: n.p, d: n.d, seg: c, mark: n.mark }); });
    });
    return o;
  }
  /* the chord of a convex outline along a line (the stretch of the line inside the shape) */
  function chord(poly, p, d) {
    var ts = [];
    for (var i = 0; i < poly.length; i++) {
      var a = poly[i], b = poly[(i + 1) % poly.length], ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex;
      if (Math.abs(den) < 1e-12) continue;
      var t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / den, u = ((a[0] - p[0]) * d[1] - (a[1] - p[1]) * d[0]) / den;
      if (u >= -1e-9 && u <= 1 + 1e-9) ts.push(t);
    }
    if (ts.length < 2) return null;
    var t0 = Math.min.apply(null, ts), t1 = Math.max.apply(null, ts);
    return [[p[0] + d[0] * t0, p[1] + d[1] * t0], [p[0] + d[0] * t1, p[1] + d[1] * t1]];
  }

  /* ---- cutting: every wall extended to a full line splits the outline into convex cells; neighbouring cells are
     one part unless the edge between them lies on a real wall (a spoke only walls the stretch centre→peg) ---- */
  function area(poly) { var s = 0; for (var i = 0; i < poly.length; i++) { var a = poly[i], b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; }
  function centroid(poly) { var s = 0, x = 0, y = 0; for (var i = 0; i < poly.length; i++) { var a = poly[i], b = poly[(i + 1) % poly.length], c = a[0] * b[1] - b[0] * a[1]; s += c; x += (a[0] + b[0]) * c; y += (a[1] + b[1]) * c; } return s ? [x / (3 * s), y / (3 * s)] : poly[0].slice(); }
  function side(p, q, d) { return (q[0] - p[0]) * d[1] - (q[1] - p[1]) * d[0]; }
  function split(poly, p, d) {
    var A = [], B = [], n = poly.length, sv = poly.map(function (q) { var s = side(p, q, d); return Math.abs(s) < E ? 0 : s; });
    if (sv.every(function (s) { return s >= 0; }) || sv.every(function (s) { return s <= 0; })) return [poly];
    for (var i = 0; i < n; i++) {
      var a = poly[i], b = poly[(i + 1) % n], sa = sv[i], sb = sv[(i + 1) % n];
      if (sa >= 0) A.push(a); if (sa <= 0) B.push(a);
      if ((sa > 0 && sb < 0) || (sa < 0 && sb > 0)) { var t = sa / (sa - sb), m = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; A.push(m); B.push(m); }
    }
    return [A, B].filter(function (P) { return P.length >= 3 && area(P) > 1e-6; });
  }
  /* the shared stretch of two cells' edges (collinear overlap of positive length): { a0, u, lo, hi } along the edge, or null */
  function shared(A, B) {
    for (var i = 0; i < A.length; i++) {
      var a0 = A[i], a1 = A[(i + 1) % A.length], dx = a1[0] - a0[0], dy = a1[1] - a0[1], L = Math.hypot(dx, dy); if (L < 1e-9) continue;
      var ux = dx / L, uy = dy / L;
      for (var j = 0; j < B.length; j++) {
        var b0 = B[j], b1 = B[(j + 1) % B.length];
        if (Math.abs((b0[0] - a0[0]) * uy - (b0[1] - a0[1]) * ux) > 1e-6 || Math.abs((b1[0] - a0[0]) * uy - (b1[1] - a0[1]) * ux) > 1e-6) continue;
        var t0 = (b0[0] - a0[0]) * ux + (b0[1] - a0[1]) * uy, t1 = (b1[0] - a0[0]) * ux + (b1[1] - a0[1]) * uy, lo = Math.max(0, Math.min(t0, t1)), hi = Math.min(L, Math.max(t0, t1));
        if (hi - lo > 1e-5) return { a0: a0, u: [ux, uy], lo: lo, hi: hi };
      }
    }
    return null;
  }
  /* is the WHOLE shared stretch walled? The walls lying on its line, as intervals along it, must cover lo…hi (a spoke
     covers only centre→peg, so the far half of its line stays open) */
  function covered(m, walls) {
    var iv = [];
    walls.forEach(function (w) {
      if (!w.seg) return;
      var t = w.seg.map(function (q) { var dx = q[0] - m.a0[0], dy = q[1] - m.a0[1]; return { along: dx * m.u[0] + dy * m.u[1], off: Math.abs(dx * m.u[1] - dy * m.u[0]) }; });
      if (t[0].off > 1e-6 || t[1].off > 1e-6) return;
      iv.push([Math.min(t[0].along, t[1].along), Math.max(t[0].along, t[1].along)]);
    });
    iv.sort(function (x, y) { return x[0] - y[0]; });
    var reach = m.lo;
    for (var i = 0; i < iv.length; i++) { if (iv[i][0] > reach + 1e-6) break; reach = Math.max(reach, iv[i][1]); }
    return reach >= m.hi - 1e-6;
  }
  /* the parts made by a set of walls (wall objects): [{cells, area, c}] in reading order (left to right, then top to bottom) */
  function cut(outline, walls) {
    var cells = [outline];
    walls.forEach(function (w) { var nx = []; cells.forEach(function (c) { nx = nx.concat(split(c, w.p, w.d)); }); cells = nx; });
    var par = cells.map(function (_, i) { return i; }), find = function (i) { while (par[i] !== i) i = par[i] = par[par[i]]; return i; };
    for (var i = 0; i < cells.length; i++) for (var j = i + 1; j < cells.length; j++) {
      var m = shared(cells[i], cells[j]); if (!m) continue;
      if (!covered(m, walls)) par[find(i)] = find(j);
    }
    var groups = {};
    cells.forEach(function (c, i) { var r = find(i); (groups[r] = groups[r] || []).push(c); });
    var parts = Object.keys(groups).map(function (r) {
      var cs = groups[r], A = 0, x = 0, y = 0;
      cs.forEach(function (c) { var a = area(c), g = centroid(c); A += a; x += g[0] * a; y += g[1] * a; });
      return { cells: cs, area: A, c: [x / A, y / A] };
    });
    parts.sort(function (a, b) { return Math.abs(a.c[0] - b.c[0]) > 0.5 ? a.c[0] - b.c[0] : a.c[1] - b.c[1]; });
    return parts;
  }
  function whole(shape) { return area(SHAPES[shape].outline); }
  /* n parts, every one within TOL of the whole of whole/n */
  function isEqual(parts, n, W) { return parts.length === n && parts.every(function (p) { return Math.abs(p.area - W / n) <= TOL * W; }); }
  /* largest ÷ smallest */
  function spread(parts) { var a = parts.map(function (p) { return p.area; }); return Math.max.apply(null, a) / Math.min.apply(null, a); }

  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function partsOf(v) { v = +v; return PARTS.indexOf(v) >= 0 ? v : 3; }
  function rounds(n) { n = partsOf(n); return POOL[n].map(function (r, i) { var o = { k: i, n: n }; for (var p in r) o[p] = r[p]; return o; }); }
  function passSize(n) { return POOL[partsOf(n)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(n, rnd, prev) {
    var ks = rounds(n).map(function (r) { return r.k; });
    for (var t = 0; t < 200; t++) { var c = shuffle(ks.slice(), rnd || Math.random); if (!prev || prev.join() !== c.join()) return c; }
    return (prev || ks).slice(1).concat((prev || ks).slice(0, 1));
  }

  /* ---- a round ---- */
  function newState(n, k, colourOn) {
    n = partsOf(n);
    var pool = rounds(n), r = pool[((k % pool.length) + pool.length) % pool.length];
    return { n: n, k: r.k, round: r, offered: wallsOf(r), walls: [], step: 'build', coloured: [], colourOn: !!colourOn,
      misses: 0, cmisses: 0, help: false, verdict: null, done: false, built: false };
  }
  function wallById(st, id) { for (var i = 0; i < st.offered.length; i++) if (st.offered[i].id === id) return st.offered[i]; return null; }
  function wallObjs(st, ids) { return (ids || st.walls).map(function (id) { return wallById(st, id); }).filter(Boolean); }
  function partsNow(st) { return cut(SHAPES[st.round.shape].outline, wallObjs(st)); }
  /* toggle a wall: up, or lifted; a fifth is refused. Any change empties the tubes and clears the help. */
  function toggle(st, id) {
    if (st.step !== 'build' || !wallById(st, id)) return { ok: false };
    var j = st.walls.indexOf(id);
    if (j < 0 && st.walls.length >= MAXWALLS) return { ok: false, key: 'hintTooMany' };
    if (j >= 0) st.walls.splice(j, 1); else st.walls.push(id);
    st.verdict = null; st.help = false;
    return { ok: true, up: j < 0 };
  }
  function colour(st, i) {
    if (st.step !== 'colour' || st.done) return false;
    var m = partsNow(st).length; if (!(i >= 0 && i < m)) return false;
    var j = st.coloured.indexOf(i); if (j >= 0) st.coloured.splice(j, 1); else st.coloured.push(i);
    st.verdict = null; st.help = false; return true;
  }
  /* the tube read-out of a set of parts: the first n parts (reading order) drain into the n tubes, the rest into the puddle tray;
     a level is the part's area over one fair share (1 = the gold line) */
  function tubes(parts, n, W) {
    var share = W / n, o = [];
    for (var i = 0; i < n; i++) o.push(i < parts.length ? { part: i, level: parts[i].area / share } : { part: null, level: 0 });
    return { tubes: o, puddle: parts.slice(n).map(function (p, j) { return { part: n + j, level: p.area / share }; }) };
  }
  function lineState(level) { return Math.abs(level - 1) <= TOL * 4 ? 'at' : level > 1 ? 'over' : 'under'; }
  /* Check = rain. Build: no wall → a note; equal n parts → built (colour step if on, else done); else a miss.
     Colour: k coloured parts → done; else a miss. */
  function check(st) {
    if (st.done) return { result: 'no' };
    var W = whole(st.round.shape), parts = partsNow(st), t = tubes(parts, st.n, W);
    if (st.step === 'build') {
      if (!st.walls.length) return { result: 'note', key: 'hintStart' };
      st.verdict = { parts: parts.map(function (p) { return p.area; }), tubes: t.tubes, puddle: t.puddle };
      if (isEqual(parts, st.n, W)) {
        st.built = true; st.help = false;
        if (st.colourOn) { st.step = 'colour'; st.verdict.kind = 'built'; return { result: 'built' }; }
        st.done = true; st.verdict.kind = 'ok'; return { result: 'ok' };
      }
      st.misses++; st.help = st.misses >= 2;
      var kind = parts.length !== st.n ? 'count' : 'unequal'; st.verdict.kind = kind;
      return { result: 'miss', kind: kind };
    }
    st.verdict = { parts: parts.map(function (p) { return p.area; }), tubes: t.tubes, puddle: [], coloured: st.coloured.slice() };
    if (st.coloured.length === st.round.colour) { st.done = true; st.verdict.kind = 'ok'; return { result: 'ok' }; }
    st.cmisses++; st.help = st.cmisses >= 2; st.verdict.kind = 'colour';
    return { result: 'miss', kind: 'colour' };
  }
  function hint(st, res) {
    if (!res || res.result !== 'miss') return null;
    if (res.kind === 'colour') return 'hintColour';
    if (st.help) return 'hintGhost';
    return res.kind === 'count' ? 'hintCount' : 'hintUnequal';
  }
  /* is the round's ghost (one right wall set) accepted */
  function accepts(round, ids) { var st = newState(round.n, round.k); ids.forEach(function (id) { toggle(st, id); }); var W = whole(round.shape); return isEqual(partsNow(st), round.n, W); }

  var api = { LOCALES: LOCALES, PARTS: PARTS, TOL: TOL, MAXWALLS: MAXWALLS, CAP: CAP, SHAPES: SHAPES,
    locOf: locOf, partsOf: partsOf, rounds: rounds, passSize: passSize, plan: plan,
    pegs: pegs, notches: notches, wallsOf: wallsOf, chord: chord, area: area, centroid: centroid, split: split, cut: cut, whole: whole,
    isEqual: isEqual, spread: spread, tubes: tubes, lineState: lineState,
    newState: newState, wallById: wallById, wallObjs: wallObjs, partsNow: partsNow, toggle: toggle, colour: colour, check: check, hint: hint, accepts: accepts };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RainTableCore = api;
})(typeof window !== 'undefined' ? window : this);

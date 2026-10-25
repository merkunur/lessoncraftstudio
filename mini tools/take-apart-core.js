/* =====================================================================
   take-apart-core.js — the model for ACTIVITY #105 of the one-by-one
   rebuild: "Is It Still a Triangle?" → THE TAKE-APART TRAY (1.G.A.1).
   Design: docs/activities-rebuild/designs/105-sort-bins.md
   ---------------------------------------------------------------------
   Every shape is built like a construction-kit model: straight (or bent)
   sticks joined by brass joints. Taking a shape apart lays its sticks on
   a rack, longest first, and its joints in cups — one cup per place where
   two stick ends should meet (cups = stick ends ÷ 2), so an open shape
   shows an EMPTY cup and a circle's hoop has no ends and no cups.
   Turning, painting and stretching a shape never change what it is made
   of; that is the lesson (defining vs non-defining attributes).
   Model points live in a 100 × 100 box; a transform {r (degrees), s
   (scale)} only changes how a shape is drawn and how long its sticks are.
   Pure and DOM-free; UMD (window.TakeApartCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TakeApartCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var GAP = 10;          /* an open joint: both stick ends stop this far short of the corner */
  var COLOURS = ['coral', 'teal', 'sun', 'plum', 'sky', 'leaf'];

  function reg(n, r, a0) { var p = []; for (var i = 0; i < n; i++) { var a = (a0 + 360 * i / n) * Math.PI / 180; p.push([50 + r * Math.sin(a), 50 - r * Math.cos(a)]); } return p; }
  function poly(v, o) {
    o = o || {}; var e = [];
    for (var i = 0; i < v.length; i++) e.push({ a: i, b: (i + 1) % v.length, sag: (o.arcs && o.arcs[i]) || 0 });
    return { v: v, e: e, open: o.open || [] };
  }
  var TRI_EQUI = [[50, 8], [94, 84], [6, 84]], HEX_REG = reg(6, 46, 0);
  /* the catalogue (design §6). sag ≠ 0: the edge is an arc bowed by |sag| to the side sign(sag) of the edge's left normal */
  var CAT = {
    tri_equi: poly(TRI_EQUI),
    tri_right: poly([[12, 12], [12, 88], [88, 88]]),
    tri_obtuse: poly([[6, 72], [94, 72], [36, 48]]),
    tri_skinny: poly([[50, 4], [62, 96], [38, 96]]),
    tri_scalene: poly([[4, 60], [96, 80], [40, 22]]),
    tri_open: poly(TRI_EQUI, { open: [1] }),
    tri_curved: poly(TRI_EQUI, { arcs: { 1: -14 } }),
    half_circle: { v: [[4, 27], [96, 27]], e: [{ a: 0, b: 1, sag: 0 }, { a: 1, b: 0, sag: -46 }], open: [] },
    quad_square: poly([[15, 15], [85, 15], [85, 85], [15, 85]]),
    quad_rect: poly([[5, 30], [95, 30], [95, 70], [5, 70]]),
    quad_rhombus: poly([[50, 5], [90, 50], [50, 95], [10, 50]]),
    quad_trap: poly([[25, 25], [75, 25], [95, 80], [5, 80]]),
    quad_para: poly([[25, 25], [95, 25], [75, 75], [5, 75]]),
    quad_kite: poly([[50, 5], [85, 40], [50, 95], [15, 40]]),
    quad_dart: poly([[50, 5], [90, 92], [50, 64], [10, 92]]),
    pent_reg: poly(reg(5, 46, 0)),
    pent_house: poly([[20, 45], [50, 10], [80, 45], [80, 92], [20, 92]]),
    pent_irreg: poly([[10, 40], [55, 8], [92, 35], [80, 92], [22, 85]]),
    hex_reg: poly(HEX_REG),
    hex_irreg: poly([[2, 50], [20, 18], [82, 22], [98, 50], [70, 90], [24, 84]]),
    hex_L: poly([[10, 10], [45, 10], [45, 60], [90, 60], [90, 90], [10, 90]]),
    hex_open: poly(HEX_REG, { open: [0] }),
    circle: { v: [], e: [], open: [], hoop: { rx: 46, ry: 46 } },
    oval: { v: [], e: [], open: [], hoop: { rx: 46, ry: 30 } }
  };
  /* the targets of level 1 and the prototype each one is compared with at miss 2 */
  var TARGETS = { triangle: 3, quadrilateral: 4, pentagon: 5, hexagon: 6, circle: 0 };
  var PROTO = { triangle: 'tri_equi', quadrilateral: 'quad_square', pentagon: 'pent_reg', hexagon: 'hex_reg', circle: 'circle',
    square: 'quad_square', rectangle: 'quad_rect', halfcircle: 'half_circle' };

  /* ---- the rounds (design §6, typed literally) ---- */
  var REAL = [
    { target: 'triangle', items: ['tri_equi r0 s1.0', 'tri_right r90 s0.55', 'tri_obtuse r180 s0.8', 'quad_square r45 s0.8', 'tri_open r0 s1.0', 'pent_reg r0 s0.55'] },
    { target: 'quadrilateral', items: ['quad_square r0 s0.55', 'quad_rect r30 s1.0', 'quad_trap r180 s0.8', 'tri_equi r0 s0.8', 'pent_house r0 s0.8', 'hex_reg r0 s0.55'] },
    { target: 'pentagon', items: ['pent_reg r36 s0.8', 'pent_house r180 s1.0', 'tri_right r0 s0.8', 'quad_rhombus r0 s0.8', 'hex_irreg r0 s1.0', 'circle r0 s0.55'] },
    { target: 'hexagon', items: ['hex_reg r0 s0.55', 'hex_irreg r90 s1.0', 'hex_L r0 s0.8', 'tri_obtuse r0 s0.8', 'quad_para r0 s1.0', 'pent_reg r0 s0.8'] },
    { target: 'triangle', items: ['tri_skinny r0 s1.0', 'tri_scalene r200 s0.55', 'quad_rect r0 s0.8', 'tri_curved r0 s1.0', 'quad_trap r180 s0.8', 'half_circle r270 s0.8'] },
    { target: 'quadrilateral', items: ['quad_rhombus r0 s0.8', 'quad_para r150 s0.55', 'quad_dart r0 s0.8', 'quad_kite r20 s1.0', 'tri_right r0 s0.8', 'oval r0 s1.0'] },
    { target: 'pentagon', items: ['pent_reg r0 s0.55', 'pent_house r90 s0.8', 'pent_irreg r0 s1.0', 'tri_equi r0 s0.8', 'quad_square r45 s1.0', 'hex_irreg r0 s0.8'] },
    { target: 'hexagon', items: ['hex_reg r30 s1.0', 'hex_irreg r0 s0.55', 'tri_right r0 s0.8', 'quad_rect r0 s1.0', 'hex_open r0 s0.8', 'pent_irreg r180 s0.8'] },
    { target: 'circle', items: ['circle r0 s0.55', 'circle r0 s1.0', 'oval r0 s0.8', 'half_circle r0 s0.8', 'hex_reg r0 s0.8', 'tri_curved r0 s0.8'] }
  ];
  var NAME = [
    { shape: 'tri_obtuse r180 s0.8', name: 'triangle', tiles: ['triangle', 'square', 'pentagon', 'circle'] },
    { shape: 'quad_square r45 s0.8', name: 'square', tiles: ['square', 'triangle', 'hexagon', 'circle'] },
    { shape: 'quad_rect r90 s1.0', name: 'rectangle', tiles: ['rectangle', 'square', 'triangle', 'pentagon'] },
    { shape: 'hex_irreg r0 s1.0', name: 'hexagon', tiles: ['hexagon', 'pentagon', 'rectangle', 'circle'] },
    { shape: 'pent_house r0 s0.8', name: 'pentagon', tiles: ['pentagon', 'hexagon', 'triangle', 'square'] },
    { shape: 'half_circle r0 s0.8', name: 'halfcircle', tiles: ['halfcircle', 'circle', 'triangle', 'rectangle'] },
    { shape: 'tri_skinny r150 s1.0', name: 'triangle', tiles: ['triangle', 'rectangle', 'hexagon', 'halfcircle'] },
    { shape: 'circle r0 s0.55', name: 'circle', tiles: ['circle', 'halfcircle', 'square', 'pentagon'] },
    { shape: 'quad_rect r0 s0.55', name: 'rectangle', tiles: ['rectangle', 'square', 'hexagon', 'triangle'] }
  ];
  /* each riddle carries its machine attribute list (the gate checks the text's digits against it) */
  var RIDDLE = [
    { attrs: { straight: 3, corners: 3 }, answer: 'tri_equi r180 s0.8', others: ['quad_square r0 s0.8', 'pent_reg r0 s0.8'], name: 'triangle' },
    { attrs: { straight: 4, equal: true, square: 4 }, answer: 'quad_square r30 s0.8', others: ['quad_rect r0 s0.8', 'quad_rhombus r0 s0.8'], name: 'square' },
    { attrs: { straight: 4, square: 4, equal: false }, answer: 'quad_rect r0 s1.0', others: ['quad_square r0 s0.8', 'quad_para r0 s0.8'], name: 'rectangle' },
    { attrs: { closed: true, straight: 3 }, answer: 'tri_obtuse r90 s0.8', others: ['tri_open r0 s0.8', 'tri_curved r0 s0.8'], name: 'triangle' },
    { attrs: { straight: 5, corners: 5 }, answer: 'pent_house r180 s0.8', others: ['hex_reg r0 s0.8', 'quad_trap r0 s0.8'], name: 'pentagon' },
    { attrs: { straight: 6 }, answer: 'hex_L r0 s0.8', others: ['pent_reg r0 s0.8', 'quad_rect r0 s0.8'], name: 'hexagon' },
    { attrs: { straight: 1, curved: 1 }, answer: 'half_circle r90 s0.8', others: ['circle r0 s0.8', 'tri_equi r0 s0.8'], name: 'halfcircle' },
    { attrs: { corners: 0, straight: 0 }, answer: 'circle r0 s0.8', others: ['half_circle r0 s0.8', 'hex_reg r0 s0.8'], name: 'circle' },
    { attrs: { straight: 4, equal: true, square: 0 }, answer: 'quad_rhombus r0 s0.8', others: ['quad_square r0 s0.8', 'quad_rect r0 s0.8'], name: 'rhombus' }
  ];
  var LEVELS = { real: REAL, name: NAME, riddle: RIDDLE };
  var DISGUISE_IDS = ['tri_skinny', 'tri_scalene', 'quad_dart', 'hex_L'];

  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS[v] ? v : 'real'; }
  function trayOf(v) { return v === 'help' ? 'help' : 'open'; }
  function countOf(v) { return String(v) === '4' ? 4 : 6; }
  function ids(level) { var n = LEVELS[levelOf(level)].length, a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function mod(a, n) { return ((a % n) + n) % n; }
  /* 'tri_equi r90 s0.55' → {id, r, s} */
  function parseItem(t) { var p = String(t).split(' '), o = { id: p[0], r: 0, s: 1 }; for (var i = 1; i < p.length; i++) { if (p[i][0] === 'r') o.r = +p[i].slice(1); if (p[i][0] === 's') o.s = +p[i].slice(1); } return o; }

  /* ---- geometry ---- */
  function sub(p, q) { return [p[0] - q[0], p[1] - q[1]]; }
  function len(d) { return Math.hypot(d[0], d[1]); }
  /* an edge's two drawn ends, pulled back GAP from an open corner */
  function ends(sh, e) {
    var A = sh.v[e.a], B = sh.v[e.b], d = sub(B, A), L = len(d), u = [d[0] / L, d[1] / L];
    var a = A.slice(), b = B.slice();
    if (sh.open.indexOf(e.a) >= 0) a = [A[0] + u[0] * GAP, A[1] + u[1] * GAP];
    if (sh.open.indexOf(e.b) >= 0) b = [B[0] - u[0] * GAP, B[1] - u[1] * GAP];
    return [a, b];
  }
  /* an arc with chord c and sagitta s: its length */
  function arcLen(c, s) { s = Math.abs(s); if (s < 1e-9) return c; var r = (c * c / 4 + s * s) / (2 * s), half = Math.asin(Math.min(1, c / (2 * r))); var th = s <= r ? 2 * half : 2 * Math.PI - 2 * half; return r * th; }
  /* the arc's control point (for drawing): the chord's midpoint pushed out along the left normal × sign */
  function arcMid(a, b, sag) { var d = sub(b, a), L = len(d), n = [-d[1] / L, d[0] / L]; return [(a[0] + b[0]) / 2 + n[0] * sag, (a[1] + b[1]) / 2 + n[1] * sag]; }
  function hoopLen(h) { var a = h.rx, b = h.ry, q = Math.pow(a - b, 2) / Math.pow(a + b, 2); return Math.PI * (a + b) * (1 + 3 * q / (10 + Math.sqrt(4 - 3 * q))); }
  function signedArea(v) { var A = 0; for (var i = 0; i < v.length; i++) { var p = v[i], q = v[(i + 1) % v.length]; A += p[0] * q[1] - q[0] * p[1]; } return A / 2; }
  /* the interior angle (degrees) at vertex k of a polygon, from its orientation */
  function interior(sh, k) {
    var v = sh.v, n = v.length, P = v[mod(k - 1, n)], Q = v[k], R = v[(k + 1) % n];
    var a = sub(P, Q), b = sub(R, Q), ang = Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (len(a) * len(b))))) * 180 / Math.PI;
    var cross = (Q[0] - P[0]) * (R[1] - Q[1]) - (Q[1] - P[1]) * (R[0] - Q[0]), sa = signedArea(v);
    return (cross * sa < 0) ? 360 - ang : ang;   /* a turn against the polygon's orientation is a reflex corner */
  }

  /* take a shape apart: the sticks (longest first) and the cups (stick ends ÷ 2) */
  function takeApart(item) {
    var it = typeof item === 'string' ? parseItem(item) : item, sh = CAT[it.id], s = it.s == null ? 1 : it.s;
    if (!sh) return null;
    if (sh.hoop) return { sticks: [{ len: hoopLen(sh.hoop) * s, curved: true, hoop: true, rx: sh.hoop.rx * s, ry: sh.hoop.ry * s }], cups: [], ends: 0 };
    var sticks = [], nEnds = 0;
    for (var i = 0; i < sh.e.length; i++) {
      var e = sh.e[i], ab = ends(sh, e), c = len(sub(ab[1], ab[0]));
      sticks.push({ len: (e.sag ? arcLen(c, e.sag) : c) * s, curved: !!e.sag, chord: c * s, sag: Math.abs(e.sag) * s, edge: i });
      nEnds += 2;
    }
    sticks.sort(function (x, y) { return y.len - x.len || x.edge - y.edge; });
    var cups = [];
    for (var k = 0; k < nEnds / 2; k++) {
      var filled = sh.open.indexOf(k) < 0, lines = true;
      for (var j = 0; j < sh.e.length; j++) if ((sh.e[j].a === k || sh.e[j].b === k) && sh.e[j].sag) lines = false;
      cups.push({ filled: filled, square: filled && lines && Math.abs(interior(sh, k) - 90) < 2 });
    }
    return { sticks: sticks, cups: cups, ends: nEnds };
  }
  /* the counts a child reads off the tray (never changed by r / s / colour) */
  function counts(item) {
    var t = takeApart(item), c = { straight: 0, curved: 0, corners: 0, empty: 0, square: 0, closed: true, equal: false };
    t.sticks.forEach(function (k) { if (k.curved) c.curved++; else c.straight++; });
    t.cups.forEach(function (u) { if (u.filled) c.corners++; else c.empty++; if (u.square) c.square++; });
    c.closed = c.empty === 0;
    var L = t.sticks.filter(function (k) { return !k.curved; }).map(function (k) { return k.len; });
    c.equal = L.length > 1 && Math.max.apply(null, L) / Math.min.apply(null, L) <= 1.01;
    return c;
  }
  /* the names a shape answers to (a square is also a rectangle and a four-sided shape) */
  function namesOf(item) {
    var it = typeof item === 'string' ? parseItem(item) : item, sh = CAT[it.id], c = counts(it), out = [];
    if (sh.hoop) return sh.hoop.rx === sh.hoop.ry ? ['circle'] : ['oval'];
    if (!c.closed) return ['open'];
    if (c.curved === 1 && c.straight === 1) return ['halfcircle'];
    if (c.curved) return ['curved'];
    if (c.straight === 3) out.push('triangle');
    if (c.straight === 4) { out.push('quadrilateral'); if (c.square === 4) out.push('rectangle'); if (c.equal && c.square === 4) out.push('square'); if (c.equal && c.square === 0) out.push('rhombus'); }
    if (c.straight === 5) out.push('pentagon');
    if (c.straight === 6) out.push('hexagon');
    return out;
  }
  function belongs(item, target) {
    var c = counts(item), it = typeof item === 'string' ? parseItem(item) : item;
    if (target === 'circle') return namesOf(it)[0] === 'circle';
    return c.closed && c.curved === 0 && c.straight === TARGETS[target];
  }
  function satisfies(item, attrs) { var c = counts(item); for (var k in attrs) if (c[k] !== attrs[k]) return false; return true; }
  /* a "disguised" true member (turned ≥ 90°, the smallest size, skinny / lopsided / concave) and a "nearly" false one */
  function disguised(item) { var it = typeof item === 'string' ? parseItem(item) : item, r = mod(it.r, 360); return (r >= 90 && r <= 270) || it.s <= 0.55 || DISGUISE_IDS.indexOf(it.id) >= 0; }
  function nearly(item, target) {
    var it = typeof item === 'string' ? parseItem(item) : item, n = namesOf(it)[0], c = counts(it);
    if (n === 'open' || n === 'curved' || n === 'halfcircle' || n === 'oval') return true;
    return target !== 'circle' && Math.abs(c.straight - TARGETS[target]) === 1;
  }
  /* "4 shapes": keep the first disguised true and the first nearly false, then fill true / false alternately */
  function shelfItems(r, count) {
    var all = REAL[r].items, T = REAL[r].target;
    if (count !== 4) return all.slice();
    var keep = [], tr = all.filter(function (x) { return belongs(x, T); }), fa = all.filter(function (x) { return !belongs(x, T); });
    var d = tr.filter(disguised)[0], nf = fa.filter(function (x) { return nearly(x, T); })[0];
    keep.push(d, nf);
    var rt = tr.filter(function (x) { return x !== d; }), rf = fa.filter(function (x) { return x !== nf; }), turn = 0;
    while (keep.length < 4 && (rt.length || rf.length)) { var src = (turn++ % 2 === 0 && rt.length) || !rf.length ? rt : rf; keep.push(src.shift()); }
    return all.filter(function (x) { return keep.indexOf(x) >= 0; });
  }

  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  /* deal a level-1 shelf: positions and colours fresh per round, a plain uniform shuffle (the design's "two disguised
     trues never both at the ends" was dropped: where every true is disguised it left the end slots true 35–40 % of
     the time against 55–60 % in the middle — a measured position tell); the colours never follow the answer */
  function dealReal(r, count, rnd) {
    rnd = rnd || Math.random; var T = REAL[r].target, o = shuffle(shelfItems(r, count), rnd);
    var cols = shuffle(COLOURS, rnd);
    return o.map(function (t, i) { var p = parseItem(t); p.key = t; p.colour = cols[i % cols.length]; p.truth = belongs(p, T); return p; });
  }
  function item(t, colour) { var p = parseItem(t); p.key = t; p.colour = colour; return p; }

  /* ---- the state ---- */
  function newState(level, r, opts) {
    opts = opts || {}; level = levelOf(level); var rnd = opts.rnd || Math.random;
    var st = { level: level, r: r, items: [], place: [], tray: null, sel: null, choice: null, frame: null, misses: 0, show: 0, last: null, wrong: [], done: false };
    if (level === 'real') { st.target = REAL[r].target; st.items = dealReal(r, countOf(opts.count), rnd); }
    else if (level === 'name') {
      var N = NAME[r], pos = opts.pos == null ? Math.floor(rnd() * 4) : opts.pos, rest = shuffle(N.tiles.slice(1), rnd);
      st.items = [item(N.shape, COLOURS[Math.floor(rnd() * 6)])]; st.tiles = rest.slice(0, pos).concat([N.tiles[0]], rest.slice(pos)); st.name = N.name;
    } else {
      var Q = RIDDLE[r], ap = opts.pos == null ? Math.floor(rnd() * 3) : opts.pos, ot = shuffle(Q.others, rnd), cl = shuffle(COLOURS, rnd);
      var list = ot.slice(0, ap).concat([Q.answer], ot.slice(ap));
      st.items = list.map(function (t, i) { return item(t, cl[i]); }); st.answer = ap; st.name = Q.name; st.attrs = Q.attrs;
    }
    st.place = st.items.map(function () { return null; });
    return st;
  }
  /* tap a shape: it comes apart on the tray (and is chosen); tapped again, it snaps back together */
  /* a shape lying on the tray but not chosen (shown by a miss, or dropped in a box) is chosen by the first tap — the
     child's next tap on a box then moves it; only a chosen shape on the tray snaps back together */
  function tap(st, i) { if (i == null || !st.items[i]) return 'no'; if (st.tray === i && st.sel === i) { st.tray = null; st.sel = null; return 'together'; } st.tray = i; st.sel = i; return 'apart'; }
  function together(st) { st.tray = null; st.sel = null; return 'together'; }
  /* put shape i in a box ('yes' | 'no' | null for the shelf) — level 1; into the frame — level 3 */
  function place(st, i, box) { if (st.done || !st.items[i] || st.level !== 'real') return 'no'; st.place[i] = box || null; st.sel = null; return 'placed'; }
  function frame(st, i) { if (st.done || st.level !== 'riddle') return 'no'; st.frame = (i == null || !st.items[i]) ? null : i; st.sel = null; return 'placed'; }
  function choose(st, tile) { if (st.done || st.level !== 'name') return 'no'; st.choice = tile == null ? null : tile; return 'placed'; }

  /* Check: tray (nothing to judge — no miss) · ok · miss with a kind */
  function wrongOf(st) { var w = []; for (var i = 0; i < st.items.length; i++) if ((st.place[i] === 'yes') !== st.items[i].truth) w.push(i); return w; }
  function kindOf(st) {
    if (st.level === 'real') {
      for (var i = 0; i < st.place.length; i++) if (!st.place[i]) return 'tray';
      var w = wrongOf(st); if (!w.length) return 'ok';
      var it = st.items[w[0]], n = namesOf(it)[0];
      if (it.truth) return 'turn';
      if (st.target === 'circle') return n === 'oval' ? 'oval' : 'circle';
      if (n === 'open') return 'open';
      if (n === 'curved' || n === 'halfcircle' || n === 'circle' || n === 'oval') return 'bent';
      return 'count';
    }
    if (st.level === 'name') { if (st.choice == null) return 'tray'; return st.choice === st.name ? 'ok' : 'name'; }
    if (st.frame == null) return 'tray';
    return st.frame === st.answer ? 'ok' : 'riddle';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    if (k === 'ok') { st.done = true; st.wrong = []; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses);
    st.wrong = st.level === 'real' ? wrongOf(st) : [st.level === 'name' ? 0 : st.frame];
    return { result: 'miss', kind: k };
  }
  var TKEY = { triangle: 'Tri', quadrilateral: 'Quad', pentagon: 'Pent', hexagon: 'Hex', circle: 'Circ' };
  function hint(st) {
    var k = st.last, T = TKEY[st.target];
    if (k === 'tray') return { key: st.level === 'real' ? 'hintPlace' : st.level === 'name' ? 'hintName' : 'hintFrame' };
    if (!st.show || k === 'ok') return null;
    if (st.show >= 2) return { key: st.level === 'riddle' ? 'hintRiddle2' : 'hintBoth' };
    if (k === 'turn') return { key: 'hintTurn' };
    if (k === 'open') return { key: 'hintOpen' };
    if (k === 'bent') return { key: 'bent' + T };
    if (k === 'count') return { key: 'cnt' + T };
    if (k === 'circle') return { key: 'hintCircle' };
    if (k === 'oval') return { key: 'hintOval' };
    if (k === 'name') { var n = st.name; return { key: (n === 'square' || n === 'rectangle') ? 'hintLine2' : (n === 'circle' || n === 'halfcircle') ? 'hintBent2' : 'hintCount2' }; }
    return { key: 'hintRiddle1' };
  }
  /* what the miss-2 tray lays beside the misplaced shape: the target's (level 1) or the chosen name's (level 2) prototype */
  function protoOf(st) {
    if (st.level === 'real') return PROTO[st.target] + ' r0 s1.0';
    if (st.level === 'name' && st.choice) return PROTO[st.choice] + ' r0 s1.0';
    return null;
  }

  /* order-only reshuffle per pass, never the previous order; level 1 round 1 opens the first pass.
     pos[] (levels 2 / 3) = where the right tile / the answer sits, balanced over a pass. */
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function plan(level, rnd, prev) {
    rnd = rnd || Math.random; level = levelOf(level); var base = ids(level), o = null;
    for (var k = 0; k < 60; k++) { o = shuffle(base, rnd); if (!prev && level === 'real') { o.splice(o.indexOf(0), 1); o.unshift(0); } if (!eq(o, prev)) break; }
    if (eq(o, prev)) o = base.slice(1).concat(base[0]);
    var pos = null, n = base.length;
    if (level === 'name') { var p = []; for (var i = 0; i < n; i++) p.push(i % 4); p[n - 1] = Math.floor(rnd() * 4); pos = shuffle(p, rnd); }
    if (level === 'riddle') { var q = []; for (var j = 0; j < n; j++) q.push(j % 3); pos = shuffle(q, rnd); }
    return { order: o, pos: pos };
  }
  /* the width band: one shelf row from 560 px; tiny under 300 */
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }
  /* the shelf size of a shape: small < medium < big kept, the smallest lifted so its box never drops under `floor` px */
  function sizeOf(s, box, floor) { var lo = Math.max(0.55, Math.min(0.95, floor / box)); var t = Math.max(0, Math.min(1, (s - 0.55) / 0.45)); return box * (lo + t * (1 - lo)) * (s > 1 ? s : 1); }

  return {
    locale: locale, levelOf: levelOf, trayOf: trayOf, countOf: countOf, ids: ids, parseItem: parseItem,
    takeApart: takeApart, counts: counts, namesOf: namesOf, belongs: belongs, satisfies: satisfies, disguised: disguised, nearly: nearly,
    shelfItems: shelfItems, dealReal: dealReal, arcMid: arcMid, ends: ends,
    newState: newState, tap: tap, together: together, place: place, frame: frame, choose: choose, kindOf: kindOf, check: check, hint: hint, protoOf: protoOf,
    plan: plan, band: band, sizeOf: sizeOf,
    DATA: { LOCALES: LOCALES, CAT: CAT, REAL: REAL, NAME: NAME, RIDDLE: RIDDLE, TARGETS: TARGETS, PROTO: PROTO, COLOURS: COLOURS, GAP: GAP, TKEY: TKEY }
  };
});

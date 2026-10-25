/* =====================================================================
   fair-mobile-core.js — the model for ACTIVITY #107 of the one-by-one
   rebuild: "Equal Halves and Fourths" → THE FAIR MOBILE (1.G.A.3).
   Design: docs/activities-rebuild/designs/107-choice-board.md
   ---------------------------------------------------------------------
   A cut-out card is hung on a mobile with one hook per share. A piece of
   cardboard weighs by its area, so the mobile measures exactly what
   "equal" means: fair shares hang level, an unfair cut tips, too many
   pieces fall into the spare tray, too few leave hooks bare.
   · Cards: a shape in a 100 × 100 box cut by full LINES (split) or RAYS
     from a centre (wedges); circles are sampled at whole degrees, so
     equal sectors are exactly equal.
   · Mobiles (bars and springs massless): ½ = a bar with hooks at ±a;
     ¼ = a top bar whose ends carry two sub-bars with hooks at ±e;
     ⅓ = a bar pivoted at a third: one hook at 2d on the long arm, a
     sub-bar with two hooks at d on the short arm. Each bar hangs from a
     point h above its centre line: tan θ = torque / (load · h), ± 28°.
     Level ⇔ all shares equal (proved in the gate).
   Pure and DOM-free; UMD (window.FairMobileCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.FairMobileCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  var D2R = Math.PI / 180;

  /* ---------------- the shapes (100 × 100 box) ---------------- */
  var HT = 92 * Math.sqrt(3) / 2;   /* the equilateral triangle's height (side 92) */
  function circlePoly() { var p = []; for (var k = 0; k < 360; k++) p.push([50 + 46 * Math.cos(k * D2R), 50 + 46 * Math.sin(k * D2R)]); return p; }
  var SHAPES = {
    circle: circlePoly(),
    square: [[8, 8], [92, 8], [92, 92], [8, 92]],
    rectangle: [[4, 22], [96, 22], [96, 78], [4, 78]],
    triangle: [[50, 50 - HT / 2], [96, 50 + HT / 2], [4, 50 + HT / 2]],
    hexagon: [[96, 50], [73, 50 + HT / 2], [27, 50 + HT / 2], [4, 50], [27, 50 - HT / 2], [73, 50 - HT / 2]]
  };
  var TRI_C = [50, 50 - HT / 2 + 2 * HT / 3];
  var V = function (x) { return [[x, -10], [x, 110]]; }, Hz = function (y) { return [[-10, y], [110, y]]; };
  /* every card: its shape and its cuts (lines, or rays from a centre given as angles in degrees, y down) */
  var CARDS = {
    'circle-halves-v': ['circle', { lines: [V(50)] }], 'circle-halves-h': ['circle', { lines: [Hz(50)] }],
    'circle-halves-diag': ['circle', { lines: [[[0, 0], [100, 100]]] }], 'circle-halves-uneq': ['circle', { lines: [V(50 - 0.4 * 46)] }],
    'circle-fourths': ['circle', { lines: [V(50), Hz(50)] }], 'circle-fourths-diag': ['circle', { lines: [[[0, 0], [100, 100]], [[0, 100], [100, 0]]] }],
    'circle-fourths-uneq': ['circle', { lines: [V(50 - 0.3 * 46), Hz(50 - 0.25 * 46)] }],
    'circle-thirds': ['circle', { rays: [50, 50, [-90, 30, 150]] }], 'circle-thirds-uneq': ['circle', { rays: [50, 50, [-90, 0, 120]] }],
    'circle-notsplit': ['circle', {}],
    'sq-halves-v': ['square', { lines: [V(50)] }], 'sq-halves-h': ['square', { lines: [Hz(50)] }], 'sq-halves-diag': ['square', { lines: [[[0, 0], [100, 100]]] }],
    'sq-halves-uneq': ['square', { lines: [V(8 + 0.32 * 84)] }], 'sq-fourths-grid': ['square', { lines: [V(50), Hz(50)] }],
    'sq-fourths-diag': ['square', { lines: [[[0, 0], [100, 100]], [[0, 100], [100, 0]]] }], 'sq-fourths-uneq': ['square', { lines: [V(8 + 0.35 * 84), Hz(8 + 0.40 * 84)] }],
    'sq-thirds-strips': ['square', { lines: [V(8 + 84 / 3), V(8 + 168 / 3)] }], 'sq-thirds-y': ['square', { rays: [50, 50, [-135, -45, 90]] }], 'sq-notsplit': ['square', {}],
    'rect-halves-h': ['rectangle', { lines: [Hz(50)] }], 'rect-halves-v': ['rectangle', { lines: [V(50)] }], 'rect-halves-uneq': ['rectangle', { lines: [V(4 + 0.32 * 92)] }],
    'rect-fourths-strips': ['rectangle', { lines: [V(27), V(50), V(73)] }], 'rect-fourths-grid': ['rectangle', { lines: [V(50), Hz(50)] }],
    'rect-fourths-uneq': ['rectangle', { lines: [V(4 + 0.35 * 92), Hz(22 + 0.40 * 56)] }], 'rect-thirds-strips': ['rectangle', { lines: [V(4 + 92 / 3), V(4 + 184 / 3)] }],
    'rect-thirds-uneq': ['rectangle', { lines: [V(27), V(4 + 0.6 * 92)] }], 'rect-notsplit': ['rectangle', {}],
    'tri-thirds-centre': ['triangle', { rays: [TRI_C[0], TRI_C[1], [-90, 30, 150]] }], 'tri-thirds-bands': ['triangle', { lines: [Hz(50 - HT / 2 + HT / 3), Hz(50 - HT / 2 + 2 * HT / 3)] }],
    'tri-halves': ['triangle', { lines: [V(50)] }], 'tri-notsplit': ['triangle', {}],
    'hex-thirds-rhombi': ['hexagon', { rays: [50, 50, [0, 120, 240]] }], 'hex-thirds-bands': ['hexagon', { lines: [Hz(50 - HT / 2 + HT / 3), Hz(50 - HT / 2 + 2 * HT / 3)] }],
    'hex-halves': ['hexagon', { lines: [V(50)] }], 'hex-sixths': ['hexagon', { rays: [50, 50, [0, 60, 120, 180, 240, 300]] }]
  };

  /* ---------------- polygon geometry ---------------- */
  function area(p) { var a = 0; for (var i = 0; i < p.length; i++) { var q = p[i], r = p[(i + 1) % p.length]; a += q[0] * r[1] - r[0] * q[1]; } return Math.abs(a) / 2; }
  function centroid(p) {
    var a = 0, cx = 0, cy = 0;
    for (var i = 0; i < p.length; i++) { var q = p[i], r = p[(i + 1) % p.length], c = q[0] * r[1] - r[0] * q[1]; a += c; cx += (q[0] + r[0]) * c; cy += (q[1] + r[1]) * c; }
    return [cx / (3 * a), cy / (3 * a)];
  }
  /* the side of a line (a → b) a point lies on */
  function side(a, b, p) { return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); }
  function cutAt(p, q, a, b) { var s = side(a, b, p), t = side(a, b, q), u = s / (s - t); return [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u]; }
  /* keep the part of a polygon on one side of a line (sign +1 / −1) */
  function clipHalf(poly, a, b, sign) {
    var out = [];
    for (var i = 0; i < poly.length; i++) {
      var p = poly[i], q = poly[(i + 1) % poly.length], sp = sign * side(a, b, p) >= -1e-9, sq = sign * side(a, b, q) >= -1e-9;
      if (sp) out.push(p);
      if (sp !== sq) out.push(cutAt(p, q, a, b));
    }
    return out;
  }
  /* Sutherland–Hodgman against a convex clip polygon (counter-clockwise in screen terms is not needed: the sign is read off its own area) */
  function clipConvex(poly, clip) {
    var s = 0; for (var i = 0; i < clip.length; i++) { var q = clip[i], r = clip[(i + 1) % clip.length]; s += q[0] * r[1] - r[0] * q[1]; }
    var sign = s > 0 ? 1 : -1, out = poly;
    for (var j = 0; j < clip.length && out.length; j++) out = clipHalf(out, clip[j], clip[(j + 1) % clip.length], sign);
    return out;
  }
  function piecesOf(id) {
    var c = CARDS[id], poly = SHAPES[c[0]], cut = c[1], parts = [poly];
    if (cut.lines) cut.lines.forEach(function (L) {
      var next = []; parts.forEach(function (p) { var A = clipHalf(p, L[0], L[1], 1), B = clipHalf(p, L[0], L[1], -1); if (A.length > 2 && area(A) > 1e-6) next.push(A); if (B.length > 2 && area(B) > 1e-6) next.push(B); }); parts = next;
    });
    if (cut.rays) {
      var cx = cut.rays[0], cy = cut.rays[1], ang = cut.rays[2].slice().sort(function (a, b) { return a - b; });
      parts = ang.map(function (a0, i) {
        var a1 = i + 1 < ang.length ? ang[i + 1] : ang[0] + 360, w = [[cx, cy]];
        for (var t = a0; t < a1; t += 5) w.push([cx + 300 * Math.cos(t * D2R), cy + 300 * Math.sin(t * D2R)]);
        w.push([cx + 300 * Math.cos(a1 * D2R), cy + 300 * Math.sin(a1 * D2R)]);
        return clipConvex(poly, w);
      });
    }
    var tot = area(poly);
    return parts.map(function (p) { var c2 = centroid(p); return { poly: p, w: area(p) / tot, cx: c2[0], cy: c2[1] }; })
      /* hooks are filled left to right by centroid x (ties: the higher piece first) */
      .sort(function (a, b) { return (Math.abs(a.cx - b.cx) > 0.5 ? a.cx - b.cx : a.cy - b.cy); });
  }
  var PIECE_CACHE = {};
  function card(id) { if (!PIECE_CACHE[id]) PIECE_CACHE[id] = { id: id, shape: CARDS[id][0], outline: SHAPES[CARDS[id][0]], pieces: piecesOf(id) }; return PIECE_CACHE[id]; }

  /* ---------------- the mobiles ---------------- */
  var GEOM = { a: 140, e: 60, d: 280 / 3, h: 18, clamp: 28 };
  var HOOKS = { halves: 2, thirds: 3, fourths: 4 };
  function tilt(torque, load) { if (load <= 1e-12) return 0; var t = Math.atan(torque / (load * GEOM.h)) / D2R; return Math.max(-GEOM.clamp, Math.min(GEOM.clamp, t)); }
  /* the settled angles (degrees, + = the right end down) for the hook weights (0 = a bare hook) */
  function settle(type, w) {
    var a = GEOM.a, e = GEOM.e, d = GEOM.d;
    if (type === 'halves') return { top: tilt(a * (w[1] - w[0]), w[0] + w[1]) };
    if (type === 'fourths') {
      var L = w[0] + w[1], R = w[2] + w[3];
      return { top: tilt(a * (R - L), L + R), sub1: tilt(e * (w[1] - w[0]), L), sub2: tilt(e * (w[3] - w[2]), R) };
    }
    /* thirds: the single hook at 2d on the left, the sub-bar (two hooks) at d on the right */
    var S = w[1] + w[2];
    return { top: tilt(d * S - 2 * d * w[0], w[0] + S), sub: tilt(e * (w[2] - w[1]), S) };
  }
  function isLevel(ang) { for (var k in ang) if (Math.abs(ang[k]) >= 0.5) return false; return true; }
  /* hang a card on a mobile: one piece per hook left to right, the rest to the spare tray */
  function hang(id, type) {
    var P = card(id).pieces, n = HOOKS[type], w = [], hooks = [];
    for (var i = 0; i < n; i++) { hooks.push(i < P.length ? i : null); w.push(i < P.length ? P[i].w : 0); }
    var spare = []; for (var j = n; j < P.length; j++) spare.push(j);
    var ang = settle(type, w), empty = hooks.filter(function (x) { return x == null; }).length;
    return { hooks: hooks, w: w, spare: spare, empty: empty, angles: ang, level: isLevel(ang), fair: isLevel(ang) && !empty && !spare.length };
  }
  /* a spring's stretch (px at full size): 40 × the piece's weight ÷ one fair share's weight */
  function stretch(w, type) { return 40 * w * HOOKS[type]; }

  /* ---------------- the rounds (design §6, typed literally) ---------------- */
  var L1 = [
    ['circle', 'halves', ['circle-halves-v', 'circle-halves-uneq', 'circle-fourths', 'circle-notsplit']],
    ['square', 'halves', ['sq-halves-v', 'sq-halves-uneq', 'sq-fourths-grid', 'sq-fourths-uneq']],
    ['rectangle', 'halves', ['rect-halves-h', 'rect-halves-uneq', 'rect-fourths-strips', 'rect-notsplit']],
    ['circle', 'halves', ['circle-halves-diag', 'circle-halves-uneq', 'circle-fourths', 'circle-fourths-uneq']],
    ['square', 'fourths', ['sq-fourths-grid', 'sq-fourths-uneq', 'sq-halves-v', 'sq-notsplit']],
    ['rectangle', 'fourths', ['rect-fourths-grid', 'rect-fourths-uneq', 'rect-halves-v', 'rect-halves-uneq']],
    ['circle', 'fourths', ['circle-fourths', 'circle-fourths-uneq', 'circle-halves-h', 'circle-notsplit']],
    ['square', 'halves', ['sq-halves-diag', 'sq-halves-uneq', 'sq-fourths-grid', 'sq-fourths-uneq']],
    ['rectangle', 'halves', ['rect-halves-v', 'rect-halves-uneq', 'rect-fourths-strips', 'rect-fourths-uneq']],
    ['circle', 'fourths', ['circle-fourths', 'circle-fourths-uneq', 'circle-halves-v', 'circle-notsplit']],
    ['square', 'fourths', ['sq-fourths-grid', 'sq-fourths-uneq', 'sq-halves-h', 'sq-halves-uneq']],
    ['rectangle', 'halves', ['rect-halves-h', 'rect-halves-uneq', 'rect-fourths-grid', 'rect-notsplit']]
  ];
  var L2 = [
    ['circle', 'thirds', ['circle-thirds', 'circle-thirds-uneq', 'circle-halves-v', 'circle-fourths']],
    ['rectangle', 'thirds', ['rect-thirds-strips', 'rect-thirds-uneq', 'rect-halves-v', 'rect-fourths-strips']],
    ['square', 'thirds', ['sq-thirds-strips', 'sq-thirds-y', 'sq-halves-diag', 'sq-fourths-grid']],
    ['triangle', 'thirds', ['tri-thirds-centre', 'tri-thirds-bands', 'tri-halves', 'tri-notsplit']],
    ['square', 'fourths', ['sq-fourths-diag', 'sq-fourths-uneq', 'sq-thirds-strips', 'sq-notsplit']],
    ['rectangle', 'fourths', ['rect-fourths-strips', 'rect-fourths-uneq', 'rect-thirds-strips', 'rect-halves-h']],
    ['hexagon', 'thirds', ['hex-thirds-rhombi', 'hex-thirds-bands', 'hex-halves', 'hex-sixths']],
    ['circle', 'fourths', ['circle-fourths-diag', 'circle-fourths-uneq', 'circle-thirds', 'circle-halves-h']]
  ];
  var L3 = [['circle-halves-v', 'halves'], ['sq-fourths-grid', 'fourths'], ['rect-thirds-strips', 'thirds'], ['tri-halves', 'halves'],
    ['hex-thirds-rhombi', 'thirds'], ['circle-fourths', 'fourths'], ['sq-fourths-diag', 'fourths'], ['sq-halves-diag', 'halves']];
  var LEVELS = { hf: L1, thirds: L2, name: L3 };
  var MOBILES = ['halves', 'thirds', 'fourths'];
  function levelOf(v) { return LEVELS[v] ? v : 'hf'; }
  function ids(level) { var n = LEVELS[levelOf(level)].length, a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  /* ---------------- the state ---------------- */
  function newState(level, r, opts) {
    opts = opts || {}; level = levelOf(level); var rnd = opts.rnd || Math.random, st;
    if (level === 'name') {
      var R3 = L3[r], pos = opts.pos == null ? Math.floor(rnd() * 3) : opts.pos, others = shuffle(MOBILES.filter(function (m) { return m !== R3[1]; }), rnd);
      st = { level: level, r: r, cards: [R3[0]], mobiles: others.slice(0, pos).concat([R3[1]], others.slice(pos)), want: R3[1], right: pos };
    } else {
      var R = LEVELS[level][r], p = opts.pos == null ? Math.floor(rnd() * 4) : opts.pos, rest = shuffle(R[2].slice(1), rnd);
      st = { level: level, r: r, shape: R[0], want: R[1], cards: rest.slice(0, p).concat([R[2][0]], rest.slice(p)), mobiles: [R[1]], right: p };
    }
    st.hung = null; st.on = null; st.pin = true; st.misses = 0; st.show = 0; st.last = null; st.done = false;
    return st;
  }
  /* hang card i on mobile m (level 3: which of the three; else the one mobile); the pin goes back in */
  function hangCard(st, i, m) { if (i == null || !st.cards[i]) return 'no'; st.hung = i; st.on = m == null ? 0 : m; st.pin = !st.done ? true : false; return 'hung'; }
  function takeDown(st) { st.hung = null; st.on = null; st.pin = true; return 'down'; }
  function current(st) { return st.hung == null ? null : hang(st.cards[st.hung], st.mobiles[st.on]); }
  function kindOf(st) {
    if (st.hung == null) return 'tray';
    var H = current(st), n = card(st.cards[st.hung]).pieces.length;
    if (st.level === 'name') return HOOKS[st.mobiles[st.on]] === n ? 'ok' : 'mobile';
    if (H.spare.length) return 'many';
    if (H.empty) return 'few';
    return H.level ? 'ok' : 'uneq';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    st.pin = false;
    if (k === 'ok') { st.done = true; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses);
    return { result: 'miss', kind: k };
  }
  function hint(st) {
    var k = st.last;
    if (k === 'tray') return { key: 'hintEmpty' };
    if (!st.show || k === 'ok') return null;
    if (st.show >= 2) return { key: k === 'uneq' ? 'hintSprings' : 'hintCount2' };
    return { key: { uneq: 'hintUneq', many: 'hintMany', few: 'hintFew', mobile: 'hintMobile' }[k] };
  }

  /* order-only reshuffle per pass (L1 #1 opens the first pass), never the previous order; pos[] = the right card's slot
     (L1: each of 4 slots 3 times a pass; L2: twice) or the right mobile's place (L3: 3·3·2, the leftover drawn at random) */
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function plan(level, rnd, prev) {
    rnd = rnd || Math.random; level = levelOf(level); var base = ids(level), o = null;
    for (var k = 0; k < 200; k++) { var c = shuffle(base, rnd); if (!prev && level === 'hf') { c.splice(c.indexOf(0), 1); c.unshift(0); } if (!eq(c, prev)) { o = c; break; } }
    if (!o) o = base.slice(1).concat(base[0]);
    var slots = level === 'name' ? 3 : 4, n = o.length, pool = [];
    for (var i = 0; i < n - n % slots; i++) pool.push(i % slots);
    var left = []; for (var s = 0; s < slots; s++) left.push(s);
    pool = shuffle(pool.concat(shuffle(left, rnd).slice(0, n % slots)), rnd);
    return { order: o, pos: pool };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    locale: locale, levelOf: levelOf, ids: ids, card: card, piecesOf: piecesOf, area: area, centroid: centroid,
    settle: settle, isLevel: isLevel, hang: hang, stretch: stretch, tilt: tilt,
    newState: newState, hangCard: hangCard, takeDown: takeDown, current: current, kindOf: kindOf, check: check, hint: hint, plan: plan, band: band,
    DATA: { LOCALES: LOCALES, CARDS: CARDS, SHAPES: SHAPES, L1: L1, L2: L2, L3: L3, GEOM: GEOM, HOOKS: HOOKS, MOBILES: MOBILES, HT: HT, TRI_C: TRI_C }
  };
});

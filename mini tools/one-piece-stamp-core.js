/* =====================================================================
   one-piece-stamp-core.js — the model for ACTIVITY #108 of the
   one-by-one rebuild: "Make Equal Parts" → THE ONE-PIECE STAMP (1.G.A.3).
   Design: docs/activities-rebuild/designs/108-fractions.md
   ---------------------------------------------------------------------
   The child CUTS a cardboard shape (edge-to-edge cuts and spokes from a
   menu per shape), then lifts a glass copy of one piece and stamps it on
   the others: equal parts are COPIES of one piece. The cut menu is built
   so that on every round "equal in area" ⇔ "every piece is a copy"
   (proved by enumeration in the gate), so the stamp never rejects a fair
   cut and never accepts an unfair one.
   · Shapes in a 100 × 100 box, all convex; the circle and the oval are
     360-gons (vertex k at k°), so pegs every 15° are vertices.
   · A cut is a line from snap point to snap point (it runs edge to edge)
     or a spoke from the centre pin; pieces are clipped polygons.
   · A copy: the stamp (a piece) is turned and/or flipped about its own
     centroid onto the other piece's centroid, at the angles that lay one
     of its straight edges along one of theirs; it is a copy when the areas
     agree within 0.5 % and the overlap covers ≥ 99.5 %.
   Pure and DOM-free; UMD (window.OnePieceStampCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OnePieceStampCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  var D2R = Math.PI / 180, TOL = 0.005;

  /* ---------------- the shapes (100 × 100 box) ---------------- */
  var HT = 92 * Math.sqrt(3) / 2;
  function ring(cx, cy, a, b) { var p = []; for (var k = 0; k < 360; k++) p.push([cx + a * Math.cos(k * D2R), cy + b * Math.sin(k * D2R)]); return p; }
  var PENT = []; for (var pk = 0; pk < 5; pk++) PENT.push([50 + 48 * Math.cos((-90 + 72 * pk) * D2R), 52 + 48 * Math.sin((-90 + 72 * pk) * D2R)]);
  var SHAPES = {
    circle: ring(50, 50, 46, 46),
    square: [[8, 8], [92, 8], [92, 92], [8, 92]],
    rect: [[4, 21.25], [96, 21.25], [96, 78.75], [4, 78.75]],
    ellipse: ring(50, 50, 46, 30),
    diamond: [[50, 18], [96, 50], [50, 82], [4, 50]],
    triangle: [[50, 50 - HT / 2], [96, 50 + HT / 2], [4, 50 + HT / 2]],
    hexagon: [[96, 50], [73, 50 + HT / 2], [27, 50 + HT / 2], [4, 50], [27, 50 - HT / 2], [73, 50 - HT / 2]],
    pentagon: PENT
  };
  var CENTRE = { circle: [50, 50], triangle: [50, 50 - HT / 2 + 2 * HT / 3], hexagon: [50, 50] };

  /* ---------------- polygon geometry ---------------- */
  function area(p) { var a = 0; for (var i = 0; i < p.length; i++) { var q = p[i], r = p[(i + 1) % p.length]; a += q[0] * r[1] - r[0] * q[1]; } return Math.abs(a) / 2; }
  function sarea(p) { var a = 0; for (var i = 0; i < p.length; i++) { var q = p[i], r = p[(i + 1) % p.length]; a += q[0] * r[1] - r[0] * q[1]; } return a / 2; }
  function centroid(p) {
    var A = 0, x = 0, y = 0;
    for (var i = 0; i < p.length; i++) { var q = p[i], r = p[(i + 1) % p.length], c = q[0] * r[1] - r[0] * q[1]; A += c; x += (q[0] + r[0]) * c; y += (q[1] + r[1]) * c; }
    return Math.abs(A) < 1e-12 ? p[0].slice() : [x / (3 * A), y / (3 * A)];
  }
  function side(a, b, p) { return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); }
  function cutAt(p, q, a, b) { var s = side(a, b, p), t = side(a, b, q), u = s / (s - t); return [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u]; }
  /* the part of a polygon on one side of the line a→b (sign +1 / −1); exact for convex and non-convex input */
  function clipHalf(poly, a, b, sign) {
    var out = [];
    for (var i = 0; i < poly.length; i++) {
      var p = poly[i], q = poly[(i + 1) % poly.length], sp = sign * side(a, b, p), sq = sign * side(a, b, q);
      if (sp >= 0) out.push(p);
      if ((sp > 0 && sq < 0) || (sp < 0 && sq > 0)) out.push(cutAt(p, q, a, b));
    }
    return out;
  }
  function isConvex(p) { var s = 0; for (var i = 0; i < p.length; i++) { var a = p[i], b = p[(i + 1) % p.length], c = p[(i + 2) % p.length], z = side(a, b, c); if (Math.abs(z) < 1e-9) continue; if (!s) s = z > 0 ? 1 : -1; else if ((z > 0 ? 1 : -1) !== s) return false; } return true; }
  /* subject ∩ convex clip (Sutherland–Hodgman, either orientation) */
  function clipConvex(subject, clip) {
    var o = sarea(clip) > 0 ? 1 : -1, out = subject;
    for (var i = 0; i < clip.length && out.length; i++) out = clipHalf(out, clip[i], clip[(i + 1) % clip.length], o);
    return out;
  }
  function overlap(A, B) {
    if (isConvex(A)) { var c = clipConvex(B, A); return c.length > 2 ? { poly: c, area: area(c) } : { poly: [], area: 0 }; }
    if (isConvex(B)) { var d = clipConvex(A, B); return d.length > 2 ? { poly: d, area: area(d) } : { poly: [], area: 0 }; }
    return { poly: [], area: 0 };
  }

  /* ---------------- the cut menu (design §4; nothing else can be cut) ---------------- */
  var K24 = []; for (var k = 1; k < 24; k++) K24.push(k);
  function edgePoints(shape) { var P = SHAPES[shape], out = []; for (var i = 0; i < P.length; i++) { var a = P[i], b = P[(i + 1) % P.length]; for (var t = 0; t < 24; t++) out.push({ p: [a[0] + (b[0] - a[0]) * t / 24, a[1] + (b[1] - a[1]) * t / 24], e: i, t: t }); } return out; }
  function onEdges(pt, n) { return pt.t === 0 ? [pt.e, (pt.e - 1 + n) % n] : [pt.e]; }
  function key(p) { return Math.round(p[0] * 1000) / 1000 + ',' + Math.round(p[1] * 1000) / 1000; }
  function seg(a, b, kind) { return { kind: kind || 'line', a: a, b: b, id: (kind || 'line') + ':' + [key(a), key(b)].sort().join('|') }; }
  /* the mode of a round: 'line' (straight cuts) or 'spoke' (from the centre pin) */
  var MENU = {};
  function menu(shape, mode) {
    var k0 = shape + '/' + mode; if (MENU[k0]) return MENU[k0];
    var out = [], i, j;
    if (mode === 'spoke') {
      var c = CENTRE[shape];
      if (shape === 'circle') for (i = 0; i < 24; i++) out.push(seg(c, SHAPES.circle[i * 15], 'spoke'));
      else edgePoints(shape).forEach(function (q) { out.push(seg(c, q.p, 'spoke')); });
    } else if (shape === 'square' || shape === 'rect') {
      var P = SHAPES[shape], x0 = P[0][0], x1 = P[1][0], y0 = P[0][1], y1 = P[2][1];
      K24.forEach(function (k) { var x = x0 + (x1 - x0) * k / 24, y = y0 + (y1 - y0) * k / 24; out.push(seg([x, y0], [x, y1])); out.push(seg([x0, y], [x1, y])); });
      if (shape === 'square') { out.push(seg([8, 8], [92, 92])); out.push(seg([92, 8], [8, 92])); }
    } else if (shape === 'ellipse') {
      K24.forEach(function (k) { var x = 4 + 92 * k / 24, y = 20 + 60 * k / 24, h = 30 * Math.sqrt(1 - Math.pow((x - 50) / 46, 2)), w = 46 * Math.sqrt(1 - Math.pow((y - 50) / 30, 2)); out.push(seg([x, 50 - h], [x, 50 + h])); out.push(seg([50 - w, y], [50 + w, y])); });
    } else if (shape === 'diamond') {
      K24.forEach(function (k) { var y = 18 + 64 * k / 24, w = 46 * (1 - Math.abs(y - 50) / 32), x = 4 + 92 * k / 24, h = 32 * (1 - Math.abs(x - 50) / 46); out.push(seg([50 - w, y], [50 + w, y])); out.push(seg([x, 50 - h], [x, 50 + h])); });
      out.push(seg([27, 34], [73, 66])); out.push(seg([73, 34], [27, 66]));
    } else if (shape === 'circle') {
      for (i = 0; i < 24; i++) for (j = i + 1; j < 24; j++) out.push(seg(SHAPES.circle[i * 15], SHAPES.circle[j * 15]));
    } else if (shape === 'hexagon') {
      var E = edgePoints('hexagon');
      for (i = 0; i < E.length; i++) for (j = i + 1; j < E.length; j++) { var ei = onEdges(E[i], 6), ej = onEdges(E[j], 6); if (ei.some(function (e) { return ej.indexOf(e) >= 0; })) continue; out.push(seg(E[i].p, E[j].p)); }
    } else if (shape === 'triangle' || shape === 'pentagon') {
      var Pv = SHAPES[shape], n = Pv.length, Ep = edgePoints(shape);
      for (i = 0; i < n; i++) Ep.forEach(function (q) { var e = onEdges(q, n); if (e.indexOf(i) >= 0 || e.indexOf((i - 1 + n) % n) >= 0) return; out.push(seg(Pv[i], q.p)); });
    }
    var seen = {}, uniq = out.filter(function (s) { if (seen[s.id]) return false; seen[s.id] = 1; return true; });
    return (MENU[k0] = uniq);
  }
  function findCut(shape, mode, a, b) { var id = seg(a, b, mode === 'spoke' ? 'spoke' : 'line').id; var m = menu(shape, mode); for (var i = 0; i < m.length; i++) if (m[i].id === id) return m[i]; return null; }

  /* ---------------- pieces ---------------- */
  /* lines split every piece; spokes (≥ 2) make wedges from the centre, each wedge built along the outline */
  function wedge(shape, c, p, q) {
    var P = SHAPES[shape], ang = function (z) { return Math.atan2(z[1] - c[1], z[0] - c[0]); }, a0 = ang(p), span = ((ang(q) - a0) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) || 2 * Math.PI;
    var pts = P.map(function (v) { return { v: v, d: ((ang(v) - a0) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) }; }).filter(function (o) { return o.d > 1e-9 && o.d < span - 1e-9; }).sort(function (x, y) { return x.d - y.d; });
    return [c, p].concat(pts.map(function (o) { return o.v; }), [q]);
  }
  function piecesOf(shape, cuts) {
    var lines = cuts.filter(function (c) { return c.kind === 'line'; }), spokes = cuts.filter(function (c) { return c.kind === 'spoke'; }), parts;
    if (spokes.length >= 2) {
      var c = spokes[0].a, ang = function (z) { return Math.atan2(z[1] - c[1], z[0] - c[0]); };
      var ends = spokes.map(function (s) { return s.b; }).sort(function (x, y) { return ang(x) - ang(y); });
      parts = ends.map(function (p, i) { return wedge(shape, c, p, ends[(i + 1) % ends.length]); });
    } else parts = [SHAPES[shape]];
    lines.forEach(function (L) { var next = []; parts.forEach(function (p) { [1, -1].forEach(function (s) { var h = clipHalf(p, L.a, L.b, s); if (h.length > 2 && area(h) > 1e-6) next.push(h); }); }); parts = next; });
    var tot = area(SHAPES[shape]);
    return parts.map(function (p) { var c2 = centroid(p); return { poly: p, area: area(p), w: area(p) / tot, cx: c2[0], cy: c2[1] }; })
      .sort(function (a, b) { return Math.abs(a.cy - b.cy) > 1 ? a.cy - b.cy : a.cx - b.cx; });
  }

  /* ---------------- the stamp: is B a copy of A? ---------------- */
  function edges(p, min) { var out = []; for (var i = 0; i < p.length; i++) { var a = p[i], b = p[(i + 1) % p.length], l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (l >= min) out.push({ a: a, b: b, l: l, t: Math.atan2(b[1] - a[1], b[0] - a[0]) }); } return out; }
  /* B turned by rot and (flip) mirrored about its own centroid, then moved onto cA */
  function place(B, cB, cA, rot, flip) { var c = Math.cos(rot), s = Math.sin(rot); return B.map(function (p) { var x = p[0] - cB[0], y = p[1] - cB[1]; if (flip) x = -x; return [cA[0] + x * c - y * s, cA[1] + x * s + y * c]; }); }
  /* the best fit of a stamp cut from piece S onto piece T: tries every turn that lays a straight edge of the stamp along T's longest straight edge */
  function fit(S, T) {
    var eT = edges(T.poly, 3).sort(function (x, y) { return y.l - x.l; }), eS = edges(S.poly, 3), best = null;
    if (!eT.length || !eS.length) return { copy: false, score: 0, poly: place(S.poly, [S.cx, S.cy], [T.cx, T.cy], 0, 0), inter: [] };
    var cands = [];
    eT.slice(0, 2).forEach(function (et) { eS.forEach(function (es) { [0, 1].forEach(function (f) { [0, Math.PI].forEach(function (r) { var ts = f ? Math.PI - es.t : es.t; cands.push({ rot: et.t - ts + r, flip: f }); }); }); }); });
    cands.forEach(function (cd) { var P = place(S.poly, [S.cx, S.cy], [T.cx, T.cy], cd.rot, cd.flip), o = overlap(T.poly, P); if (!best || o.area > best.ov) best = { rot: cd.rot, flip: cd.flip, poly: P, inter: o.poly, ov: o.area }; });
    var score = best.ov / Math.max(T.area, S.area), copy = Math.abs(S.area - T.area) <= TOL * Math.max(S.area, T.area) && score >= 1 - TOL;
    return { copy: copy, score: score, rot: best.rot, flip: best.flip, poly: best.poly, inter: best.inter, bigger: S.area > T.area };
  }
  function isCopy(S, T) { return fit(S, T).copy; }
  function allCopies(P) { for (var i = 1; i < P.length; i++) if (!isCopy(P[0], P[i])) return false; return true; }
  function equalAreas(P) { var lo = Infinity, hi = 0; P.forEach(function (p) { lo = Math.min(lo, p.area); hi = Math.max(hi, p.area); }); return P.length > 0 && hi - lo <= TOL * hi; }

  /* ---------------- the rounds (design §6, typed) ---------------- */
  var V = function (s, k) { var P = SHAPES[s], x0 = P[0][0], x1 = P[1][0], y0 = P[0][1], y1 = P[2][1], x = x0 + (x1 - x0) * k / 24; return seg([x, y0], [x, y1]); };
  var H = function (s, k) { var P = SHAPES[s], x0 = P[0][0], x1 = P[1][0], y0 = P[0][1], y1 = P[2][1], y = y0 + (y1 - y0) * k / 24; return seg([x0, y], [x1, y]); };
  var PEG = function (d) { return SHAPES.circle[((d % 360) + 360) % 360]; };
  var CH = function (d1, d2) { return seg(PEG(d1), PEG(d2)); };
  var SP = function (shape, p) { return seg(CENTRE[shape], p, 'spoke'); };
  var EV = function (k) { return 4 + 92 * k / 24; };
  var ELV = function (k) { var x = EV(k), h = 30 * Math.sqrt(1 - Math.pow((x - 50) / 46, 2)); return seg([x, 50 - h], [x, 50 + h]); };
  var ELH = function (k) { var y = 20 + 60 * k / 24, w = 46 * Math.sqrt(1 - Math.pow((y - 50) / 30, 2)); return seg([50 - w, y], [50 + w, y]); };
  var DV = function (k) { var x = EV(k), h = 32 * (1 - Math.abs(x - 50) / 46); return seg([x, 50 - h], [x, 50 + h]); };
  var DH = function (k) { var y = 18 + 64 * k / 24, w = 46 * (1 - Math.abs(y - 50) / 32); return seg([50 - w, y], [50 + w, y]); };
  var T = SHAPES.triangle, X = SHAPES.hexagon, PN = SHAPES.pentagon;
  var mid = function (a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
  var along = function (a, b, k) { return [a[0] + (b[0] - a[0]) * k / 24, a[1] + (b[1] - a[1]) * k / 24]; };
  /* [shape, n, mode, right cuts, tempting cuts, doubling (free play) or null] */
  var L1 = [
    ['circle', 2, 'line', [CH(0, 180)], [CH(30, 150)], [CH(0, 180), CH(90, 270)]],
    ['square', 4, 'line', [V('square', 12), H('square', 12)], [V('square', 10), H('square', 12)], [V('square', 12), H('square', 12), seg([8, 8], [92, 92]), seg([92, 8], [8, 92])]],
    ['rect', 2, 'line', [V('rect', 12)], [V('rect', 10)], [V('rect', 12), H('rect', 12)]],
    ['triangle', 2, 'line', [seg(T[0], mid(T[1], T[2]))], [seg(T[0], along(T[1], T[2], 8))], null],
    ['ellipse', 4, 'line', [ELV(12), ELH(12)], [ELH(12), ELV(8)], null],
    ['diamond', 4, 'line', [DV(12), DH(12)], [DV(12), DH(8)], null],
    ['hexagon', 2, 'line', [seg(X[0], X[3])], [seg(X[0], mid(X[1], X[2]))], [seg(X[0], X[3]), seg(mid(X[1], X[2]), mid(X[4], X[5]))]],
    ['pentagon', 2, 'line', [seg(PN[0], mid(PN[2], PN[3]))], [seg(PN[0], PN[2])], null],
    ['rect', 4, 'line', [V('rect', 6), V('rect', 12), V('rect', 18)], [V('rect', 5), V('rect', 12), V('rect', 19)], [V('rect', 6), V('rect', 12), V('rect', 18), H('rect', 12)]],
    ['circle', 4, 'line', [CH(0, 180), CH(90, 270)], [CH(0, 180), CH(60, 240)], [CH(0, 180), CH(90, 270), CH(45, 225), CH(135, 315)]]
  ];
  var L2 = [
    ['circle', 3, 'spoke', [SP('circle', PEG(270)), SP('circle', PEG(30)), SP('circle', PEG(150))], [SP('circle', PEG(270)), SP('circle', PEG(0)), SP('circle', PEG(135))], [0, 60, 120, 180, 240, 300].map(function (d) { return SP('circle', PEG(d + 270)); })],
    ['rect', 3, 'line', [V('rect', 8), V('rect', 16)], [V('rect', 6), V('rect', 14)], [V('rect', 8), V('rect', 16), H('rect', 12)]],
    ['square', 3, 'line', [V('square', 8), V('square', 16)], [V('square', 8), V('square', 12)], [V('square', 8), V('square', 16), H('square', 12)]],
    ['triangle', 3, 'spoke', [SP('triangle', T[0]), SP('triangle', T[1]), SP('triangle', T[2])], [SP('triangle', T[0]), SP('triangle', T[1]), SP('triangle', mid(T[2], T[0]))], [T[0], mid(T[0], T[1]), T[1], mid(T[1], T[2]), T[2], mid(T[2], T[0])].map(function (p) { return SP('triangle', p); })],
    ['hexagon', 3, 'spoke', [SP('hexagon', X[0]), SP('hexagon', X[2]), SP('hexagon', X[4])], [SP('hexagon', X[1]), SP('hexagon', X[2]), SP('hexagon', X[4])], X.map(function (p) { return SP('hexagon', p); })],
    ['square', 4, 'line', [seg([8, 8], [92, 92]), seg([92, 8], [8, 92])], [seg([8, 8], [92, 92]), V('square', 12)], [seg([8, 8], [92, 92]), seg([92, 8], [8, 92]), V('square', 12), H('square', 12)]],
    ['rect', 3, 'line', [H('rect', 8), H('rect', 16)], [H('rect', 7), H('rect', 17)], [H('rect', 8), H('rect', 16), V('rect', 12)]],
    ['circle', 4, 'line', [CH(0, 180), CH(90, 270)], [CH(0, 180), CH(30, 150)], [CH(0, 180), CH(90, 270), CH(45, 225), CH(135, 315)]]
  ];
  /* level 3: [kind, shape, preset cuts, a, n] — shade: colour a pieces; name: a pieces arrive coloured; trap: unequal, then the fair cut */
  var CROSS = [V('square', 12), H('square', 12)], DIAG = [seg([8, 8], [92, 92]), seg([92, 8], [8, 92])];
  var L3 = [
    ['shade', 'square', CROSS, 3, 4],
    ['shade', 'circle', [SP('circle', PEG(270)), SP('circle', PEG(30)), SP('circle', PEG(150))], 2, 3],
    ['shade', 'rect', [V('rect', 6), V('rect', 12), V('rect', 18)], 1, 4],
    ['shade', 'hexagon', [SP('hexagon', X[0]), SP('hexagon', X[2]), SP('hexagon', X[4])], 1, 3],
    ['name', 'rect', [V('rect', 12)], 1, 2],
    ['name', 'circle', [CH(0, 180), CH(90, 270)], 3, 4],
    ['name', 'triangle', [SP('triangle', T[0]), SP('triangle', T[1]), SP('triangle', T[2])], 2, 3],
    ['name', 'square', DIAG, 2, 4],
    ['trap', 'square', [seg([8, 8], [92, 92]), V('square', 12)], 3, 4]
  ];
  var LEVELS = { hf: L1, thirds: L2, name: L3 };
  function levelOf(v) { return LEVELS[v] ? v : 'hf'; }
  function ids(level) { var n = LEVELS[levelOf(level)].length, a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  /* L2 #8 is two steps: halves, then fourths from the halves */
  var STEP_ROUND = 7;

  /* ---------------- the state ---------------- */
  function newState(level, r, opts) {
    opts = opts || {}; level = levelOf(level); var rnd = opts.rnd || Math.random, st;
    if (level === 'name') {
      var R = L3[r];
      st = { level: level, r: r, kind: R[0], shape: R[1], mode: R[2].some(function (c) { return c.kind === 'spoke'; }) ? 'spoke' : 'line', cuts: R[2].slice(), a: R[3], n: R[4], preset: true };
    } else {
      var Q = LEVELS[level][r];
      st = { level: level, r: r, kind: 'cut', shape: Q[0], n: Q[1], mode: Q[2], cuts: [], preset: false, step: (level === 'thirds' && r === STEP_ROUND) ? 1 : 0 };
      if (st.step === 1) st.n = 2;
    }
    st.locked = 0; st.held = null; st.tokens = {}; st.misses = 0; st.show = 0; st.last = null; st.done = false; st.halved = null; st.wheels = [1, 1]; st.revealed = false;
    refresh(st);
    if (st.kind === 'name') { var idx = st.pieces.map(function (_, i) { return i; }); var sh = st.r === 7 ? (rnd() < 0.5 ? [0, 3] : [1, 2]) : shuffle(idx, rnd).slice(0, st.a); st.shaded = sh.slice().sort(); }
    else st.shaded = [];
    return st;
  }
  function refresh(st) { st.pieces = piecesOf(st.shape, st.halved || st.cuts); st.held = null; st.tokens = {}; }
  function limit(st) { return st.mode === 'spoke' ? 6 : (st.step === 2 ? 3 : st.n - 1); }
  function addCut(st, cut) {
    if (st.preset || st.done || st.halved) return 'no';
    if (!cut || cut.kind !== (st.mode === 'spoke' ? 'spoke' : 'line') || !findCut(st.shape, st.mode, cut.a, cut.b)) return 'no';
    if (st.cuts.some(function (c) { return c.id === cut.id; })) return 'dup';
    if (st.cuts.length >= limit(st)) return 'limit';
    st.cuts.push(cut); refresh(st); return 'added';
  }
  function removeCut(st, id) {
    if (st.preset || st.done || st.halved) return 'no';
    var i = -1; st.cuts.forEach(function (c, j) { if (c.id === id) i = j; });
    if (i < 0) return 'no'; if (i < st.locked) return 'locked';
    st.cuts.splice(i, 1); refresh(st); return 'removed';
  }
  /* the stamp: lift from piece i, stamp on piece j */
  function lift(st, i) { if (!st.pieces[i] || st.pieces.length < 2) return 'no'; st.held = i; st.tokens = {}; st.tokens[i] = 1; return 'lifted'; }
  function putBack(st) { st.held = null; return 'back'; }
  function stampOn(st, j) {
    if (st.held == null || st.held === j || !st.pieces[j]) return { result: 'no' };
    var f = fit(st.pieces[st.held], st.pieces[j]);
    if (f.copy && st.tokens[j] == null) { var m = 0; for (var k in st.tokens) m = Math.max(m, st.tokens[k]); st.tokens[j] = m + 1; }
    return { result: f.copy ? 'copy' : (f.bigger ? 'bigger' : 'smaller'), fit: f };
  }
  /* level 3 shade: a coloured piece is uncoloured by a tap */
  function uncolour(st, i) { if (st.tokens[i] == null) return 'no'; if (st.held === i) { st.held = null; st.tokens = {}; return 'cleared'; } delete st.tokens[i]; return 'uncoloured'; }
  function coloured(st) { return Object.keys(st.tokens).length; }
  function setWheel(st, w, d) { if (st.done) return; st.wheels[w] = Math.max(1, Math.min(8, st.wheels[w] + d)); }
  /* the trap: "Not equal!" — then the fair cut (a cross) to shade on */
  function notEqual(st) { if (st.kind !== 'trap' || st.revealed) return 'no'; if (equalAreas(st.pieces)) return 'no'; st.revealed = true; st.kind = 'shade'; st.cuts = CROSS.slice(); refresh(st); st.misses = 0; st.show = 0; st.last = null; return 'revealed'; }
  /* the auto test (miss 1 / the walking stamp): from the biggest piece to every other */
  function autoTest(st) {
    var P = st.pieces, b = 0; P.forEach(function (p, i) { if (p.area > P[b].area + 1e-9) b = i; });
    var res = P.map(function (p, i) { return i === b ? { result: 'source' } : (function () { var f = fit(P[b], p); return { result: f.copy ? 'copy' : (f.bigger ? 'bigger' : 'smaller'), fit: f }; })(); });
    return { source: b, res: res };
  }
  function kindOf(st) {
    if (st.kind === 'name') return (st.wheels[0] === st.a && st.wheels[1] === st.n) || (st.r === 7 && st.wheels[0] === 1 && st.wheels[1] === 2) ? 'ok' : 'name';
    if (st.kind === 'trap') return 'trap';
    if (st.kind === 'shade') return coloured(st) === st.a && allCopies(st.pieces) ? 'ok' : (coloured(st) === 0 ? 'tray' : 'shade');
    if (!st.cuts.length) return 'tray';
    if (st.pieces.length !== st.n) return 'count';
    return allCopies(st.pieces) ? 'ok' : 'uneq';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    if (k === 'ok') {
      if (st.step === 1) { st.step = 2; st.n = 4; st.locked = st.cuts.length; st.misses = 0; st.show = 0; refresh(st); return { result: 'step' }; }
      st.done = true; if (st.kind === 'cut') { st.tokens = {}; st.pieces.forEach(function (_, i) { st.tokens[i] = i + 1; }); st.held = null; }
      return { result: 'ok' };
    }
    st.misses++; st.show = Math.min(2, st.misses);
    return { result: 'miss', kind: k };
  }
  function hint(st) {
    var k = st.last;
    if (k === 'tray') return { key: st.kind === 'shade' ? 'hintShade0' : 'hintEmpty' };
    if (!st.show || k === 'ok') return null;
    if (k === 'trap') return { key: 'hintTrap' };
    if (k === 'name') return { key: st.show >= 2 ? 'hintName2' : 'hintName' };
    if (k === 'shade') return { key: st.show >= 2 ? 'hintShade2' : 'hintShade' };
    if (st.show >= 2) return { key: 'hintGhost' };
    return { key: k === 'count' ? 'hintCount' : 'hintUneq' };
  }
  /* miss 2: the snap points of one right cut set */
  function ghost(st) {
    if (st.kind !== 'cut') return [];
    var R = LEVELS[st.level][st.r][3], pts = [];
    R.forEach(function (c) { if (c.kind === 'spoke') pts.push(c.b); else { pts.push(c.a); pts.push(c.b); } });
    var seen = {}; return pts.filter(function (p) { var k2 = key(p); if (seen[k2]) return false; seen[k2] = 1; return true; });
  }
  /* free play: halve again (the round's proven doubling), and back */
  function doubling(st) { return st.level === 'name' ? null : LEVELS[st.level][st.r][5]; }
  function halve(st) { if (!st.done || !doubling(st)) return 'no'; st.halved = st.halved ? null : doubling(st).slice(); refresh(st); return st.halved ? 'halved' : 'restored'; }

  /* order-only reshuffle per pass; L1 #1 opens the first pass; L2 #8 always last; never the previous order */
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function plan(level, rnd, prev) {
    rnd = rnd || Math.random; level = levelOf(level); var base = ids(level), o = null;
    for (var k = 0; k < 200; k++) {
      var c = shuffle(base, rnd);
      if (level === 'thirds') { c.splice(c.indexOf(STEP_ROUND), 1); c.push(STEP_ROUND); }
      if (!prev && level === 'hf') { c.splice(c.indexOf(0), 1); c.unshift(0); }
      if (!eq(c, prev)) { o = c; break; }
    }
    return { order: o || base.slice(1).concat(base[0]) };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    locale: locale, levelOf: levelOf, ids: ids, menu: menu, findCut: findCut, seg: seg, piecesOf: piecesOf, area: area, centroid: centroid, clipHalf: clipHalf,
    fit: fit, isCopy: isCopy, allCopies: allCopies, equalAreas: equalAreas, place: place,
    newState: newState, addCut: addCut, removeCut: removeCut, limit: limit, lift: lift, putBack: putBack, stampOn: stampOn, uncolour: uncolour, coloured: coloured,
    setWheel: setWheel, notEqual: notEqual, autoTest: autoTest, kindOf: kindOf, check: check, hint: hint, ghost: ghost, doubling: doubling, halve: halve, plan: plan, band: band,
    DATA: { LOCALES: LOCALES, SHAPES: SHAPES, CENTRE: CENTRE, L1: L1, L2: L2, L3: L3, HT: HT, TOL: TOL, STEP_ROUND: STEP_ROUND, CROSS: CROSS }
  };
});

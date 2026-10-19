/* =====================================================================
   paint-pots-core.js — the model of ACTIVITY #37 of the one-by-one
   rebuild: "Identify the Shape" (K.G.A.2) → THE PAINT POTS.
   Design sheet: docs/activities-rebuild/designs/037-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the brush runs round each piece leaving a bead on every
   corner and ticks on equal sides; the paint stays wet until Check, then
   it only SETS in a piece that truly is the tin's shape — however it is
   turned or however small — and an open figure leaks.

   What a piece IS is computed from its GEOMETRY (its corners, its sides,
   its angles, whether it is closed, curved or rounded) — never from the
   name it was authored with. Pictures are pieces only (no drawn objects,
   no library pictures: shapes/diamond is a turned square).

   Boards: 'picture' (two tins, a picture of pieces) · 'quilt' (one tin,
   eight patches, real or not) · 'count' (triangle + square tins, then how
   many). Labels: 'shape' (outline + word) · 'name' (word) · 'clue'
   (corner beads and side ticks).
   No DOM. UMD: window.PaintPotsCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PaintPotsCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var KINDS = ['circle', 'square', 'triangle', 'rectangle', 'hexagon', 'oval', 'star', 'diamond', 'heart', 'pentagon'];
  /* paint colours (never coral: coral is the miss colour) */
  var PAINT = ['#2F80D0', '#E8A80C', '#2FA35A', '#8A5CC9'];

  /* ---------------- piece geometry ---------------- */
  var D2R = Math.PI / 180;
  function rot(p, c, deg) { var a = deg * D2R, s = Math.sin(a), k = Math.cos(a), x = p[0] - c[0], y = p[1] - c[1]; return [c[0] + x * k - y * s, c[1] + x * s + y * k]; }
  function regular(n, R, start) { var out = []; for (var i = 0; i < n; i++) { var a = (start + 360 * i / n) * D2R; out.push([R * Math.sin(a), -R * Math.cos(a)]); } return out; }
  /* unit templates → local points around (0,0) */
  function local(s) {
    var w = s.w, h = s.h || s.w, t = s.t;
    if (t === 'tri') { var R = w / Math.sqrt(3); return regular(3, R, 0); }
    if (t === 'tri-iso') return [[0, -h * 2 / 3], [w / 2, h / 3], [-w / 2, h / 3]];
    if (t === 'tri-right') return s.flip ? [[w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]] : [[-w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]];
    if (t === 'square') return [[-w / 2, -w / 2], [w / 2, -w / 2], [w / 2, w / 2], [-w / 2, w / 2]];
    if (t === 'rect') return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    if (t === 'rhombus') { var a2 = (s.ang || 60) * D2R / 2, dx = w * Math.cos(a2), dy = w * Math.sin(a2); return [[0, -dy], [dx, 0], [0, dy], [-dx, 0]]; }
    if (t === 'para') { var sh = (s.k || 0.3) * w; return [[-w / 2 + sh / 2, -h / 2], [w / 2 + sh / 2, -h / 2], [w / 2 - sh / 2, h / 2], [-w / 2 - sh / 2, h / 2]]; }
    if (t === 'trap') { var top = s.top || w * 0.6; return [[-top / 2, -h / 2], [top / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]]; }
    if (t === 'kite') return [[0, -h / 2], [w / 2, -h / 6], [0, h / 2], [-w / 2, -h / 6]];
    /* a triangle with its top corner cut off: four corners */
    if (t === 'cutcorner') return [[-w / 2, -h * 0.15], [-w * 0.2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    if (t === 'pent') return regular(5, w / 2, 0);
    if (t === 'hex') return regular(6, w / 2, 30);
    if (t === 'hex-irr') return [[-w * 0.3, -h / 2], [w * 0.25, -h * 0.45], [w / 2, -h * 0.05], [w * 0.3, h / 2], [-w * 0.2, h * 0.42], [-w / 2, h * 0.02]];
    if (t === 'hept') return regular(7, w / 2, 0);
    if (t === 'oct') return regular(8, w / 2, 22.5);
    if (t === 'star') { var out = []; for (var i = 0; i < 10; i++) { var rr = i % 2 ? w / 2 * 0.45 : w / 2, an = 36 * i * D2R; out.push([rr * Math.sin(an), -rr * Math.cos(an)]); } return out; }
    return null;
  }
  /* sampled outline for curved kinds (local coords) */
  function curveLocal(s) {
    var w = s.w, h = s.h || s.w, n = 48, out = [], i, a;
    if (s.t === 'circle' || s.t === 'oval') { for (i = 0; i < n; i++) { a = 2 * Math.PI * i / n; out.push([w / 2 * Math.cos(a), h / 2 * Math.sin(a)]); } return out; }
    if (s.t === 'egg') { for (i = 0; i < n; i++) { a = 2 * Math.PI * i / n; var yy = Math.sin(a); out.push([w / 2 * Math.cos(a) * (1 - 0.18 * yy), h / 2 * yy]); } return out; }
    if (s.t === 'heart') { for (i = 0; i < n; i++) { a = 2 * Math.PI * i / n; var x = 16 * Math.pow(Math.sin(a), 3), y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); out.push([x / 34 * w, (y + 2.5) / 32 * h]); } return out; }
    if (s.t === 'semi') { for (i = 0; i <= 24; i++) { a = Math.PI + Math.PI * i / 24; out.push([w / 2 * Math.cos(a), h / 2 * Math.sin(a) + h / 4]); } return out; }
    if (s.t === 'cring') { for (i = 0; i <= 40; i++) { a = (40 + 280 * i / 40) * D2R; out.push([w / 2 * Math.cos(a), w / 2 * Math.sin(a)]); } return out; }
    return null;
  }
  /* build a piece: world points + its traits */
  function build(s, ox, oy, sc) {
    ox = ox || 0; oy = oy || 0; sc = sc || 1;
    var c = [s.x, s.y], pts = local(s), curve = false;
    if (!pts) { pts = curveLocal(s); curve = true; }
    pts = pts.map(function (p) { return rot([s.x + p[0], s.y + p[1]], c, s.a || 0); }).map(function (p) { return [ox + p[0] * sc, oy + p[1] * sc]; });
    return { id: s.id, t: s.t, pts: pts, curve: curve, open: !!s.open || s.t === 'cring', curvedSide: s.curved != null ? s.curved : null, rounded: !!s.rounded, cx: ox + s.x * sc, cy: oy + s.y * sc, inset: s.inset || null, spec: s };
  }

  /* ---------------- what a piece IS (from geometry only) ---------------- */
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function sides(p) { var o = []; for (var i = 0; i < p.length; i++) o.push(dist(p[i], p[(i + 1) % p.length])); return o; }
  function angles(p) { var o = []; for (var i = 0; i < p.length; i++) { var a = p[(i + p.length - 1) % p.length], b = p[i], c = p[(i + 1) % p.length]; var v1 = [a[0] - b[0], a[1] - b[1]], v2 = [c[0] - b[0], c[1] - b[1]]; o.push(Math.acos(Math.max(-1, Math.min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]))))) / D2R); } return o; }
  function near(a, b, tol) { return Math.abs(a - b) <= tol; }
  function centroid(p) { var x = 0, y = 0; p.forEach(function (q) { x += q[0]; y += q[1]; }); return [x / p.length, y / p.length]; }
  /* the trace the brush leaves: corners, equal-side groups, closed, curved */
  function traceOf(pc) {
    if (pc.curve) {
      var c = centroid(pc.pts), r = pc.pts.map(function (q) { return dist(q, c); }), mn = Math.min.apply(null, r), mx = Math.max.apply(null, r);
      var corners = pc.t === 'semi' ? 2 : pc.t === 'heart' ? 1 : 0;
      return { corners: corners, closed: !pc.open, curved: true, constRadius: mx - mn < 0.02 * mx, sides: [], groups: [] };
    }
    var p = pc.pts, sd = sides(p), an = angles(p), groups = [], used = [];
    for (var i = 0; i < sd.length; i++) { if (used[i]) continue; var g = [i]; for (var j = i + 1; j < sd.length; j++) if (!used[j] && near(sd[i], sd[j], sd[i] * 0.02)) { g.push(j); used[j] = 1; } if (g.length > 1) groups.push(g); }
    return { corners: pc.rounded ? 0 : p.length, closed: !pc.open, curved: pc.curvedSide != null, rounded: pc.rounded, sides: sd, angles: an, groups: groups, constRadius: false };
  }
  /* the kind the geometry makes, or null (not one of the ten) */
  function kindOf(pc) {
    var tr = traceOf(pc);
    if (!tr.closed) return null;
    if (pc.curve) {
      if (pc.t === 'heart') return 'heart';
      if (tr.corners > 0) return null;
      var c = centroid(pc.pts), r = pc.pts.map(function (q) { return dist(q, c); }), mn = Math.min.apply(null, r), mx = Math.max.apply(null, r);
      if (mx - mn < 0.02 * mx) return 'circle';
      /* an oval: symmetric about both axes (an egg is not) */
      var sym = pc.pts.every(function (q) { var m = [2 * c[0] - q[0], 2 * c[1] - q[1]]; return pc.pts.some(function (z) { return dist(z, m) < mx * 0.03; }); });
      return sym ? 'oval' : null;
    }
    if (tr.curved || tr.rounded) return null;
    var n = pc.pts.length, sd = tr.sides, an = tr.angles;
    var allEq = sd.every(function (x) { return near(x, sd[0], sd[0] * 0.02); }), right = an.every(function (x) { return near(x, 90, 1.5); });
    if (n === 3) return 'triangle';
    if (n === 4) { if (allEq && right) return 'square'; if (right) return 'rectangle'; if (allEq) return 'diamond'; return null; }
    if (n === 5) return 'pentagon';
    if (n === 6) return 'hexagon';
    if (n === 10) { var c2 = centroid(pc.pts), rr = pc.pts.map(function (q) { return dist(q, c2); }); var alt = rr.every(function (x, i) { return i % 2 ? x < rr[0] * 0.7 : x > rr[1] * 1.4; }); if (alt) return 'star'; }
    return null;
  }
  /* a tin takes a piece when the piece IS the tin's shape; a square is a
     rectangle too (rounds with a rectangle tin never hold a square) */
  function accepts(tinKind, pc) { var k = kindOf(pc); return k === tinKind || (tinKind === 'rectangle' && k === 'square'); }

  /* ---------------- the boards ---------------- */
  /* piece spec: { t, x, y, w, h, a (deg), …, inset: parent id } — coordinates
     on a 440 × 400 board (pictures), 440 × 340 (count), 110 × 150 cells (quilt) */
  function P(t, x, y, w, h, a, more) { var s = { t: t, x: x, y: y, w: w, h: h, a: a || 0 }; for (var k in more || {}) s[k] = more[k]; return s; }
  var PICTURES = [
    { id: 'house', show: 'puff', tins: ['triangle', 'square'], flip: false, pieces: [
      P('tri', 190, 123, 200), P('tri', 60, 60, 80, 0, 160), P('square', 318, 60, 88), P('rect', 190, 256, 240, 140),
      P('square', 115, 226, 70, 0, 0, { inset: 3 }), P('rect', 190, 266, 68, 110, 0, { inset: 3 }), P('square', 265, 226, 70, 0, 0, { inset: 3 }),
      P('square', 370, 340, 74, 0, 45), P('circle', 388, 240, 84)] },
    { id: 'rocket', show: 'lift', tins: ['triangle', 'circle'], flip: true, pieces: [
      P('rect', 220, 212, 110, 212), P('tri', 220, 71, 110), P('tri', 110, 292, 84, 0, 80), P('tri', 330, 292, 84, 0, 280), P('tri', 220, 346, 80, 0, 180),
      P('circle', 220, 160, 80, 0, 0, { inset: 0 }), P('circle', 220, 254, 70, 0, 0, { inset: 0 }), P('star', 370, 80, 88)] },
    { id: 'fish', show: 'wiggle', tins: ['oval', 'triangle'], flip: false, pieces: [
      P('oval', 190, 200, 220, 130), P('circle', 128, 196, 70, 0, 0, { inset: 0 }), P('tri', 352, 200, 110, 0, 90), P('tri', 190, 90, 80, 0, 20), P('tri', 205, 312, 80, 0, 200),
      P('oval', 372, 70, 76, 100, 30), P('oval', 70, 328, 72, 92, 120), P('rect', 52, 110, 68, 110)] },
    { id: 'sailboat', show: 'bob', tins: ['triangle', 'rectangle'], flip: true, pieces: [
      P('rect', 200, 150, 70, 220), P('tri-right', 315, 155, 150, 200), P('tri-right', 110, 182, 100, 145, 0, { flip: true }), P('tri', 120, 50, 80, 0, 270),
      P('trap', 210, 330, 260, 100, 0, { top: 360 }), P('rect', 240, 332, 136, 68, 0, { inset: 4 }), P('hex', 388, 70, 90)] },
    { id: 'beehive', show: 'flutter', tins: ['hexagon', 'oval'], flip: false, pieces: [
      P('hex', 92, 104, 100), P('hex', 196, 168, 100, 0, 30), P('hex', 92, 238, 84), P('hex', 290, 92, 84, 0, 15), P('hex', 196, 300, 116, 0, 30),
      P('oval', 356, 302, 124, 80, 20), P('oval', 312, 204, 70, 88, -30), P('oval', 395, 206, 70, 88, 30), P('pent', 60, 352, 86), P('circle', 392, 42, 70)] },
    { id: 'train', show: 'chug', tins: ['square', 'circle'], flip: true, pieces: [
      P('rect', 180, 250, 220, 120), P('square', 355, 190, 120), P('square', 355, 172, 68, 0, 0, { inset: 1 }), P('square', 180, 250, 70, 0, 45, { inset: 0 }),
      P('circle', 100, 353, 80), P('circle', 200, 353, 80), P('circle', 300, 352, 70), P('circle', 385, 352, 70),
      P('rect', 110, 124, 70, 120), P('oval', 200, 80, 90, 70), P('oval', 300, 42, 90, 70)] },
    { id: 'robot', show: 'tilt', tins: ['square', 'heart'], flip: false, pieces: [
      P('square', 220, 72, 120), P('circle', 115, 72, 70), P('circle', 325, 72, 70), P('rect', 220, 215, 220, 130), P('heart', 186, 215, 100, 90, 0, { inset: 3 }),
      P('square', 285, 215, 68, 0, 0, { inset: 3 }), P('square', 160, 340, 68, 0, 45), P('rect', 280, 335, 68, 100), P('heart', 380, 328, 86, 78, 200)] },
    { id: 'lighthouse', show: 'beam', tins: ['star', 'diamond'], flip: true, pieces: [
      P('trap', 220, 250, 160, 260, 0, { top: 100 }), P('rhombus', 220, 262, 80, 0, 90, { ang: 60, inset: 0 }), P('rhombus', 72, 220, 84, 0, 30, { ang: 60 }), P('rhombus', 382, 276, 96, 0, 90, { ang: 60 }),
      P('star', 60, 60, 80), P('star', 164, 46, 80, 0, 20), P('star', 290, 60, 96, 0, 36), P('star', 380, 150, 80, 0, 180), P('circle', 393, 50, 80), P('kite', 60, 335, 78, 110)] },
    { id: 'garden', show: 'sway', tins: ['pentagon', 'circle'], flip: false, pieces: [
      P('pent', 90, 110, 112), P('pent', 220, 92, 126, 0, 36), P('pent', 350, 122, 116, 0, 18),
      P('circle', 90, 114, 70, 0, 0, { inset: 0 }), P('circle', 220, 97, 70, 0, 0, { inset: 1 }), P('circle', 350, 126, 70, 0, 0, { inset: 2 }), P('circle', 360, 346, 80),
      P('rect', 90, 222, 68, 104), P('rect', 220, 213, 68, 100), P('rect', 350, 232, 68, 96), P('oval', 165, 318, 90, 70), P('oval', 270, 322, 90, 70), P('hex', 60, 352, 90)] }
  ];
  /* quilts: one tin; eight patches (4 × 2), the piece centred in its patch */
  function Q(t, w, h, a, more) { return P(t, 55, 75, w, h, a, more); }
  var QUILTS = [
    { id: 'q-tri-1', tin: 'triangle', patches: [Q('tri', 80, 0, 0), Q('tri-iso', 46, 96, 50), Q('tri-right', 68, 80, 200), Q('tri', 44, 0, 0),
      Q('tri', 80, 0, 0, { open: true }), Q('tri', 80, 0, 0, { curved: 2 }), Q('tri', 80, 0, 0, { rounded: true }), Q('kite', 70, 100, 0)] },
    { id: 'q-rect-1', tin: 'rectangle', patches: [Q('rect', 36, 108, 30), Q('rect', 90, 46, 0), Q('rect', 70, 46, 70), Q('para', 70, 52, 0, { k: 0.4 }),
      Q('trap', 90, 56, 0, { top: 48 }), Q('rect', 84, 56, 0, { open: true }), Q('rect', 84, 56, 0, { rounded: true }), Q('rect', 84, 56, 0, { curved: 0 })] },
    { id: 'q-sq-1', tin: 'square', patches: [Q('square', 70, 0, 0), Q('square', 66, 0, 45), Q('square', 46, 0, 20), Q('rhombus', 52, 0, 0, { ang: 60 }),
      Q('rect', 80, 60, 0), Q('square', 70, 0, 0, { open: true }), Q('square', 70, 0, 0, { curved: 1 }), Q('kite', 76, 96, 0)] },
    { id: 'q-circle-1', tin: 'circle', patches: [Q('circle', 90), Q('circle', 46), Q('oval', 90, 58, 0), Q('cring', 80),
      Q('square', 72, 0, 0, { rounded: true }), Q('hex', 86), Q('egg', 70, 92, 0), Q('semi', 90, 90, 0)] },
    { id: 'q-hex-1', tin: 'hexagon', patches: [Q('hex', 90), Q('hex', 84, 0, 30), Q('hex-irr', 90, 80, 0), Q('pent', 90),
      Q('hept', 90), Q('hex', 90, 0, 0, { open: true }), Q('star', 90), Q('oct', 90)] },
    { id: 'q-tri-2', tin: 'triangle', patches: [Q('tri', 84, 0, 180), Q('tri-right', 56, 74, 120), Q('tri', 92, 0, 70), Q('tri', 52, 0, 300),
      Q('tri', 84, 0, 0, { open: true, gaps: 2 }), Q('tri', 84, 0, 0, { curved: 1 }), Q('tri', 84, 0, 0, { rounded: true }), Q('cutcorner', 80, 80, 0)] },
    { id: 'q-rect-2', tin: 'rectangle', patches: [Q('rect', 34, 96, 90), Q('rect', 84, 56, 15), Q('rect', 74, 42, 55), Q('para', 60, 40, 20, { k: 0.45 }),
      Q('rect', 84, 56, 0, { open: true }), Q('rect', 84, 56, 0, { rounded: true }), Q('rect', 84, 56, 0, { curved: 2 }), Q('trap', 92, 56, 0, { top: 50 })] },
    { id: 'q-sq-2', tin: 'square', patches: [Q('square', 66, 0, 30), Q('square', 44, 0, 0), Q('square', 62, 0, 60), Q('square', 40, 0, 45),
      Q('rhombus', 54, 0, 0, { ang: 70 }), Q('rect', 80, 66, 0), Q('square', 70, 0, 0, { open: true }), Q('square', 70, 0, 0, { rounded: true })] }
  ];
  /* where each quilt's patches go (a fixed shuffle per quilt so real ones
     are spread, never all on one row) */
  var QUILT_ORDER = [[0, 4, 1, 5, 6, 2, 7, 3], [3, 0, 4, 1, 5, 6, 2, 7], [0, 3, 4, 1, 5, 2, 6, 7], [4, 0, 5, 3, 1, 6, 7, 2],
                     [3, 0, 4, 5, 1, 6, 2, 7], [0, 4, 1, 5, 6, 2, 7, 3], [4, 0, 5, 3, 1, 6, 2, 7], [0, 4, 5, 1, 6, 2, 7, 3]];
  var COUNTS = [
    { id: 'cat', tri: 4, sq: 2, pieces: [P('square', 110, 170, 100, 0, 10), P('square', 230, 200, 120), P('tri', 70, 72, 80), P('tri', 156, 72, 80), P('tri', 185, 286.5, 80, 0, 180), P('tri', 275, 286.5, 80, 0, 180), P('para', 362, 180, 96, 76, 0, { k: 0.35 })] },
    { id: 'tree', tri: 6, sq: 1, pieces: [P('tri', 220, 56, 84), P('tri', 175, 135, 84), P('tri', 265, 135, 84), P('tri', 130, 218, 84), P('tri', 220, 218, 84), P('tri', 310, 218, 84), P('rect', 220, 292, 70, 80), P('square', 380, 288, 70, 0, 20)] },
    { id: 'castle', tri: 3, sq: 3, pieces: [P('square', 92, 200, 86), P('square', 220, 195, 100), P('square', 348, 200, 86), P('tri', 92, 125, 90), P('tri', 220, 111, 100), P('tri', 348, 125, 90), P('rect', 220, 292, 70, 76)] },
    { id: 'bird', tri: 5, sq: 2, pieces: [P('square', 200, 190, 110, 0, 45), P('square', 317, 120, 80), P('tri', 386, 120, 80, 0, 90), P('tri', 80, 148, 80, 0, 270), P('tri', 80, 240, 80, 0, 270), P('tri', 150, 286, 80, 0, 180), P('tri', 250, 286, 80, 0, 180), P('para', 352, 268, 100, 72, 0, { k: 0.3 })] },
    { id: 'firs', tri: 7, sq: 1, pieces: [P('tri', 70, 100, 84), P('tri', 70, 185, 84), P('tri', 180, 66, 84), P('tri', 180, 151, 84), P('tri', 180, 236, 84), P('tri', 300, 110, 84), P('tri', 300, 195, 84), P('square', 390, 220, 80), P('rect', 220, 299, 420, 68)] },
    { id: 'windmill', tri: 2, sq: 4, pieces: [P('tri', 220, 130, 100), P('square', 132, 110, 72, 0, 45), P('square', 308, 110, 72, 0, 45), P('rect', 220, 248, 90, 170), P('square', 220, 210, 70, 0, 0, { inset: 3 }), P('square', 220, 288, 70, 0, 0, { inset: 3 }), P('tri', 385, 43, 80, 0, 160)] },
    { id: 'boat', tri: 6, sq: 3, pieces: [P('trap', 220, 288, 280, 90, 0, { top: 400 }), P('tri', 100, 190, 90), P('tri', 220, 190, 90), P('tri', 340, 190, 90), P('tri', 160, 105, 90), P('tri', 280, 105, 90), P('tri', 386, 92, 80, 0, 90),
      P('square', 130, 288, 70, 0, 0, { inset: 0 }), P('square', 220, 288, 70, 0, 0, { inset: 0 }), P('square', 310, 288, 70, 0, 0, { inset: 0 })] }
  ];
  /* the rounds of a board */
  function rounds(board) {
    if (board === 'quilt') return QUILTS.map(function (q, i) { return { id: q.id, board: 'quilt', tins: [q.tin], colours: [PAINT[i % 4]], specs: q.patches, order: QUILT_ORDER[i] }; });
    if (board === 'count') return COUNTS.map(function (q, i) { return { id: q.id, board: 'count', tins: i % 2 ? ['square', 'triangle'] : ['triangle', 'square'], colours: [PAINT[(i + 1) % 4], PAINT[(i + 3) % 4]], specs: q.pieces, want: { triangle: q.tri, square: q.sq } }; });
    return PICTURES.map(function (q, i) { var t = q.flip ? [q.tins[1], q.tins[0]] : q.tins.slice(); return { id: q.id, board: 'picture', show: q.show, tins: t, colours: [PAINT[i % 4], PAINT[(i + 2) % 4]], specs: q.pieces }; });
  }
  function board(b) { return b === 'quilt' || b === 'count' ? b : 'picture'; }
  function labelMode(m) { return m === 'name' || m === 'clue' ? m : 'shape'; }
  var BOARD = { picture: { W: 440, H: 400 }, count: { W: 440, H: 340 }, quilt: { W: 440, H: 300 } };
  /* the pieces of a round, on its board's coordinates */
  function piecesOf(r) {
    if (r.board === 'quilt') return r.order.map(function (pi, cell) { var s = Object.assign({}, r.specs[pi], { id: 'p' + pi }); return build(s, (cell % 4) * 110, Math.floor(cell / 4) * 150, 1); }).sort(function (a, b) { return +a.id.slice(1) - +b.id.slice(1); }).map(function (pc) { return pc; });
    return r.specs.map(function (s, i) { return build(Object.assign({}, s, { id: 'p' + i, inset: s.inset != null ? 'p' + s.inset : null }), 0, 0, 1); });
  }
  /* the quilt patch (cell) each piece sits in */
  function cellOf(r, pid) { return r.order.indexOf(+pid.slice(1)); }
  function targets(r) { var ps = piecesOf(r), out = {}; r.tins.forEach(function (t) { out[t] = ps.filter(function (pc) { return accepts(t, pc); }).map(function (pc) { return pc.id; }); }); return out; }

  /* ---------------- the state ---------------- */
  function newState(r) { return { r: r, tin: null, painted: {}, set: {}, count: {}, misses: 0, help: 0, wrongTwice: {}, done: false, last: null, phase: 'paint' }; }
  function pickTin(st, i) { if (st.done || i < 0 || i >= st.r.tins.length) return false; st.tin = i; return true; }
  /* paint a piece (wet — nothing is judged at the tap); a painted piece is lifted back */
  function paint(st, pid) {
    if (st.done || st.set[pid] != null) return false;
    if (st.painted[pid] != null) { delete st.painted[pid]; st.help = 0; st.last = null; return 'lift'; }
    if (st.tin == null) return false;
    st.painted[pid] = st.tin; st.help = 0; st.last = null;
    return 'paint';
  }
  function setCount(st, kind, d) {
    if (st.done || st.r.board !== 'count') return false;
    var v = (st.count[kind] || 0) + d; if (v < 1 || v > 9) return false;
    st.count[kind] = v; st.help = 0; st.last = null; return true;
  }
  /* Check: the paint sets. Right pieces stay set (and stay set after a miss);
     wrong and open pieces shed their paint. */
  function check(st) {
    if (st.done) return st.last;
    var r = st.r, ps = piecesOf(r), T = targets(r), byId = {}; ps.forEach(function (pc) { byId[pc.id] = pc; });
    var wet = Object.keys(st.painted);
    if (!wet.length && !Object.keys(st.set).length) { st.last = { result: 'empty', why: 'start' }; return st.last; }
    var shed = [], leak = [], shedTinOf = {};
    wet.forEach(function (pid) { shedTinOf[pid] = st.painted[pid]; var tin = r.tins[st.painted[pid]]; if (accepts(tin, byId[pid])) st.set[pid] = st.painted[pid]; else { shed.push(pid); if (!traceOf(byId[pid]).closed) leak.push(pid); } });
    st.painted = {};
    var missing = []; r.tins.forEach(function (t, i) { T[t].forEach(function (pid) { if (st.set[pid] !== i) missing.push(pid); }); });
    if (shed.length || missing.length) {
      shed.forEach(function (pid) { st.wrongTwice[pid] = (st.wrongTwice[pid] || 0) + 1; });
      st.misses++; st.help = Math.min(2, st.help + 1);
      st.last = { result: 'wrong', shed: shed, leak: leak, shedTin: shed.length ? r.tins[shedTinOf[shed[0]]] : null, shedPiece: shed.length ? byId[shed[0]] : null, missing: missing, missingTin: missing.length ? r.tins.findIndex(function (t) { return T[t].indexOf(missing[0]) >= 0; }) : null };
      return st.last;
    }
    if (r.board === 'count') {
      if (st.count.triangle == null || st.count.square == null) { st.last = { result: 'empty', why: 'count' }; return st.last; }
      var bad = ['triangle', 'square'].filter(function (k) { return st.count[k] !== r.want[k]; });
      if (bad.length) { st.misses++; st.help = Math.min(2, st.help + 1); st.last = { result: 'wrong', count: bad[0] }; return st.last; }
    }
    st.done = true; st.last = { result: 'ok' }; return st.last;
  }
  function hint(st) {
    var l = st.last; if (!l) return null;
    if (l.result === 'empty') return l.why === 'count' ? 'hintCount' : 'hintStart';
    if (l.result !== 'wrong') return null;
    if (l.count) return st.help >= 2 ? 'hintCountNum' : 'hintCountOne';
    if (st.help >= 2) return 'hintGlow';
    if (l.leak.length) return 'hintLeak';
    if (l.shed.length) return whyNot(l.shedTin, l.shedPiece);
    return 'hintMore';
  }

  /* why a piece is not the tin's shape — the hint names the attribute that
     actually differs (a kite has as many corners as a diamond: counting
     corners would point the child the wrong way) */
  var CORNERS = { triangle: 3, square: 4, rectangle: 4, diamond: 4, pentagon: 5, hexagon: 6, star: 10 };
  function whyNot(tin, pc) {
    var roundTin = ['circle', 'oval', 'heart'].indexOf(tin) >= 0, roundPiece = !!(pc && pc.curve);
    if (roundTin && roundPiece) return 'hintWrongRound';     /* circle vs oval, egg, open ring */
    if (roundTin) return 'hintCornersRound';                 /* a piece with corners in a round tin */
    if (roundPiece) return 'hintCurve';                      /* a round piece in a tin with corners */
    var tr = traceOf(pc);
    if (tr.curved || tr.rounded) return 'hintBent';
    if (pc.pts.length !== CORNERS[tin]) return 'hintWrong';
    var sd = tr.sides, an = tr.angles, eq = sd.every(function (x) { return near(x, sd[0], sd[0] * 0.02); }), right = an.every(function (x) { return near(x, 90, 1.5); });
    if ((tin === 'square' || tin === 'diamond') && !eq) return 'hintSides';
    if ((tin === 'square' || tin === 'rectangle') && !right) return 'hintRight';
    return 'hintWrong';
  }

  /* ---------------- order: order-only reshuffle ---------------- */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 60; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      for (var j = n - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; }
      if (prev && n > 1 && o.join() === prev.join()) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  /* wide: the board beside a 168 px tin column; narrow: the tins in a row
     above the board, which is scaled to the stage width */
  function layout(b, W) {
    var B = BOARD[b], side = 168, gap = 14;
    if (W >= B.W + side + gap) return { mode: 'wide', W: W, scale: Math.min(1.25, (W - side - gap) / B.W), side: side, gap: gap, tinW: 120, tinH: 120 };
    var sc = Math.min(1, Math.min(W, 460) / B.W);
    return { mode: 'narrow', W: W, scale: sc, side: 0, gap: 0, tinW: W < 340 ? 100 : 112, tinH: W < 340 ? 80 : 92, tight: W < 340 };
  }
  /* smallest width of a piece (rotating calipers, 1° steps) */
  function minWidth(pc) {
    var best = Infinity;
    for (var d = 0; d < 180; d++) { var a = d * D2R, ux = Math.cos(a), uy = Math.sin(a), mn = Infinity, mx = -Infinity; pc.pts.forEach(function (p) { var v = p[0] * ux + p[1] * uy; mn = Math.min(mn, v); mx = Math.max(mx, v); }); best = Math.min(best, mx - mn); }
    return best;
  }

  return {
    KINDS: KINDS, PAINT: PAINT, BOARD: BOARD, PICTURES: PICTURES, QUILTS: QUILTS, COUNTS: COUNTS,
    build: build, traceOf: traceOf, kindOf: kindOf, accepts: accepts, sides: sides, angles: angles, centroid: centroid, minWidth: minWidth,
    rounds: rounds, board: board, labelMode: labelMode, piecesOf: piecesOf, cellOf: cellOf, targets: targets,
    newState: newState, pickTin: pickTin, paint: paint, setCount: setCount, check: check, hint: hint, whyNot: whyNot, order: order, layout: layout
  };
}));

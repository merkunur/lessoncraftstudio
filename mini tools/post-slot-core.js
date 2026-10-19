/* =====================================================================
   post-slot-core.js — the model of ACTIVITY #39 of the one-by-one
   rebuild: "Flat or Solid?" → THE LETTERBOX (K.G.A.3; G2 faces).
   Design sheet: docs/activities-rebuild/designs/039-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: only something flat fits through the letterbox slot.
   Turned on its edge, a flat shape is a line and slides through; a solid
   turned any way still has thickness and jams. In the counting tasks a
   solid jams at the slot, opens out into its flat net, and may only be
   posted once every face carries a postage stamp — a solid made flat.

   Whether a shape is flat comes from this file's own table; how many
   faces a solid has comes from its own vertex/face model (prisms and
   pyramids built from a base polygon; Euler V − E + F = 2 is gated). The
   cylinder's two flat circles are its faces (the worksheets' convention);
   its curved side unrolls into a sheet that takes no stamp.
   No DOM. UMD: window.PostSlotCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PostSlotCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------- what is flat ---------------- */
  var FLAT = { circle: 1, square: 1, triangle: 1, rectangle: 1, hexagon: 1, oval: 1, star: 1 };
  var SOLID = { sphere: 1, cube: 1, box: 1, cylinder: 1, cone: 1, sqpyr: 1, tripyr: 1, triprism: 1, hexprism: 1 };
  function isFlat(kind) { return !!FLAT[kind]; }
  function isSolid(kind) { return !!SOLID[kind]; }

  /* ---------------- solids as polyhedra ---------------- */
  function v3sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function v3dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function newell(V, f) { var n = [0, 0, 0]; for (var i = 0; i < f.length; i++) { var a = V[f[i]], b = V[f[(i + 1) % f.length]]; n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1]); } return n; }
  function centre(V, idx) { var c = [0, 0, 0]; idx.forEach(function (i) { c[0] += V[i][0]; c[1] += V[i][1]; c[2] += V[i][2]; }); return [c[0] / idx.length, c[1] / idx.length, c[2] / idx.length]; }
  /* faces wound outward: the normal must point away from the solid's centre */
  function orient(V, F) {
    var all = V.map(function (_, i) { return i; }), C = centre(V, all);
    return F.map(function (f) { var n = newell(V, f); return v3dot(n, v3sub(centre(V, f), C)) < 0 ? f.slice().reverse() : f; });
  }
  /* a prism over a base polygon in the x-z plane, height h along y */
  function prism(base, h) {
    var n = base.length, V = [], F = [], i;
    for (i = 0; i < n; i++) V.push([base[i][0], -h / 2, base[i][1]]);
    for (i = 0; i < n; i++) V.push([base[i][0], h / 2, base[i][1]]);
    F.push(base.map(function (_, k) { return k; })); F.push(base.map(function (_, k) { return n + k; }));
    for (i = 0; i < n; i++) F.push([i, (i + 1) % n, n + (i + 1) % n, n + i]);
    return { V: V, F: orient(V, F) };
  }
  function pyramid(base, h) {
    var n = base.length, V = [], F = [], i;
    for (i = 0; i < n; i++) V.push([base[i][0], -h / 2, base[i][1]]);
    V.push([0, h / 2, 0]);
    F.push(base.map(function (_, k) { return k; }));
    for (i = 0; i < n; i++) F.push([i, (i + 1) % n, n]);
    return { V: V, F: orient(V, F) };
  }
  function ngon(n, r, rot) { var p = []; for (var i = 0; i < n; i++) { var a = (rot || 0) + i * 2 * Math.PI / n; p.push([r * Math.cos(a), r * Math.sin(a)]); } return p; }
  var POLY = {
    cube: function () { return prism([[-1, -1], [1, -1], [1, 1], [-1, 1]], 2); },
    box: function () { return prism([[-1.5, -0.7], [1.5, -0.7], [1.5, 0.7], [-1.5, 0.7]], 1.6); },
    sqpyr: function () { return pyramid([[-1.1, -1.1], [1.1, -1.1], [1.1, 1.1], [-1.1, 1.1]], 2); },
    tripyr: function () { return pyramid(ngon(3, 1.3, Math.PI / 2), 1.9); },
    triprism: function () { return prism(ngon(3, 1.15, Math.PI / 2), 2.4); },
    hexprism: function () { return prism(ngon(6, 1.05, 0), 1.05); }
  };
  function poly(kind) { return POLY[kind] ? POLY[kind]() : null; }
  function edgesOf(P) { var seen = {}, E = []; P.F.forEach(function (f, fi) { for (var i = 0; i < f.length; i++) { var a = f[i], b = f[(i + 1) % f.length], k = Math.min(a, b) + '-' + Math.max(a, b); if (!seen[k]) { seen[k] = { a: Math.min(a, b), b: Math.max(a, b), faces: [] }; E.push(seen[k]); } seen[k].faces.push(fi); } }); return E; }
  /* how many FLAT faces — never 0 in a counting round (no sphere, no cone) */
  function facesOf(kind) { if (kind === 'cylinder') return 2; var P = poly(kind); return P ? P.F.length : 0; }

  /* the view: turn about the upright axis (yaw), then tip toward the child (pitch). Screen y points down. */
  function rot(v, pose) {
    var y = (pose.yaw || 0) * Math.PI / 180, p = (pose.pitch || 0) * Math.PI / 180;
    var x1 = v[0] * Math.cos(y) + v[2] * Math.sin(y), z1 = -v[0] * Math.sin(y) + v[2] * Math.cos(y), y1 = v[1];
    var y2 = y1 * Math.cos(p) - z1 * Math.sin(p), z2 = y1 * Math.sin(p) + z1 * Math.cos(p);
    return [x1, y2, z2];
  }
  /* faces turned toward the child are visible; the rest are hidden (drawn dashed) */
  function view(kind, pose) {
    var P = poly(kind); if (!P) return null;
    var R = P.V.map(function (v) { return rot(v, pose); });
    var faces = P.F.map(function (f) { var n = newell(R, f), len = Math.hypot(n[0], n[1], n[2]) || 1; return { idx: f, pts: f.map(function (i) { return [R[i][0], -R[i][1]]; }), vis: n[2] > 1e-6, light: n[1] / len, depth: centre(R, f)[2] }; });
    var E = edgesOf(P).map(function (e) { return { a: [R[e.a][0], -R[e.a][1]], b: [R[e.b][0], -R[e.b][1]], vis: e.faces.some(function (fi) { return faces[fi].vis; }) }; });
    return { faces: faces, edges: E };
  }
  function hiddenAt(kind, pose) {
    if (kind === 'cylinder') return (pose.pitch || 0) > 0 ? 1 : 0;
    var v = view(kind, pose); return v ? v.faces.filter(function (f) { return !f.vis; }).length : 0;
  }
  /* the slot test: a flat shape has no thickness; a solid keeps some at every pose */
  function thicknessEdgeOn(kind) {
    if (isFlat(kind)) return 0;
    if (kind === 'sphere' || kind === 'cone' || kind === 'cylinder') return 1;
    var P = poly(kind); if (!P) return 0;
    var best = Infinity;
    /* the thinnest a polyhedron can look is its smallest width over many directions */
    for (var a = 0; a < 180; a += 6) for (var b = -90; b <= 90; b += 6) {
      var d = [Math.cos(b * Math.PI / 180) * Math.cos(a * Math.PI / 180), Math.sin(b * Math.PI / 180), Math.cos(b * Math.PI / 180) * Math.sin(a * Math.PI / 180)];
      var lo = Infinity, hi = -Infinity; P.V.forEach(function (v) { var t = v3dot(v, d); if (t < lo) lo = t; if (t > hi) hi = t; });
      if (hi - lo < best) best = hi - lo;
    }
    return best;
  }

  /* ---------------- nets (faces with hinges; unit coordinates) ---------------- */
  function rect(x, y, w, h) { return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; }
  function circlePts(cx, cy, r) { var p = []; for (var i = 0; i < 36; i++) { var a = i * Math.PI / 18; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }
  function face(pts, parent, hinge, extra) { var f = { pts: pts, parent: parent, hinge: hinge || null }; if (extra) for (var k in extra) f[k] = extra[k]; return f; }
  function netOf(kind) {
    var F = [], H;
    if (kind === 'cube') {
      F = [face(rect(1, 1, 1, 1), -1), face(rect(1, 0, 1, 1), 0, [[1, 1], [2, 1]]), face(rect(0, 1, 1, 1), 0, [[1, 1], [1, 2]]), face(rect(2, 1, 1, 1), 0, [[2, 1], [2, 2]]), face(rect(1, 2, 1, 1), 0, [[1, 2], [2, 2]]), face(rect(1, 3, 1, 1), 4, [[1, 3], [2, 3]])];
    } else if (kind === 'box') {
      var w = 1.875, h = 1, d = 0.875; /* the box's own proportions 3 : 1.6 : 1.4 */
      F = [face(rect(d, d, w, h), -1), face(rect(d, 0, w, d), 0, [[d, d], [d + w, d]]), face(rect(0, d, d, h), 0, [[d, d], [d, d + h]]), face(rect(d + w, d, d, h), 0, [[d + w, d], [d + w, d + h]]), face(rect(d, d + h, w, d), 0, [[d, d + h], [d + w, d + h]]), face(rect(d, 2 * d + h, w, h), 4, [[d, 2 * d + h], [d + w, 2 * d + h]])];
    } else if (kind === 'sqpyr') {
      var s = 0.95;
      F = [face(rect(s, s, 1, 1), -1), face([[s, s], [s + 1, s], [s + 0.5, 0]], 0, [[s, s], [s + 1, s]]), face([[s + 1, s], [s + 1, s + 1], [2 * s + 1, s + 0.5]], 0, [[s + 1, s], [s + 1, s + 1]]), face([[s + 1, s + 1], [s, s + 1], [s + 0.5, 2 * s + 1]], 0, [[s, s + 1], [s + 1, s + 1]]), face([[s, s + 1], [s, s], [0, s + 0.5]], 0, [[s, s], [s, s + 1]])];
    } else if (kind === 'tripyr') {
      H = Math.sqrt(3) / 2;
      F = [face([[1, 2 * H], [0.5, H], [1.5, H]], -1),
        face([[0.5, H], [1.5, H], [1, 0]], 0, [[0.5, H], [1.5, H]]), face([[0, 2 * H], [1, 2 * H], [0.5, H]], 0, [[0.5, H], [1, 2 * H]]), face([[1, 2 * H], [2, 2 * H], [1.5, H]], 0, [[1.5, H], [1, 2 * H]])];
    } else if (kind === 'triprism') {
      var L = 1.7; H = Math.sqrt(3) / 2;
      F = [face(rect(1, H, 1, L), -1), face(rect(0, H, 1, L), 0, [[1, H], [1, H + L]]), face(rect(2, H, 1, L), 0, [[2, H], [2, H + L]]), face([[1, H], [2, H], [1.5, 0]], 0, [[1, H], [2, H]]), face([[1, H + L], [2, H + L], [1.5, 2 * H + L]], 0, [[1, H + L], [2, H + L]])];
    } else if (kind === 'hexprism') {
      /* the compact net: the lid with a side face hinged on each of its six edges, the base hinged on the far end of one of them
         (a strip of six sides would leave each side under 44 px on a phone) */
      var hexAt = function (cx, cy) { var p = []; for (var q = 0; q < 6; q++) { var t = q * Math.PI / 3; p.push([cx + Math.cos(t), cy + Math.sin(t)]); } return p; };
      var lid = hexAt(0, 0), ap = Math.sqrt(3) / 2, Ls = 1;
      F = [face(lid, -1)];
      for (var e = 0; e < 6; e++) { var a = lid[e], b = lid[(e + 1) % 6], na = (30 + 60 * e) * Math.PI / 180, nx = Math.cos(na) * Ls, ny = Math.sin(na) * Ls; F.push(face([a, b, [b[0] + nx, b[1] + ny], [a[0] + nx, a[1] + ny]], 0, [a, b])); }
      var far = F[1].pts, nf = 30 * Math.PI / 180, dd = 2 * ap + Ls;
      F.push(face(hexAt(Math.cos(nf) * dd, Math.sin(nf) * dd), 1, [far[2], far[3]]));
    } else if (kind === 'cylinder') {
      var r = 0.5, C = 2 * Math.PI * r, Lc = 1.5;
      F = [face(rect(0, 2 * r, C, Lc), -1, null, { curved: true }), face(circlePts(C / 2, r, r), 0, [[C / 2, 2 * r], [C / 2, 2 * r]], { round: true }), face(circlePts(C / 2, 2 * r + Lc + r, r), 0, [[C / 2, 2 * r + Lc], [C / 2, 2 * r + Lc]], { round: true })];
    } else return null;
    var xs = [], ys = []; F.forEach(function (f) { f.pts.forEach(function (p) { xs.push(p[0]); ys.push(p[1]); }); });
    var x0 = Math.min.apply(null, xs), y0 = Math.min.apply(null, ys);
    F.forEach(function (f) { f.pts = f.pts.map(function (p) { return [p[0] - x0, p[1] - y0]; }); if (f.hinge) f.hinge = f.hinge.map(function (p) { return [p[0] - x0, p[1] - y0]; }); });
    return { faces: F, w: Math.max.apply(null, xs) - x0, h: Math.max.apply(null, ys) - y0 };
  }
  function flatFacesInNet(net) { return net.faces.filter(function (f) { return !f.curved; }).length; }

  /* ---------------- rounds ---------------- */
  function I(kind, a, s) { return { kind: kind, a: a || 0, s: s || 0.85 }; }
  var SORT = [
    { id: 'B1', items: [I('circle'), I('sphere'), I('square', 10), I('cube'), I('triangle'), I('cylinder')] },
    { id: 'B2', items: [I('rectangle'), I('box'), I('oval', 15), I('cone'), I('star'), I('sphere', 0, 0.7)] },
    { id: 'B3', items: [I('square', 45, 0.8), I('cube', 20), I('hexagon'), I('sqpyr'), I('circle', 0, 0.5)] },
    { id: 'B4', items: [I('triangle'), I('cone'), I('sqpyr', 0, 0.75), I('rectangle', 90, 0.8), I('cylinder', 90), I('box')] },
    { id: 'B5', items: [I('oval'), I('sphere', 0, 0.55), I('cube', 0, 0.7), I('star', 20, 0.75), I('hexagon', 30), I('cylinder')] },
    { id: 'B6', items: [I('circle', 0, 0.7), I('cylinder', 0, 0.8), I('cone', 180), I('square', 45), I('triangle', 180), I('box', 90, 0.8)] },
    { id: 'B7', items: [I('hexagon', 0, 0.7), I('rectangle', 0, 0.9), I('sphere', 0, 0.4), I('cube', 0, 1), I('triangle', 0, 0.45), I('sqpyr')] },
    { id: 'B8', items: [I('star'), I('cone', 0, 0.75), I('circle', 0, 1), I('box', 0, 0.75), I('square', 0, 0.4), I('sphere')] }
  ];
  /* the counting rounds: every pose leaves at least one face hidden (drawn dashed) */
  var FACES = [
    { id: 'F1', kind: 'cube', pose: { yaw: 32, pitch: 24 }, s: 0.85 },
    { id: 'F2', kind: 'sqpyr', pose: { yaw: 25, pitch: 18 }, s: 0.85 },
    { id: 'F3', kind: 'cylinder', pose: { yaw: 0, pitch: 22 }, s: 0.85 },
    { id: 'F4', kind: 'tripyr', pose: { yaw: 15, pitch: 20 }, s: 0.85 },
    { id: 'F5', kind: 'box', pose: { yaw: 28, pitch: 22 }, s: 0.85 },
    { id: 'F6', kind: 'hexprism', pose: { yaw: 10, pitch: 24 }, s: 0.85 },
    { id: 'F7', kind: 'triprism', pose: { yaw: 40, pitch: 20 }, s: 0.85 },
    { id: 'F8', kind: 'cube', pose: { yaw: 62, pitch: 30 }, s: 0.55 }
  ];
  /* everyday things: the library picture with the solid's see-through outline fitted to it.
     box outlines: the silhouette hexagon (top-left, top, top-right, bottom-right, bottom, bottom-left)
     measured on the picture; the front and hidden corners follow by parallelogram. */
  var OBJ = {
    dice: { dir: 'toys', solid: 'cube', hex: [[0.055, 0.24], [0.455, 0.025], [0.945, 0.185], [0.945, 0.745], [0.52, 0.98], [0.055, 0.805]] },
    present: { dir: 'christmas', solid: 'box', hex: [[0.05, 0.28], [0.45, 0.24], [0.945, 0.285], [0.92, 0.88], [0.505, 0.975], [0.075, 0.89]] },
    book: { dir: 'classroom', solid: 'box', hex: [[0.06, 0.44], [0.505, 0.265], [0.945, 0.415], [0.965, 0.565], [0.51, 0.765], [0.05, 0.58]] },
    eraser: { dir: 'classroom', solid: 'box', hex: [[0.27, 0.06], [0.36, 0.035], [0.685, 0.06], [0.685, 0.97], [0.6, 0.975], [0.27, 0.975]] },
    can: { dir: 'At the Supermarket', solid: 'cylinder', cyl: { cx: 0.485, top: 0.105, bot: 0.9, rx: 0.29, ry: 0.078 } },
    drum: { dir: 'music', solid: 'cylinder', cyl: { cx: 0.505, top: 0.205, bot: 0.84, rx: 0.455, ry: 0.11 } }
  };
  var THINGS = [
    { id: 'T1', object: 'dice' }, { id: 'T2', object: 'can' }, { id: 'T3', object: 'book' }, { id: 'T4', object: 'drum' },
    { id: 'T5', object: 'eraser' }, { id: 'T6', object: 'present' }, { id: 'T7', object: 'can', lying: true }
  ];
  /* the outline of a box from its silhouette: visible edges + the hidden corner's three dashed edges */
  function boxOutline(hex) {
    var h = hex, P = [h[0][0] + h[2][0] - h[1][0], h[0][1] + h[2][1] - h[1][1]], Q = [h[1][0] + h[4][0] - P[0], h[1][1] + h[4][1] - P[1]];
    var vis = [], hid = [];
    for (var i = 0; i < 6; i++) vis.push([h[i], h[(i + 1) % 6]]);
    vis.push([P, h[0]], [P, h[2]], [P, h[4]]);
    hid.push([Q, h[1]], [Q, h[3]], [Q, h[5]]);
    return { vis: vis, hid: hid, front: P, back: Q };
  }

  var TASKS = ['sort', 'faces', 'things'];
  function task(v) { return TASKS.indexOf(v) >= 0 ? v : 'sort'; }
  function rounds(t) {
    t = task(t);
    if (t === 'sort') return SORT.map(function (r) { return { id: r.id, task: 'sort', items: r.items.map(function (it, i) { return { id: 'p' + i, kind: it.kind, a: it.a, s: it.s, flat: isFlat(it.kind) }; }) }; });
    if (t === 'faces') return FACES.map(function (r) { return { id: r.id, task: 'faces', kind: r.kind, pose: { yaw: r.pose.yaw, pitch: r.pose.pitch }, s: r.s, answer: facesOf(r.kind) }; });
    return THINGS.map(function (r) { var o = OBJ[r.object]; return { id: r.id, task: 'things', object: r.object, lying: !!r.lying, kind: o.solid, answer: facesOf(o.solid) }; });
  }

  /* a seeded shuffle so a test run (no rnd) still never shows a strictly alternating bag */
  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function hashId(id) { var h = 7; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return h; }
  function alternates(flags) { if (flags.length < 4) return false; for (var i = 1; i < flags.length; i++) if (flags[i] === flags[i - 1]) return false; return true; }
  function bagOrder(r, rnd) {
    rnd = rnd || seeded(hashId(r.id));
    for (var t = 0; t < 80; t++) {
      var o = r.items.map(function (it) { return it.id; });
      for (var j = o.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; }
      if (!alternates(o.map(function (id) { return byId(r, id).flat; }))) return o;
    }
    return r.items.map(function (it) { return it.id; });
  }
  function byId(r, id) { for (var i = 0; i < r.items.length; i++) if (r.items[i].id === id) return r.items[i]; return null; }

  /* ---------------- state ---------------- */
  var TRAY_MAX = 6;
  function newState(r, rnd) {
    var st = { r: r, misses: 0, help: 0, show: false, done: false, last: null };
    if (r.task === 'sort') { st.bag = bagOrder(r, rnd); st.trays = { letter: [], parcel: [] }; st.posted = []; st.shelved = []; st.bounced = []; st.sel = null; }
    else { st.pose = r.pose ? { yaw: r.pose.yaw, pitch: r.pose.pitch } : null; st.unfolded = false; st.stamps = []; st.chip = null; st.net = netOf(r.kind); }
    return st;
  }
  function whereIs(st, id) {
    if (st.bag.indexOf(id) >= 0) return 'bag';
    if (st.trays.letter.indexOf(id) >= 0) return 'letter';
    if (st.trays.parcel.indexOf(id) >= 0) return 'parcel';
    if (st.posted.indexOf(id) >= 0) return 'posted';
    if (st.shelved.indexOf(id) >= 0) return 'shelved';
    return null;
  }
  /* sort: move a shape between the bag and the trays. Nothing turns edge-on, nothing is judged. */
  function move(st, id, dest) {
    if (st.r.task !== 'sort' || st.done) return false;
    var from = whereIs(st, id);
    if (!from || from === 'posted' || from === 'shelved' || from === dest) return false;
    if (dest !== 'bag' && dest !== 'letter' && dest !== 'parcel') return false;
    if (dest !== 'bag' && st.trays[dest].length >= TRAY_MAX) return false;
    var src = from === 'bag' ? st.bag : st.trays[from]; src.splice(src.indexOf(id), 1);
    (dest === 'bag' ? st.bag : st.trays[dest]).push(id);
    var b = st.bounced.indexOf(id); if (b >= 0) st.bounced.splice(b, 1);
    st.show = false; st.last = null;
    return true;
  }
  /* a shape may turn on its edge only as the slot's verdict — or in free play after success */
  function edgeOnAllowed(st) { return !!st.done; }

  /* faces: open the solid out flat; turn it; stamp a face; choose a number */
  function unfold(st) { if (st.r.task === 'sort' || st.unfolded) return false; st.unfolded = true; st.show = false; st.last = null; return true; }
  function fold(st) { if (st.r.task === 'sort' || !st.unfolded || !st.done) return false; st.unfolded = false; return true; }
  function turn(st) { if (st.r.task !== 'faces' || st.unfolded) return false; st.pose.yaw = (st.pose.yaw + 90) % 360; return true; }
  function stamp(st, fi) {
    if (st.r.task === 'sort' || !st.unfolded || st.done) return null;
    var f = st.net.faces[fi]; if (!f) return null;
    if (f.curved) return 'curl';
    var k = st.stamps.indexOf(fi);
    if (k >= 0) st.stamps.splice(k, 1); else st.stamps.push(fi);
    st.show = false; st.last = null;
    return k >= 0 ? 'off' : 'on';
  }
  function setChip(st, n) { if (st.r.task === 'sort' || st.done || n < 1 || n > 9) return false; st.chip = n; st.show = false; st.last = null; return true; }
  function netFitsSlot(st) { return st.net.faces.every(function (f, i) { return f.curved || st.stamps.indexOf(i) >= 0; }); }

  function check(st) {
    var r = st.r;
    if (st.done) return st.last;
    if (r.task === 'sort') {
      if (st.bag.length) { st.last = { result: 'empty', why: 'bag' }; return st.last; }
      var bounced = [];
      st.trays.letter.slice().forEach(function (id) { if (byId(r, id).flat) st.posted.push(id); else bounced.push(id); });
      st.trays.parcel.slice().forEach(function (id) { if (!byId(r, id).flat) st.shelved.push(id); else bounced.push(id); });
      st.trays.letter = []; st.trays.parcel = [];
      if (bounced.length) { bounced.forEach(function (id) { st.bag.push(id); }); st.bounced = bounced.slice(); st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { result: 'wrong', bounced: bounced }; return st.last; }
      st.done = true; st.last = { result: 'ok' }; return st.last;
    }
    if (!st.unfolded) { st.last = { result: 'empty', why: 'tab' }; return st.last; }
    if (st.chip == null) { st.last = { result: 'empty', why: 'chip' }; return st.last; }
    if (st.chip !== r.answer) { st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { result: 'wrong', paid: netFitsSlot(st) }; return st.last; }
    if (!netFitsSlot(st)) { st.show = true; st.last = { result: 'unpaid' }; return st.last; }
    st.done = true; st.last = { result: 'ok' }; return st.last;
  }
  function hint(st) {
    var l = st.last; if (!l) return null;
    if (l.result === 'empty') return l.why === 'bag' ? 'hintBag' : l.why === 'tab' ? 'hintTab' : 'hintChip';
    if (l.result === 'unpaid') return 'hintFaces';
    if (l.result !== 'wrong') return null;
    if (st.r.task === 'sort') return st.help >= 2 ? 'hintArrows' : 'hintLine';
    return st.help >= 2 ? 'hintNumbers' : 'hintFaces';
  }

  /* order-only reshuffle: never the previous order; in the counting tasks the same answer never three rounds running */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 400; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      for (var j = n - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; }
      if (prev && n > 1 && o.join() === prev.join()) continue;
      var bad = false; for (var q = 2; q < n; q++) { var a = pool[o[q]].answer; if (a != null && a === pool[o[q - 1]].answer && a === pool[o[q - 2]].answer) { bad = true; break; } }
      if (bad) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  function layout(W, t) {
    var wide = W >= 560, narrow = W < 340;
    var L = { mode: wide ? 'wide' : 'narrow', W: W, cell: wide ? 84 : narrow ? 48 : 52, trayCell: wide ? 52 : 44, chip: 44 };
    L.post = wide ? 170 : W;                /* the post box column (wide) or strip (narrow) */
    L.counterW = wide ? W - L.post - 12 : W;
    if (t === 'sort' && wide) L.cell = Math.min(L.cell, Math.floor((L.counterW - 20 - 16 - 5 * 6) / 6));
    L.solid = wide ? 240 : narrow ? 180 : 200;
    L.netW = wide ? L.counterW - 8 : W - 8;
    L.netH = wide ? 300 : narrow ? 240 : 260;
    return L;
  }
  /* the scale that fits a net into the box (unit → px) */
  function netScale(net, w, h) { return Math.min(w / net.w, h / net.h); }

  return {
    FLAT: FLAT, SOLID: SOLID, OBJ: OBJ, TRAY_MAX: TRAY_MAX, TASKS: TASKS,
    isFlat: isFlat, isSolid: isSolid, poly: poly, edgesOf: edgesOf, facesOf: facesOf, rot: rot, view: view, hiddenAt: hiddenAt,
    thicknessEdgeOn: thicknessEdgeOn, netOf: netOf, flatFacesInNet: flatFacesInNet, boxOutline: boxOutline,
    task: task, rounds: rounds, byId: byId, bagOrder: bagOrder, alternates: alternates,
    newState: newState, whereIs: whereIs, move: move, edgeOnAllowed: edgeOnAllowed,
    unfold: unfold, fold: fold, turn: turn, stamp: stamp, setChip: setChip, netFitsSlot: netFitsSlot,
    check: check, hint: hint, order: order, layout: layout, netScale: netScale
  };
}));

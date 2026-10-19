/* =====================================================================
   pip-museum-core.js — the model of ACTIVITY #38 of the one-by-one
   rebuild: "Professor Pip's Museum" (K.G.A.2; G2 solids).
   Design sheet: docs/activities-rebuild/designs/038-pip-museum.md
   ---------------------------------------------------------------------
   THE INVENTION: every pedestal's brass clasp is built from what makes its
   shape — three hinged rods for a triangle, four equal rods locked square
   for a square, two pairs for a rectangle, six rods for a hexagon, a hoop
   for a circle — so it turns and stretches to meet any disguise but only
   closes round its own shape. The Mystery Gallery takes what no clasp can
   hold. In the solids hall each pedestal holds an everyday object and a
   wire CAGE of its solid; the cage closes only round the same solid.

   What a treasure IS is computed from its geometry (shapes) — never from
   the name it was authored with. Treasures sit in a 100 × 100 cell.
   No DOM. UMD: window.PipMuseumCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PipMuseumCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PEDS = ['triangle', 'square', 'circle', 'hexagon', 'rectangle'];
  var SOLIDS = ['sphere', 'cube', 'cylinder', 'box', 'cone', 'pyramid'];
  /* the everyday objects (library pictures; folder case exact) */
  var OBJ = { ball: ['toys', 'sphere'], orange: ['fruits', 'sphere'], dice: ['toys', 'cube'], present: ['christmas', 'cube'], can: ['At the Supermarket', 'cylinder'], drum: ['music', 'cylinder'], book: ['classroom', 'box'], eraser: ['classroom', 'box'] };
  var PIP = ['animals', 'penguin'];
  var COLOUR = { triangle: '#E8A80C', square: '#2F80D0', circle: '#D9572F', hexagon: '#2FA35A', rectangle: '#8A5CC9', sphere: '#D9572F', cube: '#2F80D0', cylinder: '#2FA35A', box: '#8A5CC9', mystery: '#146B5E' };

  /* ---------------- shape geometry ---------------- */
  var D2R = Math.PI / 180;
  function rotP(p, deg) { var a = deg * D2R, s = Math.sin(a), c = Math.cos(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }
  function regular(n, R, start) { var o = []; for (var i = 0; i < n; i++) { var a = (start + 360 * i / n) * D2R; o.push([R * Math.sin(a), -R * Math.cos(a)]); } return o; }
  /* a shape treasure's points around (0,0): base size 80 × scale, then stretch, then turn */
  function shapePts(t) {
    var w = 80 * (t.s || 1), h = w * (t.st || 1), pts, curve = false;
    switch (t.k) {
      case 'tri': pts = regular(3, w / Math.sqrt(3), 0); break;
      case 'tri-iso': pts = [[0, -h * 2 / 3], [w * 0.22, h / 3], [-w * 0.22, h / 3]]; break;
      case 'tri-obtuse': pts = [[-w / 2, h * 0.2], [w / 2, h * 0.2], [-w * 0.15, -h * 0.25]]; break;
      case 'square': pts = [[-w / 2, -w / 2], [w / 2, -w / 2], [w / 2, w / 2], [-w / 2, w / 2]]; break;
      case 'rect': pts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]]; break;
      case 'rhombus': { var a2 = (t.ang || 60) * D2R / 2, dx = w * 0.6 * Math.cos(a2), dy = w * 0.6 * Math.sin(a2); pts = [[0, -dy], [dx, 0], [0, dy], [-dx, 0]]; break; }
      case 'hex': pts = regular(6, w / 2, 30); break;
      case 'hex-irr': pts = [[-w * 0.3, -w * 0.5], [w * 0.25, -w * 0.45], [w * 0.5, -w * 0.05], [w * 0.3, w * 0.5], [-w * 0.2, w * 0.42], [-w * 0.5, w * 0.02]]; break;
      case 'pent': pts = regular(5, w / 2, 0); break;
      case 'circle': case 'oval': case 'cring': {
        pts = []; curve = true; var n = 48, rx = w / 2, ry = (t.k === 'oval' ? w / 2 / (t.st || 1.6) : w / 2);
        if (t.k === 'oval') { rx = w / 2; ry = w / 2 / (t.st || 1.6); }
        var a0 = t.k === 'cring' ? 40 : 0, a1 = t.k === 'cring' ? 320 : 360, m = t.k === 'cring' ? 40 : n;
        for (var i = 0; i < (t.k === 'cring' ? m + 1 : m); i++) { var an = (a0 + (a1 - a0) * i / m) * D2R; pts.push([rx * Math.cos(an), ry * Math.sin(an)]); }
        break;
      }
      default: return null;
    }
    if (t.k === 'rect' && t.st) { /* st = width : height for rectangles */ var ww = 80 * (t.s || 1), hh = ww / t.st; pts = [[-ww / 2, -hh / 2], [ww / 2, -hh / 2], [ww / 2, hh / 2], [-ww / 2, hh / 2]]; }
    if (t.flip) pts = pts.map(function (p) { return [-p[0], p[1]]; });
    pts = pts.map(function (p) { return rotP(p, t.a || 0); });
    return { pts: pts, curve: curve, open: !!t.open || t.k === 'cring', curvedSide: t.curved != null ? t.curved : null, rounded: !!t.rounded };
  }
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function centroid(p) { var x = 0, y = 0; p.forEach(function (q) { x += q[0]; y += q[1]; }); return [x / p.length, y / p.length]; }
  function sides(p) { return p.map(function (q, i) { return dist(q, p[(i + 1) % p.length]); }); }
  function angles(p) { return p.map(function (b, i) { var a = p[(i + p.length - 1) % p.length], c = p[(i + 1) % p.length], u = [a[0] - b[0], a[1] - b[1]], v = [c[0] - b[0], c[1] - b[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))))) / D2R; }); }
  /* the shape the geometry makes (one of the five pedestal shapes, or other) */
  function kindOf(t) {
    var g = shapePts(t); if (!g) return null;
    if (g.open) return 'open';
    if (g.curve) { var c = centroid(g.pts), r = g.pts.map(function (q) { return dist(q, c); }), mn = Math.min.apply(null, r), mx = Math.max.apply(null, r); return mx - mn < 0.02 * mx ? 'circle' : 'oval'; }
    if (g.rounded || g.curvedSide != null) return 'bent';
    var n = g.pts.length, sd = sides(g.pts), an = angles(g.pts), eq = sd.every(function (x) { return Math.abs(x - sd[0]) <= sd[0] * 0.01; }), right = an.every(function (x) { return Math.abs(x - 90) <= 1; });
    if (n === 3) return 'triangle';
    if (n === 4) return eq && right ? 'square' : right ? 'rectangle' : eq ? 'rhombus' : 'quad';
    if (n === 5) return 'pentagon';
    if (n === 6) return 'hexagon';
    return 'other';
  }
  /* can a pedestal's clasp hold this treasure? (a square IS a rectangle) */
  function canHold(ped, t) {
    if (t.solid) return t.solid === ped;               /* solids: the cage of the same solid */
    var k = kindOf(t); return k === ped || (ped === 'rectangle' && k === 'square');
  }

  /* ---------------- the rounds (design §6) ---------------- */
  function T(k, a, s, more) { var o = { k: k, a: a || 0, s: s || 0.8 }; for (var x in more || {}) o[x] = more[x]; return o; }
  var SHAPES = [
    { id: 'S1', peds: ['triangle', 'square', 'circle'], belt: [T('square', 30, 0.5), T('tri', 180, 0.95), T('circle', 0, 0.4), T('tri-iso', 70, 0.8)], show: 'square' },
    { id: 'S2', peds: ['circle', 'hexagon', 'triangle'], belt: [T('hex', 30, 0.95), T('tri', 250, 0.45), T('hex-irr', 0, 0.75), T('circle', 0, 0.9)], show: 'triangle' },
    { id: 'S3', peds: ['square', 'circle'], mystery: true, belt: [T('square', 45, 0.7), T('rhombus', 0, 0.9, { ang: 60 }), T('circle', 0, 0.45), T('oval', 20, 0.9, { st: 1.6 })], show: 'square' },
    { id: 'S4', peds: ['triangle', 'square'], mystery: true, belt: [T('square', 10, 0.35), T('rect', 0, 0.8, { st: 1.4 }), T('tri', 120, 0.7), T('square', 0, 0.75, { open: true })], show: 'triangle' },
    { id: 'S5', peds: ['hexagon', 'rectangle'], mystery: true, belt: [T('rect', 60, 0.95, { st: 3 }), T('pent', 0, 0.8), T('rect', 0, 0.45, { st: 2 }), T('hex', 15, 0.85), T('rect', 0, 0.85, { st: 1.6, rounded: true })], show: 'rectangle' },
    { id: 'S6', peds: ['circle', 'triangle', 'rectangle'], mystery: true, belt: [T('tri', 0, 0.85, { curved: 1 }), T('rect', 100, 0.8, { st: 1.6 }), T('circle', 0, 0.45), T('tri-obtuse', 200, 0.95)], show: 'rectangle' },
    { id: 'S7', peds: ['square', 'circle', 'hexagon'], belt: [T('square', 60, 0.95), T('hex', 0, 0.4), T('circle', 0, 0.3), T('square', 0, 0.5), T('hex-irr', 45, 0.8)], show: 'square' },
    { id: 'S8', peds: ['rectangle', 'triangle', 'circle'], mystery: true, belt: [T('oval', 0, 0.9, { st: 1.4 }), T('rect', 20, 1.0, { st: 5 }), T('circle', 40, 0.85, { k2: 'cring' }), T('tri', 300, 0.35), T('circle', 0, 1.0)], show: 'triangle' },
    { id: 'S9', peds: ['hexagon', 'triangle', 'square'], capstone: { triangle: 3, square: 3 }, belt: [T('square', 45, 0.7), T('hex', 0, 0.8), T('tri', 160, 0.8), T('square', 0, 0.3), T('hex', 30, 0.6), T('tri', 20, 0.3), T('tri-iso', 260, 0.9), T('square', 75, 0.85)], show: 'square' }
  ];
  /* S8's "open circle": a C-ring */
  SHAPES[7].belt[2] = T('cring', 0, 0.85);
  function S(solid, pose, s) { return { solid: solid, pose: pose || 'stand', s: s || 0.85 }; }
  var SOLID_ROUNDS = [
    { id: 'D1', peds: [['ball', 'sphere'], ['dice', 'cube'], ['can', 'cylinder']], belt: [S('sphere', 'stand', 0.7), S('cube', 'turn', 0.85), S('cylinder', 'lying', 0.85), S('cube', 'stand', 0.45)], pair: 'can' },
    { id: 'D2', peds: [['book', 'box'], ['orange', 'sphere'], ['drum', 'cylinder']], belt: [S('box', 'flat', 0.9), S('sphere', 'stand', 0.4), S('cylinder', 'stand', 0.95), S('box', 'end', 0.8)], pair: 'book' },
    { id: 'D3', peds: [['can', 'cylinder'], ['dice', 'cube']], mystery: true, belt: [S('cylinder', 'stand', 0.5), S('cone', 'stand', 0.85), S('cube', 'turn', 0.95), S('pyramid', 'stand', 0.85)], pair: 'dice' },
    { id: 'D4', peds: [['eraser', 'box'], ['ball', 'sphere']], mystery: true, belt: [S('box', 'flat', 0.95), S('sphere', 'stand', 1.0), S('cone', 'stand', 0.8), S('box', 'end', 0.75)], pair: 'eraser' },
    { id: 'D5', peds: [['orange', 'sphere'], ['present', 'cube'], ['drum', 'cylinder']], belt: [S('cube', 'turn', 0.85), S('cylinder', 'lying', 0.9), S('sphere', 'stand', 0.3), S('cylinder', 'stand', 0.5)], pair: 'orange' },
    { id: 'D6', peds: [['can', 'cylinder'], ['book', 'box'], ['ball', 'sphere']], mystery: true, belt: [S('box', 'flat', 0.85), S('cylinder', 'stand', 0.8), S('sphere', 'stand', 0.85), S('pyramid', 'stand', 0.8), S('box', 'turn', 0.8)], pair: 'book' },
    { id: 'D7', peds: [['orange', 'sphere'], ['can', 'cylinder'], ['present', 'cube']], belt: [S('cube', 'stand', 0.85), S('sphere', 'stand', 0.85), S('cylinder', 'lying', 0.85), S('cylinder', 'stand', 0.35)], pair: 'present' },
    { id: 'D8', peds: [['drum', 'cylinder'], ['eraser', 'box']], mystery: true, belt: [S('box', 'end', 0.8), S('cylinder', 'stand', 0.85), S('cone', 'stand', 0.8), S('sphere', 'stand', 0.7)], pair: 'drum' }
  ];
  function hall(h) { return h === 'solids' ? 'solids' : 'shapes'; }
  function plates(p) { return p === 'riddles' ? 'riddles' : 'names'; }
  function rounds(h) {
    if (hall(h) === 'solids') return SOLID_ROUNDS.map(function (r) { return { id: r.id, hall: 'solids', peds: r.peds.map(function (p) { return { kind: p[1], object: p[0] }; }), mystery: !!r.mystery, belt: r.belt.map(function (t, i) { var o = JSON.parse(JSON.stringify(t)); o.id = 't' + i; return o; }), pair: r.pair }; });
    return SHAPES.map(function (r) { return { id: r.id, hall: 'shapes', peds: r.peds.map(function (k) { return { kind: k }; }), mystery: !!r.mystery, belt: r.belt.map(function (t, i) { var o = JSON.parse(JSON.stringify(t)); o.id = 't' + i; return o; }), show: r.show, capstone: r.capstone || null }; });
  }
  /* where a treasure belongs: the one pedestal whose clasp holds it, else the Mystery Gallery */
  function destOf(r, t) { var hold = r.peds.filter(function (p) { return canHold(p.kind, t); }); return hold.length ? hold.map(function (p) { return p.kind; }) : (r.mystery ? ['mystery'] : []); }
  function rightOf(r, t) { var d = destOf(r, t); return d.length === 1 ? d[0] : null; }
  /* all destinations a round shows, left to right (the Mystery Gallery is the doorway at the right end) */
  function dests(r) { return r.peds.map(function (p) { return p.kind; }).concat(r.mystery ? ['mystery'] : []); }

  /* ---------------- the state ---------------- */
  /* belt order: shuffled per round (an rnd may be passed), the answer sequence never fixed */
  function newState(r, rnd) {
    var ids = r.belt.map(function (t) { return t.id; });
    if (rnd) for (var j = ids.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = ids[j]; ids[j] = ids[k]; ids[k] = x; }
    var trays = {}; dests(r).forEach(function (d) { trays[d] = []; });
    return { r: r, belt: ids, trays: trays, held: {}, refused: {}, count: {}, phase: 'route', misses: 0, help: 0, done: false, last: null, sel: null };
  }
  function byId(r, id) { for (var i = 0; i < r.belt.length; i++) if (r.belt[i].id === id) return r.belt[i]; return null; }
  function whereIs(st, id) { if (st.belt.indexOf(id) >= 0) return 'belt'; for (var d in st.trays) if (st.trays[d].indexOf(id) >= 0) return d; return null; }
  /* move a treasure to a tray (or back to the belt); a held treasure may be moved only after the round (free play) */
  function route(st, id, dest) {
    if (st.phase !== 'route' && !st.done) return false;
    if (!byId(st.r, id)) return false;
    if (dest !== 'belt' && !st.trays[dest]) return false;
    var from = whereIs(st, id); if (from === dest) return false;
    if (st.held[id] && !st.done) return false;
    if (from === 'belt') st.belt.splice(st.belt.indexOf(id), 1); else st.trays[from].splice(st.trays[from].indexOf(id), 1);
    if (dest === 'belt') st.belt.push(id); else st.trays[dest].push(id);
    /* a new drag clears what is SHOWN (the ghost clasp, the flashing clasp) but keeps the
       help level: a refused treasure goes back to the belt, so the next miss must reach level 2 */
    if (!st.done) { delete st.refused[id]; st.last = null; }
    else { st.free = { id: id, dest: dest, holds: dest === 'belt' ? null : (dest === 'mystery' ? !st.r.peds.some(function (p) { return canHold(p.kind, byId(st.r, id)); }) : canHold(dest, byId(st.r, id))) }; }
    return true;
  }
  /* Check: the clasps work. A held treasure stays held; a refused one goes back to the belt. */
  function check(st) {
    if (st.done) return st.last;
    var r = st.r;
    if (st.phase === 'route') {
      if (st.belt.length) { st.last = { result: 'empty', why: 'belt' }; return st.last; }
      var refused = [], verdict = [];
      for (var d in st.trays) st.trays[d].slice().forEach(function (id) {
        if (st.held[id]) return;
        var t = byId(r, id), ok = d === 'mystery' ? !r.peds.some(function (p) { return canHold(p.kind, t); }) : canHold(d, t);
        verdict.push({ id: id, dest: d, ok: ok });
        if (ok) st.held[id] = d; else { refused.push(id); st.refused[id] = d; st.trays[d].splice(st.trays[d].indexOf(id), 1); st.belt.push(id); }
      });
      if (refused.length) { st.misses++; st.help = Math.min(2, st.help + 1); st.last = { result: 'wrong', refused: refused, verdict: verdict }; return st.last; }
      if (r.capstone) { st.phase = 'count'; st.last = { result: 'held', verdict: verdict }; return st.last; }
      st.done = true; st.last = { result: 'ok', verdict: verdict }; return st.last;
    }
    /* the capstone count */
    if (st.count.triangle == null || st.count.square == null) { st.last = { result: 'empty', why: 'count' }; return st.last; }
    var bad = ['triangle', 'square'].filter(function (k) { return st.count[k] !== r.capstone[k]; });
    if (bad.length) { st.misses++; st.help = Math.min(2, st.help + 1); st.last = { result: 'wrong', count: bad[0] }; return st.last; }
    st.done = true; st.last = { result: 'ok' }; return st.last;
  }
  function setCount(st, k, d) { if (st.phase !== 'count' || st.done) return false; var v = (st.count[k] == null ? 0 : st.count[k]) + d; if (v < 1 || v > 9) return false; st.count[k] = v; st.help = 0; st.last = null; return true; }
  function hint(st) {
    var l = st.last; if (!l) return st.phase === 'count' && !st.done ? 'hintCount' : null;
    if (l.result === 'empty') return l.why === 'count' ? 'hintCount' : 'hintBelt';
    if (l.result === 'held') return 'hintCount';
    if (l.result !== 'wrong') return null;
    if (l.count) return st.help >= 2 ? 'hintCountNum' : 'hintCountOne';
    if (st.help >= 2) return 'hintGlow';
    return st.r.hall === 'solids' ? 'hintTruthSolid' : 'hintTruth';
  }

  /* ---------------- the ghost clasp: built from the TREASURE ---------------- */
  /* rods along its sides (equal lengths share a colour group), a hinge at every
     corner, a square lock where a corner is square; a hoop for a round edge
     (stretched for an oval); a gap where the figure is open. Never from its name. */
  function ghostClasp(t) {
    var g = shapePts(t); if (!g) return null;
    if (g.curve) {
      var c = centroid(g.pts), r = g.pts.map(function (q) { return dist(q, c); });
      return { hoop: true, pts: g.pts, open: g.open, stretch: Math.max.apply(null, r) / Math.min.apply(null, r) };
    }
    var sd = sides(g.pts), an = angles(g.pts), group = [], gi = 0;
    sd.forEach(function (len, i) { if (group[i] != null) return; group[i] = gi; for (var j = i + 1; j < sd.length; j++) if (group[j] == null && Math.abs(sd[j] - len) <= len * 0.01) group[j] = gi; gi++; });
    return { hoop: false, pts: g.pts, rods: sd.map(function (len, i) { return { from: g.pts[i], to: g.pts[(i + 1) % g.pts.length], len: len, group: group[i], bent: g.curvedSide === i, gap: g.open && i === 0 }; }), hinges: g.pts.length, locks: an.map(function (a) { return Math.abs(a - 90) <= 1; }), rounded: g.rounded };
  }

  /* ---------------- order: order-only reshuffle ---------------- */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 60; t++) { var o = []; for (var i = 0; i < n; i++) o.push(i); for (var j = n - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; } if (prev && n > 1 && o.join() === prev.join()) continue; best = o; break; }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  function layout(W, nDest) {
    var wide = W >= 560, pip = wide ? 88 : 0, gap = wide ? 10 : 4;
    var pedW = Math.floor((W - pip - gap * (nDest - 1)) / nDest);
    pedW = Math.min(wide ? 132 : 90, pedW);
    var cell = wide ? 96 : 66, trayCell = wide ? 56 : 46;
    return { mode: wide ? 'wide' : 'narrow', W: W, pip: pip, pipPic: wide ? 96 : 64, gap: gap, pedW: pedW, cell: cell, trayCell: trayCell, perRow: Math.max(1, Math.floor((pedW - 6) / (trayCell + 4))), obj: wide ? 96 : 64 };
  }

  return {
    PEDS: PEDS, SOLIDS: SOLIDS, OBJ: OBJ, PIP: PIP, COLOUR: COLOUR,
    shapePts: shapePts, kindOf: kindOf, canHold: canHold, sides: sides, angles: angles, centroid: centroid,
    hall: hall, plates: plates, rounds: rounds, destOf: destOf, rightOf: rightOf, dests: dests,
    newState: newState, byId: byId, whereIs: whereIs, route: route, check: check, setCount: setCount, hint: hint,
    ghostClasp: ghostClasp, order: order, layout: layout
  };
}));

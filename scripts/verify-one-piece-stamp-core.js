#!/usr/bin/env node
/* =====================================================================
   verify-one-piece-stamp-core.js — the gate for ACTIVITY #108, The
   One-Piece Stamp (1.G.A.3). Its OWN ground truth: the shapes, the cut
   menu rules and the round tables are typed here from the design
   (designs/108-fractions.md §4, §6), and the gate has its own polygon
   clipper, its own wedge builder and its own point-sampled overlap. The
   core is checked against it, never asked what is true.
     (a) the menu: the core offers exactly the cuts the design's rules
         allow on every shape (rails, square-only diagonals, diamond
         mid-pins, circle pegs, hexagon edge points, corner cuts on the
         triangle and pentagon, spokes on the circle / triangle /
         hexagon only);
     (b) THE GUARANTEE: on every round, every reachable cut set (≤ n − 1
         lines, or n spokes) that makes n pieces is all-copies by the
         stamp exactly when its pieces are equal by the gate's areas —
         the stamp never rejects a fair cut nor accepts an unfair one;
         every copy the core certifies is re-checked by the gate's own
         transform and sampling;
     (c) the rounds: the right set is right, the tempting set reachable
         and wrong, every doubling proved (twice the pieces, all copies);
         the bots: one central cut never solves a thirds or fourths round;
         bounding-box fractions never solve the triangle / pentagon /
         hexagon;
     (d) level 3: shade accepts exactly a stamped copies; name accepts
         a/n (and 1/2 for 2/4); the trap is unequal and only "Not equal!"
         opens it;
     (e) the state machine: the cut limit, duplicates, the locked halves
         of the two-step round, an empty Check is never a miss, the hints
         step to the gold dots at miss 2, halve again and back;
     (f) the plan: L1 #1 opens, L2 #8 last, never the previous order;
     (g) the strings ×11 (no digit in a hint, fr narrow spaces, fr/it
         apostrophes, never "free", every key used).
   Usage: node scripts/verify-one-piece-stamp-core.js [--quick]
   (env OPS_CORE_DIR / OPS_ACT_DIR for the mutation run; --quick skips the
   two biggest enumerations: hexagon spokes and circle fourths)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const CORE_DIR = process.env.OPS_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const ACT_DIR = process.env.OPS_ACT_DIR || CORE_DIR;
const QUICK = process.argv.includes('--quick');
const C = require(path.join(CORE_DIR, 'one-piece-stamp-core.js'));
const ACT = (() => { const ctx = { window: {}, OnePieceStampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'one-piece-stamp-activity.js'), 'utf8') + '\n;this.__A = OnePieceStampActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---------------- the gate's own geometry ---------------- */
const R2D = Math.PI / 180, HT = 92 * Math.sqrt(3) / 2;
const gRing = (a, b) => Array.from({ length: 360 }, (_, k) => [50 + a * Math.cos(k * R2D), 50 + b * Math.sin(k * R2D)]);
const G = {
  circle: gRing(46, 46), square: [[8, 8], [92, 8], [92, 92], [8, 92]], rect: [[4, 21.25], [96, 21.25], [96, 78.75], [4, 78.75]], ellipse: gRing(46, 30),
  diamond: [[50, 18], [96, 50], [50, 82], [4, 50]], triangle: [[50, 50 - HT / 2], [96, 50 + HT / 2], [4, 50 + HT / 2]],
  hexagon: [0, 60, 120, 180, 240, 300].map(d => [50 + 46 * Math.cos(d * R2D), 50 + 46 * Math.sin(d * R2D)]),
  pentagon: [0, 1, 2, 3, 4].map(k => [50 + 48 * Math.cos((-90 + 72 * k) * R2D), 52 + 48 * Math.sin((-90 + 72 * k) * R2D)])
};
const GC = { circle: [50, 50], triangle: [50, 50 - HT / 2 + 2 * HT / 3], hexagon: [50, 50] };
const gArea = (p) => { let a = 0; for (let i = 0; i < p.length; i++) { const q = p[i], r = p[(i + 1) % p.length]; a += q[0] * r[1] - r[0] * q[1]; } return Math.abs(a) / 2; };
const cross = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
/* keep the part of poly where sign·cross ≥ 0 */
function gHalf(poly, a, b, sign) {
  const out = [];
  poly.forEach((p, i) => { const q = poly[(i + 1) % poly.length], sp = sign * cross(a, b, p), sq = sign * cross(a, b, q);
    if (sp >= 0) out.push(p);
    if (sp * sq < 0) { const t = sp / (sp - sq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } });
  return out;
}
function gWedge(shape, c, p, q) {
  const ang = (z) => Math.atan2(z[1] - c[1], z[0] - c[0]), tw = 2 * Math.PI, a0 = ang(p), span = ((ang(q) - a0) % tw + tw) % tw || tw;
  const inner = G[shape].map(v => ({ v, d: ((ang(v) - a0) % tw + tw) % tw })).filter(o => o.d > 1e-9 && o.d < span - 1e-9).sort((x, y) => x.d - y.d).map(o => o.v);
  return [c, p, ...inner, q];
}
/* pieces as plain polygons: wedges between consecutive spokes, then every line splits every part */
function gPieces(shape, lines, spokes) {
  let parts = [G[shape]];
  if (spokes.length >= 2) { const c = GC[shape], ang = (z) => Math.atan2(z[1] - c[1], z[0] - c[0]); const e = spokes.slice().sort((x, y) => ang(x) - ang(y)); parts = e.map((p, i) => gWedge(shape, c, p, e[(i + 1) % e.length])); }
  for (const [a, b] of lines) { const next = []; parts.forEach(p => [1, -1].forEach(s => { const h = gHalf(p, a, b, s); if (h.length > 2 && gArea(h) > 1e-6) next.push(h); })); parts = next; }
  return parts;
}
const gEqual = (P) => { const A = P.map(gArea), hi = Math.max(...A), lo = Math.min(...A); return hi - lo <= 0.005 * hi; };
const inPoly = (pt, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if (((a[1] > pt[1]) !== (b[1] > pt[1])) && (pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0])) c = !c; } return c; };
const cen = (p) => { let A = 0, x = 0, y = 0; p.forEach((q, i) => { const r = p[(i + 1) % p.length], c = q[0] * r[1] - r[0] * q[1]; A += c; x += (q[0] + r[0]) * c; y += (q[1] + r[1]) * c; }); return [x / (3 * A), y / (3 * A)]; };
/* the gate's own check of a certified copy: S turned by rot (and mirrored) about its centroid onto T's centroid, then intersected
   with the gate's own clipper (each convex polygon cut by the other's edge lines); the overlap over the larger area */
const signedA = (p) => { let a = 0; for (let i = 0; i < p.length; i++) { const q = p[i], r = p[(i + 1) % p.length]; a += q[0] * r[1] - r[0] * q[1]; } return a / 2; };
const convex = (p) => { let sg = 0; for (let i = 0; i < p.length; i++) { const z = cross(p[i], p[(i + 1) % p.length], p[(i + 2) % p.length]); if (Math.abs(z) < 1e-9) continue; const t = z > 0 ? 1 : -1; if (!sg) sg = t; else if (t !== sg) return false; } return true; };
const gClip = (sub, clip) => { const o = signedA(clip) > 0 ? 1 : -1; let out = sub; for (let i = 0; i < clip.length && out.length; i++) out = gHalf(out, clip[i], clip[(i + 1) % clip.length], o); return out; };
function gOverlap(S, T, rot, flip) {
  const cs = cen(S), ct = cen(T), c = Math.cos(rot), s = Math.sin(rot);
  const P = S.map(p => { let x = p[0] - cs[0], y = p[1] - cs[1]; if (flip) x = -x; return [ct[0] + x * c - y * s, ct[1] + x * s + y * c]; });
  const I = convex(T) ? gClip(P, T) : convex(P) ? gClip(T, P) : [];
  return (I.length > 2 ? gArea(I) : 0) / Math.max(gArea(T), gArea(P));
}

/* ---------------- (a) the menu, rebuilt from the design's rules ---------------- */
const K = Array.from({ length: 23 }, (_, i) => i + 1);
const kp = (p) => Math.round(p[0] * 100) + ',' + Math.round(p[1] * 100);
const lk = (a, b) => [kp(a), kp(b)].sort().join('|');
const edgePts = (s) => { const P = G[s], o = []; P.forEach((a, i) => { const b = P[(i + 1) % P.length]; for (let t = 0; t < 24; t++) o.push({ p: [a[0] + (b[0] - a[0]) * t / 24, a[1] + (b[1] - a[1]) * t / 24], e: i, t }); }); return o; };
const edgesOf = (q, n) => q.t === 0 ? [q.e, (q.e - 1 + n) % n] : [q.e];
function gMenu(shape, mode) {
  const L = [];
  if (mode === 'spoke') { const c = GC[shape]; if (shape === 'circle') for (let d = 0; d < 360; d += 15) L.push([c, G.circle[d]]); else edgePts(shape).forEach(q => L.push([c, q.p])); }
  else if (shape === 'square' || shape === 'rect') { const P = G[shape]; K.forEach(k => { const x = P[0][0] + (P[1][0] - P[0][0]) * k / 24, y = P[0][1] + (P[2][1] - P[0][1]) * k / 24; L.push([[x, P[0][1]], [x, P[2][1]]]); L.push([[P[0][0], y], [P[1][0], y]]); }); if (shape === 'square') L.push([[8, 8], [92, 92]], [[92, 8], [8, 92]]); }
  else if (shape === 'ellipse') K.forEach(k => { const x = 4 + 92 * k / 24, y = 20 + 60 * k / 24, h = 30 * Math.sqrt(1 - ((x - 50) / 46) ** 2), w = 46 * Math.sqrt(1 - ((y - 50) / 30) ** 2); L.push([[x, 50 - h], [x, 50 + h]]); L.push([[50 - w, y], [50 + w, y]]); });
  else if (shape === 'diamond') { K.forEach(k => { const y = 18 + 64 * k / 24, w = 46 * (1 - Math.abs(y - 50) / 32), x = 4 + 92 * k / 24, h = 32 * (1 - Math.abs(x - 50) / 46); L.push([[50 - w, y], [50 + w, y]]); L.push([[x, 50 - h], [x, 50 + h]]); }); L.push([[27, 34], [73, 66]], [[73, 34], [27, 66]]); }
  else if (shape === 'circle') { for (let i = 0; i < 360; i += 15) for (let j = i + 15; j < 360; j += 15) L.push([G.circle[i], G.circle[j]]); }
  else if (shape === 'hexagon') { const E = edgePts('hexagon'); for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) { const a = edgesOf(E[i], 6), b = edgesOf(E[j], 6); if (!a.some(e => b.includes(e))) L.push([E[i].p, E[j].p]); } }
  else { const P = G[shape], n = P.length; P.forEach((v, i) => edgePts(shape).forEach(q => { const e = edgesOf(q, n); if (!e.includes(i) && !e.includes((i - 1 + n) % n)) L.push([v, q.p]); })); }
  const seen = new Set(); return L.filter(([a, b]) => { const k2 = lk(a, b); if (seen.has(k2)) return false; seen.add(k2); return true; });
}
const MENUS = [['circle', 'line'], ['square', 'line'], ['rect', 'line'], ['ellipse', 'line'], ['diamond', 'line'], ['hexagon', 'line'], ['triangle', 'line'], ['pentagon', 'line'], ['circle', 'spoke'], ['triangle', 'spoke'], ['hexagon', 'spoke']];
/* segments compared with a tolerance (rounding a coordinate that sits on a .5 boundary would split one point in two) */
const near = (p, q) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
const sameSeg = (x, y) => (near(x[0], y[0]) && near(x[1], y[1])) || (near(x[0], y[1]) && near(x[1], y[0]));
const bucket = (p) => Math.round(p[0] * 2) + ':' + Math.round(p[1] * 2);
for (const [shape, mode] of MENUS) {
  const g = gMenu(shape, mode), c = C.menu(shape, mode).map(x => [x.a, x.b]), idx = new Map();
  c.forEach(sg => [sg[0], sg[1]].forEach(p => { const b = bucket(p); if (!idx.has(b)) idx.set(b, []); idx.get(b).push(sg); }));
  const has = (sg) => { const [x, y] = sg[0].map(v => Math.round(v * 2)); for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const L = idx.get((x + dx) + ':' + (y + dy)); if (L && L.some(o => sameSeg(o, sg))) return true; } return false; };
  is(g.length === c.length && g.every(has), `${shape}/${mode}: the core offers exactly the design's cuts (${c.length} vs ${g.length})`);
}
for (const s of ['square', 'rect', 'ellipse', 'diamond', 'pentagon']) is(!C.DATA.CENTRE[s], `${s}: no centre pin, so no spokes`);
is(!C.menu('rect', 'line').some(c => Math.abs(c.a[0] - c.b[0]) > 1e-6 && Math.abs(c.a[1] - c.b[1]) > 1e-6), 'rect: no slanted cut (its diagonals are not on the mat)');

/* ---------------- the round tables (design §6) ---------------- */
const RT1 = [['circle', 2], ['square', 4], ['rect', 2], ['triangle', 2], ['ellipse', 4], ['diamond', 4], ['hexagon', 2], ['pentagon', 2], ['rect', 4], ['circle', 4]];
const RT2 = [['circle', 3, 'spoke'], ['rect', 3], ['square', 3], ['triangle', 3, 'spoke'], ['hexagon', 3, 'spoke'], ['square', 4], ['rect', 3], ['circle', 4]];
is(JSON.stringify(C.DATA.L1.map(R => [R[0], R[1]])) === JSON.stringify(RT1), 'level 1 is the design\'s ten rounds');
is(JSON.stringify(C.DATA.L2.map(R => R[2] === 'spoke' ? [R[0], R[1], 'spoke'] : [R[0], R[1]])) === JSON.stringify(RT2), 'level 2 is the design\'s eight rounds');
const toG = (cuts) => ({ lines: cuts.filter(c => c.kind === 'line').map(c => [c.a, c.b]), spokes: cuts.filter(c => c.kind === 'spoke').map(c => c.b) });
const gOf = (shape, cuts) => { const t = toG(cuts); return gPieces(shape, t.lines, t.spokes); };

/* ---------------- (b) the guarantee ---------------- */
const combos = (arr, k, st = 0, acc = [], out = []) => { if (acc.length === k) { out.push(acc.slice()); return out; } for (let i = st; i < arr.length; i++) { acc.push(arr[i]); combos(arr, k, i + 1, acc, out); acc.pop(); } return out; };
const done = new Set();
const rounds = [];
C.DATA.L1.forEach(R => rounds.push([R[0], R[1], R[2]])); C.DATA.L2.forEach((R, i) => { rounds.push([R[0], R[1], R[2]]); if (i === C.DATA.STEP_ROUND) rounds.push([R[0], 2, R[2]]); });
let certified = 0;
for (const [shape, n, mode] of rounds) {
  const key = shape + '/' + n + '/' + mode; if (done.has(key)) continue; done.add(key);
  if (QUICK && (key === 'hexagon/3/spoke' || key === 'circle/4/line')) continue;
  const tot = gArea(G[shape]);
  let M = C.menu(shape, mode);
  /* a line's two sides are unions of whole pieces, so in an equal n-partition each side is a whole number of n-ths (±0.5 % each): prefilter at 2 % */
  if (mode === 'line') M = M.filter(c => { const s = gArea(gHalf(G[shape], c.a, c.b, 1)) / tot * n; return Math.abs(s - Math.round(s)) < 0.02 * n; });
  const sets = mode === 'spoke' ? combos(M, n) : [].concat(...Array.from({ length: n - 1 }, (_, i) => combos(M, i + 1)));
  let nSets = 0, eqN = 0, bad = 0;
  for (const s of sets) {
    const gp = gOf(shape, s); if (gp.length !== n) continue; nSets++;
    const eq = gEqual(gp), cp = C.allCopies(C.piecesOf(shape, s));
    if (eq) eqN++;
    if (eq !== cp) { bad++; if (bad < 3) console.error('    mismatch ' + key + ': ' + s.map(c => c.id).join(' ; ')); }
    /* re-check every certified copy with the gate's own transform and sampling (first 12 per round) */
    if (eq && cp && eqN <= 12) { const P = C.piecesOf(shape, s); for (let i = 1; i < P.length; i++) { const f = C.fit(P[0], P[i]); const o = gOverlap(P[0].poly, P[i].poly, f.rot, f.flip); certified++; is(o > 0.995, `${key}: the certified copy really overlaps (${o.toFixed(4)})`); } }
  }
  is(bad === 0, `${key}: equal ⇔ all copies on every reachable ${n}-piece cut set (${nSets} sets, ${eqN} equal, ${bad} mismatches)`);
  is(eqN > 0, `${key}: at least one fair cut is reachable`);
}
is(certified > 50, `copies re-checked by the gate (${certified})`);

/* the stamp on hand-made pieces: equal area is not enough; a mirror image and a turned copy are copies; 48/52 is not */
const pc = (poly) => { const c2 = cen(poly); return { poly, area: gArea(poly), cx: c2[0], cy: c2[1] }; };
const sq40 = pc([[0, 0], [40, 0], [40, 40], [0, 40]]), r20 = pc([[0, 0], [20, 0], [20, 80], [0, 80]]), tri = pc([[0, 0], [30, 0], [0, 50]]), mir = pc([[60, 0], [90, 0], [90, 50]]), rot = pc([[0, 0], [50, 0], [50, 30]]);
is(!C.isCopy(sq40, r20), 'a 40 × 40 square is not a copy of a 20 × 80 strip (same area)');
is(C.isCopy(tri, mir), 'a right triangle and its mirror image are copies (the stamp flips)');
is(C.isCopy(tri, rot), 'a right triangle and the same triangle turned are copies (the stamp turns)');
is(!C.isCopy(pc([[0, 0], [48, 0], [48, 50], [0, 50]]), pc([[0, 0], [52, 0], [52, 50], [0, 50]])), 'a 48/52 split is not a copy');
is(!C.isCopy(pc([[0, 0], [49.6, 0], [49.6, 50], [0, 50]]), pc([[0, 0], [50.4, 0], [50.4, 50], [0, 50]])), 'a 49.6/50.4 split is not a copy');

/* ---------------- (c) the rounds ---------------- */
const chk = (shape, cuts) => { const P = C.piecesOf(shape, cuts); return { n: P.length, eq: gEqual(gOf(shape, cuts)), cp: C.allCopies(P) }; };
[['L1', C.DATA.L1], ['L2', C.DATA.L2]].forEach(([lv, T]) => T.forEach((R, r) => {
  const [shape, n, mode, right, tempt, dbl] = R, tag = `${lv} #${r + 1} ${shape}`;
  right.concat(tempt).forEach(c => is(!!C.findCut(shape, mode, c.a, c.b), `${tag}: ${c.id} is on the mat`));
  const a = chk(shape, right); is(a.n === n && a.eq && a.cp, `${tag}: the right cut set makes ${n} equal copies`);
  const b = chk(shape, tempt); is(!(b.n === n && b.eq) && !b.cp, `${tag}: the tempting cut set is wrong (${b.n} pieces)`);
  if (dbl) { const d = chk(shape, dbl); is(d.n === 2 * n && d.eq && d.cp, `${tag}: halve again makes ${2 * n} equal copies`); }
  is(gArea(G[shape]) > 0 && Math.abs(C.piecesOf(shape, right).reduce((s, p) => s + p.area, 0) - gArea(G[shape])) < 1e-6, `${tag}: the pieces add up to the whole`);
  /* the bots */
  if (mode === 'line') {
    const cen0 = cen(G[shape]), central = C.menu(shape, 'line').filter(c => Math.abs(cross(c.a, c.b, cen0)) / Math.hypot(c.b[0] - c.a[0], c.b[1] - c.a[1]) < 0.01);
    if (n !== 2) is(central.every(c => { const k = chk(shape, [c]); return !(k.n === n && k.cp); }), `${tag}: one central cut never solves it`);
  }
  /* the bounding-box bot: equal slices of the bounding box are not on the mat in the triangle / hexagon thirds (spokes only),
     and where they are on the mat in an n ≥ 3 round of a shape that is not a rectangle they are not a fair cut */
  if (['triangle', 'pentagon', 'hexagon', 'circle', 'ellipse', 'diamond'].includes(shape) && n >= 3) {
    const xs = G[shape].map(p => p[0]), x0 = Math.min(...xs), x1 = Math.max(...xs), ys = G[shape].map(p => p[1]), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const bb = Array.from({ length: n - 1 }, (_, i) => x0 + (x1 - x0) * (i + 1) / n);
    const cuts = bb.map(x => C.menu(shape, 'line').find(c => Math.abs(c.a[0] - x) < 1e-6 && Math.abs(c.b[0] - x) < 1e-6));
    is(mode === 'spoke' || cuts.some(c => !c) || !chk(shape, cuts).cp, `${tag}: bounding-box slices do not solve it`);
  }
}));

/* ---------------- (d) level 3 ---------------- */
const L3T = [['shade', 'square', 3, 4], ['shade', 'circle', 2, 3], ['shade', 'rect', 1, 4], ['shade', 'hexagon', 1, 3], ['name', 'rect', 1, 2], ['name', 'circle', 3, 4], ['name', 'triangle', 2, 3], ['name', 'square', 2, 4], ['trap', 'square', 3, 4]];
is(JSON.stringify(C.DATA.L3.map(R => [R[0], R[1], R[3], R[4]])) === JSON.stringify(L3T), 'level 3 is the design\'s nine rounds');
C.DATA.L3.forEach((R, r) => {
  const tag = `L3 #${r + 1} ${R[0]} ${R[1]}`, st = C.newState('name', r, { rnd: () => 0.3 }), gp = gOf(R[1], R[2]);
  is(st.pieces.length === R[4], `${tag}: ${R[4]} pieces`);
  if (R[0] === 'trap') { is(!gEqual(gp), `${tag}: the pieces are not equal`); is(C.check(st).result === 'miss' && C.hint(st).key === 'hintTrap', `${tag}: Check before "Not equal!" is a miss`); is(C.notEqual(st) === 'revealed' && st.kind === 'shade' && gEqual(gOf(R[1], st.cuts)), `${tag}: "Not equal!" reveals real fourths`); is(C.notEqual(st) === 'no', `${tag}: only once`); }
  else is(gEqual(gp), `${tag}: equal pieces`);
  if (st.kind === 'shade') {
    is(C.check(st).result === 'tray' && st.misses === 0, `${tag}: Check with nothing coloured is no miss`);
    C.lift(st, 0); for (let j = 1; j < st.a; j++) is(C.stampOn(st, j).result === 'copy', `${tag}: piece ${j + 1} is a copy`);
    is(C.coloured(st) === st.a && C.kindOf(st) === 'ok', `${tag}: ${st.a} stamped copies = ${st.a}/${st.n}`);
    if (st.a < st.n) { C.stampOn(st, st.a); is(C.kindOf(st) === 'shade', `${tag}: one more is wrong`); C.uncolour(st, st.a); is(C.kindOf(st) === 'ok', `${tag}: a tap uncolours it`); }
  }
  if (R[0] === 'name') {
    is(st.shaded.length === R[3] && new Set(st.shaded).size === R[3], `${tag}: ${R[3]} shaded pieces`);
    is(st.wheels[0] === 1 && st.wheels[1] === 1, `${tag}: the wheels start at 1/1`);
    is(C.kindOf(st) === (R[3] === 1 && R[4] === 1 ? 'ok' : 'name'), `${tag}: 1/1 is wrong`);
    st.wheels = [R[3], R[4]]; is(C.kindOf(st) === 'ok', `${tag}: ${R[3]}/${R[4]} is right`);
    st.wheels = [R[4] - 1 || 1, R[4]]; if (R[4] - 1 !== R[3]) is(C.kindOf(st) === 'name', `${tag}: the number of cuts as the top is wrong`);
    st.wheels = [R[3], R[2].length]; if (R[2].length !== R[4]) is(C.kindOf(st) === 'name', `${tag}: the number of cuts as the bottom is wrong`);
    st.wheels = [1, 2]; is(C.kindOf(st) === (r === 7 ? 'ok' : (R[3] === 1 && R[4] === 2 ? 'ok' : 'name')), `${tag}: 1/2 ${r === 7 ? 'accepted (2/4)' : 'only where it is the answer'}`);
    if (r === 7) { const sq = C.newState('name', 7, { rnd: () => 0.9 }), P = sq.pieces, a = P[sq.shaded[0]], b = P[sq.shaded[1]]; is(Math.hypot(a.cx - b.cx, a.cy - b.cy) > 40, `${tag}: the two shaded triangles are opposite`); }
  }
});
{ let seen = new Set(); for (let t = 0; t < 400; t++) { const st = C.newState('name', 5); seen.add(st.shaded.join()); } is(seen.size >= 4, `L3 name: the shaded pieces are dealt to varied places (${seen.size})`); }

/* ---------------- (e) the state machine ---------------- */
{ const st = C.newState('hf', 0), R = C.DATA.L1[0];
  is(C.check(st).result === 'tray' && st.misses === 0 && C.hint(st).key === 'hintEmpty', 'an empty Check: no miss, hintEmpty');
  is(C.addCut(st, R[4][0]) === 'added' && C.addCut(st, R[3][0]) === 'limit', 'halves: one cut, a second is refused');
  is(C.addCut(st, C.seg([1, 1], [2, 2])) === 'no', 'a cut that is not on the mat is refused');
  let a = C.check(st); is(a.result === 'miss' && a.kind === 'uneq' && C.hint(st).key === 'hintUneq' && st.misses === 1, 'an off-centre chord: hintUneq');
  a = C.check(st); is(st.show === 2 && C.hint(st).key === 'hintGhost', 'miss 2: the gold dots');
  const gd = C.ghost(st); is(gd.length === 2 && gd.every(p => R[3].some(c => kp(c.a) === kp(p) || kp(c.b) === kp(p))), 'the gold dots are the ends of a fair cut');
  is(C.removeCut(st, R[4][0].id) === 'removed' && st.pieces.length === 1, 'tap a cut: it lifts away');
  C.addCut(st, R[3][0]); is(C.check(st).result === 'ok' && st.done && Object.keys(st.tokens).length === 2, 'the diameter: ok, every piece numbered');
  is(C.halve(st) === 'halved' && st.pieces.length === 4 && C.allCopies(st.pieces), 'halve again: four copies'); is(C.halve(st) === 'restored' && st.pieces.length === 2, 'and back');
  is(C.addCut(st, R[4][0]) === 'no', 'no cutting after success'); }
{ const st = C.newState('hf', 1); C.addCut(st, C.DATA.L1[1][3][0]); is(C.check(st).result === 'miss' && st.last === 'count' && C.hint(st).key === 'hintCount', 'two pieces for fourths: hintCount'); is(C.addCut(st, C.DATA.L1[1][3][0]) === 'dup', 'the same cut twice: dup'); }
{ const st = C.newState('thirds', C.DATA.STEP_ROUND), R = C.DATA.L2[C.DATA.STEP_ROUND];
  is(st.step === 1 && st.n === 2, 'L2 #8 opens with halves');
  C.addCut(st, R[3][0]); is(C.check(st).result === 'step' && st.step === 2 && st.n === 4 && !st.done && st.locked === 1, 'halves → the fourths step, the halves cut locked');
  is(C.removeCut(st, R[3][0].id) === 'locked', 'the halves cut stays');
  C.addCut(st, R[3][1]); is(C.check(st).result === 'ok' && st.done, 'fourths from the halves: done'); }
{ const st = C.newState('thirds', 0); C.addCut(st, C.DATA.L2[0][3][0]); is(st.pieces.length === 1, 'a lone spoke splits nothing'); C.addCut(st, C.DATA.L2[0][3][1]); is(st.pieces.length === 2, 'two spokes make two wedges'); }
{ const st = C.newState('hf', 1); C.DATA.L1[1][4].forEach(c => C.addCut(st, c)); C.lift(st, 0); const P = st.pieces, r = C.stampOn(st, P.findIndex((p, i) => i && Math.abs(p.area - P[0].area) > 1));
  is(r.result === 'bigger' || r.result === 'smaller', 'a stamp on a different piece: not a copy'); is(Object.keys(st.tokens).length === 1, 'a non-copy gets no number'); }

/* ---------------- (f) the plan ---------------- */
let seed = 11; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (const lv of ['hf', 'thirds', 'name']) { let prev = null, ok = 0; for (let t = 0; t < 2000; t++) { const P = C.plan(lv, rnd, prev); if (P.order.slice().sort((a, b) => a - b).join() === C.ids(lv).join() && (!prev || P.order.join() !== prev.join()) && (lv !== 'thirds' || P.order[P.order.length - 1] === C.DATA.STEP_ROUND) && (lv !== 'hf' || prev || P.order[0] === 0)) ok++; prev = P.order; } is(ok === 2000, `${lv}: every pass a permutation, never the previous one; L1 #1 opens, L2 #8 last (${ok})`); }
is(C.ids('hf').length >= 7 && C.ids('thirds').length >= 7 && C.ids('name').length >= 7, 'every level has ≥ 7 rounds');

/* ---------------- (g) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'one-piece-stamp-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'one-piece-stamp-core.js'), 'utf8');
for (const k of keys) {
  is(['title', 'instrBubble', 'okBubble', 'tCut2', 'tCut3', 'tCut4', 'ok2', 'ok3', 'ok4'].includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  for (const l of LOCS) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
    if (/^(okShade|okName)$/.test(k)) is(/\{a\}/.test(s) && /\{n\}/.test(s), `${k}.${l}: carries {a} and {n}`);
  }
}
['tCut2', 'tCut3', 'tCut4', 'ok2', 'ok3', 'ok4'].forEach(k => is(BODY.indexOf("'" + k.slice(0, -1)) >= 0 || BODY.indexOf(k.slice(-1) + ": '" + k) >= 0, `${k} is reached through its number`));

console.log(`verify-one-piece-stamp-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

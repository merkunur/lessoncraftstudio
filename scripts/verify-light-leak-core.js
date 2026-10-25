#!/usr/bin/env node
/* =====================================================================
   verify-light-leak-core.js — the gate for ACTIVITY #106, The Light-Leak
   Lantern (1.G.A.2). Its OWN ground truth: the round tables are typed
   here from the design (designs/106-shapeforge.md §6, with the measured
   corrections recorded in docs/activities-rebuild/106-light-leak.md),
   and the gate has its own geometry — real triangle-cell coordinates
   (h = √3/2) turned by real 60° rotations, its own quarter-cell lattice
   with its own point-in-polygon, its own exact-cover solver. The core is
   checked against it, never asked what is true.
     (a) every build round can be sealed exactly with its palette; an
         "exactly these" round only with all of its pieces; a "new way"
         round also with a seam set different from the remembered one;
     (b) the cell lists draw the intended shapes (the regular hexagon, the
         big triangle, the rhombus, trapezoid, parallelogram, long bar);
     (c) level 2: exactly one spare fills each hole under any turn (and
         the parallelogram's flip); a drop-without-turning bot seals ≤ 3
         of the 8; the flip is needed where the design says so;
     (d) shadow rounds: exactly one pane seals without turning or
         flipping, and each decoy is a flip or a turn of it;
     (e) the core's coverage, leaks, overhang, seal and seams agree with
         the gate's on 3,000 random drops across every round;
     (f) the ghost is always inside the light, never on a piece, of a kind
         still in the tray, and leaves a remainder that can still be sealed;
     (g) Check kinds and hints; the plan (L1 #1 #2 open, #8 after #7, #9
         after #6, T7 last, never the previous order, a constant
         generator); the slot of the right spare / pane balanced 3·3·2 per
         pass, P = 1/3 ± 0.04 over 2,000 passes;
     (h) the strings ×11 (no digit in a hint, the count forms, fr narrow
         spaces, fr/it apostrophes, never "free").
   Usage: node scripts/verify-light-leak-core.js   (env LL_CORE_DIR / LL_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const CORE_DIR = process.env.LL_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const ACT_DIR = process.env.LL_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'light-leak-core.js'));
const ACT = (() => { const ctx = { window: {}, LightLeakCore: C, Intl: Intl }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'light-leak-activity.js'), 'utf8') + '\n;this.__A = LightLeakActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ================= the gate's own triangle grid ================= */
const H = Math.sqrt(3) / 2;
const vert = (r, c) => (r + c) % 2 === 0 ? [[c / 2 + 0.5, r * H], [c / 2, (r + 1) * H], [c / 2 + 1, (r + 1) * H]] : [[c / 2, r * H], [c / 2 + 1, r * H], [c / 2 + 0.5, (r + 1) * H]];
const cellAt = (pts) => { const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3, cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3; const r = Math.floor(cy / H + 1e-6), c = Math.round(2 * cx - 1); const back = vert(r, c); const ok = back.every(p => pts.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6)); return ok ? [r, c] : null; };
/* a real 60° turn about the point (0.5, 0) — a lattice point */
const rot60 = (p) => { const x = p[0] - 0.5, y = p[1], a = Math.PI / 3; return [0.5 + x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; };
const gTurn = (cells) => cells.map(rc => cellAt(vert(rc[0], rc[1]).map(rot60)));
const gNorm = (cells) => { let mr = Math.min(...cells.map(x => x[0])), mc = Math.min(...cells.map(x => x[1])); if ((mr + mc) % 2) mc -= 1; return cells.map(x => [x[0] - mr, x[1] - mc]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
const G_SHAPES = { triangle: [[0, 0]], rhombus: [[0, 0], [0, 1]], trapezoid: [[0, 0], [0, 1], [0, 2]], hexagon: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] };
const gOrients = (kind) => { const out = {}; let c = G_SHAPES[kind]; for (let k = 0; k < 6; k++) { const n = gNorm(c); out[JSON.stringify(n)] = n; c = gTurn(c); } return Object.values(out); };
const K = (rc) => rc[0] + ',' + rc[1];
/* every placement of a kind inside a set of free cells */
const gPlacements = (kind, free) => { const out = []; const fk = Object.keys(free); for (const o of gOrients(kind)) for (const f of fk) { const rc = f.split(',').map(Number); for (const q of o) { const dr = rc[0] - q[0], dc = rc[1] - q[1]; if ((dr + dc) % 2) continue; const cs = o.map(x => K([x[0] + dr, x[1] + dc])); if (cs.every(x => free[x])) out.push({ kind, set: cs }); } } const u = {}; return out.filter(p => { const k = p.set.slice().sort().join(';'); if (u[k]) return false; u[k] = 1; return true; }); };

/* ================= the gate's own tangram lattice ================= */
const T_SHAPES = { small: [[0, 0], [1, 0], [0, 1]], medium: [[0, 0], [2, 0], [1, 1]], large: [[0, 0], [2, 0], [0, 2]], square: [[0, 0], [1, 0], [1, 1], [0, 1]], para: [[0, 0], [1, 0], [2, 1], [1, 1]] };
/* winding-number containment (not the core's crossing test) */
const inside = (x, y, poly) => { let w = 0; for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length], cr = (b[0] - a[0]) * (y - a[1]) - (x - a[0]) * (b[1] - a[1]); if (a[1] <= y) { if (b[1] > y && cr > 0) w++; } else if (b[1] <= y && cr < 0) w--; } return w !== 0; };
const Q = { N: [0.5, 0.2], E: [0.8, 0.5], S: [0.5, 0.8], W: [0.2, 0.5] };
const gQuarters = (poly) => { const out = []; const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]); for (let i = Math.min(...xs); i < Math.max(...xs); i++) for (let j = Math.min(...ys); j < Math.max(...ys); j++) for (const q in Q) if (inside(i + Q[q][0], j + Q[q][1], poly)) out.push(i + ',' + j + ',' + q); return out; };
const tTurn = (p) => [-p[1], p[0]], tFlip = (p) => [-p[0], p[1]];
const tNorm = (poly) => { const mx = Math.min(...poly.map(p => p[0])), my = Math.min(...poly.map(p => p[1])); return poly.map(p => [p[0] - mx, p[1] - my]); };
const tOrients = (kind, flips) => { const out = {}; for (let f = 0; f < (flips ? 2 : 1); f++) { let p = T_SHAPES[kind].map(q => f ? tFlip(q) : q); for (let k = 0; k < 4; k++) { const n = tNorm(p); out[JSON.stringify(gQuarters(n).sort())] = n; p = p.map(tTurn); } } return Object.values(out); };
/* a real tan, corner for corner: whole-number corners, the same corner set as one turn (or flip) of the tan */
const realTan = (kind, poly) => { if (!poly.every(q => Number.isInteger(q[0]) && Number.isInteger(q[1]))) return false; const key = (ps) => tNorm(ps).map(q => q.join(',')).sort().join(';'); for (let f = 0; f < 2; f++) { let o = T_SHAPES[kind].map(q => f ? tFlip(q) : q); for (let k = 0; k < 4; k++) { if (key(o) === key(poly)) return true; o = o.map(tTurn); } } return false; };
const tPlacements = (kind, free, flips) => { const out = [], seen = {}; for (const o of tOrients(kind, flips)) { const qs = gQuarters(o); for (const f of Object.keys(free)) { const a = f.split(','); for (const q of qs) { const b = q.split(','), dx = +a[0] - +b[0], dy = +a[1] - +b[1]; const set = qs.map(z => { const c = z.split(','); return (+c[0] + dx) + ',' + (+c[1] + dy) + ',' + c[2]; }); const k = set.slice().sort().join(';'); if (seen[k]) continue; seen[k] = 1; if (set.every(z => free[z])) out.push({ kind, set }); } } } return out; };

/* ================= the gate's own exact cover ================= */
function cover(cells, palette, place, all) {
  const free = {}; cells.forEach(k => { free[k] = 1; });
  const sols = [];
  (function go(freeKeys, pal, acc) {
    if (!freeKeys.length) { sols.push(acc.slice()); return !all; }
    const first = freeKeys.slice().sort()[0], fr = {}; freeKeys.forEach(k => { fr[k] = 1; });
    for (const kind of Object.keys(pal)) { if (!pal[kind]) continue;
      for (const p of place(kind, fr)) { if (p.set.indexOf(first) < 0) continue;
        const rest = freeKeys.filter(k => p.set.indexOf(k) < 0), p2 = Object.assign({}, pal); p2[kind]--;
        if (go(rest, p2, acc.concat([p]))) return true; } }
    return false;
  })(cells, Object.assign({}, palette), []);
  return all ? sols : sols[0] || null;
}

/* ================= the rounds, typed from the design ================= */
const HEX = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]].map(K), BIGT = [[0, 2], [1, 1], [1, 2], [1, 3]].map(K), PAR = [[0, 0], [0, 1], [0, 2], [0, 3]].map(K);
const RH = ['0,0', '0,1'], TZ = ['0,0', '0,1', '0,2'], BAR = ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5'];
const L1 = {
  L1: [RH, { triangle: 2, rhombus: 2 }, 'build'], L2: [TZ, { triangle: 3, rhombus: 2 }, 'build'], L3: [RH, { triangle: 2 }, 'exact'], L4: [TZ, { triangle: 1, rhombus: 1 }, 'exact'],
  L5: [BIGT, { triangle: 3, rhombus: 2 }, 'build'], L6: [PAR, { triangle: 2, rhombus: 3 }, 'build'], L7: [HEX, { triangle: 4, rhombus: 3 }, 'build'],
  L8: [HEX, { triangle: 6, rhombus: 3, trapezoid: 2 }, 'new'], L9: [PAR, { triangle: 4, rhombus: 2 }, 'new'], L10: [PAR, { triangle: 4 }, 'tri'],
  L11: [HEX, { triangle: 4, rhombus: 3 }, 'grow'], L12: [BAR, { triangle: 4, rhombus: 3, trapezoid: 2 }, 'bar']
};
/* the outlines the cell lists must draw, in (side, row-height) units */
const SHAPE_VERTS = {
  rhombus: [RH, [[0.5, 0], [1.5, 0], [1, 1], [0, 1]]], trapezoid: [TZ, [[0.5, 0], [1.5, 0], [2, 1], [0, 1]]],
  hexagon: [HEX, [[0.5, 0], [1.5, 0], [2, 1], [1.5, 2], [0.5, 2], [0, 1]]], triangle: [BIGT, [[1.5, 0], [2.5, 2], [0.5, 2]]],
  para: [PAR, [[0.5, 0], [2.5, 0], [2, 1], [0, 1]]], bar: [BAR, [[0.5, 0], [3.5, 0], [3, 1], [0, 1]]]
};
const outlineCorners = (cells) => { const cnt = {}; cells.forEach(k => { const rc = k.split(',').map(Number), v = vert(rc[0], rc[1]); for (let i = 0; i < 3; i++) { const a = v[i], b = v[(i + 1) % 3], e = [a, b].map(p => p[0].toFixed(3) + ':' + (p[1] / H).toFixed(3)).sort().join('|'); cnt[e] = (cnt[e] || 0) + 1; } }); const adj = {}; Object.keys(cnt).filter(e => cnt[e] === 1).forEach(e => { const [a, b] = e.split('|'); (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); }); return { adj }; };

/* ---- (b) the cell lists draw the intended shapes ---- */
for (const name in SHAPE_VERTS) {
  const [cells, want] = SHAPE_VERTS[name], pts = outlineCorners(cells);
  /* the polygon's corners: boundary points whose two boundary edges are not in line */
  const corners = Object.keys(pts.adj).filter(p => { const a = pts.adj[p]; if (a.length !== 2) return true; const P = p.split(':').map(Number), q1 = a[0].split(':').map(Number), q2 = a[1].split(':').map(Number); const v1 = [q1[0] - P[0], (q1[1] - P[1]) * H], v2 = [q2[0] - P[0], (q2[1] - P[1]) * H]; return Math.abs(v1[0] * v2[1] - v1[1] * v2[0]) > 1e-6; }).map(p => p.split(':').map(Number));
  const ok = want.length === corners.length && want.every(w => corners.some(c => Math.abs(c[0] - w[0]) < 1e-6 && Math.abs(c[1] - w[1]) < 1e-6));
  is(ok, `${name}: the cells draw corners ${JSON.stringify(want)} (got ${JSON.stringify(corners)})`);
}

/* ---- (a) level 1 against the core's table ---- */
const cellsEq = (a, b) => JSON.stringify(a.slice().sort()) === JSON.stringify(b.slice().sort());
is(C.DATA.REAL.length === 12, 'level 1 has 12 rounds');
for (const id in L1) {
  const [cells, pal, cog] = L1[id], R = C.roundOf(id);
  is(R && cellsEq(R.cells.map(K), cells), `${id}: the design's cells`);
  is(R && JSON.stringify(R.palette) === JSON.stringify(pal) && R.cog === cog, `${id}: palette ${JSON.stringify(pal)} · ${cog}`);
  let todo = cells, palL = pal;
  if (id === 'L11') { is(R.locked && R.locked.length === 1 && R.locked[0].kind === 'rhombus' && cellsEq(R.locked[0].cells.map(K), ['0,0', '0,1']), 'L11: one locked rhombus'); todo = cells.filter(k => k !== '0,0' && k !== '0,1'); }
  const sol = cover(todo, palL, gPlacements);
  is(!!sol, `${id}: the gate's own solver seals it with the palette`);
  if (cog === 'exact') { const all = cover(todo, palL, gPlacements, true); is(all.length > 0 && all.every(s => { const n = {}; s.forEach(p => { n[p.kind] = (n[p.kind] || 0) + 1; }); return Object.keys(pal).every(k => n[k] === pal[k]); }), `${id}: every seal uses exactly the listed pieces`); }
  if (cog === 'new') {
    const def = C.DATA.DEFAULT_FILL[R.from], defSeams = C.seamsOf(def);
    const all = cover(todo, palL, gPlacements, true);
    is(all.some(s => JSON.stringify(C.seamsOf(s.map(p => ({ kind: p.kind, cells: p.set.map(x => x.split(',').map(Number)) })))) !== JSON.stringify(defSeams)), `${id}: a filling with other seams exists`);
    is(R.from === (id === 'L8' ? 'L7' : 'L6'), `${id}: remembers ${R.from}`);
  }
}
/* the default fills really seal their source rounds */
for (const src of ['L7', 'L6']) { const f = C.DATA.DEFAULT_FILL[src], set = [].concat(...f.map(p => p.cells.map(K))); is(cellsEq(set, L1[src][0]) && f.every(p => gOrients(p.kind).some(o => cellsEq(gNorm(p.cells).map(K), o.map(K)))), `${src}: the remembered default fill seals it with real pieces`); }

/* ---- seams: the gate's own (edges between two different pieces) ---- */
const gSeams = (pieces) => { const own = {}, seam = {}; pieces.forEach((p, i) => p.cells.forEach(rc => { const v = vert(rc[0], rc[1]); for (let a = 0; a < 3; a++) { const e = [v[a], v[(a + 1) % 3]].map(q => q[0].toFixed(3) + ':' + (q[1] / H).toFixed(3)).sort().join('|'); if (own[e] != null && own[e] !== i) seam[e] = 1; else own[e] = i; } })); return Object.keys(seam).length; };
is(gSeams(C.DATA.DEFAULT_FILL.L7) === C.seamsOf(C.DATA.DEFAULT_FILL.L7).length && C.seamsOf(C.DATA.DEFAULT_FILL.L7).length === 3, 'L7 default fill: 3 seams (gate = core)');
is(C.seamsOf([{ kind: 'hexagon', cells: L1.L7[0].map(k => k.split(',').map(Number)) }]).length === 0, 'one piece has no seams');

/* ---- tangram: areas, classic square, builds ---- */
const TT = {
  T1: [[[0, 0], [1, 0], [1, 1], [0, 1]], { small: 2 }, 'B'], T2: [[[0, 1], [2, 1], [1, 0]], { small: 2 }, 'B'], T3: [[[0, 0], [1, 0], [2, 1], [1, 1]], { small: 2 }, 'B'],
  T4: [[[1, 0], [2, 1], [1, 2], [0, 1]], { medium: 1, small: 2 }, 'A'], T5: [[[0, 0], [2, 0], [2, 1], [0, 1]], { square: 1, small: 2 }, 'B'],
  T6: [[[0, 0], [2, 0], [0, 2]], { medium: 1, small: 2 }, 'B'], T7: [[[0, 2], [2, 0], [4, 2], [2, 4]], { large: 2, medium: 1, square: 1, small: 2, para: 1 }, 'A']
};
const AREA = { small: 2, medium: 4, large: 8, square: 4, para: 4 };
for (const k in T_SHAPES) is(gQuarters(T_SHAPES[k]).length === AREA[k] && C.quarters(C.tanOrient(k, 0, 0)).length === AREA[k], `${k}: ${AREA[k]} quarter-cells (gate = core)`);
is(Object.keys(AREA).reduce((s, k) => s + AREA[k] * ({ large: 2, small: 2 }[k] || 1), 0) === 32, 'the 7 tans make 32 quarters = the full square');
for (const id in TT) {
  const [poly, pal, fr] = TT[id], R = C.roundOf(id), cells = gQuarters(poly);
  is(R && JSON.stringify(R.poly) === JSON.stringify(poly) && JSON.stringify(R.palette) === JSON.stringify(pal) && R.frame === fr, `${id}: the shape, palette and frame`);
  is(cells.length === Object.keys(pal).reduce((s, k) => s + AREA[k] * pal[k], 0), `${id}: the palette's area is the shape's area`);
  is(!!cover(cells, pal, (k, f) => tPlacements(k, f, k === 'para')), `${id}: the gate's own solver seals it`);
  is(cellsEq(C.quarters(R.poly), cells), `${id}: core quarters = gate quarters`);
}
/* the 90° turn is the only legal turn: a 45° turn of a small triangle leaves the lattice */
{ const a = Math.PI / 4, p = T_SHAPES.small.map(q => [q[0] * Math.cos(a) - q[1] * Math.sin(a), q[0] * Math.sin(a) + q[1] * Math.cos(a)]); is(p.some(q => Math.abs(q[0] - Math.round(q[0])) > 0.1 || Math.abs(q[1] - Math.round(q[1])) > 0.1), 'a 45° turn leaves the lattice (why turns are 90°)'); }
/* the classic layout: 7 pieces of the right kinds tile the square */
{ const P = C.DATA.CLASSIC_PIECES, all = [].concat(...P.map(p => gQuarters(p.poly))); is(P.length === 7 && cellsEq(all, gQuarters(TT.T7[0])) && new Set(all).size === 32, 'the classic layout tiles the full square without overlap');
  const kinds = {}; P.forEach(p => { kinds[p.kind] = (kinds[p.kind] || 0) + 1; is(realTan(p.kind, p.poly), `classic ${p.kind} is a real ${p.kind}, corner for corner`); }); is(JSON.stringify(kinds) === JSON.stringify({ large: 2, medium: 1, square: 1, small: 2, para: 1 }), 'classic kinds'); }

/* ---- (c) level 2 ---- */
const MT = {
  M1: ['rhombus', ['triangle', 'trapezoid']], M2: ['trapezoid', ['rhombus', 'hexagon']], M3: ['triangle', ['rhombus', 'trapezoid']], M4: ['rhombus', ['trapezoid', 'triangle']],
  M5: ['medium', ['small', 'large']], M6: ['small', ['medium', 'square']], M7: ['para', ['square', 'medium']], M8: ['medium', ['square', 'small']]
};
let botSeals = 0;
for (const id in MT) {
  const R = C.roundOf(id), [right, others] = MT[id], st = C.newState('missing', id, { pos: 0 }), hole = C.coverage(st).uncovered, tri = R.grid === 'tri';
  is(R.spares[0].kind === right && JSON.stringify(R.spares.slice(1).map(s => s.kind).sort()) === JSON.stringify(others.slice().sort()), `${id}: spares ${right} + ${others}`);
  /* the locked pieces are real pieces and leave exactly the hole */
  const free = {}; hole.forEach(k => { free[k] = 1; });
  if (!tri) R.locked.forEach(p => is(realTan(p.kind, p.poly), `${id}: locked ${p.kind} is a real tan, corner for corner`));
  const fits = (kind) => (tri ? gPlacements(kind, free) : tPlacements(kind, free, kind === 'para')).some(p => p.set.length === hole.length);
  is(fits(right), `${id}: the ${right} fills the hole exactly`);
  others.forEach(o => is(!fits(o), `${id}: the ${o} does not fill it`));
  /* the hole's area tells the size: a small leaks in a medium hole, a large overhangs */
  if (id === 'M5') is(AREA.small < hole.length && AREA.large > hole.length, 'M5: small leaks, large overhangs (size matters)');
  /* drop the right spare exactly as it lies in the tray (no turn, no flip) */
  const s0 = R.spares[0], o = tri ? C.triOrient(s0.kind, s0.rot || 0).map(K) : gQuarters(C.tanOrient(s0.kind, s0.rot || 0, s0.flip || 0));
  const asIs = tri ? gPlacements(s0.kind, free).some(p => { const n = gNorm(p.set.map(x => x.split(',').map(Number))).map(K); return cellsEq(n, o); }) : tPlacements(s0.kind, free, false).some(p => { const mn = p.set.map(z => z.split(',').map(Number)); const mx = Math.min(...mn.map(z => z[0])), my = Math.min(...mn.map(z => z[1])); return cellsEq(p.set.map(z => { const c = z.split(','); return (+c[0] - mx) + ',' + (+c[1] - my) + ',' + c[2]; }), o.map(z => { const c = z.split(','); const ox = Math.min(...o.map(w => +w.split(',')[0])), oy = Math.min(...o.map(w => +w.split(',')[1])); return (+c[0] - ox) + ',' + (+c[1] - oy) + ',' + c[2]; })); });
  if (asIs) botSeals++;
  if (id === 'M4' || id === 'M7' || id === 'M1' || id === 'M2') is(!asIs, `${id}: the right spare does NOT fit as it lies — it must be turned${id === 'M7' ? ' or flipped' : ''}`);
}
is(botSeals <= 3, `a drop-without-turning bot seals ${botSeals} of 8 holes (≤ 3)`);
/* M7: only the FLIP makes the parallelogram fit (no turn alone does) */
{ const st = C.newState('missing', 'M7', { pos: 0 }), free = {}; C.coverage(st).uncovered.forEach(k => { free[k] = 1; }); const sp = st.spares.find(s => s.right);
  /* the spare is dealt mirrored: no turn of the dealt (mirrored) parallelogram fits, a turn of its flip does */
  const mirroredFits = [0, 1, 2, 3].some(r => { const o = gQuarters(C.tanOrient('para', r, 1)); return tPlacements('para', free, true).some(p => { const n = p.set.map(z => z.split(',')); const mx = Math.min(...n.map(z => +z[0])), my = Math.min(...n.map(z => +z[1])); const ox = Math.min(...o.map(z => +z.split(',')[0])), oy = Math.min(...o.map(z => +z.split(',')[1])); return cellsEq(n.map(z => (+z[0] - mx) + ',' + (+z[1] - my) + ',' + z[2]), o.map(z => { const c = z.split(','); return (+c[0] - ox) + ',' + (+c[1] - oy) + ',' + c[2]; })); }); });
  is(sp.flip === 1 && !mirroredFits && tPlacements('para', free, false).length === 1, 'M7: the parallelogram arrives mirrored — only the flip makes it fit'); }

/* ---- (d) shadow rounds ---- */
const SH = { S1: ['B', ['flip', 'turn']], S2: ['B', ['flip', 'turn']], S3: ['A', ['turn', 'turn2']], S4: ['B', ['flip', 'turn']] };
for (const id in SH) {
  const R = C.roundOf(id), tq = gQuarters(R.poly);
  is(R.frame === SH[id][0] && JSON.stringify(R.decoys) === JSON.stringify(SH[id][1]), `${id}: frame ${SH[id][0]}, decoys ${SH[id][1]}`);
  is(cellsEq([].concat(...R.pane.map(p => gQuarters(p.poly))), tq), `${id}: the right pane is exactly the shadow`);
  R.pane.forEach(p => is(realTan(p.kind, p.poly), `${id}: its ${p.kind} is a real tan, corner for corner`));
  (R.locked || []).forEach(p => is(realTan(p.kind, p.poly), `${id}: locked ${p.kind} is a real tan`));
  for (let pos = 0; pos < 3; pos++) {
    const st = C.newState('tangram', id, { pos }), seals = st.panes.map((pn, i) => { C.setPane(st, i); return C.isSealed(st); });
    is(seals.filter(Boolean).length === 1 && seals[pos], `${id} (right pane in slot ${pos}): exactly that pane seals`);
    st.panes.forEach((pn, i) => { if (i === pos) return; is(pn.how === 'flip' || pn.how === 'turn' || pn.how === 'turn2', `${id}: decoy ${i} is a flip or a turn`); });
  }
}

/* ---- (e) the core's light law vs the gate's on random drops ---- */
const rnd = (() => { let s = 2027; return () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648; })();
const allIds = C.ids('glass').concat(C.ids('missing'), C.ids('tangram').filter(x => x[0] === 'T'));
for (let n = 0; n < 3000; n++) {
  const id = allIds[Math.floor(rnd() * allIds.length)], lv = id[0] === 'L' ? 'glass' : id[0] === 'M' ? 'missing' : 'tangram', st = C.newState(lv, id, { pos: 0 }), R = st.R;
  const kinds = st.spares ? st.spares.map(s => s.kind) : Object.keys(st.tray);
  for (let d = 0; d < 1 + Math.floor(rnd() * 4); d++) {
    const k = kinds[Math.floor(rnd() * kinds.length)], src = st.spares ? Object.assign({}, st.spares[kinds.indexOf(k)], { slot: kinds.indexOf(k) }) : { kind: k, rot: Math.floor(rnd() * 6), flip: 0 };
    if (st.spares && st.spares[src.slot].used) continue; if (!st.spares && !(st.tray[k] > 0)) continue;
    const pts = R.cells ? [].concat(...R.cells.map(rc => vert(rc[0], rc[1]))).map(p => [p[0], p[1] / H]) : R.poly;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    C.drop(st, src, Math.min(...xs) - 1 + rnd() * (Math.max(...xs) - Math.min(...xs) + 2), Math.min(...ys) - 1 + rnd() * (Math.max(...ys) - Math.min(...ys) + 2), false);
  }
  /* the gate's own light: target cells not covered, covered cells not in the target, overlaps */
  const tgt = R.cells ? R.cells.map(K) : gQuarters(R.poly), cnt = {};
  st.placed.forEach(p => (p.cells ? p.cells.map(K) : gQuarters(p.poly)).forEach(k => { cnt[k] = (cnt[k] || 0) + 1; }));
  const leak = tgt.filter(k => !cnt[k]).sort(), over = Object.keys(cnt).filter(k => tgt.indexOf(k) < 0).sort(), dup = Object.keys(cnt).filter(k => cnt[k] > 1);
  const cv = C.coverage(st);
  is(JSON.stringify(cv.uncovered.slice().sort()) === JSON.stringify(leak), `${id} drop #${n}: leaks core = gate`);
  is(JSON.stringify(cv.overhang.slice().sort()) === JSON.stringify(over), `${id} drop #${n}: overhang core = gate`);
  is(dup.length === 0 && cv.overlap.length === 0, `${id} drop #${n}: a piece never lands on another`);
  is(C.isSealed(st) === (!leak.length && !over.length), `${id} drop #${n}: sealed iff no leak and no overhang`);
  /* the tray count + placed pieces always add up to the palette */
  if (!st.spares) Object.keys(R.palette).forEach(k => is(st.tray[k] + st.placed.filter(p => !p.locked && p.kind === k).length === R.palette[k], `${id}: tray + placed = palette for ${k}`));
  /* (f) the ghost */
  if (!st.spares && !over.length && leak.length) {
    const g = C.ghost(st);
    if (g) {
      const gs = g.cells ? g.cells.map(K) : gQuarters(g.poly);
      is(gs.every(k => leak.indexOf(k) >= 0), `${id}: the ghost lies inside the light, never on a piece`);
      is(st.tray[g.kind] > 0, `${id}: the ghost is a kind still in the tray`);
      const pal = Object.assign({}, st.tray); pal[g.kind]--;
      is(!!cover(leak.filter(k => gs.indexOf(k) < 0), pal, R.cells ? gPlacements : (k, f) => tPlacements(k, f, k === 'para')), `${id}: after the ghost the rest can still be sealed`);
    } else is(!cover(leak, st.tray, R.cells ? gPlacements : (k, f) => tPlacements(k, f, k === 'para')), `${id}: no ghost only when the rest cannot be sealed from the tray`);
  }
}

/* ---- the flip: only the tangram parallelogram (a trapezoid's mirror is one of its turns) ---- */
{ const st = C.newState('glass', 'L8'); is(C.flipTray(st, 'trapezoid') === 'no', 'no flip for the pattern-block trapezoid'); const mir = G_SHAPES.trapezoid.map(rc => cellAt(vert(rc[0], rc[1]).map(p => [-p[0], p[1]]))); is(gOrients('trapezoid').some(o => cellsEq(gNorm(mir).map(K), o.map(K))), "the trapezoid's mirror is one of its turns"); }
{ const st = C.newState('tangram', 'T7'); is(C.flipTray(st, 'para') === 'flipped' && C.flipTray(st, 'small') === 'no', 'the tangram parallelogram flips; a small triangle does not'); }

/* ---- (g) Check kinds and hints ---- */
{
  const st = C.newState('glass', 'L7'); let a = C.check(st); is(a.result === 'tray' && st.misses === 0 && C.hint(st).key === 'hintEmpty', 'empty Check → hintEmpty, no miss');
  C.drop(st, { kind: 'rhombus', rot: 0 }, 1, 0.5); a = C.check(st); is(a.kind === 'leak' && C.hint(st).key === 'hintLeak', 'a gap → leak');
  a = C.check(st); is(st.show === 2 && C.hint(st).key === 'hintGhost', 'miss 2 → hintGhost');
  const s2 = C.newState('glass', 'L5'); C.drop(s2, { kind: 'rhombus', rot: 0 }, 0.6, 0.5); a = C.check(s2); is(a.kind === 'both', 'a piece half out of the triangle → both (leak + overhang)');
  const s3 = C.newState('glass', 'L1'); C.drop(s3, { kind: 'rhombus', rot: 0 }, 1, 0.5); is(C.check(s3).result === 'ok', 'L1: one rhombus seals the rhombus');
  const s3b = C.newState('glass', 'L1'); C.drop(s3b, { kind: 'rhombus', rot: 0 }, 2, 0.5); const k3 = C.kindOf(s3b); is(k3 === 'both' || k3 === 'over', 'L1: a rhombus one step over → overhang shows');
  const s4 = C.newState('glass', 'L8', { memory: { L7: C.DATA.DEFAULT_FILL.L7 } }); C.DATA.DEFAULT_FILL.L7.forEach(p => { const c = C.triCentre(p.cells); const o = [0, 1, 2, 3, 4, 5].find(r => cellsEq(C.triOrient('rhombus', r).map(K), gNorm(p.cells).map(K))); C.drop(s4, { kind: 'rhombus', rot: o }, c[0], c[1]); });
  is(C.isSealed(s4) && C.check(s4).kind === 'same' && C.hint(s4).key === 'hintSame', 'L8: the same seams as remembered → same');
  C.check(s4); is(C.hint(s4).key === 'hintSame2', 'L8 miss 2 → hintSame2');
  /* a tap-turn keeps a piece in the frame when an in-frame turn exists (it never pushes it out) */
  for (let r0 = 0; r0 < 3; r0++) { const sT = C.newState('glass', 'L7'); const o = C.triOrient('rhombus', r0), want = gOrients('rhombus'); const cand = gPlacements('rhombus', Object.fromEntries(L1.L7[0].map(k => [k, 1]))).find(p => cellsEq(gNorm(p.set.map(x => x.split(',').map(Number))).map(K), o.map(K))); const c0 = C.triCentre(cand.set.map(x => x.split(',').map(Number))); C.drop(sT, { kind: 'rhombus', rot: r0 }, c0[0], c0[1]); void want;
    for (let t = 0; t < 3; t++) { C.turnPiece(sT, sT.placed[0].id); is(sT.placed[0].cells.every(rc => L1.L7[0].indexOf(K(rc)) >= 0), 'L7: a rhombus turned by a tap stays inside the frame (start turn ' + r0 + ', tap ' + (t + 1) + ')'); } }
  /* the OTHER three-rhombus hexagon (the mirrored "cube") is a new way, not the same */
  const all3 = cover(L1.L7[0], { rhombus: 3 }, gPlacements, true).map(s => s.map(p => ({ kind: p.kind, cells: p.set.map(x => x.split(',').map(Number)) })));
  const other = all3.find(s => JSON.stringify(C.seamsOf(s)) !== JSON.stringify(C.seamsOf(C.DATA.DEFAULT_FILL.L7)));
  is(all3.length === 2 && !!other, 'the hexagon has two three-rhombus fillings');
  const s4b = C.newState('glass', 'L8', { memory: { L7: C.DATA.DEFAULT_FILL.L7 } });
  other.forEach(p => { const c = C.triCentre(p.cells); const o = [0, 1, 2, 3, 4, 5].find(r => cellsEq(C.triOrient('rhombus', r).map(K), gNorm(p.cells).map(K))); C.drop(s4b, { kind: 'rhombus', rot: o }, c[0], c[1]); });
  is(C.isSealed(s4b) && C.check(s4b).result === 'ok', 'L8: the mirrored three-rhombus filling is a NEW way (same count of seams, other seams)');
  /* following the ghost in a new-way round always ends in a NEW way (never the remembered seams) */
  for (const id of ['L8', 'L9']) { const sg = C.newState('glass', id, { memory: {} }); let g, n = 0; while ((g = C.ghost(sg)) && n++ < 9) { const c = C.triCentre(g.cells); C.drop(sg, { kind: g.kind, rot: g.rot }, c[0], c[1]); } is(C.isSealed(sg) && C.check(sg).result === 'ok', id + ': the ghost leads to a sealed NEW way'); }
  /* size matters: a small triangle in the medium hole leaks and is refused */
  const sM5 = C.newState('missing', 'M5', { pos: 0 }), iSm = sM5.spares.findIndex(x => x.kind === 'small'), hc = C.polyCentre(C.roundOf('M5').poly);
  C.drop(sM5, Object.assign({}, sM5.spares[iSm], { slot: iSm }), hc[0], hc[1] - 0.4, true);
  is(C.check(sM5).kind === 'spare' && C.coverage(sM5).uncovered.length > 0, 'M5: the small triangle leaks in the medium hole → refused');
  /* M7: flip the parallelogram, then it seals */
  const sM7 = C.newState('missing', 'M7', { pos: 0 }), iP = sM7.spares.findIndex(x => x.right), hole7 = C.coverage(sM7).uncovered.map(q => C.quarterPoly(q)), cx7 = hole7.reduce((s, p) => s + C.polyCentre(p)[0], 0) / hole7.length, cy7 = hole7.reduce((s, p) => s + C.polyCentre(p)[1], 0) / hole7.length;
  is(C.flipSpare(sM7, iP) === 'flipped', 'M7: the parallelogram spare flips');
  C.drop(sM7, Object.assign({}, sM7.spares[iP], { slot: iP }), cx7, cy7, true);
  is(C.isSealed(sM7) && C.check(sM7).result === 'ok', 'M7: flipped and dropped (turned to fit), the lantern seals');
  const s5 = C.newState('missing', 'M3', { pos: 1 }); is(C.check(s5).result === 'tray' && C.hint(s5).key === 'hintHole', 'L2 empty → hintHole');
  const wrong = s5.spares.findIndex(x => !x.right); const c5 = C.coverage(s5).uncovered[0].split(',').map(Number), ctr = C.triCentre([c5]);
  C.drop(s5, Object.assign({}, s5.spares[wrong], { slot: wrong }), ctr[0], ctr[1]); is(C.check(s5).kind === 'spare' && C.hint(s5).key === 'hintSpare', 'L2 wrong spare → hintSpare');
  C.check(s5); is(C.hint(s5).key === 'hintSpare2', 'L2 miss 2 → hintSpare2');
  const s6 = C.newState('tangram', 'S2', { pos: 0 }); is(C.check(s6).result === 'tray' && C.hint(s6).key === 'hintPane', 'shadow empty → hintPane');
  C.setPane(s6, 1); is(C.check(s6).kind === 'shadow' && C.hint(s6).key === 'hintShadow', 'shadow wrong pane → hintShadow'); C.check(s6); is(C.hint(s6).key === 'hintShadow2', 'shadow miss 2 → hintShadow2');
  C.setPane(s6, 0); is(C.check(s6).result === 'ok', 'shadow right pane → ok');
  const s7 = C.newState('glass', 'L11'); is(C.takeOut(s7, s7.placed[0].id) === 'no' && C.turnPiece(s7, s7.placed[0].id) === 'no', 'L11: the riveted piece cannot be taken out or turned');
  const s8 = C.newState('glass', 'L7'); C.drop(s8, { kind: 'rhombus', rot: 0 }, 1, 0.5); const before = JSON.stringify(s8.placed); is(C.drop(s8, { kind: 'rhombus', rot: 0 }, 1, 0.5) === 'placed' && JSON.stringify(s8.placed[1].cells) !== JSON.parse(before)[0].cells && !C.coverage(s8).overlap.length, 'dropping on a piece slides to a free spot, never overlaps');
}

/* ---- (g) the plan ---- */
for (const lv of ['glass', 'missing', 'tangram']) {
  let prev = null;
  for (let p = 0; p < 400; p++) {
    const P = C.plan(lv, rnd, prev), o = P.order, ids = C.ids(lv);
    is(o.length === ids.length && new Set(o).size === ids.length, `${lv} plan: a permutation`);
    if (lv === 'glass') { is(o.indexOf('L8') > o.indexOf('L7') && o.indexOf('L9') > o.indexOf('L6'), 'glass: #8 after #7, #9 after #6'); if (!prev) is(o[0] === 'L1' && o[1] === 'L2', 'glass: #1 and #2 open the first pass'); }
    if (lv === 'tangram') { is(o[o.length - 1] === 'T7', 'tangram: T7 last'); if (!prev) is(o.join() === 'T1,T2,S1,T3,T4,S2,T5,S3,T6,S4,T7', 'tangram: the base sequence opens'); }
    if (prev) is(o.join() !== prev.join(), `${lv}: never the previous order`);
    if (lv !== 'glass') { const cnt = [0, 0, 0]; P.order.forEach((id, i) => { if (lv === 'missing' || id[0] === 'S') cnt[P.pos[i]]++; }); is(Math.max(...cnt) - Math.min(...cnt) <= 1, `${lv}: slots balanced per pass (${cnt})`); }
    prev = o;
  }
  const k = () => 0.5, A = C.plan(lv, k, null), B = C.plan(lv, k, A.order); is(B.order.join() !== A.order.join(), `${lv}: a constant generator still changes the order`);
}
{ /* P(right spare / pane in slot s) over 2,000 passes */
  for (const lv of ['missing', 'tangram']) { const c = [0, 0, 0]; let n = 0; for (let p = 0; p < 2000; p++) { const P = C.plan(lv, rnd, null); P.order.forEach((id, i) => { if (lv === 'tangram' && id[0] !== 'S') return; c[P.pos[i]]++; n++; }); } is(c.every(x => Math.abs(x / n - 1 / 3) <= 0.04), `${lv}: P(right in slot) = ${c.map(x => (x / n).toFixed(3))}`); }
}

/* ---- (h) strings ---- */
const S = ACT.strings, keys = Object.keys(S);
const used = new Set(['title', 'instrBubble', 'okBubble', 'check', 'tFill', 'tExact', 'tNew', 'tTri', 'tGrow', 'tBar', 'tHole', 'tBuild', 'tShadow', 'hintEmpty', 'hintHole', 'hintPane', 'hintLeak', 'hintOver', 'hintBoth', 'hintSame', 'hintSpare', 'hintShadow', 'hintGhost', 'hintSame2', 'hintSpare2', 'hintShadow2', 'okNewHexagon', 'okNewPara', 'usedList', 'okHole', 'okShadow', 'aBench', 'aTray', 'aLeft', 'aSpare', 'aPane', 'aFlip', 'aLive', 'aSealed', 'setLevel', 'lvGlass', 'lvMissing', 'lvTangram', 'setGlass', 'glColour', 'glClear', 'setTurn', 'tuTap', 'tuAuto']);
Object.values(ACT.OKT).forEach(k => used.add(k)); Object.values(ACT.PC).forEach(k => used.add(k)); Object.values(ACT.TASK).forEach(k => used.add(k));
for (const k of used) is(!!S[k], `string ${k} exists`);
for (const k of keys) {
  is(used.has(k), `string ${k} is used`);
  for (const l of LOCS) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (/^pc/.test(k)) is(/^1 [^|]+\|\{n\} .+$/.test(s), `${k}.${l}: "1 x|{n} xs" — «${s}»`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
  }
}
/* every round's task line and success line resolve */
C.DATA.REAL.forEach(R => is(!!S[ACT.TASK[R.cog]] && !!S[ACT.OKT[R.target]], `${R.id}: task + success lines`));
C.DATA.TANGRAM.filter(R => R.kind === 'build').forEach(R => is(!!S[ACT.OKT[R.target]], `${R.id}: success line`));
/* rhombus in fi is "neljäkäs" (vinoneliö = "slanted square" teaches the turn misconception) */
is(/neljäkäs/.test(S.pcRhombus.fi) && !/vinoneli/.test(JSON.stringify(S)), 'fi: neljäkäs, never vinoneliö');

console.log(`verify-light-leak-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

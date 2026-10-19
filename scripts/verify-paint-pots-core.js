#!/usr/bin/env node
/* =====================================================================
   verify-paint-pots-core.js — the model gate for ACTIVITY #37, the Paint
   Pots (K.G.A.2). Its OWN oracle: what a piece IS is re-derived here from
   its points (corners, side lengths, angles, closed, curved, rounded) —
   never from its authored name and never through the core's kindOf; the
   round tables are re-typed from designs/037 §6.
   Env PP_CORE_DIR = a directory holding a (mutated) paint-pots-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.PP_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'paint-pots-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---------- the oracle: a shape from its points ---------- */
const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const cen = (p) => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
function angleAt(p, i) { const a = p[(i + p.length - 1) % p.length], b = p[i], c = p[(i + 1) % p.length]; const u = [a[0] - b[0], a[1] - b[1]], v = [c[0] - b[0], c[1] - b[1]]; return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; }
function oracle(pc) {
  if (pc.open) return null;                                   /* a gap: not a shape */
  if (pc.curve) {
    if (pc.t === 'heart') return 'heart';
    if (pc.t === 'semi') return null;                           /* two corners and a curved side */
    const c = cen(pc.pts), r = pc.pts.map(q => d(q, c)), lo = Math.min(...r), hi = Math.max(...r);
    if (hi - lo < hi * 0.02) return 'circle';
    const sym = pc.pts.every(q => pc.pts.some(z => d(z, [2 * c[0] - q[0], 2 * c[1] - q[1]]) < hi * 0.03));
    return sym ? 'oval' : null;
  }
  if (pc.rounded || pc.curvedSide != null) return null;          /* rounded corners / a curved side */
  const p = pc.pts, n = p.length, s = p.map((q, i) => d(q, p[(i + 1) % n])), a = p.map((q, i) => angleAt(p, i));
  const eq = s.every(x => Math.abs(x - s[0]) < s[0] * 0.02), right = a.every(x => Math.abs(x - 90) < 1.5);
  if (n === 3) return 'triangle';
  if (n === 4) return eq && right ? 'square' : right ? 'rectangle' : eq ? 'diamond' : null;
  if (n === 5) return 'pentagon';
  if (n === 6) return 'hexagon';
  if (n === 10) { const c = cen(p), r = p.map(q => d(q, c)); if (r.every((x, i) => i % 2 ? x < r[0] * 0.7 : x > r[1] * 1.4)) return 'star'; }
  return null;
}
const takes = (tin, pc) => { const k = oracle(pc); return k === tin || (tin === 'rectangle' && k === 'square'); };

/* ---------- geometry helpers for the stage ---------- */
function segDist(p, q, r, s) {
  const dd = (a, b, c) => { const vx = c[0] - b[0], vy = c[1] - b[1], l = vx * vx + vy * vy, t = l ? Math.max(0, Math.min(1, ((a[0] - b[0]) * vx + (a[1] - b[1]) * vy) / l)) : 0; return Math.hypot(a[0] - b[0] - t * vx, a[1] - b[1] - t * vy); };
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const x1 = cross(p, q, r), x2 = cross(p, q, s), x3 = cross(r, s, p), x4 = cross(r, s, q);
  if (((x1 > 0) !== (x2 > 0)) && ((x3 > 0) !== (x4 > 0))) return 0;
  return Math.min(dd(p, r, s), dd(q, r, s), dd(r, p, q), dd(s, p, q));
}
function inside(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > pt[1]) !== (b[1] > pt[1]) && pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
function gap(A, B) { let m = Infinity; for (let i = 0; i < A.length; i++) for (let j = 0; j < B.length; j++) m = Math.min(m, segDist(A[i], A[(i + 1) % A.length], B[j], B[(j + 1) % B.length])); if (A.some(p => inside(p, B)) || B.some(p => inside(p, A))) return -1; return m; }
/* how far inside a parent an inset sits (smallest distance to the parent's edge; -1 if any point is outside) */
function margin(child, parent) { if (!child.every(p => inside(p, parent))) return -1; let m = Infinity; child.forEach(p => { for (let j = 0; j < parent.length; j++) m = Math.min(m, segDist(p, p, parent[j], parent[(j + 1) % parent.length])); }); return m; }

/* ---------- 1. the oracle against hand-built figures (positive + negative) ---------- */
const mk = (s) => C.build(Object.assign({ x: 200, y: 200, a: 0, id: 'z' }, s));
const CASES = [
  [{ t: 'square', w: 80, a: 45 }, 'square'], [{ t: 'square', w: 80, a: 0, open: true }, null], [{ t: 'tri', w: 80, a: 180 }, 'triangle'], [{ t: 'tri', w: 80, rounded: true }, null],
  [{ t: 'tri', w: 80, curved: 1 }, null], [{ t: 'rect', w: 40, h: 120, a: 30 }, 'rectangle'], [{ t: 'rhombus', w: 70, a: 60 }, 'diamond'], [{ t: 'rhombus', w: 70, ang: 90 }, 'square'], [{ t: 'rhombus', w: 70, ang: 60, a: 90 }, 'diamond'],
  [{ t: 'para', w: 80, h: 50, k: 0.4 }, null], [{ t: 'trap', w: 90, h: 50, top: 50 }, null], [{ t: 'kite', w: 70, h: 100 }, null], [{ t: 'circle', w: 80 }, 'circle'], [{ t: 'oval', w: 90, h: 50 }, 'oval'],
  [{ t: 'egg', w: 70, h: 90 }, null], [{ t: 'cring', w: 80 }, null], [{ t: 'semi', w: 90, h: 90 }, null], [{ t: 'hex', w: 90, a: 13 }, 'hexagon'], [{ t: 'hex-irr', w: 90, h: 80 }, 'hexagon'], [{ t: 'hept', w: 90 }, null],
  [{ t: 'oct', w: 90 }, null], [{ t: 'pent', w: 90 }, 'pentagon'], [{ t: 'star', w: 90, a: 20 }, 'star'], [{ t: 'heart', w: 80, h: 70 }, 'heart'], [{ t: 'cutcorner', w: 80, h: 80 }, null], [{ t: 'square', w: 70, curved: 1 }, null]
];
CASES.forEach(([s, want]) => { const pc = mk(s); is(oracle(pc) === want, `oracle: ${JSON.stringify(s)} → ${want} (got ${oracle(pc)})`); is(C.kindOf(pc) === want, `core kindOf: ${JSON.stringify(s)} → ${want} (got ${C.kindOf(pc)})`); });
/* a square turned any way stays a square; a rectangle any way a rectangle */
for (let a = 0; a < 360; a += 15) { is(C.accepts('square', mk({ t: 'square', w: 70, a })), `square at ${a}° takes square paint`); is(C.accepts('rectangle', mk({ t: 'rect', w: 40, h: 110, a })), `rectangle 1:2.75 at ${a}° takes rectangle paint`); is(C.accepts('triangle', mk({ t: 'tri-iso', w: 50, h: 110, a })), `skinny triangle at ${a}°`); }
for (const w of [44, 70, 140]) is(C.accepts('square', mk({ t: 'square', w })) && C.accepts('circle', mk({ t: 'circle', w })), `size ${w}: square and circle`);
/* the core decides from geometry, not from the authored name */
is(!C.accepts('square', mk({ t: 'square', w: 70, open: true })) && !C.accepts('triangle', mk({ t: 'tri', w: 80, rounded: true })), 'an open square and a rounded triangle are refused');
is(!C.accepts('square', Object.assign(mk({ t: 'rect', w: 80, h: 60 }), { t: 'square' })), 'a 4:3 rectangle relabelled "square" is still refused');

/* ---------- 2. the boards (design §6, re-typed) ---------- */
const PIC = { house: ['triangle', 2, 'square', 4], rocket: ['triangle', 4, 'circle', 2], fish: ['oval', 3, 'triangle', 3], sailboat: ['triangle', 3, 'rectangle', 2], beehive: ['hexagon', 5, 'oval', 3],
  train: ['square', 3, 'circle', 4], robot: ['square', 3, 'heart', 2], lighthouse: ['star', 4, 'diamond', 3], garden: ['pentagon', 3, 'circle', 4] };
const QUI = { 'q-tri-1': ['triangle', 4], 'q-rect-1': ['rectangle', 3], 'q-sq-1': ['square', 3], 'q-circle-1': ['circle', 2], 'q-hex-1': ['hexagon', 3], 'q-tri-2': ['triangle', 4], 'q-rect-2': ['rectangle', 3], 'q-sq-2': ['square', 4] };
const CNT = { cat: [4, 2], tree: [6, 1], castle: [3, 3], bird: [5, 2], firs: [7, 1], windmill: [2, 4], boat: [6, 3] };
const seenK = new Set();
for (const b of ['picture', 'quilt', 'count']) {
  const rs = C.rounds(b), B = C.BOARD[b];
  is(rs.length === (b === 'picture' ? 9 : b === 'quilt' ? 8 : 7), `${b}: the round count`);
  let firstTop = 0;
  for (const r of rs) {
    const ps = C.piecesOf(r), T = C.targets(r);
    /* the targets, by the oracle */
    r.tins.forEach(t => { const want = ps.filter(pc => takes(t, pc)).map(pc => pc.id).sort().join(); is(T[t].slice().sort().join() === want, `${r.id}: the ${t} pieces (oracle ${want})`); });
    if (b === 'picture') {
      const P = PIC[r.id]; is(!!P, `${r.id}: in the design table`); if (!P) continue;
      is(r.tins.slice().sort().join() === [P[0], P[2]].sort().join(), `${r.id}: tins ${P[0]} + ${P[2]}`);
      is(T[P[0]].length === P[1] && T[P[2]].length === P[3], `${r.id}: ${P[1]} ${P[0]}s and ${P[3]} ${P[2]}s (got ${T[P[0]].length}, ${T[P[2]].length})`);
      if (r.tins[0] === P[0]) firstTop++;
      seenK.add(P[0]); seenK.add(P[2]);
      /* every target kind in ≥ 2 sizes and (non-round) ≥ 2 orientations */
      r.tins.forEach(t => {
        const ts = ps.filter(pc => T[t].indexOf(pc.id) >= 0), sizes = new Set(ts.map(pc => Math.round(C.minWidth(pc) / 6))), /* a turn = which way the piece points: the direction from its centre to its first corner (round: its long axis, mod 180) */
        turns = new Set(ts.map(pc => { const c = cen(pc.pts); if (pc.curve) { const far = pc.pts.reduce((m, q) => d(q, c) > d(m, c) ? q : m); return Math.round(((Math.atan2(far[1] - c[1], far[0] - c[0]) * 180 / Math.PI) % 180 + 180) % 180 / 10); } return Math.round(Math.atan2(pc.pts[0][1] - c[1], pc.pts[0][0] - c[0]) * 180 / Math.PI / 10); }));
        is(sizes.size >= 2, `${r.id}: the ${t}s come in ≥ 2 sizes`);
        if (t !== 'circle') is(turns.size >= 2, `${r.id}: the ${t}s come in ≥ 2 turns (${[...turns]})`);
      });
      is(ps.filter(pc => !r.tins.some(t => T[t].indexOf(pc.id) >= 0)).length >= 2, `${r.id}: ≥ 2 pieces for no tin`);
      /* targets are not all in one half */
      const all = r.tins.map(t => T[t]).flat().map(id => ps.find(p => p.id === id));
      is(all.some(p => p.cx < B.W / 2) && all.some(p => p.cx >= B.W / 2) && all.some(p => p.cy < B.H / 2) && all.some(p => p.cy >= B.H / 2), `${r.id}: targets spread over both halves, both ways`);
    }
    if (b === 'quilt') {
      const Q = QUI[r.id]; is(r.tins.length === 1 && r.tins[0] === Q[0] && T[Q[0]].length === Q[1], `${r.id}: ${Q[1]} real ${Q[0]}s`);
      is(ps.length === 8 && T[Q[0]].length >= 2 && T[Q[0]].length <= 4, `${r.id}: eight patches, 2–4 real`);
      /* the real ones are not all on one row of the quilt */
      const rows = new Set(T[Q[0]].map(id => Math.floor(C.cellOf(r, id) / 4))); is(rows.size === 2, `${r.id}: real ones on both rows`);
      ps.forEach(pc => { const cell = C.cellOf(r, pc.id), x0 = (cell % 4) * 110, y0 = Math.floor(cell / 4) * 150; is(pc.pts.every(p => p[0] > x0 + 4 && p[0] < x0 + 106 && p[1] > y0 + 4 && p[1] < y0 + 146), `${r.id}: ${pc.id} inside its patch`); is(C.minWidth(pc) >= 30, `${r.id}: ${pc.id} visible (≥ 30 px)`); });
    }
    if (b === 'count') {
      const N = CNT[r.id]; is(T.triangle.length === N[0] && T.square.length === N[1] && r.want.triangle === N[0] && r.want.square === N[1], `${r.id}: ${N[0]} triangles, ${N[1]} squares`);
      is(ps.filter(pc => !T.triangle.includes(pc.id) && !T.square.includes(pc.id)).length >= 1, `${r.id}: one other piece`);
    }
    /* no square in a round with a rectangle or a diamond tin */
    if (r.tins.includes('rectangle') || r.tins.includes('diamond')) is(!ps.some(pc => oracle(pc) === 'square'), `${r.id}: no square beside a ${r.tins.join('/')} tin`);
    /* the stage: inside the board, wide enough to tap, no touching except a deliberate inset */
    if (b !== 'quilt') {
      ps.forEach(pc => {
        is(pc.pts.every(p => p[0] >= 7 && p[0] <= B.W - 7 && p[1] >= 7 && p[1] <= B.H - 7), `${r.id}: ${pc.id} (${pc.t}) clear of the board's frame (7 px: the frame is 3 px thick)`);
        is(C.minWidth(pc) >= 68, `${r.id}: ${pc.id} (${pc.t}) ≥ 68 px wide (${C.minWidth(pc).toFixed(1)}) — 44 px on a 320 phone`);
      });
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const A = ps[i], Bq = ps[j];
        if (Bq.inset === A.id) { is(margin(Bq.pts, A.pts) >= 4, `${r.id}: ${Bq.id} sits inside ${A.id} with a margin (${margin(Bq.pts, A.pts).toFixed(1)})`); continue; }
        if (A.inset === Bq.id) { is(margin(A.pts, Bq.pts) >= 4, `${r.id}: ${A.id} inside ${Bq.id}`); continue; }
        const g = gap(A.pts, Bq.pts); is(g >= 3, `${r.id}: ${A.id} (${A.t}) and ${Bq.id} (${Bq.t}) do not touch (gap ${g.toFixed(1)})`);
      }
    }
  }
  if (b === 'picture') { is(Math.abs(firstTop - rs.length / 2) <= 1, `picture: the tin order is shuffled (first tin on top in ${firstTop} of ${rs.length})`); is(seenK.size === 10, `picture: all ten shapes are used (${[...seenK]})`); }
}
/* the diamonds are rhombi, never a turned square */
C.rounds('picture').forEach(r => C.piecesOf(r).filter(pc => oracle(pc) === 'diamond').forEach(pc => { const a = pc.pts.map((q, i) => angleAt(pc.pts, i)); is(a.every(x => Math.abs(x - 90) > 10), `${r.id}: the diamond ${pc.id} has no square corners`); }));
/* count values: triangles 2–7, squares 1–4, never 0, no two rounds alike */
{ const v = C.rounds('count').map(r => r.want), tri = new Set(v.map(x => x.triangle)), sq = new Set(v.map(x => x.square));
  is([2, 3, 4, 5, 6, 7].every(n => tri.has(n)) && [1, 2, 3, 4].every(n => sq.has(n)) && v.every(x => x.triangle > 0 && x.square > 0), 'count: triangles 2–7 and squares 1–4 all appear, never 0');
  is(new Set(v.map(x => x.triangle + '/' + x.square)).size === v.length, 'count: no two rounds share both counts'); }

/* ---------- 3. the state rules ---------- */
{
  const r = C.rounds('picture').find(x => x.id === 'house'), T = C.targets(r), ps = C.piecesOf(r), st = C.newState(r);
  const tri = r.tins.indexOf('triangle'), sq = r.tins.indexOf('square'), other = ps.find(pc => !T.triangle.includes(pc.id) && !T.square.includes(pc.id)).id;
  is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintStart', 'Check with nothing painted asks — not a miss');
  is(!C.paint(st, T.square[0]), 'no tin chosen: nothing is painted');
  C.pickTin(st, tri); is(C.paint(st, other) === 'paint' && st.painted[other] === tri, 'paint is WET at the tap, whatever the piece — nothing judged yet');
  C.paint(st, T.triangle[0]);
  is(C.paint(st, other) === 'lift' && st.painted[other] == null, 'a painted piece is lifted back');
  C.paint(st, other);
  let res = C.check(st);
  is(res.result === 'wrong' && res.shed.includes(other) && st.set[T.triangle[0]] === tri && st.painted[other] == null, 'Check: the wrong piece sheds, the right one sets');
  is(st.help === 1 && C.hint(st) === 'hintWrong', 'miss 1 with a wrong piece: count its corners');
  C.pickTin(st, tri); C.paint(st, T.triangle[1]);
  is(st.help === 0, 'a new paint clears the showing');
  res = C.check(st); is(res.result === 'wrong' && res.missing.length === T.square.length && C.hint(st) === 'hintMore' && st.set[T.triangle[0]] === tri, 'squares missing — one more; the set triangle stays set');
  res = C.check(st); is(st.help === 2 && C.hint(st) === 'hintGlow', 'miss 2: paint the glowing pieces');
  is(!C.paint(st, T.triangle[0]), 'a set piece is not re-painted');
  C.pickTin(st, sq); T.square.forEach(p => C.paint(st, p));
  is(C.check(st).result === 'ok' && st.done, 'every piece in its tin: the picture is done');
  /* an open piece leaks */
  const q = C.rounds('quilt')[0], qp = C.piecesOf(q), open = qp.find(pc => pc.open), qs = C.newState(q);
  C.pickTin(qs, 0); C.paint(qs, open.id); const qr = C.check(qs);
  is(qr.leak.includes(open.id) && C.hint(qs) === 'hintLeak', 'an open triangle leaks: "a shape must be closed"');
  /* a round shape shed by a circle tin: look at its edge */
  const cq = C.rounds('quilt').find(x => x.id === 'q-circle-1'), cp = C.piecesOf(cq), ov = cp.find(pc => pc.t === 'oval'), cs = C.newState(cq);
  C.pickTin(cs, 0); C.paint(cs, ov.id); C.check(cs); is(C.hint(cs) === 'hintWrongRound', 'an oval in a circle tin: look at its edge');
  /* the miss hint names the attribute that differs */
  const why = (tin, sp) => C.whyNot(tin, mk(sp));
  is(why('diamond', { t: 'kite', w: 78, h: 110 }) === 'hintSides', 'a kite in a diamond tin: look at the sides (it HAS 4 corners)');
  is(why('square', { t: 'rect', w: 80, h: 60 }) === 'hintSides', 'a rectangle in a square tin: the sides');
  is(why('square', { t: 'rhombus', w: 62, ang: 60 }) === 'hintRight', 'a rhombus in a square tin: the corners are not square');
  is(why('rectangle', { t: 'para', w: 70, h: 52, k: 0.4 }) === 'hintRight', 'a parallelogram in a rectangle tin: the corners');
  is(why('triangle', { t: 'kite', w: 70, h: 100 }) === 'hintWrong' && why('hexagon', { t: 'pent', w: 90 }) === 'hintWrong', 'a kite in a triangle tin / a pentagon in a hexagon tin: count the corners');
  is(why('triangle', { t: 'tri', w: 80, rounded: true }) === 'hintBent' && why('triangle', { t: 'tri', w: 80, curved: 1 }) === 'hintBent', 'rounded / curved: bent or round');
  is(why('circle', { t: 'oval', w: 90, h: 58 }) === 'hintWrongRound', 'an oval in a circle tin: the edge');
  is(why('triangle', { t: 'circle', w: 80 }) === 'hintCurve' && why('hexagon', { t: 'oval', w: 90, h: 60 }) === 'hintCurve', 'a circle in a triangle tin / an oval in a hexagon tin: it is round, the tin has corners');
  is(why('circle', { t: 'hex', w: 86 }) === 'hintCornersRound' && why('heart', { t: 'square', w: 70 }) === 'hintCornersRound', 'a hexagon in a circle tin / a square in a heart tin: it has corners');
  /* count */
  const cr = C.rounds('count')[0], ct = C.targets(cr), cst = C.newState(cr);
  cr.tins.forEach((t, i) => { C.pickTin(cst, i); ct[t].forEach(p => C.paint(cst, p)); });
  is(C.check(cst).result === 'empty' && C.hint(cst) === 'hintCount' && cst.misses === 0, 'count: painted, numbers unset — asks, no miss');
  cst.count.triangle = cr.want.triangle + 1; cst.count.square = cr.want.square;
  is(C.check(cst).result === 'wrong' && C.hint(cst) === 'hintCountOne', 'count: one too many triangles — count them one by one');
  is(C.setCount(cst, 'triangle', -1) && cst.help === 0 && C.check(cst).result === 'ok', 'count: the right numbers win');
  { const z = C.newState(cr); z.count.triangle = 1; is(!C.setCount(z, 'triangle', -1) && z.count.triangle === 1, 'count: from 1, − refuses — counting never reaches 0'); }
}

/* ---------- 4. the words ---------- */
const ctx = { window: {}, PaintPotsCore: C }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'paint-pots-activity.js'), 'utf8') + '\n;this.__A = PaintPotsActivity;', ctx);
const S = ctx.__A.strings;
const need = ['title', 'instruction', 'pPicture', 'pCount', 'pQuiltClue', 'check', 'hintStart', 'hintCount', 'hintMoreTin', 'hintWrong', 'hintWrongRound', 'hintLeak', 'hintSides', 'hintRight', 'hintBent', 'hintCurve', 'hintCornersRound', 'hintMoreTinRound', 'ariaCorner1', 'hintGlow', 'hintCountOne', 'hintCountNum', 'setLabels', 'lShape', 'lName', 'lClue', 'setBoard', 'bPicture', 'bQuilt', 'bCount', 'ariaPiece', 'ariaPainted', 'ariaBare', 'ariaCorners', 'ariaRound', 'ariaTin', 'ariaMore', 'ariaLess'];
C.KINDS.forEach(k => need.push('n_' + k, 'clue_' + k, 'hintMore_' + k));
['triangle', 'rectangle', 'square', 'circle', 'hexagon'].forEach(k => need.push('pQuilt_' + k));
['picture', 'quilt', 'count'].forEach(b => C.rounds(b).forEach(r => need.push('ok_' + r.id)));
for (const k of need) for (const l of L) is(S[k] && typeof S[k][l] === 'string' && S[k][l].trim(), `string ${k}.${l}`);
/* the success lines carry the true numbers */
C.rounds('picture').forEach(r => { const T = C.targets(r); r.tins.forEach(t => is(S['ok_' + r.id].en.includes(T[t].length + ' ' + t), `ok_${r.id}: "${T[t].length} ${t}…"`)); });
C.rounds('count').forEach(r => L.forEach(l => is(S['ok_' + r.id][l].includes(String(r.want.triangle)) && S['ok_' + r.id][l].includes(String(r.want.square)), `ok_${r.id}.${l}: the counts`)));
C.rounds('quilt').forEach(r => { const n = C.targets(r)[r.tins[0]].length; L.forEach(l => is(S['ok_' + r.id][l].includes(String(n)), `ok_${r.id}.${l}: ${n}`)); });
/* the riddles never name their shape (clue mode) */
is(/corner of a book/.test(S.clue_square.en) && /not square/.test(S.clue_diamond.en) && !/lean/.test(S.clue_diamond.en), 'the square riddle names square corners; the diamond riddle says its corners are not square (not that it leans)');
is(!/turned/.test(S.hintMore_circle.en), 'a circle is never "turned"');
C.KINDS.forEach(k => L.forEach(l => is(!new RegExp('(?<!\\p{L})' + S['n_' + k][l] + '(?!\\p{L})', 'iu').test(S['clue_' + k][l]), `clue_${k}.${l} does not name the shape`)));
for (const k in S) for (const l of L) { const s = S[k][l] || ''; is(!/  /.test(s) && !/undefined|\{(?!k\}|n\})/.test(s), `${k}.${l}: clean`); if (l === 'fr') is(!/ [!?:;]/.test(s), `${k}.fr: U+202F`); is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit\w*|libre|livre|libero|frei|vrij|ledig|vapaa|ilmai\w*)(?!\p{L})/iu.test(s), `${k}.${l}: no "free" word`); }

/* ---------- 5. order + layout ---------- */
{ const mkr = (sd) => () => { sd = (sd * 1103515245 + 12345) >>> 0; return (sd >>> 8) / 16777216; };
  for (const b of ['picture', 'quilt', 'count']) { const pool = C.rounds(b); for (let sd = 1; sd <= 40; sd++) { const o1 = C.order(pool, mkr(sd), null), o2 = C.order(pool, mkr(sd), o1); is(o1.slice().sort((x, y) => x - y).join() === pool.map((_, i) => i).join() && o2.join() !== o1.join(), `${b}: seed ${sd} — a permutation, never the last one again`); } } }
for (let W = 288; W <= 1100; W += 16) for (const b of ['picture', 'quilt', 'count']) {
  const Lo = C.layout(b, W), B = C.BOARD[b], used = B.W * Lo.scale + (Lo.mode === 'wide' ? Lo.gap + Lo.side : 0);
  is(used <= W, `${b} @${W}: fits (${used.toFixed(0)})`);
  if (b !== 'quilt') is(68 * Lo.scale >= 44, `${b} @${W}: the smallest piece is a ≥ 44 px tap (${(68 * Lo.scale).toFixed(1)})`); else is(Math.min(102 * Lo.scale, 142 * Lo.scale) >= 44, `quilt @${W}: a patch is a ≥ 44 px tap`);
  is(Lo.tinW >= 96 || (Lo.mode === 'narrow' && Lo.tinH >= 80), `${b} @${W}: tins ≥ 80–96 px`);
}
console.log(`verify-paint-pots-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

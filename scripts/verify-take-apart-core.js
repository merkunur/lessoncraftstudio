#!/usr/bin/env node
/* =====================================================================
   verify-take-apart-core.js — the gate for ACTIVITY #105, The Take-Apart
   Tray (1.G.A.1). Its OWN ground truth: the shape catalogue, the round
   tables and the riddles' attribute lists are typed here from the design
   (docs/activities-rebuild/designs/105-sort-bins.md §6), and every shape's
   attributes are recomputed with this file's own geometry (edges, closure,
   curvature, equal sides, square corners) — the core is never asked what
   is true, only checked against it.
     (a) every level-1 round splits true / false exactly as the design and
         the gate's geometry say; (b) each round has a disguised true and a
         nearly false, 2–4 trues; the "4 shapes" shelf keeps both;
     (c) level 2: exactly one tile names the shape, "rectangle" is never a
         wrong tile for a square; (d) level 3: exactly one of the three
         shapes fits the riddle, and the riddle's digits (11 locales) are
         the attribute numbers;
     (e) turning, stretching and painting never change the take-apart
         (1,000 random transforms); cups = stick ends ÷ 2 (a hoop: none),
         an open corner is an EMPTY cup, a bent stick is never straight;
     (f) a prototype-matching bot (nearest outline at r0 s1.0) fails at
         least one shape in every level-1 round;
     (g) the phone size floor: small < medium < big kept, the smallest box
         ≥ the floor at every width;
     (h) answer position: per slot P(true) within the true share ± 0.06
         over 2,000 deals, two disguised trues never both at the ends,
         colours never follow the answer; level 2's right tile sits in each
         slot 2–3 times a pass, level 3's answer 3 times;
     (i) Check / hint kinds, the plan (never the previous order; level 1
         opens on round 1), and the strings ×11 (no hint carries a digit —
         a hint never prints a count or an answer).
   Usage: node scripts/verify-take-apart-core.js   (env TA_CORE_DIR / TA_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const CORE_DIR = process.env.TA_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const ACT_DIR = process.env.TA_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'take-apart-core.js'));
const ACT = (() => { const ctx = { window: {}, TakeApartCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'take-apart-activity.js'), 'utf8') + '\n;this.__A = TakeApartActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---- the catalogue, typed from the design ---- */
const reg = (n, r) => { const p = []; for (let i = 0; i < n; i++) { const a = 2 * Math.PI * i / n; p.push([50 + r * Math.sin(a), 50 - r * Math.cos(a)]); } return p; };
const P = (v, o = {}) => ({ v, arcs: o.arcs || {}, open: o.open || [] });
const TE = [[50, 8], [94, 84], [6, 84]];
const G = {
  tri_equi: P(TE), tri_right: P([[12, 12], [12, 88], [88, 88]]), tri_obtuse: P([[6, 72], [94, 72], [36, 48]]),
  tri_skinny: P([[50, 4], [62, 96], [38, 96]]), tri_scalene: P([[4, 60], [96, 80], [40, 22]]),
  tri_open: P(TE, { open: [1] }), tri_curved: P(TE, { arcs: { 1: 14 } }),
  half_circle: { v: [[4, 27], [96, 27]], arcs: { 1: 46 }, open: [], semi: true },
  quad_square: P([[15, 15], [85, 15], [85, 85], [15, 85]]), quad_rect: P([[5, 30], [95, 30], [95, 70], [5, 70]]),
  quad_rhombus: P([[50, 5], [90, 50], [50, 95], [10, 50]]), quad_trap: P([[25, 25], [75, 25], [95, 80], [5, 80]]),
  quad_para: P([[25, 25], [95, 25], [75, 75], [5, 75]]), quad_kite: P([[50, 5], [85, 40], [50, 95], [15, 40]]),
  quad_dart: P([[50, 5], [90, 92], [50, 64], [10, 92]]),
  pent_reg: P(reg(5, 46)), pent_house: P([[20, 45], [50, 10], [80, 45], [80, 92], [20, 92]]), pent_irreg: P([[10, 40], [55, 8], [92, 35], [80, 92], [22, 85]]),
  hex_reg: P(reg(6, 46)), hex_irreg: P([[2, 50], [20, 18], [82, 22], [98, 50], [70, 90], [24, 84]]),
  hex_L: P([[10, 10], [45, 10], [45, 60], [90, 60], [90, 90], [10, 90]]), hex_open: P(reg(6, 46), { open: [0] }),
  circle: { hoop: [46, 46] }, oval: { hoop: [46, 30] }
};
/* the gate's own attributes */
function attrs(id) {
  const g = G[id];
  if (g.hoop) return { straight: 0, curved: 1, corners: 0, empty: 0, square: 0, closed: true, equal: false, round: g.hoop[0] === g.hoop[1] };
  const n = g.v.length, edges = g.semi ? 2 : n;
  let straight = 0, curved = 0; const lens = [];
  /* a stick that ends at an open corner stops GAP (10, design: the sticks stop short of each other) before it */
  for (let i = 0; i < edges; i++) { if (g.arcs[i]) curved++; else { straight++; const a = g.v[i], b = g.v[(i + 1) % n]; lens.push(Math.hypot(b[0] - a[0], b[1] - a[1]) - 10 * (g.open.includes(i) + g.open.includes((i + 1) % n))); } }
  let area = 0; for (let i = 0; i < n; i++) { const p = g.v[i], q = g.v[(i + 1) % n]; area += p[0] * q[1] - q[0] * p[1]; }
  let square = 0;
  if (!curved) for (let k = 0; k < n; k++) {
    if (g.open.includes(k)) continue;
    const p = g.v[(k + n - 1) % n], q = g.v[k], r = g.v[(k + 1) % n];
    const u = [p[0] - q[0], p[1] - q[1]], w = [r[0] - q[0], r[1] - q[1]];
    let ang = Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))) * 180 / Math.PI;
    const turn = (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]);
    if (turn * area < 0) ang = 360 - ang;
    if (Math.abs(ang - 90) < 2) square++;
  }
  const corners = (g.semi ? 2 : n) - g.open.length;
  const equal = lens.length > 1 && Math.max(...lens) / Math.min(...lens) <= 1.01;
  return { straight, curved, corners, empty: g.open.length, square, closed: g.open.length === 0, equal };
}
const SIDES = { triangle: 3, quadrilateral: 4, pentagon: 5, hexagon: 6 };
const truth = (id, target) => { const a = attrs(id); return target === 'circle' ? !!a.round : a.closed && !a.curved && a.straight === SIDES[target]; };

/* ---- the rounds, typed from the design (T = true ones, F = false ones) ---- */
const L1 = [
  ['triangle', 'tri_equi r0 s1.0|tri_right r90 s0.55|tri_obtuse r180 s0.8', 'quad_square r45 s0.8|tri_open r0 s1.0|pent_reg r0 s0.55'],
  ['quadrilateral', 'quad_square r0 s0.55|quad_rect r30 s1.0|quad_trap r180 s0.8', 'tri_equi r0 s0.8|pent_house r0 s0.8|hex_reg r0 s0.55'],
  ['pentagon', 'pent_reg r36 s0.8|pent_house r180 s1.0', 'tri_right r0 s0.8|quad_rhombus r0 s0.8|hex_irreg r0 s1.0|circle r0 s0.55'],
  ['hexagon', 'hex_reg r0 s0.55|hex_irreg r90 s1.0|hex_L r0 s0.8', 'tri_obtuse r0 s0.8|quad_para r0 s1.0|pent_reg r0 s0.8'],
  ['triangle', 'tri_skinny r0 s1.0|tri_scalene r200 s0.55', 'quad_rect r0 s0.8|tri_curved r0 s1.0|quad_trap r180 s0.8|half_circle r270 s0.8'],
  ['quadrilateral', 'quad_rhombus r0 s0.8|quad_para r150 s0.55|quad_dart r0 s0.8|quad_kite r20 s1.0', 'tri_right r0 s0.8|oval r0 s1.0'],
  ['pentagon', 'pent_reg r0 s0.55|pent_house r90 s0.8|pent_irreg r0 s1.0', 'tri_equi r0 s0.8|quad_square r45 s1.0|hex_irreg r0 s0.8'],
  ['hexagon', 'hex_reg r30 s1.0|hex_irreg r0 s0.55', 'tri_right r0 s0.8|quad_rect r0 s1.0|hex_open r0 s0.8|pent_irreg r180 s0.8'],
  ['circle', 'circle r0 s0.55|circle r0 s1.0', 'oval r0 s0.8|half_circle r0 s0.8|hex_reg r0 s0.8|tri_curved r0 s0.8']
];
const NAMES = { triangle: (a) => a.closed && !a.curved && a.straight === 3, square: (a) => a.closed && !a.curved && a.straight === 4 && a.equal && a.square === 4,
  rectangle: (a) => a.closed && !a.curved && a.straight === 4 && a.square === 4, pentagon: (a) => a.closed && !a.curved && a.straight === 5,
  hexagon: (a) => a.closed && !a.curved && a.straight === 6, circle: (a) => !!a.round, halfcircle: (a) => a.straight === 1 && a.curved === 1 && a.closed };
const L2 = [['tri_obtuse r180 s0.8', 'triangle'], ['quad_square r45 s0.8', 'square'], ['quad_rect r90 s1.0', 'rectangle'], ['hex_irreg r0 s1.0', 'hexagon'], ['pent_house r0 s0.8', 'pentagon'], ['half_circle r0 s0.8', 'halfcircle'], ['tri_skinny r150 s1.0', 'triangle'], ['circle r0 s0.55', 'circle'], ['quad_rect r0 s0.55', 'rectangle']];
const L3 = [
  [{ straight: 3, corners: 3 }, 'tri_equi'], [{ straight: 4, equal: true, square: 4 }, 'quad_square'], [{ straight: 4, square: 4, equal: false }, 'quad_rect'],
  [{ closed: true, straight: 3 }, 'tri_obtuse'], [{ straight: 5, corners: 5 }, 'pent_house'], [{ straight: 6 }, 'hex_L'],
  [{ straight: 1, curved: 1 }, 'half_circle'], [{ corners: 0, straight: 0 }, 'circle'], [{ straight: 4, equal: true, square: 0 }, 'quad_rhombus']
];
const id = (t) => t.split(' ')[0];
const parse = (t) => { const p = t.split(' '); return { id: p[0], r: +p[1].slice(1), s: +p[2].slice(1) }; };
const disg = (t) => { const p = parse(t), r = ((p.r % 360) + 360) % 360; return (r >= 90 && r <= 270) || p.s <= 0.55 || ['tri_skinny', 'tri_scalene', 'quad_dart', 'hex_L'].includes(p.id); };
const near = (t, target) => { const a = attrs(id(t)); if (!a.closed || a.curved) return true; return target !== 'circle' && Math.abs(a.straight - SIDES[target]) === 1; };

/* ---- the catalogue: the core's points are the design's points ---- */
for (const k in G) {
  const c = C.DATA.CAT[k]; is(!!c, `catalogue has ${k}`); if (!c) continue;
  if (G[k].hoop) { is(c.hoop && c.hoop.rx === G[k].hoop[0] && c.hoop.ry === G[k].hoop[1], `${k}: hoop ${G[k].hoop}`); continue; }
  is(c.v.length === G[k].v.length && c.v.every((p, i) => Math.abs(p[0] - G[k].v[i][0]) < 1e-6 && Math.abs(p[1] - G[k].v[i][1]) < 1e-6), `${k}: the design's points`);
  is(JSON.stringify(c.open) === JSON.stringify(G[k].open), `${k}: open corners ${G[k].open}`);
  const ca = C.counts(k + ' r0 s1'), ga = attrs(k);
  for (const f of ['straight', 'curved', 'corners', 'empty', 'square', 'closed', 'equal']) is(ca[f] === ga[f], `${k}: ${f} core ${ca[f]} ≠ gate ${ga[f]}`);
}
is(Object.keys(C.DATA.CAT).length === Object.keys(G).length, 'no extra catalogue shapes');
/* the obtuse triangle is obtuse (the critic's fix) */
{ const v = G.tri_obtuse.v, a = [v[0][0] - v[2][0], v[0][1] - v[2][1]], b = [v[1][0] - v[2][0], v[1][1] - v[2][1]]; const ang = Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180 / Math.PI; is(ang > 110 && ang < 125, `tri_obtuse apex ≈ 119° (${ang.toFixed(1)})`); }

/* ---- (e) the take-apart ---- */
for (const k in G) {
  const T = C.takeApart(k + ' r0 s1'), a = attrs(k);
  is(T.cups.length === T.ends / 2, `${k}: cups = stick ends ÷ 2`);
  if (G[k].hoop) { is(T.cups.length === 0 && T.sticks.length === 1 && T.sticks[0].curved, `${k}: one hoop, no cups`); continue; }
  is(T.sticks.length === a.straight + a.curved, `${k}: ${a.straight + a.curved} sticks`);
  is(T.cups.length === (G[k].semi ? 2 : G[k].v.length), `${k}: a cup per corner place`);
  is(T.cups.filter(u => !u.filled).length === G[k].open.length, `${k}: ${G[k].open.length} empty cup(s)`);
  is(T.sticks.filter(s => s.curved).length === a.curved, `${k}: ${a.curved} bent stick(s), never counted straight`);
  for (let i = 1; i < T.sticks.length; i++) is(T.sticks[i - 1].len >= T.sticks[i].len - 1e-9, `${k}: sticks longest first`);
}
{ const T = C.takeApart('tri_open r0 s1'); const lens = T.sticks.map(s => s.len); is(lens.filter(l => l < 87).length === 2, 'tri_open: the two sticks at the open corner are short of it'); }
const rnd = (() => { let s = 12345; return () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648; })();
for (let n = 0; n < 1000; n++) {
  const ks = Object.keys(G), k = ks[Math.floor(rnd() * ks.length)], r = Math.round(rnd() * 359), s = 0.5 + rnd() * 0.6;
  const a = C.counts({ id: k, r: r, s: s, colour: C.DATA.COLOURS[n % 6] }), g = attrs(k);
  is(a.straight === g.straight && a.curved === g.curved && a.corners === g.corners && a.empty === g.empty && a.square === g.square && a.equal === g.equal, `${k} r${r} s${s.toFixed(2)}: the take-apart never changes`);
  const L0 = C.takeApart(k + ' r0 s1').sticks, L1s = C.takeApart({ id: k, r: r, s: s }).sticks;
  is(L1s.every((x, i) => Math.abs(x.len - L0[i].len * s) < 1e-6), `${k}: stick lengths scale with the stretch only`);
}

/* ---- (a)(b) level 1 ---- */
is(C.DATA.REAL.length === L1.length, `level 1 has ${L1.length} rounds`);
L1.forEach(([target, Ts, Fs], r) => {
  const R = C.DATA.REAL[r], tr = Ts.split('|'), fa = Fs.split('|');
  is(R && R.target === target, `L1 #${r + 1}: target ${target}`);
  is(R && JSON.stringify(R.items.slice().sort()) === JSON.stringify(tr.concat(fa).sort()), `L1 #${r + 1}: the design's six shapes`);
  tr.forEach(t => { is(truth(id(t), target), `L1 #${r + 1}: gate says ${t} is a ${target}`); is(C.belongs(t, target), `L1 #${r + 1}: core accepts ${t}`); });
  fa.forEach(t => { is(!truth(id(t), target), `L1 #${r + 1}: gate says ${t} is not a ${target}`); is(!C.belongs(t, target), `L1 #${r + 1}: core refuses ${t}`); });
  is(tr.length >= 2 && tr.length <= 4, `L1 #${r + 1}: 2–4 trues`);
  is(tr.some(disg), `L1 #${r + 1}: a disguised true`);
  is(fa.some(t => near(t, target)), `L1 #${r + 1}: a nearly false`);
  const four = C.shelfItems(r, 4);
  is(four.length === 4 && four.some(t => tr.includes(t) && disg(t)) && four.some(t => fa.includes(t) && near(t, target)) && four.some(t => tr.includes(t)) && four.some(t => fa.includes(t)), `L1 #${r + 1}: "4 shapes" keeps a disguised true and a nearly false (${four.join(', ')})`);
  is(C.shelfItems(r, 6).length === 6, `L1 #${r + 1}: 6 shapes`);
});

/* ---- (f) the prototype bot: nearest outline at r0 s1.0 (raster IoU), must fail in every round ---- */
function raster(t) {
  const p = parse(t), g = G[p.id], set = new Set(), a = -p.r * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  for (let y = 0; y < 100; y += 1) for (let x = 0; x < 100; x += 1) {
    /* un-transform the sample into model space (rotate about 50,50, scale about 50,50) */
    const dx = (x + 0.5 - 50) / p.s, dy = (y + 0.5 - 50) / p.s, mx = 50 + dx * ca - dy * sa, my = 50 + dx * sa + dy * ca;
    let inside = false;
    if (g.hoop) inside = ((mx - 50) / g.hoop[0]) ** 2 + ((my - 50) / g.hoop[1]) ** 2 <= 1;
    else if (g.semi) inside = my >= 27 && ((mx - 50) / 46) ** 2 + ((my - 27) / 46) ** 2 <= 1;
    else { const v = g.v; for (let i = 0, j = v.length - 1; i < v.length; j = i++) if ((v[i][1] > my) !== (v[j][1] > my) && mx < (v[j][0] - v[i][0]) * (my - v[i][1]) / (v[j][1] - v[i][1]) + v[i][0]) inside = !inside; }
    if (inside) set.add(y * 100 + x);
  }
  return set;
}
const iou = (A, B) => { let i = 0; for (const x of A) if (B.has(x)) i++; return i / (A.size + B.size - i); };
const PROTOS = { triangle: raster('tri_equi r0 s1.0'), quadrilateral: raster('quad_square r0 s1.0'), pentagon: raster('pent_reg r0 s1.0'), hexagon: raster('hex_reg r0 s1.0'), circle: raster('circle r0 s1.0') };
L1.forEach(([target, Ts, Fs], r) => {
  let wrong = 0; const tr = Ts.split('|');
  for (const t of tr.concat(Fs.split('|'))) {
    const R = raster(t); let best = null, bv = -1; for (const k in PROTOS) { const v = iou(R, PROTOS[k]); if (v > bv) { bv = v; best = k; } }
    if ((best === target) !== tr.includes(t)) wrong++;
  }
  is(wrong >= 1, `L1 #${r + 1}: the look-alike bot fails ${wrong} shape(s) (must be ≥ 1)`);
});

/* ---- (c) level 2 ---- */
is(C.DATA.NAME.length === L2.length, 'level 2 has 9 rounds');
L2.forEach(([shape, name], r) => {
  const N = C.DATA.NAME[r], a = attrs(id(shape));
  is(N && N.shape === shape && N.name === name, `L2 #${r + 1}: ${shape} → ${name}`);
  is(NAMES[name](a), `L2 #${r + 1}: the gate agrees it is a ${name}`);
  is(N.tiles.length === 4 && new Set(N.tiles).size === 4, `L2 #${r + 1}: 4 distinct tiles`);
  is(N.tiles.filter(t => NAMES[t](a)).length === 1, `L2 #${r + 1}: exactly one tile names it (${N.tiles.filter(t => NAMES[t](a))})`);
  if (NAMES.square(a)) is(!N.tiles.includes('rectangle'), `L2 #${r + 1}: "rectangle" is never a wrong tile for a square`);
  N.tiles.forEach(t => is(!!ACT.NAMEKEY[t] && !!ACT.strings[ACT.NAMEKEY[t]], `L2 #${r + 1}: tile ${t} has a name string`));
});

/* ---- (d) level 3 ---- */
is(C.DATA.RIDDLE.length === L3.length, 'level 3 has 9 riddles');
const fits = (t, A) => { const a = attrs(id(t)); return Object.keys(A).every(k => a[k] === A[k]); };
L3.forEach(([A, ans], r) => {
  const Q = C.DATA.RIDDLE[r];
  is(Q && JSON.stringify(Q.attrs) === JSON.stringify(A), `L3 #${r + 1}: attributes ${JSON.stringify(A)}`);
  is(Q && id(Q.answer) === ans, `L3 #${r + 1}: answer ${ans}`);
  const three = [Q.answer].concat(Q.others);
  is(three.filter(t => fits(t, A)).length === 1 && fits(Q.answer, A), `L3 #${r + 1}: exactly the answer fits (${three.filter(t => fits(t, A))})`);
  is(three.filter(t => C.satisfies(t, Q.attrs)).length === 1, `L3 #${r + 1}: the core agrees`);
  const want = Object.values(A).filter(v => typeof v === 'number' && v > 0).sort().join(',');
  for (const l of LOCS) { const s = ACT.strings['rd' + (r + 1)][l]; const got = (s.match(/\d+/g) || []).sort().join(','); is(got === want, `L3 #${r + 1} [${l}]: digits ${got} = attributes ${want} — «${s}»`); }
});
is(id(C.DATA.RIDDLE[5].answer) === 'hex_L', 'riddle 6 answers with the L-shaped hexagon');

/* ---- (h) answer position ---- */
for (let r = 0; r < L1.length; r++) for (const count of [6, 4]) {
  const N = 2000, tr = L1[r][1].split('|'), slotT = [], colT = {}, colF = {}; let ends = 0, nT = 0, nF = 0;
  let n0 = 0;
  for (let k = 0; k < N; k++) {
    const d = C.dealReal(r, count, rnd); n0 = d.length;
    d.forEach((it, i) => { slotT[i] = (slotT[i] || 0) + (it.truth ? 1 : 0); if (it.truth) { colT[it.colour] = (colT[it.colour] || 0) + 1; nT++; } else { colF[it.colour] = (colF[it.colour] || 0) + 1; nF++; } is(it.truth === tr.includes(it.key), `deal: truth of ${it.key}`); });
    if (d[0].truth && disg(d[0].key) && d[d.length - 1].truth && disg(d[d.length - 1].key)) ends++;
  }
  const share = C.shelfItems(r, count).filter(t => tr.includes(t)).length / n0;
  is(slotT.every(c => Math.abs(c / N - share) <= 0.06), `L1 #${r + 1} (${count}): every slot holds a true ≈ ${share.toFixed(2)} (${slotT.map(c => (c / N).toFixed(2)).join(' ')})`);
  /* the ends get no rule of their own: a "never both ends" rule measured as a position tell (ends 35–40 % true vs 55–60 % mid) */
  const kT = Math.round(share * n0), shelfT = C.shelfItems(r, count).filter(t => tr.includes(t));
  if (shelfT.every(disg)) { const pBoth = (kT / n0) * ((kT - 1) / (n0 - 1)); is(Math.abs(ends / N - pBoth) <= 0.03, `L1 #${r + 1} (${count}): both ends hold a (disguised) true ${(ends / N).toFixed(3)} ≈ ${pBoth.toFixed(3)}, like any two slots`); }
  is(C.DATA.COLOURS.every(c => Math.abs((colT[c] || 0) / nT - (colF[c] || 0) / nF) <= 0.06), `L1 #${r + 1} (${count}): colours never follow the answer`);
}
for (const lv of ['name', 'riddle']) for (let p = 0; p < 200; p++) {
  const P = C.plan(lv, rnd, null), cnt = [0, 0, 0, 0];
  P.pos.forEach(x => cnt[x]++);
  if (lv === 'name') is(cnt.every(c => c === 2 || c === 3), `L2 plan: the right tile sits 2–3 times in every slot (${cnt})`);
  else is(cnt.slice(0, 3).every(c => c === 3), `L3 plan: the answer sits 3 times in every slot (${cnt})`);
}
for (let k = 0; k < 9; k++) for (let pos = 0; pos < 4; pos++) { const st = C.newState('name', k, { pos: pos, rnd: rnd }); is(st.tiles[pos] === st.name && st.tiles.length === 4, `L2 #${k + 1}: the right tile at slot ${pos}`); }
for (let k = 0; k < 9; k++) for (let pos = 0; pos < 3; pos++) { const st = C.newState('riddle', k, { pos: pos, rnd: rnd }); is(st.answer === pos && st.items[pos].key === C.DATA.RIDDLE[k].answer, `L3 #${k + 1}: the answer at slot ${pos}`); }

/* ---- (g) the size floor ---- */
for (const box of [80, 88, 96, 100, 132, 148]) for (const floor of [58, 60]) {
  const s = C.sizeOf(0.55, box, floor), m = C.sizeOf(0.8, box, floor), b = C.sizeOf(1.0, box, floor);
  is(s >= Math.min(floor, box) - 1e-9 && s < m && m < b && Math.abs(b - box) < 1e-9, `size floor at box ${box}: ${s.toFixed(1)} < ${m.toFixed(1)} < ${b.toFixed(1)}`);
}

/* ---- (i) Check, hints, plan ---- */
{
  const st = C.newState('real', 0, { rnd: rnd });
  let a = C.check(st); is(a.result === 'tray' && st.misses === 0, 'L1: Check with shapes on the shelf is no miss');
  is(C.hint(st).key === 'hintPlace', 'L1: hintPlace');
  st.items.forEach((it, i) => C.place(st, i, it.truth ? 'yes' : 'no'));
  const tIdx = st.items.findIndex(x => x.truth); C.place(st, tIdx, 'no');
  a = C.check(st); is(a.result === 'miss' && a.kind === 'turn' && st.misses === 1 && C.hint(st).key === 'hintTurn', 'L1: a true one in "not" → hintTurn');
  C.place(st, tIdx, 'yes'); const o = st.items.findIndex(x => x.id === 'tri_open'); C.place(st, o, 'yes');
  a = C.check(st); is(a.kind === 'open' && st.show === 2 && C.hint(st).key === 'hintBoth', 'L1: the open one in "yes" at miss 2 → hintBoth');
  is(C.protoOf(st) === 'tri_equi r0 s1.0', 'L1 miss 2 lays the triangle prototype');
  C.place(st, o, 'no'); a = C.check(st); is(a.result === 'ok' && st.done, 'L1: all right → ok');
}
{
  const kinds = {}; for (let r = 0; r < 9; r++) { const st = C.newState('real', r, { rnd: rnd }); st.items.forEach((it, i) => C.place(st, i, it.truth ? 'yes' : 'no')); st.items.forEach((it, i) => { if (it.truth) return; C.place(st, i, 'yes'); const k = C.kindOf(st); kinds[k] = 1; st.show = 1; st.last = k; const h = C.hint(st); is(h && ACT.strings[h.key], `L1 #${r + 1}: ${it.key} in "yes" → ${k} → ${h && h.key}`); const nm = C.namesOf(it)[0]; if (nm === 'open') is(k === 'open', `${it.key}: open`); if ((nm === 'curved' || nm === 'halfcircle') && st.target !== 'circle') is(k === 'bent', `${it.key}: bent`); C.place(st, i, 'no'); }); }
  is(['open', 'bent', 'count', 'circle', 'oval'].every(k => kinds[k]), `every false kind is reached (${Object.keys(kinds)})`);
}
{
  const st = C.newState('name', 2, { pos: 1, rnd: rnd }); is(C.check(st).result === 'tray' && C.hint(st).key === 'hintName', 'L2: no tile → hintName, no miss');
  C.choose(st, 'square'); let a = C.check(st); is(a.kind === 'name' && C.hint(st).key === 'hintLine2', 'L2: square for a rectangle → hintLine2');
  a = C.check(st); is(C.protoOf(st) === 'quad_square r0 s1.0' && C.hint(st).key === 'hintBoth', 'L2 miss 2 lays the chosen name\'s prototype');
  C.choose(st, 'rectangle'); is(C.check(st).result === 'ok', 'L2: rectangle → ok');
  const s2 = C.newState('name', 7, { pos: 0, rnd: rnd }); C.choose(s2, 'halfcircle'); C.check(s2); is(C.hint(s2).key === 'hintBent2', 'L2: circle mis-named → hintBent2');
  const s3 = C.newState('name', 4, { pos: 0, rnd: rnd }); C.choose(s3, 'hexagon'); C.check(s3); is(C.hint(s3).key === 'hintCount2', 'L2: pentagon mis-named → hintCount2');
}
{
  const st = C.newState('riddle', 1, { pos: 2, rnd: rnd }); is(C.check(st).result === 'tray' && C.hint(st).key === 'hintFrame', 'L3: empty frame → hintFrame');
  C.frame(st, 0); C.check(st); is(C.hint(st).key === 'hintRiddle1', 'L3 miss 1 → hintRiddle1'); C.check(st); is(C.hint(st).key === 'hintRiddle2' && C.protoOf(st) === null, 'L3 miss 2 → hintRiddle2, no prototype (it would show the answer)');
  C.frame(st, 2); is(C.check(st).result === 'ok', 'L3: the answer → ok');
}
{
  const st = C.newState('real', 0, { rnd: rnd }); is(C.tap(st, 2) === 'apart' && st.tray === 2 && st.sel === 2, 'tap: apart and chosen'); is(C.tap(st, 2) === 'together' && st.tray === null, 'tap again: together');
}
for (const lv of ['real', 'name', 'riddle']) {
  let prev = null; for (let p = 0; p < 300; p++) { const P = C.plan(lv, rnd, prev); is(P.order.length === 9 && new Set(P.order).size === 9, `${lv} plan: a permutation`); if (prev) is(P.order.join() !== prev.join(), `${lv} plan: never the previous order`); else if (lv === 'real') is(P.order[0] === 0, 'level 1 opens on round 1'); prev = P.order; }
  const constant = () => 0.5, P1 = C.plan(lv, constant, null), P2 = C.plan(lv, constant, P1.order); is(P2.order.join() !== P1.order.join(), `${lv} plan: a constant generator still changes the order`);
}

/* ---- strings ×11 ---- */
const S = ACT.strings, keys = Object.keys(S);
const used = new Set(['title', 'instrBubble', 'okBubble', 'check', 'tName', 'tRiddle', 'hintPlace', 'hintName', 'hintFrame', 'hintTurn', 'hintOpen', 'hintCircle', 'hintOval', 'hintCount2', 'hintLine2', 'hintBent2', 'hintRiddle1', 'hintBoth', 'hintRiddle2', 'aShape', 'szS', 'szM', 'szL', 'tuUp', 'tuTurned', 'aTray', 'aTrayRead', 'aShelf', 'aFrame', 'aSlot', 'aPaint', 'aTurn', 'aStretch', 'setLevel', 'lvReal', 'lvName', 'lvRiddle', 'setTray', 'trOpen', 'trHelp', 'setShapes', 'sh6', 'sh4']);
for (const t of ['Tri', 'Quad', 'Pent', 'Hex', 'Circ']) ['tReal', 'bxYes', 'bxNo', 'ok'].forEach(p => used.add(p + t));
for (const t of ['Tri', 'Quad', 'Pent', 'Hex']) ['bent', 'cnt'].forEach(p => used.add(p + t));
for (const t of ['Tri', 'Square', 'Rect', 'Pent', 'Hex', 'Circ', 'Half']) { used.add('nm' + t); used.add('ok2' + t); }
for (let i = 1; i <= 9; i++) { used.add('rd' + i); used.add('ok3_' + i); }
for (const c of ['Coral', 'Teal', 'Sun', 'Plum', 'Sky', 'Leaf']) used.add('col' + c);
for (const k of used) is(!!S[k], `string ${k} exists`);
for (const k of keys) {
  is(used.has(k), `string ${k} is used`);
  for (const l of LOCS) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`);
    if (!s) continue;
    if (/^(hint|bent|cnt)/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit — «${s}»`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
  }
}
/* the box labels: two different phrases; the fi quadrilateral box is never the fi square tile */
for (const t of ['Tri', 'Quad', 'Pent', 'Hex', 'Circ']) for (const l of LOCS) is(S['bxYes' + t][l] !== S['bxNo' + t][l], `box labels differ (${t}, ${l})`);
is(S.bxYesQuad.fi.toLowerCase() !== S.nmSquare.fi.toLowerCase(), 'fi: nelikulmio (box) ≠ neliö (tile)');
for (const l of LOCS) { const tiles = ['Tri', 'Square', 'Rect', 'Pent', 'Hex', 'Circ', 'Half'].map(t => S['nm' + t][l].toLowerCase()); is(new Set(tiles).size === 7, `${l}: seven different name tiles`); }

console.log(`verify-take-apart-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

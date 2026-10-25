#!/usr/bin/env node
/* =====================================================================
   verify-fair-mobile-core.js — the gate for ACTIVITY #107, The Fair
   Mobile (1.G.A.3). Its OWN ground truth: the cards and the round tables
   are typed here from the design (designs/107-choice-board.md §6), and
   the gate has its own geometry — every shape as an analytic inside-test,
   every cut as its own line-side / ray-sector classifier, piece weights
   measured by sampling a 0.25-unit grid — and its own statics. The core
   is checked against it, never asked what is true.
     (a) every card's pieces: the same count, the same weights (± 0.006)
         and the same left-to-right order (by centroid x, ties by y) as
         the gate measures; the pieces cover the shape exactly once;
     (b) the mobiles are honest: the gate's own moments equal the core's
         angles, and over 10,000 random weight sets each mobile hangs
         level exactly when every share is equal (halves, fourths with
         its top bar AND both sub-bars, thirds pivoted at a third);
         a massless empty mobile hangs level;
     (c) every level-1/2 round: exactly one card — the first in the table —
         hangs fair on the asked mobile; every unequal distractor has a
         largest/smallest share ≥ 1.25 and tips ≥ 6°; every wrong-count
         card leaves spare pieces or bare hooks;
     (d) level 3: every card's shares are equal and exactly one of the
         three mobiles has one hook per share;
     (e) the deal: the right card / mobile in its slot, the rest the table's;
     (f) Check kinds, misses and hints (an empty mobile is never a miss;
         the help steps to the springs at miss 2); a hung card in free
         play swings at once;
     (g) the plan: L1 #1 opens the first pass, never the previous order;
         the right slot balanced (L1 3·4, L2 2·4, L3 3·3·2 with the
         leftover at random, P = 2/3 ± 0.04 over 3,000 passes);
     (h) the strings ×11 (no digit in a hint, fr narrow spaces, fr/it
         apostrophes, never "free", every key used).
   Usage: node scripts/verify-fair-mobile-core.js   (env FM_CORE_DIR / FM_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const CORE_DIR = process.env.FM_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const ACT_DIR = process.env.FM_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'fair-mobile-core.js'));
const ACT = (() => { const ctx = { window: {}, FairMobileCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'fair-mobile-activity.js'), 'utf8') + '\n;this.__A = FairMobileActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---------------- the gate's own shapes and cuts (design §6) ---------------- */
const HT = 92 * Math.sqrt(3) / 2;
const INSIDE = {
  circle: (x, y) => (x - 50) ** 2 + (y - 50) ** 2 <= 46 * 46,
  square: (x, y) => x >= 8 && x <= 92 && y >= 8 && y <= 92,
  rectangle: (x, y) => x >= 4 && x <= 96 && y >= 22 && y <= 78,
  triangle: (x, y) => { const top = 50 - HT / 2, base = 50 + HT / 2; return y >= top && y <= base && Math.abs(x - 50) <= (y - top) / HT * 46; },
  hexagon: (x, y) => Math.abs(y - 50) <= HT / 2 && Math.abs(x - 50) <= 46 - Math.abs(y - 50) / Math.sqrt(3)
};
const TRI_CY = 50 - HT / 2 + 2 * HT / 3;
const vx = (x) => ({ line: [x, -10, x, 110] }), hy = (y) => ({ line: [-10, y, 110, y] }), dg = { line: [0, 0, 100, 100] }, ad = { line: [0, 100, 100, 0] };
const rays = (cx, cy, a) => ({ rays: [cx, cy, a] });
const G_CARDS = {
  'circle-halves-v': ['circle', [vx(50)]], 'circle-halves-h': ['circle', [hy(50)]], 'circle-halves-diag': ['circle', [dg]], 'circle-halves-uneq': ['circle', [vx(50 - 18.4)]],
  'circle-fourths': ['circle', [vx(50), hy(50)]], 'circle-fourths-diag': ['circle', [dg, ad]], 'circle-fourths-uneq': ['circle', [vx(50 - 13.8), hy(50 - 11.5)]],
  'circle-thirds': ['circle', [rays(50, 50, [-90, 30, 150])]], 'circle-thirds-uneq': ['circle', [rays(50, 50, [-90, 0, 120])]], 'circle-notsplit': ['circle', []],
  'sq-halves-v': ['square', [vx(50)]], 'sq-halves-h': ['square', [hy(50)]], 'sq-halves-diag': ['square', [dg]], 'sq-halves-uneq': ['square', [vx(8 + 26.88)]],
  'sq-fourths-grid': ['square', [vx(50), hy(50)]], 'sq-fourths-diag': ['square', [dg, ad]], 'sq-fourths-uneq': ['square', [vx(8 + 29.4), hy(8 + 33.6)]],
  'sq-thirds-strips': ['square', [vx(36), vx(64)]], 'sq-thirds-y': ['square', [rays(50, 50, [-135, -45, 90])]], 'sq-notsplit': ['square', []],
  'rect-halves-h': ['rectangle', [hy(50)]], 'rect-halves-v': ['rectangle', [vx(50)]], 'rect-halves-uneq': ['rectangle', [vx(4 + 29.44)]],
  'rect-fourths-strips': ['rectangle', [vx(27), vx(50), vx(73)]], 'rect-fourths-grid': ['rectangle', [vx(50), hy(50)]],
  'rect-fourths-uneq': ['rectangle', [vx(4 + 32.2), hy(22 + 22.4)]], 'rect-thirds-strips': ['rectangle', [vx(4 + 92 / 3), vx(4 + 184 / 3)]],
  'rect-thirds-uneq': ['rectangle', [vx(27), vx(4 + 55.2)]], 'rect-notsplit': ['rectangle', []],
  'tri-thirds-centre': ['triangle', [rays(50, TRI_CY, [-90, 30, 150])]], 'tri-thirds-bands': ['triangle', [hy(50 - HT / 2 + HT / 3), hy(50 - HT / 2 + 2 * HT / 3)]],
  'tri-halves': ['triangle', [vx(50)]], 'tri-notsplit': ['triangle', []],
  'hex-thirds-rhombi': ['hexagon', [rays(50, 50, [0, 120, 240])]], 'hex-thirds-bands': ['hexagon', [hy(50 - HT / 2 + HT / 3), hy(50 - HT / 2 + 2 * HT / 3)]],
  'hex-halves': ['hexagon', [vx(50)]], 'hex-sixths': ['hexagon', [rays(50, 50, [0, 60, 120, 180, 240, 300])]]
};
/* which region a point is in: one bit per line (its side), or the ray sector */
const regionOf = (cuts, x, y) => cuts.map(c => {
  if (c.line) { const [ax, ay, bx, by] = c.line; return (bx - ax) * (y - ay) - (by - ay) * (x - ax) > 0 ? '+' : '-'; }
  const [cx, cy, a] = c.rays, s = a.slice().sort((p, q) => p - q); let t = Math.atan2(y - cy, x - cx) * 180 / Math.PI, k = 0;
  t = ((t - s[0]) % 360 + 360) % 360 + s[0];   /* the angle within [first ray, first ray + 360) */
  for (let i = 0; i < s.length; i++) if (t >= s[i]) k = i + 1; return 's' + (k % s.length);
}).join('');
const STEP = 0.25, MEAS = {};
function measure(id) {
  if (MEAS[id]) return MEAS[id];
  const [shape, cuts] = G_CARDS[id], reg = {}; let tot = 0;
  for (let x = STEP / 2; x < 100; x += STEP) for (let y = STEP / 2; y < 100; y += STEP) {
    if (!INSIDE[shape](x, y)) continue; tot++; const k = regionOf(cuts, x, y);
    const r = reg[k] || (reg[k] = { n: 0, sx: 0, sy: 0 }); r.n++; r.sx += x; r.sy += y;
  }
  const out = Object.values(reg).map(r => ({ w: r.n / tot, cx: r.sx / r.n, cy: r.sy / r.n })).filter(r => r.w > 0.001)
    .sort((a, b) => (Math.abs(a.cx - b.cx) > 0.5 ? a.cx - b.cx : a.cy - b.cy));
  return (MEAS[id] = out);
}

/* ---------------- (a) the pieces ---------------- */
is(JSON.stringify(Object.keys(C.DATA.CARDS).sort()) === JSON.stringify(Object.keys(G_CARDS).sort()), 'the core has exactly the gate\'s cards');
for (const id of Object.keys(G_CARDS)) {
  const g = measure(id), cd = C.card(id), P = cd.pieces;
  is(cd.shape === G_CARDS[id][0], `${id}: the shape`);
  is(P.length === g.length, `${id}: ${g.length} pieces (core ${P.length})`);
  if (P.length !== g.length) continue;
  const sum = P.reduce((s, p) => s + p.w, 0); is(Math.abs(sum - 1) < 1e-9, `${id}: the pieces add up to the whole`);
  g.forEach((r, i) => {
    is(Math.abs(P[i].w - r.w) < 0.006, `${id} piece ${i}: weight ${P[i].w.toFixed(4)} vs measured ${r.w.toFixed(4)}`);
    is(Math.abs(P[i].cx - r.cx) < 0.8 && Math.abs(P[i].cy - r.cy) < 0.8, `${id} piece ${i}: in the measured place, left to right`);
  });
}
/* the design's named weights (§14): chord 25/75, Y 25/37.5/37.5, triangle bands 1/9 3/9 5/9, sectors 90/120/150 */
const wsOf = (id) => measure(id).map(r => r.w).sort((a, b) => a - b);
const near = (a, b, t) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < t);
is(near(wsOf('circle-halves-uneq'), [0.252, 0.748], 0.01), 'circle-halves-uneq is a 25/75 chord');
is(near(wsOf('sq-thirds-y'), [0.25, 0.375, 0.375], 0.01), 'sq-thirds-y is 25/37.5/37.5');
is(near(wsOf('tri-thirds-bands'), [1 / 9, 3 / 9, 5 / 9], 0.01), 'tri-thirds-bands is 1/9, 3/9, 5/9');
is(near(wsOf('circle-thirds-uneq'), [90 / 360, 120 / 360, 150 / 360], 0.01), 'circle-thirds-uneq is 90/120/150°');

/* ---------------- (b) the mobiles are honest ---------------- */
const GEO = { a: 140, e: 60, d: 280 / 3, h: 18, clamp: 28 };
const gTilt = (M, W) => W <= 1e-12 ? 0 : Math.max(-GEO.clamp, Math.min(GEO.clamp, Math.atan(M / (W * GEO.h)) * 180 / Math.PI));
/* moments about each pivot, + = the right end down (each hook's weight × its signed arm) */
const gSettle = (type, w) => {
  if (type === 'halves') return [gTilt(-GEO.a * w[0] + GEO.a * w[1], w[0] + w[1])];
  if (type === 'fourths') { const L = w[0] + w[1], R = w[2] + w[3]; return [gTilt(-GEO.a * L + GEO.a * R, L + R), gTilt(-GEO.e * w[0] + GEO.e * w[1], L), gTilt(-GEO.e * w[2] + GEO.e * w[3], R)]; }
  const S = w[1] + w[2]; return [gTilt(-2 * GEO.d * w[0] + GEO.d * S, w[0] + S), gTilt(-GEO.e * w[1] + GEO.e * w[2], S)];
};
const gLevel = (a) => a.every(x => Math.abs(x) < 0.5);
let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (const type of ['halves', 'thirds', 'fourths']) {
  const n = C.DATA.HOOKS[type]; is(n === { halves: 2, thirds: 3, fourths: 4 }[type], `${type}: one hook per share`);
  let agree = 0, levelEq = 0, tipsUneq = 0, nEq = 0, nUn = 0;
  for (let t = 0; t < 10000; t++) {
    let w; if (t % 4 === 0) { const v = 0.1 + rnd(); w = Array(n).fill(v); } else w = Array.from({ length: n }, () => 0.05 + rnd());
    const s = w.reduce((p, q) => p + q, 0); w = w.map(x => x / s);
    const core = C.settle(type, w), cv = Object.values(core), gv = gSettle(type, w);
    if (cv.length === gv.length && cv.every((x, i) => Math.abs(x - gv[i]) < 1e-9)) agree++;
    const eq = Math.max(...w) - Math.min(...w) < 1e-12;
    if (eq) { nEq++; if (C.isLevel(core)) levelEq++; }
    else if (Math.max(...w) - Math.min(...w) > 0.004) { nUn++; if (!C.isLevel(core)) tipsUneq++; }
  }
  is(agree === 10000, `${type}: the core's angles equal the gate's moments (${agree}/10000)`);
  is(levelEq === nEq && nEq > 2000, `${type}: equal shares always hang level (${levelEq}/${nEq})`);
  is(tipsUneq === nUn && nUn > 5000, `${type}: unequal shares always tip (${tipsUneq}/${nUn})`);
  is(C.isLevel(C.settle(type, Array(n).fill(0))), `${type}: the empty mobile hangs level (massless bars)`);
}
/* the symmetric-bar trap: thirds with w0 = w2 ≠ w1 must tip; fourths with pairs balanced but unequal across must tip */
is(!C.isLevel(C.settle('thirds', [0.3, 0.4, 0.3])), 'thirds: 0.3/0.4/0.3 tips (not a symmetric three-hook bar)');
is(!C.isLevel(C.settle('fourths', [0.2, 0.2, 0.3, 0.3])), 'fourths: balanced pairs that differ across tip the top bar');
is(!C.isLevel(C.settle('fourths', [0.3, 0.2, 0.2, 0.3])), 'fourths: a balanced top bar with unequal pairs tips a sub-bar');

/* ---------------- (c)(d) the rounds (design §6, typed) ---------------- */
const T1 = [['circle', 'halves', ['circle-halves-v', 'circle-halves-uneq', 'circle-fourths', 'circle-notsplit']], ['square', 'halves', ['sq-halves-v', 'sq-halves-uneq', 'sq-fourths-grid', 'sq-fourths-uneq']],
  ['rectangle', 'halves', ['rect-halves-h', 'rect-halves-uneq', 'rect-fourths-strips', 'rect-notsplit']], ['circle', 'halves', ['circle-halves-diag', 'circle-halves-uneq', 'circle-fourths', 'circle-fourths-uneq']],
  ['square', 'fourths', ['sq-fourths-grid', 'sq-fourths-uneq', 'sq-halves-v', 'sq-notsplit']], ['rectangle', 'fourths', ['rect-fourths-grid', 'rect-fourths-uneq', 'rect-halves-v', 'rect-halves-uneq']],
  ['circle', 'fourths', ['circle-fourths', 'circle-fourths-uneq', 'circle-halves-h', 'circle-notsplit']], ['square', 'halves', ['sq-halves-diag', 'sq-halves-uneq', 'sq-fourths-grid', 'sq-fourths-uneq']],
  ['rectangle', 'halves', ['rect-halves-v', 'rect-halves-uneq', 'rect-fourths-strips', 'rect-fourths-uneq']], ['circle', 'fourths', ['circle-fourths', 'circle-fourths-uneq', 'circle-halves-v', 'circle-notsplit']],
  ['square', 'fourths', ['sq-fourths-grid', 'sq-fourths-uneq', 'sq-halves-h', 'sq-halves-uneq']], ['rectangle', 'halves', ['rect-halves-h', 'rect-halves-uneq', 'rect-fourths-grid', 'rect-notsplit']]];
const T2 = [['circle', 'thirds', ['circle-thirds', 'circle-thirds-uneq', 'circle-halves-v', 'circle-fourths']], ['rectangle', 'thirds', ['rect-thirds-strips', 'rect-thirds-uneq', 'rect-halves-v', 'rect-fourths-strips']],
  ['square', 'thirds', ['sq-thirds-strips', 'sq-thirds-y', 'sq-halves-diag', 'sq-fourths-grid']], ['triangle', 'thirds', ['tri-thirds-centre', 'tri-thirds-bands', 'tri-halves', 'tri-notsplit']],
  ['square', 'fourths', ['sq-fourths-diag', 'sq-fourths-uneq', 'sq-thirds-strips', 'sq-notsplit']], ['rectangle', 'fourths', ['rect-fourths-strips', 'rect-fourths-uneq', 'rect-thirds-strips', 'rect-halves-h']],
  ['hexagon', 'thirds', ['hex-thirds-rhombi', 'hex-thirds-bands', 'hex-halves', 'hex-sixths']], ['circle', 'fourths', ['circle-fourths-diag', 'circle-fourths-uneq', 'circle-thirds', 'circle-halves-h']]];
const T3 = [['circle-halves-v', 'halves'], ['sq-fourths-grid', 'fourths'], ['rect-thirds-strips', 'thirds'], ['tri-halves', 'halves'], ['hex-thirds-rhombi', 'thirds'], ['circle-fourths', 'fourths'], ['sq-fourths-diag', 'fourths'], ['sq-halves-diag', 'halves']];
is(JSON.stringify(C.DATA.L1) === JSON.stringify(T1) && JSON.stringify(C.DATA.L2) === JSON.stringify(T2) && JSON.stringify(C.DATA.L3) === JSON.stringify(T3), 'the round tables are the design\'s');
is(T1.length >= 7 && T2.length >= 7 && T3.length >= 7, 'every level has ≥ 7 rounds');
/* the gate's own verdict for a card on a mobile */
const gHang = (id, type) => { const m = measure(id), n = C.DATA.HOOKS[type], w = Array.from({ length: n }, (_, i) => i < m.length ? m[i].w : 0); const ws = m.map(r => r.w); return { spare: Math.max(0, m.length - n), empty: Math.max(0, n - m.length), level: Math.max(...w) - Math.min(...w) < 0.006 || (m.length < n ? false : gLevel(gSettle(type, w))), w: ws, ang: gSettle(type, w) }; };
/* (the grid measures a weight to ± 0.003, so "equal" is judged by the measured spread, the tilt only where they differ) */
for (const [lvl, T] of [['hf', T1], ['thirds', T2]]) T.forEach(([shape, want, cards], r) => {
  const fair = cards.filter(id => { const h = gHang(id, want); return !h.spare && !h.empty && h.level; });
  is(fair.length === 1 && fair[0] === cards[0], `${lvl} #${r + 1}: exactly one fair card, the first (${fair.join(',')})`);
  cards.forEach(id => {
    is(G_CARDS[id][0] === shape, `${lvl} #${r + 1} ${id}: the round's shape`);
    const h = gHang(id, want), c = C.hang(id, want);
    is(c.fair === (!h.spare && !h.empty && h.level), `${lvl} #${r + 1} ${id}: the core agrees fair = ${!h.spare && !h.empty && h.level}`);
    if (id === cards[0]) return;
    if (!h.spare && !h.empty) {
      is(Math.max(...h.w) / Math.min(...h.w) >= 1.25, `${lvl} #${r + 1} ${id}: largest/smallest ≥ 1.25`);
      is(Math.max(...h.ang.map(Math.abs)) >= 6, `${lvl} #${r + 1} ${id}: tips ≥ 6°`);
    } else is(c.spare.length === h.spare && c.empty === h.empty, `${lvl} #${r + 1} ${id}: ${h.spare} spare, ${h.empty} bare hooks`);
  });
});
T3.forEach(([id, want], r) => {
  const m = measure(id); is(Math.max(...m.map(x => x.w)) - Math.min(...m.map(x => x.w)) < 0.006, `L3 #${r + 1} ${id}: equal shares`);
  const match = C.DATA.MOBILES.filter(t => C.DATA.HOOKS[t] === m.length); is(match.length === 1 && match[0] === want, `L3 #${r + 1}: exactly one mobile has a hook per share`);
  is(C.hang(id, want).fair, `L3 #${r + 1}: hangs fair on its mobile`);
});

/* the springs (design §12): a share's spring stretches by its weight ÷ one fair share × 40 px — every fair share stops on the
   fair line exactly, and on every unequal card at least one spring ends ≥ 8 px off it */
for (const [, want, cards] of T1.concat(T2)) cards.forEach(id => { const h = gHang(id, want); if (h.spare || h.empty) return;
  const L = h.w.map(w => C.stretch(w, want)), off = Math.max(...L.map(x => Math.abs(x - 40)));
  if (id === cards[0]) is(L.every(x => Math.abs(x - 40) < 0.3), `${id} on ${want}: every spring on the fair line`); else is(off >= 8, `${id} on ${want}: a spring ends ≥ 8 px off the line (${off.toFixed(1)})`); });
T3.forEach(([id, want]) => is(C.card(id).pieces.every(p => Math.abs(C.stretch(p.w, want) - 40) < 1e-6), `${id}: every spring on the line`));

/* ---------------- (e) the deal ---------------- */
for (const [lvl, T] of [['hf', T1], ['thirds', T2]]) T.forEach((R, r) => { for (let p = 0; p < 4; p++) { const st = C.newState(lvl, r, { pos: p, rnd }); is(st.cards[p] === R[2][0] && st.right === p && st.cards.slice().sort().join() === R[2].slice().sort().join() && st.mobiles.join() === R[1] && st.want === R[1], `${lvl} #${r + 1} pos ${p}: the deal`); } });
T3.forEach((R, r) => { for (let p = 0; p < 3; p++) { const st = C.newState('name', r, { pos: p, rnd }); is(st.cards.length === 1 && st.cards[0] === R[0] && st.mobiles[p] === R[1] && st.mobiles.slice().sort().join() === 'fourths,halves,thirds' && st.right === p, `name #${r + 1} pos ${p}: the deal`); } });

/* ---------------- (f) Check, misses, hints ---------------- */
{ const st = C.newState('hf', 0, { pos: 0 }); is(C.check(st).result === 'tray' && st.misses === 0 && C.hint(st).key === 'hintEmpty', 'Check with an empty mobile: no miss, "hang a card first"');
  C.hangCard(st, st.cards.indexOf('circle-halves-uneq'), 0); is(C.kindOf(st) === 'uneq', 'the unequal halves: uneq'); let a = C.check(st); is(a.result === 'miss' && st.misses === 1 && st.show === 1 && !st.pin && C.hint(st).key === 'hintUneq', 'miss 1: the pin is out, hintUneq');
  a = C.check(st); is(st.misses === 2 && st.show === 2 && C.hint(st).key === 'hintSprings', 'miss 2: the springs');
  C.check(st); is(st.show === 2, 'the help stays at 2');
  C.hangCard(st, st.cards.indexOf('circle-fourths'), 0); is(st.pin && C.kindOf(st) === 'many', 'a new card: the pin goes back in; fourths on halves: many'); C.check(st); is(C.hint(st).key === 'hintCount2', 'a wrong count at miss ≥ 2: count the hooks');
  C.hangCard(st, st.cards.indexOf('circle-notsplit'), 0); is(C.kindOf(st) === 'few', 'a whole card on halves: few');
  C.hangCard(st, 0, 0); is(C.check(st).result === 'ok' && st.done && C.hint(st) === null, 'the fair card: ok, done');
  is(C.check(st).result === 'done', 'Check after done does nothing');
  C.hangCard(st, st.cards.indexOf('circle-halves-uneq'), 0); is(st.pin === false, 'free play: a hung card swings at once'); C.takeDown(st); is(st.hung === null && st.pin, 'take down'); }
{ const st = C.newState('hf', 0, { pos: 0 }); C.hangCard(st, st.cards.indexOf('circle-fourths'), 0); C.check(st); is(C.hint(st).key === 'hintMany', 'miss 1, too many: hintMany');
  const s2 = C.newState('hf', 0, { pos: 0 }); C.hangCard(s2, s2.cards.indexOf('circle-notsplit'), 0); C.check(s2); is(C.hint(s2).key === 'hintFew', 'miss 1, too few: hintFew'); }
{ const st = C.newState('name', 1, { pos: 0 }); C.hangCard(st, 0, 1); is(C.kindOf(st) === 'mobile', 'L3 wrong mobile: mobile'); C.check(st); is(C.hint(st).key === 'hintMobile', 'L3 miss 1: hintMobile'); C.check(st); is(C.hint(st).key === 'hintCount2', 'L3 miss 2: count');
  C.hangCard(st, 0, 0); is(C.check(st).result === 'ok', 'L3 the right mobile: ok'); }
/* in every round every card's kind matches the gate's verdict */
for (const [lvl, T] of [['hf', T1], ['thirds', T2]]) T.forEach((R, r) => { const st = C.newState(lvl, r, { pos: 0 }); st.cards.forEach((id, i) => { C.hangCard(st, i, 0); const h = gHang(id, R[1]); const k = h.spare ? 'many' : h.empty ? 'few' : h.level ? 'ok' : 'uneq'; is(C.kindOf(st) === k, `${lvl} #${r + 1} ${id}: kind ${k}`); }); });

/* ---------------- (g) the plan ---------------- */
for (const lvl of ['hf', 'thirds', 'name']) {
  const n = C.ids(lvl).length, slots = lvl === 'name' ? 3 : 4; let prev = null, okOrder = 0, okBal = 0, okFirst = 0; const three = Array(slots).fill(0);
  for (let t = 0; t < 3000; t++) {
    const P = C.plan(lvl, rnd, prev);
    if (P.order.length === n && P.order.slice().sort((a, b) => a - b).join() === C.ids(lvl).join() && (!prev || P.order.join() !== prev.join())) okOrder++;
    if (!prev && lvl === 'hf') okFirst += P.order[0] === 0 ? 1 : 0;
    const cnt = Array(slots).fill(0); P.pos.forEach(p => cnt[p]++);
    const base = Math.floor(n / slots); if (P.pos.length === n && cnt.every(c => c === base || c === base + 1)) okBal++;
    cnt.forEach((c, s) => { if (c === base + 1) three[s]++; });
    prev = P.order;
  }
  is(okOrder === 3000, `${lvl}: every pass a full permutation, never the previous order (${okOrder})`);
  is(okBal === 3000, `${lvl}: the right slot balanced every pass`);
  if (lvl === 'hf') is(okFirst === 1, 'hf: #1 opens the first pass');
  if (lvl === 'name') three.forEach((c, s) => is(Math.abs(c / 3000 - 2 / 3) < 0.04, `name: slot ${s} gets the leftover at random (${(c / 3000).toFixed(3)})`));
}
is(C.plan('hf', rnd, null).order[0] === 0, 'hf: a fresh plan starts with #1');

/* ---------------- (h) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const used = new Set(['title', 'instrBubble', 'okBubble', 'check', 'tHalves', 'tThirds', 'tFourths', 'tName', 'hintEmpty', 'hintUneq', 'hintMany', 'hintFew', 'hintMobile', 'hintSprings', 'hintCount2',
  'okHalves', 'okThirds', 'okFourths', 'ok3Half', 'ok3Third', 'ok3Fourth', 'plHalf', 'plThird', 'plFourth', 'shCircle', 'shSquare', 'shRectangle', 'shTriangle', 'shHexagon',
  'aShelf', 'aCard', 'aCard1', 'aMobile', 'aLevel', 'aTips', 'aMany', 'aFew', 'setLevel', 'lvHF', 'lvThirds', 'lvName', 'setBubble', 'bOn', 'bOff']);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'fair-mobile-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'fair-mobile-core.js'), 'utf8');   /* the hint keys come from the core */
for (const k of used) { is(!!S[k], `string ${k} exists`); if (!['instrBubble', 'okBubble', 'title'].includes(k)) is(BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for by the activity`); }
for (const k of keys) {
  is(used.has(k), `string ${k} is used`);
  for (const l of LOCS) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (/^(hint|ok)/.test(k)) is(!/[½⅓¼]|\b1\/[234]\b/.test(s), `${k}.${l}: no fraction glyph`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
  }
}
/* a miss hint never names the right card or mobile: no unit word in a miss hint (the task line names the unit) */
const UNIT_WORDS = /\b(half|halves|third|fourth|quarter)s?\b/i;
['hintUneq', 'hintMany', 'hintFew', 'hintMobile', 'hintSprings', 'hintCount2'].forEach(k => is(!UNIT_WORDS.test(S[k].en), `${k}.en names no unit`));
/* the aria label of a card says how many pieces, never whether they are equal */
LOCS.forEach(l => is(/\{n\}/.test(S.aCard[l]) && /\{k\}/.test(S.aCard[l]) && /\{shape\}/.test(S.aCard[l]) && !/equal|gleich|gelijk|lige|lika|like|igual|ugual|égal|yhtä/i.test(S.aCard[l]), `aCard.${l}: count only, never "equal"`));
/* a card in one piece is "not cut", never "cut into 1 pieces" */
LOCS.forEach(l => is(/\{n\}/.test(S.aCard1[l]) && /\{shape\}/.test(S.aCard1[l]) && !/\{k\}/.test(S.aCard1[l]) && !/equal|gleich|gelijk|lige|lika|like|igual|ugual|égal|yhtä/i.test(S.aCard1[l]), `aCard1.${l}: a whole card, no count, never "equal"`));

console.log(`verify-fair-mobile-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

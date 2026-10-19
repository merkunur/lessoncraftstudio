#!/usr/bin/env node
/* =====================================================================
   verify-tipping-pour-core.js — the build gate for ACTIVITY #33, "Which
   Holds More?" (K.MD.A.2), THE TIPPING POUR. Design: designs/033-bramble.md §12.
   Its own ground truth: every capacity is re-integrated here from the
   profile literals (numerically, Simpson — never the core's frustum code)
   and checked against the design's tables; the truth of every round, both
   sides, both questions, is derived here; the look-cue audit, the visible
   gap, conservation through 10,000 random pour steps, predict-first, the
   order over 10,000 seeds, the stage reach at every width, and the strings.
   Run: node scripts/verify-tipping-pour-core.js   (TP_CORE_DIR = a mutant core dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.TP_CORE_DIR || MT, 'tipping-pour-core.js'));
global.TippingPourCore = C;
const ACT_SRC = fs.readFileSync(path.join(MT, 'tipping-pour-activity.js'), 'utf8');
const STR = (function () { const m = {}; const vm = require('vm'); const ctx = { window: {}, document: undefined, TippingPourCore: C, console }; vm.createContext(ctx); vm.runInContext(ACT_SRC + '\n;this.__A = TippingPourActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- 0. our own volume: Simpson over r(y)^2, from the literal segments ---------- */
function ownVol(v) {
  let s = 0;
  for (const seg of v.cav) {
    const [y0, y1, r0, r1] = seg, N = 200, h = (y1 - y0) / N;
    const r = y => r0 + (r1 - r0) * (y - y0) / (y1 - y0);
    let acc = 0;
    for (let i = 0; i <= N; i++) { const w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2; acc += w * r(y0 + i * h) ** 2; }
    s += Math.PI * acc * h / 3;
  }
  return s;
}
/* the design's tables (§6), in units of π·u³ */
const TABLE = {
  E1: [9000, 104040], E2: [51117, 7875], E3: [34560, 34560], E4: [34560, 104040], E5: [85054, 9000], E6: [35200, 35200], E7: [9000, 54017], E8: [45664, 24200],
  T1: [48668, 62784], T2: [51840, 85054], T3: [84600, 64000], T4: [40560, 51030], T5: [46080, 30752], T6: [37600, 28800], T7: [58750, 85184], T8: [90334, 70262], T9: [45600, 56250], T10: [35200, 35200]
};
const TRUTH = { E1: 'B', E2: 'A', E3: 'SAME', E4: 'B', E5: 'A', E6: 'SAME', E7: 'B', E8: 'A', T1: 'B', T2: 'B', T3: 'A', T4: 'B', T5: 'A', T6: 'A', T7: 'B', T8: 'A', T9: 'B', T10: 'SAME' };
const ALLR = C.EASY.concat(C.TRICKY);
is(C.EASY.length === 8 && C.TRICKY.length === 10, 'eight easy rounds and ten tricky ones');
for (const r of ALLR) {
  const a = ownVol(C.V[r.A]) / Math.PI, b = ownVol(C.V[r.B]) / Math.PI;
  is(Math.abs(a - TABLE[r.id][0]) <= 1, `${r.id}: A holds ${TABLE[r.id][0]}π (re-integrated ${a.toFixed(1)})`);
  is(Math.abs(b - TABLE[r.id][1]) <= 1, `${r.id}: B holds ${TABLE[r.id][1]}π (re-integrated ${b.toFixed(1)})`);
  is(Math.abs(C.capacity(C.V[r.A]) - ownVol(C.V[r.A])) <= 1e-6 * ownVol(C.V[r.A]), `${r.id}: the core's capacity of A is the cavity's 3D volume`);
  is(Math.abs(C.capacity(C.V[r.B]) - ownVol(C.V[r.B])) <= 1e-6 * ownVol(C.V[r.B]), `${r.id}: the core's capacity of B is the cavity's 3D volume`);
  const own = Math.abs(a - b) <= 1e-3 * Math.max(a, b) ? 'SAME' : a > b ? 'A' : 'B';
  is(own === TRUTH[r.id], `${r.id}: our truth ${own} is the design's ${TRUTH[r.id]}`);
  const ratio = Math.max(a, b) / Math.min(a, b);
  if (own === 'SAME') is(Math.abs(a - b) / Math.max(a, b) <= 1e-3, `${r.id}: "the same" within 0.1 %`);
  else is(ratio >= 1.22, `${r.id}: the ratio ${ratio.toFixed(3)} is at least 1.22`);
  /* no stored answer anywhere in the round */
  is(Object.keys(r).every(k => ['id', 'cog', 'A', 'B', 'fit'].includes(k)), `${r.id}: the round carries no answer field (${Object.keys(r)})`);
}
/* a thick vessel holds its cavity, not its outside */
for (const k of ['pot', 'stone']) {
  const v = C.V[k], outV = Math.PI * v.thick.r ** 2 * v.thick.h;
  is(C.capacity(v) < 0.6 * outV && Math.abs(C.capacity(v) - ownVol(v)) < 1e-6 * ownVol(v), `${k}: capacity is the cavity (${(C.capacity(v) / Math.PI).toFixed(0)}π), not the outer shape`);
}
/* T10 is solved: the tub holds exactly what the tall glass holds */
is(Math.abs(C.capacity(C.V.tub30) - C.capacity(C.V.glass20)) / C.capacity(C.V.glass20) < 1e-9, 'T10: the tub is solved to hold exactly the glass');
/* every vessel within the 100 × 90 box */
for (const k in C.V) { const L = C.look(C.V[k]); is(L.h <= 100 && L.w <= 92, `${k}: within the vessel box (${L.h.toFixed(0)} × ${L.w.toFixed(0)})`); }

/* ---------- 1. truth, sides, questions ---------- */
const flip = { A: 'B', B: 'A', SAME: 'SAME' };
for (const r of ALLR) for (const swap of [false, true]) {
  const base = swap ? flip[TRUTH[r.id]] : TRUTH[r.id];
  if (r.fit) {
    const t = base === 'B' || base === 'SAME' ? 'FITS' : 'SPILLS';
    for (const p of ['more', 'less']) is(C.truth(r, swap, p) === t, `${r.id}${swap ? ' swapped' : ''}: the fit round asks its own question (${t})`);
  } else {
    is(C.truth(r, swap, 'more') === base, `${r.id}${swap ? ' swapped' : ''}: more → ${base}`);
    is(C.truth(r, swap, 'less') === flip[base], `${r.id}${swap ? ' swapped' : ''}: less → ${flip[base]}`);
  }
  const st = C.newState(r, { swap, polarity: 'less' });
  is(C.want(st) === C.truth(r, swap, 'less'), `${r.id}: the state's place agrees with truth()`);
}
is(C.polarityAt('mixed', 0) === 'more' && C.polarityAt('mixed', 1) === 'less' && C.polarityAt('mixed', 2) === 'more', 'mixed alternates, starting with more');
is(C.polarityAt('less', 0) === 'less' && C.polarityAt('more', 1) === 'more', 'a fixed question stays put');

/* ---------- 2. the look-cue audit over T1–T8 (outer outlines, handle included) ---------- */
function ownLook(v) {
  const rmax = Math.max(...v.cav.map(s => Math.max(s[2], s[3])));
  const top = v.cav[v.cav.length - 1][1];
  const h = v.thick ? v.thick.h : top + 2, w = (v.thick ? 2 * v.thick.r : 2 * (rmax + 1)) + (v.kind === 'mug' ? 12 : 0);
  let area = 0; const N = 400;
  for (let i = 0; i < N; i++) {
    const y = (i + 0.5) * h / N; let half;
    if (v.thick) half = v.thick.r; else { const c = Math.min(Math.max(y - 2, 0), top); const s = v.cav.find(s => c <= s[1] + 1e-9) || v.cav[v.cav.length - 1]; half = s[2] + (s[3] - s[2]) * Math.max(0, c - s[0]) / (s[1] - s[0]) + 1; }
    area += 2 * half * h / N;
  }
  if (v.kind === 'mug') area += 12 * h * 0.5;
  return { h, w, area };
}
let taller = 0, wider = 0, larger = 0;
const illusions = C.TRICKY.filter(r => /^T[1-8]$/.test(r.id));
is(illusions.length === 8, 'eight illusion rounds');
for (const r of illusions) {
  const a = ownLook(C.V[r.A]), b = ownLook(C.V[r.B]), more = TRUTH[r.id];
  const la = C.look(C.V[r.A]), lb = C.look(C.V[r.B]);
  is(Math.abs(la.h - a.h) < 1e-6 && Math.abs(la.w - a.w) < 1e-6 && Math.abs(lb.h - b.h) < 1e-6 && Math.abs(lb.w - b.w) < 1e-6 && Math.abs(lb.area - b.area) < 1e-3 * b.area, `${r.id}: the drawn outlines are the audited outlines`);
  if ((a.h > b.h ? 'A' : 'B') === more) taller++;
  if ((a.w > b.w ? 'A' : 'B') === more) wider++;
  if ((a.area > b.area ? 'A' : 'B') === more) larger++;
}
for (const [n, k] of [['taller', taller], ['wider', wider], ['larger-looking', larger]]) {
  is(k >= 3 && k <= 5, `the ${n} vessel holds more in ${k} of 8 — neither the cue nor its reverse wins more than 5`);
}
is(taller === 4 && wider === 3 && larger === 3, `the audit as designed: taller 4, wider 3, area 3 (got ${taller}/${wider}/${larger})`);
/* truth balance over the tricky illusions and per level per pass */
is(illusions.filter(r => TRUTH[r.id] === 'A').length === 4, 'the illusions: A holds more in 4, B in 4');
for (const pool of [C.rounds('easy'), C.rounds('tricky')]) for (let pass = 0; pass < 4; pass++) for (const q of ['more', 'less']) {
  const tally = {};
  pool.forEach(r => { const t = C.truth(r, C.swapOf(r.i, pass), q); tally[t] = (tally[t] || 0) + 1; });
  is(Math.max(...Object.values(tally)) <= pool.length / 2, `${pool[0].id[0]} pass ${pass} ${q}: no berry place wins more than half (${JSON.stringify(tally)})`);
}
/* the swap really swaps: on odd passes half the rounds change sides */
for (const pass of [1, 3]) is(C.rounds('tricky').filter(r => C.swapOf(r.i, pass)).length === 5, `pass ${pass}: half the rounds swap sides`);
is(C.rounds('easy').every(r => !C.swapOf(r.i, 0) && !C.swapOf(r.i, 2)), 'even passes keep the sides');

/* ---------- 3. a visible gap: the empty band is at least 9 % of the vessel ---------- */
function ownLevel(v, vol) { let lo = 0, hi = v.cav[v.cav.length - 1][1]; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; const vv = C.volumeAt(v, m); if (vv < vol) lo = m; else hi = m; } return (lo + hi) / 2; }
for (const r of ALLR) for (const swap of [false, true]) {
  const L = C.V[swap ? r.B : r.A], R = C.V[swap ? r.A : r.B], a = ownVol(L), b = ownVol(R);
  if (Math.abs(a - b) <= 1e-3 * Math.max(a, b)) continue;
  if (a < b) { const top = R.cav[R.cav.length - 1][1], band = top - ownLevel(R, a); is(band >= 0.09 * top, `${r.id}${swap ? 's' : ''}: the gap band is ${(100 * band / top).toFixed(0)} % of the vessel`); }
  else is(a - b >= 0.18 * b, `${r.id}${swap ? 's' : ''}: the spill is ${(100 * (a - b) / b).toFixed(0)} % of what the other holds`);
}

/* ---------- 4. the pour: hold, flow, conservation, the three outcomes ---------- */
for (const k in C.V) {
  const v = C.V[k], cap = C.capacity(v);
  is(Math.abs(C.hold(v, 0, 1) - cap) < 1e-6 * cap, `${k}: upright it holds all of it`);
  let prev = Infinity, mono = true;
  for (let d = 0; d <= C.MAX_TILT; d += 2.5) { const h = C.hold(v, d, 1); if (h > prev + 1e-6 * cap) mono = false; prev = h; }
  is(mono, `${k}: the further it tips, the less it holds`);
  is(Math.abs(C.hold(v, 40, 1) - C.hold(v, 40, -1)) < 1e-6 * cap, `${k}: tipping left and right are mirror images`);
  if (k !== 'bottle') is(C.hold(v, C.MAX_TILT, 1) < 1e-6 * cap, `${k}: tipped right over it empties`);
}
is(C.hold(C.V.bottle, C.MAX_TILT, 1) > 0, 'the bottle keeps some behind its shoulder (it glugs)');
/* predict first: no juice before the berry */
{
  const st = C.newState(C.EASY[0]);
  let threw = false; try { C.fill(st); } catch (e) { threw = true; }
  is(threw && st.vol.L === 0, 'the tap refuses before the berry is down');
  is(!C.canPour(st), 'no pour before the berry is down');
  C.place(st, 'B'); is(C.fill(st) && st.vol.L === C.capacity(C.V[st.L]), 'with the berry down, the tap fills the left one to the brim');
  st.tilt = 0; st.docked = 'L'; const before = st.vol.L; C.pourStep(st, 0.5, 'L');
  is(st.vol.L === before && st.vol.R === 0, 'upright, nothing flows');
  st.tilt = 30; const o30 = C.pourStep(Object.assign(JSON.parse(JSON.stringify(st))), 0.05, 'L');
  st.tilt = 70; const o70 = C.pourStep(Object.assign(JSON.parse(JSON.stringify(st))), 0.05, 'L');
  is(o70 > o30 && o30 >= 0, `the further it tips, the faster it runs (${o30.toFixed(1)} → ${o70.toFixed(1)})`);
  /* held at a small tilt, only what lies above the lip line runs out — the rest stays */
  for (const k of ['glass20', 'jug34', 'pan43', 'bowl22']) {
    const s2 = C.newState(C.EASY[0]); s2.L = k; s2.R = 'jug34'; s2.berry = 'B'; s2.done = true; s2.vol.L = C.capacity(C.V[k]); s2.tilt = 20;
    for (let i = 0; i < 400; i++) C.pourStep(s2, 0.05, 'L');
    const own = C.capacity(C.V[k]);
    is(Math.abs(s2.vol.L - C.hold(C.V[k], 20, 1)) < 0.01 * own && s2.vol.L > 0.25 * own, `${k}: held at 20°, it keeps what lies below its lip (${(100 * s2.vol.L / own).toFixed(0)} %)`);
  }
}
/* conservation through 10,000 random steps, both directions, spill counted */
{
  let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  let worst = 0;
  for (let g = 0; g < 20; g++) {
    const r = ALLR[g % ALLR.length], st = C.newState(r, { swap: g % 2 === 1 }); C.place(st, C.places(st)[0]); C.fill(st);
    st.done = true; /* free play: no outcome bookkeeping */
    const total = () => st.vol.L + st.vol.R + st.spilled, t0 = total();
    for (let i = 0; i < 500; i++) {
      st.tilt = rnd() * C.MAX_TILT; C.pourStep(st, rnd() * 0.08, rnd() < 0.5 ? 'L' : 'R');
      worst = Math.max(worst, Math.abs(total() - t0) / t0);
      if (st.vol.L < -1e-9 || st.vol.R < -1e-9 || st.vol.R > C.capacity(C.V[st.R]) + 1e-6 || st.vol.L > C.capacity(C.V[st.L]) + 1e-6) { worst = 1; break; }
    }
  }
  is(worst < 1e-9, `the juice is conserved through 10,000 pour steps (worst drift ${worst.toExponential(1)})`);
}
/* every round, both sides: tip it all the way and the juice shows the truth */
function pourAll(r, swap) {
  const st = C.newState(r, { swap }); C.place(st, C.places(st)[0]); C.fill(st); st.docked = 'L'; st.tilt = 0;
  for (let i = 0; i < 4000 && !st.outcome; i++) { st.tilt = Math.min(C.MAX_TILT, st.tilt + 1.5); C.pourStep(st, 0.03, 'L'); }
  return st;
}
for (const r of ALLR) for (const swap of [false, true]) {
  const st = pourAll(r, swap), c = C.compare(r, swap), want = c === 'A' ? 'spill' : c === 'B' ? 'gap' : 'brim';
  is(Math.abs(st.vol.L + st.vol.R + st.spilled - C.capacity(C.V[st.L])) < 1e-9 * C.capacity(C.V[st.L]), `${r.id}${swap ? 's' : ''}: every drop of the judged pour is accounted for`);
  is(st.outcome === want, `${r.id}${swap ? ' swapped' : ''}: tipped all the way, the juice shows a ${want} (${st.outcome})`);
  is(want === 'spill' ? st.spilled > 0.004 * C.capacity(C.V[st.R]) : st.spilled < 1e-3 * C.capacity(C.V[st.R]), `${r.id}${swap ? 's' : ''}: a puddle only when the left holds more`);
  if (want === 'gap') is(C.capacity(C.V[st.R]) - st.vol.R > 0.05 * C.capacity(C.V[st.R]), `${r.id}${swap ? 's' : ''}: room left at the top`);
  if (want === 'brim') is(Math.abs(C.capacity(C.V[st.R]) - st.vol.R) < 2e-3 * C.capacity(C.V[st.R]) && st.vol.L === 0, `${r.id}: full to the brim, nothing left over`);
  is(C.aria(st) === { spill: 'ariaSpill', gap: 'ariaGap', brim: 'ariaBrim' }[want], `${r.id}: the live region says what the juice did`);
}

/* ---------- 5. the berry: judged after the pour; miss 1, miss 2, the glow ---------- */
for (const r of ALLR) for (const pol of ['more', 'less']) {
  const swap = r.i % 2 === 1, st = C.newState(r, { swap, polarity: pol }), right = C.truth(r, swap, pol);
  const wrong = C.places(st).filter(p => p !== right);
  is(C.place(st, wrong[0]).result === 'placed' && !st.done, `${r.id} ${pol}: a berry before the pour is only a guess`);
  C.fill(st); st.docked = 'L';
  for (let i = 0; i < 4000 && !st.outcome; i++) { st.tilt = Math.min(C.MAX_TILT, st.tilt + 1.5); C.pourStep(st, 0.03, 'L'); }
  is(st.last.result === 'wrong' && st.misses === 1 && !st.berry, `${r.id} ${pol}: a wrong call — the berry rolls back`);
  const h1 = C.hint(st); is(h1 && h1.key === { spill: 'hintSpill', gap: 'hintGap', brim: 'hintBrim' }[st.outcome], `${r.id}: miss 1 points at the evidence (${h1 && h1.key})`);
  is(C.glow(st) === null, `${r.id}: no glow at miss 1`);
  if (wrong[1]) { C.place(st, wrong[1]); is(C.glow(st) === right && C.hint(st).key === 'hintHere', `${r.id} ${pol}: miss 2 — the right place glows`); }
  else { st.help = 2; is(C.glow(st) === right, `${r.id}: the glow is the right place`); }
  const ok = C.place(st, right);
  is(ok.result === 'ok' && st.done && C.success(st), `${r.id} ${pol}: the right place wins (${C.success(st) && C.success(st).key})`);
  is(C.place(st, wrong[0]).result === 'done', `${r.id}: a finished round stays finished`);
}
/* the celebration names what happened */
const okKey = (r, swap, pol) => { const st = pourAllCall(r, swap, pol); return C.success(st).key; };
function pourAllCall(r, swap, pol) { const st = C.newState(r, { swap, polarity: pol }); C.place(st, C.truth(r, swap, pol)); C.fill(st); st.docked = 'L'; for (let i = 0; i < 4000 && !st.outcome; i++) { st.tilt = Math.min(C.MAX_TILT, st.tilt + 1.5); C.pourStep(st, 0.03, 'L'); } return st; }
is(okKey(C.EASY[1], false, 'more') === 'okMoreSpill' && okKey(C.EASY[0], false, 'more') === 'okMoreGap', 'more: a spill or a gap, named');
is(okKey(C.EASY[0], false, 'less') === 'okLessGap' && okKey(C.EASY[1], false, 'less') === 'okLessSpill', 'less: a gap or a spill, named');
is(okKey(C.EASY[2], false, 'more') === 'okSame' && okKey(C.TRICKY[8], false, 'more') === 'okFits' && okKey(C.TRICKY[8], true, 'more') === 'okSpills', 'the same, fits, spills');

/* ---------- 6. the order: 10,000 seeds ---------- */
{
  let seed = 1; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const easy = C.rounds('easy'), tricky = C.rounds('tricky');
  { const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.order(easy, rnd, null, 0, 'more').join()); is(firsts.size >= 30, `easy: the first pass is shuffled too — a return visit never replays it (${firsts.size} orders in 40 visits)`); }
  is(C.TRICKY.filter(r => r.fit).every(r => C.compare(r, false) !== 'SAME' && C.compare(r, true) !== 'SAME'), 'the fit round never pairs equals ("it fits, with room to spare" stays true)');
  let bad = 0, repeat = 0, first = 0, run3 = 0;
  for (let s = 0; s < 10000; s++) {
    const pool = s % 2 ? tricky : easy, q = ['more', 'less', 'mixed'][s % 3], pass = 1 + (s % 4);
    const prev = C.order(pool, rnd, null, pass, q), a = C.order(pool, rnd, prev, pass, q);
    if (a.slice().sort((x, y) => x - y).join() !== pool.map((_, i) => i).join()) bad++;
    if (a.join() === prev.join()) repeat++;
    if (pool === tricky && (pool[a[0]].fit || pool[a[0]].cog === 'same')) first++;
    let last = null, run = 0;
    a.forEach((k, j) => { const t = C.truth(pool[k], C.swapOf(pool[k].i, pass), C.polarityAt(q, j)); if (t === last) { run++; if (run >= 3) run3++; } else { last = t; run = 1; } });
  }
  is(bad === 0, 'every order is a permutation of the pool');
  is(repeat === 0, `never the same order twice running (${repeat})`);
  is(first === 0, `T9 / T10 never open a tricky pass (${first})`);
  is(run3 === 0, `never the same berry place three times running (${run3})`);
  /* a dealer that deals the same cards again must still not repeat the order */
  for (const pool of [easy, tricky]) {
    const mk = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; }; };
    let rep2 = 0;
    for (let sd = 1; sd < 400; sd++) { const p1 = C.order(pool, mk(sd), null, 1, 'more'), p2 = C.order(pool, mk(sd), p1, 1, 'more'); if (p1.join() === p2.join()) rep2++; }
    is(rep2 === 0, `${pool[0].id[0]}: the same dealer never deals the previous order (${rep2})`);
  }
}

/* ---------- 7. the stage: every pour stays on the stage, under its sky ---------- */
for (let W = 280; W <= 1100; W += 20) {
  const L = C.layout(W);
  is(L.u > 0 && L.SW * L.u <= W + 0.5, `${W}: the stage fits the width`);
  for (const r of ALLR) {
    for (const [a, b, fx, tx] of [[r.A, r.B, L.X.L, L.X.R], [r.B, r.A, L.X.L, L.X.R], [r.B, r.A, L.X.R, L.X.L], [r.A, r.B, L.X.R, L.X.L]]) {
      const re = C.reach(a, b, fx, tx), both = fx > tx;
      if (!(re.left >= -0.5 && re.right <= L.SW + 0.5)) { is(false, `${W} ${r.id} ${a}→${b}: the pour stays on the stage (${re.left.toFixed(1)}..${re.right.toFixed(1)} of ${L.SW})`); }
      const sky = C.skyFor(fx < tx ? a : b, fx < tx ? b : a, L, both);
      if (!(re.top <= sky)) is(false, `${W} ${r.id} ${a}→${b}: the pour stays under the sky (${re.top.toFixed(0)} > ${sky})`);
    }
    /* at rest the two vessels and the coaster column never touch */
    const oa = C.look(C.V[r.A]).w / 2, ob = C.look(C.V[r.B]).w / 2;
    const gapL = (L.X.mid - L.X.L) - Math.max(oa, ob), gapR = (L.X.R - L.X.mid) - Math.max(oa, ob);
    if (!(gapL * L.u >= 24 && gapR * L.u >= 24)) is(false, `${W} ${r.id}: the coasters have room between the vessels (${(gapL * L.u).toFixed(0)} / ${(gapR * L.u).toFixed(0)} px)`);
  }
  PASS++;
}
is(C.SKY >= Math.max(...ALLR.map(r => C.skyFor(r.A, r.B, C.layout(700), true))), 'the global sky covers every pour');

/* ---------- 8. strings: eleven locales, authored and used ---------- */
const keys = Object.keys(STR);
const freeRe = /(?<!\p{L})(free|gratis|gratuit\w*|kostenlos|grátis|gratuito|gratuita|ilmai\w*|vrij|frei|kostnadsfri\w*|gratisk)(?!\p{L})/iu;
for (const k of keys) for (const l of LOCALES) {
  const s = STR[k][l];
  is(typeof s === 'string' && s.trim().length > 0, `${k}.${l} authored`);
  if (typeof s !== 'string') continue;
  is(!freeRe.test(s), `${k}.${l}: no word for "free"`);
  if (l === 'fr') is(!/ [?!:;]/.test(s) && !/[^\s ][?!:;]/.test(s.replace(/https?:\/\/\S+/g, '')), `${k}.fr: U+202F before ? ! : ; (${s})`);
  is(!/(?<!\p{L})0(?!\d)/u.test(s), `${k}.${l}: no zero`);
}
is(STR.ariaBerry.sv === 'Hallon' && STR.ariaBerry.fi === 'Vadelma' && STR.ariaBerry.da === 'Hindbær' && STR.ariaBerry.no === 'Bringebær', 'the berry is named a raspberry, from the vocabulary');
/* every key the activity or the core can ask for is authored, and every authored key is asked for */
const CORE_SRC = fs.readFileSync(path.join(process.env.TP_CORE_DIR || MT, 'tipping-pour-core.js'), 'utf8');
const asked = new Set();
const scan = (src) => { for (const m of src.matchAll(/(?:(?<!\w)_t|(?<![\w.])t)\('([a-zA-Z]+)'\)/g)) asked.add(m[1]); for (const m of src.matchAll(/(?:labelKey|promptKey|key):\s*'([a-zA-Z]+)'/g)) asked.add(m[1]); for (const m of src.matchAll(/'((?:hint|ok|aria|prompt|step|set|c|q)[A-Z][a-zA-Z]*)'/g)) asked.add(m[1]); };
scan(ACT_SRC); scan(CORE_SRC);
['title', 'instruction'].forEach(k => asked.add(k));      /* read by the shell */
for (const k of keys) is(asked.has(k), `${k}: authored and used`);
for (const k of asked) if (/^(hint|ok|aria|prompt|step|set|c[A-Z]|q[A-Z])/.test(k)) is(keys.includes(k), `${k}: used and authored`);

console.log(`verify-tipping-pour-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

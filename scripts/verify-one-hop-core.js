#!/usr/bin/env node
/* =====================================================================
   verify-one-hop-core.js — build-time gate for ACTIVITY #100, The
   One-Hop Helpers (1.MD.A.2). Its OWN oracle: the round tables are typed
   here literally, and "a clean row" is the gate's own predicate (every
   helper the same size, the first AT the stone, each next one starting
   exactly where the last one ends, the last ending exactly at the
   object's end, nothing before the stone or past the end) — never read
   off the core.
   Proves: the tables; Inchie reaches the end (and the keypad wakes)
   EXACTLY when the row is clean — exhaustive over up to L+1 one-size
   helpers on the quarter lattice for L ≤ 4, 20,000 sampled mixed rows for
   L 5–6 and for the decoy sizes; every Fix-it round stops at its designed
   fault; judge rounds have exactly one clean track; order rounds have
   three different lengths; big helpers are two units and every big-round
   L is even; Check takes only L (and the big round two numbers in turn);
   the picture sizes at 360 and 704; the plan; the strings.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.OH_CORE_DIR || MT, 'one-hop-core.js'); /* the mutation harness points this at a mutated copy */
const C = require(CORE);
const SRC = fs.readFileSync(path.join(MT, 'one-hop-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, OneHopCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = OneHopActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const E8 = 8;

/* ---- the tables, typed literally (design §6; positions in eighths of a unit) ---- */
const LAY = { A1: 'car 4 0 -', A2: 'fish 3 0 -', A3: 'shoe 4 12 -', A4: 'snail 3 0 3/8', A5: 'ferry 5 0 -', A6: 'submarine 5 4 -', A7: 'skateboard 6 0 -' };
const FIX = {
  B1: 'alligator 4 gap 3 0/8 8/8 16/8 26/8', B2: 'car 4 overlap 3 0/8 8/8 16/8 22/8', B3: 'caterpillar 3 gap 2 0/8 8/8 18/8',
  B4: 'shoe 4 past 4 0/8 8/8 16/8 24/8 32/8', B5: 'train 3 start 1 3/8 11/8 19/8', B6: 'fish 3 inside 2 0/8 8/12', B7: 'ferry 5 gap 1 0/8 10/8 16/8 24/8 32/8'
};
const JUDGE = {
  J1: ['car', 4, ['0/8 8/8 16/12 28/8', '0/8 8/8 16/8 24/8', '0/8 8/8 16/8 24/8 32/8'], 1],
  J2: ['shoe', 4, ['0/8 8/8 16/8 24/8', '2/8 10/8 18/8 26/8', '0/8 8/8 20/8 28/8'], 0],
  J3: ['alligator', 4, ['0/8 6/8 14/8 22/8 30/8', '0/8 8/8 16/8 26/8', '0/8 8/8 16/8 24/8'], 2]
};
const ORDER = { C1: 'fish 3 car 4 ferry 5', C2: 'submarine 5 snail 3 shoe 4', C3: 'skateboard 6 alligator 4 caterpillar 3', C4: 'shoe 4 baguette 6 ferry 5', C5: 'submarine 5 train 3 skateboard 6', C6: 'car 4 fish 3 baguette 6', C7: 'alligator 4 ferry 5 snail 3' };
const BIG = { D1: 'car 4', D2: 'shoe 4', D3: 'skateboard 6', D4: 'alligator 4', D5: 'baguette 6', D6: 'submarine 4', D7: 'truck 4' };
const PICS = { car: 'toys/car', train: 'toys/train', truck: 'toys/truck', skateboard: 'vehicles/skateboard', fish: 'animals/fish', shoe: 'clothing/shoe', snail: 'forest creatures/snail', alligator: 'reptiles and amphibians/alligator', caterpillar: 'forest creatures/caterpillar', ferry: 'vehicles/ferry', submarine: 'vehicles/submarine', baguette: 'bakery/baguette' };
const helpers = (s) => s === '-' ? [] : s.split(' ').map(x => { const [p, w] = x.split('/').map(Number); return { p, w }; });

/* ---- the gate's own predicate ---- */
function cleanRow(H, E, U) {
  if (E % U) return false;
  const s = H.slice().sort((a, b) => a.p - b.p);
  if (s.length !== E / U) return false;
  return s.every((h, k) => h.w === U && h.p === k * U);
}
/* Inchie hops (through the core's own state machine, as the child's taps do) until she stops */
function hopAll(r, H) { const st = C.newState(r, [0, 1, 2]); st.helpers = H.map(h => ({ p: h.p, w: h.w })); const seen = []; for (let g = 0; g < 30; g++) { const x = C.hop(st); if (!x || x.status === 'none') break; seen.push(x.status); if (x.status !== 'seam') break; } return { st, seen }; }

/* ---- the tables against the core ---- */
ok(C.E8 === E8 && C.LMAX === 6, 'eighths, six units');
ok(JSON.stringify(C.ids('lay', 'one')) === JSON.stringify(Object.keys(LAY)), 'lay ids');
ok(JSON.stringify(C.ids('lay', 'big')) === JSON.stringify(Object.keys(BIG)), 'big ids');
ok(JSON.stringify(C.ids('fix', 'one')) === JSON.stringify(Object.keys(FIX).concat(Object.keys(JUDGE))), 'fix + judge ids');
ok(JSON.stringify(C.ids('order', 'big')) === JSON.stringify(Object.keys(ORDER)), 'order ids (sizes ignored)');
ok(JSON.stringify(C.ids('fix', 'big')) === JSON.stringify(C.ids('fix', 'one')), 'the sizes setting only acts on lay');
for (const k of Object.keys(PICS)) ok(C.DATA.OBJ[k] && C.DATA.OBJ[k].join('/') === PICS[k], `${k}: picture ${PICS[k]}`);
ok(Object.keys(C.DATA.OBJ).length === Object.keys(PICS).length, 'no other pictures');

for (const id of Object.keys(LAY)) {
  const [obj, L, decoy, pre] = LAY[id].split(' '), r = C.round(id);
  ok(r.kind === 'lay' && r.obj === obj && r.L === +L && r.decoy === +decoy && JSON.stringify(r.pre) === JSON.stringify(helpers(pre)), `${id}: as typed`);
  if (+decoy) ok(+decoy !== E8 && !cleanRow([{ p: 0, w: +decoy }], +L * E8, E8), `${id}: the decoy is another size`);
  /* the round can be won: a clean row reaches the end and Check takes L only */
  const st = C.newState(r, [0, 1, 2]); st.helpers = [];
  for (let k = 0; k < +L; k++) C.append(st, E8);
  ok(cleanRow(st.helpers, +L * E8, E8), `${id}: ${L} taps on the pot lay a clean row`);
  ok(C.check(st).result === 'none' && C.hint(st).key === 'hintHop', `${id}: Check before the hops asks for the hops`);
  ok(C.type(st, +L) === 'no' && !C.canType(st), `${id}: the keypad sleeps before the hops`);
  for (let k = 0; k < +L; k++) C.hop(st);
  ok(st.status === 'end' && st.hops === +L && C.canType(st), `${id}: ${L} hops reach the end, the keypad wakes`);
  ok(C.check(st).result === 'none' && C.hint(st).key === 'hintWrite', `${id}: Check before a number asks for it`);
  for (const d of [+L - 1, +L + 1]) { C.type(st, d); ok(C.check(st).result === 'miss' && !st.done, `${id}: ${d} is not taken`); }
  C.type(st, +L); ok(C.check(st).result === 'ok' && st.done, `${id}: ${L} is taken`);
  ok(C.lay(st, 0, E8) === -1 && C.hop(st) === null && C.type(st, 3) === 'no', `${id}: a finished round is locked`);
}
/* A4: the pre-laid helper is a crooked start until moved to the stone */
{ const r = C.round('A4'), st = C.newState(r); const x = C.hop(st); ok(x.status === 'start', 'A4: the pre-laid helper at 3/8 is a crooked start'); C.home(st); C.move(st, 0, 0.05); ok(st.helpers[0].p === 0, 'A4: dragged near the stone it clicks flush onto it'); }

for (const id of Object.keys(FIX)) {
  const [obj, L, fault, at, ...hs] = FIX[id].split(' '), r = C.round(id), H = helpers(hs.join(' '));
  ok(r.kind === 'fix' && r.obj === obj && r.L === +L && r.fault === fault && JSON.stringify(r.pre) === JSON.stringify(H), `${id}: as typed`);
  ok(!cleanRow(H, +L * E8, E8), `${id}: the laid row is not clean`);
  const { seen } = hopAll(r, H);
  ok(seen.length === +at && seen[seen.length - 1] === fault, `${id}: Inchie stops at hop ${at} with "${fault}" (got ${seen.join(',')})`);
  ok(C.faultKey(fault), `${id}: the fault has words`);
  { const { st } = hopAll(r, H); ok(C.type(st, 3) === 'no' && !C.canType(st), `${id}: the keypad sleeps while Inchie is stuck`); }
}
for (const id of Object.keys(JUDGE)) {
  const [obj, L, tr, right] = JUDGE[id], r = C.round(id), T = tr.map(helpers);
  ok(r.kind === 'judge' && r.obj === obj && r.L === L && JSON.stringify(r.tracks) === JSON.stringify(T), `${id}: as typed`);
  ok(T.filter(t => cleanRow(t, L * E8, E8)).length === 1 && cleanRow(T[right], L * E8, E8), `${id}: exactly one clean track, track ${right + 1}`);
  T.forEach((t, k) => ok(C.clean(t, L * E8, E8) === cleanRow(t, L * E8, E8), `${id} track ${k + 1}: the core's run agrees`));
  for (const p of [[0, 1, 2], [2, 0, 1], [1, 2, 0]]) {
    const st = C.newState(r, p), want = p.indexOf(right);
    ok(C.rightTrack(st) === want, `${id} perm ${p}: the right row is shown at ${want}`);
    ok(C.check(st).result === 'none', `${id}: Check with no row asks for one`);
    C.pickTrack(st, (want + 1) % 3); ok(C.check(st).result === 'miss' && C.hint(st).key === 'hintJudge1', `${id}: a wrong row is a miss`);
    C.pickTrack(st, (want + 2) % 3); C.check(st); ok(C.hint(st).key === 'hintJudge2', `${id}: the second miss says more`);
    C.pickTrack(st, want); ok(C.check(st).result === 'ok', `${id}: the clean row is right`);
  }
}
ok(new Set(Object.values(JUDGE).map(j => j[3])).size === 3, 'judge: the clean track sits at 1, 2 and 3 across J1–J3');
for (const id of Object.keys(ORDER)) {
  const w = ORDER[id].split(' '), want = [[w[0], +w[1]], [w[2], +w[3]], [w[4], +w[5]]], r = C.round(id);
  ok(r.kind === 'order' && JSON.stringify(r.objs.map(x => [x.obj, x.L])) === JSON.stringify(want), `${id}: as typed`);
  ok(new Set(want.map(x => x[1])).size === 3, `${id}: three different lengths`);
  for (const p of [[0, 1, 2], [2, 1, 0], [1, 0, 2]]) {
    const st = C.newState(r, p);
    for (let i = 0; i < 3; i++) {
      const o = C.objOf(st); ok(o === r.objs[p[i]], `${id} perm ${p}: the bed measures queue card ${i + 1}`);
      for (let k = 0; k < o.L; k++) C.append(st, E8); for (let k = 0; k < o.L; k++) C.hop(st);
      C.type(st, o.L + 1); ok(C.check(st).result === 'miss', `${id}: a wrong label is a miss`);
      C.type(st, o.L); ok(C.check(st).result === 'step' && st.labels[i] === o.L, `${id}: card ${i + 1} gets its label`);
    }
    ok(C.objOf(st) === null && C.lay(st, 0, E8) === -1, `${id}: once measured the bed rests`);
    ok(C.check(st).result === 'none' && C.hint(st).key === 'hintFill', `${id}: an empty shelf asks to be filled`);
    const L = (i) => r.objs[p[i]].L, asc = [0, 1, 2].sort((a, b) => L(a) - L(b));
    asc.slice().reverse().forEach((i, s) => C.place(st, i, s));
    ok(C.check(st).result === 'miss' && C.hint(st).key === 'hintOrder1', `${id}: longest first is a miss`);
    asc.forEach((i, s) => C.place(st, i, s));
    ok(JSON.stringify(st.slots) === JSON.stringify(asc) && C.check(st).result === 'ok', `${id}: shortest first is right`);
  }
}
for (const id of Object.keys(BIG)) {
  const [obj, L] = BIG[id].split(' '), r = C.round(id), st = C.newState(r);
  ok(r.kind === 'big' && r.obj === obj && r.L === +L && +L % 2 === 0, `${id}: as typed, L even`);
  ok(C.unit(st) === 2 * E8 && C.target(st) === +L / 2, `${id}: big helpers are two units; ${+L / 2} of them`);
  for (let k = 0; k < +L / 2; k++) C.append(st); for (let k = 0; k < +L / 2; k++) C.hop(st);
  ok(st.status === 'end' && st.hops === +L / 2, `${id}: big hops are two units long`);
  C.type(st, +L); ok(C.check(st).result === 'miss', `${id}: the small count is not the big answer`);
  C.type(st, +L / 2); ok(C.check(st).result === 'step' && st.phase === 1 && st.helpers.length === 0, `${id}: then the small helpers`);
  ok(C.unit(st) === E8 && C.target(st) === +L, `${id}: small helpers are one unit`);
  for (let k = 0; k < +L; k++) C.append(st); for (let k = 0; k < +L; k++) C.hop(st);
  C.type(st, +L); ok(C.check(st).result === 'ok' && C.okOf(st).B === +L / 2 && C.okOf(st).S === +L, `${id}: big ${+L / 2}, small ${L}`);
}
ok(['A', 'B', 'D'].every(c => { const s = new Set(Object.entries(Object.assign({}, LAY, FIX, BIG)).filter(([k]) => k[0] === c).map(([, v]) => v.split(' ')[1])); return s.size >= 2; }), 'every level uses more than one length');

/* ---- reaching the end ⇔ a clean row (exhaustive for L ≤ 4, sampled beyond) ---- */
function agree(r, H, label) {
  const E = r.L * E8, U = E8, { st } = hopAll(r, H), want = cleanRow(H, E, U), got = st.status === 'end';
  if (want !== got) { ok(false, `${label}: ${JSON.stringify(H)} — the gate says ${want ? 'clean' : 'not clean'}, Inchie ${got ? 'reached the end' : 'stopped (' + st.status + ')'}`); return false; }
  return true;
}
let n = 0, bad = 0;
for (const L of [3, 4]) {
  const r = { id: 'X', kind: 'lay', obj: 'car', L, decoy: 0, pre: [] }, E = L * E8, P = [];
  for (let p = -E8; p <= E + 2 * E8; p += 2) P.push(p);
  const rec = (start, H) => { n++; if (!agree(r, H, `L${L}`)) bad++; if (H.length === L + 1) return; for (let i = start; i < P.length; i++) rec(i, H.concat({ p: P[i], w: E8 })); };
  rec(0, []);
}
ok(bad === 0 && n > 100000, `exhaustive L 3–4: ${n} rows, ${bad} disagreements`);
let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
n = 0; bad = 0;
for (let i = 0; i < 20000; i++) {
  const L = 3 + Math.floor(rnd() * 4), E = L * E8, r = { id: 'X', kind: 'lay', obj: 'car', L, decoy: 0, pre: [] }, H = [];
  const k = Math.floor(rnd() * (L + 2));
  if (rnd() < 0.5) { for (let j = 0; j < L; j++) H.push({ p: j * E8, w: E8 }); const m = Math.floor(rnd() * 3); for (let q = 0; q < m; q++) { const j = Math.floor(rnd() * H.length); if (rnd() < 0.5) H[j] = { p: H[j].p + [-2, 2, -1, 1, 4][Math.floor(rnd() * 5)], w: H[j].w }; else H[j] = { p: H[j].p, w: [4, 12, 16][Math.floor(rnd() * 3)] }; } if (rnd() < 0.3) H.push({ p: [-8, E, E + 2, 6][Math.floor(rnd() * 4)], w: E8 }); }
  else for (let j = 0; j < k; j++) H.push({ p: Math.floor(rnd() * (E + 24)) - 8, w: [8, 8, 8, 4, 12][Math.floor(rnd() * 5)] });
  n++; if (!agree(r, H, `sample L${L}`)) bad++;
}
ok(bad === 0, `sampled L 3–6 with mixed sizes: ${n} rows, ${bad} disagreements`);
/* big rounds: a clean row of two-unit helpers */
bad = 0;
for (let i = 0; i < 4000; i++) {
  const L = [4, 6][i % 2], r = { id: 'D', kind: 'big', obj: 'car', L, pre: [] }, st = C.newState(r), U = 16, H = [];
  for (let j = 0; j < L / 2; j++) H.push({ p: j * U, w: U });
  if (rnd() < 0.6) { const j = Math.floor(rnd() * H.length); if (rnd() < 0.5) H[j].p += [2, -2, 4][Math.floor(rnd() * 3)]; else H[j].w = 8; }
  st.helpers = H; for (let g = 0; g < 10; g++) { const x = C.hop(st); if (!x || x.status !== 'seam') break; }
  if ((st.status === 'end') !== cleanRow(H, L * E8, U)) bad++;
}
ok(bad === 0, `big rows: ${bad} disagreements in 4000`);

/* ---- laying: quarters, a flush click within an eighth ---- */
{ const st = C.newState(C.round('A1')); C.lay(st, 0.6, E8); ok(st.helpers[0].p === 4, 'a free helper lands on a quarter (0.6 → 0.5)'); C.lay(st, 1.4, E8); ok(st.helpers[1].p === 12, 'and the next on a quarter (1.4 → 1.5, flush to the first)');
  const s2 = C.newState(C.round('A1')); C.lay(s2, 0, E8); C.lay(s2, 1.1, E8); ok(s2.helpers[1].p === 8, 'within an eighth of an end it clicks flush'); C.lay(s2, 2.3, E8); ok(s2.helpers[2].p === 18, 'a quarter off it does NOT click (a visible gap)'); }

/* ---- the pictures: ink scaled to L units; sizes at 360 and 704 ---- */
const ext = JSON.parse(fs.readFileSync(path.join(__dirname, 'worksheet-gen', 'data', 'art-extents.json'), 'utf8'));
for (const k of Object.keys(PICS)) {
  const want = PICS[k].replace('/', '//').toLowerCase(), e = ext[Object.keys(ext).find(x => x.toLowerCase() === want)];
  ok(e && Math.abs(e[0] - C.DATA.INK[k][0]) < 0.002 && Math.abs(e[2] - C.DATA.INK[k][2]) < 0.002 && Math.abs(e[1] - C.DATA.INK[k][1]) < 0.002 && Math.abs(e[3] - C.DATA.INK[k][3]) < 0.002, `${k}: the ink box is the measured one`);
  ok(C.DATA.INK[k][0] > C.DATA.INK[k][2], `${k}: lies flat (wider than tall)`);
}
const uses = []; [LAY, BIG].forEach(t => Object.values(t).forEach(v => { const [o, L] = v.split(' '); uses.push([o, +L]); }));
Object.values(FIX).forEach(v => { const [o, L] = v.split(' '); uses.push([o, +L]); }); Object.values(JUDGE).forEach(j => uses.push([j[0], j[1]]));
Object.values(ORDER).forEach(v => { const w = v.split(' '); for (let i = 0; i < 6; i += 2) uses.push([w[i], +w[i + 1]]); });
const uOf = (W) => Math.min(86, Math.min(W, 660) / (6 + 1.25));
for (const [W, lo, hi, vp] of [[328, 64, 150, 360], [648, 96, 250, 704]]) for (const [o, L] of uses) {
  const k = C.DATA.INK[o], wInk = L * uOf(W), hInk = wInk / k[0] * k[2];
  ok(Math.min(wInk, hInk) >= lo && hInk <= hi, `${o} at ${L} units, ${vp} px: ink ${Math.round(wInk)} × ${Math.round(hInk)} (short side ≥ ${lo}, height ≤ ${hi})`);
}
ok(Math.abs(uOf(328) * 6 + uOf(328) * 0.62 - 328) < 328 && uOf(328) * 6.62 < 328, 'six units and the stone fit the 360 bed');

/* ---- the plan ---- */
const mk = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
for (const [job, sz] of [['lay', 'one'], ['lay', 'big'], ['fix', 'one'], ['order', 'one']]) {
  const base = C.ids(job, sz); let prev = null, first = {};
  for (let s = 1; s <= 300; s++) {
    const o = C.plan(job, sz, mk(s), prev).order;
    ok(o.slice().sort().join() === base.slice().sort().join(), `${job}/${sz}: a permutation`);
    if (prev) ok(o.join() !== prev.join(), `${job}/${sz}: never the previous order`);
    for (let i = 2; i < o.length; i++) ok(!(o[i][0] === 'J' && o[i - 1][0] === 'J' && o[i - 2][0] === 'J'), `${job}: never three judge rounds in a row`);
    first[o[0]] = (first[o[0]] || 0) + 1; prev = o;
  }
  ok(Object.keys(first).length >= base.length - 1, `${job}/${sz}: the first round varies`);
  { const still = () => 0.5, o1 = C.plan(job, sz, still).order, o2 = C.plan(job, sz, still, o1).order; ok(o2.join() !== o1.join(), `${job}/${sz}: even a stuck dice never repeats the previous order`); }
}
{ const pos = [0, 0, 0], sh = [0, 0, 0]; const rnd2 = mk(99);
  for (let s = 0; s < 300; s++) { const p = C.perm(rnd2); pos[p.indexOf(1)]++; const r = C.round('C' + (1 + s % 7)), Ls = p.map(i => r.objs[i].L); sh[Ls.indexOf(Math.min(...Ls))]++; }
  ok(pos.every(c => c >= 84 && c <= 117), `judge: the right row sits in each place 28–39 % (${pos})`);
  ok(sh[0] <= 120, `order: the shortest is measured first in ≤ 40 % of showings (${sh[0]}/300)`); }

/* ---- strings ---- */
const S = A.strings, keys = Object.keys(S);
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter(x => x !== '{name}' && !(k === 'okLen' && x === '{long}')).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  if (/^(hint|f[A-Z])/.test(k)) ok(LOCS.every(l => !/\d/.test(S[k][l]) && !/\{(n|B|S|N|k)\}/.test(S[k][l])), `${k}: a hint names no number`);
}
for (const l of ['da', 'sv', 'no']) ok(/\{long\}/.test(S.okLen[l]) && Object.values(A.OBJECTS[l]).every(v => /^[^|]+\|[^|]+$/.test(v)), `${l}: "long" agrees with each object`);
for (const l of LOCS) { const O = A.OBJECTS[l]; ok(O && Object.keys(PICS).every(k => typeof O[k] === 'string' && O[k].length) && new Set(Object.values(O)).size === 12, `${l}: twelve distinct object phrases`); }
const body = SRC.slice(SRC.indexOf('/*OBJECTS-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title', name: "_t fills {name} from 'name'" };
const DYN = { aSlot1: "'aSlot' + (s + 1)", aSlot2: 'same', aSlot3: 'same' };
for (const k of keys) ok(SHELL[k] || DYN[k] || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity or the core`);
ok(body.indexOf("'aSlot'") >= 0 && body.indexOf("this.api.t('name')") >= 0, 'the dynamic keys are built in the source');

console.log(`verify-one-hop-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

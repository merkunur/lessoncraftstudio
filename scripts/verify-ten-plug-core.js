#!/usr/bin/env node
/* verify-ten-plug-core.js — #85 THE TEN PLUG (1.OA.C.6), its OWN oracle.
   Ground truth is the design sheet's table (designs/085-numberbond.md §6), typed in here and
   re-derived, never read off the core: every sum crosses ten (11–17, addends 1–9), the hole is
   10 − a, the split (hole, b − hole) has both parts ≥ 1; the plug physics for EVERY piece length
   (fit iff = the room left, long iff more, short iff less; two short pieces that add up fill it);
   swap rounds; the 10 + b slip never passes and its ghost shows exactly the hole's cubes extra;
   Make 10 (only the partner fits, k = 5 the single exception); the keys sleep until the ten is
   full in Snap first; the plan never repeats a total side by side; never a 0.
   Usage: node scripts/verify-ten-plug-core.js [--poison=<name>] */
'use strict';
const path = require('path');
const C = require(path.join(process.env.TP_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'ten-plug-core.js'));
const POISON = (process.argv.find(a => a.startsWith('--poison=')) || '').slice(9);
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }
if (POISON === 'long') { const p0 = C.plug; C.plug = (st, id) => { const r = p0(st, id); return r === 'long' ? 'fit' : r; }; }
if (POISON === 'keys') { const t0 = C.type; C.type = (st, d) => { const m = st.mode; st.mode = 'head'; const r = t0(st, d); st.mode = m; return r; }; }

const DESIGN = [[8, 5, 13], [9, 4, 13], [7, 6, 13], [8, 7, 15], [9, 6, 15], [7, 5, 12], [6, 8, 14], [9, 8, 17], [7, 4, 11], [9, 7, 16], [5, 9, 14], [4, 8, 12], [8, 8, 16], [6, 5, 11]];
const OLD = [[8, 5], [9, 4], [7, 6], [8, 7], [9, 6], [7, 5], [6, 8], [9, 8]];
const M10 = [7, 4, 9, 2, 6, 5, 8, 3];
const pieceOf = (st, len) => st.pieces.find(p => p.where === 'mat' && p.len === len);

/* ---- the table ---- */
ok(C.ids('add').length === DESIGN.length, `add: ${C.ids('add').length} rounds = the design's 14`);
const totals = {}; let shorter = 0, longer = 0, equal = 0;
C.ids('add').forEach(i => {
  const r = C.round('add', i), [a, b, t] = DESIGN[i], tag = `add#${i} ${a}+${b}`;
  ok(r.a === a && r.b === b && r.answer === t && a + b === t, `${tag}: the round is the design's (${r.a}+${r.b}=${r.answer})`);
  ok(a >= 1 && a <= 9 && b >= 1 && b <= 9 && t >= 11 && t <= 17, `${tag}: addends 1–9, total 11–17 (crosses ten)`);
  const hole = 10 - a, rest = b - hole;
  ok(hole >= 1 && rest >= 1, `${tag}: the split (${hole}, ${rest}) has both parts ≥ 1`);
  ok(r.swapOk === (a < b), `${tag}: swap offered iff the first number is the smaller`);
  ok(10 + b !== t, `${tag}: the 10 + b slip never equals the total`);
  if (hole < rest) shorter++; else if (hole > rest) longer++; else equal++;
  totals[t] = (totals[t] || 0) + 1;
  if (i < 8) ok(a === OLD[i][0] && b === OLD[i][1], `${tag}: an old sum kept`);
});
ok(shorter === 7 && longer === 5 && equal === 2, `add: the plug is shorter 7 / longer 5 / equal 2 (${shorter}/${longer}/${equal}) — "drag the small piece" fails`);
ok(totals[13] === 3 && Object.values(totals).every(n => n <= 3) && Object.keys(totals).length === 7, `add: totals 11–17, none above 3 ${JSON.stringify(totals)}`);
ok(C.ids('m10').length === 8 && C.ids('m10').every(i => { const r = C.round('m10', i); return r.a === M10[i] && r.answer === 10 - M10[i] && r.b === 10; }), 'm10: the design\'s eight ks, partner 10 − k');
ok(new Set(C.ids('m10').map(i => C.round('m10', i).answer)).size === 8, 'm10: eight different answers');

/* ---- the plug physics for every piece length, every round, both levels ---- */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), hole = 10 - r.a, tag = `${L}#${i}`;
  for (let j = 1; j < r.b; j++) for (const which of [0, 1]) {
    const st = C.newState(r, 'snap'); const two = C.snap(st, st.pieces[0].id, j);
    ok(two && st.pieces.length === 2 && two[0].len === j && two[1].len === r.b - j, `${tag} snap at ${j}`);
    ok(L === 'm10' || (st.first && st.first[0] === j && st.first[1] === r.b - j), `${tag} snap at ${j}: the bond shows the split`);
    const pc = two[which], res = C.plug(st, pc.id), want = pc.len === hole ? 'fit' : pc.len > hole ? 'long' : 'short';
    ok(res === want, `${tag} piece ${pc.len} into a hole of ${hole}: ${res} = ${want}`);
    if (want === 'fit') { ok(st.plugged && C.left(st) === r.b - hole, `${tag}: the ten is full, ${r.b - hole} left`); }
    if (want === 'long') { ok(pc.where === 'mat' && !st.plugged && C.inRack(st) === 0, `${tag}: a long piece bounces back`); }
    if (want === 'short') { ok(pc.where === 'rack' && !st.plugged, `${tag}: a short piece stays in the hole`); ok(C.unplug(st, pc.id) && pc.where === 'mat', `${tag}: a short piece can be taken out`); }
  }
  /* two short pieces that add up to the hole fill it too */
  if (hole >= 2 && r.b >= hole) {
    const st = C.newState(r, 'snap'); const ab = C.snap(st, st.pieces[0].id, hole); C.snap(st, ab[0].id, 1);
    const ones = st.pieces.filter(p => p.where === 'mat');
    ok(ones.length === 3, `${tag}: three pieces`);
    ok(C.snap(st, ones[2].id, 1) === null || ones[2].len === 1, `${tag}: no fourth piece`);
    const a1 = ones[0], a2 = ones[1];
    ok(C.plug(st, a1.id) === 'short' && C.plug(st, a2.id) === 'fit' && st.plugged, `${tag}: ${a1.len} + ${a2.len} fill the hole of ${hole}`);
  }
  /* undo joins the stick; a snapped stick that is plugged cannot be undone */
  { const st = C.newState(r, 'snap'); C.snap(st, st.pieces[0].id, 1); ok(C.reset(st) && C.whole(st) && st.first === null, `${tag}: the round arrow joins the stick`); }
}
/* ---- swap ---- */
for (const i of C.ids('add')) {
  const r = C.round('add', i), st = C.newState(r, 'snap'), tag = `add#${i}`;
  const did = C.swap(st);
  ok(did === r.swapOk, `${tag}: swap ${r.swapOk ? 'works' : 'is refused'}`);
  if (did) {
    ok(st.a === r.b && st.b === r.a && C.hole(st) === 10 - r.b && st.pieces[0].len === r.a, `${tag}: after the swap the rack holds ${r.b}, the stick is ${r.a}`);
    C.snap(st, st.pieces[0].id, 10 - r.b); ok(C.plug(st, st.pieces[0].id) === 'fit' && C.left(st) === r.a - (10 - r.b), `${tag}: the swapped split fits`);
    String(r.answer).split('').forEach(d => C.type(st, d)); ok(C.check(st).ok, `${tag}: the total is unchanged by the swap`);
    const s2 = C.newState(r, 'snap'); C.snap(s2, s2.pieces[0].id, 1); ok(!C.swap(s2), `${tag}: no swap once the stick is snapped`);
  }
}
/* ---- the keys, the check, the misses ---- */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), hole = 10 - r.a, tag = `${L}#${i}`;
  const st = C.newState(r, 'snap');
  ok(C.type(st, '1') === false && st.typed === '', `${tag}: the keys sleep until the ten is full`);
  ok(!C.check(st).ok && st.misses === 0 && C.hint(st) === 'hSnap', `${tag}: the tick before the plug is a hint, no miss`);
  C.snap(st, st.pieces[0].id, hole); C.plug(st, st.pieces[0].id);
  ok(C.hint(st) === (L === 'm10' ? 'nFitM10' : 'nFit'), `${tag}: the fit is announced`);
  ok(C.type(st, '0') === false, `${tag}: a leading 0 is refused`);
  ok(!C.check(st).ok && st.misses === 0 && C.hint(st) === (L === 'm10' ? 'nFitM10' : 'hEmpty'), `${tag}: an empty box is a hint`);
  if (L === 'add') {
    String(10 + r.b).split('').forEach(d => C.type(st, d)); const res = C.check(st), g = C.ghost(st);
    ok(!res.ok && st.misses === 1 && C.hint(st) === 'hOver', `${tag}: 10 + ${r.b} misses → hOver (those cubes are inside the ten)`);
    ok(g && g.slots === r.b && g.extra === hole && g.outside === 0, `${tag}: the 10 + b ghost shows exactly ${hole} extra (${JSON.stringify(g)})`);
    st.typed = ''; String(r.answer - 1).split('').forEach(d => C.type(st, d)); C.check(st); const g2 = C.ghost(st);
    ok(C.hint(st) === 'hOn' && st.show === 2 && g2.outside === 1 && g2.extra === 0, `${tag}: one too few → a cube outside, miss 2 → hOn`);
    C.type(st, 'del'); ok(st.show === 0 && C.hint(st) === null, `${tag}: a key press takes the help away`);
    { const s3 = C.newState(r, 'snap'); C.snap(s3, s3.pieces[0].id, hole); C.plug(s3, s3.pieces[0].id); String(r.answer - 1).split('').forEach(d => C.type(s3, d)); C.check(s3); ok(C.hint(s3) === 'hLeft', `${tag}: one too few on miss 1 → hLeft`); }
    { const s4 = C.newState(r, 'snap'); C.snap(s4, s4.pieces[0].id, 1); C.check(s4); ok(C.hint(s4) === 'hSnap2' && s4.misses === 0, `${tag}: the tick with a snapped stick → hSnap2`); }
  } else {
    C.type(st, String(r.answer === 9 ? 8 : r.answer + 1)); ok(!C.check(st).ok && C.hint(st) === 'hM10a', `${tag}: a wrong partner → hM10a`);
    C.type(st, 'del'); C.type(st, String(r.answer === 1 ? 2 : r.answer - 1)); C.check(st); ok(C.hint(st) === 'hM10b', `${tag}: miss 2 → hM10b`);
  }
  st.typed = ''; String(r.answer).split('').forEach(d => C.type(st, d)); ok(C.check(st).ok && st.done, `${tag}: the answer succeeds`);
  ok(C.snap(st, st.pieces.find(p => p.len > 1) ? st.pieces.find(p => p.len > 1).id : 'x', 1) === null && C.type(st, '1') === false, `${tag}: locked when done`);
  /* In my head: the keys are awake; a miss shows the strategy by itself */
  const h = C.newState(r, 'head');
  ok(C.type(h, String(r.answer)[0]) === true, `${tag} head: the keys are awake at rest`);
  h.typed = ''; const wrong = L === 'add' ? 10 + r.b : (r.answer === 9 ? 8 : r.answer + 1); String(wrong).split('').forEach(d => C.type(h, d));
  ok(!C.check(h).ok && h.plugged && h.auto && C.left(h) === r.b - hole && C.hint(h) === (L === 'm10' ? 'hM10a' : 'hShown'), `${tag} head: a miss snaps and plugs by itself`);
  const h2 = C.newState(r, 'head'); String(r.answer).split('').forEach(d => C.type(h2, d)); ok(C.check(h2).ok && h2.plugged, `${tag} head: right → the plug plays`);
  const h3 = C.newState(r, 'head'); ok(!C.check(h3).ok && C.hint(h3) === 'hType' && h3.misses === 0, `${tag} head: an empty box is a hint`);
}
/* ---- Make 10: only the partner fits (k = 5 the single exception) ---- */
for (const i of C.ids('m10')) {
  const r = C.round('m10', i), k = r.a, p = 10 - k, st = C.newState(r, 'snap');
  const two = C.snap(st, st.pieces[0].id, p);
  ok(two[0].len === p && two[1].len === k, `m10 k=${k}: the ten-stick snapped at ${p} gives (${p}, ${k})`);
  const s2 = C.newState(r, 'snap'); const t2 = C.snap(s2, s2.pieces[0].id, p);
  const kFits = C.plug(s2, t2[1].id) === 'fit';
  ok(kFits === (k === 5), `m10 k=${k}: the ${k}-piece ${k === 5 ? 'fits (the one exception)' : 'does not fit'}`);
}
/* ---- plan ---- */
for (const L of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null;
  for (let k = 0; k < 3000; k++) {
    const o = C.plan(L, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === C.ids(L).join(), `${L} plan is a permutation`);
    let adj = false; for (let q = 1; q < o.length; q++) if (C.round(L, o[q]).answer === C.round(L, o[q - 1]).answer) adj = true;
    ok(!adj, `${L} plan: no two equal answers in a row`);
    ok(!prev || prev.join() !== o.join(), `${L} plan differs from the previous pass`);
    prev = o;
  }
  for (let s0 = 1; s0 <= 60; s0++) { const mk = () => { let z = s0 * 7919; return () => (z = (z * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(L, mk(), null).order, o2 = C.plan(L, mk(), o1).order; ok(o1.join() !== o2.join(), `${L} seed ${s0}: a replayed seed gives a new order`); }
}
ok(C.layout(704).mode === 'wide' && C.layout(619).mode === 'narrow' && C.locale('xx') === 'en' && C.LOCALES.length === 11, 'layout + locales');
console.log(`verify-ten-plug-core: ${pass} pass, ${fail} fail${POISON ? ' (poison=' + POISON + ')' : ''}`);
fails.forEach(f => console.log('  FAIL: ' + f));
process.exit(fail ? 1 : 0);

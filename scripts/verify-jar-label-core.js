#!/usr/bin/env node
/* =====================================================================
   verify-jar-label-core.js — the model gate for ACTIVITY #7, "Rivet's
   Number Forge" (K.CC.A.3), the Jar Label.
   Run: node scripts/verify-jar-label-core.js   Env: JL_CORE_DIR → a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: the
   pools and their coverage, the slip table (its own copy, agreed
   exhaustively 0..99 × 0..20), the typing rules, the marks, the shelf,
   Check and the places it lays, the layout floors — picture ≥ 96 px at
   every desktop stage width 640…720 (≥ 72 at 560…639) and ≥ 64 px at 288…559 — and the
   320 × 640 budget: lid 44 + body for 20 toys ≤ 400 at a 288 px stage.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.JL_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'jar-label-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();
const rev = (n) => parseInt(String(n).split('').reverse().join(''), 10);
function slip(a, n) {
  if (a === null) return 'none';
  if (a === n) return 'right';
  if (n === 0) return 'zero';
  if (a >= 10 && rev(a) === n && a % 10 !== 0) return 'reversed';
  if (a >= 1 && a < 10 && n >= 10 && n % 10 === a) return 'oneDigit';
  return a < n ? 'more' : 'fewer';
}

is(C.MAX === 20 && C.DIGITS === 2 && C.THEME === 'toys' && C.LOOSE_MAX === 10, 'to 20, two digits, the toys theme, loose up to ten');
is(C.NOUNS.length >= 10 && new Set(C.NOUNS).size === C.NOUNS.length, `${C.NOUNS.length} distinct toys`);

/* 1. the slip table */
for (const [a, n, w] of [[14, 14, 'right'], [41, 14, 'reversed'], [31, 13, 'reversed'], [4, 14, 'oneDigit'], [0, 10, 'more'], [0, 20, 'more'], [1, 11, 'oneDigit'], [13, 14, 'more'], [15, 14, 'fewer'], [3, 0, 'zero'], [0, 0, 'right'], [null, 5, 'none'], [20, 2, 'fewer'], [2, 20, 'more'], [12, 21, 'reversed'], [10, 1, 'fewer'], [1, 10, 'more']]) is(C.classify(a, n) === w, `classify(${a}, ${n}) = ${w} (got ${C.classify(a, n)})`);
let dis = 0; for (let a = 0; a <= 99; a++) for (let n = 0; n <= 20; n++) if (C.classify(a, n) !== slip(a, n)) dis++;
is(dis === 0, `the slip table agrees with the gate's on every pair (${dis})`);

/* 2. the pools */
function audit(range, want) {
  const all = C.rounds(range, 'both', 'jl'), cnt = C.rounds(range, 'count', 'jl'), fil = C.rounds(range, 'fill', 'jl');
  is(all.length === want.count.length + want.fill.length && cnt.length === want.count.length && fil.length === want.fill.length, `${range}: ${all.length} rounds (${cnt.length} count + ${fil.length} fill)`);
  is(cnt.map(r => r.n).join() === want.count.join() && cnt.every(r => r.kind === 'count'), `${range}: count rounds ${want.count.join(' ')}`);
  is(fil.map(r => r.n).join() === want.fill.join() && fil.every(r => r.kind === 'fill'), `${range}: fill rounds ${want.fill.join(' ')}`);
  is(all.every(r => r.n >= 0 && r.n <= want.max && Number.isInteger(r.n)), `${range}: every n within 0..${want.max}`);
  is(new Set(all.map(r => r.id)).size === all.length, `${range}: ids distinct`);
  is(all.every(r => C.NOUNS.includes(r.noun)) && new Set(all.map(r => r.noun)).size >= Math.min(C.NOUNS.length, all.length) - 0, `${range}: a library toy per round, rotated (${new Set(all.map(r => r.noun)).size} distinct)`);
  is(JSON.stringify(C.rounds(range, 'both', 'jl')) === JSON.stringify(all) && C.rounds(range, 'both', 'x').some((r, i) => r.noun !== all[i].noun), `${range}: deterministic per seed, seeds differ`);
  return all;
}
const R20 = audit('to20', { count: [0, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], fill: [7, 12, 15], max: 20 });
const R10 = audit('to10', { count: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], fill: [3, 5, 8], max: 10 });
is(R20.filter(r => r.kind === 'count' && r.n >= 11 && r.n <= 19).length === 9, 'to20: every teen 11…19 is a count round');
is(R20.some(r => r.n === 0) && R10.some(r => r.n === 0), 'zero is a round in both ranges');
is(C.rounds('nonsense', 'nonsense', 'jl').length === 17, 'unknown range/task fall back to to20 / both');

/* 3. count rounds: typing, marks, check, places */
for (const r of R20.concat(R10).filter(r => r.kind === 'count')) {
  const st = C.newState(r);
  is(st.kind === 'count' && st.n === r.n && C.shown(st) === r.n && st.typed === '' && C.answer(st) === null && !st.done && C.verdict(st) === 'unfinished' && C.marked(st) === 0, `${r.id}: fresh`);
  is(st.jit.length === 20 && st.jit.every(j => Math.abs(j.x) <= C.JITTER && Math.abs(j.y) <= C.JITTER), `${r.id}: jitter within ±${C.JITTER}`);
  /* marks: one per toy, toggled, never past n */
  for (let i = 0; i < r.n; i++) is(C.toggleMark(st, i) && st.marks[i], `${r.id}: toy ${i} takes a mark`);
  is(C.marked(st) === r.n && !C.toggleMark(st, r.n) && !C.toggleMark(st, -1), `${r.id}: ${r.n} marks; no mark beyond the toys`);
  if (r.n) { C.toggleMark(st, 0); is(!st.marks[0] && C.marked(st) === r.n - 1, `${r.id}: a second tap removes the mark`); C.toggleMark(st, 0); }
  /* typing: two digits, leading zero replaced, erase */
  is(!C.typeDigit(st, 'x') && C.typeDigit(st, 0) && st.typed === '0' && C.typeDigit(st, 7) && st.typed === '7' && !C.typeDigit(st, 'a'), `${r.id}: 0 then 7 → "7"`);
  is(C.typeDigit(st, 3) && st.typed === '73' && !C.typeDigit(st, 1) && st.typed === '73' && C.answer(st) === 73, `${r.id}: two digits max (73)`);
  is(C.erase(st) && st.typed === '7' && C.erase(st) && st.typed === '' && !C.erase(st) && C.answer(st) === null, `${r.id}: erase twice, then nothing`);
  /* no label → none */
  let res = C.check(st);
  is(!res.ok && res.slip === 'none' && !st.done && C.places(st).length === 0, `${r.id}: Check with no label → none`);
  /* every wrong label 0..25 (except n) names the slip and lays the places */
  for (let a = 0; a <= 25; a++) {
    if (a === r.n) continue;
    st.typed = ''; C.typeDigit(st, Math.floor(a / 10) || a); if (a >= 10) C.typeDigit(st, a % 10);
    if (a < 10) st.typed = String(a);
    res = C.check(st);
    const want = slip(a, r.n);
    is(!res.ok && res.slip === want && !st.done && res.a === a && res.n === r.n, `${r.id}: label ${a} → ${want} (got ${res.slip})`);
    if (want === 'more') is(res.k === r.n - a, `${r.id}: ${res.k} left over`);
    if (want === 'fewer') is(res.k === a - r.n, `${r.id}: ${res.k} empty places`);
    const p = C.places(st), aa = Math.min(a, 20);
    is(p.length === Math.max(aa, r.n) && p.filter(x => x === 'ticked').length === Math.min(aa, r.n) && p.filter(x => x === 'leftover').length === Math.max(0, r.n - aa) && p.filter(x => x === 'empty').length === Math.max(0, aa - r.n), `${r.id}: places for label ${a}: ${p.filter(x => x === 'ticked').length} ticked / ${p.filter(x => x === 'leftover').length} over / ${p.filter(x => x === 'empty').length} empty`);
    is(p.slice(0, Math.min(aa, r.n)).every(x => x === 'ticked'), `${r.id}: the ticked places come first`);
  }
  /* typing again clears the laid places */
  st.typed = ''; C.typeDigit(st, 1); is(st.checked === null && C.places(st).length === 0, `${r.id}: a new digit clears the places`);
  /* the right label */
  st.typed = String(r.n); res = C.check(st);
  is(res.ok && res.slip === 'right' && st.done && C.verdict(st) === 'done' && C.places(st).length === 0, `${r.id}: the right label sticks`);
  is(!C.typeDigit(st, 5) && !C.erase(st) && !C.toggleMark(st, 0) && C.check(st).ok, `${r.id}: nothing moves when done`);
  /* the zero round takes only 0 */
  if (r.n === 0) { const z = C.newState(r); z.typed = '1'; is(C.check(z).slip === 'zero', `${r.id}: 1 on an empty jar → zero`); z.typed = '0'; is(C.check(z).ok, `${r.id}: 0 sticks`); }
}

/* 4. fill rounds: the shelf */
for (const r of R20.concat(R10).filter(r => r.kind === 'fill')) {
  const st = C.newState(r);
  is(st.kind === 'fill' && st.inJar === 0 && C.shown(st) === 0 && !C.typeDigit(st, 3) && !C.toggleMark(st, 0), `${r.id}: fresh fill round; no typing, no marks`);
  let res = C.check(st);
  is(!res.ok && res.slip === 'fillMore' && res.k === r.n && !st.done, `${r.id}: empty jar → fillMore ${r.n}`);
  for (let i = 0; i < r.n - 1; i++) is(C.addToJar(st), `${r.id}: drop ${i + 1}`);
  res = C.check(st);
  is(!res.ok && res.slip === 'fillMore' && res.k === 1, `${r.id}: one short → fillMore 1`);
  C.addToJar(st); C.addToJar(st); res = C.check(st);
  is(!res.ok && res.slip === 'fillFewer' && res.k === 1 && C.shown(st) === r.n + 1, `${r.id}: one over → fillFewer 1`);
  is(C.removeFromJar(st) && st.checked === null, `${r.id}: take one out clears the check`);
  res = C.check(st);
  is(res.ok && st.done && C.shown(st) === r.n && C.places(st).length === 0, `${r.id}: ${r.n} in the jar → done`);
  is(!C.addToJar(st) && !C.removeFromJar(st), `${r.id}: the shelf is closed when done`);
  const m = C.newState(r); for (let i = 0; i < 25; i++) C.addToJar(m);
  is(m.inJar === 20, `${r.id}: the jar holds at most 20`);
  const e = C.newState(r); is(!C.removeFromJar(e) && e.inJar === 0, `${r.id}: nothing to take from an empty jar`);
}

/* 5. layout */
for (let W = 560; W <= 720; W += 8) { const L = C.layout(W), floor = W >= 640 ? 96 : 72; is(L.mode === 'side' && L.cols === 5 && L.pic >= floor && L.padW >= 108 && L.jarW + 12 + L.padW === W && 5 * L.cell + 4 * L.gap <= L.jarW - 2 * L.jarPad, `side at W=${W}: picture ${L.pic} ≥ ${floor}, pad ${L.padW}`); }
for (let W = 288; W <= 559; W += 7) { const L = C.layout(W); is(L.mode === 'stack' && L.cols === 4 && L.pic >= 64 && 4 * L.cell + 3 * L.gap <= W - 2 * L.jarPad, `stack at W=${W}: picture ${L.pic} ≥ 64`); }
{ const L = C.layout(288), body = C.rowsFor(20, 4) * L.cell + (C.rowsFor(20, 4) - 1) * L.gap + 2 * L.jarPad; is(44 + body <= 400, `320 × 640 budget: lid 44 + body ${body} for 20 toys ≤ 400`); }
{ const L = C.layout(647), body = C.rowsFor(20, 5) * L.cell + 3 * L.gap + 2 * L.jarPad; is(body <= 440, `desktop: body ${body} for 20 toys ≤ 440 (fits 1366 × 900 with the chrome)`); }
is(C.rowsFor(0, 5) === 1 && C.rowsFor(10, 5) === 2 && C.rowsFor(11, 5) === 3 && C.rowsFor(20, 4) === 5, 'rows: 0 → 1, 10 → 2, 11 → 3, 20/4 → 5');
{ const r = R20.find(x => x.n === 6), st = C.newState(r), L = C.layout(647), o = C.offset(st, 0, L); is((o.x !== 0 || o.y !== 0) && Math.abs(o.x) <= L.cell * C.JITTER + 1, `six toys sit loosely (offset ${o.x}, ${o.y})`); }
{ const r = R20.find(x => x.n === 14), st = C.newState(r), L = C.layout(647); is(C.offset(st, 0, L).x === 0 && C.offset(st, 0, L).y === 0, 'fourteen toys stand in straight rows'); }
{ const r = R20.find(x => x.kind === 'fill'), st = C.newState(r), L = C.layout(300); for (let i = 0; i < 12; i++) C.addToJar(st); is(C.offset(st, 0, L).x === 0, 'a fill jar past ten straightens up'); }

console.log(`verify-jar-label-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);

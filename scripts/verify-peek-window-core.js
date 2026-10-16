#!/usr/bin/env node
/* =====================================================================
   verify-peek-window-core.js — the model gate for ACTIVITY #12, the Peek
   Window (K.CC.B.5). Its OWN ground truth, written from the standard and
   the design sheet, never read off the core.
   Run: node scripts/verify-peek-window-core.js
   Mutation: PW_CORE_DIR=<dir> loads the core from <dir> (mutate-peek-window.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..');
const DIR = process.env.PW_CORE_DIR || path.join(REPO, 'mini tools');
const C = require(path.join(DIR, 'peek-window-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

/* ---------- the ground truth ---------- */
const TRUTH = {
  to10: [[4, 'dice', 'fruits', 'apple'], [7, 'five', 'animals', 'duck'], [2, 'pairs', 'vegetables', 'carrot'], [5, 'dice', 'animals', 'cat'], [9, 'five', 'fruits', 'orange'], [3, 'scatter', 'vegetables', 'tomato'], [6, 'dice', 'animals', 'owl'], [8, 'pairs', 'fruits', 'strawberry'], [10, 'five', 'vegetables', 'pumpkin'], [5, 'line', 'animals', 'rabbit']],
  to5: [[3, 'dice', 'fruits', 'pear'], [1, 'dice', 'animals', 'pig'], [4, 'dice', 'vegetables', 'onion'], [2, 'pairs', 'fruits', 'lemon'], [5, 'dice', 'vegetables', 'corn'], [3, 'scatter', 'animals', 'duck'], [4, 'pairs', 'fruits', 'apple'], [5, 'line', 'vegetables', 'carrot']]
};
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = ['mushroom', 'dolphin', 'whale', 'watermelon', 'kiwi', 'avocado'];
/* the shapes, written out by hand: [col,row] cell tops inside a 5 × 3 box */
const SHAPES = {
  'dice:4': [[1, 0], [3, 0], [1, 2], [3, 2]], 'dice:5': [[1, 0], [3, 0], [2, 1], [1, 2], [3, 2]], 'dice:6': [[1, 0], [1, 1], [1, 2], [3, 0], [3, 1], [3, 2]],
  'dice:1': [[2, 1]], 'dice:3': [[1, 0], [2, 1], [3, 2]],
  'five:7': [[0, 0.5], [1, 0.5], [2, 0.5], [3, 0.5], [4, 0.5], [0, 1.5], [1, 1.5]],
  'five:10': [[0, 0.5], [1, 0.5], [2, 0.5], [3, 0.5], [4, 0.5], [0, 1.5], [1, 1.5], [2, 1.5], [3, 1.5], [4, 1.5]],
  'pairs:8': [[0.5, 0.5], [0.5, 1.5], [1.5, 0.5], [1.5, 1.5], [2.5, 0.5], [2.5, 1.5], [3.5, 0.5], [3.5, 1.5]],
  'line:5': [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]]
};
const near = (a, b) => Math.abs(a - b) < 1e-9;

console.log('[A] the rounds');
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'pw'), T = TRUTH[range], max = range === 'to5' ? 5 : 10;
  is(R.length === T.length && R.length >= 7, `${range}: ${T.length} rounds (≥ 7)`);
  is(R.every((r, i) => r.n === T[i][0] && r.p === T[i][1] && r.theme === T[i][2] && r.noun === T[i][3]), `${range}: n, shape, theme and picture are the design sheet's`);
  is(R.every(r => r.n >= 1 && r.n <= max && r.max === max), `${range}: every group 1..${max} — never 0`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  is(R.every((r, i) => i === 0 || r.noun !== R[i - 1].noun), `${range}: the picture changes from one round to the next`);
  is(R.every(r => r.p !== 'scatter' || r.n <= 5), `${range}: no scatter of more than five (more is counted, not seen)`);
  is(R.every(r => r.p !== 'dice' || r.n <= 6) && R.every(r => r.p !== 'five' || r.n >= 6), `${range}: dice faces to 6, five-and-more from 6`);
  for (const r of R) {
    is(!OUT.includes(r.noun), `${r.id}: "${r.noun}" passed the contact sheet`);
    const pics = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pictures', r.theme + '.json'), 'utf8'));
    const e = pics.nouns[r.noun];
    is(!!e && LOCALES.every(l => e.labels && e.labels[l] && e.labels[l][0]), `${r.id}: ${r.theme}/${r.noun} labelled in all 11 locales`);
    is(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', r.theme, r.noun + '@2x.webp')), `${r.id}: ${r.theme}/${r.noun}@2x.webp on disk`);
  }
}
is(C.rounds('nonsense', 'pw').length === 10, 'an unknown range falls back to to 10');
is(C.THEMES.slice().sort().join() === 'animals,fruits,vegetables', 'three colour themes');

console.log('[B] the shapes');
for (const [k, want] of Object.entries(SHAPES)) {
  const [p, n] = k.split(':'); const got = C.positions(p, Number(n));
  is(!!got && got.length === want.length && got.every((q, i) => near(q[0], want[i][0]) && near(q[1], want[i][1])), `${k} is drawn where the design says`);
}
for (const range of ['to10', 'to5']) for (const r of C.rounds(range, 'pw')) {
  const pos = C.positions(r.p, r.n);
  is(!!pos && pos.length === r.n, `${r.id}: ${r.n} pictures`);
  is(pos.every(q => q[0] >= 0 && q[1] >= 0 && q[0] + 1 <= C.BOX_W + 1e-9 && q[1] + 1 <= C.BOX_H + 1e-9), `${r.id}: every picture inside the 5 × 3 box`);
  let minD = Infinity; for (let i = 0; i < pos.length; i++) for (let j = i + 1; j < pos.length; j++) minD = Math.min(minD, Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]));
  is(minD >= 1 - 1e-9, `${r.id}: no two pictures overlap (closest ${minD === Infinity ? '—' : minD.toFixed(2)} cells)`);
}
is(C.positions('dice', 7) === null && C.positions('five', 5) === null && C.positions('pairs', 3) === null && C.positions('scatter', 6) === null && C.positions('line', 6) === null, 'impossible shapes are refused, never improvised');

console.log('[C] looking, choosing, checking');
{
  const r = C.rounds('to10', 'pw')[1];   /* 7 */
  const st = C.newState(r);
  is(st.looks === 0 && st.answer === null && !C.staysOpen(st), 'the window starts shut, nothing chosen');
  is(C.look(st) && C.look(st) && st.looks === 2, 'looking again is always allowed');
  is(!C.choose(st, 0) && !C.choose(st, 11) && !C.choose(st, 2.5) && st.answer === null, 'only 1..10 can be chosen — no 0');
  let res = C.check(st);
  is(!res.ok && res.slip === 'none' && st.misses === 0 && !C.staysOpen(st), 'Check with nothing chosen is not a miss');
  C.choose(st, 6); res = C.check(st);
  is(!res.ok && res.slip === 'fewer' && st.misses === 1 && C.staysOpen(st), '6 for 7: a miss; the window stays open now');
  is(C.hintKey(st) === 'hintFive' && C.labels(st).every(x => x === ''), 'five-and-more: the hint names the five; no numbers yet');
  C.choose(st, 8); res = C.check(st);
  is(!res.ok && res.slip === 'more' && st.misses === 2, '8 for 7: too many, second miss');
  is(C.hintKey(st) === 'hintCountOn' && C.labels(st).join() === '1,2,3,4,5,6,?', 'second miss: the numbers run to a "?" on the last picture');
  C.choose(st, 7); res = C.check(st);
  is(res.ok && st.done && C.labels(st).join() === '1,2,3,4,5,6,7' && C.helpLevel(st) === 0, '7: done, every picture numbered, the last one 7');
  is(!C.look(st) && !C.choose(st, 3) && C.check(st).ok, 'a finished round takes nothing more');
  const d = C.newState(C.rounds('to10', 'pw')[0]); C.choose(d, 3); C.check(d);
  is(C.hintKey(d) === 'hintCount', 'a dice shape: the plain "count them" hint');
  const e = C.newState(C.rounds('to5', 'pw')[0]);
  is(!C.choose(e, 6) && C.choose(e, 5), 'up to 5: the rail stops at 5');
  C.choose(e, 2); C.check(e); C.choose(e, 1);
  is(e.checked === null, 'a new choice clears the old verdict');
}
/* every round: exactly one number is right */
for (const range of ['to10', 'to5']) for (const r of C.rounds(range, 'pw')) {
  let rights = 0; for (let a = 1; a <= r.max; a++) { const s = C.newState(r); C.choose(s, a); if (C.check(s).ok) rights++; }
  is(rights === 1, `${r.id}: one right number`);
}

console.log('[D] layout');
for (let W = 240; W <= 1400; W += 2) for (const max of [10, 5]) {
  const L = C.layout(W, max), tag = `W ${W} max ${max}`;
  const railW = L.mode === 'side' ? L.railW : max * L.chip;
  const total = L.mode === 'side' ? L.winW + 8 + L.railW : Math.max(L.winW, L.mode === 'narrow' ? 5 * L.chip + 16 : 0);
  if (!(total <= W)) is(false, `${tag}: the window and the rail fit (${total} > ${W})`);
  if (!(L.chip >= 44)) is(false, `${tag}: number chips ≥ 44 px (${L.chip})`);
  if (W >= 560 && L.mode !== 'wide') is(false, `${tag}: wide from 560`);
  if (W >= 640 && !(L.pic >= 96)) is(false, `${tag}: pictures ≥ 96 px from 640 (${L.pic})`);
  if (W >= 328 && W < 560 && L.mode !== 'side') is(false, `${tag}: side layout on a phone`);
  if (L.mode === 'side' && !(L.pic >= 64)) is(false, `${tag}: phone pictures ≥ 64 px (${L.pic})`);
  if (L.mode === 'side' && !(5 * 45 + 4 * 4 <= L.winH)) is(false, `${tag}: the rail column is no taller than the window`);
  void railW;
}
is(true, 'layout sweep 240–1400');
const L704 = C.layout(648, 10), L360 = C.layout(328, 10);
is(L704.mode === 'wide' && L704.pic === 102 && L360.mode === 'side' && L360.pic === 64, 'spot values: a 704 stage → 102 px pictures; a 360 phone → upright window, 64 px');
const pl = C.place([4, 2], L360);
is(near(pl.cx, 2.5 * L360.cell) && near(pl.cy, 4.5 * L360.cell), 'the upright window transposes the box (column 4, row 2 → x 2, y 4)');

console.log(`\nverify-peek-window-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

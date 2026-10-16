#!/usr/bin/env node
/* =====================================================================
   verify-fruit-crates-core.js — the model gate for ACTIVITY #8, the Fruit
   Crates (K.CC.A.3). Exhaustive where the model is finite: every pool,
   every typed number 0–99 against every n 0–20 (slip table), the whole
   help ladder (misses 0–3 × n 0–20: level, chips, hint key), typing,
   erasing, the frame order, the layout floors at every width 280–1400.
   ⭐ The expectations are written out HERE from the design sheet
   (docs/activities-rebuild/008-fruit-crates.md) — never read off the core.
   Usage: node scripts/verify-fruit-crates-core.js   (FC_CORE_DIR=<dir> to test a mutant)
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.FC_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'fruit-crates-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 30) console.error('   FAIL: ' + m); } };

/* ---- the ground truth ---- */
/* never 0 (operator 2026-10-16: counting activities never include 0) */
const POOL20 = [3, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], POOL10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FRUIT = ['apple', 'banana', 'pear', 'lemon', 'strawberry', 'orange', 'pineapple', 'cherry'];
function slip(a, n) {
  if (a === null) return 'none';
  if (a === n) return 'right';
  if (a >= 10 && a <= 99 && a % 10 !== 0 && (a % 10) * 10 + Math.floor(a / 10) === n) return 'reversed';
  if (a >= 1 && a <= 9 && n >= 10 && n - 10 * Math.floor(n / 10) === a) return 'oneDigit';
  if (a === 10 && n > 10) return 'tensOnly';
  return a < n ? 'more' : 'fewer';
}
const below = (n) => [5, 10, 15, 20].filter(L => L < n);
function level(n, m) { if (n === 0 || m === 0) return 0; if (m >= 2) return 2; return below(n).length ? 1 : 0; }
function chips(n, m, done) {
  const o = new Array(n).fill('');
  if (done) { below(n).forEach(L => { o[L - 1] = L; }); if (n) o[n - 1] = n; return o; }
  const lv = level(n, m);
  if (lv >= 1) below(n).forEach(L => { o[L - 1] = L; });
  if (lv === 2) { const from = below(n).length ? below(n)[below(n).length - 1] : 0; for (let v = from + 1; v < n; v++) o[v - 1] = v; o[n - 1] = '?'; }
  return o;
}
function hint(s, n, m) {
  if (s === 'none') return 'hintNone';
  const lv = level(n, m);
  if (lv === 2) return 'hintCountOn';
  if (s === 'reversed') return 'hintReversed';
  if (s === 'oneDigit') return 'hintOneDigit';
  if (s === 'tensOnly') return 'hintTensOnly';
  if (lv === 0) return s === 'more' ? 'hintRecountMore' : 'hintRecountFewer';
  return s === 'more' ? 'hintMore' : 'hintFewer';
}
/* a state that has had m misses on n, the slate showing a */
function stateAfter(n, misses, last) {
  const st = C.newState({ id: 'x', n, crates: 2, noun: 'apple', seed: 's' });
  const wrongs = [];
  for (let a = 0; a <= 99 && wrongs.length < misses; a++) if (a !== n) wrongs.push(a);
  if (last !== undefined && misses) wrongs[misses - 1] = last;
  for (const a of wrongs) { st.typed = ''; String(a).split('').forEach(d => C.typeDigit(st, d)); C.check(st); }
  return st;
}

console.log('[A] constants and pools');
is(C.MAX === 20 && C.DIGITS === 2 && C.CRATE === 10 && C.LINE === 5, 'MAX 20, two digits, crates of ten, lines of five');
is(C.THEME === 'fruits' && C.NOUNS.slice().sort().join() === FRUIT.slice().sort().join(), `the eight fruits read on the contact sheet (${C.NOUNS.join()})`);
is(C.LOOKS.join() === 'open,quick', 'looks: open, quick');
for (const [range, want, cr] of [['to20', POOL20, 2], ['to10', POOL10, 1]]) {
  const r = C.rounds(range, 'fc');
  is(r.map(x => x.n).join() === want.join(), `${range}: rounds ${r.map(x => x.n).join()}`);
  is(r.length >= 7, `${range}: at least seven originals (${r.length})`);
  is(r.every(x => x.crates === cr), `${range}: ${cr} crate(s) every round`);
  is(new Set(r.map(x => x.id)).size === r.length, `${range}: ids unique`);
  is(r.every(x => FRUIT.indexOf(x.noun) >= 0), `${range}: every round one library fruit`);
  is(new Set(r.map(x => x.noun)).size === Math.min(FRUIT.length, r.length), `${range}: the fruit varies — ${new Set(r.map(x => x.noun)).size} kinds`);
  for (let i = 1; i < r.length; i++) if (r[i].noun === r[i - 1].noun) is(false, `${range}: two neighbouring rounds share ${r[i].noun}`);
  is(JSON.stringify(C.rounds(range, 'fc')) === JSON.stringify(r), `${range}: rounds are deterministic for a seed`);
  is(C.rounds(range, 'other').map(x => x.noun).join() !== r.map(x => x.noun).join(), `${range}: the seed moves the fruit`);
}
is(C.rounds('bogus', 'fc').map(x => x.n).join() === POOL20.join(), 'an unknown range falls back to to 20');
is(C.crates('to10') === 1 && C.crates('to20') === 2, 'crates per range');

console.log('[B] typing');
{
  const st = C.newState({ id: 'x', n: 14, crates: 2, noun: 'apple', seed: 's' });
  is(st.typed === '' && C.answer(st) === null && st.misses === 0 && !st.done && st.checked === null, 'a fresh slate is empty');
  is(!C.erase(st), 'erasing an empty slate does nothing');
  is(!C.typeDigit(st, 'x') && !C.typeDigit(st, '12') && !C.typeDigit(st, -1) && st.typed === '', 'only single digits');
  C.typeDigit(st, 0); is(st.typed === '0' && C.answer(st) === 0, 'a lone 0 stays');
  C.typeDigit(st, 7); is(st.typed === '7', 'a leading zero is replaced');
  C.typeDigit(st, 1); is(st.typed === '71', 'two digits');
  is(!C.typeDigit(st, 4) && st.typed === '71', 'a third digit is refused');
  C.erase(st); is(st.typed === '7', 'erase takes the last digit');
  C.erase(st); C.typeDigit(st, 1); C.typeDigit(st, 4); C.check(st);
  is(st.done && !C.typeDigit(st, 3) && !C.erase(st) && st.typed === '14', 'a finished round takes no more typing');
  /* with ONE digit on the slate, so the two-digit limit cannot be what refuses */
  const s7 = C.newState({ id: 'y', n: 7, crates: 2, noun: 'pear', seed: 's' }); C.typeDigit(s7, 7); C.check(s7);
  is(s7.done && !C.typeDigit(s7, 3) && s7.typed === '7', 'a finished one-digit round takes no more typing');
}

console.log('[C] the slip table, every a 0–99 against every n 1–20');
for (let n = 1; n <= 20; n++) for (let a = 0; a <= 99; a++) is(C.classify(a, n) === slip(a, n), `classify(${a}, ${n}) = ${C.classify(a, n)}, want ${slip(a, n)}`);
for (let n = 1; n <= 20; n++) is(C.classify(null, n) === 'none', `nothing written on ${n} = none`);
is(C.classify(41, 14) === 'reversed' && C.classify(4, 14) === 'oneDigit' && C.classify(10, 14) === 'tensOnly' && C.classify(10, 20) === 'tensOnly' && C.classify(1, 10) === 'more' && C.classify(2, 20) === 'more' && C.classify(21, 12) === 'reversed' && C.classify(11, 11) === 'right', 'the named examples of the design sheet');

console.log('[D] check and misses');
for (const n of POOL20) {
  const st = C.newState({ id: 'x', n, crates: 2, noun: 'apple', seed: 's' });
  let r = C.check(st);
  is(!r.ok && r.slip === 'none' && st.misses === 0 && !st.done, `n=${n}: Check on an empty slate counts no miss`);
  const wrong = n === 20 ? 19 : n + 1;
  String(wrong).split('').forEach(d => C.typeDigit(st, d)); r = C.check(st);
  is(!r.ok && r.slip === slip(wrong, n) && r.a === wrong && st.misses === 1 && st.checked === r, `n=${n}: ${wrong} is a miss (${r.slip})`);
  r = C.check(st); is(st.misses === 2, `n=${n}: checking the same wrong number again is another miss`);
  st.typed = ''; String(n).split('').forEach(d => C.typeDigit(st, d)); r = C.check(st);
  is(r.ok && st.done && st.misses === 2, `n=${n}: the right number finishes, misses kept`);
  is(C.check(st).ok && st.misses === 2, `n=${n}: a finished round stays finished`);
}

console.log('[E] the help ladder — level, chips, hint, for misses 0–3 on every n');
for (let n = 1; n <= 20; n++) for (let m = 0; m <= 3; m++) {
  const last = n === 0 ? 3 : (n >= 1 ? n - 1 : n + 1);
  const st = stateAfter(n, m, m ? last : undefined);
  is(st.misses === m, `n=${n} m=${m}: misses counted`);
  is(C.helpLevel(st) === level(n, m), `n=${n} m=${m}: help level ${C.helpLevel(st)}, want ${level(n, m)}`);
  is(JSON.stringify(C.chips(st)) === JSON.stringify(chips(n, m, false)), `n=${n} m=${m}: chips ${JSON.stringify(C.chips(st))}, want ${JSON.stringify(chips(n, m, false))}`);
  if (m) is(C.hintKey(st) === hint(slip(last, n), n, m), `n=${n} m=${m}: hint ${C.hintKey(st)}, want ${hint(slip(last, n), n, m)}`);
  /* the help never writes the answer */
  is(C.chips(st).indexOf(n) === -1 || n === 0, `n=${n} m=${m}: no chip carries ${n} before it is written`);
  if (m >= 2 && n > 0) is(C.chips(st)[n - 1] === '?' && C.chips(st).filter(c => c === '?').length === 1, `n=${n} m=${m}: one "?", on the last fruit`);
}
for (const n of [6, 10, 14, 17]) for (const a of [n - 1, n + 1]) {
  const st = stateAfter(n, 1, a);
  is(C.hintKey(st) === (a < n ? 'hintMore' : 'hintFewer'), `n=${n}: a first miss of ${a} → ${C.hintKey(st)}`);
}
for (const n of [1, 3, 5]) { const st = stateAfter(n, 1, n + 1); is(C.hintKey(st) === 'hintRecountFewer' && C.chips(st).every(c => c === ''), `n=${n}: a first miss on five or fewer → count again, no numbers`); }
{ const st = stateAfter(14, 1, 41); is(C.hintKey(st) === 'hintReversed', '41 for 14 → hintReversed'); }
{ const st = stateAfter(14, 1, 4); is(C.hintKey(st) === 'hintOneDigit', '4 for 14 → hintOneDigit'); }
{ const st = stateAfter(14, 1, 10); is(C.hintKey(st) === 'hintTensOnly', '10 for 14 → hintTensOnly'); }
{ const st = C.newState({ id: 'x', n: 9, crates: 2, noun: 'apple', seed: 's' }); C.check(st); is(C.hintKey(st) === 'hintNone' && C.helpLevel(st) === 0, 'an empty Check → hintNone, no help'); }
for (let n = 1; n <= 20; n++) {
  const st = stateAfter(n, 2, n - 1); st.typed = ''; String(n).split('').forEach(d => C.typeDigit(st, d)); C.check(st);
  is(st.done && C.helpLevel(st) === 0 && JSON.stringify(C.chips(st)) === JSON.stringify(chips(n, 2, true)), `n=${n}: done → the crates read themselves: ${JSON.stringify(C.chips(st))}`);
}

console.log('[F] frame order');
for (let i = 0; i < 20; i++) {
  const p = C.place(i), c = Math.floor(i / 10), j = i % 10;
  is(p.crate === c && p.box === j && p.line === (j < 5 ? 0 : 1) && p.pos === j % 5, `fruit ${i}: crate ${p.crate}, line ${p.line}, place ${p.pos}`);
}

console.log('[G] layout floors at every width 280–1400');
for (let W = 280; W <= 1400; W++) for (const nc of [1, 2]) {
  const L = C.layout(W, nc), tag = `W=${W} crates=${nc}`;
  if (W >= 560) {
    is(L.mode === 'row' && L.cols === 5 && L.rows === 2, `${tag}: row, 5 × 2`);
    const crateW = 5 * L.boxW + 4 * L.gap + 2 * L.frame;
    is(crateW <= W && crateW >= 0.9 * W || L.boxW === 150, `${tag}: the crates fill the width (${crateW} of ${W})`);
    is(L.box <= 104 && L.box <= L.boxW && L.box >= 96, `${tag}: fruit ${L.box} in 96–104`);
    is(L.key >= 44 && L.key <= 52, `${tag}: keys ${L.key} ≥ 44`);
    const rowW = (L.inline ? L.slate + 12 : 0) + 11 * L.key + 10 * 4;
    is(rowW <= W, `${tag}: the key row fits (${rowW} of ${W}, inline ${L.inline})`);
    is(L.inline === (W >= 96 + 12 + 11 * 44 + 40), `${tag}: the slate joins the key row from 632`);
  } else {
    is(L.mode === 'stack' && L.cols === 2 && L.rows === 5, `${tag}: stack, vertical frames 2 × 5`);
    const used = nc === 1 ? 2 * L.boxW + L.gap + 2 * L.frame : 4 * L.boxW + 2 * L.gap + 4 * L.frame + L.between;
    is(used <= W, `${tag}: the crates fit (${used} of ${W})`);
    is(L.box <= L.boxW && L.box <= (nc === 1 ? 84 : 68), `${tag}: fruit ${L.box} under the height cap`);
    if (W >= 288) is(L.box >= 64, `${tag}: fruit ${L.box} ≥ 64`);
    is(nc === 2 ? 5 * L.box + 4 * L.gap + 2 * L.frame <= 5 * 68 + 18 : true, `${tag}: a crate of ten stands ≤ 358 tall`);
  }
}

console.log(`verify-fruit-crates-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

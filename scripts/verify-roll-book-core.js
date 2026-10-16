#!/usr/bin/env node
/* =====================================================================
   verify-roll-book-core.js — the model gate for ACTIVITY #13, the Roll
   Book (K.CC.B.5 + writing the numeral). Its OWN ground truth, written from
   the standard and the design sheet, never read off the core.
   Run: node scripts/verify-roll-book-core.js
   Mutation: RB_CORE_DIR=<dir> loads the core from <dir> (mutate-roll-book.js);
   the two tracing cores always load from mini tools/ (they are not under test).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
global.NumberTraceCore = require(path.join(MINI, 'number-trace-core.js')).NumberTraceCore || global.NumberTraceCore;
global.StrokeTraceCore = require(path.join(MINI, 'stroke-trace-core.js')).StrokeTraceCore || global.StrokeTraceCore;
const DIR = process.env.RB_CORE_DIR || MINI;
const C = require(path.join(DIR, 'roll-book-core.js'));
const ST = global.StrokeTraceCore, NT = global.NumberTraceCore;
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the ground truth ---------- */
const TRUTH = { to9: { n: [5, 7, 3, 9, 6, 8, 4, 2], raft: 10, max: 9 }, to5: { n: [3, 5, 2, 4, 1, 5, 2, 4], raft: 7, max: 5 } };
function trace(st, d) { for (const s of NT.glyphFor(d, st.lang)) { for (const p of ST.flatten(s, 1)) C.sample(st, p); C.endStroke(st); } }
function make(n, lang, max) { return C.newState({ id: 'x-' + n, n, card: 'frame', raft: max === 5 ? 7 : 10, max: max || 9 }, lang || 'en'); }

console.log('[A] the rounds');
for (const range of ['to9', 'to5']) {
  const R = C.rounds(range, 'rb'), T = TRUTH[range];
  is(R.length === T.n.length && R.length >= 7, `${range}: ${T.n.length} rounds (≥ 7)`);
  is(R.map(r => r.n).join() === T.n.join(), `${range}: Mama calls ${T.n.join(' ')}`);
  is(R.every(r => r.n >= 1 && r.n <= T.max && r.max === T.max), `${range}: every call 1..${T.max} — never 0`);
  is(R.every(r => r.raft === T.raft && r.raft > r.n), `${range}: the raft holds ${T.raft} — always more than Mama calls`);
  is(R.every(r => r.card !== 'scatter' || r.n <= 5), `${range}: no scattered card of more than five`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
}
is(C.rounds('nonsense', 'rb').length === 8 && C.rounds('nonsense', 'rb')[0].max === 9, 'an unknown range falls back to up to 9');
{
  const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', C.THEME + '.json'), 'utf8')).nouns[C.NOUN];
  is(!!pics && LOCALES.every(l => pics.labels[l] && pics.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, C.NOUN + '@2x.webp')), `${C.THEME}/${C.NOUN} is a labelled library picture`);
}

console.log('[B] Mama\'s card');
for (let n = 1; n <= 9; n++) {
  const d = C.dots('frame', n);
  is(!!d && d.length === n && d.every((q, i) => q[0] === (i % 5) + 0.5 && q[1] === Math.floor(i / 5) + 0.5), `frame ${n}: rows of five, the top row first`);
}
for (let n = 1; n <= 5; n++) {
  const d = C.dots('scatter', n); let minD = Infinity;
  for (let i = 0; i < d.length; i++) for (let j = i + 1; j < d.length; j++) minD = Math.min(minD, Math.hypot(d[i][0] - d[j][0], d[i][1] - d[j][1]));
  is(d.length === n && d.every(q => q[0] >= 0.4 && q[0] <= 4.6 && q[1] >= 0.4 && q[1] <= 1.6) && minD >= 0.9, `scatter ${n}: inside the card, no two dots touch (${minD === Infinity ? '—' : minD.toFixed(2)})`);
}
is(C.dots('scatter', 6) === null, 'no scatter of six');

console.log('[C] the raft and the bank');
{
  const st = make(5);
  is(C.aboard(st) === 10 && st.bank.length === 0, 'the round opens with everyone on the raft');
  const spots = []; for (let i = 0; i < 4; i++) spots.push(C.send(st));
  is(spots.join() === '0,1,2,3' && C.aboard(st) === 6, 'each tap sends one duckling to the next free spot');
  is(C.recall(st, 1) === 1 && st.bank.join() === '0,2,3' && C.aboard(st) === 7, 'a duckling sent back frees its spot; the others keep theirs');
  is(C.send(st) === 1 && st.bank.join() === '0,2,3,1', 'the next duckling takes the freed spot');
  for (let i = 0; i < 20; i++) C.send(st);   /* bounded: a loop in a gate never waits on the tool to refuse */
  is(st.bank.length === 10 && C.aboard(st) === 0 && C.send(st) === -1, 'never more than the raft holds');
  is(C.recall(st, 10) === -1 && C.recall(st, -1) === -1, 'no recall outside the bank');
  is(new Set(st.bank).size === st.bank.length, 'two ducklings never share a spot');
}

console.log('[D] signing the roll');
for (const lang of LOCALES) for (let d = 1; d <= 9; d++) {
  const st = make(d, lang); for (let i = 0; i < d; i++) C.send(st);
  is(C.stamp(st, d) && st.digit === d && !C.signed(st), `${lang} ${d}: the stamp lays the dotted ${d}, not yet signed`);
  trace(st, d);
  is(C.signed(st), `${lang} ${d}: tracing the ${d} along its strokes signs the roll`);
}
{
  const st = make(4); C.send(st);
  is(!C.stamp(st, 0) && !C.stamp(st, 10) && !C.stamp(st, 2.5) && st.digit === null, 'stamps run 1..9 — no 0');
  const s5 = make(3, 'en', 5); is(!C.stamp(s5, 6) && C.stamp(s5, 5), 'up to 5: the stamps stop at 5');
  const s = make(4); C.stamp(s, 4);
  for (const p of ST.flatten(NT.glyphFor(4, 'en')[0], 1).reverse()) C.sample(s, p); C.endStroke(s);
  is(!C.signed(s), 'tracing backwards does not sign');
  C.stamp(s, 4); trace(s, 4); C.rubOut(s);
  is(s.digit === 4 && !C.signed(s), 'Rub out clears the trace, keeps the stamp');
  C.stamp(s, 4); trace(s, 4); C.stamp(s, 3);
  is(s.digit === 3 && !C.signed(s), 'a new stamp starts a new trace');
}

console.log('[E] Check: the bank first, then the signature');
for (const range of ['to9', 'to5']) for (const r of C.rounds(range, 'rb')) {
  const st = C.newState(r, 'en');
  let res = C.check(st);
  is(res.slip === 'none' && st.misses === 0, `${r.id}: nothing sent — no miss`);
  for (let i = 0; i <= r.n; i++) C.send(st);
  res = C.check(st);
  is(res.slip === 'more' && st.misses === 1, `${r.id}: ${r.n + 1} for ${r.n} — too many, a miss`);
  if (r.n > 1) {
    C.recall(st, 0); C.recall(st, 0);
    res = C.check(st);
    is(res.slip === 'fewer' && st.misses === 2, `${r.id}: ${r.n - 1} for ${r.n} — too few, a miss`);
    C.send(st);
  } else { C.recall(st, 0); st.misses++; }   /* a call of one has no "too few" but empty — the miss count is kept in step */
  res = C.check(st);
  is(res.slip === 'unsigned' && st.misses === 2, `${r.id}: the right number came, not signed — not a miss`);
  const wrongD = r.n === 1 ? 2 : r.n - 1;
  C.stamp(st, wrongD); trace(st, wrongD);
  res = C.check(st);
  is(res.slip === 'digit' && st.misses === 3, `${r.id}: signed ${wrongD} for ${r.n} — the wrong number, a miss`);
  C.stamp(st, r.n);
  res = C.check(st);
  is(res.slip === 'trace' && st.misses === 3 && !st.done, `${r.id}: the right stamp, not traced — not a miss`);
  trace(st, r.n);
  res = C.check(st);
  is(res.ok && st.done, `${r.id}: ${r.n} came and ${r.n} is signed — done`);
  is(C.send(st) === -1 && C.recall(st, 0) === -1 && !C.stamp(st, 1) && C.check(st).ok, `${r.id}: a finished roll takes nothing more`);
}

console.log('[F] the help never moves a duckling');
{
  const st = make(7);
  for (let i = 0; i < 5; i++) C.send(st);
  is(C.bankNums(st).every(x => x === '') && C.dotNums(st).every(x => x === ''), 'before any Check: nothing numbered');
  C.check(st);
  is(C.bankNums(st).join() === '1,2,3,4,5' && C.dotNums(st).every(x => x === ''), 'first miss: the bank is numbered, the card not');
  const bank = st.bank.slice(); C.check(st);
  is(C.dotNums(st).join() === '1,2,3,4,5,6,7' && st.bank.join() === bank.join(), 'second miss: the card is numbered too; nobody moved');
  C.send(st); C.send(st); C.stamp(st, 7); trace(st, 7); C.check(st);
  is(st.done && C.bankNums(st).join() === '1,2,3,4,5,6,7' && C.helpLevel(st) === 0, 'done: everyone numbered');
  const hk = (slip) => { const s = make(3); s.checked = { slip }; return C.hintKey(s); };
  is(hk('none') === 'hintSend' && hk('more') === 'hintMore' && hk('fewer') === 'hintFewer' && hk('unsigned') === 'hintSign' && hk('trace') === 'hintTrace' && hk('digit') === 'hintDigit', 'each slip has its own hint');
}

console.log('[G] layout and the pond');
for (let W = 240; W <= 1400; W += 2) {
  const L = C.layout(W, 9), tag = `W ${W}`;
  const pondW = L.cols * L.cell + 2 * L.pad, bookW = L.mud + (L.mode === 'wide' ? 16 : 10) + L.stampCols * L.stamp + (L.stampCols - 1) * 6;   /* the CSS gaps: 16 wide, 10 on phones */
  if (!(pondW <= W && bookW <= W)) is(false, `${tag}: the pond (${pondW}) and the roll book (${bookW}) fit`);
  if (!(L.stamp >= 44)) is(false, `${tag}: stamps ≥ 44 px`);
  if (C.freeCells(L).length < 10) is(false, `${tag}: at least ten landing spots (the raft holds ten)`);
  if (W >= 640 && !(L.pic >= 96)) is(false, `${tag}: ducklings ≥ 96 px from 640 (${L.pic})`);
  if (W >= 320 && W < 560 && !(L.pic >= 64)) is(false, `${tag}: ducklings ≥ 64 px on a phone (${L.pic})`);
  if (!(L.pic < L.cell)) is(false, `${tag}: a duckling inside its cell`);
}
is(true, 'layout sweep 240–1400');
{
  const L = C.layout(648, 9), cells = C.freeCells(L);
  is(cells.every(c => !(c[1] === 0 && (c[0] <= 1 || c[0] === L.cols - 1))), 'no landing spot under Mama\'s card or the raft');
  const st = make(5), a = C.spotCells(st, L), b = C.spotCells(st, L);
  is(a.length === cells.length && a.map(String).join('|') === b.map(String).join('|'), 'the scattered order is fixed per round');
  const st2 = C.newState({ id: 'other', n: 5, card: 'frame', raft: 10, max: 9 }, 'en');
  is(C.spotCells(st2, L).map(String).join('|') !== a.map(String).join('|'), 'another round scatters differently');
  is(C.layout(648, 9).mode === 'wide' && C.layout(328, 9).mode === 'stack' && C.layout(288, 9).mode === 'narrow', 'wide / a 360 phone / a 320 phone');
}

console.log(`\nverify-roll-book-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

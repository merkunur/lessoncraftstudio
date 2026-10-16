#!/usr/bin/env node
/* =====================================================================
   verify-fruit-stand-core.js — the model gate for ACTIVITY #11, the Fruit
   Stand (K.CC.B.4 to 20). Its OWN ground truth, written from the standard
   and the design sheet, never read off the core.
   Run: node scripts/verify-fruit-stand-core.js [--measure]
   Mutation: FS_CORE_DIR=<dir> loads the core from <dir> (mutate-fruit-stand.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..');
const DIR = process.env.FS_CORE_DIR || path.join(REPO, 'mini tools');
const C = require(path.join(DIR, 'fruit-stand-core.js'));
const MEASURE = process.argv.includes('--measure');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------- the ground truth ---------- */
const TRUTH = { to20: { n: [12, 17, 9, 15, 20, 11, 14, 6, 18, 13], trays: 2 }, to10: { n: [4, 7, 9, 3, 10, 6, 8, 5], trays: 1 } };
const FRUIT_OK = ['strawberry', 'banana', 'pear', 'lemon', 'raspberry', 'pomegranate', 'pineapple', 'orange', 'apple', 'blackberry'];
const FRUIT_OUT = ['avocado', 'coconut', 'grapefruit', 'kiwi', 'papaya', 'watermelon', 'apricot', 'nectarine', 'peach', 'plum', 'cherry', 'cranberry'];
const PICS = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pictures', 'fruits.json'), 'utf8'));
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
function slip(a, n) {
  if (a === 0) return 'none';
  if (a === n) return 'right';
  if (n > 10 && a === n - 10) return 'onesOnly';
  if (n > 10 && a === 10) return 'tenOnly';
  return a > n ? 'more' : 'fewer';
}

console.log('[A] the rounds');
is(C.TRAY === 10 && C.ROW === 5, 'trays of ten, rows of five');
for (const range of ['to20', 'to10']) {
  const T = TRUTH[range], R = C.rounds(range, 'fs');
  is(R.length === T.n.length && R.length >= 7, `${range}: ${T.n.length} rounds (≥ 7)`);
  is(eq(R.map(r => r.n), T.n), `${range}: the orders are the design sheet's ${T.n.join(' ')}`);
  is(R.every(r => r.n >= 1 && r.n <= T.trays * 10), `${range}: every order within 1..${T.trays * 10} — never 0`);
  is(R.every(r => r.trays === T.trays), `${range}: ${T.trays} tray(s)`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  is(new Set(R.map(r => r.noun)).size >= Math.min(R.length, FRUIT_OK.length) - 2, `${range}: the fruit changes from round to round (${new Set(R.map(r => r.noun)).size} kinds)`);
  for (const r of R) {
    is(FRUIT_OK.includes(r.noun) && !FRUIT_OUT.includes(r.noun), `${r.id}: "${r.noun}" is a whole fruit that reads as itself`);
    const e = PICS.nouns[r.noun];
    is(!!e && LOCALES.every(l => e.labels && Array.isArray(e.labels[l]) && e.labels[l][0]), `${r.id}: "${r.noun}" labelled in all 11 locales`);
    is(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, r.noun + '@2x.webp')), `${r.id}: ${C.THEME}/${r.noun}@2x.webp on disk`);
  }
}
is(C.rounds('nonsense', 'fs').length === 10, 'an unknown range falls back to to 20');
is(C.NOUNS.every(n => FRUIT_OK.includes(n)), 'the fruit list holds only the contact-sheet picks');

console.log('[B] fill to here');
{
  const r = C.rounds('to20', 'fs')[1];          /* 17 */
  const st = C.newState(r, 'fill');
  is(st.filled === 0 && C.cups(st) === 20 && st.mode === 'fill', 'the stand opens empty, twenty spaces');
  is(eq(C.tap(st, 16), { from: 0, to: 17 }) && st.filled === 17, 'a tap on space 17 fills spaces 1..17');
  is(C.tap(st, 16) === null || st.filled === 16, 'a tap on the 17th fruit takes it back');
  const s2 = C.newState(r, 'fill'); C.tap(s2, 16); C.tap(s2, 9);
  is(s2.filled === 9, 'a tap on the 10th fruit takes back the 10th and every fruit after it (9 stay)');
  C.tap(s2, 19); is(s2.filled === 20, 'a tap on the last space fills the whole stand');
  is(C.tap(s2, 20) === null && C.tap(s2, -1) === null && s2.filled === 20, 'no space outside the stand');
  const one = C.newState(C.rounds('to10', 'fs')[0], 'fill');
  is(C.cups(one) === 10 && C.tap(one, 12) === null, 'one tray: ten spaces, nothing beyond');
  /* exhaustively: from every fill level, a tap on every space lands where the rule says */
  let ok = true;
  for (let f = 0; f <= 20 && ok; f++) for (let c = 0; c < 20; c++) {
    const s = C.newState(r, 'fill'); if (f) C.tap(s, f - 1);
    const want = c < f ? c : c + 1; const res = C.tap(s, c);
    if (s.filled !== want || (want === f ? res !== null : !(res && res.from === f && res.to === want))) { ok = false; console.error(`   at fill ${f} tap ${c}: got ${s.filled}, want ${want}`); break; }
  }
  is(ok, 'every fill level × every space follows "fill up to here / take back from here"');
}

console.log('[C] one at a time (setting)');
{
  const r = C.rounds('to20', 'fs')[0];          /* 12 */
  const st = C.newState(r, 'one');
  C.tap(st, 15); is(st.filled === 1, 'a tap on ANY empty space adds one fruit, into the next space');
  C.tap(st, 19); C.tap(st, 4); is(st.filled === 3, 'three taps, three fruit');
  C.tap(st, 0); is(st.filled === 2, 'a tap on any fruit takes back the LAST one');
  const full = C.newState(r, 'one'); for (let i = 0; i < 20; i++) C.tap(full, 19);
  is(full.filled === 20, 'twenty taps on an empty space fill all twenty');
  C.tap(full, 19); is(full.filled === 19, 'then the space is a fruit, and a tap takes the last one back');
  is(C.newState(r, 'nonsense').mode === 'fill', 'an unknown mode is fill');
}

console.log('[D] check and the slips');
for (let n = 1; n <= 20; n++) for (let a = 0; a <= 20; a++) {
  const want = slip(a, n);
  if (C.classify(a, n) !== want) is(false, `classify(${a}, ${n}) = ${C.classify(a, n)}, want ${want}`);
}
is(true, 'the slip table, every a 0..20 against every n 1..20');
is(C.classify(7, 17) === 'onesOnly' && C.classify(10, 17) === 'tenOnly' && C.classify(10, 10) === 'right' && C.classify(1, 11) === 'onesOnly' && C.classify(16, 17) === 'fewer' && C.classify(18, 17) === 'more' && C.classify(2, 12) === 'onesOnly', 'the named teen slips');
for (const r of [].concat(C.rounds('to20', 'fs'), C.rounds('to10', 'fs'))) {
  const st = C.newState(r, 'fill');
  let res = C.check(st);
  is(!res.ok && res.slip === 'none' && st.misses === 0, `${r.id}: Check on an empty stand is not a miss`);
  const wrong = r.n === C.cups(st) ? r.n - 1 : r.n + 1;
  C.tap(st, wrong - 1); res = C.check(st);
  is(!res.ok && res.slip === slip(wrong, r.n) && st.misses === 1 && !st.done, `${r.id}: ${wrong} for ${r.n} is a miss (${res.slip})`);
  C.tap(st, r.n - 1 < st.filled ? r.n : r.n - 1);
  if (st.filled !== r.n) C.tap(st, r.n - 1);
  res = C.check(st);
  is(res.ok && st.done && st.filled === r.n, `${r.id}: ${r.n} fruit packs the order`);
  is(C.tap(st, 0) === null && C.check(st).ok, `${r.id}: a packed order takes no more taps`);
}

console.log('[E] the stand numbers its fruit — the help never moves a fruit');
{
  const st = C.newState(C.rounds('to20', 'fs')[1], 'fill');     /* 17 */
  C.tap(st, 12);
  is(C.helpLevel(st) === 0 && C.cupView(st).every(v => v.num === '' && v.mark === ''), 'before any Check: no numbers, no marks');
  C.check(st);
  const v1 = C.cupView(st);
  is(C.helpLevel(st) === 1 && eq(v1.slice(0, 14).map(v => v.num), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, '']) && v1.every(v => v.mark === ''), 'first miss: the fruit numbered 1..13, nothing marked');
  is(eq(C.note(st), { a: 13, n: 17 }) && C.hintKey(st) === 'hintFewer', 'note "13 / 17", hint too few');
  C.check(st);
  is(C.helpLevel(st) === 2 && eq(C.cupView(st).map((v, i) => v.mark ? i : -1).filter(i => i >= 0), [13, 14, 15, 16]) && st.filled === 13, 'second miss: spaces 14..17 marked as waiting; nobody moved');
  C.tap(st, 19); C.check(st);
  is(eq(C.cupView(st).map((v, i) => v.mark === 'extra' ? i : -1).filter(i => i >= 0), [17, 18, 19]), 'too many: fruit 18..20 marked extra');
  is(C.hintKey(st) === 'hintMore', 'hint too many');
  C.tap(st, 17);
  is(C.note(st) === null, 'the note clears as soon as the stand changes');
  C.check(st);
  const vd = C.cupView(st);
  is(st.done && vd[16].mark === 'last' && vd[16].num === 17 && vd.filter(v => v.mark).length === 1 && C.helpLevel(st) === 0, 'done: everyone numbered, the 17th carries the total');
  const o = C.newState(C.rounds('to20', 'fs')[1], 'fill'); C.tap(o, 19); C.check(o);
  is(C.helpLevel(o) === 1 && C.cupView(o).every(v => v.mark === '') && C.cupView(o)[19].num === 20, 'a first miss with too many: numbered, nothing marked yet');
  const t = C.newState(C.rounds('to20', 'fs')[1], 'fill'); C.tap(t, 6); C.check(t);
  is(C.hintKey(t) === 'hintOnesOnly', '7 for 17 → only the part after ten');
  const u = C.newState(C.rounds('to20', 'fs')[1], 'fill'); C.tap(u, 9); C.check(u);
  is(C.hintKey(u) === 'hintTenOnly', '10 for 17 → only the full tray');
  const e = C.newState(C.rounds('to20', 'fs')[1], 'fill'); C.check(e);
  is(C.hintKey(e) === 'hintNone' && C.note(e) === null, 'an empty Check → hintNone, no note');
}

console.log('[F] guessers');
{
  const rates = {};
  for (const range of ['to20', 'to10']) {
    const R = C.rounds(range, 'fs'); let last = 0, half = 0;
    for (const r of R) {
      const a = C.newState(r, 'fill'); C.tap(a, C.cups(a) - 1); if (C.check(a).ok) last++;
      const b = C.newState(r, 'fill'); C.tap(b, Math.floor(C.cups(b) / 2) - 1); if (C.check(b).ok) half++;
    }
    rates[range] = { last: last / R.length, half: half / R.length };
  }
  if (MEASURE) console.log('   measured:', JSON.stringify(rates));
  /* ratchets from --measure 2026-10-16 (may only shrink) */
  is(rates.to20.last <= 0.1 && rates.to10.last <= 0.125, `"fill the whole stand" wins ≤ one round (${JSON.stringify(rates)})`);
  is(rates.to20.half <= 0.1 && rates.to10.half <= 0.125, '"fill one tray / half" wins ≤ one round');
}

console.log('[G] layout');
for (let W = 240; W <= 1400; W += 2) for (const trays of [2, 1]) {
  const L = C.layout(W, trays), tag = `W ${W} trays ${trays}`;
  if (W >= 560) {
    if (L.mode !== 'row') { is(false, `${tag}: row from 560`); continue; }
    if (!(L.trayW <= W)) is(false, `${tag}: the tray fits (${L.trayW})`);
    if (W >= 640 && !(L.pic >= 96)) is(false, `${tag}: fruit ≥ 96 px from 640 (${L.pic})`);
    if (!(L.cup <= 108 && L.pic < L.cup)) is(false, `${tag}: spaces ≤ 108, fruit inside its space`);
  } else {
    if (L.mode !== 'stack') { is(false, `${tag}: stack below 560`); continue; }
    const total = trays * L.trayW + (trays - 1) * L.between;
    if (!(total <= W)) is(false, `${tag}: the trays side by side fit (${total} > ${W})`);
    if (W >= 320 && !(L.pic >= 64)) is(false, `${tag}: fruit ≥ 64 px on a phone (${L.pic})`);
  }
}
is(C.layout(648, 2).pic === 100 && C.layout(328, 2).pic === 69 && C.layout(288, 2).cup === 58, 'spot values: a 704 stage (648) → 100 px fruit, a 360 phone stage (328) → 69, a 320 phone stage (288) → 58 px spaces (the fold)');

console.log(`\nverify-fruit-stand-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

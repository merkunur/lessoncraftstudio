#!/usr/bin/env node
/* =====================================================================
   verify-treat-box-core.js — the model gate for ACTIVITY #14, the Treat
   Box (K.CC.B.5, count out a given number into a lidded box). Its OWN
   ground truth, written from the standard and the design sheet, never read
   off the core.
   Run: node scripts/verify-treat-box-core.js
   Mutation: TB_CORE_DIR=<dir> loads the core from <dir> (mutate-treat-box.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.TB_CORE_DIR || MINI;
const C = require(path.join(DIR, 'treat-box-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the ground truth ---------- */
const TRUTH = { to10: { n: [7, 4, 9, 6, 3, 8, 5, 10, 2], tray: 12, slots: 12, max: 10 }, to5: { n: [3, 5, 2, 4, 1, 5, 3, 4], tray: 7, slots: 6, max: 5 } };
const make = (n, range) => C.newState({ id: 'x-' + n, n, noun: 'cookie', tray: TRUTH[range || 'to10'].tray, slots: TRUTH[range || 'to10'].slots });
const fill = (st, k) => { for (let h = 0, put = 0; put < k && h < st.tray; h++) if (C.put(st, h) >= 0) put++; };

console.log('[A] the rounds');
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'desserts-and-sweets.json'), 'utf8'));
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'tb'), T = TRUTH[range];
  is(R.length === T.n.length && R.length >= 7, `${range}: ${T.n.length} rounds (≥ 7)`);
  is(R.map(r => r.n).join() === T.n.join(), `${range}: the orders are ${T.n.join(' ')}`);
  is(R.every(r => r.n >= 1 && r.n <= T.max), `${range}: every order 1..${T.max} — never 0`);
  is(R.every(r => r.tray === T.tray && r.slots === T.slots), `${range}: tray ${T.tray}, box ${T.slots} places — the same every round, so their size never tells`);
  is(R.every(r => r.tray > r.n && r.slots > r.n), `${range}: the tray and the box hold more than any order — "too many" is always possible`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  is(new Set(R.map(r => r.noun)).size >= 5, `${range}: at least five different treats across the rounds`);
  for (let i = 1; i < R.length; i++) is(R[i].noun !== R[i - 1].noun, `${range}: rounds ${i - 1} and ${i} show different treats`);
}
is(C.rounds('nonsense', 'tb').length === 9 && C.rounds('nonsense', 'tb')[0].slots === 12, 'an unknown range falls back to up to 10');
is(pics.dir === C.THEME, `the theme is "${C.THEME}" (a colour theme)`);
for (const noun of new Set(C.rounds('to10').concat(C.rounds('to5')).map(r => r.noun))) {
  const e = pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, noun + '@2x.webp')), `${noun}: a labelled library picture on disk`);
  is(!['cherry', 'pancake', 'pie', 'tart', 'cake'].includes(noun), `${noun}: not a picture the contact sheet showed as wrong or uncountable`);
}

console.log('[B] the tray and the box');
{
  const st = make(5);
  is(C.onTray(st) === 12 && st.box.length === 0, 'the round opens with the box empty, every treat on the tray');
  is(C.put(st, 3) === 0 && C.put(st, 7) === 1 && C.put(st, 0) === 2, 'each tap puts one treat in the next place of the box');
  is(st.box.join() === '3,7,0' && C.onTray(st) === 9 && C.inBox(st, 7) && !C.inBox(st, 1), 'the box remembers which treats came from where');
  is(C.put(st, 7) === -1 && st.box.length === 3, 'a treat already in the box cannot go in twice');
  is(C.put(st, -1) === -1 && C.put(st, 12) === -1 && C.put(st, 1.5) === -1 && st.box.length === 3, 'no treat outside the tray');
  is(C.takeOut(st, 1) === 7 && st.box.join() === '3,0', 'a tap on a treat in the box sends THAT treat back; the others close up');
  is(C.takeOut(st, 5) === -1 && C.takeOut(st, -1) === -1 && st.box.length === 2, 'no take-out from an empty place');
  is(C.put(st, 7) === 2 && st.box.join() === '3,0,7', 'a treat sent back can go in again');
  is(C.empty(st) && st.box.length === 0 && C.onTray(st) === 12, 'Empty the box puts every treat back');
  const full = make(5, 'to5'); fill(full, 7);
  is(full.box.length === 6 && C.put(full, 6) === -1, 'up to five: the box takes six and no more');
}

console.log('[C] Check');
{
  const st = make(6);
  let r = C.check(st);
  is(r.slip === 'none' && !r.ok && st.misses === 0, 'an empty box: "start", not a miss');
  fill(st, 7); r = C.check(st);
  is(r.slip === 'more' && r.a === 7 && st.misses === 1 && !st.done, 'seven for six: too many, a miss');
  C.takeOut(st, 0); C.takeOut(st, 0); r = C.check(st);
  is(r.slip === 'fewer' && r.a === 5 && st.misses === 2, 'five for six: too few, a second miss');
  is(C.put(st, 11) >= 0 && st.checked === null, 'a change clears the last verdict');
  r = C.check(st);
  is(r.ok && r.slip === 'right' && st.done && st.misses === 2, 'six for six: right; the round is done');
  is(C.put(st, 10) === -1 && C.takeOut(st, 0) === -1 && !C.empty(st) && st.box.length === 6, 'a done box no longer changes');
  is(C.check(st).ok, 'Check after done stays right');
  for (const range of ['to10', 'to5']) for (const rd of C.rounds(range)) {
    const s = C.newState(rd); fill(s, rd.n);
    is(C.check(s).ok, `${range} order ${rd.n}: exactly ${rd.n} is right`);
    const s2 = C.newState(rd); fill(s2, rd.n + 1);
    is(C.check(s2).slip === 'more', `${range} order ${rd.n}: ${rd.n + 1} is too many`);
    if (rd.n > 1) { const s3 = C.newState(rd); fill(s3, rd.n - 1); is(C.check(s3).slip === 'fewer', `${range} order ${rd.n}: ${rd.n - 1} is too few`); }
  }
}

console.log('[D] the lid');
{
  const st = make(4); fill(st, 2);
  is(!C.lidOpen(st, 'on', false), 'lid on: the box is shut at rest');
  is(C.lidOpen(st, 'on', true), 'a peek opens it');
  is(C.lidOpen(st, 'off', false), 'lid off (the teacher\'s choice): always open');
  C.check(st);
  is(C.lidOpen(st, 'on', false), 'after a miss the lid stays off for the round');
  const s2 = make(4); C.check(s2);
  is(!C.lidOpen(s2, 'on', false), 'an empty Check is not a miss: the lid stays on');
  const s3 = make(2); fill(s3, 2); C.check(s3);
  is(C.lidOpen(s3, 'on', false), 'done: the box shows what is in it');
}

console.log('[E] the help');
{
  const st = make(5); fill(st, 7);
  is(C.boxNums(st).every(v => v === '') && C.slotMarks(st).every(v => v === ''), 'no numbers and no marks before a miss');
  C.check(st);
  is(C.helpLevel(st) === 1 && C.boxNums(st).every(v => v === '') && C.slotMarks(st).every(v => v === ''), 'miss 1: the lid comes off — no numbers, no marks');
  C.check(st);
  is(C.helpLevel(st) === 2 && C.boxNums(st).join() === '1,2,3,4,5,6,7', 'miss 2: the treats in the box are numbered 1..7');
  const mk = C.slotMarks(st);
  is(mk.length === 12 && mk.map((v, j) => v === 'extra' ? j : -1).filter(j => j >= 0).join() === '5,6' && !mk.includes('need'), 'seven for five: places 6 and 7 are marked extra, nothing needed');
  C.takeOut(st, 0); C.takeOut(st, 0); C.takeOut(st, 0);
  const mk2 = C.slotMarks(st);
  is(mk2.map((v, j) => v === 'need' ? j : -1).filter(j => j >= 0).join() === '4' && !mk2.includes('extra'), 'four for five: the fifth place is marked needed');
  C.put(st, 0); C.check(st);
  is(st.done && C.helpLevel(st) === 0 && C.boxNums(st).join() === '1,2,3,4,5' && C.slotMarks(st).every(v => v === ''), 'done: numbered 1..5, no marks');
  const hk = (slip) => { const s = make(3); s.checked = slip ? { slip } : null; return C.hintKey(s); };
  is(hk(null) === 'hintStart' && hk('none') === 'hintStart' && hk('more') === 'hintMore' && hk('fewer') === 'hintFewer', 'hints: start · too many · too few');
}

console.log('[F] the bench layout');
for (const slots of [12, 6]) for (let W = 240; W <= 1300; W += 4) {
  const L = C.layout(W, slots), boxW = L.boxCols * L.cell + 2 * L.pad, trayW = L.trayCols * L.cell + 2 * L.pad;
  const tag = `W ${W} ${slots}`;
  if (!(L.boxCols * L.boxRows === slots)) { is(false, `${tag}: the box has ${slots} places (${L.boxCols}×${L.boxRows})`); continue; }
  if (!(L.trayCols * L.trayRows >= 12)) { is(false, `${tag}: the tray has a spot for every treat`); continue; }
  if (!(boxW <= Math.max(240, W) && trayW <= Math.max(240, W))) { is(false, `${tag}: box ${boxW} and tray ${trayW} fit in ${W}`); continue; }
  if (!(L.cell >= 44 && L.pic <= L.cell)) { is(false, `${tag}: places ≥ 44 px, pictures inside them`); continue; }
  if (W >= 640 && !(L.pic >= 96)) { is(false, `${tag}: pictures ≥ 96 px on a desktop (${L.pic})`); continue; }
  if (W >= 300 && W < 560 && !(L.pic >= 64)) { is(false, `${tag}: pictures ≥ 64 px on a phone (${L.pic})`); continue; }
  if (W >= 300 && W < 560 && !(L.cell <= 66)) { is(false, `${tag}: phone places capped at 66 so Check stays in the fold`); continue; }
  if (W >= 560 && !(L.mode === 'wide' && L.cell <= 112)) { is(false, `${tag}: wide, places ≤ 112`); continue; }
  PASS++;
}
is(C.layout(648, 12).mode === 'wide' && C.layout(328, 12).mode === 'stack' && C.layout(288, 12).mode === 'narrow', 'the three benches: wide (desktop), stack (phone), narrow (320 phone)');
is(C.layout(328, 12).boxRows === 3 && C.layout(328, 12).trayRows === 3, 'phone: box and tray stand 4 × 3');

console.log('[G] the heap');
for (const range of ['to10', 'to5']) for (const rd of C.rounds(range)) for (const W of [648, 328, 288]) {
  const st = C.newState(rd), L = C.layout(W, st.slots), sp = C.traySpots(st, L);
  const trayW = L.trayCols * L.cell + 2 * L.pad, trayH = L.trayRows * L.cell + 2 * L.pad;
  let minD = Infinity; for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) minD = Math.min(minD, Math.max(Math.abs(sp[i].x - sp[j].x), Math.abs(sp[i].y - sp[j].y)));
  is(sp.length === st.tray && sp.every(p => p.x >= 0 && p.y >= 0 && p.x + L.pic <= trayW && p.y + L.pic <= trayH && Math.abs(p.tilt) <= 12) && minD >= L.pic - 1, `${range} ${rd.n} @${W}: ${st.tray} treats inside the tray, none on another (${minD.toFixed(0)} ≥ ${L.pic})`);
}
{
  const L = C.layout(648, 12), keys = C.rounds('to10').map(rd => C.traySpots(C.newState(rd), L).map(p => Math.round(p.x) + ',' + Math.round(p.y)).join(' '));
  is(new Set(keys).size === keys.length, 'every round lays its heap differently');
  const a = C.traySpots(C.newState(C.rounds('to10')[0]), L), b = C.traySpots(C.newState(C.rounds('to10')[0]), L);
  is(JSON.stringify(a) === JSON.stringify(b), 'the same round lays the same heap (seeded)');
}

console.log(`\nverify-treat-box-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

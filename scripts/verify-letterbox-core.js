#!/usr/bin/env node
/* =====================================================================
   verify-letterbox-core.js — the model gate for ACTIVITY #6, "Pip's Round"
   (K.CC.A.3), the Letterbox Street.
   Run: node scripts/verify-letterbox-core.js   Env: LB_CORE_DIR → a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: the
   two pools and their coverage, five distinct plates per street with the
   three letters among them, a confusable plate for EVERY letter (by the
   gate's own slip table, not the core's), the slip table itself on hand
   examples, delivery / help / done, the handwriting per locale (the barred
   seven only where the country writes it), the layout floors, and the
   GUESSERS, measured 2026-10-16 and ratcheted (may only shrink):
     to20 (27 letters): position max 8/27 = 0.30 · first-house 0.22 ·
       biggest-plate 0.11 · smallest-plate 0.15
     to10 (24 letters): position max 6/24 = 0.25 · first 0.21 · biggest
       0.25 · smallest 0.13
   Ratchets: no plate position hosts > 0.34 of the answers and every
   position hosts ≥ 1; first ≤ 0.30; biggest ≤ 0.30; smallest ≤ 0.30;
   lures that name a slip (not mere neighbours): to20 ≥ 16/18, to10 ≥ 7/16
   (a to10 street whose three letters already confuse each other carries
   two plain neighbours — 4 · 9 · 6 cannot have a live lure under 10).
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.LB_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'letterbox-core.js'));
const { NT, ST } = C.deps();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();

/* the gate's own slip table */
const rev = (n) => parseInt(String(n).split('').reverse().join(''), 10);
const LOOK = { 6: 9, 9: 6, 2: 5, 5: 2, 1: 7, 7: 1, 3: 8, 8: 3, 0: 8, 4: 9 };
function slip(n, h) {
  if (n === h) return 'right';
  const tn = n >= 10, th = h >= 10;
  if (tn && th && rev(n) === h && n % 10 !== 0) return 'reversed';
  if (tn && !th && h === n % 10) return 'oneDigit';
  if (!tn && th && h % 10 === n && n !== 0) return 'twoDigits';
  if (tn && th && Math.floor(n / 10) === Math.floor(h / 10)) return 'lastDigit';
  if (tn && th && n % 10 === h % 10) return 'firstDigit';
  if (!tn && !th && LOOK[n] === h) return 'shape';
  return 'off';
}

is(!!NT && !!ST, 'the two instruments load');
is(C.HOUSES === 5 && C.LETTERS === 3 && C.HELP_AFTER === 2 && C.THEME === 'animals', 'five houses, three letters, help after two misses, the animals theme');
is(C.GEOM.h === 1.36 && C.GEOM.picture >= 0.78 && C.GEOM.plateFont >= 0.22, 'house geometry: 1.36 tall, the resident ≥ 0.78 w, the plate numeral ≥ 0.22 w');
is(C.RESIDENTS.length >= 20 && new Set(C.RESIDENTS).size === C.RESIDENTS.length, `${C.RESIDENTS.length} distinct residents`);

/* 1. the slip table on hand examples (the core must agree with the gate's own) */
const CASES = [[13, 31, 'reversed'], [14, 41, 'reversed'], [14, 4, 'oneDigit'], [4, 14, 'twoDigits'], [14, 15, 'lastDigit'], [13, 11, 'lastDigit'], [10, 20, 'firstDigit'], [20, 30, 'firstDigit'], [6, 9, 'shape'], [2, 5, 'shape'], [1, 7, 'shape'], [3, 8, 'shape'], [0, 8, 'shape'], [4, 9, 'shape'], [8, 0, 'off'], [7, 2, 'off'], [20, 2, 'off'], [0, 10, 'off'], [10, 0, 'oneDigit'], [11, 11, 'right'], [12, 21, 'reversed'], [1, 11, 'twoDigits'], [10, 1, 'off'], [5, 15, 'twoDigits']];
for (const [n, h, want] of CASES) is(C.classify(n, h) === want && slip(n, h) === want, `classify(${n}, ${h}) = ${want} (got ${C.classify(n, h)})`);
/* exhaustive agreement 0..99 × 0..99 */
let dis = 0; for (let n = 0; n <= 99; n++) for (let h = 0; h <= 99; h++) if (C.classify(n, h) !== slip(n, h)) dis++;
is(dis === 0, `the core's slip table agrees with the gate's on every pair (${dis} disagreements)`);

/* 2. determinism */
const A = C.rounds('to20', 'lb'), B = C.rounds('to20', 'lb'), D = C.rounds('to20', 'other');
is(JSON.stringify(A) === JSON.stringify(B), 'the same seed gives the same streets');
is(A.some((r, i) => r.houses.map(h => h.n).join() !== D[i].houses.map(h => h.n).join()), 'another seed shuffles the houses differently');
is(A.every((r, i) => r.letters.join() === D[i].letters.join()), 'the letters do not depend on the seed');

/* 3. the pools: sizes, coverage, bounds, distinctness, every letter confusable on its street */
function auditPool(range, want) {
  const R = C.rounds(range, 'lb'), cnt = {}, pos = [0, 0, 0, 0, 0];
  let letters = 0, first = 0, big = 0, small = 0, live = 0;
  is(R.length === want.rounds, `${range}: ${want.rounds} rounds (${R.length})`);
  for (const r of R) {
    const plates = r.houses.map(h => h.n), who = r.houses.map(h => h.resident);
    is(r.letters.length === 3 && new Set(r.letters).size === 3, `${range} ${r.id}: three distinct letters`);
    is(plates.length === 5 && new Set(plates).size === 5, `${range} ${r.id}: five distinct plates (${plates.join(' ')})`);
    is(r.letters.every(n => plates.includes(n)), `${range} ${r.id}: every letter has its house`);
    is(plates.every(n => Number.isInteger(n) && n >= 0 && n <= want.max), `${range} ${r.id}: plates within 0..${want.max}`);
    is(r.letters.every(n => n >= 0 && n <= want.letterMax), `${range} ${r.id}: letters within 0..${want.letterMax}`);
    is(who.length === 5 && new Set(who).size === 5 && who.every(w => C.RESIDENTS.includes(w)), `${range} ${r.id}: five distinct residents from the list`);
    for (const n of r.letters) {
      is(plates.some(h => h !== n && slip(n, h) !== 'off'), `${range} ${r.id}: letter ${n} has a confusable plate on its street (${plates.join(' ')})`);
      cnt[n] = (cnt[n] || 0) + 1; letters++;
      const i = plates.indexOf(n); pos[i]++;
      if (i === 0) first++;
      if (Math.max(...plates) === n) big++;
      if (Math.min(...plates) === n) small++;
    }
    const lures = plates.filter(n => !r.letters.includes(n));
    is(lures.length === 2, `${range} ${r.id}: two lures (${lures.join(' ')})`);   /* a street whose three letters already confuse each other may carry two plain neighbours */
    live += lures.filter(l => r.letters.some(n => slip(n, l) !== 'off')).length;
  }
  is(letters === want.rounds * 3, `${range}: ${letters} letters`);
  is(live >= want.liveLures, `${range}: ${live} of ${want.rounds * 2} lures name a slip (ratchet ≥ ${want.liveLures})`);
  for (let n = 0; n <= want.letterMax; n++) is((cnt[n] || 0) >= want.minEach, `${range}: ${n} is a letter ≥ ${want.minEach}× (${cnt[n] || 0})`);
  if (want.twice) for (const n of want.twice) is(cnt[n] >= 2, `${range}: ${n} is a letter twice (${cnt[n]})`);
  const pm = Math.max(...pos) / letters;
  is(pm <= 0.34 && Math.min(...pos) >= 1, `${range}: no plate position hosts > 0.34 of the answers (${pos.join('/')} → ${pm.toFixed(2)})`);
  is(first / letters <= 0.30, `${range}: a first-house guesser ≤ 0.30 (${(first / letters).toFixed(2)})`);
  is(big / letters <= 0.30, `${range}: a biggest-plate guesser ≤ 0.30 (${(big / letters).toFixed(2)})`);
  is(small / letters <= 0.30, `${range}: a smallest-plate guesser ≤ 0.30 (${(small / letters).toFixed(2)})`);
  return R;
}
const R20 = auditPool('to20', { rounds: 9, max: 99, letterMax: 20, minEach: 1, twice: [13, 14, 16, 18], liveLures: 16 });
const R10 = auditPool('to10', { rounds: 8, max: 10, letterMax: 10, minEach: 2, liveLures: 7 });
is(R20.some(r => r.houses.some(h => h.n === 31) && r.letters.includes(13)), 'to20: 13 meets 31 somewhere');
is(R20.some(r => r.letters.includes(14) && r.houses.some(h => h.n === 4)), 'to20: 14 meets 4 somewhere');
is(R20.some(r => r.letters.includes(4) && r.houses.some(h => h.n === 14)), 'to20: 4 meets 14 somewhere');
is(R20.some(r => r.letters.includes(14) && r.letters.includes(13)), 'to20: 14 and 13 share a street');
is(R10.every(r => r.houses.every(h => h.n <= 10)), 'to10: no plate above 10');
is(C.rounds('nonsense', 'x').length === 9, 'an unknown range falls back to to20');

/* 4. delivery: right / wrong / help / done / none */
for (const r of R20.concat(R10)) {
  const st = C.newState(r, 'en');
  is(st.at === 0 && !st.done && st.revealed && !st.spoken && C.verdict(st) === 'unfinished' && C.letter(st) === r.letters[0] && C.delivered(st) === 0, `${r.id}: opens on letter 1, revealed, unfinished`);
  is(C.rightHouse(st) === st.houses.findIndex(h => h.n === r.letters[0]), `${r.id}: the right house is the plate that bears the letter`);
  /* wrong doors first: every other house answers with its slip; the second miss helps */
  const wrongs = st.houses.map((h, i) => i).filter(i => st.houses[i].n !== r.letters[0]);
  let res = C.deliver(st, wrongs[0]);
  is(res.result === 'wrong' && res.door === st.houses[wrongs[0]].n && res.n === r.letters[0] && res.slip === slip(r.letters[0], res.door) && !res.helped && st.misses === 1 && !st.help, `${r.id}: a wrong door is named with its slip (${res.slip}), no help yet`);
  res = C.deliver(st, wrongs[1]);
  is(res.result === 'wrong' && res.helped && st.help && st.misses === 2, `${r.id}: the second miss brings help`);
  res = C.deliver(st, wrongs[2]);
  is(res.result === 'wrong' && !res.helped && st.help && st.misses === 3, `${r.id}: the third miss keeps help (not re-announced)`);
  is(st.at === 0 && st.houses.every(h => !h.open), `${r.id}: nothing delivered by wrong doors`);
  /* the right door */
  res = C.deliver(st, C.rightHouse(st));
  is(res.result === 'right' && !res.round && st.at === 1 && st.misses === 0 && !st.help && st.houses.filter(h => h.open).length === 1 && st.log[0].misses === 3, `${r.id}: letter 1 posted; misses reset; the log keeps 3 misses`);
  const opened = st.houses.findIndex(h => h.open);
  is(C.deliver(st, opened).result === 'none', `${r.id}: an open door takes nothing more`);
  res = C.deliver(st, C.rightHouse(st));
  is(res.result === 'right' && !res.round && st.at === 2, `${r.id}: letter 2 posted`);
  res = C.deliver(st, C.rightHouse(st));
  is(res.result === 'right' && res.round && st.done && C.verdict(st) === 'done' && C.letter(st) === null && C.rightHouse(st) === -1 && C.delivered(st) === 3, `${r.id}: letter 3 posted → the round is done`);
  is(C.deliver(st, 0).result === 'none' && C.deliver(st, 4).result === 'none' && !C.reveal(st), `${r.id}: nothing more is taken when done`);
  is(C.deliver(C.newState(r, 'en'), 9).result === 'none', `${r.id}: a house that does not exist takes nothing`);
  /* spoken mode: hidden until revealed; a delivery hides the next letter again */
  const sp = C.newState(r, 'en', { spoken: true });
  is(sp.spoken && !sp.revealed && C.reveal(sp) && sp.revealed, `${r.id}: spoken mode hides the number until Show`);
  C.deliver(sp, C.rightHouse(sp));
  is(!sp.revealed && sp.at === 1, `${r.id}: the next letter is hidden again`);
}

/* 5. handwriting: the glyph strokes per digit, the barred seven per locale */
for (const lang of ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const h7 = C.handwriting(17, lang), barred = ['de', 'fr', 'it', 'es', 'pt'].includes(lang);
  is(h7.length === 2 && h7[0].digit === '1' && h7[1].digit === '7' && h7[1].strokes.length === (barred ? 2 : 1), `${lang}: 17 is two digits, the seven has ${barred ? 2 : 1} stroke(s)`);
  is(h7.every(d => d.strokes.every(s => s.length >= 3 && s.every(p => p.x >= -1 && p.x <= 101 && p.y >= 10 && p.y <= 90))), `${lang}: the strokes are dense and inside the box`);
}
for (let n = 0; n <= 20; n++) { const h = C.handwriting(n, 'en'); is(h.length === String(n).length && h.map(d => d.digit).join('') === String(n), `handwriting(${n}) has one glyph per digit`); }
is(C.handwriting(4, 'en')[0].strokes.length === 2 && C.handwriting(1, 'en')[0].strokes.length === 1, 'the 4 is two strokes, the 1 one');

/* 6. layout */
for (const W of [288, 296, 330, 336, 360, 412, 520, 559, 560, 600, 672, 704, 820]) {
  const L = C.layout(W);
  if (W >= 560) is(L.mode === 'row' && L.cols === 5 && L.gap === 12 && L.hw === Math.floor((W - 48) / 5) && L.hw >= 102 && 5 * L.hw + 48 <= W && L.hw * C.GEOM.picture >= 81, `row of five at W=${W}: house ${L.hw}, picture ${Math.round(L.hw * C.GEOM.picture)}`);
  else is(L.mode === 'grid' && L.cols === 3 && L.gap === 8 && L.hw === Math.floor((W - 16) / 3) && L.hw >= 90 && 3 * L.hw + 16 <= W && L.hw * C.GEOM.picture >= 72, `three + two at W=${W}: house ${L.hw}, picture ${Math.round(L.hw * C.GEOM.picture)}`);
}
is(C.layout(672).hw * C.GEOM.picture >= 96 && C.layout(656).hw * C.GEOM.picture >= 96, 'at the live desktop stage (656–672) the resident is ≥ 96 px');
is(C.layout(336).hw * C.GEOM.picture >= 64 && C.layout(296).hw * C.GEOM.picture >= 64, 'at a phone stage (296–336) the resident is ≥ 64 px');

console.log(`verify-letterbox-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);

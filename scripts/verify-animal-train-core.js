#!/usr/bin/env node
/* =====================================================================
   verify-animal-train-core.js — the model gate for ACTIVITY #10, the
   Animal Train (K.CC.B.4). Its OWN ground truth: the expectations below
   are written from the standard and the design sheet, never read off the
   core. Run: node scripts/verify-animal-train-core.js [--measure]
   Mutation: AT_CORE_DIR=<dir> loads the core from <dir> (mutate-animal-train.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..');
const DIR = process.env.AT_CORE_DIR || path.join(REPO, 'mini tools');
const C = require(path.join(DIR, 'animal-train-core.js'));
const MEASURE = process.argv.includes('--measure');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------- the ground truth, from the design sheet ---------- */
const TRUTH = {
  to10: { rounds: [[4], [7, 8], [9], [6, 5], [10], [3, 4], [8], [5, 6], [9, 8], [7]], wait: 12, max: 10 },
  to5:  { rounds: [[3], [2, 3], [5], [4, 3], [1, 2], [4], [3, 4], [5, 4]], wait: 7, max: 5 }
};
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const PICS = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pictures', 'animals.json'), 'utf8'));
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

console.log('[A] the rounds');
is(C.SEATS === 10 && C.CAR === 5, 'ten seats, two rows of five');
is(!BW.test(C.THEME), 'a colour theme');
for (const range of ['to10', 'to5']) {
  const T = TRUTH[range], R = C.rounds(range, 'tr');
  is(R.length === T.rounds.length && R.length >= 7, `${range}: ${T.rounds.length} rounds (≥ 7)`);
  is(eq(R.map(r => C.secondTicket(r) === null ? [r.n] : [r.n, C.secondTicket(r)]), T.rounds), `${range}: the tickets are the design sheet's ${JSON.stringify(T.rounds)}`);
  is(R.every(r => r.wait === T.wait), `${range}: ${T.wait} animals wait on the platform`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: round ids unique`);
  is(new Set(R.map(r => r.noun)).size === R.length, `${range}: a different animal every round`);
  for (const r of R) {
    const tickets = C.secondTicket(r) === null ? [r.n] : [r.n, C.secondTicket(r)];
    is(tickets.every(t => t >= 1 && t <= T.max), `${r.id}: tickets within 1–${T.max} (never 0: "Go at once" is never right)`);
    is(tickets.every(t => t <= C.SEATS && t <= r.wait), `${r.id}: the train and the platform can always make the ticket`);
    is(tickets.every(t => t < r.wait), `${r.id}: more animals wait than the ticket asks — the child must decide when to stop`);
    const e = PICS.nouns && PICS.nouns[r.noun];
    is(!!e && LOCALES.every(l => e.labels && Array.isArray(e.labels[l]) && e.labels[l][0]), `${r.id}: "${r.noun}" has a library picture labelled in all 11 locales`);
    is(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, r.noun + '@2x.webp')), `${r.id}: ${C.THEME}/${r.noun}@2x.webp exists on disk`);
  }
}
is(C.NOUNS.every(n => !['dolphin', 'whale', 'fish', 'bat'].includes(n)), 'no animal that cannot sit on a train (contact sheet)');

console.log('[B] boarding: one animal, one seat, in order');
{
  const r = C.rounds('to10', 'tr')[0];
  const st = C.newState(r);
  is(st.plat.length === 12 && st.plat.every(Boolean) && st.seats.length === 0, 'the round opens with everyone on the platform, the train empty');
  is(C.board(st, 3) === true && eq(st.seats, [3]) && st.plat[3] === false, 'a tap on slot 3 puts that animal in the first seat');
  is(C.board(st, 3) === false && st.seats.length === 1, 'an empty platform slot cannot board again');
  is(C.board(st, -1) === false && C.board(st, 12) === false, 'no slot outside the platform');
  C.board(st, 0); C.board(st, 11);
  is(eq(st.seats, [3, 0, 11]), 'the seats fill in the order the animals got on');
  is(C.off(st) === 11 && st.plat[11] === true && eq(st.seats, [3, 0]), 'the LAST passenger gets off, back to its own slot');
  for (let i = 0; i < 12; i++) C.board(st, i);
  is(st.seats.length === 10, 'never more than ten on the train');
  is(st.plat.filter(Boolean).length === 2, 'the two who did not fit stay on the platform');
  is(C.aboard(st) === 10, 'aboard counts the seats');
  const e = C.newState(r);
  is(C.off(e) === -1, 'nobody gets off an empty train');
  /* a random walk: aboard always equals boards − offs, nobody is in two places */
  let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const w = C.newState(r); let ok = true;
  for (let k = 0; k < 4000; k++) {
    if (rnd() < 0.6) C.board(w, Math.floor(rnd() * 12)); else C.off(w);
    const onPlat = w.plat.filter(Boolean).length;
    if (onPlat + w.seats.length !== 12 || new Set(w.seats).size !== w.seats.length || w.seats.some(i => w.plat[i]) || w.seats.length > 10) { ok = false; break; }
  }
  is(ok, 'random taps: every animal is either on the platform or in exactly one seat, never both, never more than ten seated');
}

console.log('[C] Go: the train compares its passengers with the ticket');
const ROUNDS = [].concat(C.rounds('to10', 'tr'), C.rounds('to5', 'tr'));
function fill(st, k) { while (st.seats.length > k) if (C.off(st) < 0) return false;   /* bounded: a finished train refuses */ for (let i = 0; i < st.plat.length && st.seats.length < k; i++) if (st.plat[i]) C.board(st, i); return st.seats.length === k; }
for (const r of ROUNDS) {
  const t2 = C.secondTicket(r);
  /* every possible count at the first stop */
  for (let k = 0; k <= Math.min(C.SEATS, r.wait); k++) {
    const st = C.newState(r); fill(st, k);
    const res = C.go(st);
    if (k === r.n) {
      is(res.ok && res.a === k && res.t === r.n, `${r.id}: ${k} on board for ticket ${r.n} is right`);
      if (t2 === null) is(st.done && res.next === false, `${r.id}: one stop — the round is done`);
      else is(!st.done && res.next === true && st.ticket === t2 && st.leg === 1 && st.prev === r.n, `${r.id}: the next stop's ticket is ${t2}`);
      is(st.misses === 0, `${r.id}: a right Go is not a miss`);
    } else {
      is(!res.ok && !st.done && res.slip === (k > r.n ? 'more' : 'fewer') && st.misses === 1 && st.legMisses === 1, `${r.id}: ${k} for ${r.n} → "${k > r.n ? 'too many' : 'too few'}", one miss`);
      is(st.ticket === r.n && st.leg === 0, `${r.id}: a wrong Go keeps the ticket`);
    }
  }
  if (t2 !== null) {
    for (let k = 0; k <= Math.min(C.SEATS, r.wait); k++) {
      const st = C.newState(r); fill(st, r.n); C.go(st); C.go(fill(st, k) && st);
      const right = k === t2;
      is(right ? st.done : (!st.done && st.checked && st.checked.slip === (k > t2 ? 'more' : 'fewer')), `${r.id}: second stop, ${k} for ${t2} → ${right ? 'done' : 'named'}`);
    }
    /* the second stop is ONE change away from the first: B.4c */
    const st = C.newState(r); fill(st, r.n); C.go(st);
    if (r.stop === 'more') { const free = st.plat.indexOf(true); C.board(st, free); }
    else C.off(st);
    is(C.go(st).ok && st.done, `${r.id}: one animal on (or off) after the first stop finishes the round`);
    is(st.legMisses === 0, `${r.id}: the second stop starts with fresh help`);
    { const h = C.newState(r); fill(h, r.n + 1 <= Math.min(C.SEATS, r.wait) ? r.n + 1 : r.n - 1); C.go(h); C.go(h); fill(h, r.n); C.go(h);
      is(h.leg === 1 && C.helpLevel(h) === 0 && C.seatView(h).every(v => v.num === '' && v.mark === ''), `${r.id}: two misses at the first stop, then right — the second stop starts with no help showing`); }
  }
  const d = C.newState(r); fill(d, r.n); C.go(d); if (t2 !== null) { fill(d, t2); C.go(d); }
  is(d.done && C.go(d) === null && C.board(d, d.plat.indexOf(true)) === false && C.off(d) === -1, `${r.id}: a finished round takes no more taps`);
}

console.log('[D] the train numbers its passengers (help never moves an animal)');
{
  const r = C.rounds('to10', 'tr')[2];       /* ticket 9 */
  const st = C.newState(r); fill(st, 6);
  is(C.helpLevel(st) === 0 && C.seatView(st).every(v => v.num === '' && v.mark === ''), 'before any Go: no numbers on the passengers (the child keeps the count)');
  { const o = C.newState(r); fill(o, 10); is(C.seatView(o).every(v => v.num === '' && v.mark === ''), 'too many on board but no Go yet: nothing is marked'); }
  C.go(st);
  const v1 = C.seatView(st);
  is(C.helpLevel(st) === 1 && eq(v1.map(v => v.num), [1, 2, 3, 4, 5, 6, '', '', '', '']) && v1.every(v => v.mark === ''), 'first wrong Go: the passengers are numbered 1…6, nothing else');
  const seatsBefore = st.seats.slice();
  C.go(st);
  const v2 = C.seatView(st);
  is(C.helpLevel(st) === 2 && eq(v2.map(v => v.mark), ['', '', '', '', '', '', 'need', 'need', 'need', '']), 'second wrong Go (too few): the three empty seats the ticket still wants are marked');
  is(eq(st.seats, seatsBefore), 'the help moved nobody');
  fill(st, 10); C.go(st);
  is(eq(C.seatView(st).map(v => v.mark), ['', '', '', '', '', '', '', '', '', 'extra']), 'too many: the passenger beyond the ticket is marked extra');
  is(C.helpLevel(st) === 2, 'help stays at its top level');
  C.off(st); C.go(st);
  const vd = C.seatView(st);
  is(st.done && eq(vd.map(v => v.num), [1, 2, 3, 4, 5, 6, 7, 8, 9, '']) && vd[8].mark === 'last' && vd.filter(v => v.mark).length === 1, 'done: everyone numbered, the last passenger carries the total');
  is(C.helpLevel(st) === 0, 'no help once done');
}

console.log('[E] the note under the train');
{
  const R = C.rounds('to10', 'tr');
  const one = C.newState(R[0]);           /* 4, one stop */
  is(C.note(one) === null, 'a fresh round has no note');
  fill(one, 6); C.go(one);
  is(eq(C.note(one), { key: 'noteTooMany', args: { a: 6, t: 4 } }), 'too many: compare 6 with 4');
  C.off(one);
  is(C.note(one) === null, 'the note clears as soon as the train changes');
  C.go(one); C.board(one, one.plat.indexOf(true));
  is(C.note(one) === null, 'and when an animal gets ON after a wrong Go');
  fill(one, 1); C.go(one);
  is(eq(C.note(one), { key: 'noteTooFew', args: { a: 1, t: 4 } }), 'too few: compare 1 with 4');
  fill(one, 4); C.go(one);
  is(one.done && C.note(one) === null, 'a one-stop round ends without a note (the shell celebrates)');
  const more = C.newState(R[1]);          /* 7 → 8 */
  fill(more, 7); C.go(more);
  is(eq(C.note(more), { key: 'noteNewTicket', args: { t: 8 } }), 'arriving: the new ticket is announced');
  fill(more, 8); C.go(more);
  is(eq(C.note(more), { key: 'noteOneMore', args: { a: 7, b: 8 } }), 'one more got on: 7 → 8');
  const fewer = C.newState(R[3]);         /* 6 → 5 */
  fill(fewer, 6); C.go(fewer); fill(fewer, 5); C.go(fewer);
  is(eq(C.note(fewer), { key: 'noteOneFewer', args: { a: 6, b: 5 } }), 'one got off: 6 → 5');
}

console.log('[F] guessers');
{
  const rates = {};
  for (const range of ['to10', 'to5']) {
    const R = C.rounds(range, 'tr');
    let everyone = 0, atOnce = 0, sameAsFirst = 0;
    for (const r of R) {
      /* put everyone on who fits, press Go, repeat at the next stop */
      const a = C.newState(r); let ok = true;
      for (let leg = 0; leg < 2 && !a.done && ok; leg++) { fill(a, Math.min(C.SEATS, r.wait)); ok = C.go(a).ok; }
      if (a.done) everyone++;
      const b = C.newState(r); if (C.go(b).ok) atOnce++;
      /* change nothing at the second stop */
      if (C.secondTicket(r) !== null) { const c = C.newState(r); fill(c, r.n); C.go(c); if (C.go(c).ok) sameAsFirst++; }
    }
    rates[range] = { everyone: everyone / R.length, atOnce: atOnce / R.length, sameAsFirst };
  }
  if (MEASURE) console.log('   measured:', JSON.stringify(rates));
  /* ratchets from --measure, 2026-10-16 (may only shrink) */
  is(rates.to10.everyone <= 0.1, `to 10: "put everyone on" wins ≤ 0.1 (${rates.to10.everyone})`);
  is(rates.to5.everyone === 0, `to 5: "put everyone on" never wins (${rates.to5.everyone})`);
  is(rates.to10.atOnce === 0 && rates.to5.atOnce === 0, '"press Go at once" never wins');
  is(rates.to10.sameAsFirst === 0 && rates.to5.sameAsFirst === 0, 'changing nothing at the second stop never wins');
}

console.log('[G] layout');
{
  for (let W = 240; W <= 1400; W += 2) {
    for (const wait of [12, 7]) {
      const L = C.layout(W, wait);
      const tag = `W ${W} wait ${wait}`;
      if (W >= 560) {
        if (L.mode !== 'row') { is(false, `${tag}: row mode from 560`); continue; }
        const platW = L.platCols * L.plat + (L.platCols - 1) * L.platGap + 2 * L.platPad;
        if (!(L.carW <= W && platW <= W)) is(false, `${tag}: the carriage (${L.carW}) and the platform (${platW}) fit`);
        if (W >= 640 && !(L.pic >= 96 && L.plat >= 96)) is(false, `${tag}: passengers ${L.pic} and platform animals ${L.plat} ≥ 96 px from 640`);
        if (!(L.pic >= L.plat && L.pic <= L.seat)) is(false, `${tag}: the passengers (${L.pic}) are at least as big as the waiting animals (${L.plat}) — the train is the hero`);
        if (!(L.seat <= 136)) is(false, `${tag}: seats ≤ 136`);
        if (!(Math.ceil(wait / L.platCols) === 2)) is(false, `${tag}: the platform stands in two rows`);
      } else {
        if (L.mode !== 'stack') { is(false, `${tag}: stack below 560`); continue; }
        const total = L.carW + L.split + (2 * L.plat + L.platGap + 2 * L.platPad + L.edge);
        if (!(total <= W)) is(false, `${tag}: carriage + platform side by side fit (${total} > ${W})`);
        if (W >= 312 && !(L.seat >= 64)) is(false, `${tag}: seats ≥ 64 px on a phone (${L.seat})`);
        if (!(L.seat <= 88)) is(false, `${tag}: stack seats ≤ 88`);
        if (!(L.pic >= L.plat && L.pic <= L.seat)) is(false, `${tag}: phone passengers (${L.pic}) at least as big as the waiting animals (${L.plat})`);
      }
    }
  }
  is(true, 'layout sweep 240–1400 done (the phone floor is asserted from a 312 px stage: a 360 phone gives 328)');
  is(C.layout(648, 12).seat === 120 && C.layout(328, 12).seat === 68, 'spot values: a 704 iframe stage (648) → 120 px seats, a 360-phone stage (328) → 68');
}

console.log(`\nverify-animal-train-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

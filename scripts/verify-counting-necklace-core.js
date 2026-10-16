#!/usr/bin/env node
/* =====================================================================
   verify-counting-necklace-core.js — the model gate for ACTIVITY #9, the
   Counting Necklace (K.CC.B.4). Pools, the bead angles (no bead ever
   crosses another, every bead slides back toward the clasp, nothing sits
   on the clasp), the slide (one bead per tap, in string order), the two
   questions per round (the right card once, the lures in the direction of
   the misconception they stand for), the twists (moving changes nothing,
   one more is one more), Count again, the guessing ratchets (smallest /
   largest / middle / first / second / third card), the layout floors.
   ⭐ Expectations are written out HERE from the design sheet, never read
   off the core. The guessing ratchets come from --measure and may only shrink.
   Usage: node scripts/verify-counting-necklace-core.js [--measure]   (NK_CORE_DIR=<dir> for a mutant)
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.NK_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'counting-necklace-core.js'));
const MEASURE = process.argv.includes('--measure');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 30) console.error('   FAIL: ' + m); } };
const EPS = 1e-9;

/* ---- the ground truth ---- */
const POOL10 = [[5, 'clumps', 'spread'], [6, 'spread', 'bunch'], [7, 'bunch', 'oneMore'], [8, 'clumps', 'spread'], [9, 'spread', 'bunch'], [4, 'spread', 'oneMore'], [10, 'clumps', 'bunch'], [6, 'bunch', 'spread'], [8, 'spread', 'oneMore'], [7, 'clumps', 'bunch']];
const POOL5 = [[3, 'spread', 'spread'], [3, 'clumps', 'bunch'], [4, 'bunch', 'oneMore'], [4, 'spread', 'spread'], [5, 'clumps', 'bunch'], [5, 'spread', 'oneMore'], [4, 'clumps', 'bunch'], [3, 'bunch', 'oneMore']];
const RATCHET = {   /* measured 2026-10-16 (--measure); may only shrink */
  to10: { min: 0.35, max: 0.30, mid: 0.35, p0: 0.35, p1: 0.30, p2: 0.35 },
  to5:  { min: 0.32, max: 0.44, mid: 0.25, p0: 0.38, p1: 0.32, p2: 0.32 }
};
const touch = 2 * Math.asin(C.BEAD / C.R) * 180 / Math.PI;   /* the angle two touching beads span */
function sane(angles, tag) {
  is(angles.every(a => a > touch / 2 + 8 && a < 360 - touch / 2 - 8), `${tag}: no bead on the clasp (${angles.map(a => a.toFixed(0)).join(',')})`);
  for (let i = 1; i < angles.length; i++) is(angles[i] - angles[i - 1] >= touch - EPS, `${tag}: beads ${i - 1} and ${i} do not overlap (${(angles[i] - angles[i - 1]).toFixed(1)}° ≥ ${touch.toFixed(1)}°)`);
}

console.log('[A] constants and pools');
is(C.VB === 400 && C.R === 160 && C.BEAD === 24 && C.MAXB === 11, 'geometry: view box 400, cord radius 160, bead radius 24, eleven beads at most');
is(C.STEP >= touch && C.STEP <= touch + 2, `the pack step ${C.STEP}° makes touching beads (${touch.toFixed(2)}°)`);
is(C.NUMBERS.join() === 'shown,hidden', 'counting numbers shown / hidden');
for (const [range, want] of [['to10', POOL10], ['to5', POOL5]]) {
  const R = C.rounds(range, 'nk');
  is(R.length === want.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7 originals)`);
  is(R.every((r, i) => r.n === want[i][0] && r.start === want[i][1] && r.twist === want[i][2]), `${range}: n / start / twist as designed`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids unique`);
  is(new Set(R.map(r => r.n + r.start + r.twist)).size === R.length, `${range}: every round is a different necklace`);
  for (const tw of ['spread', 'bunch', 'oneMore']) is(R.some(r => r.twist === tw), `${range}: some round ${tw}s`);
  is(R.every(r => r.palette.length === 2 && r.palette[0] !== r.palette[1] && r.palette.every(c => C.COLORS.indexOf(c) >= 0)), `${range}: two different bead colours a round`);
  is(JSON.stringify(C.rounds(range, 'nk')) === JSON.stringify(R), `${range}: deterministic for a seed`);
  /* the two questions */
  for (const r of R) {
    const tag = `${range} ${r.id}`;
    for (const [q, kind, ans] of [[r.howMany, 'howMany', r.n], [r.after, r.twist, r.twist === 'oneMore' ? r.n + 1 : r.n]]) {
      is(q.answer === ans, `${tag} ${kind}: answer ${q.answer}, want ${ans}`);
      is(q.cards.length === 3 && new Set(q.cards).size === 3 && q.cards.filter(c => c === ans).length === 1, `${tag} ${kind}: three different cards, the answer once (${q.cards.join(' ')})`);
      is(q.cards.every(c => Number.isInteger(c) && c >= 1 && c <= 12), `${tag} ${kind}: cards 1–12`);
      const lures = q.cards.filter(c => c !== ans);
      if (kind === 'spread') is(lures.some(c => c > r.n), `${tag}: a spread question carries a "looks like more" card (${lures.join(',')})`);
      if (kind === 'bunch') is(lures.some(c => c < r.n), `${tag}: a bunch question carries a "looks like fewer" card (${lures.join(',')})`);
      if (kind === 'oneMore') is(lures.indexOf(r.n) >= 0 || lures.every(c => c > r.n + 1), `${tag}: one more carries the old count or "more than one" (${lures.join(',')})`);
      if (kind === 'howMany') is(lures.every(c => Math.abs(c - r.n) <= 2), `${tag}: how many lures are neighbours (${lures.join(',')})`);
    }
  }
  /* the guessing ratchets */
  const qs = []; R.forEach(r => { qs.push(r.howMany); qs.push(r.after); });
  const rate = f => qs.filter(q => f(q) === q.answer).length / qs.length;
  const got = { min: rate(q => Math.min(...q.cards)), max: rate(q => Math.max(...q.cards)), mid: rate(q => q.cards.slice().sort((a, b) => a - b)[1]), p0: rate(q => q.cards[0]), p1: rate(q => q.cards[1]), p2: rate(q => q.cards[2]) };
  if (MEASURE) console.log(`   measured ${range}: ` + Object.entries(got).map(([k, v]) => k + ' ' + v.toFixed(3)).join(' · '));
  for (const k of Object.keys(RATCHET[range])) is(got[k] <= RATCHET[range][k] + EPS, `${range}: a "${k}" guesser is right ${got[k].toFixed(2)} ≤ ${RATCHET[range][k]}`);
}
is(C.rounds('bogus', 'nk').length === POOL10.length, 'an unknown range falls back to to 10');
/* every kind, every lure variant, every position, down to a necklace of one — no card below 1, the answer once */
for (const kind of ['howMany', 'spread', 'bunch', 'oneMore']) for (let n = 1; n <= 10; n++) for (let v = 0; v < 3; v++) for (let pos = 0; pos < 3; pos++) {
  const q = C.cardsFor(kind, n, v, 's', pos), ans = kind === 'oneMore' ? n + 1 : n;
  is(q.cards.length === 3 && new Set(q.cards).size === 3 && q.cards.every(c => Number.isInteger(c) && c >= 1) && q.cards[pos] === ans && q.answer === ans, `cardsFor(${kind}, ${n}, v${v}, pos ${pos}) = ${q.cards.join(' ')}`);
}

console.log('[B] arrangements — every kind, every size');
for (const kind of ['spread', 'bunch', 'clumps']) for (let m = 3; m <= 11; m++) for (const seed of ['a', 'b', 'nk:to10:3']) {
  const a = C.arrange(kind, m, seed), tag = `${kind} ${m} ${seed}`;
  is(a.length === m, `${tag}: ${m} beads`);
  sane(a, tag);
  is(a.every((x, i) => x >= C.packAngle(i) - EPS), `${tag}: every bead lies at or past its counted place (it slides back to the clasp)`);
  is(a[0] >= 60, `${tag}: the counted side by the clasp starts empty (first bead at ${a[0].toFixed(0)}°)`);
}
{ const a = C.arrange('spread', 8, 's'), d = a.slice(1).map((x, i) => x - a[i]); is(Math.max(...d) - Math.min(...d) < 1e-6, 'spread: even gaps'); }
{ const a = C.arrange('bunch', 8, 's'), d = a.slice(1).map((x, i) => x - a[i]); is(d.every(x => Math.abs(x - C.STEP) < 1e-6), 'bunch: beads touch'); }
{ const s = C.arrange('spread', 8, 's'), b = C.arrange('bunch', 8, 's'); is((s[7] - s[0]) > 2 * (b[7] - b[0]), 'spread lies at least twice as wide as bunch'); }
{ const a = C.arrange('clumps', 9, 'x'), d = a.slice(1).map((x, i) => x - a[i]); is(d.some(x => Math.abs(x - C.STEP) < 1e-6) && d.some(x => x > C.STEP + 10), 'clumps: touching beads and gaps both'); }
for (let k = 0; k < 11; k++) is(Math.abs(C.packAngle(k) - (C.PACK0 + k * C.STEP)) < EPS, `pack place ${k}`);
sane(Array.from({ length: 11 }, (_, k) => C.packAngle(k)), 'the full pack of eleven');

console.log('[C] the slide — one bead per tap, in string order');
for (const range of ['to10', 'to5']) for (const r of C.rounds(range, 'nk')) {
  const st = C.newState(r), tag = `${range} ${r.id}`;
  is(st.phase === 'count' && st.counted === 0 && st.total === r.n && st.angles.length === r.n && !st.done && st.misses === 0, `${tag}: a fresh necklace`);
  is(JSON.stringify(st.angles) === JSON.stringify(C.arrange(r.start, r.n, r.seed)), `${tag}: the beads lie as the round says (${r.start})`);
  is(C.question(st) === null && C.hintKey(st) === 'hintSlide', `${tag}: no question while counting; the hint says slide`);
  is(C.pick(st, r.n) === null && st.misses === 0, `${tag}: a card cannot be taken while counting`);
  for (let k = 1; k <= r.n; k++) {
    const before = st.angles.slice();
    is(C.slide(st), `${tag}: slide ${k}`);
    is(st.counted === k, `${tag}: counted ${k}`);
    is(Math.abs(st.angles[k - 1] - C.packAngle(k - 1)) < EPS, `${tag}: bead ${k - 1} is at its counted place`);
    is(st.angles.every((a, i) => i === k - 1 || a === before[i]), `${tag}: only one bead moved on slide ${k}`);
    sane(st.angles, `${tag} after slide ${k}`);
  }
  is(st.phase === 'howMany' && !C.slide(st) && st.counted === r.n, `${tag}: all across → how many; no more slides`);
  { const f = C.newState(r); f.counted = f.total; is(!C.slide(f) && f.counted === f.total, `${tag}: no slide past the last bead, even while counting`); }
  is(C.hintKey(st) === 'hintPick' && C.question(st) === r.howMany, `${tag}: the how-many question and the pick hint`);
}

console.log('[D] the questions, the twists, the notes, Count again');
for (const range of ['to10', 'to5']) for (const r of C.rounds(range, 'nk')) {
  const tag = `${range} ${r.id}`, n = r.n;
  const count = (st) => { while (C.slide(st)); };
  /* a wrong how-many */
  let st = C.newState(r); count(st);
  const wrongH = r.howMany.cards.find(c => c !== n);
  let res = C.pick(st, wrongH);
  is(res && !res.ok && res.note === 'noteLast' && st.note === 'noteLast' && st.misses === 1 && st.phase === 'howMany', `${tag}: ${wrongH} for how many → noteLast, still asking`);
  is(C.pick(st, 99) === null && st.misses === 1, `${tag}: a number that is not on a card is ignored`);
  /* Count again before the twist: the start arrangement */
  is(C.recount(st) && st.phase === 'count' && st.counted === 0 && st.note === null && JSON.stringify(st.angles) === JSON.stringify(C.arrange(r.start, n, r.seed)), `${tag}: Count again lays the beads out as at the start`);
  count(st);
  res = C.pick(st, n);
  is(res && res.ok && res.phase === 'howMany' && st.phase === 'after' && st.twisted, `${tag}: ${n} → right; the necklace changes`);
  if (r.twist === 'oneMore') {
    is(st.total === n + 1 && st.angles.length === n + 1 && Math.abs(st.angles[n] - C.packAngle(n)) < EPS, `${tag}: one more bead came on, at the end of the pack`);
  } else {
    is(st.total === n && JSON.stringify(st.angles) === JSON.stringify(C.arrange(r.twist, n, r.seed)), `${tag}: the same ${n} beads, now ${r.twist}`);
  }
  sane(st.angles, `${tag} after the twist`);
  is(C.question(st) === r.after && C.hintKey(st) === 'hintPick', `${tag}: the after question`);
  const ans = r.twist === 'oneMore' ? n + 1 : n;
  for (const w of r.after.cards.filter(c => c !== ans)) {
    const m0 = st.misses; res = C.pick(st, w);
    const want = r.twist === 'oneMore' ? (w < n + 1 ? 'noteOneOn' : 'noteOnlyOne') : 'noteMoved';
    is(res && !res.ok && res.note === want && st.misses === m0 + 1 && !st.done, `${tag}: ${w} after ${r.twist} → ${want} (got ${res && res.note})`);
  }
  /* Count again after the twist: the twisted arrangement (spread/bunch), spread after one more */
  const kind = r.twist === 'oneMore' ? 'spread' : r.twist;
  is(C.recount(st) && st.phase === 'count' && st.counted === 0 && JSON.stringify(st.angles) === JSON.stringify(C.arrange(kind, st.total, r.seed)), `${tag}: Count again after the twist lays the beads ${kind}`);
  count(st);
  is(st.phase === 'after' && st.counted === st.total, `${tag}: recounted → back to the after question, not how many`);
  res = C.pick(st, ans);
  is(res && res.ok && res.done && st.done && st.phase === 'done', `${tag}: ${ans} → done`);
  is(C.finalAnswer(r) === ans, `${tag}: the final answer is ${ans}`);
  is(!C.recount(st) && !C.slide(st) && C.pick(st, ans) === null, `${tag}: a finished necklace takes nothing more`);
}

console.log('[E] layout floors at every width 280–1400');
for (let W = 280; W <= 1400; W++) {
  const L = C.layout(W), tag = `W=${W}`;
  if (W >= 600) {
    is(L.mode === 'row' && L.D <= 440 && L.D + 16 + L.panel === W && L.panel >= 220, `${tag}: row — necklace ${L.D} + panel ${L.panel}`);
    is(L.bead >= 44 && L.card >= 64 && L.card <= 96, `${tag}: beads ${L.bead} ≥ 44, cards ${L.card}`);
  } else {
    is(L.mode === 'stack' && L.D === Math.min(420, Math.floor(W * 0.88)), `${tag}: stack — necklace ${L.D} = min(420, 88 % of ${W})`);
    is(L.bead >= 28 && L.card >= 64 && 3 * L.card + 24 <= W + 1, `${tag}: beads ${L.bead}, three cards of ${L.card} fit`);
  }
}
{ const p = C.beadXY(0), q = C.beadXY(90); is(Math.abs(p.x - 200) < EPS && Math.abs(p.y - 40) < EPS && Math.abs(q.x - 360) < EPS && Math.abs(q.y - 200) < EPS, 'angle 0 is the clasp at the top; 90 is the right'); }

console.log(`verify-counting-necklace-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

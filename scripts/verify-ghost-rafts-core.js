#!/usr/bin/env node
/* =====================================================================
   verify-ghost-rafts-core.js — the model gate for ACTIVITY #31, the Ghost
   Rafts (K.NBT.A.1). Its own oracle (design §6–7, §12), never the core's:
   the seal happens exactly at the 10th seat and every loose bubble is then
   on the tow-line (none before); a pop keeps the number; the ghost of every
   card 1–99 counted by repeated subtraction; each card round has one right
   card and two decoys of named misconceptions; the slot and size-rank
   balance over 10 000 shuffle seeds; a pass opens on a CATCH and never
   repeats; DOCK / FIX / TWO TANKS; hints never say 0; the drift never passes
   12 px/s; the layout fits; the number words byte-equal the worksheets';
   strings × 11. Env GR_CORE_DIR loads a mutant core (mutate-ghost-rafts.js).
   ===================================================================== */
'use strict';
const path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.GR_CORE_DIR || MT, 'ghost-rafts-core.js'));
const WORDS = require(path.join(MT, 'ghost-rafts-words.js'));
const NW = require(path.join(ROOT, 'scripts', 'worksheet-gen', 'lib', 'number-words.js'));
global.window = global;
const STR = require(path.join(MT, 'ghost-rafts-activity.js')).strings;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 40) console.error('   FAIL: ' + m); } };
function seeded(s) { let x = s >>> 0 || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }
const tens = (m) => { let r = 0; while (m >= 10) { m -= 10; r++; } return r; };
const all = (st) => st.tank.raft * 10 + st.tank.seats + st.tank.loose + st.tank.tow;

/* ---- the design's tables (§6) ---- */
const DESIGN = {
  '19': [['catch', 13, [13, 31, 14]], ['dock', 15], ['catch', 16, [16, 61, 6]], ['fix', 14, null, 2], ['pop', 12, [12, 2, 10]], ['catch', 18, [18, 81, 17]], ['dock', 17], ['two', [13, 18]], ['catch', 11, [11, 10, 1]]],
  '15': [['catch', 12, [12, 21, 2]], ['dock', 11], ['catch', 14, [14, 41, 15]], ['fix', 13, null, 5], ['pop', 15, [15, 51, 5]], ['catch', 15, [15, 5, 10]], ['dock', 13], ['two', [14, 12]], ['catch', 11, [11, 10, 1]]]
};
for (const lv of ['15', '19']) {
  const P = C.rounds(lv), D = DESIGN[lv];
  is(P.length === 9, `${lv}: nine rounds`);
  D.forEach((d, i) => {
    const r = P[i];
    if (d[0] === 'two') { is(r.kind === 'two' && [r.a, r.b].sort().join() === d[1].slice().sort().join(), `${lv} #${i + 1}: two tanks ${d[1]}`); return; }
    is(r.kind === d[0] && r.n === d[1], `${lv} #${i + 1}: ${d[0]} ${d[1]} (${r.kind} ${r.n})`);
    if (d[2]) is(r.cards && r.cards.join() === d[2].join(), `${lv} #${i + 1}: cards ${d[2]}`);
    if (d[3] != null) is(r.start === d[3], `${lv} #${i + 1}: starts at 10 + ${d[3]}`);
  });
  /* every number a teen, never 0 */
  P.forEach(r => { const ns = r.kind === 'two' ? [r.a, r.b] : [r.n]; ns.forEach(n => is(n >= 11 && n <= 19, `${lv} ${r.id}: ${n} is a teen`)); if (r.cards) r.cards.forEach(c => is(c > 0, `${lv} ${r.id}: card ${c} is not 0`)); });
  /* the decoys: exactly one right card, two decoys of a named misconception */
  const cardRounds = P.filter(r => r.cards);
  is(cardRounds.length === 5, `${lv}: five card rounds`);
  const kindOf = (n, m) => { const k = []; if (m !== n && m === (n % 10) * 10 + tens(n)) k.push('reversal'); if (m === n - 10 * tens(n)) k.push('ones'); if (m === 10) k.push('ten'); if (m === n + 1 || m === n - 1) k.push('neighbour'); return k; };
  let reversals = 0; const rank = [0, 0, 0];
  cardRounds.forEach(r => {
    is(r.cards.filter(c => c === r.n).length === 1 && new Set(r.cards).size === 3, `${lv} ${r.id}: one right card, three different cards`);
    r.cards.filter(c => c !== r.n).forEach(m => { const k = kindOf(r.n, m); is(k.length > 0, `${lv} ${r.id}: decoy ${m} is a named misconception (${k})`); if (k.includes('reversal')) reversals++; is(String(C.decoyKinds(r.n, m)) === String(k), `${lv} ${r.id}: the core names decoy ${m} the same way`); });
    rank[r.cards.slice().sort((a, b) => a - b).indexOf(r.n)]++;
  });
  is(reversals >= 2 && reversals <= 3, `${lv}: the reversal decoy in 2–3 of 5 rounds (${reversals})`);
  is(rank.every(c => c <= 2) && rank[0] === 1 && rank[1] === 2 && rank[2] === 2, `${lv}: the right card is smallest 1 / middle 2 / largest 2 (${rank})`);
  /* the TWO TANKS bigger side: left in one level, right in the other */
  const tw = P.find(r => r.kind === 'two'), st0 = C.newState(tw, { swap: false }), st1 = C.newState(tw, { swap: true });
  is(st0.two[0] !== st1.two[0] && st0.two.slice().sort().join() === st1.two.slice().sort().join(), `${lv}: the coin swaps the two tanks`);
}
is(C.newState(C.rounds('19')[7], { swap: false }).two[1] > C.newState(C.rounds('19')[7], { swap: false }).two[0] && C.newState(C.rounds('15')[7], { swap: false }).two[0] > C.newState(C.rounds('15')[7], { swap: false }).two[1], 'the bigger tank is right at Up to 19 and left at Up to 15 before the coin');

/* ---- the order + the deal over 10 000 seeds ---- */
for (const lv of ['15', '19']) {
  const P = C.rounds(lv);
  let prev = null, badOpen = 0, repeats = 0, seams = 0, slotBad = 0, permBad = 0, swaps = 0;
  const seen = new Set();
  for (let s = 1; s <= 10000; s++) {
    const r = seeded(s), o = C.order(P, r, prev);
    if (P[o[0]].kind !== 'catch') badOpen++;
    if (o.slice().sort((a, b) => a - b).join() !== P.map((x, i) => i).join()) permBad++;
    if (prev) { if (o.join() === prev.join()) repeats++; if (o[0] === prev[prev.length - 1]) seams++; }
    seen.add(o.join());
    const dl = C.deal(P, o, r), cnt = [0, 0, 0];
    o.filter(i => P[i].cards).forEach(i => { const sl = dl.slots[i]; if (sl.slice().sort((a, b) => a - b).join() !== P[i].cards.slice().sort((a, b) => a - b).join()) permBad++; cnt[sl.indexOf(P[i].n)]++; });
    if (cnt.some(c => c < 1 || c > 2)) slotBad++;
    if (dl.swap) swaps++;
    prev = o;
  }
  is(badOpen === 0, `${lv}: every pass opens on a CATCH (${badOpen} bad)`);
  is(permBad === 0, `${lv}: every order and every deal is a permutation (${permBad})`);
  is(repeats === 0 && seams === 0, `${lv}: never the same order twice, never the same seam (${repeats}, ${seams})`);
  is(seen.size > 2000, `${lv}: orders vary (${seen.size})`);
  is(slotBad === 0, `${lv}: per pass the right card sits in each slot at least once and at most twice (${slotBad} bad of 10 000)`);
  is(swaps > 4000 && swaps < 6000, `${lv}: the two-tank coin is fair (${swaps})`);
  const o1 = C.order(P, seeded(77), null), o2 = C.order(P, seeded(77), null);
  is(o1.join() === o2.join() && C.deal(P, o1, seeded(5)).slots[o1.find(i => P[i].cards)].join() === C.deal(P, o2, seeded(5)).slots[o2.find(i => P[i].cards)].join(), `${lv}: the same seed gives the same order and deal`);
}
/* a stale deal from the other level is refused */
{ const r = C.rounds('15')[0]; const st = C.newState(r, { slots: [13, 31, 14] }); is(st.cards.slice().sort().join() === r.cards.slice().sort().join(), 'a deal for other cards is refused'); }

/* ---- CATCH: the seal, the tow-line, the cards ---- */
for (const lv of ['15', '19']) C.rounds(lv).filter(r => r.kind === 'catch').forEach(r => {
  const st = C.newState(r);
  is(st.tank.loose === r.n && all(st) === r.n && st.frame, `${r.id}: ${r.n} loose bubbles in the tank`);
  is(C.pickCard(st, r.n).result === 'notyet' && st.misses === 0 && !st.done && C.hint(st).key === 'hintCatch', `${r.id}: a card before the ten is caught is no miss`);
  for (let i = 1; i <= 9; i++) { const res = C.catchBubble(st); is(res && !res.sealed && st.tank.seats === i && st.tank.tow === 0 && !st.tank.raft, `${r.id}: seat ${i}, nothing on the tow-line yet`); }
  is(C.release(st) && st.tank.seats === 8 && st.tank.loose === r.n - 8, `${r.id}: a seated bubble floats off`);
  C.catchBubble(st);
  const res = C.catchBubble(st);
  is(res && res.sealed && st.tank.raft === 1 && st.tank.seats === 0 && st.tank.loose === 0 && st.tank.tow === r.n - 10 && all(st) === r.n, `${r.id}: the 10th seals one raft; the ${r.n - 10} left hook onto the tow-line`);
  is(C.catchBubble(st) === null && C.release(st) === null && C.pop(st) === null, `${r.id}: nothing more to catch; a catch round's raft does not pop`);
  is(C.inTank(st) === r.n, `${r.id}: the tank holds ${r.n}`);
  const wrong = r.cards.filter(c => c !== r.n);
  const w1 = C.pickCard(st, wrong[0]);
  is(w1.result === 'wrong' && st.misses === 1 && st.help === 1 && st.ghost.rafts === tens(wrong[0]) && st.ghost.ones === wrong[0] - 10 * tens(wrong[0]), `${r.id}: ${wrong[0]} builds its ghost (${st.ghost.rafts} rafts + ${st.ghost.ones})`);
  is(C.hint(st).key === 'hintGhost' && C.hint(st).m === wrong[0] && !C.numbered(st), `${r.id}: miss 1 names the card`);
  C.pickCard(st, wrong[1]);
  is(st.misses === 2 && C.numbered(st) && C.hint(st).key === 'hintOneTen' && C.hint(st).k === r.n - 10, `${r.id}: miss 2 counts on (one ten and ${r.n - 10} more)`);
  is(C.pickCard(st, 99) === null, `${r.id}: a card that is not offered is ignored`);
  const ok = C.pickCard(st, r.n);
  is(ok.result === 'ok' && st.done && st.record === r.n, `${r.id}: ${r.n} is right`);
  const sc = C.success(st);
  is(sc.key === 'okMake' && sc.args.n === C.inTank(st) && sc.args.k === st.tank.tow, `${r.id}: the success sentence comes from the tank (10 + ${sc.args.k} = ${sc.args.n})`);
  const rc = C.record(st); is(rc.ten === 10 && rc.k === r.n - 10 && rc.n === r.n, `${r.id}: the record reads 10 + ${rc.k} = ${rc.n}`);
});
/* ---- POP ---- */
for (const lv of ['15', '19']) C.rounds(lv).filter(r => r.kind === 'pop').forEach(r => {
  const st = C.newState(r);
  is(st.tank.raft === 1 && st.tank.tow === r.n - 10 && all(st) === r.n && !st.frame, `${r.id}: a sealed raft and ${r.n - 10} behind`);
  is(C.record(st).k === r.n - 10 && C.record(st).n === null, `${r.id}: the record shows 10 + ${r.n - 10} = ?`);
  is(C.pickCard(st, r.n).result === 'notyet' && st.misses === 0 && C.hint(st).key === 'hintPop', `${r.id}: a card before the pop is no miss`);
  is(C.pop(st) && st.tank.raft === 0 && st.tank.loose === 10 && st.tank.tow === r.n - 10 && all(st) === r.n, `${r.id}: the pop keeps ${r.n}: ten loose and the row`);
  is(C.pop(st) === null && C.catchBubble(st) === null, `${r.id}: a popped raft is gone; there is no frame to catch on`);
  const wrong = r.cards.filter(c => c !== r.n);
  C.pickCard(st, wrong[0]); C.pickCard(st, wrong[1]);
  is(C.numbered(st) && C.hint(st).key === 'hintTenLoose' && C.hint(st).k === r.n - 10, `${r.id}: miss 2 — ten loose and ${r.n - 10} more`);
  C.pickCard(st, r.n);
  is(st.done && C.success(st).key === 'okPop' && C.success(st).args.n === all(st), `${r.id}: still ${r.n}`);
});
/* ---- DOCK + FIX ---- */
for (const lv of ['15', '19']) C.rounds(lv).filter(r => r.kind === 'dock' || r.kind === 'fix').forEach(r => {
  const st = C.newState(r), k = r.n - 10;
  is(st.reeds.raft === 1 && st.reeds.spare === 9 && k <= 9, `${r.id}: the reeds hold one raft and nine bubbles (enough for ${k})`);
  if (r.kind === 'dock') {
    is(all(st) === 0 && C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintDock', `${r.id}: Check with nothing is no miss`);
    for (let i = 0; i < k - 1; i++) C.addSpare(st);
    is(st.tank.loose === k - 1 && st.tank.tow === 0, `${r.id}: spare bubbles drift loose until the raft docks`);
    is(C.dock(st).docked && st.tank.raft && st.tank.tow === k - 1 && st.tank.loose === 0, `${r.id}: the raft docks and the loose ones hook on`);
  } else {
    is(st.tank.raft === 1 && st.tank.tow === r.start && r.start !== k && all(st) !== r.n, `${r.id}: the tank starts wrong (10 + ${r.start})`);
    while (st.tank.tow > k - 1) C.takeBubble(st);
    while (st.tank.tow < k - 1) C.addSpare(st);
  }
  if (r.kind === 'fix') is(C.dock(st) && C.dock(st).refused === 'oneTen' && st.tank.raft === 1 && st.reeds.raft === 1, `${r.id}: a second raft is refused`);
  else is(C.dock(st) === null && st.reeds.raft === 0, `${r.id}: the reeds held one raft, and it is docked`);
  const m1 = C.check(st);
  is(m1.result === 'few' && st.misses === 1 && st.ghost.rafts === 1 && st.ghost.ones === k && C.hint(st).key === 'hintGhostMake', `${r.id}: one short — the ghost of ${r.n}`);
  C.check(st);
  is(C.hint(st).key === 'hintNeed' && C.hint(st).k === k && C.blink(st).missing === 1 && C.blink(st).extra === 0, `${r.id}: miss 2 — you need ${k}; one place missing`);
  C.addSpare(st); C.addSpare(st);
  is(C.blink(st) === null || C.blink(st).extra === 0, `${r.id}: a move clears the help`);
  is(C.check(st).result === 'many', `${r.id}: one too many is a miss`);
  C.takeBubble(st);
  is(C.check(st).result === 'ok' && st.done && C.success(st).args.k === k, `${r.id}: ${r.n} made`);
});
/* the spare cap: never more than nine behind the raft */
{ const st = C.newState(C.rounds('15')[3]); let g = 0; while (C.addSpare(st) && g < 30) g++; is(st.tank.tow === 9 && st.reeds.spare === 5, `fix: the tow-line holds at most nine (${st.tank.tow})`); }
/* ---- TWO TANKS ---- */
for (const lv of ['15', '19']) { const r = C.rounds(lv).find(x => x.kind === 'two'); [false, true].forEach(sw => {
  const st = C.newState(r, { swap: sw }), big = st.two[0] > st.two[1] ? 0 : 1;
  is(st.two.every(v => tens(v) === 1), `${r.id}: both tanks have exactly one raft`);
  is(C.pickTank(st, 1 - big).result === 'wrong' && C.hint(st).key === 'hintSameTen' && C.pairing(st).rows.join() === [st.two[0] - 10, st.two[1] - 10].join() && !C.pairing(st).glow, `${r.id}: the wrong tank pairs the rows`);
  C.pickTank(st, 1 - big);
  is(C.pairing(st).glow, `${r.id}: miss 2 makes the extras glow`);
  is(C.pickTank(st, big).result === 'ok' && st.done, `${r.id}: the bigger tank`);
  const sc = C.success(st), hi = Math.max(r.a, r.b), lo = Math.min(r.a, r.b);
  is(sc.key === 'okTwo' && sc.args.a === hi && sc.args.b === lo && sc.args.ka === hi - 10 && sc.args.kb === lo - 10, `${r.id}: ${hi} is more than ${lo}: ${hi - 10} instead of ${lo - 10}`);
}); }

/* ---- the ghost of every card 1–99 ---- */
for (let m = 1; m <= 99; m++) { const g = C.ghostOf(m); is(g.rafts === tens(m) && g.ones === m - 10 * tens(m) && (g.rafts > 0) === (m >= 10), `ghost of ${m}`); }
/* ---- free play: every card builds its ghost, nothing judged ---- */
{ const st = C.newPlay(); is(st.explore && C.check(st) === null && C.pickCard(st, 13) === null, 'Ghost bay: nothing is judged');
  for (let i = 0; i < 14; i++) C.addSpare(st); for (let i = 0; i < 10; i++) C.catchBubble(st);
  is(st.tank.raft === 1 && st.tank.tow === 4 && C.pop(st) && st.tank.loose === 10 && all(st) === 14, 'Ghost bay: catch, seal, pop — still 14');
  is(C.playCard(st, 47).rafts === 4 && st.ghost.ones === 7, 'Ghost bay: 47 builds four rafts and seven bubbles');
  let g = 0; while (C.addSpare(st) && g < 40) g++; is(C.inTank(st) === 19 && C.TANK_MAX === 19, `Ghost bay: the tank holds at most 19 (${C.inTank(st)})`); }

/* ---- hints never say 0 ---- */
for (const lv of ['15', '19']) C.rounds(lv).forEach(r => { if (r.kind !== 'two') is(r.n - 10 >= 1, `${r.id}: k = ${r.n - 10} is never 0`); });

/* ---- the drift: never faster than 12 px/s ---- */
{ const box = { x0: 8, y0: 100, x1: 300, y1: 200 }; let max = 0;
  for (let s = 1; s <= 300; s++) { const r = seeded(s), b = C.newBubble(r, box); let p = C.driftStep(b, 0, box);
    for (let t = 0; t < 400; t++) { const dt = 0.016 + r() * 0.05, q = C.driftStep(b, dt, box); max = Math.max(max, Math.hypot(q.x - p.x, q.y - p.y) / dt); p = q; is(q.x >= box.x0 - 0.01 && q.x <= box.x1 + 0.01 && q.y >= box.y0 - 3.01 && q.y <= box.y1 + 3.01, 'drift stays in the water'); } }
  is(max > 2 && max <= 12, `the drift moves, never past 12 px/s (max ${max.toFixed(2)})`);
  is(C.maxSpeed() <= 12 && C.DRIFT_MAX === 12, 'the drift cap is 12 px/s'); }

/* ---- layout: the frame and the sealed raft fit the tank; taps ≥ 44 ---- */
for (let W = 280; W <= 1100; W += 4) {
  const L = C.layout(W), gap = L.mode === 'wide' ? 6 : 4, frameW = 5 * L.seat + 4 * gap + 12, deck = L.mode === 'wide' ? 104 : 72;
  is(L.duck + 22 + frameW <= L.tankW, `@${W}: the raft frame fits right of Dewey (${L.duck + 22 + frameW} ≤ ${L.tankW})`);
  is(12 + deck + frameW <= L.tankW, `@${W}: the sealed raft with Dewey's deck fits (${12 + deck + frameW} ≤ ${L.tankW})`);
  is(26 + 9 * (L.tow + 6) <= L.tankW + 6 || L.mode === 'narrow', `@${W}: nine bubbles on the tow-line in one row (wide)`);
  is(L.bubble >= 44 && L.duck >= 64, `@${W}: a bubble ≥ 44, Dewey ≥ 64`);
  is((L.mode === 'wide') === (W >= 600) && (L.mode === 'wide') === (L.bay > 0), `@${W}: mode and bay agree`);
}

/* ---- the number words: byte-equal to the worksheets' tables ---- */
LOCALES.forEach(l => { let ok = true; for (let n = 1; n <= 99; n++) if (WORDS[l][n] !== NW.numberWord(n, l)) ok = false; is(ok, `words ${l}: 1–99 equal lib/number-words.js`); is(WORDS[l][0] === '', `words ${l}: no 0`); });

/* ---- strings × 11: present, same placeholders, no price word ---- */
const PRICE = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai|de graça)/i;
Object.keys(STR).forEach(k => {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach(l => { is(typeof STR[k][l] === 'string' && STR[k][l].length > 0, `strings ${k}.${l}`); is(ph(STR[k][l]) === ph(STR[k].en), `strings ${k}.${l}: placeholders ${ph(STR[k].en)}`); is(!PRICE.test(STR[k][l]), `strings ${k}.${l}: no price word`); });
  is(!/(?<!\u202f)[?!:;]/.test(STR[k].fr) && !/«(?!\u202f)|(?<!\u202f)»/.test(STR[k].fr), `strings ${k}.fr: U+202F before ? ! : ; and inside « »`);
});

console.log(`verify-ghost-rafts-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   verify-overflow-trays-core.js — the gate for THE OVERFLOW TRAYS (#30,
   K.NBT.A.1). Its own oracle: the gravity rule over every pour / take-back
   sequence the gate generates (20 000 random walks); the design's teen and
   day tables written out again; every day round played through all its
   steps by the gate's own plan (stack tens, pour ones, un-seal, break a
   ten); the number words byte-compared with the worksheets' reviewed
   tables; the readout hidden during a task. Design §12 rules 1–8, plus the
   misses, the order, free play, strings and layout.
   Usage: node scripts/verify-overflow-trays-core.js   (OT_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.OT_CORE_DIR || MT, 'overflow-trays-core.js'));
const WORDS = require(path.join(MT, 'overflow-trays-words.js'));
const NW = require(path.join(ROOT, 'scripts', 'worksheet-gen', 'lib', 'number-words.js'));
let ACT = null; try { ACT = require(path.join(MT, 'overflow-trays-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

/* ---- 3 + 4: the tables ---- */
const teen = C.rounds('teen'), day = C.rounds('day');
is(teen.map(r => r.n).join() === '11,12,13,14,15,16,17,18,19' && teen.every(r => r.steps.length === 1 && r.steps[0].target === r.n), 'teen: make 11–19, one each');
const DAY = [[23, 33, 13], [37, 47, 27], [49, 59, 39, 50], [56, 66, 46], [64, 74, 54], [72, 82, 62, 71], [18, 28, 8], [85, 95, 75], [30, 40, 20, 29]];
is(day.length === 9 && teen.length >= 7, 'day: 9 rounds');
day.forEach((r, i) => {
  const want = DAY[i];
  is(r.n === want[0] && r.steps.map(s => s.target).join() === want.join(), `day #${i + 1}: ${r.steps.map(s => s.kind + ' ' + s.target).join(', ')}`);
  is(r.steps.every(s => s.target >= 1 && s.target <= 99), `day #${i + 1}: never 0, never 100`);
  is(r.steps[1].target === r.n + 10 && r.steps[2].target === r.n - 10, `day #${i + 1}: ten more / ten less of ${r.n}`);
  is((r.steps.length === 4) === [2, 5, 8].includes(i), `day #${i + 1}: a fourth step only in rounds 3, 6, 9`);
});
is(C.level('x') === 'teen', 'unknown level → teen');

/* ---- 1 + 2: gravity and the take-back, 20 000 random walks (teen) ---- */
{ let ok = true, last = true;
  for (let w = 0; w < 20000; w++) {
    const rand = seeded(w), st = C.newState(teen[w % 9]), stack = [];
    for (let k = 0; k < 30; k++) {
      const r = rand();
      if (r < 0.6) { if (C.pour(st)) stack.push(stack.length); }
      else { const fromTop = rand() < 0.5, before = st.poured, res = C.takeBack(st, fromTop); if (res && !res.refused) { stack.pop(); if (st.poured !== before - 1) last = false; } if (res && res.refused && !(fromTop && C.bottom(st) > 0)) last = false; }
      if (C.top(st) < 10 && C.bottom(st) > 0) ok = false;
      if (st.poured !== stack.length || st.poured > 20 || st.poured < 0) ok = false;
    }
  }
  is(ok, 'the bottom tray is empty whenever the top has fewer than 10 (20 000 walks)');
  is(last, 'a take-back always removes the last counter poured; a top counter stays while the bottom has any');
}
{ const st = C.newState(teen[0]);
  for (let i = 1; i <= 10; i++) { const r = C.pour(st); is(C.top(st) === i && C.bottom(st) === 0 && !!r.filledTop === (i === 10), `teen: counter ${i} goes into the top tray`); }
  const r11 = C.pour(st); is(r11.overflow && C.top(st) === 10 && C.bottom(st) === 1, 'teen: the 11th overflows into the bottom tray');
  for (let i = 12; i <= 20; i++) C.pour(st);
  is(C.pour(st) === null && st.poured === 20, 'teen: the two trays hold 20');
  is(C.takeBack(st, true).refused === 'full' && st.poured === 20, 'teen: a top counter cannot leave while the bottom has counters'); }

/* ---- the day level: seal at 10, the stack delivers sealed tens, break a ten ---- */
{ const st = C.newState(day[0]);
  for (let i = 1; i <= 9; i++) C.pour(st);
  is(st.open === 9 && st.sealed === 0, 'day: nine counters stay in the open tray');
  const r = C.pour(st); is(r.sealed && st.open === 0 && st.sealed === 1, 'day: the 10th counter seals the tray (never at 9)');
  const before = st.open; is(C.addTen(st) && st.sealed === 2 && st.open === before, 'day: the tray stack adds a sealed ten, not loose counters');
  is(C.takeBack(st, false).broke && st.sealed === 1 && st.open === 9 && C.total(st) === 19, 'day: a take-back from an empty open tray breaks a ten (20 → 19)');
  const s2 = C.newState(day[0]); for (let i = 0; i < 9; i++) C.addTen(s2); for (let i = 0; i < 9; i++) C.pour(s2);
  is(C.total(s2) === 99 && C.pour(s2) === null && !C.addTen(s2), 'day: never past 99');
  const s3 = C.newState(day[0]); is(C.takeBack(s3, false) === null && !C.unseal(s3), 'day: nothing to take from nothing — never below 0'); }

/* ---- 5–8: every round played through by the gate's own plan ---- */
const plan = (st, target) => {
  /* stack whole tens, then pour or take ones — the way a child is meant to */
  let guard = 0;
  while (C.total(st) !== target && guard++ < 200) {
    const tot = C.total(st), d = target - tot;
    if (st.level === 'day' && d >= 10 && C.addTen(st)) continue;
    if (st.level === 'day' && d <= -10 && C.unseal(st)) continue;
    if (d > 0) C.pour(st); else C.takeBack(st, false);
  }
  return C.total(st) === target;
};
for (const r of teen.concat(day)) {
  const st = C.newState(r);
  is(!C.readoutVisible(st) && C.card(st).n == null, `${r.id}: no readout and an empty day card during the task`);
  /* Check with nothing poured: no miss */
  const e = C.check(st); is(e.result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintPour', `${r.id}: Check with nothing poured is not a miss`);
  r.steps.forEach((s, k) => {
    /* the step starts from the number of the day (except ten more, which builds on it) */
    if (k > 0) is(C.total(st) === (s.kind === 'more' ? r.n : r.n), `${r.id} step ${k + 1}: starts from ${r.n}`);
    /* one too few, one too many → misses with the dotted shape; then the plan */
    if (s.target > 1) { plan(st, s.target - 1); const m = C.check(st); is(m.result === 'few' && m.miss && st.help === 1 && C.hint(st).wrong, `${r.id} step ${k + 1}: one too few is a miss`); }
    plan(st, s.target + (s.target < 99 ? 1 : -2));
    const m2 = C.check(st);
    is(m2.result !== 'ok' && st.help >= 1, `${r.id} step ${k + 1}: a wrong total is never accepted (±1)`);
    const sh = C.shape(st);
    is(st.level === 'teen' ? sh.top === Math.min(s.target, 10) && sh.bottom === Math.max(0, s.target - 10) : sh.sealed === Math.floor(s.target / 10) && sh.open === s.target % 10, `${r.id} step ${k + 1}: the dotted shape is the target's`);
    const h = C.hint(st);
    if (st.help >= 2 && h && h.key !== 'hintBreak') is(!/(^|\D)0(\D|$)/.test(JSON.stringify([h.key === 'hintShape' || h.key === 'hintShapeTen' || h.key === 'hintShapeDay' ? h.ones : 1, h.key === 'hintShapeDay' || h.key === 'hintShapeDayNone' ? h.tens : 1])) && (h.key !== 'hintShapeSmall' || Math.floor(s.target / 10) === 0), `${r.id} step ${k + 1}: the miss-2 sentence never prints a 0 (${h.key})`);
    /* a move takes the help away */
    if (C.pour(st) === null) C.takeBack(st, false); is(st.help === 0 && C.hint(st) === null, `${r.id} step ${k + 1}: a move takes the help away`);
    is(plan(st, s.target), `${r.id} step ${k + 1}: the plan reaches ${s.target}`);
    const ok = C.check(st);
    is(ok.result === 'ok' && ok.target === s.target && ok.tens === Math.floor(s.target / 10) && ok.ones === s.target % 10, `${r.id} step ${k + 1}: ${s.target} accepted`);
    const sc = C.success(st);
    is(sc && sc.args.n === s.target && !(/One|Ten|Tens|Teen|More|Less/.test(sc.key) && /None$/.test(sc.key) === false && sc.args.ones === 0 && /ones/.test(sc.key)), `${r.id} step ${k + 1}: the sentence (${sc && sc.key}) speaks of ${s.target}`);
    if (sc.key === 'okTens' || sc.key === 'okMore' || sc.key === 'okTeen') is(sc.args.ones > 0, `${r.id} step ${k + 1}: "${sc.key}" only where there are ones`);
    if (s.kind === 'build') { const c = C.card(st, n => WORDS.en[n]); is(c.n === s.target && c.tens === Math.floor(s.target / 10) && c.ones === s.target % 10 && c.word === NW.numberWord(s.target, 'en') && (c.tally != null) === (s.target <= 20), `${r.id}: the day card holds ${s.target} (tally only up to 20)`); }
    if (s.kind === 'more') is(C.card(st).more === s.target, `${r.id}: the ten-more face holds ${s.target}`);
    if (s.kind === 'less') is(C.card(st).less === s.target, `${r.id}: the ten-less face holds ${s.target}`);
    if (s.kind === 'oneLess' && r.n === 30) is(sc.key === 'okOneLessBroke', '30 − 1: "You opened a ten"');
    if (s.kind === 'oneMore') is(sc.key === 'okOneMoreTen', '49 + 1: "Ten ones made a new ten!"');
    if (s.kind === 'more' && r.n === 30) is(sc.key === 'okMoreNone', '30 + 10: the open tray stayed empty — never "stayed 0"');
  });
  is(st.done && C.check(st) === null && C.pour(st) === null, `${r.id}: done after its last step`);
  if (r.level === 'teen') { const sp = C.split(r.n); is(sp.tens === '1' && sp.ones === String(r.n - 10), `${r.id}: the split puts 1 on the full tray, ${r.n - 10} on the bottom`); }
}
/* "ten less" is taken from the ORIGINAL number, not from the ten-more state */
{ const r = day[1], st = C.newState(r); plan(st, 37); C.check(st); plan(st, 47); C.check(st);
  is(C.total(st) === 37 && C.step(st).kind === 'less', 'after ten more, the build snaps back to 37 for ten less'); }
/* un-seal only with the open tray empty or as the ten-less step; never in build */
{ const st = C.newState(day[1]); C.addTen(st); C.pour(st);
  is(!C.unseal(st) && st.sealed === 1, 'build: a sealed ten stays while the open tray has counters');
  C.takeBack(st, false); is(C.unseal(st) && st.sealed === 0, 'build: with the open tray empty a ten can be taken back'); }
/* the break-a-ten hint appears where it helps */
{ const r = day[8], st = C.newState(r); plan(st, 30); C.check(st); plan(st, 40); C.check(st); plan(st, 20); C.check(st);
  is(C.step(st).kind === 'oneLess' && C.total(st) === 30, '30: the last step starts from 30');
  C.pour(st); C.takeBack(st, false); C.check(st); is(C.hint(st).key === 'hintBreak', '30 − 1 missed with the open tray empty: "tap it to open a ten"'); }

/* ---- the number words: byte-equal to the worksheets' tables ---- */
LOCALES.forEach(l => { let ok = true; for (let n = 1; n <= 99; n++) if (WORDS[l][n] !== NW.numberWord(n, l)) ok = false; is(ok, `words ${l}: 1–99 equal lib/number-words.js`); is(WORDS[l][0] === '', `words ${l}: no 0`); });

/* ---- the order ---- */
for (const [name, P] of [['teen', teen], ['day', day]]) {
  let prev = null; const seen = new Set();
  for (let s = 0; s < 300; s++) {
    const o = C.order(P, seeded(600 + s), prev);
    is(o.length === P.length && new Set(o).size === P.length, `${name}: order is a permutation`);
    if (prev) { is(o.join() !== prev.join(), `${name}: never the same order twice`); is(o[0] !== prev[prev.length - 1], `${name}: never the same seam`); }
    seen.add(o.join()); prev = o;
  }
  is(seen.size > 50, `${name}: orders vary`);
  for (let s = 0; s < 20; s++) { const o1 = C.order(P, seeded(900 + s), null), o2 = C.order(P, seeded(900 + s), o1); is(o2.join() !== o1.join(), `${name}: the same source cannot repeat the last pass`); }
}

/* ---- free play: the readout is on, nothing judged ---- */
{ const st = C.newPlay(); for (let i = 0; i < 4; i++) C.addTen(st); for (let i = 0; i < 7; i++) C.pour(st);
  is(C.readoutVisible(st) && C.card(st).n === 47 && C.card(st).more === 57 && C.card(st).less === 37 && C.check(st) === null, 'Just pour: the day card follows the build, nothing judged');
  is(C.unseal(st) && C.total(st) === 37, 'Just pour: any ten can be taken back'); }
{ const st = C.newPlay(); is(C.card(st).n == null, 'Just pour on an empty table: the day card is blank, never a counted 0');
  C.pour(st); C.takeBack(st, false); is(C.total(st) === 0 && C.card(st).n == null, 'Just pour emptied again: the day card is blank again'); }

/* ---- layout ---- */
for (const W of [272, 288, 300, 312, 336, 380, 599, 600, 648, 656, 900]) {
  const L = C.layout(W);
  is(L.tray + (L.mode === 'wide' ? 90 + L.side + 16 : 0) <= W, `layout ${W}: the trays fit (${L.tray})`);
  is(L.cell >= 44 && L.cell <= 56 && L.counter >= 36, `layout ${W}: cells ${L.cell} px (taps ≥ 44)`);
}
is(C.POUR_MS >= 250, 'the spout pours at most 4 per second (always stoppable)');

/* ---- strings ×11 ---- */
if (ACT) {
  const S = ACT.strings, keys = Object.keys(S);
  keys.forEach(k => LOCALES.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length, `string ${k}.${l}`)));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  keys.forEach(k => LOCALES.forEach(l => is(ph(S[k][l]) === ph(S[k].en), `${k}.${l} placeholders`)));
  const ban = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\w*)\b/i;
  keys.forEach(k => LOCALES.forEach(l => is(!ban.test(S[k][l]), `${k}.${l}: no "free"`)));
  keys.forEach(k => is(!/ [?!:;]/.test(S[k].fr) && !/ /.test(S[k].fr), `${k}.fr: U+202F before ? ! : ;`));
  keys.forEach(k => LOCALES.forEach(l => is(!/(?<![\d])0(?![\d])/.test(S[k][l].replace(/\{\w+\}/g, '')), `${k}.${l}: no lone 0`)));
  const need = new Set(['promptMake', 'promptDay', 'hintPour', 'hintFew', 'hintMany', 'hintFull', 'hintBreak', 'hintSealed', 'celebrateDay', 'okTeen']);
  ['hintShape', 'hintShapeTen', 'hintShapeDay', 'hintShapeDayNone', 'hintShapeSmall', 'okTens', 'okTensNone', 'okMore', 'okMoreNone', 'okLess', 'okOneMore', 'okOneMoreTen', 'okOneLess', 'okOneLessBroke', 'stepMore', 'stepLess', 'stepOneMore', 'stepOneLess'].forEach(k => need.add(k));
  need.forEach(k => is(keys.includes(k), `string ${k} exists`));
  is(ACT.defaults.level === 'teen' && ACT.defaults.help === 'miss', 'defaults: teen numbers, help after a miss');
}

console.log(`verify-overflow-trays-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

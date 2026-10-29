#!/usr/bin/env node
/* =====================================================================
   verify-minute-train-core.js — the gate for ACTIVITY #161, The Minute
   Train ("Sprocket's Clock — Read the Clock to Five Minutes", 2.MD.C.7).
   The gate keeps its OWN oracle: the design's round tables (§6), its own
   hand angles (hour 30h + m/2, minute 6m), its own carriage arithmetic
   (one carriage = 30° = five minutes) and its own grading — never read off
   the tool.
   A the rounds · B the train · C every answer the child can write × every
   round, graded by the own oracle · D the boxes · E free play · F the
   success lines ×11 · G the plan · H strings ×11 and reachability · I
   drawing rules · J the manifest row.
   MT_CORE / MT_ACT / MT_MANIFEST let mutate-minute-train.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.MT_CORE || path.join(ROOT, 'mini tools', 'minute-train-core.js');
const ACT_PATH = process.env.MT_ACT || path.join(ROOT, 'mini tools', 'minute-train-activity.js');
const MAN_PATH = process.env.MT_MANIFEST || path.join(ROOT, 'mini tools', 'clock-digital-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  1: ['3:15', '9:45', '6:30', '12:15', '4:45', '8:00', '11:30', '2:45', '7:15'],
  2: ['3:20', '7:05', '10:40', '2:25', '5:50', '8:10', '12:35', '4:55', '9:05']
};
const hm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const HA = (h, m) => ((h % 12) * 30 + m / 2) % 360, MA = (m) => m * 6;
const CARS = (m) => m / 5;
/* the own grading: the hour is the number the short hand has PASSED, the minutes how far the long hand has gone */
const GRADE = (r, h, m) => {
  if (h === r.h && m === r.m) return 'ok';
  if (h === (r.m / 5 || 12) && h !== r.h && m === (r.h % 12) * 5) return 'swap';
  if (m !== r.m) return 'minutes';
  if (h === r.h % 12 + 1 && r.m > 0) return 'nextHour';
  return 'hour';
};
const HINT = { minutes: 'hintMinutes', nextHour: 'hintNext', hour: 'hintHour', swap: 'hintHour' };
/* on the hour the short hand is ON its number: its hour hint asks which number it is on */
const HINT_OF = (r, kind) => (r.m === 0 && (kind === 'hour' || kind === 'swap') ? 'hintHourOn' : HINT[kind]);

/* ---------- A. the rounds ---------- */
for (const lv of ['1', '2']) {
  const R = C.rounds(lv), tag = 'A: L' + lv;
  ok(R.length === 9 && R.length >= 7 && C.passSize(lv) === 9, tag + ' has 9 rounds (≥ 7)');
  R.forEach((r, i) => {
    const o = hm(OWN[lv][i]);
    ok(r.h === o.h && r.m === o.m, tag + ' #' + (i + 1) + ' is ' + OWN[lv][i] + ' (design table)');
    ok(C.hourAngle(r.h, r.m) === HA(r.h, r.m) && C.minuteAngle(r.m) === MA(r.m), tag + ' #' + (i + 1) + ' hand angles');
    ok(C.maxCars(r) === CARS(r.m) && 30 * C.maxCars(r) === MA(r.m), tag + ' #' + (i + 1) + ' the train\'s nose lies under the long hand');
    ok(lv === '1' ? r.m % 15 === 0 : r.m % 5 === 0, tag + ' #' + (i + 1) + (lv === '1' ? ' a quarter hour' : ' a five-minute time'));
  });
  const half = R.filter((r) => r.m >= 30).length;
  ok(half === (lv === '1' ? 5 : 4), tag + ' rounds where the short hand is at or past halfway: ' + half + ' (5 in L1, 4 in L2 — "the nearest number" cannot win)');
}
ok(C.rounds('1').map((r) => CARS(r.m)).join() === '3,9,6,3,9,0,6,9,3', 'A: L1 train lengths 3,9,6,3,9,0,6,9,3');
{ const n = C.rounds('2').map((r) => r.m / 5); ok(new Set(n).size === 8 && n.filter((x) => x === 1).length === 2, 'A: L2 long-hand numbers all differ but the 1 (7:05, 9:05)'); }

/* ---------- B. the train ---------- */
for (const lv of ['1', '2']) C.rounds(lv).forEach((r, k) => {
  const st = C.newState(lv, k), max = CARS(r.m);
  for (let i = 0; i < max; i++) ok(C.addCar(st) === 'ok' && st.cars === i + 1, 'B: L' + lv + ' ' + OWN[lv][k] + ' carriage ' + (i + 1) + ' couples');
  ok(C.addCar(st) === 'bump' && st.cars === max, 'B: L' + lv + ' ' + OWN[lv][k] + ' the next carriage bumps the barrier (the train never passes the long hand)');
  ok(st.verdict === null && !st.done && st.free === null, 'B: sending carriages never moves the clock during a round');
  while (st.cars) ok(C.removeCar(st), 'B: − sends a carriage back');
  ok(!C.removeCar(st), 'B: nothing to send back from an empty track');
});
{ const k = C.rounds('1').findIndex((r) => r.m === 0), st = C.newState('1', k); ok(C.addCar(st) === 'bump' && st.cars === 0, 'B: on the hour the very first carriage bumps'); }

/* ---------- C. every answer × every round ---------- */
let graded = 0;
for (const lv of ['1', '2']) C.rounds(lv).forEach((r, k) => {
  for (let h = 0; h <= 13; h++) for (let m = 0; m <= 59; m++) {
    const st = C.newState(lv, k); st.h = String(h); st.m = (m < 10 ? '0' : '') + m;
    const res = C.check(st), own = GRADE(r, h, m); graded++;
    if (own === 'ok') { ok(res.result === 'ok' && st.done && st.cars === CARS(r.m), 'C: ' + OWN[lv][k] + ' ' + h + ':' + m + ' right'); continue; }
    if (res.result !== 'miss' || res.kind !== own || C.hint(st) !== HINT_OF(r, own)) ok(false, 'C: L' + lv + ' ' + OWN[lv][k] + ' written ' + h + ':' + m + ' → ' + own + ' (got ' + res.result + '/' + res.kind + '/' + C.hint(st) + ')');
    else pass++;
  }
});
ok(graded === 2 * 9 * 14 * 60, 'C: graded ' + graded + ' answers');
{ const st = C.newState('1', 0); ok(C.check(st).key === 'hintBlank' && st.misses === 0, 'C: empty boxes → hintBlank, no miss'); st.h = '3'; ok(C.check(st).key === 'hintBlank' && st.misses === 0, 'C: an empty minute box → hintBlank'); }
{ const st = C.newState('2', 7); st.h = '5'; st.m = '55'; C.check(st); ok(st.misses === 1 && !st.help, 'C: one miss'); const again = C.check(st); ok(again.result === 'note' && again.key === 'hintChange' && st.misses === 1, 'C: Check again with nothing changed → "change your answer first", no second miss'); C.back(st); C.typeDigit(st, '5'); C.check(st); ok(st.misses === 2 && st.help && C.hint(st) === 'hintHelp', 'C: a second miss turns the help on'); }
/* "04" is a part-carriage, not a carriage */
{ const t = C.childTrain(4); ok(t.whole === 0 && Math.abs(t.part - 0.8) < 1e-9, 'C: 04 minutes is four fifths of one carriage'); const t2 = C.childTrain(35); ok(t2.whole === 7 && t2.part === 0, 'C: 35 minutes is seven whole carriages'); }

/* ---------- D. the boxes ---------- */
{
  const st = C.newState('2', 0);
  ok(st.h === '' && st.m === '' && st.focus === 'h', 'D: both boxes start EMPTY, the hour box focused');
  C.typeDigit(st, '3'); ok(st.h === '3' && st.focus === 'm', 'D: an hour that cannot grow (3) moves on to the minutes');
  C.typeDigit(st, '2'); C.typeDigit(st, '0'); ok(st.m === '20', 'D: two minute digits');
  C.typeDigit(st, '5'); ok(st.m === '5', 'D: a third digit replaces');
  const s2 = C.newState('2', 0); C.typeDigit(s2, '1'); ok(s2.focus === 'h', 'D: "1" may grow to 10, 11, 12 — the hour box stays');
  C.typeDigit(s2, '2'); ok(s2.h === '12' && s2.focus === 'm', 'D: 12 moves on');
  ok(C.back(s2) === false || s2.focus === 'h', 'D: ⌫ on an empty minute box goes back to the hour');
  const s3 = C.newState('1', 0); s3.h = '3'; s3.m = '15'; C.check(s3); ok(!C.typeDigit(s3, '1') && !C.addCar(s3) === false, 'D: a solved card takes no more digits');
}

/* ---------- E. free play: only once solved ---------- */
{
  const k = C.rounds('2').findIndex((r) => r.h === 4 && r.m === 55), st = C.newState('2', k); st.h = '4'; st.m = '55'; C.check(st);
  ok(st.done, 'E: solved');
  ok(C.addCar(st) === 'ring', 'E: from 4:55 one carriage closes the ring');
  const f = C.freeClock(st); ok(f.h === 5 && f.m === 0 && f.cars === 0, 'E: … and the short hand steps on to 5 (5:00, the train empties)');
  ok(C.addCar(st) === 'push' && C.freeClock(st).m === 5 && C.freeClock(st).cars === 1, 'E: the next carriage pushes the clock to 5:05');
  ok(C.removeCar(st) && C.removeCar(st) && C.freeClock(st).h === 4 && C.freeClock(st).m === 55 && !C.removeCar(st), 'E: − pulls the clock back, never before the read time');
  const s2 = C.newState('1', C.rounds('1').findIndex((r) => r.h === 12)); s2.h = '12'; s2.m = '15'; C.check(s2);
  for (let i = 0; i < 9; i++) C.addCar(s2); ok(C.freeClock(s2).h === 1 && C.freeClock(s2).m === 0, 'E: 12:15 pushed on nine carriages is 1:00 (the hour wraps after 12)');
}

/* ---------- F. the success lines ×11 ---------- */
const sandbox = {}; new Function('window', 'document', 'MinuteTrainCore', SRC.replace(/injectMinuteTrainCSS\(\);/, '') + ';window.X=MinuteTrainActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
const fill = (s, a) => s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m));
for (const lv of ['1', '2']) C.rounds(lv).forEach((r) => {
  const own = lv === '2' ? 'okFive' : r.m === 0 ? 'okOclock' : r.m === 15 ? 'okPast' : r.m === 30 ? 'okHalf' : 'okTo';
  const cnt = []; for (let x = 5; x <= r.m; x += 5) cnt.push(x);
  LOCALES.forEach((l) => {
    const a = C.okArgs(r, l), txt = fill(STR[C.okKey(r)][l], a);
    ok(C.okKey(r) === own && a.h === r.h && a.h1 === r.h % 12 + 1 && a.n === (r.m / 5 || 12) && a.count === cnt.join(', '), 'F: ' + l + ' ' + C.fmt('en', r.h, r.m) + ' → ' + own + ' with the right numbers');
    ok(txt.indexOf(C.fmt(l, r.h, r.m)) === 0 && !/\{\w+\}/.test(txt), 'F: ' + l + ' the success line leads with the digits and fills every placeholder');
  });
});
/* the idiom's hour: "quarter to" names the NEXT hour everywhere; "half" names the next hour only where the language does */
const HALF_NEXT = ['de', 'nl', 'sv', 'da', 'no', 'fi'];
LOCALES.forEach((l) => {
  const idiom = (k) => STR[k][l].split(':')[0].split(' : ')[0];
  ok(/\{h1\}/.test(idiom('okTo')) && !/\{h\}/.test(idiom('okTo')), 'F: ' + l + ' "quarter to" names the next hour');
  ok(HALF_NEXT.includes(l) ? /\{h1\}/.test(idiom('okHalf')) && !/\{h\}/.test(idiom('okHalf')) : /\{h\}/.test(idiom('okHalf')) && !/\{h1\}/.test(idiom('okHalf')), 'F: ' + l + ' the half-hour idiom names the ' + (HALF_NEXT.includes(l) ? 'NEXT' : 'current') + ' hour');
  ok(/\{h\}/.test(idiom('okPast')) && !/\{h1\}/.test(idiom('okPast')), 'F: ' + l + ' "quarter past" names the current hour');
  ['okTo', 'okHalf', 'okFive', 'okPast'].forEach((k) => ok(/\{h\}/.test(STR[k][l].slice(STR[k][l].indexOf(':') + 1)), 'F: ' + l + ' ' + k + ' says which number the short hand has passed'));
});

/* the printed card time: the own expectation per locale (no a.m./p.m.; fr « h ») */
{ const E = { en: '3:20', de: '3:20', es: '3:20', pt: '3:20', it: '3:20', nl: '3.20', sv: '3.20', da: '3.20', no: '3.20', fi: '3.20', fr: '3 h 20' };
  LOCALES.forEach((l) => { ok(C.fmt(l, 3, 20) === E[l], 'F: ' + l + ' prints 3:20 as "' + E[l] + '"'); ok(/05$/.test(C.fmt(l, 7, 5)), 'F: ' + l + ' keeps two minute digits'); }); }

/* ---------- G. the plan ---------- */
for (const lv of ['1', '2']) {
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0; const seen = new Set();
  for (let p = 0; p < 300; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === '0,1,2,3,4,5,6,7,8', 'G: L' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; seen.add(o.join()); prev = o; }
  ok(same === 0 && seen.size > 100, 'G: L' + lv + ' never repeats the previous order, really shuffles (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: L' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
ok(keys.length >= 30, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
const asked = new Set([...body.matchAll(/(?:_t)\('(\w+)'/g)].map((m) => m[1]).concat([...body.matchAll(/return '(hint\w+)'/g)].map((m) => m[1])).concat([...body.matchAll(/'(ok[A-Z]\w+)'/g)].map((m) => m[1])));
asked.forEach((k) => ok(keys.includes(k), 'H: the code asks for "' + k + '", which is authored'));
['hintBlank', 'hintBump', 'hintMinutes', 'hintNext', 'hintHour', 'hintHourOn', 'hintChange', 'hintHelp', 'taskLine'].forEach((k) => LOCALES.forEach((l) => ok(!/\{/.test(STR[k][l]) && !/\d{1,2}[:.]\d\d|\d\s?h\s?\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' names no time')));
const HALF = { de: /(?<!\p{L})halb(?!\p{L})/iu, nl: /(?<!\p{L})half(?!\p{L})/iu, sv: /(?<!\p{L})halv(?!\p{L})/iu, da: /(?<!\p{L})halv(?!\p{L})/iu, no: /(?<!\p{L})halv(?!\p{L})/iu, fi: /(?<!\p{L})puoli(?!\p{L})/iu };
Object.keys(HALF).forEach((l) => keys.filter((k) => /^hint/.test(k)).forEach((k) => ok(!HALF[l].test(STR[k][l]), 'H: ' + l + ' ' + k + ' avoids the half-to-the-next-hour idiom')));
ok(HALF.de.test('halb 7') && !HALF.de.test('halbe Stunden') && HALF.fi.test('puoli 7') && !HALF.fi.test('puolivälissä'), 'H: the half-idiom ban fires on "halb 7" / "puoli 7" and not on correct text');
/* the hour rule must hold on the hour too: at 8:00 the short hand is ON the 8 (reviewer 2026-10-29) */
ok(/is on or has passed/.test(STR.instruction.en) && /Which number is it on\?/.test(STR.hintHourOn.en), 'H: en says the hour is the number the short hand is ON or has passed');
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ;');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');
LOCALES.forEach((l) => ok(!/\{time\}/.test(STR.aClockOn[l] + STR.aClockBetween[l]), 'H: ' + l + ' before success the clock is read by its hands, never its time'));

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(/var C = MinuteTrainCore, a0 = 30 \* \(k - 1\) \+ 1\.6, a1 = 30 \* \(k - 1\) \+ 30 \* \(frac \|\| 1\) - 1\.6/.test(ACT_BODY), 'I: carriage k spans exactly [30(k−1)°, 30k°] (a part-carriage a fraction of one)');
ok(/train \+= this\._car\(k3, [^;]*roofOn \? 5 \* k3 : null\);/.test(ACT_BODY), 'I: a carriage\'s roof says 5k, and nothing when roof numbers are hidden');
ok(/k2 === mx \? '\?' : roofOn \? 5 \* k2 : null/.test(ACT_BODY), 'I: miss 2 builds the right train with "?" on its last roof');
ok(/if \(vk === 'nextHour'\) for \(var k4 = C\.maxCars\(r\) \+ 1; k4 <= 12; k4\+\+\)/.test(ACT_BODY), 'I: the next-hour miss finishes the lap from the long hand to the 12');
ok(/if \(res\.kind === 'nextHour' && !st\.help\) \{/.test(ACT_BODY) && /if \(v\.step\) o \+= hand\(C\.hourAngle\(r\.h % 12 \+ 1, 0\)/.test(ACT_BODY), 'I: the short hand steps on only after the lap is shown');
ok(/var clock = st\.done \? C\.freeClock\(st\) : \{ h: r\.h, m: r\.m, cars: st\.cars \};/.test(ACT_BODY), 'I: during a round the hands are the round\'s own; free play only once solved');
ok(/var outline = vk === 'hour' \|\| vk === 'swap' \|\| help;/.test(ACT_BODY), 'I: a wrong hour (or swapped hands) outlines the short hand');
ok(/sr\.textContent = st\.done \? this\._t\('aClockDone'/.test(ACT_BODY), 'I: the clock says its time aloud only after success');
ok(/\.lcs-activity-check\{display:none !important;\}/.test(ACT_BODY) && /chk\.click\(\); \}, this\.OK_MS\)/.test(ACT_BODY) && /OK_MS: 500/.test(ACT_BODY), 'I: the shell\'s Check is hidden and pressed 0.5 s after success');
ok(!/role="img"/.test(ACT_BODY), 'I: no svg role="img"');
ok(/_roof: function \(\) \{ return this\._setting\('roof'\) !== 'hidden'; \},/.test(ACT_BODY) && /roof: 'shown'/.test(ACT_BODY), 'I: the roof setting is read (shown by default, hidden really hides)');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'clock-digital.read-five-minute.2-md-c-7');
ok(row && row.tool === 'minute-train-activity' && row.task_template === 'minute-train', 'J: the row points at the minute train');
ok(row && row.alignment.code === '2.MD.C.7' && row.alignment.grade === '2', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');
ok(row && !LOCALES.some((l) => /(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(row.page_title[l] + ' ' + row.page_intro[l])), 'J: no "free" in the page metadata');

console.log(`verify-minute-train-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

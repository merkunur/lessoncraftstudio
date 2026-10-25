#!/usr/bin/env node
/* =====================================================================
   verify-set-clock-core.js — build-time gate for ACTIVITY #104, The Echo
   Slice (1.MD.B.3). Its OWN oracle: the round lists, the short-hand
   windows and the sibling row's eight times are typed here literally;
   the true short hand (h + m/60 hours), the echo's slice (round(q − m/60))
   and its end (30·h′ + m/2) are computed here — never read off the core.
   Proves: the lists (≥ 7 distinct, hours over ≥ 8 numerals, none of the
   sibling's times, the default level's long hand at 12 / 6 five times
   each); for EVERY round of every level the true hands are accepted,
   the receipt prints the target with no "?", the echo's end IS the true
   short hand; at half past the short hand ON the hour (edge) or ON the
   next number (hour) is refused; swapped hands are refused (swapped);
   the long hand on the minutes-as-numeral (the 10 for :10) is refused;
   o'clock refuses "between"; the window table; the snaps; the Check /
   hint ladder (a hand in the tray is no miss); the plan; the strings
   (11 locales, the same placeholders, no number in a hint); the time
   words (every H:MM × 11, no digit, the next-hour half in de/nl/da/sv/
   no/fi, the current-hour half elsewhere, es-MX "para", no "på").
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.SC_CORE_DIR || MT, 'set-clock-core.js');
const C = require(CORE);
const SRC = fs.readFileSync(path.join(process.env.SC_ACT_DIR || MT, 'set-clock-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, SetClockCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = SetClockActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const tm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };

/* ---- the lists, typed literally (design §6) ---- */
const LISTS = {
  both: '3:00 7:30 9:00 6:30 12:00 4:30 10:00 1:30 5:00 11:30',
  hour: '3:00 8:00 12:00 6:00 10:00 1:00 5:00 9:00',
  half: '7:30 4:30 11:30 2:30 9:30 12:30 6:30 1:30',
  quarter: '4:15 9:45 10:15 5:45 12:15 8:45 1:15 11:45 2:30 6:00',
  five: '2:10 8:20 5:40 11:50 4:05 6:25 9:35 1:55',
  mixed: '4:00 9:30 2:15 6:45 11:10 3:50 12:30 7:05 8:25 5:35'
};
const SIBLING = '3:15 7:45 6:10 9:20 4:40 1:50 10:05 12:25'.split(' ');
/* the windows, in hours after h (design §6 table) */
const WIN = { 0: [-0.2, 0.2], 5: [-0.05, 0.45], 10: [-0.05, 0.45], 15: [0.10, 0.55], 20: [0.10, 0.55], 25: [0.10, 0.55], 30: [0.30, 0.70], 35: [0.45, 0.90], 40: [0.45, 0.90], 45: [0.45, 0.90], 50: [0.55, 1.05], 55: [0.55, 1.05] };
const steps = (hours) => ((Math.round(hours * 12) % 144) + 144) % 144;   // hours → 2.5° steps
const trueQ = (t) => (t.h % 12) + t.m / 60;
const fresh = (t, short, long) => { const st = C.newState(t); st.short = short; st.long = long; return st; };

for (const lv of Object.keys(LISTS)) {
  const L = LISTS[lv].split(' ');
  ok(JSON.stringify(C.ids(lv)) === JSON.stringify(L), `${lv}: the list is the design's (${C.ids(lv).join(' ')})`);
  ok(new Set(L).size === L.length && L.length >= 7, `${lv}: ≥ 7 distinct times`);
  ok(new Set(L.map(s => tm(s).h)).size >= 8, `${lv}: the hours spread over ≥ 8 numerals`);
  ok(L.every(s => SIBLING.indexOf(s) < 0), `${lv}: none of the 2.MD.C.7 sibling's times`);
}
ok(LISTS.both.split(' ').filter(s => tm(s).m === 0).length === 5 && LISTS.both.split(' ').filter(s => tm(s).m === 30).length === 5, 'default level: the long hand at 12 five times and at 6 five times');
ok(C.levelOf('nope') === 'both' && C.echoOf('nope') === 'after' && C.echoOf('live') === 'live', 'unknown settings fall back to the defaults');
for (const m of Object.keys(WIN)) ok(JSON.stringify(C.DATA.WINDOWS[m]) === JSON.stringify(WIN[m]), `window :${m} is the design's`);

const all = [...new Set(Object.values(LISTS).join(' ').split(' '))];
for (const id of all) {
  const t = tm(id), q = trueQ(t), s = steps(q), w = WIN[t.m];
  ok(t.m / 60 >= w[0] && t.m / 60 <= w[1], `${id}: the true short hand lies inside its own window`);
  const st = fresh(t, s, t.m);
  ok(C.kindOf(st) === 'ok', `${id}: the true hands are accepted`);
  const R = C.receipt(st); ok(R && R.h === t.h && R.m === t.m && !R.unsure, `${id}: the receipt prints ${id} with no "?"`);
  const e = C.echo(s, t.m), hp = Math.round(q - t.m / 60) % 12 || 12;
  ok(e.h === hp && Math.abs((e.start + e.span) - ((30 * (t.h % 12) + t.m / 2))) < 1e-9 && Math.abs(C.shortDeg(s) - (30 * (t.h % 12) + t.m / 2)) < 1e-9, `${id}: the echo sits in the ${hp} slice and its end IS the true short hand`);
  if (t.m === 30) {
    const onH = fresh(t, steps(t.h % 12), 30), onN = fresh(t, steps((t.h % 12) + 1), 30);
    ok(C.kindOf(onH) === 'edge' && C.receipt(onH).h === t.h && C.receipt(onH).unsure, `${id}: the short hand ON the ${t.h} is refused (edge; receipt "${t.h}?:30")`);
    const nx = t.h % 12 + 1; ok(C.kindOf(onN) === 'hour' && C.receipt(onN).h === nx && C.receipt(onN).unsure, `${id}: the short hand ON the ${nx} is refused (hour; receipt "${nx}?:30")`);
  }
  if (t.m === 0) {
    ok(C.kindOf(fresh(t, steps((t.h % 12) + 0.5), 0)) !== 'ok' && C.kindOf(fresh(t, steps((t.h % 12) - 0.5), 0)) !== 'ok', `${id}: o'clock refuses a short hand "between"`);
  }
  const hourPlace = (t.h % 12) * 5;
  if (hourPlace !== t.m) ok(C.kindOf(fresh(t, steps(t.m / 5), hourPlace)) === 'swapped', `${id}: swapped hands are refused (swapped)`);
  if (t.m > 0 && t.m <= 12 && t.m * 5 !== t.m) ok(C.kindOf(fresh(t, s, (t.m * 5) % 60)) === 'minutes', `${id}: the long hand on the ${t.m} (minutes read as a numeral) is refused`);
  ok(C.kindOf(fresh(t, s, (t.m + 5) % 60)) !== 'ok', `${id}: five minutes off is refused`);
  /* the whole window, and only it, is accepted for the right minutes */
  let inside = 0, wrong = 0;
  for (let k = 0; k < 144; k++) { const d = (((k / 12 - (t.h % 12)) % 12) + 12) % 12, dd = d > 6 ? d - 12 : d, want = dd >= w[0] - 1e-9 && dd <= w[1] + 1e-9; const got = C.kindOf(fresh(t, k, t.m)) === 'ok'; if (got) inside++; if (got !== want) wrong++; }
  ok(wrong === 0 && inside > 0, `${id}: exactly the window's steps are accepted (${inside})`);
  for (const m of [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]) if (m !== t.m) ok(C.kindOf(fresh(t, s, m)) !== 'ok', `${id}: the long hand on :${m} is refused`);
}
/* the design's worked example: 3:00 built swapped prints 12:15 */
{ const st = fresh(tm('3:00'), 0, 15), R = C.receipt(st); ok(R.h === 12 && R.m === 15 && C.kindOf(st) === 'swapped', '3:00 built swapped: the receipt reads 12:15'); }
{ const st = fresh(tm('7:10'), steps(7 + 10 / 60), 50), R = C.receipt(st); ok(R.m === 50, '7:10 with the long hand on the 10: the receipt prints :50'); }

/* snaps */
ok(C.shortStep(2.5) === 1 && C.shortStep(361) === 0 && C.shortStep(-2.5) === 143 && C.longMinute(6) === 1 && C.longMinute(357) === 0, 'the short hand settles on 2.5° steps, the long hand drags by the minute');
ok(C.settleLong(7) === 5 && C.settleLong(8) === 10 && C.settleLong(58) === 0, 'the long hand settles on fives');
{ const st = C.newState(tm('7:30')); ok(C.point(st, 90, true) === 'no', 'no hand chosen: pointing does nothing');
  C.place(st, 'long'); ok(st.long === 0 && st.sel === 'long', 'a hand put on the clock points at the 12, chosen');
  C.point(st, 93, false); ok(st.long === 16, 'a drag follows the finger by the minute'); C.point(st, 93, true); ok(st.long === 15, 'let go: the long hand settles on the five');
  C.place(st, 'short'); C.point(st, 225, true); ok(st.short === 90, 'the short hand points at 225° = step 90');
  ok(C.swapSel(st) === 'selected' && st.sel === 'long', 'the hub swaps the chosen hand');
  C.nudge(st, 'short', 1, false); ok(st.short === 91, 'an arrow key: one 2.5° step'); C.nudge(st, 'short', 1, true); ok(st.short === 103, 'Shift: one numeral');
  C.nudge(st, 'long', -1, false); ok(st.long === 10, 'an arrow key on the long hand: five minutes'); }
/* the Check / hint ladder */
{ const st = C.newState(tm('7:30')); C.place(st, 'short');
  ok(C.check(st).result === 'tray' && st.misses === 0 && C.hint(st).key === 'hintTray', 'a hand in the tray: hintTray, no miss');
  C.place(st, 'long'); st.long = 30; st.short = steps(7);
  let a = C.check(st); ok(a.result === 'miss' && a.kind === 'edge' && C.hint(st).key === 'hintEdge', 'miss 1 on the 7: hintEdge');
  st.short = steps(8); a = C.check(st); ok(a.kind === 'hour' && st.misses === 2 && C.hint(st).key === 'hintScale', 'miss 2: hintScale');
  st.short = steps(7.5); ok(C.check(st).result === 'ok' && st.done && C.check(st).result === 'done', 'the right hands, then locked'); }
{ const st = fresh(tm('4:15'), steps(4.25), 25); C.check(st); ok(C.hint(st).key === 'hintMinutes', 'minutes wrong: hintMinutes'); }
{ const st = fresh(tm('4:15'), steps(3), 20); st.long = 20; st.short = steps(3); const st2 = fresh(tm('9:00'), steps(0), 45); C.check(st2); ok(C.hint(st2).key === 'hintSwap', 'swapped: hintSwap'); }
/* the plan */
for (const lv of Object.keys(LISTS)) {
  let prev = null, rep = 0; let s = 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 40; i++) { const o = C.plan(lv, rnd, prev).order; ok(o.slice().sort().join() === C.ids(lv).slice().sort().join(), `${lv}: a pass is a permutation`); if (prev && o.join() === prev.join()) rep++; prev = o; }
  ok(rep === 0, `${lv}: never the same order twice in a row`);
  { const k = () => 0.3, o1 = C.plan(lv, k, null).order, o2 = C.plan(lv, k, o1).order; ok(o2.join() !== o1.join() && o2.slice().sort().join() === o1.slice().sort().join(), `${lv}: even a generator that always shuffles alike never repeats the previous pass`); }
}
ok(C.band(559).wide === false && C.band(560).wide === true && C.band(299).tiny && !C.band(300).tiny, 'the width bands');

/* strings */
const S = A.strings, keys = Object.keys(S);
ok(keys.length >= 29, 'the string table is complete');
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  /* ONE cited exemption (review 2026-10-25, nl "tel in sprongen van vijf vanaf de 12"): hintMinutes may name the 12, where counting
     starts — never the answer; exactly one "12" is removed before the ban, any other digit still fails */
  const bare = (k2, s2) => k2 === 'hintMinutes' ? s2.replace(/(?<!\d)12(?!\d)/, '') : s2;
  if (/^hint/.test(k)) ok(LOCS.every(l => !/[{\d]/.test(bare(k, S[k][l]))), `${k}: a hint names no number`);
}
ok(LOCS.every(l => /\{w\}/.test(S.tShow[l]) && /\{d\}/.test(S.tShow[l]) && /\{W\}/.test(S.ok[l])), 'the prompt carries the words AND the digital time; the success line the words');
/* the time words: every H:MM of every level × 11 */
const NEXT = { de: ['halb acht', 'acht'], nl: ['half acht'], da: ['halv otte'], sv: ['halv åtta'], no: ['halv åtte'], fi: ['puoli kahdeksan'] };
for (const l of LOCS) {
  const T = A.TIMES[l]; ok(!!T && typeof T.sep === 'string', `${l}: a time table`);
  for (const id of all) ok(T && typeof T.w[id] === 'string' && T.w[id].length >= 2 && !/\d/.test(T.w[id]), `${l} ${id}: worded, no digit`);
  ok(new Set(all.map(id => T.w[id])).size === all.length, `${l}: no two times share their words`);
}
for (const l of Object.keys(NEXT)) ok(A.TIMES[l].w['7:30'].indexOf(NEXT[l][0]) >= 0, `${l}: 7:30 names the NEXT hour (${A.TIMES[l].w['7:30']})`);
ok(/siete/.test(A.TIMES.es.w['7:30']) && /sept/.test(A.TIMES.fr.w['7:30']) && /sette/.test(A.TIMES.it.w['7:30']) && /sete/.test(A.TIMES.pt.w['7:30']) && /seven/.test(A.TIMES.en.w['7:30']), 'es/fr/it/pt/en: 7:30 names the CURRENT hour');
ok(/para/.test(A.TIMES.es.w['9:45']) && !/menos/.test(A.TIMES.es.w['9:45']), 'es-MX: quarter to = "cuarto para"');
ok(/på/.test(A.TIMES.no.w['9:45']) && / i /.test(' ' + A.TIMES.sv.w['9:45'] + ' ') && / i /.test(' ' + A.TIMES.da.w['9:45'] + ' '), 'no "kvart på", sv/da "kvart i"');
ok(A.TIMES.fr.sep.trim() === 'h' && ['nl', 'sv', 'da', 'no', 'fi'].every(l => A.TIMES[l].sep === '.') && ['en', 'de', 'es', 'it', 'pt'].every(l => A.TIMES[l].sep === ':'), 'the digital separators per locale');
ok(A.TIMES.es.p && A.TIMES.es.p['9:45'] === 'un cuarto para las diez' && A.TIMES.es.w['9:45'] === 'cuarto para las diez' && Object.keys(A.TIMES.es.p).every(id => /^un cuarto para/.test(A.TIMES.es.p[id])), 'es-MX: the prompt says "en un cuarto para", the success line "¡Cuarto para …!" (review)');
ok(all.filter(id => tm(id).m === 0).every(id => /^klokken /.test(A.TIMES.da.w[id])), 'da: whole hours as "klokken tre" (review)');
ok(['midi'].every(x => A.TIMES.fr.w['12:00'] === x) && A.TIMES.it.w['12:00'] === 'mezzogiorno' && A.TIMES.pt.w['12:00'] === 'meio-dia', 'noon in fr / it / pt');
/* the activity never prints a live reading while setting in "after" mode: the receipt is drawn only for a showing, a success or free play */
ok(/\(v\.showing \|\| st\.done\) \? C\.receipt\(st\) : null/.test(SRC), 'the receipt prints only after Check');

console.log(`verify-set-clock-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

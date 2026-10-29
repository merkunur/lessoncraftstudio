#!/usr/bin/env node
/* =====================================================================
   verify-run-on-core.js — the gate for ACTIVITY #163, The Run-On Test
   ("Tell Time to the Nearest 5 Minutes — Set the Clock", 2.MD.C.7). The
   gate keeps its OWN oracle: the design's round tables (§6), its own
   short-hand rule (|a − (30h + m/2)| ≤ 5° and the hand has passed h; on
   the hour, within 5° of 30h), its own run-on (0.5° a minute to the next
   12) and its own grading of EVERY pose of every round (12 long-hand marks
   × 144 short-hand steps) — never read off the tool.
   A the rounds · B every pose graded, and the run-on equivalence · C the
   named misconceptions · D the misses and hints · E the bots · F the
   phrases ×11 · G the plan · H strings ×11 · I drawing rules · J the
   manifest row.
   RO_CORE / RO_ACT / RO_MANIFEST let mutate-run-on.js aim it at a copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.RO_CORE || path.join(ROOT, 'mini tools', 'run-on-core.js');
const ACT_PATH = process.env.RO_ACT || path.join(ROOT, 'mini tools', 'run-on-activity.js');
const MAN_PATH = process.env.RO_MANIFEST || path.join(ROOT, 'mini tools', 'clock-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  oh: ['4:00', '9:30', '12:00', '6:30', '2:00', '11:30', '7:00', '1:30'],
  q: ['5:15', '10:45', '2:15', '8:45', '11:15', '3:45', '6:15', '12:45'],
  five: ['3:15', '7:45', '6:10', '9:20', '4:40', '1:50', '10:05', '12:25', '2:35', '11:55'],
  mixed: ['8:00', '5:30', '3:45', '10:15', '6:25', '1:40', '12:05', '9:50', '4:35', '7:10']
};
const hm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const N = (d) => ((d % 360) + 360) % 360;
const DIFF = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
/* the own rule: the long hand exactly at 6m; the short hand within 5° of 30h + m/2 AND past h (on the hour: within 5° of 30h) */
const RIGHT = (r, L, S) => { if (N(L) !== N(r.m * 6)) return false; const a = N(S), t = N(r.h * 30 + r.m / 2); if (DIFF(a, t) > 5) return false; return r.m === 0 || Math.floor(a / 30 + 1e-9) % 12 === r.h % 12; };
/* the own run-on: the short hand turns 0.5° a minute until the long hand reaches the 12 */
/* square = it arrives ON the next o'clock of the time the hands show (not merely on some number) */
const RUN = (L, S) => { const m = Math.round(N(L) / 6) % 60, a = N(S), goal = m === 0 ? Math.round(a / 30) : Math.floor(a / 30 + 1e-9) + 1, arr = N(a + 0.5 * (m === 0 ? 0 : 60 - m)); return { square: DIFF(arr, goal * 30) <= 5, struck: (goal % 12) || 12 }; };

/* ---------- A. the rounds ---------- */
ok(C.LEVELS.join() === 'oh,q,five,mixed' && C.levelOf('x') === 'five', 'A: four levels, five minutes by default');
ok(C.fmt('fr', 3, 20) === '3 h 20' && C.fmt('sv', 3, 5) === '3.05' && C.fmt('en', 12, 0) === '12:00' && C.fmt('de', 9, 45) === '9:45', 'A: digits per locale: fr 3 h 20 (no-break spaces), Nordic/nl dot, others colon');
for (const lv of C.LEVELS) {
  const R = C.rounds(lv), tag = 'A: ' + lv;
  ok(R.length === OWN[lv].length && R.length >= 7, tag + ' has ' + OWN[lv].length + ' rounds (≥ 7)');
  R.forEach((r, i) => { const o = hm(OWN[lv][i]); ok(r.h === o.h && r.m === o.m, tag + ' #' + (i + 1) + ' is ' + OWN[lv][i]); });
  ok(new Set(R.map((r) => r.h)).size === R.length, tag + ' distinct hours');
  const pos = {}; R.forEach((r) => { pos[r.m] = (pos[r.m] || 0) + 1; }); if (lv === 'five' || lv === 'mixed') ok(Object.values(pos).every((n) => n <= 2), tag + ' every long-hand position at most twice');
  if (lv === 'five' || lv === 'mixed') ok(R.filter((r) => r.m < 30).length === R.length / 2, tag + ' minutes < 30 in exactly half the rounds');
  R.forEach((r) => { const rest = C.restPose(r), rm = Math.round(rest.long / 6) % 60, dm = Math.min(Math.abs(rm - r.m), 60 - Math.abs(rm - r.m)), rh = Math.round(rest.short / 30) % 12 || 12, dh = Math.min(Math.abs(rh - r.h), 12 - Math.abs(rh - r.h));
    ok(!RIGHT(r, rest.long, rest.short) && dm >= 20 && dh >= 3 && rest.short % 30 === 0 && Math.abs(((rest.long - rest.short + 540) % 360) - 180) >= 30, tag + ' ' + r.h + ':' + r.m + ' the rest pose is never right, ≥ 20 min and ≥ 3 h away, the two hands never on top of each other'); });
}
{ const late = OWN.five.filter((s) => hm(s).m >= 20).length, late2 = OWN.mixed.filter((s) => hm(s).m >= 20).length; ok(late === 7 && late2 === 6, 'A: the ":20 and later" cases (short hand clearly off its number) — five: ' + late + ', mixed: ' + late2); }

/* ---------- B. every pose of every round, graded by the own rule ---------- */
let poses = 0;
for (const lv of C.LEVELS) C.rounds(lv).forEach((r) => {
  let rights = 0;
  for (let L = 0; L < 360; L += 30) for (let S = 0; S < 360; S += 2.5) {
    const st = C.newState(lv, r.k); st.long = L; st.short = S; st.moved = true;
    const res = C.check(st), own = RIGHT(r, L, S); poses++;
    if (own) rights++;
    if ((res.result === 'ok') !== own) ok(false, 'B: ' + lv + ' ' + r.h + ':' + r.m + ' pose long ' + L + '° short ' + S + '° → ' + (own ? 'right' : 'wrong') + ' (got ' + res.result + ')'); else pass++;
    /* the equivalence the activity enacts: right ⇔ the readout is the target AND the run-on arrives square */
    const rd = C.readout(L, S), run = RUN(L, S);
    if (own !== (rd.h === r.h && rd.m === r.m && run.square)) ok(false, 'B: ' + lv + ' ' + r.h + ':' + r.m + ' long ' + L + ' short ' + S + ': right ⇔ readout = target and a square arrival'); else pass++;
    if (C.runOn(L, S).square !== run.square) ok(false, 'B: the core run-on agrees with the own one at ' + L + '/' + S); else pass++;
  }
  ok(rights >= 1 && rights <= 5, 'B: ' + lv + ' ' + r.h + ':' + r.m + ' has a few right poses (2.5° steps within 5°): ' + rights);
  const sq = C.runOn(r.m * 6, r.h * 30 + r.m / 2); ok(sq.square && sq.struck === (r.m === 0 ? r.h : C.wrap(r.h + 1)) && sq.steps === (r.m === 0 ? 0 : (60 - r.m) / 5), 'B: ' + lv + ' ' + r.h + ':' + r.m + ' the right pose runs on ' + sq.steps + ' steps and the bell strikes the ' + sq.struck);
});
ok(poses === 36 * 12 * 144, 'B: graded ' + poses + ' poses');

/* ---------- C. the named misconceptions ---------- */
const POSE = (lv, h, m, L, S) => { const k = C.rounds(lv).findIndex((r) => r.h === h && r.m === m), st = C.newState(lv, k); st.long = L; st.short = S; st.moved = true; const res = C.check(st); return { st, res }; };
{ const { st, res } = POSE('five', 9, 20, 120, 270); ok(res.result === 'miss' && res.readout.h === 9 && res.readout.m === 20 && !res.run.square && C.hint(st) === 'hintShort', 'C: 9:20 with the short hand ON the 9 reads 9:20 — and the run-on arrives crooked (hintShort)'); }
{ const { st, res } = POSE('five', 7, 45, 270, 240); ok(res.result === 'miss' && res.readout.h === 8 && !res.run.square && st.verdict.kind === 'short', 'C: 7:45 with the short hand on the 8 reads 8:45 and runs on crooked past the 8'); }
{ const { st, res } = POSE('five', 6, 10, 300, 205); ok(res.result === 'miss' && res.readout.m === 50 && res.run.square && C.hint(st) === 'hintReal', 'C: 6:10 with the long hand on the 10 and the short hand set for 6:50 — a real time (6:50), refused by the readout: hintReal'); }
{ const { st } = POSE('five', 6, 10, 300, 185); ok(C.hint(st) === 'hintLong', 'C: 6:10 with only the long hand on the 10 → hintLong'); }
{ const { st } = POSE('mixed', 8, 0, 0, 270); ok(C.hint(st) === 'hintShortOn', 'C: 8:00 with the short hand on the 9 → hintShortOn (it sits ON its number)'); }
{ const { st } = POSE('mixed', 8, 0, 90, 240); ok(C.hint(st) === 'hintLongOn', 'C: 8:00 with the long hand on the 3 → hintLongOn'); }
{ const { st } = POSE('five', 3, 15, 90, 0); ok(st.verdict.kind === 'short' && C.hint(st) === 'hintShort', 'C: 3:15 with the hands swapped (short on the 12) → caught'); }

/* ---------- D. the misses and hints ---------- */
{ const st = C.newState('five', 0); ok(C.check(st).key === 'hintEmpty' && st.misses === 0, 'D: Check with neither hand moved → hintEmpty, no miss');
  C.setLong(st, 120); C.check(st); ok(st.misses === 1 && !st.help, 'D: one miss');
  const again = C.check(st); ok(again.result === 'note' && again.key === 'hintChange' && st.misses === 1, 'D: Check again with nothing changed → hintChange, no second miss');
  C.setShort(st, 10); C.check(st); ok(st.misses === 2 && st.help, 'D: a second miss turns the help on'); }
const HELP = (m) => (m === 0 ? 'helpOn' : m === 5 ? 'helpFive' : m <= 10 ? 'helpJust' : m === 15 ? 'helpQuarter' : m < 30 ? 'helpLess' : m === 30 ? 'helpHalf' : m <= 50 ? 'helpMore' : 'helpNearly');
for (const lv of C.LEVELS) C.rounds(lv).forEach((r) => {
  const st = C.newState(lv, r.k); st.verdict = { kind: 'short' }; st.help = true;
  ok(C.hint(st) === HELP(r.m) && C.okKey(r) === HELP(r.m).replace('helpFive', 'helpJust').replace('help', 'ok'), 'D: ' + lv + ' ' + r.h + ':' + r.m + ' help/success say where the short hand truly is (' + HELP(r.m) + ')');
});
ok(!C.setLong(Object.assign(C.newState('five', 0), { done: true }), 90), 'D: a solved clock takes no more moves');
ok(C.snapLong(47) === 60 && C.snapShort(271.1) === 270 && C.snapShort(272) === 272.5, 'D: the long hand snaps to five-minute marks, the short hand to 2.5° steps');

/* ---------- E. the bots ---------- */
{ let seed = 5; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let wins = 0, n = 0; for (const lv of C.LEVELS) C.rounds(lv).forEach((r) => { for (let t = 0; t < 800; t++) { n++; if (RIGHT(r, Math.floor(rnd() * 12) * 30, Math.floor(rnd() * 144) * 2.5)) wins++; } });
  /* measured: 77 / 28,800 ≈ 1 in 374 (an o'clock pose allows five short-hand steps); the design's "1 in 400" was an estimate */
  ok(wins / n <= 1 / 300, 'E: a random-drag bot wins ≤ 1 in 300 (' + wins + '/' + n + ')');
  const onHour = C.rounds('five').filter((r) => RIGHT(r, r.m * 6, r.h * 30)).length; ok(onHour <= 2, 'E: "short hand exactly on the hour" wins at most 2 of 10 five-minute rounds (' + onHour + ')'); }

/* ---------- F. the phrases: composed by the gate itself from learning-clock.js ---------- */
const LC = fs.readFileSync(path.join(ROOT, 'mini tools', 'learning-clock.js'), 'utf8');
const TBL = {};
for (const l of LOCALES) { const s = LC.indexOf('/*__TR_' + l + '__*/'), line = LC.slice(s, LC.indexOf('\n', s)); TBL[l] = (new Function('return ' + line.slice(line.indexOf('{'), line.lastIndexOf('}') + 1)))(); }
const SAY = (l, h, m) => { const R = TBL[l]; for (const sp of R.specials || []) if (sp.h === h && sp.m === m) return sp.text; const n = h % 12 + 1, alt = R.hourWordsAlt || R.hourWords; let o = R.positions[m]; if (R.hourWordsAlt2) o = o.split('{N3}').join(R.hourWordsAlt2[n - 1]); return o.split('{N2}').join(alt[n - 1]).split('{H2}').join(alt[h - 1]).split('{N}').join(R.hourWords[n - 1]).split('{H}').join(R.hourWords[h - 1]); };
for (const lv of C.LEVELS) C.rounds(lv).forEach((r) => LOCALES.forEach((l) => ok(C.phrase(l, r.h, r.m) === SAY(l, r.h, r.m), 'F: ' + l + ' ' + r.h + ':' + r.m + ' is the reviewed learning-clock phrase')));

/* ---------- G. the plan ---------- */
for (const lv of C.LEVELS) {
  const n = C.passSize(lv), all = Array.from({ length: n }, (_, i) => i).join();
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0; const seen = new Set();
  for (let p = 0; p < 200; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === all, 'G: ' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; seen.add(o.join()); prev = o; }
  ok(same === 0 && seen.size > 50, 'G: ' + lv + ' never repeats the previous order (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 15; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 ---------- */
const sandbox = {}; new Function('window', 'document', 'RunOnCore', SRC.replace(/injectRunOnCSS\(\);/, '') + ';window.X=RunOnActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
ok(keys.length >= 40, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
const asked = new Set([...body.matchAll(/'((?:hint|help|ok)[A-Z]\w*)'/g)].map((m) => m[1]).concat([...body.matchAll(/_t\('(\w+)'/g)].map((m) => m[1])));
asked.forEach((k) => ok(keys.includes(k), 'H: the code asks for "' + k + '", which is authored'));
keys.filter((k) => /^(hint|help)/.test(k)).forEach((k) => LOCALES.forEach((l) => ok(!/\d{1,2}[:.]\d\d|\d\s?h\s?\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' prints no clock time')));
const HALF = { de: /(?<!\p{L})halb(?!\p{L})/iu, nl: /(?<!\p{L})half(?!\p{L})/iu, sv: /(?<!\p{L})halv(?!\p{L})/iu, da: /(?<!\p{L})halv(?!\p{L})/iu, no: /(?<!\p{L})halv(?!\p{L})/iu, fi: /(?<!\p{L})puoli(?!\p{L})/iu };
Object.keys(HALF).forEach((l) => keys.filter((k) => /^(hint|help|ok)/.test(k)).forEach((k) => ok(!HALF[l].test(STR[k][l].replace('{phrase}', '')), 'H: ' + l + ' ' + k + ' avoids the half-to-the-next-hour idiom')));
ok(HALF.de.test('halb 10') && !HALF.de.test('halben Weg') && !HALF.nl.test('halverwege') && !HALF.sv.test('halvvägs'), 'H: the half-idiom ban fires on "halb 10" and not on "halben Weg / halverwege / halvvägs"');
ok(/not quite halfway/.test(STR.okLess.en) && /more than halfway/.test(STR.okMore.en), 'H: en :20/:25 say "not quite halfway", :35–:50 "more than halfway"');
ok(/on the 1./.test(STR.helpFive.en) && !/[Cc]ount by fives/.test(STR.helpFive.en) && Object.keys(STR.helpFive).length === 11, 'H: :05 help points at the 1 instead of a one-step count, in all 11 locales');
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ;');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');

/* ---------- I. drawing rules ---------- */
const ACT = SRC.replace(strBlock, '');
ok(/var rd = st\.done \? \{ h: st\.round\.h, m: st\.round\.m \} : vr && v\.shown \? vr\.readout : null;/.test(ACT), 'I: the readout stays empty while the hands are set (it flips only at Check)');
ok(/var boldEvery = lv === 'oh' \? 30 : lv === 'q' \? 15 : 5;/.test(ACT), 'I: the rim bolds 12 and 6 / the quarters / every five minutes, by level');
ok(/var geared = !!v\.run \|\| st\.done/.test(ACT), 'I: the gear slides in only for the run-on (the hands are loose while set)');
ok(/if \(v\.run\) return \{ long: v\.run\.long \+ 30 \* v\.run\.i, short: v\.run\.short \+ 2\.5 \* v\.run\.i \};/.test(ACT), 'I: the run-on turns the short hand 2.5° per five-minute step (0.5° a minute)');
ok(/if \(this\._ringOn\(\) \|\| help\)/.test(ACT), 'I: the minute ring shows with the setting, and always on miss 2');
ok(/\.ro-grip\{position:absolute;width:44px;height:44px;/.test(ACT), 'I: both grips are 44 px buttons');
ok(/\.lcs-activity-check\{display:none !important;\}/.test(ACT) && /chk\.click\(\); \}, this\.OK_MS\)/.test(ACT) && /OK_MS: 500/.test(ACT), 'I: the shell\'s Check is hidden and pressed 0.5 s after success');
ok(!/role="img"/.test(ACT), 'I: no svg role="img"');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'clock.tell-time-5-min.2-md-c-7');
ok(row && row.tool === 'run-on-activity' && row.task_template === 'run-on', 'J: the row points at the run-on test');
ok(row && row.alignment.code === '2.MD.C.7', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');

console.log(`verify-run-on-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

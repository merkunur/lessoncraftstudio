#!/usr/bin/env node
/* =====================================================================
   verify-hour-ball-core.js — the gate for ACTIVITY #162, The Hour Ball
   ("Sprocket's Clock — Read the Clock to the Quarter-Hour", 2.MD.C.7).
   The gate keeps its OWN oracle: the design's round tables (§6), its own
   2 × 2 card arithmetic (hour {h, h ± 1 wrapped} × minutes {m, 60 − m}),
   its own grading, its own run-on and free-play ball counting, and its own
   reading of the native-reviewed time phrases straight from
   learning-clock.js — never read off the tool.
   A the rounds and cards · B the cards' screen positions · C every card ×
   every round, graded · D the hint numbers · E the run-on · F free play ·
   G the time phrases ×11 · H strings ×11 and reachability · I drawing
   rules · J the manifest row.
   HB_CORE / HB_ACT / HB_MANIFEST let mutate-hour-ball.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.HB_CORE || path.join(ROOT, 'mini tools', 'hour-ball-core.js');
const ACT_PATH = process.env.HB_ACT || path.join(ROOT, 'mini tools', 'hour-ball-activity.js');
const MAN_PATH = process.env.HB_MANIFEST || path.join(ROOT, 'mini tools', 'clock-digital-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  1: [['3:15', '2'], ['9:45', '10'], ['6:15', '7'], ['1:45', '12'], ['11:15', '10'], ['4:45', '5'], ['8:15', '9'], ['2:45', '1'], ['7:15', '6'], ['12:45', '1']],
  2: [['3:20', '2'], ['7:40', '8'], ['10:05', '11'], ['6:35', '5'], ['8:25', '9'], ['4:55', '3'], ['11:45', '12'], ['9:15', '8'], ['1:50', '2'], ['5:10', '4']]
};
const hm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const W = (h) => ((h - 1) % 12 + 12) % 12 + 1;
const key = (c) => c.h + ':' + c.m;

/* ---------- A. the rounds and their cards ---------- */
for (const lv of ['1', '2']) {
  const R = C.rounds(lv), tag = 'A: L' + lv;
  ok(R.length === 10 && C.passSize(lv) === 10, tag + ' has 10 rounds (≥ 7)');
  R.forEach((r, i) => {
    const o = hm(OWN[lv][i][0]), H = +OWN[lv][i][1], t = tag + ' #' + (i + 1) + ' ' + OWN[lv][i][0];
    ok(r.h === o.h && r.m === o.m, t + ' is the design table\'s time');
    const own = new Set([o.h + ':' + o.m, o.h + ':' + (60 - o.m), H + ':' + o.m, H + ':' + (60 - o.m)]);
    ok(r.cards.length === 4 && r.cards.every((c) => own.has(key(c))) && new Set(r.cards.map(key)).size === 4, t + ' cards are {' + o.h + ', ' + H + '} × {' + o.m + ', ' + (60 - o.m) + '}');
    ok(H === W(o.h + 1) || H === W(o.h - 1), t + ' the neighbour is the hour before or after (12 wraps to 1)');
    ok(r.cards.filter((c) => c.h === o.h && c.m === o.m).length === 1, t + ' exactly one card is the clock');
    const mins = r.cards.map((c) => c.m); ok(mins.every((m) => mins.filter((x) => x === m).length === 2), t + ' every minute value appears twice (no minute shortcut)');
    ok(lv === '1' ? o.m === 15 || o.m === 45 : o.m % 5 === 0 && o.m > 0, t + (lv === '1' ? ' a quarter' : ' a five-minute time'));
    ok(C.hourAngle(o.h, o.m) === ((o.h % 12) * 30 + o.m / 2) % 360 && C.minuteAngle(o.m) === o.m * 6, t + ' hand angles');
  });
  ok(new Set(R.map((r) => r.h)).size === 10, tag + ' ten different hours');
  ok(R.filter((r) => r.m < 30).length === 5, tag + ' five rounds before the half hour, five after');
  ok(R.filter((r) => r.side === 1).length === 5, tag + ' the neighbour is the hour after in half the rounds');
  /* the right card's time-rank among its four (12 counted as 12, and as 0) never repeats more than 3 times */
  for (const twelve of [12, 0]) { const rank = [0, 0, 0, 0]; R.forEach((r) => { const v = (c) => ((c.h === 12 ? twelve : c.h) * 60 + c.m); const s = r.cards.map(v).sort((a, b) => a - b); rank[s.indexOf(v(r.cards.find((c) => c.h === r.h && c.m === r.m)))]++; }); ok(Math.max(...rank) <= 3, tag + ' the right card is not mostly the earliest/latest (12 = ' + twelve + ': ' + rank.join('/') + ')'); }
}
ok(C.rounds('1').some((r) => r.h === 12 && r.m === 45 && r.cards.some((c) => c.h === 1)), 'A: 12:45 is taught, its next hour wraps to 1');

/* ---------- B. the cards' screen positions ---------- */
{
  let seed = 3; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const hist = [], at = [0, 0, 0, 0]; let triple = 0;
  for (let i = 0; i < 1200; i++) { const o = C.cardOrder(rnd, hist.slice(-2)); ok(o.slice().sort().join() === '0,1,2,3', 'B: a showing places all four cards'); const p = o.indexOf(0); at[p]++; if (hist.length >= 2 && hist[hist.length - 1] === p && hist[hist.length - 2] === p) triple++; hist.push(p); }
  ok(at.every((n) => n / 1200 >= 0.22 && n / 1200 <= 0.28), 'B: the right card sits in each place 22–28 % (' + at.map((n) => (100 * n / 1200).toFixed(1)).join('/') + ')');
  ok(triple === 0, 'B: never three showings running in one place');
  const same = C.cardOrder(() => 0, [1, 1]); ok(same.indexOf(0) !== 1, 'B: a stream that keeps choosing one place is refused the third time');
}

/* ---------- C. every card × every round ---------- */
for (const lv of ['1', '2']) C.rounds(lv).forEach((r, k) => {
  const t = 'C: L' + lv + ' ' + OWN[lv][k][0];
  const st0 = C.newState(lv, k); ok(C.check(st0).key === 'hintEmpty' && st0.misses === 0, t + ' Check with no card → hintEmpty, no miss');
  r.cards.forEach((c, i) => {
    const st = C.newState(lv, k); C.post(st, i);
    const res = C.check(st), hourOk = c.h === r.h, minOk = c.m === r.m;
    if (hourOk && minOk) { ok(res.result === 'ok' && st.done, t + ' card ' + key(c) + ' is right'); return; }
    const side = hourOk ? null : c.h === W(r.h + 1) ? 'later' : 'earlier';
    const own = st.help ? null : !hourOk && !minOk ? 'hintBoth' : !minOk ? 'hintMinutes' : side === 'later' ? 'hintLater' : 'hintEarlier';
    ok(res.result === 'miss' && st.verdict.hourOk === hourOk && st.verdict.minOk === minOk && st.verdict.hourSide === side && C.hint(st) === own, t + ' card ' + key(c) + ' → ' + own + ' (got ' + C.hint(st) + ')');
    const again = C.check(st); ok(again.result === 'note' && again.key === 'hintChange' && st.misses === 1, t + ' Check again with the same card → hintChange, no second miss');
    ok(!C.post(st, i), t + ' posting the same card again changes nothing');
    const j = (i + 1) % 4; C.post(st, j); ok(st.verdict === null, t + ' posting another card clears the verdict');
    const r2 = C.check(st); if (r2.result === 'miss') ok(st.help && C.hint(st) === (lv === '1' && r.m === 45 ? 'hintHelpTo' : 'hintHelp'), t + ' a second miss turns the help on (' + C.hint(st) + ')');
  });
});

/* ---------- D. the hint numbers ---------- */
{ const k = C.rounds('1').findIndex((r) => r.h === 9), st = C.newState('1', k); const i = st.round.cards.findIndex((c) => c.h === 10 && c.m === 15); C.post(st, i); C.check(st); const a = C.hintArgs(st);
  ok(a.h === 9 && a.h1 === 10 && a.g === 10 && a.n === 9 && a.p === 3 && a.mm === '45', 'D: 9:45 with the 10:15 card → cup 9, waiting 10, card hour 10, long hand on the 9, pin at the 3'); }
{ const k = C.rounds('1').findIndex((r) => r.h === 12), st = C.newState('1', k); C.post(st, st.round.cards.findIndex((c) => c.h === 1 && c.m === 45)); C.check(st); ok(st.verdict.hourSide === 'later' && C.hintArgs(st).h1 === 1, 'D: 12:45 with the 1:45 card → the 1-ball is the one still waiting (12 wraps to 1)'); }

/* ---------- E. the run-on (miss 2) ---------- */
for (const lv of ['1', '2']) C.rounds(lv).forEach((r) => {
  const steps = C.runOn(r), step = lv === '1' ? 15 : 5, n = (60 - r.m) / step;
  ok(steps.length === n, 'E: L' + lv + ' ' + key(r) + ' runs ' + n + ' steps of ' + step + ' minutes to the 12');
  ok(steps.slice(0, -1).every((s) => s.cup === r.h && s.h === r.h) && steps[steps.length - 1].cup === W(r.h + 1) && steps[steps.length - 1].m === 0, 'E: L' + lv + ' ' + key(r) + ' the cup changes only at the last step, at the 12');
});

/* ---------- F. free play ---------- */
{
  const k = C.rounds('1').findIndex((r) => r.h === 9), st = C.newState('1', k);
  ok(C.turn(st, 15).drops === 0 && st.free === null, 'F: the long hand is locked during a round');
  C.post(st, st.round.cards.findIndex((c) => c.h === 9 && c.m === 45)); C.check(st);
  ok(C.turn(st, 15).drops === 1 && C.freeClock(st).cup === 10 && C.freeClock(st).m === 0, 'F: 9:45 + a quarter crosses the 12: one ball drops, the cup holds 10');
  ok(C.turn(st, -1).drops === -1 && C.freeClock(st).cup === 9, 'F: back past the 12: the ball rolls back up, the cup holds 9 again');
  C.turn(st, 0.4); C.snap(st); ok(C.freeClock(st).m === 0 && C.freeClock(st).h === 10, 'F: release snaps to the nearest quarter (10:00)');
  ok(C.turn(st, 12 * 60).drops === 12, 'F: a whole turn of the day drops twelve balls');
  const s2 = C.newState('1', C.rounds('1').findIndex((r) => r.h === 12)); C.post(s2, s2.round.cards.findIndex((c) => c.h === 12 && c.m === 45)); C.check(s2); C.turn(s2, 15);
  ok(C.freeClock(s2).cup === 1 && C.freeClock(s2).h === 1, 'F: from 12:45 the ball that drops is the 1 (no 13)');
}

/* ---------- G. the time phrases: the gate composes them itself from learning-clock.js ---------- */
const LC = fs.readFileSync(path.join(ROOT, 'mini tools', 'learning-clock.js'), 'utf8');
const TBL = {};
for (const l of LOCALES) { const s = LC.indexOf('/*__TR_' + l + '__*/'), line = LC.slice(s, LC.indexOf('\n', s)); TBL[l] = (new Function('return ' + line.slice(line.indexOf('{'), line.lastIndexOf('}') + 1)))(); }
const SAY = (l, h, m) => { const R = TBL[l]; for (const sp of R.specials || []) if (sp.h === h && sp.m === m) return sp.text; const n = h % 12 + 1, alt = R.hourWordsAlt || R.hourWords; let o = R.positions[m]; if (R.hourWordsAlt2) o = o.split('{N3}').join(R.hourWordsAlt2[n - 1]); return o.split('{N2}').join(alt[n - 1]).split('{H2}').join(alt[h - 1]).split('{N}').join(R.hourWords[n - 1]).split('{H}').join(R.hourWords[h - 1]); };
for (const lv of ['1', '2']) C.rounds(lv).forEach((r) => LOCALES.forEach((l) => ok(C.phrase(l, r.h, r.m) === SAY(l, r.h, r.m), 'G: ' + l + ' ' + key(r) + ' "' + C.phrase(l, r.h, r.m) + '" is the reviewed learning-clock phrase')));
ok(C.phrase('de', 3, 45) === 'Viertel vor 4' && C.phrase('nl', 3, 20) === 'tien voor half 4' && C.phrase('pt', 12, 45) === 'quinze para a uma', 'G: the next-hour idioms survive (de Viertel vor 4, nl tien voor half 4, pt quinze para a uma)');

/* ---------- the plan: order-only reshuffle, never the previous order, never three :45-type (or :15-type) rounds in a row ---------- */
for (const lv of ['1', '2']) {
  let seed = 9; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0, runs = 0; const seen = new Set();
  for (let p = 0; p < 300; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === '0,1,2,3,4,5,6,7,8,9', 'G: L' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; for (let i = 2; i < o.length; i++) { const late = (k) => hm(OWN[lv][k][0]).m > 30; if (late(o[i]) === late(o[i - 1]) && late(o[i]) === late(o[i - 2])) runs++; } seen.add(o.join()); prev = o; }
  ok(same === 0 && runs === 0 && seen.size > 100, 'G: L' + lv + ' never repeats the previous order, never three of one kind in a row, really shuffles (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: L' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 and reachability ---------- */
const sandbox = {}; new Function('window', 'document', 'HourBallCore', SRC.replace(/injectHourBallCSS\(\);/, '') + ';window.X=HourBallActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
ok(keys.length >= 25, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
const asked = new Set([...body.matchAll(/_t\('(\w+)'/g)].map((m) => m[1]).concat([...body.matchAll(/'(hint\w+)'/g)].map((m) => m[1])).concat([...body.matchAll(/'(ok[A-Z]\w+)'/g)].map((m) => m[1])));
asked.forEach((k) => ok(keys.includes(k), 'H: the code asks for "' + k + '", which is authored'));
['hintEmpty', 'hintChange', 'hintLater', 'hintEarlier', 'hintMinutes', 'hintBoth', 'hintHelp', 'hintHelpTo', 'taskLine'].forEach((k) => LOCALES.forEach((l) => ok(!/\d{1,2}[:.]\d\d|\d\s?h\s?\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' prints no time')));
/* the earlier ball dropped BEFORE the cup's ball — never "an hour ago" (at 3:45 ball 2 dropped 1 h 45 min ago; reviewer 2026-10-29) */
ok(/dropped before ball \{h\}/.test(STR.hintEarlier.en) && !/hour ago/.test(STR.hintEarlier.en), 'H: en the earlier ball dropped BEFORE the cup ball (not "an hour ago")');
LOCALES.forEach((l) => ok((STR.hintEarlier[l].match(/\{h\}/g) || []).length === 2, 'H: ' + l + ' hintEarlier names the cup ball twice (before ball h; the cup holds ball h)'));
LOCALES.forEach((l) => ok(!/\{mm\}/.test(STR.hintMinutes[l]), 'H: ' + l + ' the minutes hint asks — it never states the minutes'));
const HALF = { de: /(?<!\p{L})halb(?!\p{L})/iu, nl: /(?<!\p{L})half(?!\p{L})/iu, sv: /(?<!\p{L})halv(?!\p{L})/iu, da: /(?<!\p{L})halv(?!\p{L})/iu, no: /(?<!\p{L})halv(?!\p{L})/iu, fi: /(?<!\p{L})puoli(?!\p{L})/iu };
Object.keys(HALF).forEach((l) => keys.filter((k) => /^hint/.test(k)).forEach((k) => ok(!HALF[l].test(STR[k][l]), 'H: ' + l + ' ' + k + ' avoids the half-to-the-next-hour idiom')));
ok(HALF.de.test('halb 4') && !HALF.de.test('Viertelstunde'), 'H: the half-idiom ban fires on "halb 4" and not on correct text');
LOCALES.forEach((l) => ok(/\{phrase\}/.test(STR.okPast[l]) && /\{time\}/.test(STR.okPast[l]) && /\{h1\}/.test(STR.okTo[l]), 'H: ' + l + ' success lines carry the digits, the phrase, and (quarter to) the waiting ball'));
LOCALES.forEach((l) => ok(STR.aCup[l] !== STR.trShow[l] && !/\{time\}/.test(STR.aClock[l]), 'H: ' + l + ' before success the clock is read by its hands, never its time'));
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ;');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');

/* ---------- I. drawing rules ---------- */
const ACT = SRC.replace(strBlock, '');
ok(/var tr = C\.tray\(now\.cup\), up = lidOpen,/.test(ACT) && /up \? n : null/.test(ACT), 'I: the tray of past hours is face-down until the lid opens (it would give the hour away)');
ok(/var showWait = \(vr && vr\.hourSide === 'later'\) \|\| !!v\.run \|\| help;/.test(ACT), 'I: the waiting ball shows its number only when a later-hour miss (or the run-on) points at it');
ok(/if \(lidOpen\) o \+= this\._ball\(CX, 406, now\.cup,/.test(ACT) && /var lidOpen = !!vr \|\| !!v\.run \|\| st\.done/.test(ACT), 'I: the cup ball is drawn only once the lid is open');
ok(/var pa = C\.minuteAngle\(pinM\)/.test(ACT), 'I: the pin stands at the card\'s MINUTES (6m), not its hour');
ok(/sr\.textContent = st\.done \? this\._t\('aClockDone'/.test(ACT), 'I: the clock says its time aloud only after success');
ok(/if \(st\.help\) \{ this\._runOn\(\); return; \}/.test(ACT), 'I: miss 2 runs the clock on to the 12');
ok(/rooster: wide \? 96 : 64/.test(ACT), 'I: Sprocket is 96 px wide, 64 px on phones (never smaller)');
ok(/\.lcs-activity-check\{display:none !important;\}/.test(ACT) && /chk\.click\(\); \}, this\.OK_MS\)/.test(ACT) && /OK_MS: 500/.test(ACT), 'I: the shell\'s Check is hidden and pressed 0.5 s after success');
ok(!/role="img"/.test(ACT), 'I: no svg role="img"');
ok(/_trayOn: function \(\) \{ return this\._setting\('tray'\) !== 'hide'; \},/.test(ACT) && /tray: 'show'/.test(ACT), 'I: the tray setting is read (shown by default)');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'clock-digital.read-quarter-hour.2-md-c-7');
ok(row && row.tool === 'hour-ball-activity' && row.task_template === 'hour-ball', 'J: the row points at the hour ball');
ok(row && row.alignment.code === '2.MD.C.7' && row.alignment.grade === '2', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');
ok(row && !LOCALES.some((l) => /(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(row.page_title[l] + ' ' + row.page_intro[l])), 'J: no "free" in the page metadata');

console.log(`verify-hour-ball-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

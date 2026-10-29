#!/usr/bin/env node
/* =====================================================================
   verify-day-wheel-core.js — the gate for ACTIVITY #158, The Day Wheel
   (2.MD.C.7, the a.m./p.m. clause). The gate keeps its OWN oracle: the
   design's round tables with the es/it evening overrides, its own lap
   rule (before 12:00 is the first lap), its own 12-hour face and its own
   grading — never read off the tool.
   A the rounds per locale · B the pictures · C every stop of the day ×
   every round × every locale, graded by the own oracle · D the rules of
   the hand · E the gears · F the bots · G the plan · H strings ×11, the
   day-part words and reachability · I drawing rules · J the manifest row.
   DW_CORE / DW_ACT / DW_MANIFEST let mutate-day-wheel.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.DW_CORE || path.join(ROOT, 'mini tools', 'day-wheel-core.js');
const ACT_PATH = process.env.DW_ACT || path.join(ROOT, 'mini tools', 'day-wheel-activity.js');
const MAN_PATH = process.env.DW_MANIFEST || path.join(ROOT, 'mini tools', 'clock-ampm-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  1: [['wake', 'furniture/bed', 6, 0], ['breakfast', 'breakfast/cereal', 7, 0], ['school', 'classroom/backpack', 8, 0], ['apple', 'breakfast/apple', 10, 0], ['playground', 'activities/playground', 15, 0],
    ['bike', 'activities/biking', 16, 0], ['dinner', 'around-the-house/pot', 18, 0], ['story', 'activities/reading', 19, 0], ['bed', 'furniture/bed', 20, 0]],
  2: [['breakfast', 'breakfast/croissant', 6, 30], ['brushAm', 'around-the-house/toothbrush', 7, 30], ['school', 'classroom/backpack', 8, 30], ['apple', 'breakfast/apple', 10, 30], ['riddleAm', null, 0, 30],
    ['riddlePm', null, 12, 30], ['piano', 'activities/piano', 16, 30], ['campfire', 'camping/campfire', 19, 30], ['brushPm', 'around-the-house/toothbrush', 20, 30]]
};
/* Mexico and Italy eat and sleep an hour later (the native reviewer: dinner 7, story 8, bed 9) */
const LATE = { dinner: 19, story: 20, bed: 21 };
const OWN_ROUNDS = (lv, loc) => OWN[lv].map(([key, pic, h, m]) => { const hh = (loc === 'es' || loc === 'it') && key in LATE ? LATE[key] : h; return { key, pic, h: hh, m, ans: hh * 60 + m, lap: hh < 12 ? 'am' : 'pm' }; });
const FACE = (min) => { const h = Math.floor(min / 60) % 12; return (h === 0 ? 12 : h) + ':' + (min % 60); };
const STEP = { 1: 60, 2: 30 };

/* ---------- A. the rounds per locale ---------- */
for (const lv of ['1', '2']) for (const loc of LOCALES) {
  const R = C.rounds(lv, loc), own = OWN_ROUNDS(lv, loc), tag = 'A: ' + lv + '/' + loc;
  ok(R.length === own.length && R.length >= 7, tag + ' has ' + own.length + ' rounds (≥ 7)');
  R.forEach((r, i) => {
    const o = own[i];
    ok(r.key === o.key && (r.pic ? r.pic.join('/') : null) === o.pic, tag + ' #' + (i + 1) + ' is ' + o.key + ' with ' + o.pic);
    ok(r.answer === o.ans && r.lap === o.lap, tag + ' #' + (i + 1) + ' ' + o.key + ' at ' + o.h + ':' + o.m + ' (' + o.lap + ', own rule)');
    ok(o.ans % STEP[lv] === 0 && o.ans > 0 && o.ans !== 720 && o.ans <= 1440 - STEP[lv], tag + ' #' + (i + 1) + ' a stop of the level, never 12:00 sharp');
  });
  const am = own.filter((r) => r.lap === 'am').length;
  ok(am === (lv === '1' ? 4 : 5), tag + ' a.m. ' + am + ' / p.m. ' + (own.length - am));
  const faces = {}; own.forEach((r) => { (faces[FACE(r.ans)] = faces[FACE(r.ans)] || new Set()).add(r.lap); });
  ok(Object.values(faces).some((s) => s.size === 2), tag + ' at least one clock time comes in both laps (the clock alone never decides)');
  const pics = {}; own.forEach((r) => { if (r.pic) (pics[r.pic] = pics[r.pic] || new Set()).add(r.lap); });
  ok(Object.values(pics).some((s) => s.size === 2), tag + ' one picture appears in both laps (only the sentence decides)');
  if (lv === '1') { const t = (k) => own.find((r) => r.key === k).ans; ok(t('dinner') < t('story') && t('story') < t('bed'), tag + ' dinner → story → bed'); }
  if (lv === '2') { ok(own.find((r) => r.key === 'riddleAm').ans === 30 && own.find((r) => r.key === 'riddlePm').ans === 750, tag + ' the two riddles: 12:30 after midnight and after noon'); ok(own.find((r) => r.key === 'brushAm').ans < own.find((r) => r.key === 'brushPm').ans, tag + ' teeth after breakfast before teeth before bed'); }
}

/* ---------- B. the pictures ---------- */
const need = new Set(); for (const lv of ['1', '2']) OWN[lv].forEach((x) => x[1] && need.add(x[1])); ['farm-animals/rooster', 'camping/moon', 'beach/sun'].forEach((x) => need.add(x));
need.forEach((p) => {
  const [d, k] = p.split('/'), ix = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'pictures', d + '.json'), 'utf8')), e = ix.nouns && ix.nouns[k];
  ok(!!e && fs.existsSync(path.join(ROOT, e.src.replace(/^\//, ''))), 'B: ' + p + ' is in the picture index and on disk');
  ok(e && LOCALES.every((l) => e.labels[l] && e.labels[l][0]), 'B: ' + p + ' labelled in 11 locales');
  ok(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d), 'B: ' + d + ' is a colour theme');
});
const themes = (SRC.match(/THEMES: \[([^\]]*)\]/) || [])[1] || '';
need.forEach((p) => ok(themes.indexOf("'" + p.split('/')[0] + "'") >= 0, 'B: the activity loads the theme of ' + p));

/* ---------- C. every stop × every round × every locale ---------- */
let graded = 0;
for (const lv of ['1', '2']) for (const loc of LOCALES) C.rounds(lv, loc).forEach((r, i) => {
  const o = OWN_ROUNDS(lv, loc)[i];
  let wins = 0;
  for (let m = 0; m <= 1440 - STEP[lv]; m += STEP[lv]) {
    const st = C.newState(lv, i, loc); C.wind(st, m); const res = C.check(st); graded++;
    const tag = 'C: ' + lv + '/' + loc + ' ' + o.key + ' at ' + m;
    if (m === 0) { ok(res.result === 'note' && res.key === 'hintIdle' && st.misses === 0, tag + ' midnight is "wind the hand", no miss'); continue; }
    if (m === o.ans) { wins++; ok(res.result === 'ok' && st.done, tag + ' the card time in its lap wins'); continue; }
    if (FACE(m) === FACE(o.ans)) ok(res.result === 'miss' && res.kind === 'lap' && res.dir === (o.ans > m ? 'more' : 'back'), tag + ' the same face in the other lap: the lap miss, wind ' + (o.ans > m ? 'on' : 'back'));
    else ok(res.result === 'miss' && res.kind === 'time', tag + ' a different face: the time miss');
  }
  ok(wins === 1, 'C: ' + lv + '/' + loc + ' ' + o.key + ' exactly one stop wins');
});
ok(graded > 6000, 'C: graded ' + graded + ' stops');

/* ---------- D. the rules of the hand ---------- */
{
  const st = C.newState('1', 1, 'en');
  ok(!C.wind(st, -90) && st.minutes === 0, 'D: the midnight stop pin holds below 0');
  C.wind(st, 5000); ok(st.minutes === 1380, 'D: the second midnight pin holds the day at 11:00 p.m. (' + st.minutes + ')');
  const s2 = C.newState('2', 0, 'en'); C.wind(s2, 5000); ok(s2.minutes === 1410, 'D: half hours stop at 11:30 p.m.');
  C.wind(s2, 397); ok(s2.minutes === 390, 'D: half hours snap (397 → 390)');
  const s3 = C.newState('1', 0, 'en'); C.wind(s3, 397); ok(s3.minutes === 420, 'D: o\'clock snaps to the nearest hour (397 → 420)');
  const s4 = C.newState('1', 1, 'en'); C.wind(s4, 19 * 60); C.check(s4); ok(!!s4.verdict && s4.misses === 1 && !s4.help, 'D: a miss leaves its verdict');
  C.wind(s4, 18 * 60); ok(s4.verdict === null, 'D: a move clears it'); C.check(s4); ok(s4.help, 'D: the second miss turns the help on');
  C.wind(s4, 7 * 60); ok(C.check(s4).result === 'ok' && s4.done, 'D: the right stop wins after misses');
  ok(!C.wind(s4, 3 * 60) && C.check(s4).result === 'no', 'D: a solved round is locked');
  const s5 = C.newState('1', 1, 'en'); C.check(s5); C.check(s5); ok(s5.misses === 0 && !s5.help, 'D: Check at midnight never counts a miss');
}

/* ---------- E. the gears ---------- */
for (let m = 0; m <= 1440; m += 15) {
  ok(Math.abs(C.hourAngle(m) - ((m % 720) / 2)) < 1e-9, 'E: the hour hand turns once in 12 h (' + m + ')');
  ok(Math.abs(C.wheelAngle(m) - m / 4) < 1e-9, 'E: the day wheel turns once in 24 h, half the hour hand (' + m + ')');
  ok(Math.abs(C.minuteAngle(m) - (m % 60) * 6) < 1e-9, 'E: the minute hand turns once an hour (' + m + ')');
  if (m < 1440) ok(C.lapOf(m) === (m < 720 ? 'am' : 'pm'), 'E: the lap flips at noon exactly (' + m + ')');
}
ok(C.lapOf(719) === 'am' && C.lapOf(720) === 'pm', 'E: 11:59 is a.m., 12:00 noon is p.m.');
ok(C.face(0).h === 12 && C.face(720).h === 12 && C.face(780).h === 1, 'E: the face reads 12 at midnight and at noon');

/* ---------- F. the bots ---------- */
for (const lv of ['1', '2']) for (const loc of LOCALES) {
  const own = OWN_ROUNDS(lv, loc), n = own.length;
  /* winding to the card's face and stopping at the FIRST (or always the SECOND) time it comes round */
  const first = own.filter((r) => r.ans < 720).length, second = n - first;
  const play = (pick) => C.rounds(lv, loc).filter((r, i) => { const st = C.newState(lv, i, loc); C.wind(st, pick(r)); return C.check(st).result === 'ok'; }).length;
  ok(play((r) => r.answer % 720) === first && first <= Math.ceil(n * 0.56), 'F: ' + lv + '/' + loc + ' "always the first stop" wins ' + first + ' of ' + n);
  ok(play((r) => (r.answer % 720) + 720) === second && second <= Math.ceil(n * 0.56), 'F: ' + lv + '/' + loc + ' "always the second stop" wins ' + second + ' of ' + n);
}

/* ---------- G. the plan ---------- */
for (const lv of ['1', '2']) {
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0, runs = 0; const seen = new Set(), R = C.rounds(lv, 'en');
  for (let p = 0; p < 300; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === R.map((r) => r.k).join(), 'G: ' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; for (let i = 2; i < o.length; i++) if (R[o[i]].lap === R[o[i - 1]].lap && R[o[i]].lap === R[o[i - 2]].lap) runs++; seen.add(o.join()); prev = o; }
  ok(same === 0, 'G: ' + lv + ' never repeats the previous order');
  ok(runs === 0, 'G: ' + lv + ' never three rounds of one lap in a row');
  ok(seen.size > 100, 'G: ' + lv + ' orders really shuffle (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11, the day-part words, reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'DayWheelCore', SRC.replace(/injectDayWheelCSS\(\);/, '') + ';window.X=DayWheelActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings, EVENTS = [...new Set(OWN[1].concat(OWN[2]).map((x) => x[0]))];
ok(keys.length >= 50, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  const built = /^s_/.test(k) && /'s_' \+ r\.key/.test(body) || /^ok_/.test(k) && /'ok_' \+ r\.key/.test(body);
  ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
EVENTS.forEach((e) => LOCALES.forEach((l) => {
  /* exemption, listed: de and nl name NOON as "12 Uhr mittags" / "12 uur ’s middags" (their word for noon), never a clock time */
  ok(STR['s_' + e] && !/\d/.test(STR['s_' + e][l].replace(/12 Uhr mittags|12 uur ’s middags/g, '')), 'H: ' + l + ' s_' + e + ' carries no time (the card prints it)');
  ok(STR['ok_' + e] && /^\{say\}/.test(STR['ok_' + e][l]), 'H: ' + l + ' ok_' + e + ' opens with the time as it is said, with its part of the day');
}));
['hintIdle', 'hintLap', 'hintMore', 'hintBack'].forEach((k) => LOCALES.forEach((l) => ok(!/\{/.test(STR[k][l]) && !/\d{1,2}[:.]\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' names no time')));
LOCALES.forEach((l) => ok(/\{card\}/.test(STR.hintTime[l]) && /\{set\}/.test(STR.hintTime[l]) && !/\{part\}/.test(STR.hintTime[l]), 'H: ' + l + ' hintTime compares the card and the clock, never says the lap'));
/* the badge word is the CURRENT day-part: own truth per locale; no word on both colours */
const OWN_PARTS = { en: [[0, 12, 'a.m.'], [12, 24, 'p.m.']], es: [[0, 12, 'a. m.'], [12, 24, 'p. m.']], fi: [[0, 12, 'ap.'], [12, 24, 'ip.']],
  de: [[0, 5, 'nachts'], [5, 10, 'morgens'], [10, 12, 'vormittags'], [12, 14, 'mittags'], [14, 18, 'nachmittags'], [18, 24, 'abends']],
  fr: [[0, 12, 'du matin'], [12, 18, 'de l’après-midi'], [18, 24, 'du soir']], it: [[0, 5, 'di notte'], [5, 12, 'di mattina'], [12, 18, 'del pomeriggio'], [18, 24, 'di sera']],
  pt: [[0, 5, 'da madrugada'], [5, 12, 'da manhã'], [12, 18, 'da tarde'], [18, 24, 'da noite']], nl: [[0, 6, '’s nachts'], [6, 12, '’s ochtends'], [12, 18, '’s middags'], [18, 24, '’s avonds']],
  sv: [[0, 5, 'på natten'], [5, 10, 'på morgonen'], [10, 12, 'på förmiddagen'], [12, 13, 'mitt på dagen'], [13, 18, 'på eftermiddagen'], [18, 24, 'på kvällen']],
  da: [[0, 5, 'om natten'], [5, 10, 'om morgenen'], [10, 12, 'om formiddagen'], [12, 13, 'midt på dagen'], [13, 18, 'om eftermiddagen'], [18, 24, 'om aftenen']],
  no: [[0, 5, 'om natta'], [5, 10, 'om morgenen'], [10, 12, 'på formiddagen'], [12, 13, 'midt på dagen'], [13, 18, 'på ettermiddagen'], [18, 24, 'om kvelden']] };
const sp = (s) => s.replace(/[  ]/g, ' ');
LOCALES.forEach((l) => {
  const am = new Set(), pm = new Set();
  for (let h = 0; h < 24; h++) { const w = sp(C.part(l, h * 60 + 30)), want = OWN_PARTS[l].find(([a, b]) => h >= a && h < b)[2]; ok(w === want, 'H: ' + l + ' ' + h + ':30 is "' + want + '" (' + w + ')'); (h < 12 ? am : pm).add(w); }
  ok([...am].every((w) => !pm.has(w)), 'H: ' + l + ' no day-part word on both colours');
});
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');
ok(LOCALES.every((l) => C.fmt(l, 450) === { en: '7:30', de: '7:30', es: '7:30', pt: '7:30', it: '7:30', fr: '7 h 30', nl: '7.30', sv: '7.30', da: '7.30', no: '7.30', fi: '7.30' }[l]), 'H: each locale writes 7:30 its own way (7.30 north, 7 h 30 in fr)');
ok(LOCALES.every((l) => C.fmt(l, 1140) === C.fmt(l, 420)), 'H: the printed time is the 12-hour face (19:00 prints as 7)');
/* half past midnight and noon are SAID: own table (the native reviewer); every other time is the face time + its day-part word */
const HALF = { fr: ['minuit et demi', 'midi et demi'], it: ['mezzanotte e mezza', 'mezzogiorno e mezza'], pt: ['meia-noite e meia', 'meio-dia e meia'], de: ['halb eins nachts', 'halb eins mittags'], nl: ['half een ’s nachts', 'half een ’s middags'],
  sv: ['halv ett på natten', 'halv ett mitt på dagen'], da: ['halv et om natten', 'halv et midt på dagen'], no: ['halv ett om natta', 'halv ett midt på dagen'], en: ['12:30 a.m.', '12:30 p.m.'], es: ['12:30 a. m.', '12:30 p. m.'], fi: ['12.30 ap.', '12.30 ip.'] };
LOCALES.forEach((l) => {
  ok(sp(C.spoken(l, 30)) === HALF[l][0] && sp(C.spoken(l, 750)) === HALF[l][1], 'H: ' + l + ' says half past midnight / noon as "' + HALF[l].join('" / "') + '"');
  ok(sp(C.spoken(l, 1140)) === sp(C.fmt(l, 1140) + ' ' + C.part(l, 1140)), 'H: ' + l + ' says other times as the face time and its part of the day');
});

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(/wa = C\.wheelAngle\(min\)/.test(ACT_BODY) && /transform="rotate\(' \+ \(-wa\)\.toFixed\(2\) \+ ' 200 200\)"/.test(ACT_BODY), 'I: the window shows the day wheel turned by the WHEEL angle (half speed)');
ok(/mark\(0, 'camping', 'moon'\) \+ mark\(720, 'beach', 'sun'\)/.test(ACT_BODY), 'I: the moon rides the wheel at midnight, the sun at noon');
ok(/b\.textContent = this\._label\(\) \? '' : C\.part\(loc, min\);/.test(ACT_BODY), 'I: the badge goes colour-only when the card carries the label');
ok(/if \(st\.done && r\.pic\)/.test(ACT_BODY), 'I: the event picture seats itself only on success');
ok(/if \(st\.help && vk === 'lap'\)/.test(ACT_BODY), 'I: the lap arrow only after a second miss on the wrong lap');
ok(/var hide = lab && !st\.done;/.test(ACT_BODY) && /tm\.textContent = lab \? C\.spoken\(loc, r\.answer\) : C\.fmt\(loc, r\.answer\);/.test(ACT_BODY), 'I: label mode hides the picture and the sentence until success, and prints the time as it is said');
ok(!/r\.answer[^;\n]*dw-badge|dw-readout[^;\n]*r\.answer/.test(ACT_BODY), 'I: the badge and readout show the hands, never the answer');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'clock-ampm.morning-or-night.2-md-c-7');
ok(row && row.tool === 'day-wheel-activity' && row.task_template === 'day-wheel', 'J: the row points at the day wheel');
ok(row && row.alignment.code === '2.MD.C.7', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');

console.log(`verify-day-wheel-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

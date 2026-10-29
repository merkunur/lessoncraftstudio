#!/usr/bin/env node
/* =====================================================================
   verify-second-ring-core.js — the gate for ACTIVITY #159, The Second
   Ring (2.MD.C.7 extended to the 24-hour clock). The gate keeps its OWN
   oracle: the design's round tables, its own conversion (h24 = h12 % 12,
   + 12 after noon; noon and midnight by name), its own day-part chip
   tables and its own grading — never read off the tool.
   A the rounds · B the pictures · C every answer the child can write ×
   every round × every locale, graded by the own oracle · D the boxes and
   the chips · E the run and the ring · F the bots · G the plan · H strings
   ×11, the printed forms and reachability · I drawing rules · J the
   manifest row.
   SR_CORE / SR_ACT / SR_MANIFEST let mutate-second-ring.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.SR_CORE || path.join(ROOT, 'mini tools', 'second-ring-core.js');
const ACT_PATH = process.env.SR_ACT || path.join(ROOT, 'mini tools', 'second-ring-activity.js');
const MAN_PATH = process.env.SR_MANIFEST || path.join(ROOT, 'mini tools', 'clock-convert-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  1: [['to24', 15, 0], ['to12', 20, 0], ['to24', 21, 30], ['to12', 14, 0], ['to24', 8, 0], ['to12', 10, 30], ['to24', 18, 0], ['to12', 23, 0], ['to24', 19, 30], ['to12', 7, 0]],
  2: [['to12', 14, 15], ['to24', 13, 20], ['to12', 23, 45], ['to24', 16, 5], ['to12', 12, 0], ['to24', 0, 0], ['to24', 9, 5], ['to12', 17, 50], ['to12', 11, 35], ['to24', 22, 40]]
};
const span = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/* the own chip tables: the 24-hour hours each day-part word may mean */
const OWN_CHIPS = {
  en: { am: span(0, 11), pm: span(12, 23) }, es: { am: span(0, 11), pm: span(12, 23) }, fi: { ap: span(0, 11), ip: span(12, 23) }, sv: { fm: span(0, 11), em: span(12, 23) },
  de: { morgens: span(5, 9), vormittags: span(9, 11), mittags: [12, 13], nachmittags: span(13, 17), abends: span(17, 23), nachts: [22, 23, 0, 1, 2, 3, 4] },
  fr: { matin: span(1, 11), midi: [12], apm: span(13, 17), soir: span(18, 23) },
  it: { mattina: span(5, 11), mezzogiorno: [12], pomeriggio: span(13, 17), sera: span(18, 23), notte: [23, 0, 1, 2, 3, 4] },
  pt: { manha: span(5, 11), meiodia: [12], tarde: span(13, 18), noite: span(18, 23) },
  nl: { ochtend: span(6, 11), middag: span(12, 17), avond: span(18, 23), nacht: span(0, 5) },
  da: { morgen: span(5, 9), formiddag: span(9, 11), middag: [12], eftermiddag: span(13, 17), aften: span(18, 23), nat: [23, 0, 1, 2, 3, 4] },
  no: { morgen: span(5, 9), formiddag: span(9, 11), middag: [12], ettermiddag: span(13, 17), kveld: span(18, 23), natt: [23, 0, 1, 2, 3, 4] }
};
/* the own reading of a written answer: minutes from midnight, or null */
const READ = (loc, dir, h, m, part) => {
  if (h === '' || m === '') return null;
  h = +h; m = +m; if (m > 59) return null;
  if (dir === 'to24') return h <= 23 ? h * 60 + m : null;
  if (h < 1 || h > 12 || !part) return null;
  const hs = OWN_CHIPS[loc][part], lo = h % 12, hi = lo + 12, h24 = hs.includes(lo) ? lo : hs.includes(hi) ? hi : null;
  return h24 === null ? null : h24 * 60 + m;
};

/* ---------- A. the rounds ---------- */
const OLD = ['15:0', '20:0', '21:30', '14:15', '18:0', '23:45', '13:20', '16:5', '19:30'];
for (const lv of ['1', '2']) for (const loc of LOCALES) {
  const R = C.rounds(lv, loc), tag = 'A: ' + lv + '/' + loc;
  ok(R.length === 10 && R.length >= 7, tag + ' has 10 rounds');
  R.forEach((r, i) => { const [d, h, m] = OWN[lv][i]; ok(r.dir === d && r.h24 === h && r.m === m && r.t === h * 60 + m, tag + ' #' + (i + 1) + ' ' + d + ' ' + h + ':' + m + ' (design table)'); });
  ok(R.filter((r) => r.dir === 'to24').length === 5, tag + ' five rounds each way');
  ok(OWN[lv].filter(([, h]) => h < 12).length === 3, tag + ' three morning answers (midnight counted)');
  R.filter((r) => r.dir === 'to12').forEach((r) => ok(r.accepted.length >= 1 && r.accepted.every((k) => OWN_CHIPS[loc][k].includes(r.h24)), tag + ' ' + r.h24 + ':' + r.m + ' accepts {' + r.accepted + '} — every one names that hour (own table)'));
}
const all = OWN[1].concat(OWN[2]).map(([, h, m]) => h + ':' + m);
OLD.forEach((t) => ok(all.includes(t), 'A: the old time ' + t + ' is kept'));
ok(OWN[2].filter(([, , m]) => m === 0).length === 2, 'A: level 2 has only two :00 times (noon and midnight)');
LOCALES.forEach((l) => Object.entries(OWN_CHIPS[l]).forEach(([k, hs]) => ok(hs.every((h) => !hs.includes(h + 12)), 'A: ' + l + ' chip ' + k + ' never means both h and h+12 (no ambiguous reading)')));
LOCALES.forEach((l) => { const own = Object.keys(OWN_CHIPS[l]).sort().join(), got = C.chips(l).map((c) => c.key).sort().join(); ok(own === got, 'A: ' + l + ' chips are the own table (' + got + ')'); C.chips(l).forEach((c) => ok(OWN_CHIPS[l][c.key] && c.hours.slice().sort((a, b) => a - b).join() === OWN_CHIPS[l][c.key].slice().sort((a, b) => a - b).join(), 'A: ' + l + ' chip ' + c.key + ' means the hours of the own table')); });

/* ---------- B. the pictures ---------- */
[['farm-animals', 'rooster'], ['beach', 'sun']].forEach(([d, k]) => {
  const ix = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'pictures', d + '.json'), 'utf8')), e = ix.nouns && ix.nouns[k];
  ok(!!e && fs.existsSync(path.join(ROOT, e.src.replace(/^\//, ''))), 'B: ' + d + '/' + k + ' is in the picture index and on disk');
  ok(e && LOCALES.every((l) => e.labels[l] && e.labels[l][0]), 'B: ' + d + '/' + k + ' labelled in 11 locales');
});
ok(/THEMES: \['farm-animals', 'beach'\]/.test(SRC), 'B: the activity loads only the rooster and the sun');

/* ---------- C. every answer × round × locale ---------- */
let graded = 0;
const MINS = [0, 5, 15, 20, 30, 35, 40, 45, 50, 59, 60];
for (const lv of ['1', '2']) for (const loc of LOCALES) C.rounds(lv, loc).forEach((r, i) => {
  const parts = r.dir === 'to12' ? Object.keys(OWN_CHIPS[loc]) : [null];
  let wins = 0;
  for (let h = 0; h <= (r.dir === 'to12' ? 13 : 25); h++) for (const m of [...new Set(MINS.concat([r.m]))]) for (const p of parts) {
    const st = C.newState(lv, i, loc); String(h).split('').forEach((d) => C.typeDigit(st, d)); C.focus(st, 'm'); String(m).padStart(2, '0').split('').forEach((d) => C.typeDigit(st, d)); if (p) C.setPart(st, p);
    const res = C.check(st), t = READ(loc, r.dir, String(h), String(m), p); graded++;
    const tag = 'C: ' + lv + '/' + loc + ' ' + r.dir + ' ' + r.h24 + ':' + r.m + ' ← ' + h + ':' + m + (p ? ' ' + p : '');
    if (t === r.t) { wins++; ok(res.result === 'ok', tag + ' is right (own reading)'); continue; }
    ok(res.result === 'miss', tag + ' is a miss');
    let want;
    if (r.t === 0 && r.dir === 'to24' && (h === 24 || h === 12) && m === 0) want = 'midnight';
    else if (r.t === 720 && r.dir === 'to12' && h === 12 && m === 0) want = 'noon';
    else if (r.dir === 'to12' && (h < 1 || h > 12)) want = 'twelve';
    else if (t === null && r.dir === 'to12' && m <= 59) want = 'part';
    else if (t === null) want = 'hour';
    else if ((t >= 720) !== (r.t >= 720)) want = t >= 720 ? 'pastNoon' : 'beforeNoon';
    else if (Math.floor(t / 60) !== r.h24) want = 'hour';
    else want = 'minute';
    ok(res.kind === want, tag + ' is the ' + want + ' miss (' + res.kind + ')');
  }
  ok(wins === (r.dir === 'to12' ? r.accepted.length : 1), 'C: ' + lv + '/' + loc + ' ' + r.h24 + ':' + r.m + ' wins exactly with the right numbers (' + wins + ')');
});
ok(graded > 50000, 'C: graded ' + graded + ' answers');
/* leading zeros: "8" and "08" are the same hour everywhere */
LOCALES.forEach((l) => { const i = C.rounds('1', l).findIndex((r) => r.h24 === 8); for (const w of ['8', '08']) { const st = C.newState('1', i, l); w.split('').forEach((d) => C.typeDigit(st, d)); C.focus(st, 'm'); C.typeDigit(st, '0'); C.typeDigit(st, '0'); ok(C.check(st).result === 'ok', 'C: ' + l + ' "' + w + '" for 08:00 is right'); } });

/* ---------- D. the boxes and the chips ---------- */
{
  const st = C.newState('1', 0, 'en');
  ok(C.check(st).key === 'hintBlank' && st.misses === 0, 'D: an empty answer → "write the hour and the minutes", no miss');
  C.typeDigit(st, '1'); C.typeDigit(st, '5'); ok(st.h === '15' && st.focus === 'm', 'D: two digits fill the hour box and move to the minutes');
  C.typeDigit(st, '3'); C.typeDigit(st, '0'); C.typeDigit(st, '4'); ok(st.m === '4', 'D: a third digit starts the box again');
  C.back(st); C.back(st); ok(st.m === '' && st.h === '1', 'D: delete empties the minutes, then the hour');
  ok(!C.setPart(st, 'pm'), 'D: no chips on a 24-hour answer');
  const s2 = C.newState('1', 1, 'en'); C.typeDigit(s2, '8'); C.focus(s2, 'm'); C.typeDigit(s2, '0'); C.typeDigit(s2, '0');
  ok(C.check(s2).key === 'hintPart' && s2.misses === 0, 'D: a 12-hour answer without its part of the day → "choose the part", no miss');
  C.setPart(s2, 'pm'); C.setPart(s2, 'pm'); ok(s2.part === null, 'D: tapping a chip again clears it');
  C.setPart(s2, 'am'); C.setPart(s2, 'pm'); ok(s2.part === 'pm', 'D: one chip at a time');
  ok(C.check(s2).result === 'ok' && s2.done && !C.typeDigit(s2, '1') && !C.setPart(s2, 'am') && C.check(s2).result === 'no', 'D: right, then locked');
  const s3 = C.newState('1', 0, 'en'); '1700'.split('').forEach((d) => C.typeDigit(s3, d)); C.check(s3); ok(!!s3.verdict && !s3.help, 'D: a miss leaves its verdict');
  C.back(s3); ok(s3.verdict === null, 'D: a new key clears it');
  C.typeDigit(s3, '0'); C.check(s3); ok(s3.help, 'D: the second miss turns the help on');
}

/* ---------- E. the run and the ring ---------- */
for (let t = 0; t < 1440; t += 5) {
  const R = C.run(t), h = Math.floor(t / 60), want = h >= 13 ? span(13, h) : [];
  ok(R.tokens.join() === want.join() && R.tag === h && R.pastNoon === (t >= 720), 'E: the run to ' + h + ':' + (t % 60) + ' drops 13…' + h + ' (none before 13:00)');
  ok(C.keepToken(t) === (t === 0 ? 0 : h >= 13 ? h : null), 'E: a right answer at ' + t + ' keeps ' + (t === 0 ? 0 : h >= 13 ? h : 'nothing'));
}
for (let x = 13; x <= 23; x++) ok(C.socketOf(x) === x - 12, 'E: ' + x + ' sits under the ' + (x - 12));
ok(C.socketOf(0) === 12, 'E: 0 sits under the 12');
const kept = (lv) => C.rounds(lv, 'en').map((r) => C.keepToken(r.t)).filter((x) => x !== null).sort((a, b) => a - b).join();
ok(kept('1') === '14,15,18,19,20,21,23' && kept('2') === '0,13,14,16,17,22,23', 'E: one pass keeps {14,15,18–21,23} (L1) and {0,13,14,16,17,22,23} (L2): neither fills the ring alone');

/* ---------- F. the bots ---------- */
for (const lv of ['1', '2']) {
  const R = C.rounds(lv, 'en');
  const play = (fn) => R.filter((r, i) => { const st = C.newState(lv, i, 'en'), [h, part] = fn(r); String(h).split('').forEach((d) => C.typeDigit(st, d)); C.focus(st, 'm'); String(r.m).padStart(2, '0').split('').forEach((d) => C.typeDigit(st, d)); if (part) C.setPart(st, part); return C.check(st).result === 'ok'; }).length;
  const h12 = (r) => r.h24 % 12 || 12;
  const add12 = play((r) => r.dir === 'to24' ? [h12(r) + 12, null] : [r.h24 - 12 > 0 ? r.h24 - 12 : 1, 'pm']);
  const never = play((r) => r.dir === 'to24' ? [h12(r), null] : [r.h24, r.h24 < 12 ? 'am' : 'pm']);
  ok(10 - add12 >= 3, 'F: ' + lv + ' "always 12 more / 12 less" fails ' + (10 - add12) + ' rounds (≥ 3)');
  ok(10 - never >= 6, 'F: ' + lv + ' "never change the hour" fails ' + (10 - never) + ' rounds (≥ 6)');
  ok(play(() => [0, 'am']) === R.filter((r) => r.t === 0).length, 'F: ' + lv + ' writing 0 o\'clock wins only the midnight round');
}

/* ---------- G. the plan ---------- */
for (const lv of ['1', '2']) {
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0, runs = 0; const seen = new Set();
  for (let p = 0; p < 300; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === '0,1,2,3,4,5,6,7,8,9', 'G: ' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; for (let i = 2; i < o.length; i++) if (OWN[lv][o[i]][0] === OWN[lv][o[i - 1]][0] && OWN[lv][o[i]][0] === OWN[lv][o[i - 2]][0]) runs++; seen.add(o.join()); prev = o; }
  ok(same === 0, 'G: ' + lv + ' never repeats the previous order');
  ok(runs === 0, 'G: ' + lv + ' never three rounds of one direction in a row');
  ok(seen.size > 100, 'G: ' + lv + ' orders really shuffle (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11, the printed forms, reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'SecondRingCore', SRC.replace(/injectSecondRingCSS\(\);/, '') + ';window.X=SecondRingActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
ok(keys.length >= 35, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
['hintBlank', 'hintPart', 'hintPartFit', 'hintPastNoon', 'hintBeforeNoon', 'hintHour', 'hintMinute', 'hintHelpAm', 'hintHelpPm', 'hintNoon'].forEach((k) => LOCALES.forEach((l) => ok(!/\{/.test(STR[k][l]) && !/\d{1,2}[:.]\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' names no time')));
LOCALES.forEach((l) => { ok(/12 \+ \{h12\} = \{h24\}/.test(STR.ok_to24[l]), 'H: ' + l + ' ok_to24 shows 12 + the hour'); ok(/\{h24\} − 12 = \{h12\}/.test(STR.ok_to12[l]), 'H: ' + l + ' ok_to12 shows the hour − 12 with U+2212'); ['ok_am', 'ok_noon', 'ok_midnight', 'ok_to24', 'ok_to12'].forEach((k) => ok(/\{open\}/.test(STR[k][l]) && /\{ans\}/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' names both forms')); });
/* the printed forms: the own expectation per locale */
const F24 = { en: '08:00', de: '08:00', es: '08:00', pt: '08:00', it: '08:00', fr: '8 h 00', nl: '08.00', sv: '08.00', da: '08.00', no: '08.00', fi: '8.00' };
LOCALES.forEach((l) => ok(C.fmt24(l, 8, 0) === F24[l], 'H: ' + l + ' writes 8 in the morning as "' + F24[l] + '"'));
LOCALES.forEach((l) => { ok(C.fmt12(l, 15, 0).indexOf('3') === 0 && !/15/.test(C.fmt12(l, 15, 0)), 'H: ' + l + ' writes 15:00 the 12-hour way with a 3'); ok(C.fmt12(l, 12, 0) !== C.fmt12(l, 0, 0), 'H: ' + l + ' tells noon from midnight'); });
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
{ const s = C.newState('1', 0, 'en'); '1505'.split('').forEach((d) => C.typeDigit(s, d)); C.check(s); C.back(s); C.typeDigit(s, '5'); C.check(s); ok(s.help && C.hint(s) === 'hintMinute', 'I: a second minutes-only miss keeps the minutes hint (the hour was right)'); }
ok(/vk !== 'minute' && !v\.anim \? r\.h24 : null;/.test(ACT_BODY), 'I: a minutes-only miss never shows the hour help on the ring');
ok(/var run = helpH !== null \? null : this\._runAt\(\);/.test(ACT_BODY), 'I: the run shown is the CHILD\'s time (or, on miss 2, the given time\'s run)');
ok(/if \(st\.verdict && st\.verdict\.t !== null\) return st\.verdict\.t;/.test(ACT_BODY) && /if \(st\.done\) return st\.round\.t;/.test(ACT_BODY), 'I: a miss runs the clock to the CHILD\'s written time (the outlines keep the given one)');
ok(/outline = run !== null;/.test(ACT_BODY) && /is-outline/.test(ACT_BODY), 'I: once a run is shown the given time stays as dashed outlines');
ok(/if \(outline\) \{[\s\S]{0,400}sr-tag/.test(ACT_BODY), 'I: the tag appears only with a run (at rest it would give the 24-hour answer away)');
ok(/&& \(!st\.done \|\| token === keep\)/.test(ACT_BODY), 'I: after success only the kept token stays');
ok(/var kt = C\.keepToken\(r\.t\);/.test(ACT_BODY) && /this\._ring\.push\(kt\)/.test(ACT_BODY), 'I: the ring keeps a token only on success');
ok(/if \(token === helpH\) \{ val = '\?'; cls = ' is-ask'; \}/.test(ACT_BODY), 'I: miss 2 turns the last token face-down');
ok(/SecondRingCore\.newState\(this\._level\(\), k, this\._loc\(\)\);\s*\n\s*if \(this\._setting\('ring'\) === 'empty'\) this\._ring = \[\];/.test(ACT_BODY), 'I: a new round empties the ring only when the setting says "empties every round"');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'clock-convert.12-24.2-md-c-7');
ok(row && row.tool === 'second-ring-activity' && row.task_template === 'second-ring', 'J: the row points at the second ring');
ok(row && row.alignment.code === '2.MD.C.7', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');

console.log(`verify-second-ring-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

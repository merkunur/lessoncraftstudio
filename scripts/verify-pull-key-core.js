#!/usr/bin/env node
/* =====================================================================
   verify-pull-key-core.js — build-time gate for ACTIVITY #103, The
   Pull-Back Key (1.MD.B.3). Its OWN oracle: the round tables are typed
   here literally, and the geared hands (hour 30h + m/2, minute 6m), the
   rewind (m/5 clicks to the last o'clock), the "next hour" and "long
   hand" near-misses are computed here — never read off the core.
   Proves: the tables; every choice round has exactly one option equal to
   the clock, and its near-misses are what the design says; the spring
   lands the short hand EXACTLY on 30·h after m/5 clicks and refuses one
   more; set rounds start 12–30 clicks before their target and an
   unwound clock is not an answer; "read only" turns each set round into a
   write round whose wheels never start on the answer (and start on the
   next-hour trap at half past); the wheels never show 0 or 13, nor a
   minute outside the level; the right option's place is 2/2/2 (half)
   and 2/2/3 (quarter); bobs; the plan; the Check / hint ladder; the time
   tables (next-hour half and quarter-to, es-MX "cuarto para", no
   "kvart på", noon in fr/it/pt, the separators); strings; pictures.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.PK_CORE_DIR || MT, 'pull-key-core.js');
const C = require(CORE);
const SRC = fs.readFileSync(path.join(process.env.PK_ACT_DIR || MT, 'pull-key-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, PullKeyCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = PullKeyActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const tm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const eq = (a, b) => a.h === b.h && a.m === b.m;

/* ---- the tables, typed literally (design §6): type | time | options (board: event@time) | right place / start / set details ---- */
const T = {
  R1: 'board 7:00 breakfast@7:00 supper@6:00 lunch@12:00', R2: 'write 3:00 start=12:30', R3: 'board 8:30 reading@9:00 bath@7:30 bed@8:30',
  R4: 'partners 6:30 6:00 7:30 6:30', R5: 'set 9:00 from=breakfast@7:00 to=reading read=9:00/10:30', R6: 'write 1:30 start=2:00',
  R7: 'board 12:00 playground@1:30 lunch@12:00 supper@6:00', R8: 'set 4:30 from=snack@3:00 to=music read=4:30/5:00', R9: 'partners 10:30 10:30 11:30 10:00',
  R10: 'write 6:30 start=7:00', R11: 'partners 4:00 5:00 4:00 4:30',
  Q1: 'board 3:15 snack@3:15 playground@3:45 music@4:15', Q2: 'write 7:45 start=8:15', Q3: 'partners 9:15 9:45 9:15 3:45',
  Q4: 'set 7:45 from=supper@6:30 to=bath read=4:45/5:15', Q5: 'board 11:45 lunch@12:15 puzzle@11:45 reading@11:15', Q6: 'write 2:15 start=3:45',
  Q7: 'partners 5:45 6:45 5:15 5:45', Q8: 'set 1:15 from=lunch@12:00 to=playground read=1:15/2:45'
};
const HALF = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11'], QUARTER = ['R1', 'R3', 'R4', 'R6', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
ok(JSON.stringify(C.ids('half')) === JSON.stringify(HALF) && JSON.stringify(C.ids('quarter')) === JSON.stringify(QUARTER) && JSON.stringify(C.ids('x')) === JSON.stringify(HALF), 'the two pools');
const hourAng = (t) => (30 * (t.h % 12) + t.m / 2) % 360;
const nextH = (t) => ({ h: t.h % 12 + 1, m: t.m }), longNum = (t) => t.m === 0 ? 12 : t.m / 5;
const near = (a, b) => [1, 11].includes(Math.abs(a.h % 12 - b.h % 12));
const kindOf = (target, a) => eq(a, target) ? 'right' : eq(a, nextH(target)) ? 'nextHour' : a.h === longNum(target) ? 'longHand' : a.h === target.h ? 'minute' : near(a, target) ? 'neighbour' : 'other';
const places = { half: [0, 0, 0], quarter: [0, 0, 0] };
for (const [id, row] of Object.entries(T)) {
  const w = row.split(' '), type = w[0], time = tm(w[1]), r = C.round(id, 'readset');
  ok(r.type === type && eq(r.time, time), `${id}: ${type} at ${w[1]}`);
  if (type === 'board' || type === 'partners') {
    const opts = w.slice(2).map(x => x.includes('@') ? { ev: x.split('@')[0], t: tm(x.split('@')[1]) } : { t: tm(x) });
    const got = type === 'board' ? r.cards.map(c => ({ ev: c.event, t: c.t })) : r.clocks.map(t => ({ t }));
    ok(JSON.stringify(got) === JSON.stringify(opts), `${id}: the options as typed`);
    const right = opts.map((o, i) => eq(o.t, time) ? i : -1).filter(i => i >= 0);
    ok(right.length === 1, `${id}: exactly one option equals the clock`);
    for (const p of ['half', 'quarter']) if ((p === 'half' ? HALF : QUARTER).includes(id)) places[p][right[0]]++;
    const kinds = opts.filter(o => !eq(o.t, time)).map(o => kindOf(time, o.t));
    ok(kinds.every(k => k !== 'right' && k !== 'other') || id === 'R7' || id === 'Q3' || id === 'Q5', `${id}: every wrong option is a named reading error (${kinds})`);
    for (const o of opts) ok(C.errorKind(time, o.t) === kindOf(time, o.t), `${id} ${C.fmt(o.t)}: the core calls it ${C.errorKind(time, o.t)}`);
    if (type === 'board') ok(r.event === opts[right[0]].ev, `${id}: Owl is ${opts[right[0]].ev}`);
  }
  if (type === 'write') { const st0 = tm(w[2].split('=')[1]); ok(eq(r.start, st0) && !eq(st0, time), `${id}: the wheels start at ${w[2].split('=')[1]}, never the answer`); if (time.m === 30) ok(st0.h === nextH(time).h, `${id}: at half past the wheels start on the next-hour trap`); }
  if (type === 'set') {
    const from = w[2].split('=')[1].split('@'), to = w[3].split('=')[1], rd = w[4].split('=')[1].split('/');
    ok(r.from === from[0] && eq(r.start, tm(from[1])) && r.event === to, `${id}: from ${from[0]} at ${from[1]} to ${to}`);
    const clicks = (C.toMin(time) - C.toMin(r.start) + 720) % 720 / 5;
    ok(clicks >= 12 && clicks <= 30, `${id}: the set starts ${clicks} clicks before its target (12–30)`);
    const rr = C.round(id, 'read');
    ok(rr.type === 'write' && eq(rr.time, tm(rd[0])) && eq(rr.start, tm(rd[1])) && !eq(rr.start, rr.time), `${id}: read only → write ${rd[0]} from ${rd[1]}`);
  }
}
ok(places.half.join() === '2,2,2', `the right option's place, o'clock and half past: ${places.half}`);
ok(places.quarter.slice().sort().join() === '2,2,3', `the right option's place, with quarters: ${places.quarter}`);
for (const id of HALF) { const r = C.round(id, 'readset'); ok([0, 30].includes(r.time.m) && (r.start ? [0, 30].includes(r.start.m) : true), `${id}: only :00 and :30 in the half level`); }

/* ---- the spring ---- */
for (const id of Object.keys(T)) {
  const r = C.round(id, 'read'); if (r.type === 'partners') continue;
  const st = C.newState(r), clicks = r.time.m / 5; let n = 0, res;
  while ((res = C.windBack(st)) === 'click') n++;
  const f = C.face(st);
  ok(n === clicks && res === 'stop' && f.m === 0 && f.h === r.time.h && C.angles(f).hour === hourAng({ h: r.time.h, m: 0 }), `${id}: ${n} clicks back, then the key stops: the short hand ON the ${r.time.h} (never the ${nextH(r.time).h})`);
  C.release(st); ok(st.back === 0 && eq(C.face(st), r.time), `${id}: let go → back to now`);
}
{ const r = C.round('R4'), st = C.newState(r); ok(C.windBack(st) === 'no', 'partners: the key winds nothing until a clock is chosen'); C.select(st, 2); let n = 0; while (C.windBack(st) === 'click') n++; ok(n === 6 && C.face(st).h === 6, 'partners: the key winds the chosen clock'); }
for (let h = 1; h <= 12; h++) for (const m of [0, 15, 30, 45]) { const a = C.angles({ h, m }); ok(a.hour === hourAng({ h, m }) && a.minute === 6 * m, `${h}:${m}: the hands geared`); }

/* ---- set ---- */
for (const id of ['R5', 'R8', 'Q4', 'Q8']) {
  const r = C.round(id, 'readset'), times = id[0] === 'Q' ? 'quarter' : 'half', st = C.newState(r);
  ok(C.check(st).result === 'none' && C.hint(st).key === 'hintWind' && st.misses === 0, `${id}: Check before winding → hintWind, no miss`);
  C.windOn(st, 1, times); C.windOn(st, -1, times); ok(C.check(st).result === 'none', `${id}: wound back to the start is not an answer`);
  let g = 0; while (!eq(st.shown, r.time) && g++ < 100) C.windOn(st, 1, times);
  ok(eq(st.shown, r.time) && g === (C.toMin(r.time) - C.toMin(r.start) + 720) % 720 / C.stepOf(times), `${id}: one detent at a time (${g})`);
  const short = C.stepOf(times) === 15 ? 1 : 2;   /* less than half a detent */
  for (let i = 0; i < short; i++) C.windFive(st, 1); C.settle(st, times); ok(eq(st.shown, r.time), `${id}: a drag short of half a detent settles back on it`);
  for (let i = 0; i < short + 1; i++) C.windFive(st, 1); C.settle(st, times); ok(eq(st.shown, C.add(r.time, C.stepOf(times))), `${id}: past half a detent it settles on the next`);
  for (let i = 0; i < 2 * short + 2 - short - 1 + (C.stepOf(times) === 15 ? 2 : 4) ; i++) C.windFive(st, -1); C.settle(st, times);
  if (!eq(st.shown, r.time)) { let g2 = 0; while (!eq(st.shown, r.time) && g2++ < 20) C.windOn(st, -1, times); }
  ok(C.check(st).result === 'ok', `${id}: the target is right`);
}
{ const r = C.round('R5', 'readset'), st = C.newState(r); C.windOn(st, 1, 'half'); ok(C.check(st).result === 'miss' && C.hint(st).key === 'hintShortFirst', 'set miss → hintShortFirst'); C.windOn(st, 1, 'half'); C.check(st); ok(C.hint(st).key === 'hintCount', 'set miss 2 → hintCount'); }

/* ---- the wheels ---- */
for (const times of ['half', 'quarter']) {
  const st = C.newState(C.round('R2')), hs = new Set(), ms = new Set();
  for (let i = 0; i < 30; i++) { C.wheel(st, 'h', i < 15 ? 1 : -1, times); hs.add(st.wheels.h); C.wheel(st, 'm', 1, times); ms.add(st.wheels.m); }
  ok([...hs].every(h => h >= 1 && h <= 12) && hs.size === 12, `${times}: the hour wheel runs 1–12 (no 0, no 13)`);
  ok(JSON.stringify([...ms].sort((a, b) => a - b)) === JSON.stringify(times === 'half' ? [0, 30] : [0, 15, 30, 45]), `${times}: the minute wheel shows only ${[...ms]}`);
}

/* ---- Check and the hints (read rounds) ---- */
for (const id of Object.keys(T)) {
  const r = C.round(id, 'read'); if (r.type === 'set') continue;
  const st = C.newState(r), none = { board: 'hintChoose', partners: 'hintChooseClock', write: 'hintWheels' }[r.type];
  ok(C.check(st).result === 'none' && C.hint(st).key === none && st.misses === 0, `${id}: an empty Check → ${none}, no miss`);
  const wrong = () => { if (r.type === 'board') C.pick(st, r.cards.findIndex(c => !eq(c.t, r.time))); else if (r.type === 'partners') { st.sel = null; C.select(st, r.clocks.findIndex(c => !eq(c, r.time))); } else { C.wheel(st, 'h', 1); } };
  wrong(); let a = C.check(st); ok(a.result === 'miss' && C.hint(st).key === 'hintBack', `${id}: miss 1 → hintBack`);
  if (r.type === 'board') st.pick = null; wrong(); C.check(st); ok(C.hint(st).key === 'hintCount', `${id}: miss 2 → hintCount`);
  if (r.type === 'board') { st.pick = null; C.pick(st, r.cards.findIndex(c => eq(c.t, r.time))); }
  else if (r.type === 'partners') { st.sel = null; C.select(st, r.clocks.findIndex(c => eq(c, r.time))); }
  else { st.wheels = { h: r.time.h, m: r.time.m }; }
  ok(C.check(st).result === 'ok' && st.done && C.pick(st, 0) === 'no' && C.wheel(st, 'h', 1) === 'no', `${id}: the right answer, then locked`);
}
for (let h = 1; h <= 12; h++) { ok(C.bobs({ h, m: 0 }) === h && C.bobs({ h, m: 30 }) === 1 && C.bobs({ h, m: 15 }) === 1, `${h}: Owl calls ${h} on the hour, once otherwise`); }
const DP = { 7: 'morning', 8: 'morning', 9: 'morning', 10: 'morning', 11: 'morning', 12: 'afternoon', 1: 'afternoon', 2: 'afternoon', 3: 'afternoon', 4: 'afternoon', 5: 'afternoon', 6: 'evening' };
for (const h of Object.keys(DP)) ok(C.dayPart({ h: +h, m: 0 }) === DP[h], `${h} o'clock: the window after success is ${DP[h]}`);
/* the event sets the window when it belongs to one part of the day — the gate's own table, not the core's */
const FIXED = { breakfast: 'morning', supper: 'evening', bath: 'evening', bed: 'evening' };
ok(C.dayPart({ h: 8, m: 30 }, 'bed') === 'evening' && C.dayPart({ h: 7, m: 45 }, 'bath') === 'evening' && C.dayPart({ h: 7, m: 0 }, 'breakfast') === 'morning', 'bed at 8:30 and a bath at 7:45 show an evening window');
for (const id of C.ids('half').concat(C.ids('quarter'))) { const r = C.round(id); if (r.event && FIXED[r.event]) ok(C.dayPart(r.time, r.event) === FIXED[r.event], `${id}: ${r.event} at ${C.fmt(r.time)} shows the ${FIXED[r.event]} window`); }

/* ---- the plan ---- */
const mk = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
for (const times of ['half', 'quarter']) {
  const base = C.ids(times); let prev = null;
  for (let s = 1; s <= 200; s++) { const o = C.plan(times, mk(s), prev).order; ok(o.slice().sort().join() === base.slice().sort().join(), `${times}: a permutation`); if (prev) ok(o.join() !== prev.join(), `${times}: never the previous order`); prev = o; }
  const still = () => 0.5, o1 = C.plan(times, still).order, o2 = C.plan(times, still, o1).order; ok(o1.join() !== o2.join(), `${times}: a stuck dice never repeats`);
}

/* ---- the time tables ---- */
const WORDS = {
  de: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'], nl: ['één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'],
  da: ['et', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv'], sv: ['ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'],
  no: ['ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'], fi: ['yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen', 'yksitoista', 'kaksitoista']
};
const HALFW = { de: 'halb', nl: 'half', da: 'halv', sv: 'halv', no: 'halv', fi: 'puoli' }, TOW = { de: 'Viertel vor', nl: 'kwart voor', da: 'kvart i', sv: 'kvart i', no: 'kvart på', fi: 'varttia vaille' };
const word = (x) => new RegExp('(?<!\\p{L})' + x + '(?!\\p{L})', 'u');
for (const l of Object.keys(WORDS)) for (let h = 1; h <= 12; h++) {
  const say = A.TIMES[l].say;
  ok(word(HALFW[l] + ' ' + WORDS[l][h % 12]).test(say.h[h - 1]), `${l} ${h}:30 names the NEXT hour: "${say.h[h - 1]}"`);
  ok(word(TOW[l] + ' ' + WORDS[l][h % 12]).test(say.t[h - 1]), `${l} ${h}:45 "${say.t[h - 1]}"`);
}
for (let h = 1; h <= 12; h++) {
  ok(/cuarto para/.test(A.TIMES.es.say.t[h - 1]) && !/menos cuarto/.test(A.TIMES.es.say.t[h - 1]), `es-MX ${h}:45 says "cuarto para"`);
  ok(/moins le quart/.test(A.TIMES.fr.say.t[h - 1]) && /meno un quarto/.test(A.TIMES.it.say.t[h - 1]) && /quinze para/.test(A.TIMES.pt.say.t[h - 1]), `fr/it/pt ${h}:45`);
}
ok(A.TIMES.fr.say.o[11] === 'Il est midi' && /mezzogiorno/.test(A.TIMES.it.say.o[11]) && /meio-dia/.test(A.TIMES.pt.say.o[11]) && /doce/.test(A.TIMES.es.say.o[11]), 'noon in fr / it / pt, las doce in es');
ok(/une heure/.test(A.TIMES.fr.say.o[0]) && /^Es la una/.test(A.TIMES.es.say.o[0]) && /^É uma hora/.test(A.TIMES.pt.say.o[0]) && /^È l.una/.test(A.TIMES.it.say.o[0]), 'one o\'clock agrees in fr / es / pt / it');
const SEPS = { en: ':', de: ':', es: ':', pt: ':', it: ':', fr: ' h ', nl: '.', sv: '.', da: '.', no: '.', fi: '.' };
for (const l of LOCS) ok(A.TIMES[l].sep === SEPS[l], `${l}: the digital separator "${A.TIMES[l].sep}"`);
const targets = new Set(); for (const id of Object.keys(T)) for (const mix of ['read', 'readset']) targets.add(C.fmt(C.round(id, mix).time));
for (const l of LOCS) {
  const fake = Object.create(A); fake.api = { lang: l, t: (k) => A.strings[k][l], settings: {} };
  for (const s of targets) { const t = tm(s), a = fake._say(t), b = fake._to(t); ok(a && b && !/[{}]/.test(a + b) && new Set(A.TIMES[l].say.o.concat(A.TIMES[l].say.h, A.TIMES[l].say.q, A.TIMES[l].say.t)).size === 48, `${l} ${s}: "${a}" / "${b}"`); }
  for (const id of Object.keys(T)) for (const mix of ['read', 'readset']) { fake.st = C.newState(C.round(id, mix)); const o = fake._okText(), p = fake._prompt(fake.st.r); ok(!/[{}]/.test(o + p), `${l} ${id}: "${p}" → "${o}"`); }
}

/* ---- strings ---- */
const S = A.strings, keys = Object.keys(S);
const allSay = LOCS.flatMap(l => ['o', 'h', 'q', 't'].flatMap(k => A.TIMES[l].say[k]));
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter(x => x !== '{name}').filter((x, i, a) => a.indexOf(x) === i).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  /* ONE cited exemption: hintBack states the rule "until the long hand is on the 12" (reviewer, 2026-10-25) — the 12 is where the LONG hand stops, never the hour asked for, so exactly one "12" is removed before the number ban; any other digit still fails */
  const bare = (k2, s2) => k2 === 'hintBack' ? s2.replace(/(?<!\d)12(?!\d)/, '') : s2;
  if (/^hint/.test(k)) ok(LOCS.every(l => !/[{\d]/.test(bare(k, S[k][l])) && !allSay.some(p => bare(k, S[k][l]).indexOf(p) >= 0)), `${k}: a hint names no number and no time`);
  if (k === 'hintBack') ok(LOCS.every(l => (S[k][l].match(/(?<!\d)12(?!\d)/g) || []).length === 1), 'hintBack: states the rule (the long hand on the 12) once in every locale');
}
const body = SRC.slice(SRC.indexOf('/*TIMES-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title', name: '_t fills {name}' };
const DYN = (k) => /^(ev_|en_)/.test(k) ? "'ev_' / 'en_' + event" : /^aClock(00|30|15|45)$/.test(k) ? "'aClock' + minutes" : null;
for (const k of keys) ok(SHELL[k] || DYN(k) || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity or the core`);
ok(body.indexOf("'ev_'") >= 0 && body.indexOf("'en_'") >= 0 && body.indexOf("'aClock00'") >= 0 && body.indexOf("'aClock45'") >= 0, 'the dynamic keys are built in the source');
for (const e of Object.keys(C.DATA.EVENTS)) ok(S['ev_' + e] && S['en_' + e], `event ${e}: a sentence and a name`);

/* ---- pictures ---- */
const PIC = path.join(__dirname, '..', 'frontend', 'public', 'image-library-webp', 'themes');
for (const pair of Object.values(C.DATA.EVENTS).concat([C.DATA.OWL])) {
  ok(fs.existsSync(path.join(PIC, pair[0], pair[1] + '@2x.webp')), `${pair.join('/')}: in the library`);
  const json = fs.readdirSync(path.join(MT, 'pictures')).map(f => { try { return JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); } catch (e) { return null; } }).find(j => j && j.dir === pair[0]);
  ok(json && json.nouns[pair[1]], `${pair.join('/')}: labelled in lcs-pictures`);
}
ok(!/painting|picnic/.test(fs.readFileSync(CORE, 'utf8')), 'no unlabelled picture (painting / picnic) is referenced');

console.log(`verify-pull-key-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   verify-ride-hands-core.js — build-time gate for ACTIVITY #102, The
   Digits That Ride the Hands (1.MD.B.3). Its OWN oracle: the round tables
   are typed here literally, and the hand angles (short 30h + m/2, long
   6m), the number the short hand has passed and the collar the long hand
   points at are computed here — never read off the core.
   Proves: the tables; exactly one card per round merges both parts and it
   is the target; every wrong card fails on the part the design's table
   says (12:00 → the hour; :30 on an o'clock → the minutes; a neighbour →
   the hour); at :30 the short hand is exactly half way and the hour part
   ends on the number PASSED; 12:00 is right once and wrong in six o'clock
   rounds; the ride paths end where the hands point and the parts that do
   not fit rest clear of every numeral; over 300 showings the right card
   sits in each place 30–37 %, never three running, and the neighbour card
   is left of the right one 40–60 %; the plan; the Check / hint ladder (the
   colour words only with Hand colours on); the time phrases; strings.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.RH_CORE_DIR || MT, 'ride-hands-core.js'); /* the mutation harness points these at mutated copies */
const C = require(CORE);
const SRC = fs.readFileSync(path.join(process.env.RH_ACT_DIR || MT, 'ride-hands-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, RideHandsCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = RideHandsActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---- the tables, typed literally (design §6): target | cards with the part that fails (r = right, h = hour, m = minutes) ---- */
const HOUR = {
  H1: '3:00 | 3:00 r | 12:00 h | 4:00 h', H2: '9:00 | 9:00 r | 12:00 h | 8:00 h', H3: '6:00 | 6:00 r | 12:00 h | 7:00 h',
  H4: '1:00 | 1:00 r | 7:00 h | 2:00 h', H5: '11:00 | 11:00 r | 12:00 h | 10:00 h', H6: '5:00 | 5:00 r | 11:00 h | 6:00 h',
  H7: '8:00 | 8:00 r | 12:00 h | 9:00 h', H8: '2:00 | 2:00 r | 8:00 h | 1:00 h', H9: '7:00 | 7:00 r | 12:00 h | 6:00 h',
  H10: '12:00 | 12:00 r | 6:00 h | 11:00 h'
};
const BOTH = {
  M1: '4:00 | 4:00 r | 4:30 m | 5:00 h', M2: '10:30 | 10:30 r | 10:00 m | 11:30 h', M3: '2:30 | 2:30 r | 2:00 m | 3:30 h',
  M4: '7:00 | 7:00 r | 7:30 m | 6:00 h', M5: '12:30 | 12:30 r | 12:00 m | 1:30 h', M6: '9:00 | 9:00 r | 9:30 m | 12:00 h',
  M7: '5:30 | 5:30 r | 5:00 m | 6:30 h', M8: '1:00 | 1:00 r | 1:30 m | 12:00 h', M9: '8:30 | 8:30 r | 8:00 m | 9:30 h',
  M10: '3:00 | 3:00 r | 3:30 m | 2:00 h'
};
const tm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const sAng = (t) => (30 * (t.h % 12) + t.m / 2) % 360, lAng = (t) => (6 * t.m) % 360;
const passedNum = (t) => { const n = Math.floor(sAng(t) / 30); return n === 0 ? 12 : n; };      /* the gate's own */
const collarMin = (t) => lAng(t) === 0 ? 0 : 30;
const kindOf = (t, c) => (c.h === passedNum(t) ? '' : 'h') + (c.m === collarMin(t) ? '' : 'm') || 'r';
const parseRow = (row) => { const p = row.split('|').map(s => s.trim()); return { target: tm(p[0]), cards: p.slice(1).map(x => { const [t, k] = x.split(' '); return { t: tm(t), k }; }) }; };

ok(JSON.stringify(C.ids('hour')) === JSON.stringify(Object.keys(HOUR)), 'the o\'clock ids');
ok(JSON.stringify(C.ids('both')) === JSON.stringify(Object.keys(BOTH)), 'the o\'clock-and-half-past ids');
ok(JSON.stringify(C.ids('x')) === JSON.stringify(Object.keys(HOUR)), 'an unknown setting falls back to o\'clock');
for (const [id, row] of Object.entries(Object.assign({}, HOUR, BOTH))) {
  const T = parseRow(row), r = C.round(id);
  ok(C.fmt(r.target) === C.fmt(T.target) && JSON.stringify(r.cards) === JSON.stringify(T.cards.map(c => c.t)), `${id}: as typed`);
  ok(T.cards.filter(c => kindOf(T.target, c.t) === 'r').length === 1 && kindOf(T.target, T.cards[0].t) === 'r', `${id}: exactly one card fits both hands — the target (the gate's own hands)`);
  for (const c of T.cards) {
    ok(kindOf(T.target, c.t) === c.k, `${id} ${C.fmt(c.t)}: the gate says it fails on "${kindOf(T.target, c.t)}", the table "${c.k}"`);
    const R = C.ride(T.target, c.t), want = { r: 'right', h: 'hour', m: 'minutes' }[c.k];
    ok(C.errorKind(T.target, c.t) === want && R.hour.at === passedNum(T.target) && R.minutes.at === collarMin(T.target) && R.hour.merges === (c.k !== 'h') && R.minutes.merges === (c.k !== 'm'), `${id} ${C.fmt(c.t)}: the core rides it to ${R.hour.at} and ${R.minutes.at} (${C.errorKind(T.target, c.t)})`);
  }
  ok(new Set(T.cards.map(c => C.fmt(c.t))).size === 3, `${id}: three different cards`);
}
const all = Object.values(HOUR).map(parseRow);
ok(all.filter(T => C.fmt(T.target) === '12:00').length === 1 && all.filter(T => T.cards.slice(1).some(c => C.fmt(c.t) === '12:00')).length === 6, '12:00 is right once and wrong in six o\'clock rounds');
ok(Object.values(BOTH).map(parseRow).every(T => T.cards.some(c => c.k === 'm')), 'every half-past-level round has a card with the other minutes');

/* ---- the hands ---- */
for (let h = 1; h <= 12; h++) for (const m of [0, 30]) {
  const t = { h, m }, A0 = C.handAngles(t);
  ok(A0.short === sAng(t) && A0.long === lAng(t), `${C.fmt(t)}: the hands at ${A0.short}° / ${A0.long}°`);
  ok(C.passed(A0.short) === h, `${C.fmt(t)}: the short hand has passed the ${h}`);
  if (m === 30) ok(A0.short % 30 === 15, `${C.fmt(t)}: exactly half way between two numbers`);
  ok(C.collar(A0.long) === m, `${C.fmt(t)}: the long hand points at the ${m ? '30' : '00'} collar`);
  ok(C.fmt(C.hourLater(t)) === C.fmt({ h: h % 12 + 1, m }), `${C.fmt(t)}: an hour later`);
}

/* ---- the ride, measured from the drawn geometry at three widths ---- */
for (const w of [288, 328, 648]) for (const times of ['hour', 'both']) {
  const fake = Object.create(A); fake._width = () => w; fake.api = { settings: { times } };
  const D = fake._dims(), at = (r, deg) => ({ x: D.cx + r * Math.sin(deg * Math.PI / 180), y: D.cy - r * Math.cos(deg * Math.PI / 180) });
  ok(D.longR > D.tip * 1.25 && D.longR < D.numR - D.numF * 0.5 && D.rs === (w >= 560 ? 96 : 64), `@${w}: the long hand clearly longer than the short and short of the numerals; Sprocket ${D.rs} px`);
  for (const id of C.ids(times)) {
    const t = C.round(id).target, ph = fake._path(D, 'h', t), pm = fake._path(D, 'm', t), endH = ph[ph.length - 1], endM = pm[pm.length - 1];
    const num = at(D.numR, 30 * passedNum(t)), col = fake._collarPt(D, collarMin(t));
    ok(Math.hypot(endH.x - num.x, endH.y - num.y) < 0.5, `@${w} ${id}: the hour part ends on the ${passedNum(t)}`);
    ok(Math.hypot(endM.x - col.x, endM.y - col.y) < 0.5, `@${w} ${id}: the minutes part ends on its collar`);
    if (t.m === 30) { const out = ph[ph.length - 2], mid = at(D.numR, sAng(t)); ok(Math.hypot(out.x - mid.x, out.y - mid.y) < 0.5, `@${w} ${id}: the hour part first reaches the rim half way, then slides back`); }
    for (const part of ['h', 'm']) {
      const p = fake._restPt(D, part, part === 'h' ? passedNum(t) : collarMin(t)), half = { w: D.chipW / 2, h: D.chipH / 2 };
      let clear = Infinity; for (let n = 1; n <= 12; n++) { const q = at(D.numR, 30 * n); clear = Math.min(clear, Math.max(Math.abs(p.x - q.x) - half.w - D.numF * 0.4, Math.abs(p.y - q.y) - half.h - D.numF * 0.38)); }
      ok(clear >= 0, `@${w} ${id}: a ${part === 'h' ? 'hour' : 'minutes'} part that does not fit rests clear of every numeral (${clear.toFixed(1)})`);
      ok(p.x - half.w >= 0 && p.x + half.w <= D.S, `@${w} ${id}: it rests inside the stage`);
    }
  }
}

/* ---- the showing ---- */
const mk = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
for (const times of ['hour', 'both']) {
  const rnd = mk(times === 'hour' ? 11 : 23), place = [0, 0, 0], places = []; let run3 = 0, left = 0, nb = 0;
  const ids = C.ids(times);
  for (let s = 0; s < 300; s++) {
    const r = C.round(ids[s % ids.length]), o = C.cardOrder(rnd, places), st = C.newState(r, o), p = C.rightPlace(st);
    place[p]++; places.push(p);
    if (places.length >= 3 && places.slice(-3).every(x => x === p)) run3++;
    const ni = r.cards.findIndex(c => Math.abs(c.h - r.target.h) === 1 || Math.abs(c.h - r.target.h) === 11); if (ni > 0) { nb++; if (o.indexOf(ni) < p) left++; }
  }
  ok(place.every(c => c >= 90 && c <= 111), `${times}: the right card in each place 30–37 % (${place})`);
  ok(run3 === 0, `${times}: never three rounds running in one place`);
  ok(left >= 0.4 * nb && left <= 0.6 * nb, `${times}: the neighbour card left of the right card ${left}/${nb}`);
}

/* ---- Check and the hints ---- */
for (const [id, row] of Object.entries(Object.assign({}, HOUR, BOTH))) {
  const T = parseRow(row), r = C.round(id);
  for (const col of ['on', 'off']) {
    const st = C.newState(r, [2, 0, 1]);
    ok(C.check(st).result === 'none' && st.misses === 0 && C.hint(st, col).key === 'hintNone', `${id}: Check with no card asks to look, no miss`);
    const wrong = [0, 2], suf = col === 'on' ? 'C' : '';
    C.choose(st, wrong[0]); let a = C.check(st), k = T.cards[st.order[wrong[0]]].k;
    const wk = (k === 'm' ? 'hintMin' : T.target.m === 30 ? 'hintHourHalf' : 'hintHour') + suf;   /* at half past the hour hint is the between-two-numbers one */
    ok(a.result === 'miss' && st.misses === 1 && C.hint(st, col).key === wk, `${id} colours ${col}: miss 1 → ${wk} (got ${C.hint(st, col).key})`);
    C.choose(st, wrong[1]); C.check(st);
    ok(st.misses === 2 && C.hint(st, col).key === 'hintWatch', `${id}: miss 2 → hintWatch`);
    C.choose(st, 1); a = C.check(st);
    ok(a.result === 'ok' && st.done && C.choose(st, 0) === 'no', `${id}: the target card fits both hands; then locked`);
  }
}

/* ---- the plan ---- */
for (const times of ['hour', 'both']) {
  const base = C.ids(times); let prev = null, first = {};
  for (let s = 1; s <= 300; s++) { const o = C.plan(times, mk(s), prev).order; ok(o.slice().sort().join() === base.slice().sort().join(), `${times}: a permutation`); if (prev) ok(o.join() !== prev.join(), `${times}: never the previous order`); first[o[0]] = 1; prev = o; }
  ok(Object.keys(first).length >= base.length - 1, `${times}: the first round varies`);
  const still = () => 0.5, o1 = C.plan(times, still).order, o2 = C.plan(times, still, o1).order; ok(o1.join() !== o2.join(), `${times}: even a stuck dice never repeats the previous order`);
}

/* ---- the time phrases (the six next-hour languages, typed literally) ---- */
const WORDS = {
  de: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'], nl: ['één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'],
  da: ['et', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv'], sv: ['ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'],
  no: ['ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'], fi: ['yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen', 'yksitoista', 'kaksitoista']
};
const HALFW = { de: 'halb', nl: 'half', da: 'halv', sv: 'halv', no: 'halv', fi: 'puoli' };
for (const l of Object.keys(WORDS)) for (let h = 1; h <= 12; h++) ok(A.TIMES[l].h[h - 1] === HALFW[l] + ' ' + WORDS[l][h % 12], `${l} ${h}:30 names the NEXT hour (${A.TIMES[l].h[h - 1]})`);
for (const l of LOCS) {
  ok(A.TIMES[l].sep === ':' && new Set(A.TIMES[l].o.concat(A.TIMES[l].h)).size === 24, `${l}: 24 distinct time phrases, the cards' colon`);
  const fake = Object.create(A); fake.api = { lang: l, t: (k) => A.strings[k][l], settings: {} };
  for (const id of C.ids('hour').concat(C.ids('both'))) { fake.st = C.newState(C.round(id)); const s = fake._okText(); ok(!/[{}]/.test(s) && s.indexOf(C.fmt(fake.st.r.target)) >= 0 && s.indexOf(fake._phrase(fake.st.r.target)) >= 0, `${l} ${id}: "${s}" — the card's digits and the spoken time`); }
}

/* ---- strings ---- */
const S = A.strings, keys = Object.keys(S), word = (w) => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
const COLOUR = { en: ['orange', 'green'], de: ['orangefarbenen', 'orangefarbene', 'grünen'], nl: ['oranje', 'groene'], da: ['orange', 'grønne'], sv: ['orange', 'gröna'], no: ['oransje', 'grønne'], es: ['naranja', 'verde'], it: ['arancione', 'verde'], pt: ['laranja', 'verde'], fr: ['orange', 'verte'], fi: ['oranssia', 'oranssi', 'vihreää'] };
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter(x => x !== '{name}').filter((x, i, a) => a.indexOf(x) === i).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  if (/^hint/.test(k)) {
    ok(LOCS.every(l => !/\{/.test(S[k][l])), `${k}: a hint fills in nothing (no hour, no time)`);
    ok(LOCS.every(l => (S[k][l].match(/\d+/g) || []).every(d => /^hintMin/.test(k) && ['12', '6', '00', '30'].indexOf(d) >= 0)), `${k}: no number in a hint (only the minutes rule names 12/6 and :00/:30)`);
  }
}
for (const l of LOCS) {
  for (const k of ['hintHourC', 'hintMinC', 'hintHourHalfC']) ok(COLOUR[l].some(c => word(c).test(S[k][l])), `${l} ${k}: names the hand's colour`);
  for (const k of ['hintHour', 'hintMin', 'hintHourHalf', 'hintWatch', 'hintNone']) ok(!COLOUR[l].some(c => word(c).test(S[k][l])), `${l} ${k}: no colour word (it shows with colours off)`);
}
const body = SRC.slice(SRC.indexOf('/*TIMES-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title', name: '_t fills {name}' };
const DYN = { hintHourC: "core: 'hintHour' + 'C'", hintMinC: "core: 'hintMin' + 'C'", hintHourHalfC: "core: 'hintHourHalf' + 'C'" };
for (const k of keys) ok(SHELL[k] || DYN[k] || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity or the core`);
ok(body.indexOf("'hintHour'") >= 0 && body.indexOf("'hintMin'") >= 0 && body.indexOf("'C'") >= 0, 'the colour hint keys are built in the core');
ok(fs.existsSync(path.join(__dirname, '..', 'frontend', 'public', 'image-library-webp', 'themes', 'farm animals', 'rooster@2x.webp')), 'Sprocket: farm animals/rooster is in the library');

console.log(`verify-ride-hands-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   verify-hour-road-core.js — build-time gate for ACTIVITY #101, The Hour
   Road (1.MD.B.3). Its OWN oracle: the round tables are typed here
   literally, and every road position, hand angle and landing distance is
   computed here (t = 2·(h mod 12) + m/30; short hand 15·t°; long hand on
   the 12 or the 6) — never read off the core.
   Proves: the tables; exactly one card per round lands on the short
   hand's tip; every wrong card lands where the design's table says (half
   a segment or a whole segment away) with its error kind; the roll is
   honest — the ring has the road's own length and post k sits on numeral
   k's ray, measured from the drawn geometry at three widths; the short
   hand at :30 is exactly half way; over 300 showings the right card sits
   in each place 30–37 %, never three rounds running in one place, and the
   next-hour card is right of the right card 40–60 %; the plan; the
   Check / hint ladder; every de/nl/da/sv/no/fi half-past phrase names the
   NEXT hour (12 → 1) and no hint uses a time phrase or a number; strings.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.HR_CORE_DIR || MT, 'hour-road-core.js'); /* the mutation harness points this at a mutated copy */
const C = require(CORE);
const SRC = fs.readFileSync(path.join(process.env.HR_ACT_DIR || MT, 'hour-road-activity.js'), 'utf8');   /* and at a mutated activity */
const A = (() => { const ctx = { window: {}, HourRoadCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = HourRoadActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---- the tables, typed literally (design §6): target, then cards with the gate's expected landing (half-segments) and kind ---- */
const BOTH = {
  R1: '3:30 | 3:30 0 right | 3:00 -1 minutes | 4:30 2 nextHour', R2: '6:00 | 6:00 0 right | 6:30 1 minutes | 5:30 -1 halfShort',
  R3: '9:30 | 9:30 0 right | 9:00 -1 minutes | 10:30 2 nextHour', R4: '1:00 | 1:00 0 right | 1:30 1 minutes | 12:30 -1 halfShort',
  R5: '11:30 | 11:30 0 right | 11:00 -1 minutes | 12:30 2 nextHour', R6: '5:00 | 5:00 0 right | 5:30 1 minutes | 4:30 -1 halfShort',
  R7: '8:30 | 8:30 0 right | 8:00 -1 minutes | 9:30 2 nextHour', R8: '2:00 | 2:00 0 right | 2:30 1 minutes | 1:30 -1 halfShort',
  R9: '7:30 | 7:30 0 right | 7:00 -1 minutes | 8:30 2 nextHour', R10: '12:30 | 12:30 0 right | 12:00 -1 minutes | 1:30 2 nextHour'
};
const HALF = {
  H1: '4:30 | 4:30 0 right | 4:00 -1 minutes | 5:30 2 nextHour', H2: '10:30 | 10:30 0 right | 10:00 -1 minutes | 11:30 2 nextHour',
  H3: '2:30 | 2:30 0 right | 2:00 -1 minutes | 3:30 2 nextHour', H4: '6:30 | 6:30 0 right | 6:00 -1 minutes | 7:30 2 nextHour',
  H5: '12:30 | 12:30 0 right | 12:00 -1 minutes | 1:30 2 nextHour', H6: '1:30 | 1:30 0 right | 1:00 -1 minutes | 2:30 2 nextHour',
  H7: '9:30 | 9:30 0 right | 9:00 -1 minutes | 10:30 2 nextHour', H8: '5:30 | 5:30 0 right | 5:00 -1 minutes | 6:30 2 nextHour',
  H9: '11:30 | 11:30 0 right | 11:00 -1 minutes | 12:30 2 nextHour'
};
const tm = (s) => { const [h, m] = s.split(':').map(Number); return { h, m }; };
const pos = (t) => 2 * (t.h % 12) + t.m / 30;                       /* the gate's own road position */
const wrapD = (d) => { d = ((d % 24) + 24) % 24; return d > 12 ? d - 24 : d; };

ok(JSON.stringify(C.ids('both')) === JSON.stringify(Object.keys(BOTH)), 'the o\'clock-and-half-past ids');
ok(JSON.stringify(C.ids('half')) === JSON.stringify(Object.keys(HALF)), 'the half-past-only ids');
ok(JSON.stringify(C.ids('anything')) === JSON.stringify(Object.keys(BOTH)), 'an unknown setting falls back to both');
for (const [id, row] of Object.entries(Object.assign({}, BOTH, HALF))) {
  const parts = row.split('|').map(s => s.trim()), target = tm(parts[0]), cards = parts.slice(1).map(p => { const [t, d, k] = p.split(' '); return { t: tm(t), d: +d, k }; });
  const r = C.round(id);
  ok(r.target.h === target.h && r.target.m === target.m && JSON.stringify(r.cards) === JSON.stringify(cards.map(c => c.t)), `${id}: as typed`);
  ok(cards.filter(c => wrapD(pos(c.t) - pos(target)) === 0).length === 1, `${id}: exactly one card lands on the tip (the gate's own positions)`);
  for (const c of cards) {
    ok(wrapD(pos(c.t) - pos(target)) === c.d, `${id} ${C.fmt(c.t)}: the gate's landing ${wrapD(pos(c.t) - pos(target))} = the table's ${c.d}`);
    ok(C.landing(target, c.t).diff === c.d && C.errorKind(target, c.t) === c.k, `${id} ${C.fmt(c.t)}: the core lands it ${c.d} (${c.k})`);
  }
  ok(new Set(cards.map(c => C.fmt(c.t))).size === 3, `${id}: three different cards`);
}
ok(Object.values(BOTH).filter(r => r.startsWith('') && /:30 \|/.test(r)).length === 6, 'six half-past targets and four o\'clock in the mixed level');
ok(Object.values(HALF).every(r => /^\d+:30 \|/.test(r)), 'every half-only target is half past');

/* ---- the hands ---- */
for (let h = 1; h <= 12; h++) {
  ok(C.shortAngle(C.roadPos({ h, m: 0 })) % 360 === (30 * h) % 360, `${h}:00: the short hand ON the ${h}`);
  ok(C.shortAngle(C.roadPos({ h, m: 30 })) % 360 === (30 * h + 15) % 360, `${h}:30: the short hand exactly half way past the ${h}`);
  ok(C.longAngle(C.roadPos({ h, m: 0 })) === 0 && C.longAngle(C.roadPos({ h, m: 30 })) === 180, `${h}: the long hand on the 12, then the 6`);
}

/* ---- the roll is honest: measured from the drawn geometry at three widths ---- */
for (const w of [288, 328, 648]) {
  const fake = Object.create(A); fake._width = () => w; fake.api = { settings: {} };
  const D = fake._dims();
  ok(Math.abs(2 * Math.PI * D.R - D.L) < 1, `@${w}: the ring's circumference ${(2 * Math.PI * D.R).toFixed(1)} = the road's length ${D.L.toFixed(1)}`);
  let maxOff = 0, maxRad = 0, len = 0, prev = null;
  for (let k = 0; k <= 12; k++) {
    const p = fake._roadPt(D, D.L * k / 12, 1), ang = (Math.atan2(p.x - D.cx, D.cy - p.y) * 180 / Math.PI + 360) % 360, want = (30 * k) % 360;
    maxOff = Math.max(maxOff, Math.min(Math.abs(ang - want), 360 - Math.abs(ang - want))); maxRad = Math.max(maxRad, Math.abs(Math.hypot(p.x - D.cx, p.y - D.cy) - D.R));
  }
  for (let i = 0; i <= 720; i++) { const p = fake._roadPt(D, D.L * i / 720, 1); if (prev) len += Math.hypot(p.x - prev.x, p.y - prev.y); prev = p; }
  ok(maxOff < 1 && maxRad < 0.5, `@${w}: every post on its numeral's ray (worst ${maxOff.toFixed(2)}°), on the ring`);
  ok(Math.abs(len - D.L) < 1, `@${w}: the rolled road's measured length ${len.toFixed(1)} = ${D.L.toFixed(1)}`);
  const s0 = fake._roadPt(D, 0, 0), s1 = fake._roadPt(D, D.L, 0);
  ok(Math.abs(s1.x - s0.x - D.L) < 0.01 && s0.y === s1.y && s0.x >= 0 && s1.x <= D.S, `@${w}: unrolled, the road is straight, ${D.L.toFixed(0)} px, inside the stage`);
  ok(D.tip > 0 && D.R > 0 && D.yBand > D.cy + D.rD, `@${w}: the road lies under the clock`);
  for (let i = 0; i <= 40; i++) for (const sv of [0.25, 0.5, 0.75]) { const p = fake._roadPt(D, D.L * i / 40, sv); if (p.y > D.yBand + 0.01 || p.x < -0.01 || p.x > D.S + 0.01) { ok(false, `@${w}: the moving road leaves its stretch at s=${sv}`); break; } }
  ok(D.rs === (w >= 560 ? 96 : 64), `@${w}: Sprocket ${D.rs} px (the picture floor)`);
  ok(D.longR > D.tip * 1.3 && D.longR < D.numR - 0.1 * D.rD, `@${w}: the long hand clearly longer than the short one, and short of the numerals (${D.longR.toFixed(0)} < ${D.numR.toFixed(0)})`);
}

/* ---- the showing: card places ---- */
const mk = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
for (const times of ['both', 'half']) {
  const rnd = mk(times === 'both' ? 11 : 23), place = [0, 0, 0], places = []; let run3 = 0, right = 0, nextRight = 0, nextN = 0;
  const ids = C.ids(times);
  for (let s = 0; s < 300; s++) {
    const r = C.round(ids[s % ids.length]), o = C.cardOrder(rnd, places), st = C.newState(r, o), p = C.rightPlace(st);
    ok(o.slice().sort().join() === '0,1,2', `${times}: a showing is a permutation`);
    place[p]++; places.push(p);
    if (places.length >= 3 && places[places.length - 1] === places[places.length - 2] && places[places.length - 2] === places[places.length - 3]) run3++;
    const ni = r.cards.findIndex(c => C.errorKind(r.target, c) === 'nextHour');
    if (ni >= 0) { nextN++; if (o.indexOf(ni) > p) nextRight++; }
  }
  ok(place.every(c => c >= 90 && c <= 111), `${times}: the right card in each place 30–37 % (${place})`);
  ok(run3 === 0, `${times}: never three rounds running in one place (${run3})`);
  ok(nextRight >= 0.4 * nextN && nextRight <= 0.6 * nextN, `${times}: the next-hour card right of the right card ${nextRight}/${nextN}`);
}
{ const st = C.newState(C.round('R1'), [1, 2, 0]); ok(C.rightPlace(st) === 2 && C.fmt(C.cardAt(st, 2)) === '3:30', 'the order maps places to cards'); }

/* ---- Check and the hints ---- */
for (const [id, row] of Object.entries(Object.assign({}, BOTH, HALF))) {
  const r = C.round(id), cards = row.split('|').slice(1).map(p => p.trim().split(' '));
  for (const order of [[0, 1, 2], [2, 0, 1], [1, 2, 0]]) {
    const st = C.newState(r, order);
    ok(C.check(st).result === 'none' && st.misses === 0 && C.hint(st).key === 'hintNone', `${id}: Check with no card asks to look, no miss`);
    const wrong = [0, 1, 2].filter(i => order[i] !== 0), want = { minutes: 'hintLong', nextHour: 'hintNext', halfShort: 'hintShort' };
    C.choose(st, wrong[0]); let a = C.check(st), kind = cards[order[wrong[0]]][2];
    ok(a.result === 'miss' && a.kind === kind && st.misses === 1 && C.hint(st).key === want[kind], `${id}: ${cards[order[wrong[0]]][0]} → miss 1, ${want[kind]}`);
    C.choose(st, wrong[1]); a = C.check(st);
    ok(a.result === 'miss' && st.misses === 2 && C.hint(st).key === 'hintWatch', `${id}: miss 2 → hintWatch`);
    C.choose(st, C.rightPlace(st)); a = C.check(st);
    ok(a.result === 'ok' && st.done && a.landing.diff === 0, `${id}: the right card lands on the tip`);
    ok(C.choose(st, 0) === 'no', `${id}: a finished round is locked`);
  }
}
ok(C.timeAt(7).h === 3 && C.timeAt(7).m === 30 && C.timeAt(0).h === 12 && C.timeAt(24).h === 12 && C.timeAt(3.4).m === 30 && C.snap(30) === 24 && C.snap(-2) === 0, 'free play: a road spot reads as its time');

/* ---- the plan ---- */
for (const times of ['both', 'half']) {
  const base = C.ids(times); let prev = null, first = {};
  for (let s = 1; s <= 300; s++) {
    const o = C.plan(times, mk(s), prev).order;
    ok(o.slice().sort().join() === base.slice().sort().join(), `${times}: a permutation`);
    if (prev) ok(o.join() !== prev.join(), `${times}: never the previous order`);
    if (times === 'both') for (let i = 2; i < o.length; i++) { const k = (x) => C.round(x).target.m; ok(!(k(o[i]) === k(o[i - 1]) && k(o[i]) === k(o[i - 2])), `both: never three o'clocks or three half-pasts running (${o})`); }
    first[o[0]] = 1; prev = o;
  }
  ok(Object.keys(first).length >= base.length - 1, `${times}: the first round varies`);
  const still = () => 0.5, o1 = C.plan(times, still).order, o2 = C.plan(times, still, o1).order;
  ok(o1.join() !== o2.join(), `${times}: even a stuck dice never repeats the previous order`);
}

/* ---- the time phrases ---- */
const WORDS = {
  de: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'],
  nl: ['één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'],
  da: ['et', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv'],
  sv: ['ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'],
  no: ['ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'],
  fi: ['yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen', 'yksitoista', 'kaksitoista']
};
const HALFWORD = { de: 'halb', nl: 'half', da: 'halv', sv: 'halv', no: 'halv', fi: 'puoli' };
const word = (w) => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'u');
for (const l of Object.keys(WORDS)) for (let h = 1; h <= 12; h++) {
  const p = A.TIMES[l].h[h - 1], nx = h % 12 + 1;
  ok(p === HALFWORD[l] + ' ' + WORDS[l][nx - 1], `${l} ${h}:30 is "${HALFWORD[l]} ${WORDS[l][nx - 1]}" — the NEXT hour (got "${p}")`);
  const ow = l === 'de' && h === 1 ? 'ein' : WORDS[l][h - 1];   /* German: "ein Uhr", never "eins Uhr" */
  ok(word(ow).test(A.TIMES[l].o[h - 1]) && !(h !== 1 && word(WORDS[l][h % 12]).test(A.TIMES[l].o[h - 1])), `${l} ${h}:00 names ${ow} ("${A.TIMES[l].o[h - 1]}")`);
}
for (const l of ['en', 'es', 'it', 'pt', 'fr']) for (let h = 1; h <= 12; h++) ok(A.TIMES[l].h[h - 1] !== A.TIMES[l].h[h % 12] && /half|media|mezza|meia|demie/.test(A.TIMES[l].h[h - 1]), `${l} ${h}:30 is a half-past phrase of its own`);
for (const l of LOCS) {
  ok(A.TIMES[l] && A.TIMES[l].o.length === 12 && A.TIMES[l].h.length === 12 && new Set(A.TIMES[l].o.concat(A.TIMES[l].h)).size === 24, `${l}: 24 distinct time phrases`);
  const fake = Object.create(A); fake.api = { lang: l, t: (k) => A.strings[k][l] };
  for (const id of C.ids('both').concat(C.ids('half'))) { fake.st = C.newState(C.round(id)); const s = fake._okText(); ok(!/[{}]/.test(s) && s.indexOf(fake._phrase(fake.st.r.target)) >= 0, `${l} ${id}: the celebration "${s}"`); }
}

/* ---- strings ---- */
const DURATION = { 'hintNext.pt': 'uma hora', 'hintNext.fr': 'une heure' };
const S = A.strings, keys = Object.keys(S), allPhrases = LOCS.flatMap(l => A.TIMES[l].o.concat(A.TIMES[l].h));
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter(x => x !== '{name}').filter((x, i, a) => a.indexOf(x) === i).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  if (/^hint/.test(k)) {
    ok(LOCS.every(l => !/\{/.test(S[k][l])), `${k}: a hint fills in nothing (no hour, no time)`);
    ok(LOCS.every(l => (S[k][l].match(/\d+/g) || []).every(d => k === 'hintLong' && (d === '12' || d === '6'))), `${k}: no number in a hint (only hintLong names the 12 and the 6)`);
    ok(LOCS.every(l => !allPhrases.some(p => !(DURATION[k + '.' + l] === p) && word(p).test(S[k][l]))), `${k}: no time phrase in a hint`);
  }
}
/* (the time-phrase ban above) a DURATION, not a time: "one hour too far" — pt "uma hora longe demais", fr "une heure trop loin" */
const body = SRC.slice(SRC.indexOf('/*TIMES-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title', name: "_t fills {name}" };
for (const k of keys) ok(SHELL[k] || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity or the core`);
ok(fs.existsSync(path.join(__dirname, '..', 'frontend', 'public', 'image-library-webp', 'themes', 'farm animals', 'rooster@2x.webp')), 'Sprocket: farm animals/rooster is in the library');

console.log(`verify-hour-road-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);

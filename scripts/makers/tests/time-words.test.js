#!/usr/bin/env node
/**
 * time-words.test.js — the Telling Time maker's native time words and day order (2026-11-02).
 *   1. lib/time-words.js reproduces the activities' 16 native-verified rows (mini tools/clock-core.js timeExpr) with the
 *      row's own hour form — except the cells the maker's native review decided otherwise (sv / no "klockan / klokka" on a full hour)
 *   2. every five-minute time of a 12-hour face builds in all 11 languages, never empty, never a digit-and-colon key
 *   3. the half-hour idiom: de / nl / sv / da / no / fi "half four" is 3:30 — poison: a frame that says the CURRENT hour
 *      at :30 must fail the check
 *   4. G1-478 My Day on the Clock: every page's moments run in the order of the day (routine.js rank)
 *   5. G2-474 A.M. or P.M.?: half the cards before noon, never a 12:xx time, one right option per card
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const T = require(path.join(WG, 'lib', 'time-words.js'));
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const R = require(path.join(WG, 'data', 'time', 'routine.js'));
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let fails = 0;
const check = (name, ok, got) => { if (!ok) { fails++; console.log('FAIL ' + name + (got !== undefined ? ' — ' + JSON.stringify(got) : '')); } };

// 1. the activities' rows
const src = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-core.js'), 'utf8');
const block = src.match(/timeExpr: \{([\s\S]*?)\n    \},/);
check('the activities\' timeExpr block is found', !!block);
const rows = block ? [...block[1].matchAll(/"(\d+):(\d+)":\s*(\{[^}]*\})/g)].map((x) => ({ h: +x[1], m: +x[2], t: JSON.parse(x[3].replace(/([{,])(\w+):"/g, '$1"$2":"')) })) : [];
check('16 rows', rows.length === 16, rows.length);
// decided otherwise by the maker's native review (the reason is in lib/time-words.js)
const DECIDED = (loc, h, m) => ['sv', 'no'].includes(loc) && m === 0;
let same = 0, decided = 0;
for (const r of rows) for (const [loc, want] of Object.entries(r.t)) {
  const a = T.timeWords(r.h, r.m, loc, { hourForm: 'numeral' }), b = T.timeWords(r.h, r.m, loc, { hourForm: 'word' });
  if (a === want || b === want) same++;
  else if (DECIDED(loc, r.h, r.m)) decided++;
  else check(`${loc} ${r.h}:${String(r.m).padStart(2, '0')} = the activities' "${want}"`, false, b);
}
check(`the 16 rows × 11 are reproduced or decided (${same} + ${decided})`, same + decided === rows.length * 11, same + decided);

// 2. every five-minute time
for (const loc of LOCS) for (let h = 1; h <= 12; h++) for (let m = 0; m < 60; m += 5) {
  for (const form of ['numeral', 'word']) {
    const w = T.timeWords(h, m, loc, { hourForm: form });
    if (!w || /\d+:\d\d/.test(w) || /\{[hn]\}/.test(w)) check(`${loc} ${h}:${m} ${form}`, false, w);
  }
}
check('de 1:00 is "ein Uhr"', T.timeWords(1, 0, 'de', { hourForm: 'word' }) === 'ein Uhr');
check('pt 12:45 is "quinze para a uma"', T.timeWords(12, 45, 'pt', { hourForm: 'word' }) === 'quinze para a uma');
check('es-MX 7:45 says "para"', /para las ocho/.test(T.timeWords(7, 45, 'es')) && !/menos/.test(T.timeWords(7, 45, 'es')));

// 3. the half-hour idiom (and its poison)
const HALF_NEXT = { de: 'halb', nl: 'half', sv: 'halv', da: 'halv', no: 'halv', fi: 'puoli' };
const halfNext = (frames, words, loc) => frames[6].includes('{n}') && !frames[6].includes('{h}');
for (const loc of Object.keys(HALF_NEXT)) {
  check(`${loc} "${HALF_NEXT[loc]}" names the NEXT hour`, halfNext(T.FRAMES[loc], T.NUM_WORDS[loc], loc), T.FRAMES[loc][6]);
  check(`${loc} 3:30 says four`, T.timeWords(3, 30, loc, { hourForm: 'word' }).includes(T.NUM_WORDS[loc][4]), T.timeWords(3, 30, loc, { hourForm: 'word' }));
}
const poison = T.FRAMES.de.slice(); poison[6] = 'halb {h}';
check('poison: "halb {h}" (the current hour) is caught', !halfNext(poison, T.NUM_WORDS.de, 'de'));

// 4. the order of a day on every G1-478 page
const day = require(path.join(WG, 'types', 'g1', 'G1-478-my-day-on-the-clock.js'));
const rank = Object.fromEntries(R.ROUTINE.map((a) => [a.id, a.rank]));
const inOrder = (ids) => ids.every((id, j) => j === 0 || rank[ids[j - 1]] <= rank[id]);
check('poison: bed before dinner is caught', !inOrder(['bed', 'dinner']));
let pages = 0;
for (const loc of LOCS) for (const lv of [1, 2, 3]) for (let v = 1; v <= 6; v++) {
  const h = day.build({ difficulty: lv, locale: loc }, { rng: makeRng(`tw|${loc}|${lv}|${v}`), variant: v, locale: loc }).bodyHtml;
  const ids = [...h.matchAll(/data-lcs-act="(\w+)"/g)].map((x) => x[1]);
  pages++;
  if (!inOrder(ids)) check(`${loc} L${lv} v${v}: the day is in order`, false, ids);
}

// 5. A.M. / P.M.
const ampm = require(path.join(WG, 'types', 'g2', 'G2-474-am-or-pm.js'));
for (const loc of LOCS) for (const lv of [1, 2, 3]) for (let v = 1; v <= 6; v++) {
  const h = ampm.build({ difficulty: lv, locale: loc }, { rng: makeRng(`ap|${loc}|${lv}|${v}`), variant: v, locale: loc }).bodyHtml;
  const t24 = [...h.matchAll(/data-lcs-t24="(\d+):\d\d"/g)].map((x) => +x[1]);
  const right = (h.match(/data-lcs-correct="1"/g) || []).length;
  if (t24.filter((x) => x >= 12).length * 2 !== t24.length) check(`${loc} L${lv} v${v}: half after noon`, false, t24);
  if (t24.includes(12)) check(`${loc} L${lv} v${v}: a 12:xx time`, false, t24);
  if (right !== t24.length) check(`${loc} L${lv} v${v}: one right option per card`, false, right);
}

console.log(fails ? `time words: ${fails} FAILED` : `time words: all checks pass (16 rows: ${same} reproduced, ${decided} decided; ${pages} day pages in order)`);
process.exitCode = fails ? 1 : 0;

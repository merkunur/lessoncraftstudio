#!/usr/bin/env node
/* =====================================================================
   mutate-animal-train.js — does verify-animal-train-core.js BITE?
   Run: node scripts/mutate-animal-train.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'animal-train-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-animal-train-core.js');
const MUTATIONS = [
  ['nine seats',                     "var SEATS = 10, CAR = 5;", "var SEATS = 9, CAR = 5;"],
  ['a round dropped',                "{ n: 8 }, { n: 5, stop: 'more' }", "{ n: 5, stop: 'more' }"],
  ['a ticket changed',               "{ n: 9 }, { n: 6, stop: 'fewer' }, { n: 10 },", "{ n: 9 }, { n: 6, stop: 'fewer' }, { n: 0 },"],
  ['to5 loses a second stop',        "{ n: 1, stop: 'more' }, { n: 4 }", "{ n: 1 }, { n: 4 }"],
  ['the platform holds just enough', "var WAIT = { to10: 12, to5: 7 };", "var WAIT = { to10: 10, to5: 5 };"],
  ['one animal for every round',     "noun: NOUNS[(i * 5 + (key === 'to5' ? 2 : 0)) % NOUNS.length]", "noun: NOUNS[0]"],
  ['a water animal rides',           "'koala', 'tiger', 'elephant'];", "'koala', 'tiger', 'whale'];"],
  ['one more is two more',           "return !r.stop ? null : (r.stop === 'more' ? r.n + 1 : r.n - 1);", "return !r.stop ? null : (r.stop === 'more' ? r.n + 2 : r.n - 1);"],
  ['a slot boards twice',            "|| !st.plat[i] ||", "||"],
  ['eleven on the train',            "|| st.seats.length >= SEATS) return false;", "|| st.seats.length > SEATS) return false;"],
  ['boarding after done',            "if (!st || st.done || i < 0", "if (!st || i < 0"],
  ['the first passenger gets off',   "var i = st.seats.pop();", "var i = st.seats.shift();"],
  ['getting off forgets the platform', "    st.plat[i] = true;\n", "\n"],
  ['go accepts one too many',        "if (a === t) {", "if (a === t || a === t + 1) {"],
  ['the second stop never comes',    "if (st.leg === 0 && st.stop) {", "if (false) {"],
  ['the second ticket goes wrong way', "st.ticket = st.stop === 'more' ? st.n + 1 : st.n - 1;", "st.ticket = st.stop === 'more' ? st.n - 1 : st.n + 1;"],
  ['help carries over to stop two',  "st.legMisses = 0; st.checked = null; st.arrived = true;", "st.checked = null; st.arrived = true;"],
  ['misses not counted',             "st.misses++; st.legMisses++;", "st.legMisses++;"],
  ['slip names swapped',             "slip: a > t ? 'more' : 'fewer'", "slip: a > t ? 'fewer' : 'more'"],
  ['numbers shown before any Go',    "if (s < a && (st.done || lv >= 1)) v.num = s + 1;", "if (s < a) v.num = s + 1;"],
  ['extra marked from the start',    "if (lv >= 2 && s < a && s >= st.ticket) v.mark = 'extra';", "if (s < a && s >= st.ticket) v.mark = 'extra';"],
  ['need marks one seat short',      "if (lv >= 2 && s >= a && s < st.ticket) v.mark = 'need';", "if (lv >= 2 && s >= a && s < st.ticket - 1) v.mark = 'need';"],
  ['no gold on the last passenger',  "if (st.done && s === a - 1) v.mark = 'last';", ""],
  ['help on after done',             "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.legMisses); }", "function helpLevel(st) { return Math.min(2, st.legMisses); }"],
  ['one more named one fewer',       "if (st.stop === 'more') return { key: 'noteOneMore'", "if (st.stop === 'more') return { key: 'noteOneFewer'"],
  ['compare shows the ticket twice', "args: { a: st.checked.a, t: st.checked.t } };", "args: { a: st.checked.t, t: st.checked.t } };"],
  ['the new ticket never announced', "if (st.arrived) return { key: 'noteNewTicket', args: { t: st.ticket } };", ""],
  ['a stale note after a change',    "    st.plat[i] = false;\n    st.seats.push(i);\n    st.checked = null; st.arrived = false;", "    st.plat[i] = false;\n    st.seats.push(i);\n    st.arrived = false;"],
  ['giant seats',                    "var seat = Math.min(136, Math.floor((W - 2 * FR - 4 * G) / 5));", "var seat = Math.min(160, Math.floor((W - 2 * FR) / 5));"],
  ['waiting animals outgrow passengers', "var plat = Math.min(112, pic, Math.floor(", "var plat = Math.min(112, Math.floor("],
  ['passengers drawn small',         "var pic = seat - 8;", "var pic = seat - 30;"],
  ['one long platform row',          "var cols = wait > 7 ? 6 : 4, PG = 8, PP = 8;", "var cols = wait, PG = 8, PP = 8;"],
  ['the phone forgets the stripe',   "- 2 * pp - pg - edge) / 4));", "- 2 * pp - pg) / 4));"],
  ['tiny phone seats',               "var cell = Math.min(88, Math.floor(", "var cell = Math.min(60, Math.floor("],
  ['row mode on a phone',            "if (W >= 560) {", "if (W >= 300) {"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-mut-'));
  fs.writeFileSync(path.join(dir, 'animal-train-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { AT_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-animal-train: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

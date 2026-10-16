#!/usr/bin/env node
/* =====================================================================
   mutate-roll-book.js — does verify-roll-book-core.js BITE?
   Run: node scripts/mutate-roll-book.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'roll-book-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-roll-book-core.js');
const MUTATIONS = [
  ['a 0 call put back',             "{ n: 1, card: 'frame' }, { n: 5, card: 'scatter' }", "{ n: 0, card: 'frame' }, { n: 5, card: 'scatter' }"],
  ['a round dropped',               ", { n: 4, card: 'scatter' }, { n: 2, card: 'scatter' }]", ", { n: 4, card: 'scatter' }]"],
  ['the raft holds just enough',    "var RAFT = { to9: 10, to5: 7 };", "var RAFT = { to9: 9, to5: 5 };"],
  ['a scattered nine',              "{ n: 9, card: 'frame' }", "{ n: 9, card: 'scatter' }"],
  ['the card in one long row',      "for (i = 0; i < n; i++) out.push([(i % 5) + 0.5, Math.floor(i / 5) + 0.5]);", "for (i = 0; i < n; i++) out.push([i + 0.5, 0.5]);"],
  ['scatter dots touch',            "3: [[0.8, 0.5], [2.6, 1.5], [4.2, 0.6]],", "3: [[0.8, 0.5], [1.2, 0.9], [4.2, 0.6]],"],
  ['a send takes a used spot',      "var k = 0; while (used[k]) k++; return k;", "return st.bank.length;"],
  ['a recall shuffles the bank',    "var spot = st.bank.splice(k, 1)[0]; st.checked = null; return spot;", "var spot = st.bank.splice(k, 1)[0]; st.bank.reverse(); st.checked = null; return spot;"],
  ['past the raft',                 "if (!st || st.done || st.bank.length >= st.raft) return -1;", "if (!st || st.done) return -1;"],
  ['a stamp for 0',                 "if (!st || st.done || d < 1 || d > st.max", "if (!st || st.done || d < 0 || d > st.max"],
  ['stamps past the range',         "if (!st || st.done || d < 1 || d > st.max", "if (!st || st.done || d < 1 || d > 9"],
  ['rub out drops the stamp',       "st.trace = ST.newTrace(NT.glyphFor(st.digit, st.lang), {}); return true; }", "st.digit = null; st.trace = null; return true; }"],
  ['signed without tracing',        "function signed(st) { return !!(st.trace && ST.isComplete(st.trace)); }", "function signed(st) { return !!st.trace; }"],
  ['the digit before the bank',     "else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';\n    else if (st.digit === null) slip = 'unsigned';", "else if (st.digit === null) slip = 'unsigned';\n    else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';"],
  ['more and fewer swapped',        "slip = a > st.n ? 'more' : 'fewer';", "slip = a > st.n ? 'fewer' : 'more';"],
  ['a wrong digit is fine',         "else if (st.digit !== a) slip = 'digit';\n", "\n"],
  ['untraced is fine',              "else if (!signed(st)) slip = 'trace';\n", "\n"],
  ['unsigned is a miss',            "else if (slip === 'more' || slip === 'fewer' || slip === 'digit') st.misses++;", "else if (slip !== 'none') st.misses++;"],
  ['a wrong digit not a miss',      "else if (slip === 'more' || slip === 'fewer' || slip === 'digit') st.misses++;", "else if (slip === 'more' || slip === 'fewer') st.misses++;"],
  ['the bank numbered too early',   "return (st.done || lv >= 1) ? String(i + 1) : '';", "return String(i + 1);"],
  ['the card numbered at once',     "out.push((st.done || lv >= 2) ? String(i + 1) : '');", "out.push((st.done || lv >= 1) ? String(i + 1) : '');"],
  ['help after done',               "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return Math.min(2, st.misses); }"],
  ['hints swapped',                 "unsigned: 'hintSign', trace: 'hintTrace'", "unsigned: 'hintTrace', trace: 'hintSign'"],
  ['a spot under the card',         "if (r === 0 && (c === 0 || c === 1 || c === L.cols - 1)) continue;", "if (r === 0 && (c === 0 || c === L.cols - 1)) continue;"],
  ['the same scatter every round',  "var cells = freeCells(L), rand = rng(st.id + ':' + L.mode), i, j, t;", "var cells = freeCells(L), rand = rng(L.mode), i, j, t;"],
  ['giant desktop cells',           "var cell = Math.min(112, Math.floor((W - 2 * PAD) / 5));", "var cell = Math.min(150, Math.floor(W / 4));"],
  ['tiny desktop ducklings',        "pic: cell - 12, pad: PAD, mud: 168", "pic: cell - 40, pad: PAD, mud: 168"],
  ['phone ducklings too small',     "cell: c2, pic: c2 - 4, pad: PAD", "cell: c2, pic: c2 - 20, pad: PAD"],
  ['tiny stamps',                   "mud: 120, stamp: 44, stampCols: 3", "mud: 120, stamp: 36, stampCols: 3"],
  ['the phone pond too few spots',  "return { mode: 'stack', cols: 4, rows: 4,", "return { mode: 'stack', cols: 4, rows: 3,"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rb-mut-'));
  fs.writeFileSync(path.join(dir, 'roll-book-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RB_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-roll-book: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

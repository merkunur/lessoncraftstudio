#!/usr/bin/env node
/* =====================================================================
   mutate-fruit-stand.js — does verify-fruit-stand-core.js BITE?
   Run: node scripts/mutate-fruit-stand.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'fruit-stand-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-fruit-stand-core.js');
const MUTATIONS = [
  ['trays of nine',                  "var TRAY = 10, ROW = 5;", "var TRAY = 9, ROW = 5;"],
  ['a 0 order put back',             "to10: [4, 7, 9, 3, 10, 6, 8, 5]", "to10: [0, 4, 7, 9, 3, 10, 6, 8, 5]"],
  ['a round dropped',                "to20: [12, 17, 9, 15, 20, 11, 14, 6, 18, 13]", "to20: [12, 17, 9, 15, 20, 11, 14, 6, 18]"],
  ['to 10 gets two trays',           "trays: key === 'to10' ? 1 : 2", "trays: 2"],
  ['one fruit every round',          "noun: NOUNS[(i * 3 + (key === 'to10' ? 1 : 0)) % NOUNS.length]", "noun: NOUNS[0]"],
  ['a cut fruit rides',              "'apple', 'blackberry'];", "'apple', 'watermelon'];"],
  ['fill stops one short',           "else to = c < st.filled ? c : c + 1;", "else to = c < st.filled ? c : c;"],
  ['take-back keeps the tapped fruit', "else to = c < st.filled ? c : c + 1;", "else to = c < st.filled ? c + 1 : c + 1;"],
  ['one-at-a-time adds two',         "if (st.mode === 'one') to = c < st.filled ? st.filled - 1 : st.filled + 1;", "if (st.mode === 'one') to = c < st.filled ? st.filled - 1 : st.filled + 2;"],
  ['one-at-a-time fills to here',    "if (st.mode === 'one') to = c < st.filled ? st.filled - 1 : st.filled + 1;", "if (st.mode === 'one') to = c < st.filled ? c : c + 1;"],
  ['taps past the stand',            "if (!st || st.done || c < 0 || c >= cups(st)) return null;", "if (!st || st.done || c < 0) return null;"],
  ['taps after done',                "if (!st || st.done || c < 0 || c >= cups(st)) return null;", "if (!st || c < 0 || c >= cups(st)) return null;"],
  ['an unknown mode is one',         "mode: MODES.indexOf(mode) >= 0 ? mode : 'fill',", "mode: MODES.indexOf(mode) >= 0 ? mode : 'one',"],
  ['the ones slip lost',             "    if (n > 10 && a === n - 10) return 'onesOnly';\n", ""],
  ['the ten slip lost',              "    if (n > 10 && a === 10) return 'tenOnly';\n", ""],
  ['more and fewer swapped',         "return a > n ? 'more' : 'fewer';", "return a > n ? 'fewer' : 'more';"],
  ['an empty Check is a miss',       "else if (slip !== 'none') st.misses++;", "else st.misses++;"],
  ['misses not counted',             "else if (slip !== 'none') st.misses++;", "else if (slip === 'x') st.misses++;"],
  ['numbers before any Check',       "if (c < a && (st.done || lv >= 1)) v.num = c + 1;", "if (c < a) v.num = c + 1;"],
  ['extra marked at the first miss', "if (lv >= 2 && c < a && c >= st.n) v.mark = 'extra';", "if (lv >= 1 && c < a && c >= st.n) v.mark = 'extra';"],
  ['need marks one space short',     "if (lv >= 2 && c >= a && c < st.n) v.mark = 'need';", "if (lv >= 2 && c >= a && c < st.n - 1) v.mark = 'need';"],
  ['no gold on the last fruit',      "if (st.done && c === a - 1) v.mark = 'last';", ""],
  ['help after done',                "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return Math.min(2, st.misses); }"],
  ['the note shows the order twice', "? { a: st.checked.a, n: st.n } : null;", "? { a: st.n, n: st.n } : null;"],
  ['a stale note after a tap',       "    st.filled = to; st.checked = null;", "    st.filled = to;"],
  ['hints swapped',                  "more: 'hintMore', fewer: 'hintFewer' }", "more: 'hintFewer', fewer: 'hintMore' }"],
  ['giant spaces',                   "var cup = Math.min(108, Math.floor((W - 2 * FR - 4 * G) / 5));", "var cup = Math.min(140, Math.floor((W - 2 * FR) / 5));"],
  ['tiny desktop fruit',             "pic: cup - 8, frame: FR", "pic: cup - 30, frame: FR"],
  ['phone trays too wide',           "var cell = Math.min(W < 300 ? 58 : 84, Math.floor((W - trays * (2 * fr + g) - (trays - 1) * split) / (2 * trays)));", "var cell = Math.min(84, Math.floor(W / (2 * trays)));"],
  ['row mode on a phone',            "if (W >= 560) {", "if (W >= 300) {"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fs-mut-'));
  fs.writeFileSync(path.join(dir, 'fruit-stand-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-fruit-stand: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

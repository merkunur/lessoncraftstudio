#!/usr/bin/env node
/* =====================================================================
   mutate-block-towers.js — does verify-block-towers-core.js BITE?
   Run: node scripts/mutate-block-towers.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'block-towers-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-block-towers-core.js');
const MUTATIONS = [
  ['a 0 card', "[5, 1], [4, 7]", "[5, 0], [4, 7]"],
  ['the same number twice', "[10, 8], [5, 6]", "[8, 8], [5, 6]"],
  ['a number above five in up-to-5', "[5, 4], [1, 3]", "[6, 4], [1, 3]"],
  ['a pool of seven', "[2, 9], [8, 4]],", "],"],
  ['the answer is the bigger number', "answer: P[i][0] < P[i][1] ? 'left' : 'right'", "answer: P[i][0] > P[i][1] ? 'left' : 'right'"],
  ['ten cubes for up to 5', "var MAX = { to10: 10, to5: 5 };", "var MAX = { to10: 10, to5: 10 };"],
  ['the strip setting ignored', "strip: strip === 'hidden' ? 'hidden' : 'shown'", "strip: 'shown'"],
  ['a wrong choice is no miss', "else if (slip === 'wrong') st.misses++;", "else if (false) st.misses++;"],
  ['Check with no choice counts as a miss', "else if (slip === 'wrong') st.misses++;", "else st.misses++;"],
  ['a finished round can change', "if (!st || st.done || (side !== 'left' && side !== 'right')) return false;", "if (!st || (side !== 'left' && side !== 'right')) return false;"],
  ['a new choice keeps the old verdict', "st.choice = side; st.checked = null; return true;", "st.choice = side; return true;"],
  ['towers at miss 1', "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses + 1); }"],
  ['towers stay after a new choice', "(helpLevel(st) >= 2 && !!st.checked)", "(helpLevel(st) >= 2)"],
  ['the second miss repeats the count hint', "return helpLevel(st) >= 2 ? 'hintBuilt' : 'hintCount';", "return 'hintCount';"],
  ['towers grow one after the other', "return [Math.min(k, st.left), Math.min(k, st.right)];", "return [Math.min(k, st.left), Math.max(0, Math.min(k - st.left, st.right))];"],
  ['the growth stops at the smaller number', "k = Math.max(0, Math.min(k, bigger(st)));", "k = Math.max(0, Math.min(k, smaller(st)));"],
  ['the bigger tower raises the flag', "return st.left < st.right ? 'left' : 'right';", "return st.left > st.right ? 'left' : 'right';"],
  ['too few beats', "function beats(st) { return bigger(st); }", "function beats(st) { return smaller(st); }"],
  ['a tower too tall for the phone fold', "(max === 5 ? 40 : 24)", "(max === 5 ? 40 : 30)"],
  ['tiny desktop cards', "Math.min(140, Math.floor((W - 120) / 3))", "Math.min(90, Math.floor((W - 120) / 3))"],
  ['phone cards wider than the stage', "Math.max(76, Math.min(104, Math.floor((W - 56) / 2.6)))", "Math.max(76, Math.min(150, Math.floor((W - 56) / 1.6)))"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bt-mut-'));
  fs.writeFileSync(path.join(dir, 'block-towers-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BT_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-block-towers: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

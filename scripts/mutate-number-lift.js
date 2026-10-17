#!/usr/bin/env node
/* =====================================================================
   mutate-number-lift.js — does verify-number-lift-core.js BITE?
   Run: node scripts/mutate-number-lift.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'number-lift-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-number-lift-core.js');
const MUTATIONS = [
  ['a 0 floor', "[1, 6], [7, 8]", "[0, 6], [7, 8]"],
  ['the same floor twice', "[10, 9], [1, 6]", "[9, 9], [1, 6]"],
  ['a number above five in up-to-5', "[4, 5], [3, 1]", "[4, 6], [3, 1]"],
  ['a pool of six', "[3, 5], [9, 4]],", "],"],
  ['the answer is the smaller number', "answer: P[i][0] > P[i][1] ? 'left' : 'right'", "answer: P[i][0] < P[i][1] ? 'left' : 'right'"],
  ['five floors for up to 10', "var FLOORS = { to10: 10, to5: 5 };", "var FLOORS = { to10: 5, to5: 5 };"],
  ['the same passengers every round', "animals: [NOUNS[(2 * i) % NOUNS.length], NOUNS[(2 * i + 1) % NOUNS.length]],", "animals: [NOUNS[0], NOUNS[1]],"],
  ['a near-double passenger', "'donkey', 'llama'];", "'donkey', 'hen'];"],
  ['the label setting ignored', "labels: labels === 'hidden' ? 'hidden' : 'shown'", "labels: 'shown'"],
  ['a wrong choice is no miss', "else if (slip === 'wrong') st.misses++;", "else if (false) st.misses++;"],
  ['Check with no choice counts as a miss', "else if (slip === 'wrong') st.misses++;", "else st.misses++;"],
  ['a finished round can change', "if (!st || st.done || (side !== 'left' && side !== 'right')) return false;", "if (!st || (side !== 'left' && side !== 'right')) return false;"],
  ['a new choice keeps the old verdict', "st.choice = side; st.checked = null; return true;", "st.choice = side; return true;"],
  ['floors lit at miss 1', "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses + 1); }"],
  ['lights stay after a new choice', "(helpLevel(st) >= 2 && !!st.checked)", "(helpLevel(st) >= 2)"],
  ['hidden numbers keep the find hint', "(st.labels === 'hidden' ? 'hintCount' : 'hintFind')", "'hintFind'"],
  ['the ride goes down', "return st.done ? [smaller(st), bigger(st)] : [];", "return st.done ? [bigger(st), smaller(st)] : [];"],
  ['a ride before the answer', "return st.done ? [smaller(st), bigger(st)] : [];", "return [smaller(st), bigger(st)];"],
  ['tiny desktop pictures', "Math.min(120, Math.floor((W - buildW - 72) / 2) - 24)", "Math.min(80, Math.floor((W - buildW - 72) / 2) - 24)"],
  ['phone pictures below 64', "Math.max(48, Math.min(96, Math.floor((W - buildW - 62) / 2)))", "Math.max(40, Math.min(56, Math.floor((W - buildW - 62) / 2)))"],
  ['phone passengers too wide for the stage', "Math.max(48, Math.min(96, Math.floor((W - buildW - 62) / 2)))", "Math.max(48, Math.min(96, Math.floor((W - buildW - 30) / 2)))"],
  ['a building too tall for the phone fold', "(floors === 5 ? 50 : 28)", "(floors === 5 ? 50 : 34)"],
  ['floors too thin to tap', "var floorH = wide ? (floors === 5 ? 64 : 40)", "var floorH = wide ? (floors === 5 ? 64 : 24)"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nl-mut-'));
  fs.writeFileSync(path.join(dir, 'number-lift-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NL_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-number-lift: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

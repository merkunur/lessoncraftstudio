#!/usr/bin/env node
/* =====================================================================
   mutate-fair-share.js — does verify-fair-share-core.js BITE?
   Run: node scripts/mutate-fair-share.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'fair-share-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-fair-share-core.js');
const MUTATIONS = [
  ['an odd total (fair impossible)', "[9, 5], [5, 5]", "[9, 4], [5, 5]"],
  ['a 0 plate', "[5, 1], [3, 5]", "[5, 0], [3, 5]"],
  ['the plates too small', "var PLACES = 12;", "var PLACES = 10;"],
  ['the same toy every round', "noun: NOUNS[i % NOUNS.length], arr:", "noun: NOUNS[0], arr:"],
  ['a set, not a toy', "'kite', 'dinosaur', 'train'];", "'kite', 'blocks', 'train'];"],
  ['rows ignored', "var rows = r.arr === 'rows',", "var rows = false,"],
  ['scatter laid out in rows', "oa = rows ? identity(PLACES) : shuffled(PLACES, r.id + ':a')", "oa = identity(PLACES)"],
  ['a wrong judgment counts as a miss', "if (c !== st.answer) { st.judgeMisses++; return 'wrong'; }", "if (c !== st.answer) { st.judgeMisses++; st.misses++; return 'wrong'; }"],
  ['any judgment opens step 2', "if (c !== st.answer) { st.judgeMisses++; return 'wrong'; }", "if (false) { return 'wrong'; }"],
  ['toys move before judging', "if (!st || st.done || st.phase !== 'share' || (side !== 'a' && side !== 'b')) return -1;", "if (!st || st.done || (side !== 'a' && side !== 'b')) return -1;"],
  ['a plate overfills', "if (k < 0 || to.length >= PLACES) return -1;", "if (k < 0) return -1;"],
  ['a move keeps the old verdict', "from.splice(k, 1); to.push(dest); st.moves++; st.checked = null;", "from.splice(k, 1); to.push(dest); st.moves++;"],
  ['the toy is copied, not moved', "from.splice(k, 1); to.push(dest);", "to.push(dest);"],
  ['Check before judging grades', "if (st.phase === 'judge') slip = 'judge';", "if (false) slip = 'judge';"],
  ['off by two is fair (totals are even, so a difference is always even)', "else if (a === b) slip = 'right';", "else if (Math.abs(a - b) <= 2) slip = 'right';"],
  ['top and bottom swapped', "else slip = a > b ? 'moreA' : 'moreB';", "else slip = a > b ? 'moreB' : 'moreA';"],
  ['numbers as a running count', "function showNums(st) { return st.done || (helpLevel(st) >= 1 && !!st.checked); }", "function showNums(st) { return st.done || helpLevel(st) >= 1; }"],
  ['a toy lit at miss 1', "if (st.done || helpLevel(st) < 2 || !st.checked) return null;", "if (st.done || helpLevel(st) < 1 || !st.checked) return null;"],
  ['the lit toy on the plate with fewer', "var side = a > b ? 'a' : 'b', pl = st.plates[side];", "var side = a > b ? 'b' : 'a', pl = st.plates[side];"],
  ['tiny desktop toys', "cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 6;", "cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 30;"],
  ['phone cells uncapped', "cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2;", "cell = Math.min(90, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2;"],
  ['the same scatter every round', "oa = rows ? identity(PLACES) : shuffled(PLACES, r.id + ':a'), ob = rows ? identity(PLACES) : shuffled(PLACES, r.id + ':b');", "oa = rows ? identity(PLACES) : shuffled(PLACES, 'a'), ob = rows ? identity(PLACES) : shuffled(PLACES, 'b');"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fs-mut-'));
  fs.writeFileSync(path.join(dir, 'fair-share-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-fair-share: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

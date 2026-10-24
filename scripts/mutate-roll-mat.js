#!/usr/bin/env node
/* =====================================================================
   mutate-roll-mat.js — does verify-roll-mat-core.js BITE? Run:
   node scripts/mutate-roll-mat.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a
   control that must SURVIVE. CRLF collapsed before searching.
   (The mats, wells, boxes and sum as DRAWN are gated by local-test-roll-mat.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'roll-mat-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-roll-mat-core.js');
const MUTATIONS = [
  ["a mat of nine rolls","if (st.done || col.mat.length !== 10 || !L) return null;","if (st.done || col.mat.length < 9 || !L) return null;"],
  ["a full mat lets its box be written (no tenth well over the box)","return !(st.bin[c] || 0) && !col.door.length && col.mat.length < 10 && !col.shelf;","return !(st.bin[c] || 0) && !col.door.length && !col.shelf;"],
  ["the shelf rod does not cover the tens box","return !(st.bin[c] || 0) && !col.door.length && col.mat.length < 10 && !col.shelf;","return !(st.bin[c] || 0) && !col.door.length && col.mat.length < 10;"],
  ["take-away goes below 0","if (!col.mat.length && !col.door.length) return { result: 'empty' };",""],
  ["unroll from an empty neighbour","if (!from.mat.length && !from.door.length) return { result: 'empty', from: L };",""],
  ["a box opens while a column to its right is unsettled","for (var j = i; j < st.r.cols.length; j++) if (!settled(st, st.r.cols[j])) return false;","for (var j = i; j <= i; j++) if (!settled(st, st.r.cols[j])) return false;"],
  ["a round with no regrouping may come first","if (!round(face, order[0]).regroup.length) return false;",""],
  ["the same order twice","ok = orderOk(face, order) && !(prev && prev.length && prev.join() === order.join());","ok = orderOk(face, order);"],
  ["the take-away amount is never checked","if (r.op === '-' && awayValue(st) !== r.b) kind = 'away';","if (false) kind = 'away';"],
  ["the rolled ten vanishes","col.mat = []; st.cols[L].shelf++;","col.mat = [];"],
  ["the second miss never escalates","return { key: st.show >= 2 ? 'hintCount2' : 'hintCount', col: L.col };","return { key: 'hintCount', col: L.col };"],
  ["no regrouping is celebrated as a roll","if (!r.regroup.length) return 'okAddNone';","if (!r.regroup.length) return 'okAddRoll';"],
  ["a round adds 0","[46, 4], [42, 5]]","[46, 4], [42, 0]]"],
  ["Tuck is the gerbil twin","var TUCK = ['pets', 'hamster'];","var TUCK = ['pets', 'gerbil'];"],
  ["a mat takes an eleventh block","function put(col, src) { if (col.mat.length < 10) col.mat.push(src); else col.door.push(src); }","function put(col, src) { col.mat.push(src); }"],
  ["blocks left in the bin are called covered","if (r.op === '+' && r.cols.some(function (x) { return st.bin[x] > 0; })) none = 'hintStart';",""],
  ["the covered pulse looks left first","for (i = r.cols.length - 1; i >= 0 && !none; i--) if (!settled(st, r.cols[i]))","for (i = 0; i < r.cols.length && !none; i++) if (!settled(st, r.cols[i]))"],
  ["an unused variable (control)","  function faceOf(f) {","  var UNUSED_CONTROL = 0; function faceOf(f) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rm-mut-'));
  fs.writeFileSync(path.join(dir, 'roll-mat-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RM_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-roll-mat: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

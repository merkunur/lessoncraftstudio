#!/usr/bin/env node
/* =====================================================================
   mutate-nine-stop.js — does verify-nine-stop-core.js BITE? Run:
   node scripts/mutate-nine-stop.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a
   control that must SURVIVE. CRLF collapsed before searching.
   (The tubes, cards and board as DRAWN are gated by local-test-nine-stop.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'nine-stop-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-nine-stop-core.js');
const MUTATIONS = [
  ["the lid sits at ten","if (st[tube] >= 9) return 'lid';","if (st[tube] >= 10) return 'lid';"],
  ["the tens tube has no lid (100 reachable)","if (st[tube] >= 9) return 'lid';","if (tube === 'o' && st[tube] >= 9) return 'lid';"],
  ["a card plays on any tube","if (tube && tube !== own) return 'wrongTube';",""],
  ["the down arrow means one more one","var STEP = { D: 10, U: -10, R: 1, L: -1 }","var STEP = { D: 1, U: -10, R: 1, L: -1 }"],
  ["the same order twice","ok = orderOk(face, order) && !(prev && prev.length && prev.join() === order.join());","ok = orderOk(face, order);"],
  ["three more in a row allowed","if ((z.step > 0) === (a.step > 0) && (a.step > 0) === (b.step > 0)) return false;",""],
  ["a mystery whose trips do not meet","[24, 'DDR', 56, 'UL']","[24, 'DDR', 56, 'U']"],
  ["a wrong count lands on the end","for (k = 0; k < d; k++) t = Math.max","for (k = 0; k < r.d; k++) t = Math.max"],
  ["the cross takes the neighbours in the wrong frames","targets: [n - 10, n - 1, n + 1, n + 10]","targets: [n + 10, n - 1, n + 1, n - 10]"],
  ["a neighbour of 0","var NOD = [47, 63, 28, 15, 52, 36, 70, 19, 89, 11];","var NOD = [47, 63, 28, 15, 52, 36, 70, 19, 89, 10];"],
  ["taking a card back does not move the tubes","res = (STEP[dir] > 0 ? down : up)(st, own); if (res === 'down' || res === 'up')","res = 'down'; if (res === 'down' || res === 'up')"],
  ["the handles work in a count round","if (st.done || st.r.kind === 'count') return null;\n    if (st[tube] >= 9)","if (st.done) return null;\n    if (st[tube] >= 9)"],
  ["the second miss never escalates","if (st.show >= 2) {\n      if (Math.abs(s.step) === 10)","if (false) {\n      if (Math.abs(s.step) === 10)"],
  ["the mystery does not reset to the second start","st.ghost = r.trips[0].land; st.phase = 1; setTo(st, r.trips[1].start);","st.ghost = r.trips[0].land; st.phase = 1;"],
  ["an unused variable (control)","  function faceOf(f) {","  var UNUSED_CONTROL = 0; function faceOf(f) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ns-mut-'));
  fs.writeFileSync(path.join(dir, 'nine-stop-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-nine-stop: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

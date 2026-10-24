#!/usr/bin/env node
/* =====================================================================
   mutate-sign-beam.js — does verify-sign-beam-core.js BITE? Run: node scripts/mutate-sign-beam.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The court as DRAWN — the bars, the seal, the pans, the dots —
   is gated by local-test-sign-beam.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'sign-beam-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-sign-beam-core.js');
const MUTATIONS = [
  ['a wrong ruling releases the beam',                 "if (!right) { st.misses++;", "if (false) { st.misses++;"],
  ['the wedge opens toward the lighter side',          "return l === r ? 'eq' : l > r ? 'gt' : 'lt';", "return l === r ? 'eq' : l > r ? 'lt' : 'gt';"],
  ['a false claim off by 3',                           "['9', '4+4', ['L', 0, 8]]", "['11', '4+4', ['L', 0, 8]]"],
  ['a blank with the wrong answer',                    "['?+4', '2+7', ['L', 0, 5]]", "['?+4', '2+7', ['L', 0, 6]]"],
  ['a true claim gets a repair',                       "['7', '3+4'], ['9'", "['7', '3+4', ['L', 0, 7]], ['9'"],
  ['turning the court does not turn it',               "st.turned = !st.turned;", ""],
  ['a verdict may come 3 times in a row',              "if (run > 2) return false;", "if (run > 3) return false;"],
  ['the gavel without a stamp is a miss',              "if (!st.stamp) { st.last = { reason: 'nostamp' };", "if (!st.stamp) { st.misses++; st.last = { reason: 'nostamp' };"],
  ['heavy and light swapped',                          "st.last = { reason: 'tip', heavy: mine > other,", "st.last = { reason: 'tip', heavy: mine < other,"],
  ['threads already at miss 1',                        "threads: verdict && st.show >= 2 ?", "threads: verdict && st.show >= 1 ?"],
  ['a subtraction can go below 1',                     "if (side.op === '-') { if (s.pos === 1) hi = Math.min(hi, side.nums[0] - 1); else lo = Math.max(lo, side.nums[1] + 1); }", ""],
  ['the repair does not start on the old number',      "st.caught = true; st.phase = 'repair'; st.dial = r.fix.side === 'L' ? r.L.nums[r.fix.pos] : r.R.nums[r.fix.pos];", "st.caught = true; st.phase = 'repair'; st.dial = 1;"],
  ['a new stamp keeps the help',                       "function moved(st) { st.show = 0; st.last = null; }", "function moved(st) { st.show = 0; }"],
  ['the light end does not reach the top bar',         "Math.asin(gap / (bar / 2))", "Math.asin(gap / bar)"],
  ['the beam tips the wrong way',                      "return shape === 'gt' ? -geo.tilt : shape === 'lt' ? geo.tilt : 0;", "return shape === 'gt' ? geo.tilt : shape === 'lt' ? -geo.tilt : 0;"],
  ['the plan may repeat the last pass',                "ok = runOk(mode, level, order) && !(prev && prev.length && prev.join() === order.join());", "ok = runOk(mode, level, order);"],
  ['two witnesses alike',                              "['farm animals', 'goat']", "['forest creatures', 'fox']"],
  ['a subtraction pours its result, not its first number', "if (side.op === '-') { for (var k = 0; k < nums[0]; k++)", "if (side.op === '-') { for (var k = 0; k < nums[0] - nums[1]; k++)"],
  ['a taken-away crate gets the plain heavy/light hint', "takes: sideOf(r, s.side).op === '-' && s.pos === 1 };", "takes: false };"],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-mut-'));
  fs.writeFileSync(path.join(dir, 'sign-beam-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SB_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-sign-beam: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

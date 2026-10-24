#!/usr/bin/env node
/* =====================================================================
   mutate-plank-path.js — does verify-plank-path-core.js BITE? Run: node scripts/mutate-plank-path.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The path as DRAWN — the banks, the water, the planks, the walker —
   is gated by local-test-plank-path.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'plank-path-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-plank-path-core.js');
const MUTATIONS = [
  ['a missing first addend is found by adding',        "e.ans = e.op === '+' ? (e.x == null ? e.z - e.y :", "e.ans = e.op === '+' ? (e.x == null ? e.z + e.y :"],
  ['the decoy equals an answer',                       "[['?+4=9', '8-?=5', '3+4=?', '?-6=2'], 4]", "[['?+4=9', '8-?=5', '3+4=?', '?-6=2'], 5]"],
  ['a decoy that is no mistake at all',                "[['?+4=9', '8-?=5', '3+4=?', '?-6=2'], 4]", "[['?+4=9', '8-?=5', '3+4=?', '?-6=2'], 10]"],
  ['a 0 plank',                                        "[['2+?=8', '?-3=4', '9-5=?', '?+7=10'], 10]", "[['2+?=8', '?-3=4', '9-5=?', '?+7=10'], 0]"],
  ['a plank one short is accepted',                    "function fit(e, p) { return p === e.ans ?", "function fit(e, p) { return p === e.ans || p === e.ans - 1 ?"],
  ['the start gap drawn at the end',                   "case 'first': return { whole: e.z, banks: [{ from: e.z - e.y, len: e.y, c: T }], gap: { from: 0,", "case 'first': return { whole: e.z, banks: [{ from: e.z - e.y, len: e.y, c: T }], gap: { from: e.y,"],
  ['a missing total has no slot under the road',       "case 'sum': return { whole: e.x + e.y, banks: [{ from: 0, len: e.x, c: C }, { from: e.x, len: e.y, c: T }], gap: { from: 0, len: e.ans, base: true } };", "case 'sum': return { whole: e.x + e.y, banks: [{ from: 0, len: e.x, c: C }, { from: e.x, len: e.y, c: T }], gap: { from: 0, len: e.ans, base: false } };"],
  ['the tray is never shuffled',                       "order = shuffle(planks, rnd); if (order.indexOf(r.decoy) !== prevDecoySlot) break;", "order = planks; if (order.indexOf(r.decoy) !== prevDecoySlot) break;"],
  ['the decoy may sit in the same slot twice',         "if (order.indexOf(r.decoy) !== prevDecoySlot) break;", "break;"],
  ['the plan may repeat the last pass',                "if (!(prev && prev.length && prev.join() === order.join())) break;", "break;"],
  ['a wrong plank is not a miss',                      "st.misses[g]++; st.last = { reason: res.fit,", "st.last = { reason: res.fit,"],
  ['the squares are numbered after one miss',          "if (L.help >= 2) return 'hCount';", "if (L.help >= 1) return 'hCount';"],
  ['the path is done after one plank',                 "if (st.laid.every(function (x) { return x != null; })) st.done = true;", "if (st.laid.some(function (x) { return x != null; })) st.done = true;"],
  ['a lifted plank stays in the gap',                  "st.laid[g] = null; st.selected = g; st.last = null; return true;", "st.selected = g; st.last = null; return true;"],
  ['the goat walks backwards',                         "['farm animals', 'goat', true]", "['farm animals', 'goat', false]"],
  ['the take-away gap starts at 0',                    "case 'takeaway': return { whole: e.x, banks: [{ from: 0, len: e.z, c: C }], gap: { from: e.z,", "case 'takeaway': return { whole: e.x, banks: [{ from: 0, len: e.z, c: C }], gap: { from: 0,"],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-mut-'));
  fs.writeFileSync(path.join(dir, 'plank-path-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PP_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-plank-path: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

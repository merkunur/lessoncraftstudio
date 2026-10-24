#!/usr/bin/env node
/* =====================================================================
   mutate-rod-drawers.js — does verify-rod-drawers-core.js BITE? Run:
   node scripts/mutate-rod-drawers.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a
   control that must SURVIVE. CRLF collapsed before searching.
   (The drawers, columns and sign as DRAWN are gated by local-test-rod-drawers.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'rod-drawers-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-rod-drawers-core.js');
const MUTATIONS = [
  ["the ones drawer opens before the tens", "      if (!st.open[q]) return 'locked';\n", ""],
  ["the ones stay unlocked when the tens differ", "      if (da[q] !== db[q]) return 'sealed';\n", ""],
  ["the deciding place is read from the right", "for (var i = 0; i < places; i++) if (da[i] !== db[i]) return i; return -1; }", "for (var i = places - 1; i >= 0; i--) if (da[i] !== db[i]) return i; return -1; }"],
  ["the grab accepts the reversed sign", "if (st.sign === r.rel) { st.done = true;", "if (st.sign === r.rel || (st.sign !== '=' && r.rel !== '=')) { st.done = true;"],
  ["\"=\" is accepted for 54 and 51", "if (st.sign === r.rel) { st.done = true;", "if (st.sign === r.rel || st.sign === '=') { st.done = true;"],
  ["four-digit grouped with a point in de", "de: '', nl: ''", "de: '.', nl: ''"],
  ["the order check reads only the ones digits", "if (r.cards[st.steps[i]] !== want[i]) break;", "if (r.cards[st.steps[i]] % 10 !== want[i] % 10) break;"],
  ["two \"=\" rounds in one pass", "[60, 49], [24, 42]", "[49, 49], [24, 42]"],
  ["the waiting row starts in order", "[[[43, 34, 38], 'up']", "[[[34, 38, 43], 'up']"],
  ["the help survives a drawer pull", "function clear(st) { st.show = 0; st.last = null; st.reveal = false; }", "function clear(st) { st.last = null; }"],
  ["the sign stands up before the deciding place", "var last = r.decide < 0 ? r.places - 1 : r.decide;", "var last = 0;"],
  ["the sign never turns to =", "SIGNS[(SIGNS.indexOf(st.sign) + 1) % 3]", "SIGNS[(SIGNS.indexOf(st.sign) + 1) % 2]"],
  ["the misplaced cabinet stays on its step", "culprit = st.steps[i]; st.steps[i] = null;", "culprit = st.steps[i];"],
  ["the plan may repeat the last pass", "ok = orderOk(level, task, order) && !(prev && prev.length && prev.join() === order.join());", "ok = orderOk(level, task, order);"],
  ["the red-blushed pear", "pear: ['at-the-supermarket', 'pear'", "pear: ['fruits', 'pear'"],
  ["a group of 0", "[[12, 5, 16], 'down', 'apple']", "[[12, 0, 16], 'down', 'apple']"],
  ["the ones-first trap is told the ones decide", "return { key: r.decide === 0 ? 'hintLookTens' : 'hintOnesDecide' };", "return { key: r.decide === 0 ? 'hintOnesDecide' : 'hintLookTens' };"],
  ["the second miss never escalates", "    if (st.show >= 2) return { key: 'hintOpenSide' };\n", ""],
  ["equal numbers told the open side is bigger", "if (L.reason === 'notEqual') return { key: four ? 'hintSameFour' : 'hintSame' };", ""],
  ["an unused variable (control)", "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rd-mut-'));
  fs.writeFileSync(path.join(dir, 'rod-drawers-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RD_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-rod-drawers: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

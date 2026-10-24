#!/usr/bin/env node
/* =====================================================================
   mutate-door-tag.js — does verify-door-tag-core.js BITE? Run: node scripts/mutate-door-tag.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The shelf as DRAWN is gated by local-test-door-tag.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'door-tag-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-door-tag-core.js');
const MUTATIONS = [
  ["a reversal is accepted (4 crates 3 berries for 34)","ok = built === r.n;","ok = built === r.n || built === 10 * r.o + r.t;"],
  ["a crate counts as one in the crack-count","c += 10; ev.push({ kind: 'crate'","c += 1; ev.push({ kind: 'crate'"],
  ["the ones wheel goes to 13","if (v < 0 || v > 9) return false;","if (v < 0 || v > 13) return false;"],
  ["the stretch accepts 3 + 4 for 34","ok = st.hooks.left === 10 * r.t && st.hooks.right === r.o;","ok = (st.hooks.left === 10 * r.t || st.hooks.left === r.t) && st.hooks.right === r.o;"],
  ["berries never spill (the bowl takes more than nine)","if (sh.bowl < DIMPLES) {","if (sh.bowl < 99) {"],
  ["a spill on a right total is marked wrong","if (ok && loose(sh) > 9) { st.packed = pack(sh) > 0; }","if (ok && loose(sh) > 9) { ok = false; }"],
  ["take-back empties the bowl before the lip (a gap)","else if (sh.lip) sh.lip--; else if (sh.bowl) sh.bowl--; else return false;","else if (sh.bowl) sh.bowl--; else if (sh.lip) sh.lip--; else return false;"],
  ["the help survives a new fling","function clear(st) { st.show = 0; st.last = null; }","function clear(st) { st.last = null; }"],
  ["a doubled digit (tens = ones)","'99': [['stock', 34], ['stock', 40]","'99': [['stock', 33], ['stock', 40]"],
  ["the plan may repeat the last pass","ok = orderOk(range, order) && !(prev && prev.length && prev.join() === order.join());","ok = orderOk(range, order);"],
  ["face value is not named","else if (sh.deck === 0 && L === r.t) kind = 'face';",""],
  ["the rack may show the right pair first","if (!(o[0] === 10 * r.t && o[1] === r.o)) break;","break;"],
  ["an overflow round with nothing spilled","['overflow', 1, 13], ['label', 7, 0]","['overflow', 1, 8], ['label', 7, 0]"],
  ["the deck takes more crates than it has places","if (sh.deck >= st.r.deckMax) return null;","if (sh.deck >= 99) return null;"],
  ["the face hint says the 3 in 34 means 3","t0: 10 * r.t } };","t0: r.t } };"],
  ["a cherry (drawn as an apple) among the berries","var BERRIES = ['strawberry', 'blueberry', 'raspberry', 'blackberry'];","var BERRIES = ['strawberry', 'blueberry', 'raspberry', 'cherry'];"],
  ["Check on an empty shelf counts a miss","if (r.type === 'stock' && value(sh) === 0) none = 'hintEmpty';",""],
  ["an overflow reversal is told \"ten loose make a crate\"","if (!ok) kind = (st.wheels.t === r.o && st.wheels.o === r.t && r.o !== r.t) ? 'reverse' : w === r.given.deck + r.given.bowl + r.given.lip ? 'crateAsOne' : r.type === 'overflow' ? 'overflow' : 'crateTen';","if (!ok) kind = r.type === 'overflow' ? 'overflow' : (st.wheels.t === r.o && st.wheels.o === r.t && r.o !== r.t) ? 'reverse' : w === r.given.deck + r.given.bowl + r.given.lip ? 'crateAsOne' : 'crateTen';"],
  ["an unused variable (control)","  function rangeOf(r) {","  var UNUSED_CONTROL = 0; function rangeOf(r) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-mut-'));
  fs.writeFileSync(path.join(dir, 'door-tag-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { DT_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-door-tag: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

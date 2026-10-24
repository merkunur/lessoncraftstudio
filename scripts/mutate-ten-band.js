#!/usr/bin/env node
/* =====================================================================
   mutate-ten-band.js — does verify-ten-band-core.js BITE? Run: node scripts/mutate-ten-band.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The shelf as DRAWN is gated by local-test-ten-band.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'ten-band-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-ten-band-core.js');
const MUTATIONS = [
  ["the band bundles nine","if (n < 10) return { result: 'spring', filled: n, empty: 10 - n };","if (n < 9) return { result: 'spring', filled: n, empty: 10 - n };"],
  ["the band bundles all the cubes (a ten of twelve)","take = order.slice(0, 10), keep","take = order.slice(0, n), keep"],
  ["the extras are deleted, not put back","var order = bandOrder(st.plate), take = order.slice(0, 10), keep = st.plate.filter(function (c, i) { return take.indexOf(i) < 0; });","var order = bandOrder(st.plate), take = order.slice(0, 10), keep = [];"],
  ["a snip changes the number","var add = []; for (var k = 0; k < 10; k++)","var add = []; for (var k = 0; k < 9; k++)"],
  ["ten hiding is accepted (2 tens + 14 loose for 34)","if (v === r.n && st.plate.length < 10) ok = true;","if (v === r.n) ok = true;"],
  ["the unbundle round accepts the untouched start","ok = st.rack === r.t - 1 && st.plate.length === r.o + 10;","ok = 10 * st.rack + st.plate.length === r.n;"],
  ["the lever works with a full rack","if (st.rack >= st.r.cap) return { result: 'stiff' };",""],
  ["two cubes share a cell","for (i = 0; i < plate.length; i++) used[plate[i].c] = 1;",""],
  ["the help survives a hopper tap","function clear(st) { st.show = 0; st.last = null; }","function clear(st) { st.last = null; }"],
  ["the plan may repeat the last pass","ok = orderOk(range, order) && !(prev && prev.length && prev.join() === order.join());","ok = orderOk(range, order);"],
  ["the impostor starts with ten (a real ten)","var cells = [2, 3, 4, 5, 6, 12, 13, 15, 16];","var cells = [2, 3, 4, 5, 6, 12, 13, 14, 15, 16];"],
  ["equal digits in a target","['build', 34, 0, 0, [1, 2, 3]], ['unbundle', 32","['build', 33, 0, 0, [1, 2, 3]], ['unbundle', 32"],
  ["the tens round passes with the tens still loose","ok = right && st.plate.length < 10;","ok = right;"],
  ["a typed 0 can lead","|| (st.typed === '' && d === '0')) return false;",") return false;"],
  ["the impostor hint never asks","if (r.type === 'impostor' && st.misses === 1) return { key: 'hintImpostor' };",""],
  ["a read round lets the lever bundle","if (st.done || st.r.type === 'read') return null;","if (st.done) return null;"],
  ["a read round lets the snip open","if (st.done || st.r.type === 'read' || st.rack < 1) return null;","if (st.done || st.rack < 1) return null;"],
  ["two snips told to snip again","kind = st.rack < r.t - 1 || st.plate.length >= r.o + 20 ? 'tenHiding' : 'notUnbundled';","kind = 'notUnbundled';"],
  ["Bolt is a teddy","var BOT = ['toys', 'robot'];","var BOT = ['toys', 'teddy_bear'];"],
  ["an unused variable (control)","  function rangeOf(r) {","  var UNUSED_CONTROL = 0; function rangeOf(r) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mut-'));
  fs.writeFileSync(path.join(dir, 'ten-band-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TB_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-ten-band: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

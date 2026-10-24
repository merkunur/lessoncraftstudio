#!/usr/bin/env node
/* =====================================================================
   mutate-counting-lamp.js — does verify-counting-lamp-core.js BITE? Run: node scripts/mutate-counting-lamp.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The jars as DRAWN are gated by local-test-counting-lamp.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'counting-lamp-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-counting-lamp-core.js');
const MUTATIONS = [
  ["the hop counts the start tie (lands at a + k − 1)","land: start - from + dir * k,","land: start - from + dir * (k - 1),"],
  ["one puff too many","for (i = 1; i <= h.k; i++) run.counted.push","for (i = 0; i <= h.k; i++) run.counted.push"],
  ["a plate one tie off is accepted","if (p != null && p !== tieValue(r, i)) { run.stop = i; break; }","if (p != null && Math.abs(p - tieValue(r, i)) > 1) { run.stop = i; break; }"],
  ["the lamp counts from 1, not from the station","if (p != null && p !== tieValue(r, i)) { run.stop = i; break; }","if (p != null && p !== i) { run.stop = i; break; }"],
  ["the open rail ignores ε","if (Math.abs(tv - vs[i]) > r.open.eps) {","if (vs[i] < r.open.a || vs[i] > r.open.b) {"],
  ["posts accept an unequal step","if (r.posts.blanks.indexOf(i) >= 0 && vals[i] !== r.posts.values[i]) { run.stop = i; break; }","if (r.posts.blanks.indexOf(i) >= 0 && vals[i] == null) { run.stop = i; break; }"],
  ["a 4th digit is typed (1007 for 107)","st.typed.length >= 3 ||","st.typed.length >= 4 ||"],
  ["a leading 0 is typed","|| (st.typed === '' && d === '0')) return false;",") return false;"],
  ["a distractor plate is refused (no choice left)","function place(st, v, i) {","function place(st, v, i) { if (st.r.dist.indexOf(v) >= 0) return false;"],
  ["the flag may sit on the start tie","|| i === r.hop.start || i === st.flag) return false;","|| i === st.flag) return false;"],
  ["the showing survives a plate move","function clear(st) { st.show = 0; st.last = null; st.run = null; }","function clear(st) { st.last = null; st.run = null; }"],
  ["a wrong check is not a miss","st.misses++; st.show = Math.min(2, st.misses);","st.show = Math.min(2, st.misses + 1);"],
  ["miss 2 hint names the answer tie, not the plate","return st.show >= 2 ? { key: 'hintFind', args: { n: wv } } : { key: 'hintCountOn' };","return st.show >= 2 ? { key: 'hintFind', args: { n: L.reason === 'rail' ? wv : tieValue(r, L.stop) } } : { key: 'hintCountOn' };"],
  ["a distractor is sent looking for a tie that does not exist","if (st.show >= 2 && r.dist.indexOf(wv) >= 0) return { key: 'hintNowhere', args: { n: wv } };",""],
  ["the plan may repeat the last pass","ok = orderOk(level, track, order) && !(prev && prev.length && prev.join() === order.join());","ok = orderOk(level, track, order);"],
  ["the tray comes in numeric order","if (all.length < 3) return o;","return all.slice().sort(function (a, b) { return a - b; });"],
  ["the engine is a bus","ENGINE: ['vehicles', 'train']","ENGINE: ['vehicles', 'bus']"],
  ["H1 lands on the centre tie","[[46, 47, 3, 1], [20, 25, 3, -1]","[[45, 47, 3, 1], [20, 25, 3, -1]"],
  ["an open-rail distractor inside the rail","{ open: [10, 30], eps: 1.4, plates: [20, 15], dist: 35 }, { open: [40, 80]","{ open: [10, 30], eps: 1.4, plates: [20, 15], dist: 25 }, { open: [40, 80]"],
  ["an unused variable (control)","  function levelOf(l) {","  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lm-mut-'));
  fs.writeFileSync(path.join(dir, 'counting-lamp-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LM_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-counting-lamp: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

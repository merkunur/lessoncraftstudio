#!/usr/bin/env node
/* =====================================================================
   mutate-pull-key.js — does verify-pull-key-core.js BITE? Run:
   node scripts/mutate-pull-key.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. Mutations hit the core OR the activity (the
   roll geometry and the time phrases live in the activity). CRLF collapsed.
   (The cottage, the key and the answer area as DRAWN are gated by local-test-pull-key.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'pull-key-core.js', act: 'pull-key-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-pull-key-core.js');
const MUTATIONS = [
  ['the hour hand uncoupled', 'core', 'function angles(t) { return { hour: (30 * (t.h % 12) + 0.5 * t.m) % 360, minute: (6 * t.m) % 360 }; }', 'function angles(t) { return { hour: (30 * (t.h % 12)) % 360, minute: (6 * t.m) % 360 }; }'],
  ['the rewind stops short of the hour', 'core', 'function backToHour(t) { return t.m / 5; }', 'function backToHour(t) { return Math.min(t.m, 25) / 5; }'],
  ['the rewind runs past the hour', 'core', "if (st.back >= backToHour(t)) return 'stop';", "if (st.back >= backToHour(t) + 12) return 'stop';"],
  ['the next-hour reading accepted', 'core', "if (kind === 'right') { st.done = true;", "if (kind === 'right' || kind === 'nextHour') { st.done = true;"],
  [':45 on the wheel in the half level', 'core', "function minutesOf(times) { return timesOf(times) === 'quarter' ? [0, 15, 30, 45] : [0, 30]; }", "function minutesOf(times) { return timesOf(times) === 'quarter' ? [0, 15, 30, 45] : [0, 30, 45]; }"],
  ['a set round accepts its own start', 'core', 'return st.touched && !same(st.shown, r.start) ? st.shown : null;', 'return st.shown;'],
  ['Owl calls the hour at half past', 'core', 'function bobs(t) { return t.m === 0 ? t.h : 1; }', 'function bobs(t) { return t.h; }'],
  ['an unlabelled picture referenced', 'core', "puzzle: ['activities', 'puzzle']", "puzzle: ['activities', 'painting']"],
  ['a board with two right cards', 'core', "R3: ['board', '8:30', [['reading', '9:00'], ['bath', '7:30'], ['bed', '8:30']]],", "R3: ['board', '8:30', [['reading', '9:00'], ['bath', '8:30'], ['bed', '8:30']]],"],
  ['read only keeps the set rounds', 'core', "if (roundsOf(rounds) === 'read') {", 'if (false) {'],
  ['the wheels start on the answer', 'core', "R2: ['write', '3:00', '12:30'],", "R2: ['write', '3:00', '3:00'],"],
  ['the second miss never escalates', 'core', "if (st.show >= 2) return { key: 'hintCount' };", ''],
  ['an empty Check counts as a miss', 'core', 'if (!a) { var k =', 'if (!a) { st.misses++; var k ='],
  ['the same order twice', 'core', 'if (!eq(o, prev)) return { order: o };', 'return { order: o };'],
  ['bed at 8:30 under a morning sky', 'core', 'if (event && EVENT_PART[event]) return EVENT_PART[event]; ', ''],
  ['German 8:30 as "halb acht"', 'act', "Es ist halb neun'", "Es ist halb acht'"],
  ['the Finnish separator a colon', 'act', "fi: { sep:'.'", "fi: { sep:':'"],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pk-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PK_CORE_DIR: dir, PK_ACT_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-pull-key: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

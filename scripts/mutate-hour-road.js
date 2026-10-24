#!/usr/bin/env node
/* =====================================================================
   mutate-hour-road.js — does verify-hour-road-core.js BITE? Run:
   node scripts/mutate-hour-road.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. Mutations hit the core OR the activity (the
   roll geometry and the time phrases live in the activity). CRLF collapsed.
   (The clock, the road and the cards as DRAWN are gated by local-test-hour-road.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'hour-road-core.js', act: 'hour-road-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-hour-road-core.js');
const MUTATIONS = [
  ['the road position ignores the minutes', 'core', 'function roadPos(t) { return 2 * (t.h % 12) + t.m / 30; }', 'function roadPos(t) { return 2 * (t.h % 12); }'],
  ['the short hand jumps from number to number', 'core', 'function shortAngle(p) { return 15 * p; }', 'function shortAngle(p) { return 30 * Math.floor(p / 2); }'],
  ['the landing compares with the long hand', 'core', 'return { t: roadPos(card), diff: wrap(roadPos(card) - roadPos(target)) };', 'return { t: roadPos(card), diff: wrap(roadPos(card) % 2 - roadPos(target) % 2) };'],
  ['a round with two right cards', 'core', "['R3', '9:30', ['9:30', '9:00', '10:30']]", "['R3', '9:30', ['9:30', '9:00', '9:30']]"],
  ['the next-hour error not recognised', 'core', "if (d === 2) return 'nextHour';", ''],
  ['the card shuffle off (right card always first)', 'core', 'var at = left[Math.floor(rnd() * left.length)]', 'var at = 0'],
  ['the second miss never escalates', 'core', "if (st.show >= 2) return { key: 'hintWatch' };", ''],
  ['an empty Check counts as a miss', 'core', "if (st.chosen == null) { st.last = { reason: 'none' }; return { result: 'none' }; }", "if (st.chosen == null) { st.misses++; st.last = { reason: 'none' }; return { result: 'none' }; }"],
  ['the same order twice', 'core', 'if (ok(o) && !same(o, prev)) return { order: o };', 'if (ok(o)) return { order: o };'],
  ['three half-pasts running', 'core', 'if (kindOf(o[i]) === kindOf(o[i - 1]) && kindOf(o[i]) === kindOf(o[i - 2])) return false;', ''],
  ['a finished round still takes a card', 'core', "if (st.done || !(i >= 0 && i < 3)) return 'no';", "if (!(i >= 0 && i < 3)) return 'no';"],
  ['post k off numeral k\'s ray', 'act', 'var a = 2 * Math.PI * l / D.L,', 'var a = 2.06 * Math.PI * l / D.L,'],
  ['the ring is not the road\'s length', 'act', 'R: L / (2 * Math.PI)', 'R: L / (2.2 * Math.PI)'],
  ['German half past names the same hour', 'act', 'halb vier', 'halb drei'],
  ['Sprocket shrunk on a wide stage', 'act', 'rs = wide ? 96 : 64', 'rs = wide ? 80 : 64'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hr-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { HR_CORE_DIR: dir, HR_ACT_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-hour-road: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   mutate-set-clock.js — does verify-set-clock-core.js BITE? Run:
   node scripts/mutate-set-clock.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. Mutations hit the core OR the activity (the
   time words and the receipt rule live in the activity). CRLF collapsed.
   (What is DRAWN — the echo in the short hand's slice, the live echo only
   in "while setting", a showing cleared by any hand move — is gated by
   local-test-set-clock.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'set-clock-core.js', act: 'set-clock-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-set-clock-core.js');
const MUTATIONS = [
  ['half past accepts the short hand ON the hour', 'core', '30: [0.30, 0.70]', '30: [0.0, 0.70]'],
  ['half past accepts it on the next number', 'core', '30: [0.30, 0.70]', '30: [0.30, 1.0]'],
  ['one window for every minute', 'core', 'var w = WINDOWS[m]; if (!w) return false;', 'var w = WINDOWS[30];'],
  ["o'clock accepts \"between\"", 'core', '0: [-0.2, 0.2]', '0: [-0.5, 0.5]'],
  ['the long hand graded by numeral = minutes', 'core', 'if (m === t.m && inWindow(st.short, t.h, t.m)) return', 'if ((m === t.m || m === (t.m * 5) % 60) && inWindow(st.short, t.h, t.m)) return'],
  ['swapped hands accepted', 'core', "if (k === 'ok') { st.done = true;", "if (k === 'ok' || k === 'swapped') { st.done = true;"],
  ['the receipt reads the hour by the nearest numeral', 'core', 'var m = settleLong(st.long), h = hourOf(st.short, m);', 'var m = settleLong(st.long), h = (Math.round(st.short / 12) % 12) || 12;'],
  ['the receipt never doubts the hour', 'core', 'unsure: !inWindow(st.short, h, m)', 'unsure: false'],
  ['the echo lands in the next slice', 'core', 'function echo(s, m) { var h = hourOf(s, m);', 'function echo(s, m) { var h = hourOf(s, m) % 12 + 1;'],
  ['a hand in the tray counts as a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['the second miss never escalates', 'core', "if (st.show >= 2) return { key: 'hintScale' };", ''],
  ['the short hand snaps on 5°', 'core', 'return mod(Math.round(mod(deg, 360) / 2.5), 144);', 'return mod(Math.round(mod(deg, 360) / 5) * 2, 144);'],
  ['the long hand settles on tens', 'core', 'function settleLong(m) { return mod(Math.round(m / 5) * 5, 60); }', 'function settleLong(m) { return mod(Math.round(m / 10) * 10, 60); }'],
  ['the same order twice', 'core', 'if (!eq(o, prev)) return { order: o };', 'return { order: o };'],
  ['the quarter list repeats a sibling time', 'core', "quarter: ['4:15', '9:45',", "quarter: ['3:15', '9:45',"],
  ['German 7:30 as "halb sieben"', 'act', "'7:30':'halb acht'", "'7:30':'halb sieben'"],
  ['es-MX quarter to as "menos cuarto"', 'act', "'9:45':'cuarto para las diez'", "'9:45':'las diez menos cuarto'"],
  ['the receipt prints while setting', 'act', '(v.showing || st.done) ? C.receipt(st) : null', 'C.receipt(st)'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sc-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SC_CORE_DIR: dir, SC_ACT_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-set-clock: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

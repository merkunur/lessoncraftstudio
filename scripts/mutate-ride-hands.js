#!/usr/bin/env node
/* =====================================================================
   mutate-ride-hands.js — does verify-ride-hands-core.js BITE? Run:
   node scripts/mutate-ride-hands.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. Mutations hit the core OR the activity (the
   roll geometry and the time phrases live in the activity). CRLF collapsed.
   (The clock, the riding digits and the cards as DRAWN are gated by local-test-ride-hands.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'ride-hands-core.js', act: 'ride-hands-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-ride-hands-core.js');
const MUTATIONS = [
  ['the hour part rides the long hand', 'core', 'var A = handAngles(target), hAt = passed(A.short), mAt = collar(A.long);', 'var A = handAngles(target), hAt = passed(A.long), mAt = collar(A.long);'],
  ['the minutes part ignores its collar', 'core', 'minutes: { at: mAt, merges: card.m === mAt }', 'minutes: { at: mAt, merges: true }'],
  ['the short hand ignores the minutes', 'core', 'return { short: (30 * (t.h % 12) + 0.5 * t.m) % 360, long: (6 * t.m) % 360 };', 'return { short: (30 * (t.h % 12)) % 360, long: (6 * t.m) % 360 };'],
  ['a round with two right cards', 'core', "['H3', '6:00', ['6:00', '12:00', '7:00']]", "['H3', '6:00', ['6:00', '12:00', '6:00']]"],
  ['the card shuffle off', 'core', 'var at = left[Math.floor(rnd() * left.length)]', 'var at = 0'],
  ['an hour never passes', 'core', 'function hourLater(t) { return { h: t.h % 12 + 1, m: t.m }; }', 'function hourLater(t) { return { h: t.h, m: t.m }; }'],
  ['colour words with the colours off', 'core', "var c = coloursOf(colours) === 'on' ? 'C' : '';", "var c = 'C';"],
  ['the second miss never escalates', 'core', "if (st.show >= 2) return { key: 'hintWatch' };", ''],
  ['an empty Check counts as a miss', 'core', "if (st.chosen == null) { st.last = { reason: 'none' }; return { result: 'none' }; }", "if (st.chosen == null) { st.misses++; st.last = { reason: 'none' }; return { result: 'none' }; }"],
  ['the half-past hour hint never shows', 'core', "st.r.target.m === 30 ? 'hintHourHalf' : 'hintHour'", "'hintHour'"],
  ['the same order twice', 'core', 'if (!same(o, prev)) return { order: o };', 'return { order: o };'],
  ['half past slides FORWARD to the next number', 'act', 'if (target.m === 30) pts.push(this._pol(D, D.numR, A.short - 15));', 'if (target.m === 30) pts.push(this._pol(D, D.numR, A.short + 15));'],
  ['German half past names the same hour', 'act', 'halb vier', 'halb drei'],
  ['a part that does not fit rests on a numeral', 'act', 'Math.max(D.chipW * 0.62, D.tip * 0.72)', 'D.numR'],
  ['the long hand reaches the numerals', 'act', 'longR: 0.62 * rD', 'longR: 0.8 * rD'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rh-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RH_CORE_DIR: dir, RH_ACT_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-ride-hands: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

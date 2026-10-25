#!/usr/bin/env node
/* =====================================================================
   mutate-sound-roll.js — does verify-sound-roll-core.js BITE? Run:
   node scripts/mutate-sound-roll.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the growing slot, the gold / coral comparison, the
   word's roll appearing only after Check, help taken away after a new
   punch — is gated by local-test-sound-roll.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'sound-roll-core.js', act: 'sound-roll-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-sound-roll-core.js');
const MUTATIONS = [
  ['a round hole is accepted for a long vowel', 'core', 'ok: st.rolls[i] === want', 'ok: st.rolls[i] != null'],
  ['Count counts letters, not sounds', 'core', "return st.holes.length === word(st.loc, st.words[0]).boxes.length ? 'ok' : 'count';", "return st.holes.length === word(st.loc, st.words[0]).display.length ? 'ok' : 'count';"],
  ['Count judges the length of the holes', 'core', "return st.holes.length === word(st.loc, st.words[0]).boxes.length ? 'ok' : 'count';", "return st.holes.length === word(st.loc, st.words[0]).boxes.length && st.holes.every(function (x) { return x === 'round'; }) ? 'ok' : 'count';"],
  ['Blend: the right picture always in slot 1', 'core', 'var R = DATA.blend[loc][r], pos = opts.pos == null ? 0 : opts.pos', 'var R = DATA.blend[loc][r], pos = 0'],
  ['the stretch mark at 200 ms', 'core', 'var STRETCH_MS = 450', 'var STRETCH_MS = 200'],
  ['an es row ships', 'core', '"LOCALES":["en"', '"LOCALES":["es","en"'],
  ['fi gets Long or short', 'core', '"fi":["count","blend"]', '"fi":["los","count","blend"]'],
  ['every vowel slot is long', 'core', "len: (i === w.v && w.long) ? 'long' : 'round'", "len: (i === w.v) ? 'long' : 'round'"],
  ['the split digraph loses its e', 'core', "g = b[0]; ghost = 'e';", 'g = b[0]; ghost = null;'],
  ['Check with nothing punched counts a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['the order ignores the fairness rule', 'core', 'if (!eq(c, prev) && fair(loc, clue, set, c))', 'if (!eq(c, prev))'],
  ['the sets do not alternate', 'core', 'var set = (pass || 0) % 2', 'var set = 0'],
  ['Blend may put the right picture three times running in one place', 'core', 'for (var q = 2; q < p.length; q++) if (p[q] === p[q - 1] && p[q] === p[q - 2]) ok = false;', ''],
  ['a hint prints a count', 'act', "en:'One hole for every sound, not every letter.'", "en:'One hole for every sound: fish has 3.'"],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SR_CORE_DIR: dir, SR_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-sound-roll: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

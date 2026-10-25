#!/usr/bin/env node
/* =====================================================================
   mutate-freezing-floes.js — does verify-freezing-floes-core.js BITE? Run:
   node scripts/mutate-freezing-floes.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the floes, the frost, the crack, the penguin, the shelves —
   is gated by local-test-freezing-floes.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'freezing-floes-core.js', act: 'freezing-floes-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-freezing-floes-core.js');
const MUTATIONS = [
  ['any pieces in any order freeze', 'core', 'while (n < SEATS && S[n] != null && n < syl.length && low(text(st, S[n])) === low(syl[n])) n++;', 'while (n < SEATS && S[n] != null && n < syl.length) n++;'],
  ['the right number of pieces is enough', 'core', 'ok: n === syl.length && filled === syl.length', 'ok: filled === syl.length'],
  ['pieces seat from the right', 'core', 'var k = S.indexOf(null); if (k < 0) return \'full\';', 'var k = S.lastIndexOf(null); if (k < 0) return \'full\';'],
  ['a miss un-freezes the right pieces', 'core', 'if (k < j.good) { st.frozen[i][k] = true; continue; }', 'if (k < j.good) { continue; }'],
  ['Read: the right picture always in the middle', 'core', 'p2 = opts.pos == null ? 0 : opts.pos,', 'p2 = 1,'],
  ['the help stays after a new move', 'core', 'function help0(st) { st.marks = null; st.last = null; }', 'function help0(st) { }'],
  ['a word may float in order in the pond', 'core', 'if (pondFair(sh)) { floes = sh; break; }', '{ floes = sh; break; }'],
  ['a Mixed start may be the answer', 'core', 'if (!eq(c2, id) && !(lastRev && eq(c2, rev))) { pm = c2; break; }', '{ pm = id; break; }'],
  ['a given piece cracks off too', 'core', 'if (st.given && st.given[k] && low(text(st, S[k])) === low(syl[k])) continue;', ''],
  ['Read accepts any picture', 'core', 'if (st.at === st.right) { st.done = true;', 'if (st.at >= 0) { st.done = true;'],
  ['a hint prints a count', 'act', "en:'Push the pieces of each picture\\'s word into its slot.'", "en:'Push the 2 pieces of each picture\\'s word into its slot.'"],
  ['Join sets do not alternate', 'core', "var set = clue === 'join' ? (pass || 0) % sets(loc) : 0,", 'var set = 0,'],
  ['an empty slot counts as a miss', 'core', "if (C !== 'mixed' && J.some(function (j) { return j.empty; })) { st.last = 'tray'; return { result: 'tray' }; }", ''],
  ['an en split from only two sources ships', 'core', '"rabbit":{"w":"rabbit","syl":["rab","bit"]', '"rabbit":{"w":"rabbit","syl":["ra","bbit"]'],
  ['an unused variable (control)', 'core', "  var SEATS = 3, CLUES = ['join', 'missing', 'mixed', 'read'];", "  var UNUSED_CONTROL = 0; var SEATS = 3, CLUES = ['join', 'missing', 'mixed', 'read'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ff-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FF_CORE_DIR: dir, FF_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-freezing-floes: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

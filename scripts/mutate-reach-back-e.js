#!/usr/bin/env node
/* =====================================================================
   mutate-reach-back-e.js — does verify-reach-back-e-core.js BITE? Run:
   node scripts/mutate-reach-back-e.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the arm, the coin flip, the badge, the washing line —
   is gated by local-test-reach-back-e.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'reach-back-e-core.js', act: 'reach-back-e-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-reach-back-e-core.js');
const MUTATIONS = [
  ['an e on a short word is accepted', 'core', "if (st.end === 'e' && !st.needsE) return 'eExtra';", ''],
  ['the arm reaches two letters back', 'core', 'function armTarget(st) { return endIdx(st) - 2; }', 'function armTarget(st) { return endIdx(st) - 3; }'],
  ['the vowel stays gold after the e is removed', 'core', "return st.end === 'e' && st.vowel && armTarget(st) === st.vIdx ? 'name' : 'short';", "return st.vowel && armTarget(st) === st.vIdx ? 'name' : 'short';"],
  ['the badge shows at miss 1', 'core', 'return st.show >= 2 && (st.last === ', 'return st.show >= 1 && (st.last === '],
  ['the e tile always in the same tray slot', 'core', 'var slot = opts.slot == null ? 2 : opts.slot,', 'var slot = 2,'],
  ['Read: the right picture always first', 'core', 'pos = opts.pos == null ? 0 : opts.pos, others = R.slice(1);', 'pos = 0, others = R.slice(1);'],
  ['cuke accepted for cake', 'core', "if (st.vowel !== st.answer) return 'vowel';", ''],
  ['the help stays after a new vowel', 'core', 'st.vowel = v; st.last = null;', 'st.vowel = v;'],
  ['a non-EN string ships', 'act', "{en:'Check'}", "{en:'Check',de:'Prüfen'}"],
  ['the e tile sits on one slot four times a pass', 'core', 'var p = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2], rnd)', 'var p = shuffle([0, 0, 0, 0, 1, 1, 1, 2, 2], rnd)'],
  ['the e answer may repeat three times running', 'core', "function fair(clue, set, o) { if (clue !== 'finish') return true;", 'function fair(clue, set, o) { return true;'],
  ['the sets do not alternate', 'core', "var set = clue === 'finish' ? (pass || 0) % 2 : 0,", 'var set = 0,'],
  ['the decoy consonant is accepted on the end', 'core', "if (st.end && st.end !== 'e') return 'end';", ''],
  ['a hint prints a count', 'act', "{en:'Pick a vowel for the middle.'}", "{en:'Pick 1 vowel for the middle.'}"],
  ['the pen is the pencil picture', 'core', "pen: 'classroom/pen'", "pen: 'around the house/pen'"],
  ['a vowel miss fills the badge', 'core', "(st.last === 'eExtra' || st.last === 'eMissing')", "(st.last !== 'tray' && st.last !== 'read')"],
  ['kite keeps the Kate decoy', 'core', "[['kite', 'u'],", "[['kite', 'a'],"],
  ['an unused variable (control)', 'core', "  var VOWELS = 'aeiou', DECOY = 'b';", "  var UNUSED_CONTROL = 0, VOWELS = 'aeiou', DECOY = 'b';"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rb-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RB_CORE_DIR: dir, RB_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-reach-back-e: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

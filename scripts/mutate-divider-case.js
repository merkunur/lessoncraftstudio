#!/usr/bin/env node
/* =====================================================================
   mutate-divider-case.js — does verify-divider-case-core.js BITE?
   Run: node scripts/mutate-divider-case.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the case, the walls, the pockets, the pictures — is
   gated by local-test-divider-case.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'divider-case-core.js', act: 'divider-case-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-divider-case-core.js');
const MUTATIONS = [
  ['en: "and" made a wall (no serial comma)', 'core', "function divides(loc) { return locale(loc) !== 'en'; }", 'function divides(loc) { return true; }'],
  ['the conjunction never a wall (a comma before und accepted)', 'core', "function divides(loc) { return locale(loc) !== 'en'; }", 'function divides(loc) { return false; }'],
  ['a comma after the lead accepted', 'core', 'q.empty = q.items.length === 0;', 'q.empty = q.items.length === 0 && i > 0;'],
  ['en: a comma after "and" accepted', 'core', 'q.split = !div && q.conj && q.items.indexOf(n) < 0;', 'q.split = false;'],
  ['two things in one pocket accepted', 'core', 'q.squash = q.items.length >= 2;', 'q.squash = q.items.length >= 3;'],
  ['level 3 without an already-right start', 'core', 'default: return R.slice();', 'default: return R.concat([0]);'],
  ['es: y before an i-word', 'core', "if (loc === 'es' && /^h?[ií]/.test(w) && !/^hi[aeoáéó]/.test(w)) return 'e';", ''],
  ['it: e before an e-word', 'core', "if (loc === 'it' && /^[eè]/.test(w)) return 'ed';", ''],
  ['a space before the comma', 'core', "if (k < n && on[k]) out += ',';", "if (k < n && on[k]) out += ' ,';"],
  ['Pack with no comma is a miss', 'core', "if (!st.commas.length) { st.last = 'empty'; return { result: 'empty' }; }", ''],
  ['a short list packs', 'core', "if (st.rd.kind === 'own' && st.picks.length < 3) { st.last = 'few'; return { result: 'few' }; }", ''],
  ['the glow from miss 1', 'core', 'if (st.done || st.last !== \'miss\' || st.show < 2) return null;', 'if (st.done || st.last !== \'miss\' || st.show < 1) return null;'],
  ['three then four mixed', 'core', "var c = kind(lvl) === 'place' && listsOf(lists) === '34' ?", "var c = false ?"],
  ['a picture in the wrong case', 'core', '"apple":"At the Supermarket/apple"', '"apple":"at the Supermarket/apple"'],
  ['a hint prints a digit', 'act', 'hintFew: {en:"A list needs three things or more."', 'hintFew: {en:"A list needs 3 things or more."'],
  ['an unused variable (control)', 'core', "  function levels() { return ['1', '2', '3']; }", "  var UNUSED_CONTROL = 0; function levels() { return ['1', '2', '3']; }"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dc-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { DC_CORE_DIR: dir, DC_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-divider-case: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

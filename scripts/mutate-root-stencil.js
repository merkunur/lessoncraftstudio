#!/usr/bin/env node
/* =====================================================================
   mutate-root-stencil.js — does verify-root-stencil-core.js BITE? Run:
   node scripts/mutate-root-stencil.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the stencil, the windows, the sleeves, the hooks — is gated by local-test-root-stencil.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'root-stencil-core.js', act: 'root-stencil-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-root-stencil-core.js');
const MUTATIONS = [
  ['a look-alike that shares three letters fits', 'core', 'var w = shows === rootWord.charAt(i);', 'var w = i >= 3 || shows === rootWord.charAt(i);'],
  ['any leftover counts as an ending (a trap fits)', 'core', 'if (s.ok && word === R.built && s.leftover === R.end) ok = true;', 'if (s.ok) ok = true;'],
  ['walkt-style spelling ships (jumpt)', 'core', '"built":"jumped","end":"ed"', '"built":"jumpt","end":"ed"'],
  ['the stencil shows its letters from the first miss', 'core', 'return !st.done && st.show >= 2 &&', 'return !st.done && st.show >= 1 &&'],
  ['Peel accepts a line inside the root', 'core', 'if (left === R.root && right === R.end) ok = true;', 'if (right === R.end || left.length < R.root.length) ok = true;'],
  ['Add: the answer always in the middle sleeve', 'core', 'p = opts.pos == null ? 0 : opts.pos % S.length;', 'p = 1;'],
  ['Find: the built word always in the first slot', 'core', 'pos = opts.pos == null ? 0 : opts.pos % R.cards.length;', 'pos = 0;'],
  ['the help stays after a new move', 'core', 'function help0(st) { st.marks = null; st.last = null; }', 'function help0(st) { }'],
  ['an it row ships', 'core', '"LOCALES":["en",', '"LOCALES":["it","en",'],
  ['a de umlaut plural ships (Hand → Hände)', 'core', '"root":"Uhr","pic":"around the house/clock","built":"Uhren","end":"en"', '"root":"Hand","pic":"body parts/hand","built":"Hände","end":"e"'],
  ['a wrong sleeve stays on', 'core', 'marks.sleeve = st.sleeve; st.sleeve = null;', 'marks.sleeve = st.sleeve;'],
  ['the same slot twice running', 'core', "run = clue === 'find' || slots === 3 ? 2 : 3;", 'run = 9;'],
  ['a hint prints a digit', 'act', 'en:"Lay a word in the frame first."', 'en:"Lay 1 word in the frame first."'],
  ['the look-alikes setting where there is no Tricky set', 'act', "RootStencilCore.hasTricky(lang) ? [this.settings[1]] : []", '[this.settings[1]]'],
  ['an unused variable (control)', 'core', "  var CLUES = ['find', 'peel', 'add'];", "  var UNUSED_CONTROL = 0; var CLUES = ['find', 'peel', 'add'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rs-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RS_CORE_DIR: dir, RS_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-root-stencil: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

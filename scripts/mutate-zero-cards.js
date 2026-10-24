#!/usr/bin/env node
/* =====================================================================
   mutate-zero-cards.js — does verify-zero-cards-core.js BITE? Run:
   node scripts/mutate-zero-cards.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a
   control that must SURVIVE. CRLF collapsed before searching.
   (The stand, cards, mat and trays as DRAWN are gated by local-test-zero-cards.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'zero-cards-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-zero-cards-core.js');
const MUTATIONS = [
  ["a ones card may lie beside the tens card (407 buildable)", "if (where !== 'zero') return 'tipped';", "if (where === 'left') return 'tipped';"],
  ["the zero is not swallowed (40 and 7 read 407)", "function value(st) { return (st.tens || 0) + (st.ones || 0); }", "function value(st) { return st.tens != null && st.ones != null ? st.tens * 10 + st.ones : (st.tens || 0) + (st.ones || 0); }"],
  ["the tens card pours cubes", "cubes: st.ones || 0 }; }", "cubes: (st.ones || 0) + (st.tens || 0) / 10 }; }"],
  ["a decade accepts a ones card", "var right = value(st) === r.n;", "var right = value(st) === r.n || (r.ones === 0 && st.tens === r.tens);"],
  ["the stretch reads 4 + 7", "args: { n: r.n, a: r.tens, b: r.ones } };", "args: { n: r.n, a: r.tens / 10, b: r.ones } };"],
  ["the comparison marks the wrong blocks", "extra: { rods: Math.max(0, tray.rods - stack.rods)", "extra: { rods: Math.max(0, stack.rods - tray.rods)"],
  ["two right trays in a round", "rest = swap ? [r.sets.off, r.sets.rev] : [r.sets.rev, r.sets.off]", "rest = swap ? [r.sets.off, r.sets.rev] : [r.sets.right, r.sets.off]"],
  ["the right tray always first", "var p = code % 3, swap", "var p = 0, swap"],
  ["the same order twice", "if (orderOk(face, range, o) && !same(o, prev))", "if (orderOk(face, range, o))"],
  ["the rods / cubes hint swapped", "return { key: b.rods !== w.rods ? 'hintRods' : 'hintCubes' };", "return { key: b.rods !== w.rods ? 'hintCubes' : 'hintRods' };"],
  ["the second miss never escalates", "if (st.show >= 2) return { key: r.kind === 'tens'", "if (false) return { key: r.kind === 'tens'"],
  ["an empty stand counts as a miss", "if (st.tens == null && st.ones == null) { st.last = { reason: 'none', hint: 'hintEmpty' }; return { result: 'none', hint: 'hintEmpty' }; }", ""],
  ["pull apart is right without the stretch", "      if (r.dir === 'apart' && !st.stretched) { st.last = { reason: 'none', hint: 'hintStretch' }; return { result: 'none', hint: 'hintStretch' }; }\n", ""],
  ["the right tray may sit in one place round after round", "c[2] === per && twice <= 1;", "c[2] === per && twice <= 9;"],
  ["to 20 offers every tens card", "var max = rangeOf(range) === '20' ? 20 :", "var max = rangeOf(range) === '20' ? 90 :"],
  ["a finished round still moves", "function fixed(st) { return st.r.kind === 'which' || st.done; }", "function fixed(st) { return st.r.kind === 'which'; }"],
  ["a 0 target sneaks in", "'20': [[10, 'tens'], [11, 'word']", "'20': [[10, 'tens'], [0, 'word']"],
  ["an unused variable (control)", "  function split(n) {", "  var UNUSED_CONTROL = 0; function split(n) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'zc-mut-'));
  fs.writeFileSync(path.join(dir, 'zero-cards-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { ZC_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-zero-cards: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

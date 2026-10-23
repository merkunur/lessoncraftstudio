#!/usr/bin/env node
/* =====================================================================
   mutate-rung-ladder.js — does verify-rung-ladder-core.js BITE? Run: node scripts/mutate-rung-ladder.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The yard as DRAWN — the rails, the rungs, the squirrel, the acorn —
   is gated by local-test-rung-ladder.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'rung-ladder-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-rung-ladder-core.js');
const MUTATIONS = [
  ['unequal rails count as a ladder',                   "return { done: va === vs, rungs: Math.min(va, vs)", "return { done: Math.abs(va - vs) <= 1, rungs: Math.min(va, vs)"],
  ['Undo it ignores the seam',                          "var sa = A.a, ss = S.a - S.b, rungs = Math.min(sa, ss);", "var sa = A.a + A.b, ss = S.a, rungs = Math.min(sa, ss);"],
  ['the stop gap is one short',                         "open: Math.abs(va - vs), side: va > vs ? 'add' : 'sub', seam: false", "open: Math.abs(va - vs) - 1, side: va > vs ? 'add' : 'sub', seam: false"],
  ['the longer side is reversed',                       "open: Math.abs(va - vs), side: va > vs ? 'add' : 'sub'", "open: Math.abs(va - vs), side: va < vs ? 'add' : 'sub'"],
  ['the Undo it partner is the other subtraction',      "(sub.a === add.a + add.b && sub.b === add.b)", "(sub.a === add.a + add.b && sub.b === add.a)"],
  ['two additions pair',                                "if (o.kind === c.kind) { st.selected = id; st.last = { reason: 'kind' }; return 'kind'; }", ""],
  ['a climbed card can be picked again',                "var c = card(st.r, id); if (!c || used(st, id)) return null;", "var c = card(st.r, id); if (!c) return null;"],
  ['a miss is not counted',                             "st.misses++; st.show = Math.min(2, st.misses);", "st.show = Math.min(2, st.misses);"],
  ['the round ends after one ladder',                   "if (st.climbed.length * 2 === st.r.cards.length) st.done = true;", "st.done = true;"],
  ['moving on keeps the old help',                      "function moved(st) { st.show = 0; st.last = null; }", "function moved(st) { st.show = 0; }"],
  ['miss 2 never looks again',                          "if (st.show >= 2) return undo ? 'hSeam' : 'hLook';", ""],
  ['the sawn ghosts are gone from Undo it',             "if (level === 'undo') for (i = 0; i < c.b; i++) out.push('g');", ""],
  ['the Undo it tag prints the wrong part',             "' = ' + (A.a + A.b) + ' · ' + text(S) + ' = ' + A.a;", "' = ' + (A.a + A.b) + ' · ' + text(S) + ' = ' + A.b;"],
  ['a card set with two partners',                      "['1+2', '2+4', '6-3', '8-2']", "['1+2', '2+4', '6-3', '9-3']"],
  ['a family with equal parts',                         "[[3, 5], [4, 6],", "[[3, 3], [4, 6],"],
  ['the plan may repeat the last pass',                 "if (!(prev && prev.length && prev.join() === order.join())) break;", "break;"],
  ['a done round still takes taps',                     "if (st.done || st.pending) return null;", "if (st.pending) return null;"],
  ['an unused variable (control)',                      "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rl-mut-'));
  fs.writeFileSync(path.join(dir, 'rung-ladder-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RL_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-rung-ladder: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

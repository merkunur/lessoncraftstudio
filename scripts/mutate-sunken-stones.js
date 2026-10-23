#!/usr/bin/env node
/* =====================================================================
   mutate-sunken-stones.js — does verify-sunken-stones-core.js BITE? Run: node scripts/mutate-sunken-stones.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The pond as DRAWN — the sunken stones, the splash, Lily, the arcs —
   is gated by local-test-sunken-stones.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'sunken-stones-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-sunken-stones-core.js');
const MUTATIONS = [
  ['a crossing leap lands',                            "if (sunken(st, t)) { st.last = { reason: 'splash' };", "if (false) { st.last = { reason: 'splash' };"],
  ['the far side stays sunk after ten',                "if (st.tenVisited || st.lily == null || stone === 10) return false;", "if (st.lily == null || stone === 10) return false;"],
  ['a leap may use more beads than the rope holds',    "if (n > maxLeap(st)) {", "if (n > maxLeap(st) + 1) {"],
  ['a wrong typed answer is accepted',                 "if (n === r.answer) { st.done = true;", "if (n === r.answer || n === st.lily) { st.done = true;"],
  ['Lily may leap backwards',                          "var n = (stone - st.lily) * st.r.dir; if (n < 1) return null;", "var n = Math.abs(stone - st.lily); if (n < 1) return null;"],
  ['the bank accepts 19',                              "return st.lily != null && (st.r.kind === 'bank' ? st.lily === 20 : st.rope === 0);", "return st.lily != null && (st.r.kind === 'bank' ? st.lily >= 19 : st.rope === 0);"],
  ['past the bank does not splash',                    "if (t > 20 || t < 0) {", "if (t > 21 || t < 0) {"],
  ['an answer equal to the rope',                      "['add', 6, 3], ['add', 9, 4], ['anchor', 3, 8], ['anchor', 9, 2]", "['add', 6, 3], ['add', 9, 4], ['anchor', 3, 8], ['anchor', 9, 0]"],
  ['two equal answers may stand side by side',         "if (x.answer === y.answer) bad = true;", ""],
  ['long runs of + or − are allowed',                  "if (level === 'both' && run > 2) bad = true;", ""],
  ['a splash counts as a miss',                        "if (sunken(st, t)) { st.last = { reason: 'splash' };", "if (sunken(st, t)) { st.misses++; st.last = { reason: 'splash' };"],
  ['the keys wake before Lily is done',                "if (st.done || !finished(st)) return false;", "if (st.done) return false;"],
  ['a choose-start round accepts any stone',           "if (st.done || st.start != null || r.starts.indexOf(s) < 0) return false;", "if (st.done || st.start != null) return false;"],
  ['undo forgets the beads',                           "st.lily = st.stops[st.stops.length - 1]; if (st.rope != null) st.rope += n;", "st.lily = st.stops[st.stops.length - 1];"],
  ['the bank rounds leap up to 20',                    "var BANK_MAX = 10;", "var BANK_MAX = 20;"],
  ['a doubles round is back',                          "['anchor', 9, 2], ['add', 6, 7],", "['anchor', 9, 2], ['add', 7, 7],"],
  ['miss 2 never shows the ten',                       "if (st.show >= 2 && viaTen(st)) return above ? 'hTenOn' : 'hTenBack';", ""],
  /* (not mutated: 'on / back by the operation' — an EQUIVALENT mutant: a path only stops at ten in crossing rounds, where the operation and the side of ten always agree) */
  ['the plan may repeat the last pass',                "if (prev && prev.length && prev.join() === order.join()) continue;", ""],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sk-mut-'));
  fs.writeFileSync(path.join(dir, 'sunken-stones-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SK_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-sunken-stones: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

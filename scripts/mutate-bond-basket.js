#!/usr/bin/env node
/* =====================================================================
   mutate-bond-basket.js — does verify-bond-basket-core.js BITE? Run: node scripts/mutate-bond-basket.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The basket as DRAWN — the cloth hiding the pour, the tag never showing
   the running count, the nudge — is gated by local-test-bond-basket.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'bond-basket-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-bond-basket-core.js');
const MUTATIONS = [
  ['a second pour into a full basket',                 "if (st.done || r.face === 'whole' || st.poured || (side !== 'L' && side !== 'R')) return false;", "if (st.done || r.face === 'whole' || (side !== 'L' && side !== 'R')) return false;"],
  ['make-the-whole takes a post past the whole',      "if (st.r.face === 'whole' && st.under + st.posted >= st.r.whole) { moved(st); st.last = { reason: 'full' }; return 'full'; }", ""],
  ['the arc counts from 1, not from the cloth',        "for (var i = 1; i <= st.posted; i++) out.push(st.under + i);", "for (var i = 1; i <= st.posted; i++) out.push(i);"],
  ['the cloth shows the other bowl',                   "st.under = side === 'L' ? r.a : r.b; st.left = side === 'L' ? r.b : r.a;", "st.under = side === 'L' ? r.b : r.a; st.left = side === 'L' ? r.a : r.b;"],
  ['seven pictures in a bowl at 704',                  "pic: wide ? 96 : 64, cap: wide ? 6 : 4", "pic: wide ? 96 : 64, cap: wide ? 7 : 4"],
  ['the bowl with more is always on the left',         "total: [[3, 4], [6, 2],", "total: [[4, 3], [6, 2],"],
  ['a pass may repeat the last order',                 "if (!(prev && prev.length && prev.join() === order.join())) break;", "break;"],
  ['a part of 0',                                      "[1, 5], [2, 2], [3, 5]]", "[0, 6], [2, 2], [3, 5]]"],
  ['Check ignores the things still waiting',           "      if (st.left > 0) return hintOnly(st, 'waiting');", ""],
  ['one off is accepted',                              "if (+st.typed === r.answer) {", "if (Math.abs(+st.typed - r.answer) <= 1) {"],
  ['a hint counts as a miss',                          "function hintOnly(st, why) { st.last = { reason: why };", "function hintOnly(st, why) { st.misses++; st.last = { reason: why };"],
  ['empty keeps the pour',                             "else { st.poured = null; st.under = 0; st.posted = 0; st.left = 0; st.smallerFirst = false; }", "else { st.posted = 0; st.left = 0; }"],
  ['dice of 1–6 split in two',                         "function dice(n) { return n <= 6 ? [n] : [5, n - 5]; }", "function dice(n) { return [5, n - 5]; }"],
  ['the tray holds exactly the answer',                "var TRAY_EXTRA = 2;", "var TRAY_EXTRA = 0;"],
  ['a post before any pour',                           "if (st.done || !st.poured || st.left <= 0) return false;", "if (st.done || st.left < 0) return false;"],
  ['a new move keeps the help',                        "function moved(st) { st.show = 0; st.last = null; }", "function moved(st) { st.last = null; }"],
  ['make-the-whole miss 1 says count on',               "return st.r.face === 'whole' ? 'hMiss1w' : 'hMiss1';", "return 'hMiss1';"],
  ['an unused variable (control)',                     "  function bigger(r) {", "  var UNUSED_CONTROL = 0; function bigger(r) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bb-mut-'));
  fs.writeFileSync(path.join(dir, 'bond-basket-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BB_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-bond-basket: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

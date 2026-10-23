#!/usr/bin/env node
/* =====================================================================
   mutate-ten-plug.js — does verify-ten-plug-core.js BITE? Run: node scripts/mutate-ten-plug.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The rack, stick and shelves as DRAWN — the gold ten, the bounce, the
   ghost ones — are gated by local-test-ten-plug.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'ten-plug-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-ten-plug-core.js');
const MUTATIONS = [
  ['a too-long piece is accepted',                     "if (p.len > room) { moved(st);", "if (false) { moved(st);"],
  ['a too-short piece fills the ten',                  "if (p.len < room) { moved(st); st.last = { reason: 'short'", "if (false) { moved(st); st.last = { reason: 'short'"],
  ['the hole is 10 − b',                               "function hole(st) { return 10 - st.a; }", "function hole(st) { return 10 - st.b; }"],
  ['10 + b is accepted',                               "if (n === r.answer) {", "if (n === r.answer || n === 10 + st.b) {"],
  ['swap changes the total',                           "var t = st.a; st.a = st.b; st.b = t;", "var t = st.a; st.a = st.b; st.b = t; st.r = Object.assign({}, st.r, { answer: st.r.answer + 1 });"],
  ['Make 10 accepts the k-piece',                      "var room = hole(st) - inRack(st);", "var room = hole(st) - inRack(st); if (st.r.level === 'm10' && p.len === st.a) room = p.len;"],
  ['the keys wake before the plug',                    "if (st.mode === 'snap' && !st.plugged) return false;", ""],
  ['a default round that does not cross ten',          "[7, 4], [9, 7]", "[3, 4], [9, 7]"],
  ['two equal totals may stand side by side',          "if (round(level, order[p]).answer === round(level, order[p - 1]).answer) bad = true;", ""],
  ['the bond shows the wrong split',                   "if (wasWhole) st.first = [j, p.len - j];", "if (wasWhole) st.first = [p.len - j, j];"],
  ['swap is offered on every round',                   "swapOk: s[0] < s[1] };", "swapOk: true };"],
  ['the ghost counts the whole typed number',          "var g = Math.max(0, st.last.n - 10), L = left(st);", "var g = st.last.n, L = left(st);"],
  ['a fourth piece is allowed',                        "st.pieces.length >= MAX_PIECES", "st.pieces.length >= MAX_PIECES + 1"],
  ['In my head never shows the strategy',              "if (!st.plugged) { autoPlug(st); st.last = { reason: 'shown', n: n }; }", "if (false) { autoPlug(st); st.last = { reason: 'shown', n: n }; }"],
  ['the tick before the plug counts as a miss',        "if (st.mode === 'snap' && !st.plugged) { st.last = { reason: 'snap' };", "if (st.mode === 'snap' && !st.plugged) { st.misses++; st.last = { reason: 'snap' };"],
  ['a leading 0 is accepted',                          "(st.typed === '' && d === '0')", "false"],
  ['the plan may repeat the last pass',                "if (prev && prev.length && prev.join() === order.join()) continue;", ""],
  ['the 10 + b slip is not named',                    "return g && g.extra > 0 ? 'hOver' : 'hLeft';", "return 'hLeft';"],
  ['a snapped stick still says snap',                  "return whole(st) ? 'hSnap' : 'hSnap2';", "return 'hSnap';"],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tp-mut-'));
  fs.writeFileSync(path.join(dir, 'ten-plug-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TP_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-ten-plug: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   mutate-two-gauges.js — does verify-two-gauges-core.js BITE? Run: node scripts/mutate-two-gauges.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The gauges as DRAWN — the needles, the trails, the gap, the path —
   are gated by local-test-two-gauges.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'two-gauges-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-two-gauges-core.js');
const MUTATIONS = [
  ['a result round rests on its answer',               "if (r.kind !== 'result') out[other] = value(other === 'L' ? r.L : r.R);", "out[other] = value(other === 'L' ? r.L : r.R);"],
  ['the minuend hint prints the start number',         "return { side: r.socket.side, from: ov, to: ov + bb, hint: 'hOn', args: { a: ov, b: bb }, endsOnAnswer: true };", "return { side: r.socket.side, from: ov, to: ov + bb, hint: 'hSteps', args: { k: ov, target: ov + bb }, endsOnAnswer: true };"],
  ['each gauge reads the other side',                  "return { L: termsWith(r.L, v, 'L', r.socket), R: termsWith(r.R, v, 'R', r.socket) };", "return { L: termsWith(r.R, v, 'R', r.socket), R: termsWith(r.L, v, 'L', r.socket) };"],
  ['a take-away sweeps forward',                       "      s += terms[i].op === '-' ? -terms[i].n : terms[i].n;", "      s += terms[i].n;"],
  ['no zero pin',                                      "if (s < 0) { stops.push(0); pin = 'zero'; break; }", ""],
  ['the stop pin one early',                           "if (s > top) { stops.push(top); pin = 'stop'; break; }", "if (s >= top) { stops.push(top); pin = 'stop'; break; }"],
  ['the counting path starts on the known tick',       "return { side: r.socket.side, from: kv, to: ov, hint: 'hSteps', args: { k: kv, target: ov }, endsOnAnswer: false };", "return { side: r.socket.side, from: kv - 1, to: ov, hint: 'hSteps', args: { k: kv, target: ov }, endsOnAnswer: false };"],
  ['the socket takes 0',                               "if (!(v >= 1 && v <= st.r.vmax)) return false;", "if (!(v >= 0 && v <= st.r.vmax)) return false;"],
  ['two answers alike in a level',                     "['2+?=8', 6]", "['2+?=9', 7]"],
  ['the socket on the left once more',                 "['6+3=?', 9]", "['?=6+3', 9]"],
  ['a blank kind may come 3 times running',            "if (run > 2) return false;", "if (run > 3) return false;"],
  ['the plan may repeat the last pass',                "ok = runOk(level, order) && !(prev && prev.length && prev.join() === order.join());", "ok = runOk(level, order);"],
  ['the gadgets never reshuffle',                      "gadgets: shuffle(GADGETS.map(function (g, i) { return i; }), rnd)", "gadgets: GADGETS.map(function (g, i) { return i; })"],
  ['a new number keeps the help',                      "function moved(st) { st.show = 0; st.last = null; st.run = null; }", "function moved(st) { st.show = 0; }"],
  ['an empty socket is a miss',                        "if (st.value == null) { st.last = { reason: 'empty' };", "if (st.value == null) { st.misses++; st.last = { reason: 'empty' };"],
  ['a difference gets the adding prompt',              "if (r.kind === 'result') return other[1].op === '-' ? { key: 'pDiff'", "if (r.kind === 'result') return other[1].op === '+' ? { key: 'pDiff'"],
  ['a balance hint names the answer',                  "return { side: r.socket.side, from: kv, to: ov, hint: 'hBoth', args: { n: ov }, endsOnAnswer: false };", "return { side: r.socket.side, from: kv, to: ov, hint: 'hBoth', args: { n: ov - kv }, endsOnAnswer: false };"],
  ['a difference counts back again',                   "if (other[1].op === '-') return { side: r.socket.side, from: b, to: a, hint: 'hSteps', args: { k: b, target: a }, endsOnAnswer: false };", "if (other[1].op === '-') return { side: r.socket.side, from: a, to: a - b, hint: 'hOn', args: { a: a, b: b }, endsOnAnswer: true };"],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tg-mut-'));
  fs.writeFileSync(path.join(dir, 'two-gauges-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TG_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-two-gauges: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

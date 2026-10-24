#!/usr/bin/env node
/* =====================================================================
   mutate-travel-cord.js — does verify-travel-cord-core.js BITE? Run:
   node scripts/mutate-travel-cord.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first; the last needle is a
   control that must SURVIVE. CRLF collapsed before searching.
   (The wall, ribbons, cord and tags as DRAWN are gated by local-test-travel-cord.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'travel-cord-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-travel-cord-core.js');
const MUTATIONS = [
  ["a ribbon as long as the cord reads shorter", "return x.len < r.cord ? 'short'", "return x.len <= r.cord ? 'short'"],
  ["the cord changes length in one round", "var r = { id: row[0], kind: row[1], things: thingsOf(t), question: questionOf(q), cord: CORD,", "var r = { id: row[0], kind: row[1], things: thingsOf(t), question: questionOf(q), cord: row[0] === 'L2' ? 5 : CORD,"],
  ["a round with two ribbons longer than the cord", "['L3', 'long', [['purple', 7, 'C'], ['red', 6, 'H']", "['L3', 'long', [['purple', 7, 'C'], ['red', 8, 'H']"],
  ["the shelf ribbon is drawn longer than it is", "x1: 4.2 + o + x.len, y1: 2.7 }", "x1: 4.2 + o + x.len + 1, y1: 2.7 }"],
  ["the answer is simply the longest", "return hits.length === 1 ? hits[0].id : null;", "return it.slice().sort(function (a, b) { return b.len - a.len; })[0].id;"],
  ["order accepts longest first", "if (st.slots.join() === answer(r).join())", "if (st.slots.join() === answer(r).join() || st.slots.join() === answer(r).slice().reverse().join())"],
  ["tall things compared by their tops", "r.items = row[3].map(function (h, k) { return { id: STANDS[k], stand: STANDS[k], len: h, home: STANDS[k] }; });", "r.items = row[3].map(function (h, k) { return { id: STANDS[k], stand: STANDS[k], len: h + STAND_H[STANDS[k]], home: STANDS[k] }; });"],
  ["the answer always hangs in a close call", "var hang = rnd() < 0.25 ? r.flags.c[0] : r.flags.c[1]", "var hang = r.flags.c[0]"],
  ["close-call rivals may lie the same way", "        if (r.flags.c) {\n", "        if (false) {\n"],
  ["illusion rounds get shuffled", "if (r.flags.i) p = r.items.map(function (x) { return x.home; });", "if (false) p = r.items.map(function (x) { return x.home; });"],
  ["Check takes an answer before the cord has been to all three", "if (Object.keys(st.tags).length < r.items.length) {", "if (Object.keys(st.tags).length < 1) {"],
  ["the second miss never escalates", "if (st.show >= 2) return { key: 'hintTags2' + T };", "if (false) return { key: 'hintTags2' + T };"],
  ["an empty Check counts as a miss", "if (st.chosen == null) { var k = r.things === 'tall' ? 'hintNoneTall' : 'hintNone'; st.last = { reason: 'none', hint: k }; return { result: 'none', hint: k }; }", ""],
  ["a finished round still measures", "if (st.done || !item(st.r, id)) return null;", "if (!item(st.r, id)) return null;"],
  ["start offsets beyond two units", "out.off[x.id] = Math.floor(rnd() * 5) / 2;", "out.off[x.id] = Math.floor(rnd() * 7) / 2;"],
  ["one question three times in a row", "if (a === b && b === c) return false;", ""],
  ["the same order twice", "if (orderOk(q, t, o) && !same(o, prev)) return { order: o };", "if (orderOk(q, t, o)) return { order: o };"],
  ["the T8 trap undone", "['T8', 'short', 'bottle', [8, 6, 5], { i: 1 }]", "['T8', 'short', 'bottle', [9, 7, 4], { i: 1 }]"],
  ["an unused variable (control)", "  function locale(l) {", "  var UNUSED_CONTROL = 0; function locale(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-mut-'));
  fs.writeFileSync(path.join(dir, 'travel-cord-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TC_CORE_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-travel-cord: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

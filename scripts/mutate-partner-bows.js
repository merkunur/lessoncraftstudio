#!/usr/bin/env node
/* =====================================================================
   mutate-partner-bows.js — does verify-partner-bows-core.js BITE?
   Run: node scripts/mutate-partner-bows.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'partner-bows-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-partner-bows-core.js');
const MUTATIONS = [
  ['a mismatched pair', "{ a: 'mouse', aTheme: 'forest creatures', b: 'cheese', bTheme: 'breakfast' },", "{ a: 'mouse', aTheme: 'forest creatures', b: 'carrot', bTheme: 'easter' },"],
  ['the spacing gives the answer again', "{ a: 9, b: 6, trick: 'a' }", "{ a: 9, b: 6, trick: 'b' }"],
  ['no same round tricked', "{ a: 7, b: 7, trick: 'b' }", "{ a: 7, b: 7, trick: '' }"],
  ['no room for the More corner', "var PLACES = { to10: 12, to5: 8 };", "var PLACES = { to10: 10, to5: 5 };"],
  ['the same partners every round', "k = KINDS[i % KINDS.length];", "k = KINDS[0];"],
  ['even spacing keeps the trick', "trick: spacing === 'even' ? '' : p.trick,", "trick: p.trick,"],
  ['the answer flipped', "answer: p.a > p.b ? 'a' : p.a < p.b ? 'b' : 'same' });", "answer: p.a > p.b ? 'b' : p.a < p.b ? 'a' : 'same' });"],
  ['a bow cannot be undone', "if (k >= 0) { st.pairs.splice(k, 1); st.pick = null; st.checked = null; return 'unpair'; }", "if (k >= 0) { return false; }"],
  ['two from one group pair up', "if (st.pick && st.pick.side !== side) {", "if (st.pick && !(st.pick.side === side && st.pick.i === i)) {"],
  ['pairs stored upside down', "st.pairs.push([pa, pb]);", "st.pairs.push([pb, pa]);"],
  ['pairing the rest pairs too many', "var n = Math.min(fa.length, fb.length);", "var n = Math.max(fa.length, fb.length);"],
  ['any answer is right', "else if (st.choice !== st.answer) slip = 'wrong';", "else if (false) slip = 'wrong';"],
  ['help pairs at miss 1', "if (st.misses >= 2) { pairAll(st); st.helped = true; }", "if (st.misses >= 1) { pairAll(st); st.helped = true; }"],
  ['done leaves pairs unmade', "if (res.ok) { st.done = true; pairAll(st); }", "if (res.ok) { st.done = true; }"],
  ['hints swapped', "return canPair(st) ? 'hintPair' : 'hintLeft';", "return canPair(st) ? 'hintLeft' : 'hintPair';"],
  ['rings stay after a change', "return st.done || (helpLevel(st) >= 2 && !!st.checked);", "return st.done || helpLevel(st) >= 2;"],
  ['no More corner kept free', "function reserved(L, c, r) { return r === 0 && (c === L.cols - 1 || (L.mode === 'narrow' && c === L.cols - 2)); }", "function reserved(L, c, r) { return false; }"],
  ['the huddle spread out too', "if (style === 'huddle') pickCells = free.slice(0, n);", "if (style === 'huddle') pickCells = free.filter(function (q, j) { return j % 2 === 0; }).concat(free.filter(function (q, j) { return j % 2 === 1; })).slice(0, n);"],
  ['the spread group bunched', "Math.round(i * (zig.length - 1) / (n - 1))", "i"],
  ['the trick never drawn', "var style = !st.trick ? 'even' : (st.trick === side ? 'spread' : 'huddle');", "var style = 'even';"],
  ['tiny desktop pictures', "cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 6;", "cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 30;"],
  ['phone cells uncapped', "cell = Math.min(66, Math.floor((W - 2 * PAD) / 4));", "cell = Math.min(90, Math.floor((W - 2 * PAD) / 4));"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-mut-'));
  fs.writeFileSync(path.join(dir, 'partner-bows-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PB_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-partner-bows: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

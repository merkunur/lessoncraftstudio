#!/usr/bin/env node
/* =====================================================================
   mutate-bug-jar.js — does verify-bug-jar-core.js BITE?
   Run: node scripts/mutate-bug-jar.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'bug-jar-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-bug-jar-core.js');
const MUTATIONS = [
  ['a round equal to the yardstick', "{ n: 16, arr: 'array', rows: 4, cols: 4 },", "{ n: 10, arr: 'array', rows: 2, cols: 5 },"],
  ['a 0 round', "{ n: 2, arr: 'line' },", "{ n: 0, arr: 'line' },"],
  ['the yardstick jar holds nine', "var BENCH = { to16: 10, to10: 5 };", "var BENCH = { to16: 9, to10: 5 };"],
  ['the same bug every round', "noun: NOUNS[i % NOUNS.length], bench:", "noun: NOUNS[0], bench:"],
  ['the guess can be changed after the pour', "if (!st || st.done || st.phase !== 'jar' || !st.guessOn || (g !== 'fewer' && g !== 'more')) return false;", "if (!st || st.done || !st.guessOn || (g !== 'fewer' && g !== 'more')) return false;"],
  ['pour without a guess', "return !!st && !st.done && st.phase === 'jar' && (!st.guessOn || !!st.guess);", "return !!st && !st.done && st.phase === 'jar';"],
  ['a tick never comes off', "st.ticks[k] = !st.ticks[k];", "st.ticks[k] = true;"],
  ['the tick order not kept', "if (st.ticks[k]) { if (j < 0) st.seq.push(k); }", "if (st.ticks[k]) { if (j < 0) st.seq.unshift(k); }"],
  ['the label starts at 1', "return st.answer === null ? st.bench : st.answer;", "return st.answer === null ? 1 : st.answer;"],
  ['the label reaches 0', "if (v < 1 || v > st.max) return false;", "if (v < 0 || v > st.max) return false;"],
  ['the label past the top', "if (v < 1 || v > st.max) return false;", "if (v < 1) return false;"],
  ['Check before the pour grades', "if (st.phase !== 'count') slip = 'pour';", "if (false) slip = 'pour';"],
  ['a start is a miss', "else if (slip === 'more' || slip === 'fewer') st.misses++;", "else st.misses++;"],
  ['no last-number help', "if (helpLevel(st) >= 2) return 'hintLast';", "if (helpLevel(st) >= 9) return 'hintLast';"],
  ['no unticked hint', "if (unticked(st) > 0) return 'hintTicks';", "if (false) return 'hintTicks';"],
  ['done numbers ignore the tick order', "var ord = st.seq.slice(); readingOrder", "var ord = []; readingOrder"],
  ['help numbers stay after a change', "} else if (helpLevel(st) >= 2 && st.checked) {", "} else if (helpLevel(st) >= 2) {"],
  ['help numbers give the last one', "out[k] = j === st.n - 1 ? '?' : String(j + 1);", "out[k] = String(j + 1);"],
  ['the verdict scores the guess', "key: 'verdict' + (side === 'more' ? 'More' : 'Fewer') + (st.guess === side ? 'Yes' : 'No') };", "key: 'verdict' + (st.guess === 'more' ? 'More' : 'Fewer') + (st.guess === side ? 'Yes' : 'No') };"],
  ['the 320 tray left too tall', "var tight = !wide && W < 300;", "var tight = false;"],
  ['wide pictures under the floor', "var pic = wide ? cell - 4 : cell - 2;", "var pic = wide ? cell - 12 : cell - 2;"],
  ['wide cells uncapped', "var cell = wide ? Math.min(100, Math.floor((W - 2 * PAD) / 6))", "var cell = wide ? Math.min(130, Math.floor((W - 2 * PAD) / 4))"],
  ['the line bunched', "var g = n > 1 ? Math.min(L.cell, (inner - s) / (n - 1)) : 0;", "var g = n > 1 ? s * 0.6 : 0;"],
  ['rows of five', "var C = st.arr === 'array' ? st.cols : 4, R = st.arr === 'array' ? st.rows : Math.ceil(n / 4);", "var C = st.arr === 'array' ? st.cols : 5, R = st.arr === 'array' ? st.rows : Math.ceil(n / 5);"],
  ['the ring squeezed', "var r = (inner - s) / 2;", "var r = (inner - s) / 4;"],
  ['the scatter crowded', "minD = s * (tries < 100 ? 1.04 : 0.96);", "minD = s * 0.5;"],
  ['jars packed unfairly', "var PACK = { size: 0.44, perRow: 3, rowsMax: 7, hFrac: 0.39 };", "var PACK = { size: 0.44, perRow: 30, rowsMax: 7, hFrac: 0.39 };"],
  ['a heap with no layers', "var row = Math.floor(i / P.perRow), col = i % P.perRow", "var row = 0, col = i % P.perRow"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bj-mut-'));
  fs.writeFileSync(path.join(dir, 'bug-jar-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BJ_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-bug-jar: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

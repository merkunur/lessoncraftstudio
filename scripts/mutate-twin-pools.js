#!/usr/bin/env node
/* =====================================================================
   mutate-twin-pools.js — does verify-twin-pools-core.js BITE?
   Run: node scripts/mutate-twin-pools.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'twin-pools-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-twin-pools-core.js');
const MUTATIONS = [
  ['a 0 round put back', "{ n: 1, arr: 'scatter', model: 'shrimp', twin: 'pufferfish' },", "{ n: 0, arr: 'scatter', model: 'shrimp', twin: 'pufferfish' },"],
  ['a round dropped', "      { n: 5, arr: 'scatter', model: 'angelfish', twin: 'crab' }\n", ""],
  ['the twin pool just big enough', "var PLACES = { to10: 12, to5: 8 };", "var PLACES = { to10: 10, to5: 5 };"],
  ['the twin is the same creature', "model: p.model, twin: twin === 'same' ? p.model : p.twin, places: PLACES[key] });", "model: p.model, twin: p.model, places: PLACES[key] });"],
  ['the same-creatures setting ignored', "twin: twin === 'same' ? p.model : p.twin,", "twin: p.twin,"],
  ['a generic fish to count', "'pufferfish', 'angelfish'];", "'pufferfish', 'fish'];"],
  ['a full place takes two', "|| p >= st.places || isFilled(st, p)) return false;", "|| p >= st.places) return false;"],
  ['the pool overfills', "|| p >= st.places || isFilled(st, p)) return false;", "|| isFilled(st, p)) return false;"],
  ['remove takes the last one', "st.filled.splice(i, 1); st.checked = null; return true;", "st.filled.pop(); st.checked = null; return true;"],
  ['a change keeps the old verdict', "st.filled.push(p); st.filled.sort(function (a, b) { return a - b; }); st.checked = null; return true;", "st.filled.push(p); st.filled.sort(function (a, b) { return a - b; }); return true;"],
  ['empty does nothing', "st.filled = []; st.checked = null; return true; }", "st.checked = null; return true; }"],
  ['a mark never comes off', "st.marks[k] = !st.marks[k]; return true;", "st.marks[k] = true; return true;"],
  ['a done pool still changes', "if (!st || st.done || p !== Math.floor(p)", "if (!st || p !== Math.floor(p)"],
  ['more and fewer swapped', "slip = a > st.n ? 'more' : 'fewer';", "slip = a > st.n ? 'fewer' : 'more';"],
  ['one off is right', "else if (a !== st.n) slip", "else if (Math.abs(a - st.n) > 1) slip"],
  ['an empty Check is a miss', "else if (slip !== 'none') st.misses++;", "else st.misses++;"],
  ['numbers at once', "var on = st.done || (helpLevel(st) >= 1 && !!st.checked);", "var on = true;"],
  ['numbers as a running count', "var on = st.done || (helpLevel(st) >= 1 && !!st.checked);", "var on = st.done || helpLevel(st) >= 1;"],
  ['first pool numbered before done', "return order.map(function (k, i) { return st.done ? String(i + 1) : ''; });", "return order.map(function (k, i) { return String(i + 1); });"],
  ['strings after one miss', "return st.done || (helpLevel(st) >= 2 && !!st.checked);", "return st.done || (helpLevel(st) >= 1 && !!st.checked);"],
  ['strings stay after a change', "return st.done || (helpLevel(st) >= 2 && !!st.checked);", "return st.done || helpLevel(st) >= 2;"],
  ['help after done', "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }", "function helpLevel(st) { return Math.min(2, st.misses); }"],
  ['tied hints swapped', "if (s === 'more') return tied ? 'hintMoreTied' : 'hintMore';", "if (s === 'more') return tied ? 'hintFewerTied' : 'hintMore';"],
  ['pairs by order, not by length', "var col = A.length ? assign(cost) : [], pairs = [], usedB = {};", "var col = A.map(function (_, q) { return q; }), pairs = [], usedB = {};"],
  ['the lone ones on the wrong side', "return { pairs: pairs, loneModel: swap ? lone : [], loneTwin: swap ? [] : lone };", "return { pairs: pairs, loneModel: swap ? [] : lone, loneTwin: swap ? lone : [] };"],
  ['the pools stacked on desktop', "if (W >= 560) { mode = 'wide'; PAD = 6; cols = places === 8 ? 2 : 3; rows = 4;", "if (W >= 560) { mode = 'wide'; PAD = 6; cols = places === 8 ? 4 : 6; rows = 2;"],
  ['tiny desktop creatures', "pic = cell - 2; gap = Math.min(GAP_MAX,", "pic = cell - 14; gap = Math.min(GAP_MAX,"],
  ['no gap for the strings', "var GAP = 28, GAP_MAX = 56;", "var GAP = 0, GAP_MAX = 56;"],
  ['phone places uncapped', "cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2;", "cell = Math.min(90, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2;"],
  ['phone creatures under the floor', "cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2;", "cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 10;"],
  ['the line across a tall pool', "var across = innerW >= innerH, len = across ? innerW : innerH;", "var across = true, len = innerW;"],
  ['the array left on its side', "if (innerH > innerW) { var tmp = R; R = Cc; Cc = tmp; }", "if (false) { var tmp = R; R = Cc; Cc = tmp; }"],
  ['the ring at equal angles', "for (i = 0; i < n; i++) cand.push(at(per * (o / 36 / n + i / n)));", "for (i = 0; i < n; i++) { var th3 = 2 * Math.PI * (o / 36 / n + i / n); cand.push([cx + a * Math.cos(th3), cy + b * Math.sin(th3)]); }"],
  ['no loop under a ring', "if (st.arr !== 'ring') return null;", "return null;"],
  ['the scatter crowded together', "var FACTORS = [1.04, 0.98, 0.95, 0.92]", "var FACTORS = [0.6, 0.6, 0.6, 0.6]"],
  ['the scatter in rows', "if (!got && L.rows >= 3) {", "if (false) {"],
  ['the same scatter every round', "var rand = rng(st.id + ':' + L.mode), out = [], i, n = st.n, s = modelPic(st, L);", "var rand = rng(L.mode), out = [], i, n = st.n, s = modelPic(st, L);"],
  ['creatures tilted over', "return Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 10 : 20));", "return Math.round((rand() - 0.5) * 60);"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tw-mut-'));
  fs.writeFileSync(path.join(dir, 'twin-pools-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TW_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-twin-pools: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

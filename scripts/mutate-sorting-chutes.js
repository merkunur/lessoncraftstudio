#!/usr/bin/env node
/* =====================================================================
   mutate-sorting-chutes.js — does verify-sorting-chutes-core.js BITE?
   Run: node scripts/mutate-sorting-chutes.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the pictures, the rules and the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'sorting-chutes-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-sorting-chutes-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a plum back in a pile',                "fruits: ['apple', 'orange', 'banana', 'strawberry', 'pear'], animals: ['dog', 'fish']", "fruits: ['apple', 'orange', 'plum', 'strawberry', 'pear'], animals: ['dog', 'fish']"],
  ['a wrong chute accepted',               "    if (key !== want) {", "    if (false) {"],
  ['the belt skips an object',             "    st.belt.shift(); st.tubes[key].push(n);", "    st.belt.shift(); if (st.belt.length > 1) st.belt.shift(); st.tubes[key].push(n);"],
  ['undo takes a thing from the bottom',   "    var n = st.tubes[key].pop(); st.belt.unshift(n);", "    var n = st.tubes[key].shift(); st.belt.unshift(n);"],
  ['the count truth off by one (the old tiles)', "    if (q.type === 'count') return c[q.cat];", "    if (q.type === 'count') return c[q.cat] + 1;"],
  ['"most" judged the wrong way',          "if (q.type === 'fewest' ? c[k] < c[best] : c[k] > c[best]) best = k;", "if (q.type === 'fewest' ? c[k] > c[best] : c[k] < c[best]) best = k;"],
  ['an order round starts sorted',         "      if (r.q.type !== 'order' || !isSorted(out, c)) return out;", "      return out;"],
  ['"how many more" answers the bigger count', "    if (q.type === 'more') return c[q.a] - c[q.b];", "    if (q.type === 'more') return c[q.a];"],
  ['the marks bigger than the slots',      "slot = wide ? 46 : cap > 5 ? 32 : 34, mark = wide ? 40 : 30;", "slot = wide ? 46 : cap > 5 ? 32 : 34, mark = wide ? 48 : 30;"],
  ['the penguin flies',                    "  var FLY = { owl: 1,", "  var FLY = { penguin: 1, owl: 1,"],
  /* the pictures */
  ['the duck back in the sky',             "{ animals: ['parrot', 'owl', 'seagull', 'rabbit', 'horse']", "{ animals: ['duck', 'owl', 'seagull', 'rabbit', 'horse']"],
  ['the mango back',                       "fruits: ['kiwi', 'pineapple', 'watermelon']", "fruits: ['mango', 'pineapple', 'watermelon']"],
  ['the parrot folder in the wrong case',  "  var DIR_OF = { parrot: 'Things That Fly' };", "  var DIR_OF = { parrot: 'things that fly' };"],
  /* the rules */
  ['four of a kind in a row on the belt',  "if (run > 3) return false;", "if (run > 5) return false;"],
  ['an empty Check counts as a miss',      "    if (kind === 'number') { if (st.num == null) { st.last = { result: 'empty' }; return st.last; }", "    if (kind === 'number') { if (st.num == null) { st.misses++; st.last = { result: 'empty' }; return st.last; }"],
  ['no second level of help',              "    if (st.help >= 2) return { key: two ? 'hintReadTopTwo' : 'hintReadTop', wrong: true };\n", ""],
  ['undo while answering',                 "    if (st.phase !== 'sort' || !st.tubes[key] || !st.tubes[key].length) return null;", "    if (!st.tubes[key] || !st.tubes[key].length) return null;"],
  ['the order judged by position, not counts', "ok = isSorted(st.order, tubeCounts(st));", "ok = st.order.join() === tubeKeys(st.r).join();"],
  ['the two-tube sum told to read one top',  "return { key: two ? 'hintReadTopTwo' : 'hintReadTop', wrong: true };", "return { key: 'hintReadTop', wrong: true };"],
  ['two groups asked for the most',        "if ((t === 'most' || t === 'fewest') && tubeKeys(r).length === 2) return 'p' + cap(t) + 'Two';\n", ""],
  /* the stage */
  ['the tubes too short for the round',   "var c = counts(r), m = 0; for (var k in c) m = Math.max(m, c[k]); return Math.max(5, m); }", "var c = counts(r), m = 0; for (var k in c) m = Math.max(m, c[k]); return 5; }"],
  ['the phone tubes too wide',             "tubeW = Math.floor((Math.min(W, 380) - gap * (n - 1) - colGap - 4) / n);", "tubeW = Math.floor((Math.min(W, 380) - gap * (n - 1) - colGap + 40) / n);"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sc-mut-'));
  fs.writeFileSync(path.join(dir, 'sorting-chutes-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SC_CORE_DIR: dir }), timeout: 240000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-sorting-chutes: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

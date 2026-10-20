#!/usr/bin/env node
/* =====================================================================
   mutate-rhyme-chain.js — does verify-rhyme-chain-core.js BITE?
   Run: node scripts/mutate-rhyme-chain.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the ladder, the order, the deal.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'rhyme-chain-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-rhyme-chain-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a ring holds on spelling (bear/ear links)',     "if (c.rime !== ch.anchor.rime) { miss(st,", "if (c.word.slice(-3) !== ch.anchor.word.slice(-3) && c.rime !== ch.anchor.rime) { miss(st,"],
  ['a ring holds on the onset',                      "if (c.rime !== ch.anchor.rime) { miss(st,", "if (c.word[0] !== ch.anchor.word[0] && c.rime !== ch.anchor.rime) { miss(st,"],
  ['a distractor with the anchor\'s rime',           "['pick', 'snail', S('bee whale key')]", "['pick', 'snail', S('nail whale key')]"],
  ['a word that is not its picture\'s label',        "León|zoo animals/lion|ON", "León|zoo animals/tiger|ON"],
  ['a missing picture accepted',                     "kuu|space/moon|UU", "kuu|space/moon_2|UU"],
  ['FIELD accepts one of two',                       "if (k === 0) { st.done = true;", "if (k <= 1) { st.done = true;"],
  ['SORT hangs everything on the first chain',       "var c = byId(st.grass, id), ch = st.chains[ci];", "var c = byId(st.grass, id), ch = st.chains[0];"],
  ['JUDGE answer inverted',                          "if (v === truth) { st.done = true;", "if (v !== truth) { st.done = true;"],
  ['the right picture always in slot 1',             "ans[0], (r.slot + pass) % r.choices.length);", "ans[0], 0);"],
  ['the help persists after a new move',             "st.show = false; st.last = { result: 'holds'", "st.last = { result: 'holds'"],
  ['patterns shown before hanging',                  "function showsPattern(st, c, always) { return !!(", "function showsPattern(st, c, always) { return true || !!("],
  /* the ladder, the order, the deal */
  ['a wrong ring is no miss',                        "function miss(st, last) { st.misses++;", "function miss(st, last) {"],
  ['ODD accepts any mark',                           "if (p === o) { st.done = true;", "if (p) { st.done = true;"],
  ['the chain never moves to step 2',                "if (r.kind === 'chain') { st.step++;", "if (r.kind === 'chain') {"],
  ['a pass may open with any kind',                  "      if (pool[o[0]].kind !== 'pick') continue;\n", ""],
  ['two FINISH rounds may touch',                    "if (pool[o[i]].kind === 'finish' && pool[o[i - 1]].kind === 'finish') bad = true;", "void 0;"],
  ['the field never re-dealt',                       "seeded(hashId(l + r.id) + pass * 977)", "seeded(hashId(l + r.id))"],
  ['ear rhymes with bear',                           "ear|body parts/ear|IYR", "ear|body parts/ear|EHR"],
  ['the onset trap removed (de)',                    "['judge', 'haus', 'hahn'],", ""],
  ['a chain step left with two rhymes',             "S('goat sun bee')", "S('goat coat bee')"]
];
/* a gate that fails on the clean core kills every mutation for nothing — refuse to run */
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rc-mut-'));
  fs.writeFileSync(path.join(dir, 'rhyme-chain-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { RC_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-rhyme-chain: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

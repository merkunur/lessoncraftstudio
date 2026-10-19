#!/usr/bin/env node
/* =====================================================================
   mutate-drop-stands.js — does verify-drop-stands-core.js BITE?
   Run: node scripts/mutate-drop-stands.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the rules, the order and the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'drop-stands-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-drop-stands-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the answer read from the tops as they stand', "  function right(st) { return answer(st.items.map(function (it) { return it.size; }), st.q); }", "  function right(st) { return naive(st, layout(660)); }"],
  ['the beam rests on the chosen one',     "beam = Math.max.apply(null, ext);", "beam = st.choice != null ? ext[st.choice] : Math.max.apply(null, ext);"],
  ['the stands do not fold on Check',      "    st.items.forEach(function (it) { it.down = true; });\n    st.revealed = true;", "    st.revealed = true;"],
  ['the length offsets ignored',           "    var off = liftOf(st.items[i]) * (st.mode === 'length' ? L.offK : L.standK);", "    var off = st.mode === 'length' ? 0 : liftOf(st.items[i]) * L.standK;"],
  ['the mirror keeps the old index',       "if (mirror) { s.reverse(); l.reverse(); }", "if (mirror) { l.reverse(); }"],
  ['"shorter" (height) used on a length round', "shorterL: 'length'", "shorterL: 'height'"],
  ['the ink box ignored',                  "    return st.mode === 'length' ? (o.box[2] - o.box[0]) * k : (o.box[3] - o.box[1]) * k;", "    return 256 * k;"],
  ['choosing again keeps the halo',        "    st.choice = i; st.halo = false;", "    st.choice = i;"],
  ['"on the floor" leaves a stand up',     "return { size: s, lift: flat ? 0 : g.lift[i], down: flat };", "return { size: s, lift: flat ? 0 : g.lift[i], down: false };"],
  /* the rules */
  ['an empty Check counts as a miss',      "    if (st.choice == null) { st.last = { result: 'empty' }; return st.last; }", "    if (st.choice == null) { st.misses++; st.last = { result: 'empty' }; return st.last; }"],
  ['after a miss the stands go back up',   " if (st.revealed && !st.done) return false;", ""],
  ['the halo at miss 1',                   "st.halo = st.help >= 2;", "st.halo = st.help >= 1;"],
  ['"shorter" answered as "taller"',       "if (isShort(q) ? sizes[i] < sizes[best] : sizes[i] > sizes[best]) best = i;", "if (sizes[i] > sizes[best]) best = i;"],
  ['the halo hint never "furthest"',       "(isShort(st.q) ? 'haloFar' : 'haloReach')", "'haloReach'"],
  ['P12 back to the unbalanced design row', "sizes: [0.72, 1.00], lift: [120, 40] }", "sizes: [1.00, 0.72], lift: [40, 120] }"],
  ['the stand tells the answer again (P2)', "sizes: [0.80, 1.00], lift: [0, 40] }", "sizes: [0.80, 1.00], lift: [90, 0] }"],
  ['the stand tells the answer again (R1)', "sizes: [0.66, 1.00, 0.82],       lift: [0, 40, 120] }", "sizes: [0.66, 1.00, 0.82],       lift: [80, 0, 120] }"],
  /* the order */
  ['the same order twice',                 "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;\n", ""],
  ['the same side three times running',    "      if (!runOk(pool, a, pass || 0)) continue;\n", ""],
  /* the stage */
  ['the phone row columns too wide',       "col2: 160 * k, colR: 82 * k,", "col2: 160 * k, colR: 92 * k,"],
  ['no room for the beam',                 "    return m + 34 * L.k;", "    return m;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-mut-'));
  fs.writeFileSync(path.join(dir, 'drop-stands-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { DS_CORE_DIR: dir }), timeout: 240000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-drop-stands: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

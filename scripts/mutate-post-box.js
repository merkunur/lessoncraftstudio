#!/usr/bin/env node
/* =====================================================================
   mutate-post-box.js — does verify-post-box-core.js BITE?
   Run: node scripts/mutate-post-box.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the help ladder and the deal.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'post-box-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-post-box-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a square refused at the rectangle door',      "if (door === 'rect') { if (!(eq(L[0], L[2]) && eq(L[1], L[3]))) return { result: 'lengths' };", "if (door === 'rect') { if (!(eq(L[0], L[2]) && eq(L[1], L[3])) || allEqual(L)) return { result: 'lengths' };"],
  ['the square and rectangle doors dealt together', "{ doors: ['tri', 'sq', 'pent'], tiles:", "{ doors: ['tri', 'sq', 'rect'], tiles:"],
  ['a fit when the door has one stick too many',  "if (m > n) return { result: 'tooMany',", "if (m > n + 1) return { result: 'tooMany',"],
  ['a vertex on a straight side counted',         "if (Math.abs(cross(a, b, c)) > 1e-6 * dist(a, b) * dist(b, c)) out.push(b);", "out.push(b);"],
  ['an open shape posted',                        "    if (!isClosed(s)) return { result: 'open' };\n", ""],
  ['a curved side posted',                        "    if (hasCurve(s)) return { result: 'curve', side: s.curve };\n", ""],
  ['the long rectangle posted at the square door', "if (door === 'sq') { if (!allEqual(L)) return { result: 'lengths' };", "if (door === 'sq') {"],
  ['the rhombus posted at the rectangle door',    "return { result: 'lengths' }; if (!rightAngles(p)) return { result: 'corners' }; return { result: 'fit' }; }\n    if (door === 'rhom')", "return { result: 'lengths' }; return { result: 'fit' }; }\n    if (door === 'rhom')"],
  ['a peg planted twice on one side',             "if (at < 0) { st.pegs.push(side); return 'plant'; }", "if (true) { st.pegs.push(side); return 'plant'; }"],
  ['an earlier peg lifted',                       "if (at === st.pegs.length - 1) { st.pegs.pop(); return 'lift'; }", "if (at >= 0) { st.pegs.splice(at, 1); return 'lift'; }"],
  ['the tray not shuffled',                       "var slots = r.mode === 'count' ? tiles.map(function (t) { return t.id; }) : shuffle(tiles.map(function (t) { return t.id; }), rnd);", "var slots = tiles.map(function (t) { return t.id; });"],
  ['the showing kept after a new move',           "st.offers++; st.show = false;", "st.offers++;"],
  ['Check with nothing done counts a miss',       "if (!st.offers) { st.last = { check: 'start' }; return st.last; }", "if (!st.offers) { st.misses++; st.last = { check: 'start' }; return st.last; }"],
  ['round 6 square drawn upright',                "['T3', 90], ['Q1', 45], ['P2', 180]", "['T3', 90], ['Q1', 0], ['P2', 180]"],
  ['the doors not in numeral order',              "doors.push(r.more[0]); doors.sort(function (a, b) { return a - b; });", "doors.push(r.more[0]);"],
  /* the help ladder, the rhombus, the deal */
  ['help on the first bounce',                    "st.help = st.bounces >= 4 ? 2 : st.bounces >= 2 ? 1 : 0;", "st.help = st.bounces >= 4 ? 2 : st.bounces >= 1 ? 1 : 0;"],
  ['the rhombus door takes any four-sider',       "if (door === 'rhom') { if (!allEqual(L)) return { result: 'lengths' }; return { result: 'fit' }; }", "if (door === 'rhom') { return { result: 'fit' }; }"],
  ['the name doors never shuffled',               "    if (r.mode === 'name') doors = shuffle(doors, rnd);\n", ""],
  ['every dealt turn the same',                   "var turns = shuffle(TURNS.slice(), rnd), ti = 0;", "var turns = [45], ti = 0;"],
  ['Check with shapes left is no miss',           "if (remaining(st).length) { st.misses++; st.help = Math.min(2, st.help + 1);", "if (remaining(st).length) { st.help = Math.min(2, st.help + 1);"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-mut-'));
  fs.writeFileSync(path.join(dir, 'post-box-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PB_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-post-box: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

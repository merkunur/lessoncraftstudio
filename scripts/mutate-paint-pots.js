#!/usr/bin/env node
/* =====================================================================
   mutate-paint-pots.js — does verify-paint-pots-core.js BITE?
   Run: node scripts/mutate-paint-pots.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the rules, the data, the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'paint-pots-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-paint-pots-core.js');
const MUTATIONS = [
  /* the design's list */
  ['accepts() trusts the authored name',      "function accepts(tinKind, pc) { var k = kindOf(pc);", "function accepts(tinKind, pc) { var k = pc.t === 'tri' ? 'triangle' : pc.t === 'square' ? 'square' : kindOf(pc);"],
  ['a 45° square refused by the square tin',  "if (allEq && right) return 'square';", "if (allEq && right && Math.abs(pc.pts[0][1] - pc.pts[1][1]) < 1) return 'square';"],
  ['an open triangle accepted',               "    if (!tr.closed) return null;\n", ""],
  ['a rounded-corner triangle accepted',      "    if (tr.curved || tr.rounded) return null;", "    if (tr.curved) return null;"],
  ['a tall rectangle refused',                "if (right) return 'rectangle';", "if (right && sd[0] > sd[1]) return 'rectangle';"],
  ['a square in a rectangle-tin round',       "P('rect', 240, 332, 136, 68, 0, { inset: 4 })", "P('square', 240, 332, 68, 0, 0, { inset: 4 })"],
  ['the count answer off by one',             "{ id: 'cat', tri: 4, sq: 2,", "{ id: 'cat', tri: 5, sq: 2,"],
  ['all the train\'s targets in one half',    "P('square', 355, 190, 120), P('square', 355, 172, 68, 0, 0, { inset: 1 }),", "P('square', 355, 226, 120), P('square', 355, 206, 68, 0, 0, { inset: 1 }),"],
  ['help survives a new paint',               "    st.painted[pid] = st.tin; st.help = 0; st.last = null;", "    st.painted[pid] = st.tin; st.last = null;"],
  ['paint judged at the tap',                 "    st.painted[pid] = st.tin; st.help = 0; st.last = null;", "    if (!accepts(st.r.tins[st.tin], piecesOf(st.r).filter(function (q) { return q.id === pid; })[0])) return false; st.painted[pid] = st.tin; st.help = 0; st.last = null;"],
  ['a set piece un-set by a later miss',      "    st.painted = {};\n", "    st.painted = {}; if (shed.length) st.set = {};\n"],
  /* the rules */
  ['a set piece (tin 0) re-painted',          "    if (st.done || st.set[pid] != null) return false;", "    if (st.done || st.set[pid]) return false;"],
  ['the kite told to count its corners',      "    if ((tin === 'square' || tin === 'diamond') && !eq) return 'hintSides';\n", ""],
  ['a leak not told',                         "    if (l.leak.length) return 'hintLeak';\n", ""],
  ['an empty Check counts as a miss',         "if (!wet.length && !Object.keys(st.set).length) { st.last = { result: 'empty', why: 'start' }; return st.last; }", "if (!wet.length && !Object.keys(st.set).length) { st.misses++; st.last = { result: 'empty', why: 'start' }; return st.last; }"],
  ['no second level of help',                 "      st.misses++; st.help = Math.min(2, st.help + 1);\n      st.last = { result: 'wrong', shed:", "      st.misses++; st.help = Math.min(1, st.help + 1);\n      st.last = { result: 'wrong', shed:"],
  ['the counter goes to 0',                   "if (v < 1 || v > 9) return false;", "if (v < 0 || v > 9) return false;"],
  ['the tins always in the same order',       "var t = q.flip ? [q.tins[1], q.tins[0]] : q.tins.slice();", "var t = q.tins.slice();"],
  ['the order repeats the last pass',         "      if (prev && n > 1 && o.join() === prev.join()) continue;\n", ""],
  /* the geometry */
  ['an oval taken for a circle',              "      if (mx - mn < 0.02 * mx) return 'circle';", "      if (mx - mn < 0.5 * mx) return 'circle';"],
  ['an egg taken for an oval',                "      return sym ? 'oval' : null;", "      return 'oval';"],
  ['a rhombus taken for a square',            "if (allEq && right) return 'square'; if (right) return 'rectangle'; if (allEq) return 'diamond';", "if (allEq) return 'square'; if (right) return 'rectangle';"],
  ['a heptagon taken for a hexagon',          "    if (n === 6) return 'hexagon';", "    if (n === 6 || n === 7) return 'hexagon';"],
  /* the stage */
  ['the phone board shrinks the pieces under 44 px', "    var sc = Math.min(1, Math.min(W, 460) / B.W);", "    var sc = Math.min(1, (Math.min(W, 460) - 12) / B.W);"],
  ['two house pieces touch',                  "P('square', 115, 226, 70, 0, 0, { inset: 3 })", "P('square', 120, 226, 70, 0, 0, { inset: 3 })"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-mut-'));
  fs.writeFileSync(path.join(dir, 'paint-pots-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PP_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-paint-pots: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

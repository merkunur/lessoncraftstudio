#!/usr/bin/env node
/* =====================================================================
   mutate-pip-museum.js — does verify-pip-museum-core.js BITE?
   Run: node scripts/mutate-pip-museum.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the rules, the data, the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'pip-museum-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-pip-museum-core.js');
const MUTATIONS = [
  /* the design's list */
  ['canHold reads the authored name',          "var k = kindOf(t); return k === ped || (ped === 'rectangle' && k === 'square');", "var k = t.k === 'square' ? 'square' : t.k === 'tri' ? 'triangle' : kindOf(t); return k === ped || (ped === 'rectangle' && k === 'square');"],
  ['the square clasp takes a 60° rhombus',     "if (n === 4) return eq && right ? 'square' : right ? 'rectangle' : eq ? 'rhombus' : 'quad';", "if (n === 4) return eq ? 'square' : right ? 'rectangle' : 'quad';"],
  ['the hoop takes an oval',                   "return mx - mn < 0.02 * mx ? 'circle' : 'oval';", "return 'circle';"],
  ['the triangle clasp locks an open triangle', "    if (g.open) return 'open';\n", ""],
  ['a 1:3 rectangle turned 60° refused',      "if (n === 4) return eq && right ? 'square' : right ? 'rectangle' : eq ? 'rhombus' : 'quad';", "if (n === 4) return eq && right ? 'square' : right && Math.abs(g.pts[0][1] - g.pts[1][1]) < 1 ? 'rectangle' : eq ? 'rhombus' : 'quad';"],
  ['a square in a rectangle round',            "T('rect', 0, 0.45, { st: 2 })", "T('square', 0, 0.45)"],
  ['a cube in a box round',                    "S('box', 'flat', 0.85), S('cylinder', 'stand', 0.8)", "S('cube', 'flat', 0.85), S('cylinder', 'stand', 0.8)"],
  ['a cone held by a sphere object',           "    if (t.solid) return t.solid === ped;", "    if (t.solid) return t.solid === ped || (t.solid === 'cone' && ped === 'sphere');"],
  ['the capstone count off by one',            "capstone: { triangle: 3, square: 3 }", "capstone: { triangle: 4, square: 3 }"],
  ['help resets on a new drag',                "    if (!st.done) { delete st.refused[id]; st.last = null; }", "    if (!st.done) { delete st.refused[id]; st.help = 0; st.last = null; }"],
  ['the ghost clasp built from the name',      "    var sd = sides(g.pts), an = angles(g.pts), group = [], gi = 0;", "    var sd = t.k === 'rect' ? g.pts.map(function () { return 1; }) : sides(g.pts), an = angles(g.pts), group = [], gi = 0;"],
  /* the rules */
  ['a held treasure can be dragged away',     "    if (st.held[id] && !st.done) return false;\n", ""],
  ['Check with treasures on the belt is a miss', "if (st.belt.length) { st.last = { result: 'empty', why: 'belt' }; return st.last; }", "if (st.belt.length) { st.misses++; st.last = { result: 'empty', why: 'belt' }; return st.last; }"],
  ['a refused treasure stays on its tray',     "else { refused.push(id); st.refused[id] = d; st.trays[d].splice(st.trays[d].indexOf(id), 1); st.belt.push(id); }", "else { refused.push(id); st.refused[id] = d; }"],
  ['no second level of help',                  "if (refused.length) { st.misses++; st.help = Math.min(2, st.help + 1);", "if (refused.length) { st.misses++; st.help = Math.min(1, st.help + 1);"],
  ['the counter reaches 0',                    "if (v < 1 || v > 9) return false; st.count[k] = v;", "if (v < 0 || v > 9) return false; st.count[k] = v;"],
  ['the belt is never shuffled',               "    if (rnd) for (var j = ids.length - 1; j > 0; j--)", "    if (false) for (var j = ids.length - 1; j > 0; j--)"],
  ['the order repeats the last pass',          "if (prev && n > 1 && o.join() === prev.join()) continue;", ""],
  ['the Mystery Gallery takes everything',     "return hold.length ? hold.map(function (p) { return p.kind; }) : (r.mystery ? ['mystery'] : []);", "return hold.length ? hold.map(function (p) { return p.kind; }).concat(r.mystery ? ['mystery'] : []) : (r.mystery ? ['mystery'] : []);"],
  /* the pictures and the stage */
  ['the can folder in the wrong case',         "can: ['At the Supermarket', 'cylinder']", "can: ['at the supermarket', 'cylinder']"],
  ['the butter back as a box',                 "eraser: ['classroom', 'box'] };", "eraser: ['classroom', 'box'], butter: ['at the supermarket', 'box'] };"],
  ['the phone tray cells under 44 px',         "var cell = wide ? 96 : 66, trayCell = wide ? 56 : 46;", "var cell = wide ? 96 : 66, trayCell = wide ? 56 : 40;"],
  ['the pedestals overflow a phone',           "var pedW = Math.floor((W - pip - gap * (nDest - 1)) / nDest);", "var pedW = Math.floor((W - pip) / nDest) + 2;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pm-mut-'));
  fs.writeFileSync(path.join(dir, 'pip-museum-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PM_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-pip-museum: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

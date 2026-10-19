#!/usr/bin/env node
/* =====================================================================
   mutate-parking-tower.js — does verify-parking-tower-core.js BITE?
   Run: node scripts/mutate-parking-tower.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the pictures, the rules, the stage.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'parking-tower-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-parking-tower-core.js');
const MUTATIONS = [
  /* the design's list */
  ['"above" accepts two levels up',        "if (dc === 0 && dl === 1) out.push('above');", "if (dc === 0 && dl >= 1) out.push('above');"],
  ['next to accepts the diagonal',         "if (dl === 0 && Math.abs(dc) === 1) out.push('next');", "if (Math.abs(dl) <= 1 && Math.abs(dc) === 1) out.push('next');"],
  ['left and right swapped',               "if (dl === 0 && dc < 0) out.push('left');", "if (dl === 0 && dc > 0) out.push('left');"],
  ['between accepts beside one of them',   "if (a.c === b.c && s.c === a.c) return Math.abs(a.l - b.l) === 2 && s.l === (a.l + b.l) / 2;", "if (a.c === b.c && s.c === a.c) return Math.abs(s.l - a.l) === 1 || Math.abs(s.l - b.l) === 1;"],
  ['the basement shown in a bottom-level round', "function hasBase(r) { return r.mode === 'tower' && r.cands.some(function (s) { return s === 'BASE'; }); }", "function hasBase(r) { return r.mode === 'tower' && (r.trel === 'bottom' || r.cands.some(function (s) { return s === 'BASE'; })); }"],
  ['the code read number-then-letter',     "function codeOf(c, rw) { return LETTERS.charAt(c - 1) + rw; }", "function codeOf(c, rw) { return LETTERS.charAt(rw - 1) + c; }"],
  ['rows counted from the bottom (north is down)', "var DIRV = { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] };", "var DIRV = { north: [0, 1], east: [1, 0], south: [0, -1], west: [-1, 0] };"],
  ['the rose\'s turn ignored',            "var v = DIRV[dir].slice(), k = ((rose || 0) / 90) % 4;", "var v = DIRV[dir].slice(), k = 0;"],
  ['a reverse round accepts the diagonal truck', "return relation(s, r.lms[0]).indexOf(r.rel) >= 0;", "return relation(s, r.lms[0]).indexOf(r.rel) >= 0 || relation(s, r.lms[0]).indexOf('diagonal') >= 0;"],
  ['an occupied bay accepts a park',      "    if (occupied(st, s)) return false;\n", ""],
  ['help survives a new park',            "    st.parked = s; st.help = 0; st.last = null;", "    st.parked = s; st.last = null;"],
  ['a 10 × 10 park round asks for taps on a narrow card', "tap: n === 6 && sq2 >= 44 };", "tap: sq2 >= 20 };"],
  ['the middle floor answers four near rounds', "{ id: 'N3', kind: 'place', rel: 'below',   mover: 'truck', lms: [{ v: 'car', c: 3, l: 2 }],       cands: [B(3, 1), B(2, 2), B(1, 3)], right: B(3, 1) },", "{ id: 'N3', kind: 'place', rel: 'below',   mover: 'truck', lms: [{ v: 'car', c: 3, l: 3 }],       cands: [B(3, 2), B(2, 3), B(1, 1)], right: B(3, 2) },"],
  /* the pictures */
  ['the taxi (printed TAXI) back',        "'ambulance', 'tractor', 'jeep'];", "'ambulance', 'tractor', 'taxi'];"],
  ['the truck not mirrored to the lift',  "var FACES_RIGHT = { truck: 1 };", "var FACES_RIGHT = {};"],
  ['a filler the round names',            "var pool = VEH.filter(function (v) { return !named[v]; }), i = 0, out = {};", "var pool = VEH.slice(), i = 0, out = {};"],
  ['the beaver\'s folder in the wrong case', "var DIR_OF = { beaver: 'forest creatures' };", "var DIR_OF = { beaver: 'Forest Creatures' };"],
  /* the rules */
  ['an empty Check counts as a miss',     "if (a == null) { st.last = { result: 'empty' }; return st.last; }", "if (a == null) { st.misses++; st.last = { result: 'empty' }; return st.last; }"],
  ['no second level of help',             "st.misses++; st.help = Math.min(2, st.help + 1);", "st.misses++; st.help = Math.min(1, st.help + 1);"],
  ['a grey car on the answer square',     "    ban[planAnswer(r)] = 1;\n", ""],
  ['"outside" offers the roof',           "{ id: 'T5', kind: 'place', trel: 'outside', mover: 'jeep',      cands: ['SL', B(2, 1), B(1, 3)],  right: 'SL' },", "{ id: 'T5', kind: 'place', trel: 'outside', mover: 'jeep',      cands: ['SL', B(2, 1), 'ROOF'],   right: 'SL' },"],
  ['the order repeats the last pass',     "      if (prev && n > 1 && o.join() === prev.join()) continue;\n", ""],
  ['a read round parks',                  "    if (r.kind === 'tap' || st.read) return false;", "    if (r.kind === 'tap') return false;"],
  /* the stage */
  ['the phone tower too wide',            "var avail = Math.min(W, wide ? 640 : 380) - lift - 2 * street - wall * (cols + 1) - 4;", "var avail = Math.min(W, wide ? 640 : 380) - lift - street - wall * (cols + 1) - 4;"],
  ['the vehicles shrink on desktop',      "var bayH = wide ? 102 : tight ? 70 : 80, veh = wide ? 96 : 64;", "var bayH = wide ? 102 : tight ? 70 : 80, veh = wide ? 80 : 64;"],
  ['the phone tower loses its 64 px vehicles', "var bayH = wide ? 102 : tight ? 70 : 80, veh = wide ? 96 : 64;", "var bayH = wide ? 102 : tight ? 70 : 80, veh = wide ? 96 : 56;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pt-mut-'));
  fs.writeFileSync(path.join(dir, 'parking-tower-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PT_CORE_DIR: dir }), timeout: 240000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-parking-tower: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

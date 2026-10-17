#!/usr/bin/env node
/* =====================================================================
   mutate-creek-map.js — does verify-creek-map-core.js BITE?
   Run: node scripts/mutate-creek-map.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'creek-map-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-creek-map-core.js');
const MUTATIONS = [
  ['a 0 buoy', "forks: [[4, 1], [2, 7]]", "forks: [[4, 0], [2, 7]]"],
  ['the same number twice', "forks: [[10, 7], [8, 9]]", "forks: [[10, 7], [9, 9]]"],
  ['a number above five in up-to-5', "forks: [[2, 4], [3, 4]]", "forks: [[2, 6], [3, 4]]"],
  ['the rule never changes in mixed', "{ rule: 'smaller', forks: [[4, 8], [10, 9]] }", "{ rule: 'bigger', forks: [[4, 8], [10, 9]] }"],
  ['the setting ignored', "var fixed = ruleSetting === 'bigger' || ruleSetting === 'smaller' ? ruleSetting : null;", "var fixed = null;"],
  ['smaller answered as bigger', "(pair[0] < pair[1] ? 'left' : 'right')", "(pair[0] > pair[1] ? 'left' : 'right')"],
  ['bigger answered as smaller', "rule === 'bigger' ? (pair[0] > pair[1] ? 'left' : 'right')", "rule === 'bigger' ? (pair[0] < pair[1] ? 'left' : 'right')"],
  ['the same friend every round', "friend: FRIENDS[i % FRIENDS.length]", "friend: FRIENDS[0]"],
  ['the toad comes back', "'squirrel', 'bear'];", "'squirrel', 'toad'];"],
  ['a third fork accepted', "!(fork >= 0 && fork < st.forks.length)", "!(fork >= 0 && fork < 3)"],
  ['a finished round can change', "if (!st || st.done || !(fork >= 0", "if (!st || !(fork >= 0"],
  ['a new choice keeps the old verdict', "st.route[fork] = side; st.checked = null; return true;", "st.route[fork] = side; return true;"],
  ['half a route counts as a miss', "else if (st.route.some(function (s) { return s === null; })) res = { ok: false, slip: 'incomplete' };", "else if (false) res = { ok: false, slip: 'incomplete' };"],
  ['stuck at the LAST wrong fork', "for (var i = 0; i < ans.length; i++) if (st.route[i] !== ans[i]) { w = i; break; }", "for (var i = 0; i < ans.length; i++) if (st.route[i] !== ans[i]) { w = i; }"],
  ['a wrong route is no miss', "else if (res.slip === 'wrong') st.misses++;", "else if (false) st.misses++;"],
  ['dots at miss 1', "function dotsAt(st) { return helpLevel(st) >= 2 ? stuckAt(st) : -1; }", "function dotsAt(st) { return helpLevel(st) >= 1 ? stuckAt(st) : -1; }"],
  ['the hint ignores the rule', "R = st.rule === 'bigger' ? 'Big' : 'Small';", "R = 'Big';"],
  ['the boat stops before the stuck fork', "stuckAt(st) >= 0 ? { forks: stuckAt(st) + 1, pond: false }", "stuckAt(st) >= 0 ? { forks: stuckAt(st), pond: false }"],
  ['the boat reaches the pond when stuck', "stuckAt(st) >= 0 ? { forks: stuckAt(st) + 1, pond: false }", "stuckAt(st) >= 0 ? { forks: stuckAt(st) + 1, pond: true }"],
  ['the boat sails onto the buoy', "var boatX = { left: chanX.left + shift, right: chanX.right - shift };", "var boatX = { left: chanX.left - shift, right: chanX.right + shift };"],
  ['a desktop boat below 96', "var boat = wide ? 96 : (W >= 328 ? 64 : 56);", "var boat = wide ? 80 : (W >= 328 ? 64 : 56);"],
  ['no island', "d = Math.round(W * 0.22);", "d = Math.round(W * 0.1);"],
  ['buoys off the stage', "var off = wide ? Math.round(chanW / 2 + buoy / 2 + 6) : Math.round(chanW / 2) + 2;", "var off = wide ? Math.round(chanW / 2 + buoy / 2 + 90) : Math.round(chanW / 2) + 2;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cm-mut-'));
  fs.writeFileSync(path.join(dir, 'creek-map-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { CM_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-creek-map: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

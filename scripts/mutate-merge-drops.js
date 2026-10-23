#!/usr/bin/env node
/* =====================================================================
   mutate-merge-drops.js — does verify-merge-drops-core.js BITE? Run: node scripts/mutate-merge-drops.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The drops as DRAWN — beads, the pearl ring, the droplet, the rise into
   the whole circle — are gated by local-test-merge-drops.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'merge-drops-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-merge-drops-core.js');
const MUTATIONS = [
  ['a round total is off by one',                    "total: t[0] + t[1] + t[2] };", "total: t[0] + t[1] + t[2] + (idx === 3 ? 1 : 0) };"],
  ['the pearl needs eleven',                         "pearl: d.n >= 10,", "pearl: d.n > 10,"],
  ['the frame holds nine',                           "ten: beads.slice(0, Math.min(10, beads.length)), rest: beads.slice(10)", "ten: beads.slice(0, Math.min(9, beads.length)), rest: beads.slice(9)"],
  ['a merge loses a colour',                         "parts: b.parts.concat(a.parts),", "parts: b.parts,"],
  ['a leading 0 is accepted',                        "(st.typed === '' && d === '0')", "false"],
  ['a two-drop sum joins everything',                "var sub = show === 1 ? subsetMatching(r, n) : null;", "var sub = null;"],
  ['miss 2 still joins only two',                    "var sub = show === 1 ? subsetMatching(r, n) : null;", "var sub = subsetMatching(r, n);"],
  ['an empty answer counts as a miss',               "if (st.typed === '') { st.last = { reason: 'empty' };", "if (st.typed === '') { st.misses++; st.last = { reason: 'empty' };"],
  ['the ten pair is not preferred',                  "for (k = 0; k < 3; k++) if (t[P[k][0]] + t[P[k][1]] === 10) return P[k];", ""],
  ['a duplicate triple in the data',                 "[5, 5, 6], [5, 8, 2]", "[5, 5, 6], [8, 5, 2]"],
  ['a total equals a part',                          "[9, 7, 1]", "[9, 7, 0]"],
  ['undo does not restore the order',                "st.drops.sort(function (x, y) { return x.slot - y.slot; });", ""],
  ['two equal totals may stand side by side',        "if (round(level, order[p]).total === round(level, order[p - 1]).total) bad = true;", ""],
  ['the plan may repeat the last pass',              "if (prev && prev.length && prev.join() === order.join()) continue;", ""],
  ['a small total gets the pearl hint',              "if (R === 'joined') return ten ? 'hPearlTen' : big ? 'hPearl' : 'hJoined';", "if (R === 'joined') return ten ? 'hPearlTen' : 'hPearl';"],
  ['exactly ten asks for more ones',                 "return ten ? 'hCountTen' : big ? 'hCount' : 'hCountAll';", "return big ? 'hCount' : 'hCountAll';"],
  ['the hint survives a new key press',              "function moved(st) { st.show = 0; st.last = null; }", "function moved(st) { st.show = 0; }"],
  ['a finished round still takes merges',            "if (st.done || fromId === toId) return null;", "if (fromId === toId) return null;"],
  ['an unused variable (control)',                   "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-mut-'));
  fs.writeFileSync(path.join(dir, 'merge-drops-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MD_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-merge-drops: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

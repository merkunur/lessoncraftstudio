#!/usr/bin/env node
/* =====================================================================
   mutate-pot-nest.js — does verify-pot-nest-core.js BITE?
   Run: node scripts/mutate-pot-nest.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'pot-nest-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-pot-nest-core.js');
const MUTATIONS = [
  ['a 0 pot', "[10, 1, 6, 3]", "[10, 0, 6, 3]"],
  ['two pots the same', "[5, 2, 9, 8]", "[5, 2, 9, 9]"],
  ['a row already in order', "[9, 4, 6, 1]", "[9, 6, 4, 1]"],
  ['the biggest always first', "[6, 9, 2, 4], [7, 3, 5, 8]", "[9, 6, 2, 4], [8, 3, 5, 7]"],
  ['a number above five in up-to-5', "[4, 3, 5], [1, 5, 4]", "[4, 3, 6], [1, 5, 4]"],
  ['a repeated round', "[4, 3, 5], [1, 5, 4]", "[4, 3, 5], [3, 5, 4]"],
  ['the dots setting ignored', "dots: dots === 'always' ? 'always' : 'help'", "dots: 'help'"],
  ['a bigger pot fits', "return i === null || v < i;", "return i === null || v !== i;"],
  ['a bounce is no bounce', "if (!fits(st, v)) { st.bounces++;", "if (!fits(st, v)) {"],
  ['a bounced pot still goes in', "st.last = { v: v, inner: inner(st) }; return 'bounce'; }", "st.last = { v: v, inner: inner(st) }; }"],
  ['the fitted pot stays in the row', "st.tray.splice(st.tray.indexOf(v), 1); st.nest.push(v);", "st.nest.push(v);"],
  ['lifting takes the outer pot', "var v = st.nest.pop(); st.checked = null;", "var v = st.nest.shift(); st.checked = null;"],
  ['a lifted pot goes to the end of the row', 'st.tray = tray;', 'st.tray.push(v);'],
  ['a finished round can be taken apart', 'if (!st || st.done || !st.nest.length) return null;', 'if (!st || !st.nest.length) return null;'],
  ['stuck never noticed', "return st.tray.length > 0 && st.nest.length > 0 && st.tray.every(", "return false && st.tray.every("],
  ['right with pots waiting', "!st.tray.length ? 'right' : stuck(st)", "true ? 'right' : stuck(st)"],
  ['dots at the first bounce', "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.bounces); }", "function helpLevel(st) { return st.done ? 0 : Math.min(2, st.bounces + 1); }"],
  ['the always setting ignored', "function dotsOn(st) { return st.dots === 'always' || helpLevel(st) >= 2; }", "function dotsOn(st) { return helpLevel(st) >= 2; }"],
  ['no glow when stuck', "function liftCue(st) { return !st.done && stuck(st); }", "function liftCue(st) { return false; }"],
  ['the rim hides behind the next pot', "var band = Math.min(k - 2, wide ? 26 : 20);", "var band = Math.min(k + 8, wide ? 34 : 28);"],
  ['tiny phone rims', "var k = wide ? (max === 5 ? 40 : 26) : (max === 5 ? 30 : 20);", "var k = wide ? (max === 5 ? 40 : 26) : (max === 5 ? 30 : 16);"],
  ['pots too wide for a phone', "var kw = wide ? (max === 5 ? 26 : 14) : (max === 5 ? 18 : 10);", "var kw = wide ? (max === 5 ? 26 : 14) : (max === 5 ? 18 : 30);"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pn-mut-'));
  fs.writeFileSync(path.join(dir, 'pot-nest-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PN_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-pot-nest: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

#!/usr/bin/env node
/* =====================================================================
   mutate-turning-domino.js — does verify-turning-domino-core.js BITE? Run: node scripts/mutate-turning-domino.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The domino as DRAWN — the march onto the plate, the flip, the turn, the
   tray, the house windows — is gated by local-test-turning-domino.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'turning-domino-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-turning-domino-core.js');
const MUTATIONS = [
  ['the half dial reaches 11',                         "r.dialMax = r.lid ? (level === 'w10' ? 10 : 20) : 10;", "r.dialMax = r.lid ? (level === 'w10' ? 10 : 20) : 11;"],
  ['the half dial reaches 0',                          "r.dialMin = r.lid ? 2 : 1;", "r.dialMin = r.lid ? 2 : 0;"],
  ['the lid grades a part, not the whole',             "r.hidden = 'lid'; r.removed = 'right'; r.answer = w; }", "r.hidden = 'lid'; r.removed = 'right'; r.answer = d[3]; }"],
  ['a stance starts with the wrong half hidden',       "r.L = x; r.R = w - x; r.hidden = 'right'; r.removed = null;", "r.L = x; r.R = w - x; r.hidden = 'left'; r.removed = null;"],
  ['one form dropped from Within 20',                  "[16, 'w-a', 9], [17, 'w-?', 8]", "[16, 'w-a', 9], [17, 'w-a', 8]"],
  ['march ignores overflow',                           "overflow: Math.max(0, visible + d - r.w) };", "overflow: 0 };"],
  ['turning changes the plate',                        "var t = st.left; st.left = st.right; st.right = t; st.turned = !st.turned;", "var t = st.left; st.left = st.right; st.right = t; st.turned = !st.turned; st.r = Object.assign({}, st.r, { w: st.r.w + 1 });"],
  ['breaking a half writes an addition',               "if (st.removed) { var off", "if (false) { var off"],
  ['a fact stamps twice',                              "if (st.facts.indexOf(i) >= 0) return { win: i, isNew: false };", ""],
  ['the house fills from the dial',                    "st.dial = n; moved(st); return true;", "st.dial = n; moved(st); if (st.facts.indexOf(0) < 0) st.facts.push(0); return true;"],
  ['the hidden half is always the bigger part',        "[9, '?+a', 5]", "[9, '?+a', 4]"],
  ['halves that do not sum to the whole',              "else { r.L = d[3]; r.R = x;", "else { r.L = d[3] + 1; r.R = x;"],
  ['a miss reveals the hidden half',                   "st.misses++; var m = march(r, st.dial);", "st.misses++; st.hidden = null; var m = march(r, st.dial);"],
  ['an untouched dial counts as a miss',               "if (st.dial == null) { st.last = { reason: 'empty' };", "if (st.dial == null) { st.misses++; st.last = { reason: 'empty' };"],
  ['the tray half stays off after the right number',   "st.removed = null;            /* any tray half", "st.removed = st.removed;            /* any tray half"],
  ['the help stays after a new dial move',             "function moved(st) { st.show = 0; st.last = null; }", "function moved(st) { }"],
  ['two equal answers may stand side by side',         "if (round(level, order[p]).answer === round(level, order[p - 1]).answer) bad = true;", ""],
  ['the plan may repeat the last pass',                "if (prev && prev.length && prev.join() === order.join()) continue;", ""],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'td-mut-'));
  fs.writeFileSync(path.join(dir, 'turning-domino-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TD_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-turning-domino: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

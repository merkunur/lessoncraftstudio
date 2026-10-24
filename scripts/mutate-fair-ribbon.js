#!/usr/bin/env node
/* =====================================================================
   mutate-fair-ribbon.js — does verify-fair-ribbon-core.js BITE? Run: node scripts/mutate-fair-ribbon.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first; the last needle
   is a control that must SURVIVE. CRLF collapsed before searching.
   (The jars as DRAWN are gated by local-test-fair-ribbon.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'fair-ribbon-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-fair-ribbon-core.js');
const MUTATIONS = [
  ['act moves one bead too few',                       "for (i = 0; i < give; i++) B.push(", "for (i = 1; i < give; i++) B.push("],
  ['the ribbon at the emptier jar in MORE',            "if (k === 'more') { r.pim = x; r.bo = y; r.ribbon = x;", "if (k === 'more') { r.pim = x; r.bo = y; r.ribbon = y;"],
  ['GIVE BACK: Pim does not hold the taken beads',     "r.pim = 2 * x - y; r.bo = y;", "r.pim = x; r.bo = y;"],
  ['START tints from the top',                         "var isStart = i < n, isNew", "var isStart = i >= r.bo - n, isNew"],
  ['a gap is not dashed in MORE',                      "if (r.bo + give < r.ribbon) fill(B, r.ribbon - r.bo - give, 'dash');", ""],
  ['beads above the ribbon are not marked',            "P.push(i + 1 > r.ribbon ? 'still' : 'b');", "P.push('b');"],
  ['an overshoot does not quiet Pim',                  "if (res === 'over') return { pim: 'quiet', bo: 'glow', lean: false };", "if (res === 'over') return { pim: 'glow', bo: 'quiet', lean: false };"],
  ['a 0 tile is accepted',                             "if (!(n >= 1 && n <= st.r.top)) return false;", "if (!(n >= 0 && n <= st.r.top)) return false;"],
  ['the answer equals a jar number',                   "['hmm', 6, 2], ['give', 7, 4], ['put', 6, 4]", "['hmm', 6, 3], ['give', 7, 4], ['put', 6, 4]"],
  ['Check with no number counts a miss',               "if (st.chosen == null) { st.last = { reason: 'none' };", "if (st.chosen == null) { st.misses++; st.last = { reason: 'none' };"],
  ['the beads are numbered after one miss',            "if (st.show >= 2) return !L.fits", "if (st.show >= 1) return !L.fits"],
  ['the count hint even when the marks are not the difference', "return !L.fits ? 'hTooFar' :", "return false ? 'hTooFar' :"],
  ['equal answers may sit side by side',               "if (round(level, story, order[i]).ans === round(level, story, order[i - 1]).ans) return false;", ""],
  ['the plan may repeat the last pass',                "ok = orderOk(level, story, order) && !(prev && prev.length && prev.join() === order.join());", "ok = orderOk(level, story, order);"],
  ['the swap mask never swaps',                        "return i < Math.floor((n - 1) / 2); }), rnd);", "return false; }), rnd);"],
  ['Bo is a rabbit',                                   "bo: ['forest creatures', 'mouse']", "bo: ['forest creatures', 'rabbit']"],
  ['the same tile again re-arms',                      "if (n === st.chosen) return false;", ""],
  ['an unused variable (control)',                     "  function levelOf(l) {", "  var UNUSED_CONTROL = 0; function levelOf(l) {"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fr-mut-'));
  fs.writeFileSync(path.join(dir, 'fair-ribbon-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FR_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-fair-ribbon: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);

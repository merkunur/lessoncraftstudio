#!/usr/bin/env node
/* =====================================================================
   mutate-word-elastic.js — does verify-word-elastic-core.js BITE?
   Run: node scripts/mutate-word-elastic.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The stretch, the snap and the drag are rendering properties, gated by
   local-test-word-elastic.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'word-elastic-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-word-elastic-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a wrong middle letter accepted',                 "function same(r, b, i) { var s = r.sounds[i]; if (!b) return false;", "function same(r, b, i) { var s = r.sounds[i]; if (!b) return false; if (i === 1 && r.sounds.length === 3) return true;"],
  ['only the first wrong bead flagged',              "var wrong = []; for (var j = 0; j < n; j++) if (!same(r, st.beads[j], j)) wrong.push(j);", "var wrong = []; for (var j = 0; j < n; j++) if (!same(r, st.beads[j], j)) { wrong.push(j); break; }"],
  ['an empty bead counted as a miss',                "if (filled < n || st.stretch < n && !r.stopless) {", "if (false) {"],
  ['a fixed band stretches past the bead count',     "var max = r.stopless ? MAX_BEADS : r.sounds.length;", "var max = MAX_BEADS;"],
  ['a given letter can be removed',                  "if (st.beads[bead] && st.beads[bead].given) return false;", "void 0;"],
  ['k in a c-word tray',                             "'cat': 'e o d g'", "'cat': 'e o d k'"],
  ['the ghost at miss 1',                            "function ghostOn(st) { return helpOn(st) && st.help >= 3 && st.last.result === 'wrong'; }", "function ghostOn(st) { return helpOn(st) || (st.show && st.last && st.last.result === 'wrong'); }"],
  ['the help kept after a move',                     "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['the blend picture always in slot 1',             "var o = shuffle([1, 2], rnd); o.splice(t, 0, 0);", "var o = shuffle([1, 2], rnd); o.splice(0, 0, 0);"],
  ['the word bank lists the word first',             "var o = shuffle([1, 2, 3], rnd); o.splice(t, 0, 0);", "var o = shuffle([1, 2, 3], rnd); o.splice(0, 0, 0);"],
  ['sun points at the decorated weather/sun',        "'sun': 'beach/sun|s.u.n|'", "'sun': 'weather/sun|s.u.n|'"],
  ['two singles where a team belongs not seen',      "lower(st.beads[t].g) + lower(st.beads[t + 1].g) === lower(r.sounds[t])", "false"],
  /* found in this build */
  ['stretch it yourself: typing adds a bead',        "    if (b < 0) return false;   /* stop-less: typing never adds a bead — the child pulls them out */", "    if (b < 0 && r.stopless) { st.beads.push(null); b = st.beads.length - 1; }\n    if (b < 0) return false;"],
  ['typed letters case-sensitive',                   "return b.typed ? lower(b.g) === lower(s) : b.g === s;", "return b.g === s;"],
  ['a tray may read the word in order',              "if (run) bad = true;", "void run;"],
  ['the missing bead always the last',               "var MISSING_PATTERN = ['mid', 'last', 'first', 'mid', 'last', 'mid', 'first', 'last', 'mid'];", "var MISSING_PATTERN = ['last', 'last', 'last', 'last', 'last', 'last', 'last', 'last', 'last'];"],
  ['the slack gap at the wrong place',               "var gap = 0; while (gap < st.beads.length && same(r, st.beads[gap], gap)) gap++;", "var gap = 0;"],
  ['one letter of a team called «not the sound»',    "var part = wrong.some(", "var part = false && wrong.some("],
  ['a refused split (fox, x = two sounds)',          "'dog': 'animals/dog|d.o.g|'", "'dog': 'animals/dog|d.og|'"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wel-mut-'));
  fs.writeFileSync(path.join(dir, 'word-elastic-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { WEL_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-word-elastic: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

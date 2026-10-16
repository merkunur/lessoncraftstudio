#!/usr/bin/env node
/* =====================================================================
   mutate-constellation.js — does verify-constellation-core.js BITE?
   Run: node scripts/mutate-constellation.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'constellation-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-constellation-core.js');
const MUTATIONS = [
  ['a run may start at 1',        "[[2, 'mountains'], [3, 'star']", "[[1, 'mountains'], [3, 'star']"],
  ['1 is not always in the sky',  "if (start > 1) take(1);", "if (false) take(1);"],
  ['start−1 dropped',             "    take(start - 1);\n", "\n"],
  ['above numerals skipped',      "for (v = end + 1; v <= N; v++) take(v);", "for (v = end + 1; v <= N; v += 2) take(v);"],
  ['extra count ignores crowding', "13 - pts", "20 - pts"],
  ['lures ignore the bigger-number guess', "var step = cls === 'above' ? firstGuessableStep(pts, placed, 'B') : -1;", "var step = -1;"],
  ['lures ignore the nearest guess', "if (step < 0) step = firstGuessableStep(pts, placed, 'A');", "if (false) step = firstGuessableStep(pts, placed, 'A');"],
  ['extras may touch',            "if (dist(c, placed[k].p) < DMIN) { ok = false; break; }", "if (dist(c, placed[k].p) < DMIN * 0.8) { ok = false; break; }"],
  ['clear sky has extras',        "if (sky !== 'clear') {", "if (true) {"],
  ['taps after done',             "if (st.done || !star(st, v)) return { kind: 'none' };", "if (!star(st, v)) return { kind: 'none' };"],
  ['same not named',              "if (v === st.cur) return { kind: 'same' };", "if (false) return { kind: 'same' };"],
  /* 'a lit star is skip' was removed: every lit star is below cur, so an isLit clause was inert and the core dropped it */
  ['skip lights the star',        "if (v > st.cur + 1) return { kind: 'skip' };", "if (v > st.cur + 1) { st.lit.push(v); st.cur = v; return { kind: 'skip' }; }"],
  ['done never fires',            "if (v === st.end) { st.done = true; return { kind: 'done' }; }", "if (false) { st.done = true; return { kind: 'done' }; }"],
  ['restart keeps the thread',    "function restart(st) { st.lit = [st.start]; st.cur = st.start; st.done = false; }", "function restart(st) { st.cur = st.start; st.done = false; }"],
  ['star sized from the width',   "var s = Math.round(Math.min(W, H) / 6.8);", "var s = Math.round(W / 6.8);"],
  ['star floor dropped',          "if (s < 44) s = 44;", "if (s < 40) s = 40;"],
  ['star cap dropped',            "if (s > 68) s = 68;", "if (s > 80) s = 80;"],
  ['phone sky squashed',          "var aspect = W < 480 ? 1.0 : 0.66;", "var aspect = 0.66;"],
  ['stars may leave the frame',   "x: Math.round(PAD + R + q.u * Sx)", "x: Math.round(q.u * W)"],
  ['DMIN loosened',               "var DMIN = 0.22;", "var DMIN = 0.18;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cs-mut-'));
  fs.writeFileSync(path.join(dir, 'constellation-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { CS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-constellation: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

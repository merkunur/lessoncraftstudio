#!/usr/bin/env node
/* =====================================================================
   mutate-how-many.js — does verify-how-many-core.js BITE?
   Run: node scripts/mutate-how-many.js
   Every mutation below is applied to a COPY of how-many-core.js in a temp
   dir and the gate is run against it (HM_CORE_DIR); every one must FAIL
   the gate. A needle that misses is a harness fault, reported, never
   skipped (a dropped needle shrinks the total while the run still says
   "every mutation killed"). CRLF collapsed before searching. 30 s cap —
   a gate that hangs is SURVIVED.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'how-many-core.js');
const SRC = fs.readFileSync(SRC_PATH, 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-how-many-core.js');

const MUTATIONS = [
  ['double tag allowed',          "if (st.tags.indexOf(i) >= 0) return { ok: false, k: st.tags.length, reason: 'again' };", "if (false) return { ok: false, k: st.tags.length, reason: 'again' };"],
  ['verdict off by one',          "return st.answer === st.n ? 'ok' : 'wrong';", "return st.answer >= st.n ? 'ok' : 'wrong';"],
  ['untagged not reported',       "if (!allTagged(st)) return 'untagged';", "if (false) return 'untagged';"],
  ['line floor ignored',          "if (size < caps.min) { size = caps.min; fits = false; }\n      var totalW", "if (size < caps.min) { size = caps.min; fits = true; }\n      var totalW"],
  ['ring of ten allowed',         "if (n < 3 || n > 6) fits = false;", "if (n < 3 || n > 10) fits = false;"],
  ['scatter overlap allowed',     "if (Math.abs(pts[i].x - p.x) < minD && Math.abs(pts[i].y - p.y) < minD) { ok = false; break; }", "if (false) { ok = false; break; }"],
  ['pool drops the top number',   "for (var n = min; n <= max; n++) {", "for (var n = min; n < max; n++) {"],
  ['untagAll keeps the answer',   "function untagAll(st) { st.tags = []; st.answer = null; }", "function untagAll(st) { st.tags = []; }"],
  ['ring chord too short',        "return Math.ceil((size * 1.42 + (gap || GAP)) / (2 * Math.sin(Math.PI / n)));", "return Math.ceil((size * 0.9 + (gap || GAP)) / (2 * Math.sin(Math.PI / n)));"],
  ['six in one row called rows',  "var RECT = { 4: [2], 6: [3, 2], 8: [4, 2], 9: [3], 10: [5, 2] };", "var RECT = { 4: [2], 6: [6, 2], 8: [4, 2], 9: [3], 10: [5, 2] };"],
  ['seven offered as rows wide',  "if (W < 400 && n >= 4) { var c = Math.min(mc, 4);", "if (n >= 4) { var c = Math.min(mc, 4);"],
  ['setting serves wrong counts', "if (want) { if (allowed.indexOf(want) < 0 && n !== 0) continue;", "if (want) { if (false) continue;"],
  ['line of ten allowed',         "if (n > 5) fits = false;", "if (n > 50) fits = false;"],
  ['last tag is the first',       "function lastTagged(st) { return st.tags.length ? st.tags[st.tags.length - 1] : -1; }", "function lastTagged(st) { return st.tags.length ? st.tags[0] : -1; }"],
  ['range check off by one',      "if (!st || i < 0 || i >= st.n)", "if (!st || i < 0 || i > st.n)"],
  ['array columns uncapped',      "if (opts[i] <= mc && !(W < 400 && Math.ceil(n / opts[i]) > 3))", "if (true)"],
  ['scatter not deterministic',   "var rand = rng(seed || 1);", "var rand = Math.random;"],
];

let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hm-mut-'));
  fs.writeFileSync(path.join(dir, 'how-many-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { HM_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); }
  else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-how-many: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

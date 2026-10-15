#!/usr/bin/env node
/* =====================================================================
   mutate-egg-cartons.js — does verify-egg-cartons-core.js BITE?
   Run: node scripts/mutate-egg-cartons.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'egg-cartons-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-egg-cartons-core.js');
const MUTATIONS = [
  ['double tag allowed',       "if (st.tags.indexOf(i) >= 0) return { ok: false, k: st.tags.length, reason: 'again' };", "if (false) return { ok: false, k: st.tags.length, reason: 'again' };"],
  ['tag total is not tens',    "return { ok: true, k: st.tags.length, total: 10 * st.tags.length };", "return { ok: true, k: st.tags.length, total: st.tags.length };"],
  ['label is a flat ten',      "return k >= 0 ? 10 * (k + 1) : null;", "return k >= 0 ? 10 : null;"],
  ['ones slip not named',      "if (st.answer === st.tens || (st.answer === 10 && st.tens > 1)) return 'ones';", "if (st.answer === st.tens) return 'ones';"],
  ['untagged not reported',    "if (!allTagged(st)) return 'untagged';", "if (false) return 'untagged';"],
  ['pack over not reported',   "if (st.packed > st.tens) return 'over';", "if (false) return 'over';"],
  ['pack short not reported',  "if (st.packed < st.tens) return 'short';", "if (false) return 'short';"],
  ['shelf uncapped',           "if (st.kind !== 'pack' || st.packed >= 10) return false; st.packed++;", "if (st.kind !== 'pack') return false; st.packed++;"],
  ['remove below zero',        "if (st.kind !== 'pack' || st.packed <= 0) return false; st.packed--;", "if (st.kind !== 'pack') return false; st.packed--;"],
  ['untagAll keeps answer',    "function untagAll(st) { st.tags = []; st.answer = null; }", "function untagAll(st) { st.tags = []; }"],
  ['six columns',              "var cols = Math.max(1, Math.min(W >= 520 ? 5 : 4, fit));", "var cols = Math.max(1, Math.min(W >= 520 ? 6 : 4, fit));"],
  /* 'carton floor dropped' was removed: with columns chosen from the floor (caps()), the
     clamp in layout() is unreachable above 80px mats, so the mutation was inert — a harness
     fault, not a gate hole (the floor itself is asserted on every layout) */
  ['height floor dropped',     "if (h < 44) { h = 44; }", "if (false) { h = 44; }"],
  ['pack rounds missing',      "if (kind !== 'count') for (var t = 2; t <= maxTens; t++)", "if (kind === 'pack') for (var t = 2; t <= maxTens; t++)"],
  ['count rounds start at 3',  "if (kind !== 'pack') for (var k = 2; k <= maxTens; k++)", "if (kind !== 'pack') for (var k = 3; k <= maxTens; k++)"],
  ['tag works in pack rounds', "if (!st || st.kind !== 'count' || i < 0 || i >= st.tens)", "if (!st || i < 0 || i >= st.tens)"],
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ec-mut-'));
  fs.writeFileSync(path.join(dir, 'egg-cartons-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { EC_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-egg-cartons: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

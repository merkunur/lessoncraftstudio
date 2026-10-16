#!/usr/bin/env node
/* =====================================================================
   mutate-next-number.js — does verify-next-number-core.js BITE?
   Run: node scripts/mutate-next-number.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'next-number-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-next-number-core.js');
const MUTATIONS = [
  ['to 20 starts at 1',          "var N = Number(range) === 20 ? 20 : 10, lo = N === 20 ? 9 : 1, out = [];", "var N = Number(range) === 20 ? 20 : 10, lo = 1, out = [];"],
  ['answer may leave the path',  "for (var n = lo; n < N; n++)", "for (var n = lo; n <= N; n++)"],
  ['shown path opens nothing',   "if (path === 'shown') for (var v = 1; v < round.n; v++) st.open.push(v);", "if (false) for (var v = 1; v < round.n; v++) st.open.push(v);"],
  ['locked stones peek',         "if (v > st.n && !st.done) return { ok: false, reason: 'locked' };", "if (false) return { ok: false, reason: 'locked' };"],
  ['own stone peeks',            "if (v === st.n) return { ok: false, reason: 'self' };", "if (false) return { ok: false, reason: 'self' };"],
  ['peek never closes',          "if (i >= 0) { st.open.splice(i, 1); return { ok: true, open: false }; }", "if (false) { st.open.splice(i, 1); return { ok: true, open: false }; }"],
  ['run-up reveals the answer',  "function revealRunUp(st) { for (var v = 1; v < st.n; v++)", "function revealRunUp(st) { for (var v = 1; v <= st.n + 1; v++)"],
  ['typing above the path',      "if (s.length > 2 || Number(s) > st.N) return false;", "if (s.length > 2) return false;"],
  /* 'three digits type' was removed: any third digit makes a number ≥ 100 > N, so the length
     clause is unreachable and the mutation was inert — a harness fault, not a gate hole */
  ['leading zero kept',          "var s = (st.typed + d).replace(/^0+(?=\\d)/, '');", "var s = (st.typed + d);"],
  ['typing after done',          "if (st.done) return false;\n    d = String(d);", "d = String(d);"],
  ['same not named',             "if (a === st.n) return 'same';", "if (false) return 'same';"],
  ['before only at n-1',         "if (a < st.n) return 'before';", "if (a === st.n - 1) return 'before';"],
  ['far is before',              "    return 'far';", "    return 'before';"],
  ['ok is n',                    "if (a === st.n + 1) return 'ok';", "if (a === st.n) return 'ok';"],
  ['finish on any answer',       "function finish(st) { if (verdict(st) !== 'ok') return false; st.done = true; return true; }", "function finish(st) { st.done = true; return true; }"],
  ['finish does not open n+1',   "if (st.done && v === st.n + 1) return true;\n    return st.open.indexOf(v) >= 0;", "return st.open.indexOf(v) >= 0;"],
  ['ten columns on a phone',     "var cols = W >= 570 ? 10 : 5;", "var cols = 10;"],
  ['stone floor dropped',        "if (w < 44) { w = 44; fits = false; }", "if (false) { w = 44; fits = false; }"],
  ['stones square',              "var h = Math.round(w * ASPECT);", "var h = w;"],
  ['keys below 44',              "var chip = Math.max(44, Math.min(56, Math.floor((W - (perRow - 1) * gap) / perRow)));", "var chip = Math.min(56, Math.floor((W - (perRow - 1) * gap) / perRow));"],
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'np-mut-'));
  fs.writeFileSync(path.join(dir, 'next-number-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { NP_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-next-number: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);

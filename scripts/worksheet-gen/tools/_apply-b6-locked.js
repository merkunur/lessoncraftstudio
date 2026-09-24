#!/usr/bin/env node
/**
 * _apply-b6-locked.js <locale> — runs tools/apply-b6-locale.js for ONE locale under a
 * cross-process lock (out/.b6-apply-lock, created with an atomic mkdir), so native
 * panels working in parallel never interleave writes to the shared surfaces the apply
 * touches (topics-taxonomy.json, frontend/messages/<loc>.json, strand-names.ts, …).
 * A lock older than 10 minutes is treated as abandoned and removed.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const loc = process.argv[2];
if (!loc || !/^[a-z]{2}$/.test(loc)) { console.error('usage: _apply-b6-locked.js <locale>'); process.exit(2); }
const WG = path.join(__dirname, '..');
const LOCK = path.join(WG, 'out', '.b6-apply-lock');
const STALE_MS = 10 * 60 * 1000;
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

fs.mkdirSync(path.join(WG, 'out'), { recursive: true });
const t0 = Date.now();
for (;;) {
  try { fs.mkdirSync(LOCK); break; } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    try { if (Date.now() - fs.statSync(LOCK).mtimeMs > STALE_MS) { fs.rmdirSync(LOCK); continue; } } catch (_) { /* raced */ }
    if (Date.now() - t0 > 15 * 60 * 1000) { console.error('lock wait timed out'); process.exit(3); }
    sleep(3000);
  }
}
let code = 1;
try {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'apply-b6-locale.js'), loc], { cwd: WG, stdio: 'inherit' });
  code = r.status == null ? 1 : r.status;
} finally {
  try { fs.rmdirSync(LOCK); } catch (_) { /* gone */ }
}
process.exit(code);

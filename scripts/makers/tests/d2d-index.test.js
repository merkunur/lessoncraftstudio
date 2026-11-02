#!/usr/bin/env node
/**
 * The dot-to-dot index (data/d2d/index.json) is what a Dot to Dot maker chooses its picture from in the browser, and the
 * list Node reads the scenes in: it must be exactly what tools/build-d2d-index.js writes for today's scenes and settings.
 * Poison: a copy with one scene id changed must be reported stale.
 */
'use strict';
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const TOOL = path.join(REPO, 'scripts', 'worksheet-gen', 'tools', 'build-d2d-index.js');
const IDX = path.join(REPO, 'scripts', 'worksheet-gen', 'data', 'd2d', 'index.json');
let failed = 0;
const run = () => spawnSync(process.execPath, [TOOL, '--check'], { encoding: 'utf8' });
const r = run();
if (r.status !== 0) { console.error('FAIL ' + (r.stderr || r.stdout).trim()); failed++; } else console.log('ok   ' + r.stdout.trim());
// poison: change one byte of the index, the check must fail; then restore it exactly
const orig = fs.readFileSync(IDX, 'utf8');
try {
  fs.writeFileSync(IDX, orig.replace('"id":"', '"id":"x'));
  const p = run();
  if (p.status === 0) { console.error('FAIL poison: a changed index passed the check'); failed++; } else console.log('ok   poison: a changed index is reported stale');
} finally { fs.writeFileSync(IDX, orig); }
if (failed) process.exit(1);
console.log('d2d index: all checks pass');

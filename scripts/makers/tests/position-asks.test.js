#!/usr/bin/env node
/**
 * Position Words, the single-picture templates (K-065 Left and Right, K-066 Top, Middle, Bottom, K-067 Inside and
 * Outside): a new version asks another place, and the page's instruction names the place it asks, in every language
 * (operator 2026-11-17: "Left and Right" asked LEFT on every new version). The checks and their planted faults live in
 * scripts/worksheet-gen/qa/verify-position-asks.js; here both runs must end as they should.
 */
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
const TOOL = path.resolve(__dirname, '..', '..', 'worksheet-gen', 'qa', 'verify-position-asks.js');
let failed = 0;
const run = (args) => spawnSync(process.execPath, [TOOL, ...args], { encoding: 'utf8' });
const last = (r) => ((r.stdout || '') + (r.stderr || '')).trim().split('\n').pop();
const a = run([]);
if (a.status !== 0) { console.error('FAIL ' + last(a)); failed++; } else console.log('ok   ' + last(a));
const p = run(['--poison']);
if (p.status !== 0) { console.error('FAIL poison: ' + last(p)); failed++; } else console.log('ok   poison: ' + last(p));
if (failed) process.exit(1);

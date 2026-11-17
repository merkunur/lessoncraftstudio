#!/usr/bin/env node
/**
 * Answers not found by their place (2026-11-17): Reading Comprehension letters, Parts of Speech in Sentences word places, Which Place Decides? deciding place, Read and Do counts, Stop at the Number level 1.
 * The checks and their planted faults live in scripts/worksheet-gen/qa/verify-answer-places.js; here both runs must end as they should.
 */
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
const TOOL = path.resolve(__dirname, '..', '..', 'worksheet-gen', 'qa', 'verify-answer-places.js');
let failed = 0;
const run = (args) => spawnSync(process.execPath, [TOOL, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const last = (r) => ((r.stdout || '') + (r.stderr || '')).trim().split('\n').pop();
const a = run([]);
if (a.status !== 0) { console.error('FAIL ' + last(a)); failed++; } else console.log('ok   ' + last(a));
const p = run(['--poison']);
if (p.status !== 0) { console.error('FAIL poison: ' + last(p)); failed++; } else console.log('ok   poison: ' + last(p));
if (failed) process.exit(1);

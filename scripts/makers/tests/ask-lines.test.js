#!/usr/bin/env node
/**
 * The comparison templates (K-032 Big and Small, K-035 Tall and Short, K-037 Long and Short, K-079 Big Shapes, Small Shapes, K-038 Heavy or Light?, K-008 More or Less?): a new version asks the other end of the title in turn, and the page's instruction names the end it asks, in every language (2026-11-17: they asked BIGGEST, TALLEST, LONGEST, HEAVIER or MORE on every new version).
 * The checks and their planted faults live in scripts/worksheet-gen/qa/verify-ask-lines.js; here both runs must end as they should.
 */
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
const TOOL = path.resolve(__dirname, '..', '..', 'worksheet-gen', 'qa', 'verify-ask-lines.js');
let failed = 0;
const run = (args) => spawnSync(process.execPath, [TOOL, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const last = (r) => ((r.stdout || '') + (r.stderr || '')).trim().split('\n').pop();
const a = run([]);
if (a.status !== 0) { console.error('FAIL ' + last(a)); failed++; } else console.log('ok   ' + last(a));
const p = run(['--poison']);
if (p.status !== 0) { console.error('FAIL poison: ' + last(p)); failed++; } else console.log('ok   poison: ' + last(p));
if (failed) process.exit(1);

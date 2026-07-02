#!/usr/bin/env node
/* =====================================================================
   run-all-sep.js — the aggregating standing suite (Phase-2).

   Iterates the interactive worksheet apps (SoT = docs/storybook/app-coverage-matrix.json,
   which mirrors CLAUDE.md §14.10) and, per app, runs the PASS test (prove-app-sep.js:
   spec -> __sepGenerate headless -> SEP -> place -> validate -> qa autoSolve -> seed-repro
   -> >=2 locale) plus the baseline day-job-unchanged check (baseline-sep.js --check).
   Prints a PASS/FAIL matrix; exit code = number of failing apps (CI-usable).

   USAGE:
     node scripts/storybook/run-all-sep.js                 # all interactive apps
     node scripts/storybook/run-all-sep.js --only=a,b,c     # a subset
     node scripts/storybook/run-all-sep.js --phase=0        # apps tagged phase 0 in the matrix
     node scripts/storybook/run-all-sep.js --no-baseline    # skip the golden check
   npm: "test:storybook".
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const MATRIX = path.join(REPO, 'docs', 'storybook', 'app-coverage-matrix.json');

function arg(k) { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : null; }

const matrix = JSON.parse(fs.readFileSync(MATRIX, 'utf8'));
let apps = (matrix.apps || []).filter(a => a.interactive);
const only = arg('only'); if (only) { const set = new Set(only.split(',')); apps = apps.filter(a => set.has(a.app)); }
const phase = arg('phase'); if (phase != null) apps = apps.filter(a => String(a.phase) === String(phase));
const doBaseline = !process.argv.includes('--no-baseline');

console.log('[run-all-sep] ' + apps.length + ' app(s): ' + apps.map(a => a.app).join(', ') + '\n');

const rows = [];
for (const a of apps) {
  const app = a.app;
  process.stdout.write('── ' + app + ' … ');
  let pass = false, detail = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'prove-app-sep.js'), '--app=' + app],
      { cwd: REPO, encoding: 'utf8', stdio: 'pipe', timeout: 900000 });
    pass = true; detail = 'PASS';
  } catch (e) {
    const out = (e.stdout || '') + (e.stderr || '');
    const fails = out.split('\n').filter(l => /FAIL/.test(l)).map(l => l.replace(/^\s*(✗|FAIL)?\s*/, '').trim());
    detail = fails.slice(0, 3).join(' | ') || 'crashed';
  }
  let baseline = 'n/a';
  if (doBaseline && pass) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, 'baseline-sep.js'), '--check', '--app=' + app],
        { cwd: REPO, encoding: 'utf8', stdio: 'pipe', timeout: 300000 });
      baseline = 'clean';
    } catch (e) {
      const out = (e.stdout || '') + (e.stderr || '');
      baseline = /no baseline/i.test(out) ? 'uncaptured' : 'DRIFT';
    }
  }
  const okBaseline = baseline === 'clean' || baseline === 'n/a' || baseline === 'uncaptured';
  const ok = pass && okBaseline;
  rows.push({ app, ok, detail, baseline });
  console.log((ok ? 'PASS' : 'FAIL') + (baseline !== 'n/a' ? ' [baseline:' + baseline + ']' : '') + (ok ? '' : ' — ' + detail));
}

console.log('\n===== SEP coverage matrix =====');
rows.forEach(r => console.log('  ' + (r.ok ? '✓' : '✗') + '  ' + r.app.padEnd(18) + (r.ok ? 'PASS' : 'FAIL: ' + r.detail)));
const failed = rows.filter(r => !r.ok);
console.log('\n[run-all-sep] ' + (rows.length - failed.length) + '/' + rows.length + ' apps pass' +
  (failed.length ? ' — FAILING: ' + failed.map(r => r.app).join(', ') : ' — ALL GREEN'));
process.exit(failed.length);

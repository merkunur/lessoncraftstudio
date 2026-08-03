/**
 * Load the REAL hosted-worksheet personalization transforms into a CJS script.
 *
 * frontend/lib/hosted-worksheets/personalize.ts is deliberately dependency-free
 * (no `@/` aliases, no Prisma) precisely so it can be transpiled standalone and
 * driven by node — the gate and the backfill must exercise the SHIPPED logic,
 * never a reimplementation of it. #44's lesson: a check that rewrites the thing
 * it checks is testing a copy.
 *
 * Shared by scripts/audit-hosted-worksheet-placeholders.js and
 * scripts/ops/backfill-hosted-placeholders.js — a second copy of this transpile
 * step could drift from the first without anything noticing.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const SRC = path.join(REPO, 'frontend', 'lib', 'hosted-worksheets', 'personalize.ts');

let cached = null;

module.exports = function loadHostedPersonalize() {
  if (cached) return cached;
  if (!fs.existsSync(SRC)) throw new Error('personalize.ts not found at ' + SRC);

  const tsc = path.join(REPO, 'frontend', 'node_modules', 'typescript', 'bin', 'tsc');
  if (!fs.existsSync(tsc)) throw new Error('typescript not found at ' + tsc);

  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-personalize-'));
  execFileSync(process.execPath, [
    tsc, SRC, '--outDir', out,
    '--module', 'commonjs', '--target', 'ES2019', '--skipLibCheck',
  ], { stdio: 'pipe' });

  const mod = require(path.join(out, 'personalize.js'));

  // Non-vacuity: a transpile that silently produced an empty module would make
  // every downstream assertion pass against nothing.
  for (const fn of ['applyHostedPersonalization', 'stripCatalogChrome', 'findPlaceholderResidue']) {
    if (typeof mod[fn] !== 'function') throw new Error('personalize.ts did not export ' + fn);
  }

  cached = mod;
  return mod;
};

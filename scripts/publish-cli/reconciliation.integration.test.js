#!/usr/bin/env node
/**
 * Integration test for the §A.13 manifest.theme reconciliation gate.
 *
 * Targets the cross-module wiring between slug.reconcileManifestTheme and
 * bulk.writeBatchArtifacts (per-category tally + per-app breakdown +
 * _reconciliation.txt structure). Does NOT exercise the bundle
 * parse / deck.html substitution path — those are tested separately.
 *
 * Test 1 — synthetic 5-deck batch with 1 DISAGREE seeded:
 *   Constructs 5 dry-run-result-shaped objects (4 CLEAN + 1 THEME_DISAGREE).
 *   Calls bulk.writeBatchArtifacts on a temp staging dir. Reads back
 *   _reconciliation.txt, _errors.txt, _summary.txt. Asserts each has the
 *   expected structure and the DISAGREE deck surfaces correctly.
 *
 * Test 2 — every category surfaces in _reconciliation.txt:
 *   Constructs 6 dry-run results (1 CLEAN + 1 of each non-CLEAN category).
 *   Verifies the per-category tally + per-app breakdown emit correctly.
 *
 * Test 3 — 0-halts batch produces "all CLEAN" summary:
 *   Constructs 3 CLEAN dry-run results. Verifies _reconciliation.txt
 *   reads "3/3 CLEAN" and no halt-table is emitted.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');
var assert = require('assert');
var slug = require('./slug');
var bulk = require('./bulk');

function tmpDir(prefix) {
  var d = path.join(os.tmpdir(), prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8));
  fs.mkdirSync(d, { recursive: true });
  return d;
}

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

// Helper: build a synthetic dry-run result for a given manifest.
// Mirrors the result-shape produced by bulk.dryRunOneZip.
function fakeResult(zipBasename, manifest) {
  var recon = slug.reconcileManifestTheme(manifest);
  var result = {
    zipPath: '/fake/' + zipBasename,
    zipBasename: zipBasename,
    ok: false,
    deckId: manifest.deck_id || null,
    language: manifest.language || null,
    slug: null,
    canonicalURL: null,
    collision: null,
    themeReconciliation: recon,
    errors: [],
    warnings: [],
    routedAs: 'INSERT'
  };
  if (recon.category !== 'CLEAN') {
    result.errors.push(
      'manifest.theme reconciliation [' + recon.category + ']: ' +
      'declared=' + JSON.stringify(recon.declared) + ' ' +
      'primary=' + JSON.stringify(recon.primary) + ' ' +
      'secondary=' + JSON.stringify(recon.secondary)
    );
  } else {
    result.ok = true;
    result.slug = (manifest.exercise_type || 'unknown') +
      (manifest.theme ? '-' + manifest.theme : '');
  }
  return result;
}

// CLEAN sample (addition single-image-object shape)
function cleanAdditionManifest(theme) {
  return {
    deck_id: 'addition-image-image-en-CLEAN-' + theme,
    exercise_type: 'addition',
    language: 'en',
    theme: theme,
    exercises: [{
      operandA: 5, operandB: 3,
      image: { path: '/images/' + theme + '/sample.webp', theme: theme }
    }]
  };
}

// THEME_DISAGREE sample (code-addition emit-defect signature)
function disagreeCodeAdditionManifest() {
  return {
    deck_id: 'code-addition-en-DISAGREE',
    exercise_type: 'code-addition',
    language: 'en',
    theme: 'accessories',
    exercises: [[
      { path: '/images/tools/hammer.webp', theme: 'tools' },
      { path: '/images/tools/wrench.webp', theme: 'tools' }
    ]]
  };
}

// MISSING_THEME sample (declared undefined + image carries real-theme path)
function missingThemeManifest() {
  return {
    deck_id: 'addition-en-MISSING_THEME',
    exercise_type: 'addition',
    language: 'en',
    // theme field absent
    exercises: [{
      image: { path: '/images/animals/cat.webp', theme: 'animals' }
    }]
  };
}

// MISSING_PRIMARY sample (declared defined, image.theme missing, path-derived disagrees)
function missingPrimaryManifest() {
  return {
    deck_id: 'addition-en-MISSING_PRIMARY',
    exercise_type: 'addition',
    language: 'en',
    theme: 'animals',
    exercises: [{
      image: { path: '/images/vehicles/car.webp' /* no theme */ }
    }]
  };
}

// =========================================================================
// Test 1 — synthetic 5-deck batch with 1 DISAGREE seeded
// =========================================================================

console.log('Test 1 — synthetic 5-deck batch with 1 DISAGREE seeded:');

var test1Dir = tmpDir('recon-test-1');
try {
  var test1Results = [
    fakeResult('addition-image-image-en-001.zip', cleanAdditionManifest('animals')),
    fakeResult('addition-image-image-en-002.zip', cleanAdditionManifest('vehicles')),
    fakeResult('code-addition-en-DISAGREE.zip',  disagreeCodeAdditionManifest()),
    fakeResult('addition-image-image-en-004.zip', cleanAdditionManifest('fruits')),
    fakeResult('addition-image-image-en-005.zip', cleanAdditionManifest('toys'))
  ];

  bulk.writeBatchArtifacts(test1Dir, test1Results, {
    batchId: 'test-batch-1',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText = fs.readFileSync(path.join(test1Dir, '_reconciliation.txt'), 'utf8');
  var summaryText = fs.readFileSync(path.join(test1Dir, '_summary.txt'), 'utf8');
  var errorsText = fs.readFileSync(path.join(test1Dir, '_errors.txt'), 'utf8');

  // _reconciliation.txt asserts
  assert(reconText.indexOf('1 of 5 ZIPs non-CLEAN') >= 0, 'reconciliation header missing 1-of-5 phrase');
  assert(reconText.indexOf('THEME_DISAGREE') >= 0, 'reconciliation missing THEME_DISAGREE category');
  assert(reconText.indexOf('1  THEME_DISAGREE') >= 0, 'per-category tally missing 1 THEME_DISAGREE');
  assert(reconText.indexOf('code-addition  THEME_DISAGREE=1') >= 0, 'per-app breakdown missing code-addition');
  assert(reconText.indexOf('code-addition-en-DISAGREE.zip') >= 0, 'per-deck table missing the disagreed deck');
  assert(reconText.indexOf('"accessories"') >= 0, 'per-deck table missing declared value');
  assert(reconText.indexOf('"tools"') >= 0, 'per-deck table missing primary value');

  // _summary.txt asserts (DISAGREE'd ZIP carries errors=1)
  assert(summaryText.indexOf('code-addition-en-DISAGREE.zip') >= 0, '_summary.txt missing the deck');
  assert(summaryText.indexOf('errors=1') >= 0, '_summary.txt missing errors=1 marker');

  // _errors.txt asserts (THEME_DISAGREE message surfaces)
  assert(errorsText.indexOf('THEME_DISAGREE') >= 0, '_errors.txt missing category prefix');
  assert(errorsText.indexOf('code-addition-en-DISAGREE.zip') >= 0, '_errors.txt missing the deck');

  console.log('  PASS — 5-deck batch with 1 DISAGREE produces correct reconciliation halt + per-deck table');
} finally {
  rmrf(test1Dir);
}

// =========================================================================
// Test 2 — every non-CLEAN category surfaces in tally + breakdown
// =========================================================================

console.log('');
console.log('Test 2 — every non-CLEAN category surfaces in _reconciliation.txt:');

var test2Dir = tmpDir('recon-test-2');
try {
  var test2Results = [
    fakeResult('addition-image-image-en-CLEAN.zip',  cleanAdditionManifest('animals')),
    fakeResult('code-addition-en-DISAGREE.zip',      disagreeCodeAdditionManifest()),
    fakeResult('addition-en-MISSING_THEME.zip',      missingThemeManifest()),
    fakeResult('addition-en-MISSING_PRIMARY.zip',    missingPrimaryManifest())
  ];

  bulk.writeBatchArtifacts(test2Dir, test2Results, {
    batchId: 'test-batch-2',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText2 = fs.readFileSync(path.join(test2Dir, '_reconciliation.txt'), 'utf8');

  assert(reconText2.indexOf('3 of 4 ZIPs non-CLEAN') >= 0, 'expected 3-of-4 non-CLEAN');
  // Per-category tally — sorted alphabetically per writeBatchArtifacts impl
  assert(reconText2.indexOf('1  MISSING_PRIMARY') >= 0, 'tally missing MISSING_PRIMARY');
  assert(reconText2.indexOf('1  MISSING_THEME') >= 0, 'tally missing MISSING_THEME');
  assert(reconText2.indexOf('1  THEME_DISAGREE') >= 0, 'tally missing THEME_DISAGREE');
  // Per-app breakdown
  assert(reconText2.indexOf('addition  MISSING_PRIMARY=1, MISSING_THEME=1') >= 0,
    'addition app breakdown should aggregate two categories');
  assert(reconText2.indexOf('code-addition  THEME_DISAGREE=1') >= 0,
    'code-addition app breakdown should show single category');

  console.log('  PASS — all 3 non-CLEAN categories surface in tally + per-app breakdown');
} finally {
  rmrf(test2Dir);
}

// =========================================================================
// Test 3 — 0-halts batch produces "all CLEAN" summary
// =========================================================================

console.log('');
console.log('Test 3 — 0-halts batch produces all-CLEAN summary:');

var test3Dir = tmpDir('recon-test-3');
try {
  var test3Results = [
    fakeResult('addition-image-image-en-CLEAN-1.zip', cleanAdditionManifest('animals')),
    fakeResult('addition-image-image-en-CLEAN-2.zip', cleanAdditionManifest('vehicles')),
    fakeResult('addition-image-image-en-CLEAN-3.zip', cleanAdditionManifest('fruits'))
  ];

  bulk.writeBatchArtifacts(test3Dir, test3Results, {
    batchId: 'test-batch-3',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText3 = fs.readFileSync(path.join(test3Dir, '_reconciliation.txt'), 'utf8');

  assert(reconText3.indexOf('manifest.theme reconciliation: 3/3 CLEAN') >= 0,
    'all-CLEAN batch should produce concise summary line');
  assert(reconText3.indexOf('non-CLEAN') === -1,
    'all-CLEAN batch should NOT emit halt language');
  assert(reconText3.indexOf('THEME_DISAGREE') === -1,
    'all-CLEAN batch should NOT emit category names');

  console.log('  PASS — all-CLEAN batch produces concise CLEAN summary, no halt table');
} finally {
  rmrf(test3Dir);
}

console.log('');
console.log('---');
console.log('reconciliation.integration.test.js: 3/3 PASS');
process.exit(0);

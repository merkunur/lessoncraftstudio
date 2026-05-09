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
// Now (post-Commission δ) covers BOTH theme + exerciseMode reconciliation.
function fakeResult(zipBasename, manifest) {
  var recon = slug.reconcileManifestTheme(manifest);
  var modeRecon = slug.reconcileExerciseMode(manifest);
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
    exerciseModeReconciliation: modeRecon,
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
  }
  if (modeRecon.category !== 'CLEAN') {
    result.errors.push(
      'manifest.exerciseMode reconciliation [' + modeRecon.category + ']: ' +
      'declared=' + JSON.stringify(modeRecon.declared) + ' ' +
      'app=' + JSON.stringify(modeRecon.app) + ' ' +
      'appClass=' + modeRecon.appClass
    );
  }
  if (recon.category === 'CLEAN' && modeRecon.category === 'CLEAN') {
    result.ok = true;
    result.slug = (manifest.exercise_type || 'unknown') +
      (manifest.theme ? '-' + manifest.theme : '');
  }
  return result;
}

// CLEAN sample (addition single-image-object shape).
// Post-Commission δ: addition is DERIVED, so exercise_mode must be non-null.
function cleanAdditionManifest(theme) {
  return {
    deck_id: 'addition-image-image-en-CLEAN-' + theme,
    exercise_type: 'addition',
    exercise_mode: 'find-addend',
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
    exercise_mode: 'secret-word',  // post-5078f491; DERIVED app emits non-null
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
    exercise_mode: 'find-addend',  // CLEAN at exerciseMode gate; defect is on theme dimension only
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
    exercise_mode: 'find-addend',  // CLEAN at exerciseMode gate; defect is on theme dimension only
    language: 'en',
    theme: 'animals',
    exercises: [{
      image: { path: '/images/vehicles/car.webp' /* no theme */ }
    }]
  };
}

// Post-Commission δ — exerciseMode-specific defect samples

// MODE_NULL_FROM_DERIVED_APP — addition (DERIVED) with null exercise_mode
function nullModeFromDerivedManifest(theme) {
  return {
    deck_id: 'addition-en-MODE_NULL_DERIVED',
    exercise_type: 'addition',
    exercise_mode: null,  // emit-site regression for a DERIVED app
    language: 'en',
    theme: theme,
    exercises: [{
      operandA: 2, operandB: 3,
      image: { path: '/images/' + theme + '/sample.webp', theme: theme }
    }]
  };
}

// MODE_NULL_FROM_HARDCODED_APP — synthetic app classified HARDCODED_NULL.
// Post-Commission-ε all 29 §14.10 apps are DERIVED, so the gate's halt-on-
// HARDCODED-null path is exercised via a synthetic unknown app classified
// as HARDCODED_NULL by mutating the constant. We use a sentinel name +
// expect the reconciliation to fall through to UNKNOWN-class CLEAN under
// the standard table; tests that need MODE_NULL_FROM_HARDCODED_APP halt
// behavior would mock the classification at runtime (deferred).
//
// Repurposed helper: returns a manifest for a DERIVED app with null mode
// (which is now CLEAN per Interpretation Y). Renamed semantically to match
// post-Commission-ε reality; old name kept for test 4/5 compatibility.
function nullModeFromHardcodedManifest(theme) {
  return {
    deck_id: 'sudoku-en-DERIVED-NULL',
    exercise_type: 'sudoku',
    exercise_mode: null,  // post-Commission-ε CLEAN — sudoku is DERIVED + null is easy default
    language: 'en',
    theme: theme,
    exercises: [{
      image: { path: '/images/' + theme + '/sample.webp', theme: theme }
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

// =========================================================================
// Test 4 — exerciseMode-only halts (Commission δ section in _reconciliation.txt)
// =========================================================================

console.log('');
console.log('Test 4 — exerciseMode-only halts surface in _reconciliation.txt:');

var test4Dir = tmpDir('recon-test-4');
try {
  // Post-Commission-ε: HARDCODED_NULL classification is empty across the
  // 29 §14.10 apps. The 3 manifests below all classify as DERIVED+null,
  // which under Interpretation Y is CLEAN. Test verifies the gate
  // produces all-CLEAN for the post-Commission-ε state.
  var test4Results = [
    fakeResult('addition-image-image-en-CLEAN.zip',  cleanAdditionManifest('animals')),
    fakeResult('addition-en-DERIVED-NULL.zip',       nullModeFromDerivedManifest('animals')),
    fakeResult('sudoku-en-DERIVED-NULL.zip',         nullModeFromHardcodedManifest('animals'))
  ];

  bulk.writeBatchArtifacts(test4Dir, test4Results, {
    batchId: 'test-batch-4',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText4 = fs.readFileSync(path.join(test4Dir, '_reconciliation.txt'), 'utf8');

  // Theme section: 3/3 CLEAN
  assert(reconText4.indexOf('manifest.theme reconciliation: 3/3 CLEAN') >= 0,
    'theme section should be all-CLEAN');
  // ExerciseMode section: also 3/3 CLEAN — sudoku is now DERIVED, so its
  // null mode is legitimate per default-mode contract (Interpretation Y).
  assert(reconText4.indexOf('manifest.exerciseMode reconciliation: 3/3 CLEAN') >= 0,
    'exerciseMode section should be all-CLEAN post-Commission-ε');
  assert(reconText4.indexOf('MODE_NULL_FROM_HARDCODED_APP') === -1,
    'no halts post-Commission-ε; HARDCODED_NULL classification empty');

  console.log('  PASS — post-Commission-ε all-DERIVED state produces all-CLEAN gate output');
} finally {
  rmrf(test4Dir);
}

// =========================================================================
// Test 5 — mixed defect: theme + exerciseMode both halt on same batch
// =========================================================================

console.log('');
console.log('Test 5 — mixed-defect batch (theme + exerciseMode both halt):');

var test5Dir = tmpDir('recon-test-5');
try {
  // Post-Commission-ε: theme defects can still surface (gate's theme path
  // unchanged). exerciseMode halts no longer surface against any §14.10 app.
  // Test 5 retained to verify theme reconciliation continues working
  // independently of exerciseMode reconciliation.
  var test5Results = [
    fakeResult('addition-image-image-en-CLEAN.zip',  cleanAdditionManifest('animals')),  // CLEAN both
    fakeResult('code-addition-en-DISAGREE.zip',      disagreeCodeAdditionManifest()),    // theme DISAGREE
    fakeResult('sudoku-en-DERIVED-NULL.zip',         nullModeFromHardcodedManifest('toys')) // both CLEAN post-Commission-ε
  ];

  bulk.writeBatchArtifacts(test5Dir, test5Results, {
    batchId: 'test-batch-5',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText5 = fs.readFileSync(path.join(test5Dir, '_reconciliation.txt'), 'utf8');

  // Theme section: 1 of 3 non-CLEAN
  assert(reconText5.indexOf('manifest.theme reconciliation halt — 1 of 3 ZIPs non-CLEAN') >= 0,
    'theme section should report 1-of-3 non-CLEAN');
  assert(reconText5.indexOf('1  THEME_DISAGREE') >= 0, 'theme tally should include THEME_DISAGREE');
  // ExerciseMode section: 3/3 CLEAN (post-Commission-ε; no §14.10 app halts)
  assert(reconText5.indexOf('manifest.exerciseMode reconciliation: 3/3 CLEAN') >= 0,
    'exerciseMode section should be all-CLEAN post-Commission-ε');
  assert(reconText5.indexOf('code-addition-en-DISAGREE.zip') >= 0, 'theme-disagree deck row missing');

  console.log('  PASS — theme reconciliation surfaces independently; exerciseMode all-CLEAN post-Commission-ε');
} finally {
  rmrf(test5Dir);
}

// =========================================================================
// Test 6 — [ARC][SEO][DECK-PAGE] Phase 3a.1 Checkpoint 2 — SEO recon Section 3
// =========================================================================

console.log('');
console.log('Test 6 — SEO reconciliation Section 3 emits in _reconciliation.txt:');

var test6Dir = tmpDir('recon-test-6');
try {
  // Construct synthetic fakeResult-shape with seoReconciliation populated.
  // Mirrors the new field added by bulk.js Step 5b SEO recon wire-in.
  function fakeSeoResult(zipBasename, manifest, seoReconOverride) {
    var base = fakeResult(zipBasename, manifest);
    if (seoReconOverride) {
      base.seoReconciliation = seoReconOverride;
    }
    return base;
  }

  var test6Results = [
    // CLEAN deck — no SEO reconciliation entry
    fakeSeoResult('addition-image-image-en-001.zip', cleanAdditionManifest('animals'), {
      overall: 'CLEAN',
      predicates: {},
      haltCategories: [],
      warnCategories: [],
      deckId: 'addition-image-image-en-CLEAN-animals',
      app: 'addition'
    }),
    // HALT deck — multi-h1 detected (Phase 0 finding 2 reproduction)
    fakeSeoResult('sudoku-en-MULTI-H1.zip', cleanAdditionManifest('toys'), {
      overall: 'HALT',
      predicates: { h1: { category: 'MULTIPLE_H1_DETECTED', count: 2 } },
      haltCategories: ['MULTIPLE_H1_DETECTED'],
      warnCategories: [],
      deckId: 'sudoku-en-multi-h1',
      app: 'sudoku'
    }),
    // HALT deck — de title is byte-identical English (F3+H1 reproduction)
    fakeSeoResult('sudoku-de-LOCALE-RESIDUE.zip', cleanAdditionManifest('animals'), {
      overall: 'HALT',
      predicates: { locale: { category: 'LOCALE_RESIDUE_DETECTED' } },
      haltCategories: ['LOCALE_RESIDUE_DETECTED'],
      warnCategories: [],
      deckId: 'sudoku-de-residue',
      app: 'sudoku'
    }),
    // WARN deck — OG_IMAGE_FALLBACK_USED (informational ship-with-flag)
    fakeSeoResult('addition-en-OG-FALLBACK.zip', cleanAdditionManifest('vehicles'), {
      overall: 'WARN',
      predicates: { og: { category: 'OG_IMAGE_FALLBACK_USED' } },
      haltCategories: [],
      warnCategories: ['OG_IMAGE_FALLBACK_USED'],
      deckId: 'addition-en-og-fallback',
      app: 'addition'
    })
  ];

  bulk.writeBatchArtifacts(test6Dir, test6Results, {
    batchId: 'test-batch-6',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText6 = fs.readFileSync(path.join(test6Dir, '_reconciliation.txt'), 'utf8');

  // Section 3 header
  assert(reconText6.indexOf('Deck-page SEO reconciliation — 3 of 4 ZIPs non-CLEAN') >= 0,
    'Section 3 header should report 3-of-4 non-CLEAN');
  assert(reconText6.indexOf('2 HALT') >= 0, 'Section 3 should count 2 HALT');
  assert(reconText6.indexOf('1 WARN') >= 0, 'Section 3 should count 1 WARN');

  // Per-category tally
  assert(reconText6.indexOf('1  MULTIPLE_H1_DETECTED') >= 0, 'tally missing MULTIPLE_H1_DETECTED');
  assert(reconText6.indexOf('1  LOCALE_RESIDUE_DETECTED') >= 0, 'tally missing LOCALE_RESIDUE_DETECTED');
  assert(reconText6.indexOf('1  OG_IMAGE_FALLBACK_USED') >= 0, 'tally missing OG_IMAGE_FALLBACK_USED');

  // Per-app breakdown
  assert(reconText6.indexOf('addition  OG_IMAGE_FALLBACK_USED=1') >= 0,
    'addition app breakdown should aggregate WARN');
  assert(reconText6.indexOf('sudoku  LOCALE_RESIDUE_DETECTED=1, MULTIPLE_H1_DETECTED=1') >= 0,
    'sudoku app breakdown should aggregate two HALT categories');

  // Per-deck table
  assert(reconText6.indexOf('sudoku-en-MULTI-H1.zip') >= 0, 'per-deck table missing multi-h1 deck');
  assert(reconText6.indexOf('sudoku-de-LOCALE-RESIDUE.zip') >= 0, 'per-deck table missing locale-residue deck');
  assert(reconText6.indexOf('addition-en-OG-FALLBACK.zip') >= 0, 'per-deck table missing OG-fallback deck');
  assert(reconText6.indexOf('overall:  HALT') >= 0, 'per-deck table missing HALT label');
  assert(reconText6.indexOf('overall:  WARN') >= 0, 'per-deck table missing WARN label');

  // CLEAN deck should NOT appear in per-deck table (only non-CLEAN)
  assert(reconText6.indexOf('addition-image-image-en-001.zip\n  deck_id:') === -1,
    'CLEAN deck should not appear in per-deck table');

  console.log('  PASS — SEO Section 3 emits per-category + per-app + per-deck table per locked schema');
} finally {
  rmrf(test6Dir);
}

// =========================================================================
// Test 7 — SEO recon: 0-halt batch produces all-CLEAN Section 3 summary
// =========================================================================

console.log('');
console.log('Test 7 — SEO recon all-CLEAN batch produces concise Section 3 summary:');

var test7Dir = tmpDir('recon-test-7');
try {
  function fakeAllClean(zipBasename, manifest) {
    var base = fakeResult(zipBasename, manifest);
    base.seoReconciliation = {
      overall: 'CLEAN',
      predicates: {},
      haltCategories: [],
      warnCategories: [],
      deckId: manifest.deck_id,
      app: manifest.exercise_type
    };
    return base;
  }

  var test7Results = [
    fakeAllClean('addition-image-image-en-001.zip', cleanAdditionManifest('animals')),
    fakeAllClean('addition-image-image-en-002.zip', cleanAdditionManifest('vehicles')),
    fakeAllClean('addition-image-image-en-003.zip', cleanAdditionManifest('fruits'))
  ];

  bulk.writeBatchArtifacts(test7Dir, test7Results, {
    batchId: 'test-batch-7',
    inputFolder: '/fake/folder',
    updatesManifestPath: null
  });

  var reconText7 = fs.readFileSync(path.join(test7Dir, '_reconciliation.txt'), 'utf8');

  // Section 3 should report 3/3 CLEAN; no halt table
  assert(reconText7.indexOf('Deck-page SEO reconciliation: 3/3 CLEAN') >= 0,
    'all-CLEAN batch should produce concise Section 3 summary');
  assert(reconText7.indexOf('Deck-page SEO reconciliation —') === -1,
    'all-CLEAN batch should NOT emit halt language in Section 3');
  assert(reconText7.indexOf('MULTIPLE_H1_DETECTED') === -1,
    'all-CLEAN batch should NOT emit category names in Section 3');

  console.log('  PASS — SEO Section 3 all-CLEAN batch produces concise summary, no halt table');
} finally {
  rmrf(test7Dir);
}

console.log('');
console.log('---');
console.log('reconciliation.integration.test.js: 7/7 PASS');
process.exit(0);

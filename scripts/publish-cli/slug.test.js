#!/usr/bin/env node
/**
 * Unit tests for slug.js per Brief B Phase 2 Surface 2.
 * Node native `assert` — no test-framework dep.
 *
 * Coverage table (per the Phase 2 brief):
 *   Tier 1 EN + DE + edge cases (4 + 3 + 3 = 10)
 *   Tier 2 ES + NL (2 + 1 = 3)
 *   Tier 3 SV + FI + NO (1 + 1 + 1 = 3)
 *   Tier 4 DA + FR + IT + PT (1 + 1 + 1 + 1 = 4)
 *   Polish edge (Łukasz) = 1
 *   Total: 21 cases
 */

'use strict';

var assert = require('assert');
var slug = require('./slug');

var cases = [
  // Tier 1 EN
  { locale: 'en', input: 'Addition Practice',          expected: 'addition-practice' },
  { locale: 'en', input: 'Picture Sudoku',             expected: 'picture-sudoku' },
  { locale: 'en', input: 'Cryptogram Practice',        expected: 'cryptogram-practice' },
  { locale: 'en', input: 'Picture Path',               expected: 'picture-path' },

  // Tier 1 DE
  { locale: 'de', input: 'Mathe für Kindergarten',     expected: 'mathe-fur-kindergarten' },
  { locale: 'de', input: 'Übungen mit Tieren',         expected: 'ubungen-mit-tieren' },
  { locale: 'de', input: 'Straße der Zahlen',          expected: 'strasse-der-zahlen' },

  // Tier 2 ES
  { locale: 'es', input: 'Suma para niños',            expected: 'suma-para-ninos' },
  { locale: 'es', input: 'Práctica de matemáticas',    expected: 'practica-de-matematicas' },

  // Tier 2 NL
  { locale: 'nl', input: 'Optellen oefenen',           expected: 'optellen-oefenen' },

  // Tier 3 SV / FI / NO
  { locale: 'sv', input: 'Räkneövningar för förskola', expected: 'rakneovningar-for-forskola' },
  { locale: 'fi', input: 'Yhteenlasku eläimillä',      expected: 'yhteenlasku-elaimilla' },
  { locale: 'no', input: 'Telle dyr',                  expected: 'telle-dyr' },

  // Tier 4 DA / FR / IT / PT
  { locale: 'da', input: 'Tælle dyr',                  expected: 'taelle-dyr' },
  // Apostrophes per §17.8.5 conservative rule: ANY non-[a-z0-9-] becomes a hyphen.
  // Romance contractions with apostrophes (l'addition, dell'addizione) split at
  // the apostrophe rather than collapsing. URL-valid; slightly less idiomatic but
  // matches the spec's literal interpretation. Special-casing apostrophe stripping
  // would be a behavioral choice the spec doesn't authorize.
  { locale: 'fr', input: 'Maîtrise de l\'addition',    expected: 'maitrise-de-l-addition' },
  { locale: 'it', input: 'Pratica dell\'addizione',    expected: 'pratica-dell-addizione' },
  { locale: 'pt', input: 'Prática de adição',          expected: 'pratica-de-adicao' },

  // Polish edge
  { locale: 'pl-edge', input: 'Łukasz',                expected: 'lukasz' },

  // Edge cases
  { label: 'punctuation-only strips to empty', input: '???',          expected: '' },
  { label: 'all non-ASCII (CJK) strips to empty', input: '日本語',     expected: '' },
  { label: 'whitespace + leading/trailing hyphens', input: '  Hello world!  ', expected: 'hello-world' }
];

var failed = 0;
var passed = 0;

cases.forEach(function (c, i) {
  var actual = slug.slugify(c.input);
  try {
    assert.strictEqual(actual, c.expected);
    passed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' +
      (c.locale || c.label || '') + ' "' + c.input + '" → "' + actual + '"');
  } catch (e) {
    failed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' +
      (c.locale || c.label || '') + ' "' + c.input + '"');
    console.log('         expected: "' + c.expected + '"');
    console.log('         actual:   "' + actual + '"');
  }
});

console.log('---');
console.log('slug tests: ' + passed + ' passed, ' + failed + ' failed (of ' + cases.length + ')');

// Collision suffix smoke tests.
console.log('');
console.log('resolveCollision smoke tests:');
var taken = { 'addition-practice': true, 'addition-practice-2': true };
var r1 = slug.resolveCollision('addition-practice', function (s) { return !!taken[s]; });
console.log('  candidate "addition-practice" → ' + r1 + ' (expect "addition-practice-3")');
assert.strictEqual(r1, 'addition-practice-3', 'collision suffix should advance to next free');
var r2 = slug.resolveCollision('picture-sudoku', function (s) { return !!taken[s]; });
console.log('  candidate "picture-sudoku" (no collision) → ' + r2 + ' (expect "picture-sudoku")');
assert.strictEqual(r2, 'picture-sudoku', 'no collision returns candidate as-is');

console.log('');
console.log('All collision tests PASS.');

// deriveSeedFromManifest tests (theme-aware extension per §17.8.5).
console.log('');
console.log('deriveSeedFromManifest tests:');
var seedCases = [
  {
    label: 'theme-bearing addition',
    manifest: { exercise_type: 'addition', exercise_mode: 'find-addend', theme: 'animals' },
    expected: 'addition find-addend animals',
    expectedSlug: 'addition-find-addend-animals'
  },
  {
    label: 'theme-bearing subtraction with hyphenated theme',
    manifest: { exercise_type: 'subtraction', exercise_mode: 'cross-out', theme: 'farm_animals' },
    expected: 'subtraction cross-out farm_animals',
    expectedSlug: 'subtraction-cross-out-farm-animals'
  },
  {
    label: 'themeless deck (theme=null per pattern-worksheet precedent)',
    manifest: { exercise_type: 'pattern-worksheet', exercise_mode: 'sequence', theme: null },
    expected: 'pattern-worksheet sequence',
    expectedSlug: 'pattern-worksheet-sequence'
  },
  {
    label: 'themeless deck (theme field absent)',
    manifest: { exercise_type: 'pattern-worksheet', exercise_mode: 'sequence' },
    expected: 'pattern-worksheet sequence',
    expectedSlug: 'pattern-worksheet-sequence'
  },
  {
    label: 'themeless deck without exercise_mode',
    manifest: { exercise_type: 'wordsearch' },
    expected: 'wordsearch',
    expectedSlug: 'wordsearch'
  },
  {
    label: '4th-of-July numeric-leading theme',
    manifest: { exercise_type: 'addition', exercise_mode: 'image-image', theme: '4th_of_july' },
    expected: 'addition image-image 4th_of_july',
    expectedSlug: 'addition-image-image-4th-of-july'
  },
  {
    label: 'BW theme variant produces distinct slug',
    manifest: { exercise_type: 'addition', exercise_mode: 'mixed', theme: 'valentine_bw' },
    expected: 'addition mixed valentine_bw',
    expectedSlug: 'addition-mixed-valentine-bw'
  },
  {
    label: 'pre-extension parity (no theme, addition-image-image)',
    manifest: { exercise_type: 'addition', exercise_mode: 'image-image' },
    expected: 'addition image-image',
    expectedSlug: 'addition-image-image'
  }
];

var seedFailed = 0;
var seedPassed = 0;
seedCases.forEach(function (c, i) {
  var actualSeed = slug.deriveSeedFromManifest(c.manifest);
  var actualSlug = slug.slugify(actualSeed);
  try {
    assert.strictEqual(actualSeed, c.expected, 'seed mismatch');
    assert.strictEqual(actualSlug, c.expectedSlug, 'slug mismatch');
    seedPassed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label +
      ' → seed: "' + actualSeed + '" → slug: "' + actualSlug + '"');
  } catch (e) {
    seedFailed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label);
    console.log('         expected seed: "' + c.expected + '"');
    console.log('         actual seed:   "' + actualSeed + '"');
    console.log('         expected slug: "' + c.expectedSlug + '"');
    console.log('         actual slug:   "' + actualSlug + '"');
  }
});

console.log('---');
console.log('deriveSeedFromManifest tests: ' + seedPassed + ' passed, ' + seedFailed + ' failed (of ' + seedCases.length + ')');

// parseThemeFromImagePath tests (§A.13 reconciliation gate dependency).
console.log('');
console.log('parseThemeFromImagePath tests:');
var pathCases = [
  { label: 'standard theme dir',
    path: '/images/animals/cat-1769386104449-fcf95632.webp',
    expected: 'animals' },
  { label: 'underscore theme dir',
    path: '/images/farm_animals/cow-1769386104.webp',
    expected: 'farm_animals' },
  { label: '4th_of_july numeric-leading dir',
    path: '/images/4th_of_july/balloon.webp',
    expected: '4th_of_july' },
  { label: 'BW theme variant',
    path: '/images/valentine_bw/heart.webp',
    expected: 'valentine_bw' },
  { label: 'thanksgivinng (3-n typo theme)',
    path: '/images/thanksgivinng/turkey.webp',
    expected: 'thanksgivinng' },
  { label: 'CUID-shaped dir → null',
    path: '/images/cmkuesvi30000gxa3t9b8i597/wolf-1769386111029.webp',
    expected: null },
  { label: 'CUID uppercase variant → null',
    path: '/images/CMKUESVI30000GXA3T9B8I597/wolf.webp',
    expected: null },
  { label: 'malformed (no /images/ prefix) → null',
    path: '/foo/bar/baz.webp',
    expected: null },
  { label: 'path missing trailing slash → null',
    path: '/images/animals',
    expected: null },
  { label: 'null path → null',
    path: null,
    expected: null },
  { label: 'undefined path → null',
    path: undefined,
    expected: null },
  { label: 'empty string → null',
    path: '',
    expected: null },
  { label: 'short cm prefix (not CUID) → not null',
    path: '/images/cmyk/test.webp',
    expected: 'cmyk' }
];

var pathFailed = 0;
var pathPassed = 0;
pathCases.forEach(function (c, i) {
  var actual = slug.parseThemeFromImagePath(c.path);
  try {
    assert.strictEqual(actual, c.expected);
    pathPassed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label +
      ' → ' + JSON.stringify(actual));
  } catch (e) {
    pathFailed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label);
    console.log('         path:     ' + JSON.stringify(c.path));
    console.log('         expected: ' + JSON.stringify(c.expected));
    console.log('         actual:   ' + JSON.stringify(actual));
  }
});
console.log('---');
console.log('parseThemeFromImagePath tests: ' + pathPassed + ' passed, ' + pathFailed + ' failed (of ' + pathCases.length + ')');

// reconcileManifestTheme tests (each category in the decision tree).
console.log('');
console.log('reconcileManifestTheme tests:');
var reconCases = [
  // CLEAN — addition/subtraction shape, all three signals agree
  {
    label: 'CLEAN — addition single-image-object shape',
    manifest: {
      deck_id: 'addition-image-image-en-20260504105655',
      exercise_type: 'addition',
      theme: 'breakfast',
      exercises: [{ operandA: 5, operandB: 3, image: { path: '/images/breakfast/apple.webp', theme: 'breakfast' } }]
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — code-addition shape (array-of-images), declared agrees with image.theme
  {
    label: 'CLEAN — code-addition array-of-images shape',
    manifest: {
      deck_id: 'code-addition-en-CLEAN',
      exercise_type: 'code-addition',
      theme: 'pets',
      exercises: [[
        { path: '/images/pets/cat.webp', theme: 'pets' },
        { path: '/images/pets/dog.webp', theme: 'pets' }
      ]]
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — hyphen/underscore-normalized comparison
  {
    label: 'CLEAN — hyphen/underscore normalization',
    manifest: {
      deck_id: 'addition-mixed-en-norm',
      exercise_type: 'addition',
      theme: 'valentine-bw',
      exercises: [{ image: { path: '/images/valentine_bw/heart.webp', theme: 'valentine_bw' } }]
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — themeless (no theme + no images)
  {
    label: 'CLEAN — themeless (declared null + no exercises)',
    manifest: {
      deck_id: 'pattern-worksheet-themeless',
      exercise_type: 'pattern-worksheet',
      theme: null,
      exercises: []
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — pre-440 Track A pattern (declared missing, image.theme present, path is CUID)
  {
    label: 'CLEAN — Track A baseline pattern (CUID image dir)',
    manifest: {
      deck_id: 'code-addition-en-track-a-baseline',
      exercise_type: 'code-addition',
      // theme field absent
      exercises: [[{ path: '/images/cmkuesvi30000gxa3t9b8i597/wolf.webp', theme: 'animals' }]]
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — declared defined + primary missing + secondary agrees
  {
    label: 'CLEAN — image.theme missing but path agrees with declared',
    manifest: {
      deck_id: 'addition-en-no-image-theme',
      exercise_type: 'addition',
      theme: 'fruits',
      exercises: [{ image: { path: '/images/fruits/apple.webp' /* no theme on image */ } }]
    },
    expectedCategory: 'CLEAN'
  },
  // CLEAN — declared defined + image.theme missing + path is CUID (no actionable disagreement)
  {
    label: 'CLEAN — declared defined, no image.theme, CUID path',
    manifest: {
      deck_id: 'addition-en-cuid-path',
      exercise_type: 'addition',
      theme: 'animals',
      exercises: [{ image: { path: '/images/cmxyz1234567890abcdefghi/cat.webp' } }]
    },
    expectedCategory: 'CLEAN'
  },

  // THEME_DISAGREE — the code-addition v6.0.0 emit-defect signature
  {
    label: 'THEME_DISAGREE — declared "accessories" but image.theme "tools"',
    manifest: {
      deck_id: 'code-addition-en-DISAGREE',
      exercise_type: 'code-addition',
      theme: 'accessories',
      exercises: [[{ path: '/images/tools/hammer.webp', theme: 'tools' }]]
    },
    expectedCategory: 'THEME_DISAGREE'
  },
  // THEME_DISAGREE — addition single-image shape with disagreement
  {
    label: 'THEME_DISAGREE — addition shape with disagreement',
    manifest: {
      deck_id: 'addition-en-DISAGREE',
      exercise_type: 'addition',
      theme: 'animals',
      exercises: [{ image: { path: '/images/vehicles/car.webp', theme: 'vehicles' } }]
    },
    expectedCategory: 'THEME_DISAGREE'
  },

  // MISSING_THEME — declared undefined but image carries real-theme path
  {
    label: 'MISSING_THEME — declared missing but real-theme image',
    manifest: {
      deck_id: 'addition-en-MISSING_THEME',
      exercise_type: 'addition',
      // theme field absent
      exercises: [{ image: { path: '/images/animals/cat.webp', theme: 'animals' } }]
    },
    expectedCategory: 'MISSING_THEME'
  },

  // MISSING_PRIMARY — declared defined, image.theme missing, path-derived disagrees
  {
    label: 'MISSING_PRIMARY — declared disagrees with path, no image.theme',
    manifest: {
      deck_id: 'addition-en-MISSING_PRIMARY',
      exercise_type: 'addition',
      theme: 'animals',
      exercises: [{ image: { path: '/images/vehicles/car.webp' /* no theme */ } }]
    },
    expectedCategory: 'MISSING_PRIMARY'
  }
];

var reconFailed = 0;
var reconPassed = 0;
reconCases.forEach(function (c, i) {
  var actual = slug.reconcileManifestTheme(c.manifest);
  try {
    assert.strictEqual(actual.category, c.expectedCategory, 'category mismatch');
    reconPassed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label +
      ' → ' + actual.category);
  } catch (e) {
    reconFailed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label);
    console.log('         expected category: ' + c.expectedCategory);
    console.log('         actual: ' + JSON.stringify(actual));
  }
});
console.log('---');
console.log('reconcileManifestTheme tests: ' + reconPassed + ' passed, ' + reconFailed + ' failed (of ' + reconCases.length + ')');

// reconcileExerciseMode tests (each category in the decision tree per
// Commission δ).
console.log('');
console.log('reconcileExerciseMode tests:');
var modeReconCases = [
  // CLEAN — declared non-null
  {
    label: 'CLEAN — DERIVED app (addition) with declared mode',
    manifest: { deck_id: 'addition-test', exercise_type: 'addition', exercise_mode: 'find-addend' },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },
  {
    label: 'CLEAN — sudoku (DERIVED post-Commission-ε) with declared "easy" mode',
    manifest: { deck_id: 'sudoku-test', exercise_type: 'sudoku', exercise_mode: 'easy' },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'  // post-Commission-ε flip from HARDCODED_NULL
  },
  {
    label: 'CLEAN — code-addition with derived secret-word mode (post 5078f491)',
    manifest: { deck_id: 'code-addition-test', exercise_type: 'code-addition', exercise_mode: 'secret-word' },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },

  // CLEAN — DERIVED app with null is legitimate per Interpretation Y
  // (operator-shipped contracts may emit null for default modes; e.g.,
  // code-addition standard mode at 5078f491). Gate trusts DERIVED null.
  {
    label: 'CLEAN — addition (DERIVED) with null (default-mode contract)',
    manifest: { deck_id: 'addition-null', exercise_type: 'addition', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },
  {
    label: 'CLEAN — code-addition (DERIVED) with null (operator 2-mode contract)',
    manifest: { deck_id: 'code-addition-null', exercise_type: 'code-addition', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },
  {
    label: 'CLEAN — DERIVED app with empty string (treated as null per legitimate-default contract)',
    manifest: { deck_id: 'subtraction-empty', exercise_type: 'subtraction', exercise_mode: '' },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },

  // CLEAN — post-Commission-ε flip: these apps are now DERIVED. null is
  // legitimate per their locked-taxonomy default-mode contracts (e.g.,
  // sudoku=easy emits null; wordsearch=mixed emits null; alphabet-train
  // is single-mode so always null). HARDCODED_NULL classification is
  // empty post-Commission-ε.
  {
    label: 'CLEAN — sudoku (DERIVED) with null (easy default-mode contract)',
    manifest: { deck_id: 'sudoku-null', exercise_type: 'sudoku', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },
  {
    label: 'CLEAN — wordsearch (DERIVED) with null (mixed default-mode contract)',
    manifest: { deck_id: 'wordsearch-null', exercise_type: 'wordsearch', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },
  {
    label: 'CLEAN — alphabet-train (DERIVED, single-mode) with absent exercise_mode field',
    manifest: { deck_id: 'alphabet-train-missing', exercise_type: 'alphabet-train' /* exercise_mode absent */ },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'DERIVED'
  },

  // CLEAN — unknown app (degraded-trust)
  {
    label: 'CLEAN (degraded-trust) — unknown app with null',
    manifest: { deck_id: 'future-app-null', exercise_type: 'future-app', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'UNKNOWN'
  },
  {
    label: 'CLEAN (degraded-trust) — exercise_type absent',
    manifest: { deck_id: 'no-type-test', exercise_mode: null },
    expectedCategory: 'CLEAN',
    expectedAppClass: 'UNKNOWN'
  }
];

var modeReconFailed = 0;
var modeReconPassed = 0;
modeReconCases.forEach(function (c, i) {
  var actual = slug.reconcileExerciseMode(c.manifest);
  try {
    assert.strictEqual(actual.category, c.expectedCategory, 'category mismatch');
    assert.strictEqual(actual.appClass, c.expectedAppClass, 'appClass mismatch');
    modeReconPassed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label +
      ' → ' + actual.category + ' / ' + actual.appClass);
  } catch (e) {
    modeReconFailed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' + c.label);
    console.log('         expected: category=' + c.expectedCategory + ' appClass=' + c.expectedAppClass);
    console.log('         actual:   ' + JSON.stringify(actual));
  }
});
console.log('---');
console.log('reconcileExerciseMode tests: ' + modeReconPassed + ' passed, ' + modeReconFailed + ' failed (of ' + modeReconCases.length + ')');

// EXERCISE_MODE_APP_CLASSIFICATION coverage check — confirm all 29 §14.10
// canonical apps are present.
console.log('');
console.log('EXERCISE_MODE_APP_CLASSIFICATION coverage:');
var canonical29 = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
  'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet',
  'picture-path', 'picture-sort', 'prepositions', 'shadow-match',
  'subtraction', 'sudoku', 'treasure-hunt', 'word-guess', 'word-scramble',
  'wordsearch'
];
var classCoveragePassed = 0;
var classCoverageFailed = 0;
canonical29.forEach(function (app) {
  var cls = slug.EXERCISE_MODE_APP_CLASSIFICATION[app];
  if (cls === 'DERIVED' || cls === 'HARDCODED_NULL') {
    classCoveragePassed++;
  } else {
    classCoverageFailed++;
    console.log('  FAIL  ' + app + ' classification missing or unexpected: ' + cls);
  }
});
console.log('  ' + classCoveragePassed + '/29 §14.10 apps classified (DERIVED or HARDCODED_NULL)');
if (classCoverageFailed > 0) {
  console.log('  classCoverageFailed: ' + classCoverageFailed);
}

// Class-distribution check
var classCounts = { DERIVED: 0, HARDCODED_NULL: 0 };
canonical29.forEach(function (app) {
  var cls = slug.EXERCISE_MODE_APP_CLASSIFICATION[app];
  if (classCounts[cls] !== undefined) classCounts[cls]++;
});
console.log('  DERIVED: ' + classCounts.DERIVED + '  HARDCODED_NULL: ' + classCounts.HARDCODED_NULL);
// Post-Commission-ε: all 29 apps DERIVED; HARDCODED_NULL list empty.
var classDistributionFailed = (classCounts.DERIVED !== 29 || classCounts.HARDCODED_NULL !== 0) ? 1 : 0;
if (classDistributionFailed) {
  console.log('  FAIL — expected DERIVED=29 + HARDCODED_NULL=0 (post-Commission-ε); got DERIVED=' + classCounts.DERIVED + ' + HARDCODED_NULL=' + classCounts.HARDCODED_NULL);
}

var totalFailed = failed + seedFailed + pathFailed + reconFailed + modeReconFailed + classCoverageFailed + classDistributionFailed;
process.exit(totalFailed === 0 ? 0 : 1);

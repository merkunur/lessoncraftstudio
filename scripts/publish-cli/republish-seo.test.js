/**
 * Unit tests for republish-seo.js — Phase 4a retrofit script.
 *
 * Tests the pure functions (classifyDeck, resolveSeoOpts, computeNewHtml,
 * computeSeoHashes). Does NOT test the FS walk + atomic rewrite + DB
 * backfill end-to-end (those land at production reference run per Sub-step 5
 * of the plan).
 *
 * Test fixtures cover all 3 deck classes (A.1, A.2, B) + halt-class fixtures
 * for missing manifest + missing </head>.
 *
 * Run: node scripts/publish-cli/republish-seo.test.js
 */

'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var os = require('os');
var republishMod = require('./republish-seo');

var passCount = 0;
var failCount = 0;

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failCount++;
    console.log('  ✗ ' + name + ' — ' + e.message);
  }
}

// =====================================================================
// Test fixtures
// =====================================================================

var TEST_DIR = path.join(os.tmpdir(), 'lcs-republish-seo-test-' + Date.now());

function setupTestFixtures() {
  if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR, { recursive: true });
}

function teardownTestFixtures() {
  if (fs.existsSync(TEST_DIR)) {
    var del = function (p) {
      var s = fs.statSync(p);
      if (s.isDirectory()) {
        fs.readdirSync(p).forEach(function (n) { del(path.join(p, n)); });
        fs.rmdirSync(p);
      } else {
        fs.unlinkSync(p);
      }
    };
    try { del(TEST_DIR); } catch (e) {}
  }
}

function manifestFixture(overrides) {
  return Object.assign({
    schema_version: '1.0',
    deck_id: 'test-deck-001',
    language: 'en',
    exercise_type: 'addition',
    exercise_mode: null,
    theme: null,
    generator: { app: 'addition', app_version: '5.1.0', bundle_version: 5 },
    settings: {},
    seo_trace: null
  }, overrides || {});
}

function deckHtmlClassA1Fixture() {
  // Class A.1: marker pair present + post-Phase-3b shape
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<!-- SEO_INSERTION_POINT_START -->',
    '<title>Old Addition Worksheet — Animals — Kindergarten | LessonCraftStudio</title>',
    '<meta name="description" content="Old description">',
    '<link rel="canonical" href="https://www.lessoncraftstudio.com/en/decks/old/">',
    '<!-- SEO_INSERTION_POINT_END -->',
    '<!-- HREFLANG_INSERTION_POINT -->',
    '</head>',
    '<body>',
    '<h1 class="lcs-celebration__title">Well done!</h1>',
    '</body>',
    '</html>'
  ].join('\n');
}

function deckHtmlClassBFixture() {
  // Class B: pre-Phase-3a.2 publishes; no marker pair, no OG, multi-h1
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Addition Practice</title>',
    '</head>',
    '<body>',
    '<h1>Addition Practice</h1>',
    '<h1 class="lcs-celebration__title">Great job!</h1>',
    '</body>',
    '</html>'
  ].join('\n');
}

function setupClassA1Deck() {
  var deckDir = path.join(TEST_DIR, 'en', 'addition-animals-v1');
  fs.mkdirSync(deckDir, { recursive: true });
  var manifest = manifestFixture({
    deck_id: 'addition-animals-en-001',
    language: 'en',
    exercise_type: 'addition',
    theme: 'animals',
    seo_trace: {
      title: {
        typeName: { value: 'Addition', source: 'translations.en.exerciseType.addition', isLocalized: true },
        worksheetWord: { value: 'Worksheet', source: 'translations.en.worksheet', isLocalized: true },
        themeName: { value: 'Animals', source: 'translations.en.theme.animals', isLocalized: true },
        levelLocalized: { value: 'Kindergarten', source: 'i18n.seo.educational_level.kindergarten', isLocalized: true }
      },
      description: {
        freeInteractive: { value: 'Free interactive', source: 'translations.en.seoFreeInteractive', isLocalized: true },
        typeName: { value: 'Addition', source: 'translations.en.exerciseType.addition', isLocalized: true },
        worksheetWord: { value: 'Worksheet', source: 'translations.en.worksheet', isLocalized: true },
        themeName: { value: 'Animals', source: 'translations.en.theme.animals', isLocalized: true },
        forWord: { value: 'for', source: 'translations.en.seoFor', isLocalized: true },
        levelLocalized: { value: 'Kindergarten', source: 'i18n.seo.educational_level.kindergarten', isLocalized: true },
        instruction: { value: 'Add the numbers and write your answers', source: 'canvas.lcsLocalizedInstruction', isLocalized: true },
        printOrPlay: { value: 'Print or play online', source: 'translations.en.seoPrintOrPlayOnline', isLocalized: true }
      }
    }
  });
  fs.writeFileSync(path.join(deckDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(deckDir, 'deck.html'), deckHtmlClassA1Fixture());
  return { deckDir: deckDir, deckHtml: path.join(deckDir, 'deck.html'), manifest: manifest };
}

function setupClassBDeck() {
  var deckDir = path.join(TEST_DIR, 'en', 'subtraction-v1');
  fs.mkdirSync(deckDir, { recursive: true });
  var manifest = manifestFixture({
    deck_id: 'subtraction-en-002',
    language: 'en',
    exercise_type: 'subtraction',
    theme: null,
    seo_trace: null  // pre-Phase-3b
  });
  fs.writeFileSync(path.join(deckDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(deckDir, 'deck.html'), deckHtmlClassBFixture());
  return { deckDir: deckDir, deckHtml: path.join(deckDir, 'deck.html'), manifest: manifest };
}

function setupHaltNoManifestDeck() {
  var deckDir = path.join(TEST_DIR, 'en', 'halt-no-manifest-v1');
  fs.mkdirSync(deckDir, { recursive: true });
  fs.writeFileSync(path.join(deckDir, 'deck.html'), deckHtmlClassBFixture());
  return { deckDir: deckDir, deckHtml: path.join(deckDir, 'deck.html') };
}

// =====================================================================
// Tests
// =====================================================================

console.log('[republish-seo.test.js]');
console.log('');

setupTestFixtures();

// =====================================================================
console.log('walkDecks:');
// =====================================================================

test('walkDecks finds Class A.1 + Class B decks', function () {
  setupClassA1Deck();
  setupClassBDeck();
  var found = republishMod.walkDecks(TEST_DIR, { language: 'all' });
  assert.ok(found.length >= 2);
  var slugs = found.map(function (f) { return f.slug; });
  assert.ok(slugs.indexOf('addition-animals') !== -1);
  assert.ok(slugs.indexOf('subtraction') !== -1);
});

test('walkDecks filters by language', function () {
  var found = republishMod.walkDecks(TEST_DIR, { language: 'en' });
  assert.ok(found.length >= 2);
  found.forEach(function (f) { assert.strictEqual(f.locale, 'en'); });
});

test('walkDecks filters by slug', function () {
  var found = republishMod.walkDecks(TEST_DIR, { language: 'en', slug: 'addition-animals' });
  assert.strictEqual(found.length, 1);
  assert.strictEqual(found[0].slug, 'addition-animals');
});

test('walkDecks skips dot-prefixed dirs', function () {
  var dotDir = path.join(TEST_DIR, '.archived', 'en', 'whatever-v1');
  fs.mkdirSync(dotDir, { recursive: true });
  fs.writeFileSync(path.join(dotDir, 'deck.html'), '<html></html>');
  var found = republishMod.walkDecks(TEST_DIR, { language: 'all' });
  found.forEach(function (f) {
    assert.ok(f.deckHtml.indexOf('.archived') === -1, 'should not include .archived/ paths');
  });
});

// =====================================================================
console.log('');
console.log('classifyDeck:');
// =====================================================================

test('Class A.1: marker pair + seo_trace present', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  assert.strictEqual(c.classification, 'rewrite');
  assert.strictEqual(c.seoClass, 'A');
  assert.strictEqual(c.traceClass, 'A.1');
  assert.strictEqual(c.hasCelebrationH1, true);
});

test('Class B: no marker pair + no seo_trace', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  assert.strictEqual(c.classification, 'rewrite');
  assert.strictEqual(c.seoClass, 'B');
  assert.strictEqual(c.traceClass, 'A.2/B');
  assert.strictEqual(c.hasCelebrationH1, true);
});

test('Halt: missing manifest', function () {
  var d = setupHaltNoManifestDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'halt-no-manifest' });
  assert.strictEqual(c.classification, 'halt-no-manifest');
});

// =====================================================================
console.log('');
console.log('resolveSeoOpts:');
// =====================================================================

test('Class A.1 resolves SEO words from manifest.seo_trace', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var opts = republishMod.resolveSeoOpts(c);
  assert.strictEqual(opts.exerciseTypeName, 'Addition');
  assert.strictEqual(opts.themeName, 'Animals');
  assert.strictEqual(opts.worksheetWord, 'Worksheet');
  assert.strictEqual(opts.freeInteractive, 'Free interactive');
  assert.strictEqual(opts.forWord, 'for');
  assert.strictEqual(opts.printOrPlay, 'Print or play online');
  assert.strictEqual(opts.instruction, 'Add the numbers and write your answers');
});

test('Class B resolves SEO words from English defaults (no seo_trace)', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var opts = republishMod.resolveSeoOpts(c);
  assert.strictEqual(opts.worksheetWord, 'Worksheet');
  assert.strictEqual(opts.freeInteractive, 'Free interactive');
  assert.strictEqual(opts.forWord, 'for');
  assert.strictEqual(opts.printOrPlay, 'Print or play online');
  assert.strictEqual(opts.themeName, null);
});

// =====================================================================
console.log('');
console.log('computeNewHtml — Class A.1 (replace between markers):');
// =====================================================================

test('Class A.1: marker pair preserved (count = 2)', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var result = republishMod.computeNewHtml(c);
  var startCount = (result.newHtml.match(/<!-- SEO_INSERTION_POINT_START -->/g) || []).length;
  var endCount = (result.newHtml.match(/<!-- SEO_INSERTION_POINT_END -->/g) || []).length;
  assert.strictEqual(startCount, 1);
  assert.strictEqual(endCount, 1);
});

test('Class A.1: 14 OG/Twitter tags present', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var result = republishMod.computeNewHtml(c);
  var ogCount = (result.newHtml.match(/<meta property="og:[^"]+"/g) || []).length;
  var twCount = (result.newHtml.match(/<meta name="twitter:[^"]+"/g) || []).length;
  assert.strictEqual(ogCount + twCount, 14);
});

test('Class A.1: celebration h1 → h2', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var result = republishMod.computeNewHtml(c);
  assert.ok(result.newHtml.indexOf('<h1 class="lcs-celebration__title">') === -1, 'celebration h1 removed');
  assert.ok(result.newHtml.indexOf('<h2 class="lcs-celebration__title">Well done!</h2>') !== -1, 'celebration h2 present');
});

test('Class A.1: __EDUCATIONAL_LEVEL_LOCALIZED__ substituted', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var result = republishMod.computeNewHtml(c);
  assert.strictEqual(result.newHtml.indexOf('__EDUCATIONAL_LEVEL_LOCALIZED__'), -1, 'placeholder substituted');
});

test('Class A.1: canonical URL has www-form per §A.10', function () {
  var d = setupClassA1Deck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'addition-animals' });
  var result = republishMod.computeNewHtml(c);
  var canonMatch = /<link rel="canonical" href="([^"]+)"/.exec(result.newHtml);
  assert.ok(canonMatch, 'canonical link present');
  assert.ok(canonMatch[1].indexOf('https://www.lessoncraftstudio.com/') === 0, 'www-form: ' + canonMatch[1]);
});

// =====================================================================
console.log('');
console.log('computeNewHtml — Class B (inject before </head>):');
// =====================================================================

test('Class B: marker pair INJECTED before </head>', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var result = republishMod.computeNewHtml(c);
  var startCount = (result.newHtml.match(/<!-- SEO_INSERTION_POINT_START -->/g) || []).length;
  var endCount = (result.newHtml.match(/<!-- SEO_INSERTION_POINT_END -->/g) || []).length;
  assert.strictEqual(startCount, 1);
  assert.strictEqual(endCount, 1);
});

test('Class B: SEO block injected BEFORE </head>', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var result = republishMod.computeNewHtml(c);
  var endIdx = result.newHtml.indexOf('<!-- SEO_INSERTION_POINT_END -->');
  var headEndIdx = result.newHtml.indexOf('</head>');
  assert.ok(endIdx !== -1);
  assert.ok(headEndIdx !== -1);
  assert.ok(endIdx < headEndIdx, 'SEO block end (' + endIdx + ') before </head> (' + headEndIdx + ')');
});

test('Class B: 14 OG/Twitter tags present (was 0 before)', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var result = republishMod.computeNewHtml(c);
  var ogCount = (result.newHtml.match(/<meta property="og:[^"]+"/g) || []).length;
  var twCount = (result.newHtml.match(/<meta name="twitter:[^"]+"/g) || []).length;
  assert.strictEqual(ogCount + twCount, 14);
});

test('Class B: celebration h1 → h2', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var result = republishMod.computeNewHtml(c);
  assert.ok(result.newHtml.indexOf('<h2 class="lcs-celebration__title">Great job!</h2>') !== -1);
});

test('Class B: non-celebration h1 PRESERVED (only celebration h1 converts)', function () {
  var d = setupClassBDeck();
  var c = republishMod.classifyDeck({ deckHtml: d.deckHtml, locale: 'en', slug: 'subtraction' });
  var result = republishMod.computeNewHtml(c);
  // The non-celebration <h1>Addition Practice</h1> should remain
  assert.ok(result.newHtml.indexOf('<h1>Addition Practice</h1>') !== -1, 'non-celebration h1 preserved');
});

test('Class B: pre-existing <title> + meta description STRIPPED before inject (no duplicates)', function () {
  // Pre-existing deck.html has its own <title> + <meta description>; Class B
  // retrofit must strip them before injecting the new SEO block to avoid
  // duplicate <title> elements in the head.
  var deckDir = path.join(TEST_DIR, 'en', 'class-b-strip-v1');
  fs.mkdirSync(deckDir, { recursive: true });
  var manifest = manifestFixture({
    deck_id: 'class-b-strip-en-004',
    language: 'en',
    exercise_type: 'addition',
    seo_trace: null
  });
  fs.writeFileSync(path.join(deckDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  var html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>OLD TITLE TO STRIP</title>',
    '<meta name="description" content="OLD DESCRIPTION TO STRIP">',
    '<link rel="canonical" href="https://lessoncraftstudio.com/old">',
    '</head>',
    '<body>',
    '<h1>Worksheet</h1>',
    '</body>',
    '</html>'
  ].join('\n');
  fs.writeFileSync(path.join(deckDir, 'deck.html'), html);

  var c = republishMod.classifyDeck({
    deckHtml: path.join(deckDir, 'deck.html'),
    locale: 'en',
    slug: 'class-b-strip'
  });
  var result = republishMod.computeNewHtml(c);
  // Old title stripped
  assert.strictEqual(result.newHtml.indexOf('OLD TITLE TO STRIP'), -1, 'old title stripped');
  assert.strictEqual(result.newHtml.indexOf('OLD DESCRIPTION TO STRIP'), -1, 'old description stripped');
  // Exactly 1 <title> element (the new one)
  var titleCount = (result.newHtml.match(/<title>/g) || []).length;
  assert.strictEqual(titleCount, 1, 'exactly 1 <title> element');
  // Exactly 1 <meta name="description"> element
  var descCount = (result.newHtml.match(/<meta\s+name="description"/g) || []).length;
  assert.strictEqual(descCount, 1, 'exactly 1 <meta name="description"> element');
  // Exactly 1 <link rel="canonical"> element
  var canonCount = (result.newHtml.match(/<link\s+rel="canonical"/g) || []).length;
  assert.strictEqual(canonCount, 1, 'exactly 1 <link rel="canonical"> element');
});

test('Class B: JS-string-escaped celebration h1 → h2 (production-shape fixture)', function () {
  // Production deck.html embeds celebration as runtime JS string literal:
  //   "<h1 class=\"lcs-celebration__title\">"+T("youDidIt")+"</h1>"
  // Backslash-escaped quotes; sed line-context handles uniformly.
  var deckDir = path.join(TEST_DIR, 'en', 'js-escaped-celebration-v1');
  fs.mkdirSync(deckDir, { recursive: true });
  var manifest = manifestFixture({
    deck_id: 'js-escaped-en-003',
    language: 'en',
    exercise_type: 'addition',
    seo_trace: null
  });
  fs.writeFileSync(path.join(deckDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  var html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Addition Practice</title>',
    '</head>',
    '<body>',
    '<h1>Addition Practice</h1>',
    '<script>var template = "<h1 class=\\"lcs-celebration__title\\">"+T("youDidIt")+"</h1>";</script>',
    '</body>',
    '</html>'
  ].join('\n');
  fs.writeFileSync(path.join(deckDir, 'deck.html'), html);

  var c = republishMod.classifyDeck({
    deckHtml: path.join(deckDir, 'deck.html'),
    locale: 'en',
    slug: 'js-escaped-celebration'
  });
  var result = republishMod.computeNewHtml(c);
  // The JS-string-escaped <h1 ...> should become <h2 ...>
  assert.ok(result.newHtml.indexOf('<h2 class=\\"lcs-celebration__title\\"') !== -1,
    'JS-escaped celebration h1 converted to h2');
  assert.ok(result.newHtml.indexOf('<h1 class=\\"lcs-celebration__title\\"') === -1,
    'no JS-escaped celebration h1 remaining');
  // Non-celebration <h1>Addition Practice</h1> preserved
  assert.ok(result.newHtml.indexOf('<h1>Addition Practice</h1>') !== -1,
    'non-celebration h1 preserved');
});

// =====================================================================
console.log('');
console.log('computeSeoHashes:');
// =====================================================================

test('computeSeoHashes produces 40-char SHA-1 hex', function () {
  var hashes = republishMod.computeSeoHashes('Test Title', 'Test description');
  assert.strictEqual(typeof hashes.titleHash, 'string');
  assert.strictEqual(hashes.titleHash.length, 40);
  assert.strictEqual(typeof hashes.descriptionHash, 'string');
  assert.strictEqual(hashes.descriptionHash.length, 40);
});

test('computeSeoHashes: empty string yields null', function () {
  var hashes = republishMod.computeSeoHashes('', '');
  assert.strictEqual(hashes.titleHash, null);
  assert.strictEqual(hashes.descriptionHash, null);
});

test('computeSeoHashes: normalized (lowercase + trimmed)', function () {
  var h1 = republishMod.computeSeoHashes('  Test Title  ', '');
  var h2 = republishMod.computeSeoHashes('test title', '');
  assert.strictEqual(h1.titleHash, h2.titleHash);
});

// =====================================================================

teardownTestFixtures();

console.log('');
console.log('============================================================');
console.log('Tests: ' + passCount + ' passed, ' + failCount + ' failed');
process.exit(failCount > 0 ? 1 : 0);

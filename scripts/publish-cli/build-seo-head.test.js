/**
 * Unit tests for build-seo-head.js — Node-CJS port of catalog-export.js
 * `buildSeoHead`. Mirrors seo-reconciliation.test.js style: simple
 * assertion-based; no test framework beyond Node's built-in `assert`.
 *
 * Run: node scripts/publish-cli/build-seo-head.test.js
 */

'use strict';

var assert = require('assert');
var buildSeoHeadMod = require('./build-seo-head');
var buildSeoHead = buildSeoHeadMod.buildSeoHead;
var deriveExerciseModeName = buildSeoHeadMod.deriveExerciseModeName;

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
// Fixtures
// =====================================================================

function optsFixture(overrides) {
  return Object.assign({
    language: 'en',
    exerciseTypeName: 'Addition',
    exerciseTypeSlug: 'addition',
    themeName: 'Animals',
    worksheetWord: 'Worksheet',
    instruction: 'Add the numbers and write your answers',
    freeInteractive: 'Free interactive',
    forWord: 'for',
    printOrPlay: 'Print or play online'
  }, overrides || {});
}

// =====================================================================
// Tests
// =====================================================================

console.log('[build-seo-head.test.js]');
console.log('');

console.log('Marker pair emission:');

test('emits SEO_INSERTION_POINT_START as first line', function () {
  var out = buildSeoHead(optsFixture());
  var lines = out.split('\n');
  assert.strictEqual(lines[0], '<!-- SEO_INSERTION_POINT_START -->');
});

test('emits SEO_INSERTION_POINT_END as last line', function () {
  var out = buildSeoHead(optsFixture());
  var lines = out.split('\n');
  assert.strictEqual(lines[lines.length - 1], '<!-- SEO_INSERTION_POINT_END -->');
});

test('output has exactly 2 marker tags (start + end)', function () {
  var out = buildSeoHead(optsFixture());
  var startCount = (out.match(/<!-- SEO_INSERTION_POINT_START -->/g) || []).length;
  var endCount = (out.match(/<!-- SEO_INSERTION_POINT_END -->/g) || []).length;
  assert.strictEqual(startCount, 1);
  assert.strictEqual(endCount, 1);
});

console.log('');
console.log('Title emission:');

test('title with theme: "{Type} {Worksheet} — {Theme} — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"', function () {
  var out = buildSeoHead(optsFixture({ themeName: 'Animals' }));
  assert.ok(out.indexOf('<title>Addition Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

test('title without theme: theme segment + em-dashes omitted', function () {
  var out = buildSeoHead(optsFixture({ themeName: null }));
  assert.ok(out.indexOf('<title>Addition Worksheet — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
  assert.strictEqual(out.indexOf('Animals'), -1);
});

test('German title preserves capitalization', function () {
  var out = buildSeoHead(optsFixture({
    language: 'de',
    exerciseTypeName: 'Additionsspaß',
    worksheetWord: 'Arbeitsblatt',
    themeName: 'Tiere'
  }));
  assert.ok(out.indexOf('<title>Additionsspaß Arbeitsblatt — Tiere — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

console.log('');
console.log('Description emission:');

test('description with theme + instruction: full sentence', function () {
  var out = buildSeoHead(optsFixture());
  // Expected: "Free interactive Addition Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__. Add the numbers and write your answers. Print or play online."
  assert.ok(out.indexOf('content="Free interactive Addition Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__. Add the numbers and write your answers. Print or play online."') !== -1);
});

test('description without theme: parens + theme omitted', function () {
  var out = buildSeoHead(optsFixture({ themeName: null }));
  assert.ok(out.indexOf('content="Free interactive Addition Worksheet for __EDUCATIONAL_LEVEL_LOCALIZED__. Add the numbers and write your answers. Print or play online."') !== -1);
});

test('description without instruction: middle sentence omitted', function () {
  var out = buildSeoHead(optsFixture({ instruction: '' }));
  // Expected: "Free interactive Addition Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__. Print or play online."
  assert.ok(out.indexOf('content="Free interactive Addition Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__. Print or play online."') !== -1);
});

test('description: instruction without trailing period gets period appended', function () {
  var out = buildSeoHead(optsFixture({ instruction: 'Count the apples' }));
  assert.ok(out.indexOf('Count the apples. Print or play online.') !== -1);
});

test('description: instruction with trailing period is preserved as-is', function () {
  var out = buildSeoHead(optsFixture({ instruction: 'Count the apples.' }));
  // No double period
  assert.ok(out.indexOf('Count the apples.. Print or play online.') === -1);
  assert.ok(out.indexOf('Count the apples. Print or play online.') !== -1);
});

console.log('');
console.log('Canonical link emission:');

test('canonical link emits __CANONICAL_URL__ placeholder', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<link rel="canonical" href="__CANONICAL_URL__">') !== -1);
});

console.log('');
console.log('JSON-LD emission:');

test('JSON-LD: LearningResource @type', function () {
  var out = buildSeoHead(optsFixture());
  var match = /<script type="application\/ld\+json">([^<]+)<\/script>/.exec(out);
  assert.ok(match, 'JSON-LD script tag present');
  var ld = JSON.parse(match[1]);
  assert.strictEqual(ld['@type'], 'LearningResource');
  assert.strictEqual(ld.learningResourceType, 'Worksheet');
  assert.strictEqual(ld.educationalLevel, '__EDUCATIONAL_LEVEL__');
  assert.strictEqual(ld.url, '__CANONICAL_URL__');
});

test('JSON-LD: teaches uses exerciseTypeSlug', function () {
  var out = buildSeoHead(optsFixture({ exerciseTypeSlug: 'crossword' }));
  var match = /<script type="application\/ld\+json">([^<]+)<\/script>/.exec(out);
  var ld = JSON.parse(match[1]);
  assert.strictEqual(ld.teaches, 'crossword');
});

test('JSON-LD: inLanguage from opts.language', function () {
  var out = buildSeoHead(optsFixture({ language: 'de' }));
  var match = /<script type="application\/ld\+json">([^<]+)<\/script>/.exec(out);
  var ld = JSON.parse(match[1]);
  assert.strictEqual(ld.inLanguage, 'de');
});

test('JSON-LD: isAccessibleForFree true', function () {
  var out = buildSeoHead(optsFixture());
  var match = /<script type="application\/ld\+json">([^<]+)<\/script>/.exec(out);
  var ld = JSON.parse(match[1]);
  assert.strictEqual(ld.isAccessibleForFree, true);
});

console.log('');
console.log('OG + Twitter tag emission (Phase 3a.1 §17.8.1):');

test('emits 10 og:* tags', function () {
  var out = buildSeoHead(optsFixture());
  var ogCount = (out.match(/<meta property="og:[^"]+"/g) || []).length;
  assert.strictEqual(ogCount, 10);
});

test('emits 4 twitter:* tags', function () {
  var out = buildSeoHead(optsFixture());
  var twitterCount = (out.match(/<meta name="twitter:[^"]+"/g) || []).length;
  assert.strictEqual(twitterCount, 4);
});

test('total OG + Twitter = 14', function () {
  var out = buildSeoHead(optsFixture());
  var total = (out.match(/<meta (property="og:|name="twitter:)/g) || []).length;
  assert.strictEqual(total, 14);
});

test('og:title + twitter:title both emit __OG_TITLE__ placeholder', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:title" content="__OG_TITLE__">') !== -1);
  assert.ok(out.indexOf('<meta name="twitter:title" content="__OG_TITLE__">') !== -1);
});

test('og:image + twitter:image both emit __OG_IMAGE__ placeholder', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:image" content="__OG_IMAGE__">') !== -1);
  assert.ok(out.indexOf('<meta name="twitter:image" content="__OG_IMAGE__">') !== -1);
});

test('og:image:width = 1200 (literal)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:image:width" content="1200">') !== -1);
});

test('og:image:height = 630 (literal)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:image:height" content="630">') !== -1);
});

test('og:type = website (literal)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:type" content="website">') !== -1);
});

test('og:site_name = LessonCraftStudio (literal)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:site_name" content="LessonCraftStudio">') !== -1);
});

test('twitter:card = summary_large_image (literal)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta name="twitter:card" content="summary_large_image">') !== -1);
});

console.log('');
console.log('HREFLANG_MARKER stays OUTSIDE marker pair:');

test('output does NOT contain HREFLANG_INSERTION_POINT marker', function () {
  // Per §17.8.7: hreflang marker emitted separately by per-app code outside
  // the SEO_INSERTION_POINT pair. build-seo-head does NOT emit it.
  var out = buildSeoHead(optsFixture());
  assert.strictEqual(out.indexOf('HREFLANG_INSERTION_POINT'), -1);
});

console.log('');
console.log('Validation:');

test('throws when opts is null', function () {
  assert.throws(function () { buildSeoHead(null); }, /opts is required/);
});

test('throws when opts is undefined', function () {
  assert.throws(function () { buildSeoHead(); }, /opts is required/);
});

test('handles empty exerciseTypeName gracefully', function () {
  var out = buildSeoHead(optsFixture({ exerciseTypeName: '' }));
  // Should still emit; title becomes " Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"
  assert.ok(out.indexOf('<title>') !== -1);
  assert.ok(out.indexOf('| LessonCraftStudio') !== -1);
});

console.log('');
console.log('Phase 4a Checkpoint 2.5 (θ): exercise_mode discriminator:');

test('default mode (exerciseModeName = null): title has NO mode segment', function () {
  var out = buildSeoHead(optsFixture({ exerciseModeName: null }));
  // Expected: "Addition Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"
  assert.ok(out.indexOf('<title>Addition Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

test('non-default mode (exerciseModeName = "Find Addend"): title HAS mode segment', function () {
  var out = buildSeoHead(optsFixture({ exerciseModeName: 'Find Addend' }));
  // Expected: "Addition Find Addend Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"
  assert.ok(out.indexOf('<title>Addition Find Addend Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1,
    'title contains "Find Addend" segment');
});

test('non-default mode: description ALSO has mode segment', function () {
  var out = buildSeoHead(optsFixture({ exerciseModeName: 'Find Addend' }));
  assert.ok(out.indexOf('Free interactive Addition Find Addend Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__') !== -1,
    'description contains "Find Addend" segment');
});

test('default mode: description has NO mode segment', function () {
  var out = buildSeoHead(optsFixture({ exerciseModeName: null }));
  assert.ok(out.indexOf('Free interactive Addition Worksheet (Animals) for __EDUCATIONAL_LEVEL_LOCALIZED__') !== -1,
    'description has no mode segment');
});

test('empty string exerciseModeName treated as null (default mode)', function () {
  var out = buildSeoHead(optsFixture({ exerciseModeName: '' }));
  assert.ok(out.indexOf('<title>Addition Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

test('German title with mode preserves capitalization', function () {
  var out = buildSeoHead(optsFixture({
    language: 'de',
    exerciseTypeName: 'Subtraktion',
    worksheetWord: 'Arbeitsblatt',
    themeName: 'Tiere',
    exerciseModeName: 'Cross Out'
  }));
  assert.ok(out.indexOf('<title>Subtraktion Cross Out Arbeitsblatt — Tiere — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

console.log('');
console.log('deriveExerciseModeName helper:');

test('deriveExerciseModeName("find-addend") → "Find Addend"', function () {
  assert.strictEqual(deriveExerciseModeName('find-addend'), 'Find Addend');
});

test('deriveExerciseModeName("secret-word") → "Secret Word"', function () {
  assert.strictEqual(deriveExerciseModeName('secret-word'), 'Secret Word');
});

test('deriveExerciseModeName("cross-out") → "Cross Out"', function () {
  assert.strictEqual(deriveExerciseModeName('cross-out'), 'Cross Out');
});

test('deriveExerciseModeName("image-image") → "Image Image"', function () {
  assert.strictEqual(deriveExerciseModeName('image-image'), 'Image Image');
});

test('deriveExerciseModeName(null) → null', function () {
  assert.strictEqual(deriveExerciseModeName(null), null);
});

test('deriveExerciseModeName("") → null', function () {
  assert.strictEqual(deriveExerciseModeName(''), null);
});

test('deriveExerciseModeName(undefined) → null', function () {
  assert.strictEqual(deriveExerciseModeName(undefined), null);
});

test('deriveExerciseModeName(non-string) → null (e.g., number)', function () {
  assert.strictEqual(deriveExerciseModeName(42), null);
});

test('deriveExerciseModeName("simple") → "Simple" (single word, no hyphen)', function () {
  assert.strictEqual(deriveExerciseModeName('simple'), 'Simple');
});

console.log('');
console.log('============================================================');
console.log('Tests: ' + passCount + ' passed, ' + failCount + ' failed');
process.exit(failCount > 0 ? 1 : 0);

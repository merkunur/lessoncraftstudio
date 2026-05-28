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
var deriveVariantId = buildSeoHeadMod.deriveVariantId;

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

test('emits 12 og:* tags (10 original + og:image:secure_url + og:image:type per SEO-thumbnail commission)', function () {
  var out = buildSeoHead(optsFixture());
  var ogCount = (out.match(/<meta property="og:[^"]+"/g) || []).length;
  assert.strictEqual(ogCount, 12);
});

test('emits 5 twitter:* tags (4 original + twitter:image:alt per SEO-thumbnail commission)', function () {
  var out = buildSeoHead(optsFixture());
  var twitterCount = (out.match(/<meta name="twitter:[^"]+"/g) || []).length;
  assert.strictEqual(twitterCount, 5);
});

test('total OG + Twitter = 17', function () {
  var out = buildSeoHead(optsFixture());
  var total = (out.match(/<meta (property="og:|name="twitter:)/g) || []).length;
  assert.strictEqual(total, 17);
});

test('SEO-thumbnail commission: emits og:image:secure_url + og:image:type + twitter:image:alt + link rel=image_src', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<meta property="og:image:secure_url" content="__OG_IMAGE__">') !== -1, 'og:image:secure_url');
  assert.ok(out.indexOf('<meta property="og:image:type" content="image/png">') !== -1, 'og:image:type');
  assert.ok(out.indexOf('<meta name="twitter:image:alt" content="__OG_IMAGE_ALT__">') !== -1, 'twitter:image:alt');
  assert.ok(out.indexOf('<link rel="image_src" href="__OG_IMAGE__">') !== -1, 'link rel=image_src');
});

test('SEO-thumbnail commission: Schema.org image is ImageObject with width/height/caption', function () {
  var out = buildSeoHead(optsFixture());
  var ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(out)[1]);
  assert.strictEqual(typeof ld.image, 'object', 'image is object not string');
  assert.strictEqual(ld.image['@type'], 'ImageObject');
  assert.strictEqual(ld.image.url, '__OG_IMAGE__');
  assert.strictEqual(ld.image.contentUrl, '__OG_IMAGE__');
  assert.strictEqual(ld.image.width, 1200);
  assert.strictEqual(ld.image.height, 630);
  assert.strictEqual(ld.image.caption, '__OG_IMAGE_ALT__');
});

test('SEO-thumbnail commission: Schema.org adds thumbnailUrl + keywords + typicalAgeRange + publisher', function () {
  var out = buildSeoHead(optsFixture());
  var ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(out)[1]);
  assert.strictEqual(ld.thumbnailUrl, '__THUMBNAIL_URL__');
  assert.strictEqual(ld.keywords, '__SEO_KEYWORDS__');
  assert.strictEqual(ld.typicalAgeRange, '__AGE_RANGE__');
  assert.strictEqual(ld.publisher['@type'], 'Organization');
  assert.strictEqual(ld.publisher.name, 'LessonCraftStudio');
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
console.log('§11 commission: deriveVariantId helper:');

test('deriveVariantId returns null for null/undefined/non-object', function () {
  assert.strictEqual(deriveVariantId(null), null);
  assert.strictEqual(deriveVariantId(undefined), null);
  assert.strictEqual(deriveVariantId('not-an-object'), null);
});

test('deriveVariantId returns null for empty bundle', function () {
  assert.strictEqual(deriveVariantId({}), null);
});

test('deriveVariantId is deterministic (same bundle → same id)', function () {
  var b1 = { targets: [{ key: 'eagle' }, { key: 'cat' }] };
  var b2 = { targets: [{ key: 'eagle' }, { key: 'cat' }] };
  assert.strictEqual(deriveVariantId(b1), deriveVariantId(b2));
});

test('deriveVariantId varies across different bundles', function () {
  var b1 = { targets: [{ key: 'eagle' }] };
  var b2 = { targets: [{ key: 'cat' }] };
  assert.notStrictEqual(deriveVariantId(b1), deriveVariantId(b2));
});

test('deriveVariantId returns 4-char lowercase hex', function () {
  var id = deriveVariantId({ targets: [{ key: 'eagle' }] });
  assert.ok(/^[0-9a-f]{4}$/.test(id), 'expected 4-char lowercase hex, got: ' + id);
});

test('deriveVariantId ignores volatile fields (createdAt, attribution)', function () {
  var b1 = { targets: [{ key: 'eagle' }], createdAt: '2026-01-01' };
  var b2 = { targets: [{ key: 'eagle' }], createdAt: '2026-12-31' };
  // Different createdAt but same content → same variant_id (volatile fields skipped via fallback)
  // NOTE: in this case targets is non-empty so the fallback doesn't engage; createdAt is in primary contentObj.
  // But content keys take priority → same id.
  assert.strictEqual(deriveVariantId(b1), deriveVariantId(b2));
});

console.log('');
console.log('§11 commission: buildSeoHead with variantId:');

test('buildSeoHead title includes "Set {variantId}" segment when variantId set', function () {
  var html = buildSeoHead({
    language: 'en',
    exerciseTypeName: 'Picture Sudoku',
    exerciseTypeSlug: 'sudoku',
    themeName: 'Animals',
    worksheetWord: 'Worksheet',
    variantId: 'a3f2'
  });
  assert.ok(html.indexOf('Picture Sudoku Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ — Set a3f2 | LessonCraftStudio') !== -1,
    'expected title with Set a3f2 segment, got: ' + html.match(/<title>[^<]+/));
});

test('buildSeoHead title omits Set segment when variantId null', function () {
  var html = buildSeoHead({
    language: 'en',
    exerciseTypeName: 'Picture Sudoku',
    exerciseTypeSlug: 'sudoku',
    themeName: 'Animals',
    worksheetWord: 'Worksheet'
    // variantId omitted
  });
  assert.ok(html.indexOf('— Set ') === -1, 'expected no Set segment when variantId null');
});

test('buildSeoHead description includes "(Set {variantId})" when variantId set', function () {
  var html = buildSeoHead({
    language: 'en',
    exerciseTypeName: 'Picture Sudoku',
    exerciseTypeSlug: 'sudoku',
    themeName: 'Animals',
    worksheetWord: 'Worksheet',
    printOrPlay: 'Print or play online',
    variantId: 'b4e1'
  });
  assert.ok(html.indexOf('Print or play online (Set b4e1).') !== -1,
    'expected description with (Set b4e1) suffix');
});

console.log('');
console.log('Title overhaul: config-driven composer (opts.titleConfig present):');

var TITLE_CFG = require('./seo-title-config.json').en;

function titleText(out) {
  var m = /<title>([^<]*)<\/title>/.exec(out);
  return m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : null;
}

test('legacy path unchanged when titleConfig ABSENT (brand kept, placeholder level)', function () {
  var out = buildSeoHead(optsFixture());
  assert.ok(out.indexOf('<title>Addition Worksheet — Animals — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio</title>') !== -1);
});

test('new path: brand suffix DROPPED', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(out.indexOf('| LessonCraftStudio</title>'), -1, 'no brand in <title>');
  assert.ok(titleText(out).indexOf('LessonCraftStudio') === -1, 'no brand text in title');
});

test('new path: no "Set NNN" tail even when variantId provided', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    educationalLevelLocalized: 'Kindergarten',
    variantId: 'a3f2',
    differentiator: { kind: 'vocab', phrase: 'Cat & Dog', phraseShort: 'Cat', raw: 'cat|dog' }
  }));
  assert.strictEqual(titleText(out).indexOf('Set a3f2'), -1, 'no Set NNN in new title');
});

test('new path: redundant mode suppressed (Shadow Match + Match the Shadow)', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Shadow Match',
    exerciseModeName: 'Match the Shadow',
    themeName: 'Around the House',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'vocab', phrase: 'Cup & Door', phraseShort: 'Cup', raw: 'cup|door' }
  }));
  var t = titleText(out);
  assert.strictEqual(t, 'Shadow Match Worksheet — Around the House — Cup & Door — Kindergarten');
});

test('new path: worksheetWord dedupe (Math Worksheet type does not double "Worksheet")', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Math Worksheet',
    exerciseModeName: '3 Symbols, Add+Sub',
    themeName: '4th of July',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'none', phrase: null }
  }));
  var t = titleText(out);
  assert.strictEqual((t.match(/Worksheet/g) || []).length, 1, 'exactly one "Worksheet"');
  assert.strictEqual(t, 'Math Worksheet 3 Symbols, Add+Sub — 4th of July — Kindergarten');
});

test('new path: vocab differentiator inserted in config segment order', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Addition',
    themeName: 'Animals',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'vocab', phrase: 'Snake & Lizard', phraseShort: 'Snake', raw: 'lizard|snake' }
  }));
  assert.strictEqual(titleText(out), 'Addition Worksheet — Animals — Snake & Lizard — Kindergarten');
});

test('new path: budget trim reduces 2-noun diff to 1-noun then drops level', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Pattern Worksheet',
    themeName: 'Reptiles and Amphibians',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'vocab', phrase: 'Crocodile & Salamander', phraseShort: 'Crocodile', raw: 'a|b' }
  }));
  var t = titleText(out);
  assert.ok(t.length <= 70, 'within budget after trim, got ' + t.length + ': ' + t);
  assert.ok(t.indexOf('Reptiles and Amphibians') !== -1, 'theme NEVER dropped');
  assert.ok(t.indexOf('Crocodile') !== -1, 'diff (uniqueness) retained');
});

test('new path: themeless + none differentiator → clean short title', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Picture Sudoku',
    themeName: null,
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Picture Sudoku Worksheet — Kindergarten');
});

test('new path: disambiguator appended as final segment (collision fallback)', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Picture Sudoku',
    themeName: null,
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'none', phrase: null },
    disambiguator: 'b4e1'
  }));
  assert.strictEqual(titleText(out), 'Picture Sudoku Worksheet — Kindergarten — b4e1');
});

test('new path: fresh-publish (no resolved level) keeps placeholder + skips trim', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Addition',
    themeName: 'Animals',
    differentiator: { kind: 'vocab', phrase: 'Snake & Lizard', phraseShort: 'Snake', raw: 'lizard|snake' }
    // educationalLevelLocalized omitted → placeholder
  }));
  assert.ok(titleText(out).indexOf('__EDUCATIONAL_LEVEL_LOCALIZED__') !== -1, 'placeholder retained for substitute.js');
});

test('new path: JSON-LD name mirrors brandless composed title', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Addition',
    themeName: 'Animals',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'vocab', phrase: 'Snake & Lizard', phraseShort: 'Snake', raw: 'lizard|snake' }
  }));
  var ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(out)[1]);
  assert.strictEqual(ld.name, 'Addition Worksheet — Animals — Snake & Lizard — Kindergarten');
  assert.strictEqual(ld.name.indexOf('LessonCraftStudio'), -1);
});

test('new path: description branch UNTOUCHED (still uses legacy variant suffix)', function () {
  var out = buildSeoHead(optsFixture({
    titleConfig: TITLE_CFG,
    exerciseTypeName: 'Addition',
    themeName: 'Animals',
    educationalLevelLocalized: 'Kindergarten',
    variantId: 'a3f2',
    instruction: 'Add the numbers',
    differentiator: { kind: 'vocab', phrase: 'Snake & Lizard', phraseShort: 'Snake', raw: 'lizard|snake' }
  }));
  // description still carries "(Set a3f2)" — title overhaul does not touch the description path
  assert.ok(out.indexOf('(Set a3f2)') !== -1, 'description keeps its own variant suffix (out of scope)');
});

console.log('');
console.log('Title overhaul: Spanish locale config (sentence-case + Ficha + drop-jargon-modes):');

var ES_CFG = require('./seo-title-config.json').es;

test('es: sentence-case head/theme/level (no English Title-Case)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'es', titleConfig: ES_CFG,
    exerciseTypeName: 'Más O Menos', themeName: 'Vida Marina',
    educationalLevelLocalized: 'Kínder',
    differentiator: { kind: 'vocab', phrase: 'Pez payaso', phraseShort: 'Pez payaso', raw: 'clownfish' }
  }));
  assert.strictEqual(titleText(out), 'Más o menos ficha — Vida marina — Pez payaso — Kínder');
});

test('es: worksheetWordOverride forces "Ficha" (ignores opts.worksheetWord)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'es', titleConfig: ES_CFG,
    exerciseTypeName: 'Crucigrama', worksheetWord: 'Hoja de ejercicios', themeName: null,
    educationalLevelLocalized: '2.º de primaria',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Crucigrama ficha — 2.º de primaria');
});

test('es: headDropModes drops jargon mode "image-image" from the head', function () {
  var out = buildSeoHead(optsFixture({
    language: 'es', titleConfig: ES_CFG,
    exerciseTypeName: 'Más O Menos', exerciseModeName: 'Imagen-Imagen', exerciseModeKey: 'image-image',
    themeName: 'Vida Marina', educationalLevelLocalized: 'Preescolar',
    differentiator: { kind: 'none', phrase: null }
  }));
  var t = titleText(out);
  assert.strictEqual(t.indexOf('Imagen'), -1, 'image-image mode removed from head');
  assert.strictEqual(t, 'Más o menos ficha — Vida marina — Preescolar');
});

test('es: a non-listed mode is KEPT in the head (cardinal directions)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'es', titleConfig: ES_CFG,
    exerciseTypeName: 'Búsqueda Del Tesoro', exerciseModeName: 'Puntos cardinales', exerciseModeKey: 'compass',
    themeName: 'Accesorios', educationalLevelLocalized: 'Kínder',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.ok(titleText(out).indexOf('puntos cardinales') !== -1, 'cardinal-directions mode retained (sentence-cased)');
});

// Note: 'Más O Menos Ficha' — 'Ficha' stays capitalized because it is the
// worksheetWordOverride appended AFTER segCase lowercases the type; segCase runs
// on the WHOLE head string, so verify the real rendered form rather than assume.
test('es: differentiator sentence-case via deriveDifferentiator (phrase-level)', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'word-guess', theme: 'animals', language: 'es', vocabulary: ['MURCIÉLAGO'], images_used: ['/images/animals/bat.png'] },
    'es',
    { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.kind, 'vocab');
  assert.strictEqual(r.phrase, 'Murciélago', 'ALL-CAPS vocab normalized to sentence-case; got: ' + r.phrase);
});

console.log('');
console.log('Title overhaul: Italian locale config (headStyle of-type + Prescolare):');

var IT_CFG = require('./seo-title-config.json').it;

test('it of-type: noun math type, no mode -> "Scheda di {type}"', function () {
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Addizione', exerciseTypeSlug: 'addition', themeName: 'Animali',
    educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'vocab', phrase: 'Mucca', phraseShort: 'Mucca', raw: 'cow' }
  }));
  assert.strictEqual(titleText(out), 'Scheda di addizione — Animali — Mucca — Prescolare');
});

test('it of-type: math keyword ALWAYS kept (mode NOT promoted to head)', function () {
  // subtraction cross-out must stay "Scheda di sottrazione", never "Barrare".
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Sottrazione', exerciseTypeSlug: 'subtraction',
    exerciseModeName: 'Barrare', exerciseModeKey: 'cross-out',
    themeName: 'Animali', educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'vocab', phrase: 'Maiale', phraseShort: 'Maiale', raw: 'pig' }
  }));
  assert.strictEqual(titleText(out), 'Scheda di sottrazione — Animali — Maiale — Prescolare');
});

test('it of-type: jargon mode (image-image) dropped -> falls back to "Scheda di {type}"', function () {
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Addizione', exerciseTypeSlug: 'addition',
    exerciseModeName: 'Immagine-Immagine', exerciseModeKey: 'image-image',
    themeName: 'Animali', educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Scheda di addizione — Animali — Prescolare');
});

test('it non-of-type: type stands alone, no worksheet word', function () {
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Cruciverba', exerciseTypeSlug: 'crossword', themeName: 'Frutta',
    educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Cruciverba — Frutta — Prescolare');
  assert.strictEqual(titleText(out).toLowerCase().indexOf('scheda'), -1, 'no worksheet word on non-of-type');
});

test('it non-of-type: Title-Case type sentence-cased ("Più O Meno" -> "Più o meno")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Più O Meno', exerciseTypeSlug: 'more-less', themeName: 'Vita marina',
    educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Più o meno — Vita marina — Prescolare');
});

test('it: differentiator connector is "e" (conjunction) + sentence-case', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'it', vocabulary: ['mucca', 'pecora'], images_used: ['/images/animals/cow.png', '/images/animals/sheep.png'] },
    'it',
    { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Mucca e pecora', 'expected "Mucca e pecora", got: ' + r.phrase);
});

console.log('');
console.log('Title overhaul: Brazilian Portuguese config (of-type, "de" connector):');

var PT_CFG = require('./seo-title-config.json').pt;

test('pt of-type: "Atividade de {type}" (de connector, not di)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'pt', titleConfig: PT_CFG,
    exerciseTypeName: 'Adição', exerciseTypeSlug: 'addition', themeName: 'Animais',
    educationalLevelLocalized: 'Educação infantil',
    differentiator: { kind: 'vocab', phrase: 'Vaca', phraseShort: 'Vaca', raw: 'cow' }
  }));
  assert.strictEqual(titleText(out), 'Atividade de adição — Animais — Vaca — Educação infantil');
});

test('pt non-of-type: activity-named type stands alone (no "Atividade de")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'pt', titleConfig: PT_CFG,
    exerciseTypeName: 'Palavras Cruzadas', exerciseTypeSlug: 'crossword', themeName: 'Frutas',
    educationalLevelLocalized: 'Pré-escola',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Palavras cruzadas — Frutas — Pré-escola');
});

test('pt: differentiator connector is "e" + sentence-case', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'pt', vocabulary: ['cobra', 'lagarto'], images_used: ['/images/animals/snake.png', '/images/animals/lizard.png'] },
    'pt',
    { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Cobra e lagarto', 'expected "Cobra e lagarto", got: ' + r.phrase);
});

test('it of-type still uses "di" (ofTypeConnector backstop after default change)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'it', titleConfig: IT_CFG,
    exerciseTypeName: 'Addizione', exerciseTypeSlug: 'addition', themeName: 'Animali',
    educationalLevelLocalized: 'Prescolare',
    differentiator: { kind: 'vocab', phrase: 'Mucca', phraseShort: 'Mucca', raw: 'cow' }
  }));
  assert.strictEqual(titleText(out), 'Scheda di addizione — Animali — Mucca — Prescolare');
});

console.log('');
console.log('Title overhaul: German config (of-type "after" + german casing):');

var DE_CFG = require('./seo-title-config.json').de;

test('de of-type "after": "{Type} Arbeitsblatt" (type-first, preserve noun caps)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'de', titleConfig: DE_CFG,
    exerciseTypeName: 'Addition', exerciseTypeSlug: 'addition', themeName: 'Tiere',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'vocab', phrase: 'Specht', phraseShort: 'Specht', raw: 'woodpecker' }
  }));
  assert.strictEqual(titleText(out), 'Addition Arbeitsblatt — Tiere — Specht — Kindergarten');
});

test('de non-of-type: type stands alone (no Arbeitsblatt double)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'de', titleConfig: DE_CFG,
    exerciseTypeName: 'Kreuzworträtsel', exerciseTypeSlug: 'crossword', themeName: 'Obst',
    educationalLevelLocalized: 'Vorschule',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Kreuzworträtsel — Obst — Vorschule');
});

test('de math-worksheet: type already has "Arbeitsblatt", no double', function () {
  var out = buildSeoHead(optsFixture({
    language: 'de', titleConfig: DE_CFG,
    exerciseTypeName: 'Mathe-Arbeitsblatt', exerciseTypeSlug: 'math-worksheet', themeName: 'Tiere',
    educationalLevelLocalized: 'Kindergarten',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual((titleText(out).match(/Arbeitsblatt/g) || []).length, 1);
  assert.strictEqual(titleText(out), 'Mathe-Arbeitsblatt — Tiere — Kindergarten');
});

test('de german casing: ALL-CAPS normalized, proper-cased nouns preserved, "und" connector', function () {
  var d = require('./seo-differentiator');
  var allcaps = d.deriveDifferentiator(
    { exercise_type: 'word-guess', theme: 'activities', language: 'de', vocabulary: ['SCHACH', 'TANZEN'], images_used: [] },
    'de', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'german' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(allcaps.phrase, 'Schach und Tanzen', 'all-caps normalized; got: ' + allcaps.phrase);
  var proper = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'de', vocabulary: ['Katze', 'Hund'], images_used: [] },
    'de', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'german' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(proper.phrase, 'Katze und Hund', 'proper nouns preserved; got: ' + proper.phrase);
});

console.log('');
console.log('Title overhaul: French config (of-type + elision + sentence-case):');

var FR_CFG = require('./seo-title-config.json').fr;

test('fr of-type elision: "Fiche d\'addition" (de + vowel → d\')', function () {
  var out = buildSeoHead(optsFixture({
    language: 'fr', titleConfig: FR_CFG,
    exerciseTypeName: 'Addition', exerciseTypeSlug: 'addition', themeName: 'Animaux',
    educationalLevelLocalized: 'Maternelle',
    differentiator: { kind: 'vocab', phrase: 'Loup', phraseShort: 'Loup', raw: 'wolf' }
  }));
  assert.strictEqual(titleText(out), "Fiche d'addition — Animaux — Loup — Maternelle");
});

test('fr of-type no elision: "Fiche de soustraction" (de + consonant)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'fr', titleConfig: FR_CFG,
    exerciseTypeName: 'Soustraction', exerciseTypeSlug: 'subtraction', themeName: 'Animaux',
    educationalLevelLocalized: 'CE1',
    differentiator: { kind: 'vocab', phrase: 'Renard', phraseShort: 'Renard', raw: 'fox' }
  }));
  assert.strictEqual(titleText(out), 'Fiche de soustraction — Animaux — Renard — CE1');
});

test('fr non-of-type: activity type standalone, sentence-cased ("Mots Croisés"→"Mots croisés")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'fr', titleConfig: FR_CFG,
    exerciseTypeName: 'Mots Croisés', exerciseTypeSlug: 'crossword', themeName: 'Fruits',
    educationalLevelLocalized: 'CP',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Mots croisés — Fruits — CP');
});

test('fr differentiator: "et" connector + sentence-case', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'fr', vocabulary: ['serpent', 'lézard'], images_used: ['/images/animals/snake.png', '/images/animals/lizard.png'] },
    'fr', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Serpent et lézard', 'expected "Serpent et lézard", got: ' + r.phrase);
});

console.log('');
console.log('Title overhaul: Dutch config (of-type "after" + sentence-case):');

var NL_CFG = require('./seo-title-config.json').nl;

test('nl of-type "after" + sentence: "Optellen werkblad" (werkblad lowercased mid-head)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'nl', titleConfig: NL_CFG,
    exerciseTypeName: 'Optellen', exerciseTypeSlug: 'addition', themeName: 'Dieren',
    educationalLevelLocalized: 'Kleuters',
    differentiator: { kind: 'vocab', phrase: 'Vleermuis', phraseShort: 'Vleermuis', raw: 'bat' }
  }));
  assert.strictEqual(titleText(out), 'Optellen werkblad — Dieren — Vleermuis — Kleuters');
});

test('nl of-type "after": subtraction -> "Aftrekken werkblad"', function () {
  var out = buildSeoHead(optsFixture({
    language: 'nl', titleConfig: NL_CFG,
    exerciseTypeName: 'Aftrekken', exerciseTypeSlug: 'subtraction', themeName: 'Dieren',
    educationalLevelLocalized: 'Groep 4',
    differentiator: { kind: 'vocab', phrase: 'Vos', phraseShort: 'Vos', raw: 'fox' }
  }));
  assert.strictEqual(titleText(out), 'Aftrekken werkblad — Dieren — Vos — Groep 4');
});

test('nl non-of-type: activity type stands alone, no werkblad ("Kruiswoordraadsel")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'nl', titleConfig: NL_CFG,
    exerciseTypeName: 'Kruiswoordraadsel', exerciseTypeSlug: 'crossword', themeName: 'Fruit',
    educationalLevelLocalized: 'Groep 3',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Kruiswoordraadsel — Fruit — Groep 3');
});

test('nl math-worksheet: "Rekenwerkblad" already has werkblad, no double', function () {
  var out = buildSeoHead(optsFixture({
    language: 'nl', titleConfig: NL_CFG,
    exerciseTypeName: 'Rekenwerkblad', exerciseTypeSlug: 'math-worksheet', themeName: 'Dieren',
    educationalLevelLocalized: 'Groep 3',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual((titleText(out).match(/werkblad/gi) || []).length, 1, 'no werkblad double');
  assert.strictEqual(titleText(out), 'Rekenwerkblad — Dieren — Groep 3');
});

test('nl non-of-type: Title-Case type sentence-cased ("Meer Of Minder"->"Meer of minder")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'nl', titleConfig: NL_CFG,
    exerciseTypeName: 'Meer Of Minder', exerciseTypeSlug: 'more-less', themeName: 'Voertuigen',
    educationalLevelLocalized: 'Peuters',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Meer of minder — Voertuigen — Peuters');
});

test('nl differentiator: "en" connector + sentence-case + ALL-CAPS normalized', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'nl', vocabulary: ['SLANG', 'HAGEDIS'], images_used: ['/images/animals/snake.png', '/images/animals/lizard.png'] },
    'nl', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Slang en hagedis', 'expected "Slang en hagedis", got: ' + r.phrase);
});

console.log('');
console.log('Title overhaul: Swedish config (of-type "compound" + Fugen-s + sentence-case):');

var SV_CFG = require('./seo-title-config.json').sv;

test('sv of-type "compound": addition -> "Additionsarbetsblad" (Fugen-s, leading cap kept)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'sv', titleConfig: SV_CFG,
    exerciseTypeName: 'Addition', exerciseTypeSlug: 'addition', themeName: 'Djur',
    educationalLevelLocalized: 'Förskoleklass',
    differentiator: { kind: 'vocab', phrase: 'Katt och hund', phraseShort: 'Katt', raw: 'cat|dog' }
  }));
  assert.strictEqual(titleText(out), 'Additionsarbetsblad — Djur — Katt och hund — Förskoleklass');
});

test('sv of-type "compound": subtraction -> "Subtraktionsarbetsblad"', function () {
  var out = buildSeoHead(optsFixture({
    language: 'sv', titleConfig: SV_CFG,
    exerciseTypeName: 'Subtraktion', exerciseTypeSlug: 'subtraction', themeName: 'Djur',
    educationalLevelLocalized: 'Årskurs 1',
    differentiator: { kind: 'vocab', phrase: 'Räv', phraseShort: 'Räv', raw: 'fox' }
  }));
  assert.strictEqual(titleText(out), 'Subtraktionsarbetsblad — Djur — Räv — Årskurs 1');
});

test('sv non-of-type: activity type stands alone, no arbetsblad ("Korsord")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'sv', titleConfig: SV_CFG,
    exerciseTypeName: 'Korsord', exerciseTypeSlug: 'crossword', themeName: 'Frukt',
    educationalLevelLocalized: 'Årskurs 1',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Korsord — Frukt — Årskurs 1');
});

test('sv math-worksheet: "Matteblad" not ofType, stands alone (no arbetsblad)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'sv', titleConfig: SV_CFG,
    exerciseTypeName: 'Matteblad', exerciseTypeSlug: 'math-worksheet', themeName: 'Djur',
    educationalLevelLocalized: 'Årskurs 1',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Matteblad — Djur — Årskurs 1');
});

test('sv non-of-type: Title-Case type sentence-cased ("Mer Eller Mindre"->"Mer eller mindre")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'sv', titleConfig: SV_CFG,
    exerciseTypeName: 'Mer Eller Mindre', exerciseTypeSlug: 'more-less', themeName: 'Djur',
    educationalLevelLocalized: 'Förskola',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Mer eller mindre — Djur — Förskola');
});

test('sv differentiator: "och" connector + sentence-case + ALL-CAPS normalized', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'sv', vocabulary: ['KATT', 'HUND'], images_used: ['/images/animals/cat.png', '/images/animals/dog.png'] },
    'sv', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Katt och hund', 'expected "Katt och hund", got: ' + r.phrase);
});

console.log('');
console.log('Title overhaul: Danish config (of-type "compound" + Fugen-s + sentence-case):');

var DA_CFG = require('./seo-title-config.json').da;

test('da of-type "compound": addition -> "Additionsarbejdsark" (Fugen-s)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'da', titleConfig: DA_CFG,
    exerciseTypeName: 'Addition', exerciseTypeSlug: 'addition', themeName: 'Dyr',
    educationalLevelLocalized: 'Børnehaveklasse',
    differentiator: { kind: 'vocab', phrase: 'Kat og hund', phraseShort: 'Kat', raw: 'cat|dog' }
  }));
  assert.strictEqual(titleText(out), 'Additionsarbejdsark — Dyr — Kat og hund — Børnehaveklasse');
});

test('da of-type "compound": subtraction -> "Subtraktionsarbejdsark"', function () {
  var out = buildSeoHead(optsFixture({
    language: 'da', titleConfig: DA_CFG,
    exerciseTypeName: 'Subtraktion', exerciseTypeSlug: 'subtraction', themeName: 'Dyr',
    educationalLevelLocalized: '1. klasse',
    differentiator: { kind: 'vocab', phrase: 'Ræv', phraseShort: 'Ræv', raw: 'fox' }
  }));
  assert.strictEqual(titleText(out), 'Subtraktionsarbejdsark — Dyr — Ræv — 1. klasse');
});

test('da non-of-type: activity type stands alone, no arbejdsark ("Krydsord")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'da', titleConfig: DA_CFG,
    exerciseTypeName: 'Krydsord', exerciseTypeSlug: 'crossword', themeName: 'Frugt',
    educationalLevelLocalized: '1. klasse',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Krydsord — Frugt — 1. klasse');
});

test('da math-worksheet: "Matematikark" not ofType, stands alone (no arbejdsark)', function () {
  var out = buildSeoHead(optsFixture({
    language: 'da', titleConfig: DA_CFG,
    exerciseTypeName: 'Matematikark', exerciseTypeSlug: 'math-worksheet', themeName: 'Dyr',
    educationalLevelLocalized: '1. klasse',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Matematikark — Dyr — 1. klasse');
});

test('da non-of-type: Title-Case type sentence-cased ("Mere Eller Mindre"->"Mere eller mindre")', function () {
  var out = buildSeoHead(optsFixture({
    language: 'da', titleConfig: DA_CFG,
    exerciseTypeName: 'Mere Eller Mindre', exerciseTypeSlug: 'more-less', themeName: 'Dyr',
    educationalLevelLocalized: 'Børnehave',
    differentiator: { kind: 'none', phrase: null }
  }));
  assert.strictEqual(titleText(out), 'Mere eller mindre — Dyr — Børnehave');
});

test('da differentiator: "og" connector + sentence-case + ALL-CAPS normalized', function () {
  var d = require('./seo-differentiator');
  var r = d.deriveDifferentiator(
    { exercise_type: 'addition', theme: 'animals', language: 'da', vocabulary: ['KAT', 'HUND'], images_used: ['/images/animals/cat.png', '/images/animals/dog.png'] },
    'da', { config: { vocab: { maxNouns: 2, joinStyle: 'conjunction', casing: 'sentence' }, diff: { enableVocab: true } } }
  );
  assert.strictEqual(r.phrase, 'Kat og hund', 'expected "Kat og hund", got: ' + r.phrase);
});

console.log('');
console.log('============================================================');
console.log('Tests: ' + passCount + ' passed, ' + failCount + ' failed');
process.exit(failCount > 0 ? 1 : 0);

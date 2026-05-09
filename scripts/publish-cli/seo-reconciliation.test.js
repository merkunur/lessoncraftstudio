/**
 * Unit tests for [ARC][SEO][DECK-PAGE] Phase 3a.1 gate predicates.
 * Mirrors slug.test.js style: simple assertion-based tests; no test framework
 * dependency beyond Node's built-in `assert`. Run with `node seo-reconciliation.test.js`.
 *
 * Phase 3a.1 Checkpoint 1: ~25 tests covering CLEAN + halt-class + warn-class
 * + edge cases per predicate. Comprehensive coverage extension (~70+ tests)
 * in Checkpoint 2 alongside count-inbound-surfaces.ts integration.
 */

'use strict';

var assert = require('assert');
var seoRecon = require('./seo-reconciliation');

var passCount = 0;
var failCount = 0;
var failures = [];

function test(name, fn) {
  try {
    var result = fn();
    if (result && typeof result.then === 'function') {
      // Async test
      return result.then(function () {
        passCount++;
        console.log('  ✓ ' + name);
      }).catch(function (e) {
        failCount++;
        failures.push({ name: name, error: e });
        console.log('  ✗ ' + name + ' — ' + e.message);
      });
    }
    passCount++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failCount++;
    failures.push({ name: name, error: e });
    console.log('  ✗ ' + name + ' — ' + e.message);
  }
}

// =====================================================================
// Test fixtures
// =====================================================================

function manifestFixture(overrides) {
  return Object.assign({
    deck_id: 'test-deck-001',
    language: 'en',
    exercise_type: 'sudoku',
    exercise_mode: null,
    theme: null
  }, overrides || {});
}

function deckHtmlFixture(overrides) {
  var defaults = {
    title: 'Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio',
    description: 'Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.',
    canonical: 'https://www.lessoncraftstudio.com/en/decks/sudoku/',
    h1Count: 1,
    ogTags: true,
    twitterTags: true
  };
  var o = Object.assign({}, defaults, overrides || {});

  var html = '<!DOCTYPE html><html lang="en"><head>';
  html += '<title>' + o.title + '</title>';
  html += '<meta name="description" content="' + o.description + '">';
  html += '<link rel="canonical" href="' + o.canonical + '">';
  if (o.ogTags) {
    html += '<meta property="og:title" content="Picture Sudoku Worksheet — Kindergarten">';
    html += '<meta property="og:description" content="' + o.description + '">';
    html += '<meta property="og:image" content="https://www.lessoncraftstudio.com/en/decks/sudoku-v1/og-image.png">';
    html += '<meta property="og:image:width" content="1200">';
    html += '<meta property="og:image:height" content="630">';
    html += '<meta property="og:image:alt" content="Picture Sudoku Worksheet">';
    html += '<meta property="og:type" content="website">';
    html += '<meta property="og:url" content="' + o.canonical + '">';
    html += '<meta property="og:locale" content="en_US">';
    html += '<meta property="og:site_name" content="LessonCraftStudio">';
  }
  if (o.twitterTags) {
    html += '<meta name="twitter:card" content="summary_large_image">';
    html += '<meta name="twitter:title" content="Picture Sudoku Worksheet — Kindergarten">';
    html += '<meta name="twitter:description" content="' + o.description + '">';
    html += '<meta name="twitter:image" content="https://www.lessoncraftstudio.com/en/decks/sudoku-v1/og-image.png">';
  }
  html += '</head><body>';
  for (var i = 0; i < o.h1Count; i++) {
    html += '<h1 class="lcs-title">Picture Sudoku</h1>';
  }
  html += '</body></html>';
  return html;
}

// =====================================================================
// reconcileTitleUniqueness
// =====================================================================

console.log('\nreconcileTitleUniqueness:');

test('CLEAN when no collision (findExistingByTitleHash returns null)', async function () {
  var result = await seoRecon.reconcileTitleUniqueness(
    manifestFixture(),
    'Unique Title — Kindergarten | LessonCraftStudio',
    {
      thisDeckId: 'test-deck-001',
      findExistingByTitleHash: async function () { return null; }
    }
  );
  assert.strictEqual(result.category, 'CLEAN');
  assert.ok(result.hash, 'hash present');
});

test('TITLE_NON_UNIQUE when findExistingByTitleHash returns a row', async function () {
  var result = await seoRecon.reconcileTitleUniqueness(
    manifestFixture(),
    'Collision Title — Kindergarten | LessonCraftStudio',
    {
      thisDeckId: 'test-deck-001',
      findExistingByTitleHash: async function () {
        return { id: 'other-deck-id', slug: 'other-slug' };
      }
    }
  );
  assert.strictEqual(result.category, 'TITLE_NON_UNIQUE');
  assert.strictEqual(result.existing.id, 'other-deck-id');
});

test('TITLE_MISSING when renderedTitle is empty', async function () {
  var result = await seoRecon.reconcileTitleUniqueness(manifestFixture(), '', {});
  assert.strictEqual(result.category, 'TITLE_MISSING');
});

test('CLEAN with warning when DB query throws (degraded-trust)', async function () {
  var result = await seoRecon.reconcileTitleUniqueness(
    manifestFixture(),
    'Title — Kindergarten | LessonCraftStudio',
    {
      thisDeckId: 'test-deck-001',
      findExistingByTitleHash: async function () { throw new Error('DB unreachable'); }
    }
  );
  assert.strictEqual(result.category, 'CLEAN');
  assert.ok(result.warning && result.warning.includes('DB unreachable'));
});

// =====================================================================
// reconcileCanonicalURLPattern
// =====================================================================

console.log('\nreconcileCanonicalURLPattern:');

test('CLEAN on canonical www-form trailing-slash', function () {
  var html = deckHtmlFixture({ canonical: 'https://www.lessoncraftstudio.com/en/decks/sudoku/' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CLEAN');
});

test('CANONICAL_APEX_FORM on apex form', function () {
  var html = deckHtmlFixture({ canonical: 'https://lessoncraftstudio.com/en/decks/sudoku/' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CANONICAL_APEX_FORM');
});

test('CANONICAL_NO_TRAILING_SLASH on no-trailing-slash', function () {
  var html = deckHtmlFixture({ canonical: 'https://www.lessoncraftstudio.com/en/decks/sudoku' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CANONICAL_NO_TRAILING_SLASH');
});

test('CANONICAL_WRONG_LOCALE when locale segment differs from manifest', function () {
  var html = deckHtmlFixture({ canonical: 'https://www.lessoncraftstudio.com/de/decks/sudoku/' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture({ language: 'en' }),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CANONICAL_WRONG_LOCALE');
});

test('CANONICAL_WRONG_SLUG when slug segment differs', function () {
  var html = deckHtmlFixture({ canonical: 'https://www.lessoncraftstudio.com/en/decks/sudoku/' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'addition' }
  );
  assert.strictEqual(result.category, 'CANONICAL_WRONG_SLUG');
});

test('CANONICAL_WRONG_SCHEME on http://', function () {
  var html = deckHtmlFixture({ canonical: 'http://www.lessoncraftstudio.com/en/decks/sudoku/' });
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CANONICAL_WRONG_SCHEME');
});

test('CANONICAL_MISSING when no <link rel="canonical">', function () {
  var html = '<!DOCTYPE html><html><head><title>Test</title></head></html>';
  var result = seoRecon.reconcileCanonicalURLPattern(
    manifestFixture(),
    html,
    { slug: 'sudoku' }
  );
  assert.strictEqual(result.category, 'CANONICAL_MISSING');
});

// =====================================================================
// reconcileOGTags
// =====================================================================

console.log('\nreconcileOGTags:');

test('CLEAN when all 14 OG + Twitter tags present', function () {
  var html = deckHtmlFixture();
  var result = seoRecon.reconcileOGTags(html, {});
  assert.strictEqual(result.category, 'CLEAN');
});

test('OG_TAG_MISSING when og tags absent', function () {
  var html = deckHtmlFixture({ ogTags: false });
  var result = seoRecon.reconcileOGTags(html, {});
  assert.strictEqual(result.category, 'OG_TAG_MISSING');
  assert.ok(result.missing.length > 0);
});

test('OG_TAG_MISSING when twitter card tags absent', function () {
  var html = deckHtmlFixture({ twitterTags: false });
  var result = seoRecon.reconcileOGTags(html, {});
  assert.strictEqual(result.category, 'OG_TAG_MISSING');
  assert.ok(result.missing.indexOf('twitter:card') !== -1);
});

test('OG_IMAGE_FALLBACK_USED warn-class when og:image differs from expected', function () {
  var html = deckHtmlFixture();
  var result = seoRecon.reconcileOGTags(html, {
    expectedOgImage: 'https://www.lessoncraftstudio.com/en/decks/sudoku-v1/per-deck-og.png'
  });
  assert.strictEqual(result.category, 'OG_IMAGE_FALLBACK_USED');
  assert.strictEqual(result.warnClass, true);
});

// =====================================================================
// reconcileLocaleResidue
// =====================================================================

console.log('\nreconcileLocaleResidue:');

test('CLEAN on en deck (English allowed in en titles)', function () {
  var result = seoRecon.reconcileLocaleResidue(
    manifestFixture({ language: 'en' }),
    'Picture Sudoku Worksheet — Kindergarten',
    'Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.',
    {}
  );
  assert.strictEqual(result.category, 'CLEAN');
});

test('LOCALE_RESIDUE_DETECTED on de deck with English title (F3+H1 root case)', function () {
  // The Phase 0 empirical anchor: de/sudoku title = byte-identical English
  var result = seoRecon.reconcileLocaleResidue(
    manifestFixture({ language: 'de' }),
    'Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio',
    'Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.',
    {}
  );
  assert.strictEqual(result.category, 'LOCALE_RESIDUE_DETECTED');
  assert.ok(result.englishWords.length > 0);
});

test('CLEAN on de deck with proper German content (no English chrome)', function () {
  var result = seoRecon.reconcileLocaleResidue(
    manifestFixture({ language: 'de' }),
    'Bilder-Sudoku Arbeitsblatt — Kindergarten | LessonCraftStudio',
    'Kostenloses interaktives Bilder-Sudoku Arbeitsblatt für Kindergarten. Drucken oder online spielen.',
    {}
  );
  // 'kindergarten' is in de exception list (per seo-reconciliation-exceptions.json)
  assert.strictEqual(result.category, 'CLEAN');
});

test('Brand whitelist preserves "LessonCraftStudio" suffix in non-English titles', function () {
  var result = seoRecon.reconcileLocaleResidue(
    manifestFixture({ language: 'de' }),
    'Bilder-Sudoku Arbeitsblatt | LessonCraftStudio',
    'Kostenloses interaktives Arbeitsblatt für Kindergarten.',
    {}
  );
  assert.strictEqual(result.category, 'CLEAN');
});

// =====================================================================
// reconcileLocaleResidue — Phase 3b Checkpoint 1 path-(b) trace tests
// =====================================================================

console.log('\nreconcileLocaleResidue — path-(b) trace (Phase 3b Checkpoint 1):');

function traceFixture(allLocalized) {
  // Build a synthetic manifest.seo_trace with all-isLocalized:allLocalized
  var fieldOk = function (val, src) { return { value: val, source: src, isLocalized: allLocalized }; };
  return {
    title: {
      typeName: fieldOk('Additionsspaß', 'canvas.lcsLocalizedTitle'),
      worksheetWord: fieldOk('Arbeitsblatt', 'translations.de.worksheet'),
      themeName: fieldOk('Tiere', 'metadata.theme'),
      levelLocalized: { value: '__EDUCATIONAL_LEVEL_LOCALIZED__', source: 'publish-cli.i18n.seo.educational_level', isLocalized: true }
    },
    description: {
      freeInteractive: fieldOk('Kostenlos interaktiv', 'translations.de.seoFreeInteractive'),
      typeName: fieldOk('Additionsspaß', 'canvas.lcsLocalizedTitle'),
      worksheetWord: fieldOk('Arbeitsblatt', 'translations.de.worksheet'),
      themeName: fieldOk('Tiere', 'metadata.theme'),
      forWord: fieldOk('für', 'translations.de.seoFor'),
      levelLocalized: { value: '__EDUCATIONAL_LEVEL_LOCALIZED__', source: 'publish-cli.i18n.seo.educational_level', isLocalized: true },
      instruction: fieldOk('Addiere die Zahlen', 'canvas.lcsLocalizedInstruction'),
      printOrPlay: fieldOk('Drucken oder online spielen', 'translations.de.seoPrintOrPlayOnline')
    }
  };
}

test('path-(b) trace: CLEAN when all isLocalized=true (de deck fully translated)', function () {
  var manifest = manifestFixture({ language: 'de' });
  manifest.seo_trace = traceFixture(true);
  var result = seoRecon.reconcileLocaleResidue(manifest, '', '', {});
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.path, 'trace');
});

test('path-(b) trace: LOCALE_RESIDUE_DETECTED when title.worksheetWord isLocalized=false', function () {
  var manifest = manifestFixture({ language: 'de' });
  manifest.seo_trace = traceFixture(true);
  manifest.seo_trace.title.worksheetWord.isLocalized = false;
  manifest.seo_trace.title.worksheetWord.source = 'fallback.en.worksheet';
  manifest.seo_trace.title.worksheetWord.value = 'Worksheet';
  var result = seoRecon.reconcileLocaleResidue(manifest, '', '', {});
  assert.strictEqual(result.category, 'LOCALE_RESIDUE_DETECTED');
  assert.strictEqual(result.path, 'trace');
  assert.strictEqual(result.issues.length, 1);
  assert.strictEqual(result.issues[0].field, 'worksheetWord');
  assert.strictEqual(result.issues[0].section, 'title');
});

test('path-(b) trace: aggregates multiple isLocalized=false issues', function () {
  var manifest = manifestFixture({ language: 'de' });
  manifest.seo_trace = traceFixture(false); // ALL fields fail
  var result = seoRecon.reconcileLocaleResidue(manifest, '', '', {});
  assert.strictEqual(result.category, 'LOCALE_RESIDUE_DETECTED');
  assert.ok(result.issues.length >= 2, 'should aggregate multiple residue findings; got ' + result.issues.length);
});

test('path-(b) trace: handles null themeName gracefully', function () {
  var manifest = manifestFixture({ language: 'de' });
  manifest.seo_trace = traceFixture(true);
  manifest.seo_trace.title.themeName = null;
  manifest.seo_trace.description.themeName = null;
  var result = seoRecon.reconcileLocaleResidue(manifest, '', '', {});
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.path, 'trace');
});

test('path-(a) lexicon fallback: backwards-compat when manifest.seo_trace absent (Phase 3a-era)', function () {
  // No seo_trace on manifest → should fall back to lexicon
  var manifest = manifestFixture({ language: 'de' });
  // Don't set manifest.seo_trace at all — simulates Phase 3a-era ZIP
  var result = seoRecon.reconcileLocaleResidue(
    manifest,
    'Bilder-Sudoku Arbeitsblatt — Kindergarten | LessonCraftStudio', // German content; no English chrome
    'Kostenloses interaktives Bilder-Sudoku Arbeitsblatt für Kindergarten. Drucken oder online spielen.',
    {}
  );
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.path, 'lexicon');
});

test('path-(a) lexicon fallback: still halts on residue when seo_trace absent', function () {
  var manifest = manifestFixture({ language: 'de' });
  // F3+H1 reproduction: seo_trace absent; English residue in title
  var result = seoRecon.reconcileLocaleResidue(
    manifest,
    'Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio',
    'Free interactive Picture Sudoku Worksheet for Kindergarten. Print or play online.',
    {}
  );
  assert.strictEqual(result.category, 'LOCALE_RESIDUE_DETECTED');
  assert.strictEqual(result.path, 'lexicon');
});

test('en deck: CLEAN regardless of seo_trace presence (skip-en path)', function () {
  var manifest = manifestFixture({ language: 'en' });
  manifest.seo_trace = traceFixture(false); // even isLocalized=false should pass for en
  var result = seoRecon.reconcileLocaleResidue(manifest, '', '', {});
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.path, 'skip-en');
});

// =====================================================================
// reconcileSingleH1
// =====================================================================

console.log('\nreconcileSingleH1:');

test('CLEAN when exactly 1 <h1>', function () {
  var html = deckHtmlFixture({ h1Count: 1 });
  var result = seoRecon.reconcileSingleH1(html, {});
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.count, 1);
});

test('MULTIPLE_H1_DETECTED when 2 <h1> elements (Phase 0 finding 2 reproduction)', function () {
  var html = deckHtmlFixture({ h1Count: 2 });
  var result = seoRecon.reconcileSingleH1(html, {});
  assert.strictEqual(result.category, 'MULTIPLE_H1_DETECTED');
  assert.strictEqual(result.count, 2);
});

test('MULTIPLE_H1_DETECTED when 0 <h1> elements (count != 1)', function () {
  var html = '<!DOCTYPE html><html><head></head><body>No h1 here</body></html>';
  var result = seoRecon.reconcileSingleH1(html, {});
  assert.strictEqual(result.category, 'MULTIPLE_H1_DETECTED');
  assert.strictEqual(result.count, 0);
});

// =====================================================================
// reconcileInboundLinkSurface (Checkpoint 1 stub)
// =====================================================================

console.log('\nreconcileInboundLinkSurface (Checkpoint 1 stub):');

test('CLEAN with noop:true when countInboundFn not provided (stub mode)', async function () {
  var result = await seoRecon.reconcileInboundLinkSurface({
    deckId: 'test-deck-001',
    language: 'en',
    thisDeckId: 'cml-existing-cuid' // UPDATE path so skip-on-INSERT doesn't fire
  });
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.noop, true);
});

test('§15.18.2 Item 13 resolution: skip-on-INSERT when thisDeckId is null (Phase 6 fold-cycle close)', async function () {
  var result = await seoRecon.reconcileInboundLinkSurface({
    deckId: 'manifest-deck-id-operator-space',
    language: 'en',
    thisDeckId: null,  // INSERT path
    countInboundFn: async function () { return { count: 0, perSurface: {} }; }, // would halt without skip
    target: 3,
    haltClass: true
  });
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.noop, 'insert-path-skip');
});

test('§15.18.2 Item 13 resolution: skip-on-INSERT also applies when thisDeckId undefined', async function () {
  var result = await seoRecon.reconcileInboundLinkSurface({
    deckId: 'manifest-deck-id-operator-space',
    language: 'en',
    // thisDeckId omitted (undefined)
    countInboundFn: async function () { return { count: 0, perSurface: {} }; },
    target: 3,
    haltClass: true
  });
  assert.strictEqual(result.category, 'CLEAN');
  assert.strictEqual(result.noop, 'insert-path-skip');
});

test('INBOUND_LINK_COUNT_BELOW_TARGET when count < 3 (with helper, UPDATE path)', async function () {
  var result = await seoRecon.reconcileInboundLinkSurface({
    deckId: 'test-deck-001',
    language: 'en',
    thisDeckId: 'cml-existing-cuid',  // UPDATE path triggers real predicate
    countInboundFn: async function () { return { count: 1, perSurface: { topic: true } }; },
    target: 3
  });
  assert.strictEqual(result.category, 'INBOUND_LINK_COUNT_BELOW_TARGET');
  assert.strictEqual(result.count, 1);
  assert.strictEqual(result.warnClass, true); // pre-Phase-5 default (haltClass=undefined)
});

test('INBOUND_LINK_COUNT_BELOW_TARGET escalates to halt at orchestrator when haltClass=true (Phase 5 post-flip; UPDATE path)', async function () {
  var html = deckHtmlFixture();
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    thisDeckId: 'cml-existing-cuid',  // UPDATE path triggers real predicate (post-Item-13 fix)
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; },
    countInboundFn: async function () { return { count: 1, perSurface: { topic: true } }; },
    target: 3,
    haltClass: true  // Phase 5 close: WARN→HALT predicate flip
  });
  assert.strictEqual(result.overall, 'HALT');
  assert.ok(result.haltCategories.indexOf('INBOUND_LINK_COUNT_BELOW_TARGET') !== -1, 'INBOUND should be in halt categories when haltClass=true on UPDATE path');
});

test('INBOUND_LINK_COUNT_BELOW_TARGET stays warn when haltClass=false (pre-Phase-5; UPDATE path)', async function () {
  var html = deckHtmlFixture();
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    thisDeckId: 'cml-existing-cuid',
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; },
    countInboundFn: async function () { return { count: 1, perSurface: { topic: true } }; },
    target: 3,
    haltClass: false
  });
  assert.strictEqual(result.overall, 'WARN');
  assert.ok(result.warnCategories.indexOf('INBOUND_LINK_COUNT_BELOW_TARGET') !== -1);
  assert.strictEqual(result.haltCategories.indexOf('INBOUND_LINK_COUNT_BELOW_TARGET'), -1);
});

test('§15.18.2 Item 13 close: orchestrator skips INBOUND on INSERT path (this is the publish-bulk path for new decks)', async function () {
  var html = deckHtmlFixture();
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    // thisDeckId NOT provided (INSERT path)
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; },
    countInboundFn: async function () { return { count: 0, perSurface: {} }; }, // would halt without skip
    target: 3,
    haltClass: true
  });
  assert.strictEqual(result.overall, 'CLEAN');
  assert.strictEqual(result.haltCategories.indexOf('INBOUND_LINK_COUNT_BELOW_TARGET'), -1);
  assert.strictEqual(result.warnCategories.indexOf('INBOUND_LINK_COUNT_BELOW_TARGET'), -1);
  // INBOUND is skipped, not present in halt or warn arrays
});

// =====================================================================
// reconcileDeckPageSEO orchestrator
// =====================================================================

console.log('\nreconcileDeckPageSEO orchestrator:');

test('CLEAN overall when all predicates pass', async function () {
  var html = deckHtmlFixture();
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; }
  });
  assert.strictEqual(result.overall, 'CLEAN');
  assert.strictEqual(result.haltCategories.length, 0);
});

test('HALT overall when canonical-pattern fails', async function () {
  var html = deckHtmlFixture({ canonical: 'https://lessoncraftstudio.com/en/decks/sudoku/' });
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; }
  });
  assert.strictEqual(result.overall, 'HALT');
  assert.ok(result.haltCategories.indexOf('CANONICAL_APEX_FORM') !== -1);
});

test('HALT overall when multi-h1 detected (Phase 0 finding 2)', async function () {
  var html = deckHtmlFixture({ h1Count: 2 });
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture(),
    substitutedHtml: html,
    slug: 'sudoku',
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; }
  });
  assert.strictEqual(result.overall, 'HALT');
  assert.ok(result.haltCategories.indexOf('MULTIPLE_H1_DETECTED') !== -1);
});

test('HALT overall when de deck has English title residue (F3+H1 reproduction)', async function () {
  // Reproduces Phase 0 empirical: de/sudoku byte-identical English title
  var html = deckHtmlFixture({
    title: 'Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio',
    canonical: 'https://www.lessoncraftstudio.com/de/decks/sudoku/'
  });
  var result = await seoRecon.reconcileDeckPageSEO({
    manifest: manifestFixture({ language: 'de' }),
    substitutedHtml: html,
    slug: 'sudoku',
    findExistingByTitleHash: async function () { return null; },
    findExistingByDescriptionHash: async function () { return null; }
  });
  assert.strictEqual(result.overall, 'HALT');
  assert.ok(result.haltCategories.indexOf('LOCALE_RESIDUE_DETECTED') !== -1);
});

// =====================================================================
// Helpers
// =====================================================================

console.log('\nhelpers:');

test('sha256 produces stable hex digest', function () {
  var h1 = seoRecon.sha256('test');
  var h2 = seoRecon.sha256('test');
  var h3 = seoRecon.sha256('different');
  assert.strictEqual(h1, h2);
  assert.notStrictEqual(h1, h3);
  assert.strictEqual(h1.length, 64); // sha256 hex = 64 chars
});

test('tokenizeForLexicon splits on whitespace + punctuation; lowercases', function () {
  var toks = seoRecon.tokenizeForLexicon('Picture Sudoku Worksheet — Kindergarten | LessonCraftStudio');
  assert.ok(toks.indexOf('picture') !== -1);
  assert.ok(toks.indexOf('sudoku') !== -1);
  assert.ok(toks.indexOf('worksheet') !== -1);
  assert.ok(toks.indexOf('kindergarten') !== -1);
  assert.ok(toks.indexOf('lessoncraftstudio') !== -1);
});

test('OG_LOCALE_MAP es: es_MX (revised per Phase 0 D7 register evidence)', function () {
  assert.strictEqual(seoRecon.OG_LOCALE_MAP.es, 'es_MX');
  assert.strictEqual(seoRecon.OG_LOCALE_MAP.pt, 'pt_BR');
  assert.strictEqual(seoRecon.OG_LOCALE_MAP.no, 'nb_NO');
});

// =====================================================================
// Summary
// =====================================================================

setTimeout(function () {
  console.log('\n' + '='.repeat(60));
  console.log('Tests: ' + passCount + ' passed, ' + failCount + ' failed');
  if (failCount > 0) {
    console.log('\nFailures:');
    failures.forEach(function (f) {
      console.log('  - ' + f.name);
      console.log('    ' + f.error.message);
    });
    process.exit(1);
  } else {
    console.log('All tests passed.');
    process.exit(0);
  }
}, 100);

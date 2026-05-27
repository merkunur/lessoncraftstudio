#!/usr/bin/env node
/**
 * Unit tests for deck-rich-alt.js (alt-text SEO commission 2026-05-27).
 *
 * Node native `assert` (no test-framework dep; follows slug.test.js +
 * deck-end-suggestions.test.js precedent).
 *
 * Run: node scripts/publish-cli/deck-rich-alt.test.js
 * Exit code: 0 = all pass; 1 = at least one fail.
 */

'use strict';

var assert = require('assert');
var path = require('path');

var deckRichAlt = require('./deck-rich-alt');

var tests = [];
function test(name, fn) { tests.push({ name: name, fn: fn }); }

// =====================================================================
// imagePathToVocabKey
// =====================================================================

test('imagePathToVocabKey: bare key returns unchanged', function () {
  assert.strictEqual(deckRichAlt.imagePathToVocabKey('cat'), 'cat');
});

test('imagePathToVocabKey: theme path strips directory + extension', function () {
  assert.strictEqual(deckRichAlt.imagePathToVocabKey('/images/animals/cat.png'), 'cat');
});

test('imagePathToVocabKey: server-upload suffix stripped', function () {
  assert.strictEqual(
    deckRichAlt.imagePathToVocabKey('/images/animals/camel-1769386104282-2351c8c4.png'),
    'camel'
  );
});

test('imagePathToVocabKey: webp extension stripped', function () {
  assert.strictEqual(deckRichAlt.imagePathToVocabKey('cat.webp'), 'cat');
});

test('imagePathToVocabKey: trailing numeric suffix stripped', function () {
  assert.strictEqual(deckRichAlt.imagePathToVocabKey('cat 2.webp'), 'cat');
});

test('imagePathToVocabKey: empty/null returns null', function () {
  assert.strictEqual(deckRichAlt.imagePathToVocabKey(''), null);
  assert.strictEqual(deckRichAlt.imagePathToVocabKey(null), null);
  assert.strictEqual(deckRichAlt.imagePathToVocabKey(undefined), null);
});

// =====================================================================
// resolveVocabNames + resolveVocabNamesFromPaths
// =====================================================================

test('resolveVocabNames: returns localized singular nouns', function () {
  var r = deckRichAlt.resolveVocabNames(['cat', 'dog', 'rabbit'], 'de', 3);
  assert.deepStrictEqual(r, ['Katze', 'Hund', 'Kaninchen']);
});

test('resolveVocabNames: caps at maxN', function () {
  var r = deckRichAlt.resolveVocabNames(['cat', 'dog', 'rabbit', 'bird'], 'en', 2);
  assert.strictEqual(r.length, 2);
  assert.deepStrictEqual(r, ['Cat', 'Dog']);
});

test('resolveVocabNames: deduplicates', function () {
  var r = deckRichAlt.resolveVocabNames(['cat', 'cat', 'dog'], 'en', 3);
  assert.deepStrictEqual(r, ['Cat', 'Dog']);
});

test('resolveVocabNames: skips unknown keys', function () {
  var r = deckRichAlt.resolveVocabNames(['cat', 'unknown-xyz', 'dog'], 'en', 3);
  assert.deepStrictEqual(r, ['Cat', 'Dog']);
});

test('resolveVocabNamesFromPaths: normalizes paths to keys then resolves', function () {
  var r = deckRichAlt.resolveVocabNamesFromPaths(
    ['/images/animals/cat.png', '/images/animals/dog.webp'],
    'fr',
    3
  );
  assert.deepStrictEqual(r, ['Chat', 'Chien']);
});

// =====================================================================
// formatVocabPhrase
// =====================================================================

test('formatVocabPhrase: en Oxford comma', function () {
  var p = deckRichAlt.formatVocabPhrase(['Cat', 'Dog', 'Rabbit'], 'en');
  assert.ok(p.indexOf('Cat') >= 0);
  assert.ok(p.indexOf('Dog') >= 0);
  assert.ok(p.indexOf('Rabbit') >= 0);
});

test('formatVocabPhrase: empty returns null', function () {
  assert.strictEqual(deckRichAlt.formatVocabPhrase([], 'en'), null);
  assert.strictEqual(deckRichAlt.formatVocabPhrase(null, 'en'), null);
});

// =====================================================================
// findThemeKey
// =====================================================================

test('findThemeKey: finds registered theme axis-key in subjectTags', function () {
  // 'animals' is registered in topics-taxonomy.json axes.theme
  assert.strictEqual(
    deckRichAlt.findThemeKey(['kindergarten', 'animals', 'addition']),
    'animals'
  );
});

test('findThemeKey: returns null when no registered theme', function () {
  assert.strictEqual(
    deckRichAlt.findThemeKey(['kindergarten', 'foo-not-a-theme']),
    null
  );
});

test('findThemeKey: empty/null returns null', function () {
  assert.strictEqual(deckRichAlt.findThemeKey([]), null);
  assert.strictEqual(deckRichAlt.findThemeKey(null), null);
});

// =====================================================================
// composeOgImageAlt — happy-path per-locale
// =====================================================================

function metaWithTheme(locale) {
  return {
    exerciseType: 'addition',
    subjectTags: ['animals'],
    ageRange: '5-7',
    language: locale,
    title: 'Fallback Title',
  };
}

test('composeOgImageAlt: en with theme + vocab', function () {
  var r = deckRichAlt.composeOgImageAlt(metaWithTheme('en'), ['cat', 'dog', 'rabbit']);
  assert.ok(r.indexOf('Addition') >= 0, 'has exercise-type name');
  assert.ok(r.indexOf('Animals') >= 0, 'has theme name');
  assert.ok(r.indexOf('kindergarten') >= 0, 'has level');
  assert.ok(r.indexOf('Cat') >= 0, 'has first vocab');
  assert.ok(r.indexOf('Rabbit') >= 0, 'has third vocab');
});

test('composeOgImageAlt: de with theme + vocab', function () {
  var r = deckRichAlt.composeOgImageAlt(metaWithTheme('de'), ['cat', 'dog', 'rabbit']);
  assert.ok(r.indexOf('Kostenloses') >= 0, 'has German "free"');
  assert.ok(r.indexOf('Addition') >= 0);
  assert.ok(r.indexOf('Tiere') >= 0, 'has German "animals"');
  assert.ok(r.indexOf('Kindergarten') >= 0);
  assert.ok(r.indexOf('Katze') >= 0);
});

test('composeOgImageAlt: themeless deck (no theme tag)', function () {
  var meta = metaWithTheme('en');
  meta.subjectTags = [];
  var r = deckRichAlt.composeOgImageAlt(meta, ['cat', 'dog']);
  assert.ok(r.indexOf('Animals') < 0, 'no theme word');
  assert.ok(r.indexOf('Cat') >= 0, 'still has vocab');
});

test('composeOgImageAlt: no vocab + with theme', function () {
  var r = deckRichAlt.composeOgImageAlt(metaWithTheme('en'), []);
  assert.ok(r.indexOf('Animals') >= 0);
  assert.ok(r.indexOf('Cat') < 0, 'no vocab');
});

test('composeOgImageAlt: no vocab + no theme', function () {
  var meta = metaWithTheme('en');
  meta.subjectTags = [];
  var r = deckRichAlt.composeOgImageAlt(meta, []);
  assert.ok(r.length > 0, 'still produces some output');
  assert.ok(r.indexOf('Addition') >= 0);
  assert.ok(r.indexOf('kindergarten') >= 0);
});

test('composeOgImageAlt: unparseable manifest falls back to title', function () {
  var meta = {
    exerciseType: 'unknown-app-xyz',
    subjectTags: [],
    ageRange: '5-7',
    language: 'en',
    title: 'My Fallback Title',
  };
  var r = deckRichAlt.composeOgImageAlt(meta, []);
  assert.strictEqual(r, 'My Fallback Title');
});

// =====================================================================
// composeWorksheetMainAlt
// =====================================================================

test('composeWorksheetMainAlt: en with vocab', function () {
  var r = deckRichAlt.composeWorksheetMainAlt(metaWithTheme('en'), ['cat']);
  assert.ok(r.indexOf('Printable') >= 0);
  assert.ok(r.indexOf('Addition') >= 0);
  assert.ok(r.indexOf('Cat') >= 0);
});

test('composeWorksheetMainAlt: de with vocab', function () {
  var r = deckRichAlt.composeWorksheetMainAlt(metaWithTheme('de'), ['cat']);
  assert.ok(r.indexOf('Druckbares') >= 0);
  assert.ok(r.indexOf('Katze') >= 0);
});

// =====================================================================
// composeDeckCardAlt
// =====================================================================

test('composeDeckCardAlt: en with theme', function () {
  var r = deckRichAlt.composeDeckCardAlt(metaWithTheme('en'));
  assert.ok(r.indexOf('Preview of') >= 0);
  assert.ok(r.indexOf('Addition') >= 0);
  assert.ok(r.indexOf('Animals') >= 0);
});

test('composeDeckCardAlt: themeless', function () {
  var meta = metaWithTheme('en');
  meta.subjectTags = [];
  var r = deckRichAlt.composeDeckCardAlt(meta);
  assert.ok(r.indexOf('Preview of') >= 0);
  assert.ok(r.indexOf('Animals') < 0);
});

// =====================================================================
// composeDeckContainerAriaLabel
// =====================================================================

test('composeDeckContainerAriaLabel: en with instruction', function () {
  var r = deckRichAlt.composeDeckContainerAriaLabel(metaWithTheme('en'), 'Solve the problems.');
  assert.ok(r.indexOf('Interactive') >= 0);
  assert.ok(r.indexOf('Addition') >= 0);
  assert.ok(r.indexOf('Solve the problems') >= 0);
});

test('composeDeckContainerAriaLabel: themeless no instruction', function () {
  var meta = metaWithTheme('en');
  meta.subjectTags = [];
  var r = deckRichAlt.composeDeckContainerAriaLabel(meta, '');
  assert.ok(r.indexOf('Interactive') >= 0);
  // Empty instruction should not leave dangling whitespace/period
  assert.ok(!/ \. *$/.test(r) && !/  /.test(r), 'no dangling period or double-space; got: ' + r);
});

// =====================================================================
// composeCelebrationMiniAlt
// =====================================================================

test('composeCelebrationMiniAlt: en', function () {
  var r = deckRichAlt.composeCelebrationMiniAlt(metaWithTheme('en'));
  assert.ok(r.indexOf('completed') >= 0);
  assert.ok(r.indexOf('Addition') >= 0);
});

test('composeCelebrationMiniAlt: de', function () {
  var r = deckRichAlt.composeCelebrationMiniAlt(metaWithTheme('de'));
  assert.ok(r.indexOf('ausgefülltes') >= 0);
  assert.ok(r.indexOf('Addition') >= 0);
});

// =====================================================================
// composeIframeEmbedTitle
// =====================================================================

test('composeIframeEmbedTitle: en', function () {
  var r = deckRichAlt.composeIframeEmbedTitle('Cat and Dog Counting', 'en');
  assert.ok(r.indexOf('Cat and Dog Counting') >= 0);
  assert.ok(r.indexOf('LessonCraftStudio') >= 0);
});

test('composeIframeEmbedTitle: missing locale falls back to en', function () {
  var r = deckRichAlt.composeIframeEmbedTitle('My Title', 'xyz-fake-locale');
  assert.ok(r.indexOf('My Title') >= 0);
});

// =====================================================================
// 11-locale smoke
// =====================================================================

test('11-locale smoke: every locale produces non-empty alt without throwing', function () {
  var locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  locales.forEach(function (L) {
    var r = deckRichAlt.composeOgImageAlt(metaWithTheme(L), ['cat', 'dog']);
    assert.ok(r && r.length > 0, '['+L+'] produced empty alt');
    assert.ok(r.indexOf('{') < 0, '['+L+'] unresolved {placeholder} in: '+r);
    assert.ok(r.indexOf('}') < 0, '['+L+'] unresolved }placeholder in: '+r);
  });
});

// =====================================================================
// Runner
// =====================================================================

(function runAll() {
  console.log('=== deck-rich-alt tests ===');
  var passed = 0;
  var failed = 0;
  var failures = [];
  tests.forEach(function (t) {
    try {
      t.fn();
      passed++;
      console.log('  ✓ ' + t.name);
    } catch (e) {
      failed++;
      failures.push({ name: t.name, err: e });
      console.log('  ✗ ' + t.name);
      console.log('    ' + (e.message || String(e)));
    }
  });
  console.log('');
  console.log('============================================================');
  console.log('Tests: ' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) {
    console.log('Failures:');
    failures.forEach(function (f) {
      console.log('  - ' + f.name + ': ' + (f.err.message || f.err));
    });
  }
  process.exit(failed === 0 ? 0 : 1);
})();

#!/usr/bin/env node
/**
 * Unit tests for deck-end-suggestions.js per Commission B Phase 2.
 * Node native `assert` — no test-framework dep (per slug.test.js precedent).
 *
 * Coverage:
 *   1. Deduplication — same deck never appears twice across slots
 *   2. Locale-match — never surfaces cross-locale decks (hard contract)
 *   3. Completed deck excluded
 *   4. Strategy 1 — same-app, theme-variety
 *   5. Strategy 2 — same-theme, app-variety
 *   6. Empty result — completed deck not in indices
 *   7. Thin substrate — single-deck locale
 *   8. Count parameter respected
 *   9. Input validation — empty locale
 *   10. Input validation — empty slug
 *   11. Input validation — uninitialized indices
 *   12. Canonical URL form
 *   13. Themeless deck handled gracefully
 *   14. Rotating cursor advances across calls
 *
 * Run: node scripts/publish-cli/deck-end-suggestions.test.js
 * Exit code: 0 = all pass; 1 = at least one fail.
 */

'use strict';

var assert = require('assert');
var mod = require('./deck-end-suggestions');

var tests = [];
function test(name, fn) {
  tests.push({ name: name, fn: fn });
}

function makeDeck(opts) {
  return {
    id: opts.id,
    slug: opts.slug,
    language: opts.language || 'en',
    title: opts.title || { en: opts.slug, es: opts.slug, pt: opts.slug },
    exerciseType: opts.exerciseType || 'addition',
    exerciseMode: opts.exerciseMode || null,
    subjectTags: opts.subjectTags || [],
    ageRange: opts.ageRange || '5-7',
    thumbnailUrl: opts.thumbnailUrl || ('/thumbs/' + opts.slug + '.png'),
    canonicalURL: 'https://www.lessoncraftstudio.com/' + (opts.language || 'en') + '/decks/' + opts.slug + '/',
  };
}

function buildIndices(decks) {
  var bySlug = new Map();
  var byLocaleApp = new Map();
  var byLocaleTheme = new Map();
  var byLocaleLevel = new Map();
  var byLocaleAll = new Map();
  var randomSeq = new Map();
  var randomCursor = new Map();

  for (var i = 0; i < decks.length; i++) {
    var d = decks[i];
    bySlug.set(d.language + '/' + d.slug, d);

    var appKey = d.language + '/' + d.exerciseType;
    if (!byLocaleApp.has(appKey)) byLocaleApp.set(appKey, []);
    byLocaleApp.get(appKey).push(d);

    for (var t = 0; t < d.subjectTags.length; t++) {
      var themeKey = d.language + '/' + d.subjectTags[t];
      if (!byLocaleTheme.has(themeKey)) byLocaleTheme.set(themeKey, []);
      byLocaleTheme.get(themeKey).push(d);
    }

    var levelKey = d.language + '/' + d.ageRange;
    if (!byLocaleLevel.has(levelKey)) byLocaleLevel.set(levelKey, []);
    byLocaleLevel.get(levelKey).push(d);

    if (!byLocaleAll.has(d.language)) byLocaleAll.set(d.language, []);
    byLocaleAll.get(d.language).push(d);
  }

  byLocaleAll.forEach(function (list, lang) {
    randomSeq.set(lang, list.slice());
    randomCursor.set(lang, 0);
  });

  return {
    bySlug: bySlug,
    byLocaleApp: byLocaleApp,
    byLocaleTheme: byLocaleTheme,
    byLocaleLevel: byLocaleLevel,
    byLocaleAll: byLocaleAll,
    randomSeq: randomSeq,
    randomCursor: randomCursor,
    deckCount: decks.length,
  };
}

// =============================================================
// Fixture: 20 en decks across 4 apps × 5 themes + 3 es decks
// =============================================================

var fixture = [];
var apps = ['addition', 'subtraction', 'matching', 'sudoku'];
var themes = ['animals', 'fruits', 'vehicles', 'shapes', 'colors'];
var ageRanges = ['3-5', '5-7', '6-8'];
for (var a = 0; a < apps.length; a++) {
  for (var t = 0; t < themes.length; t++) {
    fixture.push(makeDeck({
      id: 'en-' + apps[a] + '-' + themes[t],
      slug: apps[a] + '-' + themes[t],
      language: 'en',
      exerciseType: apps[a],
      subjectTags: [themes[t]],
      ageRange: ageRanges[(a + t) % 3],
    }));
  }
}
for (var ti = 0; ti < 3; ti++) {
  fixture.push(makeDeck({
    id: 'es-addition-' + themes[ti],
    slug: 'addition-' + themes[ti],
    language: 'es',
    exerciseType: 'addition',
    subjectTags: [themes[ti]],
    ageRange: '5-7',
  }));
}

assert.strictEqual(fixture.length, 23, 'fixture sanity: 20 en + 3 es');

// =============================================================
// Test definitions
// =============================================================

test('deduplication — same deck never appears twice', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  assert.strictEqual(results.length, 6, 'expected 6 suggestions');
  var ids = results.map(function (r) { return r.id; });
  var uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, ids.length, 'all suggestion IDs must be unique');
});

test('locale-match — never surfaces cross-locale decks', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  for (var i = 0; i < results.length; i++) {
    assert.strictEqual(results[i].language, 'en', 'all suggestions must be en');
  }
});

test('completed deck never appears in suggestions', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  var hasCompleted = results.some(function (r) { return r.slug === 'addition-animals'; });
  assert.strictEqual(hasCompleted, false, 'completed deck must not appear');
});

test('strategy 1 — same-app theme-variety produces 2 slots', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  assert.strictEqual(results[0].exerciseType, 'addition', 'slot 1 same exerciseType');
  assert.strictEqual(results[1].exerciseType, 'addition', 'slot 2 same exerciseType');
  assert.notStrictEqual(results[0].subjectTags[0], 'animals', 'slot 1 different theme');
  assert.notStrictEqual(results[1].subjectTags[0], 'animals', 'slot 2 different theme');
});

test('strategy 2 — same-theme app-variety produces 2 slots', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  assert.strictEqual(results[2].subjectTags[0], 'animals', 'slot 3 same theme');
  assert.strictEqual(results[3].subjectTags[0], 'animals', 'slot 4 same theme');
  assert.notStrictEqual(results[2].exerciseType, 'addition', 'slot 3 different exerciseType');
  assert.notStrictEqual(results[3].exerciseType, 'addition', 'slot 4 different exerciseType');
});

test('empty result — completed deck not in indices returns []', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'nonexistent-deck-slug', 6);
  assert.strictEqual(results.length, 0, 'expected empty array for missing deck');
});

test('thin substrate — single-deck locale returns empty array (only completed deck)', async function () {
  var soloDeck = [makeDeck({ id: 'fr-only', slug: 'addition-animals', language: 'fr', exerciseType: 'addition', subjectTags: ['animals'] })];
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(soloDeck));
  var results = await mod.selectDeckEndSuggestions('fr', 'addition-animals', 6);
  assert.strictEqual(results.length, 0, 'expected empty array when only completed deck exists');
});

test('count parameter — respects requested count', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results3 = await mod.selectDeckEndSuggestions('en', 'addition-animals', 3);
  assert.strictEqual(results3.length, 3, 'expected 3 suggestions');
  var results10 = await mod.selectDeckEndSuggestions('en', 'addition-animals', 10);
  assert.ok(results10.length <= 10, 'no more than 10 suggestions');
  assert.ok(results10.length >= 6, 'at least 6 suggestions when substrate is rich');
});

test('input validation — throws on missing locale', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var threw = false;
  try {
    await mod.selectDeckEndSuggestions('', 'addition-animals', 6);
  } catch (e) {
    threw = true;
  }
  assert.strictEqual(threw, true, 'expected throw for empty locale');
});

test('input validation — throws on missing slug', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var threw = false;
  try {
    await mod.selectDeckEndSuggestions('en', '', 6);
  } catch (e) {
    threw = true;
  }
  assert.strictEqual(threw, true, 'expected throw for empty slug');
});

test('input validation — throws on uninitialized indices', async function () {
  mod._resetIndices();
  var threw = false;
  try {
    await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  } catch (e) {
    threw = true;
    assert.ok(e.message.indexOf('warmUpIndices') >= 0, 'error message references warmUpIndices');
  }
  assert.strictEqual(threw, true, 'expected throw when indices not warmed');
});

test('canonical URL — uses www-form trailing-slash per §A.10', async function () {
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(fixture));
  var results = await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  for (var i = 0; i < results.length; i++) {
    var url = results[i].canonicalURL;
    assert.ok(url.indexOf('https://www.lessoncraftstudio.com/') === 0, 'must start with www form per §A.10');
    assert.ok(url.endsWith('/'), 'must end with trailing slash');
    assert.ok(url.indexOf('/' + results[i].language + '/decks/') > 0, 'must include /<locale>/decks/ path');
  }
});

test('themeless deck — no subjectTags handled gracefully', async function () {
  var themelessFix = fixture.slice();
  themelessFix.push(makeDeck({
    id: 'en-themeless',
    slug: 'sudoku-plain',
    language: 'en',
    exerciseType: 'sudoku',
    subjectTags: [],
    ageRange: '5-7',
  }));
  mod._resetIndices();
  mod._setIndicesForTest(buildIndices(themelessFix));
  var results = await mod.selectDeckEndSuggestions('en', 'sudoku-plain', 6);
  assert.ok(results.length >= 1, 'themeless deck still produces some suggestions');
  var ids = results.map(function (r) { return r.id; });
  assert.strictEqual(ids.indexOf('en-themeless'), -1, 'completed themeless deck excluded');
});

test('rotating cursor — random-strategy slot rotates across calls', async function () {
  mod._resetIndices();
  var indices = buildIndices(fixture);
  mod._setIndicesForTest(indices);
  var initialCursor = indices.randomCursor.get('en');
  await mod.selectDeckEndSuggestions('en', 'addition-animals', 6);
  var afterFirst = indices.randomCursor.get('en');
  await mod.selectDeckEndSuggestions('en', 'subtraction-fruits', 6);
  var afterSecond = indices.randomCursor.get('en');
  assert.notStrictEqual(afterFirst, initialCursor, 'cursor advanced after first call');
  assert.notStrictEqual(afterSecond, afterFirst, 'cursor advanced after second call');
});

// =============================================================
// Sequential async test runner
// =============================================================

(async function runAll() {
  console.log('=== deck-end-suggestions tests ===');
  var passed = 0;
  var failed = 0;
  for (var i = 0; i < tests.length; i++) {
    var t = tests[i];
    try {
      await t.fn();
      console.log('  PASS  ' + t.name);
      passed++;
    } catch (e) {
      console.log('  FAIL  ' + t.name);
      console.log('        ' + (e.message || e));
      if (e.stack) console.log('        ' + e.stack.split('\n').slice(1, 4).join('\n        '));
      failed++;
    }
  }
  console.log('');
  console.log('=== summary ===');
  console.log('passed: ' + passed);
  console.log('failed: ' + failed);
  process.exit(failed > 0 ? 1 : 0);
})();

/**
 * Unit tests for [ARC][SEO][DECK-PAGE] Phase 4b — count-inbound-surfaces.
 * Mirrors slug.test.js + seo-reconciliation.test.js style: assertion-based;
 * no test framework dependency beyond Node's built-in `assert`. Run with
 * `node count-inbound-surfaces.test.js`.
 *
 * Phase 4b Sub-step 2.2: 5 unit tests covering non-existent / non-published
 * deck + structural surface combinatorics + convenience-wrapper.
 *
 * Mock approach: substitutes `./db` in require.cache BEFORE requiring the
 * helper, so all `db.client()` calls in the helper resolve to a synthetic
 * Prisma-like object. Tests mutate `mockPrisma` per test to set the
 * deck-row + locale-aggregate fixtures.
 */

'use strict';

var assert = require('assert');

// =====================================================================
// Mock setup — substitute ./db in require.cache before helper require
// =====================================================================

var mockPrisma = null;

var dbModulePath = require.resolve('./db');
require.cache[dbModulePath] = {
  id: dbModulePath,
  filename: dbModulePath,
  loaded: true,
  exports: {
    client: function () { return mockPrisma; },
    disconnect: async function () {}
  }
};

var helper = require('./count-inbound-surfaces');

// =====================================================================
// Test runner (mirrors seo-reconciliation.test.js)
// =====================================================================

var passCount = 0;
var failCount = 0;
var failures = [];

function test(name, fn) {
  try {
    var result = fn();
    if (result && typeof result.then === 'function') {
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
// Mock fixtures — synthetic prisma client per test
// =====================================================================

function makeMockPrisma(overrides) {
  var defaults = {
    deckRow: null,                   // deck.findUnique result
    localeExerciseTypeGroups: [],    // deck.groupBy result
    localeDeckCount: 0               // deck.count result
  };
  var fixture = Object.assign({}, defaults, overrides || {});

  return {
    deck: {
      findUnique: async function () { return fixture.deckRow; },
      groupBy: async function () { return fixture.localeExerciseTypeGroups; },
      count: async function () { return fixture.localeDeckCount; }
    }
  };
}

function publishedDeck(overrides) {
  return Object.assign({
    id: 'test-deck-001',
    slug: 'addition-animals',
    language: 'en',
    exerciseType: 'addition',
    ageRange: '5-7',
    subjectTags: [],
    status: 'published'
  }, overrides || {});
}

// =====================================================================
// Tests
// =====================================================================

console.log('\ncount-inbound-surfaces — countInboundSurfacesForDeck:');

(async function runAll() {
  await test('non-existent deck returns {count: 0, perSurface: {}}', async function () {
    mockPrisma = makeMockPrisma({ deckRow: null });
    var result = await helper.countInboundSurfacesForDeck('non-existent-id', 'en');
    assert.strictEqual(result.count, 0);
    assert.deepStrictEqual(result.perSurface, {});
  });

  await test('non-published deck (status=draft) returns {count: 0, perSurface: {}}', async function () {
    mockPrisma = makeMockPrisma({
      deckRow: publishedDeck({ status: 'draft' })
    });
    var result = await helper.countInboundSurfacesForDeck('draft-deck', 'en');
    assert.strictEqual(result.count, 0);
    assert.deepStrictEqual(result.perSurface, {});
  });

  await test('deck with subjectTags + locale catalog ≥7 + ≥2 exercise-types → count=7', async function () {
    mockPrisma = makeMockPrisma({
      deckRow: publishedDeck({ subjectTags: ['animals'] }),
      localeExerciseTypeGroups: [
        { exerciseType: 'addition', _count: { _all: 5 } },
        { exerciseType: 'subtraction', _count: { _all: 4 } },
        { exerciseType: 'matching', _count: { _all: 3 } }
      ],
      localeDeckCount: 12
    });
    var result = await helper.countInboundSurfacesForDeck('test-deck-001', 'en');
    assert.strictEqual(result.count, 7);
    assert.strictEqual(result.perSurface.exerciseTypeTopicPage, true);
    assert.strictEqual(result.perSurface.educationalLevelTopicPage, true);
    assert.strictEqual(result.perSurface.themeTopicPages, true);
    assert.strictEqual(result.perSurface.siblingAxisStrip, true);
    assert.strictEqual(result.perSurface.varietyStripRotation, true);
    assert.strictEqual(result.perSurface.crossAxisPivots, true);
    assert.strictEqual(result.perSurface.deckEndSuggestionStrip, true);
    assert.strictEqual(result.perSurface.breadthGridFeatured, false);
  });

  await test('deck without subjectTags + locale <7 + ≥2 exercise-types → count=5', async function () {
    mockPrisma = makeMockPrisma({
      deckRow: publishedDeck({ subjectTags: [] }),
      localeExerciseTypeGroups: [
        { exerciseType: 'addition', _count: { _all: 2 } },
        { exerciseType: 'subtraction', _count: { _all: 1 } }
      ],
      localeDeckCount: 3
    });
    var result = await helper.countInboundSurfacesForDeck('test-deck-001', 'en');
    assert.strictEqual(result.count, 5);
    assert.strictEqual(result.perSurface.themeTopicPages, false);
    assert.strictEqual(result.perSurface.deckEndSuggestionStrip, false);
    assert.strictEqual(result.perSurface.siblingAxisStrip, true);
  });

  await test('deck without subjectTags + locale <7 + only 1 exercise-type → count=4 (floor)', async function () {
    mockPrisma = makeMockPrisma({
      deckRow: publishedDeck({ subjectTags: [] }),
      localeExerciseTypeGroups: [
        { exerciseType: 'addition', _count: { _all: 1 } }
      ],
      localeDeckCount: 1
    });
    var result = await helper.countInboundSurfacesForDeck('test-deck-001', 'en');
    assert.strictEqual(result.count, 4); // 1 + 2 + 5 + 6 always-true = 4
    assert.strictEqual(result.perSurface.themeTopicPages, false);
    assert.strictEqual(result.perSurface.siblingAxisStrip, false);
    assert.strictEqual(result.perSurface.deckEndSuggestionStrip, false);
  });

  console.log('\ncount-inbound-surfaces — countInboundSurfaces (convenience wrapper):');

  await test('countInboundSurfaces returns just the numeric count', async function () {
    mockPrisma = makeMockPrisma({
      deckRow: publishedDeck({ subjectTags: ['animals'] }),
      localeExerciseTypeGroups: [
        { exerciseType: 'addition', _count: { _all: 5 } },
        { exerciseType: 'subtraction', _count: { _all: 4 } }
      ],
      localeDeckCount: 12
    });
    var count = await helper.countInboundSurfaces('test-deck-001', 'en');
    assert.strictEqual(typeof count, 'number');
    assert.strictEqual(count, 7);
  });

  await test('countInboundSurfaces returns 0 for non-existent deck', async function () {
    mockPrisma = makeMockPrisma({ deckRow: null });
    var count = await helper.countInboundSurfaces('non-existent-id', 'en');
    assert.strictEqual(count, 0);
  });

  // =====================================================================
  // Summary
  // =====================================================================

  console.log('');
  console.log('=== count-inbound-surfaces tests ===');
  console.log('Passed: ' + passCount);
  console.log('Failed: ' + failCount);
  if (failCount > 0) {
    console.log('');
    console.log('Failures:');
    failures.forEach(function (f) {
      console.log('  • ' + f.name);
      console.log('    ' + f.error.message);
      if (f.error.stack) console.log('    ' + f.error.stack.split('\n').slice(1, 3).join('\n    '));
    });
    process.exit(1);
  }
  process.exit(0);
})().catch(function (e) {
  console.error('Test runner crashed: ' + e.message);
  console.error(e.stack);
  process.exit(2);
});

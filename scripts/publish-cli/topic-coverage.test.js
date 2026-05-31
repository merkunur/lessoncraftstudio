/**
 * R17c (SEO Part 6): topicMeta 100%-coverage assert.
 *
 * Every axis-key in topics-taxonomy.json's three topic-page-bearing axes
 * (exercise-type, theme, educational-level) MUST have a non-empty
 * `topicMeta.<key>` entry in every FULL-MARKET locale (en/de/es/it/pt). A gap
 * silently English-falls-back (residue) on the topic page's meta description.
 *
 * Scope notes:
 *   - The `exercise-mode` axis is EXCLUDED — it is slug-component-only (§16.5),
 *     not a topic-page axis, and is intentionally ~2/49 covered.
 *   - `$`-prefixed taxonomy keys ($schema_version, $comment) are skipped.
 *   - The 6 small/partial-market locales (fr/nl/sv/da/no/fi) are EXCLUDED — their
 *     topicProse/topicMeta coverage is intentionally partial (Path B, §16.7.3).
 *   - An axis-key is only REQUIRED in a locale when it has a `slug.<locale>` in
 *     the taxonomy (i.e. it is actually emitted there). This skips en-only
 *     aliases like `picture-trail` (§15.10: en emits picture-trail, others
 *     emit picture-path) without a hardcoded exception.
 *
 * STRICT: any missing/empty entry fails the run (exit 1). Mirrors the
 * assertion-based, framework-free style of the sibling *.test.js files.
 * Run: `node scripts/publish-cli/topic-coverage.test.js`.
 */

'use strict';

var assert = require('assert');
var path = require('path');

var taxonomy = require(path.join(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));

var COVERED_AXES = ['exercise-type', 'theme', 'educational-level'];
var FULL_MARKET = ['en', 'de', 'es', 'it', 'pt'];

var passCount = 0;
var failCount = 0;
var failures = [];

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failCount++;
    failures.push({ name: name, error: e });
    console.log('  ✗ ' + name + ' — ' + e.message);
  }
}

// Axis-keys active in `locale` = those with a slug.<locale> in the taxonomy.
function axisKeys(axis, locale) {
  var entries = (taxonomy.axes && taxonomy.axes[axis]) || {};
  return Object.keys(entries).filter(function (k) {
    if (k.charAt(0) === '$') return false;
    var slug = entries[k] && entries[k].slug;
    return !!(slug && slug[locale]);
  });
}

console.log('\ntopic-coverage — topicMeta 100% across full-market locales:');

FULL_MARKET.forEach(function (locale) {
  test(locale + ': every topic-page axis-key has a non-empty topicMeta entry', function () {
    var messages = require(path.join(__dirname, '..', '..', 'frontend', 'messages', locale + '.json'));
    var topicMeta = messages.topicMeta || {};
    var missing = [];
    COVERED_AXES.forEach(function (axis) {
      axisKeys(axis, locale).forEach(function (key) {
        var v = topicMeta[key];
        if (v == null || String(v).trim() === '') {
          missing.push(axis + '/' + key);
        }
      });
    });
    assert.strictEqual(
      missing.length, 0,
      locale + ' missing ' + missing.length + ' topicMeta entries: ' + missing.slice(0, 12).join(', ') +
      (missing.length > 12 ? ' …' : '')
    );
  });
});

console.log('\n=== topic-coverage tests ===');
console.log('Passed: ' + passCount);
console.log('Failed: ' + failCount);
if (failCount > 0) {
  console.error('\nMissing-coverage detail:');
  failures.forEach(function (f) { console.error('  ' + f.name + '\n    ' + f.error.message); });
  process.exit(1);
}

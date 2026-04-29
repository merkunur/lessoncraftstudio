/**
 * Read frontend/messages/<locale>.json + look up keys with en fallback.
 *
 * Per Brief B Phase 2 substitution layer pre-flight checklist: every
 * substitution site documents (a) when value resolves, (b) source/identifier,
 * (c) fallback chain. The fallback chain for localized i18n keys is:
 *   target locale → en → caller-supplied default → throw.
 *
 * Used by substitute.js for placeholders 3 (__EDUCATIONAL_LEVEL_LOCALIZED__),
 * 4 (__END_DECK_HEADING__), 6/8/10/12 (__LINK_TEXT_*__).
 *
 * Also supports --verify mode: scans all 11 locales for key presence and
 * surfaces gaps. Exits 0 if no gaps in en+de (Tier 1); warns on Tier 2-4
 * gaps without erroring.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var MESSAGES_DIR = path.join(__dirname, '..', '..', 'frontend', 'messages');
var SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var TIER_1 = ['en', 'de'];
var TIER_2 = ['es', 'nl'];
var TIER_3 = ['sv', 'fi', 'no'];
var TIER_4 = ['da', 'fr', 'it', 'pt'];

// Brief B Phase 2 introduces these 10 keys. Authored per Tier per Brief B v3
// Decision 2 + Q3 (Tier-4 NSR posture for Danish; Romance trio without NSR).
var REQUIRED_KEYS = [
  'seo.educational_level.preschool',
  'seo.educational_level.kindergarten',
  'seo.educational_level.grade_1',
  'seo.educational_level.grade_2',
  'seo.educational_level.grade_3',
  'endDeck.heading',
  'endDeck.moreType',
  'endDeck.moreTheme',
  'endDeck.moreLevel',
  'endDeck.browseAll'
];

var _cache = {};

function loadLocale(locale) {
  if (_cache[locale]) return _cache[locale];
  var file = path.join(MESSAGES_DIR, locale + '.json');
  if (!fs.existsSync(file)) {
    throw new Error('i18n.loadLocale: missing messages file ' + file);
  }
  var raw = fs.readFileSync(file, 'utf8');
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error('i18n.loadLocale: invalid JSON in ' + file + ': ' + e.message);
  }
  _cache[locale] = parsed;
  return parsed;
}

function lookupRaw(locale, dotPath) {
  var data = loadLocale(locale);
  var parts = dotPath.split('.');
  var cur = data;
  for (var i = 0; i < parts.length; i++) {
    if (cur == null || typeof cur !== 'object') return null;
    cur = cur[parts[i]];
  }
  return (typeof cur === 'string') ? cur : null;
}

/**
 * Three-tier fallback: target locale → en → caller default.
 * Returns {value, source, fallbackFired}: value is the resolved string,
 * source is which fallback fired ('locale' | 'en' | 'default'),
 * fallbackFired is true if anything other than 'locale' resolved it.
 */
function resolve(locale, dotPath, defaultValue) {
  var hit = lookupRaw(locale, dotPath);
  if (hit != null) return { value: hit, source: 'locale', fallbackFired: false };
  if (locale !== 'en') {
    var enHit = lookupRaw('en', dotPath);
    if (enHit != null) return { value: enHit, source: 'en', fallbackFired: true };
  }
  if (defaultValue != null) return { value: defaultValue, source: 'default', fallbackFired: true };
  throw new Error('i18n.resolve: no value for "' + dotPath + '" in locale "' + locale + '" or en, and no default');
}

/**
 * Apply ICU-style {var} interpolation on a template string.
 * Used for endDeck.moreType / moreTheme / moreLevel which carry
 * {type} / {theme} / {level} interpolation respectively.
 */
function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, function (_, name) {
    return vars && vars[name] != null ? String(vars[name]) : '{' + name + '}';
  });
}

function verify() {
  var report = {
    tier1Pass: true,
    perLocale: {},
    summary: { gaps: 0, locales_complete: 0 }
  };
  SUPPORTED_LOCALES.forEach(function (locale) {
    var missing = [];
    REQUIRED_KEYS.forEach(function (k) {
      if (lookupRaw(locale, k) == null) missing.push(k);
    });
    report.perLocale[locale] = { missing: missing, complete: missing.length === 0 };
    report.summary.gaps += missing.length;
    if (missing.length === 0) report.summary.locales_complete++;
    if (missing.length > 0 && TIER_1.indexOf(locale) !== -1) {
      report.tier1Pass = false;
    }
  });
  return report;
}

function clearCache() { _cache = {}; }

module.exports = {
  loadLocale: loadLocale,
  lookupRaw: lookupRaw,
  resolve: resolve,
  interpolate: interpolate,
  verify: verify,
  clearCache: clearCache,
  SUPPORTED_LOCALES: SUPPORTED_LOCALES,
  TIER_1: TIER_1,
  TIER_2: TIER_2,
  TIER_3: TIER_3,
  TIER_4: TIER_4,
  REQUIRED_KEYS: REQUIRED_KEYS,
  MESSAGES_DIR: MESSAGES_DIR
};

// CLI entry: `node scripts/publish-cli/i18n.js --verify`
if (require.main === module) {
  if (process.argv.indexOf('--verify') !== -1) {
    var r = verify();
    console.log('i18n verify — ' + Object.keys(r.perLocale).length + ' locales × ' + REQUIRED_KEYS.length + ' keys');
    Object.keys(r.perLocale).forEach(function (locale) {
      var p = r.perLocale[locale];
      var tag = p.complete ? 'PASS' : 'GAP (' + p.missing.length + ')';
      console.log('  [' + locale + '] ' + tag + (p.complete ? '' : ': ' + p.missing.join(', ')));
    });
    console.log('---');
    console.log('total gaps: ' + r.summary.gaps + '; locales complete: ' + r.summary.locales_complete + '/' + Object.keys(r.perLocale).length);
    console.log('Tier 1 (en, de): ' + (r.tier1Pass ? 'PASS' : 'FAIL'));
    process.exit(r.tier1Pass ? 0 : 1);
  } else {
    console.error('Usage: node scripts/publish-cli/i18n.js --verify');
    process.exit(2);
  }
}

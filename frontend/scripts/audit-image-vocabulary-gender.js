#!/usr/bin/env node
/**
 * IMAGE_VOCABULARY gender-data audit script.
 *
 * Stream A Phase 3 deliverable per Arc 11 close operator ratification
 * (Stream A escalation σ-α; 2026-05-08). Per Stream A commission spec
 * §3 Phase 3.
 *
 * Audits all entries in REFERENCE TRANSLATIONS/image-vocabulary.js for
 * gender-data correctness per locale convention:
 *
 * Locale gender conventions:
 *   - en: no gender; 2 strings expected (singular + plural)
 *   - de: m/f/n; 3 strings (singular + plural + gender)
 *   - fr: m/f; 3 strings
 *   - es: m/f; 3 strings
 *   - pt: m/f; 3 strings
 *   - it: m/f; 3 strings
 *   - nl: d/n (de-shared neuter); 3 strings
 *   - sv: n/t/utrum-neutrum (uses 'n' for neutrum, 't' for utrum); 3 strings
 *   - da: n/t (similar); 3 strings
 *   - no: m/f (bokmål); 3 strings
 *   - fi: no gender; 2 strings
 *
 * Note: Swedish uses 'n' (neutrum) and 't' (utrum, common gender historically); but
 * existing vocab uses 'n' for both (likely operator simplification). Audit
 * surfaces but doesn't error on this.
 *
 * Output: per-locale missing-gender + invalid-gender counts. Operator-side
 * review for any large-scale corrections.
 *
 * Usage:
 *   node frontend/scripts/audit-image-vocabulary-gender.js
 *
 * Exit 0 always (audit-only; never blocks).
 */

'use strict';

var path = require('path');
var fs = require('fs');

var REPO_ROOT = path.resolve(__dirname, '..', '..');
var VOCAB_FILE = path.join(REPO_ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');

// Convert IMAGE_VOCABULARY.js to a requirable form (strip browser globals).
var raw = fs.readFileSync(VOCAB_FILE, 'utf8');
var stripped = raw.replace(/if \(typeof window[\s\S]*$/m, '') + '\nmodule.exports = IMAGE_VOCABULARY;';
fs.writeFileSync('/tmp/_iv_audit.js', stripped, 'utf8');
var IV;
try {
  IV = require('/tmp/_iv_audit.js');
} catch (e) {
  console.error('FATAL: failed to require IMAGE_VOCABULARY:', e.message);
  process.exit(1);
}

// Locale conventions: required string-count + valid gender values (if any).
var LOCALE_RULES = {
  en: { count: 2, validGenders: null },
  fi: { count: 2, validGenders: null },
  de: { count: 3, validGenders: ['m', 'f', 'n'] },
  fr: { count: 3, validGenders: ['m', 'f'] },
  es: { count: 3, validGenders: ['m', 'f'] },
  pt: { count: 3, validGenders: ['m', 'f'] },
  it: { count: 3, validGenders: ['m', 'f'] },
  nl: { count: 3, validGenders: ['d', 'n'] },
  sv: { count: 3, validGenders: ['n', 't'] }, // accepts both per existing convention
  da: { count: 3, validGenders: ['n', 't'] },
  no: { count: 3, validGenders: ['m', 'f', 'n'] }
};

var entryCount = Object.keys(IV).length;
console.log('=== IMAGE_VOCABULARY gender-data audit ===');
console.log('Total entries:', entryCount);
console.log('');

var perLocaleStats = {};
Object.keys(LOCALE_RULES).forEach(function (locale) {
  perLocaleStats[locale] = {
    total: 0,
    missing: 0,
    invalidLength: 0,
    invalidGender: 0,
    samplesMissing: [],
    samplesInvalidLength: [],
    samplesInvalidGender: []
  };
});

Object.keys(IV).forEach(function (vocabKey) {
  var entry = IV[vocabKey];
  Object.keys(LOCALE_RULES).forEach(function (locale) {
    var rule = LOCALE_RULES[locale];
    var s = perLocaleStats[locale];
    s.total++;
    var data = entry[locale];
    if (!data) {
      s.missing++;
      if (s.samplesMissing.length < 3) s.samplesMissing.push(vocabKey);
      return;
    }
    if (!Array.isArray(data) || data.length < rule.count) {
      s.invalidLength++;
      if (s.samplesInvalidLength.length < 3) s.samplesInvalidLength.push(vocabKey + ' (got ' + (Array.isArray(data) ? data.length : typeof data) + ' elements)');
      return;
    }
    // For locales with gender, the 3rd element MUST be a valid gender string.
    if (rule.validGenders) {
      var gender = data[2];
      if (typeof gender !== 'string' || rule.validGenders.indexOf(gender) === -1) {
        s.invalidGender++;
        if (s.samplesInvalidGender.length < 3) s.samplesInvalidGender.push(vocabKey + ' (gender="' + gender + '")');
      }
    }
  });
});

console.log('=== Per-locale audit ===');
Object.keys(perLocaleStats).forEach(function (locale) {
  var s = perLocaleStats[locale];
  var rule = LOCALE_RULES[locale];
  var clean = (s.missing === 0 && s.invalidLength === 0 && s.invalidGender === 0);
  console.log('');
  console.log('  [' + locale + '] (rule: ' + rule.count + ' strings' + (rule.validGenders ? '; valid gender ∈ {' + rule.validGenders.join(',') + '}' : '; no gender') + ')');
  console.log('    total:           ' + s.total);
  console.log('    missing:         ' + s.missing + (s.samplesMissing.length > 0 ? '   sample: ' + s.samplesMissing.join(', ') : ''));
  console.log('    invalid-length:  ' + s.invalidLength + (s.samplesInvalidLength.length > 0 ? '   sample: ' + s.samplesInvalidLength.join(', ') : ''));
  if (rule.validGenders) {
    console.log('    invalid-gender:  ' + s.invalidGender + (s.samplesInvalidGender.length > 0 ? '   sample: ' + s.samplesInvalidGender.join(', ') : ''));
  }
  if (clean) console.log('    >>> CLEAN');
});

// Summary
var totalIssues = 0;
Object.keys(perLocaleStats).forEach(function (loc) {
  var s = perLocaleStats[loc];
  totalIssues += s.missing + s.invalidLength + s.invalidGender;
});
console.log('');
console.log('=== Summary ===');
console.log('  Entries audited: ' + entryCount);
console.log('  Total issues across 11 locales: ' + totalIssues);
if (totalIssues === 0) {
  console.log('  >>> ALL LOCALES CLEAN');
} else {
  console.log('  Per-locale review recommended (see per-locale section above).');
}

// Cleanup temp file
try { fs.unlinkSync('/tmp/_iv_audit.js'); } catch (e) {}

process.exit(0);

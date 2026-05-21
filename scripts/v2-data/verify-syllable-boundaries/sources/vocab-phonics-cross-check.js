/* =====================================================================
   SOURCE: vocabulary-phonics.json syllable-count cross-check
   ---------------------------------------------------------------------
   Reads the existing in-repo `scripts/v2-data/vocabulary-phonics.json`
   file (produced by scripts/enrich-vocabulary-phonics.js). For each
   word × locale, returns the pre-computed syllable COUNT (the `syl`
   field). Used as a count cross-check against the splits produced by
   T (TeX), R (rule-based), N (NST) — if the agreed split's syllable
   count doesn't match `syl`, the word is quarantined even if the
   split sources agree on positions.

   This is a TRULY independent source: vocabulary-phonics.json was
   computed by a separate pipeline (enrich-vocabulary-phonics.js) using
   algorithmic vowel-grouping, not hyphenation patterns. Independent
   mechanism → independent failure mode.
   ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

let _cache = null;
function load() {
  if (_cache) return _cache;
  const candidates = [
    path.join(__dirname, '..', '..', 'vocabulary-phonics.json'),
    path.join(process.cwd(), 'scripts', 'v2-data', 'vocabulary-phonics.json')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      _cache = JSON.parse(fs.readFileSync(c, 'utf-8'));
      return _cache;
    }
  }
  throw new Error('vocabulary-phonics.json not found in candidates: ' + candidates.join(', '));
}

/**
 * Get expected syllable count for a (key, locale) tuple.
 * @param {string} key      vocabulary key (e.g., 'cat')
 * @param {string} locale
 * @returns {number | null}
 */
function getSyllableCount(key, locale) {
  const data = load();
  const entry = data[key];
  if (!entry) return null;
  const localeEntry = entry[locale];
  if (!localeEntry) return null;
  return (typeof localeEntry.syl === 'number') ? localeEntry.syl : null;
}

/**
 * Get the full phonics enrichment record (syl + pat + lc + cmp).
 */
function getRecord(key, locale) {
  const data = load();
  return data[key]?.[locale] || null;
}

module.exports = { getSyllableCount, getRecord, load };

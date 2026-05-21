/* =====================================================================
   IMAGE-VOCABULARY LOADER (READ-ONLY)
   ---------------------------------------------------------------------
   Loads REFERENCE TRANSLATIONS/image-vocabulary.js — the authoritative
   1,263-noun source-of-truth per locale (singular/plural/gender).
   Read-only; never mutated.

   image-vocabulary.js is committed as a JS module via IIFE — we parse
   by extracting the object literal between the first '{' and last '}'.
   ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

let _cache = null;

function findVocabFile() {
  const candidates = [
    path.join(__dirname, '..', '..', '..', '..', 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'),
    path.join(process.cwd(), 'REFERENCE TRANSLATIONS', 'image-vocabulary.js')
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  throw new Error('image-vocabulary.js not found; tried: ' + candidates.join(', '));
}

function load() {
  if (_cache) return _cache;
  const raw = fs.readFileSync(findVocabFile(), 'utf-8');
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Could not extract object literal from image-vocabulary.js');
  }
  const objLit = raw.substring(start, end + 1);
  _cache = (new Function('return ' + objLit))();
  return _cache;
}

/** Return all noun keys (e.g., 'cat', 'dog', ...). */
function keys() {
  return Object.keys(load());
}

/**
 * Return the (singular, lowercased) form of a word for a given locale.
 * Some locales capitalize lemmas in image-vocabulary.js (German nouns).
 * For pipeline source-lookup we typically want LOWERCASE form,
 * since hyphenation patterns + NST + Wiktionary lemmas are lowercase.
 * Exception: German keeps its original capitalization (nouns capitalized).
 *
 * @param {string} key       vocabulary key (e.g., 'cat')
 * @param {string} locale
 * @param {object} opts     { preserveCase?: bool }
 * @returns {string | null}
 */
function getWord(key, locale, opts) {
  opts = opts || {};
  const data = load();
  const entry = data[key];
  if (!entry) return null;
  const localeArr = entry[locale];
  if (!Array.isArray(localeArr) || !localeArr[0]) return null;
  const word = localeArr[0];
  if (opts.preserveCase || locale === 'de') return word;
  return word.charAt(0).toLowerCase() + word.slice(1);
}

/** Return all (key, word) pairs for a given locale. Words lowercased
    except for German per getWord() rule. */
function entriesByLocale(locale, opts) {
  const data = load();
  const out = [];
  for (const key of Object.keys(data)) {
    const word = getWord(key, locale, opts);
    if (word) out.push({ key, word });
  }
  return out;
}

module.exports = { load, keys, getWord, entriesByLocale };

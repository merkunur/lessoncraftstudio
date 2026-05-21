/* =====================================================================
   SOURCE: Wiktionary IPA via direct en.wiktionary.org API
   ---------------------------------------------------------------------
   Pre-flight measured Wiktionary IPA coverage on a 100-word random
   sample at: DE 88% · NL 84% · SV 83% · NO 72% · DA 70% · FI 88%.
   All locales above the 60% threshold.

   For the pipeline we query en.wiktionary.org/w/api.php for each word's
   wikitext, locate the locale section ==Language==, and extract the IPA
   template {{IPA|<ipa-code>|/.../|...}}.

   We extract:
     - Raw IPA strings (for the DA quarantine regex)
     - Syllable COUNT by counting primary-stress + secondary-stress markers
       OR by counting nuclei in the IPA. NOT used for syllable boundaries
       (Wiktionary IPA boundary marking is inconsistent across editors).

   Results are cached locally at .cache/kaikki/<locale>.json to avoid
   re-querying. Cache is keyed by lowercased lemma (German keeps caps).

   Rate-limit: 80ms between API calls to respect Wikimedia ToS for
   programmatic access.
   ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '..', '.cache', 'kaikki');

const LANG_HEADERS = {
  de: 'German', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian Bokmål',
  da: 'Danish', fi: 'Finnish', es: 'Spanish', it: 'Italian',
  pt: 'Portuguese', fr: 'French', en: 'English'
};
/* Wiktionary IPA template uses 'nb' for Norwegian Bokmål, not 'no'. */
const IPA_LOCALE = {
  de: 'de', nl: 'nl', sv: 'sv', no: 'nb', da: 'da', fi: 'fi',
  es: 'es', it: 'it', pt: 'pt', fr: 'fr', en: 'en'
};

function ensureCacheDir() { fs.mkdirSync(CACHE_DIR, { recursive: true }); }

function cachePath(locale) { return path.join(CACHE_DIR, locale + '.json'); }

let _localeCaches = {};
function loadCache(locale) {
  if (_localeCaches[locale]) return _localeCaches[locale];
  ensureCacheDir();
  const p = cachePath(locale);
  _localeCaches[locale] = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf-8')) : {};
  return _localeCaches[locale];
}
function saveCache(locale) {
  ensureCacheDir();
  fs.writeFileSync(cachePath(locale), JSON.stringify(_localeCaches[locale], null, 2));
}

async function fetchWikitext(word) {
  const url = `https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&format=json&prop=wikitext&formatversion=2&origin=*`;
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'lessoncraftstudio-phonics-pipeline/1.0 (rkgenc34@gmail.com)' }
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.parse?.wikitext || null;
  } catch (e) { return null; }
}

/** Extract first IPA string for a locale from wikitext. Returns the raw
    IPA inside the template, e.g., '/hunˀ/' or '[hunˀ]'.
    Section-end detection: find the next LEVEL-2 header (== X ==) — must NOT
    match level-3 (===X===) which begins with `==`. Regex `\n==[^=]` enforces
    exactly two equals followed by non-equal. */
function extractIpa(wikitext, locale) {
  if (!wikitext) return null;
  const header = LANG_HEADERS[locale];
  const ipaCode = IPA_LOCALE[locale];
  const i = wikitext.indexOf(`==${header}==`);
  if (i === -1) return null;
  // Find next level-2 header (==X==), NOT level-3 (===X===)
  const re2 = /\n==[^=]/g;
  re2.lastIndex = i + 5;
  const m2 = re2.exec(wikitext);
  const end = m2 ? m2.index : wikitext.length;
  const section = wikitext.substring(i, end);
  // Match {{IPA|<ipa-code>|<content>...}}
  const re = new RegExp(`\\{\\{IPA\\|${ipaCode}\\|([^}|]+)`, 'i');
  const m = section.match(re);
  return m ? m[1].trim() : null;
}

/** Count syllables from an IPA string by counting vowel nuclei.
    Conservative: each contiguous vowel-class character group = 1 nucleus. */
function countSyllablesFromIpa(ipa) {
  if (!ipa || typeof ipa !== 'string') return null;
  // Strip wrappers + stress markers + boundaries
  const clean = ipa.replace(/[\/\[\]]/g, '').replace(/[ˈˌ.\s]/g, '');
  // IPA vowel chars (broad — covers Latin vowels, IPA vowels, accented variants)
  const VOWEL_CLASS = /[aeiouyæøœɛɔɪʊəʌɐɒɑɨɯɤʉøœɞɵʏ][̀-ͯˀː]*/g;
  const matches = clean.match(VOWEL_CLASS);
  return matches ? matches.length : null;
}

/**
 * Look up IPA for a word/locale. Hits cache first; queries Wiktionary if
 * not cached. Returns { ipa, sylCount } or { ipa: null, sylCount: null }.
 */
async function lookup(word, locale, opts) {
  opts = opts || {};
  if (!word) return { ipa: null, sylCount: null };
  // Normalize for cache key
  const key = word;  // preserve case for cache hit/miss; Wiktionary lemma casing matters
  const cache = loadCache(locale);
  if (cache[key] !== undefined && !opts.refresh) return cache[key];
  await new Promise(r => setTimeout(r, opts.delayMs || 80));
  const wikitext = await fetchWikitext(word);
  const ipa = extractIpa(wikitext, locale);
  const sylCount = countSyllablesFromIpa(ipa);
  cache[key] = { ipa, sylCount };
  saveCache(locale);
  return cache[key];
}

module.exports = { lookup, extractIpa, countSyllablesFromIpa, LANG_HEADERS, IPA_LOCALE };

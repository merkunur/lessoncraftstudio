/* =====================================================================
   SOURCE: TeX-pattern hyphenation via `hyphen` npm package
   ---------------------------------------------------------------------
   Wraps the `hyphen` package (Liang TeX patterns; MIT-licensed; covers
   all 11 locales we need including sv/fi/de/nl/no/da/es/it/pt/fr/en).

   Output: array of syllable strings, e.g., 'kissa' → ['kis','sa'].

   Per-locale pattern selection:
     de → de-1996 (post-1996 orthographic reform; canonical for modern DE)
     no → nb (Bokmål per CLAUDE.md §6 canonical)
     en → en-us (English defaults to US patterns)
     fi → fi (school variant fi-x-school exists; default fi is the
              standard linguistic pattern set, used for verification)
     da/es/it/pt/fr/nl/sv → default locale-coded pattern

   The `hyphen` package returns hyphenated strings with U+00AD (soft
   hyphen) as the separator. We split on that, then return the array.
   ===================================================================== */

'use strict';

const PATTERN_BY_LOCALE = {
  en: 'en-us',
  de: 'de-1996',
  fr: 'fr',
  it: 'it',
  es: 'es',
  pt: 'pt',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'nb',
  fi: 'fi'
};

const cache = new Map();
function getHyphenator(locale) {
  if (cache.has(locale)) return cache.get(locale);
  const pattern = PATTERN_BY_LOCALE[locale];
  if (!pattern) throw new Error('Unsupported locale: ' + locale);
  const mod = require('hyphen/' + pattern);
  cache.set(locale, mod);
  return mod;
}

/* Split a hyphenated word on U+00AD soft-hyphens into syllable array. */
function splitOnSoftHyphen(hyphenated) {
  if (typeof hyphenated !== 'string') return null;
  return hyphenated.split('­').filter(s => s.length > 0);
}

/**
 * Syllabify a word per the locale's TeX pattern set.
 * @param {string} word     the word in its canonical spelling
 * @param {string} locale   one of en/de/fr/it/es/pt/nl/sv/da/no/fi
 * @returns {string[] | null}  syllable array, or null on error
 */
function syllabify(word, locale) {
  if (!word || typeof word !== 'string') return null;
  try {
    const { hyphenateSync } = getHyphenator(locale);
    const hyphenated = hyphenateSync(word);
    const parts = splitOnSoftHyphen(hyphenated);
    return (parts && parts.length > 0) ? parts : null;
  } catch (e) {
    return null;
  }
}

module.exports = { syllabify, PATTERN_BY_LOCALE };

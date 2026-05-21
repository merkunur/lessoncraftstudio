/* =====================================================================
   SOURCE: Rule-based phonotactic syllabifier (per-locale dispatcher)
   ---------------------------------------------------------------------
   Dispatches to per-locale rule-based syllabifier modules in
   `../rule-syllabifiers/<locale>.js`. Each locale's syllabifier encodes
   that language's phonotactic rules directly (NOT pattern-derived from
   hyphenation). This is the third TRULY independent mechanism in the
   gate: TeX patterns + rule-based + count cross-check = three
   independent failure modes.

   For sv/no/da the NST pronunciation lexicon supplies syllable
   boundaries directly (gold-standard authoritative); a rule-based
   syllabifier is not required as a primary source for those locales,
   but if present is run as an additional check.

   For es/it/pt/fr/fi a rule-based syllabifier IS the third source
   (no NST equivalent at gold-standard for those languages).

   Modules export: `syllabify(word) → [syl, syl, ...] | null`
   ===================================================================== */

'use strict';

const path = require('path');
const fs = require('fs');

const cache = new Map();
function loadSyllabifier(locale) {
  if (cache.has(locale)) return cache.get(locale);
  const modPath = path.join(__dirname, '..', 'rule-syllabifiers', locale + '.js');
  if (!fs.existsSync(modPath)) { cache.set(locale, null); return null; }
  try {
    const mod = require(modPath);
    cache.set(locale, mod);
    return mod;
  } catch (e) {
    cache.set(locale, null);
    return null;
  }
}

function syllabify(word, locale) {
  if (!word || typeof word !== 'string') return null;
  const mod = loadSyllabifier(locale);
  if (!mod || typeof mod.syllabify !== 'function') return null;
  try {
    return mod.syllabify(word);
  } catch (e) {
    return null;
  }
}

module.exports = { syllabify };

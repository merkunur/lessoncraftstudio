/**
 * Per-locale CAPITAL letter sets for letter tracing (K-238). Caps only —
 * capital letterforms are school-safe in a rounded display font, while
 * lowercase-with-stroke-arrows needs a per-glyph stroke database (a
 * deliberate later commission). `specials` are the locale's own letters —
 * the d3 page features them (the page an English-only competitor cannot
 * print). fr note: cursive is the French school hand; GS traces CAPITALES
 * d'imprimerie first, which is exactly this form (honest framing).
 */
'use strict';

const BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LETTER_SETS = {
  en: { alphabet: BASE, specials: [] },
  de: { alphabet: [...BASE, 'Ä', 'Ö', 'Ü'], specials: ['Ä', 'Ö', 'Ü'] },
  fr: { alphabet: BASE, specials: ['É', 'È', 'Ê'] },
  es: { alphabet: [...BASE.slice(0, 14), 'Ñ', ...BASE.slice(14)], specials: ['Ñ'] },
  // pt-BR panel ruling: no diacritic capitals are taught as separate letters;
  // the d3 page features K W Y — the letters BR children see least (in the
  // alphabet since 2009).
  pt: { alphabet: BASE, specials: ['K', 'W', 'Y'] },
  it: { alphabet: BASE.filter((c) => !'JKWXY'.includes(c)), specials: [] }, // 21-letter school alphabet
  // nl panel: no accented capitals exist; the one Dutch-own letter is the
  // IJ digraph (capitalized as TWO letters together: IJsselmeer).
  nl: { alphabet: [...BASE, 'IJ'], specials: ['IJ'] },
  sv: { alphabet: [...BASE, 'Å', 'Ä', 'Ö'], specials: ['Å', 'Ä', 'Ö'] },
  da: { alphabet: [...BASE, 'Æ', 'Ø', 'Å'], specials: ['Æ', 'Ø', 'Å'] },
  no: { alphabet: [...BASE, 'Æ', 'Ø', 'Å'], specials: ['Æ', 'Ø', 'Å'] },
  fi: { alphabet: [...BASE, 'Å', 'Ä', 'Ö'], specials: ['Ä', 'Ö'] }, // Å taught but rare natively
};

/**
 * Per-locale LOWERCASE sets (K-278 family). Derived from the capital sets above
 * so every ruling already made there carries over unchanged — es keeps `n~` in
 * its alphabetical position, it keeps its 21-letter alphabet, nl keeps the
 * digraph (as `ij`), pt keeps k/w/y as the letters BR children see least.
 *
 * ONE override: German appends `ss` (eszett). It is a real lowercase letter
 * with NO capital form, so the capitals page structurally could not carry it —
 * which makes it precisely the "page an English-only competitor cannot print"
 * that the specials page exists for.
 */
const LOWERCASE_SETS = Object.fromEntries(
  Object.entries(LETTER_SETS).map(([loc, set]) => {
    const alphabet = set.alphabet.map((c) => c.toLowerCase());
    const specials = set.specials.map((c) => c.toLowerCase());
    return [loc, loc === 'de'
      ? { alphabet: [...alphabet, 'ß'], specials: [...specials, 'ß'] }
      : { alphabet, specials }];
  }),
);

module.exports = { LETTER_SETS, LOWERCASE_SETS };

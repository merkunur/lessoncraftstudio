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
  pt: { alphabet: BASE, specials: ['Ã', 'Ç'] },
  it: { alphabet: BASE.filter((c) => !'JKWXY'.includes(c)), specials: [] }, // 21-letter school alphabet
  nl: { alphabet: BASE, specials: [] },
  sv: { alphabet: [...BASE, 'Å', 'Ä', 'Ö'], specials: ['Å', 'Ä', 'Ö'] },
  da: { alphabet: [...BASE, 'Æ', 'Ø', 'Å'], specials: ['Æ', 'Ø', 'Å'] },
  no: { alphabet: [...BASE, 'Æ', 'Ø', 'Å'], specials: ['Æ', 'Ø', 'Å'] },
  fi: { alphabet: [...BASE, 'Å', 'Ä', 'Ö'], specials: ['Ä', 'Ö'] }, // Å taught but rare natively
};

module.exports = { LETTER_SETS };

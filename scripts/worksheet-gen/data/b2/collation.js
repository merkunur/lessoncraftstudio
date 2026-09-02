/**
 * collation.js — per-locale alphabetical order for the alphabet strip and
 * word sorting (nt20-B G1-245 + the G1-244 word bank). HAND-AUTHORED, ×11.
 *
 *   alphabet  — the ordered letters used to SORT (lowercase)
 *   strip     — the letters SHOWN on the alphabet strip (it: the 21-letter
 *               school alphabet; sorting still knows j k w x y for loanwords)
 *   fold      — pre-sort character folding (de ä→a ö→o ü→u ß→ss; Romance accents)
 *   stripCase — 'lower' | 'upper' (de shows capitals: its nouns are capitalised)
 *
 * sv/fi: å ä ö AFTER z. da/no: æ ø å AFTER z. es: ñ after n. Never ASCII sort.
 * verify() receives the table and re-sorts with it — it never calls
 * localeCompare (host-dependent) or String comparison (ASCII).
 */
'use strict';

const AZ = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ROMANCE_FOLD = { á: 'a', à: 'a', â: 'a', ã: 'a', ä: 'a', é: 'e', è: 'e', ê: 'e', ë: 'e', í: 'i', ì: 'i', î: 'i', ï: 'i', ó: 'o', ò: 'o', ô: 'o', õ: 'o', ö: 'o', ú: 'u', ù: 'u', û: 'u', ü: 'u', ç: 'c' };

const COLLATION = {
  en: { alphabet: AZ, strip: AZ, fold: {}, stripCase: 'lower' },
  de: { alphabet: AZ, strip: AZ, fold: { ä: 'a', ö: 'o', ü: 'u', ß: 'ss' }, stripCase: 'upper' },
  fr: { alphabet: AZ, strip: AZ, fold: ROMANCE_FOLD, stripCase: 'lower' },
  es: { alphabet: 'abcdefghijklmnñopqrstuvwxyz'.split(''), strip: 'abcdefghijklmnñopqrstuvwxyz'.split(''), fold: { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' }, stripCase: 'lower' },
  pt: { alphabet: AZ, strip: AZ, fold: ROMANCE_FOLD, stripCase: 'lower' },
  it: { alphabet: AZ, strip: 'abcdefghilmnopqrstuvz'.split(''), fold: { à: 'a', è: 'e', é: 'e', ì: 'i', ò: 'o', ù: 'u' }, stripCase: 'lower' },
  nl: { alphabet: AZ, strip: AZ, fold: { é: 'e', ë: 'e', ï: 'i', ö: 'o', ü: 'u' }, stripCase: 'lower' },
  sv: { alphabet: AZ.concat(['å', 'ä', 'ö']), strip: AZ.concat(['å', 'ä', 'ö']), fold: { é: 'e' }, stripCase: 'lower' },
  da: { alphabet: AZ.concat(['æ', 'ø', 'å']), strip: AZ.concat(['æ', 'ø', 'å']), fold: { é: 'e' }, stripCase: 'lower' },
  no: { alphabet: AZ.concat(['æ', 'ø', 'å']), strip: AZ.concat(['æ', 'ø', 'å']), fold: { é: 'e' }, stripCase: 'lower' },
  fi: { alphabet: AZ.concat(['å', 'ä', 'ö']), strip: AZ.concat(['å', 'ä', 'ö']), fold: { š: 's', ž: 'z' }, stripCase: 'lower' },
};

/** Sort key: array of alphabet indices after folding; unknown chars skipped. */
function sortKey(word, loc) {
  const t = COLLATION[loc];
  if (!t) throw new Error(`collation: no table for ${loc}`);
  const idx = new Map(t.alphabet.map((ch, i) => [ch, i]));
  const key = [];
  for (const ch of String(word).toLocaleLowerCase(loc)) {
    const f = t.fold[ch] != null ? t.fold[ch] : ch;
    for (const c of f) if (idx.has(c)) key.push(idx.get(c));
  }
  return key;
}
function compare(a, b, loc) {
  const ka = sortKey(a, loc), kb = sortKey(b, loc);
  for (let i = 0; i < Math.min(ka.length, kb.length); i++) if (ka[i] !== kb[i]) return ka[i] - kb[i];
  return ka.length - kb.length;
}
/** First-letter index in the locale alphabet (after folding), or -1. */
function firstIndex(word, loc) { const k = sortKey(word, loc); return k.length ? k[0] : -1; }

module.exports = { COLLATION, sortKey, compare, firstIndex };

'use strict';

/**
 * Hreflang locale → code map — CJS mirror of frontend/lib/seo/hreflang.ts
 * (HREFLANG_MAP + getHreflangCode + x-default policy).
 *
 * publish-cli is a separate CommonJS world and cannot import the ESM SoT;
 * this is a parallel copy per the established OG_LOCALE_MAP precedent
 * (seo-reconciliation.js / substitute.js). If hreflang.ts changes, update this
 * file too — search "pt-BR" across scripts/. Per CLAUDE.md §6: pt→pt-BR;
 * es stays es; no stays no; the rest are 1:1.
 *
 * Audit R5 (P2-02/P2-03): deck.html previously emitted bare locale codes
 * (hreflang="pt", <html lang="pt">) and an alpha-first x-default (→ da). The
 * Next.js side uses getHreflangCode (pt-BR) + x-default prefer-en. This mirror
 * brings the deck emitters in line.
 */

var HREFLANG_MAP = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt-BR',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
};

function getHreflangCode(locale) {
  return HREFLANG_MAP[locale] || locale;
}

/**
 * x-default policy: prefer the `en` sibling; else the first-PUBLISHED (oldest)
 * by `publishedAt`; else a deterministic locale-alpha tiebreak. Callers should
 * pass siblings carrying `publishedAt` — do NOT rely on alpha order (the old
 * bug picked `da`). Returns the chosen sibling object, or null when empty.
 */
function pickXDefault(siblings) {
  if (!siblings || !siblings.length) return null;
  var en = siblings.find(function (s) { return s.language === 'en'; });
  if (en) return en;
  var ordered = siblings.slice().sort(function (a, b) {
    var ap = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
    var bp = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
    if (ap !== bp) return ap - bp; // oldest first
    return a.language.localeCompare(b.language); // deterministic tiebreak
  });
  return ordered[0];
}

module.exports = {
  HREFLANG_MAP: HREFLANG_MAP,
  getHreflangCode: getHreflangCode,
  pickXDefault: pickXDefault,
};

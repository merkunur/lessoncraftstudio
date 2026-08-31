/**
 * Per-locale currency conventions for the money family (G1-211) — the
 * native-rebuild moat. Denomination sets are CURRICULUM/CIRCULATION facts
 * (operator-flagged for native-ensemble verification at the locale fan):
 *  - fi/nl: 1c and 2c coins are not in circulation (5c cash rounding)
 *  - sv: no öre coins exist (1/2/5/10 kr circulate)
 *  - da: 50-øre exists but G1 counting stays in whole kroner
 *  - no: 1/5/10/20 kr coins
 *  - pt-BR: 25-centavo coin (quarter-like counting strategies)
 *  - en: USD per operator ruling 2026-08-31 (CCSS 2.MD.C.8 anchor)
 *
 * G1 design keeps every total in the SMALLEST natural counting unit — cents /
 * centavos for the cent locales, whole kroner for the Nordic sets — so no
 * decimal notation appears at this band (decimal comma/point is a G2+ topic).
 *
 * `unit`   — the label printed after the child's total (native abbreviation)
 * `sub`    — coin denominations available in the sub-unit range
 * `subMax` — the counting ceiling for generated totals
 * `tint`   — 'gold' | 'silver' | 'copper' per denomination for the stylized
 *            coin rendering (maps to cream/white fills — B&W-safe by SIZE).
 */
'use strict';

const EURO_FULL = [
  { v: 1, tint: 'copper' }, { v: 2, tint: 'copper' }, { v: 5, tint: 'copper' },
  { v: 10, tint: 'gold' }, { v: 20, tint: 'gold' }, { v: 50, tint: 'gold' },
];
const EURO_ROUNDED = EURO_FULL.filter((c) => c.v >= 5); // fi/nl: no 1c/2c

const CURRENCIES = {
  en: { code: 'USD', unit: '¢', sub: [{ v: 1, tint: 'copper' }, { v: 5, tint: 'silver' }, { v: 10, tint: 'silver' }, { v: 25, tint: 'silver' }], subMax: 99 },
  de: { code: 'EUR', unit: 'ct', sub: EURO_FULL, subMax: 99 },
  fr: { code: 'EUR', unit: 'c', sub: EURO_FULL, subMax: 99 },
  es: { code: 'EUR', unit: 'ct', sub: EURO_FULL, subMax: 99 },
  it: { code: 'EUR', unit: 'c', sub: EURO_FULL, subMax: 99 },
  pt: { code: 'BRL', unit: 'centavos', sub: [{ v: 5, tint: 'silver' }, { v: 10, tint: 'gold' }, { v: 25, tint: 'gold' }, { v: 50, tint: 'silver' }], subMax: 99 },
  nl: { code: 'EUR', unit: 'ct', sub: EURO_ROUNDED, subMax: 95 },
  fi: { code: 'EUR', unit: 'snt', sub: EURO_ROUNDED, subMax: 95 },
  sv: { code: 'SEK', unit: 'kr', sub: [{ v: 1, tint: 'gold' }, { v: 2, tint: 'silver' }, { v: 5, tint: 'gold' }, { v: 10, tint: 'gold' }], subMax: 50 },
  da: { code: 'DKK', unit: 'kr.', sub: [{ v: 1, tint: 'silver' }, { v: 2, tint: 'silver' }, { v: 5, tint: 'silver' }, { v: 10, tint: 'gold' }, { v: 20, tint: 'gold' }], subMax: 50 },
  no: { code: 'NOK', unit: 'kr', sub: [{ v: 1, tint: 'silver' }, { v: 5, tint: 'silver' }, { v: 10, tint: 'silver' }, { v: 20, tint: 'gold' }], subMax: 50 },
};

module.exports = { CURRENCIES };

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
 *  - es: MXN per operator ruling 2026-10-17 ("Mexican Spanish only") — whole pesos,
 *    $1 / $2 / $5 / $10 coins (the 50¢ coin exists but K-2 counting stays in pesos)
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

// mm = the coin's real diameter (2026-11-01, native + pedagogy review): a token's SIZE follows it (primitives/coins.js
// sizeFor), never its value — the US dime, the 10-cent euro and the 10-krona coin are smaller than coins worth less, and a
// page drawing "bigger = worth more" teaches a misconception. The numeral on the token carries the value.
const EURO_FULL = [
  { v: 1, tint: 'copper', mm: 16.25 }, { v: 2, tint: 'copper', mm: 18.75 }, { v: 5, tint: 'copper', mm: 21.25 },
  { v: 10, tint: 'gold', mm: 19.75 }, { v: 20, tint: 'gold', mm: 22.25 }, { v: 50, tint: 'gold', mm: 24.25 },
];
const EURO_ROUNDED = EURO_FULL.filter((c) => c.v >= 5); // fi/nl: no 1c/2c

const CURRENCIES = {
  en: { code: 'USD', unit: '¢', sub: [{ v: 1, tint: 'copper', mm: 19.05 }, { v: 5, tint: 'silver', mm: 21.21 }, { v: 10, tint: 'silver', mm: 17.91 }, { v: 25, tint: 'silver', mm: 24.26 }], subMax: 99 },
  de: { code: 'EUR', unit: 'ct', sub: EURO_FULL, subMax: 99 },
  fr: { code: 'EUR', unit: 'c', sub: EURO_FULL, subMax: 99 },
  es: { code: 'MXN', unit: 'pesos', whole: true, sub: [{ v: 1, tint: 'silver', mm: 21 }, { v: 2, tint: 'silver', mm: 23 }, { v: 5, tint: 'silver', mm: 25.5 }, { v: 10, tint: 'gold', mm: 28 }], subMax: 50 }, // es-MX (operator 2026-10-17): whole pesos, like the activities
  it: { code: 'EUR', unit: 'cent', sub: EURO_FULL, subMax: 99 }, // 'cent' per it native panel (on the coins + textbooks; never bare 'c')
  pt: { code: 'BRL', unit: 'centavos', sub: [{ v: 5, tint: 'silver', mm: 22 }, { v: 10, tint: 'gold', mm: 20 }, { v: 25, tint: 'gold', mm: 25 }, { v: 50, tint: 'silver', mm: 23 }], subMax: 99 },
  nl: { code: 'EUR', unit: 'ct', sub: EURO_ROUNDED, subMax: 95 },
  fi: { code: 'EUR', unit: 'snt', sub: EURO_ROUNDED, subMax: 95 },
  sv: { code: 'SEK', unit: 'kr', sub: [{ v: 1, tint: 'gold', mm: 19.5 }, { v: 2, tint: 'silver', mm: 22.5 }, { v: 5, tint: 'gold', mm: 23.75 }, { v: 10, tint: 'gold', mm: 20.5 }], subMax: 50 },
  da: { code: 'DKK', unit: 'kr.', sub: [{ v: 1, tint: 'silver', mm: 20.25 }, { v: 2, tint: 'silver', mm: 24.5 }, { v: 5, tint: 'silver', mm: 28.5 }, { v: 10, tint: 'gold', mm: 23.35 }, { v: 20, tint: 'gold', mm: 27 }], subMax: 50 },
  no: { code: 'NOK', unit: 'kr', sub: [{ v: 1, tint: 'silver', mm: 21 }, { v: 5, tint: 'silver', mm: 23.5 }, { v: 10, tint: 'silver', mm: 24 }, { v: 20, tint: 'gold', mm: 27.5 }], subMax: 50 },
};

// Notes (Money maker, 2026-11-01; ENGINES [money-Q1]): flat stylised rectangles with their value, never replicas — in the
// set's SMALLEST unit (cents for the cent currencies: $1 = 100; whole units for es-MX pesos and the kr sets). The
// denominations every one of these countries prints today.
const NOTES = {
  en: [100, 500, 1000],
  de: [500, 1000, 2000], fr: [500, 1000, 2000], it: [500, 1000, 2000], nl: [500, 1000, 2000], fi: [500, 1000, 2000],
  pt: [200, 500, 1000, 2000],
  es: [20, 50, 100],
  sv: [20, 50, 100],
  da: [50, 100, 200],
  no: [50, 100, 200],
};

module.exports = { CURRENCIES, NOTES };

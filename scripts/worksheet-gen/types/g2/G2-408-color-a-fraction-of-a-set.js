/** G2-408 — colour a fraction of a set, any circles count (T3, 3.NF.A.1 readiness). Fractions maker, 2026-11-01. See types/_shared/fr-more.js. */
'use strict';
const { makeFrMoreType } = require('../_shared/fr-more.js');

module.exports = makeFrMoreType({
  id: 'G2-408', slug: 'color-a-fraction-of-a-set', mode: 'set', gradeBand: 'G2',
  i18n: { en: { title: "Color a Fraction of the Set", instruction: "Color the fraction of the circles. Then write how many circles you colored." } },
});

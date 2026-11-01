/** G2-406 — a fraction wall to cut into strips (T1, material). Fractions maker, 2026-11-01. See types/_shared/fr-more.js. */
'use strict';
const { makeFrMoreType } = require('../_shared/fr-more.js');

module.exports = makeFrMoreType({
  id: 'G2-406', slug: 'fraction-strips-to-cut', mode: 'strips', gradeBand: 'G2',
  i18n: { en: { title: "Fraction Strips to Cut Out", instruction: "Cut out the strips along the dashed lines. Lay them under each other and compare the pieces." } },
});

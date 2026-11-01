/** G2-409 — the shaded and unshaded fraction of one shape (T4, 3.NF.A.1 / 3.NF.A.3c). Fractions maker, 2026-11-01. See types/_shared/fr-more.js. */
'use strict';
const { makeFrMoreType } = require('../_shared/fr-more.js');

module.exports = makeFrMoreType({
  id: 'G2-409', slug: 'shaded-and-not-shaded', mode: 'both', gradeBand: 'G2',
  i18n: { en: { title: "Shaded and Not Shaded", instruction: "Write the fraction that is shaded and the fraction that is not shaded." } },
});

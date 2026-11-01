/** K-456 — the number house (T1, K.OA.A.3: every way to split N). Number Bonds maker, 2026-11-01. See types/_shared/number-bond-more.js. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');

module.exports = makeBondMoreType({
  id: 'K-456', slug: 'number-house', mode: 'house', gradeBand: 'K',
  i18n: { en: { title: "Number Houses", instruction: "The roof shows the number. Each floor splits it into two parts. Write the missing part on each floor." } },
});

/** G2-398 — make the biggest and smallest number from digit cards (T4, 2.NBT.A.1 / 2.NBT.A.4). Compare Numbers & Groups maker, 2026-11-01. See types/_shared/compare-more.js. */
'use strict';
const { makeCompareMoreType } = require('../_shared/compare-more.js');

module.exports = makeCompareMoreType({
  id: 'G2-398', slug: 'biggest-and-smallest-number', mode: 'digits', gradeBand: 'G2',
  i18n: { en: { title: "Biggest and Smallest Number", instruction: "Use the digit cards to make the biggest and the smallest number. Use each card once." } },
});

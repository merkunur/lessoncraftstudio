/** K-460 — the crocodile mouth opens to the bigger number (T1, K.CC.C.7 / 1.NBT.B.3 / 2.NBT.A.4). Compare Numbers & Groups maker, 2026-11-01. See types/_shared/compare-more.js. */
'use strict';
const { makeCompareMoreType } = require('../_shared/compare-more.js');

module.exports = makeCompareMoreType({
  id: 'K-460', slug: 'crocodile-compare', mode: 'croc', gradeBand: 'K',
  i18n: { en: { title: "Hungry Crocodile", instruction: "The crocodile always eats the bigger number. Circle the mouth that opens to the bigger number, or = if they are the same." } },
});

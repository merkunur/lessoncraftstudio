/** G2-399 — which place decides? compare from the left (T5, 2.NBT.A.4). Compare Numbers & Groups maker, 2026-11-01. See types/_shared/compare-more.js. */
'use strict';
const { makeCompareMoreType } = require('../_shared/compare-more.js');

module.exports = makeCompareMoreType({
  id: 'G2-399', slug: 'which-place-decides', mode: 'place', gradeBand: 'G2',
  i18n: { en: { title: "Which Place Decides?", instruction: "Start on the left. Circle the first two digits that are different. Then write <, > or = in the box." } },
});

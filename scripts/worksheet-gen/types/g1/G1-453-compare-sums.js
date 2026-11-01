/** G1-453 — compare two sums or differences (T2, 1.OA.D.7 / 2.NBT.A.4). Compare Numbers & Groups maker, 2026-11-01. See types/_shared/compare-more.js. */
'use strict';
const { makeCompareMoreType } = require('../_shared/compare-more.js');

module.exports = makeCompareMoreType({
  id: 'G1-453', slug: 'compare-sums', mode: 'expr', gradeBand: 'G1',
  i18n: { en: { title: "Compare the Sums", instruction: "Work out both sides. Write <, > or = in the box." } },
});

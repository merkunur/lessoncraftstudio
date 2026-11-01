/** G1-456 — cut and sort numbers into the odd and even houses (T3, 2.OA.C.3). Odd & Even maker, 2026-11-01. See types/_shared/odd-more.js. */
'use strict';
const { makeOddMoreType } = require('../_shared/odd-more.js');

module.exports = makeOddMoreType({
  id: 'G1-456', slug: 'odd-even-cut-and-sort', mode: 'sort', gradeBand: 'G1',
  i18n: { en: { title: "Cut and Sort: Odd or Even", instruction: "Cut out the number cards. Glue each card into the odd house or the even house." } },
});

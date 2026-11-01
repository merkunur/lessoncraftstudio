/** G2-400 — discover the odd/even sum rules (T2, 2.OA.C.3 / 3.OA.D.9). Odd & Even maker, 2026-11-01. See types/_shared/odd-more.js. */
'use strict';
const { makeOddMoreType } = require('../_shared/odd-more.js');

module.exports = makeOddMoreType({
  id: 'G2-400', slug: 'odd-even-discover-the-rule', mode: 'rule', gradeBand: 'G2',
  i18n: { en: { title: "Odd and Even: Find the Rule", instruction: "Add each pair and circle odd or even. Then circle the rule that is always true." } },
});

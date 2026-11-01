/** G2-473 — Same amount, different coins (T4, 2.MD.C.8). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'G2-473', slug: 'same-amount-different-coins', mode: 'same', gradeBand: 'G2',
  i18n: { en: { title: "Same Amount, Different Coins", instruction: "Draw a line from each purse on the left to the purse on the right that holds the same amount." } },
});

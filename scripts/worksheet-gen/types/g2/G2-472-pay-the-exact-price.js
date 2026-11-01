/** G2-472 — Make the amount: pay the exact price (T1, 2.MD.C.8). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'G2-472', slug: 'pay-the-exact-price', mode: 'pay', gradeBand: 'G2',
  i18n: { en: { title: "Pay the Exact Price", instruction: "Circle coins that make each price exactly." } },
});

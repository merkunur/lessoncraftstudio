/** G3-474 — Count bills (notes) and coins, written the way the country writes money (T5). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'G3-474', slug: 'count-bills-and-coins', mode: 'notes', gradeBand: 'G23',
  i18n: { en: { title: "Count Bills and Coins", instruction: "Count the bills and coins. Write the total amount." } },
});

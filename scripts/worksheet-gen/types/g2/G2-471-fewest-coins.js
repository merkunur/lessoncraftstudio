/** G2-471 — Fewest coins (T2, 2.MD.C.8). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'G2-471', slug: 'fewest-coins', mode: 'fewest', gradeBand: 'G2',
  i18n: { en: { title: "Fewest Coins", instruction: "Make each amount with as few coins as you can. Write how many of each coin you need." } },
});

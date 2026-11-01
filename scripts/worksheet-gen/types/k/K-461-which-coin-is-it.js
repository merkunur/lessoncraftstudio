/** K-461 — Which coin is it? (T3, 1.MD readiness / 2.MD.C.8). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'K-461', slug: 'which-coin-is-it', mode: 'name', gradeBand: 'K',
  i18n: { en: { title: "Which Coin Is It?", instruction: "Draw a line from each coin to its value." } },
});

/** G1-473 — Classroom store price tags and play money to cut out (T6, material). Money maker, 2026-11-01. See types/_shared/money-more.js. */
'use strict';
const { makeMoneyMoreType } = require('../_shared/money-more.js');

module.exports = makeMoneyMoreType({
  id: 'G1-473', slug: 'classroom-store-price-tags', mode: 'shop', gradeBand: 'G1',
  i18n: { en: { title: "Classroom Store: Price Tags and Play Money", instruction: "Cut out the price tags and the play money. Play store!" } },
});

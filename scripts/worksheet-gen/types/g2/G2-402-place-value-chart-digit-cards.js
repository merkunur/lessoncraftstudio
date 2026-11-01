/** G2-402 — place-value chart with digit cards to cut out (T2, material). Place Value & Rounding maker, 2026-11-01. See types/_shared/pv-more.js. */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = makePvMoreType({
  id: 'G2-402', slug: 'place-value-chart-digit-cards', mode: 'chart', gradeBand: 'G2',
  i18n: { en: { title: "Place-Value Chart and Digit Cards", instruction: "Cut out the digit cards. Listen to a number and build it in the chart." } },
});

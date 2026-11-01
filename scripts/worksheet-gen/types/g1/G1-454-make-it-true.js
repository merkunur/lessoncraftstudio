/** G1-454 — make it true: write a number that fits (T3, 1.NBT.B.3 / 2.NBT.A.4). Compare Numbers & Groups maker, 2026-11-01. See types/_shared/compare-more.js. */
'use strict';
const { makeCompareMoreType } = require('../_shared/compare-more.js');

module.exports = makeCompareMoreType({
  id: 'G1-454', slug: 'make-it-true', mode: 'between', gradeBand: 'G1',
  i18n: { en: { title: "Make It True", instruction: "Write a number in the box that makes it true. Many numbers can be right." } },
});

/** G2-404 — read blocks with more than nine of a kind (T4, 2.NBT.A.1 / 2.NBT.B.7). Place Value & Rounding maker, 2026-11-01. See types/_shared/pv-more.js. */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = makePvMoreType({
  id: 'G2-404', slug: 'more-than-nine-blocks', mode: 'overflow', gradeBand: 'G2',
  i18n: { en: { title: "More Than Nine of a Kind", instruction: "Count the blocks. Ten ones make a ten. Write the number." } },
});

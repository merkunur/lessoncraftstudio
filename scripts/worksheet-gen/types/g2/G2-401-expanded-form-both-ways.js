/** G2-401 — expanded form both ways (T1, 1.NBT.B.2 / 2.NBT.A.3). Place Value & Rounding maker, 2026-11-01. See types/_shared/pv-more.js. */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = makePvMoreType({
  id: 'G2-401', slug: 'expanded-form-both-ways', mode: 'expanded', gradeBand: 'G2',
  i18n: { en: { title: "Expanded Form Both Ways", instruction: "Put the parts together, or break the number into hundreds, tens and ones. Write the numbers in the boxes." } },
});

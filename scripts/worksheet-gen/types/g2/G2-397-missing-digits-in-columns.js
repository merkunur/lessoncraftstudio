/** G2-397 — the missing digit in a column sum (T8, 2.NBT.B.5-7 / 3.NBT.A.2). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G2-397', slug: 'missing-digits-in-columns', mode: 'digit', gradeBand: 'G2',
  i18n: { en: { title: "Missing Digits", instruction: "Find the missing digit. Write it in the dashed box so the sum is right." } },
});

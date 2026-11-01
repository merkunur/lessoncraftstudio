/** G1-446 — tens and ones without columns (T5, 1.NBT.C.4-6 / 2.NBT.B.5). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-446', slug: 'mental-math-to-100', mode: 'mental100', gradeBand: 'G1',
  i18n: { en: { title: "Mental Math to 100", instruction: "Solve each problem in your head. Think of the tens and the ones. Write the answer in the box." } },
});

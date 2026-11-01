/** G1-440 — number bonds of 100: tens, fives, any two numbers (T3, 1.NBT.C.6 / 2.NBT.B.5). Number Bonds maker, 2026-11-01. See types/_shared/number-bond-more.js. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');

module.exports = makeBondMoreType({
  id: 'G1-440', slug: 'number-bonds-to-100', mode: 'hundred', gradeBand: 'G1',
  i18n: { en: { title: "Number Bonds to 100", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
});

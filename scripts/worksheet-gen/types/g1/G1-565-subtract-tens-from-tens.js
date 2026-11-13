/** G1-565 — Subtract Tens from Tens (Year pages E, 2026-11-13; 1.NBT.C.6): ten-rods to cross out and the sentence
 *  50 − 20 = □ (whole tens only). Level 1 from 20 to 50, level 2 from 30 to 90, level 3 from 50 to 90.
 *  A face of the base-ten factory, mode count-tens (G2-205 subtracts numbers with ones from two block pictures). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-565', slug: 'subtract-tens-from-tens', mode: 'count-tens', gradeBand: 'G1',
  levels: { 'count-tens': { 1: { lo: 2, hi: 5, minus: true }, 2: { lo: 3, hi: 9, minus: true }, 3: { lo: 5, hi: 9, minus: true } } },
  i18n: { en: { title: 'Subtract Tens from Tens', instruction: 'Cross out the ten-rods you take away. Write the number that is left.' } },
});

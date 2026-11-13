/** G1-563 — Count the Tens: 10 to 90 (Year pages E, 2026-11-13; 1.NBT.B.2c): ten-rods only; the child writes how many
 *  tens and the number. The frame shows a small rod in place of the times sign of G1-122 (no multiplication in
 *  Grade 1). Level 1 one to five rods, level 2 two to nine, level 3 four to nine. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-563', slug: 'count-the-tens', mode: 'count-tens', gradeBand: 'G1',
  levels: { 'count-tens': { 1: { lo: 1, hi: 5, frame: 'icons' }, 2: { lo: 2, hi: 9, frame: 'icons' }, 3: { lo: 4, hi: 9, frame: 'icons' } } },
  i18n: { en: { title: 'Count the Tens: 10 to 90', instruction: 'Count the ten-rods. Write how many tens there are. Then write the number.' } },
});

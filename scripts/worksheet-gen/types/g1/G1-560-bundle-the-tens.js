/** G1-560 — bundle loose ones into SEVERAL tens (1.NBT.B.2): ring every group of ten, write tens and ones.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/base-ten-tasks.js mode 'regroup' with its own range
 *  (G2-206 bundles ONE ten of 11 to 19). Level 1 21-39 · 2 31-59 · 3 51-79. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-560', slug: 'bundle-the-tens', mode: 'regroup', gradeBand: 'G1',
  levels: { regroup: { 1: { lo: 21, hi: 39, frame: 'icons' }, 2: { lo: 31, hi: 59, frame: 'icons' }, 3: { lo: 51, hi: 79, frame: 'icons' } } },
  i18n: { en: { title: "Bundle Ones into Tens", instruction: "Circle groups of 10 ones. Write how many tens and how many ones are left." } },
});

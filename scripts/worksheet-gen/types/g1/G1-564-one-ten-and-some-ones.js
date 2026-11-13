/** G1-564 — Teen Numbers: One Ten and Some Ones (Year pages E, 2026-11-13; 1.NBT.B.2b): exactly ONE ten-rod and one to
 *  nine ones; the frame reads 1 rod, □ ones, = □. Level 1 11 to 15, level 2 11 to 19, level 3 14 to 19 on five rows.
 *  A face of the base-ten factory, mode read (G1-120 reads any two-digit number and has no frame). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-564', slug: 'one-ten-and-some-ones', mode: 'read', gradeBand: 'G1',
  difficulty: { 1: { maxH: 0, maxT: 1, rows: 4, unit: 13 }, 2: { maxH: 0, maxT: 1, rows: 4, unit: 13 }, 3: { maxH: 0, maxT: 1, rows: 5, unit: 13 } },
  levels: { read: { 1: { lo: 1, hi: 5, frame: 'teen' }, 2: { lo: 1, hi: 9, frame: 'teen' }, 3: { lo: 4, hi: 9, frame: 'teen' } } },
  i18n: { en: { title: 'Teen Numbers: One Ten and Some Ones', instruction: 'Look at the ten-rod and the ones. Write how many ones there are. Then write the number.' } },
});

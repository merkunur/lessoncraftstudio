/** G3-482 — Times Table Tricks: 6 and 7 (Year pages J, 2026-11-13; 3.OA.B.5): the tables of 6 and 7 built from the
 *  table of 5: a × 6 = a × 5 + a (one more group), a × 7 = a × 5 + a × 2 (two more groups). The child fills the boxes of
 *  each chain. Level 1 the table of 6 (eight chains, every factor 2 to 9 once); level 2 the tables of 6 and 7 in turn;
 *  level 3 the table of 7. A face of the strategy chains (G3-410 has the tables of 4, 5, 8 and 9). */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');
module.exports = makeMdMoreType({
  id: 'G3-482', slug: 'times-table-tricks-6-and-7', mode: 'chain', gradeBand: 'G3',
  levels: { 1: { kinds: ['x6'] }, 2: { kinds: ['x6', 'x7'] }, 3: { kinds: ['x7'] } },
  i18n: { en: { title: 'Times Table Tricks: 6 and 7', instruction: 'Use the trick on each line. Fill in the boxes one by one.' } },
});

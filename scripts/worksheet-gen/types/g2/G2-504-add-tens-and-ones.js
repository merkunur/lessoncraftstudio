/** G2-504 — Add Tens and Ones (Year pages K, 2026-11-13; 2.NBT.B.5): two two-digit numbers added place by place, the
 *  steps written down: 47 + 26 -> 40 + 20 = 60, 7 + 6 = 13, 60 + 13 = 73. Level 1 has no new ten (34 + 25), level 2
 *  always a new ten; both print the split. Level 3 mixes them and the child writes the split too. No sum above 99. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');
module.exports = makeAddSubMoreType({
  id: 'G2-504', slug: 'add-tens-and-ones', mode: 'partial', gradeBand: 'G2',
  i18n: { en: { title: 'Add Tens and Ones', instruction: 'Add the tens. Add the ones. Then add the two sums.' } },
});

/** G2-205 — Two-digit subtraction with blocks (no borrowing). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-205', slug: 'subtraction-with-base-ten-blocks', mode: 'sub', gradeBand: 'G23',
  i18n: { en: { title: 'Take Away the Blocks', instruction: 'Subtract the second group from the first. Write the answer.' } },
});

/** G2-203/204 — Two-digit addition with blocks (no regrouping). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-203', slug: 'addition-with-base-ten-blocks', mode: 'add', gradeBand: 'G23',
  i18n: { en: { title: 'Add the Blocks', instruction: 'Add the two block groups. Write the total.' } },
});

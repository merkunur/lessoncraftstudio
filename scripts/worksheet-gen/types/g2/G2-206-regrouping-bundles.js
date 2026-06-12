/** G2-206 — Regrouping: circle 10 ones to make a ten. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-206', slug: 'regrouping-ones-to-tens', mode: 'regroup', gradeBand: 'G23',
  i18n: { en: { title: 'Make a Ten!', instruction: 'Circle 10 ones to bundle a ten. Write how many tens and ones.' } },
});

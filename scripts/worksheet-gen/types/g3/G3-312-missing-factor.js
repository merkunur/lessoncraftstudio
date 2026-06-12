/** G3-312 — The Missing Factor (array-tasks factory, mode missing-factor) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-312', slug: 'missing-factor', mode: 'missing-factor',  gradeBand: 'G23',
  i18n: { en: { title: 'The Missing Factor', instruction: 'Look at the array. Write the missing factor.' } },
});

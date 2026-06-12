/** G3-311 — Times Families (array-tasks factory, mode fact-family) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-311', slug: 'multiplication-division-fact-family', mode: 'fact-family',  gradeBand: 'G23',
  i18n: { en: { title: 'Times Families', instruction: 'Use the array to finish all four number sentences.' } },
});

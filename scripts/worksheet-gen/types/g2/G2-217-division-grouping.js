/** G2-217 — How Many Groups? (array-tasks factory, mode group-rings) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-217', slug: 'division-as-grouping', mode: 'group-rings',  gradeBand: 'G23',
  i18n: { en: { title: 'How Many Groups?', instruction: 'The rings make equal groups. Write how many groups there are.' } },
});

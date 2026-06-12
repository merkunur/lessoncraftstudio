/** G2-209 — Add It Again (array-tasks factory, mode rep-add) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-209', slug: 'repeated-addition', mode: 'rep-add',  gradeBand: 'G23',
  i18n: { en: { title: 'Add It Again', instruction: 'Each ring holds the same amount. Finish the addition.' } },
});

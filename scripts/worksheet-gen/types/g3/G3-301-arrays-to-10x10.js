/** G3-301 — Big Arrays (array-tasks factory, mode count-array) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-301', slug: 'multiplication-arrays-g3', mode: 'count-array',  gradeBand: 'G23',
  i18n: { en: { title: 'Big Arrays', instruction: 'Count the rows of pictures. Write how many in all.' } },
});

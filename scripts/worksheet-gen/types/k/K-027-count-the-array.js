/** K-027 — Count the Array (array-tasks factory, mode count-array) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'K-027', slug: 'array-counting', mode: 'count-array',  gradeBand: 'K',
  i18n: { en: { title: 'Count the Array', instruction: 'Count the rows of pictures. Write how many in all.' } },
});

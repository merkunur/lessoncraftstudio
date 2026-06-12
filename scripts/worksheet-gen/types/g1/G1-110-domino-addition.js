/** G1-110 — Domino Math (array-tasks factory, mode domino-add) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G1-110', slug: 'domino-addition', mode: 'domino-add',  gradeBand: 'G1',
  i18n: { en: { title: 'Domino Math', instruction: 'Count both sides of the domino. Write the sum.' } },
});

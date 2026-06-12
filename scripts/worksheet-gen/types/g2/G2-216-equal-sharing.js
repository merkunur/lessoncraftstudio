/** G2-216 — Share It Fairly (array-tasks factory, mode share-bins) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-216', slug: 'equal-sharing', mode: 'share-bins',  gradeBand: 'G23',
  i18n: { en: { title: 'Share It Fairly', instruction: 'Share the pile equally into the bins. Write how many each gets.' } },
});

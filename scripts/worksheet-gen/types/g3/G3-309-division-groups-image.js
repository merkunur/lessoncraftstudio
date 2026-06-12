/** G3-309 — Divide It Up (array-tasks factory, mode share-bins) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-309', slug: 'division-equal-groups', mode: 'share-bins',  gradeBand: 'G23',
  i18n: { en: { title: 'Divide It Up', instruction: 'Share the pile equally into the bins. Write how many each gets.' } },
});

/** G2-238 — Each Picture Counts Double (graph-tasks factory, mode pict-read) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G2-238', slug: 'pictograph-scale-2', mode: 'pict-read', scale: 2, gradeBand: 'G23',
  i18n: { en: { title: 'Each Picture Counts Double', instruction: 'Each picture stands for 2! Write the real count for each row.' } },
});

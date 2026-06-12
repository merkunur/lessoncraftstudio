/** G3-333 — Each Picture Means 5 (graph-tasks factory, mode pict-read) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G3-333', slug: 'scaled-pictographs', mode: 'pict-read', scale: 5, gradeBand: 'G23',
  i18n: { en: { title: 'Each Picture Means 5', instruction: 'Each picture stands for 5! Write the real count for each row.' } },
});

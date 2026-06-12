/** G3-334 — Build the Graph (graph-tasks factory, mode bar-fill) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G3-334', slug: 'complete-the-bar-graph', mode: 'bar-fill',  gradeBand: 'G23',
  i18n: { en: { title: 'Build the Graph', instruction: 'Use the table. Color a bar for each value.' } },
});

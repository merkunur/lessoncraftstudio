/** G2-237 — Graph Detective (graph-tasks factory, mode bar-2step) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G2-237', slug: 'bar-graph-questions', mode: 'bar-2step',  gradeBand: 'G23',
  i18n: { en: { title: 'Graph Detective', instruction: 'Use the graph to solve both picture questions.' } },
});

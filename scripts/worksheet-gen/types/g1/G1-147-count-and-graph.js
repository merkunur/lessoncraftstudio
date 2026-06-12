/** G1-147 — Count and Graph (graph-tasks factory, mode pict-fill) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-147', slug: 'count-and-graph', mode: 'pict-fill',  
  i18n: { en: { title: 'Count and Graph', instruction: 'Read the counts. Color one box in the graph for each one.' } },
});

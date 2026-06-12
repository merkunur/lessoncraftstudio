/** G1-144 — The Tallest Bar (graph-tasks factory, mode bar-which) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-144', slug: 'bar-graph-tallest', mode: 'bar-which', which: 'most', 
  i18n: { en: { title: 'The Tallest Bar', instruction: 'Look at the bars. Circle the one with the most.' } },
});

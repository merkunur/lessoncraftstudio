/** G1-142 — Most of All (graph-tasks factory, mode pict-which) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-142', slug: 'pictograph-most', mode: 'pict-which', which: 'most', 
  i18n: { en: { title: 'Most of All', instruction: 'Look at the graph. Circle the one with the MOST.' } },
});

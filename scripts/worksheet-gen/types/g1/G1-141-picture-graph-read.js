/** G1-141 — Read the Picture Graph (graph-tasks factory, mode pict-read) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-141', slug: 'picture-graph', mode: 'pict-read',  
  i18n: { en: { title: 'Read the Picture Graph', instruction: 'Count the pictures in each row. Write the numbers.' } },
});

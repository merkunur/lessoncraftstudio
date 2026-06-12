/** G1-143 — Read the Bar Graph (graph-tasks factory, mode bar-read) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-143', slug: 'reading-bar-graphs', mode: 'bar-read',  
  i18n: { en: { title: 'Read the Bar Graph', instruction: 'Read each bar. Write its number.' } },
});

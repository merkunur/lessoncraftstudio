/** G2-240 — Read the Line Plot (graph-tasks factory, mode lineplot) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G2-240', slug: 'line-plots', mode: 'lineplot',  
  i18n: { en: { title: 'Read the Line Plot', instruction: 'Count the X marks above each number. Write how many.' } },
});

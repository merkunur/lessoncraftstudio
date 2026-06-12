/** G1-146 — Sort and Count (graph-tasks factory, mode table-sort) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-146', slug: 'data-sorting', mode: 'table-sort',  
  i18n: { en: { title: 'Sort and Count', instruction: 'Count each kind in the strip. Write the totals in the table.' } },
});

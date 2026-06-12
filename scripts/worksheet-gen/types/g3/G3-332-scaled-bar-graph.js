/** G3-332 — Big Scale Bars (graph-tasks factory, mode bar-read) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G3-332', slug: 'scaled-bar-graphs', mode: 'bar-read', scale: 5, gradeBand: 'G23',
  i18n: { en: { title: 'Big Scale Bars', instruction: 'Careful — the scale counts by 5! Write the value of each bar.' } },
});

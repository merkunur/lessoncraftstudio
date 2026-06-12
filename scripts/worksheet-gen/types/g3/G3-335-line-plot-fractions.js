/** G3-335 — Halfway Marks (graph-tasks factory, mode lineplot) */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G3-335', slug: 'line-plots-with-fractions', mode: 'lineplot', fracLabels: true, gradeBand: 'G23',
  i18n: { en: { title: 'Halfway Marks', instruction: 'Count the X marks above each number. Write how many.' } },
});

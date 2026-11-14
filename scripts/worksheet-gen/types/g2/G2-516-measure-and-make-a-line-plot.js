/** G2-516 — Measure and Make a Line Plot (measure-units factory, mode plot-make; Year pages X, 2026-11-14) */
'use strict';
const { makeMeasureUnitsType } = require('../_shared/measure-units.js');
module.exports = makeMeasureUnitsType({
  id: 'G2-516', slug: 'measure-and-make-a-line-plot', mode: 'plot-make', gradeBand: 'G2',
  i18n: { en: { title: "Measure and Make a Line Plot", instruction: "The table shows the lengths of ten pencils. Write the missing numbers under the number line. Draw an X for each pencil. Then answer the questions." } },
});

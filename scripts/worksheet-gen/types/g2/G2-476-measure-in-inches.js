/** G2-476 — Measure in Inches (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'G2-476', slug: 'measure-in-inches', mode: 'inches', gradeBand: 'G2',
  i18n: { en: { title: "Measure in Inches", instruction: "Each object starts at 0. Write how many inches long it is." } },
});

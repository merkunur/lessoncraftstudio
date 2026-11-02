/** G2-477 — Which Unit? (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'G2-477', slug: 'which-unit', mode: 'unit', gradeBand: 'G2',
  i18n: { en: { title: "Which Unit?", instruction: "Which unit would you use to measure each one? Circle that unit." } },
});

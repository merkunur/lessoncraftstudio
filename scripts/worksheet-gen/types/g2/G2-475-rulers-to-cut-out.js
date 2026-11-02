/** G2-475 — Rulers to Cut Out (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'G2-475', slug: 'rulers-to-cut-out', mode: 'rulers', gradeBand: 'G2',
  i18n: { en: { title: "Rulers to Cut Out", instruction: "Print at actual size (100%). Cut out the rulers along the dashed lines." } },
});

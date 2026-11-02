/** G1-480 — Paper Clip Measuring (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'G1-480', slug: 'paper-clip-measuring', mode: 'clips', gradeBand: 'G1',
  i18n: { en: { title: "Paper Clip Measuring", instruction: "How many paper clips long is each object? Write the number." } },
});

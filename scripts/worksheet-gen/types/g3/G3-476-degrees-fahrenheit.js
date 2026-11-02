/** G3-476 — Degrees Fahrenheit (Measurement & Size maker, 2026-11-02). See types/_shared/measurement-more.js. */
'use strict';
const { makeMeasurementMoreType } = require('../_shared/measurement-more.js');

module.exports = makeMeasurementMoreType({
  id: 'G3-476', slug: 'degrees-fahrenheit', mode: 'fahrenheit', gradeBand: 'G3',
  i18n: { en: { title: "Degrees Fahrenheit", instruction: "Read each thermometer. Write the temperature in degrees Fahrenheit." } },
});

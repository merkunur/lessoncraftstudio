/** G3-345 — Hot or Cold? (measurement-tasks factory, mode thermometer) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'G3-345', slug: 'reading-a-thermometer', mode: 'thermometer', gradeBand: 'G23',
  i18n: { en: { title: 'Hot or Cold?', instruction: 'Read each thermometer. Write the temperature it shows.' } },
});

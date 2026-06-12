/** G3-346 — Cube Towers (measurement-tasks factory, mode volume-cubes) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'G3-346', slug: 'volume-with-unit-cubes', mode: 'volume-cubes', gradeBand: 'G23',
  i18n: { en: { title: 'Cube Towers', instruction: 'Count all the cubes in each tower. Write the total.' } },
});

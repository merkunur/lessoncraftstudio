/** G1-139 — Cube by Cube (measurement-tasks factory, mode cubes-measure) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'G1-139', slug: 'measuring-with-cubes', mode: 'cubes-measure', 
  i18n: { en: { title: 'Cube by Cube', instruction: 'Each object sits on unit squares. Count them and write the length.' } },
});

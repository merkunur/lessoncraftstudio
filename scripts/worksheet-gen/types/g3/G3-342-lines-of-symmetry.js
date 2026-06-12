/** G3-342 — How Many Mirror Lines? (geometry-tasks factory, mode symmetry-count) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-342', slug: 'lines-of-symmetry', mode: 'symmetry-count', 
  i18n: { en: { title: 'How Many Mirror Lines?', instruction: 'Write how many mirror lines each shape has.' } },
});

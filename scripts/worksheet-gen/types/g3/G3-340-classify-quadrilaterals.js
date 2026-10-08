/** G3-340 — Quad Squad (geometry-tasks factory, mode classify-quads) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-340', slug: 'classifying-quadrilaterals', mode: 'classify-quads', 
  i18n: { en: { title: 'Quad Squad', instruction: 'Is it a rectangle? Squares are rectangles too. Draw a line from each shape to the right box.' } },
});

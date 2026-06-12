/** G3-338 — Same Space, New Shape (geometry-tasks factory, mode same-area) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-338', slug: 'area-comparison', mode: 'same-area', 
  i18n: { en: { title: 'Same Space, New Shape', instruction: 'Circle the rectangle that covers the SAME number of squares.' } },
});

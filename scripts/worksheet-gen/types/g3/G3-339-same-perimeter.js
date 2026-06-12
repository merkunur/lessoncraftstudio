/** G3-339 — Same Fence, New Yard (geometry-tasks factory, mode same-perimeter) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-339', slug: 'perimeter-comparison', mode: 'same-perimeter', 
  i18n: { en: { title: 'Same Fence, New Yard', instruction: 'Circle the rectangle with the SAME distance around.' } },
});

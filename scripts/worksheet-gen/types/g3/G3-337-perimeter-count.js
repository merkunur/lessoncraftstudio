/** G3-337 — Walk the Edge (geometry-tasks factory, mode perimeter) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-337', slug: 'perimeter', mode: 'perimeter', 
  i18n: { en: { title: 'Walk the Edge', instruction: 'Count the unit edges around each rectangle. Write the perimeter.' } },
});

/** G2-241 — Shape Sorter (geometry-tasks factory, mode sort-sides) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-241', slug: '2d-shapes-attributes', mode: 'sort-sides', 
  i18n: { en: { title: 'Shape Sorter', instruction: 'Draw a line from each shape to its number of sides.' } },
});

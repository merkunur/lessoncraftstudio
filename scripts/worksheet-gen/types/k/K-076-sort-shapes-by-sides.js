/** K-076 — Sort by Sides (geometry-tasks factory, mode sort-sides) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'K-076', slug: 'sorting-shapes', mode: 'sort-sides', 
  i18n: { en: { title: 'Sort by Sides', instruction: 'Draw a line from each shape to its number of sides.' } },
});

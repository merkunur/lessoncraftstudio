/** K-075 — Count the Sides (geometry-tasks factory, mode count-sides) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'K-075', slug: 'counting-sides-of-shapes', mode: 'count-sides', 
  i18n: { en: { title: 'Count the Sides', instruction: 'Count the sides of each shape. Write the number.' } },
});

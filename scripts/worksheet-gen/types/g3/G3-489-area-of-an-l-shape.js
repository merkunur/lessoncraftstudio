/** G3-489 — Area of an L-Shape (area-perimeter-more factory, mode lshape; Year pages U, 2026-11-14) */
'use strict';
const { makeAreaPerimeterType } = require('../_shared/area-perimeter-more.js');
module.exports = makeAreaPerimeterType({
  id: 'G3-489', slug: 'area-of-an-l-shape', mode: 'lshape',
  i18n: { en: { title: "Area of an L-Shape", instruction: "Cut each shape into two rectangles with one straight line. Find the area of each part. Then add the two areas." } },
});

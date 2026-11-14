/** G3-488 — Area of a Rectangle: Multiply the Side Lengths (area-perimeter-more factory, mode sides; Year pages U, 2026-11-14) */
'use strict';
const { makeAreaPerimeterType } = require('../_shared/area-perimeter-more.js');
module.exports = makeAreaPerimeterType({
  id: 'G3-488', slug: 'area-of-a-rectangle-multiply-the-sides', mode: 'sides',
  i18n: { en: { title: "Area of a Rectangle: Multiply the Side Lengths", instruction: "Multiply the two side lengths. Write the equation and the area." } },
});

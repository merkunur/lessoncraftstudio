/** G3-490 — Find the Missing Side (area-perimeter-more factory, mode missing-side; Year pages U, 2026-11-14) */
'use strict';
const { makeAreaPerimeterType } = require('../_shared/area-perimeter-more.js');
module.exports = makeAreaPerimeterType({
  id: 'G3-490', slug: 'find-the-missing-side', mode: 'missing-side',
  i18n: { en: { title: "Perimeter: Find the Missing Side", instruction: "The perimeter of each shape is given. Write an equation with n for the missing side. Then find n." } },
});

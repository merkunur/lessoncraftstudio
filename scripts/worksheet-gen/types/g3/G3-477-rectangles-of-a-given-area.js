/** G3-477 — Rectangles of a Given Area (Shapes & Geometry maker, 2026-11-02). See types/_shared/geometry-more.js. */
'use strict';
const { makeGeometryMoreType } = require('../_shared/geometry-more.js');

module.exports = makeGeometryMoreType({
  id: 'G3-477', slug: 'rectangles-of-a-given-area', mode: 'area-draw', gradeBand: 'G3',
  i18n: { en: { title: "Draw Rectangles by Area", instruction: "Draw a rectangle on each grid with the area shown. Count the squares inside to check." } },
});

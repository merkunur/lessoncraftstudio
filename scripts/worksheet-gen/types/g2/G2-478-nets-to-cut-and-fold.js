/** G2-478 — Nets to Cut and Fold (Shapes & Geometry maker, 2026-11-02): a die, a box, a pyramid. See types/_shared/geometry-more.js. */
'use strict';
const { makeGeometryMoreType } = require('../_shared/geometry-more.js');

module.exports = makeGeometryMoreType({
  id: 'G2-478', slug: 'nets-to-cut-and-fold', mode: 'net', gradeBand: 'G2',
  i18n: { en: { title: "Nets to Cut and Fold", instruction: "Cut on the solid lines. Fold on the dashed lines. Glue the gray tabs to make a die. Then check: the dots on opposite faces add up to 7." } },
});

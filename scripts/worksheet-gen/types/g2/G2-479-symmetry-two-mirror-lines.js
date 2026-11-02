/** G2-479 — Symmetry with Two Mirror Lines (Symmetry & Grid Copy maker, 2026-11-02): types/_shared/symmetry-more.js. */
'use strict';
const { makeSymmetryMoreType } = require('../_shared/symmetry-more.js');

module.exports = makeSymmetryMoreType({
  id: 'G2-479', slug: 'symmetry-two-mirror-lines', mode: 'two-axis', gradeBand: 'G2',
  i18n: { en: { title: "Symmetry with Two Mirror Lines", instruction: "Each picture has two mirror lines. One quarter is colored. Color the other three quarters so the picture matches across both lines." } },

});

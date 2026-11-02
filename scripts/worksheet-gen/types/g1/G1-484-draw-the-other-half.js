/** G1-484 — Draw the Other Half (Symmetry & Grid Copy maker, 2026-11-02): types/_shared/symmetry-more.js. */
'use strict';
const { makeSymmetryMoreType } = require('../_shared/symmetry-more.js');

module.exports = makeSymmetryMoreType({
  id: 'G1-484', slug: 'draw-the-other-half', mode: 'draw-half', gradeBand: 'G1',
  i18n: { en: { title: "Draw the Other Half", instruction: "Only half of the picture is drawn. Draw the other half on the other side of the line so it mirrors the first half, square by square." } },

});

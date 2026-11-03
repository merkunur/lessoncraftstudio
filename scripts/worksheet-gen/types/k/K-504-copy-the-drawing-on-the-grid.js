/** K-504 — Copy the Drawing on the Grid (Symmetry & Grid Copy maker 2026-11-02, NEW-TEMPLATES §21; types/_shared/grid-copy-more.js mode 'art'). */
'use strict';
const { makeGridCopyMoreType } = require('../_shared/grid-copy-more.js');
module.exports = makeGridCopyMoreType({
  id: 'K-504', slug: 'copy-the-drawing-on-the-grid', mode: 'art', gradeBand: 'K',
  i18n: { en: { title: 'Copy the Drawing on the Grid', instruction: 'Copy the drawing onto the empty grid, one square at a time: look at what each square holds and draw the same in its twin square.' } },
});

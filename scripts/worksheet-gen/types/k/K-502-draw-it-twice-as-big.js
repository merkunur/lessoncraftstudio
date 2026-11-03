/** K-502 — Draw It Twice as Big (Symmetry & Grid Copy maker 2026-11-02, NEW-TEMPLATES §21; types/_shared/grid-copy-more.js mode 'bigger'). */
'use strict';
const { makeGridCopyMoreType } = require('../_shared/grid-copy-more.js');
module.exports = makeGridCopyMoreType({
  id: 'K-502', slug: 'draw-it-twice-as-big', mode: 'bigger', gradeBand: 'G2',
  i18n: { en: { title: 'Draw It Twice as Big', instruction: 'Look at the picture on the small grid. Color the same squares on the big grid, where every square is twice as big.' } },
});

/** K-503 — Turn the Picture (Symmetry & Grid Copy maker 2026-11-02, NEW-TEMPLATES §21; types/_shared/grid-copy-more.js mode 'turn'). */
'use strict';
const { makeGridCopyMoreType } = require('../_shared/grid-copy-more.js');
module.exports = makeGridCopyMoreType({
  id: 'K-503', slug: 'turn-the-picture', mode: 'turn', gradeBand: 'G2',
  i18n: { en: { title: 'Turn and Flip the Picture', instruction: 'Copy each picture onto the empty grid turned a quarter turn to the right, the way the arrow shows.' } },
});

/** K-680 — Author’s Chair (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-680', slug: 'authors-chair', mode: 'chair', exerciseType: 'sentence-building',
  i18n: { en: { title: "Author’s Chair", instruction: "In the author’s chair, a writer shares, listens, and adds a detail." } },
});

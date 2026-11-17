/** K-674 — My Favorite and Why (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-674', slug: 'my-favorite-and-why', mode: 'myfav', exerciseType: 'sentence-building',
  i18n: { en: { title: "My Favorite and Why", instruction: "Write your opinion: tell what you like best and why." } },
});

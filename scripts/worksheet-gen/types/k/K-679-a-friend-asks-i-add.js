/** K-679 — A Friend Asks, I Add (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-679', slug: 'a-friend-asks-i-add', mode: 'ask', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "A Friend Asks, I Add", instruction: "A friend’s question helps a writer add a detail." } },
});

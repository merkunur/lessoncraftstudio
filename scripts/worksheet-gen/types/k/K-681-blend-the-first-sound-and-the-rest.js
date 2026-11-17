/** K-681 — Blend the First Sound and the Rest (onset-rime-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeOnsetRimeKType } = require('../_shared/onset-rime-k.js');
module.exports = makeOnsetRimeKType({
  id: 'K-681', slug: 'blend-the-first-sound-and-the-rest', mode: 'blend', exerciseType: 'phonological-awareness',
  i18n: { en: { title: "Blend the First Sound and the Rest", instruction: "Blend the first sound and the rest to make a word." } },
});

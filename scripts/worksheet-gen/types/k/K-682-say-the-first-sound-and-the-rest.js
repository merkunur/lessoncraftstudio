/** K-682 — Say the First Sound and the Rest (onset-rime-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeOnsetRimeKType } = require('../_shared/onset-rime-k.js');
module.exports = makeOnsetRimeKType({
  id: 'K-682', slug: 'say-the-first-sound-and-the-rest', mode: 'split', exerciseType: 'phonological-awareness',
  i18n: { en: { title: "Say the First Sound and the Rest", instruction: "You can break a word into its first sound and the rest." } },
});

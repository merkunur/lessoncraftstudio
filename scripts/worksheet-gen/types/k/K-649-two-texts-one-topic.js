/** K-649 — Two Texts, One Topic (two-texts-k factory; English literacy year 2026-11-16; RI.K.9 what two texts on one topic share and what only one tells) */
'use strict';
const { makeTwoTextsKType } = require('../_shared/two-texts-k.js');
module.exports = makeTwoTextsKType({
  id: 'K-649', slug: 'two-texts-one-topic',
  i18n: { en: { title: "Two Texts, One Topic", instruction: "Listen to the two texts and read along. In each box, draw one thing: something only the first text tells about, something both texts tell about, and something only the second text tells about." } },
});

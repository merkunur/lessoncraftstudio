/** G2-551 — Adjective or Adverb? (L.2.1.e; word-choice-g2 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWordChoiceType } = require('../_shared/word-choice-g2.js');
module.exports = makeWordChoiceType({
  id: 'G2-551', slug: 'adjective-or-adverb', mode: 'adjadv', exerciseType: 'word-classes',
  i18n: { en: { title: "Adjective or Adverb?", instruction: "An adjective tells about a noun. An adverb tells about a verb: how it is done." } },
});

/** G2-549 — Describing Words in Real Life (L.2.5.a; word-choice-g2 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWordChoiceType } = require('../_shared/word-choice-g2.js');
module.exports = makeWordChoiceType({
  id: 'G2-549', slug: 'describing-words-in-real-life', mode: 'reallife', exerciseType: 'word-classes',
  i18n: { en: { title: "Describing Words in Real Life", instruction: "Describing words tell what real things are like: a warm hat, a cold drink." } },
});

/** G3-579 — Two Texts on One Topic (day 1 of the lesson Two texts on one topic, RI.3.9) (comparing-texts-g3 factory; English literacy year 2026-11-19) */
'use strict';
const { makeComparingTextsG3Type } = require('../_shared/comparing-texts-g3.js');
module.exports = makeComparingTextsG3Type({
  id: 'G3-579', slug: 'two-texts-on-one-topic', mode: 'textsort', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Two Texts on One Topic", instruction: "Some facts are in one text, and some are in both texts." } },
});

/** G3-578 — Compare Two Stories (day 2 of the lesson Two books by one author, RL.3.9) (comparing-texts-g3 factory; English literacy year 2026-11-19) */
'use strict';
const { makeComparingTextsG3Type } = require('../_shared/comparing-texts-g3.js');
module.exports = makeComparingTextsG3Type({
  id: 'G3-578', slug: 'compare-two-stories', mode: 'storychart', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Compare Two Stories", instruction: "Compare the setting, problem, solution, and lesson of each story." } },
});

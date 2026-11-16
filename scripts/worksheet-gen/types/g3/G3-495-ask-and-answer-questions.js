/** G3-495 — Ask and Answer (info-text-g3 factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3Type } = require('../_shared/info-text-g3.js');
module.exports = makeInfoText3Type({
  id: 'G3-495', slug: 'ask-and-answer-questions', mode: 'ask',
  i18n: { en: { title: "Ask and Answer", instruction: "Read the text. Each sentence in a box is from the text. Write the question that the sentence answers. The first word is given." } },
});

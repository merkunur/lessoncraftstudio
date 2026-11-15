/** K-645 — Find the Facts (fact-text-k factory; English literacy year 2026-11-15; RI.K.1 key details of a fact text) */
'use strict';
const { makeFactTextKType } = require('../_shared/fact-text-k.js');
module.exports = makeFactTextKType({
  id: 'K-645', slug: 'find-the-facts', mode: 'facts',
  i18n: { en: { title: 'Find the Facts', instruction: 'Listen to the text and read along. Listen to each question. Draw the answer in the box.' } },
});

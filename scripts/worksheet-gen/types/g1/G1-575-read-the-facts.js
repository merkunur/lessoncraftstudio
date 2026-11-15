/** G1-575 — Read the Facts (info-text factory; English literacy year 2026-11-15; RI.1.1 key details of an information text) */
'use strict';
const { makeInfoTextType } = require('../_shared/info-text.js');
module.exports = makeInfoTextType({
  id: 'G1-575', slug: 'read-the-facts', mode: 'details',
  i18n: { en: { title: 'Read the Facts', instruction: 'Read the text. Write the answer to each question. Finish the sentence.' } },
});

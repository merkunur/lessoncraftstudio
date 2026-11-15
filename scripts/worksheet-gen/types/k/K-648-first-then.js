/** K-648 — First, Then (fact-text-k factory; English literacy year 2026-11-15; RI.K.3 the connection between two events of a text) */
'use strict';
const { makeFactTextKType } = require('../_shared/fact-text-k.js');
module.exports = makeFactTextKType({
  id: 'K-648', slug: 'first-then', mode: 'change',
  i18n: { en: { title: 'First, Then', instruction: 'Listen to the text and read along. Answer the question. Draw the first thing in the First box and the next thing in the Then box.' } },
});

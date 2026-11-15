/** K-647 — Pictures That Teach (fact-text-k factory; English literacy year 2026-11-15; RI.K.7 the picture that goes with a sentence) */
'use strict';
const { makeFactTextKType } = require('../_shared/fact-text-k.js');
module.exports = makeFactTextKType({
  id: 'K-647', slug: 'pictures-that-teach', mode: 'pictures',
  i18n: { en: { title: 'Pictures That Teach', instruction: 'Listen to each sentence and read along. Draw a line from each sentence to the picture that goes with it.' } },
});

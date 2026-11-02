/** K-468 — Trace the Number Words (Number Tracing maker, 2026-11-02). See types/_shared/number-tracing-more.js. */
'use strict';
const { makeNumberTracingMoreType } = require('../_shared/number-tracing-more.js');

module.exports = makeNumberTracingMoreType({
  id: 'K-468', slug: 'trace-the-number-words', mode: 'words',
  i18n: { en: { title: "Trace the Number Words", instruction: "Look at the number. Trace the number word, then write it yourself on the empty lines." } },
});

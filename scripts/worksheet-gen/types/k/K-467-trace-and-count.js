/** K-467 — Trace and Count (Number Tracing maker, 2026-11-02): each number with that many pictures. See types/_shared/number-tracing-more.js. */
'use strict';
const { makeNumberTracingMoreType } = require('../_shared/number-tracing-more.js');

module.exports = makeNumberTracingMoreType({
  id: 'K-467', slug: 'trace-and-count', mode: 'count',
  i18n: { en: { title: "Count and Trace", instruction: "Count the pictures in each row. Trace the number that tells how many." } },
});

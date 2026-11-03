/** K-518 — Number Formation Poster (Number Tracing maker, 2026-11-02, NEW-TEMPLATES §20 T5; K.CC.A.3): the classroom wall
 *  chart — big numerals in the locale's school form with their start dots, arrows and stroke-order numbers. Level 1 the
 *  digits 0-9 · 2 1-10 with dots for each quantity · 3 11-20. types/_shared/number-tracing-more.js, mode 'poster'. */
'use strict';
const { makeNumberTracingMoreType } = require('../_shared/number-tracing-more.js');
module.exports = makeNumberTracingMoreType({
  id: 'K-518', slug: 'number-formation-poster', mode: 'poster',
  i18n: { en: { title: "How We Write Numbers", instruction: "Start at the dot and follow the arrows. The small numbers show which line comes first." } },
});

/** K-517 — Trace the Numbers 1 to 100 (Number Tracing maker, 2026-11-02, NEW-TEMPLATES §20 T3; K.CC.A.3 → 1.NBT.A.1):
 *  tens rows of ten numbers in boxed cells, in the locale's school form — the writing side of the hundreds chart. Level 1
 *  1-30 (each row dashed, then an empty row to write it again) · 2 1-50, every number dashed · 3 51-100, every other
 *  number dashed and the ones between left empty to write. types/_shared/number-tracing-more.js, mode 'grid'. */
'use strict';
const { makeNumberTracingMoreType } = require('../_shared/number-tracing-more.js');
module.exports = makeNumberTracingMoreType({
  id: 'K-517', slug: 'trace-numbers-to-100', mode: 'grid',
  i18n: { en: { title: "Trace the Numbers 1 to 100", instruction: "Trace the dashed numbers. In every empty box, write the number that belongs there." } },
});

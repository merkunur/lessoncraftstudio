/** G3-410 — strategy chains: double-double, half of ×10, ×10 minus one group (T5, 3.OA.B.5 / 3.OA.D.9). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G3-410', slug: 'times-table-strategy-chains', mode: 'chain', gradeBand: 'G3',
  i18n: { en: { title: "Times Table Tricks", instruction: "Use the trick on each line. Fill in the boxes one by one." } },
});

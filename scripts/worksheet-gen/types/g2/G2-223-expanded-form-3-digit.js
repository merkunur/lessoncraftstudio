/** G2-223 — Expanded form (3-digit) ↔ blocks. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-223', slug: 'expanded-form-3-digit', mode: 'expanded', gradeBand: 'G23',
  difficulty: { 1: { maxH: 3, minH: 1, maxT: 5, rows: 3, unit: 8 }, 2: { maxH: 6, minH: 1, maxT: 9, rows: 3, unit: 8 }, 3: { maxH: 9, minH: 1, maxT: 9, rows: 4, unit: 7 } },
  i18n: { en: { title: 'Hundreds, Tens, Ones', instruction: 'Look at the blocks. Circle the matching expanded form.' } },
});

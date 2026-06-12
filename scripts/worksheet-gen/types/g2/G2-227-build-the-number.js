/** G2-227 — Build the number from H/T/O blocks (which set?). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G2-227', slug: 'building-numbers-blocks', mode: 'choose', gradeBand: 'G23',
  difficulty: { 1: { maxH: 2, minH: 1, maxT: 4, rows: 3, unit: 6 }, 2: { maxH: 3, minH: 1, maxT: 6, rows: 3, unit: 5 }, 3: { maxH: 4, minH: 1, maxT: 9, rows: 3, unit: 5 } },
  i18n: { en: { title: 'Match the Blocks', instruction: 'Circle the blocks that show the number.' } },
});

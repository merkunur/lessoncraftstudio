/** G1-121 — Show the number in base-ten blocks (which set?). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-121', slug: 'base-ten-blocks-choose', mode: 'choose',
  difficulty: { 1: { maxH: 0, maxT: 5, rows: 3, unit: 8 }, 2: { maxH: 0, maxT: 9, rows: 3, unit: 8 }, 3: { maxH: 0, maxT: 9, rows: 4, unit: 7 } },
  i18n: { en: { title: 'Build It Right', instruction: 'Circle the blocks that show the number.' } },
});

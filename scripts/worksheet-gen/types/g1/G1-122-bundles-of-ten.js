/** G1-122 — Bundles of 10: how many tens? */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-122', slug: 'counting-by-tens-rods', mode: 'count-tens',
  i18n: { en: { title: 'How Many Tens?', instruction: 'Count the ten-rods. Finish the number sentence.' } },
});

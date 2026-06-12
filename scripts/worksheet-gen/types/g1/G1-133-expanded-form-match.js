/** G1-133 — Expanded form match (40+3 ↔ 43). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-133', slug: 'expanded-form', mode: 'expanded',
  i18n: { en: { title: 'Stretch the Number', instruction: 'Look at the blocks. Circle the matching expanded form.' } },
});

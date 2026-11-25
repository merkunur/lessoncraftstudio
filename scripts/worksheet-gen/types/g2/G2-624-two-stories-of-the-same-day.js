/** G2-624 — Two Stories of the Same Day (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-051 (change of G3-579)). dk-social-2.js mode 's2-accounts'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-624', slug: 'two-stories-of-the-same-day', mode: 's2-accounts', exerciseType: 'reading-comprehension',
  difficulty: {"1":{"short":true},"2":{},"3":{"why":true}},
  i18n: { en: { title: "Two Stories of the Same Day", instruction: "Read both stories. Underline what both stories say in blue and what only one story says in orange." } },
});

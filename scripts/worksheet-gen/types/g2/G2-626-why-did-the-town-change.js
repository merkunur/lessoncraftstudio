/** G2-626 — Why Did the Town Change? (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-053 (change of G2-527)). dk-social-2.js mode 's2-town'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-626', slug: 'why-did-the-town-change', mode: 's2-town', exerciseType: 'reading-comprehension',
  difficulty: {"1":{"n":2},"2":{"n":3},"3":{"n":3,"why":true}},
  i18n: { en: { title: "Why Did the Town Change?", instruction: "Read the story of the town. Circle the most likely reason it grew. Copy the sentence that says the town grew and tells why." } },
});

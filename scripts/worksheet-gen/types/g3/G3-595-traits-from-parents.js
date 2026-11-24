/** G3-595 — Traits from Parents (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-106). dk-g3.js mode 'g3-traits'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-595', slug: 'traits-from-parents', mode: 'g3-traits', exerciseType: 'animal-life-cycles',
  difficulty: {"1":{"traits":["fur","ears"]},"2":{"traits":["fur","ears","spots"],"questions":true},"3":{"traits":["fur","ears","spots"],"cats":true}},
  i18n: { en: { title: "Traits from Parents", instruction: "Circle the traits of each dog. Then answer the questions." } },
});

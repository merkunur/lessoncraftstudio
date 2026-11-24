/** G2-584 — Describe Materials (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-061). dk-g2.js mode 'g2-properties'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-584', slug: 'describe-materials', mode: 'g2-properties', exerciseType: 'science-sort',
  difficulty: {"1":{"mats":4,"tests":2},"2":{"mats":6,"tests":4,"sort":true},"3":{"mats":6,"tests":4,"frame":true}},
  i18n: { en: { title: "Describe Materials", instruction: "Test each material and circle what you found. Then sort the materials two ways." } },
});

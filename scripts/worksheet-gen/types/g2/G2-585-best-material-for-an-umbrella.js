/** G2-585 — Best Material for an Umbrella (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-063). dk-g2.js mode 'g2-umbrella'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-585', slug: 'best-material-for-an-umbrella', mode: 'g2-umbrella', exerciseType: 'science-sort',
  difficulty: {"1":{"mats":3},"2":{"mats":5,"drops":true,"graph":true},"3":{"mats":5,"drops":true,"claim":true}},
  i18n: { en: { title: "Best Material for an Umbrella", instruction: "Test each roof. Write how many drops fell before it leaked and circle “wet” or “dry.” Then color the bar graph." } },
});

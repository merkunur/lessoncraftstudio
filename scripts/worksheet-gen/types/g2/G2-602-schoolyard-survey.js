/** G2-602 — Schoolyard Survey (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-085). dk-g2.js mode 'g2-survey'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-602', slug: 'schoolyard-survey', mode: 'g2-survey', exerciseType: 'habitats',
  difficulty: {"1":{},"2":{"tally":true},"3":{"tally":true,"graph":true}},
  i18n: { en: { title: "Schoolyard Survey", instruction: "Tally each animal and check each plant you find. Count the kinds in each square. Circle which square had more." } },
});

/** G1-670 — Prices at the Market (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-036). dk-social-1.js mode 's1-market'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-670', slug: 'prices-at-the-market', mode: 's1-market', exerciseType: 'money',
  difficulty: {"1":{"n":2},"2":{"n":3},"3":{"n":3}},
  i18n: { en: { title: "Prices at the Market", instruction: "Look at each price tag. Circle the coins that pay the price exactly. Then circle the one in each pair that costs more." } },
});

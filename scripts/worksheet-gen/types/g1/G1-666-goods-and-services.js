/** G1-666 — Goods and Services (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-034). dk-social-1.js mode 's1-goods'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-666', slug: 'goods-and-services', mode: 's1-goods', exerciseType: 'science-sort',
  difficulty: {"1":{"n":4},"2":{"n":8},"3":{"n":8,"map":true}},
  i18n: { en: { title: "Goods and Services", instruction: "Goods are things people make or grow. Services are work someone does for you. Color the box yellow for goods and green for services." } },
});

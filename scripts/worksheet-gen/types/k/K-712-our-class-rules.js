/** K-712 — Our Class Rules (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-001). dk-social-k.js mode 'sk-rules'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-712', slug: 'our-class-rules', mode: 'sk-rules', exerciseType: 'feelings',
  difficulty: {"1":{"pairs":2},"2":{"pairs":4},"3":{"pairs":4,"draw":true}},
  i18n: { en: { title: "Our Class Rules", instruction: "Look at the two pictures in each row. Circle the picture that follows a class rule. Cross out the one that does not." } },
});

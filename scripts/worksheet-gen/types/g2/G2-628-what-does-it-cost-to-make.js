/** G2-628 — What Does It Cost to Make? (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-055 (change of G2-291)). dk-social-2.js mode 's2-lemonade'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-628', slug: 'what-does-it-cost-to-make', mode: 's2-lemonade', exerciseType: 'money',
  difficulty: {"1":{"n":3,"hint":true},"2":{"n":4},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "What Does It Cost to Make?", instruction: "Circle what the children must buy and add the costs. Write what 10 cups bring in at each price. Circle the lowest price that brings in more than they must pay." } },
});

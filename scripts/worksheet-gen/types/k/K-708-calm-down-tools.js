/** K-708 — Calm-Down Tools (Batch K2, Daily Teaching System Stage D-5, 2026-11-23; health en-K unit 0 lesson 1 (NHES.8.2.1)). dk-k2.js mode 'k2-calm'. English only. */
'use strict';
const { makeK2Type } = require('../_shared/dk-k2.js');
module.exports = makeK2Type({
  id: 'K-708', slug: 'calm-down-tools', mode: 'k2-calm', exerciseType: 'feelings',
  difficulty: {"1":{"tools":1},"2":{"tools":3},"3":{"tools":3,"draw":true}},
  i18n: { en: { title: "Calm-Down Tools", instruction: "Circle the calm-down tool you will use next time. Circle what you can say when you need a break or need help. Color a star each time you use a tool." } },
});

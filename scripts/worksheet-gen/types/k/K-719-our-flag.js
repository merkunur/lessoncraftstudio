/** K-719 — Our Flag (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-012). dk-social-k.js mode 'sk-flag'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-719', slug: 'our-flag', mode: 'sk-flag', exerciseType: 'read-and-color',
  difficulty: {"1":{"dots":true},"2":{},"3":{"count":true}},
  i18n: { en: { title: "Our Flag", instruction: "Color the flag like the small flag: red and white stripes, red at the top and the bottom. Color the box blue around the stars. Leave the stars white." } },
});

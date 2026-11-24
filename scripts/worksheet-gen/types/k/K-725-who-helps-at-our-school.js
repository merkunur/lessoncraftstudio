/** K-725 — Who Helps at Our School? (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social teacher-led D2.Civ.1.K-2). dk-social-k.js mode 'sk-helpers'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-725', slug: 'who-helps-at-our-school', mode: 'sk-helpers', exerciseType: 'science-match',
  difficulty: {"1":{"n":3},"2":{"n":5},"3":{"n":5,"draw":true}},
  i18n: { en: { title: "Who Helps at Our School?", instruction: "Draw a line from each problem to the school helper who can help." } },
});

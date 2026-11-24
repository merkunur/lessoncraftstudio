/** K-718 — Who Makes It? Who Does It? (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-011). dk-social-k.js mode 'sk-workers'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-718', slug: 'who-makes-it-who-does-it', mode: 'sk-workers', exerciseType: 'science-match',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"draw":true}},
  i18n: { en: { title: "Who Makes It? Who Does It?", instruction: "Draw a line from each worker to what they make or do." } },
});

/** K-713 — Taking Turns and Sharing (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-002). dk-social-k.js mode 'sk-friends'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-713', slug: 'taking-turns-and-sharing', mode: 'sk-friends', exerciseType: 'feelings',
  difficulty: {"1":{"pictures":4},"2":{"pictures":6},"3":{"pictures":6,"draw":true}},
  i18n: { en: { title: "Taking Turns and Sharing", instruction: "Look at each picture. Circle the friends who take turns, share or help. Cross out the pictures that are not kind." } },
});

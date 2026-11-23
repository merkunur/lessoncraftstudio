/** K-705 — I Can Do It! (Batch K, Daily Teaching System Stage D-5, 2026-11-23; health en-K-002). dk-kinder.js mode 'i-can'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-705', slug: 'i-can-do-it', mode: 'i-can', exerciseType: 'all-about-me',
  difficulty: {"1":{"frames":1},"2":{"frames":2},"3":{"frames":2,"write":true}},
  i18n: { en: { title: "I Can Do It!", instruction: "Draw something you are good at and something you are learning. Circle every person who helps you, and draw your family in the empty box." } },
});

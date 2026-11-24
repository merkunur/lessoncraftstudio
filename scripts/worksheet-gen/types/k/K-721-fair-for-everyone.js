/** K-721 — Fair for Everyone (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-014). dk-social-k.js mode 'sk-fair'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-721', slug: 'fair-for-everyone', mode: 'sk-fair', exerciseType: 'feelings',
  difficulty: {"1":{"pairs":2},"2":{"pairs":3},"3":{"pairs":3,"fix":true}},
  i18n: { en: { title: "Fair for Everyone", instruction: "Look at the two pictures in each row. They show the same moment. Circle the picture that is fair to everyone." } },
});

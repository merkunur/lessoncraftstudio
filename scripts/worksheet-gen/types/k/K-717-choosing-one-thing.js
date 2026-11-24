/** K-717 — Choosing One Thing (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-010). dk-social-k.js mode 'sk-choose'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-717', slug: 'choosing-one-thing', mode: 'sk-choose', exerciseType: 'money',
  difficulty: {"1":{"rows":2},"2":{"rows":3},"3":{"rows":3,"draw":true}},
  i18n: { en: { title: "Choosing One Thing", instruction: "You can have only one thing in each row. Circle the one you choose. Put an X on the one you do not pick. There is no wrong answer." } },
});

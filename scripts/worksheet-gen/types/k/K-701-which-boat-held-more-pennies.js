/** K-701 — Which Boat Held More Pennies? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-022). dk-kinder.js mode 'penny'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-701', slug: 'which-boat-held-more-pennies', mode: 'penny', exerciseType: 'sink-or-float',
  difficulty: {"1":{"max":10},"2":{"max":20},"3":{"max":20,"write":true,"draw":true}},
  i18n: { en: { title: "Which Boat Held More Pennies?", instruction: "Add pennies one at a time. Color one circle for each penny the boat held before it sank. If it held more, color the + more box (if both boats do, your teacher counts the pennies). Circle the boat that held more." } },
});

/** K-702 — My Bean Seed Journal (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-024). dk-kinder.js mode 'seed'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-702', slug: 'my-bean-seed-journal', mode: 'seed', exerciseType: 'plants',
  difficulty: {"1":{},"2":{"taller":true},"3":{"taller":true,"leaves":true}},
  i18n: { en: { title: "My Bean Seed Journal", instruction: "Look at our bean seed every few days. Write the day, draw what you see in the cup, and circle taller or the same." } },
});

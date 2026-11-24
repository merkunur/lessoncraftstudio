/** G3-608 — Who Can Help? (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-032). dk-g3-health.js mode 'g3-help-finder'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-608', slug: 'who-can-help', mode: 'g3-help-finder', exerciseType: 'healthy-habits',
  difficulty: {"1":{"n":4},"2":{"n":8},"3":{"n":8,"next":true}},
  i18n: { en: { title: "Who Can Help?", instruction: "Draw a line from each problem to the best helper. Then write what you would say." } },
});

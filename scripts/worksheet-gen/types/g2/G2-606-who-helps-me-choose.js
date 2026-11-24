/** G2-606 — Who Helps Me Choose? (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-017). dk-g2-health.js mode 'g2-influence'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-606', slug: 'who-helps-me-choose', mode: 'g2-influence', exerciseType: 'healthy-habits',
  difficulty: {"1":{"choices":3},"2":{"choices":6},"3":{"choices":6,"frame":true}},
  i18n: { en: { title: "Who Helps Me Choose?", instruction: "Draw yourself in the middle. Glue each choice next to who or what helped you most." } },
});

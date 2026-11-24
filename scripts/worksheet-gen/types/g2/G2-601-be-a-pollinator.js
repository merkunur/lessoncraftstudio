/** G2-601 — Be a Pollinator (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-082). dk-g2.js mode 'g2-pollinator'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-601', slug: 'be-a-pollinator', mode: 'g2-pollinator', exerciseType: 'plants',
  difficulty: {"1":{"flowers":2},"2":{"flowers":4},"3":{"flowers":4,"frame":true}},
  i18n: { en: { title: "Be a Pollinator", instruction: "Draw the bee’s path from flower to flower. If a flower got chalk from another flower, color its circle with that chalk color." } },
});

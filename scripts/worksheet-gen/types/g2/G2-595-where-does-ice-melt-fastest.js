/** G2-595 — Where Does Ice Melt Fastest? (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-075). dk-g2.js mode 'g2-ice-race'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-595', slug: 'where-does-ice-melt-fastest', mode: 'g2-ice-race', exerciseType: 'science-sort',
  difficulty: {"1":{"places":2},"2":{"places":4},"3":{"places":4,"frame":true}},
  i18n: { en: { title: "Where Does Ice Melt Fastest?", instruction: "Every 10 minutes, color the ice that is left. Then circle where it melted fastest and slowest." } },
});

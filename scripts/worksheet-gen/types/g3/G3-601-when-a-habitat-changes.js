/** G3-601 — When a Habitat Changes (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-112). dk-g3.js mode 'g3-habitat-change'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-601', slug: 'when-a-habitat-changes', mode: 'g3-habitat-change', exerciseType: 'habitats',
  difficulty: {"1":{"solutions":1,"circle":true},"2":{"solutions":2},"3":{"solutions":2,"frame":true}},
  i18n: { en: { title: "When a Habitat Changes", instruction: "Read about the highway. Write how each solution helps and what it costs. Then choose one." } },
});

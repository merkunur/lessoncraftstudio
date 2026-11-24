/** G3-598 — Hide and Survive: Camouflage (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-109). dk-g3.js mode 'g3-camouflage'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-598', slug: 'hide-and-survive-camouflage', mode: 'g3-camouflage', exerciseType: 'habitats',
  difficulty: {"1":{"colors":2,"backgrounds":1},"2":{"colors":4,"backgrounds":2},"3":{"colors":4,"backgrounds":2,"graph":true,"frame":true}},
  i18n: { en: { title: "Hide and Survive: Camouflage", instruction: "Tally the moths found on each background. Then finish the sentence." } },
});

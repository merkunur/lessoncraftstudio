/** G2-604 — Plants for Every Habitat (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-087). dk-g2.js mode 'g2-plant-homes'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-604', slug: 'plants-for-every-habitat', mode: 'g2-plant-homes', exerciseType: 'habitats',
  difficulty: {"1":{},"2":{"parts":true},"3":{"parts":true,"frame":true}},
  i18n: { en: { title: "Plants for Every Habitat", instruction: "Draw a line from each plant to where it grows best. Circle the part that helps it grow there." } },
});

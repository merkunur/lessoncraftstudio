/** G2-590 — Globe Toss: Water or Land? (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; science en-2-068). dk-g2.js mode 'g2-globe-toss'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2.js');
module.exports = makeG2Type({
  id: 'G2-590', slug: 'globe-toss-water-or-land', mode: 'g2-globe-toss', exerciseType: 'earth-and-space',
  difficulty: {"1":{"catches":10},"2":{"catches":30,"graph":true},"3":{"catches":30,"graph":true,"frame":true}},
  i18n: { en: { title: "Globe Toss: Water or Land?", instruction: "Make a tally mark for each catch. Write the totals and color the graph. Then finish the sentence." } },
});

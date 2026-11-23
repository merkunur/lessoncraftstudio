/** G1-643 — Test Two Rafts (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-059). dk-g1.js mode 'g1-raft-test'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-643', slug: 'test-two-rafts', mode: 'g1-raft-test', exerciseType: 'sink-or-float',
  difficulty: {"1":{},"2":{"tally":true},"3":{"tally":true,"judge":true}},
  i18n: { en: { title: "Test Two Rafts", instruction: "Make a tally mark for each penny each raft held. Write the total." } },
});

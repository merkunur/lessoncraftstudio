/** G1-657 — Ask Someone Older (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-024). dk-social-1.js mode 's1-interview'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-657', slug: 'ask-someone-older', mode: 's1-interview', exerciseType: 'family',
  difficulty: {"1":{"q":2,"draw":true},"2":{"q":3,"write":true},"3":{"q":2,"own":true}},
  i18n: { en: { title: "Ask Someone Older", instruction: "Ask an older person you know: a family member, a neighbor, or someone at school. Write the answers." } },
});

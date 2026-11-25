/** G1-653 — Rules in Different Places (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-019). dk-social-1.js mode 's1-rules'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-653', slug: 'rules-in-different-places', mode: 's1-rules', exerciseType: 'feelings',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "Rules in Different Places", instruction: "Read each rule. Draw a line from the rule to the place where it belongs." } },
});

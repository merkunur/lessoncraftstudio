/** G1-655 — Leaders and Their Jobs (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-021). dk-social-1.js mode 's1-leaders'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-655', slug: 'leaders-and-their-jobs', mode: 's1-leaders', exerciseType: 'science-match',
  difficulty: {"1":{"n":2},"2":{"n":4,"says":true},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "Leaders and Their Jobs", instruction: "Draw a line from each leader to what that leader leads. Then circle the leader who says each sentence." } },
});

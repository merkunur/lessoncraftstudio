/** G2-614 — My View, Your View (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-038 (change of G1-531)). dk-social-2.js mode 's2-view'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-614', slug: 'my-view-your-view', mode: 's2-view', exerciseType: 'all-about-me',
  difficulty: {"1":{"pics":true},"2":{"write":true},"3":{"write":true,"agree":true}},
  i18n: { en: { title: "My View, Your View", instruction: "Write the rule you think matters most and why. Write your partner's rule and reason. Then write how your views are alike and different in the circles." } },
});

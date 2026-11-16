/** G1-588 — Digraphs: sh, ch, and th (blends-g1 factory; English literacy year 2026-11-16) */
'use strict';
const { makeBlendType } = require('../_shared/blends-g1.js');
module.exports = makeBlendType({
  id: 'G1-588', slug: 'digraphs-sh-ch-and-th', mode: 'digraphs',
  i18n: { en: { title: "Digraphs: sh, ch, and th", instruction: "Read each word and draw a line to its picture. Two words have no picture. Then write each word under sh or ch, and cross it out." } },
});

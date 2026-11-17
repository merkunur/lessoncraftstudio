/** G1-610 — Add -s, -ed, and -ing (word-meanings-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWordMeaningsG1Type } = require('../_shared/word-meanings-g1.js');
module.exports = makeWordMeaningsG1Type({
  id: 'G1-610', slug: 'add-s-ed-and-ing', mode: 'add', exerciseType: 'word-parts',
  i18n: { en: { title: "Add -s, -ed, and -ing", instruction: "Most words add -s. After s, x, sh, or ch, add -es: dress, dresses." } },
});

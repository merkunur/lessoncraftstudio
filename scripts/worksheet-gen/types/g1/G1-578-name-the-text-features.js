/** G1-578 — Name the Text Features (info-text factory; English literacy year 2026-11-15; RI.1.5: know the features before using them) */
'use strict';
const { makeInfoTextType } = require('../_shared/info-text.js');
module.exports = makeInfoTextType({
  id: 'G1-578', slug: 'name-the-text-features', mode: 'label',
  i18n: { en: { title: 'Name the Text Features', instruction: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part." } },
});

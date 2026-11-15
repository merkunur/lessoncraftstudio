/** G1-577 — Use the Text Features (info-text factory; English literacy year 2026-11-15; RI.1.5 headings, bold words, caption, glossary) */
'use strict';
const { makeInfoTextType } = require('../_shared/info-text.js');
module.exports = makeInfoTextType({
  id: 'G1-577', slug: 'use-the-text-features', mode: 'features',
  i18n: { en: { title: 'Use the Text Features', instruction: 'Read the text. Use the headings, the bold words, the caption, and the glossary to write each answer.' } },
});

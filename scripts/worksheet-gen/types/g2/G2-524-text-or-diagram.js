/** G2-524 — Text or Diagram? (info-text-g2b factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText2bType } = require('../_shared/info-text-g2b.js');
module.exports = makeInfoText2bType({
  id: 'G2-524', slug: 'text-or-diagram', mode: 'source',
  i18n: { en: { title: "Text or Diagram?", instruction: "Read the text and study the diagram. Where do you learn each fact? Make a check mark under \"in the text\" or under \"in the diagram.\"" } },
});

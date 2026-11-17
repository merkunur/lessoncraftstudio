/** G3-554 — Edit an Opinion Paragraph (opinion-writing-g3 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionWritingG3Type } = require('../_shared/opinion-writing-g3.js');
module.exports = makeOpinionWritingG3Type({
  id: 'G3-554', slug: 'edit-an-opinion-paragraph', mode: 'edit', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Edit an Opinion Paragraph", instruction: "Writers read their work again to fix capitals, end marks, and commas." } },
});

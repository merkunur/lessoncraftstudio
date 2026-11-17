/** G1-622 — Edit and Add a Detail (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-622', slug: 'edit-and-add-a-detail', mode: 'edit', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Edit and Add a Detail", instruction: "Writers fix capitals and end marks, and they add details." } },
});

/** Level Set config — Year pages, literacy D (Daily Teaching System, Part 12.3), 2026-11-15. PDF only.
 *  Two NEW Grade 2 reading page types on one informational text of three parts (types/_shared/info-text-g2.js):
 *  Main Topic and Paragraphs (G2-519, RI.2.2: the main topic of the text and the focus of each paragraph) and
 *  Glossary and Index (G2-520, RI.2.5: headings, bold words, captions, a glossary and an index), for the unit
 *  "Reading to Learn: Information Texts" (Grade 2) of the English literacy year design.
 *  No theme: a copy is another TEXT (data/literacy/info-texts.en.json, key `g2`), so two copies of a level never
 *  share a question (maxShared 0). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-519', 'G2-520'];
module.exports = {
  prefix: 'yld',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-15: Year pages, literacy D (Part 12.3). Two new Grade 2 reading page types on an informational text of about 150 words in three parts (the main topic and the focus of each paragraph; headings, bold words, captions, a glossary and an index), three levels, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

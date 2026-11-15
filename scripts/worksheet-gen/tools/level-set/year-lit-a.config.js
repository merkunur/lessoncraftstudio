/** Level Set config — Year pages, literacy A (Daily Teaching System, Part 12.3), 2026-11-15. PDF only.
 *  Four NEW Grade 1 reading page types on one information text each (types/_shared/info-text.js): Read the Facts
 *  (G1-575, RI.1.1 key details), Main Topic and Key Details (G1-576, RI.1.2), Name the Text Features (G1-578, RI.1.5: numbered parts to name) and Use the Text Features (G1-577,
 *  RI.1.5 headings, bold words, caption, glossary), for the unit "Reading to Learn: Information Texts" of the English
 *  literacy year design (docs/daily-teaching-system/year/TYPE-WORK-LIST.literacy.md: no bank held a text that informs).
 *  No theme: a copy is another TEXT (data/literacy/info-texts.en.json), so two copies of a level never share a
 *  question (maxShared 0). Every face is NEW (noPublished), so its copies number from 1 at every level.
 *  English only: the texts are English texts written to the Common Core's Grade 1 reading standards; another language
 *  gets its own texts with its own curriculum's reading aims. */
'use strict';
const FACES = ['G1-575', 'G1-576', 'G1-577', 'G1-578'];   // G1-578 Name the Text Features joined the same day (the page before G1-577)
module.exports = {
  prefix: 'yla',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-15: Year pages, literacy A (Part 12.3). Three new Grade 1 reading page types on a short information text with headings, bold words, a captioned picture and a glossary (key details, main topic, text features), three levels, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

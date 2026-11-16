/** Level Set config — Year pages, literacy G (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Four NEW Grade 3 reading page types for the unit "Information Texts: Main Idea and Text Features" (Grade 3):
 *    G3-494 Answer with Evidence             (RI.3.1)   the answer, the paragraph that proves it, the proving words
 *    G3-495 Ask and Answer                   (RI.3.1)   which question a sentence answers; questions of the child's own
 *    G3-496 Main Idea and Key Details        (RI.3.2)   the main idea of the whole text, three key details, a summary
 *    G3-497 The Main Idea of Each Paragraph  (RI.3.2)   what each of the four paragraphs is mostly about, a heading
 *  (types/_shared/info-text-g3.js). No theme: a copy is another TEXT (data/literacy/info-texts.en.json, key `g3`:
 *  five texts of four paragraphs), so two copies of a level never share a task (maxShared 0). Every face is NEW
 *  (noPublished). English only. */
'use strict';
const FACES = ['G3-494', 'G3-495', 'G3-496', 'G3-497'];
module.exports = {
  prefix: 'ylg',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy G (Part 12.3). Four new Grade 3 reading page types on informational texts of four paragraphs: answers with the paragraph and the words that prove them, questions asked and answered, the main idea of the whole text with key details and a summary, and the main idea of each paragraph, three levels each, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

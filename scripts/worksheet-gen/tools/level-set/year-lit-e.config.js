/** Level Set config — Year pages, literacy E (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Five NEW Grade 2 reading page types for the unit "Reading to Learn: Informational Texts" (Grade 2):
 *    G2-521 What the Diagram Shows (RI.2.7)   a text of two paragraphs and a labeled cycle diagram of drawn stages
 *    G2-524 Text or Diagram?        (RI.2.7)   the same texts: is a fact learned from the text or from the diagram?
 *    G2-522 Steps in Order          (RI.2.3)   a how-it-is-made text of four steps (First, Next, Then, Finally)
 *    G2-525 Before and After        (RI.2.3)   the same texts: two steps in one sentence, before or after
 *    G2-523 Name the Text Features  (RI.2.5)   the texts of literacy D with six lettered dots on their features
 *  (types/_shared/info-text-g2b.js and info-text-g2.js). No theme: a copy is another TEXT
 *  (data/literacy/info-texts.en.json, keys `g2d`, `g2s`: five texts each; `g2`: seven), so two copies of a level never
 *  share a task (maxShared 0). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-521', 'G2-522', 'G2-523', 'G2-524', 'G2-525'];
module.exports = {
  prefix: 'yle',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy E (Part 12.3). Five new Grade 2 reading page types on informational texts: a text with a labeled cycle diagram (questions from the diagram; text or diagram?), a how-it-is-made text of four steps (steps in order; before and after), and the text features named, three levels each, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

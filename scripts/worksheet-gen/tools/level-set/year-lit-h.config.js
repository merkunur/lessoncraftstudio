/** Level Set config — Year pages, literacy H (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Four NEW Grade 3 reading page types for the unit "Reading to Learn: Informational Texts" (Grade 3):
 *    G3-498 Use the Search Tools  (RI.3.5)   the text as a small book: contents, key words, sidebar, glossary, index
 *    G3-499 Which Search Tool?    (RI.3.5)   the tool to use for a wish; a question of the child's own for a tool
 *    G3-500 Events in Order       (RI.3.3)   four events or steps in order; how one leads to the next
 *    G3-501 Cause and Effect      (RI.3.3)   causes matched with effects; the missing half; one sentence with because or so
 *  (types/_shared/info-text-g3b.js and info-text-g3c.js). No theme: a copy is another TEXT (data/literacy/info-texts.en.json,
 *  key g3 with its fields book and connect: five texts), so two copies of a level never share a task (maxShared 0).
 *  Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-498', 'G3-499', 'G3-500', 'G3-501'];
module.exports = {
  prefix: 'ylh',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy H (Part 12.3). Four new Grade 3 reading page types on informational texts: the text as a small book with its search tools (table of contents, key words, sidebar, glossary, index), the tool to choose, four events or steps in order, and causes with their effects, three levels each, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

/** Level Set config — Year pages, literacy J (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Four NEW Grade 2 reading page types for two lessons of the unit "Reading Stories and Writing" (Grade 2):
 *    G2-526 How a Character Meets a Challenge, G2-527 What Happens and Why   (RL.2.3)
 *    G2-528 What Is the Lesson?, G2-529 Beginning, Middle, and End           (RL.2.2)
 *  (types/_shared/story-g2.js). No theme: a copy is another STORY (data/literacy/stories.en.json, key g2: five
 *  fables), so two copies of a level never share a task (maxShared 0). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-526', 'G2-527', 'G2-528', 'G2-529'];
module.exports = {
  prefix: 'ylj',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy J (Part 12.3). Four new Grade 2 reading page types on fables: how a character meets a challenge, cause and effect in a story, the lesson of the story, and a retelling by beginning, middle and end, three levels each, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

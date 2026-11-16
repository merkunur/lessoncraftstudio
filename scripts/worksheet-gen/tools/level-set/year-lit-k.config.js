/** Level Set config — Year pages, literacy K (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Five NEW Grade 1 reading page types for the unit "Reading Stories: Characters and Lessons" (Grade 1):
 *    G1-579 Find the Answer in the Story (RL.1.1), G1-580 Characters, Setting, and Events (RL.1.3),
 *    G1-581 Retell the Story and Tell Its Lesson (RL.1.2), G1-582 Feeling Words and Sense Words (RL.1.4),
 *    G1-583 Who Is Telling the Story? (RL.1.6)
 *  (types/_shared/story-g1.js). No theme: a copy is another STORY (data/literacy/stories.en.json, key g1: five
 *  short original stories), so two copies of a level never share a task (maxShared 0). Every face is NEW
 *  (noPublished). English only. */
'use strict';
const FACES = ['G1-579', 'G1-580', 'G1-581', 'G1-582', 'G1-583'];
module.exports = {
  prefix: 'ylk',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy K (Part 12.3). Five new Grade 1 reading page types on short stories: answering questions about key details, characters, setting and the big event, retelling with the lesson, feeling words and sense words, and who is telling the story, three levels each, for the lessons of the English literacy year. Noindex.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

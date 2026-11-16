/** Level Set config — Year pages, literacy I (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Eight NEW Grade 3 reading page types for the unit "Stories: Evidence, Lessons, and Characters" (Grade 3):
 *    G3-502 Show Where the Story Says It, G3-503 Ask and Answer About a Story   (RL.3.1)
 *    G3-504 The Central Message, G3-505 Retell the Story                        (RL.3.2)
 *    G3-506 Character Traits, G3-507 Cause and Effect in a Story                 (RL.3.3)
 *    G3-508 Get Ready to Talk About a Story, G3-509 Talk About the Story         (SL.3.1.a)
 *  (types/_shared/story-g3.js and the story option of info-text-g3.js / info-text-g3c.js). No theme: a copy is another
 *  STORY (data/literacy/stories.en.json, key g3: five fables and folktales), so two copies of a level never share a
 *  task (maxShared 0). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-502', 'G3-503', 'G3-504', 'G3-505', 'G3-506', 'G3-507', 'G3-508', 'G3-509'];
module.exports = {
  prefix: 'yli',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy I (Part 12.3). Eight new Grade 3 reading page types on fables and folktales: answers with the sentence that proves them, questions asked and answered, the central message, a retelling in four events, character traits, cause and effect in a story, notes for a group talk and questions for the talk, three levels each, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

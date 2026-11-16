/** Level Set config — Year pages, literacy L (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Kindergarten reading page types for the unit "Reading Stories" (Kindergarten):
 *    K-650 Who Is in the Story, and Where? (RL.K.3), K-651 Retell the Story: Beginning, Middle, End (RL.K.2),
 *    K-652 Ask and Answer Questions About a Story (RL.K.1), K-653 The Pictures and the Words (RL.K.7)
 *  (types/_shared/story-k.js). No theme: a copy is another STORY (data/literacy/stories.en.json, key k: five
 *  read-aloud stories in four picture panels), so two copies of a level never share a task (maxShared 0). Every
 *  face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-650', 'K-651', 'K-652', 'K-653'];
module.exports = {
  prefix: 'yll',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy L (Part 12.3). Four new Kindergarten reading page types on read-aloud stories in picture panels: who the story is about and where it happens, retelling by beginning, middle and end, asking and answering questions, and matching the words to the pictures, three levels each, for the lessons of the English literacy year. Noindex.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};

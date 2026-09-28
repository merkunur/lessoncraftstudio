/** Level Set config — Capital Letters and Punctuation (G2-274 + G2-281/282/307/311), 2026-09-28. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'cap',
  // titles may run to 75: these decks are never indexed (no search result shows the title), the
  // publish audit only notes a long title, and es/fr/it type names alone take ~50 characters
  titleMax: 75,
  // fi builds only in themes its noun-case tables cover: distinct themes per level, not per face
  faceWideDistinct: false,
  note: 'Level Set 2026-09-28: Capital Letters and Punctuation (G2-274 + 4 faces). Levels change the task (names, which marks, the split shown, the checklist hidden); each copy a different verified theme with rotated sentence frames. Visible to teachers, never indexed; PDF + interactive screen version (tap-edit) + answer key.',
  faces: {
    'G2-274': { published: 'vehicles', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G2-281': { published: 'animals', levels: { 2: CORE, 3: ALL } },   // its easier level would be the base face's easier page
    'G2-282': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G2-307': { published: 'animals', levels: { 1: ALL, 2: CORE } },   // a third level would not change the task
    'G2-311': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};

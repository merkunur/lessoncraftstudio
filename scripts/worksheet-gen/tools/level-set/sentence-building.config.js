/** Level Set config — Sentence Building (G1-249 + faces G1-282, G1-283, G1-302), 2026-09-30. PDF + interactive. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'sbl',
  titleMax: 100,
  faceWideDistinct: false,   // a theme may recur between the levels of a page (the task differs), never inside a level
  crossFaceShare: true,      // the faces are different tasks: they may share a theme at one level
  allowFewer: true,          // the honest maximum is recorded in the report, never a filler
  note: 'Level Set 2026-09-30: Sentence Building (Unscramble the Sentence + 3 faces), PDF + screen version (tap the words in order) + answer key. Levels change the sentences: easier = three lanes of 3–4-word sentences, harder = four lanes of 5–7 words. New one-order sentence frames written for new pages only. Visible to teachers, never indexed.',
  faces: {
    'G1-249': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-282': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-283': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-302': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};

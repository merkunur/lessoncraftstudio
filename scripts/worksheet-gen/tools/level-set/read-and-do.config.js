/** Level Set config — Read and Do (G1-308 + faces G1-338 … G1-342), 2026-09-30. PDF + interactive (G1-342 draw: PDF only). */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'rad',
  titleMax: 100,
  faceWideDistinct: false,   // a theme may recur between the levels of a page (the task differs), never inside a level
  crossFaceShare: true,      // the faces are different tasks: they may share a theme at one level
  reuseThemes: true,         // ~11 buildable colour themes per locale: a second copy on a theme = another row of (mostly) other nouns
  allowFewer: true,          // the honest maximum is recorded in the report, never a filler
  note: 'Level Set 2026-09-30: Read and Do, PDF + screen version + answer key (Read and Draw: PDF only). Levels change the reading: easier = bigger pictures and simpler position words, harder = more sentences, ordinals, between / right of / left of, two-picture statements, two things to draw. Visible to teachers, never indexed.',
  faces: {
    'G1-308': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-338': { published: 'zoo animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    // two levels only: a harder two-step page is a three-step page (Grade 2) — the level audit's ruling
    'G1-339': { published: 'farm animals', levels: { 1: ALL, 2: CORE } },
    'G1-340': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-341': { published: 'toys', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G1-342': { published: 'vehicles', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};

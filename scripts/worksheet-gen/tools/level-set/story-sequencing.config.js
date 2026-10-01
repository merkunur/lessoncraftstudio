/** Level Set config — Story Sequencing (K-379 + K-381 / G1-400 / G1-401 / G1-402 / G2-378), 2026-10-01. PDF + interactive + key. */
'use strict';
module.exports = {
  prefix: 'ssl',
  themeless: true,
  titleMax: 95,   // es names two of the faces at length; these pages are noindex
  maxCopies: 5,
  // a copy is new when it tells new stories: each story counts as two tokens (K-379 levelSetWords), so a one-story
  // page never repeats a story and a two- or three-story page shares at most one story with any other copy
  maxShared: 2,
  shareFrac: 0.5,
  seeds: 14,
  crossFaceShare: true,      // the faces are different tasks (number / cut and paste / what next / middle / sentences / retell)
  note: 'Level Set 2026-10-01: Story Sequencing (K-379 + 5 faces), with new illustrations. Easier = one story or fewer pictures and choices; harder = more stories, four pictures to cut, a close wrong choice, two stories whose sentences are mixed, no sentence starters. Each copy tells different stories. Screen version: tap the pictures in story order (or tap the right picture); answer key: every answer filled in. Visible to teachers, never indexed; PDF + screen version + answer key (Retell the Story: PDF only).',
  faces: {
    'K-379': { levels: [2, 1, 3] },
    'K-381': { levels: [2, 1, 3] },
    'G1-400': { levels: [2, 1, 3] },
    'G1-401': { levels: [2, 1, 3] },
    'G1-402': { levels: [2, 1, 3] },
    'G2-378': { levels: [2, 1, 3] },
  },
  include: () => true,
};

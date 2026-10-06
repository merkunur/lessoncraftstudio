/** Level Set config — Dot-to-Dot (K-285 + 9 faces), 2026-10-06. PDF ONLY.
 *  Every new page is a Color by Number scene with its hero's outline as the dots (tools/d2d-build.js → data/d2d,
 *  K-285 LEVEL_SET); a copy = a different picture (levelSetWords = the scene id), never twice in one face.
 *  K-285 (1 to 20) takes EVERY picture that passes at its level — the full shelf of 1-20 sheets; the nine variations
 *  take five per level (four new at level 2 beside the published page). */
'use strict';
const ALL = { 1: 60, 2: 60, 3: 60 };
const FIVE = { 1: 5, 2: 4, 3: 5 };
module.exports = {
  prefix: 'd2d',
  themeless: true,
  interactive: false,       // dot-to-dot is a pencil task: PDF only, no screen version
  titleMax: 80,
  maxCopies: 5,
  maxShared: 1,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-06: Dot-to-Dot (K-285 + 9 faces), PDF only. New pages are the Color by Number scenes with the hero drawn as dots (props step aside so every number sits on clear paper; every picture read solved). Levels: easier = big numerals, number strip, the hero alone on the ground, simple outlines; harder = small numerals, no strip, complex outlines, and for the open faces the whole count (2-40, 5-100, 10-200, the whole alphabet; window faces 10 dots with nothing pre-printed). Visible to teachers, never indexed.',
  include: () => true,
  faces: {
    'K-285': { levels: [2, 1, 3], maxCopiesAt: ALL },
    'K-294': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'K-295': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'K-296': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'K-308': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'K-309': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'G1-285': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'G1-294': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'G2-304': { levels: [2, 1, 3], maxCopiesAt: FIVE },
    'G2-314': { levels: [2, 1, 3], maxCopiesAt: FIVE },
  },
};

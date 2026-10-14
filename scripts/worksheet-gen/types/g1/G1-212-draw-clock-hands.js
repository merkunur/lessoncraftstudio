/**
 * G1-212 — Draw the clock hands (telling-time family, production direction).
 * A digital time chip + an EMPTY clock face per card; the child draws the
 * hour and minute hands. Digital prompt = language-free across all 11
 * locales (the native time-PHRASE prompt variant is a deliberate follow-up
 * that would reuse the E10 idiom table). CCSS 1.MD.B.3 / DE Uhrzeit Klasse 1-2.
 */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');

module.exports = makeClockType({
  id: 'G1-212',
  slug: 'draw-the-clock-hands',
  mode: 'draw',
  gradeBand: 'G1',
  // full hours / hours + half hours (published) / quarter hours — Level Set stamps from clock-tasks FACE_LEVELS
  difficulty: levelsFor('G1-212', { cards: 4, stepM: 30 }, { 1: { cards: 4, stepM: 60 }, 3: { cards: 6, stepM: 15 } }),
  i18n: {
    en: {
      title: 'Draw the Clock Hands',
      instruction: 'Read the time. Draw the hour hand and the minute hand on the clock.',
    },
  },
});

/**
 * G3-480 — Dot-to-Dot: Skip Counting (flagship makers, docs/makers/FLAGSHIP.md): the scene pictures joined by threes, fours and sixes
 * (the other faces own twos, fives and tens). Levels: 1 by threes, ten dots · 2 by fours, twenty dots · 3 by sixes, twenty dots, no strip.
 */
'use strict';
const base = require('../k/K-285-dot-to-dot.js');
const D = { ...base.difficulty[1], window: null, chip: 30 };
const LEVELS = {
  1: { count: 10, step: 3, startAt: 3, labelPx: 22, chip: 34, scene: { n: 10, band: 'all', offset: 5 } },
  2: { count: 20, step: 4, startAt: 4, scene: { n: 20, band: 'all', offset: 9 } },
  3: { count: 20, step: 6, startAt: 6, labelPx: 18, strip: false, scene: { n: 20, band: 'all', offset: 13 } },
};
module.exports = {
  ...base,
  id: 'G3-480',
  slug: 'dot-to-dot-skip-counting',
  gradeBand: 'G3',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: 'Dot-to-Dot: Skip Counting', instruction: 'Start at the orange dot. Count by {N}s and connect the dots in order.' } },
  levelSetWords: base.levelSetWords,
  build({ difficulty, locale }, ctx) {
    const d = LEVELS[difficulty];
    return { ...this._buildScene({ ...D, ...d }, (locale || 'en').slice(0, 2), ctx), tokens: { N: String(d.step) } };
  },
};

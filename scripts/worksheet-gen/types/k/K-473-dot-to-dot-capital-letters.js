/**
 * K-473 — ABC Dot-to-Dot: Capital Letters (Dot to Dot maker, 2026-11-02). K-309 joins the dots by the LOWERCASE alphabet;
 * this face joins them by the capitals of the page's own alphabet (data/b2/collation.js strip, upper-cased in the
 * locale: es Ñ after N, sv/fi ÅÄÖ, da/no ÆØÅ after Z, it 21 letters). Level 1 the first ten letters, level 2 twenty,
 * level 3 the whole alphabet — every level a scene picture (K-285 _buildScene), the numbers' places measured with the
 * capitals themselves (a W is wider than a w). Offsets differ from K-309's so the same copy shows another picture.
 */
'use strict';
const base = require('./K-285-dot-to-dot.js');

const D = { ...base.difficulty[1], letters: true, window: null, chip: 30, upper: true };
const EASY = { labelPx: 24, chip: 34, lite: true };
const HARD = { labelPx: 18, strip: false };
const LEVELS = {
  1: { ...EASY, count: 10, scene: { n: 10, band: 'all', offset: 40 } },
  2: { count: 20, scene: { n: 20, band: 'all', offset: 20 } },
  3: { ...HARD, count: 'alpha', scene: { n: 'alpha', band: 'all', offset: 3 } },
};

module.exports = {
  ...base,
  id: 'K-473',
  slug: 'dot-to-dot-capital-letters',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Dot-to-Dot: Capital Letters", instruction: "Start at the orange dot. Join the dots in alphabet order, from A to J, to find the picture." } },
  levelSetWords: base.levelSetWords,

  build({ difficulty, locale }, ctx) {
    return this._buildScene({ ...D, ...LEVELS[difficulty] }, (locale || 'en').slice(0, 2), ctx);
  },
};

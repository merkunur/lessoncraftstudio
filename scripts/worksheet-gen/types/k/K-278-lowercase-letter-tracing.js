/**
 * K-278 — Lowercase letter tracing. The base of the `lowercase-letter-tracing`
 * family: the same single-stroke CENTRELINE mechanic as K-238 (solid teal
 * model, dashed repetitions, coral start dot + direction arrow + stroke-order
 * badges), on the three-line lowercase ruling instead of the capitals ruling.
 *
 * Why it is its own family and not five more K-238 variations: lowercase is a
 * distinct teaching problem, not a restyling of capitals. It introduces the
 * x-height band, ascenders and descenders, and the b/d/p/q reversal set — and
 * it is a distinct search face ("lowercase letter tracing" is not "capital
 * letter tracing"). The letterforms are the school models the shared table
 * rules: single-storey `a` and `g`.
 *
 * It spreads K-238 so both families share ONE build() and ONE verify(); the
 * only behavioural switch is `lowercase: true` on every difficulty level,
 * which selects LOWERCASE_SETS and the lowercase lane metrics.
 *
 * Per-locale sets carry the capitals rulings unchanged, plus German ß — a real
 * lowercase letter with no capital form, so the capitals page structurally
 * could not carry it (data/tracing/letter-sets.js LOWERCASE_SETS).
 * d1: a-d large · d2: a-f ladder · d3: the locale's own letters.
 */
'use strict';
const base = require('./K-238-letter-tracing.js');

module.exports = {
  ...base,
  id: 'K-278',
  slug: 'lowercase-letter-tracing',
  exerciseType: 'lowercase-letter-tracing',
  difficulty: {
    1: { count: 4, glyphH: 104, laneH: 152, reps: 4, from: 0, lowercase: true },
    2: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 0, lowercase: true },
    3: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 'specials', lowercase: true },
  },
  i18n: {
    en: {
      title: 'Trace the Lowercase Letters',
      instruction: 'Trace each small letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows.',
    },
  },
};

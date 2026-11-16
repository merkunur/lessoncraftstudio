/** Level Set config — Year pages, literacy Q (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  Three EXISTING page types built for the worksheet makers (2026-11-02) and never published as pages, which lessons of
 *  the English literacy year hand out (scripts/units/year/type-work-list.literacy.json, key B):
 *    K-548  Choose the Position Word (K.G.A.1; Kindergarten "In, on, under, next to": level 1, level 3 adds behind / in front of)
 *    G1-493 Blends (RF.1.3; Grade 1 "Blends at the start": levels 1-3)
 *    G1-495 Long or Short Vowel? (RF.1.2.a; Grade 1 level 1, Grade 2 level 2 or 3)
 *  The fourth type of that batch, G1-506 Story Map, is in year-lit-r.config.js (prefix ylr): its exercise type
 *  `story-writing` is not yet a family key of frontend/config/topics-taxonomy.json, so no deck head can be built for it
 *  (deck-html: "family key not in taxonomy"), and keeping it here would stop these three.
 *  All three are themeless (themeAxis.applicable false): a copy = a seed. None declares a screen adapter (spec.interactive),
 *  so the decks are PDF only whatever the wave says. Every face is NEW (no published page), so its copies number from 1,
 *  and level 2 copy 1 is the page a lesson hands out. English only.
 *
 *  WHAT A COPY'S "WORDS" ARE. build-waves compares copies on spec.levelSetWords(meta), else on meta.wholes / items /
 *  letters / pairs / bases / foils. None of these types has either (their meta holds `words` and `rows`), so without a
 *  measure every sharing limit below would compare two EMPTY sets and accept any seed. This config therefore gives each
 *  type a measure, attached in this process only and only when the spec has none (the type files, which the published
 *  makers use, are not touched):
 *    G1-495  the printed words            ("cake long" → cake)
 *    G1-493  the printed / pictured words ("glue (gl)" → glue)
 *    K-548   the pictures of the rows     ("dog in hexagon" → dog; every level-1 copy asks the same four position
 *            words by design, so the pictures are what makes a copy new) */
'use strict';
const { loadType } = require('../../lib/load-types.js');

const MEASURE = {
  'G1-495': (meta) => meta.words.map((w) => w.split(' ')[0]),
  'G1-493': (meta) => meta.words.map((w) => w.split(' ')[0]),
  'K-548': (meta) => meta.rows.map((r) => r.split(' ')[0]),
};
for (const [id, f] of Object.entries(MEASURE)) {
  const spec = loadType(id);
  if (typeof spec.levelSetWords !== 'function') spec.levelSetWords = f;
}

module.exports = {
  prefix: 'ylq',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,        // the per-level limit is the fraction below (the copy sizes are 4-8 items)
  // a copy shares at most a quarter of its words with another copy of its level: G1-495 1 of 6 (L1) / 2 of 8 (L2-3), from
  // 90 one-syllable words (31 long, 59 short); G1-493 1 of 6 / 2 of 8, from 57 blend pictures. Measured: five copies at
  // every level within the first six seeds.
  shareFrac: 0.25,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy Q (Part 12.3). Three page types built for the worksheet makers and published for the first time: Choose the Position Word, Blends, Long or Short Vowel?, three levels each, for the lessons of the English literacy year. Noindex.',
  faces: {
    // K-548 draws its row pictures from only 15 nouns (types/_shared/position-items.js), so copies of 4-6 rows repeat
    // pictures: two random copies of level 3 share 2.4 of 6 on average. Measured over 400 seeds: at a quarter (≤1 of 4 /
    // 5 / 6) level 2 stops at 4 copies and level 3 at 2; at 0.4 (≤1 of 4 at L1, ≤2 of 5 at L2, ≤2 of 6 at L3) every
    // level has five, the fifth level-3 copy at seed 68 — hence 100 seeds.
    'K-548': { levels: [2, 1, 3], noPublished: true, shareFrac: 0.4, seeds: 100 },
    'G1-493': { levels: [2, 1, 3], noPublished: true },
    'G1-495': { levels: [2, 1], noPublished: true },   // English has no level 3: its word pool is the pool of level 2 (2026-11-17)
  },
  include: (loc) => loc === 'en',
};

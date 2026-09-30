/** Level Set config — Rhyming Words (G1-309 + K-352, G1-343, G1-344, G1-345, G1-346), 2026-09-30. PDF + interactive. */
'use strict';
module.exports = {
  prefix: 'rhy',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  // a copy = (rhyme-class set, seed); it is accepted only when its page shares at most 2 rhyme classes (and at most a
  // third of the page) with every copy already accepted at that level — a new copy asks new rhymes, never the same
  // rhymes reshuffled; the verse page shares at most ONE verse
  maxShared: 2,
  shareFrac: 0.34,
  seeds: 12,
  note: 'Level Set 2026-09-30: Rhyming Words (G1-309 + 5 pages). New rhyme classes, near-miss foils and verses by 11 native panels (every picture opened; never translated). Levels change the task: easier = fewer choices / fewer bins / word choices under each verse / a bank with nothing to reject / one rhyme each; harder = a near-miss foil (cat / cap) / near-miss pairs / pictures that fit no bin / no picture cue with one word box / three rhymes each / the word alone. Visible to teachers, never indexed; PDF + interactive screen version + answer key (Write Your Own Rhymes is PDF only: open answers).',
  faces: {
    'G1-309': { levels: [2, 1, 3] },
    'K-352': { levels: [2, 1, 3] },
    'G1-343': { levels: [2, 1, 3] },
    'G1-344': { levels: [2, 1, 3], maxShared: 1, seeds: 60 },   // no unit axis: the seed alone picks the verses
    'G1-345': { levels: [2, 1, 3] },
    'G1-346': { levels: [2, 1, 3] },
  },
  // a Level Set extends only a page a teacher can already find: Italian never published Rhyme Strings (its words run
  // too long for the two-row bank)
  include: (loc, face) => !(loc === 'it' && face === 'G1-345'),
};

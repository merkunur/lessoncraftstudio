/** Level Set config — Sight Words (K-239 + K-259..K-263 + NEW K-388..K-392), 2026-09-30. PDF ONLY (operator ruling). */
'use strict';
module.exports = {
  prefix: 'swl',
  themeless: true,
  unitsOnly: true,          // K-388..K-392: one page per sight word of the locale's ~100-word K-1 list, every level
  noExemplarSkip: true,     // the one-word faces have no published page, so the first word gets its level-2 page too
  textLevels: { 'K-239': [1, 2, 3] },   // K-239 walks the whole list in word sets (seedVariant = set number; past the end throws)
  singleFaces: ['K-259', 'K-260', 'K-261', 'K-262', 'K-263'],   // "Set 2..6" pages: their own words, an easier + a harder level
  interactive: false,       // PDF only
  titleMax: 80,
  maxCopies: 40,
  maxShared: 99,
  seeds: 1,
  allowFewer: true,
  note: 'Level Set 2026-09-30: Sight Words. The locale\'s own K-1 high-frequency list grows from 24 to ~100 words (native-reviewed), each with six sentences. Five NEW one-word pages per word: Sight Word of the Day (read, trace, write, use in sentences), Sight Word in Sentences (fill the word in), One Sentence Step by Step (read, complete, trace, circle, write), Trace the Sentences, Find the Sight Word (colour and count). Levels: easier = fewer, shorter sentences and the word traced in the gap; harder = more and longer sentences, capital-letter gaps, look-alike words. Read-Trace-Write sets cover the whole list. Visible to teachers, never indexed; PDF only.',
  faces: {
    'K-239': { levels: [2, 1, 3] },
    'K-259': { levels: [2, 1, 3] },
    'K-260': { levels: [2, 1, 3] },
    'K-261': { levels: [2, 1, 3] },
    'K-262': { levels: [2, 1, 3] },
    'K-263': { levels: [2, 1, 3] },
    'K-388': { published: null, levels: [1, 2, 3] },
    'K-389': { published: null, levels: [1, 2, 3] },
    'K-390': { published: null, levels: [1, 2, 3] },
    'K-391': { published: null, levels: [1, 2, 3] },
    'K-392': { published: null, levels: [1, 2, 3] },
  },
  include: () => true,
};

/** K-627 — ten and some more (K.NBT.A.1): 11 to 19 loose ones, ring ten, write 10 + □ = □.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/base-ten-tasks.js mode 'regroup' with the frame of
 *  Kindergarten (no "tens" word, no times sign). Level 1 11-14 · 2 11-19 · 3 15-19. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'K-627', slug: 'ten-and-some-more', mode: 'regroup', gradeBand: 'K',
  levels: { regroup: { 1: { lo: 11, hi: 14, frame: 'teen' }, 2: { lo: 11, hi: 19, frame: 'teen' }, 3: { lo: 15, hi: 19, frame: 'teen' } } },
  i18n: { en: { title: 'Ten and Some More', instruction: 'Circle 10. Write how many more there are. Then write the number.' } },
});

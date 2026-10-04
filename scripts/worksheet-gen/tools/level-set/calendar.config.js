/** Level Set config — Calendar (G2-277 + G2-296 / G2-297 / G2-298 / G2-312), 2026-10-04. PDF + interactive + key. */
'use strict';
module.exports = {
  prefix: 'cal',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,        // a copy shares at most half of its month + stickers with another copy of its level
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-04: Calendar (G2-277 + 4 variations). Levels change the questions and the month: no counting and big cells (easier) / the published page / six-row months with more questions (harder). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(['G2-277', 'G2-296', 'G2-297', 'G2-298', 'G2-312'].map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};

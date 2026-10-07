/** Level Set config — Fact Families (G1-209 + G1-219/220/221/222, G3-369), 2026-10-07. Themeless number houses:
 *  a copy = a seed; a copy shares at most half of its families with another copy of its level. Level 2 copy 1 is the
 *  published page. PDF + interactive + key. */
'use strict';
module.exports = {
  prefix: 'ff',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-07: Fact Families. Level 1 smaller families (within 6, no crossing of ten, the 2/5/10 tables), level 2 the published page, level 3 families that cross ten / the 6 to 9 tables with each fact missing a different number. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(['G1-209', 'G1-219', 'G1-220', 'G1-221', 'G1-222', 'G3-369'].map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};

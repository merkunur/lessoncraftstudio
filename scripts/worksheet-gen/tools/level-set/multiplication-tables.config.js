/** Level Set config — Multiplication Tables (G3-358 + the per-table faces), 2026-10-13. PDF + interactive + key.
 *  Themeless: a copy = a seed. The base (mixed facts) shares at most half its facts with another copy of its level.
 *  The table faces walk a PLAN per copy (lib: G3-358 tableLevels): level 1 up / down with worked anchors, level 2 the
 *  published ladder + down + turned around, level 3 the ten facts mixed with four missing factors (≤ half shared).
 *  G3-402..405 (the tables of 6, 7, 8, 9) are new faces with no published page (face.noPublished). */
'use strict';
const OLD_TABLES = ['G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368'];
const NEW_TABLES = ['G3-402', 'G3-403', 'G3-404', 'G3-405'];
const ladder = { 1: 2, 2: 3 };
module.exports = {
  prefix: 'mt',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Multiplication Tables. Level 1 easier (the easy tables 2, 5, 10 mixed; a single table in order with x1, x5, x10 worked), level 2 the published page (a table: in order, counting down, turned around), level 3 harder (the missing number: a factor or the product, the facts mixed). New variations for the tables of 6, 7, 8 and 9. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G3-358': { levels: [2, 1, 3] },
    ...Object.fromEntries(OLD_TABLES.map((id) => [id, { levels: [2, 1, 3], maxCopiesAt: ladder }])),
    ...Object.fromEntries(NEW_TABLES.map((id) => [id, { levels: [2, 1, 3], maxCopiesAt: ladder, noPublished: true }])),
  },
  include: () => true,
};

/**
 * G1-437 — skip count from a number that is NOT on the step (37, 47, 57 …; 98, 100, 102 …): the bridge over a ten or a
 * hundred (T4, 1.NBT.C.5, 2.NBT.A.2). Number Charts maker, 2026-11-01. Each row its own rule (2, 5, 10), within 120. The strip factory of the published skip-counting pages draws it; print-only (the maker's key
 * shows each answer in its box — the shared key layer).
 */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');

const base = makeNumberStripType({
  id: 'G1-437', slug: 'skip-count-from-any-number', step: 10, rangeMax: 1000, len: 7, gradeBand: 'G1',
  difficulty: {
    1: { v2: true, rows: 4, blanks: 2, isolated: true, steps: [10, 2], start: 'off', startMin: 11, startMax: 89, rangeMax: 100 },
    2: { v2: true, rows: 5, blanks: 3, isolated: true, steps: [2, 5, 10], start: 'off', startMin: 11, startMax: 109, rangeMax: 120 },
    // within 120 at every level (steps of 100 within 1000 are Grade 2, 2.NBT.B.8 — reviewer 2026-11-01)
    3: { v2: true, rows: 5, blanks: 4, adjacent: true, steps: [2, 5, 10], start: 'off', startMin: 11, startMax: 109, rangeMax: 120 },
  },
  i18n: { en: { title: 'Skip Count from Any Number', instruction: 'Find the counting rule of each row. Write each missing number.' } },
});
delete base.interactive;
module.exports = {
  ...base,
  // the plain page in every view: the maker's key layer writes the answers into the empty boxes
  build(args, ctx) { return base.build.call(this, args, { ...ctx, answerKey: false, interactive: false }); },
};

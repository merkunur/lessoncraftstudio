/** Level Set config — Year pages, social studies Grade 3 (Daily Teaching System, Stage D-5 batch S3), 2026-11-25.
 *  The 18 new Grade 3 social studies page types G3-612 … G3-629 (types/_shared/dk-social-3.js, dk-social-3-art.js; the
 *  lessons and rulings: lcs-stage-d/batch-s3/LINES.md, BATCH-S3-RESULT.md; one US third-grade teacher-reviewer). The
 *  lesson the year serves with an existing page (G3-396) has English pages already. English
 *  only: the other languages come with their units. Themeless: a copy = a seed. The faces have no published page, so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the pages
 *  that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-s3.js); a fixed page or a record
 *  page prints one page. Print only: no screen version (the codes in playable families are in
 *  LEVEL_SET_PRINT_ONLY_VARIATIONS). Visible to teachers, never indexed. */
'use strict';
const IDS = ['G3-612', 'G3-613', 'G3-614', 'G3-615', 'G3-616', 'G3-617', 'G3-618', 'G3-619', 'G3-620', 'G3-621', 'G3-622', 'G3-623', 'G3-624', 'G3-625', 'G3-626', 'G3-627', 'G3-628', 'G3-629'];
const CAPS = {"G3-613":{"1":1,"2":1,"3":1},"G3-614":{"1":3,"2":1,"3":1},"G3-616":{"1":1,"2":1,"3":1},"G3-619":{"1":1},"G3-620":{"1":1,"2":1,"3":1},"G3-621":{"2":1,"3":1},"G3-622":{"1":1,"2":1,"3":1},"G3-623":{"1":1,"2":1,"3":1},"G3-624":{"2":1,"3":1},"G3-626":{"2":1,"3":1},"G3-627":{"2":1,"3":1},"G3-628":{"2":3,"3":3},"G3-629":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'yds',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-25: Year pages, social studies Grade 3 (Stage D-5). The new Grade 3 social studies pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

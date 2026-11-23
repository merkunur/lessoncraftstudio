/** Level Set config — Year pages, science and health A (Daily Teaching System, Stage D-2), 2026-11-23.
 *  Themeless faces (a copy = a seed). A face whose five core pages are live (the science sorts) gets no core copy:
 *  its easy and hard copies number from 2 with their own level in the slug, so no slug of a live page can be taken.
 *  Only copies that differ (operator ruling 2026-10-06): each level is capped at the pages that differ in content over 12
 *  seeds (lcs-stage-d/cap-copies.js); a face that only reshuffles one page adds nothing and is not listed.
 *  Verdicts: one US K-3 reviewer over the three levels of each type (lcs-stage-d/D2-REVIEW.tsv) after the D-2 fix round
 *  (D2-FIX-RESULT.tsv): "three" = easy, core and hard differ; "core-only" = the levels are one task, so only more core
 *  copies; "L1+L2" = the hard level is the core task again. Visible to teachers, never indexed. */
'use strict';
const FACES = {"G1-201":{"levels":[1,3]},"G1-204":{"levels":[1,3]},"G1-205":{"levels":[1,3]},"G1-206":{"levels":[1,3]},"G1-378":{"levels":[2,1,3]},"G1-399":{"levels":[2,1,3]},"K-201":{"levels":[1,3]},"K-202":{"levels":[1,3]},"K-203":{"levels":[1,3]},"K-206":{"levels":[1,3]},"K-207":{"levels":[1,3]},"K-210":{"levels":[1,3]},"K-211":{"levels":[1,3]},"K-212":{"levels":[1,3]},"K-213":{"levels":[1,3]},"K-286":{"levels":[2,1,3]},"K-356":{"levels":[1,3],"maxCopiesAt":{"1":1,"3":1}},"K-380":{"levels":[2,1,3],"maxCopiesAt":{"1":2,"2":3}},"K-204":{"levels":[1,3]},"K-208":{"levels":[1,3],"maxCopiesAt":{"3":1}},"K-209":{"levels":[1,3]},"K-214":{"levels":[1,3]},"K-322":{"levels":[2,1,3]},"K-354":{"levels":[2,1,3]},"K-357":{"levels":[2,1,3]},"K-369":{"levels":[2,1,3]},"G1-202":{"levels":[1,3]},"G1-207":{"levels":[1,3]},"G1-376":{"levels":[2,1,3],"maxCopiesAt":{"1":3,"2":2}},"G1-377":{"levels":[2,1,3],"maxCopiesAt":{"1":4,"2":3,"3":4}},"K-205":{"levels":[1]},"K-355":{"levels":[2,1]},"G1-404":{"levels":[2],"maxCopiesAt":{"2":3}},"G2-361":{"levels":[2]},"G2-363":{"levels":[2]},"G2-364":{"levels":[2],"maxCopiesAt":{"2":2}},"G2-368":{"levels":[2]},"G2-380":{"levels":[2]},"G2-382":{"levels":[2],"maxCopiesAt":{"2":1}},"G3-393":{"levels":[2]},"K-373":{"levels":[2],"maxCopiesAt":{"2":4}},"K-376":{"levels":[2],"maxCopiesAt":{"2":1}},"K-366":{"levels":[2]},"G1-356":{"levels":[2]},"G1-357":{"levels":[2]},"G1-358":{"levels":[2]},"G1-363":{"levels":[2]},"G1-364":{"levels":[2]},"G1-403":{"levels":[2]},"G2-348":{"levels":[2]}};
module.exports = {
  prefix: 'ysa',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-23: Year pages, science and health A (Stage D-2). The science, social studies and health worksheet types the English units take, at the levels whose pages truly differ.',
  faces: FACES,
  include: () => true,
};

/** Level Set config — Year pages, science and health Grade 3 (Daily Teaching System, Stage D-5 batch 3), 2026-11-24.
 *  The 31 new Grade 3 science and health page types G3-581 … G3-611 (types/_shared/dk-g3.js, dk-g3-health.js; the lessons and
 *  rulings: lcs-stage-d/batch-3/LINES.md, BATCH-3-RESULT.md; one US third-grade teacher-reviewer). English only:
 *  the other languages come with their units. Themeless: a copy = a seed. The faces are NEW (no published page), so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the
 *  pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-g3.js); an open drawing or
 *  record page prints one page. Visible to teachers, never indexed. */
'use strict';
const IDS = ['G3-581', 'G3-582', 'G3-583', 'G3-584', 'G3-585', 'G3-586', 'G3-587', 'G3-588', 'G3-589', 'G3-590', 'G3-591', 'G3-592', 'G3-593', 'G3-594', 'G3-595', 'G3-596', 'G3-597', 'G3-598', 'G3-599', 'G3-600', 'G3-601', 'G3-602', 'G3-603', 'G3-604', 'G3-605', 'G3-606', 'G3-607', 'G3-608', 'G3-609', 'G3-610', 'G3-611'];
const CAPS = {"G3-581":{"2":1,"3":1},"G3-582":{"1":1,"2":1,"3":1},"G3-583":{"1":1,"2":1,"3":1},"G3-584":{"1":1,"2":1,"3":1},"G3-585":{"2":1,"3":1},"G3-586":{"1":1,"2":1,"3":1},"G3-587":{"1":1,"2":1,"3":1},"G3-588":{"1":1,"2":1,"3":1},"G3-589":{"1":1,"2":1,"3":1},"G3-590":{"1":1,"2":1,"3":1},"G3-592":{"1":1,"2":1,"3":1},"G3-593":{"1":1,"2":1,"3":1},"G3-594":{"1":1,"2":1,"3":1},"G3-595":{"1":1,"2":1,"3":1},"G3-596":{"2":1,"3":1},"G3-597":{"1":1,"2":1,"3":1},"G3-598":{"1":1,"2":1,"3":1},"G3-599":{"2":1,"3":1},"G3-600":{"1":1,"2":1,"3":1},"G3-601":{"1":1,"2":1,"3":1},"G3-602":{"1":1,"2":1,"3":1},"G3-603":{"1":1,"2":1,"3":1},"G3-604":{"1":1,"2":1,"3":1},"G3-605":{"1":1,"2":1,"3":1},"G3-606":{"1":1,"2":1,"3":1},"G3-607":{"1":1,"2":1,"3":1},"G3-608":{"1":1,"2":1,"3":1},"G3-609":{"1":1,"2":1,"3":1},"G3-610":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'ydo',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-24: Year pages, science and health Grade 3 (Stage D-5). The new Grade 3 science and health pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

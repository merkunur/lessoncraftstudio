/** Level Set config — Year pages, science and health Grade 2 (Daily Teaching System, Stage D-5 batch 2), 2026-11-24.
 *  The 30 new Grade 2 science and health page types G2-584 … G2-613 (types/_shared/dk-g2.js, dk-g2-health.js; the lessons and
 *  rulings: lcs-stage-d/batch-2/LINES.md, BATCH-2-RESULT.md; one US second-grade teacher-reviewer). English only:
 *  the other languages come with their units. Themeless: a copy = a seed. The faces are NEW (no published page), so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the
 *  pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-k.js); an open drawing or
 *  record page prints one page. Visible to teachers, never indexed. */
'use strict';
const IDS = ['G2-584', 'G2-585', 'G2-586', 'G2-587', 'G2-588', 'G2-589', 'G2-590', 'G2-591', 'G2-592', 'G2-593', 'G2-594', 'G2-595', 'G2-596', 'G2-597', 'G2-598', 'G2-599', 'G2-600', 'G2-601', 'G2-602', 'G2-603', 'G2-604', 'G2-605', 'G2-606', 'G2-607', 'G2-608', 'G2-609', 'G2-610', 'G2-611', 'G2-612', 'G2-613'];
const CAPS = {"G2-584":{"2":1,"3":1},"G2-585":{"2":1,"3":1},"G2-586":{"1":1,"2":1,"3":1},"G2-587":{"1":1,"3":1},"G2-588":{"1":1,"2":1,"3":1},"G2-589":{"2":1,"3":1},"G2-590":{"1":1,"2":1,"3":1},"G2-591":{"2":1,"3":1},"G2-592":{"1":1,"2":1,"3":1},"G2-593":{"1":1,"2":1,"3":1},"G2-594":{"1":2},"G2-595":{"1":1,"2":1,"3":1},"G2-596":{"1":1,"2":1,"3":1},"G2-597":{"2":4,"3":3},"G2-598":{"1":1,"2":1,"3":1},"G2-599":{"1":1,"2":1,"3":1},"G2-600":{"1":1,"2":1,"3":1},"G2-601":{"1":1,"2":1,"3":1},"G2-602":{"1":1,"2":1,"3":1},"G2-603":{"1":1,"2":1,"3":1},"G2-604":{"1":1,"2":4},"G2-605":{"2":1,"3":1},"G2-606":{"1":1,"2":1,"3":1},"G2-608":{"1":1,"2":1,"3":1},"G2-609":{"2":1,"3":1},"G2-610":{"1":1,"2":1,"3":1},"G2-611":{"1":2},"G2-612":{"1":1,"2":1,"3":1},"G2-613":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'ydn',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-24: Year pages, science and health Grade 2 (Stage D-5). The new Grade 2 science and health pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

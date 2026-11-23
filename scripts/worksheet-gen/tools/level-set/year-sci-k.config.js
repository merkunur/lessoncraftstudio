/** Level Set config — Year pages, science and health K (Daily Teaching System, Stage D-5 batch K), 2026-11-23.
 *  The 21 new Kindergarten science and health page types K-687 … K-707 (types/_shared/dk-kinder.js; the lessons and
 *  rulings: lcs-stage-d/batch-k/LINES.md, BATCH-K-RESULT.md; one US Kindergarten reviewer, two rounds). English only:
 *  the other languages come with their units. Themeless: a copy = a seed. The faces are NEW (no published page), so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the
 *  pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-k.js); an open drawing or
 *  record page prints one page. Visible to teachers, never indexed. */
'use strict';
const IDS = ['K-687', 'K-688', 'K-689', 'K-690', 'K-691', 'K-692', 'K-693', 'K-694', 'K-695', 'K-696', 'K-697', 'K-698', 'K-699', 'K-700', 'K-701', 'K-702', 'K-703', 'K-704', 'K-705', 'K-706', 'K-707'];
const CAPS = {"K-688":{"1":1,"2":1,"3":1},"K-689":{"1":1,"2":1,"3":1},"K-692":{"3":1},"K-693":{"2":1,"3":1},"K-695":{"1":1,"2":1,"3":1},"K-696":{"2":1},"K-697":{"1":1,"2":1,"3":1},"K-698":{"1":1,"2":1,"3":1},"K-699":{"1":1,"2":1,"3":1},"K-700":{"1":1,"2":1,"3":1},"K-701":{"1":1,"2":1,"3":1},"K-702":{"1":1,"2":1,"3":1},"K-704":{"1":1,"2":1,"3":1},"K-705":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'ydk',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-23: Year pages, science and health K (Stage D-5). The new Kindergarten science and health pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

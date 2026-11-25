/** Level Set config — Year pages, social studies Grade 1 (Daily Teaching System, Stage D-5 batch S1), 2026-11-24.
 *  The 17 new Grade 1 social studies page types G1-653 … G1-669 (types/_shared/dk-social-1.js, dk-social-1-art.js; the lessons
 *  and rulings: lcs-stage-d/batch-s1/LINES.md, BATCH-S1-RESULT.md; one US first-grade teacher-reviewer), G1-670 (Prices at
 *  the Market, the page of G2-472 under a Grade 1 id) and G1-530 (draw your own map with a key, which the map-key lesson hands
 *  out and which had no English page). English only: the other languages come with their units. Themeless:
 *  a copy = a seed. The faces have no published page, so level 2 also starts at copy 1. Only copies that differ (operator
 *  ruling 2026-10-06): each level is capped at the pages that differ in content over 12 seeds (CAPS below, written by
 *  lcs-stage-d/cap-copies-s1.js); an open drawing or record page prints one page. Print only: no screen version (the ten
 *  codes in playable families are in LEVEL_SET_PRINT_ONLY_VARIATIONS). Visible to teachers, never indexed. */
'use strict';
const IDS = ['G1-653', 'G1-654', 'G1-655', 'G1-656', 'G1-657', 'G1-658', 'G1-659', 'G1-660', 'G1-661', 'G1-662', 'G1-663', 'G1-664', 'G1-665', 'G1-666', 'G1-667', 'G1-668', 'G1-669', 'G1-670', 'G1-530'];
const CAPS = {"G1-653":{"1":4,"2":1,"3":1},"G1-655":{"2":1,"3":1},"G1-656":{"2":3,"3":4},"G1-657":{"1":3,"2":1,"3":3},"G1-660":{"2":1,"3":1},"G1-661":{"2":4},"G1-662":{"2":1,"3":1},"G1-663":{"2":1,"3":1},"G1-665":{"1":4,"2":1,"3":1},"G1-669":{"1":1,"2":1,"3":1},"G1-530":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'ydq',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-24: Year pages, social studies Grade 1 (Stage D-5). The new Grade 1 social studies pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

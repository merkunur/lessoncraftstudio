/** Level Set config — Year pages, social studies Grade 2 (Daily Teaching System, Stage D-5 batch S2), 2026-11-25.
 *  The 17 new Grade 2 social studies page types G2-614 … G2-630 (types/_shared/dk-social-2.js, dk-social-2-art.js; the
 *  lessons and rulings: lcs-stage-d/batch-s2/LINES.md, BATCH-S2-RESULT.md; one US second-grade teacher-reviewer). The
 *  four lessons the year serves with existing pages (G2-369, G2-371, G2-370, G2-362) have English pages already. English
 *  only: the other languages come with their units. Themeless: a copy = a seed. The faces have no published page, so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the pages
 *  that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-s2.js); a fixed page (the flood
 *  town, the old photograph) or a record page prints one page. Print only: no screen version (the seven codes in playable
 *  families are in LEVEL_SET_PRINT_ONLY_VARIATIONS). Visible to teachers, never indexed. */
'use strict';
const IDS = ['G2-614', 'G2-615', 'G2-616', 'G2-617', 'G2-618', 'G2-619', 'G2-620', 'G2-621', 'G2-622', 'G2-623', 'G2-624', 'G2-625', 'G2-626', 'G2-627', 'G2-628', 'G2-629', 'G2-630'];
const CAPS = {"G2-614":{"2":1,"3":1},"G2-616":{"1":1,"2":1,"3":1},"G2-619":{"1":1,"2":1,"3":1},"G2-620":{"2":1,"3":1},"G2-621":{"2":1,"3":1},"G2-622":{"2":1,"3":1},"G2-623":{"1":2,"2":3,"3":3},"G2-624":{"2":3,"3":3},"G2-625":{"1":1,"2":1,"3":1},"G2-629":{"1":3,"2":1,"3":1}};
module.exports = {
  prefix: 'ydr',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-25: Year pages, social studies Grade 2 (Stage D-5). The new Grade 2 social studies pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

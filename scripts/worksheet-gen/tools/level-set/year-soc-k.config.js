/** Level Set config — Year pages, social studies Kindergarten (Daily Teaching System, Stage D-5 batch SK), 2026-11-24.
 *  The 15 new Kindergarten social studies page types K-712 … K-726 (types/_shared/dk-social-k.js, dk-social-k-art.js; the
 *  lessons and rulings: lcs-stage-d/batch-sk/LINES.md, BATCH-SK-RESULT.md; one US Kindergarten teacher-reviewer), and
 *  K-563 (a room plan seen from above), an existing maps type the "room from above" lesson hands out that had no English
 *  page. English only: the other languages come with their units. Themeless: a copy = a seed. The faces have no
 *  published page, so level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is
 *  capped at the pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-sk.js); an
 *  open drawing or record page prints one page. Print only: no screen version (the nine codes in playable families are
 *  in LEVEL_SET_PRINT_ONLY_VARIATIONS). Visible to teachers, never indexed. */
'use strict';
const IDS = ['K-712', 'K-713', 'K-714', 'K-715', 'K-716', 'K-717', 'K-718', 'K-719', 'K-720', 'K-721', 'K-722', 'K-723', 'K-724', 'K-725', 'K-726', 'K-563'];
const CAPS = {"K-714":{"2":1,"3":1},"K-715":{"1":4,"2":1,"3":1},"K-716":{"2":1,"3":1},"K-717":{"2":4,"3":4},"K-719":{"1":1,"2":1,"3":1},"K-720":{"1":1,"2":1,"3":1},"K-722":{"1":1,"2":1,"3":1},"K-725":{"2":1,"3":1},"K-563":{"2":1,"3":1}};
module.exports = {
  prefix: 'ydp',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-24: Year pages, social studies Kindergarten (Stage D-5). The new Kindergarten social studies pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

/** Level Set config — Year pages, health K2 (Daily Teaching System, Stage D-5 batch K2), 2026-11-23.
 *  The 4 new Kindergarten health page types K-708 … K-711 (types/_shared/dk-k2.js; the lessons and
 *  rulings: lcs-stage-d/batch-k/LINES.md, BATCH-K-RESULT.md; one US Kindergarten reviewer, two rounds). English only:
 *  the other languages come with their units. Themeless: a copy = a seed. The faces are NEW (no published page), so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the
 *  pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-k.js); an open drawing or
 *  record page prints one page. Visible to teachers, never indexed. */
'use strict';
const IDS = ['K-708', 'K-709', 'K-710', 'K-711'];
const CAPS = {"K-708":{"1":1,"2":1,"3":1},"K-709":{"1":1},"K-710":{"1":1,"2":1,"3":1},"K-711":{"1":1,"2":1,"3":1}};
module.exports = {
  prefix: 'ydl',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-23: Year pages, health K2 (Stage D-5). The new Kindergarten health pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

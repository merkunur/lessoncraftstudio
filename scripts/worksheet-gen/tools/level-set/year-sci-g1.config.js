/** Level Set config — Year pages, science and health Grade 1 (Daily Teaching System, Stage D-5 batch 1), 2026-11-23.
 *  The 27 new Grade 1 science and health page types G1-626 … G1-652 (types/_shared/dk-g1.js, dk-g1-health.js; the lessons and
 *  rulings: lcs-stage-d/batch-1/LINES.md, BATCH-1-RESULT.md; one US first-grade teacher-reviewer). English only:
 *  the other languages come with their units. Themeless: a copy = a seed. The faces are NEW (no published page), so
 *  level 2 also starts at copy 1. Only copies that differ (operator ruling 2026-10-06): each level is capped at the
 *  pages that differ in content over 12 seeds (CAPS below, written by lcs-stage-d/cap-copies-k.js); an open drawing or
 *  record page prints one page. Visible to teachers, never indexed. */
'use strict';
const IDS = ['G1-626', 'G1-627', 'G1-628', 'G1-629', 'G1-630', 'G1-631', 'G1-632', 'G1-633', 'G1-634', 'G1-635', 'G1-636', 'G1-637', 'G1-638', 'G1-639', 'G1-640', 'G1-641', 'G1-642', 'G1-643', 'G1-644', 'G1-645', 'G1-646', 'G1-647', 'G1-648', 'G1-649', 'G1-650', 'G1-651', 'G1-652'];
const CAPS = {"G1-626":{"1":4,"2":1,"3":1},"G1-627":{"1":1,"2":1,"3":1},"G1-628":{"1":1,"2":1,"3":1},"G1-629":{"1":1,"2":1,"3":1},"G1-630":{"2":1,"3":1},"G1-631":{"1":1},"G1-633":{"1":1,"2":1,"3":1},"G1-634":{"1":1,"2":1,"3":1},"G1-635":{"1":1,"2":1,"3":1},"G1-636":{"1":1,"2":1,"3":1},"G1-637":{"1":1,"2":1,"3":1},"G1-638":{"1":4,"2":3},"G1-641":{"1":1,"2":1,"3":1},"G1-642":{"1":1,"2":1,"3":1},"G1-643":{"1":1,"2":1,"3":1},"G1-647":{"2":1,"3":1},"G1-648":{"1":1,"2":1,"3":1},"G1-649":{"1":1,"2":1,"3":1},"G1-650":{"1":1,"2":1,"3":1},"G1-651":{"1":1,"2":1,"3":1},"G1-652":{"1":1}};
module.exports = {
  prefix: 'ydm',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-23: Year pages, science and health Grade 1 (Stage D-5). The new Grade 1 science and health pages of the English units, three levels each. Noindex.',
  faces: Object.fromEntries(IDS.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, CAPS[id] ? { maxCopiesAt: CAPS[id] } : {})])),
  include: (loc) => loc === 'en',
};

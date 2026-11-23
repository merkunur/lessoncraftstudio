/** Level Set config — Year pages, literacy R (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  One EXISTING page type built for the worksheet makers (2026-11-02) and never published as a page:
 *    G1-506 Story Map (W.1.3 / W.2.3; the Grade 3 lesson "Plan a story: characters, setting, problem" hands out level 3:
 *    beginning, problem, middle, end, each with a drawing box and two lines; scripts/units/year/type-work-list.literacy.json, key B).
 *  Split from year-lit-q (prefix ylq) because its exercise type `story-writing` is NOT yet a family key of
 *  frontend/config/topics-taxonomy.json (axes['exercise-type'] + apps), and i18n/skill-sentences.en.json has no
 *  `story-writing` sentence: build-waves stops with "deck-html: family key not in taxonomy: story-writing". Run this
 *  config only after the family is registered (G1-507 … G1-510 share the key).
 *  Themeless: a copy = a seed. Open writing: no answer key, no screen, PDF only. The face is NEW (no published page).
 *  G1-506 draws nothing at random (no rng: the boxes, prompts and lines are fixed per level) — measured: 20 seeds give 1
 *  page body at every level — so every seed prints the SAME page and one copy per level is the honest maximum. */
'use strict';
module.exports = {
  prefix: 'ylr',
  themeless: true,
  interactive: false,   // PDF only (open writing: the type has no answer and no screen)
  titleMax: 100,
  maxCopies: 1,         // one copy per level: every seed prints the same page (see above)
  maxShared: 99,
  shareFrac: 0.25,
  seeds: 1,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy R (Part 12.3). The Story Map page type built for the worksheet makers and published for the first time, three levels (beginning, middle, end; three lines; with the problem), for a lesson of the English literacy year. Noindex.',
  faces: { 'G1-506': { levels: [2, 1, 3], noPublished: true } },
  include: (loc) => loc === 'en',
};

#!/usr/bin/env node
/**
 * The English (US) sub packs, written into frontend/content/sub-plans/defs/en.json (Daily Teaching System, Part 5).
 *
 * Per grade three times of year (start, middle, end) and two different days for each: a teacher who is out twice in
 * one season has a second day that repeats no worksheet of the first. A pack is one school day of REVIEW: every block
 * takes a teaching point the grade's plans have taught by that time of year (scripts/sub-plans/position.js; the
 * assembler refuses the others), a point of the grade before, or one that has no place in the year (puzzles, drawing,
 * science). Blocks were chosen from scripts/sub-plans/candidates.js: pages a class can do at their seats after one
 * example, with directions short enough to read aloud. A worksheet type that two packs of a grade both use gives each
 * its own page (the assembler hands a page out once per grade). After the review by a K-1 teacher: the first weeks of
 * Kindergarten get no page that needs letter names or alphabet order, and no puzzle a guest teacher cannot explain.
 *
 *   node scripts/sub-plans/lists/build-en-defs.js    (rewrites defs/en.json; the status of a pack that is already
 *                                                     live in the file is kept)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'sub-plans', 'defs', 'en.json');
const GRADES = {
  K: { id: 'k', word: 'Kindergarten', slug: 'kindergarten', blocks: 'letters and sounds, writing, and math' },
  1: { id: 'g1', word: 'First Grade', slug: 'first-grade', blocks: 'reading, word work, writing, and math' },
  2: { id: 'g2', word: 'Second Grade', slug: 'second-grade', blocks: 'reading, word work, writing, and math' },
  3: { id: 'g3', word: 'Third Grade', slug: 'third-grade', blocks: 'reading, writing, math, and science' },
};
const POSITIONS = { early: { word: 'Start of the Year', slug: 'start-of-the-year', lower: 'the start of the year' }, middle: { word: 'Middle of the Year', slug: 'middle-of-the-year', lower: 'the middle of the year' }, late: { word: 'End of the Year', slug: 'end-of-the-year', lower: 'the end of the year' } };
// [block kind, minutes, teaching point, worksheet type, { level: 'hard' (the type's harder page is the page for
// everyone), title (the title printed on that page when it is not the type's) }]
const DAYS = {
  K: {
    early: [
      [['morning', 10, 'K:pre-writing-strokes', 'K-244'], ['reading', 10, 'K:letter-identification', 'K-229'], ['writing', 15, 'K:letter-formation', 'K-238'], ['math', 10, 'K:compare-size-extremes', 'K-032'], ['numbers', 10, 'K:patterns', 'K-046'], ['logic', 10, 'K:same-different-visual', 'K-039'], ['closing', 10, 'K:feelings', 'K-331']],
      [['morning', 20, 'K:all-about-me-personal', 'K-323'], ['writing', 10, 'K:pre-writing-strokes', 'K-245'], ['reading', 10, 'K:letter-identification', 'K-229'], ['math', 10, 'K:order-by-size', 'K-033'], ['phonics', 15, 'K:letter-formation', 'K-257'], ['numbers', 10, 'K:position-words', 'K-064'], ['logic', 10, 'K:mazes', 'K-270'], ['closing', 10, 'K:spot-the-difference', 'K-061']],
    ],
    middle: [
      [['morning', 10, 'K:numeral-formation', 'K-251'], ['reading', 15, 'K:beginning-sounds', 'K-221'], ['phonics', 10, 'K:rhyme', 'K-232'], ['writing', 15, 'K:letter-formation', 'K-278'], ['math', 10, 'K:count-how-many', 'K-006'], ['numbers', 10, 'K:count-forward-missing', 'K-019'], ['logic', 10, 'K:patterns', 'K-047'], ['closing', 15, 'K:colour-by-number', 'K-266']],
      [['morning', 10, 'K:dot-to-dot-sequence', 'K-294'], ['reading', 15, 'K:sound-position', 'K-226'], ['phonics', 10, 'K:count-syllables', 'K-233'], ['writing', 15, 'K:word-sentence-tracing', 'K-239'], ['math', 10, 'K:compare-groups', 'K-008'], ['numbers', 10, 'K:before-after-back', 'K-021'], ['logic', 15, 'K:shape-naming', 'K-265'], ['closing', 10, 'K:mazes', 'K-242']],
    ],
    late: [
      [['morning', 10, 'K:days-of-week', 'K-321'], ['reading', 15, 'K:word-picture-match', 'K-225'], ['phonics', 15, 'K:cvc-build', 'K-231'], ['writing', 15, 'K:all-about-me-personal', 'K-342'], ['math', 10, 'K:combine-groups', 'K-028'], ['numbers', 15, 'K:number-bonds-k', 'K-274'], ['logic', 10, 'K:classify-count-kinds', 'K-060'], ['closing', 15, 'K:seasons', 'K-341']],
      [['morning', 10, 'K:count-forward-missing', 'K-020'], ['reading', 15, 'K:story-sequencing', 'K-379'], ['phonics', 15, 'K:cvc-build', 'K-224'], ['writing', 15, 'K:family', 'K-375'], ['math', 10, 'K:tally-marks', 'K-014'], ['numbers', 15, 'K:fact-fluency-colour-code', 'K-268'], ['logic', 10, 'K:category-odd-one-out', 'K-043'], ['closing', 10, 'K:feelings', 'K-332']],
    ],
  },
  1: {
    early: [
      [['morning', 15, 'K:count-forward-missing', 'K-020'], ['reading', 15, 'K:word-picture-match', 'K-225'], ['phonics', 20, '1:rhyming', 'G1-343'], ['writing', 20, '1:spell-picture-words', 'G1-258'], ['math', 20, '1:add-within-10-models', 'G1-110'], ['problems', 20, '1:word-problems', 'G1-213'], ['logic', 15, '1:mazes', 'G1-421'], ['closing', 10, 'K:feelings', 'K-335']],
      [['morning', 15, 'K:number-bonds-k', 'K-276'], ['reading', 20, '1:word-families-syllable-reading', 'G1-330'], ['phonics', 20, '1:phoneme-boxes', 'G1-312'], ['writing', 15, 'K:word-sentence-tracing', 'K-239'], ['math', 20, '1:subtract-cross-out', 'G1-103'], ['numbers', 20, '1:count-on-back-hops', 'G1-116'], ['logic', 15, 'K:mazes', 'K-271'], ['closing', 15, '1:find-the-differences', 'G1-413']],
    ],
    middle: [
      [['morning', 15, '1:number-of-the-day', 'G1-255'], ['reading', 20, '1:read-and-follow', 'G1-251'], ['phonics', 20, '1:rhyming', 'G1-309'], ['writing', 25, '1:unscramble-sentence', 'G1-249'], ['math', 20, '1:fluency-within-20', 'G1-214'], ['problems', 20, '1:word-problems', 'G1-240'], ['logic', 15, '1:mazes', 'G1-420'], ['closing', 10, '1:find-the-differences', 'G1-412']],
      [['morning', 15, '1:skip-counting', 'G1-124'], ['reading', 20, '1:cloze', 'G1-368'], ['phonics', 15, '1:syllables-split', 'G1-305'], ['writing', 20, '1:spell-picture-words', 'G1-259'], ['math', 20, '1:number-walls', 'G1-266'], ['numbers', 20, '1:hundreds-chart', 'G1-129'], ['logic', 15, '1:picture-sudoku', 'G1-158'], ['closing', 10, '1:days-months-seasons~season-wheel', 'G1-323']],
    ],
    late: [
      [['morning', 15, '1:alphabetical-order', 'G1-245'], ['reading', 20, '1:read-and-follow', 'G1-308'], ['phonics', 20, '1:opposites', 'G1-336'], ['writing', 25, '1:unscramble-sentence', 'G1-302'], ['math', 20, '1:time-read', 'G1-149'], ['problems', 20, '1:word-problems', 'G1-241'], ['logic', 15, '1:picture-analogies', 'G1-157'], ['closing', 15, '1:find-the-differences', 'G1-414']],
      [['morning', 15, '1:days-months-seasons', 'G1-320'], ['reading', 20, '1:story-sequencing', 'G1-402'], ['phonics', 20, '1:word-classes', 'G1-293'], ['writing', 20, '1:pronouns', 'G1-371'], ['math', 20, '1:coins', 'G1-228'], ['numbers', 15, '1:bar-graphs', 'G1-143'], ['logic', 15, '1:mazes', 'G1-422'], ['closing', 15, '1:find-the-differences', 'G1-415']],
    ],
  },
  2: {
    early: [
      [['morning', 10, '1:fluency-within-20', 'G1-216'], ['reading', 15, '1:read-and-follow', 'G1-252'], ['phonics', 15, '2:word-classes', 'G2-285'], ['writing', 20, '2:sentence-boundaries', 'G2-274'], ['math', 15, '2:hundreds-chart-moves', 'G2-321'], ['numbers', 10, '1:tens-and-ones', 'G1-120'], ['logic', 15, '2:find-differences', 'G2-388'], ['closing', 10, '2:skip-count-5-10-100', 'G2-314']],
      [['morning', 10, '1:one-ten-more-less', 'G1-132'], ['reading', 15, '1:cloze', 'G1-367'], ['phonics', 15, '2:plural-nouns', 'G2-349'], ['writing', 20, '2:pronouns', 'G2-355'], ['math', 10, '2:number-line-not-from-zero', 'G2-305'], ['numbers', 10, '1:fluency-within-20', 'G1-217'], ['logic', 10, '1:mazes', 'G1-423'], ['closing', 15, '1:story-sequencing', 'G1-401']],
    ],
    middle: [
      [['morning', 10, '2:calendar', 'G2-296'], ['reading', 20, '2:mystery-animal', 'G2-343'], ['phonics', 10, '2:synonyms', 'G2-358'], ['writing', 20, '2:question-words', 'G2-356'], ['math', 15, '2:column-method', 'G2-255'], ['problems', 15, '2:shopping-money', 'G2-291'], ['logic', 20, '2:logic-grid', 'G2-319'], ['closing', 10, '1:mazes', 'G1-424']],
      [['morning', 15, '2:add-sub-within-100-practice', 'G2-313'], ['reading', 15, '2:family-relationships', 'G2-362'], ['phonics', 10, '2:compound-words', 'G2-330'], ['writing', 15, '2:verb-forms', 'G2-335'], ['math', 10, '2:measure-with-ruler', 'G2-235'], ['numbers', 15, '2:bar-graphs', 'G2-239'], ['logic', 15, '1:picture-sudoku', 'G1-158'], ['closing', 10, '2:skip-count-5-10-100', 'G2-392']],
    ],
    late: [
      [['morning', 10, '2:hundred-more-less', 'G2-226'], ['reading', 15, '2:read-and-answer', 'G2-254'], ['phonics', 15, '2:root-words', 'G2-375'], ['writing', 20, '2:describe-a-picture', 'G2-299'], ['math', 10, '2:equal-groups-times', 'G2-209'], ['numbers', 10, '2:time-5-min-quarter', 'G2-250'], ['logic', 10, '2:symmetry-line', 'G2-247'], ['closing', 15, '2:symmetry-complete', 'G2-266']],
      [['morning', 10, '2:odd-even', 'G2-218'], ['reading', 15, '2:read-and-answer', 'G2-269'], ['phonics', 15, '2:synonyms~doing-stage', 'G2-374'], ['writing', 25, '2:retell-with-starters', 'G2-378'], ['math', 10, '2:equal-shares-shapes', 'G2-232'], ['problems', 10, '2:shopping-money', 'G2-293'], ['logic', 20, '2:grid-coordinates', 'G2-308'], ['closing', 10, '2:skip-count-5-10-100', 'G2-304']],
    ],
  },
  3: {
    early: [
      [['morning', 10, '3:column-regrouping', 'G3-359'], ['reading', 15, '2:read-and-answer', 'G2-270', { level: 'hard' }], ['phonics', 15, '2:prefixes', 'G2-376'], ['writing', 20, '2:find-differences', 'G2-389'], ['math', 15, '2:shopping-money', 'G2-292'], ['numbers', 10, '2:skip-count-3-4', 'G2-207'], ['logic', 10, '2:hundreds-chart-moves', 'G2-322'], ['closing', 15, '2:symmetry-complete', 'G2-267']],
      [['morning', 10, '2:number-line-not-from-zero', 'G2-310'], ['reading', 15, '2:read-and-answer', 'G2-254', { level: 'hard' }], ['phonics', 10, '2:synonyms', 'G2-373'], ['writing', 15, '2:verb-forms', 'G2-317'], ['math', 15, '3:column-regrouping', 'G3-360'], ['numbers', 15, '2:calendar', 'G2-297'], ['science', 10, '2:plant-parts', 'G2-364'], ['closing', 15, '2:grid-coordinates', 'G2-302']],
    ],
    middle: [
      [['morning', 10, '2:arrays', 'G2-212'], ['reading', 20, '2:read-and-answer', 'G2-269', { level: 'hard' }], ['phonics', 15, '3:word-fields', 'G3-397'], ['writing', 25, '2:describe-a-picture', 'G2-300'], ['math', 15, '3:times-tables', 'G3-358'], ['problems', 10, '3:muldiv-word-problems', 'G3-371'], ['science', 10, '2:habitats-adaptations', 'G2-380'], ['closing', 15, '3:latin-square-sudoku', 'G3-348']],
      [['morning', 15, '3:arithmetic-patterns', 'G3-326'], ['reading', 20, '2:read-and-answer', 'G2-271', { level: 'hard', title: 'Reading Comprehension: The Tallest Sunflower' }], ['phonics', 15, '3:root-words-in-context', 'G3-399'], ['writing', 20, '2:question-words', 'G2-357'], ['math', 15, '3:column-regrouping', 'G3-361'], ['numbers', 15, '3:mult-div-relationship', 'G3-311'], ['logic', 15, '3:magic-squares', 'G3-349'], ['closing', 15, '2:symmetry-complete', 'G2-268']],
    ],
    late: [
      [['morning', 10, '3:input-output', 'G3-328', { level: 'hard' }], ['reading', 20, '2:read-and-answer', 'G2-272', { level: 'hard' }], ['phonics', 10, '3:person-words', 'G3-398'], ['writing', 25, '2:compare-two-animals', 'G2-342'], ['math', 10, '3:area-model', 'G3-313'], ['problems', 10, '3:muldiv-word-problems', 'G3-372', { level: 'hard' }], ['science', 15, '3:water-cycle', 'G3-385'], ['closing', 20, '2:grid-coordinates', 'G2-303']],
      [['morning', 15, '3:rounding', 'G3-391'], ['reading', 20, '2:read-and-answer', 'G2-273', { level: 'hard' }], ['phonics', 15, '2:root-words', 'G2-359', { level: 'hard' }], ['writing', 20, '2:retell-with-starters', 'G2-378', { level: 'hard' }], ['math', 10, '3:fraction-unit-build', 'G3-315'], ['numbers', 15, '3:perimeter', 'G3-337'], ['science', 15, '3:life-cycles-compare', 'G3-393'], ['closing', 15, '2:add-sub-within-100-practice', 'G2-393']],
    ],
  },
};
const before = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).packs : [];
const packs = [];
for (const grade of ['K', '1', '2', '3'].filter((g) => DAYS[g])) {
  const G = GRADES[grade];
  const seen = new Set();
  for (const [position, P] of Object.entries(POSITIONS)) {
    DAYS[grade][position].forEach((day, i) => {
      const id = G.id + '-' + position + '-' + (i + 1);
      const metaDescription = 'No-prep emergency sub plans for ' + P.lower + ' in ' + G.word.toLowerCase() + ': ' + day.length + ' review blocks in ' + G.blocks + ', with a script for the guest teacher.';
      packs.push({
        id, slug: G.slug + '-sub-plans-' + P.slug + '-day-' + (i + 1), status: (before.find((x) => x.id === id) || {}).status || 'pilot', grade, position,
        title: G.word + ' Sub Plans: ' + P.word + ', Day ' + (i + 1),
        metaTitle: G.word + ' Emergency Sub Plans: ' + P.word + ', Day ' + (i + 1),
        metaDescription,
        blocks: day.map(([key, minutes, point, type, more]) => Object.assign({ key, minutes, point, type }, more || {})),
      });
    });
  }
}
for (const p of packs) { if (p.metaTitle.length > 70) throw new Error(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters'); if (p.metaDescription.length < 110 || p.metaDescription.length > 170) throw new Error(p.id + ': the meta description has ' + p.metaDescription.length + ' characters'); }
const comment = "The sub packs of this language: one school day of REVIEW for one grade. Which blocks, how long, which teaching point and worksheet type. WRITTEN by scripts/sub-plans/lists/build-en-defs.js (edit the lists there). Everything else is filled by scripts/sub-plans/assemble.js. status 'pilot' = noindex, in no sitemap, linked from nowhere. Times are seat-work times a class of that grade can hold; the day's read-aloud, movement and quiet reading come from the class information sheets, not from worksheets.";
fs.writeFileSync(OUT, JSON.stringify({ $comment: comment, packs }, null, 1) + '\n');
console.log('en: ' + packs.length + ' packs → ' + path.relative(REPO, OUT));

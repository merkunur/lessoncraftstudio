#!/usr/bin/env node
/**
 * The German sub packs, written into frontend/content/sub-plans/defs/de.json (Daily Teaching System, Part 5.3).
 *
 * The German market does not search for a whole substitute day; it searches for ONE lesson: "Vertretungsstunde Mathe
 * Klasse 2", "Vertretungsstunde Deutsch", "Vertretungsstunden Material" (docs/SEO/daily-system-demand, FINDINGS §4).
 * So a German pack has the form 'lesson': one 45-minute lesson of one subject for one school year and one time of
 * year, four short blocks (an opening page, two pages of work, a closing page). Every block is REVIEW by the German
 * units' own placement (scripts/sub-plans/position.js: the school year in which the German units teach a point; a
 * page of US Kindergarten content is first-weeks work of Klasse 1 here).
 *
 *   node scripts/sub-plans/lists/build-de-defs.js    (rewrites defs/de.json; the status of a pack that is already
 *                                                     live in the file is kept)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'sub-plans', 'defs', 'de.json');
const SUBJECTS = { math: { id: 'm', word: 'Mathe', slug: 'mathe' }, literacy: { id: 'd', word: 'Deutsch', slug: 'deutsch' } };
const POSITIONS = {
  early: { word: 'Schuljahresanfang', slug: 'schuljahresanfang', meta: 'den Schuljahresanfang', lower: 'zum Schuljahresanfang' },
  middle: { word: 'Schuljahresmitte', slug: 'schuljahresmitte', meta: 'die Schuljahresmitte', lower: 'zur Schuljahresmitte' },
  late: { word: 'Schuljahresende', slug: 'schuljahresende', meta: 'das Schuljahresende', lower: 'zum Schuljahresende' },
};
const H = { level: 'hard' };
// [block kind, minutes, teaching point, worksheet type, { level: 'hard', title }]; the first block opens the lesson,
// the last one closes it
const LESSONS = {
  1: {
    math: {
      early: [['morning', 10, 'K:dot-to-dot-sequence', 'K-294'], ['math', 10, 'K:count-how-many', 'K-006'], ['numbers', 10, 'K:compare-groups', 'K-008'], ['closing', 10, 'K:patterns', 'K-046']],
      middle: [['morning', 10, '1:fluency-within-20', 'G1-214'], ['math', 15, '1:add-within-10-models', 'G1-110'], ['numbers', 10, '1:number-walls', 'G1-266'], ['closing', 10, '1:make-10', 'G1-427']],
      late: [['morning', 10, '1:fluency-within-20', 'G1-216'], ['problems', 15, '1:word-problems', 'G1-240'], ['numbers', 10, '1:time-read', 'G1-148'], ['closing', 10, '1:count-on-back-hops', 'G1-294']],
    },
    literacy: {
      early: [['morning', 10, 'K:pre-writing-strokes', 'K-244'], ['phonics', 15, 'K:count-syllables', 'K-233'], ['writing', 10, 'K:pre-writing-strokes', 'G1-429'], ['closing', 10, 'K:category-odd-one-out', 'K-043']],
      middle: [['morning', 10, 'K:letter-formation', 'K-238'], ['reading', 15, '1:word-families-syllable-reading', 'G1-331'], ['writing', 10, '1:spell-picture-words', 'G1-258'], ['closing', 10, 'K:rhyme', 'K-352']],
      late: [['morning', 10, '1:phoneme-boxes', 'G1-314'], ['reading', 15, '1:read-and-follow', 'G1-251'], ['writing', 10, '1:unscramble-sentence', 'G1-249'], ['closing', 10, '1:opposites', 'G1-336']],
    },
  },
  2: {
    math: {
      early: [['morning', 10, '1:fluency-within-20', 'G1-217'], ['math', 15, '1:number-walls', 'G1-267'], ['numbers', 10, '1:doubles-halves', 'G1-271'], ['closing', 10, '2:skip-count-5-10-100', 'G2-314']],
      middle: [['morning', 10, '1:one-ten-more-less', 'G1-132'], ['math', 15, '2:hundreds-chart-moves', 'G2-321'], ['problems', 10, '2:shopping-money', 'G2-291'], ['closing', 10, '2:skip-count-5-10-100', 'G2-392']],
      late: [['morning', 10, '3:times-tables', 'G3-364'], ['math', 15, '2:share-and-group', 'G2-216'], ['numbers', 10, '2:time-5-min-quarter', 'G2-250'], ['closing', 10, '2:symmetry-complete', 'G2-266']],
    },
    literacy: {
      early: [['morning', 10, '1:alphabetical-order', 'G1-245'], ['writing', 15, '2:sentence-boundaries', 'G2-274'], ['phonics', 10, '1:opposites', 'G1-307'], ['closing', 10, '1:story-sequencing', 'G1-401']],
      middle: [['morning', 10, '2:compound-words', 'G2-330'], ['writing', 15, '2:question-words', 'G2-356'], ['phonics', 10, '1:synonyms', 'G1-395'], ['closing', 10, '1:mazes', 'G1-423']],
      late: [['morning', 10, '2:root-words', 'G2-375'], ['reading', 10, '2:read-and-answer', 'G2-254'], ['writing', 15, '2:describe-a-picture', 'G2-299'], ['closing', 10, '2:find-differences', 'G2-388']],
    },
  },
  3: {
    math: {
      early: [['morning', 15, '2:add-sub-within-100-practice', 'G2-313'], ['problems', 10, '2:shopping-money', 'G2-292'], ['numbers', 10, '2:skip-count-3-4', 'G2-207'], ['closing', 10, '3:magic-squares', 'G3-349']],
      middle: [['morning', 10, '3:times-tables', 'G3-358'], ['math', 15, '3:mult-div-relationship', 'G3-311'], ['problems', 10, '3:muldiv-word-problems', 'G3-371'], ['closing', 10, '3:arithmetic-patterns', 'G3-326']],
      late: [['morning', 10, '3:input-output', 'G3-328', H], ['math', 15, '3:column-regrouping', 'G3-359'], ['numbers', 10, '3:time-to-minute', 'G3-354'], ['closing', 10, '2:grid-coordinates', 'G2-303']],
    },
    literacy: {
      early: [['morning', 10, '2:word-classes', 'G2-285'], ['reading', 15, '2:read-and-answer', 'G2-269', H], ['phonics', 10, '2:synonyms', 'G2-373'], ['closing', 10, '1:mazes', 'G1-424']],
      middle: [['morning', 10, '3:word-fields', 'G3-397'], ['reading', 15, '2:read-and-answer', 'G2-270', H], ['writing', 10, '2:question-words', 'G2-357'], ['closing', 10, '2:synonyms~doing-stage', 'G2-374']],
      late: [['morning', 10, '3:root-words-in-context', 'G3-399'], ['reading', 15, '2:read-and-answer', 'G2-271', H], ['writing', 15, '2:describe-a-picture', 'G2-300'], ['closing', 5, '1:mazes', 'G1-425']],
    },
  },
};
const before = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).packs : [];
const packs = [];
for (const grade of Object.keys(LESSONS)) for (const subject of ['math', 'literacy']) for (const [position, P] of Object.entries(POSITIONS)) {
  const S = SUBJECTS[subject], blocks = LESSONS[grade][subject][position];
  const id = S.id + grade + '-' + position;
  packs.push({
    id, slug: 'vertretungsstunde-' + S.slug + '-klasse-' + grade + '-' + P.slug, status: (before.find((x) => x.id === id) || {}).status || 'pilot', grade, position, form: 'lesson', subject,
    title: 'Vertretungsstunde ' + S.word + ' Klasse ' + grade + ': ' + P.word,
    metaTitle: 'Vertretungsstunde ' + S.word + ' Klasse ' + grade + ': Material für ' + P.meta,
    metaDescription: 'Vertretungsstunde ' + S.word + ' für Klasse ' + grade + ' ' + P.lower + ': ' + blocks.length + ' Arbeitsblätter zur Wiederholung für 45 Minuten, mit Ablauf und Hinweisen für die Vertretung.',
    blocks: blocks.map(([key, minutes, point, type, more]) => Object.assign({ key, minutes, point, type }, more || {})),
  });
}
for (const p of packs) { if (p.metaTitle.length > 70) throw new Error(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters'); if (p.metaDescription.length < 110 || p.metaDescription.length > 170) throw new Error(p.id + ': the meta description has ' + p.metaDescription.length + ' characters'); }
const comment = "The sub packs of this language: ONE 45-minute lesson of REVIEW for one subject, one school year and one time of year (form 'lesson'). WRITTEN by scripts/sub-plans/lists/build-de-defs.js (edit the lists there). Everything else is filled by scripts/sub-plans/assemble.js. status 'pilot' = noindex, in no sitemap, linked from nowhere.";
fs.writeFileSync(OUT, JSON.stringify({ $comment: comment, packs }, null, 1) + '\n');
console.log('de: ' + packs.length + ' packs → ' + path.relative(REPO, OUT));

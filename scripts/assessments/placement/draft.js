#!/usr/bin/env node
/**
 * The BLUEPRINT of the placement checks (Daily Teaching System, Part 7.8, Stage C-3): one check per skill path, running
 * ACROSS grades, a ladder of short steps in teaching order; each step is one part cut from the lesson that teaches it, at
 * the level that lesson hands out. The teacher gives the steps in order and stops after the first step in which the
 * child misses two tasks (or the only task of a one-task step); that step names the unit and lesson to start at.
 *
 *   node scripts/assessments/placement/draft.js --loc=en [--check]
 *     → scripts/assessments/placement/<loc>.json      (read by build-checks.js --placement)
 *
 * The ladders are named below by unit and lesson NUMBER (STEPS; the spec of Stage C-3, C3-SPEC.md, with the picks it left
 * open: a Grade 2 vowel-team and a Grade 3 long-word lesson for blending, the Grade 2 and Grade 3 spelling and sentence
 * lessons). A step is written to the blueprint by its lesson's key (l.id || l.point) and must be a lesson that has a part in
 * its unit check (else --check fails: the ladder names a lesson that cannot be cut). The steps stand in teaching order:
 * grade, then the unit's place in its plan, then the lesson. Each step lists ALTERNATES: the other lessons of its unit
 * that teach the same skill (the same point before "#"), tried in its place when its own lesson gives no part.
 * The sentence-writing path ends with a writing part scored with a rubric (scripts/assessments/rubrics/<loc>.json, entry
 * "placement-sentence-writing"). HAND RULINGS stand in `rulings` (per check id: drop a step by unit and lesson, with a
 * reason) and survive a new draft.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const OUT = path.join(__dirname, loc + '.json');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const unitsFile = readJson(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json'));
const checks = readJson(path.join(REPO, 'frontend', 'content', 'assessments', 'checks.' + loc + '.json')).checks;
const before = fs.existsSync(OUT) ? readJson(OUT) : null;
const units = new Map(unitsFile.units.map((u) => [u.id, u]));
const keyOf = (l) => l.id || l.point;
const GRADES = ['K', '1', '2', '3'];

// path id → [unit, lesson number] in the order of the spec (sorted into teaching order below)
const STEPS = {
  // (fix round 2026-11-23) counting ends with skip counting by tens, fives and twos (no lesson that asks skip counting by
  // hundreds has a part in its unit check); comparing three-digit numbers is a step of place value
  'counting-number-sense': [['k-counting-to-10', 4], ['k-counting-in-order-to-20', 2], ['k-counting-in-order-to-20', 3], ['k-counting-to-10', 12], ['g1-hundreds-chart-skip-counting', 2], ['g1-tens-and-ones', 5], ['g1-hundreds-chart-skip-counting', 4]],
  'addition-subtraction-facts': [['k-adding-and-taking-away-within-10', 1], ['k-adding-and-taking-away-within-10', 2], ['g1-add-subtract-within-10', 3], ['g1-add-subtract-within-10', 7], ['g1-doubles-three-addends-number-walls', 2], ['g1-doubles-three-addends-number-walls', 3], ['g2-fact-strategies-within-20', 4]],
  'place-value': [['k-teen-numbers-and-counting-to-100', 4], ['g1-tens-and-ones', 3], ['g1-hundreds-chart-skip-counting', 3], ['g2-place-value-to-1000', 4], ['g2-place-value-to-1000', 5], ['g2-place-value-to-1000', 7], ['g2-place-value-to-1000', 8], ['g3-rounding-adding-subtracting', 2]],
  'multiplication-facts': [['g2-equal-groups-equal-shares', 2], ['g3-starting-multiplication', 1], ['g3-starting-multiplication', 3], ['g3-starting-multiplication', 4], ['g3-division', 7], ['g3-division', 3]],
  'letters-sounds': [['k-letters-and-handwriting', 2], ['k-letters-and-handwriting', 3], ['k-hearing-sounds-in-words', 4], ['k-hearing-sounds-in-words', 5], ['k-short-vowels-and-cvc-words', 1], ['k-short-vowels-and-cvc-words', 2]],
  'blending-decoding': [['k-hearing-sounds-in-words', 7], ['k-short-vowels-and-cvc-words', 4], ['k-short-vowels-and-cvc-words', 5], ['g1-digraphs-and-blends', 1], ['g1-digraphs-and-blends', 3], ['g1-long-vowels-silent-e-and-vowel-teams', 1], ['g1-long-vowels-silent-e-and-vowel-teams', 3], ['g1-two-syllable-words', 3], ['g2-long-vowels-and-vowel-teams', 3], ['g3-reading-long-words', 1]],
  'sight-words': [['k-first-words-to-read', 2], ['g1-two-syllable-words', 4], ['g1-reading-sentences-and-stories', 2], ['g2-bossy-r-and-longer-words', 4], ['g3-reading-long-words', 4, { startAt: ['g2-bossy-r-and-longer-words', 4], reason: 'The Grade 2 lesson of tricky words (could, would, should) cannot be a step: its three words stand in the unit check and in the checks of the year, and a placement box repeats none. A child who passed the Grade 1 steps and stops at the Grade 3 step starts at that Grade 2 lesson, the first tricky words no step has checked.' }]],
  'spelling-patterns': [['g1-sounds-spelling-syllables', 5], ['g1-digraphs-and-blends', 2], ['g1-long-vowels-silent-e-and-vowel-teams', 4], ['g2-bossy-r-and-longer-words', 2], ['g2-spelling-and-word-building', 1], ['g3-reading-long-words', 3]],
  'sentence-writing': [['k-words-and-sentences', 3], ['k-words-and-sentences', 4], ['g1-reading-sentences-and-stories', 3], ['g2-sentences-and-grammar', 1], ['g3-sentences-and-conventions', 2]],
};
const SUBJECT = { 'counting-number-sense': 'math', 'addition-subtraction-facts': 'math', 'place-value': 'math', 'multiplication-facts': 'math' };
const SLUG = {
  'counting-number-sense': 'math-placement-test-counting-and-number-sense',
  'addition-subtraction-facts': 'math-placement-test-addition-and-subtraction-facts',
  'place-value': 'math-placement-test-place-value',
  'multiplication-facts': 'math-placement-test-multiplication-facts',
  'letters-sounds': 'phonics-placement-test-letters-and-sounds',
  'blending-decoding': 'phonics-placement-test-blending-and-decoding',
  'sight-words': 'sight-words-placement-test',
  'spelling-patterns': 'spelling-placement-test-spelling-patterns',
  'sentence-writing': 'writing-placement-test-sentence-writing',
};
// where a unit stands in the teaching order of its grade: its plan's place (math before literacy is no order: each path
// is one subject) and its row in that plan
const planAt = new Map();
for (const p of unitsFile.plans || []) p.units.forEach((r, i) => planAt.set(r.id, i));

const problems = [];
const out = [];
for (const [pathId, list] of Object.entries(STEPS)) {
  const steps = [];
  for (const [unitId, n, opt] of list) {
    const u = units.get(unitId), l = u && u.lessons.find((x) => x.n === n), c = checks.find((x) => x.unit === unitId);
    const part = c && c.parts.find((x) => x.lesson === n);
    if (!l || !part) { problems.push(pathId + ': ' + unitId + ' lesson ' + n + ' has no part in its unit check'); continue; }
    const skill = String(l.point).split('#')[0];
    const alts = c.parts.filter((x) => x.lesson !== n && !list.some(([uu, nn]) => uu === unitId && nn === x.lesson)).map((x) => ({ x, l2: u.lessons.find((y) => y.n === x.lesson) }))
      .filter(({ l2 }) => String(l2.point).split('#')[0] === skill).map(({ x, l2 }) => ({ lesson: keyOf(l2), n: l2.n, title: l2.title, type: x.type }));
    // (fix round 2026-11-23) a step whose "start at" is another lesson (opt.startAt: [unit, lesson number], with its reason)
    let startAt = null;
    if (opt && opt.startAt) { const su = units.get(opt.startAt[0]), sl = su && su.lessons.find((x) => x.n === opt.startAt[1]);
      if (!sl || !opt.reason) problems.push(pathId + ': the start-at of ' + unitId + ' lesson ' + n + ' is not a lesson (or has no reason)');
      else startAt = { unit: su.id, unitSlug: su.slug, unitTitle: su.title, lesson: keyOf(sl), n: sl.n, title: sl.title, grade: String(su.grade), reason: opt.reason }; }
    steps.push(Object.assign({ unit: unitId, lesson: keyOf(l), n: l.n, title: l.title, type: part.type, grade: String(u.grade) }, alts.length ? { alts } : {}, startAt ? { startAt } : {}));
  }
  steps.sort((a, b) => (GRADES.indexOf(a.grade) - GRADES.indexOf(b.grade)) || ((planAt.get(a.unit) ?? 99) - (planAt.get(b.unit) ?? 99)) || (a.n - b.n));
  const grades = [...new Set(steps.map((s) => s.grade))];
  out.push({ id: 'placement-' + pathId, path: pathId, subject: SUBJECT[pathId] || 'literacy', slug: SLUG[pathId], grades, grade: steps[0] && steps[0].grade, parts: steps, ...(pathId === 'sentence-writing' ? { writing: 'placement-sentence-writing' } : {}) });
}
// ---- the hand rulings ----
const rulings = (before && before.rulings) || {};
for (const [id, r] of Object.entries(rulings)) {
  if (id.startsWith('$')) continue;
  const c = out.find((x) => x.id === id);
  if (!c) { problems.push('a ruling names the check ' + id + ', which is not drafted'); continue; }
  for (const d of r.drop || []) {
    if (!d.reason) problems.push(id + ': a drop without a reason');
    const i = c.parts.findIndex((p) => p.unit === d.unit && p.lesson === d.lesson);
    if (i < 0) { problems.push(id + ': the ruling drops ' + d.unit + ' ' + d.lesson + ', which is not a step'); continue; }
    c.parts.splice(i, 1);
    (c.ruledOut = c.ruledOut || []).push({ unit: d.unit, lesson: d.lesson, reason: d.reason });
  }
}
// (the grades a check spans, and the grade of its first step, after the rulings)
for (const c of out) { c.grades = [...new Set(c.parts.map((p) => p.grade))]; c.grade = c.parts[0] && c.parts[0].grade; }
const text = JSON.stringify({
  $comment: 'The blueprint of the placement checks (' + loc + '). DRAFTED by scripts/assessments/placement/draft.js from its STEPS, the units (units.' + loc + '.json) and the live unit checks (checks.' + loc + '.json); read by build-checks.js --placement. Do not edit `checks` by hand: a hand ruling goes in `rulings` (per check id: drop, with a reason).',
  locale: loc,
  rules: { order: 'steps in teaching order: grade, the unit\'s place in its plan, the lesson', alternates: 'the other lessons of the step\'s unit that teach the same skill (the same point before "#")', stop: 'stop after the first step in which the child misses two tasks, or the only task of a one-task step' },
  checks: out,
  rulings,
}, null, 1) + '\n';
if (problems.length) { for (const p of problems) console.log('FAIL  ' + p); process.exit(1); }
if (process.argv.includes('--check')) {
  const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (have !== text) { console.log('FAIL  ' + path.relative(REPO, OUT) + ' is not the draft of today (run draft.js)'); process.exit(1); }
  console.log(loc + ': the blueprint of the placement checks is current');
} else {
  fs.writeFileSync(OUT, text);
  for (const c of out) console.log(c.id.padEnd(40) + c.parts.length + ' steps (' + c.grades.join(',') + '): ' + c.parts.map((p) => p.grade + ':' + p.title).join(' · ') + (c.writing ? ' · WRITING' : ''));
}

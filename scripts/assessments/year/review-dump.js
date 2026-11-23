#!/usr/bin/env node
/**
 * The text listing of the checks of the year for ONE reviewer (Stage C-2; rule #2 of CLAUDE.md: a native-speaker and a
 * pedagogical check over a compact dump). Per check its grade, subject and time; per part the unit and lesson it comes
 * from, its direction line, the note the key prints for the teacher, the texts read aloud, and every box of forms A and
 * B with the key's answer. Plain text.
 *
 *   node scripts/assessments/year/review-dump.js --loc=en --out=<file>
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const out = arg('out', path.join(REPO, 'out', 'assessments', loc, 'year', 'review-dump.txt'));
const root = path.join(REPO, 'out', 'assessments', loc, 'year');
// (read in the order of a school year: per grade and subject the beginning, the middle, the end)
const T = ['beginning', 'middle', 'end'], GS = ['K', '1', '2', '3'];
const list = JSON.parse(fs.readFileSync(path.join(root, 'checks.json'), 'utf8')).checks.slice().sort((a, b) => (GS.indexOf(a.grade) - GS.indexOf(b.grade)) || a.subject.localeCompare(b.subject) * -1 || (T.indexOf(a.year.time) - T.indexOf(b.year.time)));
const blueprint = JSON.parse(fs.readFileSync(path.join(__dirname, loc + '.json'), 'utf8'));
const G = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
const L = [];
L.push('THE CHECKS OF THE YEAR (' + loc + '): ' + list.length + ' checks, forms A and B. Built ' + new Date().toISOString().slice(0, 10) + '.');
L.push('Each part is cut from the worksheet a lesson hands out, at that lesson\'s level (the Kindergarten entry checks: the easy level).');
L.push('Rules of the blueprint: ' + Object.entries(blueprint.rules).map(([k, v]) => k.toUpperCase() + ': ' + v).join(' | '));
L.push('Pictures are named folder/file; "key shows" is what the answer key prints where it differs from the child\'s box.');
L.push('The text of a box is read from its markup: a letter set apart inside a word ("f ly", "Pu f fy", "n ext") is a listing artifact (a letter in a box of its own, or a ligature break); the page prints the word whole.');
L.push('Every part is one lesson of a unit; a part whose own lesson could not give new boxes is cut from another lesson of the same unit (the lesson named is the one cut).');
L.push('');
for (const c of list) {
  const d = JSON.parse(fs.readFileSync(path.join(root, c.unit, 'dump.json'), 'utf8'));
  const bp = blueprint.checks.find((x) => x.id === c.unit) || {};
  L.push('='.repeat(100));
  L.push(G[c.grade] + ' · ' + c.subject + ' · ' + c.year.time.toUpperCase() + ' OF THE YEAR   (' + c.unit + ')');
  L.push(c.sections.length + ' parts, ' + c.forms.A.cards + ' boxes per form, ' + c.forms.A.pages + ' page(s) per form. Form title: "' + c.title + ': Check A"');
  if (bp.time === 'middle' && bp.taughtBy) L.push('Taught by mid-year (class day <= ' + bp.taughtBy.half + ' of ' + bp.taughtBy.of + '): ' + bp.taughtBy.units.map((u) => u.unit + ' (ends day ' + u.lastDay + ')').join(', '));
  if (bp.cut) L.push('Left out of the beginning check (at most 8 parts): ' + bp.cut.map((x) => x.unit).join(', '));
  if ((c.notBuilt || []).length) L.push('IN THE BLUEPRINT BUT NOT BUILT: ' + c.notBuilt.map((x) => x.unit + ' lesson ' + x.lesson + ' "' + x.title + '"').join('; '));
  L.push('');
  d.parts.forEach((p, i) => {
    const s = c.sections[i];
    const lvl = (bp.parts || []).find((x) => x.unit === s.unit && x.lesson === s.lessonKey);
    L.push('PART ' + p.part + '  from ' + s.unitTitle + ' (' + s.unit + '), Lesson ' + s.unitLesson + ': ' + s.lessonTitle + '   [worksheet ' + s.type + ' "' + p.worksheet + '"' + (lvl && lvl.level ? ', level ' + lvl.level : '') + ']');
    L.push('  Direction: ' + p.directionReadAloud);
    if (p.keyNote) L.push('  Note on the key: ' + p.keyNote);
    for (const k of ['A', 'B']) {
      const reads = p['reads' + k] || [];
      reads.forEach((r, j) => L.push('  Teacher reads aloud (form ' + k + (reads.length > 1 ? ', box ' + (j + 1) : '') + '): ' + r));
      p['form' + k].forEach((b, j) => {
        L.push('  ' + k + (j + 1) + ': ' + (b.text || '(no words)') + (b.pictures.length ? '   | pictures: ' + b.pictures.join(', ') : '') + '   => ANSWER: ' + (b.keyReads || b.answer) + (b.keyText && b.keyText !== b.text ? '   | key shows: ' + b.keyText : '') + (/\bmark \d/.test(b.answer) && !b.keyReads ? '   (the key rings marks of a drawing: see out/assessments/' + loc + '/year/' + c.unit + '/key-' + k.toLowerCase() + '-*.png)' : ''));
      });
    }
    L.push('');
  });
}
// ---- the texts written for the checks of the year (Stage C-2), in full: they stand in no worksheet, so the reviewer reads
// them here first (worksheet-gen/types/_shared/fact-text-k.js YEAR_TEXTS, story-g1.js YEAR_STORIES)
{
  const SH = path.join(REPO, 'scripts', 'worksheet-gen', 'types', '_shared');
  const pic = (p) => p.theme + '/' + p.noun;
  const fk = require(path.join(SH, 'fact-text-k.js')), sg = require(path.join(SH, 'story-g1.js'));
  L.push('='.repeat(100));
  L.push('APPENDIX: THE TEXTS WRITTEN FOR THE CHECKS OF THE YEAR (in no published worksheet; a check of the year reads them, a unit check never)');
  L.push('');
  L.push('Kindergarten fact texts (Find the Facts, K-645). The teacher reads the text and the question; the child circles one of three pictures.');
  for (const t of fk.YEAR_TEXTS || []) {
    const forms = Object.entries(fk.YEAR_PLAN || {}).filter(([, list]) => list.some(([id]) => id === t.id)).map(([f]) => f).join(', ');
    L.push('');
    L.push(t.title.toUpperCase() + '   (form ' + forms + ' of a check of the year; text picture ' + pic(t.picture) + ')');
    t.sentences.forEach((s, i) => L.push('  ' + (i + 1) + '. ' + s));
    for (const q of t.questions) L.push('  Q (sentence ' + q.sentence + '): ' + q.q + '  => RIGHT ' + pic(q.right) + '; wrong ' + q.wrong.map(pic).join(', '));
    const y = (fk.YEAR_FACT || {})[t.id];
    if (y) L.push('  ASKED IN THE CHECK: ' + y[0] + '  => three pictures: ' + pic(t.questions.find((q) => q.q === y[0]).right) + ' (right), ' + y[1].join(', ') + ' (the answers of its other questions)');
    L.push('  Main topic: ' + pic(t.topic.right) + ' (right), ' + t.topic.wrong.map(pic).join(', '));
  }
  L.push('');
  L.push('Grade 1 stories (Find the Answer in the Story, G1-579). The child reads the part of the story a question asks about and finishes the answer sentence (level 2).');
  for (const t of sg.YEAR_STORIES || []) {
    const uses = Object.entries(sg.YEAR_CHECK_STORY || {}).flatMap(([id, f]) => Object.entries(f).filter(([, s]) => s === t.id).map(([k]) => id + ' form ' + k)).join(', ');
    L.push('');
    L.push(t.title.toUpperCase() + '   (' + uses + ')');
    t.parts.forEach((p, i) => L.push('  Part ' + (i + 1) + ': ' + p.join(' ')));
    for (const q of t.details) L.push('  Q (sentence ' + q.sentence + '): ' + q.q + '  => ' + q.full + '   [level 1 choices: ' + q.answer + ' (right) / ' + q.wrong.join(' / ') + ']');
  }
}
fs.writeFileSync(out, L.join('\n') + '\n');
console.log('review listing → ' + out + ' (' + L.length + ' lines)');

#!/usr/bin/env node
/**
 * The text listing of the placement checks for ONE reviewer (Stage C-3; CLAUDE.md rule #2): per path its steps with grade,
 * unit and lesson, the direction line, the key's note, the texts read aloud, every box of forms A and B with the key's
 * answer, the "start at" line of each step, and the writing part with its rubric in full. Plain text.
 *
 *   node scripts/assessments/placement/review-dump.js --loc=en --out=<file>
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const out = arg('out', path.join(REPO, 'out', 'assessments', loc, 'placement', 'review-dump.txt'));
const root = path.join(REPO, 'out', 'assessments', loc, 'placement');
const list = JSON.parse(fs.readFileSync(path.join(root, 'checks.json'), 'utf8')).checks;
const blueprint = JSON.parse(fs.readFileSync(path.join(__dirname, loc + '.json'), 'utf8'));
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
const rubrics = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'rubrics', loc + '.json'), 'utf8'));
const G = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
const gradeOf = (u) => (u.startsWith('k-') ? 'K' : (/^g(\d)-/.exec(u) || [])[1]);
const L = [];
L.push('THE PLACEMENT CHECKS (' + loc + '): ' + list.length + ' checks, one per skill path, forms A and B. Built ' + new Date().toISOString().slice(0, 10) + '.');
L.push('Each step is cut from the worksheet the lesson that teaches it hands out, at that lesson\'s level. STOP RULE (teacher pages and page): ' + ui.placeStop);
L.push('No box repeats a box of a unit check or of a check of the year. Pictures are named folder/file; "key shows" is what the key prints where it differs from the child\'s box. A letter set apart inside a word ("f ly") is a listing artifact.');
L.push('');
for (const c of list) {
  const d = JSON.parse(fs.readFileSync(path.join(root, c.unit, 'dump.json'), 'utf8'));
  const bp = blueprint.checks.find((x) => x.id === c.unit) || {};
  L.push('='.repeat(100));
  L.push(c.title.toUpperCase() + '   (' + c.unit + '; page title "' + ui['placeMetaTitle_' + c.year.path] + '")');
  L.push(c.sections.length + ' steps' + (c.writing ? ' and a writing part' : '') + ', ' + c.forms.A.cards + ' boxes per form, ' + c.forms.A.pages + ' page(s) per form; grades ' + (c.year.grades || []).join(', '));
  if ((c.notBuilt || []).length) L.push('IN THE BLUEPRINT BUT NOT BUILT: ' + c.notBuilt.map((x) => x.unit + ' lesson ' + x.lesson + ' "' + x.title + '"').join('; '));
  if ((bp.ruledOut || []).length) L.push('RULED OUT: ' + bp.ruledOut.map((x) => x.unit + ' ' + x.lesson + ': ' + x.reason).join(' | '));
  L.push('');
  d.parts.forEach((p, i) => {
    const s = c.sections[i];
    L.push('STEP ' + p.part + '  (' + G[gradeOf(s.unit)] + ') from ' + s.unitTitle + ' (' + s.unit + '), Lesson ' + s.unitLesson + ': ' + s.lessonTitle + '   [worksheet ' + s.type + ' "' + p.worksheet + '"]');
    L.push('  Direction: ' + p.directionReadAloud);
    if (p.keyNote) L.push('  Note on the key: ' + p.keyNote);
    for (const k of ['A', 'B']) {
      const reads = p['reads' + k] || [];
      reads.forEach((r, j) => L.push('  Teacher reads aloud (form ' + k + (reads.length > 1 ? ', box ' + (j + 1) : '') + '): ' + r));
      p['form' + k].forEach((b, j) => L.push('  ' + k + (j + 1) + ': ' + (b.text || '(no words)') + (b.pictures.length ? '   | pictures: ' + b.pictures.join(', ') : '') + '   => ANSWER: ' + (b.keyReads || b.answer) + (b.keyText && b.keyText !== b.text ? '   | key shows: ' + b.keyText : '') + (/\bmark \d/.test(b.answer) && !b.keyReads ? '   (the key rings marks of a drawing: see out/assessments/' + loc + '/placement/' + c.unit + '/key-' + k.toLowerCase() + '-*.png)' : '')));
    }
    if (s.cards === 1) L.push('  ONE TASK: ' + ui.placeStopOne);
    const t = s.startAt ? { u: s.startAt.unitTitle, g: G[s.startAt.grade], n: s.startAt.n, ti: s.startAt.title, slug: s.startAt.unitSlug } : { u: s.unitTitle, g: G[gradeOf(s.unit)], n: s.unitLesson, ti: s.lessonTitle, slug: s.unitSlug };
    L.push('  IF THE CHILD STOPS HERE, START AT: ' + t.u + ' (' + t.g + '), Lesson ' + t.n + ': ' + t.ti + '   www.lessoncraftstudio.com/' + loc + '/units/' + t.slug + '#lesson-' + t.n + (s.startAt ? '   (a lesson of its own: ' + s.startAt.reason + ')' : ''));
    L.push('');
  });
  if (d.writing) {
    const R = rubrics[c.unit];
    L.push('THE WRITING PART (every child, apart from the steps)   [worksheet ' + d.writing.type + ', level ' + d.writing.level + '; ' + d.writing.lines + ' lines]');
    L.push('  ' + ui.tpPlaceWritingAll);
    L.push('  Direction: ' + d.writing.directionReadAloud);
    L.push('  Form A task: ' + d.writing.formA.prompt + (d.writing.formA.picture ? '   | picture: ' + d.writing.formA.picture.theme + '/' + d.writing.formA.picture.file : ''));
    L.push('  Form B task: ' + d.writing.formB.prompt + (d.writing.formB.picture ? '   | picture: ' + d.writing.formB.picture.theme + '/' + d.writing.formB.picture.file : ''));
    if (R && R.teacherNote) L.push('  Teacher note: ' + R.teacherNote);
    for (const p of (R || {}).points || []) {
      L.push('  POINT ' + p.id + ' — ' + p.name + ' (' + p.kind + ', 0 to 2)');
      for (const [lv, n] of [['notYet', 0], ['nearly', 1], ['secure', 2]]) L.push('    ' + n + ' ' + lv + ': ' + p[lv].shows + '  Example: "' + p[lv].example + '"  Next: ' + p.next[lv]);
    }
    L.push('');
  }
}
fs.writeFileSync(out, L.join('\n') + '\n');
console.log('placement listing → ' + out + ' (' + L.length + ' lines)');

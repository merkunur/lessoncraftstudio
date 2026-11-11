#!/usr/bin/env node
/**
 * One compact text file with what a teacher READS on the units hub and the year plans of a language, for the one
 * reviewer of the native-speaker and pedagogy check (CLAUDE.md rule #2): the hub's and the plans' own strings as
 * they render, every plan's title, page title and description, and every unit's title and description.
 * (The lessons and their teacher notes are reviewed from scripts/units/dump-for-review.js.)
 *
 *   node scripts/units/dump-hub-for-review.js --loc=en   → out/units/review-<loc>-hub.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const U = path.join(REPO, 'frontend', 'content', 'units');
const file = JSON.parse(fs.readFileSync(path.join(U, 'units.' + loc + '.json'), 'utf8'));
const ui = JSON.parse(fs.readFileSync(path.join(U, 'ui.' + loc + '.json'), 'utf8'));
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
const HUB = ['hubCrumb', 'hubMetaTitle', 'hubMetaDescription', 'hubEyebrow', 'hubTitle', 'hubLead', 'hubFactUnits', 'hubJumpTitle', 'hubPlanLink', 'hubUnitLessons', 'hubPlanNote',
  'planEyebrow', 'planLead', 'planHonest', 'planTableTitle', 'planColWeeks', 'planColUnit', 'planColLessons', 'planColStandards', 'planWeeksRange', 'planWeekOne', 'planPdfTitle', 'planPdfLead', 'planPdfBtn', 'planPdfNote', 'planPdfColDates', 'planPdfColDone', 'planAllUnits',
  'unitInPlan', 'unitPrev', 'unitNext', 'partOfTitle', 'partOfLanding', 'partOfActivity'];
let md = '# Units hub and year plans, language `' + loc + '`: everything a teacher reads on them\n\n';
md += 'Ids in `code` are what to cite in a finding. `{…}` is filled in by the page; an example of each filled string follows the list.\n';
md += '\n## The strings of the hub, the year plan page, the printable plan and the "in a lesson plan" block (`units/ui`)\n\n';
for (const k of HUB) md += '- `' + k + '`: ' + (ui[k] == null ? '(MISSING)' : ui[k]) + '\n';
const p0 = file.plans[0];
if (p0) {
  const u0 = file.units.find((u) => u.id === p0.units[1].id);
  md += '\n## The same strings, filled in\n\n';
  md += '- hub, the link to a plan: ' + fill(ui.hubPlanLink, { title: p0.title }) + '\n';
  md += '- hub, a unit card: ' + u0.title + ' — ' + fill(ui.factLessons, { n: u0.lessons.length }) + ' · ' + (u0.weeks === 1 ? ui.factWeek : fill(ui.factWeeks, { n: u0.weeks })) + ' — ' + fill(ui.hubUnitLessons, { list: u0.lessons.map((l) => l.title).join(' · ') }) + '\n';
  md += '- hub, the note at the end: ' + fill(ui.hubPlanNote, { plan: 'Teacher' }) + '\n';
  md += '- plan, under the title: ' + fill(ui.planLead, { units: p0.units.length, lessons: p0.units.reduce((n, r) => n + r.lessons.length, 0), weeks: p0.weeks }) + ' ' + ui.planHonest + '\n';
  md += '- plan, a row: ' + fill(ui.planWeeksRange, { from: p0.units[1].from, to: p0.units[1].to }) + ' / ' + fill(ui.planWeekOne, { n: p0.units[0].from }) + ' — ' + ui.planColStandards + ', ' + p0.framework + ': ' + p0.units[1].standards.join(', ') + '\n';
  md += '- plan, the box for subscribers: ' + ui.planPdfTitle + ' — ' + ui.planPdfLead + ' [' + ui.planPdfBtn + '] ' + fill(ui.planPdfNote, { plan: 'Teacher' }) + '\n';
  md += '- unit page, under the title: ' + fill(ui.unitInPlan, { n: 2, total: p0.units.length, plan: p0.title }) + '\n';
  md += '- unit page, at the end: ' + fill(ui.unitPrev, { title: p0.units[0].title }) + ' | ' + fill(ui.unitNext, { title: p0.units[2].title }) + '\n';
  const l0 = u0.lessons[1];
  md += '- on a worksheet page: ' + ui.partOfTitle + ' — ' + fill(ui.partOfLanding, { n: l0.n, lesson: l0.title, unit: u0.title }) + '\n';
  md += '- on an activity page: ' + ui.partOfTitle + ' — ' + fill(ui.partOfActivity, { n: l0.n, lesson: l0.title, unit: u0.title }) + '\n';
}
md += '\n## The year plans\n';
for (const p of file.plans) {
  md += '\n### `' + p.id + '` — ' + p.title + ' (grade ' + p.grade + ', ' + p.subject + ', ' + p.units.length + ' units, ' + p.units.reduce((n, r) => n + r.lessons.length, 0) + ' lessons, ' + p.weeks + ' weeks)\n\n- page title: ' + p.metaTitle + '\n- page description: ' + p.metaDescription + '\n';
  for (const r of p.units) md += '- weeks ' + r.from + (r.to > r.from ? '–' + r.to : '') + ': ' + r.title + ' — ' + r.lessons.join(' · ') + '\n';
}
md += '\n## The units (title, page title, description, as the hub and search results show them)\n\n';
for (const u of file.units) md += '- `' + u.id + '` (grade ' + u.grade + ', ' + u.subject + ', ' + u.lessons.length + ' lessons, ' + u.weeks + (u.weeks === 1 ? ' week' : ' weeks') + ') — ' + u.title + ' | ' + u.metaTitle + ' | ' + u.metaDescription + '\n';
// --points=<point id>[,…] adds single lessons whose texts changed after their unit was reviewed
const also = (arg('points', '') || '').split(',').filter(Boolean);
if (also.length) {
  md += '\n## Lessons whose teacher note was rewritten after their review\n';
  for (const u of file.units) for (const l of u.lessons) if (also.includes(l.point)) {
    md += '\n### `' + u.id + ' / lesson ' + l.n + '` (`' + l.point + '`) — ' + l.title + '\n\n- objective: ' + l.objective + '\n- worksheets handed out: ' + l.paper.map((p) => p.title).join('; ') + '\n- the usual mistake: ' + l.note.mistake + '\n- words to use: ' + l.note.words + '\n- what to watch for: ' + l.note.watch + '\n';
  }
}
const out = path.join(REPO, 'out', 'units', 'review-' + loc + '-hub.md');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(path.relative(REPO, out) + ': ' + file.plans.length + ' plan(s), ' + file.units.length + ' unit(s), ' + Math.round(md.length / 1024) + ' KB');
